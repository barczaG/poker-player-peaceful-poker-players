const request = require('request')

function refresh (cb) {
  request('https://gridspree.io/ss/y6fvEbhw7Cdd6qcqDsrEFZ', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body) // Show the HTML for the Google homepage.
      global.strategyTable = body.rows
      console.log('STAREGY TABLE REFRESHED')
      console.log(global.strategyTable)
      // global.log.info('STAREGY TABLE REFRESHED')
    }
  })
}

refresh()
setInterval(() => refresh(), 60 * 1000)
