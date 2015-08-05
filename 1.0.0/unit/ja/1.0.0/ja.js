(function(window,document, screen, navigator){

    // -------------------------------- 部署前提 --------------------------------
    // 申请主域cookie mt_subsite
    // m端主域cookie pre_session, pre_seq

    function showDebugMsg(msg) {
        //alert(msg);
    }
    if (!window.console) {
        window.console = {};
        window.console.log = showDebugMsg;
        window.console.debug = showDebugMsg;
        window.console.info = showDebugMsg;
        window.console.warn = showDebugMsg;
        window.console.error = showDebugMsg;
    }
    // 页面需要包含此对象相关信息
    if (typeof jap === "undefined") {
        //console.info("页面接入新点击流的前提是需要提供一个jap对象, jap包含了页面上报所需的信息");
        jap = {
            siteId : 'JA2015_111145', //必填, 站点编号
            heatmapEnable : 0, //是否开启热力图
            jumpAppEnable : 1, //是否允许M页与APP做数据通信(自动向appurl追加cls参数), 0:不允许 1:允许
            account : '', //用户标识，默认由调用方传递, 未传递的情况下从pin取.
            skuid: '',  //单品页可以传递此参数
            shopid: '',
            orderid: '', //订单页可以传递此参数
            adsCookieName: '', //保存渠道信息的cookie的name, 如果站点为京东此值必须为mt_subsite
            openJA: 1, // wl.js根据此字段判断是否检测流量切分, 仅当openJA:1时才可能流转至ja.js
            extParams: {}, // 根据需要传递额外参数进行上报, m页会将此参数传递给app
            topic: '' // 主题参数
        };
    }

    function Store() {
        if (typeof Store._initialized == "undefined") {
            var domain = document.domain.replace(/.*?(\w+\.\w+)$/, "$1");
            var getCookie = function(name) {
                if (document.cookie.length > 0 && name) {
                    c_start = document.cookie.indexOf(name + "=");
                    if (c_start != -1) {
                        c_start = c_start + name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return decodeURIComponent(document.cookie.substring(c_start, c_end));
                    }
                }
                return "";
            };
            var setCookie = function(name, value, expireSeconds) {
                if (!name) return;
                var expires = "";
                if (expireSeconds) {
                    var exdate = new Date();
                    exdate.setTime(exdate.getTime() + expireSeconds*1000);
                    expires = ";expires=" + exdate.toGMTString();
                }
                document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/;domain=" + domain + ";";
            };
            var setLocalStorage = function (name, value) {
                window.localStorage.removeItem(name);
                window.localStorage.setItem(name,value);
            };
            var getLocalStorage = function (name) {
                return window.localStorage.getItem(name);
            };
            Store.prototype.setItem = function(name, value, expireSeconds) {
                setCookie(name, value, expireSeconds);
            };
            Store.prototype.getItem = function(name) {
                return getCookie(name);
            };
            Store._initialized = true;
        }
    }
    var store = new Store();

    if (typeof JSON !== 'object') {
        JSON = {};
    }
    (function () {
        function f(n) {
            return n < 10 ? '0' + n : n;
        }
        if (typeof Date.prototype.toJSON !== 'function') {
            Date.prototype.toJSON = function () {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                    : null;
            };
            String.prototype.toJSON      =
                Number.prototype.toJSON  =
                    Boolean.prototype.toJSON = function () {
                        return this.valueOf();
                    };
        }
        var cx,
            escapable,
            gap,
            indent,
            meta;
        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }
        function str(key, holder) {
            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];
            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
            switch (typeof value) {
                case 'string':
                    return quote(value);
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                case 'null':
                    return String(value);
                case 'object':
                    if (!value) {
                        return 'null';
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }
        if (typeof JSON.stringify !== 'function') {
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            };
            JSON.stringify = function (value, space) {
                var i;
                gap = '';
                indent = '';
                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }
                } else if (typeof space === 'string') {
                    indent = space;
                }
                return str('', {'': value});
            };
        }
        if (typeof JSON.parse !== 'function') {
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            JSON.parse = function (text) {
                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    return eval('(' + text + ')');
                }
                throw new SyntaxError('JSON.parse');
            };
        }
    }());

    // js version
    var ja_code_version = "1.1";

    // clstag
    var clstag_service_type_id = "cl";
    var clstag_service_version = 1.0;

    // 热力图
    var heatmap_service_type_id = "hm";
    var heatmap_service_version = 1.0;

    // pv
    var pv_service_type_id = "pv";
    var pv_service_version = 1.0;

    // jda,jdb,jdv,jdu 有效期(单位:秒)
    var _JdaExpireSeconds = 180 * 24 * 3600;
    var _JdbExpireSeconds = 1800;
    var _JdvExpireSeconds = 15 * 24 * 3600;
    var _JduExpireSeconds = 180 * 24 * 3600;
    var mtSubsiteExpireSeconds = 365 * 24 * 3600;

    // jda,jdb,jdc,jdu,jdv 自定义cookie名称
    var __cookie_jda = jap.__cookie_jda || "__jda";
    var __cookie_jdb = jap.__cookie_jdb || "__jdb";
    var __cookie_jdc = jap.__cookie_jdc || "__jdc";
    var __cookie_jdu = jap.__cookie_jdu || "__jdu";
    var __cookie_jdv = jap.__cookie_jdv || "__jdv";

    // log url && getUuid url
    var _log_url_  = ("https:" == document.location.protocol ? "https://venus" : "http://venus") + ".jd.com/log.gif";
    var _uuid_url_ = ("https:" == document.location.protocol ? "https://venus" : "http://venus") + ".jd.com/view-uuid";


    function isNumeric(obj) {
        return !(obj instanceof Array) && (obj - parseFloat(obj)+1)>=0;
    }
    function isInteger(obj) {
        return isNumeric(obj) && (obj%1===0);
    }
    function hash(str) {
        var rs = 1, curr = 0, pos;
        if (str) {
            rs = 0;
            for (pos = str.length - 1; pos >= 0; pos--)
                curr = str.charCodeAt(pos);
            rs = (rs << 6 & 268435455) + curr + (curr << 14);
            curr = rs & 266338304;
            rs = curr !== 0 ? (rs ^ curr >> 21) : rs;
        }
        return rs;
    }
    function flashChecker() {
        var hasFlash = 0; //是否安装了flash
        var flashVersion = 0; //flash版本
        var swf;
        var isIE =/*@cc_on!@*/0; //是否IE浏览器
        if (isIE) {
            swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                hasFlash = 1;
                flashVersion = swf.GetVariable("$version");
                if (flashVersion) {
                    var vio = flashVersion.split(" ")[1].split(",");
                    flashVersion = vio[0] + "." + vio[1] + " r" + vio[2];
                }
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    flashVersion = swf.description.split(" ");
                    if (flashVersion && flashVersion.length >= 4) {
                        flashVersion = flashVersion[2] + " " + flashVersion[3];
                    }
                }
            }
        }
        return {
            f: hasFlash,
            v: flashVersion // 统一格式 "15.0 r0"
        };
    }
    function getParameter(url, name) {
        var f = new RegExp('(?:^|&|[\?]|[\/])' + name + '=([^&]*)');
        var result = f.exec(url);
        return result ? decodeURIComponent(result[1]) : null;
    }
    function appendParameter(url, key, value, needEncodeValue) {
        var join_sign = "?";
        if (url.lastIndexOf(join_sign) > 0) {
            join_sign = "&";
        }
        return url + join_sign + key + "=" +(needEncodeValue ? encodeURIComponent(value) : value);
    }
    function removeParameter(url, name) {
        if (!url) return url;
        var f = new RegExp('(?:^|&|[\?]|[\/])' + name + '=([^&]*)');
        url = url.replace(f, "");
        if (url.indexOf("?") < 0 && url.indexOf("&") >= 0) {
            var idx = url.indexOf("&");
            url = url.substring(0, idx) + "?" + url.substring(idx + 1, url.length);
        }
        return url;
    }
    function join(args, separator) {
        if (!separator) separator = '|||';
        if (args instanceof Array) {
            var argstring = '';
            for (var i = 0, len = args.length; i < len; i++) {
                argstring += args[i] + ((i == len - 1) ? '' : separator);
            }
            return argstring;
        }
        return args;
    }
    function getSkuid() {
        var skuid;
        if (typeof pageConfig != "undefined") {
            skuid = pageConfig.product ? pageConfig.product.skuid : 0;
        }
        return skuid || '';
    }
    function getShopid() {
        var shopid;
        if (typeof pageConfig != "undefined") {
            shopid = pageConfig.product ? pageConfig.product.shopId : 0;
        }
        return shopid || '';
    }
    function getOrderid() {
        var orderid;
        if (typeof SucInfo_OrderId != "undefined") {
            orderid = SucInfo_OrderId;
        } else {
            orderid = getParameter(document.location.href, 'suc_orderid');
        }
        return orderid || '';
    }
    // 获得域哈希值
    function getHashDomain() {
        var domain = document.domain.replace(/.*?(\w+\.\w+)$/, "$1");
        return hash(domain);
    }
    // uuid 生成算法
    function getUuid() {
        return Math.round(Math.random() * 2147483647) ^ Ic() & 2147483647;
    }
    function Hc() {
        var a = {}, b = window.navigator, c = window.screen;
        a.D = c ? c.width + "x" + c.height : "";
        a.C = c ? c.colorDepth + "-bit" : "";
        a.language = (b && (b.language || b.browserLanguage) || "").toLowerCase();
        a.javaEnabled = b && b.javaEnabled() ? 1 : 0;
        a.characterSet = document.characterSet || document.charset || "";
        return a;
    }
    function Ic() {
        var Fc = Hc();
        var n = window.navigator;
        var a = n.appName + n.version + Fc.language + n.platform + n.userAgent + Fc.javaEnabled + Fc.D + Fc.C + (document.cookie ? document.cookie : "") + (document.referrer ? document.referrer : "");
        var b = a.length;
        var c = window.history.length;
        while (c > 0)
            a += c-- ^ b++;
        return hash(a);
    }
    // 不以http://开头
    function isNotStartWithHttp(url) {
        return !(/^http[s]?:\/\//i.test(url));
    }
    // 不以javascript://开头
    function isNotStartWithJavascript(url) {
        return !(/^javascript:\/\//i.test(url));
    }
    // 不以file://开头
    function isNotStartWithFile(url) {
        return !(/^file:\/\//i.test(url));
    }
    // 不以#开头
    function isNotStartWithWellNumber(url) {
        return !(/^#/i.test(url));
    }
    // 包含冒号
    function hasContainedColon(url) {
        return (/:\/\//.test(url));
    }
    function escapeQuote(str) {
        return str.replace(/"/g, '\\"');
    }
    function unescapeQuote(str) {
        return str.replace(/\\"/g, '"');
    }

    var jsonp = (function(window){
        var extend = function(obj, attrs){
            for(var name in attrs){
                obj[name] = attrs[name];
            }
        };

        var Class = {
            create: function(class_define){
                var class_ = function(){};
                extend(class_, class_define);
                class_.create = function(attrs){
                    var obj = new class_();
                    extend(obj, attrs);
                    if (obj.init) {
                        obj.init();
                    }
                    return obj;
                };
                return class_;
            }
        };

        var Request = Class.create({
            prototype:{
                on_complete:function(){
                    if(window[this.id]) {
                        window[this.id] = null;
                    }
                },
                on_failed: function() {
                    if (this.failed) {
                        this.failed();
                        this.failed = null;
                    }
                },
                on_timeout:function(){
                    this.js.onload( undefined, true );
                },
                init:function(){
                    var request = this, script = this.js, timeoutTimer;
                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function( _, isAbort ) {
                        if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ){
                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;
                            // Remove the script
                            /*if ( script.parentNode ) {
                             script.parentNode.removeChild( script );
                             }*/
                            // Dereference the script
                            script = null;
                            // Callback if not abort
                            if ( !isAbort ) {
                                // Clear timeout if it exists
                                if ( timeoutTimer ) {
                                    clearTimeout( timeoutTimer );
                                }
                                request.on_complete();
                            } else {
                                request.on_failed();
                            }
                        }
                    };
                    // if failed callback exists
                    if (request.failed) {
                        timeoutTimer = setTimeout(function(){
                            request.on_timeout();
                        }, request.timeout);
                    }
                }
            }
        });

        var jsonp_imp = function(url, success, failed, timeout, charset) {
            var head = document.getElementsByTagName('head')[0],
                js = document.createElement('script');
            js.async = true;
            if (!charset) {
                charset = 'utf-8';
            }
            var id = "ja_cls_jsonp"+jsonp.guid++;
            var re = /^[0-9]+.?[0-9]*$/;
            if(!(timeout && re.test(timeout))) {
                timeout = jsonp.request_timeout * 1000;
            }
            finalUrl = url.replace('callback=?','callback=' + id);
            var now = new Date();
            var request = Request.create({
                id: id,
                url: finalUrl,
                charset: charset,
                failed: failed,
                success: success,
                js: js,
                stat_time: now,
                timeout: timeout
            });
            window[id] = success;
            js.charset = charset;
            js.src = finalUrl;
            head.appendChild(js);
            return id;
        };

        var jsonp = function () {
            jsonp_imp.apply(null, arguments);
        };

        extend(jsonp, {
            guid:0,
            requests:{},
            avail_tag:[],
            request_timeout: 5 //seconds
        });

        return jsonp;
    })(window);

    //数据解析模块,写入jda,jdb,jdv --------------------------------------------------start
    var siteId = jap.siteId || 'JA2015_111145',
        account = jap.account || store.getItem('pin'),
        pinId = store.getItem('pinId') || '',
        topic = jap.topic || 'traffic-oth',
        adsCookieName = jap.adsCookieName || '',
        ads = '',
        pre_app = '',
        extParams = (jap.extParams && typeof jap.extParams === 'object') ? escapeQuote(JSON.stringify(jap.extParams)) : '',
        domain = document.domain.replace(/.*?(\w+\.\w+)$/, "$1"),
        currentTime = Math.round(new Date().getTime()/1000),
        pageTitle = document.title,
        refererUrl = document.referrer,
        currentUrl = document.location.href,
        browserInfo = (function () {
            var b = { name: "other", version: "0" }, ua = navigator.userAgent.toLowerCase();
            browserRegExp = {
                se360: /360se/,
                se360_2x: /qihu/,
                ie: /msie[ ]([\w.]+)/,
                firefox: /firefox[|\/]([\w.]+)/,
                chrome: /chrome[|\/]([\w.]+)/,
                safari: /version[|\/]([\w.]+)(\s\w.+)?\s?safari/,
                opera: /opera[|\/]([\w.]+)/
            };
            for (var i in browserRegExp) {
                var match = browserRegExp[i].exec(ua);
                if (match) {
                    b.name = i;
                    b.version = match[1] || "0";
                    break;
                }
            }
            return b;
        })(),
        browserName = browserInfo.name,
        browserVersion  = browserInfo.version,
        os = (function () {
            var o = /(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());
            return o === null ? "other" : o[0];
        })(),
        screenResolution = screen ? screen.width + "x" + screen.height : "",
        colorDeep = screen ? screen.colorDepth + "-bit" : "",
        language = (navigator && (navigator.language || navigator.browserLanguage) || "").toLowerCase(),
        javaEnabled = navigator && navigator.javaEnabled() ? '1' : '0',
        charset = document.characterSet || document.charset || "",
        visitTimes = 1,
        sequenceNum = 0,
        jda = (store.getItem(__cookie_jda)||'').split('.'),
        jdb = (store.getItem(__cookie_jdb)||'').split('.'),
        jdv = (store.getItem(__cookie_jdv)||'').split('|'),
        jdu = (store.getItem(__cookie_jdu)||''),
        jdc = (store.getItem(__cookie_jdc)||''),
        firstSessionCreateTime, prevVisitCreateTime, uuid, all_uuid, hashDomain, utm_source="direct", utm_campaign="-", utm_medium="none", utm_term="-", flash_ver="";

    // 从jda获得初始值,如果jda不存在使用默认值. [hash_domain, uuid, firstSessionCreateTime, prevVisitCreateTime, currentTime, visitTimes]
    if(jda.length>5) {
        hashDomain = jda[0];
        uuid = isInteger(jda[1]) ? jda[1] : null;
        firstSessionCreateTime = jda[2];
        prevVisitCreateTime = jda[3];
        visitTimes = isInteger(jda[5]) ? jda[5]*1 : visitTimes;
    } else {
        uuid = getUuid();
        firstSessionCreateTime = currentTime;
        prevVisitCreateTime = currentTime;
    }
    // 从jdb获得初始值,如果jdb不存在使用默认值, [hash_domain, sequenceNum, uuid|visitTimes, currentTime]
    if(jdb.length>3) {
        hashDomain = jdb[0];
        sequenceNum = isInteger(jdb[1]) ? jdb[1]*1 : 0;
    }
    // 从jdv获得初始值,如果jdv不存在使用默认值, [hash_domain|utm_source|utm_campaign|utm_medium|utm_term]
    if (jdv.length>4) {
        hashDomain = jdv[0];
        utm_source = jdv[1];
        utm_campaign = jdv[2];
        utm_medium = jdv[3];
        utm_term = jdv[4];
    }
    // 从jdu获得all_uuid初始值,否则undefined
    if (jdu && jdu !== '') {
        all_uuid = jdu;
    }
    // 从jdc获得hashdomain初始值,否则undefined
    if (jdc && jdc !== '') {
        hashDomain = jdc;
    }
    // 从url参数  获取渠道信息utm, 更新访次\访次时间等信息, 用于jda,jdb,jdv
    var umz = [];
    var isNewSession = jdb.length < 4;
    var utsr = getParameter(currentUrl, 'utm_source');
    if (utsr) {
        var camp = getParameter(currentUrl, 'utm_campaign'),
            medi = getParameter(currentUrl, 'utm_medium'),
            term = getParameter(currentUrl, 'utm_term');
        umz.push(utsr || utm_source);
        umz.push(camp || utm_campaign);
        umz.push(medi || utm_medium);
        umz.push(term || utm_term);
        utm_term = umz[3];
    } else {
        var search = "baidu:wd,baidu:word,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(",");
        var sign = true;
        var rdomain = refererUrl && refererUrl.split("/")[2];
        if (rdomain && rdomain.indexOf(domain) < 0) {
            for (var i = 0; i < search.length; i++) { // 搜索
                var e = search[i].split(":");
                if (rdomain.indexOf( e[0].toLowerCase() ) > -1 && refererUrl.indexOf( (e[1]+"=").toLowerCase() ) > -1) {
                    var word = getParameter(refererUrl, e[1]);
                    umz.push(e[0]);
                    umz.push('-');
                    umz.push('organic');
                    umz.push(word || 'not set');
                    utm_term = umz[3];
                    sign = false;
                    break;
                }
            }
            if (sign) {
                if (rdomain.indexOf('zol.com.cn') > -1) {
                    umz.push('zol.com.cn');
                    umz.push('-');
                    umz.push('cpc');
                    umz.push('not set');
                } else { // 引荐
                    umz.push(rdomain);
                    umz.push('-');
                    umz.push('referral');
                    umz.push('-');
                }
            }
        }
    }
    if (isNewSession || (!isNewSession && umz.length > 0 && (umz[0] !== utm_source || umz[1] !== utm_campaign || umz[2] !== utm_medium) && umz[2] !== 'referral')) {
        utm_source = umz[0] || utm_source;
        utm_campaign = umz[1] || utm_campaign;
        utm_medium = umz[2] || utm_medium;
        utm_term = umz[3] || utm_term;
        if (jda.length>5) {
            firstSessionCreateTime = jda[2];
            prevVisitCreateTime = jda[4];
            visitTimes ++;
            sequenceNum = 1;
        } else {
            visitTimes = 1;
            sequenceNum = 1;
        }
    } else {
        sequenceNum ++;
    }
    // app向m页传参 ---------------------------------------------start  优先级最高, 会覆盖之前的计算结果
    var preSession, preSeqnum;
    var appClsParam = getParameter(currentUrl, "__clsparam");
    if (appClsParam) {
        var appClsParamObj = JSON.parse(appClsParam);
        if (appClsParam && typeof appClsParamObj === "object") {
            preSession = decodeURIComponent(appClsParamObj.pre_session||"");
            preSeqnum  = decodeURIComponent(appClsParamObj.pre_seq||"");
            utm_source = decodeURIComponent(appClsParamObj.usc||"");
            utm_campaign = decodeURIComponent(appClsParamObj.ucp||"");
            utm_medium = decodeURIComponent(appClsParamObj.umd||"");
            utm_term = decodeURIComponent(appClsParamObj.utr||"");
            refererUrl = decodeURIComponent(appClsParamObj.refer||"");
            account = decodeURIComponent(appClsParamObj.pin||"");
            pinId = decodeURIComponent(appClsParamObj.pinid||"");
            adsCookieName = decodeURIComponent(appClsParamObj.adk||"");
            ads = decodeURIComponent(appClsParamObj.ads||"");
            pre_app = decodeURIComponent(appClsParamObj.pre_app||"");
        }
    }
    if (preSession && preSeqnum) {
        store.setItem("pre_session", preSession);
        store.setItem("pre_seq", preSeqnum);
    } else {
        preSession = store.getItem("pre_session") || "";
        preSeqnum  = store.getItem("pre_seq") || "";
    }
    // app向m页传参 ---------------------------------------------end
    // 计算域哈希值
    if (!hashDomain) {
        hashDomain = getHashDomain();
    }
    // 写入jda, jdb, jdv, jdc, jdu(全网uuid->all_uuid)
    store.setItem(__cookie_jda, [hashDomain, uuid, firstSessionCreateTime||'-', prevVisitCreateTime||'-', currentTime, visitTimes||1].join('.'), _JdaExpireSeconds);
    store.setItem(__cookie_jdb, [hashDomain, sequenceNum||1, uuid+'|'+(visitTimes||1), currentTime].join('.'), _JdbExpireSeconds);
    store.setItem(__cookie_jdv, [hashDomain, utm_source||'direct', utm_campaign||'-', utm_medium||'none', utm_term||'-'].join('|'), _JdvExpireSeconds);
    store.setItem(__cookie_jdc, hashDomain);
    if (all_uuid) {
        store.setItem(__cookie_jdu, all_uuid, _JduExpireSeconds);
    } else {
        jsonp(_uuid_url_+"?callback=?",
            function(data){
                if (data && data.auuid) {
                    store.setItem(__cookie_jdu, data.auuid, _JduExpireSeconds);
                }
            },
            function(){},
            500,
            'utf-8'
        );
    }

    // flash 版本
    var fls = flashChecker();
    if (fls.f) flash_ver = fls.v;
    // 通用数据,上报数据时大部分字段值通过此对象获取.
    var jaCommonData = {
        siteId: siteId,
        account: account,
        pinId: pinId,
        domain: domain,
        currentTime: currentTime,
        pageTitle: pageTitle,
        refererUrl: refererUrl,
        currentUrl: currentUrl,
        browserName: browserName,
        browserVersion: browserVersion,
        os: os,
        screenResolution: screenResolution,
        colorDeep: colorDeep,
        language: language,
        javaEnabled: javaEnabled,
        charset: charset,
        firstSessionCreateTime: firstSessionCreateTime,
        prevVisitCreateTime: prevVisitCreateTime,
        visitTimes: visitTimes,
        sessionId: uuid+'|'+visitTimes,
        sequenceNum: sequenceNum,
        jda: jda,
        jdb: jdb,
        jdv: jdv,
        skuid: jap.skuid || getSkuid(),
        orderid: jap.orderid || getOrderid(),
        shopid: jap.shopid || getShopid(),
        utm_source: utm_source,
        utm_campaign: utm_campaign,
        utm_medium: utm_medium,
        utm_term: utm_term,
        flash_ver: flash_ver,
        preSession: preSession,
        preSeqnum: preSeqnum,
        uuid: uuid,
        all_uuid: all_uuid,
        adsCookieName: adsCookieName,
        ads: ads, // 仅存储app->m传递的渠道信息
        pre_app: pre_app,
        extParams: extParams,
        topic: topic
    };
    //数据解析模块,写入jda,jdb,jdv --------------------------------------------------start


    // 统一上报接口,编码参数,组织上报url,发送上报请求.
    function log(logType, logVersion, serviceFieldsObj) {
        var logtt = "ot";
        if (logType === "pv" || logType === "cl") {
            logtt = logType;
        }
        var serviceFieldsJson = JSON.stringify(serviceFieldsObj);
        var logurl = _log_url_ + "?ut=s&d=web" +
            "&lgt=" + encodeURIComponent(logType) +
            "&lgv=" + encodeURIComponent(logVersion) +
            "&sfj=" + encodeURIComponent(serviceFieldsJson) +
            "&uid=" + encodeURIComponent(jaCommonData.uuid) +
            "&pid=" + encodeURIComponent(jaCommonData.pinId) +
            "&cul=" + encodeURIComponent(jaCommonData.currentUrl) +
            "&ref=" + encodeURIComponent(jaCommonData.refererUrl) +
            "&pin=" + encodeURIComponent(jaCommonData.account) +
            "&ws="  + encodeURIComponent(jaCommonData.siteId) +
            "&vt="  + encodeURIComponent(jaCommonData.visitTimes) +
            "&sn="  + encodeURIComponent(jaCommonData.sequenceNum) +
            "&cut=" + encodeURIComponent(Math.round(new Date().getTime()/1000)) +
            "&tpc=" + encodeURIComponent(jaCommonData.topic+"."+logtt);
        var d = new Image(1, 1);
        d.src = logurl;
        d.onload = function () {
            d.onload = null;
            d.onerror = null;
        };
        d.onerror = function () {
            d.onload = null;
            d.onerror = null;
        };
    }


    // 点击流业务 ---------------------------------------start
    var jaService = {};

    // 自定义上报
    jaService.lg = function(logType, logVersion, serviceDataJsonObj) {
        var ads = store.getItem(jaCommonData.adsCookieName);
        var serviceFieldsObj = {};
        if (ja_code_version) serviceFieldsObj.jvr=ja_code_version;
        if (jaCommonData.utm_source) serviceFieldsObj.usc=jaCommonData.utm_source;
        if (jaCommonData.utm_campaign) serviceFieldsObj.ucp=jaCommonData.utm_campaign;
        if (jaCommonData.utm_medium) serviceFieldsObj.umd=jaCommonData.utm_medium;
        if (jaCommonData.utm_term) serviceFieldsObj.utr=jaCommonData.utm_term;
        if (jaCommonData.adsCookieName) serviceFieldsObj.adk=jaCommonData.adsCookieName;
        if (ads) serviceFieldsObj.ads = ads;
        if (serviceDataJsonObj && typeof serviceDataJsonObj === 'object') {
            for(var name in serviceDataJsonObj){
                serviceFieldsObj[name] = serviceDataJsonObj[name];
            }
        }
        log(logType, logVersion, serviceFieldsObj);
    };
    window.lg = jaService.lg; // 暴露lg方法,用于自定义上报

    // heatmap
    jaService.logHeatmap = function(clsid, x, y, offset_left) {
        var ads = store.getItem(jaCommonData.adsCookieName);
        var serviceFieldsObj = {};
        if (ja_code_version) serviceFieldsObj.jvr=ja_code_version;
        if (jaCommonData.utm_source) serviceFieldsObj.usc=jaCommonData.utm_source;
        if (jaCommonData.utm_campaign) serviceFieldsObj.ucp=jaCommonData.utm_campaign;
        if (jaCommonData.utm_medium) serviceFieldsObj.umd=jaCommonData.utm_medium;
        if (jaCommonData.utm_term) serviceFieldsObj.utr=jaCommonData.utm_term;
        if (jaCommonData.adsCookieName) serviceFieldsObj.adk=jaCommonData.adsCookieName;
        if (ads) serviceFieldsObj.ads = ads;
        if (clsid) serviceFieldsObj.cls = clsid;
        if (x) serviceFieldsObj.x = String(x);
        if (y) serviceFieldsObj.y = String(y);
        if (document.body.scrollWidth) serviceFieldsObj.scw = String(document.body.scrollWidth);
        if (document.body.scrollHeight) serviceFieldsObj.sch = String(document.body.scrollHeight);
        if (offset_left) serviceFieldsObj.ofl = String(offset_left);
        log(heatmap_service_type_id, heatmap_service_version, serviceFieldsObj);
    };
    // clstag
    jaService.logClstag = function(clsid, tar_url) {
        var ads = store.getItem(jaCommonData.adsCookieName);
        var serviceFieldsObj = {};
        if (clsid) serviceFieldsObj.cls = clsid;
        if (tar_url) serviceFieldsObj.tar = tar_url;
        if (ja_code_version) serviceFieldsObj.jvr=ja_code_version;
        if (jaCommonData.screenResolution) serviceFieldsObj.scr=jaCommonData.screenResolution;
        if (jaCommonData.utm_source) serviceFieldsObj.usc=jaCommonData.utm_source;
        if (jaCommonData.utm_campaign) serviceFieldsObj.ucp=jaCommonData.utm_campaign;
        if (jaCommonData.utm_medium) serviceFieldsObj.umd=jaCommonData.utm_medium;
        if (jaCommonData.utm_term) serviceFieldsObj.utr=jaCommonData.utm_term;
        if (jaCommonData.adsCookieName) serviceFieldsObj.adk=jaCommonData.adsCookieName;
        if (ads) serviceFieldsObj.ads = ads;
        log(clstag_service_type_id, clstag_service_version, serviceFieldsObj);
    };
    // pv
    jaService.logPv = function() {
        var ads = store.getItem(jaCommonData.adsCookieName);
        var load_time = 0;
        if (typeof jdpts != "undefined" && jdpts._st)
            load_time = jaCommonData.currentTime*1000-jdpts._st;
        var serviceFieldsObj = {};
        if (jaCommonData.os) serviceFieldsObj.osp=jaCommonData.os;
        if (ja_code_version) serviceFieldsObj.jvr=ja_code_version;
        if (jaCommonData.screenResolution) serviceFieldsObj.scr=jaCommonData.screenResolution;
        if (jaCommonData.colorDeep) serviceFieldsObj.clr=jaCommonData.colorDeep;
        if (jaCommonData.browserName) serviceFieldsObj.bst=jaCommonData.browserName;
        if (jaCommonData.browserVersion) serviceFieldsObj.bsv=jaCommonData.browserVersion;
        if (jaCommonData.firstSessionCreateTime) serviceFieldsObj.fst=jaCommonData.firstSessionCreateTime;
        if (jaCommonData.prevVisitCreateTime) serviceFieldsObj.pst=jaCommonData.prevVisitCreateTime;
        if (jaCommonData.currentTime) serviceFieldsObj.vct=jaCommonData.currentTime;
        if (load_time) serviceFieldsObj.ldt = String(load_time);
        if (jaCommonData.language) serviceFieldsObj.bsl=jaCommonData.language;
        if (jaCommonData.charset) serviceFieldsObj.bsc=jaCommonData.charset;
        if (jaCommonData.javaEnabled) serviceFieldsObj.jav=jaCommonData.javaEnabled;
        if (jaCommonData.flash_ver) serviceFieldsObj.flv=jaCommonData.flash_ver;
        if (jaCommonData.pageTitle) serviceFieldsObj.tit=jaCommonData.pageTitle;
        if (jaCommonData.utm_source) serviceFieldsObj.usc=jaCommonData.utm_source;
        if (jaCommonData.utm_campaign) serviceFieldsObj.ucp=jaCommonData.utm_campaign;
        if (jaCommonData.utm_medium) serviceFieldsObj.umd=jaCommonData.utm_medium;
        if (jaCommonData.utm_term) serviceFieldsObj.utr=jaCommonData.utm_term;
        if (jaCommonData.skuid) serviceFieldsObj.sku=String(jaCommonData.skuid);
        if (jaCommonData.orderid) serviceFieldsObj.ord=String(jaCommonData.orderid);
        if (jaCommonData.shopid) serviceFieldsObj.shp=String(jaCommonData.shopid);
        if (jaCommonData.preSession) serviceFieldsObj.psn=jaCommonData.preSession;
        if (jaCommonData.preSeqnum) serviceFieldsObj.psq=jaCommonData.preSeqnum;
        if (jaCommonData.adsCookieName) serviceFieldsObj.adk=jaCommonData.adsCookieName;
        if (ads) serviceFieldsObj.ads = ads;
        if (jaCommonData.pre_app) serviceFieldsObj.pap=jaCommonData.pre_app;
        if (jaCommonData.extParams) serviceFieldsObj.ext=jaCommonData.extParams;
        log(pv_service_type_id, pv_service_version, serviceFieldsObj);
    };
    // 点击流业务 ---------------------------------------end


    // heatmap && clstag ---------------------------------------------start
    function isMeta(e) {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return true;
        var which = e.which, button = e.button;
        if (!which && button !== undefined) {
            return (!button & 1) && (!button & 2) && (button & 4);
        } else if (which === 2) {
            return true;
        } else if (button === 2) {
            return true;
        }
        return false;
    }
    // 点击触发后上报clstag和热力图信息
    document.onclick = function (e) {
        e = e || event;
        var tag = e.srcElement || e.target;
        var el = tag;
        var clstag = tag.getAttribute('clstag');
        while (!clstag && (tag.nodeName != 'BODY') && (tag.nodeName != 'HTML')) {
            tag = tag.parentNode;
            if (!tag || (tag.nodeName == 'BODY') && (tag.nodeName != 'HTML')) {
                break;
            }
            clstag = tag.getAttribute('clstag');
        }
        var clsid;
        if (clstag) {
            var clstagPart = clstag.split('|'), keycount = clstagPart[1], type1 = clstagPart[2], type2 = clstagPart[3];
            if (keycount === 'keycount') {
                clsid = type1 + "|||" + type2;
                var tar_url = el.getAttribute("href");
                jaService.logClstag(clsid, tar_url);
                if (tar_url && /http:\/\/.*?/.exec(tar_url) && el.getAttribute("target") !== '_blank' && !isMeta(e)) {
                    if (e.preventDefault)
                        e.preventDefault();
                    else
                        e.returnValue = false;
                    setTimeout(function () {
                        window.location.href = tar_url;
                    }, 200);
                }
            }
        }
        var locationhost = window.location.hostname.toLowerCase();
        if (jap.heatmapEnable && /(sale|mall|jmall|pop|bdp).(jd|360buy).com/.test(locationhost)) {
            var x=0, y=0;
            if(e.pageX || e.pageY){
                x=e.pageX; y=e.pageY;
            } else {
                x=e.clientX + document.body.scrollLeft - document.body.clientLeft;
                y=e.clientY + document.body.scrollTop - document.body.clientTop;
            }
            var contentWidth = window.screen.width >= 1210 ? 1210 : 990;
            var offset_left = document.body.clientWidth>contentWidth ? Math.round((document.body.clientWidth-contentWidth)/2) : 0 ; // 左边空白宽度
            jaService.logHeatmap(clsid, x, y, offset_left);
        }
    };
    // heatmap && clstag ---------------------------------------------end


    // m与app之间传参----------------------------------start
    // 向app目标url追加cls参数
    function appendClsParamToAppLink(target_url) {
        //console.info("原始url跳转至: " + target_url);
        var __clsparam = getParameter(target_url, "__clsparam");
        if (__clsparam)
            return target_url; // 如果已存在该参数则直接返回,通常不会发生
        var crtUrl = jaCommonData.currentUrl;
        crtUrl = removeParameter(crtUrl, "__clsparam");
        var obj = {
            pre_session: encodeURIComponent(jaCommonData.sessionId),
            pre_seq: encodeURIComponent(jaCommonData.sequenceNum),
            usc: encodeURIComponent(jaCommonData.utm_source),
            ucp: encodeURIComponent(jaCommonData.utm_campaign),
            umd: encodeURIComponent(jaCommonData.utm_medium),
            utr: encodeURIComponent(jaCommonData.utm_term),
            refer: encodeURIComponent(crtUrl),
            adk: encodeURIComponent(jaCommonData.adsCookieName),
            ads: encodeURIComponent(store.getItem(jaCommonData.adsCookieName) || "")
        };
        //target_url = appendParameter(target_url, "se", "ADC_1uKFZgZoePJGWl4Hvnf25UXKmJP/+Fo0mlnVMlDHu57QQ3PKOcr4pdt+JjMWbVwdDrSWmVtmWI75yXR9lmitZRlmTOWMNI6YT0e9V3nxgNskeqYBsjdiqGuuwLmIVJXcd1iI/fhUXue04Us2NCoKslheEPD1wj0mJcll0HCs8n2wctNpFXoZsxcZBCbsJCkmM0frTUltl2+Iqc9biSfWMJmUx+C0wYINnjTy2wSk550cJdz37MvHS/GxrunQaUI7713K/HU/RLzwd14VzakiHZTtkYgV61ZFkX9chD9PMvpsfxiNuVOVLtc36uU+ly+UkVoMWovPTTbz025GVjsBA77S0XkpX65rnL24NTgJ/1AenkCAU5Z1s5UqyeCx+t2ddRTXHvtuvxtY5ZxtBSHUNmano3mcBSsGXJCCiiv4+YQ50Tb781ReRVyFXYnZg4W66MRRwGgxz69CWBWMbH+8TvgODdkkTMBIZTUfTjMcmDermouuu7qS6/YGOYrOaut95TJCKoxAJdNU0L83J9LBBGHjxfuAjE99ytsMuJxPn9O9CGTd4cx0deECs/wR9ecLKLcVXy5X3cUoYNZ2yLW8eDulqgpHGK0kZWU5lYsI1hasvNIUrT/nSZEefkTR4/Dey/hJSY06KH2Ja3Sq9ZTpFOZFupGiW3Kai3QSy/WymRollC4+vHE5SKQaxsQqAPdTUkWLkaeudb5KNUe5O2UU/g==");
        target_url = appendParameter(target_url, "__clsparam", JSON.stringify(obj));
        return target_url;
    }
    // 截获appUrl点击,追加cls参数后跳转
    function appLinkHandler(e) {
        var hrf = this.getAttribute("href");
        e = e || event;
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        hrf = appendClsParamToAppLink(hrf);
        window.location.href = hrf;
    }
    // 给每个appUrl绑定处理事件
    if (jap.jumpAppEnable) {
        var applinks = document.getElementsByTagName("a");
        for (var i=0, len=applinks.length; i<len; i++) {
            var lk = applinks[i];
            if ("A" !== lk.tagName) continue;
            var hrf = lk.getAttribute("href");
            if ( hrf && isNotStartWithHttp(hrf) && isNotStartWithJavascript(hrf) && isNotStartWithFile(hrf) && isNotStartWithWellNumber(hrf) && hasContainedColon(hrf) ) {
                if (typeof $ !== "undefined" && typeof $.fn.tap !== "undefined") {
                    $(lk).tap(appLinkHandler);
                    $(lk).on('touchstart', function(e){ e.preventDefault(); });
                } else {
                    lk.onclick = appLinkHandler;
                }
            }
        }
    }
    // 处理m跳转至app传参数----------------------------------end
    // 暴露接口
    window.appendClsParamToAppLink = appendClsParamToAppLink; // 暴露追加cls参数到目标url的接口



    var _org_start_with_ = String.prototype.startWith;
    String.prototype.startWith = function(str) {
        var reg = new RegExp("^" + str);
        return reg.test(this);
    };

    function isJdChannel() {
        return jaCommonData.adsCookieName === "mt_subsite";
    }
    function isNotProcessByUnionSystem() {
        return cu !== "true";
    }
    var cu = getParameter(jaCommonData.currentUrl, "cu");
    if (isJdChannel() && isNotProcessByUnionSystem() && jaCommonData.sequenceNum === 1) {
        var utm_source = jaCommonData.utm_source;
        var utm_campaign = jaCommonData.utm_campaign;
        var utm_medium = jaCommonData.utm_medium;
        var utm_term = jaCommonData.utm_term;

        var refererUrl = jaCommonData.refererUrl;
        var rdomain = refererUrl && refererUrl.split("/")[2] || '';

        var currentTime = jaCommonData.currentTime;
        var channelId = 125;
        var channelLevel = 3; // 从1开始

        // 覆盖规则
        if ("cpc" === utm_medium) {
            channelLevel = 3;
            if ("baidu" === utm_source) { // sem
                channelId = 60;
            } else if ("sougou" === utm_source) { // sem
                channelId = 61;
            } else if ("google" === utm_source) { // sem
                channelId = 62;
            } else if ("youdao" === utm_source) { // sem
                channelId = 63;
            } else if ("360" === utm_source) { // sem
                channelId = 64;
            } else if ("media" === utm_source) {
                if (utm_term.startWith("media_12_")) { // sem
                    channelId = 60;
                } else if (utm_term.startWith("media_13_")) { // sem
                    channelId = 61;
                } else if (utm_term.startWith("media_14_")) { // sem
                    channelId = 64;
                } else if (utm_term.startWith("media_4_")) { // sem
                    channelId = 65;
                } else if (utm_term.startWith("media_10_")) { // sem
                    channelId = 66;
                } else if (utm_term.startWith("media_11_")) { // sem
                    channelId = 126;
                } else if (utm_term.startWith("media_8_")) { // 品牌专区
                    channelLevel = 2;
                    channelId = 67;
                } else if (utm_term.startWith("media_5_")) { // 品牌专区
                    channelLevel = 2;
                    channelId = 68;
                } else if (utm_term.startWith("media_9_")) { // 品牌专区
                    channelLevel = 2;
                    channelId = 69;
                } else if (utm_term.startWith("media_15_")) { // sem
                    channelId = 144;
                } else if (utm_term.startWith("media_16_")) { // sem
                    channelId = 144;
                } else if (utm_term.startWith("media_17_")) { // sem
                    channelId = 144;
                } else { // sem
                    channelId = 144;
                }
            } else { // sem
                channelId = 144;
            }
        } else if ("ppc" === utm_medium) { // sem
            channelLevel = 3;
            channelId = 144;
        } else if ("organic" === utm_medium) { // SEO
            channelLevel = 3;
            if ("gouwu.sogou.com" === rdomain) { // SEO
                channelId = 187;
            } else if ("gouwu.baidu.com" === rdomain) { // SEO
                channelId = 190;
            } else if ("baidu" === utm_source) { // SEO
                channelId = 180;
            } else if ("so.com" === utm_source) { // SEO
                channelId = 181;
            } else if ("haoso.com" === utm_source) { // SEO
                channelId = 181;
            } else if ("so.360.cn" === utm_source) { // SEO
                channelId = 181;
            } else if ("sogou" === utm_source) { // SEO
                channelId = 182;
            } else if ("google" === utm_source) { // SEO
                channelId = 183;
            } else if ("bing" === utm_source) { // SEO
                channelId = 184;
            } else { // SEO
                channelId = 185;
            }
        } else if ("none" === utm_medium) { // 直接流量
            channelLevel = 1;
            channelId = 122;
        } else if ("referral" === utm_medium) {
            channelLevel = 3;
            if ("gouwu.hao123.com" === rdomain) { // SEO
                channelId = 188;
            } else if ("weigou.baidu.com" === rdomain) { // SEO
                channelId = 189;
            } else { // 外部引荐
                channelId = 121;
            }
        } else {
            if ("direct" === utm_source) { // 直接流量
                channelLevel = 1;
                channelId = 122;
            } else { // 免费其他
                channelLevel = 3;
                channelId = 125;
            }
        }

        // 重写cookie 渠道分层覆盖结果, 已存在更新, 不存在创建
        var mt = store.getItem(jaCommonData.adsCookieName) || "";
        var mtParts = mt.split("|");
        if (mtParts && mtParts.length === 3) {
            mtParts[channelLevel - 1] = encodeURIComponent(channelId+","+currentTime);
        } else {
            mtParts = [];
            for (var j=0; j<3; j++) {
                if (j === (channelLevel-1))
                    mtParts[j] = encodeURIComponent(channelId+","+currentTime);
                else
                    mtParts[j] = "";
            }
        }
        mt = join(mtParts, "|");
        store.setItem(jaCommonData.adsCookieName, mt, mtSubsiteExpireSeconds);
    }

    // 优先级最高, 会覆盖之前的计算结果
    if (jaCommonData.ads) {
        store.setItem(jaCommonData.adsCookieName, jaCommonData.ads, mtSubsiteExpireSeconds);
    }

    String.prototype.startWith = _org_start_with_;
    _org_start_with_ = null;

// mobile

    // 上报pv
    jaService.logPv();

})(window, document, window.screen, window.navigator);
