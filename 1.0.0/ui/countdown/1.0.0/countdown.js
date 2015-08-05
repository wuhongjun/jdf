/**
*####倒计时####
* 
* 返回的时间格式为天天/小时/分/秒/毫秒;当前时间最好从服务端取,配置在currentTime参数上
* 
***Demo**
* [countdown](../ui/countdown/1.0.0/example/countdown.html "Demo")
*
***参数**
*
*  - `beginTime` {String} 0 开始时间 格式2013/12/23 16:10:10
*  - `endTime` {String} 0 结束时间 格式2013/12/23 16:10:10
*  - `currentTime` {Number} 0 是否用服务器系统时间 格式 1387788659033
*  - `hasMilli` {Boolse} false 是否有毫秒
*  - `onEnd` {Function} null 到达结束时间回调函数
*  - `onShow` {Function} null 开始展示时回调函数
*  - `onChange` {Function} null 倒计进行时中回调函数
*  - `isTwoDigits` {Boolse} true //天/小时/分/秒是否为两位数字 9 ==> 09
*
***举例**
* 
*	$('#countdown').countdown();
*
* **update**
* 2013-12-23 13:44:47 by liuwei1
*
*/

;(function($, undefined) {
	$.ui.define('countdown', {
		options: {
			beginTime:0,//开始时间 格式2013/12/23 16:10:10			
			endTime:0,//结束时间 格式2013/12/23 16:10:10
			currentTime:0,//当前服务器系统时间 格式 1387788659033
			hasMilli:false,//是否有毫秒
			onEnd:null,//到达结束时间回调函数
			onShow:null,//开始展示时回调函数
			onChange:null,//倒计进行时回调函数
			isTwoDigits:true//天/小时/分/秒是否为两位数字9 ==> 09
        },
        /*
		 *剩余时间
		 * @method leaveTime
		 * @return {Object} {beginTime:beginTime, endTime:endTime, day:day, hour:hour, minute:minute, second:second ,milli:milli} 
		 */
        leaveTime:null,
		init:function(){
			var self = this;
			var opts = self.options;

			self.leaveTimeSet();

			self.getLeaveTime();
   			self.onChange();

			self.play();

   			if (opts.onShow) {opts.onShow.call(self)}
		},
		leaveTimeSet:function(){
			var self = this;
			var opts = self.options;
			var deadline = new Date(opts.beginTime ? opts.beginTime : opts.endTime);
			var deadlineTime = deadline.getTime();
			var now = new Date();
			var nowTime = now.getTime();
			if (opts.currentTime) {
				nowTime = opts.currentTime;
			}

			//是北京时间和当地时间的时间差
			var diff = -480 - now.getTimezoneOffset(); 
			var leave = deadlineTime - nowTime + diff * 60000;
			leave = leave / 1000;

			self.leave = leave;
		},
		setTwoDigits:function(num){
			if (this.options.isTwoDigits) {
				if (num<10) {num = '0' + num;}
			}
			return num;
		},
		/*
		 *获取剩余时间
		 * @method getLeaveTime
		 */
		getLeaveTime: function(){
			var self = this;
			var opts = self.options;
			var leave = self.leave;

			self.leave -= opts.hasMilli ? 0.01 : 1;

			var day = Math.floor(leave / (60 * 60 * 24));
			var hour = Math.floor(leave / (60 * 60) ) - (day * 24);
			var minute = Math.floor(leave / 60 ) - (day * 24 * 60) - (hour * 60);
			var second = Math.floor(leave) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

			var beginTime = opts.beginTime ? opts.beginTime : null;
			var endTime = opts.endTime ? opts.endTime : null;

			self.leaveTime = {
				beginTime:beginTime,
				endTime:endTime,
				day:self.setTwoDigits(day),
				hour:self.setTwoDigits(hour),
				minute:self.setTwoDigits(minute),
				second:self.setTwoDigits(second),
				milli:null
			};

			if (opts.hasMilli) {
				var milli = leave - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)  - second  ;
				milli = Math.floor(milli * 100);
				self.leaveTime.milli = milli;
			}
		},
		onChange:function(){
			var self = this;
			var opts = self.options;
			var leaveTime = self.leaveTime;
			if (leaveTime.day >= 0) {
				if (opts.onChange) {opts.onChange.call(self,leaveTime)}
			} else{
				//leaveTime此时为0-1
				if (opts.onEnd) {opts.onEnd.call(self)}
				clearInterval(self.intervalTag);
			}
		},
		play:function(){
			var self = this;
			var opts = self.options;
			var delay = opts.hasMilli ? 10 : 1000;
			clearInterval(self.intervalTag);
			self.intervalTag = setInterval(function(){
				self.getLeaveTime();
				self.onChange();
			}, delay);
		},
		stop:function(){
			var self = this;
			clearInterval(self.intervalTag);
		}
	});
})(jQuery);