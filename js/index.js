$(function(){
	//自定义滚动条 加载插件
	//初始化CSS样式
	$(".content_list").mCustomScrollbar();
	$(".son_lyric").mCustomScrollbar();
	
	
	//委托移入移出事件
	//监听歌曲的移入移出事件
	$(".content_list").delegate(".list_music","mouseenter",function(){
		//显示子菜单
		$(this).find(".list_menu").stop().fadeIn(100);
		$(this).find(".list_time a").stop().fadeIn(100);
		
		//隐藏时长
		$(this).find(".list_time span").stop().fadeOut(100);
	})
	$(".content_list").delegate(".list_music","mouseleave",function(){
		//隐藏子菜单
		$(this).find(".list_menu").stop().fadeOut(100);
		$(this).find(".list_time a").stop().fadeOut(100);
		//显示时长
		$(this).find(".list_time span").stop().fadeIn(100);
	})
	
	
	
	
		//2.监听复选框的点击事件
		// on
	$(".content_list").on("click" ,".list_check",function(){
		$(this).toggleClass("list_checked");
	})
	/*$(".list_check").click(function(){
		$(this).toggleClass("list_checked");
	})*/
	
	
	
	
	//3.监听子菜单播放按钮的监听
	
	$musicPlay = $(".music_play");
	
	$(".content_list").on("click",".list_menu_play",function(){
		var $item = $(this).parents(".list_music");
		
		//列表播放图标切换
		$(this).toggleClass("list_menu_play2");
		//复原其他播放图标
		
		$(this).parents(".list_music").siblings().find(".list_menu_play").removeClass("list_menu_play2");
		//判断当前播放按钮是否是播放状态
		if($(this).attr("class").indexOf("list_menu_play2") != -1){
			
			$musicPlay.addClass("music_play2");
			//让文字高亮
			$(this).parents(".list_music").find("div").css("color","#FFFFFF");
			$(this).parents(".list_music").siblings().find("div").css("color","rgba(255,255,255,0.5)");
			
			//序号切换
			
		}else{
			$musicPlay.removeClass("music_play2");
			//让文字不高亮
			$(this).parents(".list_music").find("div").css("color","rgba(255,255,255,0.5)");
			
			
			//序号
		}
		//序号切换
		$(this).parents(".list_music").find(".list_number").toggleClass("list_number2"); 
		$(this).parents(".list_music").siblings().find(".list_number").removeClass("list_number2"); 
	})
	
	getPlayer();
	//3.加载歌曲列表
	function getPlayer(){
		$.ajax({
			dataType:"json",
			url:"./source/musiclist.json",
			success:function(data){
				var $musicList = $(".content_list ul")
				$.each(data,function(index ,ele){
					var $item = crateMusicItem(index,ele);
					
					$musicList.append($item);
				})
			},
			error:function(e){
				console.log(e);
			}
		});
	}
	
	function crateMusicItem(index,music){
		var $item = $("" +
        "<li class=\"list_music\">\n" +
            "<div class=\"list_check\"><i></i></div>\n" +
            "<div class=\"list_number\">"+(index + 1)+"</div>\n" +
            "<div class=\"list_name\">"+music.name+"" +
            "     <div class=\"list_menu\">\n" +
            "          <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "          <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "     </div>\n" +
            "</div>\n" +
            "<div class=\"list_singer\">"+music.singer+"</div>\n" +
            "<div class=\"list_time\">\n" +
            "     <span>"+music.time+"</span>\n" +
            "     <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
            "</div>\n" +
        "</li>");
		return $item;
	}
	//定义一个方法创建一条音乐
})
