$(function() {
	if(localStorage.getItem('one')) {
		$('#ws_city').html(localStorage.getItem('one'));
	}
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
  if(getCookie('yi_he_item')) {
    $('#personal').html(getCookie('yi_he_item'));
  } else {
    // 如果没有本地的cookie值就跳出提示框重新登录
    swal({
       title: "你的登录已过期",
       text: "点击确认跳转登录页面重新登录,取消则跳转至主页!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "确认",
       cancelButtonText: "取消",
       closeOnConfirm: false,
       closeOnCancel: false
     },
     function(isConfirm){
       if(isConfirm) {
         window.location.href = 'ws_logIn.html';
       } else {

         window.location.href = 'yf_index.html';
       }

     });
  };


	function parse(str) {
		var obj = {};
		str.split('&').forEach(function (item) {
			var result = item.split('=');
			obj[result[0]] = result[1];
		});
		return obj;
	};
var price = parse(location.search.substring(1)).price;
$('.successPrice').html(function(index,value) {
	return value + price;
});
console.log(localStorage.getItem('newAddress'))
$('.successAddress a').html(localStorage.getItem('newAddress'));
})
