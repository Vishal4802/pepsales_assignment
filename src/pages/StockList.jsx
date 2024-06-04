import { useEffect, useState } from "react";
import Skeleton from "../components/loading";
import { Link } from "react-router-dom";

const StockList = ({ data, loading }) => {
  const [time, setTime] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time - 1);
      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  if (Object.keys(data).length === 0) {
    return (
      <div>
        <h1>Data Fetching Please Wait....</h1>
        <h2>May take atmost 45 sec ({time})</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Top NSE Stocks</h1>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "start" }}>Name</th>
            <th style={{ textAlign: "start" }}>Current Price(in Rs)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((symbol, index) => (
            <tr key={index}>
              <td>
                {loading[symbol] ? (
                  <Skeleton />
                ) : (
                  <Link to={`/stock/${symbol}`} className="link">
                    {data[symbol]?.quoteType?.longName}
                  </Link>
                )}
              </td>
              <td className="price">
                {loading[symbol] ? (
                  <Skeleton />
                ) : (
                  data[symbol]?.price?.regularMarketPrice?.raw
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
