import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ProductCard from "./ProductCard";

const FilteredProductList = () => {
  const product = useSelector((state: RootState) => state.products.products);
  const [filter, setFilter] = useState<"all" | "liked">("all");

  const filteredProducts = product.filter((product) =>
    filter === "all" ? true : product.liked
  );

  return (
    <div>
      <button onClick={() => setFilter("all")}>Все</button>
      <button onClick={() => setFilter("liked")}>Избранное</button>
      <div>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FilteredProductList;
