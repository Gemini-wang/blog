(function($){
  $(document).ready(function() {
    $("#toTop").hide(), $("#toTop a:first").click(function() {
        $("html,body").animate({
            scrollTop:"0"
        }, 200);
    });
    var a = parseInt($("body").css("height"));
    $("#toTop a:last").click(function() {
        $("html,body").animate({
            scrollTop:"a"
        }, 200);
    }), $(window).scroll(function() {
        $(this).scrollTop() > 200 ? $("#toTop").fadeIn() :$("#toTop").fadeOut();
    });
  })(jQuery);