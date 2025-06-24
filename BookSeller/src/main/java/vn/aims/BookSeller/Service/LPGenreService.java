package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.ProductDetailLP;
import vn.aims.BookSeller.Repository.BookRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LPGenreService implements GenreService {
    @Autowired
    private BookRepo bookRepo;

    @Override
    public List<String> getGenres() {
        return bookRepo.findAll()
                .stream()
                .filter(product -> product.getProductDetailLP() != null)
                .map(product -> product.getProductDetailLP().getGenre())
                .filter(genre -> genre != null && !genre.isEmpty())
                .distinct()
                .collect(Collectors.toList());
    }
}
