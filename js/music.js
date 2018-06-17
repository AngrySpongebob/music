$(function(){
	//点击歌曲图片变为歌曲详细播放区域
	$(".song_img").on("click",function(){
		$(".play").attr("class","play_a");
	});
	$(".shouqi").on("click",function(){
		$(".play_a").attr("class","play");
	});
	$("#search").on("focus",function(){
		$(".lunbo").css("display","none");
		$(".count").css("display","none");
		
	});
	$("#search").on("focus",function(){
		$(".lunbo").css("display","none");
		$(".count").css("display","none");
		$(".serRes").css("display","block");
		
	});
	$(".search1").on("click",function(){
		
		search($("#search").val());
		
	});

	//搜索歌曲
	function search(singer){
		$.ajax({
		method:"get",
	    url: "http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.search.merge&format=jsonp&query="+singer,
	    dataType: "jsonp",
	    success: function (data) {
	    	var data1=data.result.song_info.song_list;
	    	$("#songListUl").html("");
	    	$.each(data1,function(index,item){
	    		$("#songListUl").append('<li class="songList" id="'+item.song_id+'">'+
				'<p class="songNa">'+item.title+'</p>'+
				'<p class="songAu">'+item.author+'</p>'+
				'</li>');
	    	});
	    	$(".songList").on("click",function(){
				$(".lunbo").css("display","block");
				$(".count").css("display","block");
				$(".serRes").css("display","none");
				var song_id = this.getAttribute("id");
				songId(song_id);
				});
				
		    },
		    error: function (responseText, textStatus, XMLHttpRequest) {
		        alert(textStatus);
			}
		});
		
	}
	//根据歌曲ID搜索结果
	function songId(song_id){
		$("#time_line").css("width");
		//console.log($(".play_a").children(".time_line").css("width"));
		$.ajax({
	    	method:"get",
	        url: "http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.play&songid="+song_id,
	        dataType: "jsonp",
	        success: function (daaa) {
	        	console.log(daaa);
	        	$(".song_img").attr("src",daaa.songinfo.pic_small);
	        	$(".song_author").text("- "+daaa.songinfo.author+" -");
	        	$("#songName").text(daaa.songinfo.title);
	        	console.log(daaa.bitrate.file_link);
	        	var songsrc = daaa.bitrate.file_link;
	        	$("#audio_con").html('<audio id="audio_a" autoplay="autoplay"><source id="music_play" src="'+songsrc+'" type="audio/mpeg"></audio>')
	        	$("#bofang").attr("src","css/images/play.png");
	        	$(".song_img").on("click",function(){
					$(".song_img").attr("src",daaa.songinfo.pic_premium);
				});
				$(".shouqi").on("click",function(){
					$(".song_img").attr("src",daaa.songinfo.pic_small);
				});
				//歌曲时长
				var myVid = $("#audio_a")[0];
				if(myVid != null){
			     var duration;
			     myVid.load();
			     myVid.oncanplay = function () {
			     	var others = myVid.duration % 3600;
			     	//分钟
					var minutes = Math.floor (others / 60);
					//秒数
					var seconds = Math.floor(others % 60);	

					showTime(seconds,minutes,".time_all");  

			     	var player = $("#audio_a")[0];
		            if(player.play){
		            	player.addEventListener("timeupdate",function(){
			            	//var time =  Number((this.currentTime/60).toFixed(2))
			            	//秒数
			            	var currentTime = Math.floor(this.currentTime);
			            	if(currentTime<10){
			            		$(".time_l").text("00:0"+currentTime);
			            	}else if(currentTime<60){
			            		$(".time_l").text("00:"+currentTime);
			            	}else if(currentTime>=60&&currentTime<600){
			            		//当前分钟数
		            		currentTimeSe = (currentTime/60);
				            var other = currentTime % 3600;
					     	//分钟
							var minute = Math.floor (other / 60);
							//秒数
							var second = Math.floor(other % 60);
							showTime(second,minute,".time_l");
		            	}
	            		//整个进度条的长度
						var time_line = parseInt($(".time_line").css("width"));
		            	var timeLine = time_line/(myVid.duration);
		            	//进度条动画
		            	$(".time_lined").width(timeLine*currentTime);
				  });
		        }
		      }
			  }else{
				alert(1);
			} 	
	    },
	    error: function (responseText, textStatus, XMLHttpRequest) {
	        alert(textStatus);
		}
	});
    //时间显示动画
    function showTime(second,minute,selector){
		if(minute<10 && second<10){
			$(selector).text("0"+minute+":0"+second);
		}else if(minute<10 && second>=10){
			$(selector).text("0"+minute+":"+second);
		}else if(minute>=10 && second<10){
			$(selector).text(minute+":0"+second);
		}else{
			$(selector).text(minute+":"+second);
		}
	}
    $("#bofang").on("click",function() {
		var player = $("#audio_a")[0];
        if (player.paused){ 
           	$("#bofang").attr("src","css/images/play.png");
            player.play();
        }else{
        	$("#bofang").attr("src","css/images/stop.png");
            player.pause();
        }
	});
  }
  	//音乐榜单
	var songList =[1,2,6,11,20,21,22,23,14,25];
	var img = document.getElementById('bang_list').children;
	for (var i = 0; i < songList.length; i++) {

		tuijian(songList[i],img[i]);
	}// 6，"KTV热歌榜" 7.叱咤歌曲榜 8.Billboard 9."雪碧音碰音榜" 10.雪碧音碰音赛歌榜
	//  type = 1-新歌榜,2-热歌榜,11-摇滚榜,20."华语金曲榜" 21-"欧美金曲榜",22-"经典老歌榜",23-情歌对唱榜,24-"影视金曲榜",25-"网络歌曲榜"   //size = 10 //返回条目数量offset = 0 //获取偏移
	function tuijian(type,i){
			$.ajax({
	    	method:"get",
	        url: "http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&from=webapp_music&method=baidu.ting.billboard.billList&type="+type+"&size=20&offset=0",
	        dataType: "jsonp",
	        success: function (data) {
			//图片
			console.log(data);
			i.children[0].setAttribute("typeSong",type);
			i.children[0].src=data.billboard.pic_s192;
	        },
	        error: function (responseText, textStatus, XMLHttpRequest) {
	            alert(textStatus);
			}
	    });
	}

	$("#bang_list").children('li').children('img').on("click",function(){
		var typeSong = this.attributes["typeSong"].nodeValue;
		jump1(typeSong);
	});
	setTimeout(function(){
		var songid = $.getUrlParam('songid');
		if(songid!=null){
			console.log(1);
			songId(songid);
		}
	},400);
	
	
});

function jump1(type){
    url = "bangList.html?type="+type;//此处拼接内容
    window.location.href = url;
}

(function($){
$.getUrlParam = function(name){
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if (r!=null) return unescape(r[2]); return null;
}})(jQuery);