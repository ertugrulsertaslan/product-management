import { useState, useEffect } from "react";
import { Container, Button, TextField } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#25D366",
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" color="text.secondary">
              Edit Product
            </Typography>
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
            <Button
              onClick={() => editProduct(product.id)}
              variant="contained"
              color="primary"
            >
              <Typography variant="p" color="white">
                Edit Product
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" src={product.photoPath} height="250" />
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default UpdateProduct;
