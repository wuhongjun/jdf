/**
###ranger滑动组件###
*
*模拟html5中的ranger标签
*
***Demo**
* [ranger](../ui/ranger/1.0.0/example/ranger.html "Demo")
*
***参数**
*
*	- `min`			{Number}	//指定ranger的最小值
*	- `max`			{Number}	//指定ranger的最大值
*	- `step`		{Number}	//每次ranger可挪动的步长
*	- `value`		{Number}	//指定ranger的当前值
*	- `percent`		{Boolean}	//指定ranger是否会以百分数返回当前value值
*	- `vertical`	{Boolean}	//是否垂直显示ranger
*	- `onchange`	{Function}	//当前值每次改变时的回调
*
***举例**
*
*	默认水平ranger
*	$('#r1').ranger({
*		onchange: function(value){
*			console.log(value);
*		}
*	});
*
*	给滑动指定一个初始值
*	$('#r2').ranger({
*		value: 20,
*		onchange: function(value){
*			$(this).parents('.box').find('b').text(value);
*		}
*	});
*
*	指定每次的滑动步长
*	$('#r3').ranger({
*		step: 5,
*		onchange: function(value){
*			$(this).parents('.box').find('b').text(value);
*		}
*	});
*
*	指定当前的返回值为百分数
*	$('#r1').ranger({
*		percent: true,
*		onchange: function(value){
*			console.log(value);
*		}
*	});
*
*	垂直ranger
*	$('#r1').ranger({
*		vertical: true,
*		onchange: function(value){
*			console.log(value);
*		}
*	});
*
* **update**
* 2014-8-25 10:23 by chenxiaochun
*
*/

;(function($, undefined){
	$.ui.define('ranger', {
		options: {
			min: 0,				//指定ranger的最小值
			max: 100,			//指定ranger的最大值
			value: 0,			//当前ranger的值
			step: 1,			//每次ranger可挪动的步长
			percent: false,		//指定ranger是否以百分数返回当前value值
			vertical: false,	//是否垂直显示ranger
			onchange: null		//当前值每次改变时的回调
		},

		init: function(){
			this.build();
		},

		build: function(){
			var that = this;
			var min = parseFloat(this.options.min) || 0;
			var max = parseFloat(this.options.max) || 100;
			var step = parseFloat(this.options.step) || 1;

			//根据最大值、最小值和步长来计算总共能挪动次数
			var stepCount = (max - min) / step;

			//计算当前的value值
			var value = parseFloat(this.options.value);
			var onchange = this.options.onchange;

			this.el.each(function(i){
				var rangerHtml = $('<div class="ui-ranger"><div class="ui-ranger-track"><span class="ui-ranger-quantity"></span><span class="ui-ranger-handle"><span class="ui-ranger-disc"></span></span></div></div>');
				var vertical = that.options.vertical;

				//如果vertical为真，则添加垂直ranger的className
				if(vertical){
					rangerHtml.addClass('ui-ranger-vertical');
				}

				//添加模拟的ranger
				$(this).html(rangerHtml);

				var ranger = $(this).find('.ui-ranger');

				//track指的是ranger滑动的轨道
				var track = ranger.find('.ui-ranger-track');

				//handle指的是一个定位器，宽度仅为1px
				var handle = ranger.find('.ui-ranger-handle');

				//disc是视觉上可以用鼠标拖动的滑动块
				var disc = ranger.find('.ui-ranger-disc');

				var quantity = ranger.find('.ui-ranger-quantity');

				//需要把ranger当前的参数传递给其它的处理函数
				var data = {
					that: that,
					input: $(this),
					ranger: ranger,
					index: i,

					track: track,
					trackWidth: track.outerWidth(),
					trackHeight: track.outerHeight(),

					handle: handle,
					handWidth: handle.outerWidth(),
					handHeight: handle.outerHeight(),

					quantity: quantity,

					min: min,
					max: max,

					step: step,
					stepCount: stepCount,
					stepDigits: step.toString().length - step.toString().indexOf('.'),

					value: value,
					vertical: vertical,
					percent: that.options.percent,
					onchange: onchange
				};

				//如果需要一个垂直ranger，则需要用track的高度来计算每次的移动量。反之，则是用宽度来计算。
				if(vertical){
					data.increment = data.trackHeight / data.stepCount;
				}else{
					data.increment = data.trackWidth / data.stepCount;
				}

				$(this).data('ranger', data);

				that.position(data, value / (max - min));

				//为ranger绑定处理函数，并把传递参数
				ranger.bind('mousedown.ranger', $(this).data('ranger'), that.onTrackDown)
					  .bind('mousedown.ranger', $(this).data('ranger'), that.onHandleDown);
				
			});
		},

		//当鼠标在ranger按下时处理track
		onTrackDown: function(e){
			e.stopPropagation();

			var data = e.data;

			data.that.onMouseMove(e);
			$('body').bind('mousemove.ranger', data, data.that.onMouseMove)
					 .one('mouseup.ranger', data, data.that.onMouseUp);

		},

		//当鼠标在ranger上按下时处理handle
		onHandleDown: function(e){
			e.stopPropagation();

			var data = e.data;

			$('body').bind('mousemove.ranger', data, data.that.onMouseMove)
					 .bind('mouseup.ranger', data, data.that.onMouseUp)
					 .data('ranger', data);

		},

		//当鼠标挪动时的处理
		onMouseMove: function(e){
			var data = e.data;
			var perc = 0;
			var offset = data.track.offset();

			//计算挪动的百分比
			if(data.vertical){
				perc = 1 - (e.pageY - offset.top) / data.trackHeight;
			}else{
				perc = (e.pageX - offset.left) / data.trackWidth;
			}
			
			data.that.position(data, perc);

			return false;
		},

		//鼠标松开时，解绑所有的事件
		onMouseUp: function(e){
			var data = e.data;

			$('body').unbind('.ranger');
		},

		//计算track，handle的定位
		position: function(data, perc){
			if(data.increment > 1){
				if(data.vertical){
					perc = (Math.round(perc * data.stepCount) * data.increment) / data.trackHeight;
				}else{
					perc = (Math.round(perc * data.stepCount) * data.increment) / data.trackWidth;
				}
			}

			if(perc < 0){
				perc = 0;
			}
			if(perc > 1){
				perc = 1;
			}

			var value = ((data.min - data.max) * perc);
			value = -parseFloat(value.toFixed(data.stepDigits));

			data.handle.css((data.vertical) ? 'bottom' : 'left', (perc * 100) + '%');
			data.quantity.css((data.vertical) ? 'height' : 'width', (perc * 100) + '%');
			value += data.min;

			if(data.perc != perc){
				data.perc = perc;
				if(data.percent){
					data.onchange.call(data.ranger, parseInt((perc*100)));
				}else{
					data.onchange.call(data.ranger, value);
				}
			}
		}
	});
})(jQuery);
