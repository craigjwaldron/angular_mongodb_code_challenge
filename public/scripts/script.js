console.log("hello from script.js");

var myApp = angular.module( 'myApp', [] );

// --------------------------------------------------------

myApp.controller( "addHeroController", [ "$scope", "$http", function( $scope, $http ){
  $scope.addHero = function(){
    console.log("button clicked");

    var newHero = {
      alias: $scope.aliasIn,
      firstName: $scope.firstNameIn,
      lastName: $scope.lastNameIn,
      city: $scope.cityIn,
      power: $scope.powerNameIn
    }; // End of newHero object

console.log("New hero: ", newHero);

$http({
  method:'POST',
  url:'/addHero',
  data: newHero
    }); // End of http
    $scope.aliasIn ='';
    $scope.firstNameIn ='';
    $scope.lastNameIn ='';
    $scope.cityIn='';
    $scope.powerNameIn='';
  }; // End of $scope.addHero = function
}]); // End of addHeroController

// --------------------------------------------------------

// List controller to view list
myApp.controller('listController', [ '$scope', '$http', function ($scope, $http) {
  $scope.allHeroes = [];

  $scope.showHeroes = function(){
    console.log( 'in get Heroes' );
  $http({
  method: 'GET',
  url:'/getHeroes'
}).then(function( response ){
  $scope.allHeroes = response.data;
  console.log("GET RESPONSE: ", $scope.allHeroes);
    }); // End of then function
  }; // End of $scope.showAllPets
  $scope.showHeroes();

// ---------

// App. Delete
$scope.remove = function(index){
  console.log("button clicked");
  $scope.allHeroes.splice(this.$index, 1);
  };
}]); // End of list controller
