var app = angular.module('dynamic-tree', []);

app.controller('MainCtrl', [
  '$scope', 'TreeService', 
function($scope, TreeService) {
  $scope.root = TreeService.new();
}]);