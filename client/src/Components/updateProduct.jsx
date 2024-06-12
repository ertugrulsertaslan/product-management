import { useState, useEffect } from "react";
import "../App.css";

const apiUrl = "http://localhost:3000/products";

function UpdateProduct() {
  const [product, setProduct] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/update/${product.id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Ürün getirme hatasi:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const editProduct = async (id) => {
    const productId = parseInt(id);
    const editedProduct = { ...product, title, description, price };

    await fetch(`${apiUrl}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
    await fetchProducts();
  };
  return (
    <>
      <div className="App">
        <div id="product-form">
          <h2>Update Product </h2>
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
          <button onClick={editProduct}>Update Product</button>
        </div>
        <h2>Product List</h2>

        <div className="product" key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="price">₺{product.price}</p>
          <button onClick={() => editProduct(product.id)}>Edit</button>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
