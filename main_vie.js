function page_gene(){
	//もはやajaxを起動するためにいる
	//reloadもするけど
	$.ajax({
			type:"POST",
			url:"sled_gene.php",
			cache:false,
			timeout: 10000,
		})
		.then(function(data){
			console.log(data);
			window.location.href = data;
		},
		function(){
			alert("faile to page_change");
		});
}

function sled_post(res){

	var table_name = $("#script").data("sled")[0];
	var No = $("#script").data("sled")[1];
	var count = $("#script").data("sled")[2];
	
	var arr=[];
	var test = $("#new_post").attr("class")[0];
	if(count == 1){
		arr[0] = $("#new_post input")[0].value;
		arr[1] = $("#new_post").find("input")[1].value;		//ユーザー名はいずれ不要になるので注意
	}else{
		arr[0] = 0;
		arr[1] = $("#new_post").find("input")[0].value;
	}
	arr[2] = $("#new_post").find("textarea")[0].value;
	
	count = res;
	
	$.ajax({
			type:"POST",
			url:"sled_post.php",
			cache:false,
			timeout: 10000,
			data:{
				arr:arr,		//投稿するデータ
				table_name:table_name,		//テーブル名
				No:No,		//スレッドナンバー
				count:count
			}
		})
		.then(function(data){
			console.log(data);
			location.reload();
		},
		function(){
			alert("faile");
		});
	
}

function new_post(){
	$(".hidden").css("display","inline");
}
function post_close(){
	$(".hidden").css("display","none");
}
function res(id_num,count){
/*
	id_num : レスを開いた場所のナンバー
	count : 投稿数＋1
	No : スレッド番号(0001など)
	res_count : レス番号が保存されたクラスの文字列
	res_count[1] : 実際のレス番号(親ポストにレスがついた回数、デフォルトは呼び出された時点で1)
	stack : innerhtmlで挿入する文字列
	res_num : このレスのNo。SledBoxのNoにあたる
	arr : stackを繋げてひとつの文字列にしたもの(配列はinnerHMTLできない)
	sled_id = sled_No_id_num　実際のスレッドごとにつくID
	
*/
	var No = parseInt($("#script").data("sled")[1]);
	var res_class = $("#sled_"+No+"_"+id_num).attr("class");
	var res_count = res_class.split(" ");
	res_count[1] = parseInt(res_count[1])+1;
	res_class = res_count[0]+" "+res_count[1];
	res_count =res_count[1];
	$("#sled_"+No+"_"+replace).attr("class",res_class);
	//クラスナンバー書き換え
	
	console.log(res_count);
	var stack = $("#script").data("stack");
	var res_num =id_num+"_"+res_count;
	//必ずアンダーバーにしなくてもいいよねっていう
	console.log(res_count);
	console.log(res_num);
	
	

	stack[0] = stack[0].replace("sled_"+No+"_"+count, "sled_"+No+"_"+id_num+"_"+res_count);

	stack[2] = stack[2].replace("post_close()","res_post_close("+id_num+")");
	stack[5] = stack[5].replace("sled_post(0)","sled_post("+res_num+")");
	console.log(stack);
	//引数をres_numに設定
	
		var arr = "\n";
		//空を代入
	for (var i=0,len=stack.length; i<len; i++){
		arr += stack[i];
	}
	
	document.getElementById("res_"+id_num).innerHTML=arr;
	console.log(arr);
}

function res_post_close(id_num){
	
}

function edit_makeButton(sled_num,No){
	/**
		sled_num:スレッド番号(html.0001の0001)
		No:投稿番号。No
	*/
	$("#sled_content_"+No).replaceWith("<textarea id=sled_content_"+No+">"+$("#sled_content_"+No).text()+"</textarea>");
	var p = document.createElement("p");
	p.id = "sled_edit_"+sled_num;
	var elem = $("#sled_"+sled_num+"_"+No);
	elem.append(p);
	
	var button = document.createElement("button");
	button.id = "edit_aplly_sled_"+No;
	button.value = "apply";
	button.onclick = "dialog('edit',"+str+","+No+")";
	button.innerHTML = "実行";
	$("#sled_edit_"+No).appendChild(button);
	
	button = document.createElement("button");
	button.id = "edit_cansel_sled_"+No;
	button.value = "cansel";
	button.onclick = "dialog('edit_cansel',"+str+","+No+","+sled_num+")";
	button.innerHTML = "キャンセル";
	$("#sled_edit_"+No).appendChild(button);
}

function edit_cansel(No,sled_num){
	$("#sled_content_"+No).replaceWith("<p id=sled_content_"+No+">"+$("#sled_content_"+No).text()+"</p>");
	$("#sled_"+sled_num+"_"+No).empty();
	//子要素全部消す。作ったボタン等全部削除
	/*
	var p = document.createElement("p");
	p.id = "sled_edit_"+sled_num;
	$("#sled_"+sled_num+"_"+No).appendChild(p);
	*/
	//ここでOKボタンのみのダイアログを呼ぶ
	//その場合、ダイアログにある二つのボタンをdivで囲んでおき、任意でOKボタンのみのDivと切り替えられるようにするとよさそう
}

function edit(kind,No,sled_num){
	var url = "sled_"+kind+".php";
	
	if(kind == "edit"){
		var content = $("#sled_content_"+No+" textarea:first");
	}else{
		var content = 0;
	}
	//ここで待機用のぐるぐるを入れる
	$.ajax({
			type:"POST",
			url:url,
			cache:false,
			timeout: 10000,
			data:{
				sled_num:sled_num,
				No:No,
				content:content
			}
		})
		.then(function(data){
			console.log(data);
			//完了ダイアログ
			daialog("complete");
		},
		function(){
			alert("failue");
		});
	
	
}

function dialog(kind,str,No,sled_num){
	/**
	 * "dialog('edit',"+str+","+No+)";
	 * "dialog('edit_cansel',"+str+","+No+)";
	 * dialog("complete");
	 * dialog("cansel");
	 * 
	 */

	//case:

	if(kind == "complete" || kind == "cansel"){
		//表示するdivの書き換えがここで
		$("#y_n").css("display","none");
		$("#only_ok").css("display","block");
		
	}else{
		$("#y_n").css("display","block");
		$("#only_ok").css("display","none");
	}

	$("#dialog_content").innerHTML = str;
	$("#dialog").show();

	$(document).on('click','#dialog_OK',function(){
		//キャンセル用
		$("#dialog").hide();
		return;
	});
	$(document).off('click','p');
	
	$(document).on('click','#dialog_yes',function(){
		//Yesを押したときの動作
		//編集を実行するNoがわからないとどうしようもないのでNo読み込みは必須
		//yesが押されると、その値(y/n)が読み込まれるのでreturnしてやればいいんじゃね
		//こっちでeditのfunctionを呼び出すのが正しい
		edit(kind,No,sled_num);
		$("#dialog").hide();
			
	});	
	$(document).off('click','p');
	
	$(document).on('click','#dialog_no',function(){
		//NOが押された場合、再起関数でこいつを呼んでキャンセルに入れてreturnする
		//もしくはキャンセルダイアログを別に作る
		var str = "キャンセルされました";
		//hide();
		dialog("cansel",str,No);
		$("#dialog").hide();
		return;
	});
	$(document).off('click','p');


		//↑ダイアログの表示。innnerhtmlとshowも含めて
	location.reload();
	//何を呼び出しても閉じる
}

