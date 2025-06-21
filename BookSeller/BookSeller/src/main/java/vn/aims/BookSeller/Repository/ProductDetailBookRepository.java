package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aims.BookSeller.Entity.ProductDetailBook;

public interface ProductDetailBookRepository extends JpaRepository<ProductDetailBook, Integer> {
    ProductDetailBook findByProductId(Integer productId);
}
