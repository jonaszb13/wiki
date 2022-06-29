const Article = require('../models/article');

const article_index = (req, res) => {
  Article.find().sort({ createdAt: +1 })
    .then(result => {
      res.render('index', { articles: result, title: 'All articles' });
    })
    .catch(err => {
      console.log(err);
    });
}

let test

const article_details = (req, res) => {
  const id = req.params.id;
  Article.findById(id)
    .then(result => {
      test = result;
      Article.find().sort({ createdAt: +1})
        .then(result => {
          res.render('details', {articles: result, article: test, title: 'Article Details' })
    })
      //res.render('details', {article: result, title: 'Article Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Article not found' });
    });
  
}

const article_create_get = (req, res) => {
  Article.find().sort({ created: +1 })
    .then(result => {
      res.render('create', { articles: result, title: 'Create a new article' });
    })
    .catch(err => {
      console.log(err);
    })
}

const article_create_post = (req, res) => {
  const article = new Article(req.body);
  article.save()
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => {
      console.log(err);
    });
}

const article_delete = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/articles' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  article_index, 
  article_details, 
  article_create_get, 
  article_create_post, 
  article_delete
}