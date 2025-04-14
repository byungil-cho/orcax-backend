// routes/sms.js - 문자 전송 API 라우터

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ success: false, error: "전화번호와 메시지를 입력하세요." });
  }

  try {
    const params = new URLSearchParams();
    params.append("key", process.env.ALIGO_API_KEY);
    params.append("user_id", process.env.ALIGO_USER_ID);
    params.append("sender", process.env.ALIGO_SENDER);
    params.append("receiver", to);
    params.append("msg", message);
    params.append("msg_type", "SMS");

    const result = await axios.post("https://apis.aligo.in/send/", params);

    console.log("📤 문자 전송 결과:", result.data);
    res.status(200).json({ success: true, result: result.data });
  } catch (err) {
    console.error("❌ 문자 전송 실패:", err.message);
    res.status(500).json({ success: false, error: "문자 전송에 실패했습니다." });
  }
});

export default router;
