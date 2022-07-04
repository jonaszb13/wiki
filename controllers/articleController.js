const Article = require('../models/article');
const Old = require('../models/old')


const article_index = (req, res) => {
  Article.find().sort({ createdAt: +1 })
    .then(result => {
      res.render('index', { articles: result, articlesMain: result, heading: "Alle Artikel", title: 'All articles' });
    })
    .catch(err => {
      console.log(err);
    });
}

const article_search = (req, res) => {
  Article.find().sort({ createdAt: +1 })
    .then(result => {
      let query = req.query.search
      console.log(query);
      Article.find({ title: { $regex: query, $options: "i" } }, function(err, docs) {
        console.log(docs)
        res.render('index', { articles: result, articlesMain: docs, search: query, heading: 'Suchergebnisse für: "' + query + '"', title: 'Artikel mit: "' + query + '"' })
      })
      
    })
  
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

const article_edit_get = (req, res) => {
  const id = req.params.id;
      Article.findById(id)
      .then(result => {
        test = result;
        Old.find({ old_id: id})
          .then(result => {
            oldID = result
            Article.find().sort({ createdAt: +1})
          .then(result => {
            res.render('edit', {articles: result, olds: oldID, article: test, title: 'Artikel bearbeiten' })
          })
        })
      })
      .catch(err => {
        console.log(err);
        res.render('404', { title: 'Article not found' });
      });
}

const article_edit_post = (req, res) => {
  const id = req.params.id;
  Article.findById(id)
  .then(result => {
    const old = new Old(
      { old_id: result._id,
        title: result.title, 
        keywords: result.keywords, 
        snippet: result.snippet, 
        body: result.body 
      })
    old.save()
    .then(result => {
      const id = req.params.id;
      Article.findByIdAndUpdate(id, req.body)
        .then(result => {
          res.redirect('/articles/' + id);
        })
        .catch(err => {
          console.log(err);
        });
    })
  })
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

const test_evn = (req, res) => {  
  
}

module.exports = {
  article_index, 
  article_search,
  article_details, 
  article_create_get, 
  article_create_post, 
  article_delete,
  article_edit_get,
  article_edit_post,
  test_evn,
}