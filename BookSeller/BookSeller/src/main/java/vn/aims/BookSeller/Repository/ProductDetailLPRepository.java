package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aims.BookSeller.Entity.ProductDetailLP;

public interface ProductDetailLPRepository extends JpaRepository<ProductDetailLP, Integer> {
    ProductDetailLP findByProductId(Integer productId);
}
