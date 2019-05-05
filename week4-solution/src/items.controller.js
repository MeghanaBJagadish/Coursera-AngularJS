(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['items']
function ItemsController(items) {
  var itemsCtrl = this;
  itemsCtrl.items = items;
}

})();
