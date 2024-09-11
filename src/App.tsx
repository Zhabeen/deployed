import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/productList";
import ProductDetail from "./components/ProductDetail";
import Header from "./components/Header";
import { useState } from "react";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

const App = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <Router>
      <Header
        showFavorites={showFavorites}
        toggleShowFavorites={toggleShowFavorites}
      />
      <Routes>
        <Route
          path="/products"
          element={<ProductList showFavorites={showFavorites} />}
        />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};
export default App;
