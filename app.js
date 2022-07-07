const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const articleRoutes = require('./routes/articleRoutes')
const cors = require('cors')
var corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();

app.set('view engine', 'ejs');

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
const Role = db.role;
db.mongoose
  .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.redirect('/articles');
});

app.use('/articles', articleRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if(!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if(err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}