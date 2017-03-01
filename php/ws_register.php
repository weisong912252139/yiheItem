<?php


   	$phone =  $_REQUEST["phone"];
    $pass = $_REQUEST['pass'];
 //   插入数据
    function insertData() {
	     $mysqli = new mysqli("127.0.0.1",'root','',"ws_itemTwo");

		 if($mysqli -> connect_error) {
		 	exit("数据库链接出现错误:{$mysqli -> connect_error}");
		 } else {
		 	echo "数据库链接成功";
		 };
		 global $phone;
		 global $pass;
		 $mysqli -> set_charset('utf8');
		 $insertSQL = "insert into ws_register (phone,pass) values ('{$phone}','{$pass}')";
		 $result = $mysqli -> query($insertSQL);
		 if($result) {
//		 	$teaArr = array('state'-> '1','msg'-> 'success');
		 	echo "插入数据成功";
		 } else {
		 	echo "插入数据失败";
		 };
		 //4.关闭数据库
		 $mysqli -> close();
    };

	insertData();



?>
