# JavaScript Deep Proxy

# 一、简介

对JavaScript原生的Proxy的扩展，增加递归Proxy的功能。

# 二、Example

```js
const {deepProxy} = require("./main");

(() => {

    const fuck = {
        "name": "CC11001100",
        "skill": [
            {
                "name": "eat",
                "level": 100,
            },
            {
                "name": "drunk",
                "level": 100,
            },
            {
                "name": "sleep",
                "level": 99,
            },
            {
                "name": "coding",
                "level": 3,
            }
        ],
        "other": {
            "judge": "又菜又爱玩"
        }
    };

    const fucked = deepProxy(fuck, {
        get(target, p, receiver) {
            console.log(`尝试获取属性： ${p}`);
            return target[p];
        }
    });

    console.log(fucked.skill[0].name);

    // Output:
    // 尝试获取属性： skill
    // 尝试获取属性： 0
    // 尝试获取属性： name
    // eat

})();

```





