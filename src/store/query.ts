import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type City } from "~/app/lib/typings.d";

export interface Query {
  selectedAction: string;
  selectedItem: string;
  selectedCity: City;
}

const initialState = {
  selectedAction: "search",
  item: "",
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

export const { setSelectedAction, setItem, setSelectedCity } =
  querySlice.actions;

// Export reducer
export default querySlice.reducer;
