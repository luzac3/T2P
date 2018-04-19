
<?
//データを取得する際は、デフォルトで更新日順にソートする
	for($i=0; $i<count($sled[0]); $i++){
		echo "<td>".$sled[$i][0]."</td>";	//id
		if(count($sled[$i][1])>20){
			//30文字を超える場合、27文字目から3点リーダに
			$s_title = mb_substr($sled[$i][1], 0, 17);
			echo "<td><a href='".$sled[$i}[6]."'>".$s_title."…</a></td>";
		}else{
			echo "<td><a href='".$sled[$i}[6]."'>".$sled[$i][1]."</a></td>";
		}
		echo "<td>".$sled[$i][2]."(".$sled[$i][3].")</td>";	//投稿数(返信序数)
		echo "<td>".$sled[$i][4]."</td>";	//投稿日
		echo "<td><button value='abled' class='".$sled[$i][5]."'>マーク</button></td>";
		//echo "<td><a value='abled' class='".$sled[$i][5]."' href='javascript:void(0)'>
		//		<img src='mark_".$sled[$i][5]."'.png>\n
		//	</a></td>";
		//実際はSRCを入れてDBの内容を書き換える感じ
		//どのみち書き換えるので1度で済むほうが得だと思うよ

		//暫定的な処理
		//実際はブックマークみたいにするつもり
		//押した段階でJSにデータが飛んで、裏でデータベースを書き換える
		//書き換え終わるまでボタンは押せなくする＆変化させない
		//飛んできたらhideしてsrc属性を書き換えたうえでshowする
	}
?>
<div id="conference"><span class="center">
	<h1>東方TRPGプロジェクト(T2P)・仮会議用掲示板</h1><br>
	＊MG用連絡掲示板(仮)です。本来の掲示板が完成するまえではこちらで連絡をします＊</span><br>
	<span>まず全員、trelloのアカウント取って、ユーザー名を教えてください</span><br>
	<span>ついでなので掲示板に書き込んでおいてください。trelloという名前の板です</span><br><br>
	<br>
</div>
<div>
	<a href="javascript:void(0)">スレッド新規作成</a>
</div><br>


<table><tr>
	<th>No.(ID)</th>
	<th>タイトル</th>
	<th>投稿数(返信除数)</th>
	<th>最終投稿日</th>
	<th>マーク</th></tr>
</table>

