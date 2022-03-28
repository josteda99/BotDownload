var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const lineReader = require('line-reader');

let id = []

var YD = new YoutubeMp3Downloader({
  "ffmpegPath": "C:/ffmpeg-2022-03-28-git-5ee198f9aa-essentials_build/bin/ffmpeg.exe",
  "outputPath": "C:/Users/USER/Documents/Code/BotDownload/music",
  "youtubeVideoQuality": "highestaudio",
  "queueParallelism": 2,
  "progressTimeout": 2000,
  "allowWebm": false
});

let cont = 0
lineReader.eachLine('url_id.txt', function (line) {
  console.log("cancion n : ", cont += 1)
  YD.download(line);

  YD.on("finished", function (err, data) {
    console.log(JSON.stringify(data));
  });

  YD.on("error", function (error) {
    console.log(error);
  });

  YD.on("progress", function (progress) {
    console.log(JSON.stringify(progress));
  });
});