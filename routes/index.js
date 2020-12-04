const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello, Express');
});

router.get('/testNunjucks', (req,res) => {
    res.locals.fruits = ['사과', '배', '오렌지', ' 바나나', '복숭아'];
    res.locals.isLoggedIn = false;
    res.locals.fruit = 'apple';
    res.render('index', {title: 'Express'});
});

module.exports = router;
