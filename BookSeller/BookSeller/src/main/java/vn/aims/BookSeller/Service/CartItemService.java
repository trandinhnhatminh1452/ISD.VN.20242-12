package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.hibernate.exception.ConstraintViolationException; 
import jakarta.persistence.PersistenceException;
import org.springframework.dao.DataIntegrityViolationException;
import java.util.List;
import vn.aims.BookSeller.Entity.CartItem;
import vn.aims.BookSeller.Entity.Product;
import vn.aims.BookSeller.Repository.ProductRepo;
import vn.aims.BookSeller.Repository.CartItemRepo;
@Service
public class CartItemService {
    
    @Autowired
    private CartItemRepo cartitemRepo;

    @Autowired
    private ProductRepo productRepo;


    public void createCartItem(Integer productId, Integer cartId, int quantity) {
    Product product = productRepo.findByProductId(productId);

    if (product == null) {
        throw new IllegalArgumentException("Sản phẩm không tồn tại: product_id = " + productId);
    }

    if (quantity <= 0) {
        throw new IllegalArgumentException("Số lượng không hợp lệ: " + quantity);
    }

    if (quantity > product.getQuantity()) {
        throw new IllegalArgumentException("Số lượng vượt quá hàng tồn kho.");
    }

    try {
        
        cartitemRepo.insertCartItem(cartId, productId, quantity);
    } catch (DataIntegrityViolationException e) {
        
        cartitemRepo.increaseCartItem(cartId, productId);
    }
}
    
    public void deleteCartItem(Integer productId,Integer cartId){
        cartitemRepo.deleteCartItem(productId, cartId);
    }
    
     public void decreaseCartItem(Integer productId,Integer cartId){
         cartitemRepo.decreaseCartItem(productId,cartId);
     }
     public void increaseCartItem(Integer productId,Integer cartId){
        cartitemRepo.increaseCartItem(productId, cartId);
     }

    public List<CartItem> getCartItemsByCartId(Integer cartId) {
    return cartitemRepo.getCartItemsByCartId(cartId);
}
}


