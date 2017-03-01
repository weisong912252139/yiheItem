<?php
    $userName = $_REQUEST["userName"];
    $province =$_REQUEST["province"];
    $city = $_REQUEST["city"];
    $country = $_REQUEST["country"];
    $streetName = $_REQUEST["streetName"];
    $tel = $_REQUEST["tel"];
    $isDefault = $_REQUEST["isDefault"];
	  $time = $_REQUEST["time"];
	  $lastDefault = $_REQUEST['lastDefault'];

     	 $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
		  if($mysqli -> connect_error) {
		  	 exit("链接数据库失败");
		  } else {
//		  	echo "链接数据库成功";
		  };
		  //修改编码格式
		  $mysqli -> set_charset('utf8');

		  if($isDefault == true && !empty($lastDefault)) {
		  	$updateSQL1 = "update ws_addressList set isDefault='false' where time='{$lastDefault}'";
			 $update = $mysqli -> query($updateSQL1);
     } else if($isDefault == 'true') {
       $updateSQL2 = "update ws_addressList set isDefault='false' where isDefault='true'";
      $update = $mysqli -> query($updateSQL2);
     }
		  //2.书写更新语句

		  $updateSQL = "update ws_addressList set userName='{$userName}',province='{$province}',city='{$city}',country='{$country}',streetName='{$streetName}',tel='{$tel}',isDefault='{$isDefault}' where time='{$time}'";

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
