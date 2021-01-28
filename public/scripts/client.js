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

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

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
  $(".tweet-container").append(`        <article class= 'tweet'>
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
  renderTweets(data);
});

//event handler for # form
//listen to submit

$(document).ready(function () {
  // $('selector').on('submit', function(event){
  //   event.preventDefault()
  //   console.log('submitting')
  // })
  $(".selector").on("submit", function (event) {
    event.preventDefault();
    console.log("submitting");
    console.log($(this).serialize());
    const info = $(this).serialize()
    //target the textarea?? 
    // const message = $(this).children('textarea[#tweet-text]')
    // console.log(message.val())
    $.post("/tweets", info).then(function (respond) {
      console.log("Success: ", respond);
      // $button.replaceWith(textarea);
    });
  });
  // $('#selector').on('submit', function(event){
  //   event.preventDefault()
  //   console.log('submitting')
  // })
});

/* let ajaxTry = function () {
  $(".selector").on("submit", function () {
    console.log("Button clicked, performing ajax call...");
    $.ajax("textarea", { method: "POST" }).then(function (textarea) {
      console.log("Success: ", textarea);
      $button.replaceWith(textarea);
    });
  });
};
 */