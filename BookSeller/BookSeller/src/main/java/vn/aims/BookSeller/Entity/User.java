package vn.aims.BookSeller.Entity;


import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Dùng IDENTITY cho PostgreSQL
    @Column(name = "user_id", nullable = false)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
     @JoinTable(
             name = "user_role",
             joinColumns=@JoinColumn(name = "user_id"),
             inverseJoinColumns=@JoinColumn(name = "role_id")
     )

    Collection<Role> roles;

    // Quan hệ 1-1 với Cart (1 user có 1 cart)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private Cart cart;

    // Quan hệ 1-n với Order (1 user có nhiều đơn hàng)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    private String email;
    private String phone;
    private Boolean status;
    @Column(name = "created_at", insertable = false, updatable = false)
    @JsonProperty("created_at")
private Timestamp created_at;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public String getPhone() {
    return phone;
}

public void setPhone(String phone) {
    this.phone = phone;
}

public Timestamp getCreated_at() {
    return created_at;
}

public void setCreated_at(Timestamp created_at) {
    this.created_at = created_at;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

}