package College.server.Service;

import College.server.Entities.Course;
import College.server.Entities.User;
import College.server.Entities.ValidateUser;
import College.server.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User login(ValidateUser validateUser) {

        User foundUser = userRepository.findByEmail(validateUser.getEmail());

        if (foundUser != null && passwordEncoder.matches(validateUser.getPassword(), foundUser.getPassword())) {
            return foundUser;
        }
        return null;
    }

    public User updateCourse(String email, Course oldCourse) {
        // Find the user by email
        User foundUser = userRepository.findByEmail(email);
        if (foundUser == null) {
            throw new IllegalArgumentException("User not found");
        }

        // Find the course in the user's course list
        List<Course> userCourses = foundUser.getCourses();
        Course courseToUpdate = userCourses.stream()
                .filter(course -> course.getName().equals(oldCourse.getName()) &&
                        course.getBranch().equals(oldCourse.getBranch()) &&
                        course.getDegree().equals(oldCourse.getDegree()) &&
                        course.getSection().equals(oldCourse.getSection()) &&
                        course.getProfessor().equals(oldCourse.getProfessor()))

                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Course not found for user"));

        // Update the course status
        courseToUpdate.setStatus("waiting");

        // Save the updated user back to the database
        foundUser.setCourses(userCourses); // Explicitly setting the updated list
        userRepository.save(foundUser);

        return foundUser;
    }


}
