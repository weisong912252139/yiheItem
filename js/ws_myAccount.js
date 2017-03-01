$(function() {

	function getCookie(name) {
	  var str = document.cookie;
	  var result = '';

	  str.split('; ').forEach(function (item) {
	    var arr = item.split('=');

	    if (arr[0] === name) {
	      result = arr[1];
	    }
	  });

	  return result;
	};


	$('#header').load('yf_header_encapsulation.html')
	$('#footer').load('rj_public_bottom.html');
	console.log(getCookie('yi_he_item'));
	if(getCookie('yi_he_item')) {
		$('#userName').html(getCookie('yi_he_item'));
		//如果有账户,请求该账户的余额信息
		$.ajax({
			type:'post',
			url:'../php/ws_userInfo.php',
			data:{
				phone:getCookie('yi_he_item')
			},
			success:function(response) {
				console.log(JSON.parse(response));

				var res = JSON.parse(response);
				console.log(res.res[0].remainder);
				if(res.state == 1 && res.res[0].remainder) {
					$('#ws_remainder').html(res.res[0].remainder);
				} else {
					$('#ws_remainder').html('0.00');
				}


			}
		})
	} else {
		$('#userName').html('<a href="ws_login.html">请先登录</a>');
	};


	$('#ws_recharge').click(function() {
		window.location.href = 'rj_recharge.html?money=' + $('#ws_remainder').html() + '&phone=' + getCookie('yi_he_item');
	})

})
