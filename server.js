// server.js
// where your node app starts

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:date', (req, res) => {
  const isNumeric = (str) => {
    if (typeof str !== "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
  }
  const convertDate = (date) => {
    const dateObj = new Date(date)
    return { unix: Date.parse(dateObj), utc: dateObj.toUTCString() }
  }
  const rawDate = req.params.date

  // function isNumeric(str) {
  //   if (typeof str != "string") return false
  //   return !isNaN(str) && !isNaN(parseFloat(str))
  // }

  // function convertTime(date) {
  //   const dateObj = new Date(date)
  //   const utc = dateObj.toUTCString()
  //   const unix = Date.parse(dateObj)
  //   return { unix: unix, utc: utc }
  // }

  if (isNumeric(rawDate) && (new Date(parseInt(rawDate))).getTime() > 0) {
    res.json(convertDate(parseInt(rawDate)))
  } else if ((new Date(rawDate)).getTime() > 0) {
    res.json(convertDate(rawDate))
  } else {
    res.json({ error: 'Invalid Date' })
  }
})

// milliseconds to date
// const dateNumber = parseInt(rawDate)
// const dateObj = new Date(dateNumber)
// const utc = dateObj.toUTCString()
// const unix = Date.parse(dateObj)

// date to milliseconds
// const dateObj = new Date(rawDate)
// const utc = dateObj.toUTCString()
// const unix = Date.parse(dateObj)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
