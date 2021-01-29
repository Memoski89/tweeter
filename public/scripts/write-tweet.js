$(document).ready(function () {
  $("#clicker").click(function () {
    $(this)
      .parent("nav")
      .parent("body")
      .children(".container")
      .children('.new-tweet')
      .slideToggle(600);
  });
});
