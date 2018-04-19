<?php
$arr = array("title2","user2","content2");
$count = 1;
$post_date = date('Y')."/".date('m')."/".date('d')." ".date('G:i');
$sql_insert = "INSERT INTO ".$table_name_box." (No, user_name, content,post_date) values (".$count.",'".$arr[1]."','".$arr[2]."','".$post_date.")";

echo $sql_insert;
//正直何を返してもいいのだが
//レスポンスを待たずにページ遷移するとまずいので、結局はこれが完了するまで待たないといけない
?>

