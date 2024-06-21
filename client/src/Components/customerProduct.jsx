import { useState, useEffect } from "react";
import { Container, Button, TextField } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const { VITE_PUBLIC_KEY } = import.meta.env;

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

const apiUrl = "http://localhost:3000/customer/products";
function customerProduct() {
  const [showAlert, setShowAlert] = useState(false);
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
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#25D366",
      },
      grey: {
        main: "#e9e9eb",
      },
      red: {
        main: "#f44336",
      },
    },
  });
  return (
    <Container color="grey">
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="white"
              component="div"
              sx={{ flexGrow: 1 }}
            >
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
          <h1 color="black">Subscribe to Notifications</h1>
          <Button color="primary" onClick={subscribeToNotifications}>
            Subscribe to Notifications
          </Button>
          {showAlert && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Successfully subscribed
            </Alert>
          )}
        </Grid>
        <Grid container spacing={2} mt={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                {product.photoPath && (
                  <CardMedia
                    component="img"
                    src={product.photoPath[0].url}
                    height="250"
                  />
                )}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ margin: 1 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      lineClamp: 2,
                      height: "auto",
                      margin: 1,
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ margin: 1 }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
                <Link to={`/customer/products/detail/${product.id}`}>
                  <Button sx={{ margin: 2 }}> Detail</Button>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default customerProduct;
