var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const ytMusic = require("node-youtube-music");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // res.send('respond with ');
  fetch("http://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1")
    .then((response) => response.json())
    .then(
      (json) => {
        res.render("users", { lists: json.data['song'] });
      }
    );
});

module.exports = router;
