import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    allProducts: [],
    activeProducts: [],
    inactiveProducts: [],
  },
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const { allProducts } = action?.payload;
      const activeProducts = [];
      const inactiveProducts = [];

      //filter by isDeleted
      const undeletedProducts = allProducts?.filter(
        (product) => product?.isDeleted === false
      );

      //filter by isActive
      undeletedProducts?.map((product) =>
        product?.isActive === true
          ? activeProducts?.push(product)
          : inactiveProducts?.push(product)
      );

      state.value.allProducts = undeletedProducts;
      state.value.activeProducts = activeProducts;
      state.value.inactiveProducts = inactiveProducts;
    },
    deleteProduct: (state, action) => {
      const { allProducts } = state?.value;
      const { id } = action?.payload;
      const newProducts = allProducts?.map((product) => {
        if (product?.id === id) {
          return { ...product, status: false };
        } else {
          return product;
        }
      });
      state.value.allProducts = newProducts?.filter(
        (product) => product?.status !== false
      );
    },
    updateProduct: (state, action) => {
      const { allProducts } = state?.value;
      const { editedProduct } = action?.payload;
      const newProducts = allProducts?.map((product) => {
        if (product?.id === editedProduct?.id) {
          return editedProduct;
        } else {
          return product;
        }
      });
      state.value.allProducts = newProducts.filter(
        (product) => product?.status !== false
      );
    },
    addProduct: (state, action) => {
      const { allProducts } = state?.value;
      const { newProduct } = action?.payload;
      const newProducts = [...allProducts, newProduct];
      state.value.allProducts = newProducts?.filter(
        (product) => product?.status !== false
      );
    },
  },
});

export const { setProducts, deleteProduct, updateProduct, addProduct } =
  ProductsSlice.actions;

export default ProductsSlice.reducer;
