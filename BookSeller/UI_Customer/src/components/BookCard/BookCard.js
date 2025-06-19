import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa"; // Add cart icon
import "./BookCard.scss";

// Function to format price with thousand separator
const formatPrice = (price) => {
  if (!price) return 0;
  return new Intl.NumberFormat("vi-VN").format(price);
};

const BookCard = ({ book, index }) => {
  const { addToCart } = useCart();
  // Ưu tiên productId, sau đó id, cuối cùng là index+1
  const productId = book.productId || book.id || (index !== undefined ? index + 1 : undefined);

  // Debug log
  console.log("BookCard received book:", book);
  console.log("ProductId extracted:", productId);

  // Placeholder image if no image available
  const imageUrl = book.imageUrl || "/placeholder-book.jpg";

  const handleAddToCart = () => {
    const cartBook = {
      ...book,
      id: productId,
      productId: productId
    };
    addToCart(cartBook);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${productId}`}>
        <img
          src={imageUrl}
          alt={book.title || "Unknown Title"}
          onError={(e) => {
            e.target.src = "/placeholder-book.jpg";
          }}
        />
      </Link>
      <div className="book-details">
        <h3>{book.title || "Unknown Title"}</h3>
        <div className="price-cart">
          <p className="price">{formatPrice(book.price || 0)} VND</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
