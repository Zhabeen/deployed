import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, toggleLike, removeProduct } from "../store/productsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import styles from "./styles/productList.module.css";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

interface ProductListProps {
  showFavorites: boolean;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
};
localStorage.clear();
const ProductList: React.FC<ProductListProps> = ({ showFavorites }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      dispatch(setProducts(JSON.parse(storedProducts)));
    } else {
      fetchProducts()
        .then((data) => {
          const formattedData = data.map((product: any) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            image: product.image,
            liked: false,
          }));
          dispatch(setProducts(formattedData));
          localStorage.setItem("products", JSON.stringify(formattedData));
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [dispatch]);

  const handleToggleLike = useCallback(
    (id: number) => {
      dispatch(toggleLike(id));
    },
    [dispatch]
  );

  const handleRemoveProduct = useCallback(
    (id: number) => {
      dispatch(removeProduct(id));
    },
    [dispatch]
  );

  const handleCardClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const filteredProducts = showFavorites
    ? products.filter((product: Product) => product.liked)
    : products;

  if (!products) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {filteredProducts.length === 0 ? (
        <p>No Favrite Products</p>
      ) : (
        filteredProducts.map((product: Product) => (
          <div key={product.id} className={styles.card}>
            <div
              onClick={() => handleCardClick(product.id)}
              className={styles.productList}
            >
              <img
                src={product.image}
                alt={product.title}
                className={styles.productListImage}
              />
              <div className={styles.productListContent}>
                <h3 className={styles.productListTitle}>{product.title}</h3>
                <p className={styles.productListDescription}>
                  {product.description}
                </p>
              </div>
              <div className={styles.buttonsContainer}>
                <button
                  className={product.liked ? styles.liked : styles.unlike}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(product.id);
                  }}
                >
                  {product.liked ? "Like" : "Like"}
                </button>
                <button
                  className={styles.edit}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-product/${product.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.removed}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveProduct(product.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
