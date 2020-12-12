"use strict";

const Article = require("../models/article");
const fs = require("fs");
const path = require("path");

const controller = {
  save: (req, res) => {
    //Recoger parametros por post
    const params = req.body;

    //asignar valores
    const article = new Article();
    article.title = params.title;
    article.content = params.content;
    article.image = null;

    //guardar el articulo
    article.save((err, articleStored) => {
      if (err || !articleStored) {
        return res.status(404).json({
          status: "error",
          message: "El articulo no se ha guardado!",
        });
      }

      //devuelvo respuesta positiva

      return res.status(200).json({
        status: "success",
        article: articleStored,
      });
    });
  }, //end save article

  getArticles: (req, res) => {
    const query = Article.find({});

    const last = req.params.last;
    if (last === "limit") {
      query.limit(5);
    }

    //Find
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error al devolver los articulos!",
        });
      }

      if (!articles) {
        return res.status(404).json({
          status: "error",
          message: "No hay articulos para mostrar!",
        });
      }

      return res.status(200).json({
        status: "success",
        articles,
      });
    });
  },

  getArticle: (req, res) => {
    //Recoger el id de la url
    const articleId = req.params.id;
    //Comprobar que exista
    if (!articleId || articleId == null) {
      return res.status(404).json({
        status: "error",
        message: "No existe el articulo!",
      });
    }
    //Buscar el articulo
    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(404).json({
          status: "error",
          message: "No existe el articulo.",
        });
      }

      return res.status(200).json({
        status: "success",
        article,
      });
    });
  },

  update: (req, res) => {
    //Recoger el id del articulo por la URL
    const articleId = req.params.id;

    //Recoger los datos que llegan por put
    const params = req.body;

    //Hace un  find and update
    Article.findOneAndUpdate(
      { _id: articleId },
      params,
      { new: true },
      (err, articleUpdated) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Error al actualizar!!!",
          });
        }
        if (!articleUpdated) {
          return res.status(404).json({
            status: "error",
            message: "No existe el articulo!!!",
          });
        }
        return res.status(200).json({
          status: "success",
          article: articleUpdated,
        });
      }
    );
  },

  delete: (req, res) => {
    //Recoger el id de la URL

    const articleId = req.params.id;

    // Hacer un find and delete

    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error al eliminar!!!",
        });
      }
      if (!articleRemoved) {
        return res.status(404).json({
          status: "error",
          message: "El articulo no puede borrarse porque no existe!!!",
        });
      }

      return res.status(200).json({
        status: "success",
        message: `El articulo: ${articleId} ha sido eliminado.`,
      });
    });
  },


  search: (req, res) => {
    //Sacar el string a buscar
    const searchString = req.query.data;

    //Find or
    Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Error en la petición",
          });
        }

        if (!articles || articles.length <= 0) {
          return res.status(200).json({
            status: "error",
            message: "No hay articulos que coincidan con la busqueda",
          });
        }

        return res.status(200).json({
          status: "success",
          articles,
        });
      });
  },
}; //end controller

module.exports = controller;
