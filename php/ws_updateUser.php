<?php
    $phone = $_REQUEST['phone'];
	$num = $_REQUEST['num'];
    $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
	  if($mysqli -> connect_error) {
	  	 exit("链接数据库失败");
	  } else {
	  	echo "链接数据库成功";
	  };
	  //修改编码格式
	  $mysqli -> set_charset('utf8');
	  //2.书写更新语句

	  $updateSQL = "update ws_register set remainder='{$num}' where phone='{$phone}'";

	  //3.执行SQL语句
	  $result = $mysqli -> query($updateSQL);

	  if($result) {
	  	 echo "success";
	  } else {
	  	 echo "fail";
	  };

	  //4.关闭数据库
	  $mysqli -> close();
?>
