$(document).ready(function () {
  let spaceRemaining;
  const maxLength = 140;
  $("textarea").keydown(function () {
    let comment = $.trim($("#tweet-text").val());
    spaceRemaining = maxLength - comment.length;
    if(spaceRemaining > 0){
      $(this).siblings('.operators').children('.counter').text(spaceRemaining).css( 'color', '#545149');
    }
    /// it sets it red but it doesnt revert to black when spaceRemaining > 0
    else{
    $(this).siblings('.operators').children('.counter').text(spaceRemaining).css( "color", 'red');
    }
  });
});
