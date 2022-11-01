# JavaScript Deep Proxy

# 一、简介

对JavaScript原生的Proxy的扩展，增加递归Proxy的功能。 

## 何为Deep Proxy

JavaScript原生的Proxy只能代理传入的对象的直接属性，但对于属性的属性则代理不到，比如：

```json
{
    "a": {
        "b": "xxx"
    }
}
```

对于上面的对象，使用原生的Proxy能够代理到a属性，但是代理不到a属性上的b属性，这个库就是解决这个问题的，能够·从a一直代理到任意层级的属性。 

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





