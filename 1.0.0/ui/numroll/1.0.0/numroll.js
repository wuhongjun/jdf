/**
*####numroll####
* 
***Demo**
* [numroll](../ui/numroll/1.0.0/example/numroll.html "Demo")
*
***参数**
*
*  - `startVal` {Number}  起始值
*  - `endVal` {Number}    结束值
*  - `decimals` {Number}  默认为2  几位小数
*  - `duration` {Number}  默认为2.5  动画持续时间
*  - `splitSign` {String}  默认为.  数字分隔符号
*  - `complete` {Function}  动画执行完成后回调
*
***举例**
* 
*	$('#numroll').numroll();
*
* **update**
* 2014-6-24 10:05:34 by bjshijianguo
*
*/

;(function($, undefined) {
	$.ui.define('numroll', {
		options: {
			startVal: null,
			endVal: null,
			decimals: null,
			duration: null,
			splitSign: '.',
			complete: $.noop
        },
		init: function() {
			var opts = this.options;
			
			//参考http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
			var lastTime = 0;
			var vendors = ['webkit', 'moz', 'ms'];
			
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame =
				  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				}
			}
			
			if (!window.cancelAnimationFrame) {
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				}
			}
			
			this.target = this.el.get(0);
			this.startVal = +opts.startVal;
			this.endVal = +opts.endVal;
			this.originStartVal = this.startVal;
			this.countDown = this.startVal > this.endVal ? true : false;
			this.startTime = null;
			this.timeStam = null;
			this.remaining = null;
			this.frameVal = this.startVal;
			this.rAF = null;
			this.decimals = Math.max(0, opts.decimals || 0);
			this.dec = Math.pow(10, this.decimals);
			this.duration = opts.duration * 1000 || 2000;
			this.originDuration = this.duration;
			this.splitSign = opts.splitSign;
			this.complete = opts.complete;
			
		},
		easeOutExpo: function(t, b, c, d) {
			return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
		},
		count: function(timestamp) {
			if (this.startTime === null) this.startTime = timestamp;

			this.timestamp = timestamp;

			var progress = this.timestamp - this.startTime;
			this.remaining = this.duration - progress;
			
			if (this.countDown) {
				var i = (this.startVal - this.endVal) * (progress / this.duration);
				this.frameVal = this.startVal - i;
			} else {
				this.frameVal = this.startVal + (this.endVal - this.startVal) * (progress / this.duration);
			}
			
			this.frameVal = Math.round(this.frameVal*this.dec) / this.dec;
			
			if (this.countDown) {
                var i = this.easeOutExpo(progress, 0, this.startVal - this.endVal, this.duration);
                this.frameVal = this.startVal - i;
            } else {
                this.frameVal = this.easeOutExpo(progress, this.startVal, this.endVal - this.startVal, this.duration);
            }
			
			this.target.innerHTML = this.formatNumber(this.frameVal.toFixed(this.decimals));
				   
			if (progress < this.duration) {
				this.rAF = requestAnimationFrame($.proxy(this.count, this));
			} else {
				if (this.complete != null) this.complete();
			}
		},
		start: function() {
		
			this.reset();
			
			if (!isNaN(this.endVal) && !isNaN(this.startVal)) {
				this.rAF = requestAnimationFrame($.proxy(this.count, this));
			} else {
				console.log('numroll error: startVal or endVal is not a number');
				this.d.innerHTML = '--';
			}
			return false;
		},
		stop: function() {
			cancelAnimationFrame(this.rAF);
		},
		reset: function() {
			this.startTime = null;
			this.startVal = this.originStartVal;
			this.duration = this.originDuration;
			cancelAnimationFrame(this.rAF);
			this.target.innerHTML = this.formatNumber(this.startVal.toFixed(this.decimals));
		},
		resume: function() {			
			this.startTime = null;
			this.duration = this.remaining;
			this.startVal = this.frameVal;
			this.rAF = requestAnimationFrame($.proxy(this.count, this));
		},
		formatNumber: function(nStr) {
			var x, x1, x2;
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? this.splitSign + x[1] : '';
			return x1 + x2;
		}
	});
})(jQuery);