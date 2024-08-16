const { Router } = require('@edgio/core/router')

module.exports = new Router().fallback(({ compute }) => {
  compute((req, res) => {
    res.send('Hello from Edgio!')
  })
})
