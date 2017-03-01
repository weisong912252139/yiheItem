<?php
         function selectDate () {
       	 //打开数据库
       	 $mysqli = new mysqli("127.0.01","root","","ws_itemTwo");
		  if($mysqli -> connect_error) {
		  	 exit("链接数据库失败");
		  } else {
//		  	echo "链接数据库成功";
		  };
		  
		  //显示的时候需要转化编码格式
		  $mysqli -> set_charset('utf8');
		  //2.书写SQL语句
		  $selectSQL = "select * from ws_register";
		  
		  //3.执行SQL语句
		  $result = $mysqli -> query($selectSQL);
		  
//		  echo "<pre>";
//		  var_dump($result);
//		  echo "</pre>";
		 
		  //当执行玩SQL语句时,返回的$result是一个对象,属于mysqli_result类
          // $result -> num_rows 获取的是查询数据结果的条数
          // $result -> fetch_object()方法,用来获取一条数据,数据会以对象的形式返回,对象的属性会以属性和表中对应的字段名保持一致
          if($result) {
			  //获取一条数据
//			  $obj = $result -> fetch_object();
//			  var_dump($obj);
//			  echo $obj -> tea_name."<hr>";
//			  echo $obj -> tea_age."<hr>";
//			  echo $obj -> tea_sex."<hr>";
            $teaArr = array();//创建一个空数组,用来存储表中的所有数据
//          for($i = 0; $i < $result->num_rows; $i ++){
//          	   $row = $result -> fetch_object();//读取一条
//          	   array_push($teaArr,$row);//存储到数组中
//          }
			 while ($row = $result -> fetch_object()) {
//			 	$row = $result -> fetch_object();//读取一条
            	    array_push($teaArr,$row);//存储到数组中
			 }
			
			echo  json_encode($teaArr); 
			
			
			  
          } else {
          	echo "query fail";
          }
		  
		  //4.关闭
		  $mysqli -> close();
		  
       }
	   
	   selectDate ();
?>