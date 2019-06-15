const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use(bodyParser.json());

app.post('/', function(req, res) {
  var username = req.body.username;
  var htmlData = 'Hello:' + username;
  res.send(htmlData);
  console.log(htmlData);
});

// SPA
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build/index.html"), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     };
// });

// listen for requests
app.listen(3020, '0.0.0.0', () => {
  console.log('Server is listening on port 3020');
});
