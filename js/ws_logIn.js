$(function() {
  // 在用户登录界面判断当前的cookie中是否有当前的用户名如果有就让输入框的值等于当前的cookie 的值
  // getCookie('userName');
  if(getCookie('userName')) {
    $('.log_user input').val(getCookie('userName'));

  } else {
    $('.log_user input').val();
  };

  //  在用户登录界面,如果cookie  的密码值存在,则说明已经记住密码,直接让当前的密码位cookie中的密码,并且让记住密码位勾选的状态
  // setCookie('password',$('.log_pass input').val(),-1);
  if(getCookie('password')) {
    $('.log_pass input').val(getCookie('password'));
    $('.log_rem_acc input').prop('checked',true);
  } else {
    $('.log_pass input').val();
    $('.log_rem_acc input').prop('checked',false);
  }

  // alert('weisdafsadf')
  var verificationCode = '';//创建一个变量用来保存当前刷新这一次的验证码
  var phoneVerCode = '';//创建一个变量用来保存 获取手机验证码时候的 短信信息
  var checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//6-20为密码必须有数字和字母
  /*** start  进入页面随机生成一个四位的随机数  *******/
      function randNum (a,b) {
        return Math.floor(Math.random() * (b-a+1) +a);
      }

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
     })



   /*** end  进入页面随机生成一个四位的随机数  *******/

   /****start 点击获取手机验证码时候的操作 *****/
    $('.getCheck').click(function() {
      var lastNum = 5;
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


 /****  strat  登录页面的 账户登录 和 手机验证码登录的切换 操作 *****/
  $('.toggleLog').click(function() {
   //  点击之后随机切换一张验证码
   randCheckNum ();

   // 让验证码的输入框清空
   $('.log_checkNum input').val('');
   // 输入框信息清空
   $('.log_ipt input').val('');

   // 移除所有的提示信息的状态
   $('.warningInfo').removeClass('active');
   //  console.log($(this).data('a'));
    if($(this).data('a') == 'account') {

     //  现在为账户登录状态,切换至 手机登录状态
     $(this).html(function() {
       return '账户密码登录' + '<span class="glyphicon glyphicon-user"></span>'
     });
     $('.log_pass').css('display','none');
     $('.log_phoneCheckNum').css('display','block');
     $('.log_user').css('display','none');
     $('.log_phone').css('display','block');
     $('.log_phoneCheckNum input').val('');
     $('.log_form .log_rem_acc').css('display','none');
     $('.log_form .log_rem_phone').css('display','block');
     $(this).data('a','phone');
    //  判断cookie值是否存在,有的话让手机登录的val值变成已经有的手机号码
     if(getCookie('userNamePhone')) {
       $('.log_phone input').val(getCookie('userNamePhone'));
     } else {
       $('.log_phone input').val('');
     };


   } else {
     // 现在为手机登录状态, 切换至 账户登录状态
     $(this).html(function() {
       return '手机验证码登录' + '<span class="glyphicon glyphicon-phone"></span>'
     });
     $('.log_form .log_rem_phone').css('display','none');
     $('.log_form .log_rem_acc').css('display','block');
     $('.log_pass').css('display','block');
     $('.log_phoneCheckNum').css('display','none');
     $('.log_user').css('display','block');
     $('.log_phone').css('display','none');
     $(this).data('a','account');

     if(getCookie('userName')) {
       $('.log_user input').val(getCookie('userName'));
     } else {
       $('.log_user input').val();
     };

     if(getCookie('password')) {
       $('.log_pass input').val(getCookie('password'));
       $('.log_rem_acc input').prop('checked',true);
     } else {
       $('.log_pass input').val();
       $('.log_rem_acc input').prop('checked',false);
     }
   }
  })

 /***** end  登录页面的 账户登录 和 手机验证码登录的切换 操作  ****/

 /****** start  登录界面的 输入有效性验证  ******/


 //  验证 账户信息和 账户密码 失去焦点 的 验证 函数
//function checkAccount () {
  //  var boolAccount1 = false;
  //  var boolAccount2 = false;
  //  var boolAccount3 = false;
   // 用户名验证
   $('.log_user input').blur(function(){
     if($(this).val() == '') {
      //  boolAccount1 = false;
       $(this).next().addClass('active');
     } else {
      //  boolAccount1 = true;
       $(this).next().removeClass('active');
     }
   });


   // 密码验证
   $('.log_pass input').blur(function(){
     if($(this).val() !== '' && checkPassword.test($(this).val())) {
      //  boolAccount2 = true;
       $(this).next().removeClass('active');
     } else {
      //  boolAccount2 = false;
       $(this).next().addClass('active');
     }
   });

   // 验证码验证
   $('.log_checkNum input').blur(function() {
     console.log($(this).val() ,verificationCode);
     if($(this).val() == verificationCode) {
       boolAccount3 = true;
       $(this).parent().find('p').removeClass('active');
     } else {
      boolAccount3 = false;
       $(this).parent().find('p').addClass('active');
     }
   })


 // 使用账号登录,对输入之后的状态 进行判断

 // 账户信息  登录按钮  的 验证函数

 function logInAccount () {
   if($('.log_user input').val() != '' && checkPassword.test($('.log_pass input').val()) && $('.log_pass input').val() != '' &&  $('.log_checkNum input').val() == verificationCode) {
     return true;
   } else {
     // 如果有验证未通过的就重新生成一次验证码
    return false;
   }
 }




 // 验证 手机号和 手机验证码 失去焦点时 的函数


   // 手机号码有效性验证
   function checkPhone(phone){
       if(!(/^1[34578]\d{9}$/.test(phone))){
           return false;
       } else {
         return true;
       }
   }
   // 手机号码的验证
   $('.log_phone input').blur(function(){
     if(checkPhone($(this).val())) {
       // 说明是手机号码
       $(this).parent().find('p').removeClass('active');
     } else {
       // 说明不是手机号码
       $(this).parent().find('p').addClass('active');
     }
   });

   // 手机验证码 输入框 失去焦点时的验证
   $('.log_phoneCheckNum input').blur(function() {
     console.log($(this).val(),phoneVerCode);
     if($(this).val() ==  phoneVerCode) {
       // 说明验证码输入正确
       $(this).parent().find('p').removeClass('active');
     } else {
       $(this).parent().find('p').addClass('active');
     }
   });

   // 验证码验证
   $('.log_checkNum input').blur(function() {
     console.log($(this).val() ,verificationCode);
     if($(this).val() == verificationCode) {
       $(this).parent().find('p').removeClass('active');
     } else {
       $(this).parent().find('p').addClass('active');
     }
   });





 // 手机登录方式中  点击登录按钮的 验证信息完整性的 函数
 function logInPhone () {
   if( $('.log_phone input').val() != '' && checkPhone($('.log_phone input').val()) && $('.log_checkNum input').val() == verificationCode &&  $('.log_phoneCheckNum input').val() == phoneVerCode) {
     return true;
   } else {
     return false;
   }
 }

 $('#logIn').click(function() {
     // 首先判断是账户登录还是手机验证登录
     if($('.toggleLog').data('a') == 'account') {
      //  console.log(logInAccount ());
       // 说明是账户登录
       if(logInAccount ()) {
         // 页面验证信息有效之后验证账号密码是否有效
         $.ajax({
           type:'get',
           url:'../php/ws_selectUser.php',
           success: function(response) {
             console.log(JSON.parse(response));
             var userName = JSON.parse(response).find(function(value,index) {
               return value.phone == $('.log_user input').val()
             });
             if( typeof userName !== 'undefined') {
               console.log(userName.pass);
              //进入到这里说明账号正确,  接下来验证密码是否正确,如果密码也正确就可以进行跳转,如果密码不正确就提醒用户密码错误
               if(userName.pass == $('.log_pass input').val()) {
                //  密码正确进行页面的跳转,并且传递当前的用户名到主页,并且保存cookie值,这个cookie值有有效时间,过期自动销毁

                setCookie('yi_he_item', $('.log_user input').val(), 10 * 24);
                // 对记住密码进行操作,如果记住密码复选框被勾选则在本地存储一下当前的用户名和密码,下次自动登录,如果本次没有勾选记住密码就是取消记住密码
                setCookie('userName', $('.log_user input').val(), 10 * 24 * 60 *1000);
                if($('#a').prop('checked')) {
                  // 如果是true就是记住密码的状态,直接在本地生成cookie值
                  setCookie('password',$('.log_pass input').val(),10 * 24 * 60 *1000);
                } else {
                  // 说明没有记住密码销毁密码的cookie
                  setCookie('password',$('.log_pass input').val(),-1);
                }

                 window.location.href = 'yf_index.html?userName=' + $('.log_user input').val();
                 // 如果成功就弹出窗口提示
                //  swal({
                //     title: "是否跳转主页?",
                //     text: "点击确认跳转至主页,取消则不跳转至主页!",
                //     type: "success",
                //     showCancelButton: true,
                //     confirmButtonColor: "#DD6B55",
                //     confirmButtonText: "确认",
                //     cancelButtonText: "取消",
                //     closeOnConfirm: false
                //     // closeOnCancel: false
                //   },
                //   function(isConfirm){
                //     if(isConfirm) {
                //
                //     } else {
                 //
                //       // window.location.reload();
                //     }
                 //
                //   });
               } else {
                 swal("密码输入错误!");
                 // 否则说明密码错误,给密码下面加上注释
                 $('.log_pass input').parent().find('p').html('密码输入错误,请重新输入!').addClass('active');

               }
             } else {

               $('.log_user input').parent().find('p').html('请输入有效的用户名').addClass('active');
             }

           }
         })
       } else {
         $('.log_form input[type!=checkbox]').each(function(index,item) {
         // console.log($(item).val());
         if($(item).val() == '') {
           $(this).parent().find('p').addClass('active');
         }
        });
        swal("请填写完信息之后再提交!");

       }

     } else {
       console.log(logInPhone ());
       // 说明是手机号码登录
       if(logInPhone ()) {
        //  开始验证手机验证码登录状态
        $.ajax({
          type:'get',
          url:'../php/ws_selectUser.php',
          success: function(response) {
            // console.log(JSON.parse(response));
            var userName = JSON.parse(response).find(function(value,index) {
              return value.phone == $('.log_phone input').val()
            });
            if( typeof userName !== 'undefined') {
              //进入到这里说明账号正确,验证码正确, 因为是手机号码登录所以直接可以进行跳转
              //进入到这里说明账号正确,验证码正确,
              setCookie('yi_he_item', $('.log_phone input').val(), 10 *24);
              setCookie('userNamePhone', $('.log_phone input').val(), 10 * 24 * 60 *1000);
              window.location.href = 'yf_index.html?userName=' + $('.log_phone input').val();
            } else {

              $('.log_phone input').parent().find('p').html('请输入有效的手机号码').addClass('active');
            }

          }
        })

        // 结束手机验证码
      } else {
        $('.log_form input[type!=checkbox]').each(function(index,item) {
          console.log($(item).val());
          if($(item).val() == '') {
            $(this).parent().find('p').addClass('active');
          }
        });
      }
     }
 })
 /****** end  登录界面的 输入有效性验证  ******/

 // 如果登录成功则设置cookie作为本地存储,有效时间为10分钟,此处的time的单位是分钟
//  function setCookie(name, value, time) {
//   var str = '';
//
//   if (time) {
//     var oDate = new Date();
//     var oNewDate = new Date(oDate.getTime() + time * 60 * 1000);
//
//     str = name + '=' + value + ';expires=' + oNewDate.toGMTString();
//   } else {
//     str = name + '=' + value;
//   }
//
//   document.cookie = str;
// }


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
}

function removeCookie(name) {
  setCookie(name, '', -1);
}

})
