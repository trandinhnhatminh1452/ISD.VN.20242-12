package vn.aims.BookSeller.Entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "product_detail_cd")
public class ProductDetailCD {

    @Id
    @Column(name = "product_id")
    private Integer productId;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JsonBackReference
    private Product product;

    @Column(name = "genre")
    private String genre;

    @Column(name = "artists")
    private String artists;

    @Column(name = "record_label")
    private String recordLabel;

    @Column(name = "tracklist")
    private String tracklist;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getArtists() {
        return artists;
    }

    public void setArtists(String artists) {
        this.artists = artists;
    }

    public String getRecordLabel() {
        return recordLabel;
    }

    public void setRecordLabel(String recordLabel) {
        this.recordLabel = recordLabel;
    }

    public String getTracklist() {
        return tracklist;
    }

    public void setTracklist(String tracklist) {
        this.tracklist = tracklist;
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

