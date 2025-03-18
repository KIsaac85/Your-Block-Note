import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Handle path issues for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const obj = {
  userInput:[]
}
// Set EJS and static folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));

function getUserInput(res,req) {
  let input = req.body['uiInput']
  if (!obj.userInput.includes(input)&&input.length!=0) {
    obj.userInput.push(input)
  }
}
app.get("/", (req, res) => {
    res.render('index.ejs')
  });
  app.get("/work", (req, res) => {
    res.render('work.ejs')
  });

app.post("/add", (req, res) => {
  getUserInput(res,req)
    res.render('index.ejs',obj)

});
app.post("/work", (req, res) => {
  getUserInput(res,req)
    res.render('work.ejs',obj)

});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
  });