<?php

if(isset($_POST["No"])){
	$arr = $_POST["arr"];
	$No = $_POST["No"];
	$table_name_box = $_POST["table_name"];
}

/*
	$arr = array("title2","user2","content2");
	$No = 2;
	$table_name_box = "sled_0002";
*/

$table_name = "sled_list";


//スレッドボックスに接続してテーブルを作る用

require_once("./conection.php");
$mysqli = db_connect("sled");

$sql = "SELECT * FROM ".$table_name." WHERE No = ".$No;
$result = $mysqli -> query($sql);
foreach($result as $row){
	$new_sled = $row["new_sled"];
	$count = $row["count"];
	$count_sub = $row["count_sub"];
}

$result ->close();
//結果セットを開放

$count++;
if(!is_int($_POST["count"])){
	$count_sub++;
}

$title_exist = 0;
if($new_sled == true){
	$title_exist = 1;
	$new_sled = "false";
}

$count_sub = intval($count);
if($_POST["count"] != 0){
	
}


//resがある場合はここを変更して対応可能に
date_default_timezone_set('Asia/Tokyo');
$last_post = date('G:i')."-".date('m.d.Y');
if($title_exist == 1){
	$sql_update = "UPDATE ".$table_name." SET title = '".$arr[0]."',  count = ".$count.", count_sub = ".$count_sub.", last_post = '".$last_post."', new_sled = ".$new_sled." WHERE No = ".$No;
}else{
	$sql_update = "UPDATE ".$table_name." SET count = ".$count.", count_sub = ".$count_sub.", last_post = '".$last_post."', new_sled = ".$new_sled." WHERE No = ".$No;
}
$mysqli -> query($sql_update);
//スレッドリストの更新用

$mysqli -> close();
//更新したら閉じる

$mysqli = db_connect("sled_box");
$mysqli -> set_charset("utf8");

$table_check = "SHOW TABLES LIKE '".$table_name_box."'";
//テーブルの存在を確認

$result = $mysqli -> query($table_check);

//テーブルがないのを確認してから作成
$result = $mysqli -> query($table_check);
if(!$result -> num_rows){
	$sql_create = "CREATE TABLE ".$table_name_box
		."("
		."No char(20) NOT NULL PRIMARY KEY,"
		."user_name text,"
		."content text,"
		."post_date char(30)"
		.");";

	$mysqli -> query($sql_create);
	//テーブルの作成
}

$post_date = date('Y')."/".date('m')."/".date('d')." ".date('G:i');
$sql_insert = "INSERT INTO ".$table_name_box." (No, user_name, content,post_date) values (".$count.",'".$arr[1]."','".$arr[2]."','".$post_date.")";
//日付とか入れてくださいな
//ユーザーが固定されるとここが変わるので注意
$mysqli -> query($sql_insert);


$mysqli -> close();
//接続を切る

echo $count;
//正直何を返してもいいのだが
//レスポンスを待たずにページ遷移するとまずいので、結局はこれが完了するまで待たないといけない
?>
