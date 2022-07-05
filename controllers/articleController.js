const Article = require('../models/article');
const Old = require('../models/old');

let cAt;
let uAt;
let all;

async function menu() {
console.log("menu running")
  Article.find().sort({ createdAt: -1 })
    .then(result => {
      cAt = result
      Article.find().sort({ updatedAt: -1 })
        .then(result => {
          uAt = result
          console.log("update")
          Article.find()
            .then(result => {
              all = result
              console.log("all")  
            })
        })
    })
  };


const article_index = async (req, res) => {
  await menu();
  console.log(cAt);
  await res.render('index', { create: cAt, update: uAt, all: all, heading: "Alle Artikel", title: 'Alle Artikel' });
}


const article_search = async (req, res) => {
  await menu();
  let query = req.query.search
  console.log(query);
  Article.find({ title: { $regex: query, $options: "i" } }, function(err, docs) {
    console.log(docs)
    res.render('index', { create: cAt, update: uAt, all: all, searchRes: docs, search: query, heading: 'Suchergebnisse für: "' + query + '"', title: 'Artikel mit: "' + query + '"' })
  }) 
}


let test

const article_details = async (req, res) => {
  await menu();
  const id = req.params.id;
  Article.findById(id)
    .then(result => {
      test = result;
      res.render('details', { create: cAt, update: uAt, all: all, article: test, title: 'Article Details' })
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Article not found' });
    });
}

const article_create_get = async (req, res) => {
  await menu();
  res.render('create', { create: cAt, update: uAt, all: all, title: 'Create a new article' });
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

const article_edit_get = async (req, res) => {
  await menu();
  const id = req.params.id;
      Article.findById(id)
      .then(result => {
        test = result;
        Old.find({ old_id: id})
          .then(result => {
            oldID = result
            res.render('edit', { create: cAt, update: uAt, all: all, olds: oldID, article: test, title: 'Artikel bearbeiten' })
          })
          .catch(err => {
            console.log(err);
            res.render('404', { title: 'Article not found' })
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
  menu,
}