package vn.aims.BookSeller.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailCD;
import vn.aims.BookSeller.Repository.ProductDetailCDRepository;
import vn.aims.BookSeller.Service.ProductDetailService;

@Service("cdDetailService")
public class CDDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailCDRepository repository;

    @Override
    public Product getProductDetail(Integer productId) {
        ProductDetailCD detail = repository.findById(productId).orElse(null);
        return detail != null ? detail.getProduct() : null;
    }

    @Override
    public void saveProductDetail(Product product) {
        ProductDetailCD detail = new ProductDetailCD();
        detail.setProduct(product);
        repository.save(detail);
    }

    @Override
    public void updateProductDetail(Product product) {
        ProductDetailCD detail = repository.findById(product.getProductId()).orElse(null);
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
