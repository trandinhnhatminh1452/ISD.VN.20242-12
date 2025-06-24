package vn.aims.BookSeller.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aims.BookSeller.Entity.ProductDetailDVD;
import vn.aims.BookSeller.Repository.BookRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DVDGenreService implements GenreService {
    @Autowired
    private BookRepo bookRepo;

    @Override
    public List<String> getGenres() {
        return bookRepo.findAll()
                .stream()
                .filter(product -> product.getProductDetailDVD() != null)
                .map(product -> product.getProductDetailDVD().getGenre())
                .filter(genre -> genre != null && !genre.isEmpty())
                .distinct()
                .collect(Collectors.toList());
    }
}
