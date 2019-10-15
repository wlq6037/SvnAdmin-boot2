define(function(require,exports,module){
	//引入模块
	require('$');
	
	function NavToggle() {
	    $(".navbar-minimalize").trigger("click")
	}
	
	function SmoothlyMenu() {
	    $("body").hasClass("mini-navbar") ? $("body").hasClass("fixed-sidebar") ? ($("#side-menu").hide(), setTimeout(function() {
	        $("#side-menu").fadeIn(500)
	    },
	    300)) : $("#side-menu").removeAttr("style") : ($("#side-menu").hide(), setTimeout(function() {
	        $("#side-menu").fadeIn(500)
	    },
	    100))
	}
	
	function localStorageSupport() {
	    return "localStorage" in window && null !== window.localStorage
	}

	function a() {
	    var a = $("body > #wrapper").height() - 61;
	    $(".sidebard-panel").css("min-height", a + "px")
	}
	
//	$("#side-menu").metisMenu();
	
	$(".right-sidebar-toggle").click(function() {
	    $("#right-sidebar").toggleClass("sidebar-open")
	});
	
//	$(".sidebar-container").slimScroll({
//	    height: "100%",
//	    railOpacity: .4,
//	    wheelStep: 10
//	});
	
	$(".open-small-chat").click(function() {
	    $(this).children().toggleClass("fa-comments").toggleClass("fa-remove"),
	    $(".small-chat-box").toggleClass("active")
	});
	
//	$(".small-chat-box .content").slimScroll({
//	    height: "234px",
//	    railOpacity: .4
//	});
	
	$(".check-link").click(function() {
	    var a = $(this).find("i"),
	    e = $(this).next("span");
	    return a.toggleClass("fa-check-square").toggleClass("fa-square-o"),
	    e.toggleClass("todo-completed"),
	    !1
	});
	
//	$(".sidebar-collapse").slimScroll({
//        height: "100%",
//        railOpacity: .9,
//        alwaysVisible: !1
//    });
	
	$(".navbar-minimalize").click(function() {
	    $("body").toggleClass("mini-navbar"),
	    SmoothlyMenu()
	});
	
	a();
	
	$(window).bind("load resize click scroll", function() {
	    $("body").hasClass("body-small") || a()
	});
	
	$(window).scroll(function() {
	    $(window).scrollTop() > 0 && !$("body").hasClass("fixed-nav") ? $("#right-sidebar").addClass("sidebar-top") : $("#right-sidebar").removeClass("sidebar-top")
	});
	
//	$(".full-height-scroll").slimScroll({
//	    height: "100%"
//	});
	
	$("#side-menu>li").click(function() {
	    $("body").hasClass("mini-navbar") && NavToggle()
	});
	
	$("#side-menu>li li a").click(function() {
	    $(window).width() < 769 && NavToggle()
	});
	
	$(".nav-close").click(NavToggle);

	$(window).bind("load resize", function() {
	    $(this).width() < 769 && ($("body").addClass("mini-navbar"), $(".navbar-static-side").fadeIn())
	});

});