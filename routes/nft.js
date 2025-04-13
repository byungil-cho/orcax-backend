const express = require('express'); // 익스프레스 부름
const router = express.Router();    // 라우터 생성

// /test 주소로 들어오면 이걸 보여줌
router.get('/test', (req, res) => {
  res.send('NFT route is alive! 🚀');
});

// 다른 파일에서 불러다 쓸 수 있게 export
module.exports = router;
