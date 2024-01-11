import {
  configureStore,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { City } from "~/app/lib/typings.d";

export interface Query {
  selectedAction: string;
  selectedSubAction: string;
  selectedItem: string;
  selectedPrice: string;
  selectedWhere: string;
  selectedCity: City;
}

const initialState = {
  selectedAction: "search",
  item: "",
  selectedSubAction: "lt",
  selectedPrice: "",
  selectedWhere: "in",
  selectedCity: { name: "" },
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSelectedAction: (state, action: PayloadAction<string>) => {
      state.selectedAction = action.payload;
    },
    setItem: (state, action: PayloadAction<string>) => {
      state.item = action.payload;
    },
    setSelectedSubAction: (state, action: PayloadAction<string>) => {
      state.selectedSubAction = action.payload;
    },
    setSelectedPrice: (state, action: PayloadAction<string>) => {
      state.selectedPrice = action.payload;
    },
    setSelectedWhere: (state, action: PayloadAction<string>) => {
      state.selectedWhere = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    query: querySlice.reducer,
  },
});

export const {
  setSelectedAction,
  setItem,
  setSelectedSubAction,
  setSelectedPrice,
  setSelectedWhere,
  setSelectedCity,
} = querySlice.actions;

// Export reducer
export default querySlice.reducer;
