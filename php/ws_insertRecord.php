<?php

        $time = $_REQUEST['time'];
		$orderTime = $_REQUEST['orderNum'];
		$num = $_REQUEST['num'];
		$remainder = $_REQUEST['remainder'];
		$phone = $_REQUEST['phone'];
        $mysqli = new mysqli("127.0.0.1",'root','',"ws_itemTwo");
		 if($mysqli -> connect_error) {
		 	exit("数据库链接出现错误:{$mysqli -> connect_error}");
		 } else {
//		 	echo "数据库链接成功";
		 };
		 $mysqli -> set_charset('utf8');


		 $insertSQL = "insert into ws_recharge (time,orderNum,num,remainder,phone) values ('{$time}','{$orderTime}','{$num}','{$remainder}','{$phone}')";

		 $result = $mysqli -> query($insertSQL);
		 if($result) {
		 	echo "插入数据成功";
		 } else {
		 	echo "插入数据失败";
		 }
		 //4.关闭数据库
		 $mysqli -> close();
?>
