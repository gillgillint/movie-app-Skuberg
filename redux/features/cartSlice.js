import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

const LOCAL_STORAGE_KEY = "carts";

export const counterSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        state.items = [...state.items];
        state.items[existingCartItemIndex] = updateItem;
      } else {
        state.items = state.items.concat(action.payload);
      }

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      state.totalPrice = state.totalPrice - existingCartItem.price;

      if (existingCartItem.amount === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        state.items = [...state.items];
        state.items[existingCartItemIndex] = updateItem;
      }

      state.totalAmount = state.items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },

    clearItem: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return initialState;
    },

    setItem: (state, action) => {
      return action.payload;
    },
  },
});

export const { addItem, removeItem, clearItem, setItem } = counterSlice.actions;

export default counterSlice.reducer;
