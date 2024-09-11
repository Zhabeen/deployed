import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import styles from "./styles/createProduct.module.css";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError("Все поля обязательны для заполнгения!");
      return;
    }
    if (product?.id !== undefined) {
      const updatedProduct = {
        id: product?.id,
        title,
        description,
        image,
        liked: product?.liked || false,
      };
      dispatch(updateProduct(updatedProduct));
      navigate("/products");
    } else {
      setError("Продукт не найден");
    }
  };

  return (
    <div className={styles.createProduct}>
      <h2>Редактировать продукт</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Название продукта</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Описание продукта</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Ссылка на изображение</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Редактировать
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
