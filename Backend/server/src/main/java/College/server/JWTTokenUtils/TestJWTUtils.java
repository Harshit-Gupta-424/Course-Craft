package College.server.JWTTokenUtils;

public class TestJWTUtils {

    public static void main(String[] args) {
        // 1. Generate a JWT token
        String username = "harshitgupta422004@gmail.com";
        String token = JWTUtils.generateToken(username);
        System.out.println("Generated Token: " + token);

        // 2. Validate the JWT token
        boolean isValid = JWTUtils.validateToken(token);
        System.out.println("Is Token Valid: " + isValid);

        // 3. Get username from the JWT token
        String extractedUsername = JWTUtils.getEmailFromToken(token);
        System.out.println("Username from Token: " + extractedUsername);
    }
}
