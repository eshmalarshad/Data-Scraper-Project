import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    try {
      setLoading(true);
      setError("");
      setProducts([]);

      const response =
        await axios.post(
          "http://localhost:5000/scrape",
          {
            username,
            password,
          }
        );

      setProducts(
        response.data.products
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>
        SauceDemo Product Scraper
      </h1>

      <input
        type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
      />

      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleScrape} disabled={loading}>
        {loading ? "Scraping..." : "Login & Scrape"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "20px", }}>
          {error}
        </p>
      )}

      <div style={{ marginTop: "30px", }}>
        {products.map(
          (product, index) => (
            <div key={index} style={{ border:"1px solid #ddd",padding: "15px" ,marginBottom: "15px",borderRadius:"8px",}}>
              <h3>
                Item Name : {product.name}
              </h3>

              <h4>
                Item Price : {product.price}
              </h4>

              <p>
                Item Description : {product.description}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;