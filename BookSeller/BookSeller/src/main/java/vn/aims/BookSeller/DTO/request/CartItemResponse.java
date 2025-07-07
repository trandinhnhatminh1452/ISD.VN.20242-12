package vn.aims.BookSeller.DTO.request;

import java.math.BigDecimal;

public class CartItemResponse {
    private Integer productId;
    private String title;
    private Integer quantity;
    private BigDecimal price;
    private String image;
    private int stock;

    public CartItemResponse() {
    }

    public CartItemResponse(Integer productId, String title, Integer quantity, BigDecimal price, String image, int stock) {
        this.productId = productId;
        this.title = title;
        this.quantity = quantity;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }
}
