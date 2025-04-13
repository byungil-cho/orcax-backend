// routes/nft.js

const express = require("express");
const router = express.Router();
const sendNFT = require("../sendNft");

router.post("/send-nft", async (req, res) => {
  const { to, tokenId, amount } = req.body;

  if (!to || !tokenId) {
    return res.status(400).json({ success: false, message: "to, tokenId는 필수입니다." });
  }

  const result = await sendNFT({ to, tokenId, amount });
  res.status(result.success ? 200 : 500).json(result);
});

module.exports = router;
