package vn.aims.BookSeller.Repository;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@Repository
public class CartItemRepo {
    
    @PersistenceContext
    private EntityManager entityManager;
    @Transactional
    public void insertCartItem(Integer productId,Integer cartId,Integer quantity){
        entityManager.createNativeQuery("insert into schema.cartitem (cart_id,product_id,quantity) values(?,?,?)")
        .setParameter(0, cartId)
        .setParameter(1, productId)
        .setParameter(2, quantity)
        .executeUpdate();
    }
    // them mot cart itemvao gio hang 
    @Transactional
    public void deleteCartItem(Integer productId,Integer cartId){
        entityManager.createNativeQuery("delete from schema.cartitem where product_id = ? and cart_id = ?")
        .setParameter(0, productId)
        .setParameter(1, cartId)
        .executeUpdate();
    }
    @Transactional
    public void decreaseCartItem(Integer productId,Integer cartId,Integer quantity){
        entityManager.createNativeQuery("update schema.cartitem set quantity = quantity - 1 where product_id = ? and cart_id = ?")
        .setParameter(0, productId)
        .setParameter(1, cartId)
        .executeUpdate();
    }
    // public CartItem cartitem(Integer productId,Integer cartId){
    //     CartItem cartitem = entityManager.createNativeQuery("select * from ")
    // }
}
