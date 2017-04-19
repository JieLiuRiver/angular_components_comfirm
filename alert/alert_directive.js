
'use strict';
angular
    .module("p_components")
    .directive("pAlert",function(){
        var directive = {
            link : link,
            templateUrl: "./alert/alert.tpl.html",
            restrict : "A",
            replace: true,
            transclude: true,
            scope : {
                title: "=",
                content: "=",
                eventok: '&',
                eventcancel: '&'
            }
        };
        return directive;

        /*===============*/
        function link(scope, element, attrs, vm){
            console.log('scope',scope);
            console.log('element',element);
            console.log('attrs',attrs);

            scope.isNeed = true;
            scope.okaction = function(){
                scope.isNeed = false;
                scope.eventok && scope.eventok();
            }
            scope.close = function(){
                scope.isNeed = false;
                scope.eventcancel && scope.eventcancel();
            }
        }
    });