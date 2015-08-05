define(function(require,exports,module){
	var jdLogin = require('jdf/1.0.0/unit/login/1.0.0/login.js');
	var dialog = require('jdf/1.0.0/ui/dialog/1.0.0/dialog.js');
	/**
	* @到货,降价通知
	* @举例
		<button data-type="2" data-sku="1234456" class="notifBtn">到货通知</button>
		<button data-type="1" data-sku="1234456" class="notifBtn">降价通知</button>
		seajs.use('jdf/1.0.0/unit/notif/notif.js',function(notif){
			notif({
				el:$('.notifBtn')
			})
		})	
	*/
	function notif(options){
		options = $.extend({
			el:null,//要绑定的元素
			autoIframe:true,
			//降价通知
			saleNotify: 'http://skunotify.jd.com/pricenotify.html?',
			//到货通知
			stockNotify: 'http://skunotify.jd.com/storenotify.html?'
		}, options || {});

		var that = this,
			p = serializeUrl(location.href),
			query = /from=weibo/.test(location.href)? location.search.replace(/\?/, '') : '',
			type;

		// 微博callback url
		if ( /from=weibo/.test(location.href) ) {
			type = p.param.type;
			dialogSet(type, query);
		}
		
		if (options.el) {
			options.el.live('click', function() {
				//btn-notice
				var _this = this,
				id = $(this).attr('id'),
				type = $(this).attr('data-type') || 2,
				sku = $(this).attr('data-sku');

				jdLogin({
					modal: true,
					complete: function(result) {
						//that._userPin = result.Identity.Name;
						dialogSet(sku,type, query,result.Identity.Name);
					}
				}) 
				return false;
			}).attr('href', '#none').removeAttr('target');
		}

		function serializeUrl(url) {
			var sep = url.indexOf('?'),
				link = url.substr( 0, sep),
				params = url.substr( sep+1 ),
				paramArr = params.split('&'),
				len = paramArr.length,i,
				res = {},curr,key,val;

			for ( i=0; i<len; i++) {
				curr = paramArr[i].split('=');
				key = curr[0];
				val = curr[1];

				res[key] = val;
			}

			return {
				url: link,
				param: res
			}
		}

		function dialogSet(sku,type, query,username) {
			//webSite=1&origin=1&source=1
			var title,url, w, h,
				param = {
					skuId: sku,
					pin: username,
					webSite: 1,
					origin: 1,
					source: 1
				},
				p = serializeUrl(location.href);

			if ( /blogPin/.test(location.href) ) {
				param.blogPin = p.param.blogPin;
			}

			if ( type == 1 ) {
				title = '降价通知';
				url = options.saleNotify;
				h = 250;
			}
			if ( type == 2 ) {
				title = '到货通知';
				url = options.stockNotify;
				h = 210;
				param.storeAddressId = readCookie('ipLoc-djd') || '0-0-0';
			}

			if ( !!query ) {
				url = url + query;
			} else {
				url = url + $.param(param);
			}

			$('body').dialog({
				title:title,
				width: 500,
				height: h,
				type:'iframe',
				fixed :true,
				source: decodeURIComponent(url) + '&nocache=' + (+new Date()),
				mainId:'notify_box',
				contentId:'notify_con',
				titleId:'notify_title',
				autoIframe:options.autoIframe
			});
		}
	}

	//兼容旧版NotifyPop
	/*
	var NotifyPop = {
		init: function($btn) {
			notif({
				el:$btn
			});
		}
	};
	window.NotifyPop = NotifyPop;
	*/

	return notif;
});