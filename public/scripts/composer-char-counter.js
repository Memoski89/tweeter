$(document).ready(function () {
  let spaceRemaining;
  const maxLength = 140;
  $("textarea").keydown(function () {
    let comment = $.trim($("#tweet-text").val());
    spaceRemaining = maxLength - comment.length;
    if (spaceRemaining > 0) {
      /// if the word count is above 140  it will be at deafult color
      // using jquery traversing to be super specific just in case we have similar code in the html
      $(this)
        .siblings(".operators")
        .children(".counter")
        .text(spaceRemaining)
        .css("color", "#545149");
    }
    /// if the word count goes beyond 140 the counter will turn red
    else {
      $(this)
        .siblings(".operators")
        .children(".counter")
        .text(spaceRemaining)
        .css("color", "red");
    }
  });
});
