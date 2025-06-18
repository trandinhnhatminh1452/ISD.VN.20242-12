package vn.aims.BookSeller.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.aims.BookSeller.Entity.Invoice;

@Repository
public interface InvoiceRepo extends JpaRepository<Invoice, Integer> {
} 