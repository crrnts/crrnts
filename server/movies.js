//uncomment this page to use DB

// var _ = require('lodash'),
//     redis = require('../redis')(),
//     parseMagnetURI = require('magnet-uri'),
//     magnets = require('./magnets');
//     dbURI = require('../main/dbauth.js').dbURI;
// var mongoClient = require('mongodb').MongoClient;
// var util = {};
// var movies = {};

// // creating DB schema for mongoLab DB - uncomment lines below for local mongodb deployment. 
// // Otherwise the movies collection is created throught the Mongolab interface
// // mongoClient.connect(dbURI, function(err,db){
// //   db.createCollection('movies',function(err,collection){});
// //   db.createIndex('movies', {'movieTitle':1},{'unique': true}, function(err,db){});
// //   db.createIndex('movies', {'totalPeers':1},{'unique': false}, function(err,db){});
// //   db.createIndex('movies', {'totalBoxOfficeRevenue':1},{'unique': false}, function(err,db){});
// //   db.createIndex('movies', {'openingBoxOfficeRevenue':1},{'unique': false}, function(err,db){});
// //   db.close();
// // });


// //this code creates a new movie entry in the movie database
// movies.create = function(movieName, obj, callback){

//   //todo add in check for exists
//   mongoClient.connect(dbURI, function(err,db){
//     if(err){
//       callback(err);
//     }else{
//       console.log("Connected to DB");
//       var collection = db.collection('movies');
//       collection.insert({movieName: movieName}, function(err, results){
//         if(err){console.log(err);}
//       });
//     }

//     if(obj){
//       movies.update(movieName, obj, callback);
//     }else{
//      callback(null, {movieName: movieName}); 
//     }
//     // may need to uncomment that later
//     // db.close();
//   });
// };

// movies.update = function(movieName, obj, callback){
//   // mongoClient.connection(dbURI, function(err,db){
//   //   if(err){
//   //     callback(err);
//   //   }else{
//       console.log("Updating DB entry to include moview properties");
//       var collection = db.collection('movies');
//       collection.insert({movieName: movieName}, $set{
//         magnetLinksArray: obj.magnetLinksArray;
//       })
//     }
//   // })
// };



// movie.updatePeerCount = function(){
//   mongoClient.connect(auth.dbAuth.dbUri, function(err,db){
//     if (err){
//       throw err;
//     } else{
//       var collection = db.collection('movies');
//       movies.find({},{movieName:1,magnets:1}, function(err,result){
//         if (err){
//           console.log(err);
//           return;
//         }
//         var i = 0;
//         var updateMovie = function(){
//           if (i === result.length){
//             return;
//           }
//           magnets.getPeers(results[i].magnets, function(err, peers){
//             if (err){
//               console.log(err);
//               return;
//             }
//             movies.update({_id:results[i]._id}, {$set {totalPeers: peers}}, function(err, res){
//               if (err){
//                 console.log(err)
//                 return;
//               }
//               i++;
//               setTimeout(function(){updateMovie();},1000);
//             });
//           });
//         }
//         updateMovie();
//       })
//     }
//   });
// }



// // //creates a movie key value pair in the redis db
// // //if optional obj is included adds those values to the pair
// // movies.create = function(movieName, obj, callback){
// //   if (typeof movieName != 'string'){
// //     callback('Invalid Movie Name');
// //     return;
// //   }
// //   var movieNameNoWhiteSpace = replaceWhitespace(movieName);
// //   redis.exists('movie:' + movieNameNoWhiteSpace, function(err,exists){
// //     if (exists){
// //       callback(new Error('This movie has already been submitted!'));
// //     } else {
// //       var movie = {};
// //       movie.name = movieName;

// //       movie.nameNoWhiteSpace;
// //       if (obj){
// //         if (obj.magnets){
// //           movie.magnets = [];
// //           for (var i = 0; i < obj.mangets.length; i++){
// //             magnets.create('127.0.0.1', obj.magnets[i], function(err, magnet){
// //               if (err){
// //                 console.log(err);
// //               }
// //               else{
// //                 movie.magnets.push(magnet.infoHash);
// //               }
// //             });
// //           }
// //         }
// //         if (obj.boxOffice){
// //           movie.boxOffice = obj.boxOffice;
// //         }
// //       }
// //       movie.peers = 0;
// //       movie.createdAt = _.now();
// //       redis.hmset('movie:' + movie.nameNoWhiteSpace, movie);
// //       redis.zadd('movies:top', movie.peers, movie.nameNoWhiteSpace);
// //       redis.zadd('movies:latest', movie.createdAt, movie.movieNameNoWhiteSpace);
// //       redis.sadd('movies:all', movie.nameNoWhiteSpace);
// //     }
// //     callback(null, movie);
// //   });
// // };

// module.exports = exports = movies;
