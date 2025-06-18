package vn.aims.BookSeller.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Integer invoiceId;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "customer_address")
    private String customerAddress;

    @Column(name = "province_city")
    private String provinceCity;

    @Column(name = "subtotal")
    private BigDecimal subtotal;

    @Column(name = "delivery_fee")
    private BigDecimal deliveryFee;

    @Column(name = "vat_fee")
    private BigDecimal vatFee;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "invoice_date")
    private LocalDateTime invoiceDate;

    @Column(name = "status")
    private String status;

    @Column(name = "notes")
    private String notes;
} 