<?php
$table_name = "sled_num";
$sled_num = 0;

require_once("./conection.php");
$mysqli = db_connect("sled");
//データベースに接続
$sql="SELECT * FROM ".$table_name;
$result = $mysqli -> query($sql);
//スレッド番号を取得
foreach ($result as $row){
	$sled_num = $row["No"];
}
mysqli_free_result($result);
//結果セットの開放

$sled_num++;

$sql_update = "UPDATE ".$table_name." SET No = ".$sled_num;
$mysqli -> query($sql_update);
//スレッド番号を更新して返す


$table_name = "sled_list";
$sql_insert="INSERT INTO ".$table_name."(No) values(".$sled_num.")";
$mysqli -> query($sql_insert);
//sled_numの数値を入れたリストを作成

$sled_num_len =mb_strlen($sled_num);
for($i=0; $sled_num_len<3; $i++){
	$sled_num_len =mb_strlen($sled_num);
	$sled_num =0 . $sled_num;
}

$newfile = "sled_.html?sled=".$sled_num;

//コピー等不要に。データは書き換えるのではなくDBに登録し、接続時に引数を代入して使う


$mysqli -> close();
//接続を切る


echo $newfile;
//echo json_encode($newfile);
//レスポンスを待たずにページ遷移するとまずいので、結局はこれが完了するまで待たないといけない
?>
