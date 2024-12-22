package College.server.JWTTokenUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JWTUtils {

    // Use a secure secret key for signing
    private static String SECRET_KEY; // Static variable to store the secret key

    // Inject value and assign to static field
    @Value("${jwt.secret.key}")
    public void setSecretKey(String secretKey) {
        JWTUtils.SECRET_KEY = secretKey; // Set the static field
    }// Change to a secure key

    // Generate JWT token
    public static String generateToken(String username) {
        long expirationTime = 1000 * 60 * 60; // 1 hour expiration time
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY); // Use HMAC256 for signing
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(algorithm); // Sign the token
    }

    // Validate JWT token
    public static boolean validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY); // Use HMAC256 for verification
            JWTVerifier verifier = JWT.require(algorithm) // Create a JWT verifier
                    .build(); // Build the verifier
            DecodedJWT decodedJWT = verifier.verify(token); // Verify the token
            return true; // Token is valid
        } catch (JWTVerificationException exception) {
            // Invalid token
            return false;
        }
    }

    // Get username from JWT token
    public static String getEmailFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY); // Use HMAC256 for verification
            JWTVerifier verifier = JWT.require(algorithm) // Create a JWT verifier
                    .build(); // Build the verifier
            DecodedJWT decodedJWT = verifier.verify(token); // Verify the token and decode it
            return decodedJWT.getSubject(); // Get the username (subject)
        } catch (JWTVerificationException exception) {
            // Invalid token
            return null;
        }
    }
}
