package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailBook;
import vn.aims.BookSeller.Service.BookService;
import vn.aims.BookSeller.Service.OrderService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private BookService bookService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/authors")
    public List<ProductDetailBook> findBookByAuthors(@RequestBody String name){
        return this.bookService.findByAuthors(name);
    }

    @GetMapping("/all")
    public List<ProductDetailBook> findAll(){
        return this.bookService.findAll();
    }

    // Get all products with pagination
    @GetMapping("/list")
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = bookService.getAllProducts(pageable, search, category);
        return ResponseEntity.ok(products);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Optional<Product> product = bookService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get product details (book details)
    @GetMapping("/{id}/details")
    public ResponseEntity<ProductDetailBook> getProductDetails(@PathVariable Integer id) {
        Optional<ProductDetailBook> details = bookService.getProductDetails(id);
        return details.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Search products
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        List<Product> products = bookService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = bookService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    // Get related products
    @GetMapping("/{id}/related")
    public ResponseEntity<List<Product>> getRelatedProducts(@PathVariable Integer id) {
        List<Product> products = bookService.getRelatedProducts(id);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/invoice/{orderId}")
    public ResponseEntity<?> getInvoiceByOrderId(@PathVariable Integer orderId) {
        Map<String, Object> invoice = orderService.getInvoiceFromOrder(orderId);
        if (invoice == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(invoice);
    }

    @PostMapping("/order/create")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> orderData) {
        // Gọi service để tạo order từ orderData
        // (Giả sử orderService đã có hàm createOrder nhận Map hoặc bạn sẽ bổ sung sau)
        // Ở đây trả về fake orderId để FE test CORS
        Map<String, Object> result = new HashMap<>();
        result.put("orderId", 123); // TODO: thay bằng orderId thực tế sau
        return ResponseEntity.ok(result);
    }
}
