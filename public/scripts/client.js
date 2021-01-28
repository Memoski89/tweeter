/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// const tweetData = {
//   user: {
//     name: "Newton",
//     avatars: "https://i.imgur.com/73hZDYK.png",
//     handle: "@SirIsaac",
//   },
//   content: {
//     text: "If I have seen further it is by standing on the shoulders of giants",
//   },
//   created_at: 1461116232227,
// };

// let createTweetElement = function (object) {
//   return object.content.text;
// };

// const $tweet = createTweetElement(tweetData);
// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like

// $("#tweet-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.\

// $(document).ready(function () {
//   // $("#tweet-container").append($tweet);
//   // $(".tweet-container").append($tweet);
//   $("#tweet-message").append($tweet);
//   $(".tweet-message").append($tweet);
// });

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text:
//         "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    createTweetElement(tweet);
  }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

const createTweetElement = function (tweet) {
  let id = tweet.user.name;
  let message = tweet.content.text;
  let pic = tweet.user.avatars;
  let fakeName = tweet.user.handle;
  let date = tweet.created_at;
  // return $tweet;
  //prepend will put new tweet to the beginning of the list
  $(".tweet-container").prepend(`<article class= 'tweet'>
  <header class='tweet-header'>
    <div class ='display-pic'>
      <img class='tweet-pic' src=${pic}> 
      <p class= 'name'>${id}</p></div> <br>
    <div class='handle'> ${fakeName}</div>

  </header>
  <h2 class='tweet-message'>${message}</h2>
  <footer class ='tweet-footer'>
    <div class='date'>${date}</div>
    <br>
    <div class='likes-shares'>
      <!-- stock images located in images folder -->
      <a><img class='like' src="/images/like.png"></a>
      <a><img class='share' src="/images/share.png"></a>
      <a><img class='flag' src="/images/flag.png"></a>
    </div>
  
    
  </footer>
</article>`);
};

$(document).ready(function () {
  // initialize loadtweet
  const loadTweet = function () {
    $.ajax("/tweets", {
      method: "GET",
    }).then(function (result) {
      renderTweets(result);
    });
  };
  // runs on page loadup and subsequent reloads
  loadTweet();
  $(".selector").on("submit", function (event) {
    event.preventDefault();
    // the get request will intialize once the post request has finished\
    // calling on the renderTweets function within my load tweets,
    // this will look through  the post request JSON and return the tweet
    loadTweet();

    // this.serialize will send allow post request to be returned as an object JSON
    const input = $(this).serialize();
    // checking before post request if input is '' or undefiend or null to prevent post request
    const error = $("#tweet-text").val();
    if (!error) {
      alert("Error");
    } else if (error.length > 140) {
      alert("message over 140 characters");
    } else {
      $.ajax("/tweets/", {
        method: "POST",
        data: input,
      })
        // this will then initilize loadTweet function
        .done(function () {
          // upon POST request loadtweet function running and tweet-text area cleared into empty string
          loadTweet();
          $("#tweet-text").val("");
        });
    }
  });
});
