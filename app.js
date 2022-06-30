const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const articleRoutes = require('./routes/articleRoutes')

const app = express();

const dbURI = "mongodb+srv://" + process.env.USER + ":" + process.env.PASS + "@cluster0.aen15qn.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


app.get('/', (req, res) => {
  res.redirect('/articles');
});

app.use('/articles', articleRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});