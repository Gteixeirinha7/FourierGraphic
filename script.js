(function () {
    var fourierApp = angular.module('shoppingCartApp', ['']);

    fourierApp.controller('FourierController', ['$scope', '$http', '$sce', '$filter', function (scope, http, $sce, $filter) {
        window.scrollTo(0, 0);

        scope.base ={
            selectedRA = '081170023'
        }
        scope.init = function(){

        }
    }]);
})();

function globalMethod(){

}