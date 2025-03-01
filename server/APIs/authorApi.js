const exp = require('express');
const authorApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor');
const Article = require('../models/articleModel');

// API Test Route
authorApp.get("/", (req, res) => {
    res.send({ msg: "This is from author API" });
});

// Create new author
authorApp.post("/author", expressAsyncHandler(createUserOrAuthor));

// Create new article
authorApp.post("/article", expressAsyncHandler(async (req, res) => {
    const newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const articleObj = await newArticle.save();
    res.status(201).send({ msg: "Article published", payload: articleObj });
}));

// Read all articles
authorApp.get('/articles', expressAsyncHandler(async (req, res) => {
    const listOfArticles = await Article.find({ isArticleActive: true });

    console.log("Returning articles:", listOfArticles); // Debugging log

    if (listOfArticles.length === 0) {
        return res.status(200).send({ message: "articles", payload: [] }); // Return empty array instead of failing
    }

    res.status(200).send({ message: "articles", payload: listOfArticles });
}));

// Modify an article by article id
authorApp.put('/article/:articleId', expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const dbRes = await Article.findByIdAndUpdate(modifiedArticle._id, { ...modifiedArticle }, { returnOriginal: false });
    res.status(200).send({ msg: "Article modified", payload: dbRes });
}));

// Soft delete/restore an article
authorApp.put('/articles/:articleId', expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const dbRes = await Article.findByIdAndUpdate(modifiedArticle._id, { ...modifiedArticle }, { returnOriginal: false });
    res.status(200).send({ msg: "Article deleted or restored", payload: dbRes });
}));

// Add comment to an article
authorApp.put('/articles/:articleId', expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    const dbRes = await Article.findByIdAndUpdate(modifiedArticle._id, { ...modifiedArticle }, { returnOriginal: false });
    res.status(200).send({ msg: "Comment added", payload: dbRes });
}));

// Filter by category
authorApp.get('/articles/filter/:category', expressAsyncHandler(async (req, res) => {
    const category = req.params.category;
    const listOfArticles = await Article.find({ category, isArticleActive: true });

    console.log(`Filtering articles for category: ${category}`, listOfArticles); // Debugging log

    return res.status(200).send({ message: "articles", payload: listOfArticles }); // Standardized key name
}));


module.exports = authorApp;
