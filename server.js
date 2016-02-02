var express = require("express");
var r = require("nraw");

var reddit = new r("lolbot");

var app = express();

// Use public folder
app.use(express.static(__dirname+"/public/"));

// Homepage route
app.get("/",function(req,res){
  res.sendFile(__dirname+"/public/index.html");
});

app.get("/api/songs",function(req,res){

  reddit.search("subreddit:hiphopheads site:soundcloud.com").from("week").sort("top").exec(function(data){
    console.log(data.data.children[0].data.url);

    for(var i=0;i<data.data.children.length;i++){
      data.data.children[i].data.url = "https://w.soundcloud.com/player/?url="+data.data.children[i].data.url;
    }

    res.send(data.data.children);

  });

});

// Start the server
app.listen(5000,function(){
  console.log("Server listening on port 5000");
});
