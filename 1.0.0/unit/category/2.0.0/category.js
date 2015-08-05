define(function(require,exports,module){
	require('jdf/1.0.0/ui/lazyload/1.0.0/lazyload');
	require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown');

	/**
	* @全部商品分类
	* @接口负责人:马顺风
	* @接口截图					http://img11.360buyimg.com/da/jfs/t547/317/846334197/57464/ea6b220e/5492bd52Nf94eb07a.png
	* @调试 
		1. $('#categorys-2014 .dd').mouseover();
		2. $('#category-item-1').show();$('#categorys-2014 .dorpdown-layer').show();$('#categorys-2014 .dd-inner .fore1').addClass('hover');
	*/
	var category = {
		config:{
			el:$('#categorys-2014 .dd'),
			mainId:$('#categorys-2014'),
			dataUrl:'http://dc.3.cn/category/get'
		},
		init:function(options){
			var self = this;
            //接受外部传参
            var opts = $.extend({
				type:null,  // home: 新首页(一级分类同步输出) ; mini: 频道页(只输出一级分类); 其它: 默认不显示一级分类
				mainId:null, 
				el: null
			}, options);
            if ( opts.mainId ) {
               self.config.mainId = $(opts.mainId);
            }
            if ( opts.el ) {
                self.config.el = $(opts.el);
            }

            //根据配置加载
            if ( self.config.mainId.attr('data-type') ){
           		opts.type = self.config.mainId.attr('data-type');
            }

			if ( self.isHome() || opts.type == 'home' ) {
				self.config.mainId.bind('mouseenter',function(){
					if (!$(this).attr('data-load')) {
						self.getDataInit();
						$(this).attr('data-load',1);
					}
					self.config.el.show();
				}).one('mouseleave',function(){
					self.config.mainId.find('.dd-inner .item').removeClass('hover');
				});

				self.config.mainId.find('.dd-inner .item').one('mouseenter',function(){
					if (!self.config.mainId.attr('data-load')){
						var index = $(this).attr('data-index');
						self.getDataInit(index);
						self.config.el.show();
						self.config.mainId.attr('data-load',1);
					}
				});
			} else if( opts.type == 'mini' ) {
                //self.config.mainId.append('<div class="dd"></div>');
                self.config.mainId.bind('mouseenter',function(){
                    if (!$(this).attr('data-load')) {
                        self.getDataInit(undefined, 'mini');
                    }
                    $(this).attr('data-load',1);
                    self.config.mainId.addClass('hover');
                    self.config.el.addClass('hover').show();
                }).bind('mouseleave',function(){
                    self.config.mainId.removeClass('hover');
                    self.config.el.hide();
                });
            } else if( opts.type == 'default') {
				//$('#navitems-2014').css({left:220})
				if(!self.config.mainId.find('.dd').size()){
					self.config.mainId.append('<div class="dd" style="display:none;"></div>');
					//重写.dd
					self.config.el = (function(){
						 return $('#categorys-2014 .dd');
					})();
				}
				
				$('#navitems-2014').css({
					'padding-left': 210
				});

				$('#categorys-2014 .dd').css({
					'margin-top': 0,
					'padding-top': 2
				});

				self.config.mainId.css({
					height:'auto',
					left:0,
					position:'absolute'
				});
				
				self.config.mainId.bind('mouseenter',function(){
					if (!$(this).attr('data-load')) {
						self.getDataInit();
						$(this).attr('data-load',1);
					}
					self.config.el.show();
				}).bind('mouseleave',function(){
					self.config.el.hide();
				});
			}
		},
		getDataInit:function(index, type, callback ){
			var self = this;
			 $.ajax({
				 url:self.config.dataUrl,
				 dataType:'jsonp',
				 scriptCharset:'gb2312',
				 cache:true,
				 jsonpCallback:'getCategoryCallback',
				 success:function(data){
					 if ( type == 'mini' ) {
						 self.render2(data);
						 self.bigiframe(self.config.el.find('.dd-inner'));
					 } else {
						 self.render(data);
						 self.bigiframe(self.config.el.find('.dorpdown-layer'));
						 self.bind(index);
					 }
					 if(callback) callback();
				 }
			});
		},
		imgIndex:0,
		getLinkHtml:function(str, imagesWidth, imagesHeight, level, textPrefix, textSuffix){
			//"url|文字|图片url|特殊样式",
			var array = str.split('|');
			var className = [];
			var imgClass = '';
            array[0] = array[0].replace(/ /g, '');
			var url = /^\d.*\d$/.test(array[0]) ? array[0] : 'http://'+array[0].replace(/^http\:\/\//g, '');
		
			if (typeof(level) != 'undefined') {
				var urlPrefix = '';
				if (level == 2) {
					//二级频道页 http://channel.jd.com/737-738.html
					urlPrefix = 'channel.jd.com';
					if(array[0]){ 
						url = /^\d.*\d$/.test(array[0])
						? 'http://'+urlPrefix+'/'+array[0]+'.html'
						: (/^http/.test(array[0]) ? '' : 'http://') + array[0];
					}
				}else if(level == 3){
					//三级列表页 
					if(/^\d.*\d$/.test(array[0])){
						if(array[0].split('-').length == 2){
							//http://channel.jd.com/6233-6264.html
							url = 'http://channel.jd.com/'+array[0]+'.html';
						}else if(array[0].split('-').length == 3){
							//http://list.jd.com/list.html?cat=1315,1342,1348
							url = 'http://list.jd.com/list.html?cat='+array[0].replace(/\-/g,',');
						}
					}else{
						url = (/^http/.test(array[0]) ? '' : 'http://') + array[0];
					}
				}
			}

			if ( array[3] == 1 ) {
				className.push('style-red');
			}

			if ( array[2] ) {
				className.push('img-link');
			}

			if ( className.length > 0 ) {
				className = 'class="'+className.join(' ')+'"';
			}

			var html = '';
			if(array[0]){
				html = '<a href="'+url+'" '+className+' target="_blank">';
			}else{
				html = '<span>';
			}

			if(array[2]){
				if(this.imgIndex>4){
					this.imgIndex = 0;
				}
				imagesWidth = !imagesWidth ? '' : ' width="'+imagesWidth+'"';
				imagesHeight = !imagesHeight ? '' : ' height="'+imagesHeight+'"';
				html += '<img src="http://misc.360buyimg.com/lib/img/e/blank.gif" data-lazy-img="http://img1'+this.imgIndex+'.360buyimg.com/'+array[2]+'"  '+imagesWidth+imagesHeight+' />';
				this.imgIndex += 1;
			}else{
				html += 
					(textPrefix ? textPrefix : '' ) 
					+ array[1] + 
					(textSuffix ? textSuffix : '');
			}

			if(array[0]){ 
				html += '</a>';
			}else{
				html += '</span>';
			}

			return html;
		},
		render:function(result){
			var self = this;
			var data = result.data;
			var itemLevel1 = '', itemLevel2 = '';

			$.each(data,function(x0, cat1){
				//subitemsHtml
				var  subitemsHtml = '';
				var itemLevel1H1 = '';
				$.each(data[x0].s,function(x1){
					var y1 = data[x0].s[x1];
                    var isJPCat = false;
					itemLevel1H1 += self.getLinkHtml(y1.n)  + ( x1 < data[x0].s.length -1 ? '、'  : '' );
                    if ( cat1.id == 'n' && x1 == 0 ) {
                        isJPCat = true;
                        subitemsHtml += '<div class="subitems-main1">';
                    }
					$.each(y1.s,function(x2){
						var y2 = y1.s[x2].s;
						//二级频道页
						var y4 = self.getLinkHtml(y1.s[x2].n, null, null, 2, null, '<i>&gt;</i>');
						var y4Html = '<dt>'+y4+'</dt>';
	
						var y3Html = '';
						if(y2 != 0){
							$.each(y2,function(x3){
								//三级列表页
								y3Html += self.getLinkHtml(y2[x3].n , null, 16, 3);
							});
						}
						y3Html = '<dd>'+y3Html+'</dd>';
						subitemsHtml += '<dl class="fore'+(x2+1)+'">'+y4Html+y3Html+'</dl>';

                        if ( isJPCat && x2 == 6) {
                            subitemsHtml += '</div><div class="subitems-main2">';
                        }
					});
                    if ( isJPCat ) {
                        subitemsHtml += '</div>';
                    }
				});
				
				var clstagPrefix = function(i){
					var j = (x0+1) < 10 ? '0'+(x0+1) : x0+1;
					return ' clstag="h|keycount|2015|05'+j+i+'"'
				}
				
				//一级分类 clstag="h|keycount|2015|0501'+String.fromCharCode(97+x0)+'
				itemLevel1 += '<div class="item fore'+(x0+1)+'" data-index="'+(x0+1)+'" '+clstagPrefix('a')+'>\
						<h3>'+itemLevel1H1+'</h3>\
						<i>&gt;</i>\
					</div>\
				';
				
				//子分类(二级频道/三级列表)
				subitemsHtml = '<div class="subitems"'+clstagPrefix('c')+'>'+subitemsHtml+'</div>';
				
				var saleHtml = '';
				$.each(data[x0].c,function(x1){
					var y1 = data[x0].c[x1];
					saleHtml += self.getLinkHtml(y1, null, 24);
				});

				if (saleHtml) {
					saleHtml = '<span class="line"></span>' + '<div class="sale">'+saleHtml+'</div>';
				}

				var channelsHtml = '';
				$.each(data[x0].t,function(x1){
					var y1 = data[x0].t[x1];
					channelsHtml += self.getLinkHtml(y1,null,24,null,null,'<i>&gt;</i>');
				});
				channelsHtml = '<div class="channels">'+channelsHtml+'</div>' + saleHtml;
				channelsHtml = '<div class="item-channels"'+clstagPrefix('b')+'>'+channelsHtml+'</div>';
				
				var brandsHtml = '';
				var brandsNum = 0;
				$.each(data[x0].b,function(x1){
					if(x1<8){
						var y1 = data[x0].b[x1];
						brandsHtml += self.getLinkHtml(y1, 83, 35);
						brandsNum += 1;
					}
				});

				//奇数时加垫底图片
				if(brandsNum>0 && (brandsNum%2 == 1) ){
					brandsHtml += '<a><img src="http://img10.360buyimg.com/da/jfs/t757/162/604852976/158/9ed36f8/54c8699bNc2cfc6a1.png"></a>';
				}

				brandsHtml = '<div class="item-brands"'+clstagPrefix('d')+'><div class="brands-inner">'+brandsHtml+'</div></div>';
				
				var promotionsHtml = '';
				$.each(data[x0].p,function(x1){
					if(x1<2){
						var y1 = data[x0].p[x1];
						promotionsHtml += self.getLinkHtml(y1, 168, 134);
					}
				});
				promotionsHtml = '<div class="item-promotions"'+clstagPrefix('e')+'>'+promotionsHtml+'</div>';
				
				itemLevel2 += '<div class="item-sub" id="category-item-'+(x0+1)+'" data-id="'+data[x0].id+'">'+brandsHtml+channelsHtml+subitemsHtml+promotionsHtml+'</div>';
			});
			
			itemLevel2 = '<div class="dorpdown-layer" style="display: none;">\
				'+itemLevel2+'\
				</div>\
			';
	
			itemLevel1 = '<div class="dd-inner">'+itemLevel1 +'</div>';
			self.config.el.append( self.isHome() ? itemLevel2 : itemLevel1 + itemLevel2 );
		},
        //只绘制一级数据
        render2:function(result){
            var self = this;
            var data = result.data;
            var itemLevel1 = '';

            $.each(data,function(x0, cat1){
                var itemLevel1H1 = '';
                $.each(data[x0].s,function(x1){
                    var y1 = data[x0].s[x1];
                    itemLevel1H1 += self.getLinkHtml(y1.n)  + ( x1 < data[x0].s.length -1 ? '、'  : '' );
                });

                var clstagPrefix = function(i){
                    var j = (x0+1) < 10 ? '0'+(x0+1) : x0+1;
                    return ' clstag="h|keycount|2015|05'+j+i+'"'
                }

                //一级分类 clstag="h|keycount|2015|0501'+String.fromCharCode(97+x0)+'
                itemLevel1 += '<div class="item fore'+(x0+1)+'" data-index="'+(x0+1)+'" '+clstagPrefix('a')+'>\
						<h3>'+itemLevel1H1+'</h3>\
					</div>\
				';

            });

            itemLevel1 = '<div class="dd-inner">'+itemLevel1 +'</div>';
            self.config.el.html( itemLevel1 );
        },
		bind:function(index){
			var self = this;
			var onchangeFn = function(index){
                self.config.el.find('.dorpdown-layer').show();
                self.config.el.find('.item-sub').removeClass('hover');
                var c = self.config.el.find('.item-sub').eq(index-1);
                c.addClass('hover');
                c.lazyload();
                self.topRest();
			};

			self.config.el.dropdown({
				item:'item',
				current:'hover',
				topspeed:true,
				bodyClass:'item-sub',
				onchange:function(o){
					onchangeFn(o.attr('data-index'));
					if ($.browser.msie && $.browser.version == 6 && self.iframeName) {
						$('#'+self.iframeName).height(self.iframeContext.outerHeight());
					}
				},
				onmouseleave:function(){
					self.config.mainId.find('.dd-inner .item.hover').removeClass('hover');
					self.config.el.find('.dorpdown-layer').hide();
					self.config.el.find('.item-sub').removeClass('hover');
					if ($.browser.msie && $.browser.version == 6 && self.iframeName) {
						$('#'+self.iframeName).height(0);
					}
				}
			});

			if(typeof(index) != 'undefined'){
				onchangeFn(index);
				self.config.el.find('.item').removeClass('hover');
				self.config.el.find('.item').eq(index-1).addClass('hover');
			}
		},
		topRest:function(){
			var self = this;
			var top = self.config.el.offset().top;
			var sTop= $(window).scrollTop();

			if (sTop>top) {
				top = sTop - top + 44;
			}else {
				top = '';
			}
			self.config.el.find('.dorpdown-layer').css({top:top});
		},
		//是否为首页
		isHome:function(){
			if ( typeof pageConfig !== 'undefined' ) {
				return pageConfig.navId && pageConfig.navId == "jdhome2015";
			}else {
				return false;
			}
		},
		//IE6加iframe衬底
		bigiframe: function(obj,width,height){
			var self = this;
			if (obj && $.browser.msie && $.browser.version == 6) {
				if (typeof(width) == 'undefined') {
					width = obj.outerWidth();
				}

				if (typeof(height) == 'undefined') {
					height = obj.outerHeight();
				}
				if ( height < 100 ) height = $(window).height();
				self.iframeName = 'categoryIe6BgIframe';
				self.iframeContext = obj;
				var html = '<iframe src="javascript:false;" frameBorder="0" style="width:'+width+'px;height:'+height+'px;position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0);top:0;left:0;" id="'+self.iframeName+'">';
				obj.append(html);
				//IE6下需要强制隐藏下
				//obj.bind('mouseenter', function () {
				//	obj.find('#bigiframe').show()
				//}).bind('mouseleave', function () {
				//	obj.find('#bigiframe').hide()
				//});
			}
		}
	};

	function init(options){
		category.init(options);
	}
	return init;
});
