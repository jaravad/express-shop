const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const adminRoutes = adminData.routes;
const shopRoutes = require('./routes/shop');

const app = express();

/**
 * Specify the view engine and views location
 * By default the views location is a folder in the root
 * directory called 'views'
 * */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render('404', { layout: false, pageTitle: 'Not found' });
});

app.listen(3000);
