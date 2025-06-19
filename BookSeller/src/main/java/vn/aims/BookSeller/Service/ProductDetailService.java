package vn.aims.BookSeller.Service;

import vn.aims.BookSeller.Entity.Product;

public interface ProductDetailService {
    Product getProductDetail(Integer productId);
    void saveProductDetail(Product product);
    void updateProductDetail(Product product);
    void deleteProductDetail(Integer productId);
}
