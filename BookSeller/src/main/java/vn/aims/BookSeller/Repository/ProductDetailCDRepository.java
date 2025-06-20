package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aims.BookSeller.Entity.ProductDetailCD;

public interface ProductDetailCDRepository extends JpaRepository<ProductDetailCD, Integer> {
    ProductDetailCD findByProductId(Integer productId);
}
