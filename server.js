const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 기본 루트 확인용
app.get('/', (req, res) => {
  res.send('OrcaX Backend is alive!');
});

// NFT 구매 처리용 API
app.post('/api/buy-nft', (req, res) => {
  const { wallet, type, qty } = req.body;

  if (!wallet || !type || !qty) {
    return res.status(400).json({ message: '❌ 지갑, 종류, 수량 필드는 필수입니다.' });
  }

  console.log(`[NFT 구매 요청] 지갑: ${wallet} / 종류: ${type} / 수량: ${qty}`);

  // 여기에 진짜 처리 로직이 들어가야 함
  res.json({ message: `✅ ${type} NFT ${qty}개 요청 완료!` });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 OrcaX Backend 서버가 포트 ${PORT}에서 실행 중`);
});
