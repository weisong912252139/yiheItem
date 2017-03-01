$(function(){
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
  function setCookie() {
    var str = '';
    if (typeof arguments[0] === 'object') {
      for (var attr in arguments[0]) {
        setCookie(attr, arguments[0][attr], arguments[1]);
      }
    } else if (arguments.length === 3) {
        var oDate = new Date();
        var oNewDate = new Date(oDate.getTime() + arguments[2] * 60 * 1000);

        str = arguments[0] + '=' + arguments[1] + ';expires=' + oNewDate.toGMTString();
    } else {
      str = arguments[0] + '=' + arguments[1];
    }

    document.cookie = str;
  }

  // alert('魏松' + getCookie('yi_he_item'));
  console.log(document.cookie);

  function parse(str) {
			var obj = {};
			str.split('&').forEach(function (item) {
				var result = item.split('=');
				obj[result[0]] = result[1];
			});
			return obj;
	};
	var uuuuuser = parse(window.location.search.substr(1)).userName
	// alert(window.location.search);
	// alert(typeof uuuuuser);
	if(typeof uuuuuser == 'string' || getCookie('yi_he_item')) {
    $('.right_login').data('logFlag','true');

    $('.right_login>a').eq(0).html('你好!' + getCookie('yi_he_item')).attr('href','rj_personal.html?userName=' + getCookie('yi_he_item'));
    //  当已经登录,点击退出的时候,要销毁当前的cookie值
    $('.right_login>a').eq(1).click(function() {
      setCookie('yi_he_item', '', -1);
    })
    $('.right_login>a').eq(1).html('退出').attr('href','ws_logIn.html');
    $('.right_login>a').eq(2).attr('href','rj_myunpaid.html');
    $('.right_login>a').eq(3).attr('href','rj_mynews.html');
    $('.myyihe_buyCar a').eq(0).attr('href','rj_personal.html');
    $('.myyihe_buyCar a').eq(1).attr('href','ws_shoppingCart.html');
		// $('#ws_logIn').html('' + uuuuuser);
		// $('#ws_logIn').parent().data();
		// $('#ws_logIn').parent().click(function() {
		// 	if($(this).data('logFlag')) {
		// 		window.location.href = 'rj_personal.html?userName=' + uuuuuser;
		// 	} else {
		// 		window.location.href = 'ws_logIn.html';
		// 	}
		// })
	} else {
    $('.right_login>a').eq(0).html('登录').attr('href','ws_logIn.html');
    $('.right_login>a').eq(1).html('注册').attr('href','ws_register.html');
    $('.right_login>a').eq(2).attr('href','ws_logIn.html');
    $('.myyihe_buyCar a').eq(0).attr('href','ws_logIn.html');
    $('.myyihe_buyCar a').eq(1).attr('href','ws_logIn.html');
  }
})
