package vn.aims.BookSeller.DTO.request;

import jakarta.validation.constraints.NotNull;

public class CartItemRequest {
    @NotNull
    private Integer product_id;
    private Integer cart_id;
    private Integer quantity;

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getCart_id() {
        return cart_id;
    }

    public void setCart_id(int cart_id) {
        this.cart_id = cart_id;
    }
}
