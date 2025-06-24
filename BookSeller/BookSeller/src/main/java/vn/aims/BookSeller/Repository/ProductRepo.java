package vn.aims.BookSeller.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.aims.BookSeller.Entity.Product;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    
    // Find products by title containing search term (case insensitive)
    Page<Product> findByTitleContainingIgnoreCase(Pageable pageable, String title);
    
    // Find products by category
    Page<Product> findByCategory(Pageable pageable, String category);
    
    // Find products by title and category
    Page<Product> findByTitleContainingIgnoreCaseAndCategory(Pageable pageable, String title, String category);
    
    // Find products by title containing search term (case insensitive) - for search
    List<Product> findByTitleContainingIgnoreCase(String title);
    
    // Find products by category - for category filter
    List<Product> findByCategory(String category);
    
    // Find products by category excluding current product - for related products
    List<Product> findByCategoryAndProductIdNot(String category, Integer productId);
    
    // Find products by category with limit
    @Query("SELECT p FROM Product p WHERE p.category = :category ORDER BY p.productId DESC")
    List<Product> findTopByCategoryOrderByProductIdDesc(@Param("category") String category, Pageable pageable);
} 