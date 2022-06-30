const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.get('/create', articleController.article_create_get);
router.get('/edit/:id', articleController.article_edit_get);
router.get('/test', articleController.test_evn);
router.get('/', articleController.article_index);
router.post('/', articleController.article_create_post);
router.get('/:id', articleController.article_details);
router.delete('/:id', articleController.article_delete);
router.post('/:id', articleController.article_edit_post);

module.exports = router;