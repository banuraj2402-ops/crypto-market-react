import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

 
  const fetchDataAsync = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchDataThen = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    fetchDataAsync();
  }, []);


  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // ↕ SORT
  const sortByMarketCap = () => {
    const sorted = [...coins].sort((a, b) => b.market_cap - a.market_cap);
    setCoins(sorted);
  };

  const sortByChange = () => {
    const sorted = [...coins].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setCoins(sorted);
  };

  return (
    <div className="App">
      <h1>Crypto Market</h1>

      <input
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <button onClick={fetchDataThen}>Fetch using .then()</button>
      <button onClick={sortByMarketCap}>Sort by Market Cap</button>
      <button onClick={sortByChange}>Sort by % Change</button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price ($)</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} width="30" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.current_price}</td>
              <td>{coin.total_volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
