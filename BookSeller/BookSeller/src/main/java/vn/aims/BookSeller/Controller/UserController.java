package vn.aims.BookSeller.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import vn.aims.BookSeller.DTO.request.LoginDTO;
import vn.aims.BookSeller.DTO.request.UserCreationDTO;
import vn.aims.BookSeller.Entity.User;
import vn.aims.BookSeller.Repository.UserRepo;
import vn.aims.BookSeller.Service.EmailService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserCreationDTO dto) {
        if (userRepo.existsByEmail(dto.getEmail())) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Email already in use")
            );
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // hash password
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        userRepo.save(user);
        emailService.sendRegistrationEmail(user.getEmail(), user.getUsername());

        return ResponseEntity.ok(
            Map.of("message", "Registered successfully!")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        User user = userRepo.findByEmail(dto.getEmail());
        if (user == null) {
            return ResponseEntity.status(401).body(
                Map.of("error", "Email không tồn tại")
            );
        }

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(
                Map.of("error", "Mật khẩu không đúng")
            );
        }

        return ResponseEntity.ok(Map.of(
            "id", user.getId(),
            "username", user.getUsername(),
            "email", user.getEmail(),
            "phone", user.getPhone(),
            "created_at", user.getCreated_at(),
            "message", "Đăng nhập thành công"
        ));
    }

}
