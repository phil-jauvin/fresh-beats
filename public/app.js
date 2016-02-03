var app = angular.module("beats",["ng"]).config(function($sceProvider) {
  $sceProvider.enabled(false);
});

app.controller("SongController",["$scope","$http",function($scope,$http){

  $scope.songs = [];

  $http.post("/api/songs/",{sub:"hiphopheads",flair:""}).success(function(res){

    for(element of res){
      $scope.songs.push(element);
    }

  });

  $http.post("/api/songs/",{sub:"listentothis",flair:"flair:Hip-hop"}).success(function(res){

    for(element of res){
      $scope.songs.push(element);
    }

  });

}]);
