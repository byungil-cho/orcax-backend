// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 기본 루트 확인용
app.get('/', (req, res) => {
  res.send('✅ OrcaX Backend is alive!');
});

// NFT 구매 API (예시)
app.post('/api/buy-nft', (req, res) => {
  const { wallet, type, qty } = req.body;

  if (!wallet || !type || !qty) {
    return res.status(400).json({
      message: '❌ 지갑, 종류, 수량 필드는 필수입니다.',
    });
  }

  // 여기에 실제 구매 로직을 넣으세요
  res.status(200).json({
    message: '✅ NFT 구매 요청이 접수되었습니다!',
    data: { wallet, type, qty },
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 OrcaX Backend 서버가 포트 ${PORT}에서 실행 중`);
});
