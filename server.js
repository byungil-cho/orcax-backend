// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nftRoutes from "./routes/nft.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", nftRoutes);

app.get("/", (req, res) => {
  res.send("OrcaX NFT API 서버 가동 중! 🐳");
});

app.listen(PORT, () => {
  console.log(`✅ 서버 가동: http://localhost:${PORT}`);
});
