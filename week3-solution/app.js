(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'MenuListItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  //Returns true if list is empty
  list.checkFoundList = function () {
	return typeof list.items !== 'undefined' && list.items.length === 0
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItCtrl = this;

  //Search action
  narrowItCtrl.narrowItDown = function (searchTerm) {
	//Search only when searchTerm is not empty
	if (searchTerm) {
		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
		promise.then(function (response) {
		  narrowItCtrl.found = response;
		})
		.catch(function (error) {
		  console.log(error);
		});
	} else {
		narrowItCtrl.found = [];
	}

  };

   narrowItCtrl.removeItem = function (itemIndex) {
    this.lastRemoved = "Last item removed was " + narrowItCtrl.found[itemIndex].name;
    narrowItCtrl.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http','$filter','ApiBasePath'];
function MenuSearchService($http,$filter,ApiBasePath) {
  var service = this;
    service.lowercase = $filter('lowercase')
    service.getMatchedMenuItems = function (searchTerm) {
      var searchTextL = service.lowercase(searchTerm)
	return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
		var foundItems = [];
		var menuItemsLength = response.data.menu_items.length;
		for (var i = 0; i < menuItemsLength; i++) {
			var item = response.data.menu_items[i];
			if (item.description.indexOf(searchTextL) !== -1) {
				foundItems.push(item);
			}
		};
		return foundItems;
    });
  };
}

})();
