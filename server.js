const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 서버 앱 만들기
const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 등록
app.use(cors());
app.use(bodyParser.json());

// NFT 라우터 연결
const nftRoutes = require('./routes/nft');
app.use('/api', nftRoutes);

// 기본 루트 응답
app.get('/', (req, res) => {
  res.send('OrcaX Backend is alive!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
