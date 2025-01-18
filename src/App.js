import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [budget, setBudget] = useState(0);
  const [selectedCoinInfo, setSelectedCoinInfo] = useState([]);
  const [exchange, setExchange] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    setBudget(event.target.value);
  };
  const selectChange = (event) => {
    try {
      const parsedValue = JSON.parse(event.target.value);
      setSelectedCoinInfo(parsedValue);
    } catch (err) {
      console.error("Invalid JSON Format : ", err);
      setSelectedCoinInfo([]);
    }
  };

  useEffect(() => {
    if (isNaN(budget / selectedCoinInfo[1])) {
      setExchange(0);
    } else {
      setExchange(budget / selectedCoinInfo[1]);
    }
  }, [budget, selectedCoinInfo]);

  console.log("budget : ", budget);
  console.log(selectedCoinInfo);
  return (
    <div>
      <h1>COINS! {loading ? "" : `(${coins.length} coins)`} </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectChange}>
          <option value="">Select Your Coin</option>
          {coins.map((coin) => (
            <option
              key={coin.id}
              value={JSON.stringify([coin.symbol, coin.quotes.USD.price])}
            >
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <hr />
      <input
        id="budget-input"
        onChange={onChange}
        value={budget}
        type="number"
        placeholder="Write Your Budget"
      />
      <label
        htmlFor="budget-input"
        style={{ color: "tomato", fontSize: "18px" }}
      >
        {" "}
        USD $
      </label>

      <h4>
        You can Buy {exchange}
        {selectedCoinInfo.length !== 0 ? ` ${selectedCoinInfo[0]}` : " coins"}
      </h4>
    </div>
  );
}

export default App;
