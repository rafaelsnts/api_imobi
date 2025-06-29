import express from "express";
import router from "./routes.js";
import path from "node:path";
import cors from "cors";

const app = express();
//server imagens staticas
app.use("/uploads", express.static(path.resolve(__dirname, "../", "uploads")));
app.use(express.json());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  app.use(cors());
  next();
});

app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
