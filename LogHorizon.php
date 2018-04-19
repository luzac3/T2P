<?php
	if( isset($_POST["send"]) && isset($_POST["ID"]) && isset($_POST["URL"]) && isset($_POST["roomNo"]) ){
		$id         = $_POST["ID"];
		$URL = $_POST["URL"];
		$roomNo     = $_POST["roomNo"];
		if( isset($_POST["password"]) ){ $password = $_POST["password"]; }
		else                           { $password = null; }
		
		$jsonURL  = "http://lhrpg.com/lhz/api/".$id.".json";
		if($json = file_get_contents($jsonURL)){
			$jsonData = json_decode($json, true);
			
			$URL  = str_replace(".swf", "Server.rb", $URL);
			//URL中の.swfを.Server.rbに書き換える
			$URL .= "?webif=addCharacter";
			$URL .= "&room=".$roomNo;
			if(isset($password)){ $URL .= "&password=".urlencode($password); }
			$URL .= "&name=".urlencode($jsonData["name"]);
			//urlencodeは日本語をurl変換する
			$URL .= "&counters=";
			$URL .= "HP:".$jsonData["max_hitpoint"];
			$URL .= ",".urlencode("因果力").":".$jsonData["effect"];
			$URL .= "&initiative=".$jsonData["action"];
			$URL .= "&info=".urlencode($jsonData["remarks"]);
			$URL .= "&url=".$jsonData["sheet_url"];
			//最後のはURLリンク先っぽいので別にいらない
			//データ集にあるやつをとにかく放り込んでいけばいいみたい
			//書式は&ステータス名=ステータス カウンターはまとめて&counters=""HP:"$HP","でつなぐ

			
			if($responce = file_get_contents($URL)){
				$responceData = json_decode($responce, true);
				if($responceData["result"] == "OK"){
					$result = "キャラクターを作成しました。";
				}
				else{
					$result = "[ERROR]".$responceData["result"];
				}
			}
			else{
				$result = "[ERROR]どどんとふにアクセスできません。\nどどんとふのURLが正しいか確認して下さい。";
			}
		}
		else{
			$result = "[ERROR]キャラクターデータにアクセスできません。\nキャラクターIDや外部参照設定を確認して下さい。";
		}
	}
?>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>ログ・ホライズンTRPGどどんとふ連携キャラ作成ツール</title>
	</head>
	<body>
		<center>
			<br>
			ログ・ホライズンTRPGどどんとふ連携キャラ作成ツール v0.1.2<br>
			<br>
			<table border="0"><tr><td>
				使用方法<br>
				このツールはログ・ホライズンTRPG冒険窓口(以下冒険窓口)からキャラクターデータを取得してどどんとふの指定の部屋にコマを作成するツールです。<br>
				使用手順は以下のとおりです。<br>
				1.冒険窓口でコマを作成したいキャラクターの「基本情報設定」の「外部ツールからの〈冒険者〉データ参照を許可する」にチェックが入っていることを確認する。<br>
				2.冒険窓口でコマを作成したいキャラクターのキャラクターIDを確認する。(キャラクター詳細ページのURLの末尾にある「id=○○」の数値)<br>
				3.コマを作成したいどどんとふのURLと部屋の番号を確認する。(パスワード設定があるならパスワードも)<br>
				4.確認した情報を下のテキストボックスに入力して送信ボタンを押す。<br>
			</td></tr></table>
			<br>
			<table border="0"><tr><td>
				<form action="LogHorizon.php" method="post">
					<p>キャラクターID: <input type="text" name="ID" size="10"></p>
					<p>どどんとふURL: <input type="text" name="URL" size="60"></p>
					<p>Room No.: <input type="text" name="roomNo" size="5"></p>
					<p>password: <input type="password" name="password" size="20"></p>
					<p><input type="submit" value="送信" name="send"></p>
				</form>
			</td></tr></table>
			<p>
				<?php
					if(isset($result)){print $result;}
				?>
			</p>
		</center>
	</body>
</html>
