$(function(){

	if(localStorage.getItem('one')) {
		$('#ws_city').html(localStorage.getItem('one'));
	}
	var timer = null;
	//行业分类
	$('.dropdown_toggle').on('mouseout',function(){
		timer = setTimeout(function() {
			$('.hangye').hide();
		},200)
	});
	$('.hangye').on('mouseover',function(){
		clearTimeout(timer);
	});
	$('.dropdown_toggle').on('mouseover',function(){
		$('.hangye').show();
	});
	$('.hangye').on('mouseout',function(){
		timer = setTimeout(function() {
			$('.hangye').hide()
		},200);
	});

	$('.hangye').on('mouseover',function(){
		$('.hangye').show();
	});
	$('.hangye li').on('mouseover',function(){
		$(this).find('ul').addClass('text').end().siblings().find('ul').removeClass('text');
	});
	//在线客服
	$('.Online_Service').on('mouseover',function(){
		$('.trade').show()
	});
	$('.Online_Service').on('mouseout',function(){
		timer = setTimeout(function() {
			$('.trade').hide();
		},200)
	});
	$('.trade').on('mouseover',function(){
		clearTimeout(timer);
		$('.trade').show();
	});
	//搜索框
	$('.sort span').click(function(){
		$(this).css('background-color','dodgerblue');
		$(this).siblings().css('background-color','white');
		var i=$(this).index();
		$('.pop').eq(i).addClass('show').siblings().removeClass('show');
	});

});
