import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productsSlice";
import { useNavigate } from "react-router-dom";
import styles from "./styles/createProduct.module.css";

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setError("Все поля обязательны для заполнения!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      description,
      image,
      liked: false,
    };

    dispatch(addProduct(newProduct));
    navigate("/products");
  };

  return (
    <div className={styles.createProduct}>
      <h2>Создать продукт</h2>
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
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
