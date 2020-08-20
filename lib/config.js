'use strict'

const env = require('env-var')

module.exports = {
  HTTP_PORT: env.get('HTTP_PORT').default('3001').asPortNumber()
}
