angular.module('caribbean-war')
	.controller('appCtrl', ['$scope', '$rootScope', '$q', '$state', 'audioControl', 'renderHandler',
		function ($scope, $rootScope, $q, $state, audioControl, renderHandler) {

			$scope.appLoading = true;
			$scope.pageLoading = true;
			$scope.errorShown = false;

			$scope.manageTasks = function (tasks) {
				$scope.appLoading = true;
				$q.all(tasks).then(function () {
					$scope.appLoading = false;
					$scope.pageLoading = false;
				}, function () {
					console.log('fail');
				});
			};

			$scope.manageTasks([audioControl.loadSoundFile('js/sound/theme.mp3', 'music')/*, audioControl.loadSoundFile('js/sound/ocean.mp3', 'effects')*/]);

			$rootScope.$on('error', function (event, type) {
				console.log(type);
				if (type) {
					$scope.errorType = type;
					$scope.errorShown = true;
				}
			});

			$scope.errorHide = function () {
				$scope.errorType = '';
				$scope.errorShown = false;
			}

			$rootScope.$on('$stateChangeStart',
				function (event, toState) {
					$scope.errorShown = false;
					//renderHandler.dispose();
				});

			$rootScope.$on('$stateChangeSuccess',
				function (event, toState) {
					//renderHandler.load(toState.name);
					//$scope.manageTasks([]);
				});

			$rootScope.$on('$stateChangeError',
				function (event, toState) {
					$scope.errorType = 'ERROR_ROUT';
					$scope.errorShown = true;
				});
		}
	]);
