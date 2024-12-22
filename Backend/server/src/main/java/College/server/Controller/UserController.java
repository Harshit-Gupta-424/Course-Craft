package College.server.Controller;

import College.server.Entities.*;
import College.server.JWTTokenUtils.JWTUtils;
import College.server.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtils jwtUtils;

//    @Autowired
//    private Course course;

    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        String token = jwtUtils.generateToken(user.getEmail());
        return ResponseEntity.ok(new JWTResponse(token));
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping("/loginUser")
    public ResponseEntity<?> loginUser(@RequestBody ValidateUser validateUser) {
        User user = userService.login(validateUser);

        if (user != null) {
            String token = jwtUtils.generateToken(user.getEmail());
            return ResponseEntity.ok(new JWTResponse(token));
        } else {
            // Return error message
            return ResponseEntity.status(401).body("Invalid email or password!");
        }
    }

    @PostMapping("/findUser")
    public ResponseEntity<User> findUserFromToken(@RequestBody String token) {
        String email = JWTUtils.getEmailFromToken(token);
        User foundUser = userService.getUserByEmail(email);

        return foundUser != null ? ResponseEntity.ok(foundUser) : ResponseEntity.notFound().build();
    }

    @PostMapping("/enrollCourse")
    public ResponseEntity<User> enrollCourse(@RequestBody EnrollRequest enrollRequest) {
        String email =  enrollRequest.getEmail();
        Course oldCourse = enrollRequest.getCourse();
        User updatedUser = userService.updateCourse(email, oldCourse);
        return ResponseEntity.ok(updatedUser);
    }
}
