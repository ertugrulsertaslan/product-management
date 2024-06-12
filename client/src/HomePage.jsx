import { useState, useEffect } from "react";
import "./App.css";

const apiUrl = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    const response = await fetch(apiUrl);
    const text = await response.text();
    const data = JSON.parse(text);
    setProducts(data);
  };

  return (
    <>
      <div className="App">
        <h2>Product List</h2>
        <div id="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="price">₺{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
