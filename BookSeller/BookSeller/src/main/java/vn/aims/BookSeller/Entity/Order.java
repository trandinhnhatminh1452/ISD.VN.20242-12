package vn.aims.BookSeller.Entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "province_city")
    private String provinceCity;

    @Column(name = "rush")
    private Boolean rush;

    @Column(name = "rush_instruction")
    private String rushInstruction;

    @Column(name = "delivery_fee")
    private Double deliveryFee;

    @Column(name = "vat_fee")
    private Double vatFee;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "final_amount")
    private Double finalAmount;

    @Column(name = "status")
    private Integer status; // 0: Chờ duyệt, 1: Đã duyệt, 2: Từ chối

    @Column(name = "created_at")
    private Timestamp createdAt;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;

    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getProvinceCity() { return provinceCity; }
    public void setProvinceCity(String provinceCity) { this.provinceCity = provinceCity; }
    public Boolean getRush() { return rush; }
    public void setRush(Boolean rush) { this.rush = rush; }
    public String getRushInstruction() { return rushInstruction; }
    public void setRushInstruction(String rushInstruction) { this.rushInstruction = rushInstruction; }
    public Double getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(Double deliveryFee) { this.deliveryFee = deliveryFee; }
    public Double getVatFee() { return vatFee; }
    public void setVatFee(Double vatFee) { this.vatFee = vatFee; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public Double getFinalAmount() { return finalAmount; }
    public void setFinalAmount(Double finalAmount) { this.finalAmount = finalAmount; }
    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
}