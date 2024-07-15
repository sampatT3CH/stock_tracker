import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    data: [],
    selectedSymbol: 'GOOG',
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedSymbol: (state, action) => {
      state.selectedSymbol = action.payload;
    },
  },
});

export const { setData, setSelectedSymbol } = stockSlice.actions;

const store = configureStore({
  reducer: {
    stocks: stockSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
