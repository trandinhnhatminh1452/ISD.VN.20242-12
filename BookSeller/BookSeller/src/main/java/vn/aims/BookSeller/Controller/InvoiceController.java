package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.DTO.request.InvoiceDTO;
import vn.aims.BookSeller.Entity.Invoice;
import vn.aims.BookSeller.Service.InvoiceService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/invoice")
@CrossOrigin(origins = "http://localhost:3000")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/create")
    public ResponseEntity<?> createInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceService.createInvoice(invoiceDTO);
        Map<String, Object> result = new HashMap<>();
        result.put("invoiceId", invoice.getInvoiceId());
        result.put("orderId", invoice.getOrderId());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Integer id) {
        Map<String, Object> detail = invoiceService.getInvoiceDetailById(id);
        if (detail == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(detail);
    }
} 