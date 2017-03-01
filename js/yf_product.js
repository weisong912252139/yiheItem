$(document).ready(function() {
	//引用尾部
	$('#footer').load('rj_public_bottom.html')
	// 图片上下滚动
	var count = $("#imageMenu li").length - 5; /* 显示 6 个 li标签内容 */
	var interval = $("#imageMenu li:first").width();
	var curIndex = 0;

	$('.scrollbutton').click(function() {
		if($(this).hasClass('disabled')) return false;

		if($(this).hasClass('smallImgUp')) --curIndex;
		else ++curIndex;

		$('.scrollbutton').removeClass('disabled');
		if(curIndex == 0) $('.smallImgUp').addClass('disabled');
		if(curIndex == count - 1) $('.smallImgDown').addClass('disabled');

		$("#imageMenu ul").stop(false, true).animate({ "marginLeft": -curIndex * interval + "px" }, 600);
	});
	// 解决 ie6 select框 问题
	$.fn.decorateIframe = function(options) {
		if($.browser.msie && $.browser.version < 7) {
			var opts = $.extend({}, $.fn.decorateIframe.defaults, options);
			$(this).each(function() {
				var $myThis = $(this);
				//创建一个IFRAME
				var divIframe = $("<iframe />");
				divIframe.attr("id", opts.iframeId);
				divIframe.css("position", "absolute");
				divIframe.css("display", "none");
				divIframe.css("display", "block");
				divIframe.css("z-index", opts.iframeZIndex);
				divIframe.css("border");
				divIframe.css("top", "0");
				divIframe.css("left", "0");
				if(opts.width == 0) {
					divIframe.css("width", $myThis.width() + parseInt($myThis.css("padding")) * 2 + "px");
				}
				if(opts.height == 0) {
					divIframe.css("height", $myThis.height() + parseInt($myThis.css("padding")) * 2 + "px");
				}
				divIframe.css("filter", "mask(color=#fff)");
				$myThis.append(divIframe);
			});
		}
	}
	$.fn.decorateIframe.defaults = {
		iframeId: "decorateIframe1",
		iframeZIndex: -1,
		width: 0,
		height: 0
	}
	//放大镜视窗
	$("#bigView").decorateIframe();
	//点击到中图
	var midChangeHandler = null;

	$("#imageMenu li img").bind("click", function() {
		if($(this).attr("id") != "onlickImg") {
			midChange($(this).attr("src").replace("small", "mid"));
			$("#imageMenu li").removeAttr("id");
			$(this).parent().attr("id", "onlickImg");
		}
	}).bind("mouseover", function() {
		if($(this).attr("id") != "onlickImg") {
			window.clearTimeout(midChangeHandler);
			midChange($(this).attr("src").replace("small", "mid"));
			$(this).css({ "border": "3px solid #959595" });
		}
	}).bind("mouseout", function() {
		if($(this).attr("id") != "onlickImg") {
			$(this).removeAttr("style");
			midChangeHandler = window.setTimeout(function() {
				midChange($("#onlickImg img").attr("src").replace("small", "mid"));
			}, 1000);
		}
	});

	function midChange(src) {
		$("#midimg").attr("src", src).load(function() {
			changeViewImg();
		});
	}
	//大视窗看图
	function mouseover(e) {
		if($("#winSelector").css("display") == "none") {
			$("#winSelector,#bigView").show();
		}
		$("#winSelector").css(fixedPosition(e));
		e.stopPropagation();
	}

	function mouseOut(e) {
		if($("#winSelector").css("display") != "none") {
			$("#winSelector,#bigView").hide();
		}
		e.stopPropagation();
	}
	$("#midimg").mouseover(mouseover); //中图事件
	$("#midimg,#winSelector").mousemove(mouseover).mouseout(mouseOut); //选择器事件

	var $divWidth = $("#winSelector").width(); //选择器宽度
	var $divHeight = $("#winSelector").height(); //选择器高度
	var $imgWidth = $("#midimg").width(); //中图宽度
	var $imgHeight = $("#midimg").height(); //中图高度
	var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度

	function changeViewImg() {
		$("#bigView img").attr("src", $("#midimg").attr("src").replace("mid", "big"));
	}
	changeViewImg();
	$("#bigView").scrollLeft(0).scrollTop(0);

	function fixedPosition(e) {
		if(e == null) {
			return;
		}
		var $imgLeft = $("#midimg").offset().left; //中图左边距
		var $imgTop = $("#midimg").offset().top; //中图上边距
		X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
		Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
		X = X < 0 ? 0 : X;
		Y = Y < 0 ? 0 : Y;
		X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
		Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;

		if($viewImgWidth == null) {
			$viewImgWidth = $("#bigView img").outerWidth();
			$viewImgHeight = $("#bigView img").height();
			if($viewImgWidth < 200 || $viewImgHeight < 200) {
				$viewImgWidth = $viewImgHeight = 800;
			}
			$height = $divHeight * $viewImgHeight / $imgHeight;
			$("#bigView").width($divWidth * $viewImgWidth / $imgWidth);
			$("#bigView").height($height);
		}
		var scrollX = X * $viewImgWidth / $imgWidth;
		var scrollY = Y * $viewImgHeight / $imgHeight;
		$("#bigView img").css({ "left": scrollX * -1, "top": scrollY * -1 });
		$("#bigView").css({ "top": 75, "left": $(".preview").offset().left + $(".preview").width() + 15 });

		return { left: X, top: Y };
	}

	//商品详情，商品评价，成交记录页面切换
	$('.yf_sorts li').click(function() {
		var i = $(this).index();
		//		console.log(i);
		$('.goods_sorts').children().eq(i).addClass('show').siblings().removeClass('show');
		$(this).addClass('pitch').siblings().removeClass('pitch')
	});
	//收藏
	//	$('.yf_collect a .glyphicon').click(function() {
	//		$('.yf_collect a .glyphicon').addClass('show');
	//		$(this).removeClass('show');
	//	});
	//商品评价，星星的处理
	//	$('.grade img').click(function(){
	//		var num=$(this).index();
	//      $('.grade img').each(function(index,item){
	//      	if(index <= num) {
	//      		$(item).attr('src','../img/product/hongxing.png')
	//      	} else {
	//      		$(item).attr('src','../img/product/heixing.png')
	//      	}
	//      })
	//	})

	$.ajax({
		type: "get",
		url: "../php/yf_product.php",
		data: {
			//客户名
			userName: function(userName) {
				return userName = getCookie('yi_he_item');
			},
			//评论星星等级
			goodsGrade: number(),
			//评论内容
			valuationText: $('#BZ').val(),
			//获取当前时间
			timer: timer(),
			//商品插图
			//				CommodityIllustration: function() {
			//
			//				}
		},
		success: function(data) { //函数回调，接收的是请求回来的数据data

			//已经解析好的JSON对象
			//			console.log(JSON.parse(data));
			render(JSON.parse(data));
		}
	});

	function getCookie(name) {
		var str = document.cookie;
		var result = '';

		str.split('; ').forEach(function(item) {
			var arr = item.split('=');

			if(arr[0] === name) {
				result = arr[1];
			}
		});
		return result;
	}
	getCookie('yi_he_item');

	function timer() {
		function p(s) {
			return s < 10 ? '0' + s : s;
		}
		var newDate = new Date();
		//获取当前年
		var year = newDate.getFullYear();
		//获取当前月
		var month = newDate.getMonth() + 1;
		//获取当前日
		var date = newDate.getDate();
		var h = newDate.getHours(); //获取当前小时数(0-23)
		var m = newDate.getMinutes(); //获取当前分钟数(0-59)
		var s = newDate.getSeconds();
		var time = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
		return time;
	}

	function number() {
		var num;
		$('.grade1 img').each(function() {
			if($(this).attr('src') == '../img/product/hongxing.png') {
				num = $(this).index();
			}
		});
		return num + 1;
	}

	function render(a) {

		$.each(a, function(index, item) {

			var str = `
			<li>
							<div class="head_portrait">
								<img src="../img/product/mis.zhang.png" />
								<p class="userName">${item.userName}</p>
							</div>
							<div class="assesses">
								<div>
									<span class="timer">${item.timer}</span>
									<div class="grade" data-star="${item.goodsGrade}">
										<img src="../img/product/hongxing.png" />
										<img src="../img/product/heixing.png" />
										<img src="../img/product/heixing.png" />
										<img src="../img/product/heixing.png" />
										<img src="../img/product/heixing.png" />
									</div>
								</div>
								<p>${item.valuationText}</p>
								<div class="inset">
									<img src="../img/product/mis.xioazhang.png" />
									<img src="../img/product/mis.xioazhang.png" />
									<img src="../img/product/mis.xioazhang.png" />
									<img src="../img/product/mis.xioazhang.png" />
								</div>
							</div>
						</li>
			`;
			$('#yf_list').prepend($(str));
			$('#yf_list').find('li .grade').each(function(a, b) {
				//				console.log(index,b);
				//				console.log($(b).attr('data-star'));
				if(typeof $(b).attr('data-star') != 'undefined') {
					$(b).find('img').each(function(index, item) {
						if(index + 1 <= $(b).attr('data-star')) {

							$(item).attr('src', '../img/product/hongxing.png')
						} else {
							$(item).attr('src', '../img/product/heixing.png')
						}

					})
				}
			})
		})
	};

	function parse(str) {
		var obj = {};
		str.split('&').forEach(function(item) {
			var result = item.split('=');
			obj[result[0]] = result[1];
		});
		return obj;
	};

	//console.log(parse(window.location.search.substring(1)).id);
	

	//收藏
	$('.yf_collect a .glyphicon').click(function() {
		//		var time = new Date().getTime();
		//		$('.yf_collect a .glyphicon').addClass('show');
		//		$(this).removeClass('show');
		if($(this).hasClass('glyphicon-star-empty')) {
			//插入数据
			$.ajax({
				type: "post",
				url: "../php/yf_product2.php",
				async: true,
				data: {
					id: id,
					goods_imgSrc: $('.preview .bigImg img').attr('src'),
					goods_text: $('.yf_center_xinxi .goods_text').html(),
					goods_newPrice: $("#ws_itemPrice").html(),
					goods_OriginalPrice: $('#yf_goods_OriginalPrice').html(),
				},
				success: function(data) { //函数回调，接收的是请求回来的数据data
					//已经解析好的JSON对象
					//					console.log(data);
					$('.preview .bigImg img').data('goods_imgSrc', $('.preview .bigImg img').attr('src'));
					$('.glyphicon').addClass('show');
					$('.glyphicon-star-empty').removeClass('show');
				}
			});
		}
		//删除数据
		if($(this).hasClass('glyphicon-star')) {
			$.ajax({
				type: "get",
				url: "../php/yf_product3.php",
				async: true,
				data: {
					id: id
				},
				success: function(data) { //函数回调，接收的是请求回来的数据data
					//已经解析好的JSON对象
					$('.glyphicon').addClass('show');
					$('.glyphicon-star').removeClass('show');
				}
			});
		}
	});
	var id = parse(window.location.search.substring(1)).id;
	console.log(id)
	//判断数据库中是否存在该数据，若存在，收藏按钮呈红星，否则呈现白星
	$.ajax({
		type: "post",
		url: "../php/yf_product4.php",
		async: true,
		data: {
			id:id
		},
		success: function(data) { //函数回调，接收的是请求回来的数据data
//			console.log(data);
//			console.log(JSON.parse(data),!JSON.parse(data).length)
			if (JSON.parse(data).length) {
				if(JSON.parse(data)[0].id == id) {
					$('.glyphicon-star-empty').removeClass('show');
					$('.glyphicon-star').addClass('show');
				} else {
					$('.glyphicon-star-empty').addClass('show');
					$('.glyphicon-star').removeClass('show');
				}
			}
			
		}
	});

});