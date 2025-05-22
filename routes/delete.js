// routes/delete.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 삭제 라우터 (id 기준)
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ 삭제 실패:", err);
    res.status(500).json({ error: "삭제 중 오류 발생" });
  }
});

module.exports = router;
