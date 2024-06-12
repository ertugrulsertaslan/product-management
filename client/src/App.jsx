import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
const apiUrl = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    const response = await fetch(apiUrl);
    const text = await response.text();
    const data = JSON.parse(text);
    setProducts(data);
  };
  const addProduct = async () => {
    const newProduct = { title, description, price };
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    await fetchProducts();
    setTitle("");
    setDescription("");
    setPrice(0);
  };
  const deleteProduct = async (id) => {
    const productId = parseInt(id);
    await fetch(`${apiUrl}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchProducts();
  };

  const handleUpdate = async (id) => {
    const productId = parseInt(id);
    console.log(productId);
    await fetch(`${apiUrl}/update/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      <div className="App">
        <h1>Product Management</h1>

        <div id="product-form">
          <h2>Add Product</h2>
          <label htmlFor="title">Product Name:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button onClick={addProduct}>Add Product</button>
        </div>
        <h2>Product List</h2>
        <div id="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="price">₺{product.price}</p>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              <Link to={`/products/update/${product.id}`}>
                <button onClick={() => handleUpdate(product.id)}>Edit</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
