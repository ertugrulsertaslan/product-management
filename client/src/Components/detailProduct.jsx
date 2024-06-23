import { useState, useEffect } from "react";
import { Container, Button, TextField, ImageList } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";
import { useParams } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import { Modal, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const apiUrl = "http://localhost:3000/customer/products";

function detailProduct() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const productId = id;
    try {
      const response = await fetch(`${apiUrl}/detail/${productId}`);
      const data = await response.json();
      setProduct(data);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Product delivery error:", error);
    }
  };
  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.photoPath.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.photoPath.length - 1 : prevIndex - 1
    );
  };
  const hasPhotos = product.photoPath && product.photoPath.length > 0;
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
              component="div"
              color="white"
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
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              {product.photoPath && (
                <CardMedia
                  component="img"
                  src={product.photoPath[0].url}
                  height="450px"
                />
              )}
            </Card>
            <Card sx={{ display: "flex" }}>
              {hasPhotos && (
                <ImageList sx={{ width: "100%" }} cols={3} rowHeight={150}>
                  {product.photoPath.map((photo, index) => (
                    <ImageListItem
                      key={index}
                      sx={{ margin: 2 }}
                      onClick={() => handleOpen(index)}
                    >
                      <img
                        src={photo.url}
                        alt={`product-image-${index}`}
                        style={{ height: 150 }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Card>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  width: "100%",
                  maxWidth: 1100,
                }}
              >
                {hasPhotos && (
                  <img
                    src={product.photoPath[currentIndex].url}
                    alt={`product-image-${currentIndex}`}
                    style={{
                      width: "100%",
                      maxHeight: 700,
                      objectFit: "contain",
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button onClick={prevSlide}>Previous</Button>
                  <Button onClick={nextSlide}>Next</Button>
                </Box>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={12} sm={6} md={6} key={product.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "75%",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h2"
                  component="div"
                  color="primary"
                  sx={{ margin: 2 }}
                >
                  {product.title}
                </Typography>
                <Typography
                  component="div"
                  color="primary"
                  sx={{ margin: 2, display: "flex", flexDirection: "rows " }}
                >
                  <AttachMoneyOutlinedIcon
                    sx={{ marginTop: 0.4, fontSize: 33 }}
                  />
                  <Typography variant="h4" color="primary">
                    {product.price}
                  </Typography>
                </Typography>

                <Typography
                  component="div"
                  sx={{ margin: 2, marginTop: 8, display: "flex" }}
                >
                  <Typography variant="h6">Product description</Typography>
                  <DescriptionOutlinedIcon
                    sx={{ marginTop: 0.5, marginLeft: 0.5 }}
                  />
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ margin: 2 }}
                >
                  {product.description}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="body1"
                    color="primary"
                    sx={{
                      width: "60%",
                      margin: 2,
                      padding: 1,
                      bgcolor: theme.palette.primary.main,
                      marginTop: 5,
                      color: "#FFFFFF",
                      "&:hover": {
                        bgcolor: "#4CAF50",
                      },
                    }}
                  >
                    <InventoryOutlinedIcon sx={{ marginRight: 1 }} />
                    Buy now
                  </Button>
                  <Button
                    variant="body1"
                    color="primary"
                    sx={{
                      width: "60%",
                      margin: 2,
                      padding: 1,
                      bgcolor: theme.palette.primary.main,
                      color: "#FFFFFF",
                      "&:hover": {
                        bgcolor: "#4CAF50",
                      },
                    }}
                  >
                    <ShoppingCartOutlinedIcon sx={{ marginRight: 1 }} />
                    Add to cart
                  </Button>
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
