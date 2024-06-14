import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { config } from "dotenv";
import webpush from "web-push";
const prisma = new PrismaClient();
const app = express();
config();
app.use(cors());
app.use(bodyParser.json());

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  PUBLIC_KEY,
  PRIVATE_KEY
);
let subscriptions = [];

app.post("/products/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);

  res.status(201).json({});
});

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
app.get("/customer/products/detail/:id", async (req, res) => {
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

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { title, description, price },
    });

    const notificationPayload = {
      notification: {
        title: "Ürün Güncellendi",
        body: `Ürün "${updatedProduct.title}" güncellendi.`,
        icon: "icon-url",
      },
    };

    const promises = subscriptions.map((sub) =>
      webpush
        .sendNotification(sub, JSON.stringify(notificationPayload))
        .catch((err) => {
          console.error(`Error sending notification to ${sub.endpoint}:`, err);
        })
    );

    await Promise.all(promises);

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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
