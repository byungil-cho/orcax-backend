const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const { name, phone, wallet, quantity, nft } = req.body;
    const newOrder = new Order({ name, phone, wallet, quantity, nft });
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.error("주문 저장 오류:", err);
    res.status(500).json({ success: false, error: "DB 저장 실패" });
  }
});

module.exports = router;
