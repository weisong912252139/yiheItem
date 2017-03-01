/**
 * Created by lanouhn on 17/2/17.
 */
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
  }



});

Vue.http.options.emulateJSON = true;

var shoppingCart = new Vue({
  el:'.shoppingList',
  data: {
  	a : 'a',
    delSome:'',
    flag:true,
    currentProduct:{},
    totalMoney: 0,
    checkAllFlag : false,
    checkAllAll: false,
    shoppingCart : [
      {
        status:1,
        result : {
          totalMoney:59,
          shopName : '海澜之家旗舰店',
          list:[
            {
              productId:'123',
              srcImg:'../img/home_page/yf_car1.png',
              itemDescription:'&lt;&lt;寻龙诀&gt;&gt; 万达青花瓷广场',
              edition:'国航32G',
              color:'黑色',
              itemPrice:'35',
              shopNum:5
            },
            {
              productId:'124',
              srcImg:'../img/home_page/yf_car2.png',
              itemDescription:'&lt;&lt;寻龙诀&gt;&gt; 万达青花瓷广场',
              edition:'国航32G',
              color:'黑色',
              itemPrice:'35',
              shopNum:2
            },
            {
              productId:'124',
              srcImg:'../img/home_page/yf_car3.png',
              itemDescription:'&lt;&lt;寻龙诀&gt;&gt; 万达青花瓷广场',
              edition:'国航32G',
              color:'白色',
              itemPrice:'35',
              shopNum:2,
            },
            {
              productId:'124',
              srcImg:'../img/public/shopping.png',
              itemDescription:'&lt;&lt;寻龙诀&gt;&gt; 万达青花瓷广场',
              edition:'国航32G',
              color:'白色',
              itemPrice:'35',
              shopNum:2
            },
            {
              productId:'124',
              srcImg:'../img/home_page/yf_car4.png',
              itemDescription:'&lt;&lt;亚飞&gt;&gt; 的小小的广场',
              edition:'国航32G',
              color:'白色',
              itemPrice:'35',
              shopNum:2
            }
          ]
        }
      },
    ],
  },
  filters:{
    formatMoney: function(value,type) {
      return '¥ ' + value + '.00 ' + type;
    },
    formatSize: function(value,type) {
      return '¥ ' + value + '.00 ' + type;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      shoppingCart.cartView();
    })
  },
  computed:{
    //  totalMoney : function() {
    //    return 100;
    //  }
  },
  methods:{
    cartView: function() {
      console.log('111');
         var _this = this;
         this.$http.get('../php/ws_selectShopping.php').then(function(response) {
         	var res = response.data;
         	var _this = this;
         	console.log(JSON.parse(res));
         	JSON.parse(res).forEach(function(value,index) {
         		_this.shoppingCart[0].result.list.push(value);
         	})
         })
    },
    changeMoney : function(item, way) {
      if(way > 0) {
        //  点的是加号
        item.shopNum ++;
      } else {
        // 点的是减号
        item.shopNum --;
        if(item.shopNum < 1) {
          item.shopNum = 1;
        }
      };

      this.calcTotalPrice();
    },
    selectProduct : function(item) {

      console.log(item.checked);
      if(typeof item.checked == 'undefined') {
        // 说明当前的对象中不包含这个属性,可以全局注册
        this.$set(item,'checked',true);
        this.checkIsAll();
      } else {
        item.checked = !item.checked;
        this.checkIsAll();
        if(item.checked == false) {
          this.checkAllFlag = false;
          this.checkAllAll = false;
        }
      }
      this.calcTotalPrice();
    },
    checkAllShop :function() {

      // 全选的函数
      // this.shopCheck = !this.shopCheck;
      this.checkAllFlag = !this.checkAllFlag;
      if(this.checkAllFlag) {
        this.checkAllAll = true;
        var _this = this;
        this.shoppingCart[0].result.list.forEach(function(item,index) {
          if(typeof item.checked == 'undefined') {
            _this.$set(item,'checked',true);
          } else {
            item.checked = true;
          }
        })
      } else {
        this.checkAllAll = false;
        this.shoppingCart[0].result.list.forEach(function(item,index) {
          item.checked = false;
        })
      }

      this.calcTotalPrice();
    },
    checkIsAll : function() {
      var _this = this;
      var bool = true;
      this.shoppingCart[0].result.list.forEach(function(item,index) {
        if(typeof item.checked === 'undefined') {
          _this.$set(item,'checked',false);
          bool = false;
        } else if(item.checked == false) {
          bool = false
        };

      });
      if(bool) {
        this.checkAllFlag = true;
        this.checkAllAll = true;
      }
    },
    checkAll : function () {
      this.checkAllAll = !this.checkAllAll
      if(this.checkAllAll) {
        this.checkAllFlag = true;
        var _this = this;
        this.shoppingCart[0].result.list.forEach(function(item,index) {
          if(typeof item.checked == 'undefined') {
            _this.$set(item,'checked',true);
          } else {
            item.checked = true;
          }
        })
      } else {
        this.checkAllFlag = false;
        this.shoppingCart[0].result.list.forEach(function(item,index) {
          item.checked = false;
        })
      }
      this.calcTotalPrice();
    },
    calcTotalPrice : function() {
      this.totalMoney = 0;
      var _this = this;
      this.shoppingCart[0].result.list.forEach(function(item,index) {
        if(item.checked) {
          _this.totalMoney += item.shopNum * item.itemPrice;
        }
      })
    },
    delConfirm : function(item) {
      this.currentProduct = item;
    },
    delProduct : function() {

      //删除的时候触底过去对应的ID即可
       var _this = this;
       console.log(this.currentProduct.productId);
       this.$http.post('../php/ws_deleteShopping.php',{'a':this.currentProduct.productId}).then(function(response) {
        console.log(response.data);
        var index = _this.shoppingCart[0].result.list.indexOf(_this.currentProduct);
        _this.shoppingCart[0].result.list.splice(index,1);
         _this.calcTotalPrice();
        _this.isNull();
      })

    },
    isNull: function () {
      if(this.shoppingCart[0].result.list.length == 0) {
        this.flag = false;
      }
    },
    delSomeConfirm : function() {
      var _this = this;
      var num = 0;
      this.shoppingCart[0].result.list.forEach(function(item,index) {
        if(item.checked) {
          num ++;
        }
      });
      if(num == 0) {
        this.delSome = '#warnSelect';
      } else if (num > 0) {
        this.delSome = '#delSome';
      }
    },
    delSomeProduct : function () {
    	 var _this = this;
    	  this.shoppingCart[0].result.list.forEach(function(value,index) {
    	  	if(value.checked == true) {
    	  		_this.$http.post('../php/ws_deleteShopping.php',{'a':value.productId}).then(function(response) {
  	          console.log(response.data);
  	          var indexItem = _this.shoppingCart[0].result.list.indexOf(value);
  	          _this.shoppingCart[0].result.list.splice(indexItem,1);
  	          _this.calcTotalPrice();
  	          _this.isNull();
	          })
    	  	}
    	  })
    },
    settlement : function() {
      var time = new Date().getTime();
      var _this = this;
      var num = 0;
      var a = 0;
       this.shoppingCart[0].result.list.forEach(function(value,index) {
         num ++;
         if(value.checked == true) {
           a ++;
           _this.$http.post('../php/ws_orderList.php',{
              time :time,
              shopName : 	_this.shoppingCart[0].result.shopName,
              srcImg: value.srcImg,
              itemDescription:value.itemDescription,
              edition:value.edition,
              color:value.color,
              itemPrice:value.itemPrice,
              shopNum: value.shopNum
           }).then(function(response) {

             console.log(response);
             go (num);
           });
          //  window.location.href = 'ws_orderList.html?totalMoney=' + _this.totalMoney;
         }
       });
       if(a == 0) {
         swal({
          title: "请选择商品!",
          type:'warning',
          text: "I will close in 2 seconds.",
          timer: 1000,
          showConfirmButton: false
         })
       } ;
       function go (num) {
         if(num == _this.shoppingCart[0].result.list.length) {
           window.location.href = 'ws_orderList.html?totalMoney=' + _this.totalMoney + '&time=' + time;
         }
       }
    }
  }
})
