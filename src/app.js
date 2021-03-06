var render = angular.module('render', []);

var caribbeanWarApp = angular.module('caribbean-war', [
	'ui.router',
	'ngResource',
	'pascalprecht.translate',
	'render'
]);

caribbeanWarApp.constant('appConfig', {
	languages: [
		{
			id: 0,
			label: 'English',
			code: 'en-EN'
		},
		{
			id: 1,
			label: 'Русский',
			code: 'ru-RU'
		},
		{
			id: 2,
			label: 'Zulu',
			code: 'zu-ZU'
		}
	],
	servers: [
		{
			id: 0,
			url: 'wss://warm-crag-3328.herokuapp.com/ws',
			label: 'Heroku Warm Crag'
		},
		{
			id: 1,
			url: 'ws://localhost:80/ws',
			label: 'Local Go Server'
		},
		{
			id: 2,
			url: 'ws://localhost:1337/ws',
			label: 'Node Echo One (NEO)'
		}
	]
});

caribbeanWarApp.config(['$translateProvider', 'appConfig', function ($translateProvider, appConfig) {
	$translateProvider.useStaticFilesLoader({
		prefix: 'locale/langs/',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage(localStorage.locale || appConfig.languages[0].code);
}]);

caribbeanWarApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('login');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login/login-template.html',
			controller: "loginCtrl"
		})

	.state('harbor', {
		url: '/harbor',
		templateUrl: 'templates/harbor/harbor-template.html',
		controller: "harborCtrl"
	})

	.state('world', {
		url: '/world',
		templateUrl: 'templates/world/world-template.html',
		controller: "worldCtrl"
	});
});
