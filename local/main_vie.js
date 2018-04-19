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
/*
functtion edit(sled_num,No){
	$("#sled_content_"+No).replaceWith("<textarea id=sled_content_"+No">"+$("#sled_content_"+No").text+"</textarea>");
	var p = document.createElement("p");
	p.id = "sled_edit";
	$("#sled_"+sled_num+"_"+No).appendChild(p);
	
}

function edit_del(kind,No){
	if(kind == "del"){
		var str = No+"を削除してよろしいですか";
	}elseif(kind == "edit"){
		var str = No+"";
	}
	var url = "sled_"+kind+".php";
	$.ajax({
			type:"POST",
			url:url,
			cache:false,
			timeout: 10000,
			data:{
				No:No
			}
		})
		.then(function(data){
			console.log(data);
			if(kind)
			//まずダイアログを表示
			dialog();
			//続いて関数を呼び出す
			console.log(data);
		},
		function(){
			alert("faile");
		});
	
	
}
*/
function dialog(){
	
	$(document).on('click','#dialog_yes',function(){
	
	});
	$(document).off('click','p');
	
	$(document).on('click','#dialog_no',function(){
    	 hogehoge;
	});
	$(document).off('click','p');
	


	
	location.reload();
	//何を呼び出しても閉じる
}

