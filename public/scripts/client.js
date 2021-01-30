/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // this function is used in the createTweetElement to return html type strings as tweets and not manipulate current html docs
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // by adding .empty() prevents from loading all the database  each time a get request is executed
  const renderTweets = function (tweets) {
    const tweetContainer = $(".tweet-container");
    tweetContainer.empty();

    for (const tweet of tweets) {
      tweetContainer.prepend(createTweetElement(tweet));
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
    //moment external script implemented

    //prepend will put new tweet to the beginning of the list
    return $(
      `<article class= 'tweet'>
       <header class='tweet-header'>
         <div class ='display-pic'>
           <img class='tweet-pic' src=${pic}> 
            <p class= 'name'>${id}</p></div> <br>
          <div class='handle'> ${fakeName}</div>
       </header>
           <h2 class='tweet-message'>${escape(message)}</h2>
            <footer class ='tweet-footer'>
               <div class='date'>${moment(date).toNow(true)} ago</div>
              <br>
              <div class='likes-shares'>
                <!-- stock images located in images folder -->
                <a><img class='like' src="/images/like.png"></a>
                <a><img class='share' src="/images/share.png"></a>
                <a><img class='flag' src="/images/flag.png"></a>
              </div>    
            </footer>
    </article>`
    );
  };
  // initialize loadtweet
  const loadTweet = function () {
    $.ajax("/tweets/", {
      method: "GET",
    }).done(function (result) {
      renderTweets(result);
    });
  };

  // runs on page loadup and subsequent reloads
  // loadTweet();
  $(".selector").on("submit", function (event) {
    event.preventDefault();
    // the get request will intialize once the post request has finished\
    // calling on the renderTweets function within my load tweets,
    // this will look through  the post request JSON and return the tweet
    // loadTweet();

    // this.serialize will send allow post request to be returned as an object JSON
    const input = $(this).serialize();
    // checking before post request if input is '' or undefiend or null to prevent post request

    const error = $("#tweet-text").val();
    if (!error || error.length === 0) {
      $(this)
        .siblings("#error-messages")
        .text(
          "🔺🔺🔺🔺 Please just put one thing anything I have worked so hard on this please!!! 🔺🔺🔺🔺 "
        );
      $(this).siblings("#error-messages").slideDown(400);
    } else if (error.length > 140) {
      // $(this)
      // .siblings('.error-messages')
      // .css('visibility', 'visible')
      $(this)
        .siblings("#error-messages")
        .text(
          "🔺🔺🔺🔺 Whoa Whoa Whoa!!! Keep it less than 140! Are you trying to break 🔺🔺🔺🔺 "
        );
      $(this).siblings("#error-messages").slideDown(400);

      // alert("message over 140 characters");
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
          $("#error-messages").slideUp(400);
        });
    }
  });
  loadTweet();
});
