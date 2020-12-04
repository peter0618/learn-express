const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    // res.send('Hello, Express');
    res.locals.title = `Peter's Home`;
    res.render('index');
});

router.get('/pugTest', (req,res) => {
    // pug 에 변수 넘겨주는 방법 1
    // res.render('pugTest', {title:'Express'});

    // pug 에 변수 넘겨주는 방법 2 (장점 : 다른 미들웨어에서 미리 해당 변수를 넣어줄 수도 있음)
    res.locals.title = 'Express2';
    res.locals.isLoggedIn = false;
    res.locals.fruit = 'mango';
    res.render('pugTest');
});

module.exports = router;
