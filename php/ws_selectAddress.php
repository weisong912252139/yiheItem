<?php
      $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
		  $mysqli -> set_charset('utf8');
		  $selectSQL = "select * from ws_addressList";
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
