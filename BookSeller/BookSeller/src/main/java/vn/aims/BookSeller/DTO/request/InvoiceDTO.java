package vn.aims.BookSeller.DTO.request;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class InvoiceDTO {
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private String provinceCity;
    private BigDecimal subtotal;
    private BigDecimal deliveryFee;
    private BigDecimal vatFee;
    private BigDecimal totalAmount;
    private String paymentMethod;
    private String notes;
    private List<CartItemDTO> items;

    @Data
    public static class CartItemDTO {
        private Integer productId;
        private Integer quantity;
        private BigDecimal price;
    }
} 