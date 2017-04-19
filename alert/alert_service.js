'use strict';
angular
    .module("p_components")
    .provider('alertService',function(){
        var that = this;
        var defaults = {};
        var model = {
            title: '提示',
            content: '内容...'
        };
        angular.extend(this, defaults);

        var alertTemplate = '<div p-alert title="$$alertService.title" content="$$alertService.content" eventok="$$alertService.sure()" eventcancel="$$alertService.cancel()"></div>';

        this.$get = ['$compile', '$rootScope', function ($compile, $rootScope) {
            return {
                comfirm: function(options){
                    var alertWrapper = createElement(alertTemplate);
                    document.body.appendChild(alertWrapper);
                    $compile(alertWrapper)($rootScope);

                    var alertModel = Object.create(model);
                    alertModel = angular.extend(alertModel, that, options);
                    alertModel.$destroy = function () {
                        delete $rootScope.$$alertService;
                    };
                    alertModel.hide = function(){
                       //  $rootScope.$$alertService.word = 2;
                    };
                    $rootScope.$$alertService = alertModel;
                    return alertModel;
                }
            }
        }]
    });

function createElement(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstChild;
}