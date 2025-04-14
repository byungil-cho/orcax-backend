const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// 주문 접수 + 문자 발송 트리거 처리
app.post('/api/sms/order-notice', (req, res) => {
  const order = req.body;
  console.log('📥 주문 수신됨:', order);

  const orderLine = JSON.stringify({
    ...order,
    timestamp: new Date().toISOString()
  }) + ',\n';

  fs.appendFile(path.join(__dirname, 'orders.json'), orderLine, (err) => {
    if (err) {
      console.error('❌ 주문 저장 실패:', err);
      return res.status(500).json({ success: false, message: '주문 저장 실패' });
    }

    // ✉️ 문자 발송 로직 자리 (알리고 연동 여기 넣으면 됨)
    console.log(`📨 문자 발송 요청 준비 완료 (예상 수신자: ${order.phone})`);

    res.json({ success: true, message: '주문 저장 및 문자 발송 트리거 완료' });
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 OrcaX 백엔드 작동 중: http://localhost:${PORT}`);
});
