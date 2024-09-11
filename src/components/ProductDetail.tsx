import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import styles from "./styles/productDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className={styles.productDetail}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
