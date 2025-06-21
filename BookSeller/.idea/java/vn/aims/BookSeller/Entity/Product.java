package vn.aims.BookSeller.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Category is mandatory")
    private String category;

    private String description;

    @NotBlank(message = "Barcode is mandatory")
    private String barcode;

    @NotNull(message = "Value is mandatory")
    private Double value;

    @NotNull(message = "Price is mandatory")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private Double price;

    private String entryDate;
    private String dimension;
    private Float weight;
    private String createdBy;

    // Constructors
    public Product() {}

    public Product(String title, String category, String description, String barcode, Double value, Double price) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.barcode = barcode;
        this.value = value;
        this.price = price;
    }

    // Getters and Setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }
    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getEntryDate() { return entryDate; }
    public void setEntryDate(String entryDate) { this.entryDate = entryDate; }
    public String getDimension() { return dimension; }
    public void setDimension(String dimension) { this.dimension = dimension; }
    public Float getWeight() { return weight; }
    public void setWeight(Float weight) { this.weight = weight; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}