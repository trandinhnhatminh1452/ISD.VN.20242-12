package vn.aims.BookSeller.Entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "product_detail_dvd")
public class ProductDetailDVD {

    @Id
    @Column(name = "product_id")
    private Integer productId;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JsonBackReference
    private Product product;

    @Column(name = "disc_type")
    private String discType;

    @Column(name = "director")
    private String director;

    @Column(name = "runtime")
    private Integer runtime;

    @Column(name = "genre")
    private String genre;  // Chỉ giữ 1 dòng này

    @Column(name = "studio")
    private String studio;

    @Column(name = "language")
    private String language;

    @Column(name = "subtitles")
    private String subtitles;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    // Nếu @Data không hoạt động bạn thêm thủ công:
    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getDiscType() {
        return discType;
    }

    public void setDiscType(String discType) {
        this.discType = discType;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public String getStudio() {
        return studio;
    }

    public void setStudio(String studio) {
        this.studio = studio;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getSubtitles() {
        return subtitles;
    }

    public void setSubtitles(String subtitles) {
        this.subtitles = subtitles;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
