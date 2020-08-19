$(function () {
  $(".play").click(function () {
    $(".game-intro").hide();
    $("main").show();
    $(".score-container").show();
    loop();
  });

  $(".inst-btn").click(function () {
    $("h1").hide();
    $(".inst").hide();
    $(".instruction-container").show();
  });

  $(".back").click(function () {
    $("h1").show();
    $(".inst").show();
    $(".instruction-container").hide();
  });

  $(".play-again").click(function () {
    $("#game-over").hide();
    reset();
  });
});
