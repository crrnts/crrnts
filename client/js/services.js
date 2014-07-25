angular.module('trrntsApp.services', [])
.factory('BillboardDataFactory', [function() {
  var getData = function() {
    return {
               "key": "Series 1",
               "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
           },
           {
               "key": "Series 2",
               "values": [ [ 1025409600000 , 0] , [ 1028088000000 , 0] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 0] , [ 1051675200000 , 0] , [ 1054353600000 , 0] , [ 1056945600000 , 0] , [ 1059624000000 , 0] , [ 1062302400000 , 0] , [ 1064894400000 , 0] , [ 1067576400000 , 0] , [ 1070168400000 , 0] , [ 1072846800000 , 0] , [ 1075525200000 , -0.049184266875945] ]
           },
           {
               "key": "Series 3",
               "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
           },
           {
               "key": "Series 4",
               "values": [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
           };
  };

  return {
    getData: getData
  };
}])
// need promise library to pass back a blank promise if validation fails
.factory('MagnetLinksFactory', ['$http', '$q', function ($http, $q) {
  // Submit Magnet URI
  var create = function (magnetURI) {
    return $http({
      method: 'POST',
      url: '/api/magnets',
      data: {'magnetURI': magnetURI}
    });
  };

  // Retrieves latest magents.
  var latest = function (start, stop) {
    return $http({
      method: 'GET',
      url:'api/magnets/latest',
      params: {
        start: start || 1,
        stop: stop || 30
      }
    });
  };

  // Retrieves top magents.
  var top = function (start, stop) {
    return $http({
      method: 'GET',
      url:'api/magnets/top',
      params: {
        start: start || 1,
        stop: stop || 30
      }
    });
  };

  // Searches torrents whose titles contains input.
  var search = function (query) {
    if (typeof(query) !== 'string') {
      return $q.defer().promise;
    }

    return $http({
      method: 'GET',
      url:'api/magnets',
      params: {
        query: query
      }
    });
  };

  var topTen = function(){
    return $http({
      method: 'GET',
      url: 'api/magnets/topTen',
    })
    .then(function(response){
      var parser = new DOMParser();
      response = parser.parseFromString(response.data, 'text/html');
      var movieTable = response.getElementsByClassName('movie_list top_box_office');
      var revenues = movieTable[0].getElementsByClassName('right_col');
      var titles = movieTable[0].getElementsByClassName('middle_col');
      response = [];
      for (var i = 0; i < titles.length; i++){
        var obj = {
          title: titles[i].childNodes[1].textContent,
          revenue: revenues[i].textContent.slice(revenues[i].textContent.indexOf('$'), revenues[i].textContent.indexOf('M') + 1)
        };
        response.push(obj);
      }
      return response;
    });
  };

  return {
    create: create,
    latest: latest,
    top: top,
    search:search,
    topTen: topTen
  };
}])
.factory('SharedService', ['$rootScope', function($rootScope) {
    var sharedService = {};

    sharedService.selectedMagnet = 'default';

    sharedService.prepForBroadcast = function(newMagnet) {
        this.selectedMagnet = newMagnet;
        this.broadcastItem();
    };

    sharedService.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return sharedService;
}])
.factory('GeoFactory', ['$http', function ($http) {
  // Return specified number of Lat&Long with the total number of peers for respective Lat&Long
  var getLL = function (numberOfLls) {
    return $http({
      method:'GET',
      url:'api/locations',
      params: {
        query: 'LatAndLong',
        number: numberOfLls
      }
    });
  };

  // Return specified number of countries with the total number of peers for respective countries
  var getCountry = function (amount) {
    return $http({
      method:'GET',
      url:'api/locations',
      params: {
        query: 'Country',
        number: amount
      }
    });
  };

  // Return specified number of cities with the total number of peers for respective cities
  var getCity = function (amount) {
    return $http({
      method:'GET',
      url:'api/locations',
      params: {
        query: 'City',
        number: amount
      }
    });
  };


  return {
    getLatAndLong : getLL,
    getCountries : getCountry,
    getCities : getCity,
  };
}]);
