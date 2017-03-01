$(function(){
	$('#header').load("yf_header_encapsulation.html");

	$('#footer').load("rj_public_bottom.html");

	$('.btn1').click(function(){
		$('.yf_estop').show();
		$('.gray_btn').click(function(){
			$('.yf_estop').hide();
		});
	})
	$('.orange_btn').click(function(){
		$('.yf_estop').hide();
	})

})