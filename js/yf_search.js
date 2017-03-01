$(function() {
	//	$('#header').load("yf_header_encapsulation.html");
	$('#footer').load("rj_public_bottom.html");
	var vm = new Vue({
		el: '.shop_list',
		data: {
			shopList: [{
				urlimg: '../img/home_page/yf_car1.png',

			}, {
				urlimg: '../img/home_page/yf_car1.png',
			}, {
				urlimg: '../img/home_page/yf_car1.png',
			}, {
				urlimg: '../img/home_page/yf_car1.png',
			}, {
				urlimg: '../img/home_page/yf_car1.png',
			}]
		}
	});
	$('.pop a p').click(function(){
		$('.input_group input').val($(this).html());
		$('.search_name').html($('.input_group input').val())
	});
	$('.input_group input').on('change', function() {
		$('.input_group_addon').click(function() {
			$('.search_name').html($('.input_group input').val())
		})
	})
})