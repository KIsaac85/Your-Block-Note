import express from "express";
import bodyParser from "body-parser";

const app = express();
const port =3000;
const obj = {
  userInput:[]
}
app.use(express.static('public'));
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