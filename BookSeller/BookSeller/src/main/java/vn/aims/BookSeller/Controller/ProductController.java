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

    // Helper method to map Product to Map<String, Object>
    private Map<String, Object> toProductMap(Product p) {
        Map<String, Object> map = new HashMap<>();
        map.put("productId", p.getProductId());
        map.put("title", p.getTitle());
        map.put("category", p.getCategory());
        map.put("description", p.getDescription());
        map.put("barcode", p.getBarcode());
        map.put("value", p.getValue());
        map.put("price", p.getPrice());
        map.put("quantity", p.getQuantity());
        map.put("entryDate", p.getEntryDate());
        map.put("dimension", p.getDimension());
        map.put("weight", p.getWeight());
        map.put("createdBy", p.getCreatedBy());
        return map;
    }

    // Get all products with pagination
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = bookService.getAllProducts(pageable, search, category);
        List<Map<String, Object>> content = products.getContent().stream().map(this::toProductMap).toList();
        Map<String, Object> result = new HashMap<>();
        result.put("content", content);
        result.put("totalPages", products.getTotalPages());
        result.put("totalElements", products.getTotalElements());
        result.put("pageNumber", products.getNumber());
        return ResponseEntity.ok(result);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProductById(@PathVariable Integer id) {
        Optional<Product> product = bookService.getProductById(id);
        return product.map(p -> ResponseEntity.ok(toProductMap(p)))
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
    public ResponseEntity<List<Map<String, Object>>> searchProducts(@RequestParam String query) {
        List<Product> products = bookService.searchProducts(query);
        List<Map<String, Object>> result = products.stream().map(this::toProductMap).toList();
        return ResponseEntity.ok(result);
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Map<String, Object>>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = bookService.getProductsByCategory(category);
        List<Map<String, Object>> result = products.stream().map(this::toProductMap).toList();
        return ResponseEntity.ok(result);
    }

    // Get related products
    @GetMapping("/{id}/related")
    public ResponseEntity<List<Map<String, Object>>> getRelatedProducts(@PathVariable Integer id) {
        List<Product> products = bookService.getRelatedProducts(id);
        List<Map<String, Object>> result = products.stream().map(this::toProductMap).toList();
        return ResponseEntity.ok(result);
    }

}
