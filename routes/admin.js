const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res) => {
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

router.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
