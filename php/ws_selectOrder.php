<?php
      $time = $_REQUEST['time'];
      $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
		  if($mysqli -> connect_error) {
		  	 exit("链接数据库失败");
		  } else {
//		  	echo "链接数据库成功";
		  };
		  $mysqli -> set_charset('utf8');
		  $selectSQL = "select * from ws_orderList where time='{$time}'";
		  $result = $mysqli -> query($selectSQL);
      if($result) {
        $teaArr = array();//创建一个空数组,用来存储表中的所有数据
  			 while ($row = $result -> fetch_object()) {
              	array_push($teaArr,$row);//存储到数组中
  			 }
         $resArr =  array('state' => '1' , 'msg' => 'ok', 'result' => $teaArr);

			   echo  json_encode($resArr);
      } else {
      	echo "query fail";
      }
		  $mysqli -> close();

?>
