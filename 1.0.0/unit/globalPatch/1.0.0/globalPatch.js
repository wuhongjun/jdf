define(function(require,exports,module){
	var lazyload = require('jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js');

	function init(){
		//getDomain
		if (typeof pageConfig.FN_getDomain === 'undefined') {
			pageConfig.FN_getDomain = function() {
				var hn = location.hostname;

				return (/360buy.com/.test(hn)) ? "360buy.com" : "jd.com";
			};
		}

		//头尾补丁 
		//通过广告位来管理 by zhouqili@jd.com 
		//http://fa.360buy.com/loadFa_toJson.js?aid=2_601_5095 
		if ( !/debug=global/.test(window.location.href) ) {
			$.ajax({
				url: "http://nfa.jd.com/loadFa_toJson.js?aid=2_601_5095",
				dataType: "script",
				scriptCharset: "gbk",
				cache: true
			});
		}
	
		//版权信息最后一行图片lazyload
		$('#footer-2013').lazyload({
			type:'img',
			source:'data-lazyload'
		});
	}
	exports.init = init;
});