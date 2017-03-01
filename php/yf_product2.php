<?php
//收藏商品 存储到数据库中
//插入数据
function insertData(){
	$id=$_REQUEST['id'];
	$goods_imgSrc=$_REQUEST['goods_imgSrc'];
	$goods_text=$_REQUEST['goods_text'];
	$goods_newPrice=$_REQUEST['goods_newPrice'];
	$goods_OriginalPrice=$_REQUEST['goods_OriginalPrice'];
//	$timer=$_REQUEST['timer'];
	//连接数据库
	$mysqli=new mysqli('127.0.0.1','root','','ws_itemTwo');
	if($mysqli->connect_error){
		exit ("数据库连接出错,错误信息:{$mysqli->connect_error}");
	}else{
		echo "数据连接成功";
	}
	//修改编码格式
	$mysqli->set_charset('utf8');
	//书写SQL语句
	$insertSQL = "insert into yf_collectGoods(id,goods_imgSrc,goods_text,goods_newPrice,goods_OriginalPrice)value('{$id}','{$goods_imgSrc}','{$goods_text}','{$goods_newPrice}','{$goods_OriginalPrice}')";
	$result = $mysqli -> query($insertSQL);
	
	if ($result) {
		echo "插入数据成功";
	} else {
		echo "插入数据失败";
	}
	//关闭数据库
	$mysqli -> close();
}
insertData();
?>