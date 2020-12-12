'use strict'

const express = require('express');

const ArticleController = require('../controllers/article');
const router = express.Router();
const validateToken = require('../middlewares/jwt');
const validateSave = require('../middlewares/validate_input_article');



const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './public/uploads/articles-img'});


//Rutas produccion

router.post('/save', validateToken, validateSave, ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles); //limit para sacar solo 5 
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', validateToken, validateSave,  ArticleController.update);
router.delete('/article/:id', validateToken, ArticleController.delete);
router.get('/search/:search', ArticleController.search);

module.exports = router; 