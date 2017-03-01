<?php
//$time = $_REQUEST['time'];
$id=$_REQUEST['id'];
//取消收藏 删除数据库数据
function deleteData($id){
	//连接数据库
	$mysqli=new mysqli('127.0.0.1','root','','ws_itemTwo');
	if($mysqli->connect_error){
		exit ("连接数据库失败");
	}else{
		echo "连接成功";
	}
	//书写SQL语句
	$deleteSQL="delete from yf_collectGoods where id='{$id}'";
	//执行SQL语句
	$result=$mysqli->query($deleteSQL);
	if($result){
		echo "删除成功";
	}else{
		echo "删除失败";
	}
	//关闭数据库
	$mysqli->close();
}

deleteData($id);
?>