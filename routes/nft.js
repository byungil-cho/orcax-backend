// routes/nft.js
import express from "express";
import { sendNft } from "../sendNft.js";

const router = express.Router();

router.post("/send-nft", async (req, res) => {
  const { recipient, mintAddress } = req.body;

  if (!recipient || !mintAddress) {
    return res.status(400).json({ message: "recipient와 mintAddress는 필수입니다." });
  }

  try {
    const tx = await sendNft(recipient, mintAddress);
    res.status(200).json({ message: "✅ NFT 전송 성공", tx });
  } catch (error) {
    console.error("NFT 전송 실패:", error);
    res.status(500).json({ message: "❌ NFT 전송 실패", error: error.message });
  }
});

export default router;
