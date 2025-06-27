package vn.aims.BookSeller.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import vn.aims.BookSeller.Service.UserService;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig {

//    @Bean
//    @Autowired
//    public JdbcUserDetailsManager jdbcUserDetailsManager(DataSource db){
//        return new JdbcUserDetailsManager(db);
//    }
    @Autowired
    private CustomAuthenticationSuccessHandler successHandler;


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Autowired
    public DaoAuthenticationProvider daoAuthenticationProvider(UserService userService){
        DaoAuthenticationProvider daoAuthenticationProvider= new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());
        return daoAuthenticationProvider;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests(
                        configurer->configurer
                                .requestMatchers("api/login").permitAll()
                                .requestMatchers("/api/admin").hasAnyRole("ADMIN")
                                .requestMatchers("/api/user").hasAnyRole("USER")
                                .anyRequest().permitAll()
                )
                .formLogin(
                        form->form.loginPage("/api/login").loginProcessingUrl("/authenticateTheUser").successHandler(successHandler).permitAll()
                ).logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/api/login")  // chuyển hướng tới đây sau khi logout
                        .permitAll()
                );

        http.csrf(csrf->csrf.disable());
        return http.build();
    }
}
