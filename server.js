var express = require("express");
var r = require("nraw");
var bodyParser = require("body-parser");

var reddit = new r("lolbot");

var app = express();

// Middleware
app.use(express.static(__dirname+"/public/"));
app.use(bodyParser());

// Homepage route
app.get("/",function(req,res){
  res.sendFile(__dirname+"/public/index.html");
});

app.post("/api/songs/",function(req,res){

  reddit.search("subreddit:"+String(req.body.sub)+" site:soundcloud.com "+String(req.body.flair)).from("day").sort("hot").limit(req.body.limit).exec(function(data){

    for(var i=0;i<data.data.children.length;i++){
      data.data.children[i].data.url = "https://w.soundcloud.com/player/?url="+data.data.children[i].data.url;
      data.data.children[i].data.permalink = "http://www.reddit.com"+data.data.children[i].data.permalink;
    }

    res.send(data.data.children);

  });

});

// Start the server
app.listen(5000,function(){
  console.log("Server listening on port 5000");
});
