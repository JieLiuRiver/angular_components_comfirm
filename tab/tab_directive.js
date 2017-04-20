
'use strict';
angular
    .module("p_components")
    .directive("pTab",function(){
        var directive = {
            link : link,
            templateUrl: "./tab/tab.tpl.html",
            restrict : "A",
            replace: true,
            transclude: true,
            scope : {
                dataoption: '=',
                eventchange: '&'
            }
        };
        return directive;

        /*===============*/
        function link(scope, element, attrs, vm){

            console.log(scope);
            scope.tabTitleList = [];
            scope.tabContentList = [];
            scope.changeTabAction = changeTabAction;
            var defaultTitleList = [
                {
                    title: '标题1',
                    active: true,
                },{
                    title: '标题2',
                    active: false
                }
            ];
            var defaultContentList = [
                {
                    content: '1',
                    active: false
                },
                {
                    content: '2',
                    active: false
                }
            ];

            _init();

            /**
             *  切换选项卡
             */
            function changeTabAction(index){
                changeActiveFromArray(scope.tabTitleList, index, 'active');
                changeActiveFromArray(scope.tabContentList, index, 'active');
                scope.eventchange({r:index});
            }

            /**
             * 更改当前状态
             * @param arr
             * @param index
             * @param property
             */
            function changeActiveFromArray(arr, index, property){
                angular.forEach(arr, function(_item, _index){
                    _item[property] = false;
                });
                arr[index][property] = true;
            }

            /**
             * 初始化
             * @private
             */
            function _init(){
                scope.tabTitleList = angular.extend(scope.tabTitleList, defaultTitleList, scope.dataoption.titleList);
                scope.tabContentList = angular.extend(scope.tabContentList, defaultContentList, scope.dataoption.contentList);
                var activeIndex = -1;
                angular.forEach(scope.tabTitleList, function(itemTitle, indexTitle){
                    if (itemTitle.active) {
                        activeIndex = indexTitle
                    }
                });
                if (activeIndex !== -1) {
                    angular.forEach(scope.tabContentList, function(itemContent, indexContent){
                        if (indexContent === activeIndex) {
                            itemContent.active = true;
                        }
                    })
                }
            }
        }
    });


function getStyle(obj,attr){
    if( obj.currentStyle ){
        return obj.currentStyle[attr]
    }else{
        return getComputedStyle(obj )[attr]
    }
}