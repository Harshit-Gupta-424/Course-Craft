package College.server.Controller;

import College.server.Entities.Course;
import College.server.Entities.EnrollRequest;
import College.server.Entities.RespondRequest;
import College.server.Entities.User;
import College.server.Service.AdminService;
import College.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @PostMapping("/createCourse")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = adminService.createCourse(course);
        return ResponseEntity.ok(createdCourse);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Course>> findAllCourses() {
        List<Course> availableCourses = adminService.findAllCourses();
        return ResponseEntity.ok(availableCourses);
    }

    @PostMapping("/addCoursesToUsers")
    public ResponseEntity<String> addCoursesToUsers() {
        List<User> allUsers = userService.getAllUsers();
        List<Course> allCourses = adminService.findAllCourses();

        // Iterate through all users
        for (User user : allUsers) {
            // Skip admin user
            if (user.getName().equals("Admin")) {
                continue;
            }

            // Iterate through all courses
            for (Course course : allCourses) {
                // Check if the user's degree, branch, and section match the course
                if (user.getDegree().equals(course.getDegree()) &&
                        user.getBranch().equals(course.getBranch()) &&
                        user.getSection().equals(course.getSection())) {

                    // Check if the course already exists in the user's course list
                    if (!user.getCourses().contains(course)) {
                        // Add the course to the user's course list
                        user.getCourses().add(course);
                    }
                }
            }

            // Remove courses from user's list that are not in the available courses list
            user.getCourses().removeIf(userCourse -> !allCourses.contains(userCourse));
            userService.saveUser(user);
        }

        // Save updated user information (if necessary, based on your implementation)


        return ResponseEntity.ok("Courses added and extra courses removed from users.");
    }


    @GetMapping("/findAllUsers")
    public ResponseEntity<List<User>> findAllUsers(){
        List<User> allUsers = adminService.findAllUsers();
        if (allUsers.isEmpty()) {
            return ResponseEntity.noContent().build();  // Return 204 if no users are found
        }
        return ResponseEntity.ok(allUsers);
    }

    @PostMapping("/respondCourse")
    public ResponseEntity<User> enrollCourse(@RequestBody RespondRequest respondRequest) {
        String email =  respondRequest.getEmail();
        Course oldCourse = respondRequest.getCourse();
        String response = respondRequest.getResponse();
        User updatedUser = adminService.updateCourse(email, oldCourse, response);
        return ResponseEntity.ok(updatedUser);
    }

}
