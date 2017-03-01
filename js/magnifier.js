//放大镜

function resetSellerNav() {
	var bool = false;
	var noLastLiLength = 0;
	for(var i = 1; i < $(".seller_content_nav li").length; i++) {
		noLastLiLength += $(".seller_content_nav li:nth-of-type(" + i + ")").width() + 49;
		bool == true && $(".seller_content_nav li:nth-of-type(" + i + ")").hide();
		if(noLastLiLength > $(".seller_content_nav").width() - $(".seller_content_nav li:nth-last-of-type(1)").width() - 49) {
			var a = $(".seller_content_nav li:nth-last-of-type(1)").width() + 49;
			var b = noLastLiLength - $(".seller_content_nav li:nth-of-type(" + i + ")").width() - 49;
			var c = $(".seller_content_nav").width();
			var r = c - a - b - 48;
			$(".seller_content_nav li:nth-of-type(" + i + ")").text("···").width(r);
			bool = true;
		}
	}
}
$(function($) {
	var index = 0;
	var max = $(".seller_header_left_img_wheel ul li").length - 4;
	$(".seller_header_left>i").click(function() {
		if($(this).index() == 2) {
			index--;
			if(index <= 0) index = 0;
		} else if($(this).index() == 4) {
			index++;
			if(index > max) index = max;
		}
		$(".seller_header_left_img_wheel ul").css({ "transform": "translateX(" + (-72 * index) + "px)" });
	});
	$(".seller_header_left_img_wheel ul li").click(function() {
		$(".seller_header_left_img_wrap>img").attr("src", $(this).find("img").attr("src"));
		$(".glass_show>img").attr("src", $(this).find("img").attr("src"));
	});
	$(".seller_content_nav li").click(function() {
		$(this).siblings().removeClass("seller_class_clicked");
		$(this).addClass("seller_class_clicked");
	});

	$(".seller_header_left_img_wrap").mousemove(function(event) {
		if(window.navigator.userAgent.indexOf("Firefox") != -1) {
			var scrollTop = $("html").scrollTop();
		} else {
			var scrollTop = $("body").scrollTop();
		}
		$(".glass_slider").show();
		$(".glass_show").show();
		var sliderL = event.clientX - $(".seller_header_left_img_wrap").offset().left - $(".glass_slider").width() * 0.5,
			sliderT = event.clientY - $(".seller_header_left_img_wrap").offset().top + scrollTop - $(".glass_slider").height() * 0.5,
			maxL = $(".seller_header_left_img_wrap").width() - $(".glass_slider").width(),
			maxT = $(".seller_header_left_img_wrap").height() - $(".glass_slider").height();
		if(sliderL <= 0) sliderL = 0;
		if(sliderT <= 0) sliderT = 0;
		if(sliderL >= maxL) sliderL = maxL;
		if(sliderT >= maxT) sliderT = maxT;
		$(".glass_slider").css({ "left": sliderL + "px", "top": sliderT + "px" });
		$(".glass_show>img").css({ "left": -sliderL * 3 + "px", "top": -sliderT * 3 + "px" });
	});
	$(".seller_header_left_img_wrap").mouseleave(function() {
		$(".glass_slider").hide();
		$(".glass_show").hide();
	});
});