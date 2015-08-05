define(function(require,exports,module){
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');
});

/*
*@livequery
*@为兼容旧版
*/
(function(){
	$.fn.livequery = function(event,callback){
		$(this).live(event,callback);
		//$(document).delegate( this, event, callback);
		return this;
	}
})();

/*
*jmsajax
 *@
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
        isIE6: function(){
			 return $.browser.msie && $.browser.version == 6;
        },
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
                top: (!$.browser.isIE6()) 
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
            if ($.browser.isIE6()) {
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
        var dataUrl = "http://qiang.jd.com/HomePageLimitBuy.ashx?callback=?&ids=" + pids;
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
                    zt = (s.pros[i].zt == 1) ? "<div class='pi9'></div>": "<div class='pi10'></div>",
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
* getrecent
* @最近浏览记录,现在都没用过了 删除了 2014-1-7 17:26:42
*/

/*
    jdModelCallCenter#20110126
*/