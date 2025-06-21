package vn.aims.BookSeller.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.aims.BookSeller.Service.BookGenreService;
import vn.aims.BookSeller.Service.CDGenreService;
import vn.aims.BookSeller.Service.DVDGenreService;
import vn.aims.BookSeller.Service.LPGenreService;

import java.util.List;

@RestController
@RequestMapping("/api/genre")
public class GenreController {
    
    @Autowired
    private BookGenreService bookGenreService;
    
    @Autowired
    private CDGenreService cdGenreService;
    
    @Autowired
    private DVDGenreService dvdGenreService;
    
    @Autowired
    private LPGenreService lpGenreService;

    @GetMapping("/books")
    public List<String> getBookGenres() {
        return bookGenreService.getGenres();
    }

    @GetMapping("/cds")
    public List<String> getCdGenres() {
        return cdGenreService.getGenres();
    }

    @GetMapping("/dvds")
    public List<String> getDvdGenres() {
        return dvdGenreService.getGenres();
    }

    @GetMapping("/lps")
    public List<String> getLpGenres() {
        return lpGenreService.getGenres();
    }
}
