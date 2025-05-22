const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 10000;

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB 연결 성공"))
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // 🔥 public 폴더 정적 제공

// 라우터 연결
const orderRouter = require("./routes/order");
const listRouter = require("./routes/list");
const deleteRouter = require("./routes/delete");

app.use("/order", orderRouter);
app.use("/list-json", listRouter);
app.use("/delete", deleteRouter);

// 기본 경로
app.get("/", (req, res) => {
  res.send("🐳 OrcaX 백엔드 서버 실행 중입니다.");
});

// 서버 시작
app.listen(port, () => {
  console.log(`🚀 서버 실행 중: ${port}`);
});
