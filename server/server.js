// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");
const { response } = require("express");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Connect to database
connectToDb();

// Routing
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);
app.post("/dash",(req,res)=>{
  console.log("");
});
app.get("/dash", async (req,res)=>{
  console.log("");
});
app.post("/search", async(req,res)=>{
  console.log("");
});
app.get("/search", async (req, res ,next ) =>{
  try {
    let result = await collection.aggregate([
      {
        "$search":{
          "text":{
            "query":`${request.query.term}` ,
            "path": "messages.message" ,
            "fuzzy":{
              "maxEdits": 2
            }
          },
          "highlight": {
            "path": "messages.message"
          }
        }
      },
      {
        "$addFields":{
          "highlights":{
            "$meta":"searchHighlights"
          }
        }
      }
    ]).toArray();
    response.send(result);

  } catch (err){
    response.status(500).send({message:e.message});
  }
})

// Start our server
app.listen(process.env.PORT);