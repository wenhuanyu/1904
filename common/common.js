/**
 * 公共方法
 */

// 存储内容
function set(key, value) {
    uni.setStorageSync(key, value)
}

// 读取内容
function get(key) {
    return uni.getStorageSync(key)
}


module.exports = {
    baseUrl: "https://1904.mzth.cn/data/api.",
	// baseUrl: "https://zhrx.hk/data/api.",
    set: set,
    get: get,
}
