<?php

  function deleteDate ($id) {
//	 $productId = $_REQUEST['_id'];
    	   //1.链接数据库
    	   $myspli = new mysqli("127.0.01","root","","ws_itemTwo");
	  if($myspli -> connect_error) {
	  	 exit("链接数据库失败");
	  } else {
//	  	echo "链接数据库成功";
	  };

	  //2.书写语句
	  $delsql = "delete from ws_addShoppingCart where productId={$id}";

	  //3.执行SQL语句
	  $result = $myspli -> query($delsql);
	  if($result) {
	  	echo "success";
	  } else {
	  	echo "fail";
	  };
  };
	  deleteDate ($_REQUEST['a']);
?>
