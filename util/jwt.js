const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const { jwtSecret } = require('../config/config.default')

exports.sign = promisify(jwt.sign)
exports.verify = promisify(jwt.verify)
exports.decode = promisify(jwt.decode)

