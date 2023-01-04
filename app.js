const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
require('dotenv').config();
const articleRoutes = require('./routes/articleRoutes')
const cors = require('cors')
var corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser())

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

const db = require('./models');
const dbConfig = require('./config/db.config');
db.mongoose
  .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res) => {
  res.redirect('/articles');
});

app.use('/articles', articleRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
