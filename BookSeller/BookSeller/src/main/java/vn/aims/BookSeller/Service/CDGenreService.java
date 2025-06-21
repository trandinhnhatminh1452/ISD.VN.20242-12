package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.ProductDetailCD;
import vn.aims.BookSeller.Repository.BookRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CDGenreService implements GenreService {
    @Autowired
    private BookRepo bookRepo;

    @Override
    public List<String> getGenres() {
        return bookRepo.findAll()
                .stream()
                .filter(product -> product.getProductDetailCD() != null)
                .map(product -> {
                    String genre = product.getProductDetailCD().getGenre();
                    return genre != null ? genre.trim() : null;
                })
                .filter(genre -> genre != null && !genre.isEmpty())
                .distinct()
                .collect(Collectors.toList());
    }
}
