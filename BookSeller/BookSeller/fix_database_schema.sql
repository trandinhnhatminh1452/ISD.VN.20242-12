-- Fix Database Schema for BookSeller
-- This script will update the existing database to match the new schema

-- 1. Drop existing tables in correct order (due to foreign key constraints)
DROP TABLE IF EXISTS invoice CASCADE;
DROP TABLE IF EXISTS payment_transaction CASCADE;
DROP TABLE IF EXISTS order_item CASCADE;
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS product_detail_book CASCADE;
DROP TABLE IF EXISTS product_detail_cd CASCADE;
DROP TABLE IF EXISTS product_detail_dvd CASCADE;
DROP TABLE IF EXISTS product_detail_lp CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS cart_item CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- 2. Create User table
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Role table
CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 4. Create User_Role junction table
CREATE TABLE user_role (
    user_id INT REFERENCES "user"(user_id) ON DELETE CASCADE,
    role_id INT REFERENCES role(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 5. Create Product table
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    barcode VARCHAR(100) UNIQUE,
    value NUMERIC(12,2) NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    entry_date DATE,
    dimension VARCHAR(100),
    weight FLOAT,
    created_by INT REFERENCES "user"(user_id) ON DELETE SET NULL
);

-- 6. Create Product detail tables
CREATE TABLE product_detail_book (
    product_id INT PRIMARY KEY REFERENCES product(product_id) ON DELETE CASCADE,
    authors VARCHAR(255),
    cover_type VARCHAR(50),
    publisher VARCHAR(255),
    publication_date DATE,
    pages INT,
    language VARCHAR(100),
    genre VARCHAR(100)
);

CREATE TABLE product_detail_cd (
    product_id INT PRIMARY KEY REFERENCES product(product_id) ON DELETE CASCADE,
    artists VARCHAR(255),
    record_label VARCHAR(255),
    tracklist TEXT,
    genre VARCHAR(100),
    release_date DATE
);

CREATE TABLE product_detail_dvd (
    product_id INT PRIMARY KEY REFERENCES product(product_id) ON DELETE CASCADE,
    disc_type VARCHAR(50),
    director VARCHAR(255),
    runtime INT,
    studio VARCHAR(255),
    language VARCHAR(100),
    subtitles VARCHAR(255),
    release_date DATE,
    genre VARCHAR(100)
);

CREATE TABLE product_detail_lp (
    product_id INT PRIMARY KEY REFERENCES product(product_id) ON DELETE CASCADE,
    artists VARCHAR(255),
    record_label VARCHAR(255),
    tracklist TEXT,
    genre VARCHAR(100),
    release_date DATE
);

-- 7. Create Cart table
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INT REFERENCES "user"(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create Cart item table
CREATE TABLE cart_item (
    cart_id INT REFERENCES cart(cart_id) ON DELETE CASCADE,
    product_id INT REFERENCES product(product_id),
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);

-- 9. Create Order table (using "order" with quotes to avoid reserved word conflict)
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INT REFERENCES "user"(user_id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    province_city VARCHAR(100),
    rush_order BOOLEAN DEFAULT FALSE,
    rush_time TIME,
    rush_instruction TEXT,
    delivery_fee NUMERIC(12,2),
    vat_fee NUMERIC(12,2),
    total_price NUMERIC(12,2),
    final_amount NUMERIC(12,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Create Order item table
CREATE TABLE order_item (
    order_id INT REFERENCES "order"(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES product(product_id),
    quantity INT NOT NULL,
    price NUMERIC(12,2),
    PRIMARY KEY (order_id, product_id)
);

-- 11. Create Payment transaction table
CREATE TABLE payment_transaction (
    transaction_id VARCHAR(100) PRIMARY KEY,
    order_id INT REFERENCES "order"(order_id) ON DELETE CASCADE,
    amount NUMERIC(12,2),
    content TEXT,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    payment_method VARCHAR(50)
);

-- 12. Create Invoice table
CREATE TABLE invoice (
    invoice_id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    order_id INT REFERENCES "order"(order_id) ON DELETE CASCADE,
    transaction_id VARCHAR(100) REFERENCES payment_transaction(transaction_id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_address TEXT,
    subtotal NUMERIC(12,2),
    delivery_fee NUMERIC(12,2),
    vat_fee NUMERIC(12,2),
    total_amount NUMERIC(12,2),
    payment_method VARCHAR(50),
    invoice_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ISSUED',
    notes TEXT
);

-- 13. Create indexes for better performance
CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_product_barcode ON product(barcode);
CREATE INDEX idx_order_user_id ON "order"(user_id);
CREATE INDEX idx_order_status ON "order"(status);
CREATE INDEX idx_order_number ON "order"(order_number);
CREATE INDEX idx_order_item_order_id ON order_item(order_id);
CREATE INDEX idx_order_item_product_id ON order_item(product_id);
CREATE INDEX idx_payment_transaction_order_id ON payment_transaction(order_id);
CREATE INDEX idx_payment_transaction_status ON payment_transaction(status);
CREATE INDEX idx_invoice_order_id ON invoice(order_id);
CREATE INDEX idx_invoice_transaction_id ON invoice(transaction_id);
CREATE INDEX idx_invoice_number ON invoice(invoice_number);
CREATE INDEX idx_invoice_status ON invoice(status);
CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_cart_session_id ON cart(session_id);
CREATE INDEX idx_cart_item_cart_id ON cart_item(cart_id);
CREATE INDEX idx_cart_item_product_id ON cart_item(product_id);

-- 14. Insert default roles
INSERT INTO role (name) VALUES ('ADMIN'), ('USER'), ('CUSTOMER') ON CONFLICT DO NOTHING;

-- 15. Insert default admin user (password: admin123)
INSERT INTO "user" (username, password, email, phone, status) 
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'admin@bookseller.com', '0123456789', true)
ON CONFLICT DO NOTHING;

-- 16. Assign admin role to admin user
INSERT INTO user_role (user_id, role_id) 
SELECT u.user_id, r.role_id 
FROM "user" u, role r 
WHERE u.username = 'admin' AND r.name = 'ADMIN'
ON CONFLICT DO NOTHING;

-- 17. Insert sample products for testing
INSERT INTO product (title, category, description, barcode, value, price, quantity, entry_date, dimension, weight, created_by) VALUES
('Java Programming', 'BOOK', 'Learn Java programming from scratch', '9781234567890', 250000.00, 250000.00, 50, CURRENT_DATE, '15x21cm', 0.5, 1),
('Python for Beginners', 'BOOK', 'Introduction to Python programming', '9781234567891', 200000.00, 200000.00, 30, CURRENT_DATE, '15x21cm', 0.4, 1),
('JavaScript Essentials', 'BOOK', 'Modern JavaScript development', '9781234567892', 180000.00, 180000.00, 25, CURRENT_DATE, '15x21cm', 0.3, 1)
ON CONFLICT DO NOTHING;

-- 18. Insert product details for books
INSERT INTO product_detail_book (product_id, authors, cover_type, publisher, publication_date, pages, language, genre) VALUES
(1, 'John Doe', 'Paperback', 'Tech Books Inc', '2024-01-15', 400, 'English', 'Programming'),
(2, 'Jane Smith', 'Paperback', 'Code Press', '2024-02-20', 350, 'English', 'Programming'),
(3, 'Mike Johnson', 'Paperback', 'Web Dev Books', '2024-03-10', 300, 'English', 'Programming')
ON CONFLICT DO NOTHING;

-- 19. Create a sample order for testing
INSERT INTO "order" (order_number, user_id, name, email, phone, address, province_city, delivery_fee, vat_fee, total_price, final_amount, status) VALUES
('ORD20241201001', 1, 'Nguyễn Văn A', 'nguyenvana@email.com', '0123456789', '123 Đường ABC, Quận 1', 'TP.HCM', 50000.00, 25000.00, 500000.00, 575000.00, 'pending')
ON CONFLICT DO NOTHING;

-- 20. Create sample order items
INSERT INTO order_item (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 250000.00)
ON CONFLICT DO NOTHING;

-- 21. Create sample payment transaction
INSERT INTO payment_transaction (transaction_id, order_id, amount, content, status, payment_method) VALUES
('TXN123456', 1, 575000.00, 'Payment for order #1', 'PENDING', 'CASH')
ON CONFLICT DO NOTHING;

-- 22. Create sample invoice
INSERT INTO invoice (invoice_number, order_id, transaction_id, customer_name, customer_email, customer_phone, customer_address, subtotal, delivery_fee, vat_fee, total_amount, payment_method, status, notes) VALUES
('INV-20241201143022', 1, 'TXN123456', 'Nguyễn Văn A', 'nguyenvana@email.com', '0123456789', '123 Đường ABC, Quận 1, TP.HCM', 500000.00, 50000.00, 25000.00, 575000.00, 'CASH', 'ISSUED', 'Hóa đơn test')
ON CONFLICT DO NOTHING;

-- 23. Display success message
SELECT 'Database schema has been successfully updated!' as message; 