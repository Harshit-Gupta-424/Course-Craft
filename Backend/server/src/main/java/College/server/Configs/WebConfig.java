package College.server.Configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow requests from localhost:3000 (React app)
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:3000") // React frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allow any headers
                .allowCredentials(true); // Allow credentials (cookies, etc.)
    }
}
