package vn.aims.BookSeller.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import vn.aims.BookSeller.Entity.Product;

import java.util.List;

public interface BookRepo extends JpaRepository<Product, Integer> {

    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findDistinctCategories();

    @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Product> findByAuthors(@Param("name") String name, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> findAll(@Param("query") String query, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) AND (LOWER(p.category) = LOWER(:category) OR :category IS NULL)")
    Page<Product> findByTitleAndCategory(@Param("query") String query, @Param("category") String category, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Product> search(@Param("query") String query, Pageable pageable);

}
