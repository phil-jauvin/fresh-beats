var app = angular.module("beats",["ng"]).config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

app.controller("SongController",["$scope","$http",function($scope,$http){

  $http.get("/api/songs").success(function(res){
    $scope.songs = res;
  });


}]);
