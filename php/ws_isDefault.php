<?php


    $current = $_REQUEST['currentTime'];
	  $last = $_REQUEST['lastTime'];

 //   插入数据
	     $mysqli = new mysqli("127.0.0.1",'root','',"ws_itemTwo");

		 if($mysqli -> connect_error) {
		 	exit("数据库链接出现错误:{$mysqli -> connect_error}");
		 } else {
//		 	echo "数据库链接成功";
		 };
		 $mysqli -> set_charset('utf8');

		 if(!empty($last)) {
		 	 $updateSQL1 = "update ws_addressList set isDefault='false' where time='{$last}'";
			 $update = $mysqli -> query($updateSQL1);
		 } else {
       $updateSQL3 = "update ws_addressList set isDefault='false' where isDefault='true'";
			 $update = $mysqli -> query($updateSQL3);
     }

		 $updateSQL2 = "update ws_addressList set isDefault='true' where time='{$current}'";
			 $update2 = $mysqli -> query($updateSQL2);
			 if($update2) {
			 	echo 'successTwo';
			 } else {
			 	echo 'failTwo';
			 };

			 $mysqli -> close();










?>
