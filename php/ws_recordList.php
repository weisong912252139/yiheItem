<?php
         $phone = $_REQUEST['phone'];
       	 $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
		  if($mysqli -> connect_error) {
		  	 exit("链接数据库失败");
		  } else {
//		  	echo "链接数据库成功";
		  };


		  $mysqli -> set_charset('utf8');

		  $selectSQL = "select * from ws_recharge where phone='{$phone}'";


		  $result = $mysqli -> query($selectSQL);


          if($result) {

            $teaArr = array();//创建一个空数组,用来存储表中的所有数据
			 while ($row = $result -> fetch_object()) {
            	    array_push($teaArr,$row);//存储到数组中
			 }

			echo  json_encode($teaArr);



          } else {
          	echo "query fail";
          }
		  $mysqli -> close();

?>
