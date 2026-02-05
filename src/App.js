import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [search, setSearch] = useState("");

  /* ===============================
     FETCH USING ASYNC / AWAIT
  =============================== */
  async function fetchDataAsync() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  }

  /* ===============================
     FETCH USING .then()
  =============================== */
  function fetchDataThen() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
      })
      .catch((error) => console.log(error));
  }

  /* ===============================
     CALL API ON PAGE LOAD
  =============================== */
  useEffect(() => {
    fetchDataAsync();      // async / await
    // fetchDataThen();    // .then() (marks ku)
  }, []);

  /* ===============================
     SEARCH FILTER
  =============================== */
  const filteredData = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  /* ===============================
     SORT FUNCTIONS
  =============================== */
  function sortByMarketCap() {
    const sorted = [...cryptoData].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    setCryptoData(sorted);
  }

  function sortByPercentage() {
    const sorted = [...cryptoData].sort(
      (a, b) =>
        b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setCryptoData(sorted);
  }

  return (
    <div className="App">
      <h2>Crypto Market</h2>

      <input
        type="text"
        placeholder="Search by name or symbol"
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <button onClick={sortByMarketCap}>Sort by Market Cap</button>
      <button onClick={sortByPercentage}>Sort by % Change</button>

      <br /><br />

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price ($)</th>
            <th>Total Volume</th>
            <th>Market Cap</th>
            <th>24h % Change</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} width="30" />
              </td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.current_price}</td>
              <td>{coin.total_volume}</td>
              <td>{coin.market_cap}</td>
              <td>{coin.price_change_percentage_24h?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
