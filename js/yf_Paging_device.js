$(function() {
	$('.num_page a p').click(function() {
		$(this).addClass('onpuss').parent().siblings().children().removeClass('onpuss');
	});
	
//	var i=$('.num_page a p').index($('.onpuss'));
//	$('.up_page').click(function(){
//		if (i <= 0) {
//			i=0;
//		}else{
//			i--;
//		}
//		$('.num_page p').eq(i).addClass('onpuss').siblings().removeClass('onpuss');
//	});
//	$('.down_page').click(function(){
//		if (i> $('.num_page a p').length) {
//			i=$('.num_page a p').length;
//		}else{
//			i++;
//		}
//		$('.num_page p').eq(i).addClass('onpuss').siblings().removeClass('onpuss');
//	});
//	$('.yf_first').click(function(){
//		$('.num_page p').eq(0).addClass('onpuss').siblings().removeClass('onpuss');
//	});
//	$('.yf_last').click(function(){
//		var i=$('.num_page a p').length;
//		$('.num_page p').eq(i).addClass('onpuss').siblings().removeClass('onpuss');
//	})
})