package vn.aims.BookSeller.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000") // cho phép React truy cập
                        .allowedMethods("*") // cho phép mọi phương thức (GET, POST, PUT...)
                        .allowCredentials(true); // cho phép gửi cookie nếu cần
            }
        };
    }
}
