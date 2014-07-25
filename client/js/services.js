angular.module('trrntsApp.services', [])
.factory('BillboardDataFactory', function() {
  var getData = function() {
    return [{
            "key": "Box Office Revenue",
            "values": [ ["Dawn Of The Planet Of The Apes" , 36300000] , 
                        ["The Purge: Anarchy" , 29800000] , 
                        ["Planes: Fire And Rescue" , 17500000], 
                        ["Sex Tape", 14600000], 
                        ["Transformers: Age of Extinction", 9800000], 
                        ["Tammy", 7400000], 
                        ["22 Jump Street", 4700000], 
                        ["How to Train Your Dragon 2", 3900000], 
                        ["Earth to Echo", 3300000], 
                        ["Maleficent", 3200000] ]
           },
           {
             "key": "Box Office Revenue",
             "values": [ ["Dawn Of The Planet Of The Apes" , 36300] , 
                         ["The Purge: Anarchy" , 2980] , 
                         ["Planes: Fire And Rescue" , 1100], 
                         ["Sex Tape", 14600], 
                         ["Transformers: Age of Extinction", 98000], 
                         ["Tammy", 7410], 
                         ["22 Jump Street", 47000], 
                         ["How to Train Your Dragon 2", 390000], 
                         ["Earth to Echo", 300], 
                         ["Maleficent", 32000] ]
           }];
  };         
  return {
    getData: getData
  };
})
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
