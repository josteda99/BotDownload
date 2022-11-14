var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const lineReader = require("line-reader");

let id = [];

var YD = new YoutubeMp3Downloader({
  ffmpegPath:
    "C:/ffmpeg-2022-03-28-git-5ee198f9aa-essentials_build/bin/ffmpeg.exe",
  outputPath: "C:/Users/USER/Documents/Code/BotDownload/music",
  youtubeVideoQuality: "highestaudio",
  queueParallelism: 2,
  progressTimeout: 2000,
  allowWebm: false,
});

let cont = 0;
lineReader.eachLine("url_id.txt", function (line) {
  // get youtube id
  console.log("song n : ", (cont += 1));
  var video_id = line.split("v=")[1];
  if (video_id) {
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    YD.download(video_id);
  } else {
    YD.download(line);
  }

  YD.on("finished", function (err, data) {
    console.log(JSON.stringify(data));
  });

  YD.on("error", function (error) {
    console.log(line, "video_id: ", video_id);
    console.log(error);
  });

  YD.on("progress", function (progress) {
    console.log(JSON.stringify(progress));
  });
});
