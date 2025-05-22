const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, phone, wallet, quantity, nft } = req.body;

  try {
    const newOrder = new Order({ name, phone, wallet, quantity, nft });
    await newOrder.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "새 주문이 접수되었습니다!",
      text: `${name}님의 주문\n\n전화번호: ${phone}\n지갑: ${wallet}\n수량: ${quantity}\nNFT: ${nft}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
