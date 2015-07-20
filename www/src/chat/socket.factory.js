angular.module('app')
    .factory('socket', function ($rootScope,CHAT_URL) {
        var socket = io.connect(CHAT_URL);


        function test() {
            console.log(test);
        }


        function  on(eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function emit(eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }


        return {
            on  : on,
            emit: emit,
            test: test
        };
    });