$(function() {
	// localStorage.setItem('isDefault','')
	console.log(localStorage.getItem('isDefault'));
	//	$('.address1').css('display','none')
	$.fn.citySelect(); //插件的调用
	// 页面加载之后默认从数据库获取一次原来保存过的地址

	$.ajax({
		type: 'get',
		url: '../php/ws_selectAddress.php',
		success: function(response) {
			// console.log(JSON.parse(response).length)
			$.each(JSON.parse(response), function(index, item) {
				// console.log(index,item);
				var str = `
				  <ul data-time="${item.time}">
										<li>${index + 1}</li>
										<li>${item.userName }</li>
										<li><span class="pro">${item.province}</span>
										<span class="city">${item.city}</span>
										<span class="area">${item.country}</span></li>
										<li class="streetName">${item.streetName}</li>
										<li class="tel">${item.tel}</li>
										<li> 备注写点什么呢</li>
										<li><span class="add1"> <a href="javascript:;" class="setDefault" data-default="${item.isDefault}">${item.isDefault == 'true' ? "默认值":"设置为默认值" }</a> </span>| <span class="add2"><a data-toggle='modal' data-target="#updateAddModel" class='changeAddress'>修改 </a></span> |</span> <span class="add3"><a href="javascript:;" class="delAddress">删除</a></span> </li>

									</ul>
				`;
				$('.content-address1').append($(str));

			});
			isNull(); //看地址是否为空
			// isDefault (); //看是否是默认值
		}
	})

	// 对删除按钮的操作,使用时间委托处理
	$('.content-address1').on('click', 'ul .delAddress', function() {
		var _this = this;
		$.ajax({
			type: 'post',
			url: '../php/ws_delAddress.php',
			data: {
				time: $(this).parent().parent().parent().data('time')
			},
			success: function(response) {
				if (response == 'success') {
					swal({
						title: "删除成功!",
						type: 'success',
						text: "1s后关闭",
						timer: 1000,
						showConfirmButton: false
					});
					$(_this).parent().parent().parent().remove();
					$('.content-address1 ul').each(function(index, item) {
						$(item).find('li').eq(0).html(index + 1);
					});
					isNull(); //看地址是否为空
					// 判断删除的当前的这个是否是默认地址,如果是就把	localStorage.setItem('isDefault','')
					localStorage.setItem('isDefault', '');
				}

			}
		})
	});

	//  对修改的操作,点击弹出框之后修改提交数据到数据库
	var updateFlage = 0;
	var updateIndex = 0;
	$('.content-address1').on('click', 'ul .changeAddress', function() {

		console.log($(this).parent().parent().parent());
		var target = $(this).parent().parent().parent();
		updateFlage = target.data('time');
		updateIndex = target.index();
		$('#aaname').val(target.find('li').eq(1).html());
		$('#choosePro').html(target.find('.pro').html());
		$('#chooseCity').html(target.find('.city').html());
		$('#chooseCounty').html(target.find('.area').html());
		$('#detailsadd').val(target.find('.streetName').html());
		$('#phone').val(target.find('.tel').html());
		$('#ws_checked').prop('checked', (target.find('.setDefault').data('default') == true ? true : false));
		console.log($('#ws_checked').prop('checked'))
	});

	$('#updateAddress').click(function() {
		// 点击确认之后提交到后台更新数据
		if (isOk2()) {
			$.ajax({
				type: 'post',
				url: '../php/ws_updateAddress.php',
				data: {
					time: updateFlage,
					userName: $('#aaname').val(),
					province: $('#province').get(0).options[$('#province').get(0).selectedIndex].text,
					city: $('#citys').get(0).options[$('#citys').get(0).selectedIndex].text,
					country: $('#county').get(0).options[$('#county').get(0).selectedIndex].text,
					streetName: $('#detailsadd').val(),
					tel: $('#phone').val(),
					isDefault: $('#ws_checked').prop('checked'),
					lastDefault: localStorage.getItem('isDefault')
				},
				success: function(response) {
					console.log(response);
					if (response == 'success') {
						localStorage.setItem('isDefault', updateFlage);
						var target = $('.content-address1 ul').eq(updateIndex);
						target.find('li').eq(1).html($('#aaname').val());
						target.find('.pro').html($('#province').get(0).options[$('#province').get(0).selectedIndex].text);
						target.find('.city').html($('#citys').get(0).options[$('#citys').get(0).selectedIndex].text);
						target.find('.area').html($('#county').get(0).options[$('#county').get(0).selectedIndex].text);
						target.find('.streetName').html($('#detailsadd').val());
						target.find('.tel').html($('#phone').val());
						if ($('#ws_checked').prop('checked')) {
							$('.content-address1 ul').each(function(index, item) {
								if ($(this).find('.setDefault').html() == '默认值') {
									$(this).find('.setDefault').html('设置为默认值').data('default', false);
								}
							});

							target.find('.setDefault').data('default', true).html('默认值');
						} else {
							target.find('.setDefault').data('default', false).html('设置为默认值');
						}

					}
				}
			})
		} else {
			swal('内容输入不完整,修改失败')
		}
	})

	//写添加地址的操作,加入到对应的数据库
	$('#ws_addNewaddress').click(function() {
		if ($('#Area input').val()=='请选择地区') {
			swal('请选择省市区')

		} else {
			if (isOK1()) {

				addNew();

				$('.address1').css('display', 'none')

				$('.address2').css('display', 'none')

				$('.address3').css('display', 'block')

			} else {

				swal("信息输入不完整,请补充完整");

			}
		}
	});

	//信息完整之后的请求操作
	function addNew() {
		var time = new Date().getTime();

		$.ajax({
			type: 'post',
			url: '../php/ws_addAddress.php',
			data: {
				time: time,
				userName: $('#name').val(),
				province: $('#myProvince').html(),
				city: $('#myCity').html(),
				country: $('#myArea').html(),
				streetName: $('#detailsArea').val(),
				tel: $('#myPhone').val(),
				isDefault: $('#isDefault').prop('checked'),
				update: localStorage.getItem('isDefault')
			},
			success: function(response) {
				console.log(response);
				// 插入成功之后再让页面显示出来
				var str = `
				<ul data-time="${time}">
										<li>${$('.content-address1 ul').length + 1}</li>
										<li>${$('#name').val() }</li>
										<li><span class="pro">${$('#myProvince').html()}</span>
										<span class="city">${$('#myCity').html()}</span>
										<span class="area">${$('#myArea').html()}</span></li>
										<li class='streetName'>${$('#detailsArea').val()}</li>
										<li class="tel">${$('#myPhone').val()}</li>
										<li> 备注写点什么呢</li>
										<li><span class="add1"> <a href="javascript:;" class="setDefault" data-default="${$('#isDefault').prop('checked')}">${$('#isDefault').prop('checked') == false ?"设置为默认值":"默认值" }</a> </span>| <span class="add2"><a data-toggle='modal' data-target="#updateAddModel"  class='changeAddress'>修改 </a></span> |</span> <span class="add3"><a href="javascript:;" class="delAddress">删除</a></span> </li>

									</ul>
				`;
				$('.content-address1').append($(str));
				// 点击之后如果$('#isDefault').prop('checked') = TRUEz爱本地保存id
				if ($('#isDefault').prop('checked') == true) {
					localStorage.setItem('isDefault', time);
					cancelDefault();
				}

				console.log(localStorage.getItem('isDefault'));
				// isDefault ();

				$('.address2').find('input[type=text]').val('').end().find('input[type=checkbox]').prop('checked', false);

			}
		})
	};

	// 对设置为默认值的操作
	$('.content-address1').on('click', 'ul .setDefault', function() {
		var currentTime = $(this).parent().parent().parent().data('time');
		console.log($(this).parent().parent().parent().data('time'));
		if ($(this).data('default') == false) {
			var _this = this;
			// 点击默认操作的时候做ajax请求,把后台的默认值改为FALSE,给当前加上
			$.ajax({
				type: 'post',
				url: '../php/ws_isDefault.php',
				data: {
					currentTime: currentTime,
					lastTime: localStorage.getItem('isDefault'),
				},
				success: function(response) {
					console.log(response);
					localStorage.setItem('isDefault', currentTime);
					if (response == 'successTwo') {
						$('.content-address1 ul').each(function(index, item) {
							if ($(this).find('.setDefault').html() == '默认值') {
								$(this).find('.setDefault').html('设置为默认值').data('default', false);
							}
						})
						$(_this).html('默认值').data('default', true);
					}

				}
			})

		}

	});

	function cancelDefault() {
		$('.content-address1 ul').each(function(index, item) {
			if ($(item).data('time') != localStorage.getItem('isDefault')) {
				$(this).find('.setDefault').html('设置为默认值').data('default', false);
			}
		})
	}

	// function isDefault () {
	// 	$('.content-address1 ul').each(function(index,item) {
	// 		if($(item).find('.setDefault').data('default') == 'false') {
	// 			$(item).find('.setDefault').html('设置为默认值')
	// 		}
	// 		if($(item).find('.setDefault').data('default') == 'true'){
	// 			$(item).find('.setDefault').html('默认值')
	// 		}
	//
	// 	})
	// }

	$('.newWay').click(function() {
		$('.address1').css('display', 'none')
		$('.address2').css('display', 'block')
		$('.address3').css('display', 'none')
	})
	$('.refer1').click(function() {
			$('.address1').css('display', 'none')
			$('.address2').css('display', 'block')
			$('.address3').css('display', 'none')
		})
			$('.myrefer').click(function() {

				$('.address1').css('display', 'none')
				$('.address2').css('display', 'none')
				$('.address3').css('display', 'block')

			});

	function isNull() {
		if ($('.content-address1 ul').length == 0) {
			$('.address1').css('display', 'block')
			$('.address3').css('display', 'none')
		} else {
			$('.address1').css('display', 'none');
			$('.address3').css('display', 'block');
		}
	}

})

function isOK1() {
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	if ($('#name').val() != '' && $('#detailsArea').val() != '' && $('.inputs1').val() != '' && reg.test($('.inputs1').val())) {
		return true;
	} else {
		return false;
	}
}

$(".inputs1").blur(function() {
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;

	if ($('.inputs1').val() == '') {
		swal('手机号码不能为空')

	} else if (!reg.test($('.inputs1').val())) {
		swal('请输入有效的手机号码')

	} else {

	}
})

function isOk2() {
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	if ($('#aaname').val() != '' && $('#detailsadd').val() != '' && $('.today1').val() != '' && reg.test($('.today1').val())) {
		return true;
	} else {
		return false;
	}
}

$(".today1").blur(function() {
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;

	if ($('.today1').val() == '') {
		swal('手机号码不能为空')

	} else if (!reg.test($('.today1').val())) {
		swal('请输入有效的手机号码')

	} else {

	}
})
