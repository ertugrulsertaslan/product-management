import { useState, useEffect } from "react";
import { Container, Button, TextField } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
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
        <Grid container spacing={2} mt={2}>
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
                <Typography variant="h6" mt={2} color="text.secondary">
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

export default detailProduct;
