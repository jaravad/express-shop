const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res) => {
  /**
   * The variable 'rootDir' contains the root directory of
   * the node project
   *
   * */
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
