$(function() {

  // 引入tween.js
  var Tween = {
		Linear: function(t,b,c,d){ return c*t/d + b;}
	};
  // 初始化一个计时器
  var timer =null;
  // 给每个下面的城市添加点击事件
  $('.cityList li .listItem li').click(function() {
    $('#currentCity').html($(this).html());
  });

  // 监听输入框的按键事件 , 根据输入的首字母来判断滚动条应该在什么位置
  $('#ipt').on('keyup',function(event) {
    // console.log($('#ipt').val());
    var targetHeight = 0;
    $('.content-bottom .cityList li .flag').each(function(index,item) {
      // console.log($(this).html().toLowerCase(),$('#ipt').val().substr(0,1));
      if($(item).html().toLowerCase() == $('#ipt').val().substr(0,1).toLowerCase() ) {
        targetHeight = $(item).parent().offset().top - $('.content-bottom').offset().top;
        console.log(targetHeight);
      };
      if($('#ipt').val() == '') {
        // console.log('kong');
        $('.content-bottom').scrollTop(0);
        return false;
      }
    });
    // 为了出现过度效果所有使用了tween.js
    clearInterval(timer);
    var t = 0;
    var b = $('.content-bottom').scrollTop();
    var c = targetHeight;
    var d = 20;
    var speed = 2;
    if(c == 0) {
      var b = $('.content-bottom').scrollTop();
    }
    timer = setInterval(function() {
      t += speed;
      if(t == d) {
        	clearInterval(timer);
      };
      $('.content-bottom').scrollTop(Tween.Linear(t,b,c,d));
    },16);

  });
  // 使用 vue.js 遍历所有的城市
  var cityList = new Vue({
    el:'.cityList',
    data: {
      cityArr : [
        {flag:'A', cityItem:['安阳','安徽','安阳','安徽']},
        {flag:'B', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'C', cityItem:['安阳','安徽']},
        {flag:'D', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'E', cityItem:['安阳','安徽']},
        {flag:'F', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'G', cityItem:['安阳','安徽']},
        {flag:'H', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'I', cityItem:['安阳','安徽']},
        {flag:'J', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'K', cityItem:['安阳','安徽']},
        {flag:'L', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'M', cityItem:['安阳','安徽']},
        {flag:'N', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'O', cityItem:['安阳','安徽']},
        {flag:'P', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'Q', cityItem:['安阳','安徽']},
        {flag:'R', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'I', cityItem:['安阳','安徽']},
        {flag:'S', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'T', cityItem:['安阳','安徽']},
        {flag:'U', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'V', cityItem:['安阳','安徽']},
        {flag:'W', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'X', cityItem:['安阳','安徽']},
        {flag:'Y', cityItem:['北京','本溪','南京','海口','洛阳']},
        {flag:'Z', cityItem:['北京','本溪','南京','海口','洛阳']},
      ]
    },
    methods:{
      selectCity : function(a) {
        document.getElementById('currentCity').innerHTML = a;
        localStorage.setItem('one',a);
      }
    }
  })

})
