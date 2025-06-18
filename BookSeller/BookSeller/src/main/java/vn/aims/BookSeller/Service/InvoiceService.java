package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.DTO.request.InvoiceDTO;
import vn.aims.BookSeller.Entity.Invoice;
import vn.aims.BookSeller.Entity.Order;
import vn.aims.BookSeller.Entity.OrderItem;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Repository.InvoiceRepo;
import vn.aims.BookSeller.Repository.OrderRepo;
import vn.aims.BookSeller.Repository.ProductRepo;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private ProductRepo productRepo;

    public Invoice createInvoice(InvoiceDTO dto) {
        // 1. Tạo Order
        Order order = new Order();
        order.setName(dto.getCustomerName());
        order.setEmail(dto.getCustomerEmail());
        order.setPhone(dto.getCustomerPhone());
        order.setAddress(dto.getCustomerAddress());
        order.setProvinceCity(dto.getProvinceCity());
        order.setDeliveryFee(dto.getDeliveryFee());
        order.setVatFee(dto.getVatFee());
        order.setTotalPrice(dto.getSubtotal());
        order.setFinalAmount(dto.getTotalAmount());
        order.setStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());
        List<OrderItem> orderItems = new ArrayList<>();
        if (dto.getItems() != null) {
            for (InvoiceDTO.CartItemDTO cartItem : dto.getItems()) {
                // Kiểm tra productId không được null
                if (cartItem.getProductId() == null) {
                    System.err.println("ERROR: productId is null for cart item: " + cartItem);
                    throw new IllegalArgumentException("ProductId cannot be null");
                }
                
                System.out.println("Processing productId: " + cartItem.getProductId());
                
                OrderItem item = new OrderItem();
                item.setOrder(order);
                Product product = productRepo.findById(cartItem.getProductId()).orElse(null);
                
                if (product == null) {
                    System.err.println("ERROR: Product not found with id: " + cartItem.getProductId());
                    throw new IllegalArgumentException("Product not found with id: " + cartItem.getProductId());
                }
                
                item.setProduct(product);
                item.setQuantity(cartItem.getQuantity());
                item.setPrice(cartItem.getPrice());
                orderItems.add(item);
            }
        }
        order.setOrderItems(orderItems);
        System.out.println("orderId trước khi save: " + order.getOrderId());
        order = orderRepo.save(order);
        System.out.println("orderId sau khi save: " + order.getOrderId());
        // 2. Tạo Invoice và liên kết orderId
        Invoice invoice = new Invoice();
        invoice.setCustomerName(dto.getCustomerName());
        invoice.setCustomerEmail(dto.getCustomerEmail());
        invoice.setCustomerPhone(dto.getCustomerPhone());
        invoice.setCustomerAddress(dto.getCustomerAddress());
        invoice.setProvinceCity(dto.getProvinceCity());
        invoice.setSubtotal(dto.getSubtotal());
        invoice.setDeliveryFee(dto.getDeliveryFee());
        invoice.setVatFee(dto.getVatFee());
        invoice.setTotalAmount(dto.getTotalAmount());
        invoice.setPaymentMethod(dto.getPaymentMethod());
        invoice.setNotes(dto.getNotes());
        invoice.setInvoiceDate(LocalDateTime.now());
        invoice.setStatus("ISSUED");
        invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());
        invoice.setOrderId(order.getOrderId());
        System.out.println("orderId set vào invoice: " + invoice.getOrderId());
        return invoiceRepo.save(invoice);
    }

    public java.util.Optional<Invoice> getInvoiceById(Integer id) {
        return invoiceRepo.findById(id);
    }

    public Map<String, Object> getInvoiceDetailById(Integer id) {
        Optional<Invoice> invoiceOpt = invoiceRepo.findById(id);
        if (invoiceOpt.isEmpty()) return null;
        Invoice invoice = invoiceOpt.get();
        Map<String, Object> result = new HashMap<>();
        // Copy tất cả field của invoice sang result
        result.put("invoiceId", invoice.getInvoiceId());
        result.put("orderId", invoice.getOrderId());
        result.put("customerName", invoice.getCustomerName());
        result.put("customerEmail", invoice.getCustomerEmail());
        result.put("customerPhone", invoice.getCustomerPhone());
        result.put("customerAddress", invoice.getCustomerAddress());
        result.put("provinceCity", invoice.getProvinceCity());
        result.put("subtotal", invoice.getSubtotal());
        result.put("deliveryFee", invoice.getDeliveryFee());
        result.put("vatFee", invoice.getVatFee());
        result.put("totalAmount", invoice.getTotalAmount());
        result.put("paymentMethod", invoice.getPaymentMethod());
        result.put("notes", invoice.getNotes());
        result.put("invoiceDate", invoice.getInvoiceDate());
        result.put("status", invoice.getStatus());
        result.put("invoiceNumber", invoice.getInvoiceNumber());
        // Lấy danh sách sản phẩm nếu có orderId
        List<Map<String, Object>> items = new ArrayList<>();
        if (invoice.getOrderId() != null) {
            Optional<Order> orderOpt = orderRepo.findById(invoice.getOrderId());
            if (orderOpt.isPresent()) {
                Order order = orderOpt.get();
                for (OrderItem item : order.getOrderItems()) {
                    Product p = item.getProduct();
                    Map<String, Object> prod = new HashMap<>();
                    prod.put("title", p.getTitle());
                    prod.put("price", item.getPrice());
                    prod.put("quantity", item.getQuantity());
                    prod.put("productId", p.getProductId());
                    items.add(prod);
                }
            }
        }
        result.put("items", items);
        return result;
    }
} 