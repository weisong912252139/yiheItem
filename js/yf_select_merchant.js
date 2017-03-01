$(function() {
	$(document).ready(function() {
		$('#header').load("yf_header_encapsulation.html");
		$('#lunbo').load("lunbo.html");
		$('#footer').load("rj_public_bottom.html");
	});
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
	})
})