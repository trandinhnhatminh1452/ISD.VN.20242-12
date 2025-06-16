package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailBook;
import vn.aims.BookSeller.Entity.ProductDetailCD;
import vn.aims.BookSeller.Entity.ProductDetailLP;
import vn.aims.BookSeller.Entity.ProductDetailDVD;
import vn.aims.BookSeller.Repository.ProductDetailBookRepository;
import vn.aims.BookSeller.Repository.ProductDetailCDRepository;
import vn.aims.BookSeller.Repository.ProductDetailLPRepository;
import vn.aims.BookSeller.Repository.ProductDetailDVDRepository;
import vn.aims.BookSeller.Service.BookService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private BookService bookService;

    @Autowired
    private ProductDetailBookRepository productDetailBookRepository;

    @Autowired
    private ProductDetailCDRepository productDetailCDRepository;

    @Autowired
    private ProductDetailLPRepository productDetailLPRepository;

    @Autowired
    private ProductDetailDVDRepository productDetailDVDRepository;

    @GetMapping("/categories")
    public List<String> getCategories() {
        return bookService.getCategories();
    }

    @GetMapping("/all")
    public Page<Product> findAll(
            @RequestParam(value = "query", defaultValue = "") String query,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "32") int size,
            @RequestParam(value = "category", required = false) String category) {

        int safePage = Math.max(0, page);
        int safeSize = Math.min(Math.max(1, size), 100);
        Pageable pageable = PageRequest.of(safePage, safeSize);

        return this.bookService.findByTitleAndCategory(query, category, pageable);
    }

    @GetMapping("/creator/{productId}")
    public ResponseEntity<String> getCreator(
            @PathVariable Integer productId) {
        Product product = bookService.findById(productId);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        String creator = "";
        String creatorType = "";

        switch (product.getCategory().toLowerCase()) {
            case "book":
                ProductDetailBook bookDetail = productDetailBookRepository.findByProductId(productId);
                if (bookDetail != null) {
                    creator = bookDetail.getAuthors();
                    creatorType = "Tác giả";
                }
                break;
            case "cd":
                ProductDetailCD cdDetail = productDetailCDRepository.findByProductId(productId);
                if (cdDetail != null) {
                    creator = cdDetail.getArtists();
                    creatorType = "Nghệ sĩ";
                }
                break;
            case "lp":
                ProductDetailLP lpDetail = productDetailLPRepository.findByProductId(productId);
                if (lpDetail != null) {
                    creator = lpDetail.getArtists();
                    creatorType = "Nghệ sĩ";
                }
                break;
            case "dvd":
                ProductDetailDVD dvdDetail = productDetailDVDRepository.findByProductId(productId);
                if (dvdDetail != null) {
                    creator = dvdDetail.getDirector();
                    creatorType = "Đạo diễn";
                }
                break;
        }

        if (creator != null && !creator.isEmpty()) {
            return ResponseEntity.ok(creatorType + ": " + creator);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public Page<Product> search(
            @RequestParam(value = "q", defaultValue = "") String query,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "32") int size) {

        int safePage = Math.max(0, page);
        int safeSize = Math.min(Math.max(1, size), 100);
        Pageable pageable = PageRequest.of(safePage, safeSize);

        return this.bookService.search(query, pageable);
    }

   @GetMapping("/{id}")
public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
    Product product = bookService.findById(id);
    return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
}


    
}
