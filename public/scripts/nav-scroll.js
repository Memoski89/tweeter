$(document).ready(function () {
  $(function () {
    $(document).scroll(function () {
      const nav = $("nav");
      const header = $(".page-header");
      nav.toggleClass("scrolled", $(this).scrollTop() > header.height());
    });
  });
});
