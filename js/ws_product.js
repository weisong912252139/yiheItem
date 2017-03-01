$(function() {
  //  这个js文件主要做该页面基本的逻辑交互,还有向后台发送ajax请求,将 该购物车内的信息添加到数据库
  // 对尺寸和颜色点击事件的处理
  $('#ws_type .ws_size span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('#ws_type .ws_color span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 对购买数量的控制的操作
  $('.yf_jia').click(function() {
    var num = $('#ws_shopNum').val();
    num ++;
    $('#ws_shopNum').val(num);
  })
  $('.yf_jian').click(function() {
    var num = $('#ws_shopNum').val();
    num --;
    if(num < 1) {
      $('#ws_shopNum').val(1);
    } else {
      $('#ws_shopNum').val(num);
    }
  });

  function parse(str) {
    var obj = {};
    str.split('&').forEach(function (item) {
      var result = item.split('=');
      obj[result[0]] = result[1];
    });
    return obj;
  };
  console.log(parse(window.location.search.substring(1)).url);
  var url = parse(window.location.search.substring(1)).url;
  $('#vertical img').attr('src',url);
  $('#bigView img').attr('src',url);
  $('#imageMenu ul li').find('img').attr('src',url);


  // 点击加入购物车的操作,做ajax请求post方式发送数据,并且插入数据库
  $('#ws_addShoppingCart').click(function() {
      $.ajax({
        type:'post',
        url:'../php/ws_addShoppingCart.php',
        data:{
          shopName : $('#ws_shopName').html(),
          srcImg:$('#imageMenu ul li').eq(0).find('img').attr('src'),
          itemDescription:'&lt;&lt;'+ $('#ws_desc').html() +'&gt;&gt; 万达青花瓷广场',
          edition:$('#ws_type .ws_size .active').html(),
          color:$('#ws_type .ws_color .active').html(),
          itemPrice:$('#ws_itemPrice').html(),
          shopNum: $('#ws_shopNum').val()

        },
        success: function(response) {
          console.log(response);
          swal({
           title:'加入购物车成功!',
           text:'请到购物车查看',
    		   type:'success',
    		   timer: 1500,
    		   showConfirmButton: false
    		  });
        }
      })
  });


  //点击立即购买之后添加应有的信息并且跳转至确认订单页面
  $('#ws_newShop').click(function() {
    var time = new Date().getTime();
    $.ajax({
      type:'post',
      url:'../php/ws_orderList.php',
      data:{
        time :time,
        shopName : $('#ws_shopName').html(),
        srcImg:$('#imageMenu ul li').eq(0).find('img').attr('src'),
        itemDescription:'&lt;&lt;'+ $('#ws_desc').html() +'&gt;&gt; 万达青花瓷广场',
        edition:$('#ws_type .ws_size .active').html(),
        color:$('#ws_type .ws_color .active').html(),
        itemPrice:$('#ws_itemPrice').html(),
        shopNum: $('#ws_shopNum').val()
      },
      success: function(response) {
        console.log(response);
        window.location.href = 'ws_orderList.html?time=' + time;
      }
    })

  })





})
