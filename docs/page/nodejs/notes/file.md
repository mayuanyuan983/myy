# node.js 文件模块fs

## 读取文件

### 按行读取

```js
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('11.txt'),
    output: process.stdout,
    terminal: false
});

let arr = []
rl.on('line', (line) => {
    // console.log(line);
    arr.push(line)
});

rl.on('close', () => {
    console.log(arr)
})
```

