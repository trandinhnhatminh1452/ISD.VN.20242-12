package vn.aims.BookSeller.Entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.math.BigDecimal;

@Entity
@Table(name = "\"order\"")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name", length = 25)
    private String name;

    @Column(name = "email", length = 25)
    private String email;

    @Column(name = "phone", length = 12)
    private String phone;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;

    @Column(name = "province_city", length = 100)
    private String provinceCity;

    @Column(name = "rush_order")
    private Boolean rushOrder;

    @Column(name = "rush_time", columnDefinition = "time without time zone")
    private String rushTime;

    @Column(name = "rush_instruction", columnDefinition = "TEXT")
    private String rushInstruction;

    @Column(name = "delivery_fee", precision = 12, scale = 2)
    private BigDecimal deliveryFee;

    @Column(name = "vat_fee", precision = 12, scale = 2)
    private BigDecimal vatFee;

    @Column(name = "total_price", precision = 12, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "final_amount", precision = 12, scale = 2)
    private BigDecimal finalAmount;

    @Column(name = "status", length = 5)
    private String status;


    @Column(name = "created_at", columnDefinition = "timestamp with time zone")
    private Timestamp createdAt;

    // Getters and Setters
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getProvinceCity() { return provinceCity; }
    public void setProvinceCity(String provinceCity) { this.provinceCity = provinceCity; }
    public Boolean getRushOrder() { return rushOrder; }
    public void setRushOrder(Boolean rushOrder) { this.rushOrder = rushOrder; }
    public String getRushTime() { return rushTime; }
    public void setRushTime(String rushTime) { this.rushTime = rushTime; }
    public String getRushInstruction() { return rushInstruction; }
    public void setRushInstruction(String rushInstruction) { this.rushInstruction = rushInstruction; }
    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }
    public BigDecimal getVatFee() { return vatFee; }
    public void setVatFee(BigDecimal vatFee) { this.vatFee = vatFee; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
    public BigDecimal getFinalAmount() { return finalAmount; }
    public void setFinalAmount(BigDecimal finalAmount) { this.finalAmount = finalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

 
}