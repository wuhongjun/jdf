/**
** update **
*
* 2014-10-27 16:50:00 by chenxiaochun
* 扩展off方法，当没有fun时，则删除name事件以及它的所有回调
* 修复无法删除事件的bug，将原来的实现：even.splice(even[l], 1)，改为：even.splice(l, 1)
* 
*/

define(function(require,exports,module){
	/**
	* @自定义事件
	*/
	var event = {
		//绑定事件
		on:function (name, fun) {
			var me = this;
			//event list
			this.list = this.list || (this.list = []);
			this.list[name] = this.list[name] || [];
			var funType = typeof(fun);
			
			if (typeof(fun) === 'undefined'){
				var fun = function(){
					if (me[name]){
						 me[name]();
					}
				}
			}

			if (typeof(fun) === 'function'){
				this.list[name].push(fun);
			}
		},
		//解除事件绑定
		off:function (name, fun) {
			if(typeof(fun) == 'function'){
				if (typeof(this.list) != 'undefined') {
					var even = this.list[name];
					if (even) {
						var l = even.length;
						while (l--) {
							if (even[l] === fun) {
								even.splice(l, 1);
							}
						}
					}
				}
			}else{
				//如果没有指定fun，则清除name事件以及它的所有回调函数
				this.list[name] = [];
			}
		},
		//触发事件
		trigger : function (name, obj) {
			if (typeof(this.list) != 'undefined') {
				var event = this.list[name];
				if (event) {
					for (var i in event ){
						if (typeof(event[i]) == 'function'){
							event[i](obj);
						}
					}
				}
			}
		},
		//移除所有事件
		removeAll:function (name) {
			this.list = [];
		}
	};
	return event;
});