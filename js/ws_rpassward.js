$(function() {
	//信息验证完整之后执行修改密码的命令
	function changePw() {
		$.ajax({
			type: 'post',
			url: '../php/ws_updatePass.php',
			data: {
				phone: $('#ws_phone').val(),
				pw: $('#ws_wp').val()
			},
			success: function(response) {
				console.log(response);
				if (response == 'success') {
					swal({
						title: "更新成功!",
						type: 'success',
						text: "I will close in 2 seconds.",
						timer: 1000,
						showConfirmButton: false
					});
				}

			}

		})
	}

	//手机输入框失去焦点时候的验证
	var boolCheckAll1 = false;
	$('#ws_phone').blur(function() {
		// 失去焦点的时候请求后台数据看当前手机号是否存在
		$.ajax({
			type: "get",
			url: "../php/ws_selectUser.php",
			success: function(response) {
				console.log(JSON.parse(response));
				var isUnique = JSON.parse(response).some(function(value, index) {
					return value.phone == $('#ws_phone').val()
				});
				if (isUnique) {
					boolCheckAll1 = true;
					$('#ws_phone').parent().find('p').removeClass('active');
				} else {
					boolCheckAll1 = false;
					$('#ws_phone').parent().append($('<p>', {
						text: '手机号不存在',
						class: 'active'
					}));
				}
			}
		});
	})

	$('#ws_submit').click(function() {
		if (boolCheckAll1 && passWord()) {
			changePw()
		} else {
			swal('信息不完善,请完善后提交')
		}

	})

	function passWord() {
		if (reg.test($('#ws_wp').val()) && $('#ws_wp').val() == $('#wp_new').val() && $('.addphone-input ul li:nth-child(7) input').val() == ind && $('.addphone-input ul li:nth-child(9) input').val() == mophone) {
			return true;
		} else {
			return false;
		}
	}
	//密码
	var reg = /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
	$('#ws_wp').blur(function() {
			if (reg.test($('#ws_wp').val())) {
				if ($('#wp_new').val() == '') {
					$('.addphone-input ul li:nth-child(4)').html('')
					$('.addphone-input ul li:nth-child(6)').html('请输入确认密码').css({
						visibility: 'visible',
						color: 'red'
					})
				} else if ($('#ws_wp').val() != $('#wp_new').val()) {
					$('.addphone-input ul li:nth-child(4)').html('两次密码输入不一致').css({
						visibility: 'visible',
						color: 'red'
					})
					$('.addphone-input ul li:nth-child(6)').html('')
				} else {
					$('.addphone-input ul li:nth-child(4)').html('验证通过').css({
						visibility: 'visible',
						color: 'green'
					})
					$('.addphone-input ul li:nth-child(6)').html('验证通过').css({
						visibility: 'visible',
						color: 'green'
					})
				}

			} else if ($('#ws_wp').val() == '') {

				if ($('#wp_new').val() == '') {
					$('.addphone-input ul li:nth-child(4)').html('密码不能为空').css({
						visibility: 'visible',
						color: 'red'
					})
					$('.addphone-input ul li:nth-child(6)').html('')

				} else {
					$('.addphone-input ul li:nth-child(4)').html('请输入密码').css({
						visibility: 'visible',
						color: 'red'
					})
					$('.addphone-input ul li:nth-child(6)').html('')

				}

			} else {
				$('.addphone-input ul li:nth-child(4)').html('密码输入不合法').css({
					visibility: 'visible',
					color: 'red'
				})
				$('.addphone-input ul li:nth-child(6)').html('')

			}
		})
		//确认密码
	$('#wp_new').blur(function() {
		if (reg.test($('#wp_new').val())) {
			if ($('#ws_wp').val() == '') {
				$('.addphone-input ul li:nth-child(4)').html('请输入密码').css({
					visibility: 'visible',
					color: 'red'
				})
				$('.addphone-input ul li:nth-child(6)').html('')
			} else if ($('#ws_wp').val() == $('#wp_new').val()) {
				$('.addphone-input ul li:nth-child(4)').html('验证通过').css({
					visibility: 'visible',
					color: 'green'
				})
				$('.addphone-input ul li:nth-child(6)').html('验证通过').css({
					visibility: 'visible',
					color: 'green'
				})
			} else {
				$('.addphone-input ul li:nth-child(4)').html('')
				$('.addphone-input ul li:nth-child(6)').html('两次密码不一致').css({
					visibility: 'visible',
					color: 'red'
				})
			}
		} else if ($('#wp_new').val() != '') {
			$('.addphone-input ul li:nth-child(4)').html('')
			$('.addphone-input ul li:nth-child(6)').html('密码输入不合法').css({
				visibility: 'visible',
				color: 'red'
			})
		} else {
			$('.addphone-input ul li:nth-child(4)').html('')
			$('.addphone-input ul li:nth-child(6)').html('请输入确认密码').css({
				visibility: 'visible',
				color: 'red'
			})
		}
	})

	function num(m, n) {
		return Math.floor(Math.random() * (n - m + 1) + m);
	}
	/*验证码*/
	function zi() {
		var arr = [];
		for (var i = 0; i < 4; i++) {
			if (arr.indexOf(num(0, 35)) == -1) {
				arr.push(num(0, 35))
			} else {
				i--;
			}
		}
		var words = '';
		var word = 'abcdefghijklmnokqestuvwxyz1234567890';
		arr.forEach(function(item) {
			words += word[item]
		})
		$('.addphone-input ul li:nth-child(7) h6').html(words)
		ind = words
	}
	zi();
	$('.addphone-input ul li:nth-child(7) a').click(function() {
		zi();
	})

	$('.addphone-input ul li:nth-child(7) input').blur(function() {
		if ($('.addphone-input ul li:nth-child(7) input').val() == ind) {
			$('.addphone-input ul li:nth-child(8)').html('验证通过').css({
				visibility: 'visible',
				color: 'green'
			})
		} else if ($('.addphone-input ul li:nth-child(7) input').val() == '') {
			$('.addphone-input ul li:nth-child(8)').html('请输入验证码').css({
				visibility: 'visible',
				color: 'red'
			})
		} else {
			$('.addphone-input ul li:nth-child(8)').html('验证码错误').css({
				visibility: 'visible',
				color: 'red'
			})
		}
	})

	/*获取手机验证码*/
	$('.addphone-input ul li:nth-child(9) button').click(function() {

		var time = 10;
		var phone = '';
		for (var i = 0; i < 6; i++) {
			phone += num(0, 9)
		}
		mophone = phone
		swal('手机验证码:' + mophone)
		var inte = setInterval(function() {
			time--;
			if (time > 0) {
				$('.addphone-input ul li:nth-child(9) button').attr("disabled", true)
				$('.addphone-input ul li:nth-child(9) button').css('backgroundColor', 'gray').html(time + 's后重新获取')
			} else {
				$('.addphone-input ul li:nth-child(9) button').attr("disabled", false)
				clearInterval(inte)
				$('.addphone-input ul li:nth-child(9) button').css('backgroundColor', '#008de1').html('获取验证码')
			}
		}, 1000)
	})
	/*手机验证*/
	$('.addphone-input ul li:nth-child(9) input').blur(function() {

		if ($('.addphone-input ul li:nth-child(9) input').val() == mophone) {
			$('.addphone-input ul li:nth-child(10)').html('验证通过').css({
				visibility: 'visible',
				color: 'green'
			})
		} else if ($('.addphone-input ul li:nth-child(9) input').val() == '') {
			$('.addphone-input ul li:nth-child(10)').html('验证码不能为空').css({
				visibility: 'visible',
				color: 'red'
			})
		} else {
			$('.addphone-input ul li:nth-child(10)').html('验证码错误').css({
				visibility: 'visible',
				color: 'red'
			})
		}
	})
})