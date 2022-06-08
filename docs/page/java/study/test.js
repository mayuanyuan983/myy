const axios = require('axios');
//深证成指 399001 中小100 399005 报名人数 中签数量 本人号码
const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';

async function getNum(code) {
    let num = 0;
    await axios
        .get(
            API_PROXY +
                'http://www.szse.cn/api/market/ssjjhq/getTimeData?random=0.46960177398863245&marketId=1&code=' +
                code
        )
        .then(
            function (res) {
                num = res.data.data.now;
            },
            function (error) {
                console.log(error);
            }
        );
    return num;
}
init();

async function init() {
    let t1 = await getNum(399001);
    let t2 = await getNum(399005);
    console.log(t1, t2)
    tt(t1, t2);
}



function tt(t1, t2) {
    if (test(t1, t2, 355048, 20000, 267068)) {
        console.log('中');
    }
    if (test(t1, t2, 355048, 20000, 281492)) {
        console.log('中');
    }
}

function test(zhi, zhong, a, b, c) {
    console.log("test ~ zhi", zhi * 100)
    console.log("test ~ zhong", zhong * 100)
    let A = zhi * 100 * (zhong * 100) * 10000;
    console.log(A)
    let B = Number((A + '').split('').reverse().join(''));
    console.log(B)
    let X = Number(a); //报名人数
    let Y = (B % X) + 1;

    let num = Number(b); //中签数量

    if (num > X) {
        console.log('中签数量应小于报名人数');
        return;
    }

    let Z = parseInt(X / num);

    let list = [];
    let result = false;
    for (let i = 0; i < num; i++) {
        let q = Y + Z * i;
        if (q > X) {
            q = q - X;
        }
        if (q == c) {
            result = true;
            break;
        }
        list.push(q);
    }
    return result;
}
