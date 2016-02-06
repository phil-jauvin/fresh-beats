var app = angular.module("beats",["ng","infinite-scroll"]).config(function($sceProvider) {
  $sceProvider.enabled(false);
});

app.controller("SongController",["$scope","$http",function($scope,$http){

  $scope.sortBy = "-data.score";
  $scope.displayLimit = 8;

  $scope.sort = function(predicate){
    $scope.displayLimit = 8;
    $scope.sortBy = predicate;
  }

  $scope.more = function(){
    $scope.displayLimit += 8;
  }

  $scope.checkLoaded = function(){
    return ($scope.displayLimit > 100);
  }

  $scope.songs = [];


  $scope.load = function(){

    function embed(song){

      SC.oEmbed(song.data.url, {
        auto_play: false
      }).then(function(embed){
        console.log(song.data.id,embed.html);
        $("#"+song.data.id).html(embed.html);
        //console.log('oEmbed response: ', embed);
      });

    }

    for(song of $scope.songs){
      embed(song);
    }

  }



  $http.post("/api/songs/",{sub:"listentothis",flair:"flair:Hip-hop",limit:50}).success(function(res){

    for(element of res){
      $scope.songs.push(element);
    }

  });

  $http.post("/api/songs/",{sub:"hiphopheads",flair:"",limit:100-$scope.songs.length}).success(function(res){

    for(element of res){
      $scope.songs.push(element);
    }

    console.log($scope.songs[0]);

    $scope.load();


  });

}]);
