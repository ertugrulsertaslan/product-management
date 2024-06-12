import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.get("/customer/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});
app.get("/products/update/:id", async (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  res.json(product);
});
app.post("/products", async (req, res) => {
  const { title, description, price } = req.body;
  const newProduct = await prisma.product.create({
    data: {
      title,
      description,
      price,
    },
  });
  res.json(newProduct);
});

app.put("/products/update/:id", async (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const { title, description, price } = req.body;
  const updateProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      title,
      description,
      price,
    },
  });
  res.json(updateProduct);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);
  const deletedProduct = await prisma.product.delete({
    where: { id: productId },
  });
  res.json(deletedProduct);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
