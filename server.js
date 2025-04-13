// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nftRoutes from "./routes/nft.js"; // ✅ 이 줄 추가

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ API 경로 등록
app.use("/api", nftRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 OrcaX NFT 서버 실행 중: http://localhost:${PORT}`);
});
