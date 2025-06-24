package vn.aims.BookSeller.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailBook;
import vn.aims.BookSeller.Repository.ProductDetailBookRepository;
import vn.aims.BookSeller.Service.ProductDetailService;

@Service("bookDetailService")
public class BookDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailBookRepository repository;

    @Override
    public Product getProductDetail(Integer productId) {
        ProductDetailBook detail = repository.findById(productId).orElse(null);
        return detail != null ? detail.getProduct() : null;
    }

    @Override
    public void saveProductDetail(Product product) {
        ProductDetailBook detail = new ProductDetailBook();
        detail.setProduct(product);
        repository.save(detail);
    }

    @Override
    public void updateProductDetail(Product product) {
        ProductDetailBook detail = repository.findById(product.getProductId()).orElse(null);
        if (detail != null) {
            detail.setProduct(product);
            repository.save(detail);
        }
    }

    @Override
    public void deleteProductDetail(Integer productId) {
        repository.deleteById(productId);
    }
}
