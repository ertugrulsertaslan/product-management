import { useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
const apiUrl = "http://localhost:3000/products";
function UpdateProduct() {
  const [product, setProduct] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [product]);

  const fetchProduct = async () => {
    const productId = id;
    try {
      const response = await fetch(`${apiUrl}/update/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Product delivery error:", error);
    }
  };
  const editProduct = async (id) => {
    const productId = parseInt(id);

    if (title && description && price) {
      const editedProduct = { ...product, title, description, price };
      await fetch(`${apiUrl}/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
      await fetchProduct();
    } else {
      console.error("Cannot be null", error);
    }
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
          <button onClick={() => editProduct(product.id)}>
            Update Product
          </button>
        </div>
        <h2>Product List</h2>

        <div className="product" key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="price">₺{product.price}</p>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
