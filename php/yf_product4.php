<?php
	$id = $_REQUEST["id"];
	//连接数据库
	$mysqli=new mysqli('127.0.0.1','root','','ws_itemTwo');
	if($mysqli->connect_error){
		exit ("数据库连接错误，错误信息:{$mysqli->connect_error}");
	}else{
//		echo "连接成功";
	}
	//设置编码格式
	$mysqli->set_charset('utf8');
	//书写SQL语句
	$selectSQL="select *from yf_collectGoods where id='{$id}'";
	//执行SQL语句
	$result=$mysqli->query($selectSQL);
//	echo "<pre>";
//	print_r($result);
//	echo "</pre>";
	if($result){
//		echo "查询成功";
		$yf_productArr=array();//创建一个空数组，用来存储表中的所有数据
		while($row=$result->fetch_object()){
			array_push($yf_productArr,$row);//存储到数组中
		}
			echo json_encode($yf_productArr);
		}else{
			echo "fail";
		}
	//关闭数据库
	$mysqli->close();

?>