package vn.aims.BookSeller.Service;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Repository.ProductRepository;
import jakarta.validation.Valid;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> findAll() {
        return repo.findAll();
    }

    public Product findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }

    public Product save(@Valid Product product) {
        return repo.save(product);
    }

    public Product update(Long id, @Valid Product updatedProduct) {
        Product existing = findById(id);
        BeanUtils.copyProperties(updatedProduct, existing, "productId");
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}