const exp = require('express')
const userApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel")
const expressAsyncHandeler = require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor');
const Article = require('../models/articleModel');

// API
userApp.get("/users",expressAsyncHandeler(async (req, res) => {
  const userId = req.headers.authorization?.split(" ")[1]
  console.log("usedj9t5nymr",userId)
  const users = await UserAuthor.find({ _id: { $ne: userId },role: { $ne: 'admin' }}).select("-password");
  console.log("bye")
  res.status(200).send({ msg: "Users", payload: users });

})
)
// create new user
userApp.post("/user",expressAsyncHandeler(createUserOrAuthor))

//read all articles
userApp.get('/articles',expressAsyncHandeler(async (req, res) => {
    const listOfArticles = await Article.find({ isArticleActive: true});
    res.status(200).send({ message: "articles", payload: listOfArticles })
}))

//post comment
userApp.put("/comment/:articleId", expressAsyncHandeler(async (req, res) => {
    // console.log(req.params.articleId)
    const commentObj = req.body;
  
    const articleWithComment = await Article.findOneAndUpdate(
      {articleId:req.params.articleId },
      { $push: { comments: commentObj } }, 
      { new: true } // Ensures the updated document is returned
    );
    // console.log("first",articleWithComment)
    res.status(200).send({ message: "Comment added", payload: articleWithComment });
  }));

  

module.exports = userApp;