angular.module('app')
    .directive("circleBlink", function () {
        return function (scope, element, attrs) {

            var t1 = new TimelineMax({repeat:-1,yoyo: true})
                .add(TweenMax.to(element, 1, {height: 280, width: 280}));


        }
    })
    .directive("circleInternalBlink", function () {
        return function (scope, element, attrs) {

            var t1 = new TimelineMax({repeat:-1,yoyo: true})
                .add(TweenMax.to(element, 1, { border: '4px solid #ef473a'}));


        }
    });