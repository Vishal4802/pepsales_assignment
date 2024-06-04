import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStatistics = createAsyncThunk(
  "stocks/fetchStatistics",
  async (symbols) => {
    const data = {};
    for (const symbol of symbols) {
      const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics?region=IN&symbol=${symbol}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        data[symbol] = result;
      } catch (error) {
        console.error(error);
      }
    }
    return data;
  },
);

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    data: {},
    loading: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state, action) => {
        const symbols = action.meta.arg;
        symbols.forEach((symbol) => {
          state.loading[symbol] = true;
        });
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        const symbols = Object.keys(action.payload);
        symbols.forEach((symbol) => {
          state.loading[symbol] = false;
        });
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        const symbols = action.meta.arg;
        symbols.forEach((symbol) => {
          state.loading[symbol] = false;
        });
      });
  },
});

export default stockSlice.reducer;
