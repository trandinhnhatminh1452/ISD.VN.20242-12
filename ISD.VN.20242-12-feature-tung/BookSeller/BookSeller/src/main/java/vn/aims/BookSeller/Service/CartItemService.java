package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Repository.ProductRepo;
import vn.aims.BookSeller.Repository.CartItemRepo;
public class CartItemService {
    
    @Autowired
    private CartItemRepo cartitemRepo;

    @Autowired
    private ProductRepo productRepo;

    public void createCartItem(Integer productId,Integer cartId,int quantity){
        if(quantity < productRepo.findByProductId(productId).getQuantity()){
            int a = quantity - productRepo.findByProductId(productId).getQuantity();
            cartitemRepo.insertCartItem(cartId, productId,a);
        }
    }
    public void deleteCartItem(Integer productId,Integer cartId){
        cartitemRepo.deleteCartItem(productId, cartId);
    }
    // public void decreaseCartItem(Integer productId,Integer cartId,Integer quantity){
    //     if()
    // }
    
}
