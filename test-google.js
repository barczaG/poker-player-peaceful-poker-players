const request = require('request')

request('https://gridspree.io/ss/y6fvEbhw7Cdd6qcqDsrEFZ', function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
