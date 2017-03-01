$(function () {
  // 提交的时候的事件处理
  $('.submitOrder').click(function(){
    var bool = false;
    $('.allAddre li label input').each(function(index,item) {
      if($(item).prop('checked')) {
        bool = true;
        console.log($(this).parent().parent().parent().html())
        localStorage.setItem('newAddress',$(this).parent().parent().parent().find('.name').html() + $(this).parent().parent().parent().find('.province').html() +
        $(this).parent().parent().parent().find('.city').html() +
        $(this).parent().parent().parent().find('.country').html() +
        $(this).parent().parent().parent().find('.area').html() + $(this).parent().parent().parent().find('.phone').html());
        console.log(localStorage.getItem('newAddress'))
        window.location.href = 'ws_orderSuccess.html?price=' + $('.ws_sumMoney1').html()
      }
    });
    if(!bool) {
      swal({
       title: "请选择地址!",
       type:'warning',
       text: "I will close in 2 seconds.",
       timer: 1000,
       showConfirmButton: false
      })
    }
  })
     //调用插件
     $.fn.citySelect();
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
  }
    //  加载订单详情
    function parse(str) {
    var obj = {};
    str.split('&').forEach(function (item) {
      var result = item.split('=');
      obj[result[0]] = result[1];
    });
    return obj;
  };
  var timeObj = parse(location.search.substring(1));

    // console.log(parse(location.search.substring(1)).time);
    if(typeof timeObj.time != 'undefined') {
      $('.shopWrap').children().empty();
      var shopPrice = $('#shopPrice').html('0');
      for(var a in timeObj) {
        $.ajax({
          type:'post',
          url:'../php/ws_selectOrder.php',
          data: {
            time:timeObj[a]
          },
          success:function(response) {
            console.log(JSON.parse(response));
            var res = JSON.parse(response);
            if(res.state == '1') {
              $.each(res.result,function(index,item) {
                if(item.time == timeObj.time){
                  var str = `
                       <tr>
                         <td>
                           <div class="checkbox">
                             <label>
                               <img src="${item.srcImg}" alt="">
                               ${item.itemDescription}
                             </label>
                           </div>
                         </td>
                         <td>
                           <p>版本:${item.edition}</p>
                           <p>颜色:${item.color}</p>
                         </td>
                         <td>
                           ¥ ${item.itemPrice}
                         </td>
                         <td>
                           <div class="orderNumWrap">
                             <span class="orderNumber">${item.shopNum}</span>
                           </div>
                         </td>
                         <td >
                           <span>¥ <span class="ws_money">${item.itemPrice * item.shopNum}</span></span>
                         </td>
                       </tr>
                 `;

                 $('tbody').append($(str));
                 $('#shopPrice').html(function(a,value) {
                  //  alert(parseFloat(value) + parseFloat($('.ws_money').html()));
                   return  parseFloat(value) + parseFloat($('tbody td .ws_money').eq(index).html());
                 });
                 $('.allMoney').html(function() {
                   return parseFloat($('#shopPrice').html()) + 5;
                 });
                 $('.ws_sumMoney1').html($('.allMoney').html());
                }

              })
            }
          }
        })
      }
    }
 });
Vue.http.options.emulateJSON = true;
var addressVm = new Vue({
 el: '.addressWrapper',
 data:{
   updateLate :{
     userName :'',
     province:'',
     city:'',
     country:'',
     streetName : '',
     tel :''
   },
   addNewAddress :{
     userName :'',
     province:'',
     city:'',
     country:'',
     streetName : '',
     tel :'',
     isDefault:'false',
     time:''
   },
   updateItem:{

   },
   updateItemIndex:0,
   delOneAddIndex:0,
   delOneAdditem:{},
   delOneAddress:'',
   delOneaddFlag:'',
   showAddress:true,
   currentIndex:0,
   limitNum:3,//设置默认显示的地址条数
   addressList:[],
   addressArr : {
     status : 0,
     message : '',
     result :[
       {
         addressId : '1000',
         userName :'魏松',
         province:'广东',
         city:'和硕',
         country:'从化村',
         streetName : '新甸铺镇',
         postCode : '10001',
         tel :'110',
         isDefault : true,
         checked : true,
         time:'132165566'
       },
       {
         addressId : '1001',
         userName :'如今',
         province:'北京',
         city:'朝阳区',
         country:'洗礼和',
         streetName : '门口',
         postCode : '10001',
         tel :'120',
         isDefault : false,
         time:'132165566'
       },
       {
         addressId : '1002',
         userName :'如今',
         province:'北京',
         city:'南阳',
         country:'新野',
         streetName : '新甸铺镇',
         postCode : '10001',
         tel :'18336345030',
         isDefault : false,
         time:'132165566'
       },
       {
         addressId : '1003',
         userName :'亚飞',
         province:'河北',
         city:'石家庄',
         country:'二狗',
         streetName : '蒙',
         postCode : '10001',
         tel :'130',
         isDefault : false,
         time:'132165566'
       },
       {
         addressId : '1004',
         userName :'小明',
         province:'海口',
         city:'点击',
         country:'答复',
         streetName : '新到时甸',
         postCode : '10001',
         tel :'140',
         isDefault : false,
         time:'132165566'
       }
     ]
   }
 },
 mounted : function() {
   this.$nextTick(function() {
     this.getAddressList()
   });
 },
 computed:{
   filterAddress: function() {
     return this.addressArr.result.slice(0,this.limitNum);
   }
 },
 methods: {
   getAddressList : function() {
     console.log(22222);
     if(this.addressArr.result.length == 0) {
       this.showAddress = false;
     }
     var _this = this;
     this.$http.get('../php/ws_selectAddress.php').then(function(response) {
       var res = response.data;
       console.log(JSON.parse(res));
       _this.addressArr.result = JSON.parse(res);
      //  this.addressArr.result = this.addressArr.result.concat(JSON.parse(res));
     })
   },
   showMoreAddress : function() {
     this.limitNum = this.addressArr.result.length;
   },
   hideMoreAddress : function() {
     this.limitNum = 3;
   },
   setDefault:function(a,b) {
     var _this = this;
     this.$http.post('../php/ws_isDefault.php',{
       currentTime: a.time
     }).then(function(response) {
       _this.addressArr.result.forEach(function(item,index) {
         if(index == b) {
           item.isDefault = 'true';
           if(typeof item.checked == 'undefined') {
             _this.$set(item,'checked',true);
           } else {
             item.checked = true;
           }
         } else {
           item.isDefault = 'false';
         }
       })
     })

   },
   changeBg:function(a) {
     this.currentIndex = a;
     var _this = this;
     this.addressArr.result.forEach(function(item,index) {
       if(index == _this.currentIndex) {
         if(typeof item.checked == 'undefined') {
           _this.$set(item,'checked',true);
         } else {
           item.checked = true;
         }
       } else {
         if(typeof item.checked == 'undefined') {
           _this.$set(item,'checked',false);
         } else {
           item.checked = false;
         }
       }
     })
   },
   delOneAddConform:function(a,b) {
     this.delOneaddFlag = '#delOneAddress';
     this.delOneAddIndex = a;
     this.delOneAdditem = b;
   },
   delAddressItem:function() {
     this.$http.post('../php/ws_delAddress.php',{time:this.delOneAdditem.time}).then(function(response) {
       console.log(response.data);
     })
     this.addressArr.result.splice(this.delOneAddIndex,1);
     this.addressNull();
   },
   addressNull : function() {
     if(this.addressArr.result.length == 0) {
       this.showAddress = false;
     } else {
       this.showAddress = true;
     }
   },
   changeAddress : function() {
    // 更新的时候判断是勾选还是没有勾选
     if(this.updateLate.isDefault === 'false') {
       this.updateLate.isDefault = 'true';
     } else {
       this.updateLate.isDefault = 'false';
     }
   },
   updateAddressComfirm: function(value,index) {
    //  更新的确认按钮,传递参数,告诉是点击的哪一个,然后在点击删除的时候传递对应的参数
     this.updateItem = value;
     this.updateLate = value;
     this.updateItemIndex = index;
     console.log(this.updateItem,this.updateItemIndex)
   },
   cancelUpdateAdd:function() {
     this.updateItem = '';
   },
   updateAddress: function() {
     var _this = this;
     this.$http.post('../php/ws_updateAddress.php',this.updateLate).then(function(response) {
       console.log(response);
       if(_this.updateLate.isDefault == 'true') {
         _this.addressArr.result.forEach(function(item,index) {
           if(item.time == _this.updateLate.time) {
             item.isDefault = 'true';
             if(typeof item.checked == 'undefined') {
               _this.$set(item,'checked',true);
             } else {
               item.checked = true;
             }
           } else {
             item.isDefault = 'false';
           }
         })
       }
     })
   },
   addNewAddressFun:function() {
     var time = new Date().getTime();
     this.addNewAddress.time = time;
     console.log(this.addNewAddress.isDefault)
     var _this = this;
     this.$http.post('../php/ws_addAddress.php',this.addNewAddress).then(function(response) {
       var res = response.data;
       console.log(res);
       //  做请求然后改变数组的长度即可
        console.log(this.addNewAddress);
        _this.addressArr.result.push(_this.addNewAddress);
        if(_this.addNewAddress.isDefault == 'true') {
          _this.addressArr.result.forEach(function(item,index) {
            if(item.time == time) {
              item.isDefault = 'true';
              if(typeof item.checked == 'undefined') {
                _this.$set(item,'checked',true);
              } else {
                item.checked = true;
              }
            } else {
              item.isDefault = 'false';
            }
          })
        }
        _this.addNewAddress = {
          userName :'',
          province:'',
          city:'',
          country:'',
          streetName : '',
          tel :'',
          isDefault:'false',
          time:''
        };
        _this.limitNum = this.addressArr.result.length;
        _this.addressNull();
     })
   },
   addNewIsDefault : function() {
     if(this.addNewAddress.isDefault === 'false') {
       this.addNewAddress.isDefault = 'true';
     } else {
       this.addNewAddress.isDefault = 'false';
     }
   }
 }
});
