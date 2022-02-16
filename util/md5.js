const crypto = require('crypto')

/**
 * @param {*} str 传过来的密码
 * @returns 返回一个16进制加密字符串
 */

module.exports = (str) => {
  return crypto
    .createHash('md5') // 创建 md5
    .update('winter' + str) // rain是盐，一个字符串，将和密码拼接
    .digest('hex') // 16进制结果，还可以是Base64
}
