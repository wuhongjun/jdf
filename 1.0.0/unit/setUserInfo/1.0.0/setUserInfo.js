define(function(require,exports,module){
	/**
	* @获取用户信息并更新在顶栏个人信息
	*/
	var setUserInfo = function(options){
		options = $.extend({
			el:$("#loginbar"),
			callback:null
		}, options || {});

		var getHttp = function(){
			return 'https:' == document.location.protocol ? 'https://' : 'http://'; 
		}

		$.ajax({
			url: getHttp() + "passport.jd.com/new/helloService.ashx",
			dataType:"jsonp",
			scriptCharset:"GBK",
			success:function(data){
				//更新顶栏个人信息
				if(data&&data.info){
					options.el.html(data.info);
					if (options.callback) {
						options.callback(data);
					}
				}
				
				//更新其它域名cookies
				if(data&&data.sso){
					$.each(data.sso,function(){
						$.getJSON(this)
					})
				}
			}
		});
	}
	return setUserInfo;
});