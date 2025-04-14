const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // 정적 파일 서빙할 경우

// 문자 보내기 API
app.post('/api/sms/send', async (req, res) => {
  try {
    const { to, message } = req.body;

    console.log('요청 받은 번호:', to);
    console.log('보낼 메시지:', message);

    // 여기에 실제 문자 보내는 API 호출 로직 들어감 (예: coolsms, nurigo 등)
    // 지금은 테스트니까 더미 응답

    res.json({
      success: true,
      message: '문자 전송 성공!',
      data: { to, message }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
