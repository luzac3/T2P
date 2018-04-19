<?php
isset($_POST["sled_num"]){
	$sled_num = $_POST["sled_num"];
	$table_name = "sled_".$sled_num;
	$No = $_POST["No"];
	$content = $_POST["content"];
}

require_once("./conection.php");
$mysqli = db_connect("wolfnet-twei_sled_box");
//データベースに接続
$sql_update="UPDATE FROM ".$table_name." SET content = ".$content." WHERE No = ".$No;

$mysqli -> query($sql_update);
$mysqli -> close();
//接続を切る

echo 0;
//echo json_encode($newfile);
//レスポンスを待たずにページ遷移するとまずいので、結局はこれが完了するまで待たないといけない
?>
