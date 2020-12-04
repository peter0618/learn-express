const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
    // res.send('Hello, User');
});

module.exports = router;
