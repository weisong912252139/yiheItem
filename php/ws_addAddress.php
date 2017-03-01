<?php



    $userName = $_REQUEST["userName"];
    $province =$_REQUEST["province"];
    $city = $_REQUEST["city"];
    $country = $_REQUEST["country"];
    $streetName = $_REQUEST["streetName"];
    $tel = $_REQUEST["tel"];
    $isDefault = $_REQUEST["isDefault"];
	$time = $_REQUEST["time"];


 //   插入数据
	     $mysqli = new mysqli("127.0.0.1",'root','',"ws_itemTwo");

		 if($mysqli -> connect_error) {
		 	exit("数据库链接出现错误:{$mysqli -> connect_error}");
		 } else {
//		 	echo "数据库链接成功";
		 };
		 $mysqli -> set_charset('utf8');

		 if($isDefault === 'true') {
		 	$updateSQL = "update ws_addressList set isDefault='false' where isDefault='true'";
			 $update = $mysqli -> query($updateSQL);
		 }
		 $insertSQL = "insert into ws_addressList (userName,province,city,country,streetName,tel,isDefault,time) values ('{$userName}','{$province}','{$city}','{$country}','{$streetName}','{$tel}','{$isDefault}','{$time}')";
		 $result = $mysqli -> query($insertSQL);
		 if($result) {
//		 	$teaArr = array('state'-> '1','msg'-> 'success');
		 	echo "插入数据成功";
		 } else {
		 	echo "插入数据失败";
		 };
		 //4.关闭数据库
		 $mysqli -> close();




?>
