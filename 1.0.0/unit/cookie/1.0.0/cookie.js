/**
* @cookies
* @get,set
* @example
	设置cookie的值，把cookiename变量的值设为value
	seajs.use('jdf/1.0.0/unit/cookie/1.0.0/cookie.js',function(cookie){
		cookie('name', 'value');
	})

	新建一个cookie包括有效期,路径,域名等
	seajs.use('jdf/1.0.0/unit/cookie/1.0.0/cookie.js',function(cookie){
		cookie('name', 'value', {expires: 7, path: '/', domain: 'example.com', secure: true});
	})

	新建cookie
	seajs.use('jdf/1.0.0/unit/cookie/1.0.0/cookie.js',function(cookie){
		cookie('name', 'value');
	})
	
	删除一个cookie
	seajs.use('jdf/1.0.0/unit/cookie/1.0.0/cookie.js',function(cookie){
		cookie('name', null);
	})
	
	取一个cookie(name)值给str
	seajs.use('jdf/1.0.0/unit/cookie/1.0.0/cookie.js',function(cookie){
		var str= cookie('name');
	})
*
*/

define(function(require,exports,module){	
	var cookie = function(name, value, options) {
		if (typeof value != 'undefined') { 
			//set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				// for IE
				expires = '; expires=' + date.toUTCString(); 
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else { 
			//get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]).split('=');
					if ( cookie[0] == name && cookie.length > 1 ) {
						try{
							cookieValue = decodeURIComponent(cookie[1]);
						}catch (e){
							cookieValue = cookie[1];
						}
						break;
					}
				}
			}
			return cookieValue;
		}
	};
	return cookie;
});