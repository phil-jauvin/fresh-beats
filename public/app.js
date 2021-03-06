var app = angular.module("beats",["ng","infinite-scroll"]).config(function($sceProvider) {
  $sceProvider.enabled(false);
});

app.controller("SongController",["$scope","$http",function($scope,$http){

  // --- Let's initialise some variables ---

  // default sorting by score
  $scope.sortBy = "-data.score";

  // Multiplier is the amount of tracks we load everytime we call load()
  $scope.multiplier = 4;
  $scope.displayLimit = $scope.multiplier;

  // Contains all the posts we fetch from reddit
  $scope.songs = [];


  // --- functions ---

  // Embeds soundcloud widgets
  $scope.load = function(){

    function embed(song){

      // oEmbed() returns a promise

      SC.oEmbed(song.data.url, {
        auto_play: false
      }).then(function(embed){

        // Sucess: embed the widget in the proper div

        //console.log(song.data.id,embed.html);
        $("#"+song.data.id).html(embed.html);
        //console.log('oEmbed response: ', embed);
      }).catch(function(){

        // Failure: we can't get the track for some reason so just delete the parent element

        //console.log("removing","#"+song.data.id);
        $("#"+song.data.id).parent().remove();
      });

    }

    for(song of $scope.songs){

      if ( $("#"+song.data.id).children().length == 0 ){
        embed(song);
      }

    }

  }

  // Changes what we sort by and resets the amount of players loaded
  $scope.sort = function(predicate){
    $scope.displayLimit = $scope.multiplier;
    $scope.sortBy = predicate;
    $scope.load();
  }

  // Called when user scrolls to the bottom
  $scope.more = function(){
    $scope.displayLimit += $scope.multiplier;
    $scope.load();
  }

  // Called to check when to stop loading more posts
  $scope.checkLoaded = function(){
    return ($scope.displayLimit > 100);
  }


  // --- Code to run when the page loads ---

  $http.post("/api/songs/",{sub:"listentothis",flair:"flair:Hip-hop",limit:50}).success(function(res){

    for(element of res){
      $scope.songs.push(element);
    }

  });

  $http.post("/api/songs/",{sub:"hiphopheads",flair:"",limit:100-$scope.songs.length}).success(function(res){

    for(element of res){
      $scope.songs.push(element);
    }

    //console.log($scope.songs[0]);

    $scope.load();

  });

}]);
