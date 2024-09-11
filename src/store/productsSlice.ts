import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: JSON.parse(localStorage.getItem("products") || "[]") as Product[],
  },
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (p: Product) => p.id === action.payload
      );
      if (product) {
        product.liked = !product.liked;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (p: Product) => p.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const {
  setProducts,
  toggleLike,
  removeProduct,
  addProduct,
  updateProduct,
} = productSlice.actions;
export default productSlice.reducer;
