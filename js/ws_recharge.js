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


	//转换查询字符串和对象的函数
  function parse(str) {
    var obj = {};
    str.split('&').forEach(function (item) {
      var result = item.split('=');
      obj[result[0]] = result[1];
    });
    return obj;
  }


  function stringify(obj) {
    var str = '';
    for (var attr in obj) {
      if (str) {
        str += '&' + attr + '=' + obj[attr];
      } else {
        str += attr + '=' + obj[attr];
      }
    }
    return str;
  };
  var searchObj = parse(window.location.search.substr(1));
  var money = searchObj.money;
  var phone = searchObj.phone;
  console.log(money,phone);
  if(phone) {
  	//让上面的余额从后台数据库获取
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

  	//让下面的列表显示出来
  	$.ajax({
  		type:'post',
  		url:'../php/ws_recordList.php',
  		data:{
  			phone:phone
  		},
  		success:function(response) {
  			console.log(JSON.parse(response));
  			$.each(JSON.parse(response),function(index,item) {

  					var str = `
					<ul>
						<li>${item.time}</li>
						<li>${item.orderNum}</li>
						<li>¥${item.num}</li>
						<li>¥${item.remainder}</li>
					</ul>
					`;
					$('.detail1').prepend($(str));

  			})
  		}
  	})
  }

  $('#ws_remainder').html( money);
  $('#recharge').click(function() {
  	if(!phone) {
  		alert('请登录!');
  		return ;
  	};
  	if($('#ws_num').val() < 0 || $('#ws_num').val() == '') {
  		swal({
		  title: "请输入有效的金额!",
		  type:'warning',
		  text: "I will close in 1 seconds.",
		  timer: 1000,
		  showConfirmButton: false
		});
		return;
  	}
  	var num = $('#ws_num').val();
  	var time = new Date();
  	console.log(time);
	$.ajax({
		type:'post',
		url:'../php/ws_updateUser.php',
		data:{
			phone: phone,
			num: parseFloat(num) + parseFloat($('#ws_remainder').html())
		},
		success: function(response) {

			swal({
			  title: "充值成功!",
			  type:'success',
			  text: "I will close in 1 seconds.",
			  timer: 1000,
			  showConfirmButton: false
			});
			$('#ws_num').val('');
		}
	});
	$.ajax({
		type:'post',
		url:'../php/ws_insertRecord.php',
		data:{
			time : updateTime(),
			orderNum: time.getTime(),
			num : num,
			remainder: parseFloat(num) + parseFloat($('#ws_remainder').html()),
			phone: phone
		},
		success: function(response) {
			var str = `
			<ul>
				<li>${updateTime()}</li>
				<li>${time.getTime()}</li>
				<li>¥${num}</li>
				<li>¥${parseFloat(num) + parseFloat($('#ws_remainder').html())}</li>
			</ul>
			`;
			$('.detail1').prepend($(str));
			$('#ws_remainder').html(parseFloat(num) + parseFloat($('#ws_remainder').html()));
		}
	})
 });


 function updateTime() {
    var oDate = new Date();


    var iYear = oDate.getFullYear();
    var iMonth = oDate.getMonth(); // 从 0 开始
    var iDate = oDate.getDate();
    var iHour = oDate.getHours();
    var iMinute = oDate.getMinutes();
    var iSecond = oDate.getSeconds();
    return  iYear + '-'  + padZero(iMonth + 1) + '-' + padZero(iDate) + ' ' + padZero(iHour) + ':' + padZero(iMinute) + ':' + padZero(iSecond) ;
  }


  function padZero(num) {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  }

})
