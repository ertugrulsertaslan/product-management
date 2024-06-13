import { useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";

const apiUrl = "http://localhost:3000/customer/products";

function detailProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [product]);

  const fetchProduct = async () => {
    const productId = id;
    try {
      const response = await fetch(`${apiUrl}/detail/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Product delivery error:", error);
    }
  };

  return (
    <>
      <div className="App">
        <div id="product-form">
          <h2>Detail</h2>
          <div className="product" key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">₺{product.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default detailProduct;
