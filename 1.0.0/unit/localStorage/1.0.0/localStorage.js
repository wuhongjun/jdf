define(function(require,exports,module){
		/**
	 * 简单的localStorage
	 */
	var lStorage={
		//检查是否支持localStorage
		check:function(){
			 return typeof(window.localStorage) == 'object';
		},
		//测试
		has:function(name){
			return localStorage.getItem(name) ? true : false;
		},
		//设置
		set:function(name,value){
			//容量溢出时会报错
			try{
				localStorage.setItem(name,JSON.stringify(value));
			}catch(e){
				
			}
		},
		//获取
		get:function(name){
			try{
					return JSON.parse(localStorage.getItem(name));
			}catch(e){
				
			}
		},
		//删除
		remove:function(name){
			localStorage.removeItem(name);
		},
		//根据key前后缀清除
		clearByReg:function(str){
			 var reg = new RegExp(str);
			 var o = window.localStorage
			 for (var i in o){
				if(reg.test(i)){
					this.remove(i);
				}
			 }
		},
		//清空
		clear:function(){
			localStorage.clear();
		}
	};

	return lStorage;
});