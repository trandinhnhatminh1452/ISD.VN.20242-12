package vn.aims.BookSeller.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @NotBlank(message = "Title is mandatory")
    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @NotBlank(message = "Category is mandatory")
    @Column(name = "category", length = 50, nullable = false)
    private String category;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "barcode is mandatory") // Sửa tên cột nếu cần
    @Column(name = "barcode", length = 100, nullable = false)
    private String barcode;

    @NotNull(message = "Value is mandatory")
    @Column(name = "value", precision = 12, scale = 2, nullable = false)
    private BigDecimal value; // Giá trị gốc của sản phẩm

    @NotNull(message = "Price is mandatory")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    @Column(name = "price", precision = 12, scale = 2, nullable = false)
    private BigDecimal price; // Giá bán hiện tại của sản phẩm

    @NotNull(message = "Quantity is mandatory")
    @Column(name = "quantity", nullable = false)
    private Integer quantity; // Số lượng tồn kho

    @Column(name = "entry_date")
    private LocalDate entryDate;

    @Column(name = "dimension", length = 100)
    private String dimension;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "created_by")
    private Integer createdBy;

    @JsonIgnore
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();

    // Constructors
    public Product() {}

    public Product(String title, String category, String description, String barcode, BigDecimal value, BigDecimal price, Integer quantity) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.barcode = barcode;
        this.value = value;
        this.price = price;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }
    public BigDecimal getValue() { return value; }
    public void setValue(BigDecimal value) { this.value = value; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public LocalDate getEntryDate() { return entryDate; }
    public void setEntryDate(LocalDate entryDate) { this.entryDate = entryDate; }
    public String getDimension() { return dimension; }
    public void setDimension(String dimension) { this.dimension = dimension; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public Integer getCreatedBy() { return createdBy; }
    public void setCreatedBy(Integer createdBy) { this.createdBy = createdBy; }

    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
}