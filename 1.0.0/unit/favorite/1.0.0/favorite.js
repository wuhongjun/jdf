define(function(require,exports,module){
	var cookie = require('jdf/1.0.0/unit/cookie/1.0.0/cookie.js');

	function init() {
		var a = "http://www.jd.com/";
		var b = "京东JD.COM-网购上京东，省钱又放心";
		if (document.all) {
			window.external.AddFavorite(a, b);
		} else if (window.sidebar&&window.sidebar.addPanel) {
			window.sidebar.addPanel(b, a, "");
		} else {
			alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
		}
		cookie('_fv', '1', {expires: 30, path: '/', domain: 'jd.com', secure: true});
		//createCookie("_fv","1",30,"/;domain=jd.com");
	}
	return init;
});