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

async function init() {
    // let t1 = await getNum(399001);
    // let t2 = await getNum(399005);
    // console.log(t1, t2)
    tt(14862.60, 9574.05);
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

init();
// setInterval(() => {
//     init();
// }, 1000 * 5);

function tt(t1, t2) {
    //心-金银套币
    // let a1 = test(t1, t2, 191188, 2800, 54443);
    // if (a1) {
    //     console.log('心-金银套币', dateFormat("YYYY-mm-dd HH:MM", new Date()), t1, t2);
    // }

    // //心-银币
    // let a2 = test(t1, t2, 191817, 1500, 142654);
    // if (a2) {
    //     console.log('心-银币', dateFormat("YYYY-mm-dd HH:MM", new Date()), t1, t2);
    // }

    //竹-金银套币
    let a3 = test(14862.6, 9574.05, 141780, 1200, 37796);
    // if (a3) {
    //     console.log('竹-金银套币', dateFormat("YYYY-mm-dd HH:MM", new Date()), t1, t2);
    // }

    // //竹-银币
    // let a4 = test(t1, t2, 169067, 1500, 123593);

    // if (a4) {
    //     console.log('竹-银币', dateFormat("YYYY-mm-dd HH:MM", new Date()), t1, t2);
    // }
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
