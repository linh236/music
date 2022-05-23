var express = require("express");
const { render } = require("express/lib/response");
var router = express.Router();
const fetch = require("node-fetch");

/* GET users listing. */

router.get("/", async function (req, res, next) {
  fetch("http://mp3.zing.vn/xhr/recommend?type=audio")
    .then((response) => response.json())
    .then((json) => {
      // res.json(json.data["items"]);
      res.render("musics/index", { lists: json.data["items"] });
    });
});

router.get("/show/:code", function (req, res, next) {
  fetch(
    `http://mp3.zing.vn/xhr/media/get-source?type=audio&key=${req.params.code}`
  )
    .then((response) => response.json())
    .then((json) => {
      res.render("musics/show", { song: json.data });
    });
});

router.get("/info/:code", function (req, res, next) {
  fetch(
    `https://mp3.zing.vn/xhr/media/get-info?type=audio&id=${req.params.code}`
  )
    .then((response) => response.json())
    .then((json) => {
      res.render("musics/info", { info: json.data["info"] });
    });
});

router.get("/play/:id", function (req, res, next) {
  fetch(
    `http://api.mp3.zing.vn/api/mobile/video/getvideoinfo?keycode=fafd463e2131914934b73310aa34a23f&requestdata={"id":"${req.params.id}"}`
  )
    .then((response) => response.json())
    .then((json) => {
        // res.json(json);

      if (json.source !== undefined) {
        res.render("musics/play", { song: json.source });
        // res.json(json.source);
        console.log(json.source);
      } else {
        res.send("This music not video");
      }
    });
});

router.get("/search", function (req, res, next) {
  if (req.query.search === undefined || req.query.search === "") {
    res.json({ data: [] });
  } else {
    let url = `http://ac.mp3.zing.vn/complete?type=artist,song,key,code&num=500&query=${req.query.search}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // res.json(json.data[0]["song"]);
        res.render("musics/search", { lists: json.data[0]['song'], search: req.query.search });
      });
  }
});

router.get("/top", function(req, res, next) {
  let url = ` http://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // res.json(json.data['song']);
      res.render("musics/search", { lists: json.data[0]['song'], search: req.query.search });
    });
})

module.exports = router;
