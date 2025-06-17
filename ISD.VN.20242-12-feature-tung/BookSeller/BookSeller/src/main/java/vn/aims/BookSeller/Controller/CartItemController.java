package vn.aims.BookSeller.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Service.CartItemService;

@RestController
public class CartItemController {
    @Autowired
    private CartItemService cartitemservice;
    @PostMapping("/cartitem")
    public void createCartItem(Integer productId,Integer cartId,int quantity){
         cartitemservice.createCartItem(productId,cartId,quantity);
    }
    @PostMapping("/cartitem")
    public void deleteCartItem(Integer productId,Integer cartId){
        cartitemservice.deleteCartItem(productId,cartId);
    }
    // @PostMapping("/cartitem")
    // public void decreaseCartItem(Integer productId,Integer cartId,Integer quantity){
    //     cartitemservice.decreaseCartItem(productId,cartId,quantity);
    // }

    
}
