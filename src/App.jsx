import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "./redux/stockSlice";
import StockDetails from "./pages/StockDetails";
import StockList from "./pages/StockList";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stocks.data);
  const loading = useSelector((state) => state.stocks.loading);

  useEffect(() => {
    const symbols = [
      "RELIANCE.NS",
      "TCS.NS",
      "HDFCBANK.NS",
      "HDFCLIFE.NS",
      "HDFC.NS",
      "INFY.NS",
      "SBIN.NS",
      "ICICIBANK.NS",
      "BAJFINANCE.NS",
      "Bajaj-Auto.NS",
      "ASIANPAINT.NS",
      "HEROMOTOCO.NS",
      "M&M.NS",
      "KOTAKBANK.NS",
      "ITC.NS",
      "HINDUNILVR.NS",
      "NTPC.NS",
      "TATAMOTORS.NS",
      "BAJAJFINSV.NS",
      "SUNPHARMA.NS",
    ];
    dispatch(fetchStatistics(symbols));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockList data={data} loading={loading} />} />
        <Route path="/stock/:symbol" element={<StockDetails data={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
