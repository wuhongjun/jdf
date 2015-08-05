define(function(require,exports,module){
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	var getjsonp = require('jdf/1.0.0/unit/getjsonp/1.0.0/getjsonp.js');
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');

	/**
	* @bigiframe
	*/
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

			//IE6下需要强制隐藏下
	        obj.bind('mouseenter', function () {
	            obj.find('#bigiframe').show()
	        }).bind('mouseleave', function () {
	            obj.find('#bigiframe').hide()
	        });
		}
	}

	/**
	* @全部商品分类
	*/
	if ( typeof pageConfig !== 'undefined' ) {
		pageConfig.isHome = (function() {
			return pageConfig.navId&&pageConfig.navId=="home"&&location.href.indexOf('www.jd.com')>=0;
		})();
	}

	var category={
		OBJ:$("#_JD_ALLSORT"),
		URL_Serv:"http://d.jd.com/configs/get?type=JSON",
		//URL_Serv:"http://d.360buy.com/configs/get?type=JSON",
		//URL_Serv:"http://www.360buy.com/ajaxservice.aspx?stype=SortJson",
    	//URL_BrandsServ:"http://d.360buy.com/brandVclist/get?callback=category.getBrandService&ids=a,915,925^b,916,926^c,917,927^d,918,928^e,919,929^f,920,930^g,921,931^h,922,932^i,923,933^j,924,934^k,2096,2097^l,3512,3513^m,5274,5275^p,6211,6212",
       // URL_BrandsServ:"http://d.360buy.com/brandVclist2/get?callback=category.getBrandService&ids=a,9211,9212^b,9214,9215^c,9217,9218^d,9220,9221^e,9223,9224^f,9226,9227^g,9229,9230^h,9232,9233^m,9235,9236^i,9238,9239^j,9241,9242^p,9244,9245^k,9247,9248^l,9250,9251",
        URL_BrandsServ:"http://d.jd.com/brandVclist2/get?callback=category.getBrandService&ids=a,9211,9212^b,9214,9215^c,9217,9218^d,9220,9221^e,9223,9224^f,9226,9227^g,9229,9230^h,9232,9233^m,9235,9236^i,9238,9239^j,9241,9242^p,9244,9245^k,9247,9248^l,9250,9251",

		FN_GetLink:function(type,obj){
			var linkUrl,linkText;

            function getColoredHTML(url, text) {
                // 红色链接
                pageConfig.RE_HL_link = pageConfig.RE_HL_link || /sale.jd.com/;
                pageConfig.RE_HL_text = pageConfig.RE_HL_text || /11.11/;


                pageConfig.HL_style = 'color:#E4393C';

                return pageConfig.RE_HL_link.test(url) && pageConfig.RE_HL_text.test(text) ? pageConfig.HL_style : '';
            }


			switch(type){
				case 1:
					linkUrl=obj.u;
					linkText=obj.n;
					break;
				case 2:
					linkUrl=obj.split("|")[0];
					linkText=obj.split("|")[1];
					break;
			}
			if(linkUrl==""){
				return linkText;
			}else{
				if (!/^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?$/.test(linkUrl)){
					linkUrl=linkUrl.replace(/-000$/,"");
					if(linkUrl.match(/^\d*-\d*$/)){
						linkUrl="http://channel.jd.com/"+linkUrl+".html";
					}else{
						linkUrl="http://list.jd.com/"+linkUrl+".html";
					}
				}
				return '<a style="'+ getColoredHTML(linkUrl, linkText) +'" href="'+linkUrl+'">'+linkText+'</a>';

			}
		},
		FN_SetLink:function(flag){
			var html="";
			var clsDiy = pageConfig.isHome ? 'clstag="homepage|keycount|home2013|0604e"' : '';
			var clsCellphone = pageConfig.isHome ? 'clstag="homepage|keycount|home2013|0603e"' : '';
			var clsJiaZhuangCheng = pageConfig.isHome ? 'clstag="homepage|keycount|home2013|0605e"' : '';
			var clsSmart = pageConfig.isHome ? 'clstag="homepage|keycount|home2013|0602e"' : '';

			switch(flag){
				case "a":
					html='<div class="categorys-links" '+ clsSmart +'><a href="http://smart.jd.com/" target="_blank" style="line-height:1"><img src="http://img11.360buyimg.com/da/jfs/t673/208/1292971615/21690/1c564367/54c5b8aeN9836b9e1.jpg" /></a></div>';
					break;
				case "c":
                	html='<div class="categorys-links" '+ clsDiy +'><a href="http://group.jd.com/index/20000001.htm" target="_blank" style="line-height:1"><img src="http://img13.360buyimg.com/da/jfs/t328/179/568110786/5477/d602dfd5/54180c0eN5ddce4d3.png" /></a></div>';
					break;
				case "b":
					html='<div class="categorys-links" id="categorys-links-cellphone" '+ clsCellphone +'><a href="http://sale.jd.com/act/w78AxhytLrVelbs.html" target="_blank">手机新品馆</a></div>';
					break;
				case "d":
					html='<div class="categorys-links" id="categorys-links-jzc" '+ clsJiaZhuangCheng +'><a href="http://channel.jd.com/jiazhuang.html" target="_blank">家装城</a></div>';
					break;
				// case "e":
				//     html="<div class='categorys-links' id='categorys-links-dpg' clstag='homepage|keycount|home2013|0606e'><a href='http://dapeigou.jd.com/'>搭配购</a></div>";
				//     break;
				default:
					break;
			}
			return html;
		},
		DATA_Simple:{
		   "1":[
	              {l:"http://book.jd.com/",n:"图书"},
	              {l:"http://mvd.jd.com/",n:"音像"},
	              {l:"http://e.jd.com/",n:"数字商品"}
	        ],
	        "2":[
	             {l:"http://channel.jd.com/electronic.html",n:"家用电器"}
	        ],
	        "3":[
	             {l:"http://shouji.jd.com/",n:"手机"},
	             {l:"http://channel.jd.com/digital.html",n:"数码"},
				 {l:"http://mobile.jd.com/index.do",n:"京东通信"}
	        ],
	        "4":[
	             {l:"http://channel.jd.com/computer.html",n:"电脑、办公"}
	        ],
	        "5":[
	             {l:"http://channel.jd.com/home.html",n:"家居"},
	             {l:"http://channel.jd.com/furniture.html",n:"家具"},
	             {l:"http://channel.jd.com/decoration.html",n:"家装"},
	             {l:"http://channel.jd.com/kitchenware.html",n:"厨具"}
	        ],
	        "6":[
				 {l:"http://channel.jd.com/1315-1342.html",n:"男装"},
				 {l:"http://channel.jd.com/1315-1343.html",n:"女装"},
				 {l:"http://channel.jd.com/1315-1345.html",n:"内衣"},
				 {l:"http://channel.jd.com/jewellery.html",n:"珠宝"}
			 ],
	        "7":[
	             {l:"http://channel.jd.com/beauty.html",n:"个护化妆"}
	        ],
	        "8":[
	             {l:"http://channel.jd.com/shoes.html",n:"鞋靴"},
	             {l:"http://channel.jd.com/bag.html",n:"箱包"},
	             {l:"http://channel.jd.com/watch.html",n:"钟表"},
	             {l:"http://channel.jd.com/1672-2615.html",n:"奢侈品"}
	        ],
	        "9":[
	             {l:"http://channel.jd.com/sports.html",n:"运动户外"}
	        ],
	        "10":[
                 {l:"http://car.jd.com",n:"汽车"},
	             {l:"http://channel.jd.com/auto.html",n:"汽车用品"}
	        ],
	        "11":[
	              {l:"http://channel.jd.com/baby.html",n:"母婴"},
	              {l:"http://channel.jd.com/toys.html",n:"玩具乐器"}
	        ],
	        "12":[
	              {l:"http://channel.jd.com/food.html",n:"食品饮料"},
	              {l:"http://channel.jd.com/wine.html",n:"酒类"},
	              {l:"http://channel.jd.com/freshfood.html",n:"生鲜"}
	        ],
	        "13":[
	              {l:"http://channel.jd.com/health.html",n:"营养保健"}
	        ],
	        "14":[
	              {l:"http://caipiao.jd.com/",n:"彩票"},
	              {l:"http://trip.jd.com/",n:"旅行"},
	              {l:"http://chongzhi.jd.com/",n:"充值"},
	              {l:"http://piao.jd.com/",n:"票务"}
	        ]},
		TPL_Simple: '{for item in data}'
			+'<div class="item fore${parseInt(item_index)}">'
			+'    <span data-split="1" {if pageConfig.isHome} clstag="homepage|keycount|home2013|06{if parseInt(item_index)+1>9}${parseInt(item_index)+1}{else}0${parseInt(item_index)+1}{/if}a"{/if}>'
			+'        <h3>{for sItem in item}{if sItem_index!=0}、{/if}<a href="${sItem.l}">${sItem.n}</a>{/for}</h3>'
			+'        <s></s>'
			+'    </span>'
			+'</div>'
			+'{/for}'
			+'<div class="extra"><a href="http://www.jd.com/allSort.aspx">全部商品分类</a></div>',
		FN_InitSimple:function(){
			var html;
	        var object={};
	        var cat2013 = $('#categorys-2013');

	        object.data=this.DATA_Simple;

	        cat2013.addClass('categorys-2014');
	        html=this.TPL_Simple.process(object);

		var o = $("#_JD_ALLSORT");
        o.html(html);
		$.bigiframe(o);
    },
    FN_GetData:function(){
        $.getJSONP(this.URL_Serv,category.getDataService);
    },
    FN_GetBrands:function(){
        $.getJSONP(this.URL_BrandsServ,category.getBrandService);
    },
    FN_RefactorJSON: function( data, perPageNum ) {
        var totalPage = data.length/perPageNum;
        var resData = [];

        for ( var i = 0; i < totalPage; i++ ) {
            resData.push({ 'tabs': [], 'increment': null, 'count': perPageNum, skuids: []});
        }

        var m = 0;
        for ( var k = 0; k < data.length; k++ ) {
            if ( k%perPageNum == 0 ) { m++; }

            resData[(m-1)]['tabs'].push( data[k] );
            resData[(m-1)]['increment'] = m;
            resData[(m-1)]['skuids'].push( data[k].wid );

        }

        return resData
    },
    renderItem: function (data, i) {
        var tplItemNormal = ''
            +'<div class="item fore${index+1}">'
            +'    <span data-split="1" {if pageConfig.isHome}clstag="homepage|keycount|home2013|0${601+parseInt(index)}a"{/if}><h3>${n}</h3><s></s></span>'
            +'    <div class="i-mc">'
            +'        <div onclick="$(this).parent().parent().removeClass(\'hover\')" class="close">×</div>'
            +'        <div class="subitem" {if pageConfig.isHome}clstag="homepage|keycount|home2013|0${601+parseInt(index)}b"{/if}>'
            +'            {for subitem in i}'
            +'            <dl class="fore${parseInt(subitem_index)+1}">'
            +'                <dt>${category.FN_GetLink(1,subitem)}</dt>'
            +'                <dd>{for link in subitem.i}<em>${category.FN_GetLink(2,link)}</em>{/for}</dd>'
            +'            </dl>'
            +'            {/for}'
            +'        </div>'
            +'        <div class="cat-right-con fr" id="JD_sort_${t}"><div class="loading-style1"><b></b>加载中，请稍候...</div></div>'
            +'    </div>'
            +'</div>';

        // 本地生活、旅游出行
        var tplItemVirtuals = ''
            +'<div class="item item-col2 fore${index+1}">'
            +'    <span data-split="1" {if pageConfig.isHome}clstag="homepage|keycount|home2013|0${601+parseInt(index)}a"{/if}><h3>${n}</h3><s></s></span>'
            +'    <div class="i-mc">'
            +'        <ul class="title-list lh">'
            +'            <li class="fore1"><a href="http://chongzhi.jd.com/">充值缴费</a></li>'
            +'            <li class="fore2"><a href="http://caipiao.jd.com/">京东彩票</a></li>'
            +'            <li class="fore3"><a href="http://channel.jd.com/4938-12316.html">培训教育</a></li>'
            +'            <li class="fore4"><a href="http://jipiao.jd.com/ticketquery/flightHotcity.action">优选机票</a></li>'
            +'            <li class="fore5"><a href="http://channel.jd.com/4938-12300.html">旅行签证</a></li>'
            +'        </ul>'
            +'        <div onclick="$(this).parent().parent().removeClass(\'hover\')" class="close">×</div>'
            +'        <div class="subitem" {if pageConfig.isHome}clstag="homepage|keycount|home2013|0${601+parseInt(index)}b"{/if}>'
            +'            {for item in i}'
            +'            <div class="sub-item-col sub-item-col${item_index} fl">'
            +'                {for subitem in item.tabs}'
            +'                <dl class="fore${parseInt(subitem_index)+1}">'
            +'                    <dt>${category.FN_GetLink(1,subitem)}</dt>'
            +'                    <dd>{for link in subitem.i}<em>${category.FN_GetLink(2,link)}</em>{/for}</dd>'
            +'                </dl>'
            +'                {/for}'
			+'					{if item_index==1}<div class="cat-right-con" id="JD_sort_${t}" clstag="homepage|keycount|home2013|0614c"><div class="loading-style1"><b></b>加载中，请稍候...</div></div>{/if}'
            +'            </div>'
            +'            {/for}'
            +'        </div>'
            +'    </div>'
            +'</div>';

        if ( data.t == 'l' ) {
            return tplItemVirtuals.process(data);
        } else {
            return tplItemNormal.process(data);
        }
    },
    FN_GetBrands:function(){
        $.getJSONP(this.URL_BrandsServ,category.getBrandService);
    },
    getDataService:function(data){
        var resHTML = [];
        var _this = this;

        $.each(data.data, function (i) {
            this.index = i;

            // JSON 分组
            if (this.t == 'l') {
                this.i = _this.FN_RefactorJSON(this.i, 7);
            }

            resHTML.push( _this.renderItem(this, i) );
        });

        resHTML.push( '<div class="extra"><a {if pageConfig.isHome}clstag="homepage|keycount|home2013|0614a"{/if} href="http://www.jd.com/allSort.aspx">全部商品分类</a></div>' );

        this.OBJ.attr("load","1").html(resHTML.join(''));

		$.bigiframe(this.OBJ);
        this.FN_GetBrands();

			var me = this;
			var objWidth = this.OBJ.outerWidth();
			var objHeight = this.OBJ.outerHeight();

			this.OBJ.dropdown({
				topspeed:true,
				//trigger:true,
				item:'item',
				current:'hover',
				onmouseleave:function(){
					$('#_JD_ALLSORT .item').removeClass('hover');
				},
				onchange:function(object){
					var sTop=document.documentElement.scrollTop+document.body.scrollTop,
						oTop,
						iTop,
						nTop=$("#nav-2013").offset().top+39;
					if(sTop<=nTop){
						//当全部商品分类模块顶部显示时
						if(object.hasClass("fore13")){
							//曾经中间少了一行 iTop=23;
							iTop=3;
						}else{
							iTop=3;
						}
						sTop=iTop;
					}else{
						//当全部商品分类模块顶部显示在屏幕外时
						oTop=object.offset().top;
						if(sTop>oTop-5){
							sTop=oTop-nTop-10;
						}else{
							sTop=Math.max(3,sTop-nTop);
						}
					}
					var i_mc = object.find(".i-mc");
					i_mc.css({"top":sTop+"px"});

					if (me.OBJ.find('iframe')) {
						var w = i_mc.outerWidth() + objWidth;
						var h = i_mc.outerHeight() > objHeight ?  i_mc.outerHeight() : objHeight;
						me.OBJ.find('iframe').css({
							width:w,
							height:h,
							top:sTop
						})
					}

                    if ( typeof firstCategoryHover === 'function' ) {
                        firstCategoryHover(object);
                    }

				}
			});
		},
		getRightAreaTPL: function(id) {
	        var tplRightEntrance = '';
	        var tplPromotions = '';
	        var tplBrands = '';

	        var result = '';

	        // 右上角入口链接
	        tplRightEntrance = this.FN_SetLink(id);

	        // 广告图
	        tplPromotions = ''
	            +'{if p.length!=0}'
	            +'<dl class="categorys-promotions">'
	            +'    <dd>'
	            +'        <ul>'
	            +'            {for item in p}'
	            +'            <li>'
	            +'                <a href="${item.u}" target="_blank">'
	            +'                {if item.i}'
	            +'                    <img src="${item.i}" width="194" height="70" title="${item.n}"  style="margin-bottom: 4px;" />'
	            +'                {else}'
	            +'                    ${item.n}'
	            +'                {/if}'
	            +'                </a>'
	            +'            </li>'
	            +'            {/for}'
	            +'        </ul>'
	            +'    </dd>'
	            +'</dl>'
	            +'{/if}';

	        // 推荐品牌列表
	        tplBrands = ''
	            +'{if b.length!=0}'
	            +'<dl class="categorys-brands">'
	            +'    {if id=="k"}'
	            +'        <dt>推荐品牌出版商/书店</dt>'
	            +'    {else}'
	            +'        {if id=="l"}'
	            +'        <dt>推荐产品</dt>'
	            +'        {else}'
	            +'        <dt>推荐品牌</dt>'
	            +'        {/if}'
	            +'    {/if}'
	            +'    <dd>'
	            +'        <ul>'
	            +'            {for item in b} <li><a href="${item.u}" target="_blank">${item.n}</a></li> {/for}'
	            +'        </ul>'
	            +'    </dd>'
	            +'</dl>'
	            +'{/if}';

	        // 推荐品牌在上，广告图片在下
	        if ( /c|b|d/.test(id) ) {
	            result = tplRightEntrance + tplBrands + tplPromotions;
	        } else {
	            result = tplRightEntrance + tplPromotions + tplBrands;
	        }

	        return result;
	    },
		getBrandService:function(json){
			var _this=this,
				data=json.data;
			this.OBJ.attr("load","2");


        $.each(data,function(i){
            var id = this.id;
            var TPL = _this.getRightAreaTPL(id);

            // 本地生活、游泳出行分类
            //if ( id !== 'l' ) {
                $("#JD_sort_"+id).html(TPL.process(this));
            //}

        });

			$('.cat-right-con').each(function(i) {
				if (pageConfig.isHome) {
					$(this).find('.categorys-promotions').attr( 'clstag', 'homepage|keycount|home2013|0' + (601+i) + 'c' );
					$(this).find('.categorys-brands').attr( 'clstag', 'homepage|keycount|home2013|0' + (601+i) + 'd' );
				}
			});
		},
		FN_Init:function(){
			if(!this.OBJ.length)return;
			if(!this.OBJ.attr("load")){
				if(window.pageConfig&&window.pageConfig.pageId!=0){
					this.FN_InitSimple();
				}
				if($("#categorys").length){
					$('#categorys').dropdown({
						enterDelay:200,
						trigger:true,
						current:'hover'
					});
				}else{
					$('#categorys-2013').dropdown({
						enterDelay:200,
						trigger:true,
						current:'hover',
                        onchange: function($el) {
                            if ( typeof allCategoryHover === 'function' ) {
                                allCategoryHover($el);
                            }
                        }
					});
				}
			}
			var _this=this;
			this.OBJ.one("mouseover",function(){
				var flag=_this.OBJ.attr("load");
				if (!flag){
					_this.FN_GetData();
				}else if(flag==1){
					_this.FN_GetBrands();
				}else{
					return;
				}
			})
		}
	};

	//todo修正jsonp接口 http://www.jd.com/ajaxservice.aspx?stype=SortJson
	window.category = category;

	function init(){
		category.FN_Init();
	}

	return init;
});