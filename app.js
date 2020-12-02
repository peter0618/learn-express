const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // 요청과 응답에 대한 정보를 콘솔에 기록함. 예) GET / 500 6.435 ms - 50 ([HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트])
app.use('/', express.static(path.join(__dirname, 'public'))); // app.use('요청경로', express.static('실제경로')); 정적 파일 요청을 처리하기 위해 사용합니다.
app.use(express.json()); // body-parser 설정
app.use(express.urlencoded({extended: false})); // body-parser 설정 (extended false 면 querystring 모듈 사용, true 면 qs 모듈 사용. qs는 querystring 모듈의 확장판)
// => 본문을 JSON 형태로 보내든, URL-encoded 형식으로 보내든 req.body 에 JSON 형태로 파싱해줌.

app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.get('/', (req, res, next) => {
    // res.send('Hello, Express'); // text 로 직접 응답하기.
    console.log(req.signedCookies.name);
    // console.log(req.cookies.name); // signed cookie 를 사용하면 undefined
   console.log('GET / 요청에서만 실행됩니다.');
   next();
}, (req, res) => {
    // throw new Error('에러는 에러 처리 미들웨어로 갑니다.');

    // 쿠키 셋팅 예제
    // res.cookie('name','peter',
    //     {
    //         expires: new Date(Date.now() + 9000000),
    //         httpOnly: true,
    //         // secure: true,
    //         signed: true,
    //     }
    // );

    console.log(req.session);
    console.log(req.sessionID);
    // req.session.name = 'peter'; // 세션 등록

    res.sendFile(path.join(__dirname, '/index.html'));
});

// 에러 처리 미들웨어 입니다. 특별한 경우가 아니면 에러처리 미들웨어는 가장 아래에 위치하도록 합니다.
app.use((err, req, res, next) => {
   console.error(err);
   res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=> {
    console.log(`${app.get('port')} 번 포트에서 대기 중`);
});
