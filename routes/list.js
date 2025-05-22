const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ 목록 불러오기 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
