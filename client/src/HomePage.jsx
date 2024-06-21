import { useState, useEffect } from "react";
import { Container, Button, TextField } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, CardMedia } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

import "./App.css";

import { Link } from "react-router-dom";

const apiUrl = "http://localhost:3000/customer/products";
function HomePage() {
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
    <>
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
                <Button color="grey" component="div">
                  Home
                </Button>
              </Link>
              <Link to={`/customer/products`}>
                <Button color="grey">Products</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} mt={2}>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled button group"
            >
              <Link to={`/products`}>
                <Button>
                  <Typography
                    variant="h5"
                    color="white"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    Admin Panel
                  </Typography>
                </Button>
              </Link>
              <Link to={`/customer/products`}>
                <Button>
                  <Typography
                    variant="h5"
                    color="white"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    Customer
                  </Typography>
                </Button>
              </Link>
            </ButtonGroup>
          </Grid>
        </ThemeProvider>
      </Container>
    </>
  );
}

export default HomePage;
