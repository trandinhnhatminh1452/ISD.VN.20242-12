package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aims.BookSeller.Entity.ProductDetailDVD;

public interface ProductDetailDVDRepository extends JpaRepository<ProductDetailDVD, Integer> {
    ProductDetailDVD findByProductId(Integer productId);
}
