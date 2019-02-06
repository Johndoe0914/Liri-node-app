require("dotenv").config();
// Spotify keys
var keys = require("./keys.js");
//require fs
var fs = require("fs");
// spotify package
var Spotify = require("node-spotify-api");
// axios request
var axios = require("axios");
// moment for date and time
var moment = require("moment");
// user command line input

var cmd = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");



// function for searching a song
function spotifyThis(){
    var spotify = new Spotify(keys.spotify);
    if(!arg2){
        arg2 = "The Sign by Ace of Base";
    }
    spotify.search({type: "track", query: arg2}, function(err,response){
        if(err){
            return console.log(err);

        }else{
            console.log("----------------------------------------------------")
            console.log("Artist : " + response.tracks.items[0].artists[0].name);
            console.log("Song Name : " + response.tracks.items[0].name);
            console.log("Preview: " + response.tracks.items[0].preview_url);
            console.log("Album : " + response.tracks.items[0].album.name)
            console.log("----------------------------------------------------")

        }
    })
     };
     // function for searching an artist in town
     function concertThis(){
         

         axios.get("https://rest.bandsintown.com/artists/"+arg2+"/events?app_id=codingbootcamp").then(
             function(response,err){
               if(err){
                   console.log(err)
               }else{
                
                   //console.log(response.data)
                   console.log(arg2 + " will be performing at " + response.data[0].venue.name + " located in " + response.data[0].venue.city + "," +response.data[0].venue.region + " on " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
                   console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
                   console.log(arg2 + " will be performing at " + response.data[1].venue.name + " located in " + response.data[1].venue.city + "," +response.data[1].venue.region + " on " + moment(response.data[1].datetime).format("MM/DD/YYYY"));
                   console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
                   console.log(arg2 + " will be performing at " + response.data[0].venue.name + " located in " + response.data[2].venue.city + "," +response.data[2].venue.region + " on " + moment(response.data[2].datetime).format("MM/DD/YYYY"));
                   console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
                   console.log(arg2 + " will be performing at " + response.data[1].venue.name + " located in " + response.data[3].venue.city + "," +response.data[3].venue.region + " on " + moment(response.data[3].datetime).format("MM/DD/YYYY"));           
                   console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
                   console.log(arg2 + " will be performing at " + response.data[0].venue.name + " located in " + response.data[4].venue.city + "," +response.data[4].venue.region + " on " + moment(response.data[4].datetime).format("MM/DD/YYYY"));
                   console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
                   console.log(arg2 + " will be performing at " + response.data[1].venue.name + " located in " + response.data[5].venue.city + "," +response.data[5].venue.region + " on " + moment(response.data[5].datetime).format("MM/DD/YYYY"));
                   
               }
             }
         )
     };
     //function for a movie a search
     function movieSearch(movie){
        axios.get("http://www.omdbapi.com/?t="+arg2+"&y=&plot=short&apikey=trilogy").then(
            function(response,err){
                if(err){
                    console.log(err)
                }else if(!movie){
                    movie = "Mr. Nobody"
                    console.log(movie)
                    return console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/> It's on Netflix!");
                }

                console.log("Title: " + arg2);
                console.log("Year : " + JSON.stringify(response.data.Year));
                console.log("The movies imdb rating is: " + response.data.imdbRating);
                console.log("Rotten Tomatoes rating : " + JSON.stringify(response.data.Ratings[1]));
                console.log("Country produced : " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot : " + response.data.Plot );
                console.log("Actors : " + response.data.Actors)
                //console.log(response.data)
            }
        )
     }; 
     function read(){
         fs.readFile("random.txt", "utf8", function(err, data){
             if(err){
                 return console.log(err)
             };
             console.log(data);

             var dataArr = data.split(",");
             console.log(dataArr);

         })

     }
     if(!cmd){
         cmd = "help";
     }


switch(cmd){
    case "spotify-this-song":
     spotifyThis(arg2);
    break;
    case "concert-this":
     concertThis(arg2);
    break;
    case "movie-this":
     movieSearch(arg2);
    break;
    case "do-what-it-says":
    read();
    break;
    case "help":
    console.log("Welcome my name is liri and i am here to help search for your favorite songs, music, and artist!");
    console.log("List of my commands");
    console.log("---------------------")
    console.log("concert this");
    console.log("movie-this");
    console.log("spotify-this-song");
    break;
    default:
    console.log("Invalid")
    break;
};