package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Service.ProductDetailService;

@RestController
@RequestMapping("/api/product-detail")
public class ProductDetailController {

    @Autowired
@Qualifier("bookDetailService")
private ProductDetailService bookDetailService;

@Autowired
@Qualifier("cdDetailService")
private ProductDetailService cdDetailService;

@Autowired
@Qualifier("dvdDetailService")
private ProductDetailService dvdDetailService;

@Autowired
@Qualifier("lpDetailService")
private ProductDetailService lpDetailService;

    // Books
    @GetMapping("/book/{productID}")
    public Product getBookDetail(@PathVariable Integer productID) {
        return bookDetailService.getProductDetail(productID);
    }

    @PostMapping("/book")
    public void saveBookDetail(@RequestBody Product product) {
        bookDetailService.saveProductDetail(product);
    }

    @PutMapping("/book")
    public void updateBookDetail(@RequestBody Product product) {
        bookDetailService.updateProductDetail(product);
    }

    @DeleteMapping("/book/{productID}")
    public void deleteBookDetail(@PathVariable Integer productID) {
        bookDetailService.deleteProductDetail(productID);
    }

    // CDs
    @GetMapping("/cd/{productID}")
    public Product getCdDetail(@PathVariable Integer productID) {
        return cdDetailService.getProductDetail(productID);
    }

    @PostMapping("/cd")
    public void saveCdDetail(@RequestBody Product product) {
        cdDetailService.saveProductDetail(product);
    }

    @PutMapping("/cd")
    public void updateCdDetail(@RequestBody Product product) {
        cdDetailService.updateProductDetail(product);
    }

    @DeleteMapping("/cd/{productID}")
    public void deleteCdDetail(@PathVariable Integer productID) {
        cdDetailService.deleteProductDetail(productID);
    }

    // DVDs
    @GetMapping("/dvd/{productID}")
    public Product getDvdDetail(@PathVariable Integer productID) {
        return dvdDetailService.getProductDetail(productID);
    }

    @PostMapping("/dvd")
    public void saveDvdDetail(@RequestBody Product product) {
        dvdDetailService.saveProductDetail(product);
    }

    @PutMapping("/dvd")
    public void updateDvdDetail(@RequestBody Product product) {
        dvdDetailService.updateProductDetail(product);
    }

    @DeleteMapping("/dvd/{productID}")
    public void deleteDvdDetail(@PathVariable Integer productID) {
        dvdDetailService.deleteProductDetail(productID);
    }

    // LPs
    @GetMapping("/lp/{productID}")
    public Product getLpDetail(@PathVariable Integer productID) {
        return lpDetailService.getProductDetail(productID);
    }

    @PostMapping("/lp")
    public void saveLpDetail(@RequestBody Product product) {
        lpDetailService.saveProductDetail(product);
    }

    @PutMapping("/lp")
    public void updateLpDetail(@RequestBody Product product) {
        lpDetailService.updateProductDetail(product);
    }

    @DeleteMapping("/lp/{productID}")
    public void deleteLpDetail(@PathVariable Integer productID) {
        lpDetailService.deleteProductDetail(productID);
    }
}
