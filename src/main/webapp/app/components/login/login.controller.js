(function () {
    'use strict';

    angular
        .module('footballBeApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$localStorage', '$state', '$timeout', 'Auth', '$uibModalInstance'];

    function LoginController($rootScope, $localStorage, $state, $timeout, Auth, $uibModalInstance) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.password = null;
        vm.register = register;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;

        $timeout(function () { angular.element('#username').focus(); });

        function cancel() {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            $uibModalInstance.dismiss('cancel');
        }

        function login(event) {
            event.preventDefault();

            Auth.storePreviousState($state.current.name, $state.params);

            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                if (angular.isUndefined($localStorage.userid)) {
                    vm.authenticationError = true;
                } else {
                    vm.authenticationError = false;
                    $uibModalInstance.close();
                    if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                        $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                        $state.go('home', null, { reload: true });
                    }

                    $rootScope.$broadcast('authenticationSuccess');

                    // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // since login is successful, go to stored previousState and clear previousState
                    if (Auth.getPreviousState()) {
                        var previousState = Auth.getPreviousState();
                        Auth.resetPreviousState();
                        $state.go(previousState.name, previousState.params, { reload: true });
                    }
                }
            }).catch(function () {
                vm.authenticationError = true;
            });

            // $state.go('home');
            // $uibModalInstance.dismiss('cancel');
        }

        function register() {
            $uibModalInstance.dismiss('cancel');
            $state.go('register');
        }

        function requestResetPassword() {
            $uibModalInstance.dismiss('cancel');
            $state.go('requestReset');
        }
    }
})();
