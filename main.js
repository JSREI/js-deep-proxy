/**
 * 对给定的value添加代理，并且会对其属性进行递归代理
 * @param {Object} value
 * @param {ProxyHandler} proxyHandler
 */
function deepProxy(value, proxyHandler) {

    // 用来缓存防止同一个属性被反复hook
    const deepProxyCacheMap = new Map();

    // 允许其使用自定义的get方法来处理被代理的对象
    const oldGetHandler = proxyHandler["get"];
    const oldSetHandler = proxyHandler["set"];
    proxyHandler["get"] = function (target, p, receiver) {
        let propertyValue;
        if (oldGetHandler) {
            propertyValue = oldGetHandler.apply(this, [target, p, receiver]);
        } else {
            propertyValue = target[p];
        }

        // 如果是对象类型的则继续递归proxy
        if (typeof propertyValue === "object") {
            const newHandler = {
                apply: proxyHandler["apply"],
                construct: proxyHandler["construct"],
                defineProperty: proxyHandler["defineProperty"],
                deleteProperty: proxyHandler["deleteProperty"],
                get: oldGetHandler,
                getOwnPropertyDescriptor: proxyHandler["getOwnPropertyDescriptor"],
                getPrototypeOf: proxyHandler["getPrototypeOf"],
                has: proxyHandler["has"],
                isExtensible: proxyHandler["isExtensible"],
                ownKeys: proxyHandler["ownKeys"],
                preventExtensions: proxyHandler["preventExtensions"],
                set: oldSetHandler,
                setPrototypeOf: proxyHandler["setPrototypeOf"]
            };

            if (deepProxyCacheMap.has(p)) {
                return deepProxyCacheMap.get(p);
            } else {
                const deepProxyResult = deepProxy(propertyValue, newHandler);
                deepProxyCacheMap.set(p, deepProxyResult);
                return deepProxyResult;
            }
        } else {
            // 否则就直接返回不再proxy
            return propertyValue;
        }

    };

    proxyHandler["set"] = function (target, p, value, receiver) {

        // 把之前的缓存删除掉
        deepProxyCacheMap.delete(p);

        // 如果之前有设置setHandler的话，则调用
        if (oldSetHandler) {
            oldSetHandler.apply(this, [target, p, value, receiver]);
        }
    };

    return new Proxy(value, proxyHandler);
}

module.exports = {
    deepProxy
}


