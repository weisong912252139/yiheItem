$(function() {
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

  // 注册页面信息验证

  var verificationCode = '';//创建一个变量用来保存当前刷新这一次的验证码
  var phoneVerCode = '';//创建一个变量用来保存 获取手机验证码时候的 短信信息
  var checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//6-20为密码必须有数字和字母

  // 生成随机数函数
  function randNum (a,b) {
    return Math.floor(Math.random() * (b-a+1) +a);
  };

  function randCheckNum () {
    var arr = [];
     for(var a = 0; a < 4;a ++) {
      if(arr.indexOf(randNum(0,25)) == -1) {
        arr.push(randNum(0,25))
      } else {
        a --;
      }
     }
     var wordArr = 'abcdefghijklmnopqrstuvwxyz';
     var str = '';
     arr.forEach(function(item,index) {
       str += wordArr[item]
     })
     $('.checkNum').html(str);
     // 保存验证码
     verificationCode = str;
  };
    //  加载页面的时候默认生成
    randCheckNum ();

    // 点击 看不清的时候,随机生成一张
    $('.changeNum').click(function(){
     randCheckNum ();
   });


   /****start 点击获取手机验证码时候的操作 *****/
    $('.getCheck').click(function() {
      var lastNum = 30;
      var phoneStr = '';
      for(var i = 0;i < 6; i ++) {
        phoneStr += randNum (0,9);
      };
      phoneVerCode = phoneStr;
      swal({
        title: "你的验证码为 : " + phoneStr,
        imageUrl: "../img/public/thumbs-up.jpg"
      });
      $(this).next().addClass('active');
      var checkTimer = setInterval(function() {
        lastNum --;
        if(lastNum > 0) {
          $('.getCheck').css('background','rgb(201,201,201)').html(function(index,item) {
            return lastNum + '后重新获取'
          })
        } else {
          clearInterval(checkTimer);
          $('.getCheck').next().removeClass('active');
          $('.getCheck').css('background','rgb(34,120,218)').html(function(index,item) {
            return '获取验证码'
          })
        }

      } , 1000)
    })

   /****end 点击获取手机验证码时候的操作 *****/




    var boolCheckAll1 = false; //定义一个初始值为真,来验证 在 修改 个个输入框之后的 状态
    var boolCheckAll2 = false;
    var boolCheckAll3 = false;
    var boolCheckAll4 = false;
    var boolCheckAll5 = false;
    // 手机号码有效性验证
    function checkPhone(phone){
        if(!(/^1[34578]\d{9}$/.test(phone))){
            return false;
        } else {
          return true;
        }
    }
    // 手机号码的验证
    $('.reg_phone input').blur(function(){


      if(checkPhone($(this).val())) {
      	// 失去焦点的时候请求后台数据看当前手机号是否已经注册
	    	  $.ajax({
	  		type:"get",
	  		url:"../php/ws_selectUser.php",
	  		success:function(response) {
	  			console.log(JSON.parse(response));
	  			var isUnique = JSON.parse(response).some(function(value,index) {
	  				return value.phone == $('.reg_phone input').val()
	  			});
	  			if(isUnique) {
	  				boolCheckAll1 = false;
	  				$('.reg_phone input').parent().find('p').html('这个手机号已经被注册过,请登录').addClass('active');
	  			} else {
	  				boolCheckAll1 = true;
	  				$('.reg_phone input').parent().find('p').removeClass('active');
	  			}

	  		}
	  	});


      } else {
        // 说明不是手机号码 或者说这个手机号码已经注册过了
        boolCheckAll1 = false;
        $(this).parent().find('p').addClass('active');
      }
    });


    // 密码验证
    $('.reg_pass input').blur(function(){
      if($(this).val() !== '' && checkPassword.test($(this).val())) {
      	boolCheckAll2 = true;
        $(this).next().removeClass('active');
      } else {
        boolCheckAll2 = false;
        $(this).next().addClass('active');
      }
    });

    // 重复密码验证
    $('.reg_repass input').blur(function() {
      if($(this).val() != $('.reg_pass input').val()) {
        boolCheckAll3 = false;
        $(this).next().addClass('active');
      } else {
      	boolCheckAll3 = true;
        $(this).next().removeClass('active');
      }
    });



    // 手机验证码 输入框 失去焦点时的验证
    $('.log_phoneCheckNum input').blur(function() {
      console.log($(this).val(),phoneVerCode);
      if($(this).val() ==  phoneVerCode) {
      	boolCheckAll4 = true;
        // 说明验证码输入正确
        $(this).parent().find('p').removeClass('active');
      } else {
        boolCheckAll4 = false;
        $(this).parent().find('p').addClass('active');
      }
    });

    // 验证码验证
    $('.log_checkNum input').blur(function() {
      console.log($(this).val() ,verificationCode);
      if($(this).val() == verificationCode) {
      	boolCheckAll5 = true;
        $(this).parent().find('p').removeClass('active');
      } else {
        boolCheckAll5 = false;
        $(this).parent().find('p').addClass('active');
      }
    });




  //   点击注册 按钮的 验证信息完整性的 函数
  function checkAllIpt () {
  	if(boolCheckAll1 && boolCheckAll2 &&boolCheckAll3 &&boolCheckAll4 &&boolCheckAll5 && $('.log_phone input').val() != '' && $('.reg_pass input').val() != '' && $('.reg_repass input').val() != '' && $('.log_checkNum input').val() == verificationCode &&  $('.log_phoneCheckNum input').val() == phoneVerCode) {
  		return true;
  	} else {
  		return false;
  	}

  }


  // 点击注册按钮的时候需要的操作
  $('#register').click(function() {
    $('.log_checkNum input').blur();
    $('.reg_phone input').blur();
    $('.log_phoneCheckNum input').blur();
    $('.reg_repass input').blur();
    $('.reg_pass input').blur();
    if(checkAllIpt ()) {
      //如果请求的数据成功就坐对应的ajax请求
      $.ajax({
  		type:"POST",
  		url:"../php/ws_register.php",
  		async:true,
  		data:{
  			phone:$('.reg_phone input').val(),
  			pass:$('.reg_pass input').val()
  		},
  		success:function(response) {
//			var res = JSON.parse(response);
  			console.log(response);
        setCookie('yi_he_item',$('.reg_phone input').val(),10 * 24);
  			swal({
			  title: "是否跳转主页?",
			  text: "点击确认跳转至主页,取消则不跳转至登录页面!",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "确认",
			  cancelButtonText: "取消",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
			function(isConfirm){
				if(isConfirm) {
					window.location.href = 'yf_index.html';
				} else {
					window.location.href = 'ws_logIn.html';
				}

			});

  		}
  	});
    } else {
    	  swal("请填写完信息之后再提交!")
      // 如果有验证未通过的就重新生成一次验证码
      $('.log_form input[type!=checkbox]').each(function(index,item) {
//      console.log($(item).val());
        if($(item).val() == '') {
          $(this).parent().find('p').addClass('active');
        }
      });

    }

  })



})
