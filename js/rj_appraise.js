$(function() {
	// alert(11);
	$('.rj_file li input').change(function() {
		var urlImg = getImgURL(this);
		console.log(urlImg);
		$(this).parent().find('img').attr('src',urlImg);
	})
	//	商品评价， 星星的处理
	$('.grade1 img').click(function() {
		var num = $(this).index();
		$('.grade1 img').each(function(index, item) {
			if(index <= num) {
				$(item).attr('src', '../img/product/hongxing.png')
			} else {
				$(item).attr('src', '../img/product/heixing.png')
			}
		});
	});
	$('.grade2 img').click(function() {
		var num = $(this).index();
		$('.grade2 img').each(function(index, item) {
			if(index <= num) {
				$(item).attr('src', '../img/product/hongxing.png')
			} else {
				$(item).attr('src', '../img/product/heixing.png')
			}
		});
	});
	$('.grade3 img').click(function() {
		var num = $(this).index();
		$('.grade3 img').each(function(index, item) {
			if(index <= num) {
				$(item).attr('src', '../img/product/hongxing.png')
			} else {
				$(item).attr('src', '../img/product/heixing.png')
			}
		});
	});

	function getCookie(name) {
		var str = document.cookie;
		var result = '';

		str.split('; ').forEach(function(item) {
			var arr = item.split('=');

			if(arr[0] === name) {
				result = arr[1];
			}
		});
		return result;
	}
	getCookie('yi_he_item');

	function timer() {
		function p(s) {
			return s < 10 ? '0' + s : s;
		}
		var newDate = new Date();
		//获取当前年
		var year = newDate.getFullYear();
		//获取当前月
		var month = newDate.getMonth() + 1;
		//获取当前日
		var date = newDate.getDate();
		var h = newDate.getHours(); //获取当前小时数(0-23)
		var m = newDate.getMinutes(); //获取当前分钟数(0-59)
		var s = newDate.getSeconds();
		var time = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
		return time;
	}

	function number(){
		var num;
		$('.grade1 img').each(function(){
			if ($(this).attr('src')=='../img/product/hongxing.png') {
				num = $(this).index();
			}
		});
		return num+1;
	}

	$('.btn').click(function() {
		//JQ中封装的网络请求
		$.ajax({
			type: "get",
			url: "../php/yf_appraise.php",
			async: true,
			data: {
				//客户名
				userName: function(userName) {
					return userName = getCookie('yi_he_item');
				},
				//评论星星等级
				goodsGrade: number(),
				//评论内容
				valuationText: $('#BZ').val(),
				//获取当前时间
				timer: timer(),
				//商品插图
				//				CommodityIllustration: function() {
				//
				//				}
			},
			success: function(data) {
				console.log(data);
			}
		})
	});
})
