package vn.aims.BookSeller.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.ProductDetailDVD;
import vn.aims.BookSeller.Repository.ProductDetailDVDRepository;
import vn.aims.BookSeller.Service.ProductDetailService;

@Service("dvdDetailService")
public class DVDDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailDVDRepository repository;

    @Override
    public Product getProductDetail(Integer productId) {
        ProductDetailDVD detail = repository.findById(productId).orElse(null);
        return detail != null ? detail.getProduct() : null;
    }

    @Override
    public void saveProductDetail(Product product) {
        ProductDetailDVD detail = new ProductDetailDVD();
        detail.setProduct(product);
        repository.save(detail);
    }

    @Override
    public void updateProductDetail(Product product) {
        ProductDetailDVD detail = repository.findById(product.getProductId()).orElse(null);
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
