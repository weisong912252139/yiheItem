<?php



    $shopName = $_REQUEST["shopName"];
    $srcImg =$_REQUEST["srcImg"];
    $itemDescription = $_REQUEST["itemDescription"];
    $edition = $_REQUEST["edition"];
    $color = $_REQUEST["color"];
    $itemPrice = $_REQUEST["itemPrice"];
    $shopNum = $_REQUEST["shopNum"];
    $time = $_REQUEST['time'];

 //   插入数据
	     $mysqli = new mysqli("127.0.0.1",'root','',"ws_itemTwo");

		 if($mysqli -> connect_error) {
		 	exit("数据库链接出现错误:{$mysqli -> connect_error}");
		 } else {
//		 	echo "数据库链接成功";
		 };
		 $mysqli -> set_charset('utf8');
		 $insertSQL = "insert into ws_orderList (shopName,srcImg,itemDescription,edition,color,itemPrice,shopNum,time) values ('{$shopName}','{$srcImg}','{$itemDescription}','{$edition}','{$color}','{$itemPrice}','{$shopNum}','{$time}')";
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
