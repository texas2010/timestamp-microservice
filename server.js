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

app.get('/api/timestamp/', (req, res) => {
  const currentTime = new Date()
  res.json({ unix: Date.parse(currentTime), utc: currentTime.toUTCString() })
})

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

  if (isNumeric(rawDate) && (new Date(parseInt(rawDate))).getTime() > 0) {
    res.json(convertDate(parseInt(rawDate)))
  } else if ((new Date(rawDate)).getTime() > 0) {
    res.json(convertDate(rawDate))
  } else {
    res.json({ error: 'Invalid Date' })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
