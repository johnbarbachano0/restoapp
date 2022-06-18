import { configureStore } from "@reduxjs/toolkit";
import AppearanceReducer from "../features/Appearance";
import authReducer from "../features/AuthSlice";
import productReducer from "../features/ProductsSlice";
import maintenanceReducer from "../features/MaintenanceSlice";
import { authApi } from "../services/AuthService";
import { productApi } from "../services/ProductService";
import { maintenanceApi } from "../services/MaintenanceService";

export const store = configureStore({
  reducer: {
    appearance: AppearanceReducer,
    auth: authReducer,
    product: productReducer,
    maintenance: maintenanceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(maintenanceApi.middleware),
});
