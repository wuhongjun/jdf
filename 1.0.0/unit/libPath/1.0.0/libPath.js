/*
 dapeigou
*/
(function() {
    var dpg = document.getElementById('nav-dapeigou');
    if ( dpg ) {
        dpg.innerHTML = '<a href="http://channel.jd.com/chaoshi.html">京东超市</a>';
    }
})();

/*
 getDomain
*/
if (typeof pageConfig.FN_getDomain === 'undefined') {
    pageConfig.FN_getDomain = function() {
        var hn = location.hostname;

        return (/360buy.com/.test(hn)) ? "360buy.com" : "jd.com";
    };
}

/*
  global links
*/
(function(){
    var obj=$("#service-2013 a[href='http://en.360buy.com/']");
    if(obj.length){
        obj.attr("href","http://help.en.360buy.com/help/question-2.html");
    }
})();
(function(){
    var obj=$("#footer-2013 a[href='http://about.58.com/fqz/index.html']");
    if(obj.length){
        obj.attr("href","http://www.bj.cyberpolice.cn/index.do");
    }
})();

/*
    global nav
*/
/*(function() {
    var minitiao = document.getElementById('nav-minitiao');

    if ( !!minitiao ) {
        minitiao.innerHTML = '<a href="http://dapeigou.jd.com/" target="_blank">搭配购</a>';
        minitiao.setAttribute('id', 'nav-dapeigou');
    }
})();*/

/*
    remove JDXX
*/
/*(function() {
    var service = document.getElementById('service'),
        div = null, i = 0;

    if (!!service) {
        div = service.getElementsByTagName('dl')[4].getElementsByTagName('div');

        while(i<div.length) {
            if ( /\u5bb6\u7535\u4e0b\u4e61/.test(div[i].innerHTML) ) {
                div[i].parentNode.removeChild(div[i]);
                return false;
            }

            i++;
        }
    }
})();*/

/*
    CopyRight2013
*/
/*(function(){function a(a,c){if(c=c||document,c.getElementsByClassName)return c.getElementsByClassName(a);for(var d=c.getElementsByTagName("*"),e=[],f=0;d.length>f;f++)b(a,d[f])&&e.push(d[f]);return e}function b(a,b){for(var c=b.className.split(/\s+/),d=0;c.length>d;d++)if(c[d]==a)return!0;return!1}if(document.getElementById("footer")){var c=a("copyright",document.getElementById("footer"))[0];c.innerHTML='\u5317\u4eac\u5e02\u516c\u5b89\u5c40\u671d\u9633\u5206\u5c40\u5907\u6848\u7f16\u53f7110105014669&nbsp;&nbsp;|&nbsp;&nbsp;\u4eacICP\u8bc1070359\u53f7&nbsp;&nbsp;|&nbsp;&nbsp;<a target="_blank" href="http://help.jd.com/help/question-310.html">\u4e92\u8054\u7f51\u836f\u54c1\u4fe1\u606f\u670d\u52a1\u8d44\u683c\u8bc1\u7f16\u53f7(\u4eac)-\u975e\u7ecf\u8425\u6027-2011-0034</a><br><a target="_blank" href="http://misc.360buyimg.com/skin/df/i/com/f_music.jpg" rel="nofollow">\u97f3\u50cf\u5236\u54c1\u7ecf\u8425\u8bb8\u53ef\u8bc1\u82cf\u5bbf\u6279005\u53f7</a>&nbsp;&nbsp;|&nbsp;&nbsp;\u51fa\u7248\u7269\u7ecf\u8425\u8bb8\u53ef\u8bc1\u7f16\u53f7\u65b0\u51fa\u53d1(\u82cf)\u6279\u5b57\u7b2cN-012\u53f7&nbsp;&nbsp;|&nbsp;&nbsp;\u4e92\u8054\u7f51\u51fa\u7248\u8bb8\u53ef\u8bc1\u7f16\u53f7\u65b0\u51fa\u7f51\u8bc1(\u4eac)\u5b57150\u53f7<br>Copyright&copy;2004-2013&nbsp;&nbsp;360buy\u4eac\u4e1c\u5546\u57ce&nbsp;\u7248\u6743\u6240\u6709'}})();*/

/*
    JSON
    ref: https://github.com/douglascrockford/JSON-js/edit/master/json2.js
*/
if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

/*
    livequery
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(4($){$.R($.7,{3:4(c,b,d){9 e=2,q;5($.O(c))d=b,b=c,c=z;$.h($.3.j,4(i,a){5(e.8==a.8&&e.g==a.g&&c==a.m&&(!b||b.$6==a.7.$6)&&(!d||d.$6==a.o.$6))l(q=a)&&v});q=q||Y $.3(2.8,2.g,c,b,d);q.u=v;$.3.s(q.F);l 2},T:4(c,b,d){9 e=2;5($.O(c))d=b,b=c,c=z;$.h($.3.j,4(i,a){5(e.8==a.8&&e.g==a.g&&(!c||c==a.m)&&(!b||b.$6==a.7.$6)&&(!d||d.$6==a.o.$6)&&!2.u)$.3.y(a.F)});l 2}});$.3=4(e,c,a,b,d){2.8=e;2.g=c||S;2.m=a;2.7=b;2.o=d;2.t=[];2.u=v;2.F=$.3.j.K(2)-1;b.$6=b.$6||$.3.I++;5(d)d.$6=d.$6||$.3.I++;l 2};$.3.p={y:4(){9 b=2;5(2.m)2.t.16(2.m,2.7);E 5(2.o)2.t.h(4(i,a){b.o.x(a)});2.t=[];2.u=Q},s:4(){5(2.u)l;9 b=2;9 c=2.t,w=$(2.8,2.g),H=w.11(c);2.t=w;5(2.m){H.10(2.m,2.7);5(c.C>0)$.h(c,4(i,a){5($.B(a,w)<0)$.Z.P(a,b.m,b.7)})}E{H.h(4(){b.7.x(2)});5(2.o&&c.C>0)$.h(c,4(i,a){5($.B(a,w)<0)b.o.x(a)})}}};$.R($.3,{I:0,j:[],k:[],A:v,D:X,N:4(){5($.3.A&&$.3.k.C){9 a=$.3.k.C;W(a--)$.3.j[$.3.k.V()].s()}},U:4(){$.3.A=v},M:4(){$.3.A=Q;$.3.s()},L:4(){$.h(G,4(i,n){5(!$.7[n])l;9 a=$.7[n];$.7[n]=4(){9 r=a.x(2,G);$.3.s();l r}})},s:4(b){5(b!=z){5($.B(b,$.3.k)<0)$.3.k.K(b)}E $.h($.3.j,4(a){5($.B(a,$.3.k)<0)$.3.k.K(a)});5($.3.D)1j($.3.D);$.3.D=1i($.3.N,1h)},y:4(b){5(b!=z)$.3.j[b].y();E $.h($.3.j,4(a){$.3.j[a].y()})}});$.3.L(\'1g\',\'1f\',\'1e\',\'1b\',\'1a\',\'19\',\'18\',\'17\',\'1c\',\'15\',\'1d\',\'P\');$(4(){$.3.M()});9 f=$.p.J;$.p.J=4(a,c){9 r=f.x(2,G);5(a&&a.8)r.g=a.g,r.8=a.8;5(14 a==\'13\')r.g=c||S,r.8=a;l r};$.p.J.p=$.p})(12);',62,82,'||this|livequery|function|if|lqguid|fn|selector|var|||||||context|each||queries|queue|return|type||fn2|prototype|||run|elements|stopped|false|els|apply|stop|undefined|running|inArray|length|timeout|else|id|arguments|nEls|guid|init|push|registerPlugin|play|checkQueue|isFunction|remove|true|extend|document|expire|pause|shift|while|null|new|event|bind|not|jQuery|string|typeof|toggleClass|unbind|addClass|removeAttr|attr|wrap|before|removeClass|empty|after|prepend|append|20|setTimeout|clearTimeout'.split('|'),0,{}));

/*
    query
*/

new function(settings) {
    var $separator = settings.separator || '&';
    var $spaces = settings.spaces === false ? false : true;
    var $suffix = settings.suffix === false ? '' : '[]';
    var $prefix = settings.prefix === false ? false : true;
    var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
    var $numbers = settings.numbers === false ? false : true;
    jQuery.query = new function() {
        var is = function(o, t) {
            return o != undefined && o !== null && (!!t ? o.constructor == t : true)
        };
        var parse = function(path) {
            var m, rx = /\[([^[]*)\]/g,
                match = /^(\S+?)(\[\S*\])?$/.exec(path),
                base = match[1],
                tokens = [];
            while (m = rx.exec(match[2])) tokens.push(m[1]);
            return [base, tokens]
        };
        var set = function(target, tokens, value) {
            var o, token = tokens.shift();
            if (typeof target != 'object') target = null;
            if (token === "") {
                if (!target) target = [];
                if (is(target, Array)) {
                    target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value))
                } else if (is(target, Object)) {
                    var i = 0;
                    while (target[i++] != null);
                    target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value)
                } else {
                    target = [];
                    target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value))
                }
            } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
                var index = parseInt(token, 10);
                if (!target) target = [];
                target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value)
            } else if (token) {
                var index = token.replace(/^\s*|\s*$/g, "");
                if (!target) target = {};
                if (is(target, Array)) {
                    var temp = {};
                    for (var i = 0; i < target.length; ++i) {
                        temp[i] = target[i]
                    }
                    target = temp
                }
                target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value)
            } else {
                return value
            }
            return target
        };
        var queryObject = function(a) {
            var self = this;
            self.keys = {};
            if (a.queryObject) {
                jQuery.each(a.get(), function(key, val) {
                    self.SET(key, val)
                })
            } else {
                jQuery.each(arguments, function() {
                    var q = "" + this;
                    q = q.replace(/^[?#]/, '');
                    q = q.replace(/[;&]$/, '');
                    if ($spaces) q = q.replace(/[+]/g, ' ');
                    jQuery.each(q.split(/[&;]/), function() {
                        try {
                            var key = decodeURIComponent(this.split('=')[0]);
                            var val = decodeURIComponent(encodeURIComponent(this.split('=')[1]));
                        } catch(e) {
                        }
                        if (!key) return;
                        if ($numbers) {
                            if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) val = parseFloat(val);
                            else if (/^[+-]?[0-9]+$/.test(val)) val = parseInt(val, 10)
                        }
                        val = (!val && val !== 0) ? true : val;
                        if (val !== false && val !== true && typeof val != 'number') val = val;
                        self.SET(key, val)
                    })
                })
            }
            return self
        };
        queryObject.prototype = {
            queryObject: true,
            has: function(key, type) {
                var value = this.get(key);
                return is(value, type)
            },
            GET: function(key) {
                if (!is(key)) return this.keys;
                var parsed = parse(key),
                    base = parsed[0],
                    tokens = parsed[1];
                var target = this.keys[base];
                while (target != null && tokens.length != 0) {
                    target = target[tokens.shift()]
                }
                return typeof target == 'number' ? target : target || ""
            },
            get: function(key) {
                var target = this.GET(key);
                if (is(target, Object)) return jQuery.extend(true, {}, target);
                else if (is(target, Array)) return target.slice(0);
                return target
            },
            SET: function(key, val) {
                var value = !is(val) ? null : val;
                var parsed = parse(key),
                    base = parsed[0],
                    tokens = parsed[1];
                var target = this.keys[base];
                this.keys[base] = set(target, tokens.slice(0), value);
                return this
            },
            set: function(key, val) {
                return this.copy().SET(key, val)
            },
            REMOVE: function(key) {
                return this.SET(key, null).COMPACT()
            },
            remove: function(key) {
                return this.copy().REMOVE(key)
            },
            EMPTY: function() {
                var self = this;
                jQuery.each(self.keys, function(key, value) {
                    delete self.keys[key]
                });
                return self
            },
            load: function(url) {
                var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
                var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash)
            },
            empty: function() {
                return this.copy().EMPTY()
            },
            copy: function() {
                return new queryObject(this)
            },
            COMPACT: function() {
                function build(orig) {
                    var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
                    if (typeof orig == 'object') {
                        function add(o, key, value) {
                            if (is(o, Array)) o.push(value);
                            else o[key] = value
                        }
                        jQuery.each(orig, function(key, value) {
                            if (!is(value)) return true;
                            add(obj, key, build(value))
                        })
                    }
                    return obj
                }
                this.keys = build(this.keys);
                return this
            },
            compact: function() {
                return this.copy().COMPACT()
            },
            toString: function() {
                var i = 0,
                    queryString = [],
                    chunks = [],
                    self = this;
                var addFields = function(arr, key, value) {
                    if (!is(value) || value === false) return;
                    var o = [encodeURIComponent(key)];
                    if (value !== true) {
                        o.push("=");
                        o.push(encodeURIComponent(value))
                    }
                    arr.push(o.join(""))
                };
                var build = function(obj, base) {
                    var newKey = function(key) {
                        return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("")
                    };
                    jQuery.each(obj, function(key, value) {
                        if (typeof value == 'object') build(value, newKey(key));
                        else addFields(chunks, newKey(key), value)
                    })
                };
                build(this.keys);
                if (chunks.length > 0) queryString.push($hash);
                queryString.push(chunks.join($separator));
                return queryString.join("")
            }
        };
        return new queryObject(location.search, location.hash)
    }
}(jQuery.query || {});

/*
    cookie
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('n.5=v(a,b,c){4(7 b!=\'w\'){c=c||{};4(b===o){b=\'\';c.3=-1}2 d=\'\';4(c.3&&(7 c.3==\'p\'||c.3.q)){2 e;4(7 c.3==\'p\'){e=x y();e.z(e.A()+(c.3*B*r*r*C))}s{e=c.3}d=\';3=\'+e.q()}2 f=c.8?\';8=\'+(c.8):\'\';2 g=c.9?\';9=\'+(c.9):\'\';2 h=c.t?\';t\':\'\';6.5=[a,\'=\',D(b),d,f,g,h].E(\'\')}s{2 j=o;4(6.5&&6.5!=\'\'){2 k=6.5.F(\';\');G(2 i=0;i<k.m;i++){2 l=n.H(k[i]);4(l.u(0,a.m+1)==(a+\'=\')){j=I(l.u(a.m+1));J}}}K j}};',47,47,'||var|expires|if|cookie|document|typeof|path|domain|||||||||||||length|jQuery|null|number|toUTCString|60|else|secure|substring|function|undefined|new|Date|setTime|getTime|24|1000|encodeURIComponent|join|split|for|trim|decodeURIComponent|break|return'.split('|'),0,{}));

/*
    utility by springChun
*/
Function.prototype.overwrite = function(f) {
    var result = f;
    if (!result.original) {
        result.original = this;
    }
    return result;
}
Date.prototype.toString = Date.prototype.toString.overwrite(function(format) {
    var result = new String();
    if (typeof(format) == "string") {
        result = format;
        result = result.replace(/yyyy|YYYY/, this.getFullYear());
        result = result.replace(/yy|YY/, this.getFullYear().toString().substr(2, 2));
        result = result.replace(/MM/, this.getMonth() >= 9 ? this.getMonth() + 1 : "0" + (this.getMonth() + 1));
        result = result.replace(/M/, this.getMonth());
        result = result.replace(/dd|DD/, this.getDate() > 9 ? this.getDate() : "0" + this.getDate());
        result = result.replace(/d|D/, this.getDate());
        result = result.replace(/hh|HH/, this.getHours() > 9 ? this.getHours() : "0" + this.getHours());
        result = result.replace(/h|H/, this.getHours());
        result = result.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes());
        result = result.replace(/m/, this.getMinutes());
        result = result.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds() : "0" + this.getSeconds());
        result = result.replace(/s|S/, this.getSeconds());
    }
    return result;
});
String.prototype.format = function() {
    var result = this;
    if (arguments.length > 0) {
        parameters = $.makeArray(arguments);
        $.each(parameters,
        function(i, n) {
            result = result.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
    }
    return result;
}
function StringBuilder() {
    this.strings = new Array();
    this.length = 0;
}
StringBuilder.prototype.append = function(string) {
    this.strings.push(string);
    this.length += string.length;
}
StringBuilder.prototype.toString = function(start, length) {
    return this.strings.join("").substr(start, length);
};


/*
    jmsajax
*/
(function($) {
    $.jmsajax = function(options) {
        var defaults = {
            type: "POST",
            dataType: "msjson",
            data: {},
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
            },
            contentType: "application/json; charset=utf-8",
            error: function(x, s, m) {
                alert("Status: " + ((x.statusText) ? x.statusText : "Unknown") + "\nMessage: " + msJSON.parse(((x.responseText) ? x.responseText : "Unknown")).Message);
            }
        };
        var options = $.extend(defaults, options);
        if (options.method) options.url += "/" + options.method;
        if (options.data) {
            if (options.type == "GET") {
                var data = "";
                for (var i in options.data) {
                    if (data != "") data += "&";
                    data += i + "=" + msJSON.stringify(options.data[i]);
                }
                options.url += "?" + data;
                data = null;
                options.data = "{}";
            }
            else if (options.type == "POST") {
                options.data = msJSON.stringify(options.data);
            }
        }
        if (options.success) {
            if (options.dataType) {
                if (options.dataType == "msjson") {
                    var base = options.success;
                    options.success = function(response, status) {
                        var y = dateparse(response);
                        if (options.version) {
                            if (options.version >= 3.5) y = y.d;
                        }
                        else {
                            if (response.indexOf("{\"d\":") == 0) y = y.d;
                        }
                        base(y, status);
                    }
                }
            }
        }
        return $.ajax(options);
    };
    dateparse = function(data) {
        try {
            return msJSON.parse(data, function(key, value) {
                var a;
                if (typeof value === "string") {
                    if (value.indexOf("Date") >= 0) {
                        a = /^\/Date\(([0-9]+)\)\/$/.exec(value);
                        if (a) {
                            return new Date(parseInt(a[1], 10));
                        }
                    }
                }
                return value;
            });
        }
        catch (e) {
            return null;
        }
    }
    msJSON = function() {
        function f(n) {
            return n < 10 ? '0' + n : n;
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
            rep;

        function quote(string) {
            escapeable.lastIndex = 0;
            return escapeable.test(string) ? '"' + string.replace(escapeable, function(a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                return '\\u' + ('0000' + (+(a.charCodeAt(0))).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }

        function str(key, holder) {
            var i, k, v, length, mind = gap,
                partial, value = holder[key];
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
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
                if (value.toUTCString) {
                    return '"\\/Date(' + (value.getTime()) + ')\\/"';
                }
                gap += indent;
                partial = [];
                if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
            }
        }
        return {
            stringify: function(value, replacer, space) {
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
                rep = replacer;
                if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }
                return str('', {
                    '': value
                });
            },
            parse: function(text, reviver) {
                var j;

                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function(a) {
                        return '\\u' + ('0000' + (+(a.charCodeAt(0))).toString(16)).slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    j = eval('(' + text + ')');
                    return typeof reviver === 'function' ? walk({
                        '': j
                    }, '') : j;
                }
                throw new SyntaxError('JSON.parse');
            }
        };
    }();
})(jQuery);

/*
    trimpath
*/
var TrimPath;
(function() {
    if (TrimPath == null) TrimPath = new Object();
    if (TrimPath.evalEx == null) TrimPath.evalEx = function(src) {
        return eval(src);
    };
    var UNDEFINED;
    if (Array.prototype.pop == null) Array.prototype.pop = function() {
        if (this.length === 0) {
            return UNDEFINED;
        }
        return this[--this.length];
    };
    if (Array.prototype.push == null) Array.prototype.push = function() {
        for (var i = 0; i < arguments.length; ++i) {
            this[this.length] = arguments[i];
        }
        return this.length;
    };
    TrimPath.parseTemplate = function(tmplContent, optTmplName, optEtc) {
        if (optEtc == null) optEtc = TrimPath.parseTemplate_etc;
        var funcSrc = parse(tmplContent, optTmplName, optEtc);
        var func = TrimPath.evalEx(funcSrc, optTmplName, 1);
        if (func != null) return new optEtc.Template(optTmplName, tmplContent, funcSrc, func, optEtc);
        return null;
    }
    try {
        String.prototype.process = function(context, optFlags) {
            var template = TrimPath.parseTemplate(this, null);
            if (template != null) return template.process(context, optFlags);
            return this;
        }
    } catch (e) {}
    TrimPath.parseTemplate_etc = {};
    TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro";
    TrimPath.parseTemplate_etc.statementDef = {
        "if": {
            delta: 1,
            prefix: "if (",
            suffix: ") {",
            paramMin: 1
        },
        "else": {
            delta: 0,
            prefix: "} else {"
        },
        "elseif": {
            delta: 0,
            prefix: "} else if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/if": {
            delta: -1,
            prefix: "}"
        },
        "for": {
            delta: 1,
            paramMin: 3,
            prefixFunc: function(stmtParts, state, tmplName, etc) {
                if (stmtParts[2] != "in") throw new etc.ParseError(tmplName, state.line, "bad for loop statement: " + stmtParts.join(' '));
                var iterVar = stmtParts[1];
                var listVar = "__LIST__" + iterVar;
                return ["var ", listVar, " = ", stmtParts[3], ";", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", listVar, ") != null) { ", "var ", iterVar, "_ct = 0;", "for (var ", iterVar, "_index in ", listVar, ") { ", iterVar, "_ct++;", "if (typeof(", listVar, "[", iterVar, "_index]) == 'function') {continue;}", "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var ", iterVar, " = ", listVar, "[", iterVar, "_index];"].join("");
            }
        },
        "forelse": {
            delta: 0,
            prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/for": {
            delta: -1,
            prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
        },
        "var": {
            delta: 0,
            prefix: "var ",
            suffix: ";"
        },
        "macro": {
            delta: 1,
            prefixFunc: function(stmtParts, state, tmplName, etc) {
                var macroName = stmtParts[1].split('(')[0];
                return ["var ", macroName, " = function", stmtParts.slice(1).join(' ').substring(macroName.length), "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; "].join('');
            }
        },
        "/macro": {
            delta: -1,
            prefix: " return _OUT_arr.join(''); };"
        }
    }
    TrimPath.parseTemplate_etc.modifierDef = {
        "eat": function(v) {
            return "";
        },
        "escape": function(s) {
            return String(s).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
        },
        "capitalize": function(s) {
            return String(s).toUpperCase();
        },
        "default": function(s, d) {
            return s != null ? s : d;
        }
    }
    TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape;
    TrimPath.parseTemplate_etc.Template = function(tmplName, tmplContent, funcSrc, func, etc) {
        this.process = function(context, flags) {
            if (context == null) context = {};
            if (context._MODIFIERS == null) context._MODIFIERS = {};
            if (context.defined == null) context.defined = function(str) {
                return (context[str] != undefined);
            };
            for (var k in etc.modifierDef) {
                if (context._MODIFIERS[k] == null) context._MODIFIERS[k] = etc.modifierDef[k];
            }
            if (flags == null) flags = {};
            var resultArr = [];
            var resultOut = {
                write: function(m) {
                    resultArr.push(m);
                }
            };
            try {
                func(resultOut, context, flags);
            } catch (e) {
                if (flags.throwExceptions == true) throw e;
                var result = new String(resultArr.join("") + "[ERROR: " + e.toString() + (e.message ? '; ' + e.message : '') + "]");
                result["exception"] = e;
                return result;
            }
            return resultArr.join("");
        }
        this.name = tmplName;
        this.source = tmplContent;
        this.sourceFunc = funcSrc;
        this.toString = function() {
            return "TrimPath.Template [" + tmplName + "]";
        }
    }
    TrimPath.parseTemplate_etc.ParseError = function(name, line, message) {
        this.name = name;
        this.line = line;
        this.message = message;
    }
    TrimPath.parseTemplate_etc.ParseError.prototype.toString = function() {
        return ("TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message);
    }
    var parse = function(body, tmplName, etc) {
        body = cleanWhiteSpace(body);
        var funcText = ["var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"];
        var state = {
            stack: [],
            line: 1
        };
        var endStmtPrev = -1;
        while (endStmtPrev + 1 < body.length) {
            var begStmt = endStmtPrev;
            begStmt = body.indexOf("{", begStmt + 1);
            while (begStmt >= 0) {
                var endStmt = body.indexOf('}', begStmt + 1);
                var stmt = body.substring(begStmt, endStmt);
                var blockrx = stmt.match(/^\{(cdata|minify|eval)/);
                if (blockrx) {
                    var blockType = blockrx[1];
                    var blockMarkerBeg = begStmt + blockType.length + 1;
                    var blockMarkerEnd = body.indexOf('}', blockMarkerBeg);
                    if (blockMarkerEnd >= 0) {
                        var blockMarker;
                        if (blockMarkerEnd - blockMarkerBeg <= 0) {
                            blockMarker = "{/" + blockType + "}";
                        } else {
                            blockMarker = body.substring(blockMarkerBeg + 1, blockMarkerEnd);
                        }
                        var blockEnd = body.indexOf(blockMarker, blockMarkerEnd + 1);
                        if (blockEnd >= 0) {
                            emitSectionText(body.substring(endStmtPrev + 1, begStmt), funcText);
                            var blockText = body.substring(blockMarkerEnd + 1, blockEnd);
                            if (blockType == 'cdata') {
                                emitText(blockText, funcText);
                            } else if (blockType == 'minify') {
                                emitText(scrubWhiteSpace(blockText), funcText);
                            } else if (blockType == 'eval') {
                                if (blockText != null && blockText.length > 0) funcText.push('_OUT.write( (function() { ' + blockText + ' })() );');
                            }
                            begStmt = endStmtPrev = blockEnd + blockMarker.length - 1;
                        }
                    }
                } else if (body.charAt(begStmt - 1) != '$' && body.charAt(begStmt - 1) != '\\') {
                    var offset = (body.charAt(begStmt + 1) == '/' ? 2 : 1);
                    if (body.substring(begStmt + offset, begStmt + 10 + offset).search(TrimPath.parseTemplate_etc.statementTag) == 0) break;
                }
                begStmt = body.indexOf("{", begStmt + 1);
            }
            if (begStmt < 0) break;
            var endStmt = body.indexOf("}", begStmt + 1);
            if (endStmt < 0) break;
            emitSectionText(body.substring(endStmtPrev + 1, begStmt), funcText);
            emitStatement(body.substring(begStmt, endStmt + 1), state, funcText, tmplName, etc);
            endStmtPrev = endStmt;
        }
        emitSectionText(body.substring(endStmtPrev + 1), funcText);
        if (state.stack.length != 0) throw new etc.ParseError(tmplName, state.line, "unclosed, unmatched statement(s): " + state.stack.join(","));
        funcText.push("}}; TrimPath_Template_TEMP");
        return funcText.join("");
    }
    var emitStatement = function(stmtStr, state, funcText, tmplName, etc) {
        var parts = stmtStr.slice(1, -1).split(' ');
        var stmt = etc.statementDef[parts[0]];
        if (stmt == null) {
            emitSectionText(stmtStr, funcText);
            return;
        }
        if (stmt.delta < 0) {
            if (state.stack.length <= 0) throw new etc.ParseError(tmplName, state.line, "close tag does not match any previous statement: " + stmtStr);
            state.stack.pop();
        }
        if (stmt.delta > 0) state.stack.push(stmtStr);
        if (stmt.paramMin != null && stmt.paramMin >= parts.length) throw new etc.ParseError(tmplName, state.line, "statement needs more parameters: " + stmtStr);
        if (stmt.prefixFunc != null) funcText.push(stmt.prefixFunc(parts, state, tmplName, etc));
        else funcText.push(stmt.prefix);
        if (stmt.suffix != null) {
            if (parts.length <= 1) {
                if (stmt.paramDefault != null) funcText.push(stmt.paramDefault);
            } else {
                for (var i = 1; i < parts.length; i++) {
                    if (i > 1) funcText.push(' ');
                    funcText.push(parts[i]);
                }
            }
            funcText.push(stmt.suffix);
        }
    }
    var emitSectionText = function(text, funcText) {
        if (text.length <= 0) return;
        var nlPrefix = 0;
        var nlSuffix = text.length - 1;
        while (nlPrefix < text.length && (text.charAt(nlPrefix) == '\n'))
        nlPrefix++;
        while (nlSuffix >= 0 && (text.charAt(nlSuffix) == ' ' || text.charAt(nlSuffix) == '\t'))
        nlSuffix--;
        if (nlSuffix < nlPrefix) nlSuffix = nlPrefix;
        if (nlPrefix > 0) {
            funcText.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var s = text.substring(0, nlPrefix).replace('\n', '\\n');
            if (s.charAt(s.length - 1) == '\n') s = s.substring(0, s.length - 1);
            funcText.push(s);
            funcText.push('");');
        }
        var lines = text.substring(nlPrefix, nlSuffix + 1).split('\n');
        for (var i = 0; i < lines.length; i++) {
            emitSectionTextLine(lines[i], funcText);
            if (i < lines.length - 1) funcText.push('_OUT.write("\\n");\n');
        }
        if (nlSuffix + 1 < text.length) {
            funcText.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
            var s = text.substring(nlSuffix + 1).replace('\n', '\\n');
            if (s.charAt(s.length - 1) == '\n') s = s.substring(0, s.length - 1);
            funcText.push(s);
            funcText.push('");');
        }
    }
    var emitSectionTextLine = function(line, funcText) {
        var endMarkPrev = '}';
        var endExprPrev = -1;
        while (endExprPrev + endMarkPrev.length < line.length) {
            var begMark = "${",
                endMark = "}";
            var begExpr = line.indexOf(begMark, endExprPrev + endMarkPrev.length);
            if (begExpr < 0) break;
            if (line.charAt(begExpr + 2) == '%') {
                begMark = "${%";
                endMark = "%}";
            }
            var endExpr = line.indexOf(endMark, begExpr + begMark.length);
            if (endExpr < 0) break;
            emitText(line.substring(endExprPrev + endMarkPrev.length, begExpr), funcText);
            var exprArr = line.substring(begExpr + begMark.length, endExpr).replace(/\|\|/g, "#@@#").split('|');
            for (var k in exprArr) {
                if (exprArr[k].replace) exprArr[k] = exprArr[k].replace(/#@@#/g, '||');
            }
            funcText.push('_OUT.write(');
            emitExpression(exprArr, exprArr.length - 1, funcText);
            funcText.push(');');
            endExprPrev = endExpr;
            endMarkPrev = endMark;
        }
        emitText(line.substring(endExprPrev + endMarkPrev.length), funcText);
    }
    var emitText = function(text, funcText) {
        if (text == null || text.length <= 0) return;
        text = text.replace(/\\/g, '\\\\');
        text = text.replace(/\n/g, '\\n');
        text = text.replace(/"/g, '\\"');
        funcText.push('_OUT.write("');
        funcText.push(text);
        funcText.push('");');
    }
    var emitExpression = function(exprArr, index, funcText) {
        var expr = exprArr[index];
        if (index <= 0) {
            funcText.push(expr);
            return;
        }
        var parts = expr.split(':');
        funcText.push('_MODIFIERS["');
        funcText.push(parts[0]);
        funcText.push('"](');
        emitExpression(exprArr, index - 1, funcText);
        if (parts.length > 1) {
            funcText.push(',');
            funcText.push(parts[1]);
        }
        funcText.push(')');
    }
    var cleanWhiteSpace = function(result) {
        result = result.replace(/\t/g, "    ");
        result = result.replace(/\r\n/g, "\n");
        result = result.replace(/\r/g, "\n");
        result = result.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1');
        return result;
    }
    var scrubWhiteSpace = function(result) {
        result = result.replace(/^\s+/g, "");
        result = result.replace(/\s+$/g, "");
        result = result.replace(/\s+/g, " ");
        result = result.replace(/^(\s*\S*(\s+\S+)*)\s*$/, '$1');
        return result;
    }
    TrimPath.parseDOMTemplate = function(elementId, optDocument, optEtc) {
        if (optDocument == null) optDocument = document;
        var element = optDocument.getElementById(elementId);
        var content = element.value;
        if (content == null) content = element.innerHTML;
        content = content.replace(/</g, "<").replace(/>/g, ">");
        return TrimPath.parseTemplate(content, elementId, optEtc);
    }
    TrimPath.processDOMTemplate = function(elementId, context, optFlags, optDocument, optEtc) {
        return TrimPath.parseDOMTemplate(elementId, optDocument, optEtc).process(context, optFlags);
    }
})();

/*
    getJSONP
*/
(function($) {
    $.extend({
        _jsonp: {
            scripts: {},
            counter: 1,
            charset: "gb2312",
            head: document.getElementsByTagName("head")[0],
            name: function(callback) {
                var name = '_jsonp_' + (new Date).getTime() + '_' + this.counter;
                this.counter++;
                var cb = function(json) {
                    eval('delete ' + name);
                    callback(json);
                    $._jsonp.head.removeChild($._jsonp.scripts[name]);
                    delete $._jsonp.scripts[name];
                };
                eval(name + ' = cb');
                return name;
            },
            load: function(url, name) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.charset = this.charset;
                script.src = url;
                this.head.appendChild(script);
                this.scripts[name] = script;
            }
        },
        getJSONP: function(url, callback) {
            var name = $._jsonp.name(callback);
            var url = url.replace(/{callback};/, name);
            $._jsonp.load(url, name);
            return this;
        }
    });
})(jQuery);

/*
    Jdorpdown
*/
(function($){
    $.fn.Jdropdown=function(option,callback){
        if(!this.length)return;
        if (typeof option == "function") {
            callback = option;
            option = {};
        }
        var config=$.extend({
            "event":"mouseover",
            "current":"hover",
            "delay":0
        },option||{});
        var evt2=(config.event=="mouseover")?"mouseout":"mouseleave";
        $.each(this, function() {
            var timer1 = null,
                timer2 = null,
                flag = false;
            $(this).bind(config.event,function(){
                if (flag) {
                    clearTimeout(timer2);
                } else {
                    var _this = $(this);
                    timer1 = setTimeout(function() {
                        _this.addClass(config.current);
                        flag = true;
                        if(callback)callback(_this);
                    }, config.delay);
                }
            }).bind(evt2,function(){
                if (flag) {
                    var _this = $(this);
                    timer2 = setTimeout(function() {
                        _this.removeClass(config.current);
                        flag = false;
                    }, config.delay);
                } else {
                    clearTimeout(timer1);
                }
            });
            /*$(this).hover(function(){
                if (flag) {
                    clearTimeout(timer2);
                } else {
                    var _this = $(this);
                    timer1 = setTimeout(function() {
                        _this.addClass(config.current);
                        flag = true;
                        if(callback)callback(_this);
                    }, config.delay);
                }
            },function(){
                if (flag) {
                    var _this = $(this);
                    timer2 = setTimeout(function() {
                        _this.removeClass(config.current);
                        flag = false;
                    }, config.delay);
                } else {
                    clearTimeout(timer1);
                }
            });*/
        })
    };
})(jQuery);

///???$.fn.dropdown

/*
    Jtab
*/
(function($) {
    $.fn.Jtab = function(option, callback) {
        if(!this.length)return;
        if (typeof option == "function") {
            callback = option;
            option = {};
        }
        var settings = $.extend({
            type: "static",
            auto: false,
            event: "mouseover",
            currClass: "curr",
            source: "data-tag",
            hookKey:"data-widget",
            hookItemVal: "tab-item",
            hookContentVal: "tab-content",
            stay: 5000,
            delay: 100,
            threshold:null,
            mainTimer: null,
            subTimer: null,
            index: 0,
            compatible:false
        }, option || {});
        var items = $(this).find("*["+settings.hookKey+"="+settings.hookItemVal+"]"),
            contens = $(this).find("*["+settings.hookKey+"="+settings.hookContentVal+"]"),
            isUrl = settings.source.toLowerCase().match(/http:\/\/|\d|\.aspx|\.ascx|\.asp|\.php|\.html\.htm|.shtml|.js/g);

        if (items.length != contens.length) {
            return false;
        }

        var init = function(index, tag) {
            settings.subTimer = setTimeout(function() {
                items.eq(settings.index).removeClass(settings.currClass);
                if(settings.compatible){
                    contens.eq(settings.index).hide();
                }
                if (tag) {
                    settings.index++;
                    //settings.threshold=settings.threshold?settings.threshold:items.length;
                    if (settings.index == items.length) {
                        settings.index = 0;
                    }
                } else {
                    settings.index = index;
                }
                settings.type = (items.eq(settings.index).attr(settings.source) != null) ? "dynamic" : "static";
                rander();
            }, settings.delay);
        };
        var autoRun = function() {
            settings.mainTimer = setInterval(function() {
                init(settings.index, true);
            }, settings.stay);
        };
        var rander = function() {
            items.eq(settings.index).addClass(settings.currClass);
            if(settings.compatible){
                contens.eq(settings.index).show();
            }
            switch (settings.type) {
                default:
                case "static":
                    var source = "";
                    break;
                case "dynamic":
                    var source = (!isUrl) ? items.eq(settings.index).attr(settings.source) : settings.source;
                    items.eq(settings.index).removeAttr(settings.source);
                    break;
            }
            if (callback) {
                callback(source, contens.eq(settings.index), settings.index);
            }
        };
        items.each(function(i) {

            $(this).bind(settings.event, function() {
                clearTimeout(settings.subTimer);
                clearInterval(settings.mainTimer);

                init(i, false);
            }).bind("mouseleave", function() {
                if (settings.auto) {
                    autoRun();
                } else {
                    return;
                }
            });
        });
        if (settings.type == "dynamic") {
            init(settings.index, false);
        }
        if (settings.auto) {
            autoRun();
        }

    };
})(jQuery);

/*
    Jlazyload
*/
(function($){
    $.fn.Jlazyload=function(option,callback){
        if(!this.length)return;
        var settings=$.extend({
            type:null,
            offsetParent:null,
            source:"data-lazyload",
            placeholderImage:"http://misc.360buyimg.com/lib/img/e/blank.gif",
            placeholderClass:"loading-style2",
            threshold:200//阈值，控制显示位置，默认为200
        },option||{}),
        _this=this,_timer,_client,
        rect=function(object){
            var left = object.scrollLeft,
                top = object.scrollTop,
                width = object.offsetWidth,
                height = object.offsetHeight;
            while(object.offsetParent){
                left += object.offsetLeft;
                top += object.offsetTop;
                object = object.offsetParent;
            }
            return {
                left:left,
                top:top,
                width:width,
                height:height
            }
        },
        client=function(){
            var de=document.documentElement,
                dc=document.body,
                left = window.pageXOffset?window.pageXOffset:(de.scrollLeft || dc.scrollLeft),
                top =  window.pageYOffset?window.pageYOffset:(de.scrollTop || dc.scrollTop),
                width =  de.clientWidth,
                height = de.clientHeight;
            return {
                left:left,
                top:top,
                width:width,
                height:height
            }
        },
        intersect=function(rect1,rect2){
            var lc1, lc2, tc1, tc2, w1, h1,t = settings.threshold?parseInt(settings.threshold):0;
            lc1 = rect1.left + rect1.width / 2;
            lc2 = rect2.left + rect2.width / 2;
            tc1 = rect1.top + rect1.height / 2 ;
            tc2 = rect2.top + rect2.height / 2 ;
            w1 = (rect1.width + rect2.width) / 2 ;
            h1 = (rect1.height + rect2.height) / 2;
            return Math.abs(lc1 - lc2) < (w1+t) && Math.abs(tc1 - tc2) < (h1+t);
        },
        imagesInit=function(flag,source,object){
            if(settings.placeholderImage&&settings.placeholderClass){
                object.attr("src",settings.placeholderImage).addClass(settings.placeholderClass);
            }
            if(flag){
                object.attr("src",source).removeAttr(settings.source);
                if(callback)callback(source,object);
            }
        },
        textareaInit=function(flag,source,object){
            if(flag){
                var element=$("#"+source);
                element.html(object.val()).removeAttr(settings.source);
                object.remove();
                if(callback)callback(source,object);
            }
        },
        moduleInit=function(flag,source,object){
            if(flag){
                object.removeAttr(settings.source);
                if(callback)callback(source,object);
            }
        },
        init=function(){
            //alert(_this.length)
            _client=client(),
            _this=_this.filter(function(){
                return $(this).attr(settings.source);
            });
            $.each(_this,function(){
                var source=$(this).attr(settings.source);
                if(!source){
                    return;
                }
                var rect1=(!settings.offsetParent)?_client:rect($(settings.offsetParent).get(0)),
                    rect2=rect(this),
                    flag=intersect(rect1,rect2);
                switch(settings.type){
                    case "image":
                        imagesInit(flag,source,$(this));
                        break;
                    case "textarea":
                        textareaInit(flag,source,$(this));
                        break;
                    case "module":
                        moduleInit(flag,source,$(this));
                        break;
                    default:
                        break;
                }
            });
        },
        rander=function(){
            if(_this.length>0){
                clearTimeout(_timer);
                _timer=setTimeout(function(){
                    init();
                },10);
            }
        };
        init();
        if(!settings.offsetParent){
            $(window).bind("scroll",function(){
                rander();
            }).bind("reset",function(){
                rander();
            });
        }else{
            $(settings.offsetParent).bind("scroll",function(){
                rander();
            });
        }
    }
})(jQuery);

/*
    Jtimer
*/
(function($) {
    $.Jtimer = function(option,callback) {
        var settings=$.extend({
            pids:null,
            template:null,
            reset:null,
            mainPlaceholder:"timed",
            subPlaceholder:"timer",
            resetPlaceholder:"reset",
            iconPlaceholder:"icon",
            finishedClass:"",
            timer:[]
        },option||{}),
        timeFormat=function(t){
            var T = t.split(" "),
                A = T[0].split("-"),
                B = T[1].split(":");
            return new Date(A[0], A[1] - 1, A[2], B[0], B[1], B[2])
        },
        textFormat=function(t){
            if(String(t).length<2){
                t="0"+t
            }
            return t
        },
        init=function(index,data){
            if (data=={}||!data||!data.start||!data.end) {
                return;
            }
            var start = timeFormat(data.start),
                server = timeFormat(data.server),
                end = timeFormat(data.end),
                H, M, S, //timer,
                ST = (start - server) / 1000,
                ET = (end - server) / 1000,
                mainElement = "#"+settings.mainPlaceholder+index,
                subElement = "#"+settings.subPlaceholder+data.qid,
                resetElement = "#"+settings.resetPlaceholder+data.qid;
            if(ST <= 0 ){//&& ET > 0当抢购开始
                var html=settings.template.process(data);
                $(mainElement).html(html);
            };
            settings.timer[data.qid] = setInterval(function() {
                if (ST > 0) {//未开始
                    clearInterval(settings.timer[data.qid]);
                    return;
                } else {//已开始
                    if (ET > 0) {//未结束
                        H = Math.floor(ET / 3600);
                        M = Math.floor((ET - H * 3600) / 60);
                        S = (ET - H * 3600) % 60;
                        $(subElement).html("\u5269\u4f59<b>" + textFormat(H) + "</b>\u5c0f\u65f6<b>" + textFormat(M) + "</b>\u5206<b>" + textFormat(S) + "</b>\u79d2");
                        ET--;
                    } else {//已结束
                        $(subElement).html("\u62a2\u8d2d\u7ed3\u675f\uff01");
                        if(settings.iconPlaceholder){
                            iconElement = "#"+settings.iconPlaceholder+data.qid;
                            $(iconElement).attr("class",settings.finishedClass).html("\u62a2\u5b8c");
                        }
                        if(settings.reset){
                            $(subElement).append("<a href=\"javascript:void(0)\" id=\""+resetElement.substring(1)+"\">\u5237\u65b0</a>");
                            $(resetElement).bind("click",function(){
                                $.each(settings.timer,function(i){
                                    clearInterval(this);
                                });
                                settings.reset();
                            });
                        }
                        clearInterval(settings.timer[data.qid]);
                    }
                }
            }, 1000);
        },
        dataSort=function(a,b){
            return ((timeFormat(a.end)-timeFormat(a.server))-(timeFormat(b.end)-timeFormat(b.server)))
        };
        $.ajax({
            url:"http://qiang.jd.com/HomePageNewLimitBuy.ashx?callback=?",
            data:{"ids":settings.pids},
            dataType:"jsonp",
            success:function(json){
                if (json&&json.data) {
                    json.data.sort(dataSort);
                    $.each(json.data, function(i) {
                        init((i+1),json.data[i]);
                    })
                }
                if(callback)callback();
            }
        });
    }
})(jQuery);

/*
    Jslider
*/
(function($){
    $.fn.Jslider=function(option,callback){
        if(!this.length)return;
        if (typeof option == "function") {
            callback = option;
            option = {};
        }
        var settings=$.extend({
            auto:false,
            reInit:false,//重新初始化
            data:[],
            defaultIndex:0,
            slideWidth:0,
            slideHeight:0,
            slideDirection:1,//1,left;2,up;3,fadeIn
            speed:"normal",
            stay:5000,
            delay:150,
            maxAmount:null,
            template:null,
            showControls:true
        },option||{});

        var element=$(this),
        elementItems=null,
        elementControls=null,
        elementControlsItems=null,
        mainTimer=null,
        controlTimer=null,
        init=function(){
            var object;
            if(settings.maxAmount&&settings.maxAmount<settings.data.length){
                // settings.data.splice(settings.maxAmount);
                settings.data.splice(settings.maxAmount,settings.data.length-settings.maxAmount);
            }
            if(typeof settings.data=="object"){
                if(settings.data.length){
                    object={};
                    object.json=settings.data;
                }else{
                    object=settings.data;
                }
            }
            var template=settings.template;
            if(settings.reInit){
                var htmlItems,
                    htmlControls=template.controlsContent.process(object);
                object.json=object.json.slice(1);
                htmlItems=template.itemsContent.process(object);
                element.find(".slide-items").eq(0).append(htmlItems);
                element.find(".slide-controls").eq(0).html(htmlControls);
            }else{
                var newTemplate=template.itemsWrap.replace("{innerHTML}",template.itemsContent)+template.controlsWrap.replace("{innerHTML}",template.controlsContent),
                    html=newTemplate.process(object);
                element.html(html);
            }
            elementItems=element.find(".slide-items");
            elementControls=element.find(".slide-controls");
            elementControlsItems=elementControls.find("span");
            bindEvents();
            autoRun();
            if(callback)callback(element);
        },
        bindEvents=function(){
            elementControlsItems.bind("mouseover",function(){
                var index=elementControlsItems.index(this);
                if(index==settings.defaultIndex)return;
                clearTimeout(controlTimer);
                clearInterval(mainTimer);
                controlTimer=setTimeout(function(){
                    play(index);
                },settings.delay);
            }).bind("mouseleave",function(){
                clearTimeout(controlTimer);
                clearInterval(mainTimer);
                autoRun();
            });

            elementItems.bind("mouseover",function(){
                clearTimeout(controlTimer);
                clearInterval(mainTimer);
            }).bind("mouseleave",function(){
                autoRun();
            });
        },
        play=function(index){
            elementControlsItems.each(function(i){
                if(i==index){
                    $(this).addClass("curr");
                }else{
                    $(this).removeClass("curr");
                }
            });
            var left=0,top=0;
            if(settings.slideDirection==3){
                var children=elementItems.children(),
                last=children.eq(settings.defaultIndex),
                current=children.eq(index);
                last.css({"zIndex":0});
                current.css({"zIndex":1});
                last.fadeOut("fast");
                current.fadeIn("slow");
                settings.defaultIndex=index;
            }else{
                if(settings.slideDirection==1){//横向
                    elementItems.css({"width":settings.slideWidth*settings.data.length});
                    left=-settings.slideWidth*index
                }else{//纵向
                    top=-settings.slideHeight*index
                }
                elementItems.animate({
                    top:top+"px",
                    left:left+"px"
                },
                settings.speed,
                function(){
                    settings.defaultIndex=index
                })
            }
        },
        autoRun=function(){
            if(settings.auto){
                mainTimer=setInterval(function(){
                    var v=settings.defaultIndex;
                    v++;
                    if(v==settings.data.length){
                        v=0;
                    }
                    play(v);
                },settings.stay)
            }
        };
        init();
    }
})(jQuery);

/*
    pagination
*/
jQuery.fn.pagination = function(maxentries, opts) {
    opts = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 10,
        current_page: 0,
        num_edge_entries: 0,
        link_to: "#",
        prev_text: "Prev",
        next_text: "Next",
        ellipse_text: "...",
        prev_show_always: true,
        next_show_always: true,
        callback: function() {
            return false;
        }
    }, opts || {});
    return this.each(function() {
        function numPages() {
            return Math.ceil(maxentries / opts.items_per_page);
        }

        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end];
        }

        function pageSelected(page_id, evt) {
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }

        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            if (np == 1) {
                $(".Pagination").css({
                    display: "none"
                });
            }
            var getClickHandler = function(page_id) {
                return function(evt) {
                    return pageSelected(page_id, evt);
                }
            }
            var appendItem = function(page_id, appendopts) {
                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
                appendopts = jQuery.extend({
                    text: page_id + 1,
                    classes: ""
                }, appendopts || {});
                if (page_id == current_page) {
                    var lnk = $("<a href='javascript:void(0)' class='current'>" + (appendopts.text) + "</a>");
                }
                else {
                    var lnk = $("<a>" + (appendopts.text) + "</a>").bind("click", getClickHandler(page_id)).attr('href', opts.link_to.replace(/__id__/, page_id));
                }
                if (appendopts.classes) {
                    lnk.addClass(appendopts.classes);
                }
                panel.append(lnk);
            }
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendItem(current_page - 1, {
                    text: opts.prev_text,
                    classes: "prev"
                });
            }
            if (interval[0] > 0 && opts.num_edge_entries > 0) {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for (var i = 0; i < end; i++) {
                    appendItem(i);
                }
                if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                    jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
            }
            for (var i = interval[0]; i < interval[1]; i++) {
                appendItem(i);
            }
            if (interval[1] < np && opts.num_edge_entries > 0) {
                if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                    jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
                var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                for (var i = begin; i < np; i++) {
                    appendItem(i);
                }
            }
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                appendItem(current_page + 1, {
                    text: opts.next_text,
                    classes: "next"
                });
            }
        }
        var current_page = opts.current_page;
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        var panel = jQuery(this);
        this.selectPage = function(page_id) {
            pageSelected(page_id);
        }
        this.prevPage = function() {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function() {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            }
            else {
                return false;
            }
        }
        drawLinks();
    });
};

/*
    jdThickbox
*/
(function($) {
    $.extend($.browser, {
        client: function() {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                bodyWidth: document.body.clientWidth,
                bodyHeight: document.body.clientHeight
            };
        },
        scroll: function() {
            var dds = document.documentElement.scrollTop;
            var dbs = document.body.scrollTop;
            var ddl = document.documentElement.scrollLeft;
            var dbl = document.body.scrollLeft;
            var top = !!dds ? dds : dbs;
            var left = !!ddl ? ddl : dbl;

            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
                bodyWidth: document.body.scrollWidth,
                bodyHeight: document.body.scrollHeight,
                left: left,
                top: top
            };
        },
        screen: function() {
            return {
                width: window.screen.width,
                height: window.screen.height
            };
        },
        isIE6: $.browser && $.browser.msie && $.browser.version == 6,
        isMinW: function(val) {
            return Math.min($.browser.client().bodyWidth, $.browser.client().width) <= val;
        },
        isMinH: function(val) {
            return $.browser.client().height <= val;
        }
    })
})(jQuery);
(function($) {
    $.fn.jdPosition = function(option) {
        var s = $.extend({
            mode: null
        }, option || {});
        switch (s.mode) {
        default:
        case "center":
            var ow = $(this).outerWidth(),
                oh = $(this).outerHeight();
            var w = $.browser.isMinW(ow),
                h = $.browser.isMinH(oh);

            $(this).css({
                left: $.browser.scroll().left + Math.max(($.browser.client().width - ow) / 2, 0) + "px",
                top: (!$.browser.isIE6)
                    ? (h ? $.browser.scroll().top : ($.browser.scroll().top + Math.max(($.browser.client().height - oh) / 2, 0) + "px"))
                    : (($.browser.scroll().top <= $.browser.client().bodyHeight - oh)
                        ? ($.browser.scroll().top + Math.max(($.browser.client().height - oh) / 2, 0) + "px")
                        : ($.browser.client().height - oh)/2 + "px")
            });
            break;
        case "auto":
            break;
        case "fixed":
            break
        }
    }
})(jQuery);


(function($) {
    $.fn.jdThickBox = function(option, callback) {
        if (typeof option == "function") {
            callback = option;
            option = {}
        };
        var s = $.extend({
            type: "text",
            source: null,
            width: null,
            height: null,
            title: null,
            _frame: "",
            _div: "",
            _box: "",
            _con: "",
            _loading: "thickloading",
            close: false,
            _close: "",
            _fastClose: false,
            _close_val: "×",
            _titleOn: true,
            _title: "",
            _autoReposi: false,
            _countdown: false,
            _thickPadding: 10,
            _wrapBorder:1
        }, option || {});
        var object = (typeof this != "function") ? $(this) : null;
        var timer;
        var close = function() {
            clearInterval(timer);
            $(".thickframe").add(".thickdiv").remove();
            $(".thickbox").empty().remove();
            if (s._autoReposi) {
                $(window).unbind("resize.jdThickBox").unbind("scroll.jdThickBox")
            }
        };
        if (s.close) {
            close();
            return false
        };
        var reg = function(str) {
            if (str != "") {
                return str.match(/\w+/)
            } else {
                return ""
            }
        };
        var init = function(element) {
            if ($(".thickframe").length == 0 || $(".thickdiv").length == 0) {
                $("<iframe class='thickframe' id='" + reg(s._frame) + "' marginwidth='0' marginheight='0' frameborder='0' scrolling='no'></iframe>").appendTo($(document.body));
                $("<div class='thickdiv' id='" + reg(s._div) + "'></div>").appendTo($(document.body))
            } else {
                $(".thickframe").add(".thickdiv").show()
            };
            $("<div class='thickbox' id='" + reg(s._box) + "'><div class='thickwrap'></div></div>").appendTo($(document.body));

            if ( $('.thickwrap') ) {
                $('.thickwrap').css('width', s.width + s._thickPadding*2 );
                s._wrapBorder = 1;
            }
            if (s._titleOn) initTitle(element);
            $("<div class='thickcon' id='" + reg(s._con) + "' style='width:" + s.width + "px;height:" + s.height + "px;'></div>").appendTo($(".thickwrap"));
            if (s._countdown) initCountdown();
            $(".thickcon").addClass(s._loading);

            reposi();
            initClose();
            inputData(element);
            if (s._autoReposi) {
                $(window).bind("resize.jdThickBox", reposi).bind("scroll.jdThickBox", reposi)
            };
            if (s._fastClose) {
                $(document.body).bind("click.jdThickBox", function(e) {
                    e = e ? e : window.event;
                    var tag = e.srcElement ? e.srcElement : e.target;
                    if (tag.className == "thickdiv") {
                        $(this).unbind("click.jdThickBox");
                        close()
                    }
                })
            }
        };
        var initCountdown = function() {
            var x = s._countdown;
            $("<div class='thickcountdown' style='width:" + s.width + "'><span id='jd-countdown'>" + x + "</span>秒后自动关闭</div>").appendTo($(".thickwrap"));
            timer = setInterval(function() {
                x--;
                $("#jd-countdown").html(x);
                if (x == 0) {
                    x = s._countdown;
                    close()
                }
            }, 1000)
        };
        var initTitle = function(element) {
            s.title = (s.title == null && element) ? element.attr("title") : s.title;
            $("<div class='thicktitle' id='" + reg(s._title) + "' style='width:" + s.width + "'><span>" + s.title + "</span></div>").appendTo($(".thickwrap"))
        };
        var initClose = function() {
            if (s._close != null) {
                $("<a href='#' class='thickclose' id='" + reg(s._close) + "'>" + s._close_val + "</a>").appendTo($(".thickwrap"));
                $(".thickclose").one("click", function() {
                    close();
                    return false
                })
            }
        };
        var inputData = function(element) {
            s.source = (s.source == null) ? element.attr("href") : s.source;
            switch (s.type) {
            default:
            case "text":
                $(".thickcon").html(s.source);
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break;
            case "html":
                $(s.source).clone().appendTo($(".thickcon")).show();
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break;
            case "image":
                s._index = (s._index == null) ? object.index(element) : s._index;
                $(".thickcon").append("<img src='" + s.source + "' width='" + s.width + "' height='" + s.height + "'>");
                s.source = null;
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break;
            case "ajax":
            case "json":
                if (callback) {
                    callback(s.source, $(".thickcon"), function() {
                        $(".thickcon").removeClass(s._loading)
                    })
                };
                break;
            case "iframe":
                $("<iframe src='" + s.source + "' marginwidth='0' marginheight='0' frameborder='0' scrolling='no' style='width:" + s.width + "px;height:" + s.height + "px;border:0;'></iframe>").appendTo($(".thickcon"));
                $(".thickcon").removeClass(s._loading);
                if (callback) {
                    callback()
                };
                break
            }
        };
        var reposi = function() {
            var w1 = s._thickPadding*2 + parseInt(s.width);

            $(".thickcon").css({
                width: s.width,
                height:s.height,
                paddingLeft: s._thickPadding,
                paddingRight: s._thickPadding
            });

            // 修复IE9计算 outerHeight 问题: .thickcon在IE9中返回 undefined
            setTimeout(function() {
            $(".thickbox").css({
                    width: w1 + s._wrapBorder*2,
                    height: parseInt(s._titleOn ? $(".thicktitle").outerHeight() : 0) + parseInt($(".thickcon").outerHeight()) + s._wrapBorder*2
            });
            }, 100);

            $(".thickbox").jdPosition({
                mode: "center"
            });
            if ($.browser.isIE6) {
                var ow = $(".thickbox").outerWidth(),
                    oh = $(".thickbox").outerHeight();
                var w2 = $.browser.isMinW(ow),
                    h2 = $.browser.isMinH(oh);
                $(".thickframe").add(".thickdiv").css({
                    width: w2 ? ow : "100%",
                    height: Math.max($.browser.client().height, $.browser.client().bodyHeight) + "px"
                })
            }
        };
        if (object != null) {
            object.click(function() {
                init($(this));
                return false
            })
        } else {
            init()
        }
    };
    $.jdThickBox = $.fn.jdThickBox
})(jQuery);

function jdThickBoxclose() {
    $(".thickclose").trigger("click");
};

/*
    jdMarquee
*/
(function($) {
    $.fn.jdMarquee = function(option, callback) {
        if (typeof option == "function") {
            callback = option;
            option = {}
        };
        var s = $.extend({
            deriction: "up",
            speed: 10,
            auto: false,
            width: null,
            height: null,
            step: 1,
            control: false,
            _front: null,
            _back: null,
            _stop: null,
            _continue: null,
            wrapstyle: "",
            stay: 5000,
            delay: 20,
            dom: "div>ul>li".split(">"),
            mainTimer: null,
            subTimer: null,
            tag: false,
            convert: false,
            btn: null,
            disabled: "disabled",
            pos: {
                ojbect: null,
                clone: null
            }
        }, option || {});
        var object = this.find(s.dom[1]);
        var subObject = this.find(s.dom[2]);
        var clone;
        if (s.deriction == "up" || s.deriction == "down") {
            var height = object.eq(0).outerHeight();
            var step = s.step * subObject.eq(0).outerHeight();
            object.css({
                width: s.width + "px",
                overflow: "hidden"
            })
        };
        if (s.deriction == "left" || s.deriction == "right") {
            var width = subObject.length * subObject.eq(0).outerWidth();
            object.css({
                width: width + "px",
                overflow: "hidden"
            });
            var step = s.step * subObject.eq(0).outerWidth()
        };
        var init = function() {
            var wrap = "<div style='position:relative;overflow:hidden;z-index:1;width:" + s.width + "px;height:" + s.height + "px;" + s.wrapstyle + "'></div>";
            object.css({
                position: "absolute",
                left: 0,
                top: 0
            }).wrap(wrap);
            s.pos.object = 0;
            clone = object.clone();
            object.after(clone);
            switch (s.deriction) {
            default:
            case "up":
                object.css({
                    marginLeft: 0,
                    marginTop: 0
                });
                clone.css({
                    marginLeft: 0,
                    marginTop: height + "px"
                });
                s.pos.clone = height;
                break;
            case "down":
                object.css({
                    marginLeft: 0,
                    marginTop: 0
                });
                clone.css({
                    marginLeft: 0,
                    marginTop: -height + "px"
                });
                s.pos.clone = -height;
                break;
            case "left":
                object.css({
                    marginTop: 0,
                    marginLeft: 0
                });
                clone.css({
                    marginTop: 0,
                    marginLeft: width + "px"
                });
                s.pos.clone = width;
                break;
            case "right":
                object.css({
                    marginTop: 0,
                    marginLeft: 0
                });
                clone.css({
                    marginTop: 0,
                    marginLeft: -width + "px"
                });
                s.pos.clone = -width;
                break
            };
            if (s.auto) {
                initMainTimer();
                object.hover(function() {
                    clear(s.mainTimer)
                }, function() {
                    initMainTimer()
                });
                clone.hover(function() {
                    clear(s.mainTimer)
                }, function() {
                    initMainTimer()
                })
            };
            if (callback) {
                callback()
            };
            if (s.control) {
                initControls()
            }
        };
        var initMainTimer = function(delay) {
            clear(s.mainTimer);
            s.stay = delay ? delay : s.stay;
            s.mainTimer = setInterval(function() {
                initSubTimer()
            }, s.stay)
        };
        var initSubTimer = function() {
            clear(s.subTimer);
            s.subTimer = setInterval(function() {
                roll()
            }, s.delay)
        };
        var clear = function(timer) {
            if (timer != null) {
                clearInterval(timer)
            }
        };
        var disControl = function(A) {
            if (A) {
                $(s._front).unbind("click");
                $(s._back).unbind("click");
                $(s._stop).unbind("click");
                $(s._continue).unbind("click")
            } else {
                initControls()
            }
        };
        var initControls = function() {
            if (s._front != null) {
                $(s._front).click(function() {
                    $(s._front).addClass(s.disabled);
                    disControl(true);
                    clear(s.mainTimer);
                    s.convert = true;
                    s.btn = "front";
                    initSubTimer();
                    if (!s.auto) {
                        s.tag = true
                    };
                    convert()
                })
            };
            if (s._back != null) {
                $(s._back).click(function() {
                    $(s._back).addClass(s.disabled);
                    disControl(true);
                    clear(s.mainTimer);
                    s.convert = true;
                    s.btn = "back";
                    initSubTimer();
                    if (!s.auto) {
                        s.tag = true
                    };
                    convert()
                })
            };
            if (s._stop != null) {
                $(s._stop).click(function() {
                    clear(s.mainTimer)
                })
            };
            if (s._continue != null) {
                $(s._continue).click(function() {
                    initMainTimer()
                })
            }
        };
        var convert = function() {
            if (s.tag && s.convert) {
                s.convert = false;
                if (s.btn == "front") {
                    if (s.deriction == "down") {
                        s.deriction = "up"
                    };
                    if (s.deriction == "right") {
                        s.deriction = "left"
                    }
                };
                if (s.btn == "back") {
                    if (s.deriction == "up") {
                        s.deriction = "down"
                    };
                    if (s.deriction == "left") {
                        s.deriction = "right"
                    }
                };
                if (s.auto) {
                    initMainTimer()
                } else {
                    initMainTimer(4 * s.delay)
                }
            }
        };
        var setPos = function(y1, y2, x) {
            if (x) {
                clear(s.subTimer);
                s.pos.object = y1;
                s.pos.clone = y2;
                s.tag = true
            } else {
                s.tag = false
            };
            if (s.tag) {
                if (s.convert) {
                    convert()
                } else {
                    if (!s.auto) {
                        clear(s.mainTimer)
                    }
                }
            };
            if (s.deriction == "up" || s.deriction == "down") {
                object.css({
                    marginTop: y1 + "px"
                });
                clone.css({
                    marginTop: y2 + "px"
                })
            };
            if (s.deriction == "left" || s.deriction == "right") {
                object.css({
                    marginLeft: y1 + "px"
                });
                clone.css({
                    marginLeft: y2 + "px"
                })
            }
        };
        var roll = function() {
            var y_object = (s.deriction == "up" || s.deriction == "down") ? parseInt(object.get(0).style.marginTop) : parseInt(object.get(0).style.marginLeft);
            var y_clone = (s.deriction == "up" || s.deriction == "down") ? parseInt(clone.get(0).style.marginTop) : parseInt(clone.get(0).style.marginLeft);
            var y_add = Math.max(Math.abs(y_object - s.pos.object), Math.abs(y_clone - s.pos.clone));
            var y_ceil = Math.ceil((step - y_add) / s.speed);
            switch (s.deriction) {
            case "up":
                if (y_add == step) {
                    setPos(y_object, y_clone, true);
                    $(s._front).removeClass(s.disabled);
                    disControl(false)
                } else {
                    if (y_object <= -height) {
                        y_object = y_clone + height;
                        s.pos.object = y_object
                    };
                    if (y_clone <= -height) {
                        y_clone = y_object + height;
                        s.pos.clone = y_clone
                    };
                    setPos((y_object - y_ceil), (y_clone - y_ceil))
                };
                break;
            case "down":
                if (y_add == step) {
                    setPos(y_object, y_clone, true);
                    $(s._back).removeClass(s.disabled);
                    disControl(false)
                } else {
                    if (y_object >= height) {
                        y_object = y_clone - height;
                        s.pos.object = y_object
                    };
                    if (y_clone >= height) {
                        y_clone = y_object - height;
                        s.pos.clone = y_clone
                    };
                    setPos((y_object + y_ceil), (y_clone + y_ceil))
                };
                break;
            case "left":
                if (y_add == step) {
                    setPos(y_object, y_clone, true);
                    $(s._front).removeClass(s.disabled);
                    disControl(false)
                } else {
                    if (y_object <= -width) {
                        y_object = y_clone + width;
                        s.pos.object = y_object
                    };
                    if (y_clone <= -width) {
                        y_clone = y_object + width;
                        s.pos.clone = y_clone
                    };
                    setPos((y_object - y_ceil), (y_clone - y_ceil))
                };
                break;
            case "right":
                if (y_add == step) {
                    setPos(y_object, y_clone, true);
                    $(s._back).removeClass(s.disabled);
                    disControl(false)
                } else {
                    if (y_object >= width) {
                        y_object = y_clone - width;
                        s.pos.object = y_object
                    };
                    if (y_clone >= width) {
                        y_clone = y_object - width;
                        s.pos.clone = y_clone
                    };
                    setPos((y_object + y_ceil), (y_clone + y_ceil))
                };
                break
            }
        };
        if (s.deriction == "up" || s.deriction == "down") {
            if (height >= s.height && height >= s.step) {
                init()
            }
        };
        if (s.deriction == "left" || s.deriction == "right") {
            if (width >= s.width && width >= s.step) {
                init()
            }
        }
    }
})(jQuery);

/*
    $.login
*/
$.login = function(options) {
    options = $.extend({
        loginService: "http://passport."+ pageConfig.FN_getDomain() +"/loginservice.aspx?callback=?",
        loginMethod: "Login",
        loginUrl: "https://passport."+ pageConfig.FN_getDomain() +"/new/login.aspx",
        returnUrl: location.href,
        automatic: true,
        complete: null,
        modal: false
    }, options || {});
    if (options.loginService != "" && options.loginMethod != "") {
        $.getJSON(options.loginService, {
            method: options.loginMethod
        }, function(result) {
            if (result != null) {
                if (options.complete != null) {
                    options.complete(result.Identity)
                }
                if (!result.Identity.IsAuthenticated && options.automatic && options.loginUrl != "") {
                    if (options.modal) {
                        jdModelCallCenter.login()
                    } else {
                        location.href = options.loginUrl + "?ReturnUrl=" + escape(options.returnUrl)
                    }
                }
            }
        })
    }
};

/*
    friend

var jdFriendUrl = 'http://club.jd.com/jdFriend/TuiJianService.aspx';

function FriendScript() {
    var param = getparam();
    if (param != "") {
        var js = document.createElement('script');
        js.type = 'text/javascript';
        js.src = jdFriendUrl + '?roid=' + Math.random() + param;
        js.charset = 'GB2312';
        document.getElementsByTagName('head')[0].appendChild(js)
    }
}
window.onload = function() {
    FriendScript()
};
*/
function getparam() {
    var sid = "";
    var type = "";
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        if (pairs[i].substring(0, pos) == "sid") {
            sid = unescape(pairs[i].substring(pos + 1))
        }
        if (pairs[i].substring(0, pos) == "t") {
            type = unescape(pairs[i].substring(pos + 1))
        }
    }
    if (sid != "" || type != "") {
        return "&sid=" + escape(sid) + "&t=" + escape(type)
    } else {
        return ""
    }
};

/*
    jdCalcul
*/
(function($) {
    $.jdCalcul = function(pids) {
        var arr = null;
        var pids = pids.join(",");
        //var dataUrl = "http://qiang.jd.com/HomePageLimitBuy.ashx?callback=?&ids=" + pids;
        var dataUrl = "http://qiang.jd.com/HomePageNewLimitBuy.ashx?callback=?&ids=" + pids;
        var purl = "http://item.jd.com/";
        var init = function(data) {
            var s = $.extend({
                contentid: "#limit",
                clockid: "#clock",
                rankid: "#rank",
                limitid: "#limitbuy"
            },
            data || {});
            if (data == {} || data == "" || s.start == null || s.start == "" || s.end == null || s.end == ""  || s.pros.length < 1) {
                return;
            };
            s.start = format(s.start);
            s.start = ($.browser.mozzia) ? Date.parse(s.start) : s.start;
            s.server = format(s.server);
            s.server = ($.browser.mozzia) ? Date.parse(s.server) : s.server;
            s.end = format(s.end);
            s.end = ($.browser.mozzia) ? Date.parse(s.end) : s.end;
            s.contentid = $(s.contentid + s.qid);
            s.clockid = $(s.clockid + s.qid);
            s.rankid = $(s.rankid + s.qid);
            s.limitid = $(s.limitid + s.qid);
            var ST = (s.start - s.server) / 1000,
            H,
            M,
            S,
            timer;
            var ET = (s.end - s.server) / 1000;
            var createHtml = function() {
                var html = "<li><div class=\"p-img\"><a href=\"{6}{0}.html\" target=\"_blank\"><img src=\"{1}\" width=\"100\" height=\"100\" /></a>{2}</div><div class=\"p-name\"><a href=\"{6}{0}.html\" target=\"_blank\">{3}</a></div><div class=\"p-price\">抢购价：<strong>{4}</strong>{5}</div></li>";
                var html1 = "<ul>";
                $.each(s.pros,
                function(i) {
                    var id = s.pros[i].id,
                    tp = s.pros[i].tp,
                    //zt = (s.pros[i].zt == 1) ? "<div class='pi9'></div>": "<div class='pi10'></div>",
                    zt = "<div class='pi9'></div>",
                    mc = unescape(s.pros[i].mc),
                    qg = s.pros[i].qg,
                    zk = "(" + s.pros[i].zk + "折)";
                    html1 += html.replace(/\{0\}/g, id).replace("{1}", tp).replace("{2}", zt).replace("{3}", mc).replace("{4}", qg).replace("{5}", zk).replace(/\{6\}/g, purl);
                });
                html1 += "</ul>";
                s.contentid.html(html1);
            };
            var run = function() {
                if (ST > 0) {
                    return;
                } else {
                    if (ET > 0) {
                        H = Math.floor(ET / 3600);
                        M = Math.floor((ET - H * 3600) / 60);
                        S = (ET - H * 3600) % 60;
                        s.clockid.html("剩余<b>" + H + "</b>小时<b>" + M + "</b>分<b>" + S + "</b>秒");
                        ET--;
                    } else {
                        s.clockid.html("抢购结束");
                        clearInterval(timer);
                        s.limitid.hide();
                        if (s.rankid.length > 0) {
                            s.rankid.show();
                        }
                    }
                }
            };
            if (ST <= 0 && ET > 0) {
                createHtml();
                if (s.rankid.length > 0) {
                    s.rankid.hide();
                }
                s.limitid.show();
            };
            run();
            timer = setInterval(function() {
                run()
            },
            1000);
        };
        var format = function(t) {
            var T = t.split(" ");
            var A = T[0].split("-");
            var B = T[1].split(":");
            return new Date(A[0], A[1] - 1, A[2], B[0], B[1], B[2]);
        };
        $.ajax({
            url: dataUrl,
            dataType: "jsonp",
            success: function(json) {
                if (json) {
                    arr = json.data;
                    $.each(arr,
                    function(i) {
                        init(arr[i]);
                    })
                }
            }
        })
    }
})(jQuery);

/*
    mlazyload
*/
function mlazyload(option) {
    var settings = {
        defObj: null,
        defHeight: 0,
        fn: null
    };
    settings = $.extend(settings, option || {});
    var defHeight = settings.defHeight,
        defObj = (typeof settings.defObj == "object") ? settings.defObj : $(settings.defObj);
    if (defObj.length < 1) {
        return
    };
    var pageTop = function() {
        var d = document,
            y = (navigator.userAgent.toLowerCase().match(/iPad/i) == "ipad") ? window.pageYOffset : Math.max(d.documentElement.scrollTop, d.body.scrollTop);
        return d.documentElement.clientHeight + y - settings.defHeight
    };
    var moduleLoad = function() {
        if (defObj.offset().top <= pageTop() && !defObj.attr("load")) {
            defObj.attr("load", "true");
            if (settings.fn) {
                settings.fn();
            }
        }
    };
    moduleLoad();
    $(window).bind("scroll", function() {
        moduleLoad();
    });
}

/*
    getrecent
*/
var jdRecent = {
    element: $("#recent ul"),
    jsurl: "http://www.jd.com/lishiset.aspx?callback=jdRecent.setData&id=",
    cookiename: "_recent",
    list: $.cookie("_recent"),
    url: location.href,
    init: function() {
        var _matchStr = this.url.match(/\/(\d{6}).html/);
        var _id = (_matchStr != null && _matchStr[0].indexOf("html") != -1) ? _matchStr[1] : "";
        if (!this.list || this.list == null || this.list == "") {
            if (_id == "") {
                return this.getData(0);
            } else {
                this.list = _id;
            }
        } else {
            if (_id == "" || this.list.indexOf(_id) != -1) {
                this.list = this.list;
            } else {
                if (this.list.split(".").length >= 10) {
                    this.list = this.list.replace(/.\d+$/, "");
                }
                this.list = _id + "." + this.list;
            }
        }
        $.cookie(this.cookiename, this.list, {
            expires: 7,
            path: "/",
            domain: "jd.com",
            secure: false
        });
        this.getData(this.list);
    },
    clear: function() {
        $.cookie(this.cookiename, "", {
            expires: 7,
            path: "/",
            domain: "jd.com",
            secure: false
        });
    },
    getData: function(list) {
        if (list == 0) {
            this.element.html("<li><div class='norecode'>暂无记录!</div></li>");
            return;
        }
        var rec = list.split(".");
        for (i in rec) {
            if (i == 0) {
                this.element.empty()
            };
            $.getJSONP(this.jsurl + rec[i], this.setData);
        }
    },
    setData: function(result) {
        this.element.append("<li><div class='p-img'><a href='" + result.url + "'><img src='" + result.img + "' /></a></div><div class='p-name'><a href='" + result.url + "'>" + decodeURIComponent(result.name) + "</a></div></li>");
    }
};
$("#clearRec").click(function() {
    jdRecent.clear();
    jdRecent.getData(0);
});
mlazyload({
    defObj: "#recent",
    defHeight: 50,
    fn: function() {
        if (jdRecent.element.length == 1) {
            jdRecent.init();
        }
    }
});


/*
    jdModelCallCenter#20110126
*/
var jdModelCallCenter = {
    settings: {
        clstag1: 0,
        clstag2: 0
    },
    tbClose: function() {
        if ($(".thickbox").length != 0) {
            jdThickBoxclose()
        }
    },
    login: function() {
        this.tbClose();
        var _this = this;
        var userAgent = navigator.userAgent.toLowerCase(),
            flag = (userAgent.match(/ucweb/i) == "ucweb" || userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4");
        if (flag) {
            location.href = "https://passport."+ pageConfig.FN_getDomain() +"/new/login.aspx?ReturnUrl=" + escape(location.href);
            return;
        }
        setTimeout(function() {
            $.jdThickBox({
                type: "iframe",
                title: "您尚未登录",
                source: "http://passport.jd.com/uc/popupLogin2013?clstag1=" + _this.settings.clstag1 + "&clstag2=" + _this.settings.clstag2 + "&r=" + Math.random(),
                width: 390,
                height: 450,
                _title: "thicktitler",
                _close: "thickcloser",
                _con: "thickconr"
            })
        }, 20)
    },
    regist: function() {
        var _this = this;
        this.tbClose();
        setTimeout(function() {
            $.jdThickBox({
                type: "iframe",
                title: "您尚未登录",
                source: "http://reg.jd.com/reg/popupPerson?clstag1=" + _this.settings.clstag1 + "&clstag2=" + _this.settings.clstag2 + "&r=" + Math.random(),
                width: 390,
                height: 450,
                _title: "thicktitler",
                _close: "thickcloser",
                _con: "thickconr"
            })
        }, 20)
    },
    init: function() {
        var _this = this;

        $.ajax({
            url: ('https:' == document.location.protocol ? 'https://' : 'http://') + "passport."+ pageConfig.FN_getDomain() +"/new/helloService.ashx?m=ls&sso=0",
            dataType:"jsonp",
            success:function(json){
                _this.tbClose();
                if(json&&json.info){
					if ($("#ttbar-login").size()) {
						$("#ttbar-login").html(json.info);
					}else {
						$("#loginbar").html(json.info);
					}
                    
                }
                _this.settings.fn();
            }
        });
/*        $.getJSON("http://passport.360buy.com/new/loginwebservice.aspx?callback=?", {
            method: "GetHello"
        }, function(result) {
            _this.tbClose();
            if (result && result.info != "") {
                $("#shortcut .fore1").html(result.info)
            }
            _this.settings.fn()
        })*/
    }
};


/*
    autoLocation#20110411
*/
$.extend(jdModelCallCenter, {
    autoLocation: function(url) {
        var _this = this;
        $.login({
            modal: true,
            complete: function(result) {
                if (result != null && result.IsAuthenticated != null && result.IsAuthenticated) {
                    window.location = url
                }
            }
        })
    }
});

/*
    doAttention
*/
$.extend(jdModelCallCenter, {
    doAttention: function(productId) {
        //var serviceUrl = "http://t."+ pageConfig.FN_getDomain() +"/regard/follow.action?callback=?";
        var serviceUrl = 'http://t.jd.com/product/followProduct.action?productId=' + productId;

        $.login({
            modal: true,
            complete: function(result) {

                if (result != null && result.IsAuthenticated != null && result.IsAuthenticated) {

                    var widthA = 510;
                    var heightA = 440;

                    $.jdThickBox({
                        type: "iframe",
                        source: serviceUrl + "&t=" + Math.random(),
                        width: widthA,
                        height: heightA,
                        title: "提示",
                        _box: "attboxr",
                        _con: "attconr",
                        _countdown: false
                    }, function() {

                        //var _mvq = window._mvq = window._mvq || [];
                        //_mvq.push([ '$setGeneral', 'concern', '', '', '' ]);
                        //_mvq.push([ '$addItem', '', productId, '', '', '' ]);
                        //_mvq.push([ '$logData' ]);

                    });

                }
            }
        })
    }
});

/*
    btn-coll
*/
$(".btn-coll").livequery("click", function() {
    var current = $(this);
    var productId = parseInt(current.attr("id").replace("coll", ""));
    $.extend(jdModelCallCenter.settings, {
        clstag1: "login|keycount|5|3",
        clstag2: "login|keycount|5|4",
        id: productId,
        fn: function() {
            jdModelCallCenter.doAttention(this.id)
        }
    });
    jdModelCallCenter.settings.fn()
});


////////////////////////////////////////////////////////////////////////////////页面公用模块

if ( typeof pageConfig !== 'undefined' ) {
    pageConfig.isHome = (function() {
        return pageConfig.navId&&pageConfig.navId=="home"&&location.href.indexOf('www.jd.com')>=0;
    })();
}

/**
* @bigiframe
*/
//$.bigiframe = function(obj,width,height){
	//if (obj && $.browser.msie && $.browser.version == 6) {
		//if (typeof(width) == 'undefined') {
			//var width = obj.outerWidth();
		//}

		//if (typeof(height) == 'undefined') {
			//var height = obj.outerHeight();
		//}

		//var html  =  '<iframe src="javascript:false;" frameBorder="0" style="width:'+width+'px;height:'+height+'px;position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0);top:0;left:0;">';
		//obj.append(html);
	//}
//};
$.bigiframe = function(obj,width,height){
	if (obj && $.browser.msie && $.browser.version == 6) {
		if (typeof(width) == 'undefined') {
			var width = obj.outerWidth();
		}

		if (typeof(height) == 'undefined') {
			var height = obj.outerHeight();
		}

		var html  =  '<iframe src="javascript:false;" frameBorder="0" style="width:'+width+'px;height:'+height+'px;position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0);top:0;left:0;" id="bigiframe">';
		obj.append(html);

        obj.bind('mouseenter', function () {
            obj.find('#bigiframe').show()
        }).bind('mouseleave', function () {
            obj.find('#bigiframe').hide()
        });
	}
};

////2014-9-9
function getHashProbability(strNum, baseNum){
    function hashCode(str) {
      for (var result = 0, i = 0; i < str.length; i++) {
            result = (result << 5) - result + str.charCodeAt(i);
            result &= result;
        }
        return result;
    }

    return Math.abs(hashCode(strNum)) % baseNum;
}

function clothingAbTest(){
    if(pageConfig.navId == "home"){
        var __jda = CookieUtil.getCookie('__jda');
        if(__jda){
            var flag = getHashProbability(__jda, 10000);
            var itemClothing = $('#_JD_ALLSORT div.fore6');

            var linkTwoLev1 = itemClothing.find('.subitem .fore1 dt a');
            var linkTwoLev2 = itemClothing.find('.subitem .fore2 dt a');

			if(flag <= 5000) {
                itemClothing.find('h3').html('<a href="http://channel.jd.com/1315-1342.html" clstag="homepage|keycount|home2013|0606a4">男装</a>、<a href="http://channel.jd.com/1315-1343.html" clstag="homepage|keycount|home2013|0606a3">女装</a>、<a href="http://channel.jd.com/1315-1345.html" clstag="homepage|keycount|home2013|0606a5">内衣</a>、<a href="http://channel.jd.com/jewellery.html" clstag="homepage|keycount|home2013|0606a6">珠宝</a>');

                linkTwoLev1.attr('clstag', 'homepage|keycount|home2013|0606b3');
                linkTwoLev2.attr('clstag', 'homepage|keycount|home2013|0606b4');
            }else{

                itemClothing.find('h3').html('<a href="http://channel.jd.com/clothing.html" clstag="homepage|keycount|home2013|0606a1">服饰内衣</a>、<a href="http://channel.jd.com/jewellery.html" clstag="homepage|keycount|home2013|0606a2">珠宝首饰</a>');

                linkTwoLev1.attr('clstag', 'homepage|keycount|home2013|0606b1');
                linkTwoLev2.attr('clstag', 'homepage|keycount|home2013|0606b2');
            }
        }
    }
}
//clothingAbTest();

// 推荐系统公用对象
var GlobalReco = function(opts) {
    // 推荐位参数
    this.param = $.extend({
        lid   : readCookie('ipLoc-djd') || '',
        lim   : 6,
        ec    : 'utf-8',
        uuid  : -1,
        pin   : readCookie('pin') || ''
    }, opts.param);

    this.$el       = opts.$el;
    this.template = opts.template;

    // 是否重组JSON结果集合，每组 n 条数据
    /*
    >> Before
    data: [
        {},
        {},
        {},
        {},
        {},
        {}
        ...
    ]
    >> After
    data: [
        {
            tabs: [{}, {}, {}]
        },
        {
            tabs: [{}, {}, {}]
        },
        ...
    ]
     */
    this.reBuildJSON = opts.reBuildJSON;

    // sku集合，挂载到pageConfig上的哪个变更
    this.skuHooks = opts.skuHooks || 'SKUS_recommend';
    this.ext = opts.ext || {};

    this.callback   = opts.callback || function() {};
    this.debug    = opts.debug;

    if ( !this.param.p ) {
        throw new Error('The param [p] is not Specificed');
    }

    this.init();
};
GlobalReco.prototype = {
    init: function() {
        var __jda = readCookie('__jda');

        if ( this.param.lid.indexOf('-') > 0 ) {
            this.param.lid = this.param.lid.split('-')[0];
        } else {
            this.param.lid = '1';
        }

        // split uuid
        if ( __jda ) {
            if ( __jda.split('.')[1] == '-' ) {
                this.param.uuid = -1;
            } else {
                this.param.uuid = __jda.split('.')[1];
            }
        } else {
            this.param.uuid = -1;
        }

        this.get(this.rid);
    },
    get: function(rid, skus) {
        var _this = this;
        var i;
        var queryParam = pageConfig.queryParam;
        var extParam = [];;

        // 1，2，3级分类
        if ( pageConfig.product ) {
            for ( i = 0; i < pageConfig.product.cat.length; i++ ) {
                this.param['c'+(i+1)] = pageConfig.product.cat[i];
            }
        }

        if ( queryParam ) {
            for ( var k in queryParam ) {
                if ( queryParam.hasOwnProperty(k) ) {
                    if ( k == 'c1' || k == 'c2' || k == 'c3' ) {
                        _this.param[k] = queryParam[k];
                    } else {
                        extParam.push(k + ':' + queryParam[k]);
                    }
                }
            }
            _this.param.hi = extParam.join(',');
        }
        if ( this.debug ) {
            console.info( 'http://diviner.jd.com/diviner?' + decodeURIComponent($.param(this.param)) );
        }
        $.ajax({
            url: 'http://diviner.jd.com/diviner?' + decodeURIComponent($.param(this.param)),
            dataType: 'jsonp',
            scriptCharset: this.param.ec,
            cache: true,
            jsonpCallback: 'call' + parseInt((Math.random()*100000), 10),
            success: function(r) {
                var hasData = !!(r.success && r && r.data && r.data.length);
                if ( hasData ) {
                    _this.set(r);
                } else {
                    _this.$el.html('<div class="ac">「暂无数据」</div>');
                }
                if ( this.debug ) {
                    console.log(r);
                }

                _this.callback.apply(_this, [hasData, r]);
            }
        });
    },
    set: function(data) {
        pageConfig[this.skuHooks] = [];

        // 挂载sku全局变量钩子
        data.skuHooks = this.skuHooks;

        // 扩展字段调用
        data.ext = this.ext;

        if ( this.reBuildJSON && this.reBuildJSON > 0 ) {
            data.data = tools.reBuildJSON(data.data, this.reBuildJSON);
        }

        if ( this.debug ) {
            alert(this.template.process(data));
        }
        try {
            this.$el.show().html(this.template.process(data));
        } catch(err) {
            if ( /isdebug/.test(location.href) && typeof console !== 'undefined' ) {
                console.error( '[pid=' + this.param.p + '] ' + err);
            }
        }

        //tools.priceNum({
            //skus: pageConfig[this.skuHooks],
            //$el: this.$el
        //});
        this.setTrackCode(data.impr);
    },
    setTrackCode: function(str) {
        var list = this.$el.find('li');
        var _this = this;
        var exParam = '&m=UA-J2011-1&ref=' + encodeURIComponent(document.referrer);

        list.each(function() {
            var clk = $(this).attr('data-clk');

            $(this).bind('click', function(e) {
                var currTagName = $(e.target);
                if (currTagName.is('a') || currTagName.is('img') || currTagName.is('span')) {
                    _this.newImage(clk + exParam, true);
                }
                if (currTagName.is('input') && currTagName.attr('checked') == true ) {
                    _this.newImage(clk + exParam, true);
                }
            });
        });

        this.newImage(str + exParam, true);
    },
    newImage: function(src, random, callback) {
        var img = new Image();
        src = random ? (src + '&random=' + Math.random()+''+(new Date)) : src;

        img.onload = function() {
            if ( typeof callback !== 'undefined' ) {
                callback(src);
            }
        };

        img.setAttribute('src', src);
    }
};

/*
    category
*/
//???

//我的京东
//???

//购物车结算
//???

// 通知弹出层
var NotifyPop = {
    _saleNotify: 'http://skunotify.'+ pageConfig.FN_getDomain() +'/pricenotify.html?',
    _stockNotify: 'http://skunotify.'+ pageConfig.FN_getDomain() +'/storenotify.html?',
    init: function($btn, skuAttr) {
        var that = this,
            p = this.serializeUrl(location.href),
            query = /from=weibo/.test(location.href)? location.search.replace(/\?/, '') : '',
            type;

        // 微博callback url
        if ( /from=weibo/.test(location.href) ) {
            type = p.param.type;
            this.setThickBox(type, query);
        }

        // 形如<a href="" data-type="1" data-sku="1234456">到货通知</a>按钮
        $btn.livequery('click', function() {
            //btn-notice
            var _this = this,
                id = $(this).attr('id'),
                type = $(this).attr('data-type') || 2;

            that.sku = $(this).attr('data-sku');

            that.checkLogin(function(r) {
                if (!r.IsAuthenticated) {
                    jdModelCallCenter.settings.fn = function() {
                        that.checkLogin(function(d) {
                            if (d.IsAuthenticated) {
                                that._userPin = d.Name;
                                that.setThickBox(type, query);
                            }
                        });
                    };
                    jdModelCallCenter.login();
                } else {
                    that._userPin = r.Name;
                    that.setThickBox(type, query);
                }
            });
            return false;
        }).attr('href', '#none').removeAttr('target');
    },
    serializeUrl: function(url) {
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
    },
    checkLogin: function(cb) {
        if ( typeof cb !== 'function' ) { return; }

        $.getJSON('http://passport.' + pageConfig.FN_getDomain() + '/loginservice.aspx?method=Login&callback=?', function(r) {
            if ( r.Identity ) {
                cb(r.Identity);
            }
        });
    },
    setThickBox: function(type, query) {
        //webSite=1&origin=1&source=1
        var title,url, w, h,
            param = {
                skuId: this.sku,
                pin: this._userPin,
                webSite: 1,
                origin: 1,
                source: 1
            },
            p = this.serializeUrl(location.href);

        if ( /blogPin/.test(location.href) ) {
            param.blogPin = p.param.blogPin;
        }

        if ( type == 1 ) {
            title = '降价通知';
            url = this._saleNotify;
            h = 250;
        }
        if ( type == 2 ) {
            title = '到货通知';
            url = this._stockNotify;
            h = 210;
            param.storeAddressId = readCookie('ipLoc-djd') || '0-0-0';
        }

        if ( !!query ) {
            url = url + query;
        } else {
            url = url + $.param(param);
        }
        $.jdThickBox({
            type: 'iframe',
            source: decodeURIComponent(url) + '&nocache=' + (+new Date()),
            width: 500,
            height: h,
            title: title,
            _box: "notify_box",
            _con: "notify_con",
            _title: "notify_title"
        });
    }
};

(function(){
    //ImgError
    pageConfig.FN_ImgError(document);

    //Jlazyload
    $("img[data-lazyload]").Jlazyload({
        type:"image",
        placeholderClass:"err-product"
    });

    //分类
    //category.FN_Init(); 
	//???

    //shortcut
	//???
    
    //登录
	//???
   
    //迷你购物车 ???
    //???

    //我的京东 ???
    //???

    //onkeyup
    document.onkeyup=function(e){
        var tagName=document.activeElement.tagName.toLowerCase();
        if(tagName=="input"||tagName=="textarea")return;
        var e=e?e:window.event,
        code=e.keyCode||e.which;
        switch(code){
            case 68://down
                if(!window.pageConfig.clientViewTop){
                    window.pageConfig.clientViewTop=0;
                }
                window.pageConfig.clientViewTop+=document.documentElement.clientHeight;
                window.scrollTo(0,pageConfig.clientViewTop);
                break;
            case 83://search
                window.scrollTo(0,0);
                window.pageConfig.clientViewTop=0;
                document.getElementById("key").focus();
                break;
            case 84://top
                window.scrollTo(0,0);
                window.pageConfig.clientViewTop=0;
                break;
            default:
                break;
        }
    }

})();

/*search input suggest box ///???
 * 2012-5-31:
 * update expand attribute (price, brand) url
 * 2012-06-05 Tuesday:
 * update search box background color
 */

pageConfig.FN_InitSidebar=function(){
    if(!$("#toppanel").length){
        $(document.body).prepend("<div class=\"w ld\" id=\"toppanel\"></div>");
    }
    $("#toppanel").append("<div id=\"sidepanel\" class=\"hide\"></div>");
    var object=$("#sidepanel");
    this.scroll=function(){
        var _this=this;
        $(window).bind("scroll",function(){
            var top=document.body.scrollTop||document.documentElement.scrollTop;
            if(top==0){
                object.hide()
            }else{
                object.show()
            }
        });
        _this.initCss();
        $(window).bind("resize",function(){
            _this.initCss();
        });
    };
    this.initCss=function(){
        var css,width=pageConfig.compatible?1210:990;
        if(screen.width>=1210){
            if($.browser.msie&&$.browser.version<=6){
                css={"right":"-26px"}
            }else{
                css={
                    "right":(document.documentElement.clientWidth-width)/2-26+"px"
                }
            }
            object.css(css)
        }
    };
    this.addCss=function(a){
        object.css(a)
    };
    this.addItem=function(a){
        object.append(a)
    };
    this.setTop=function(){
        this.addItem("<a href='#' class='gotop' title='使用快捷键T也可返回顶部哦！'><b></b>返回顶部</a>");
    }
};

/*
 * Product Contrast init
 */
pageConfig.FN_InitContrast = function( cookieName, script, pageType ) {
    var cookieName = cookieName || '_contrast',
        pageType = pageType || 'list',
        script = script || 'http://misc.360buyimg.com/product/m/1.0.0/widget/p-compare/p-compare.js',
        status = readCookie( cookieName + '_status' );

    if ( pageConfig.isInitContrast ) { return false; }
    if ( (status == 'show' || status == 'side') && !!readCookie( cookieName ) == true  ) {
        $.ajax({
            url: script,
            dataType: 'script',
            cache: true,
            success: function() {
                if ( Contrast ) { Contrast.init( pageType, cookieName ); }
            }
        });
    } else {

        $('.btn-compare').bind( 'click', function() {
            var skuid = this.getAttribute('skuid');

            $.ajax({
                url: script,
                dataType: 'script',
                cache: true,
                success: function() {
                    if ( Contrast ) { Contrast.init( pageType, cookieName ).showPopWin( skuid ); }
                }
            });
        });
    }
    pageConfig.isInitContrast = 1;
};

/*
 gloablPatch
*/
if ( !/debug=global/.test(location.href) ) {
    $.ajax({
        url: 'http://nfa.jd.com/loadFa_toJson.js?aid=2_601_5095',
        dataType: 'script',
        scriptCharset: 'gbk',
        cache: true
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @globalInit
 * @2015-3-24 http://quan.jd.com/user_quan.action 优惠券
 * @2015-3-24 http://usergrade.jd.com/user/grade 我的级别
 * @2015-3-24 http://life.jd.com/localOrder/iniOrder.do 本地生活
 */

//if(!pageConfig.hfInit){
//	pageConfig.hfInit = true;
//	if(typeof(seajs) != 'undefined'){
//		seajs.use(['jdf/1.0.0/unit/globalInit/2.0.0/globalInit.js'],function(globalInit){
//			globalInit();
//		});
//	}
//}