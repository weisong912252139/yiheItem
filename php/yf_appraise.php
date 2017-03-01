<?php

	$userName=$_REQUEST["userName"];
	$goodsGrade=$_REQUEST["goodsGrade"];
	$valuationText=$_REQUEST["valuationText"];
	$timer=$_REQUEST["timer"];
	$mysqli = new mysqli('127.0.0.1', 'root', '', 'ws_itemTwo');
	$mysqli -> set_charset('utf8');
	$insertSQL = "insert into yf_appraise (userName,goodsGrade,valuationText,timer)value('{$userName}',{$goodsGrade},'{$valuationText}','{$timer}')";
	$result = $mysqli -> query($insertSQL);
	if ($result) {
		echo "插入数据成功";
	} else {
		echo "插入数据失败";
	}
	$mysqli -> close();

?>
