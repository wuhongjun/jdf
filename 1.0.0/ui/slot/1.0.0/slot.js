/**
*####slot####
* 
***Demo**
* [slot](../ui/slot/1.0.0/example/slot.html "Demo")
*
***参数**
*
*  - `startVal` {Number}  起始值
*  - `changeVal` {Number}    结束值
*  - `duration` {Number}  动画持续时间
*  - `startTime` {Number}  默认为.  数字分隔符号
*  - `step` {Number}  步长，控制动画速度
*  - `result` {Number}  结果值
*  - `complete` {Function}  动画执行完成后回调
*
***举例**
* 
*	$('#solt-item-0').slot({
*		duration: 150,
*		result: 3
*	});
*
* **update**
* 2014-7-16 14:07:34 by bjshijianguo
*
*/

;(function($, undefined) {
	$.ui.define('slot', {
		options: {
			//初始值
			startVal: 0,
			//变化值
			changeVal: 0,
			//持续时间
			duration: 0,
			//开始时间
			startTime: 0,
			//步长
			step: 1,
			//结果索引值
			result: 0,
			//动画停止后的回调
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
			
			this.target = this.el;
			this.startVal = +opts.startVal;
			this.changeVal = +opts.endVal;
			this.result = opts.result;
			this.startTime = opts.startTime;
			this.duration = opts.duration;
			this.step = opts.step;
			this.complete = opts.complete;
			
			this.start();
		},
		tween: {
			Linear: function(t, b, c, d) { return c*t/d + b; },
			Quad: {
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t + b;
				},
				easeOut: function(t, b, c, d) {
					return -c *(t /= d)*(t-2) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t + b;
					return -c / 2 * ((--t) * (t-2) - 1) + b;
				}
			},
			Cubic: {
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t * t + b;
				},
				easeOut: function(t, b, c, d) {
					return c * ((t = t/d - 1) * t * t + 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
					return c / 2*((t -= 2) * t * t + 2) + b;
				}
			},
			Quart: {
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t * t*t + b;
				},
				easeOut: function(t, b, c, d) {
					return -c * ((t = t/d - 1) * t * t*t - 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
					return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
				}
			},
			Quint: {
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t * t * t * t + b;
				},
				easeOut: function(t, b, c, d) {
					return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
					return c / 2*((t -= 2) * t * t * t * t + 2) + b;
				}
			},
			Sine: {
				easeIn: function(t, b, c, d) {
					return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
				},
				easeOut: function(t, b, c, d) {
					return c * Math.sin(t/d * (Math.PI/2)) + b;
				},
				easeInOut: function(t, b, c, d) {
					return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
				}
			},
			Expo: {
				easeIn: function(t, b, c, d) {
					return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
				},
				easeOut: function(t, b, c, d) {
					return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if (t==0) return b;
					if (t==d) return b+c;
					if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
					return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
				}
			},
			Circ: {
				easeIn: function(t, b, c, d) {
					return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
				},
				easeOut: function(t, b, c, d) {
					return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
					return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
				}
			},
			Elastic: {
				easeIn: function(t, b, c, d, a, p) {
					var s;
					if (t==0) return b;
					if ((t /= d) == 1) return b + c;
					if (typeof p == "undefined") p = d * .3;
					if (!a || a < Math.abs(c)) {
						s = p / 4;
						a = c;
					} else {
						s = p / (2 * Math.PI) * Math.asin(c / a);
					}
					return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				},
				easeOut: function(t, b, c, d, a, p) {
					var s;
					if (t==0) return b;
					if ((t /= d) == 1) return b + c;
					if (typeof p == "undefined") p = d * .3;
					if (!a || a < Math.abs(c)) {
						a = c; 
						s = p / 4;
					} else {
						s = p/(2*Math.PI) * Math.asin(c/a);
					}
					return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
				},
				easeInOut: function(t, b, c, d, a, p) {
					var s;
					if (t==0) return b;
					if ((t /= d / 2) == 2) return b+c;
					if (typeof p == "undefined") p = d * (.3 * 1.5);
					if (!a || a < Math.abs(c)) {
						a = c; 
						s = p / 4;
					} else {
						s = p / (2  *Math.PI) * Math.asin(c / a);
					}
					if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
					return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
				}
			},
			Back: {
				easeIn: function(t, b, c, d, s) {
					if (typeof s == "undefined") s = 1.70158;
					return c * (t /= d) * t * ((s + 1) * t - s) + b;
				},
				easeOut: function(t, b, c, d, s) {
					if (typeof s == "undefined") s = 1.70158;
					return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
				},
				easeInOut: function(t, b, c, d, s) {
					if (typeof s == "undefined") s = 1.70158; 
					if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
					return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
				}
			},
			Bounce: {
				easeIn: function(t, b, c, d) {
					return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
				},
				easeOut: function(t, b, c, d) {
					if ((t /= d) < (1 / 2.75)) {
						return c * (7.5625 * t * t) + b;
					} else if (t < (2 / 2.75)) {
						return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
					} else if (t < (2.5 / 2.75)) {
						return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
					} else {
						return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
					}
				},
				easeInOut: function(t, b, c, d) {
					if (t < d / 2) {
						return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
					} else {
						return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
					}
				}
			}
		},
		start: function () {

			this.goal = $(this.target).find('ul');
			this.itemHeight = $(this.target).find('li').outerHeight();
			this.itemTotalHeight = ($(this.target).find('li').length - 1) * this.itemHeight;
			this.changeVal = this.result * this.itemHeight;

			this.reset();
			this.freeRun();

		},
		//自由滚动
		freeRun: function () {

			this.goal.css('marginTop', Math.ceil(this.tween.Sine.easeIn(this.startTime, this.startVal, -1 * this.itemTotalHeight, this.duration)));

			if (this.startTime < this.duration) {
				this.startTime += this.step;
				this.rAF = requestAnimationFrame($.proxy(this.freeRun, this));
			} else {
				this.reset();
				this.goalRun();
			}
		},
		//目标定位滚动
		goalRun: function () {
			this.goal.css('marginTop', Math.ceil(this.tween.Quad.easeOut(this.startTime, this.startVal, -1 * this.changeVal, this.duration)));

			if (this.startTime < this.duration) {
				this.startTime += this.step;
				this.rAF = requestAnimationFrame($.proxy(this.goalRun, this));
			} else {
				this.reset();
				this.complete();
			}
		},
		reset: function () {
			cancelAnimationFrame(this.rAF);
			this.startTime = 0;
		}
	});
})(jQuery);