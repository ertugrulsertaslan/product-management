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
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [photos, setPhotos] = useState([null]);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, []);

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
    if (title && description && price && photos) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      photos.forEach((file) => {
        formData.append(`photo`, file);
      });
      await fetch(`${apiUrl}/update/${productId}`, {
        method: "PUT",
        body: formData,
      });
      await fetchProduct();
    } else {
      console.error("Cannot be null", error);
    }
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
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
            <Typography
              variant="h4"
              component="div"
              color="black"
              sx={{ marginTop: 5, marginBottom: 2 }}
            >
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
            <TextField
              type="file"
              name="photo"
              id="photo"
              variant="outlined"
              required
              onChange={(e) => setPhotos([...e.target.files])}
              inputProps={{ multiple: true }}
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
        {product ? (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                {product.photoPath.length > 0 && (
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
                    sx={{ margin: 1 }}
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
              </Card>
            </Grid>
          </Grid>
        ) : (
          "Loading"
        )}
      </ThemeProvider>
    </Container>
  );
}

export default UpdateProduct;
