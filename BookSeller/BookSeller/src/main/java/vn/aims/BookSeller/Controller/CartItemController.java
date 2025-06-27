package vn.aims.BookSeller.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aims.BookSeller.DTO.request.CartItemRequest;
import vn.aims.BookSeller.Entity.Cart;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Entity.User;
import vn.aims.BookSeller.Repository.UserRepo;
import vn.aims.BookSeller.Service.CartItemService;
import vn.aims.BookSeller.Service.UserServiceImpl;

@RestController
@RequestMapping("/api/cartitem")
public class CartItemController {
    @Autowired
    private CartItemService cartitemservice;
    @Autowired
    private UserServiceImpl userService;
    @PostMapping("/cartitem")
    public void createCartItem(@RequestBody CartItemRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Truy xuất user và cart
        User user = userService.findByUsername(username);
        Cart cart = user.getCart();
         cartitemservice.createCartItem(request.getProduct_id(),cart.getCartId(),request.getQuantity());
    }
    @PostMapping("/cartitem1")
    public void deleteCartItem(@RequestBody CartItemRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Truy xuất user và cart
        User user = userService.findByUsername(username);
        Cart cart = user.getCart();
        cartitemservice.deleteCartItem(request.getProduct_id(),cart.getCartId());
    }
    @PostMapping("/cartitem2")
    public void decreaseCartItem(@RequestBody CartItemRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Truy xuất user và cart
        User user = userService.findByUsername(username);
        Cart cart = user.getCart();
        cartitemservice.decreaseCartItem(request.getProduct_id(),cart.getCartId());
    }
    @PostMapping("/cartitem3")
    public void increaseCartItem(@RequestBody CartItemRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Truy xuất user và cart
        User user = userService.findByUsername(username);
        Cart cart = user.getCart();
        cartitemservice.increaseCartItem(request.getProduct_id(),cart.getCartId());
    }

    
}
