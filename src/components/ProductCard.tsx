import { useDispatch } from "react-redux";
import { toggleLike, removeProduct } from "../store/productsSlice";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.substring(0, 100)}...</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleLike(product.id));
        }}
      >
        {product.liked ? "Unlike" : "Like"}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(removeProduct(product.id));
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
