const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// 라우터 등록
const orderRoute = require("./routes/order");
app.use("/order", orderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버 실행 중: ${PORT}`));
