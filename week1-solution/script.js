(function() {
    'use strict';
    angular.module("LunchCheck", []).controller("LunchCheckController", LunchCheckController);
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
      $scope.checkItems = function() {
        if (!$scope.items || $scope.items.length === 0) {
          $scope.msg = "Please enter data first";

        } else {
          var itemsList = $scope.items.split(',');
          var numOfItems = itemsList.length;
          if (itemsList[numOfItems - 1] === '') {
            numOfItems = numOfItems - 1;
          }
          if (numOfItems <= 3) {
            $scope.msg = "Enjoy!";
          } else {
            $scope.msg = "Too much!";
          }
        }
      };
    }
})();
