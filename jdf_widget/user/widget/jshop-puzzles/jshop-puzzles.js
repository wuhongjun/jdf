(function($){
    $.countup = function(opts){
        var options = $.extend({
            ele: null,
            onchange: function(){},
            isTwoDigits: true,
            isStart: true,
            startBtn: null,
            stopBtn: null,
            resetBtn: null
        }, opts);
        var arr = [];
        $(options.ele).each(function(){
            var ms = 20000;
            var timer = null;
            var me = this;
            var obj = {};
            var data = {};
            var NowTime = new Date();
            var EndTime = new Date(NowTime.getTime() + ms);
            var tick = function(){
                NowTime = new Date();
                var nMS = EndTime.getTime() - NowTime.getTime();
                nms = nMS/1000;
                s = nms.toString().split('.')[0];//秒
                ms = (nms.toString().split('.')[1])*1; //毫秒
                if(nms.toString().split('.')[1] == undefined) ms = "000";
                //如果isTwoDigits为true，且各时间属性小于10，则以双位数显示
                data.s = s;
                data.ms = ms;
                data.nms = nms;
                if(options.isTwoDigits){
                    if(s < 10 && s > 0){
                        data.s = "0" + s;
                    }
                	if(s <= 0){
                		data.s = "00";
                	}
                    if(ms<10){
                    	data.ms = "00"+ms;
                    }
                    if(ms<100){
                    	data.ms = "0"+ms;
                    }
                }
                options.onchange.call(me, data);
                // before_time=new Date().getTime()/1000;
            }
            //开始计时
            var start = function(){
                if(!timer){
                    timer = setInterval(tick, 10);
                }
            }
            //停止计时
            var stop = function(){
                clearInterval(timer);
                timer = null;
            }
            //初始化计时器
            var reset = function(){
                //根据isTwoDigits来决定是否将时间属性值初始化为双位数
                s = "20";
                ms = "000";
                options.onchange.call(me, {
                    nms:nms,
                    s: s,
                    ms: ms
                });
            }

            if(options.isStart){
                start();
            }else{
                reset();
            }
            $(options.startBtn).click(function(){
                start();
            });
            $(options.stopBtn).click(function(){
                stop();
            });
            $(options.resetBtn).click(function(){
                reset();
            });
            obj.start = start;
            obj.stop = stop;
            obj.reset = reset;
            arr.push(obj);
        });
        arr.start = function(){
            for(var i=0; i<arr.length; i++){
                arr[i].start();
            }
        }
        arr.stop = function(){
            for(var i=0; i<arr.length; i++){
                arr[i].stop();
            }
        }
        arr.reset = function(){
            for(var i=0; i<arr.length; i++){
                arr[i].reset();
            }
        }
        return arr;
    };
})(jQuery);
seajs.use(["jdf/1.0.0/unit/login/1.0.0/login.js",
	"jdf/1.0.0/ui/dialog/1.0.0/dialog",
	"jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js",
	"jdf/1.0.0/ui/ceilinglamp/1.0.0/ceilinglamp",
	"/app/js/vip.menu.js"], function(login,dialog,TrimPath,ceilinglamp,menu){
	var item = $('.g_puzzle_item'),
		star = $('.star'),
		bDrag = false,
		whether = false,
		disX = disY = 0,
		timmer,
		arrCount = 0,
		dataDray,
		dataStar,dataEnd,drayTimer,
		kptime,
		puzzle_offside = $('.g_puzzle_offside'),
		puzzle_bg = $('.g_puzzle_bg'),
		puzzle_content = $('.g_puzzle_content'),
		puzzle_succ = $('.g_puzzle_over_succ'),
		puzzle_defeated = $('.g_puzzle_over_defeated');
	var gDocW=$(document).width();
	var gDocH=$(document).height();
	var gOffset;
	var gArr;
	var greg = /^0(0|-)/g;
	var gTime = $('.time_down span').html()||20;
	loadAjax();
	//默认状态
	function defaultPuzzle(){
		bDrag = false,
		whether = false,
		disX = disY = 0;
		$('.shade').show();
		star.show();
		$('.time_down').show();
		timmer = setInterval(send,1000);
		if(arrCount) arrCount.stop();
		$('#timer').html("20.000''");
	}
	//明天再来玩
	function playTomorrow(){
		$('.shade').hide();
		star.hide();
		$('.time_down').hide();
		var html = '<div class="shade_gray"></div><div class="shade_txt">今天休息一下，明天再来玩吧~</div>';
		$('.g_jigsaw').prepend(html);
	}
	/*开始拼图*/
	function starPuzzle(){
		gArr = [[$('.g_puzzle_item').eq(0),$('.g_puzzle_item').eq(1),$('.g_puzzle_item').eq(2)],
		[$('.g_puzzle_item').eq(3),$('.g_puzzle_item').eq(4),$('.g_puzzle_item').eq(5)],
		[$('.g_puzzle_item').eq(6),$('.g_puzzle_item').eq(7),$('.g_puzzle_item').eq(8)]];
		$('.g_jigsaw_img').remove();
		$('.g_puzzle_box').show();
		puzzle_defeated.hide('');
		puzzle_succ.hide('');
		gOffset = $('.g_puzzle_box').offset();
		$('.shade').hide();
		star.hide();
		arrCount = $.countup({
	       ele: $('#timer'),
	       isTwoDigits: true,
	       onchange: function(data){
                if( greg.test(data.s)){
	       			arrCount.stop();
	       			$(this).html("00.000''");
	       			verifyAjax1();
	       		}else{
	       			$(this).html(data.s + "." + data.ms + "''");
	       		}
	       }
	    });
		$('.time_down').hide();
	}
	/*倒计时*/
	function send(){
		var nTime = $('.time_down span').html();
		nTime--;
		if(nTime == 0){
			starPuzzle();
			clearInterval(timmer);
		}
		$('.time_down span').html(nTime);
	}
	star.click(function(){
		clearInterval(timmer);
		starPuzzle();
	})
	/*显示 关闭*/
	$('.g_puzzle_close').click(function(){
		window.parent.vipUI.puzzleClose();
		$('.shade_gray').remove();
		$('.shade_txt').remove();
		$('.g_jigsaw_img').remove();
		// puzzle_offside.show();
		$('.g_puzzle_content').show().siblings('.g_puzzle_over_succ,.g_puzzle_over_defeated').hide();
		$('.g_puzzle_box').hide();
		puzzle_bg.hide();
		if(timmer) clearInterval(timmer);
		arrCount.stop();
		$('.time_down span').html(gTime);
	})
	/*拖动拼图 鼠标按下*/
	$('.g_puzzle_box').delegate('.g_puzzle_item','mousedown',function(e){
		if(whether) return;
		bDrag = true;
        disX = e.pageX - $(this).offset().left;
        disY = e.pageY - $(this).offset().top;
        var html = '<div id="drag" style="position:absolute;left:'+($(this).offset().left+1)+'px;top:'+($(this).offset().top)+'px;z-index:10">'+$(this).html()+'</div>'
        $('body').append(html);
        $(this).addClass('drayStar').attr('data-img',$(this).html()).html('');
        return false;
	})
	$('body').mousemove(function(e){
		if(!bDrag) return;
		clearTimeout(drayTimer);
        var iL = e.pageX - disX;
        var iT = e.pageY - disY;
        var maxL = gDocW- 126;
        var maxT = gDocH- 126;

	    var pX = gOffset.left - 66;
		var pY = gOffset.top - 66;
        iL = iL < 0 ? 0 :iL;
        iL = iL > maxL ? maxL : iL;

        iT = iT < 0 ? 0 : iT;
        iT = iT > maxT ? maxT : iT;
		$('#drag').css({'left':iL+'px','top':iT+'px'});
		var arr = gArr;
		if(Math.ceil((iT - pY)/131)>3 || Math.ceil((iT - pY)/131)<1 || Math.ceil((iL - pX)/131) >3 || Math.ceil((iL - pX)/131) <1){
			$('.g_puzzle_item').removeClass('dragover');
			return false;
		}else{
			arr[Math.ceil((iT - pY)/131) -1][Math.ceil((iL - pX)/131)-1].addClass('dragover').siblings().removeClass('dragover');
		}
        return false;
	})
	$(document).mouseup(function(){
		var starHtml = $('.drayStar').attr('data-img'),
			overHtml = $('.dragover').html();
		if($('.drayStar').length<=0) return false;
		if($('.dragover').length > 0){
			$('.drayStar').html(overHtml).removeClass('drayStar').removeAttr('data-img');
			$('.dragover').html(starHtml).removeClass('dragover');
		}else{
			$('.drayStar').html(starHtml).removeAttr('data-img');
			$('.g_puzzle_item').removeClass('drayStar');
		}
		$("#drag").remove();
		strResult = '';
		$('.g_puzzle_box .g_puzzle_item').each(function(index,item){
			strResult += $(this).find('img').attr('data-value');
		})
		dataDray = {
			"authCode":authCode,//验证码
			"gameResult":strResult//拼图结果
		}
		drayTimer = setTimeout(function(){
			if($('#timer').html().split("'")[0]*1>0){
				verifyAjax();
			}
		},500)
 		bDrag = false;
	})
	//拼图成功
	function draySucc(){
		// puzzle_content puzzle_succ puzzle_defeated
		$('.g_puzzle_share').hide();
		kptime = (20.000 - $('#timer').html().split("'")[0]).toFixed(3);
		$('.succ_second').html(kptime+"''");
		puzzle_content.hide('');
		puzzle_succ.show('');
		if(timmer) clearInterval(timmer);
		arrCount.stop();
		$('#timer').html("00.000''");
	}
	function drayDefeated(){
		// puzzle_content puzzle_succ puzzle_defeated
		$('.g_puzzle_share').hide();
		puzzle_content.hide('');
		puzzle_defeated.show('');
		arrCount.stop();
		$('#timer').html("00.000''");
	}
	//重玩一次
	$('.replay_btn').click(function(){
		if(timmer) clearInterval(timmer);
		$('#timer').html("20.000''");
		$('.time_down span').html(gTime);
		$('.g_puzzle_box').hide();
		puzzle_defeated.hide('');
		puzzle_succ.hide('');
		puzzle_content.show('');
		loadAjax();
		whether = false;
	})
	function verifyAjax(){
		$.ajax({
			type:'POST',
			url:'http://vip.jd.com/index.php?mod=Vip.MemberIndex&action=sendGameResult',
			data:dataDray,
			dataType:'jsonp',
			success:function(data){
				// console.log(data)
				if(data.success == true && data.resultCode == '200'){
					if(data.result.beanCount > 0){
						$('.g_puzzle_succeed').html('恭喜您！您获得了<em>'+data.result.beanCount+'</em>个京豆呦~');
					}else{
						$('.g_puzzle_succeed').html('您没有获得京豆呢~继续加油！');
					}
					draySucc();
					whether = true;
				}
				else if(data.success == true && data.resultCode == '201'){
					$('.g_puzzle_succeed').html('您没有获得京豆呢~继续加油！')
					draySucc();
					whether = true;
				}
			}
		})
	}
	function verifyAjax1(){
		strResult = '';
		$('.g_puzzle_box .g_puzzle_item').each(function(index,item){
			strResult += $(this).find('img').attr('data-value');
		})
		dataDray = {
			"authCode":authCode,//验证码
			"gameResult":strResult//拼图结果
		}
		$.ajax({
			type:'POST',
			url:'http://vip.jd.com/index.php?mod=Vip.MemberIndex&action=sendGameResult',
			data:dataDray,
			dataType:'jsonp',
			success:function(data){
				// console.log(data)
				if(data.success == true && data.resultCode == '200'){
					if(data.result.beanCount > 0){
						$('.g_puzzle_succeed').html('恭喜您！您获得了<em>'+data.result.beanCount+'</em>个京豆呦~');
					}else{
						$('.g_puzzle_succeed').html('您没有获得京豆呢~继续加油！');
					}
					draySucc();
					whether = true;
				}
				else if(data.success == true && data.resultCode == '201'){
					$('.g_puzzle_succeed').html('您没有获得京豆呢~继续加油！')
					draySucc();
					whether = true;
				}
				else if(data.success == false){
					drayDefeated();
					whether = true;
				}
			}
		})
	}
	function loadAjax(){
		$.ajax({
			type:'POST',
			url:'http://vip.jd.com/index.php?mod=Vip.MemberIndex&action=getGameInfoByPin',
		 	dataType: "jsonp",
			success:function(data){
				var html = '';
				if(data.success == false && (data.resultCode == '501' || data.resultCode == '307')){
					$('.info').html('');
				 	$('.ad').html('');
					playTomorrow();
					return false;
				}
				if(data.result.puzzle.adText == ''){
					$('.info').attr('style','margin-top:15px').html('共有<span>'+data.result.onlineCount+'</span>人在玩游戏');
				}else{
					$('.info').removeAttr('style').html('共有<span>'+data.result.onlineCount+'</span>人在玩游戏');
				}
				if(data.result.puzzle.adUrl == ''){
					$('.ad').html(data.result.puzzle.adText);
				}else{
					$('.ad').html('<a href="'+data.result.puzzle.adUrl+'" target="_blank">' +data.result.puzzle.adText+'</a>');
				}
				if(data.success == true && data.resultCode == '200'){
					if(data.result.beansOver == true){
						$('.g_puzzle_title span').addClass('red').html('您来晚一步，今天京豆发完啦~');
					}else{
						$('.g_puzzle_title span').removeClass('red').html('完成拼图将有机会获得京豆哦~');
					}
					var img = $('<img class="g_jigsaw_img" width="388" height="388" src="http://img30.360buyimg.com/vip/s378x378_'+data.result.puzzle.imgUrl+'"/>');
					$('.g_jigsaw').attr('data-img',img.attr('src')).append(img);
					$.each(data.result.puzzleList, function(i,item){
						html += '<div class="g_puzzle_item"><img width="126" height="126" src=" http://img1'+(i%5)+'.360buyimg.com/vip/s126x126_'+item.img+'" data-value="'+item.value+'"></div>';
				    });
					$('.g_puzzle_box').attr('data-authCode',data.result.authCode).html(html);
					authCode = data.result.authCode;
					defaultPuzzle();
				}
				else if(data.success == false && data.resultCode == '703'){
					var img = $('<img class="g_jigsaw_img" width="388" height="388" src="http://img30.360buyimg.com/vip/s378x378_'+data.result.puzzle.imgUrl+'"/>');
					$('.g_jigsaw').append(img);
					playTomorrow()
				}
			}
		})
	}
	//分享
	var share = {
		shareTpl: 
			'分享到：\
			<a id="site-sina" class="share_sina" href="javascript:;"></a>\
			<a id="qqweibo" class="share_twb" href="javascript:;"></a>\
			<a id="site-renren" class="share_rr" href="javascript:;"></a>\
			<a id="qzone" class="share_zone" href="javascript:;"></a>\
			<a id="site-douban" class="share_quan" href="javascript:;"></a>\
			',
		bindEvent : function() {
			var that = this;
			var ihtml = that.shareTpl.process();	
			// $('.share').hover(function(){$(this).toggleClass('hover');}).html(ihtml);
			$('.g_puzzle_share').html(ihtml);
			$('.share_btn').click(function(){
				$(this).parent().next('.g_puzzle_share').toggle();
			})
			$('.g_puzzle_over_succ .g_puzzle_share a').bind('click', function() {
				var type = $(this).attr('id');
				var $list = $(this).parents('.info-box');
				var msg= {
					title : '京东会员俱乐部，玩拼图，得京豆！ 我的成绩是'+kptime+'秒！来挑战我吧~',
					content : '京东会员俱乐部，玩拼图，得京豆！ 我的成绩是'+kptime+'秒！来挑战我吧~',
					img : $('.g_jigsaw').attr('data-img'),
					productUrl : 'http://vip.jd.com/?pt=1'
				}
				that.commond(type,msg);
			});
			$('.g_puzzle_over_defeated .g_puzzle_share a').bind('click', function() {
				var type = $(this).attr('id');
				var $list = $(this).parents('.info-box');
				var msg= {
					title : '京东会员俱乐部，玩拼图，得京豆！ 我挑战失败了！就看你了~',
					content : '京东会员俱乐部，玩拼图，得京豆！ 我挑战失败了！就看你了~',
					img :  $('.g_jigsaw').attr('data-img'),
					productUrl : 'http://vip.jd.com/?pt=1'
				}
				that.commond(type,msg);
			});
			//qq分享单独处理
			var t = [], i = window.location.href;
			t.push('<div class="model-prompt model-partake"><div class="form"><label>\u5546\u54c1\u94fe\u63a5\uff1a</label><input type="text" class="text" value=' + i +'></div>'), 
			$.browser.msie ? (t.push('<div class="ac"><input type="button" class="btn-copy" value="\u590d\u5236\u5e76\u53d1\u7ed9\u6211\u7684\u597d\u53cb" onclick="window.clipboardData.setData(\'Text\',\'' + i + "');$('.model-partake').html('\u5546\u54c1\u94fe\u63a5\u5730\u5740\u5df2\u7ecf\u590d\u5236\uff0c\u60a8\u53ef\u4ee5\u7c98\u8d34\u5230QQ\u3001MSN\u6216\u90ae\u4ef6\u4e2d\u53d1\u9001\u7ed9\u597d\u53cb\u4e86!')\"></div>"), e = 90) :(t.push('<div class="i-con">\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u81ea\u52a8\u590d\u5236\u529f\u80fd\u3002\u60a8\u53ef\u4ee5\u6309\u4f4fCtrl+C\uff0c\u5c06\u5546\u54c1\u94fe\u63a5\u5730\u5740\u590d\u5236\u4e0b\u6765\u3002</div>'), e = 110), t.push("</div>"), t = t.join("");
			//$("#site-qq").jdThickBox({type: "text",width: 400,height: e,source: t,_fastClose: !0});
			$('#site-qq').dialog({
				title: '提示',
				width:  400,
				height: 80,
				type: 'text',
				hasButton:true,
				source: t
			});
		},
		commond : function(type,msg) {
			switch (type) {
				case 'site-sina':
					this.jdPshowRecommend('http://v.t.sina.com.cn/share/share.php?appkey=2445336821','sina',msg);
					break
				case 'qqweibo':
					this.jdPshowRecommend('http://v.t.qq.com/share/share.php?source=1000002&site=http://www.jd.com','qzone',msg);
					break
				case 'site-renren':
					this.jdPshowRecommend('http://share.renren.com/share/buttonshare/post/1004?','renren',msg);
					break
				case 'qzone':
					this.jdPshowRecommend('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?','kaixing',msg);
					break
				case 'site-douban':
					this.jdPshowRecommend('http://www.douban.com/recommend/?','douban',msg);
					break
				case 'site-msn':
					this.jdPshowRecommend('http://profile.live.com/badge/?','MSN',msg);
					break
			}
		},
		jdPshowRecommend : function(url, stype, msg) {
			var pin = readCookie("pin") || "";

			if (stype == "qzone") {
				url = url + "&title=" + msg.content + "&pic=" + msg.img + "&url=" + msg.productUrl;
			}
			if (stype == "sina") {
				url = url + "&title=" + encodeURIComponent(msg.content) + "&pic=" + encodeURIComponent(msg.img) + "&url=" + encodeURIComponent(msg.productUrl);
				window.open(url, "", "height=500, width=600");
			}
			if (stype == "renren") {
				url = url + "title=" + msg.title + "&content=" + msg.content + "&pic=" + msg.img + "&url=" + msg.productUrl;
			}
			if (stype == "kaixing") {
				url = url + "rtitle=" + msg.title + "&rcontent=" + msg.content + "&rurl=" + msg.productUrl;
			}
			if (stype == "douban") {
				url = url + "title=" + msg.title + "&comment=" + msg.content + "&url=" + msg.productUrl;
			}
			if (stype == "MSN") {
				url = url + "url=" + msg.productUrl + "&title=" + msg.title + "&description=" + msg.content + "&screenshot=" + msg.img;
			}
			if (stype != "sina") {
				window.open(encodeURI(url), "", "height=500, width=600");
			}
		}
	};
	share.bindEvent();
})
