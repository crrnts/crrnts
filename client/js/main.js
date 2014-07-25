// main.js contains the logic for nested views
// within the angular.module we require all the local modules we need and within
// the views object when can add and remove subviews with ease

angular.module('trrntsApp.main', [
  'trrntsApp.controllers',
  'trrntsApp.services',
  'trrntsApp.directives',
  'trrntsApp.filters',
  'nvd3ChartDirectives',
  'infinite-scroll'
])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  
  // This is our default state, here we load the templates and the subviews
  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('trrntsApp.main', {
      url: '',
      views: {
        '': {
          // We need this line in order to set the default child view that
          // will be inserted into <div ui-view></div> inside the main template
          templateUrl: 'views/main.tpl.html',
          // We need this line in order to set the default child view that
          // will be inserted into <div ui-view></div> inside the main template
          controller: ['$state', function ($state) {
            if ($state.current.url === '') {
              $state.go('trrntsApp.main.top');
            }
          }]
        },

        'searchMagnets@trrntsApp.main': {
          templateUrl: 'views/searchMagnets.tpl.html',
          controller: 'SearchMagnetLinksController'
        }
      }
    })

  // Everything defined as 'trrntsApp.main.STATE_NAME' will
  // become a child from trrntsApp.main
  .state('trrntsApp.main.top', {
    url: '/top',
    templateUrl: 'views/topMagnets.tpl.html',
    controller: 'TopMagnetLinksController'
  })
  .state('trrntsApp.main.latest', {
    url: '/latest',
    templateUrl: 'views/latestMagnets.tpl.html',
    controller: 'TopMagnetLinksController'
  })
  .state('trrntsApp.main.stats', {
    url: '/stats',
    templateUrl: 'views/worldMap.tpl.html',
    controller: 'WorldMapController'
  })
  .state('trrntsApp.main.about', {
    url: '/about',
    templateUrl: 'views/about.tpl.html'
  })
  .state('trrntsApp.main.search', {
    url: '/search?query',
    templateUrl: 'views/searchMagnets.tpl.html',
    controller: 'SearchResultsController'
  })
  .state('trrntsApp.main.top.detail', {
    url: '/detail',
    templateUrl: 'views/detail.tpl.html',
    controller: 'ModalViewController'
  })
  .state('trrntsApp.main.latest.detail', {
    url: '/detail/:magnetName',
    templateUrl: 'views/detail.tpl.html',
    controller: 'ModalViewController'
  })
  .state('trrntsApp.main.stats.detail', {
    url: '/detail/:magnetName',
    templateUrl: 'views/detail.tpl.html',
    controller: 'ModalViewController'
  })
  .state('trrntsApp.main.billboard', {
    url: '/billboard',
    templateUrl: 'views/billboard.tpl.html',
    controller: 'BillboardViewController'
  });
}]);
