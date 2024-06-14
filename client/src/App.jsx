import { useState, useEffect } from "react";
import { Container, Button, TextField } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, CardMedia } from "@mui/material";

import "./App.css";
import { Link } from "react-router-dom";

const { VITE_PUBLIC_KEY } = import.meta.env;

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

const apiUrl = "http://localhost:3000/products";

function App() {
  const subscribeToNotifications = async () => {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VITE_PUBLIC_KEY),
    });

    await fetch(`${apiUrl}/subscribe`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Subscription successful!");
  };

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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      grey: {
        main: "#f5f5f5",
      },
      red: {
        main: "#f44336",
      },
    },
  });
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Fashion Avenue
            </Typography>
            <Link to={`/`}>
              <Button color="grey">Home</Button>
            </Link>
            <Link to={`/customer/products`}>
              <Button color="grey">Products</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Grid item xs={12}>
          <h1>Product Management</h1>
          <Button color="red" onClick={subscribeToNotifications}>
            Subscribe to Notifications
          </Button>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Add Product</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              id="title"
              label="Product Name"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              id="price"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={addProduct} variant="contained" color="primary">
              Add Product
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="img" height="140" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Button color="red" onClick={() => deleteProduct(product.id)}>
                    Delete
                  </Button>
                  <Link to={`/products/update/${product.id}`}>
                    <Button color="red">Edit</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default App;
