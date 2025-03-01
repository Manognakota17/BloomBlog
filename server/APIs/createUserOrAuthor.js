const UserAuthor = require("../models/userAuthorModel");
async function createUsrtOrAuthor(req,res){
  //get user or author obj from req
  const newUserAuthor=req.body;
  //find the user by email id
  const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
  //if user or author existed
  if(userInDb!==null)
  {
    //check with role
    if(newUserAuthor.role===userInDb.role)
     {
      res.status(200).send({message:newUserAuthor.role,payload:userInDb})
     }
     else{
      res.status(200).send({message:"Invalid role"})
     }
  }
  else
  {
    let newUser=new UserAuthor(newUserAuthor);
    let newUserOrAuthorDoc=await newUser.save();
    res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
  }
}


module.exports=createUsrtOrAuthor


// const UserAuthor = require("../models/userAuthorModel");

// async function createUserOrAuthor(req, res) {
//   try {
//     // Get user or author object from request body
//     const newUserAuthor = req.body;

//     // Find the user by email ID
//     const userInDb = await UserAuthor.findOne({ email: newUserAuthor.email });

//     if (userInDb !== null) {
//       // If the user is blocked
//       if (!userInDb.isActive) {
//         return res
//           .status(403)
//           .send({ message: "Your account is blocked. Please contact admin." });
//       }

//       // Check if the roles match
//       if (newUserAuthor.role === userInDb.role) {
//         return res
//           .status(200)
//           .send({ message: `Welcome back, ${newUserAuthor.role}`, payload: userInDb });
//       } else {
//         return res.status(400).send({ message: "Invalid role" });
//       }
//     } else {
//       // Create a new user or author
//       const newUser = new UserAuthor(newUserAuthor);
//       const newUserOrAuthorDoc = await newUser.save();
//       return res.status(201).send({
//         message: `Successfully created ${newUserOrAuthorDoc.role}`,
//         payload: newUserOrAuthorDoc,
//       });
//     }
//   } catch (error) {
//     console.error("Error creating user or author:", error);
//     return res
//       .status(500)
//       .send({ message: "Internal server error", error: error.message });
//   }
// }

// module.exports = createUserOrAuthor;
