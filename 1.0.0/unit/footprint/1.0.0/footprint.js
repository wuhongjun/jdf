/**
* @统计增点 
* @来自 http://svn1.360buy-develop.com/arch/fe/product/modules/trunk/app/js/footprint.js
* @Searching 18715 files for "og (type1, type2, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9"
* @\product\item\trunk\app\js\iplocation_server.js:
* @\product\item\trunk\app\js\product.js:
* @\product\modules\trunk\app\js\footprint.js:
* @3 matches across 3 files
*/

/* ---------- 埋点公用 ---------- */
function log (type1, type2, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    var data = '';
    for (i = 2; i < arguments.length; i++) {
        data = data + arguments[i] + '|||';
    }
    var pin = decodeURIComponent(escape(getCookie("pin")));
    var loguri = 'http://csc.'+ pageConfig.FN_getDomain() +'/log.ashx?type1=$type1$&type2=$type2$&data=$data$&pin=$pin$&referrer=$referrer$&jinfo=$jinfo$&callback=?';
    var url = loguri.replace(/\$type1\$/, escape(type1));
    url = url.replace(/\$type2\$/, escape(type2));
    url = url.replace(/\$data\$/, escape(data));
    url = url.replace(/\$pin\$/, escape(pin));
    url = url.replace(/\$referrer\$/, escape(document.referrer));
    url = url.replace(/\$jinfo\$/, escape(''));
    $.getJSON(url, function() {});

    var traceurl = ("https:" == document.location.protocol ? "https://mercuryssl" : "http://mercury") + ".jd.com/log.gif"
                    + "?t=other.000000"
                    + "&m=UA-J2011-1"
                    + "&v=" + encodeURIComponent('t1='+type1+'$t2='+type2+'$p0='+data)
                    + "&ref=" + encodeURIComponent(document.referrer)
                    + "&rm=" + (new Date).getTime();
    var d = new Image(1, 1);
    d.src = traceurl;
}
/**
 * 新版-点击流统计-页面pv和显示次数
 * wpid 主商品三级分类，没有为空串''
 * psku 主商品sku，没有为空串''，根据它来判断此商品为pop还是非pop
 * markId 推荐位标记，找张斌要
 * op s:显示、p:pv
 */
function clsPVAndShowLog(wpid, psku, markId, op) {
    var key = wpid + "." + markId + "." + skutype(psku) + "." + op;
    log('d', 'o', key);
}
function clsClickLog(wpid, psku, rsku, markId, num, reCookieName) {
    var key = wpid + "." + markId + "." + skutype(psku);
    appendCookie(reCookieName, rsku, key);
    log('d', 'o', key + ".c");
}
function appendCookie(reCookieName, sku, key) {
    var reWidsCookies = eval('(' + getCookie(reCookieName) + ')');
    if (reWidsCookies == null || reWidsCookies == '') {
        reWidsCookies = new Object();
    }
    if (reWidsCookies[key] == null) {
        reWidsCookies[key] = '';
    }
    var pos = reWidsCookies[key].indexOf(sku);
    if (pos < 0) {
        reWidsCookies[key] = reWidsCookies[key] + "," + sku;
    }
    setCookie(reCookieName, $.toJSON(reWidsCookies), 15);
}
function skutype(sku) {
    if (sku) {
        var len = sku.toString().length;
        return len==10 ? 1 : 0;
    }
    return 0;
}
function setCookie(name, value, date) {
    var Days = date;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ';path=/;domain=.'+ pageConfig.FN_getDomain() +'';
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

// 图书老埋点
function clsLog(type3, pwid, sku, num, reCookieName) {
    appendCookie(reCookieName, sku, type3);
    sku = sku.split("#")[0];
    log(3, type3, sku);
}

/* ---------- 埋点公用 end ---------- */

(function(a){a.fn.imgScroll=function(b,e){var d={data:[],template:null,evtType:"click",visible:1,direction:"x",next:"#next",prev:"#prev",disableClass:"disabled",disableClassPerfix:false,speed:300,step:1,loop:false,showControl:false,width:null,height:null,navItems:false,navItmesWrapClass:"scroll-nav-wrap",navItemActivedClass:"current",status:false,statusWrapSelector:".scroll-status-wrap"};var c=a.extend(d,b);return this.each(function(){var E=a(this),D=E.find("ul").eq(0),G,f=D.children("li"),q=f.length,j=null,l=null,Q=typeof c.next=="string"?a(c.next):c.next,u=typeof c.prev=="string"?a(c.prev):c.prev,s=0,C=c.step,v=c.visible,z=Math.ceil((q-v)/C)+1,h=c.loop,O=c.direction,x=c.evtType,B=c.disableClass,t=c.disableClassPerfix?"prev-"+B:B,L=c.disableClassPerfix?"next-"+B:B,o=c.navItems,F=c.navItmesWrapClass,N=a("."+F).length>0,I=c.navItemActivedClass,A=c.status,J=c.statusWrapSelector,w=a(J).length>0,n=false,i=true,M=(q-v)%C===0,p=c.template||'<ul>{for slide in list}<li><a href="${slide.href}" target="_blank"><img src="${slide.src}" alt="${slide.alt}" /></a></li>{/for}</ul>';function g(R){if(q>v&&!h){u.addClass(t);Q.removeClass(L)}else{if(!h){Q.addClass(L)}}if(f.eq(0).css("float")!=="left"){f.css("float","left")}j=c.width||f.eq(0).outerWidth();l=c.height||f.eq(0).outerHeight();E.css({position:E.css("position")=="static"?"relative":E.css("position"),width:R=="x"?j*v:j,height:R=="x"?l:l*v,overflow:"hidden"});D.css({position:"absolute",width:R=="x"?j*q:j,height:R=="x"?l:l*q,top:0,left:0});if(typeof e==="function"){e.apply(E,[s,z,f.slice(s*C,s*C+v),f.slice(s*C+v-C,s*C+v)])}}function P(){q=c.data.length;D=E.find("ul").eq(0);f=D.children("li");z=Math.ceil((q-v)/C)+1;M=(q-v)%C===0}function r(S){var R={list:S};E.html(p.process(R));P()}function H(S,T){if(D.is(":animated")){return false}if(h){if(i&&T){s=z}if(n&&!T){s=-1}S=T?--s:++s}else{if(i&&T||n&&!T){return false}else{S=T?--s:++s}}G=O=="x"?{left:S>=(z-1)?-(q-v)*j:-S*C*j}:{top:S>=(z-1)?-(q-v)*l:-S*C*l};function R(){if(!h){if(q-S*C<=v){Q.addClass(L);n=true}else{Q.removeClass(L);n=false}if(S<=0){u.addClass(t);i=true}else{u.removeClass(t);i=false}}else{if(q-S*C<=v){n=true}else{n=false}if(S<=0){i=true}else{i=false}}if(o||A){m(S)}if(typeof e=="function"){e.apply(E,[S,z,f.slice(S*C,S*C+v),f.slice(S*C+v-C,S*C+v)])}}if(!!c.speed){D.animate(G,c.speed,R)}else{D.css(G);R()}}function K(U,R){var S=N?a("."+U).eq(0):a('<div class="'+U+'"></div>');for(var T=0;T<z;T++){S.append("<em "+(T===0?" class="+R:"")+' title="'+(T+1)+'">'+(T+1)+"</em>")}if(!N){E.after(S)}}function k(){var R=w?a(J).eq(0):a('<div class="'+J.replace(".","")+'"></div>');R.html("<b>1</b>/"+z);if(!w){E.after(R)}}function m(R){if(o){a("."+F).find("em").removeClass(I).eq(R).addClass(I)}if(A){a(J).html("<b>"+(R+1)+"</b>/"+z)}}function y(){u.unbind(x).bind(x,function(){H(s,true)});Q.unbind(x).bind(x,function(){H(s,false)})}if(c.data.length>0){if(!c.width||!c.height){return false}r(c.data)}if(q>v&&v>=C){g(O);y();if(o){K(F,I)}if(A){k(J)}}else{if(c.showControl){Q.add(u).show()}else{Q.add(u).hide()}u.addClass(t);Q.addClass(L)}})}})(jQuery);

/**
 * 脚印推荐位
 * sku 商品 skuid
 * rid 推荐位 id 编号
 * locId cookie 值 ipLoc-djd
 * el 结果 HTML 串渲染元素
 * 百货「浏览了浏览」 102004
 */
var Footprint = function(sku, rid, locId, el, lim, onLoad) {
    this.sku = sku;
    this.rid = rid;
    this.locId = locId;
    this.lim = lim || 20;
    this.onLoad = onLoad || function() {};

    this.pin = readCookie('pin');
    this.pid = locId === null ? 1 : locId.split('-')[0];

    this.el = el;

    this.init();
};
Footprint.prototype = {
    init: function() {

        var __jda = readCookie('__jda');
        var isBook = document.body.id == 'book';

        // split uuid
        if ( __jda ) {
            if ( __jda.split('.')[1] == '-' ) {
                this.uuid = -1;
            } else {
                this.uuid = __jda.split('.')[1];
            }
        } else {
            this.uuid = -1;
        }

        if ( this.rid === 202001 ) {
            if ( isBook ) {
                this.ck = 'bview';
            } else {
                this.ck = 'aview';
            }
        }
        if ( this.rid === 202000 ) {
            this.ck = 'pin,ipLocation,btw,bview';
        }

        if ( this.rid === 202002 ) {
            this.ck = 'pin,ipLocation,atw,aview'
        }

        this.get(this.rid);
    },
    get: function(rid, skus) {
        var _this = this;
        var param = {
            sku: this.sku,
            p: rid || this.rid,
            lid: this.pid,
            lim: this.lim,
            uuid: this.uuid,
            ec: 'utf-8',
            ck: this.ck
        };

        // 三级分类
        if ( typeof pageConfig!=='undefined' && pageConfig.product ) {
            for ( var i = 0; i < pageConfig.product.cat.length; i++ ) {
                param['c'+(i+1)] = pageConfig.product.cat[i]
            }
        }

        // if ( this.pin ) {
        //     param.pin = this.pin;
        // }

        $.ajax({
            // url: 'http://diviner.jd.com/diviner?' + decodeURIComponent($.param(param)),
            url: 'http://diviner.jd.com/diviner',
            data: param,
            dataType: 'jsonp',
            scriptCharset: 'utf-8',
            success: function(r) {
                _this.set(r);
            }
        });
    },
    set: function(data) {
        var _this = this;
        var target = _this.el;
        var num = pageConfig.wideVersion&&!!pageConfig.compatible ? 5 : 4;
        var maybeLikeTPL = ''
            +'<div id="maybe-like" class="m m2">'
            +'    <div class="mt">'
            +'        <h2>根据浏览猜你喜欢</h2>'
            +'        <div class="extra"><a href="http://my.jd.com/personal/guess.html" target="_blank">更多推荐</a></div>'
            +'    </div>'
            +'    <div class="mc">'
            +'        <a class="guess-control disabled" id="guess-forward">&lt;</a><a class="guess-control" id="guess-backward">&gt;</a>'
            +'        <div id="guess-scroll">'
            +'            <ul class="lh">'
            +'                {for item in data}'
            +'                <li ${pageConfig.getFootPrintClk(item, item_index).guess} id="guess-${item.sku}" data-push="${pageConfig.footPrintSkus.push(item.sku)}" data-clk="${item.clk}">'
            +'                    <div class="p-img"><a target="_blank" title="${item.t}" href="http://item.jd.com/${item.sku}.html"><img height="130" width="130" alt="" src="${pageConfig.FN_GetImageDomain(item.sku)}n3/${item.img}" alt="${item.t}"></a></div>'
            +'                    <div class="p-name"><a target="_blank" title="${item.t}" href="http://item.jd.com/${item.sku}.html">${item.t}</a></div>'
            +'                    <div class="p-comm">'
            +'                        <span class="star sa5"></span><br>'
            +'                        <a target="_blank" href="http://club.jd.com/review/${item.sku}-1-1.html">(已有0人评价)</a>'
            +'                    </div>'
            +'                    <div class="p-price"><strong class="J-p-${item.sku}">￥</strong></div>'
            +'                </li>'
            +'                {/for}'
            +'            </ul>'
            +'        </div>'
            +'    </div>'
            +'</div>';

        var recentTPL = ''
            +'<div id="recent-view-track" class="m m2">'
            +'    <div class="mt">'
            +'        <h2>最近浏览</h2>'
            +'        <div class="extra"><a href="http://my.jd.com/history/list.html" target="_blank">更多</a></div>'
            +'    </div>'
            +'    <div class="mc">'
            +'        <ul>'
            +'            {for item in data}'
            +'            <li ${pageConfig.getFootPrintClk(item, item_index).recent} data-push="${pageConfig.footPrintSkus.push(item.sku)}" data-clk="${item.clk}">'
            +'                <div class="p-img"><a target="_blank" title="${item.t}" href="http://item.jd.com/${item.sku}.html"><img height="50" '+'width="50" alt="" src="${pageConfig.FN_GetImageDomain(item.sku)}n5/${item.img}" alt="${item.t}"></a></div>'
            +'                <div class="p-name"><a target="_blank" title="${item.t}" href="http://item.jd.com/${item.sku}.html">${item.t}</a></div>'
            +'                <div class="p-price"><strong class="J-p-${item.sku}">￥</strong></div>'
            +'            </li>'
            +'            {/for}'
            +'            <li class="all-recent" style="text-align:right;padding:5px 0;"><a href="http://my.jd.com/history/list.html" target="_blank" style="color:#005ea7;">全部浏览历史 <span style="font-family:simsun;">&gt;</span></a></li>'
            +'        </ul>'
            +'    </div>'
            +'</div>';

        if (data.success && data.data && data.data.length > 0) {
            pageConfig.footPrintSkus = [];

            // 图书根据浏览猜你喜欢
            if ( this.rid === 202000 ) {

                this.el.html(maybeLikeTPL.process(data));
            }
            // 全站根据浏览猜你喜欢
            if ( this.rid === 202002 ) {

                this.el.html(maybeLikeTPL.process(data));
            }
            // 最近浏览
            if ( this.rid === 202001 ) {
                this.el.html(recentTPL.process(data));
            } else {
                this.getCommentData(pageConfig.footPrintSkus);
            }
			/*
            this.el.find('img').Jlazyload({
                type:"image"
            });*/
			this.el.lazyload({
				type:'img'
			});

            this.setTrackCode(data.impr);

            $('#guess-scroll').imgScroll({
                visible: num,
                step: num,
                prev: '#guess-forward',
                next: '#guess-backward'
            });

            this.getPriceNum(pageConfig.footPrintSkus, this.wrap);

        } else {
            if ( this.rid === 202001 ) {
                this.el.find('.mc').html('<div class="no-track"><h4>您还未在京东留下足迹</h4><p>在您的购物旅程中，您可以随时通过这里查看您之前的浏览记录，以便快捷返回您曾经感兴趣的页面。</p></div>');
            } else {
                this.el.find('.mc').html('暂无推荐');
            }
        }

        if ( this.onLoad ) {
            this.onLoad(data);
        }
    },
    getPriceNum: function(skus, $wrap, perfix, callback) {
        skus = typeof skus === 'string' ? [skus]: skus;
        $wrap = $wrap || $('body');
        perfix = perfix || 'J-p-';

        $.ajax({
            url: 'http://p.3.cn/prices/mgets?skuIds=J_' + skus.join(',J_') + '&type=1',
            dataType: 'jsonp',
            success: function (r) {
                if (!r && !r.length) {
                    return false;
                }

                for (var i = 0; i < r.length; i++) {
                    var sku = r[i].id.replace('J_', '');
                    var price = parseFloat(r[i].p, 10);

                    if (price > 0) {
                        $wrap.find('.'+ perfix + sku).html('￥' + r[i].p + '');
                    } else {
                        $wrap.find('.'+ perfix + sku).html('暂无报价');
                    }

                    if ( typeof callback === 'function' ) {
                        callback(sku, price, r);
                    }
                }
            }
        });
    },
    getCommentData: function(skus, el, perfix) {
        skus = skus || [];
        el = el || $('body').eq(0);
        perfix = perfix || 'guess-';

        $.ajax({
            url: 'http://club.jd.com/clubservice.aspx?method=GetCommentsCount&referenceIds=' + skus,
            dataType: 'jsonp',
            success: function(data) {
                var len;
                if ( data && data.CommentsCount.length ) {
                    len = data.CommentsCount.length;

                    for ( var i = 0; i < len; i++ ) {
                        $('#'+ perfix + data.CommentsCount[i].SkuId).find('.star').removeClass('sa5').addClass('sa' + data.CommentsCount[i].AverageScore);
                        $('#'+ perfix + data.CommentsCount[i].SkuId).find('.p-comm a').html( '(已有' + data.CommentsCount[i].CommentCount + '人评价)' );
                    }

                }
            }
        });
    },
    setTrackCode: function(str) {
        var list = this.el.find('li');
        var _this = this;
        var exParam = '&m=UA-J2011-1&ref=' + encodeURIComponent(document.referrer);

        list.each(function() {
            var clk = $(this).attr('data-clk');

            $(this).bind('click', function(e) {
                var currTagName = $(e.target);

                if (currTagName.is('a') || currTagName.is('img') || currTagName.is('span')) {
                    _this.newImage(clk + exParam, true);
                }
            });
        });

        this.newImage(str + exParam, true);
    },
    newImage: function(src, random, callback) {
        var img = new Image();
        src = random ? (src + '&random=' + Math.random()+''+(new Date)) : src;

        img.setAttribute('src', src);

        img.onload = function() {
            if ( typeof callback !== 'undefined' ) {
                callback(src);
            }
        };
    }
};

pageConfig.getFootPrintClk = function(item, ind) {
    var isBook = document.body.id == 'book';
    var data = {
        item: item,
        ind: ind
    };

    if ( isBook ) {
        return {
            recent: ' onclick="clsLog(\'${item.sku}&HomeHis\', \'\', \'${item.sku}#${item.jp}\', ${ind}, \'reWidsBookHis\');"'.process(data),
            guess: ' onclick="clsLog(\'${item.sku}&HomeTrack\', \'\', \'${item.sku}#${item.jp}\', ${ind}, \'reWidsBookTrack\');"'.process(data)
        };
    } else {
        return {
            recent: ' onclick="clsClickLog(\'\', \'\', \'${item.sku}\', 3, ${ind}, \'rodGlobalHis\');"'.process(data),
            guess: ' onclick="clsClickLog(\'\', \'\', \'${item.sku}\', 2, ${ind}, \'rodGlobalTrack\');"'.process(data)
        }
    }
};

function footprint(){
	 var isBook = document.body.id == 'book';
	 if ( isBook ) {
		// 最近浏览
		var rec_202001 = new Footprint('', 202001, readCookie('ipLoc-djd'), $('#product-track .left'), 20, function() {
			log("BOOK&HomeHis", 'Show');
		});

		// 猜你喜欢
		var rec_202000 = new Footprint('', 202000, readCookie('ipLoc-djd'), $('#product-track .right'), 20, function() {
			log("BOOK&HomeTrack", 'Show');

			// $.ajax({
			//     url: 'http://fa.360buy.com/loadFa_toJson.js?aid=2_163_4278',
			//     dataType: 'script'
			// });
		});
	} else {
		// 最近浏览
		var rec_202001 = new Footprint('', 202001, readCookie('ipLoc-djd'), $('#product-track .left'), 20, function() {
			clsPVAndShowLog('', '', 3, 's');
		});

		// 猜你喜欢
		var rec_202002 = new Footprint('', 202002, readCookie('ipLoc-djd'), $('#product-track .right'), 20, function() {
			clsPVAndShowLog('', '', 2, 's');

			// $.ajax({
			//     url: 'http://fa.360buy.com/loadFa_toJson.js?aid=2_163_4278',
			//     dataType: 'script'
			// });
		});
	}
}

define(function(require,exports,module){
	var lazyload = require('jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js');
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');
	
    function init(options){
		options = $.extend({
			el:null
		}, options || {});

		options.el.append('<div id="product-track"></div>');
		$('#product-track').html('<div class="right"> <div id="maybe-like" class="m m2" data-widget="tabs"> <div class="mt"> <h2>根据浏览猜你喜欢</h2> <div class="extra"> </div> </div> <div class="mc"> <div class="iloading">正在加载中，请稍候...</div> </div> </div></div><div class="left"> <div id="recent-view-track" class="m m2"> <div class="mt"> <h2>最近浏览</h2> </div> <div class="mc"> <div class="iloading">正在加载中，请稍候...</div> </div> </div> </div><span class="clr"></span><img  data-lazy-img="http://img12.360buyimg.com/n4/g7/M03/08/0D/rBEHZlBzwZwIAAAAAAI4sOvIiLkAABpMQDf8E4AAjjI749.jpg" />').attr('data-lazyload', true);

		$('body').lazyload({
			type:'fn',
			source:$('#product-track'),
			onchange:function(){
				footprint();
			}
		});
    }
	return init;
});