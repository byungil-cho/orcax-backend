const express = require('express');
const app = express();
const port = process.env.PORT || 3080;

app.use(express.json());

app.post('/api/notify', (req, res) => {
  console.log('✅ POST 요청 도착:', req.body);
  res.status(200).json({ message: '요청 성공적으로 수신됨!' });
});

app.listen(port, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${port}`);
});
