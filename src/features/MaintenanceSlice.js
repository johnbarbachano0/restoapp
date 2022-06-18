import { createSlice } from "@reduxjs/toolkit";
import { transformFirebaseResponse } from "../components/misc";

const initialState = {
  value: {
    maintenance: {
      categories: [],
    },
  },
};

export const MaintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    setMaintenance: (state, action) => {
      const { category } = action?.payload;
      const newCategory = transformFirebaseResponse(category, "categoryId");
      state.value.maintenance.categories = newCategory;
    },
  },
});

export const { setMaintenance } = MaintenanceSlice.actions;

export default MaintenanceSlice.reducer;
