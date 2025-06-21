package vn.aims.BookSeller.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailLP;
import vn.aims.BookSeller.Repository.ProductDetailLPRepository;
import vn.aims.BookSeller.Service.ProductDetailService;

@Service("lpDetailService")
public class LPDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailLPRepository repository;

    @Override
    public Product getProductDetail(Integer productId) {
        ProductDetailLP detail = repository.findById(productId).orElse(null);
        return detail != null ? detail.getProduct() : null;
    }

    @Override
    public void saveProductDetail(Product product) {
        ProductDetailLP detail = new ProductDetailLP();
        detail.setProduct(product);
        repository.save(detail);
    }

    @Override
    public void updateProductDetail(Product product) {
        ProductDetailLP detail = repository.findById(product.getProductId()).orElse(null);
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
