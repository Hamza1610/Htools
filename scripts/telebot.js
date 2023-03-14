const TelegramBot = require("node-telegram-bot-api");
const RtspStream = require("node-rtsp-stream");
const { spawn } = require("child_process");
// create a Telegram bot instance
const bot = new TelegramBot("6126047592:AAHC3W631D9a8W20eRhlRdGonHS-FuP7LCI", { polling: true });

// create an RTSP stream instance with default settings
const stream = new RtspStream({
  name: "live",
  url: "rtsp://localhost:3000",
});

// function to send live video stream to Telegram
function sendLiveStreamToTelegram(chatId) {
  // start the RTSP stream
  stream.start();
  // log to stream start
  console.log("Streaming started!");
  // send a message to Telegram with a video note that has the live video stream attached
  bot.sendVideoNote(chatId, stream.m3u8, { duration: 30 }).then(() => {
    console.log("Live stream sent to Telegram.");
    // stop the RTSP stream
    stream.stop();
    console.log("Steam stopped!");
    });
  }
