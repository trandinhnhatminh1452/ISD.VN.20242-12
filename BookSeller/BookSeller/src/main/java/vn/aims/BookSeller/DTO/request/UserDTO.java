package vn.aims.BookSeller.DTO.request;

import vn.aims.BookSeller.Entity.Role;
import vn.aims.BookSeller.Entity.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {
    private Integer id;
    private String username;
    private String email;
    private String phone;
    private Set<String> roles;
    private Integer cartId; 

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        if (user.getCart() != null) {
            this.cartId = user.getCart().getCartId();
        }
    }

    // Getters
    public Integer getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return phone;
    }
    public Set<String> getRoles() {
        return roles;
    }
    public Integer getCartId() { return cartId; } // ✅ Getter cho cartId
}
