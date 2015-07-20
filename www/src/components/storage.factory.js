'use strict';

angular.module('app')
    .service('storage', function ($log) {

        var $logService = "storage: ";

        var storage = {};

        function getAll() {
            $log.debug($logService + 'get All:' + key + ' value: ' + value);
            return storage;
        }

        function get(key) {
            $log.debug($logService + 'get key:' + key);
            return storage[key];
        }

        function set(key, value) {
            $log.debug($logService + 'setting key:' + key + ' value: ' + value);
            storage[key] = value;
            return true;
        }

        function remove(key) {
            $log.debug($logService + 'remove key:' + key + ' value: ' + value);
            storage[key] = undefined;
            return true;
        }

        function destroy() {
            return storage = {};
        }

        return {
            getAll : getAll,
            get    : get,
            set    : set,
            remove : remove,
            destroy: destroy
        }

    });
