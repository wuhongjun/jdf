/*search input suggest box
 * 2012-5-31:
 * update expand attribute (price, brand) url
 * 2012-06-05 Tuesday:
 * update search box background color
 */

/**
 searchlog 仅用在订单提交成功页 做埋点用 @李吉文 2014-1-15 11:28:07
 */
var searchlog = (function () {
	var search_log_url = "http://sstat."+pageConfig.FN_getDomain()+"/scslog?args=" ;
	var search_log_args = "{keyword}^#psort#^#page#^#cid#^"+encodeURIComponent(document.referrer) ;
	var recType = "2" ;
	var abTest = "" ;
	var _ev = "" ;
	var searchlog = function searchlog() {
		var url = "" ;
		var sCid = "";
		var psort = "";
		var page = "0";
		if (arguments.length > 0) {
			if (arguments[0] == 0) {
				url = search_log_url + recType + "^" + search_log_args + "^^^58^^"+ _ev + "^" + abTest;
			} else if (arguments[0] == 1) {
				if (recType != 10) {
					url = search_log_url + "1^" + search_log_args + "^";
				} else {
					url = search_log_url + "11^" + search_log_args + "^";
				}
				for ( var i = 1; i < arguments.length; i++) {
					url += encodeURI(arguments[i]) + "^";
				}
				if (arguments.length > 3 && arguments[3] == "51") {
					sCid = arguments[1];
				}
				if (arguments.length > 3 && arguments[3] == "55") {
					psort = arguments[1];
				}
				if (arguments.length > 3 && arguments[3] == "56") {
					page = arguments[1];
				}
				for ( var i = 0, len = 5 - arguments.length; i < len; i++) {
					url += "^";
				}
				url += _ev + "^" + abTest;
			}
		}
		url = url.replace("#cid#", sCid);
		url = url.replace("#psort#", psort);
		url = url.replace("#page#", page);
		$.getScript(url);
	} ;
	return searchlog ;
})() ;

/**
 search input标签上面的
 */
function search(sNodeId) {
	var sUrl_T = "http://search.jd.com/Search?keyword={keyword}&enc={enc}{additional}";
	var sAdditionalSearch = search.additinal || "";
	var oKeyTextN = document.getElementById(sNodeId);
	var sSelKeyValue = oKeyTextN.value;
	sSelKeyValue = sSelKeyValue.replace(/^\s*(.*?)\s*$/, "$1");
	if (sSelKeyValue.length > 100) {
		sSelKeyValue = sSelKeyValue.substring(0, 100);
	}
	if ("" == sSelKeyValue) {
		window.location.href = window.location.href;
		return;
	}
	var iSearchType = 0;
	if ("undefined" != typeof (window.pageConfig) && "undefined" != typeof (window.pageConfig.searchType)) {
		iSearchType = window.pageConfig.searchType;
	}
	var sCIdParamKey_T = "&cid{level}={cid}";
	var sCId = ("string" == typeof (search.cid) ? search.cid : "");
	var sCLevel = ("string" == typeof (search.cLevel) ? search.cLevel : "");
	var sEvVal = ("string" == typeof (search.ev_val) ? search.ev_val : "");
	switch (iSearchType) {
		case 0:
			break;
		case 1:
			sCLevel = "-1";
			sAdditionalSearch += "&book=y";
			break;
		case 2:
			sCLevel = "-1";
			sAdditionalSearch += "&mvd=music";
			break;
		case 3:
			sCLevel = "-1";
			sAdditionalSearch += "&mvd=movie";
			break;
		case 4:
			sCLevel = "-1";
			sAdditionalSearch += "&mvd=education";
			break;
		case 5:
			var OTHER_FILTERS_T = "&other_filters=%3Bcid1%2CL{cid1}M{cid1}[cid2]";
			switch (sCLevel) {
				case "51":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\[cid2]/, "");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\{cid1}/g, "5272");
					break;
				case "52":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\{cid1}/g, "5272");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
					break;
				case "61":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\[cid2]/, "");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\{cid1}/g, "5273");
					break;
				case "62":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\{cid1}/g, "5273");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
					break;
				case "71":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\[cid2]/, "");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\{cid1}/g, "5274");
					break;
				case "72":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\{cid1}/g, "5274");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
					break;
				case "81":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\[cid2]/, "");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\{cid1}/g, "5275");
					break;
				case "82":
					sCIdParamKey_T = OTHER_FILTERS_T.replace(/\{cid1}/g, "5275");
					sCIdParamKey_T = sCIdParamKey_T.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
					break;
				default:
					break;
			}
			sUrl_T = "http://search.e.jd.com/searchDigitalBook?ajaxSearch=0&enc=utf-8&key={keyword}&page=1{additional}";
			break;
		case 6:
			sCLevel = "-1";
			sUrl_T = "http://music.jd.com/8_0_desc_0_0_1_15.html?key={keyword}";
			break;
		case 7:
			sUrl_T = "http://s.e.jd.com/Search?key={keyword}&enc=utf-8";
			break;
		default:
			break;
	}
	if ("string" == typeof (sCId) && "" != sCId && "string" == typeof (sCLevel)) {
		var reLevel = /^(?:[1-8])?([1-3])$/;
		if ("-1" == sCLevel) {
			sCLevel = "";
		} else {
			if (reLevel.test(sCLevel)) {
				sCLevel = RegExp.$1;
			} else {
				sCLevel = "";
			}
		}
		var sCidParam = sCIdParamKey_T.replace(/\{level}/, sCLevel);
		sCidParam = sCidParam.replace(/\{cid}/g, sCId);
		sAdditionalSearch += sCidParam;
	}
	if ("string" == typeof (sEvVal) && "" != sEvVal) {
		sAdditionalSearch += "&ev=" + sEvVal;
	}
	//点击下拉框埋点
	if ( typeof($o.click)!="undefined" && $o.click!==false && typeof($o.lastKeyword)!="undefined" && $o.lastKeyword!==false ) {
		try{JA.tracker.ngloader('search.000002',{'prefix':$o.lastKeyword,'keyword':sSelKeyValue,'pos':$o.click})}catch(e){}
	}
	sSelKeyValue = encodeURIComponent(sSelKeyValue);
	sUrl = sUrl_T.replace(/\{keyword}/, sSelKeyValue);
	sUrl = sUrl.replace(/\{enc}/, 'utf-8');
	sUrl = sUrl.replace(/\{additional}/, sAdditionalSearch);
	if ("undefined" == typeof (search.isSubmitted) || false == search.isSubmitted) {
		setTimeout(function() {
			window.location.href = sUrl;
		}, 10);
		search.isSubmitted = true;
	}
}

/*search input suggest box
 * 2012-5-31:
 * update expand attribute (price, brand) url
 * 2012-06-05 Tuesday:
 * update search box background color
 */
var $o = ( function() {
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
		return 0 == this.length ;
	} ;

	var DEL_HISTORY_STR = '<a style="color:#005AA0" onclick="$o.del(event)">\u5220\u9664</a>';
	var HISTORY_TIP = '\u641C\u7D22\u5386\u53F2', RESULT_COUNT_TIP = '\u7EA6#{amount}\u4E2A\u5546\u54C1',
		HISTORY_MARK = 'history="1"', HISTORY_STYLE = 'style="color:#005AA0"'
		;
	var NORMAL_ITEM_T = '<li id="d_#{id}" suggest-pos="#{suggest_pos}" title="#{title}" onclick="$o.clickItem(this)" #{history_mark}><div class="search-item" #{history_style}>#{keyword}</div><div class="search-count">#{search_count}</div></li>' ;
	var CATEGORY_ITEM_T = '<div id="d_#{id}" suggest-pos="#{suggest_pos}" class="#{className}" title="#{title}" cid="#{cid}" cLevel="#{cLevel}" onclick="$o.clickItem(this)"><div class="search-item">\u5728<strong>#{cname}</strong>\u5206\u7c7b\u4e2d\u641c\u7d22</div><div class="search-count">\u7EA6#{amount}\u4E2A\u5546\u54C1</div></div>' ;
	var PROMPTION_ITEM = '<div id="d_#{id}" suggest-pos="#{suggest_pos}" class="#{className}" title="#{title}" pm_type="#{pm_type}" onclick="$o.clickItem(this)"><div class="search-item">\u627E<strong>#{cname}</strong>\u76F8\u5173\u4F18\u60E0</div><div class="search-count"></div></div>' ;
	var CATEGORY_CONTAINER_T = '<li class="fore1"><div id="d_#{id}" suggest-pos="#{suggest_pos}" class="fore1" title="#{title}" onclick="$o.clickItem(this)" #{history_mark}><div class="search-item" #{history_style}>#{keyword}</div><div class="search-count">#{search_count}</div></div>#{categorys}</li>' ;

	var URL_KS_T = "http://dd.search.jd.com/?ver=2&zip=1&key=#{keyword}" ;

	var BG_COLOR = "#FFDFC6" ;
	var BG_COLOR_NULL = "#FFF" ;
	var oInputBoxN = $("#key") ;
	var oTipBoxN = $("#shelper") ;

	function SearchBox() {
		this.length = 0 ;
		this.index = -1 ;
		this.iLastModified = 0;
		this.lastKeyword = false;
	}
	SearchBox.prototype.init = function() {
		this.length = 0 ;
		this.index = -1 ;
		this.click = false;
	} ;
	SearchBox.prototype.hideTip = function() {
		this.init() ;
		this.lastKeyword = false;
		oTipBoxN.html("").hide() ;
	} ;
	SearchBox.prototype.clickItem = function(oItemN) {
		var sCid = oItemN.getAttribute("cid"), sAdditinal='&suggest='+oItemN.getAttribute('suggest-pos');
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
		var sTitle = oItemN.getAttribute("title") ;
		if (null != sTitle && !$.trim(sTitle).isEmpty()) {
			oInputBoxN.val(sTitle) ;
		}
		if (oItemN.getAttribute('pm_type')!==null) {
			sAdditinal += '&prom_type=0';
		}
		search.additinal = sAdditinal;
		this.click = oItemN.id.substr(2)-oTipBoxN.find("li[history='1']").length ;
		search("key") ;
	} ;
	SearchBox.prototype.mouseenter = function(oItem) {
		var oItem = $(oItem);
		if ( oItem.attr('history') ) {
			oItem.find('.search-count').html(DEL_HISTORY_STR);
		}
		oItem.css('background',BG_COLOR);
		// change relational node style
		var aIdNums = oItem.attr('id').split("_"), iSelectedIndex = parseInt(aIdNums[1], 10);
		if (iSelectedIndex != this.index) {
			if ( this.index>-1 ) {
				var oldItem = $("#d_"+this.index);
				oldItem.css("background", BG_COLOR_NULL);
				if ( oldItem.attr('history') ) { oldItem.find('.search-count').html(HISTORY_TIP); }
			}
			this.index = iSelectedIndex;
		}
	} ;
	SearchBox.prototype.mouseleave = function(oItem) {
		oItem.css('background', BG_COLOR_NULL);
		if ( oItem.attr('history') ) {
			oItem.find('.search-count').html(HISTORY_TIP);
		}
	};
	SearchBox.prototype.selectItemNode = function(direction) {//1向下， -1向上
		var oSelf = this ;
		var oRelNode = $("#d_" + oSelf.index + ':visible');
		oRelNode.css("background-color", BG_COLOR_NULL) ;
		if ( oRelNode.attr('history') ) {
			oRelNode.find('.search-count').html(HISTORY_TIP);
		}
		if ( oSelf.index==-1 && direction==-1) { direction = 0; }
		oSelf.index = (oSelf.length + oSelf.index + direction) % oSelf.length;
		var oNode = $("#d_" + oSelf.index), sAdditinal='&suggest='+oNode.attr('suggest-pos');

		if (oNode.length > 0) {
			if ( oNode.attr('history') ) {
				oNode.find('.search-count').html(DEL_HISTORY_STR);
			}
			oNode.css("background-color", BG_COLOR) ;
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
			if(typeof(oNode.attr('pm_type'))!='undefined') {
				sAdditinal+='&prom_type=0';
			}
			search.additinal = sAdditinal;
			oSelf.click = oSelf.index-oTipBoxN.find("li[history='1']").length ;
		}
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
				keyword: encodeURIComponent(sKeyword)
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
						res && oSelf.onloadItems(res);
					};
				})(new Date().getTime())
			}) ;
		}, 150);
	};
	SearchBox.prototype.keydown_up = function(event) {
		var oSelf = this;
		var oEvent = event || window.event;
		if (0 == oInputBoxN.length) {
			oInputBoxN = $("#key") ;
		}
		if (0 == oTipBoxN.length) {
			oTipBoxN = $("tie") ;
		}
		var iKeyCode = oEvent.keyCode ;
		switch (iKeyCode)
		{
			case 38:	// turn up
				oSelf.selectItemNode(-1) ;
				break ;
			case 40:	// turn down
				oSelf.selectItemNode(1) ;
				break ;
			case 27:
				oSelf.hideTip();
				break ;
			case 37:    // turn left
				break ;
			case 39:    // turn left
				break ;
			default:
				if ( !$.browser.mozilla ) {
					oSelf.input();
				}
				break ;
		}
	} ;
	SearchBox.prototype.onloadItems = function(json) {
		if (0 == json.length) {
			this.hideTip();
			return ;
		}
		var oSelf = this ;
		oSelf.init() ;
		var html = "" ;
		var iSearchType = 0 ;
		if (window.pageConfig && window.pageConfig.searchType ) {
			iSearchType = window.pageConfig.searchType ;
		}
		var suggest_pos=0 , html='';
		var iLen = 0, sInputKeyword = $.trim(oInputBoxN.val());
		for (var i = 0, iLoopLen = json.length ; i < iLoopLen ; i++) {
			var oItem = json[i] ;
			if ( !oItem) { continue; }
			var sKeyword = $.trim(oItem.key),
				sSearchCountHmlt = oItem.his ? HISTORY_TIP : StringUtil.replace(RESULT_COUNT_TIP, {amount:oItem.qre}),
				sHistoryMarkHtml = oItem.his ? HISTORY_MARK : '', sHistoryStyleHtml= oItem.his ? HISTORY_STYLE : '';
			var realWordIndex = sKeyword.toLowerCase().indexOf(sInputKeyword.toLowerCase());
			var sDecoratedKeyword = sKeyword;
			if (sInputKeyword.length && realWordIndex == 0 && !oItem.his) {
				sDecoratedKeyword = sInputKeyword + "<strong>" + sKeyword.substring(realWordIndex+sInputKeyword.length) + "</strong>" ;
			}
			if ( oItem.ci && oItem.ci.length>0 ) {	// category html
				var sCategoriesHtml = '', iId = iLen++;
				if(i==0 && oSelf.show_prompt() && oItem.act) {
					sCategoriesHtml += StringUtil.replace(PROMPTION_ITEM, {
						id: iLen,
						title: sKeyword,
						pm_type: 0,
						className: "item1",
						cname: sKeyword,
						suggest_pos: suggest_pos
					});
					iLen++;
				}
				for (var iCat = 0, iCatLoopLen = oItem.ci.length; iCat < iCatLoopLen; iCat++) {
					var sLevel = oItem.ci[iCat].cid;
					if (0 == iSearchType) {					// filter category 3 level category of book, mvd
						if ("string" == typeof (sLevel) && /^[1-8]4$/.test(sLevel)) {
							continue;
						}
					} else if (5 == iSearchType) {			// filter category not belong ebook
						if ("string" == typeof (sLevel) && !(/^[5-8]2$/.test(sLevel))) {
							continue;
						}
					} else if (1 == iSearchType || 2 == iSearchType || 3 == iSearchType || 4 == iSearchType) {
						continue;
					}
					sCategoriesHtml += StringUtil.replace(CATEGORY_ITEM_T, {
						id: iLen,
						title: sKeyword,
						cid: sLevel,
						cLevel: oItem.ci[iCat].cle,
						className: "item1",
						cname: oItem.ci[iCat].cna,
						amount: oItem.ci[iCat].cre,
						suggest_pos: suggest_pos
					});
					iLen++;
				}
				html += StringUtil.replace(CATEGORY_CONTAINER_T, {
					id: iId,
					title: sKeyword,
					keyword: sDecoratedKeyword,
					suggest_pos: suggest_pos,
					categorys: sCategoriesHtml,
					search_count: sSearchCountHmlt,
					history_mark: sHistoryMarkHtml,
					history_style: sHistoryStyleHtml
				}) ;
				suggest_pos++;
			} else {
				html += StringUtil.replace(NORMAL_ITEM_T, {
					id: iLen,
					title: sKeyword,
					keyword: sDecoratedKeyword,
					suggest_pos: suggest_pos,
					search_count: sSearchCountHmlt,
					history_mark: sHistoryMarkHtml,
					history_style: sHistoryStyleHtml
				}) ;
				iLen++;
				suggest_pos++;
			}
		}
		oSelf.length = iLen;
		if ("" != html) {
			html += '<li class="close" onclick="$o.hideTip()">\u5173\u95ed</li>' ;
			oTipBoxN.html(html).show() ;
			oTipBoxN.find('[id^="d_"]').bind('mouseleave', function() {
				oSelf.mouseleave($(this));
			}).bind('mouseenter', function(){
				oSelf.mouseenter($(this));
			});
		} else {
			oTipBoxN.html("").hide() ;
		}
	} ;
	SearchBox.prototype.show_prompt = function () {
		var iSearchType = 0;
		if (window.pageConfig && window.pageConfig.searchType) {
			iSearchType = window.pageConfig.searchType*1;
		}
		if(!iSearchType || iSearchType==1) {
			return true;
		}
		return false;
	};
	SearchBox.prototype.bind_input = function() {
		if ( $.browser.mozilla ) {
			oInputBoxN.bind('keydown', function(e) {
				oSearchBox.keydown_up(e) ;
			})
			oInputBoxN.bind('input', function(e) {
				oSearchBox.input(e) ;
			});
		} else {
			oInputBoxN.bind('keyup', function(e) {
				oSearchBox.keydown_up(e) ;
			});
		}
		oInputBoxN.focus(function(){
			setTimeout(function(){oSearchBox.input();}, 10);
		}) ;
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
				src.parents('li').hide();
			},
			success:function(res){
				oSelf.lastKeyword = false;
				oInputBoxN.focus();
			}
		});
	};
	var oSearchBox = new SearchBox() ;
	oSearchBox.bind_input();

	return oSearchBox ;
} )() ;