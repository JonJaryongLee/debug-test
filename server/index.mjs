import fs from "fs/promises";
import express from "express";
import morgan from "morgan";
import http from "http";

async function loadProducts() {
  const jsonData = await fs.readFile("products.json", "utf8");
  const products = JSON.parse(jsonData);
  return products;
}
const products = await loadProducts();

const app = express();
const PORT = 8000;

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/v1/products", (req, res) => {
  try {
    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/v1/products/:product_id", (req, res) => {
  try {
    const product_arr = products.filter(
      (product) => product.product_id === req.params.product_id
    );
    if (product_arr.length === 0) {
      return res.status(404).json({
        message: "요청하신 부품이 없습니다.",
      });
    }
    const product = product_arr[0];
    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/v1/products/category/:category", (req, res) => {
  try {
    const category = req.params.category;
    const filtered = products.filter((p) => p.category === category);
    if (filtered.length === 0) {
      return res.status(404).json({
        message: "해당 카테고리의 부품이 없습니다.",
      });
    }
    return res.json(filtered);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/v1/products/name/:name", (req, res) => {
  try {
    const name = req.params.name;
    const filtered = products.filter((p) => p.name === name);

    if (filtered.length === 0) {
      return res.status(404).json({
        message: "해당 이름의 부품이 없습니다.",
      });
    }
    return res.json(filtered);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/v1/products/price/:min_price/:max_price", (req, res) => {
  try {
    const minPrice = Number(req.params.min_price);
    const maxPrice = Number(req.params.max_price);
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({
        message: "price 파라미터가 숫자가 아닙니다.",
      });
    }
    const filtered = products.filter((p) => {
      return p.price <= maxPrice && p.price >= minPrice;
    });
    if (filtered.length === 0) {
      return res.status(404).json({
        message: "해당 가격 범위의 제품이 없습니다.",
      });
    }
    return res.json(filtered);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/v1/products/available/true", (req, res) => {
  try {
    const filtered = products.filter((p) => p.is_available === true);
    if (filtered.length === 0) {
      return res.status(404).json({
        message: "is_available=true 인 부품이 없습니다.",
      });
    }
    return res.json(filtered);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`This server is listening on ${PORT}`));
