<?php
   $time = $_REQUEST['time'];
    $myspli = new mysqli("127.0.01","root","","ws_itemTwo");
	  if($myspli -> connect_error) {
	  	 exit("链接数据库失败");
	  } else {
//	  	echo "链接数据库成功";
	  }

	  //2.书写语句
	  $delsql = "delete from ws_addressList where time={$time}";

	  //3.执行SQL语句
	  $result = $myspli -> query($delsql);
	  if($result) {
	  	echo "success";
	  } else {
	  	echo "fail";
	  };

	  //4.关闭数据库
	  $myspli -> close();
?>
