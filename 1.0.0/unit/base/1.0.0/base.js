/**
 * @全局isdebug参数介绍
 *		-0 查看jdf js插件的引用
 *		-1 js加载不用combo
 *		-2 990窄版
 *		-30 取无痕埋点唯一id 2015-1-9
 *		-31 新首页样式combo调试模式 2015-1-9
 *		-32 lib-v1旧版 2015-1-13
 * @全局isdebug使用举例
 *		如js加载不用combo在浏览器url后面加?isdebug=-1或者?isdebug=-1-2使用-1和-2的debug
 */

/*
* @seajs v2.2.0
* @https://github.com/seajs/seajs
*/
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return A++}function e(a){return a.match(D)[0]}function f(a){for(a=a.replace(E,"/");a.match(F);)a=a.replace(F,"/");return a=a.replace(G,"$1/")}function g(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||".css"===a.substring(b-3)||"/"===c?a:a+".js"}function h(a){var b=v.alias;return b&&x(b[a])?b[a]:a}function i(a){var b=v.paths,c;return b&&(c=a.match(H))&&x(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=v.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(I,function(a,c){return x(b[c])?b[c]:a})),a}function k(a){var b=v.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=z(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charAt(0);if(J.test(a))c=a;else if("."===d)c=f((b?e(b):v.cwd)+a);else if("/"===d){var g=v.cwd.match(K);c=g?g[0]+a.substring(1):a}else c=v.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=j(a),a=g(a);var c=l(a,b);return c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c){var d=S.test(a),e=L.createElement(d?"link":"script");if(c){var f=z(c)?c(a):c;f&&(e.charset=f)}p(e,b,d,a),d?(e.rel="stylesheet",e.href=a):(e.async=!0,e.src=a),T=e,R?Q.insertBefore(e,R):Q.appendChild(e),T=null}function p(a,c,d,e){function f(){a.onload=a.onerror=a.onreadystatechange=null,d||v.debug||Q.removeChild(a),a=null,c()}var g="onload"in a;return!d||!V&&g?(g?(a.onload=f,a.onerror=function(){C("error",{uri:e,node:a}),f()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&f()},b):(setTimeout(function(){q(a,c)},1),b)}function q(a,b){var c=a.sheet,d;if(V)c&&(d=!0);else if(c)try{c.cssRules&&(d=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(d=!0)}setTimeout(function(){d?b():q(a,b)},20)}function r(){if(T)return T;if(U&&"interactive"===U.readyState)return U;for(var a=Q.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return U=c}}function s(a){var b=[];return a.replace(X,"").replace(W,function(a,c,d){d&&b.push(d)}),b}function t(a,b){this.uri=a,this.dependencies=b||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!a.seajs){var u=a.seajs={version:"2.2.0"},v=u.data={},w=c("Object"),x=c("String"),y=Array.isArray||c("Array"),z=c("Function"),A=0,B=v.events={};u.on=function(a,b){var c=B[a]||(B[a]=[]);return c.push(b),u},u.off=function(a,b){if(!a&&!b)return B=v.events={},u;var c=B[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete B[a];return u};var C=u.emit=function(a,b){var c=B[a],d;if(c)for(c=c.slice();d=c.shift();)d(b);return u},D=/[^?#]*\//,E=/\/\.\//g,F=/\/[^/]+\/\.\.\//,G=/([^:/])\/\//g,H=/^([^/:]+)(\/.+)$/,I=/{([^{]+)}/g,J=/^\/\/.|:\//,K=/^.*?\/\/.*?\//,L=document,M=e(L.URL),N=L.scripts,O=L.getElementById("seajsnode")||N[N.length-1],P=e(n(O)||M);u.resolve=m;var Q=L.getElementsByTagName("head")[0]||L.documentElement,R=Q.getElementsByTagName("base")[0],S=/\.css(?:\?|$)/i,T,U,V=+navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1")<536;u.request=o;var W=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,X=/\\\\/g,Y=u.cache={},Z,$={},_={},ab={},bb=t.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};t.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=t.resolve(b[d],a.uri);return c},t.prototype.load=function(){var a=this;if(!(a.status>=bb.LOADING)){a.status=bb.LOADING;var c=a.resolve();C("load",c);for(var d=a._remain=c.length,e,f=0;d>f;f++)e=t.get(c[f]),e.status<bb.LOADED?e._waitings[a.uri]=(e._waitings[a.uri]||0)+1:a._remain--;if(0===a._remain)return a.onload(),b;var g={};for(f=0;d>f;f++)e=Y[c[f]],e.status<bb.FETCHING?e.fetch(g):e.status===bb.SAVED&&e.load();for(var h in g)g.hasOwnProperty(h)&&g[h]()}},t.prototype.onload=function(){var a=this;a.status=bb.LOADED,a.callback&&a.callback();var b=a._waitings,c,d;for(c in b)b.hasOwnProperty(c)&&(d=Y[c],d._remain-=b[c],0===d._remain&&d.onload());delete a._waitings,delete a._remain},t.prototype.fetch=function(a){function c(){u.request(g.requestUri,g.onRequest,g.charset)}function d(){delete $[h],_[h]=!0,Z&&(t.save(f,Z),Z=null);var a,b=ab[h];for(delete ab[h];a=b.shift();)a.load()}var e=this,f=e.uri;e.status=bb.FETCHING;var g={uri:f};C("fetch",g);var h=g.requestUri||f;return!h||_[h]?(e.load(),b):$[h]?(ab[h].push(e),b):($[h]=!0,ab[h]=[e],C("request",g={uri:f,requestUri:h,onRequest:d,charset:v.charset}),g.requested||(a?a[g.requestUri]=c:c()),b)},t.prototype.exec=function(){function a(b){return t.get(a.resolve(b)).exec()}var c=this;if(c.status>=bb.EXECUTING)return c.exports;c.status=bb.EXECUTING;var e=c.uri;a.resolve=function(a){return t.resolve(a,e)},a.async=function(b,c){return t.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=z(f)?f(a,c.exports={},c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=bb.EXECUTED,C("exec",c),g},t.resolve=function(a,b){var c={id:a,refUri:b};return C("resolve",c),c.uri||u.resolve(c.id,b)},t.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,y(a)?(c=a,a=b):c=b),!y(c)&&z(d)&&(c=s(""+d));var f={id:a,uri:t.resolve(a),deps:c,factory:d};if(!f.uri&&L.attachEvent){var g=r();g&&(f.uri=g.src)}C("define",f),f.uri?t.save(f.uri,f):Z=f},t.save=function(a,b){var c=t.get(a);c.status<bb.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=bb.SAVED)},t.get=function(a,b){return Y[a]||(Y[a]=new t(a,b))},t.use=function(b,c,d){var e=t.get(d,y(b)?b:[b]);e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=Y[d[f]].exec();c&&c.apply(a,b),delete e.callback},e.load()},t.preload=function(a){var b=v.preload,c=b.length;c?t.use(b,function(){b.splice(0,c),t.preload(a)},v.cwd+"_preload_"+d()):a()},u.use=function(a,b){return t.preload(function(){t.use(a,b,v.cwd+"_use_"+d())}),u},t.define.cmd={},a.define=t.define,u.Module=t,v.fetchedList=_,v.cid=d,u.require=function(a){var b=t.get(t.resolve(a));return b.status<bb.EXECUTING&&b.exec(),b.exports};var cb=/^(.+?\/)(\?\?)?(seajs\/)+/;v.base=(P.match(cb)||["",P])[1],v.dir=P,v.cwd=M,v.charset="utf-8",v.preload=function(){var a=[],b=location.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2");return b+=" "+L.cookie,b.replace(/(seajs-\w+)=1/g,function(b,c){a.push(c)}),a}(),u.config=function(a){for(var b in a){var c=a[b],d=v[b];if(d&&w(d))for(var e in c)d[e]=c[e];else y(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),v[b]=c}return C("config",a),u}}}(this);

/**
* @seajs-combo v1.0.1
* @https://github.com/seajs/seajs-combo
*/
!function(){function a(a){var b=a.length;if(!(2>b)){q.comboSyntax&&(s=q.comboSyntax),q.comboMaxLength&&(t=q.comboMaxLength),n=q.comboExcludes;for(var d=[],e=0;b>e;e++){var f=a[e];if(!r[f]){var h=o.get(f);h.status<p&&!l(f)&&!m(f)&&d.push(f)}}d.length>1&&g(c(d))}}function b(a){a.requestUri=r[a.uri]||a.uri}function c(a){return e(d(a))}function d(a){for(var b={__KEYS:[]},c=0,d=a.length;d>c;c++)for(var e=a[c].replace("://","__").split("/"),f=b,g=0,h=e.length;h>g;g++){var i=e[g];f[i]||(f[i]={__KEYS:[]},f.__KEYS.push(i)),f=f[i]}return b}function e(a){for(var b=[],c=a.__KEYS,d=0,e=c.length;e>d;d++){for(var g=c[d],h=g,i=a[g],j=i.__KEYS;1===j.length;)h+="/"+j[0],i=i[j[0]],j=i.__KEYS;j.length&&b.push([h.replace("__","://"),f(i)])}return b}function f(a){for(var b=[],c=a.__KEYS,d=0,e=c.length;e>d;d++){var g=c[d],h=f(a[g]),i=h.length;if(i)for(var j=0;i>j;j++)b.push(g+"/"+h[j]);else b.push(g)}return b}function g(a){for(var b=0,c=a.length;c>b;b++)for(var d=a[b],e=d[0]+"/",f=j(d[1]),g=0,i=f.length;i>g;g++)h(e,f[g]);return r}function h(a,b){var c=a+s[0]+b.join(s[1]),d=c.length>t;if(b.length>1&&d){var e=i(b,t-(a+s[0]).length);h(a,e[0]),h(a,e[1])}else{if(d)throw new Error("The combo url is too long: "+c);for(var f=0,g=b.length;g>f;f++)r[a+b[f]]=c}}function i(a,b){for(var c=s[1],d=a[0],e=1,f=a.length;f>e;e++)if(d+=c+a[e],d.length>b)return[a.splice(0,e),a]}function j(a){for(var b=[],c={},d=0,e=a.length;e>d;d++){var f=a[d],g=k(f);g&&(c[g]||(c[g]=[])).push(f)}for(var h in c)c.hasOwnProperty(h)&&b.push(c[h]);return b}function k(a){var b=a.lastIndexOf(".");return b>=0?a.substring(b):""}function l(a){return n?n.test?n.test(a):n(a):void 0}function m(a){var b=q.comboSyntax||["??",","],c=b[0],d=b[1];return c&&a.indexOf(c)>0||d&&a.indexOf(d)>0}var n,o=seajs.Module,p=o.STATUS.FETCHING,q=seajs.data,r=q.comboHash={},s=["??",","],t=2e3;if(seajs.on("load",a),seajs.on("fetch",b),q.test){var u=seajs.test||(seajs.test={});u.uris2paths=c,u.paths2hash=g}define("seajs/seajs-combo/1.0.1/seajs-combo",[],{})}();

/**
* @base new
* @update 2013-12-26 14:34:06
* @update 2014-1-16 13:15:47
* @update 2014-1-23 11:49:12
* @update 2014-2-21 12:44:06
* @!!!备忘需要处理的事情和bug
* @1[已解决] jd.login中登陆和注册接口js需要修正上线_已处理过
* @2[已解决] jdj 拆分模块化加载
* @3[已解决] combo服务的问题
* @4[已解决] 首页(或者部分页面) 没有引用base.css(jdj和样式) 自动加载
* @5[已解决] 引用jdj样式的问题---异步加载具体怎么处理?
* @6[已解决] 我的京东hover有报错
* @7[已解决] 头部dropdown有bug
* @8[解决中]  更新svn上最新的lib-v1.js进业务组件内
* @9[已解决] 业务组件svn和线上路径规划
* @10[已解决] 底部版权信息lazyload还是老的,需要更新
* @11[已解决] 文件压缩方案
* @12[已解决] grunt和jdf的使用融合(不融合了)
* @13[解决中] jdj中的相互依赖问题(自由加载)
* @14[已解决] 本地,测试,后端引用文件依赖的路径处理
*/

/**
* @pageConfig
*/
window.pageConfig=window.pageConfig||{};

/**
* @使用自己项目本身的config
*/
if (typeof(pageConfig.autoConfig) == 'undefined') {
	pageConfig.autoConfig = true;
}

/**
* @ui.js预加载
*/
if (typeof(pageConfig.preload) == 'undefined') {
	pageConfig.preload = true;
}

/**
 * jdf版本
 */
if ( !pageConfig.jdfVersion ) {
	pageConfig.jdfVersion = '1.0.0';
}

if ( !pageConfig.jdfBaseUri ) {
	pageConfig.jdfBaseUri = 'http://misc.360buyimg.com/';
}

/**
* @seajs config
*/
if (pageConfig.autoConfig) {
	var preloadArray = pageConfig.preload ? ['jdf/'+pageConfig.jdfVersion+'/ui/ui/'+pageConfig.jdfVersion+'/ui.js'] : [];
	var seajsConfig = {
		// base:'http://fe.jd.com/code/code/',
		base:pageConfig.jdfBaseUri,
		alias:{},
		map:[],
		preload:preloadArray,
		debug:0
	};
	
	if ( location.hostname == 'localhost' || /isdebug=(-\d)*-1/.test(location.search) ) {
		//combo服务开关,url上增加?isdebug,会取消combo,方便调试
		seajsConfig.comboExcludes = /.*/;
	}
	
	seajs.config(seajsConfig);
}

/**
 * @dom ready
pageConfig.ready = (function() {
	var funcs = [];
	var ready = false;

	function handler(e) {
		if(ready) return;

		if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
			return;
		}

		for(var i=0; i<funcs.length; i++) {
			funcs[i].call(document);
		}
		ready = true;
		funcs = null;
	}
	if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', handler, false);
		document.addEventListener('readystatechange', handler, false);            //IE9+
		window.addEventListener('load', handler, false);
	}else if(document.attachEvent) {
		document.attachEvent('onreadystatechange', handler);
		window.attachEvent('onload', handler);
	}
	return function whenReady(fn) {
		if(ready) { fn.call(document); }
		else { funcs.push(fn); }
	}
})();
 */

/**
* @宽版
*/
pageConfig.wideVersion = (function(){
	if(/isdebug=(-\d)*-2/.test(location.search)){
		return false;
	}else{
		return (screen.width>=1210) && pageConfig.compatible;
	}
})();

if(pageConfig.wideVersion){
	//pageConfig.ready(function(){
		document.getElementsByTagName("html")[0].className="root61";
	//});
}

/**
* @获取当前域名

pageConfig.FN_getDomain = function() {
    var hn = location.hostname;
    return (/360buy.com/.test(hn)) ? "360buy.com" : "jd.com";
};

if (/jd\.com|360buy\.com/.test(location.hostname)) {
	document.domain=pageConfig.FN_getDomain();
}*/

pageConfig.FN_getDomain = function(){
    var hn = location.hostname;
    var loc = 'jd.com';

    if ( /jd.com/.test(hn) ) {
        loc = 'jd.com';
    } else if ( /jd360.hk/.test(hn) ) {
		loc = 'jd360.hk';
    } else if ( /jd.hk/.test(hn) ) {
        loc = 'jd.hk';
    } else if ( /360buy.com/.test(hn) ) {
        loc = '360buy.com';
    }
    return loc;
};

if (/jd\.com|360buy\.com|jd\.hk|jd360\.hk/.test(location.hostname)) {
	try{
		document.domain=pageConfig.FN_getDomain();
	} catch (e) {
		
	}
}

/**
* @按sku生成域名
*/
pageConfig.FN_GetImageDomain=function(a) {
	var b, a = String(a);
	switch (a.match(/(\d)$/)[1] % 5) {
	case 0:
		b = 10;
		break;
	case 1:
		b = 11;
		break;
	case 2:
		b = 12;
		break;
	case 3:
		b = 13;
		break;
	case 4:
		b = 14;
		break;
	default:
		b = 10;
	}
	return "http://img{0}.360buyimg.com/".replace("{0}", b);
};

/**
* @图片onerror style
*/
pageConfig.FN_ImgError=function(obj){
	var imgs=obj.getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		imgs[i].onerror=function(){
			var css="",
				type=this.getAttribute("data-img");
			if(!type){
				return;
			}
			switch(type){
				case "1":
					css="err-product";
					break;
				case "2":
					css="err-poster";
					break;
				case "3":
					css="err-price";
					break;
				default:
					return;
			}
			this.src="http://misc.360buyimg.com/lib/img/e/blank.gif";
			this.className=css;
		}
	}
};

/**
* @从数组中获取（加权）随机数据
* @for 热门搜索：http://www.jd.com/hotwords.aspx?Position=A-index-036
* @time 2014-3-24 16:35:25
*/
pageConfig.FN_GetRandomData=function(arr){
	var _temp=0,_random=0,_weight,_newArr=[];
	for (var i=0;i<arr.length;i++){
		_weight=arr[i].weight?parseInt(arr[i].weight):1;
		_newArr[i]=[];
		_newArr[i].push(_temp);
		_temp+=_weight;
		_newArr[i].push(_temp);
	}
	_random=Math.ceil(_temp*Math.random());
	for (var i=0;i<_newArr.length;i++){
		if(_random>_newArr[i][0]&&_random<=_newArr[i][1]){
			return arr[i]
		}
	}
};

/**
* @login
*/
var login = function () {
    location.href = "https://passport.jd.com/new/login.aspx?ReturnUrl=" + escape(location.href).replace(/\//g,"%2F");
    return false;
}

/**
* @regist
*/
var regist = function () {
    location.href = "https://reg.jd.com/reg/person?ReturnUrl=" + escape(location.href);
    return false;
}

/**
* @createCookie
*/
var createCookie = function (name, value, days, Tdom) {
    var Tdom = (Tdom) ? Tdom : "/";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else {
        var expires = ""
    }
    document.cookie = name + "=" + value + expires + "; path=" + Tdom
}

/**
* @readCookie
*/
var readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length)
        }
    }
    return null
}

/**
* @addToFavorite
*/
var addToFavorite = function () {
	var a = "http://www.jd.com/";
	var b = "京东JD.COM-网购上京东，省钱又放心";
	if (document.all) {
		window.external.AddFavorite(a, b);
	} else if (window.sidebar&&window.sidebar.addPanel) {
		window.sidebar.addPanel(b, a, "");
	} else {
		alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
	}
	createCookie("_fv","1",30,"/;domain=jd.com");
}

/**
 * @getHashProbability
 */
pageConfig.getHashProbability = function(strNum, baseNum) {
   var hashCode = function (str) {
		for (var result = 0, i = 0; i < str.length; i++) {
			result = (result << 5) - result + str.charCodeAt(i);
			result &= result;
		}
		return result;
	}
	return Math.abs(hashCode(strNum)) % baseNum;
};

/**
 * split css combo
 */
if(/isdebug=(-\d)*-1/.test(location.search)){
    (function(){
        function run () {
            var linkTags = document.getElementsByTagName('link');
            var link= null, cdf = null;
            for ( var i = 0; i < linkTags.length; i++ ) {
                var _this = linkTags[i];
                if ( !_this ) continue;
                var _href = _this.getAttribute('href');
                if ( !_href ) continue;
                var _w = _href.indexOf('??');
                var cssList = [];
                var cssRoot = '';
                if ( _w != -1 ) {
                    cdf = document.createDocumentFragment();
                    cssList = _href.substring(_w + 2).split(',');
                    cssRoot = _href.substring(0, _w);
                    if ( cssList.length ) {
                        for( var j = 0, len = cssList.length; j < len; j++ ){
                            if ( cssList[j].replace(/ /g) ) {
                                link = document.createElement("link");
                                link.type = 'text/css';
                                link.rel = 'stylesheet';
                                link.href = cssRoot + cssList[j];
                                cdf.appendChild(link);
                                i++
                            }
                        }
                        _this.parentNode.insertBefore(cdf, _this);
                        _this.parentNode.removeChild(_this);
                        i --;
                    }
                }
            }
        }
       var thread = setInterval(function(){
           if ( document.body ) {
               clearInterval(thread);
               run();
           }
       }, 10);
    })();
}