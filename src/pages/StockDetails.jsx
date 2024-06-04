import { useParams } from "react-router-dom";

const StockDetails = ({ data }) => {
  const { symbol } = useParams();
  const stockData = data[symbol];

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{stockData.quoteType.longName}</h1>
      <h2>Stock Details</h2>
      <ul>
        <li>
          <b>Market Cap:</b> Rs.
          {(stockData.price.marketCap.raw / 100000000000).toFixed(2)} trillion
        </li>
        <li>
          <b>Open:</b> Rs.{stockData.price.regularMarketOpen.raw}
        </li>
        <li>
          <b>High:</b> Rs.{stockData.price.regularMarketDayHigh.raw}
        </li>
        <li>
          <b>Low:</b> Rs.{stockData.price.regularMarketDayLow.raw}
        </li>
      </ul>
      <h2>Price Details</h2>
      <ul>
        <li>
          <b>Current Price:</b> Rs.{stockData.price.regularMarketPrice.raw}
        </li>
        <li>
          <b>Change:</b> Rs.
          <span
            style={{
              color:
                stockData.price.regularMarketChange.raw < 0 ? "red" : "green",
            }}
          >
            {stockData.price.regularMarketChange.raw.toFixed(2)}
          </span>
        </li>
        <li>
          <b>Change Percent: </b>
          <span
            style={{
              color:
                stockData.price.regularMarketChangePercent.raw < 0
                  ? "red"
                  : "green",
            }}
          >
            {stockData.price.regularMarketChangePercent.raw.toFixed(3)}%
          </span>
        </li>
      </ul>
    </div>
  );
};

export default StockDetails;
