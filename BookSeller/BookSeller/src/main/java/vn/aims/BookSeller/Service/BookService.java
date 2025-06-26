//package vn.aims.BookSeller.Service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import vn.aims.BookSeller.Entity.Product;
//import vn.aims.BookSeller.Entity.ProductDetailBook;
//import vn.aims.BookSeller.Repository.BookRepo;
//
//import java.util.List;
//
//@Service
//public class BookService {
//
//    @Autowired
//    private BookRepo bookRepo;
//
//    // Tìm kiếm theo tiêu đề sách và category, trả về Page<Product>
//    public Page<Product> findByTitleAndCategory(String title, String category, Pageable pageable) {
//        return bookRepo.findByTitleAndCategory(title, category, pageable);
//    }
//
//    // Trả về toàn bộ Product (không phân trang)
//    public List<Product> findAll() {
//        return bookRepo.findAll();
//    }
//
//    // Lấy danh sách tất cả categories
//    public List<String> getCategories() {
//        return bookRepo.findDistinctCategories();
//    }
//
//    // Phân trang và lọc theo query
//    public Page<Product> findAll(String query, Pageable pageable) {
//        return bookRepo.findAll(query, pageable);
//    }
//
//    // Tìm kiếm theo query (nếu bạn cần riêng search)
//    public Page<Product> search(String query, Pageable pageable) {
//        return bookRepo.search(query, pageable);
//    }
//
//    // Tìm product theo ID
//    public Product findById(Integer id) {
//        return bookRepo.findById(id).orElse(null);
//    }
//
//    public Page<Product> findByAuthors(String name, Pageable pageable){
//        return bookRepo.findByAuthors(name, pageable);
//    }
//
//}
