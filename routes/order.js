const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, phone, wallet, quantity, nft } = req.body;

    // 1. DB 저장
    const newOrder = new Order({ name, phone, wallet, quantity, nft });
    await newOrder.save();

    // 2. 이메일 전송
    const mailOptions = {
      from: `"OrcaX 알림" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `[OrcaX 주문] ${name}님의 주문 접수`,
      text: `
📝 새 주문이 접수되었습니다.

👤 이름: ${name}
📞 전화번호: ${phone}
👛 지갑주소: ${wallet}
📦 수량: ${quantity}
🏷️ NFT: ${nft}
🕒 시간: ${new Date().toLocaleString()}

- OrcaX 시스템
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("📨 알림 이메일 전송 완료");

    res.json({ success: true });
  } catch (err) {
    console.error("❌ 주문 처리 오류:", err);
    res.status(500).json({ success: false, error: "주문 저장 또는 이메일 전송 실패" });
  }
});

module.exports = router;
