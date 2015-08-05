/**
** update **
*
* 2014-10-29 15:07:00 by chenxiaochun
* [bug]修复在firefox中js报错的问题
*
* 2014-10-27 16:23:00 by chenxiaochun
* [bug]修复回调会被多次调用的问题
* 
*/

define(function(require,exports,module){
	var setUserInfo = require('jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js');
	var jdEvent = require('jdf/1.0.0/unit/event/1.0.0/event.js');
	var dialog = require('jdf/1.0.0/ui/dialog/1.0.0/dialog.js');
	/** 
	* @login登录注册
	* @example
		login({
			modal: true,//false跳转,true显示登录注册弹层
			complete: function() {
				//回调函数
			}
		})
	*/

	//登陆成功之后回调用
	var jdModelCallCenter = {};
	window.jdModelCallCenter = jdModelCallCenter;

	/**
	* @取得http或者https
	*/
	var getHttp = function(){
		return 'https:' == document.location.protocol ? 'https://' : 'http://'; 
	}

	/**
	* @event.on登陆成功之后
	* @来源:http://passport.jd.com/new/misc/js/login.js?t=20130718
	* @来源:http://passport.jd.com/uc/popupLogin2013?clstag1=login&clstag2=login
	*/
	jdEvent.on('loginSuccessByIframe',function(result){
		setUserInfo({
			callback:function(data){
				$.closeDialog();
				//如果要避免二次验证的话要升级接口
				$.ajax({
					url:getHttp() +  "passport.jd.com/loginservice.aspx?callback=?",
					data:{method: "Login"},
					dataType:'json',
					success:function(result){
						if (result != null && result.Identity.IsAuthenticated) {
							jdEvent.trigger('loginSuccessCallback',result);
						}
					}
				});
			}
		})
	});

	var defaultOptions = {
		loginService: getHttp() + "passport.jd.com/loginservice.aspx?callback=?",
		loginMethod: "Login",
		loginUrl: getHttp() + "passport.jd.com/new/login.aspx",
		returnUrl: location.href,
		automatic: false,//是否走自己的回调
		complete: null,//回调函数
		modal: false,//false跳转,true显示登录注册弹层
		clstag1: 0,
		clstag2: 0,
		firstCheck: true//是否先检验一下,falase时不管是否登陆总是弹出浮层
	};

	/*
	*@login登录注册
	*@回调函数为complete
	*/
	var login = function(options) {

		options = $.extend({}, defaultOptions, options || {});
		
		/**
		* @登陆iframe浮层
		*/
		var iframe = {
			login: function() {
				var userAgent = navigator.userAgent.toLowerCase(),
					flag = (userAgent.match(/ucweb/i) == "ucweb" || userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4");
				if (flag) {
					location.href = options.loginUrl +"?ReturnUrl=" + escape(returnUrl);
					return;
				}

				$.closeDialog();
				this.loginDialog = $('body').dialog({
					title:'您尚未登录',
					width:410,
					height: 420,
					autoIframe: false,
					type:'iframe',
					fixed :true,
					mainId: 'loginDialogBody',
					source: "https://passport.jd.com/uc/popupLogin2013?clstag1=" + options.clstag1 + "&clstag2=" + options.clstag2 + "&r=" + Math.random(),
					autoUpdate: true
				});
				//$(window.frames["dialogIframe"].document).find('.login-box').focus();
			},
			regist: function() {
				$.closeDialog();
				this.registDialog = $('body').dialog({
					title:'您尚未登录',
					width:410,
					height: 470,
					type:'iframe',
					fixed :true,
					mainId: 'registDialogBody',
					source: "http://reg.jd.com/reg/popupPerson?clstag1=" + options.clstag1 + "&clstag2=" + options.clstag2 + "&r=" + Math.random(),
					autoUpdate: true
				});
				//$('#registDialogBody').focus();
			}
		}

		jdModelCallCenter.regist = function(){
			 iframe.regist();
		}

		jdModelCallCenter.login =  function(){
			 iframe.login();
		}

		jdModelCallCenter.init = function(result){
			 jdEvent.trigger('loginSuccessByIframe', result);
		}

		if (options.loginService != "" && options.loginMethod != "") {

			var callback = function (result){
				 if (result != null) {
					//走自己的回调
					if (options.automatic && options.complete != null) {
						options.complete(result);
					}

					//成功
					if (result.Identity.IsAuthenticated && options.complete != null && !options.automatic) {
						options.complete(result);
					}

					//未成功 ==> 弹层或者跳转
					if (!result.Identity.IsAuthenticated && options.loginUrl != "" && !options.automatic) {
						if (options.modal) {
							function loginSuccess(data){
								if (options.complete != null) {
									options.complete(data);
								}
							}
							
							if ( options.firstCheck ){
								//登录注册弹出层
								iframe.login();
								jdEvent.off('loginSuccessCallback');
								jdEvent.on('loginSuccessCallback', loginSuccess);
							}

							
						} else {
							//跳转
							location.href = options.loginUrl + "?ReturnUrl=" + escape(options.returnUrl)
						}
					}
				}
			};

			if ( options.firstCheck ){
				checkLogin(options, callback);
			}else{
				//登录注册弹出层
				iframe.login();
				jdEvent.on('loginSuccessCallback',function(data){
					if (options.complete != null) {
						options.complete(data);
					}
				});
			}
		}
	};

	function checkLogin(options, callback){
		$.getJSON(options.loginService, {
			method: options.loginMethod
		}, function(result) {
			callback(result);
		});
	}

	login.isLogin = function(options, callback){
		if ($.isFunction( options )) {
			callback = options;
			options = defaultOptions;
		} else {
			options = $.extend({}, defaultOptions, options || {});
		}
		if ( !$.isFunction(callback) ) {
			callback = function(){};
		}

		var _callback = function(result){
			if ( result && result.Identity ) {
				callback(result.Identity.IsAuthenticated, result);
			} else {
				callback(false, null);
			}
		};
		checkLogin(options, _callback);
	};

	return login;
});