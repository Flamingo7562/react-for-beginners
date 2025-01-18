import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onSelect = (event) => {
    console.log(event);
  };

  return (
    <div>
      <h1>COINS! {loading ? "" : `(${coins.length} coins)`} </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onSelect={onSelect}>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}

      <input type="number" placeholder="Write Your Budget" />
      <h4>You can Buy coins</h4>
    </div>
  );
}

export default App;
