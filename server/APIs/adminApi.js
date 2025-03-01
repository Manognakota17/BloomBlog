const express = require("express");
const adminApp = express.Router();
const UserAuthor = require("../models/userAuthorModel");
const createUserOrAuthor = require('./createUserOrAuthor');
const expressAsyncHandler=require("express-async-handler")
// const {requireAuth}=require("@clerk/express")

// create new author
adminApp.post("/admin", expressAsyncHandler(createUserOrAuthor))

// block / unblock 
adminApp.put("/admin/block-unblock/:id",expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("haiii ra")
  const { blocked } = req.body; 

  if (blocked === undefined) {
    return res.status(400).send({ message: "Blocked status is required" });
  }

  // console.log("id:", id, "blocked:", blocked);

  try {
    const userAuthor = await UserAuthor.findByIdAndUpdate(id, { blocked }, { new: true } );

    if (!userAuthor) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: `User ${blocked ? 'blocked' : 'unblocked'} successfully`, payload: userAuthor });
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}));


adminApp.get('/unauthorized',(req,res)=>{
  res.send({message:"Unauthorized request"})
})

module.exports = adminApp;