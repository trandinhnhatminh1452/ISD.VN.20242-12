package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;

import vn.aims.BookSeller.Repository.ProductRepo;
import vn.aims.BookSeller.Entity.Product;
public class ProductService {
    

    @Autowired
    private ProductRepo productRepo;

    public Product findByProductId(int productId){
        return productRepo.findByProductId(productId);
    }
}
