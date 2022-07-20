const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  /**
   * __dirname is a global variable exposed by node and it
   * contains the absolute path to /routes folder, the
   * folder in which the current file is located
   *
   * '..' is needed to go up one level access the sibling folder 'views'
   *
   * Using path.join is preferred as this function creates paths
   * that work either on Windows, Mac or Linux systems
   *
   * */
  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;
