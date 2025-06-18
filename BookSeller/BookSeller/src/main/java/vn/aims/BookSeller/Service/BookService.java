package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailBook;
import vn.aims.BookSeller.Repository.BookRepo;
import vn.aims.BookSeller.Repository.ProductRepo;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepo bookRepo;
    
    @Autowired
    private ProductRepo productRepo;

    public List<ProductDetailBook> findByAuthors(String name){
        return bookRepo.findByAuthors(name);
    }

    public List<ProductDetailBook> findAll(){
        return bookRepo.findAll();
    }

    // Get all products with pagination and search
    public Page<Product> getAllProducts(Pageable pageable, String search, String category) {
        if (search != null && !search.trim().isEmpty()) {
            if (category != null && !category.trim().isEmpty()) {
                return productRepo.findByTitleContainingIgnoreCaseAndCategory(pageable, search, category);
            }
            return productRepo.findByTitleContainingIgnoreCase(pageable, search);
        } else if (category != null && !category.trim().isEmpty()) {
            return productRepo.findByCategory(pageable, category);
        }
        return productRepo.findAll(pageable);
    }

    // Get product by ID
    public Optional<Product> getProductById(Integer id) {
        return productRepo.findById(id);
    }

    // Get product details
    public Optional<ProductDetailBook> getProductDetails(Integer id) {
        return bookRepo.findById(id);
    }

    // Search products
    public List<Product> searchProducts(String query) {
        return productRepo.findByTitleContainingIgnoreCase(query);
    }

    // Get products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    // Get related products (same category, different product)
    public List<Product> getRelatedProducts(Integer productId) {
        Optional<Product> currentProduct = productRepo.findById(productId);
        if (currentProduct.isPresent()) {
            return productRepo.findByCategoryAndProductIdNot(
                currentProduct.get().getCategory(), 
                productId
            );
        }
        return List.of();
    }
}
