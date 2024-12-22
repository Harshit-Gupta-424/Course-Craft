package College.server.Service;

import College.server.Entities.Course;
import College.server.Entities.User;
import College.server.Repositories.CourseRepository;
import College.server.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Course createCourse(Course course) {
        course.setStatus("");
        return courseRepository.save(course);
    }

    public List<Course> findAllCourses(){
        return courseRepository.findAll();
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public List<Course> getCoursesByCriteria(String degree, String branch, String section) {
        return courseRepository.findByDegreeAndBranchAndSection(degree, branch, section);
    }

    public User updateCourse(String email, Course oldCourse, String response) {
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
        if(response.equals("approved")) {
            courseToUpdate.setStatus("approved");
        } else if (response.equals("rejected")){
            courseToUpdate.setStatus("");
        }

        // Save the updated user back to the database
        foundUser.setCourses(userCourses); // Explicitly setting the updated list
        userRepository.save(foundUser);

        return foundUser;
    }
}
