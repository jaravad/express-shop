const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Include body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  console.log('Add product middleware');
  res.send(
    `
    <html>
      <head>
        <title>Add product</title>
      </head>
      <body>
        <form action="/product" method="POST">
          <input type="text" name="title"/>
          <button type="submit">Add product</button>
        </form>
      </body>
    </html>`.trim()
  );
});

// Filter by request method
app.post('/product', (req, res, next) => {
  console.log('Product middleware');
  console.log(req.body);
  // redirect to '/'
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log('Home middleware');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
