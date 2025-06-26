package vn.aims.BookSeller.Service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Repository.ProductRepo;
import jakarta.validation.Valid;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepo repo;

    public ProductService(ProductRepo repo) {
        this.repo = repo;
    }

    public List<Product> findAll() {
        return repo.findAll();
    }

    public Product findById(Integer id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }

    public Product save(@Valid Product product) {
        return repo.save(product);
    }

    public Product update(Integer id, @Valid Product updatedProduct) {
        Product existing = findById(id);
        BeanUtils.copyProperties(updatedProduct, existing, "productId");
        return repo.save(existing);
    }

    public void delete(Integer id) {
        repo.deleteById(id);
    }
}