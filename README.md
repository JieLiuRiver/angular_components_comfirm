
## 依赖 
AngularJS v1.5.2
layui-v1.0.9

## 功能
点击按钮，居中弹出提示框，提示信息，有确认，取消2个按钮进行操作

## demo演示图：
![image](http://heliujie.com/static/images/angular/comfirm.gif)

## 使用方法
    
```
<!DOCTYPE html>
<html lang="en" ng-app="app">

<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="layer/layer.css">
    <title>progress</title>
    <style>
        .wrapper{
            margin-top: 30px;
            width: 600px;
        }
    </style>
</head>

<body>

<div ng-controller="MainController as vm">
    <div class="container wrapper">
        <button type="button" class="layui-btn layui-btn-small" ng-click="vm.doit()">点击弹出提示框</button>
    </div>
</div>
</body>

<script src="angular.js"></script>
<script src="angular_components.js"></script>
<script src="alert/alert_service.js"></script>
<script src="alert/alert_directive.js"></script>
<script>
    angular
        .module('app',['p_components'])
            .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$rootScope', 'alertService'];

    function MainController($scope, $rootScope, alertService) {
        var vm = this;
        vm.doit = function(){
            alertService.comfirm({
                title: '提示信息',
                content: '操作成功！',
                sure: function(){
                    alert("您点击了确定");
                },
                cancel: function(){
                    alert("您点击了取消");
                }
            })
        }
    }
</script>

</html>
```

## 组件编写
    
### 组件模块定义文件
angular_components.js
    
    
```
'use strict';
angular
  .module("p_components", []);
```

### 组件供应商Provider文件

alert_service.js
    
```
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
```

### 组件指令文件
alert_directive.js

    
```
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
```

### 组件模板文件
alert.tpl.html
    
```
<div ng-show="isNeed">
    <div class="layui-layer-shade" style="background:#000;opacity:.1"></div>

    <div class="layui-layer layui-layer-page  layer-anim" style="z-index: 19891021; top: calc( 50% - 81px ); left: calc( 50% - 132px );">
        <div class="layui-layer-title">{{ title }}</div>
        <div class="layui-layer-content">
            <div style="padding: 20px 100px;">{{content}}</div>
        </div>
        <span class="layui-layer-setwin">
            <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" ng-click="isNeed = false"></a>
        </span>
        <div class="layui-layer-btn layui-layer-btn-c">
            <a class="layui-layer-btn0 layui-btn-small" ng-click="okaction()">确定</a>
            <a class="layui-layer-btn0 layui-btn-small" ng-click="close()">取消</a>
        </div>
        <span class="layui-layer-resize"></span>
    </div>

</div>
```

    
