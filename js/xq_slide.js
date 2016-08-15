;(function($){
	var self;
	var xq_slide_in;
	var curindex=0;
	var total;
	var time;
	var height;
	var speed;
	var showbar=false;
	function ifbar(){
		if(showbar){
			$(".xq_slide_bar span").eq(curindex).addClass("cur").siblings(".cur").removeClass("cur");
		}
	}
	function slide(type){
		time=setInterval(function(){
			curindex++;
			if(curindex>=total)curindex=0;
			if(type=="h")xq_slide_in.css({"transform":"translateX(-"+100/total*curindex+"%)"});
			if(type=="v")xq_slide_in.css({"transform":"translateY(-"+height*curindex+"px)"});
			if(type=="o")xq_slide_in.find("li").eq(curindex).css({"opacity":"1"}).siblings().css({"opacity":"0"});
			ifbar();
		},speed);
	}
	function initCss(type){
		xq_slide_in=self.find(".xq_slide_in");
		total=xq_slide_in.find("li").length;
		height=xq_slide_in.height();
		switch(type){
			case "h":
			xq_slide_in.css({"width":total*100+"%"}).find("li").css({"float":"left","width":100/total+"%"});
			break;
			case "v":
			xq_slide_in.css({"width":"100%"}).find("li").css({"width":"100%"});
			break;
			case "o":
			xq_slide_in.css({"width":"100%","position":"relative"}).find("li").css({"width":"100%","position":"absolute","top":"0px","left":"0px","opacity":"0"}).first().css({"opacity":"1"});
			break;
		}
		slide(type);
	}
	function placego(type){ 
		switch (type){
			case "h":
				xq_slide_in.css({"transform":"translateX(-"+100/total*curindex+"%)"});
				break;
			case "v":
				xq_slide_in.css({"transform":"translateY(-"+height*curindex+"px)"});
				break;
			case "o":
				xq_slide_in.find("li").eq(curindex).css({"opacity":"1"}).siblings().css({"opacity":"0"});
				break;
		}
		ifbar();
	}
	$.fn.xq_slide=function(options){
		self=$(this);
		var defaults={
			type:"v",//轮播方式  h水平轮播；v垂直轮播；o透明切换
			vatical:false,//图片描述性文本 true 显示 false不显示
			choseBtn:true,//是否显示上下切换按钮
			speed:1000,//动画间隔的时间，以毫秒为单位。
			mousestop:true,//当鼠标移上去是否停止循环
			showbar:true//是否显示轮播导航
		}
		$.extend(defaults,options);
		speed=defaults.speed;
		if(defaults.choseBtn){
			var lh=self.height();
			self.append("<span class='btn prev_btn'><</span><span class='btn next_btn'>></span>").css("line-height",lh+"px");
			self.find(".prev_btn").on("click",function(){
				curindex--;
				if(curindex<0){
					curindex=total-1;
				}
				clearInterval(time);
				placego(defaults.type);
				slide(defaults.type);
			});
			self.find(".next_btn").on("click",function(){
				curindex++;
				if(curindex>=total){
					curindex=0;
				}
				clearInterval(time);
				placego(defaults.type);
				slide(defaults.type);
			});
		}
		initCss(defaults.type);
		if(defaults.mousestop){
			self.on('mousemove',function(){
				clearInterval(time);
			}).on("mouseleave",function() {
				slide(defaults.type);
			});
		}
		if(defaults.showbar){
			showbar=defaults.showbar;
			var slidebar=""
			for (var i=0;i<total;i++) {
				slidebar+="<span></span>";
			}
			self.append("<div class='xq_slide_bar'>"+slidebar+"</div>");
			ifbar();
			$(".xq_slide_bar span").on('click',function(){
				curindex=$(this).index();
				clearInterval(time);
				placego(defaults.type);
				slide(defaults.type);
			});
		}
	}
})(jQuery);
