/*search input suggest box
 * 2012-5-31:
 * update expand attribute (price, brand) url
 * 2012-06-05 Tuesday:
 * update search box background color
 */
var $o = ( function(regionType) {
    var StringUtil = {} ;
    StringUtil.replace = function (sTemplate, oJson) {
        return sTemplate.replace(/#{(.*?)}/g, function() {
            var sWord = arguments[1];
            if ("undefined" != typeof(oJson[sWord])) {
                return oJson[sWord] ;
            } else {
                return arguments[0] ;
            }
        }) ;
    } ;
    String.prototype.isEmpty = function () {
        return 0 == this.length;
    } ;

    var DEL_HISTORY_STR = '<a style="color:#005AA0" onclick="$o.del(event)">\u5220\u9664</a>';
    var HISTORY_TIP = '\u641C\u7D22\u5386\u53F2';
    var HISTORY_ITEM_T = '<li id="d_#{id}" suggest-pos="#{suggest_pos}" title="#{title}" onclick="$o.clickItem(this)" history="1"><div class="search-item" style="color:#005AA0">#{keyword}</div><div class="search-count">'+HISTORY_TIP+'</div></li>' ;
    var NORMAL_ITEM_T = '<li id="d_#{id}" suggest-pos="#{suggest_pos}" title="#{title}" onclick="$o.clickItem(this)"><div class="search-item">#{keyword}</div><div class="search-count">\u7EA6#{amount}\u4E2A\u5546\u54C1</div></li>' ;
    var CATEGORY_ITEM_T = '<div id="d_#{id}" suggest-pos="#{suggest_pos}" class="item1" title="#{title}" cid="#{cid}" cLevel="#{cLevel}" onclick="$o.clickItem(this)"><div class="search-item">\u5728<strong>#{cname}</strong>\u4e2d\u641c\u7d22</div><div class="search-count">\u7EA6#{amount}\u4E2A\u5546\u54C1</div></div>#{categorys}' ;
    var CATEGORY_CONTAINER_T = '<li class="fore1"><div id="d_#{id}" suggest-pos="#{suggest_pos}" class="fore1" title="#{title}" onclick="$o.clickItem(this)"><div class="search-item">#{keyword}</div><div class="search-count" #{style}>\u7EA6#{amount}\u4E2A\u5546\u54C1</div></div>#{categorys}</li>' ;
    var WARE_ITEM_T = '<div class="item" id="box_ware_#{i}" onclick="$o.clickWareItem(\'#{wid}\', #{suggest});return false;"><div class="p-img"><a href="javascript:;"><img title="#{title}" width="100" height="100" class="err-product" src="http://img1#{pid}.360buyimg.com/n4/#{pic}" data-img="1"></a></div><div class="p-name"><a title="#{title}" href="javascript:;">#{name}</a></div><div class="p-price" id="box_J_#{wid}"></div></div>';
    var WORD_TIP = '\u76f8\u5173\u70ed\u641c\u8bcd\uff1a<br>';
    var WORD_ITEM_T = '<a href="javascript:;" title="#{word}" onclick="$o.clickWordItem(this, #{suggest})">#{word}</a>';
    var RIGHT_CONTAINER_T = '<div class="fr"><div class="list-img lh">#{ware}</div><div class="list-word">#{word}</div></div>';
    var ALL_ITEM_T = '<div class="i-shelper"><ul class="fl list-text">#{left_item}</ul>#{right_item}</div>';

    //var URL_KS_T = "http://dd.search.360buy.com/?key=#{keyword}&uid=#{uid}" ;
    var URL_KS_T = 'http://dd.search.jd.com/?key=#{keyword}&add=#{add}&other=1';
    var DIGITALPRICE_T = 'http://p.3.cn/prices/mgets?skuids=#{wids}&type=1&callback=?';
    var LOG_T = "http://sstat.jd.com/scslog?args=1^#{key}^^^^#{href}^#{wid}^#{i}^99^#{expand}^0^0000";

    var COLOR_NULL = "#FFF" ;
    var BORDER_COLOR = "#7ABD54";
    var oInputBoxN = $("#key") ;
    var oTipBoxN = $("#shelper") ;

    function SearchBox() {
        this.length = 0 ;
        this.index = -1 ;
        this.iLastModified = 0;
        this.add = readCookie('ipLoc-djd')||'';
        this.lastKeyword = false;
    }
    SearchBox.prototype.init = function() {
        this.length = 0 ;
        this.index = -1 ;
        this.rightItems = [];
        this.img_index = -1;
        this.price = [];
    } ;
    SearchBox.prototype.hideTip = function() {
        this.init() ;
        this.lastKeyword = false;
        oTipBoxN.html("").hide() ;
    } ;
    SearchBox.prototype.clickItem = function(oItemN) {
        var sCid = oItemN.getAttribute("cid") ;
        if (null != sCid && "" != sCid) {
            search.cid = sCid ;
        } else {
            search.cid = null ;
        }
        var sCLevel = oItemN.getAttribute("cLevel") ;
        if (null != sCLevel && "" != sCLevel) {
            search.cLevel = sCLevel ;
        } else {
            search.cLevel = null ;
        }
        var sEvVal = oItemN.getAttribute("ev_val") ;
        if (null != sEvVal && !$.trim(sEvVal).isEmpty()) {
            search.ev_val = sEvVal ;
        } else {
            search.ev_val = null ;
        }
        var sTitle = oItemN.getAttribute("title") ;
        if (null != sTitle && !$.trim(sTitle).isEmpty()) {
            oInputBoxN.val(sTitle) ;
        }
        search.additinal = '&suggest='+oItemN.getAttribute('suggest-pos');
        search("key") ;
    } ;
    SearchBox.prototype.clickWareItem = function(wid, suggest) {
        var url = StringUtil.replace(LOG_T, {
            key: encodeURIComponent($.trim(oInputBoxN.val())),
            href: encodeURIComponent(window.location.href),
            wid: wid,
            i: suggest,
            expand: ''
        });
        $.getScript(url);
        window.location.href = "http://item.jd.com/"+wid+".html";
        return false;
    } ;
    SearchBox.prototype.clickWordItem = function(oItemN, suggest) {
        var title = oItemN.getAttribute("title");
        var url = StringUtil.replace(LOG_T, {
            key: encodeURIComponent($.trim(oInputBoxN.val())),
            href: encodeURIComponent(window.location.href),
            wid: '',
            i: suggest,
            expand: encodeURIComponent(title)
        });
        $.getScript(url);
        oInputBoxN.val(title);
        search("key");
    } ;
    SearchBox.prototype.mouseenter = function(oItem) {
        var aIdNums = oItem.attr('id').split("_"), iSelectedIndex = parseInt(aIdNums[1], 10);
        if ( oItem.attr('history') ) {
            oItem.find('.search-count').html(DEL_HISTORY_STR);
        }
        if ( oSearchBox.setRightItems(iSelectedIndex) ) {
            oItem.addClass("hover resultful");
        } else {
            oItem.addClass("hover");
        }
        // change relational node style
        if (iSelectedIndex != oSearchBox.index) {
            if ( oSearchBox.index>-1 ) {
                var oldItem = $("#d_"+oSearchBox.index);
                if ( oldItem.attr('history') ) { oldItem.find('.search-count').html(HISTORY_TIP); }
                oldItem.removeClass("hover resultful");
            }
            oSearchBox.index = iSelectedIndex ;
        }
    } ;
    SearchBox.prototype.mouseleave = function(oItem) {
        oItem.removeClass("hover resultful");
        if ( oItem.attr('history') ) {
            oItem.find('.search-count').html(HISTORY_TIP);
        }
    };
    SearchBox.prototype.setRightItems = function(index) {
        index = parseInt($("#d_" + index).attr('suggest-pos'), 10);
        var ul_obj = oTipBoxN.find('ul'), oSelf = this, rightItems = oSelf.setDigitalPrice(index);
        ul_obj.next().remove();
        oSelf.img_index = -1;
        if ( rightItems ) {
            ul_obj.after(rightItems);
            //给展示商品绑定事件
            oTipBoxN.find('div.item').bind('mouseenter', function(){
                oSelf.imgMouseenter(this);
            }).bind('mouseleave', function(){
                oSelf.imgMouseleave(this);
            });
            return true;
        } else {
            return false;
        }
    } ;
    SearchBox.prototype.setDigitalPrice = function(index) {
        var oSelf = this;
        if ( oSelf.rightItems[index][1]==0 ) {  //还没有替换数字价格
            oSelf.rightItems[index][0] = oSelf.rightItems[index][0].replace(/"box_(J_\d+)">/g, function(){
                var a = arguments[0], b = arguments[1];
                if ( oSelf.price[b] ) {
                    oSelf.rightItems[index][1] = 1;
                    return a+oSelf.price[b];
                } else {
                    return a;
                }
            });
        }
        return oSelf.rightItems[index][0];
    } ;
    SearchBox.prototype.imgMouseenter = function(oItem) {
        var id = oItem.id, pos = parseInt(id.substr(id.length-1, 1), 10);
        if ( this.img_index!=pos ) {
            if ( this.img_index>-1 ) { $("#box_ware_"+this.img_index).css('border-color', COLOR_NULL); }
            this.img_index = pos;
        }
        oItem.style.borderColor = BORDER_COLOR;
    };
    SearchBox.prototype.imgMouseleave = function(oItem) {
        oItem.style.borderColor = COLOR_NULL;
    };
    SearchBox.prototype.keydown_up = function(event) {
        var oSelf = this;
        var oEvent = event || window.event;
        if (0 == oTipBoxN.length) {
            oTipBoxN = $("tie") ;
        }
        var iKeyCode = oEvent.keyCode ;
        switch (iKeyCode)
        {
            case 27:
                oSelf.hideTip();
                break ;
            case 37:    // turn left
                oSelf.selectImgNode(-1) ;
                break ;
            case 38:    // turn up
                oSelf.selectItemNode(-1) ;
                break ;
            case 39:    // turn left
                oSelf.selectImgNode(1) ;
                break ;
            case 40:    // turn down
                oSelf.selectItemNode(1) ;
                break ;
            default:
                oSelf.input();
                break ;
        }
    } ;
    SearchBox.prototype.selectItemNode = function(direction) {//1向下， -1向上
        var oSelf = this ;
        var oRelNode = $("#d_" + oSelf.index) ;
        oRelNode.removeClass("hover resultful");
        if ( oRelNode.attr('history') ) {
            oRelNode.find('.search-count').html(HISTORY_TIP);
        }
        if ( oSelf.index==-1 && direction==-1 ) {
            direction = 0;
        }
        oSelf.index = (oSelf.length + oSelf.index + direction) % oSelf.length;
        var oNode = $("#d_" + oSelf.index) ;

        if (oNode.length > 0) {
            if ( oNode.attr('history') ) {
                oNode.find('.search-count').html(DEL_HISTORY_STR);
            }

            if ( oSelf.setRightItems(oSelf.index) ) {
                oNode.addClass("hover resultful");
            } else {
                oNode.addClass("hover");
            }
            // change text of input box
            var sTitle = oNode.attr("title") ;
            if (null != sTitle && !$.trim(sTitle).isEmpty()) {
                oInputBoxN.val(sTitle) ;
            }
            // handle category and expand attribute value
            var sCid = oNode.attr("cid") ;
            if (null != sCid && "" != sCid) {
                search.cid = sCid ;
            } else {
                search.cid = null ;
            }
            var sCLevel = oNode.attr("cLevel");
            if (null != sCLevel && "" != sCLevel) {
                search.cLevel = sCLevel ;
            } else {
                search.cLevel = null ;
            }
            search.ev_val = null ;
            search.additinal = '&suggest='+oNode.attr('suggest-pos');
        }
    } ;
    SearchBox.prototype.selectImgNode = function(direction) {
        var imgObj = oTipBoxN.find('div.item'), img_length = imgObj.length;
        if ( this.img_index==-1 && direction==-1 ) {
            direction = 0;
        }
        this.img_index = (img_length + this.img_index + direction) % img_length;
        imgObj.css('border-color', COLOR_NULL).eq(this.img_index).css('border-color', BORDER_COLOR);
    } ;
    SearchBox.prototype.input = function () {
        var oSelf = this;
        if ( oSelf.timeoutId ) { clearTimeout(oSelf.timeoutId); }
        oSelf.timeoutId = setTimeout(function(){
            var sKeyword = $.trim(oInputBoxN.val());
            if ( sKeyword === oSelf.lastKeyword || (!sKeyword && !readCookie('pin') && !readCookie('_tp')) ) {
                return false;
            } else {
                oSelf.lastKeyword = sKeyword;
            }
            var sUrlKs = StringUtil.replace(URL_KS_T, {
                keyword: encodeURIComponent(sKeyword),
                add: encodeURIComponent(oSelf.add.split('-')[0])
            }) ;
            $.ajax({
                url: sUrlKs,
                dataType: 'jsonp',
                scriptCharset:'utf-8',
                jsonp: 'callback',
                success: (function(time){
                    return function(res){
                        if ( oSelf.iLastModified>time ) { return ; }
                        oSelf.iLastModified = time;
                        oSelf.onloadItems(res);
                    };
                })(new Date().getTime())
            }) ;
        }, 150);
    } ;
    SearchBox.prototype.getDigitalPrice = function(wids) {
        if ( wids ) {
            var oSelf = this, url = StringUtil.replace(DIGITALPRICE_T, { wids: wids});
            $.getJSON(url, function(data){
                if ( typeof data=='object' ) {
                    for(var i=0,j=data.length,p=''; i<j; i++) {
                        if ( data[i].p<0 ) {
                            p = '暂无报价';
                        } else if ( data[i].p==0 ) {
                            p = '免费';
                        } else {
                            p = '￥'+data[i].p;
                        }
                        $("#box_"+data[i].id).html(p);
                        oSelf.price[data[i].id] = p;
                    }
                }
            });
        }
    }
    SearchBox.prototype.onloadItems = function(json) {
        var iLoopLen = json.length;
        if ( 0==iLoopLen ) {
            this.hideTip();
            return ;
        }
        var oSelf = this, html = "", iSearchType = 0;
        oSelf.init() ;
        if (window.pageConfig && window.pageConfig.searchType ) {
            iSearchType = window.pageConfig.searchType ;
        }
        var suggest_pos=0 , left_html='', has_category=false, iLen = 0, wids = '';
        var sInputKeyword = $.trim(oInputBoxN.val());
        for (var i = 0; i < iLoopLen ; i++) {
            var oItem = json[i] ;
            if ( !oItem) { continue; }
            var sRespKeyword = $.trim(oItem.keyword);
            var realWordIndex = sRespKeyword.toLowerCase().indexOf(sInputKeyword.toLowerCase());
            var sDecoratedKeyword = sRespKeyword;
            if (realWordIndex == 0) {
                sDecoratedKeyword = sInputKeyword + "<strong>" + sRespKeyword.substring(sInputKeyword.length) + "</strong>" ;
            }

            if ( "string" == typeof(oItem.cid) && !$.trim(oItem.cid).isEmpty() ) {  // category html
                if (has_category==false) {
                    has_category = true;
                    var amount=0;
                    if ( oItem.oamount && oItem.oamount > 0 ) {
                        amount = oItem.oamount; style = '';
                    }
                    wids += oSelf.getRightItems(oItem, suggest_pos);    //存储右侧商品html，同时获取商品id，用来获取数字价格
                    left_html += StringUtil.replace(CATEGORY_CONTAINER_T, {
                        id: iLen,
                        title: oItem.keyword,
                        keyword: sDecoratedKeyword,
                        amount: amount,
                        suggest_pos: suggest_pos
                    }) ;
                    iLen++; suggest_pos++;
                }
                var sLevel = oItem["level"];
                if ( !sLevel || "string" == typeof(oItem.cname) && $.trim(oItem.cname).isEmpty()) {
                    continue ;
                }
                if (0 == iSearchType) {                 // filter category 3 level category of book, mvd
                    if ("string" == typeof(sLevel) && /^[1-8]4$/.test(sLevel)) {
                        continue ;
                    }
                } else if (5 == iSearchType) {          // filter category not belong ebook
                    if ("string" == typeof(sLevel) && !(/^[5-8]2$/.test(sLevel))) {
                        continue ;
                    }
                } else if (1 == iSearchType || 2 == iSearchType || 3 == iSearchType || 4 == iSearchType) {
                    continue ;
                }

                var sTmp = StringUtil.replace(CATEGORY_ITEM_T, {
                    id: iLen,
                    title: oItem.keyword,
                    cid: oItem.cid,
                    cLevel: oItem.level,
                    cname: oItem.cname,
                    amount: oItem.amount,
                    suggest_pos: suggest_pos-1
                }) ;
                left_html = StringUtil.replace(left_html, {categorys:sTmp});
                iLen++;
            } else {
                wids += oSelf.getRightItems(oItem, suggest_pos);    //存储右侧商品html，同时获取商品id，用来获取数字价格
                var style = '';
                if ( oItem.amount==0 ) {
                    left_html += StringUtil.replace(HISTORY_ITEM_T, {
                        id: iLen,
                        title: oItem.keyword,
                        keyword: sDecoratedKeyword,
                        amount: oItem.amount,
                        suggest_pos: suggest_pos
                    }) ;
                } else {
                    left_html += StringUtil.replace(NORMAL_ITEM_T, {
                        id: iLen,
                        title: oItem.keyword,
                        keyword: sDecoratedKeyword,
                        amount: oItem.amount,
                        suggest_pos: suggest_pos,
                        style : style
                    }) ;
                }
                iLen++; suggest_pos++;
            }
        }
        oSelf.length = iLen;
        left_html = StringUtil.replace(left_html, {categorys:''});
        html = StringUtil.replace(ALL_ITEM_T, {left_item: left_html, right_item: oSelf.rightItems[0][0]});
        if ("" != html) {
            oTipBoxN.html(html).show() ;
            oSelf.getDigitalPrice(wids);    //获取数字价格，同时初始化首屏展示商品的价格
            if ( $.trim(oInputBoxN.val())=='' ) {
                oTipBoxN.find('div.search-item').removeAttr('style');
            }
            oTipBoxN.find('ul').menuAim({
                enter: oSelf.mouseenter
            });
            oTipBoxN.find('div.item').bind('mouseenter', function(){
                oSelf.imgMouseenter(this);
            }).bind('mouseleave', function(){
                oSelf.imgMouseleave(this);
            });
        } else {
            oTipBoxN.html("").hide() ;
        }
    } ;
    SearchBox.prototype.getRightItems = function(oItem, suggest_pos) {
        var right_html = '', ex_obj = oItem.other_ex, re_obj = oItem.other_re,
        ware_html = '', word_html = '', wids = '';
        this.rightItems[suggest_pos] = [];
        if ( typeof ex_obj=='object' ) {
            for (var j=0, ware_length=ex_obj.length; j<ware_length; j++) {
                var wid = String(ex_obj[j].wid);
                ware_html += StringUtil.replace(WARE_ITEM_T, {
                    wid: wid,
                    keyword: oItem.keyword,
                    i: j,
                    suggest: (j+1)*10+suggest_pos,
                    title: ex_obj[j].name,
                    name: ex_obj[j].name,
                    pid: wid.substr(wid.length-1,1) % 5,
                    pic: ex_obj[j].pic
                });
                wids += 'J_'+wid+',';
            }
        }
        if ( typeof re_obj=='object' ) {
            var k = 0, re_length = re_obj.length>7 ? 7 : re_obj.length;
            for ( ; k<re_length; k++) {
                word_html += StringUtil.replace(WORD_ITEM_T, {
                    word: re_obj[k].key,
                    suggest: (k+1)*100+suggest_pos
                });
            }
            if ( word_html ) { word_html = WORD_TIP+word_html; }
        }
        if ( ware_html ) {
            right_html = StringUtil.replace(RIGHT_CONTAINER_T, {
                ware: ware_html,
                word: word_html
            });
        }
        this.rightItems[suggest_pos][0] = right_html;
        this.rightItems[suggest_pos][1] = 0;    //该数值用来标识是否已经替换过数字价格
        return wids;
    } ;
    SearchBox.prototype.bind_input = function() {
        oInputBoxN.bind('keyup', function(e) {
            oSearchBox.keydown_up(e) ;
        }).focus(function(){
            setTimeout(function(){oSearchBox.input();}, 10);
        });
        oTipBoxN.parent().bind('mouseenter',function(){
            oSearchBox.e_position = true;
            if ( oSearchBox.timeoutId ) {
                clearTimeout(oSearchBox.timeoutId);
            }
        }).bind('mouseleave',function(){
            oSearchBox.e_position = false;
            oSearchBox.timeoutId = setTimeout(function(){
                oSearchBox.hideTip();
            }, 500);
        });
        $(document).click(function(){
            if (!oSearchBox.e_position) {
                oSearchBox.hideTip() ;
            }
        });
    };
    SearchBox.prototype.del = function(e) {
        var oSelf = this;
        e = e ? e : window.event;
        if ( window.event ) {
            e.cancelBubble = true; e.returnValue = false;
        } else {
            e.stopPropagation(); e.preventDefault();
        }
        var src = $(e.srcElement ? e.srcElement : e.target), keyword=src.parent().parent().attr('title');
        $.ajax({
            url:'http://search.jd.com/suggest.php?op=del&callback=?&key='+encodeURIComponent(keyword),
            dataType:"jsonp",
            scriptCharset:"utf-8",
            beforeSend:function(){
                src.parent().parent().hide();
            },
            success:function(res){
                oSelf.lastKeyword = false;
                oInputBoxN.focus();
            }
        });
    };
    SearchBox.prototype.init_html = function() {
        if ( oTipBoxN.length>0 ) {
            var html = '<div id="shelper-2013" style="display:none;"></div>';
            oTipBoxN.parent().prepend(html);
            oTipBoxN.remove();
            oTipBoxN = $("#shelper-2013");
        }
        oInputBoxN.removeAttr('onkeydown').bind('keydown', function(e){
            if ( e.keyCode==13 ) {
                if (oSearchBox.img_index!=-1) {
                    $("#box_ware_"+oSearchBox.img_index).trigger('click');
                } else {
                    search("key");
                }
            }
        });
    };
    var oSearchBox = new SearchBox() ;
    oSearchBox.init_html();
    oSearchBox.bind_input();

    return oSearchBox ;
} )() ;