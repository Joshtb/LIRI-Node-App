require("dotenv").config();
var Twitter =require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request")
var fs = require("fs");
var keys = require('./keys.js');



var spotifyk =new Spotify(keys.spotify);
var clientt = new Twitter(keys.twitter);


if (process.argv[2] === "my-tweets"){
var params = {screen_name: 'Joshtb4'};
clientt.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log( tweets[0].created_at);
    console.log( tweets[0].text);
    console.log(tweets[1].created_at);
    console.log(tweets[1].text);
    console.log(tweets[2].created_at);
    console.log(tweets[2].text);
    console.log(tweets[3].created_at);
    console.log(tweets[3].text);
    console.log(tweets[4].created_at);
    console.log(tweets[4].text);
    console.log(tweets[5].created_at);
    console.log(tweets[5].text);
    console.log(tweets[6].created_at);
    console.log(tweets[6].text);
    



  }else if (error) {
    
    console.log(error);
  }
  
    
  
});
}


var trackSearch;
var nodeArgs = process.argv;
if (process.argv[2] === "spotify-this-song"){
 trackSearch = process.argv[3];
 var trackSearch = "";
 for (var i = 3; i < nodeArgs.length; i++) {
     trackSearch = trackSearch + " " + nodeArgs[i];
     spotifySearch(trackSearch);
 };
}
if(trackSearch === ""){
    
  trackSearch = "The%20Sign%20Ace%20of%20Base";
  spotifySearch(trackSearch);
}

function spotifySearch(){
spotifyk.search({ type: 'track', query: trackSearch ,limit:2 }, function(err, data) {
    // if (err) {
    //   return console.log('Error occurred: ' + err);
    // }
 
      // trackSearch = process.argv[3] + process.argv[4] 
      console.log("The name of the song is " + data.tracks.items[0].name)
  console.log("The artist is " + data.tracks.items[0].album.artists[0].name);
console.log("The album is " + data.tracks.items[0].album.name);
console.log("Heres the link! " + data.tracks.items[0].external_urls.spotify);

});
} 

if (process.argv[2] === "movie-this"){
  var nodeArgs = process.argv
// Create an empty string for holding the title
var movTitle = process.argv[3] + "+" + process.argv[4]


  request("http://www.omdbapi.com/?t=" + movTitle +"&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
  
      // Then we print out the imdbRating
      console.log("The movie's Title is: " + JSON.parse(body).Title)
     console.log("The Year this came out was " + JSON.parse(body).Year); 
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Source.Value);
      console.log("The movie was produced in: " + JSON.parse(body).Country);
      console.log("The movie's spoken in: " + JSON.parse(body).Language);
      console.log("The movie's plot is: " + JSON.parse(body).Plot);
      console.log("The movie has: " + JSON.parse(body).Actors + " in it.")
    }else if (movTitle = "" ){
      movTitle = "Mr+Nobody"
      console.log("The movie's Title is: " + JSON.parse(body).Title)
      console.log("The Year this came out was " + JSON.parse(body).Year); 
       console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
       console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Source.Value);
       console.log("The movie was produced in: " + JSON.parse(body).Country);
       console.log("The movie's spoken in: " + JSON.parse(body).Language);
       console.log("The movie's plot is: " + JSON.parse(body).Plot);
       console.log("The movie has: " + JSON.parse(body).Actors + " in it.")
    }
  });

}

if (process.argv[2] === "do-what-it-says"){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }else if (!error){
      doWhatItSaysResults = data.split(",");
    trackSearch = doWhatItSaysResults[1];
    spotifySearch(trackSearch);
    }
     });
    }

