/**
*####计时器####
*
*在onchange的回调函数中，会接收到一个包含所有时间属性值的data对象参数。分别是：d（天），h（时），m（分），s（秒），ms（毫秒）。
* 
***Demo**
* [countup](../ui/countup/1.0.0/example/countup.html "Demo")
*
***参数**
*	
*	- `ele`			{Object}	"#countup"			指定要添加计时器的容器元素，可以是id，className，div等
* 	- `onchange`	{Function} 	function(data){} 	时间每次变化的回调函数
*	- `isTwoDigits`	{Boolean} 	true 				天/小时/分/秒是否为两位数字 9 ==> 09，毫秒是四位数字 0009
*	- `isStart`		{Boolean}	true				页面加载完之后是否默认开始
*	- `startBtn`	{Object}	null				指定控制计时器的开始按钮
*	- `stopBtn`		{Object}	null				指定控制计时器的停止按钮
*	- `resetBtn`	{Object}	null				指定控制计时器的初始化按钮
*
***举例**
*
*	在计时器初始化之后，会暴露出三个公共方法：start()、stop()、reset()，分别用于开启计时、停止计时和初始化计时器。
*	可以用如下方式去调用：
*	var arr = $.countup({
*       ele: "div",
*       isTwoDigits: true,
*       onchange: function(data){
*           $(this).html(data.d + "天" + data.h + "时" + data.m + "分" + data.s + "秒" + data.ms + "毫秒");
*       }
*   });
*	arr[0].start();
*	arr[0].stop();
*	arr[0].reset();
*
*	同时操作当前所有的计时器，可以直接：
*	arr.start();
*	arr.stop();
*	arr.reset();
*
*
*	直接给计时器指定开始、停止、初始化按钮
*	$("#countdown").countup({
*	    startBtn: "#start",
*	    stopBtn: "#stop",
*	    resetBtn: "#reset",
*	    onchange: function(data){
*	        $(this).html(data.d + "天" + data.h + "时" + data.m + "分" + data.s + "秒" + data.ms + "毫秒");
*	    }
*	});
*
***update**
*2014-8-25 14:00 by chenxiaochun
*/

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
			var d = 0, h = 0, m = 0, s = 0, ms = 0;
			var timer = null;
			var msTimer = null;
			var me = this;
			var obj = {};
			var data = {};
			
			var tick = function(){
				d = parseInt(d, 10);//天
				h = parseInt(h, 10);//时
				m = parseInt(m, 10);//分
				s = parseInt(s, 10);//秒

				//如果秒小于59，继续累加，否则置为0
				if(s < 59){
					s = s + 1;
				}else{
					s = 0;

					//如果分小于59，继续累加，否则置为0
					if(m < 59){
						m = m + 1;
					}else{
						m = 0;

						//如果时小于59，继续累加，否则置为0，并将天累加1
						if(h < 23){
							h = h + 1;
						}else{
							h = 0;
							d = d + 1;
						}
					}
				}
				

				data.d = d;
				data.h = h;
				data.m = m;
				data.s = s;
				//如果isTwoDigits为true，且各时间属性小于10，则以双位数显示
				
				if(options.isTwoDigits){
					if(d < 10){
						data.d = "0" + d;
					}

					if(h < 10){
						data.h = "0" + h;
					}

					if(m < 10){
						data.m = "0" + m;
					}

					if(s < 10){
						data.s = "0" + s;
					}
				}
				
				options.onchange.call(me, data);
			}

			//开始计时
			var start = function(){
				tick();
				if(!timer){
					timer = setInterval(tick, 1000);
				}
				if(!msTimer){
					msTimer = setInterval(function(){
						ms = new Date().getMilliseconds();
						data.ms = ms;
						options.onchange.call(me, data);
					}, 1000/60);
				}
			}

			//停止计时
			var stop = function(){
				clearInterval(timer);
				timer = null;

				clearInterval(msTimer);
				msTimer = null;
			}

			//初始化计时器
			var reset = function(){
				//根据isTwoDigits来决定是否将时间属性值初始化为双位数
				if(options.isTwoDigits){
					d = "00";
					h = "00";
					m = "00";
					s = "00";
					ms = "000";
				}else{
					d = 0;
					h = 0;
					m = 0;
					s = 0;
					ms = 0;
				}

				options.onchange.call(me, {
					d: d,
					h: h,
					m: m,
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