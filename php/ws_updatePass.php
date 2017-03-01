<?php
    $phone = $_REQUEST['phone'];
	$password = $_REQUEST['pw'];
    $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
	  if($mysqli -> connect_error) {
	  	 exit("链接数据库失败");
	  } else {
//	  	echo "链接数据库成功";
	  };

	  $mysqli -> set_charset('utf8');



  	 $updateSQL = "update ws_register set pass='{$password}' where phone='{$phone}'";
	  $result = $mysqli -> query($updateSQL);
	  if($result) {
	  	 echo "success";
	  } else {
	  	 echo "fail";
	  };
	  //4.关闭数据库
	  $mysqli -> close();
?>
