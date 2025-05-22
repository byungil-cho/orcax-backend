const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 주문 저장
router.post("/", async (req, res) => {
  try {
    const { name, phone, wallet, quantity, nft } = req.body;
    const newOrder = new Order({ name, phone, wallet, quantity, nft });
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.error("❌ 주문 저장 오류:", err);
    res.status(500).json({ success: false, error: "DB 저장 실패" });
  }
});

// 주문 리스트 JSON (관리자용)
router.get("/list-json", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "DB 조회 실패" });
  }
});

// 주문 삭제
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Order.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ 삭제 오류:", err);
    res.status(500).json({ success: false, error: "삭제 실패" });
  }
});

module.exports = router;
