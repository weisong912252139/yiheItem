$(function() {
	$('#header').load("yf_header_encapsulation.html");
	$('#footer').load("rj_public_bottom.html");
	var vm = new Vue({
		el: '.shop_list',
		data: {
			shopList: [{
				urlimg: '../img/today_deal/limit1.png',
			}, {
				urlimg: '../img/today_deal/limit2.png',
			}, {
				urlimg: '../img/today_deal/limit3.png',
			}, {
				urlimg: '../img/today_deal/limit4.png',
			}, {
				urlimg: '../img/today_deal/limit1.png',
			}, {
				urlimg: '../img/today_deal/limit2.png',
			}, {
				urlimg: '../img/today_deal/limit3.png',
			}, {
				urlimg: '../img/today_deal/limit4.png',
			} ]
		}
	});

	$('.onpuss').click(function() {
		$('.onpuss').css({
			backgroundColor: 'white',
			color: 'black'
		});
		$(this).css({
			backgroundColor: '#008de1',
			color: 'white'
		})
	});
	//收藏
	$('.convertBtn').click(function(){
		if ($(this).html('取消收藏')) {
			$(this).parent().parent().remove();
		}
	})
})