<?php

        $phone = $_REQUEST['phone'];
       	 $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
		  if($mysqli -> connect_error) {
		  	 exit("链接数据库失败");
		  } else {
//		  	echo "链接数据库成功";
		  };

		  //显示的时候需要转化编码格式
		  $mysqli -> set_charset('utf8');
		  //2.书写SQL语句
		  $selectSQL = "select * from ws_register where phone='{$phone}'";

		  //3.执行SQL语句
		  $result = $mysqli -> query($selectSQL);
          if($result) {
            $teaArr = array();//创建一个空数组,用来存储表中的所有数据
			 while ($row = $result -> fetch_object()) {
            	    array_push($teaArr,$row);//存储到数组中
			 };
			 $reArr = array('state'=>'1','msg'=>'ok','res'=>$teaArr);

			echo  json_encode($reArr);
          } else {
          	echo "query fail";
          }
		  //4.关闭
		  $mysqli -> close();
?>
