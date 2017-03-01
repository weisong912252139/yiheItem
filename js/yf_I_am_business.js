$(function(){
		var vm = new Vue({
		el:'.shop_list1',
		data: {
			shopList :[{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},{
				urlimg:'../img/home_page/yf_car1.png',
			},]
		}
	});
	$('.nav_title div').on('mouseover',function(){
		$(this).find('.sorts_text').addClass('show').end().siblings().find('.sorts_text').removeClass('show');
	});
	$('.nav_title').mouseout(function(){
		$('.sorts_text').removeClass('show');
	});
})