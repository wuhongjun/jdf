/**
* upddate *
* 2015-1-8 16:45:00 by chenxiaochun
* 更换对比栏和最近浏览的数据接口
* 删除原来对比按钮的cookie逻辑
*/

define(function(require,exports,module){
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');
	//依赖lib.js中Jtab
	var lib = require('jdf/1.0.0/unit/lib/1.0.0/lib.js');
	var GlobalReco = require('jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js');
	//样式文件
	var contrastCss = require('http://misc.360buyimg.com/contrast/skin/2012/pop_compare.css?v=20140123');

	/**
	* @商品对比
	*/

	//2012-9-18
	var ie = (function(){

		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;
	}());
	(function(a){a.fn.imgScroll=function(b,e){var d={data:[],template:null,evtType:"click",visible:1,direction:"x",next:"#next",prev:"#prev",disableClass:"disabled",disableClassPerfix:false,speed:300,step:1,loop:false,showControl:false,width:null,height:null,navItems:false,navItmesWrapClass:"scroll-nav-wrap",navItemActivedClass:"current",status:false,statusWrapSelector:".scroll-status-wrap"};var c=a.extend(d,b);return this.each(function(){var E=a(this),D=E.find("ul").eq(0),G,f=D.children("li"),q=f.length,j=null,l=null,Q=typeof c.next=="string"?a(c.next):c.next,u=typeof c.prev=="string"?a(c.prev):c.prev,s=0,C=c.step,v=c.visible,z=Math.ceil((q-v)/C)+1,h=c.loop,O=c.direction,x=c.evtType,B=c.disableClass,t=c.disableClassPerfix?"prev-"+B:B,L=c.disableClassPerfix?"next-"+B:B,o=c.navItems,F=c.navItmesWrapClass,N=a("."+F).length>0,I=c.navItemActivedClass,A=c.status,J=c.statusWrapSelector,w=a(J).length>0,n=false,i=true,M=(q-v)%C===0,p=c.template||'<ul>{for slide in list}<li><a href="${slide.href}" target="_blank"><img src="${slide.src}" alt="${slide.alt}" /></a></li>{/for}</ul>';function g(R){if(q>v&&!h){u.addClass(t);Q.removeClass(L)}else{if(!h){Q.addClass(L)}}if(f.eq(0).css("float")!=="left"){f.css("float","left")}j=c.width||f.eq(0).outerWidth();l=c.height||f.eq(0).outerHeight();E.css({position:E.css("position")=="static"?"relative":E.css("position"),width:R=="x"?j*v:j,height:R=="x"?l:l*v,overflow:"hidden"});D.css({position:"absolute",width:R=="x"?j*q:j,height:R=="x"?l:l*q,top:0,left:0});if(typeof e==="function"){e.apply(E,[s,z,f.slice(s*C,s*C+v),f.slice(s*C+v-C,s*C+v)])}}function P(){q=c.data.length;D=E.find("ul").eq(0);f=D.children("li");z=Math.ceil((q-v)/C)+1;M=(q-v)%C===0}function r(S){var R={list:S};E.html(p.process(R));P()}function H(S,T){if(D.is(":animated")){return false}if(h){if(i&&T){s=z}if(n&&!T){s=-1}S=T?--s:++s}else{if(i&&T||n&&!T){return false}else{S=T?--s:++s}}G=O=="x"?{left:S>=(z-1)?-(q-v)*j:-S*C*j}:{top:S>=(z-1)?-(q-v)*l:-S*C*l};function R(){if(!h){if(q-S*C<=v){Q.addClass(L);n=true}else{Q.removeClass(L);n=false}if(S<=0){u.addClass(t);i=true}else{u.removeClass(t);i=false}}else{if(q-S*C<=v){n=true}else{n=false}if(S<=0){i=true}else{i=false}}if(o||A){m(S)}if(typeof e=="function"){e.apply(E,[S,z,f.slice(S*C,S*C+v),f.slice(S*C+v-C,S*C+v)])}}if(!!c.speed){D.animate(G,c.speed,R)}else{D.css(G);R()}}function K(U,R){var S=N?a("."+U).eq(0):a('<div class="'+U+'"></div>');for(var T=0;T<z;T++){S.append("<em "+(T===0?" class="+R:"")+' title="'+(T+1)+'">'+(T+1)+"</em>")}if(!N){E.after(S)}}function k(){var R=w?a(J).eq(0):a('<div class="'+J.replace(".","")+'"></div>');R.html("<b>1</b>/"+z);if(!w){E.after(R)}}function m(R){if(o){a("."+F).find("em").removeClass(I).eq(R).addClass(I)}if(A){a(J).html("<b>"+(R+1)+"</b>/"+z)}}function y(){u.unbind(x).bind(x,function(){H(s,true)});Q.unbind(x).bind(x,function(){H(s,false)})}if(c.data.length>0){if(!c.width||!c.height){return false}r(c.data)}if(q>v&&v>=C){g(O);y();if(o){K(F,I)}if(A){k(J)}}else{if(c.showControl){Q.add(u).show()}else{Q.add(u).hide()}u.addClass(t);Q.addClass(L)}})}})(jQuery);

	var Contrast = {
		getPriceNum: function(skus, $wrap, perfix, callback) {
			// 获得数字价格
			/**
			 How to use
			  G.getPriceNum(pageConfig.product.fittingsAuto, targetElement, null, function(sku, price, res) {
				  targetElement.find('#inp_'+sku).attr('wmeprice', price);
			  });
			 */     
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
		TPL: {
			contrast: '<div id="pop-compare" data-load="false" class="pop-compare'+(pageConfig.wideVersion&&pageConfig.compatible ? '' : ' pop-compare-narrow')+'">'
						+'<div class="pop-wrap">'
						+   '<p class="pop-compare-tips"></p>'
						+   '<div class="pop-inner" data-widget="tabs">'
						+       '<div class="diff-hd">'
						+           '<ul class="tab-btns clearfix">'
						+               '<li class="current" data-widget="tab-item"><a href="javascript:;">对比栏</a></li>'
						+               '<li data-widget="tab-item"><a href="javascript:;">最近浏览</a></li>'
						+           '</ul>'
						+           '<div class="operate">'
						+               '<a href="javascript:;" class="hide-me">隐藏</a>'
						+           '</div>'
						+       '</div>'
						+       '<div class="diff-bd tab-cons">'
						+           '<div class="tab-con" data-widget="tab-content">'
						+               '<div id="diff-items" class="diff-items clearfix">'
						+                   '<dl class="item-empty"><dt>1</dt><dd>您还可以继续添加</dd></dl>'
						+                   '<dl class="item-empty"><dt>2</dt><dd>您还可以继续添加</dd></dl>'
						+                   '<dl class="item-empty"><dt>3</dt><dd>您还可以继续添加</dd></dl>'
						+                   '<dl class="item-empty"><dt>4</dt><dd>您还可以继续添加</dd></dl>'
						+               '</div>'
						+               '<div class="diff-operate">'
						+                   '<a target="_blank" id="goto-contrast" href="#none" class="btn-compare-b">对比</a>'
						+                   '<a class="del-items">清空对比栏</a>'
						+               '</div>'
						+           '</div>'
						+           '<div class="tab-con" style="display:none;" data-widget="tab-content">'
						+               '<div class="scroll-item clearfix">'
						+                   '<span id="sc-prev" class="scroll-btn sb-prev">&lt;</span>'
						+                   '<span id="sc-next" class="scroll-btn sb-next">&gt;</span>'
						+                   '<div class="scroll-con clearfix">'
						+                       '<ul id="scroll-con-inner">'
						+                           '<p class="scroll-loading ac">载入中...</p>'
						+                       '</ul>'
						+                   '</div>'
						+               '</div>'
						+           '</div>'
						+       '</div>'
						+   '</div>'
						+'</div>'
						+'</div>',
			item: '<dl class="hasItem" id="cmp_item_${skuid}" fore="${ind}">'
					+'  <dt>'
					+'      <a target="_blank" href="${url}"><img src="${imagePath}" width="50" height="50"></a>'
					+'  </dt>'
					+'  <dd>'
					+'      <a target="_blank" class="diff-item-name" href="${url}">${decodeURIComponent(name)}</a>'
					+'      <span class="p-price"><strong class="J-p-${skuid}"></strong><a class="del-comp-item" skuid="${skuid}">删除</a></span>'
					+'  </dd>'
					+'</dl>',
			recentItem: '<li id="rec_item_${sku}">'
						+'<div class="rec_item_wrap">'
						+'  <div class="dt">'
						+'      <a target="_blank" href="${url}"><img src="${img}" width="50" height="50"></a>'
						+'  </div>'
						+'  <div class="dd">'
						+'      <a target="_blank" href="${url}" class="diff-item-name">${decodeURIComponent(t)}</a>'
						+'      <div class="btns clb">'
						+'          <span class="p-price"><strong class="J-p-${sku}"></strong></span>'
						+'          <a id="recent_${sku}" data-recent="true" skuid="${sku}" class="btn-compare btn-compare-s"><span>对比</span></a>'
						+'      </div>'
						+'  </div>'
						+'</div>'
						+'</li>'
		},
		init: function( pageType, cookieName, skuid ) {

			this.cookieName = cookieName || '_contrast';

			this.bindEvent( 'cmpBtn' );

			// if ( readCookie(this.cookieName + '_status') == 'side' && $('#side-cmp').length < 1 ) {

			// 	$('#sidepanel').prepend('<span id="side-cmp"><a class="compareHolder" href="javascript:;"><b></b>对比栏</a></span>');
			// } else {
				this.showPopWin( skuid || null );
			// }

			this.bindEvent( 'showWin' );
			this.btnStyle( null, 'set' );
			this.domain = pageConfig.FN_getDomain();
			return this;
		},
		bindEvent: function( type ) {
			var btns = $('.btn-compare'),
				delBtn = $('.del-items'),
				_this = this;

			if ( type == 'cmpBtn') {
				btns.unbind('click').bind( 'click', function() {

					var skuid = $(this).attr('skuid'),
						resSkuid = readCookie( _this.cookieName ) || '',
						skuLen = resSkuid.split('.').length;

					if ( skuLen < 4 ) {
						_this.showPopWin( skuid );

						if ($(this).attr('data-recent') == 'true') {
							_this.switchTab(0);
						}
					} else {
						if (!_this.hasCookie(skuid)) {
							_this.showPopWin(null);
							_this.setMessage('对比栏已满，您可以删除不需要的栏内商品再继续添加哦！');
						} else {
							if ($(this).attr('data-recent') == 'true') {
								_this.switchTab(0);
							}
							_this.showPopWin( skuid );
						}
					}
				});

				_this.btnStyle( null, 'set' );
			}

			if ( type == 'delAll' ) {

				delBtn.bind( 'click', function() {
					_this.delContrastItem( null, true );

					$('#goto-contrast').attr('href','#none');
				});
			}

			if ( type == 'delHover' ) {

				$('.hasItem').hover(function() {
					$(this).find('.del-comp-item').css('visibility', 'visible');
				}, function() {
					$(this).find('.del-comp-item').css('visibility', 'hidden');
				});



				// 去对比按钮
				$('#goto-contrast').click(function() {

					var resSkuid = readCookie( _this.cookieName ) || '',
						skuArr = resSkuid.split('.');

					if ( skuArr.length < 2 ) {
						_this.setMessage('至少有两件商品才能对比哦！');
						return false;
					} else {
						var sku = [0,0,0,0];

						for ( var i = 0; i < skuArr.length; i ++ ) {
							sku[i] = skuArr[i];
						}
						$('#goto-contrast').attr( 'href', 'http://www.jd.com/compare/' + sku.join('-') + '.html' );
					}
				});
			}

			if ( type == 'hide' ) {
				$('.diff-hd .hide-me').bind( 'click', function() {
					_this.hidePopWin();
				});
			}

			// if ( type == 'showWin' ) {
			// 	$('#side-cmp').bind( 'click', function() {
			// 		_this.showPopWin( null, true );
			// 	});

			// }

			return this;
		},
		switchTab: function(index) {

			$('.diff-hd li').eq(index).trigger('click');
		},
		btnStyle: function(skuid, type) {

			if ( !!skuid ) {

				// 更新单个按钮样式
				if ( type == 'set' ) {
					$('#comp_' + skuid + ',#recent_' + skuid).addClass('btn-compare-s-active');
					$('#cmp_' + skuid).text('取消对比');
				}
				if ( type == 'del' ) {
					$('#comp_' + skuid + ',#recent_' + skuid).removeClass('btn-compare-s-active');
					$('#cmp_' + skuid).text('加入对比');
				}
			} else {

				// 更新所有有cookie记录的按钮样式
				var skuids = readCookie(this.cookieName) || '';
				skuids = skuids.split('.');

				if ( skuids.length < 5 ) {
					for ( var i = 0; i < skuids.length; i++ ) {
						if ( type == 'set' ) {
							$('#comp_' + skuids[i] + ',#recent_' + skuids[i]).addClass('btn-compare-s-active');
							$('#cmp_' + skuids[i]).text('取消对比');
						}
						if ( type == 'del' ) {
							$('#comp_' + skuids[i] + ',#recent_' + skuids[i]).removeClass('btn-compare-s-active');
							$('#cmp_' + skuids[i]).text('加入对比');
						}

					}
				}

			}

			return this;
		},
		loadExistList: function( callback ) {
			// 显示所有存在cookie值的对比列表
			var skuids = readCookie(this.cookieName) || '';

			skuids = skuids.split('.');

			for ( var i = 0; i < skuids.length; i++ ) {
				//this.setContrastItem(skuids[i]);
				if ( (i+1) == skuids.length ) {
					this.setContrastItem(skuids[i], callback);
				} else {
					this.setContrastItem(skuids[i]);
				}
			}
		},
		showPopWin: function( skuid, side ) {
			var popCompare = $('#pop-compare'),
				_this = this;

			skuid = skuid || null;
			if ( $('#pop-compare').length < 1 ) {
				$('body').append( this.TPL.contrast );

				//删除链接
				$('#diff-items').delegate( '.del-comp-item', 'click', function() {
					var skuid = $(this).attr('skuid');
					_this.delContrastItem(skuid);
					return false;
				});
			}

			if ( !_this.hasCookie(skuid) && $('#diff-items .item-empty').length == 0 ) {
				_this.setMessage('对比栏已满，您可以删除不需要的栏内商品再继续添加哦！');
				return false;
			}

			if ( $('#diff-items .hasItem').length < 1 ) {

				if ( !!readCookie(this.cookieName) ) {
					this.loadExistList(function() {
						//窗口显示状态
						if ( _this.hasCookie(skuid) ) {
							_this.delContrastItem(skuid);
						} else {
							_this.setContrastItem(skuid);
						}
					});
				} else {
					_this.setContrastItem(skuid);
				}

			}

			if ( $('#pop-compare').attr('data-load') == 'false' ) {

				// 窗口未显示
				$('#pop-compare').show().attr('data-load', 'true');

				$('#pop-compare').Jtab({
					currClass: 'current',
					compatible: true,
					event: 'click'
				}, function( s, obj, n ) {

					if ( n == 1 && $('.scroll-loading').length > 0 ) {
						_this.setRecent(function(skus) {
							_this.setRecentScroll();

							_this.getPriceNum(skus, $('#pop-compare'), null, function(sku, price, res) {
							});

						});
					}
				});

				if ( ie !== 6 ) {
					$('#pop-compare').animate({
						bottom: 0
					}, 100);
				}
			} else {

				if ( readCookie( _this.cookieName + '_status' ) == 'side' ) {

					$('#pop-compare').show().attr('data-load', 'true');

					if ( ie !== 6 ) {
						$('#pop-compare').show().animate({
							bottom: 0
						});
					}
					createCookie( _this.cookieName + '_status', 'show', 30, '/;domain=' + this.domain );
				}

				//窗口显示状态
				if ( _this.hasCookie(skuid) ) {
					_this.delContrastItem(skuid);
				} else {
					_this.setContrastItem(skuid);
				}
			}

			_this.bindEvent( 'delAll' ).bindEvent( 'hide' );
		},
		hidePopWin: function() {
			var _this = this;

			// if ( $('#side-cmp').length < 1 ) {

			// 	$('#sidepanel').prepend('<span id="side-cmp"><a class="compareHolder" href="javascript:;"><b></b>对比栏</a></span>');

			// }

			if ( ie == 6 ) {

				$('#pop-compare').hide();
			} else {
				if ($('.pop-wrap').is(':animated')) {
					return false;
				}

				$('#pop-compare').css('overflow', 'hidden').find('.pop-wrap').animate({
					left: '990px'
				}, 100, function() {

					$('#pop-compare').removeAttr('style').css({
						'overflow': 'visible',
						'bottom': '-200px'
					}).hide().find('.pop-wrap').removeAttr('style').css('left', 0);
				});
			}
			_this.bindEvent( 'showWin' );
			createCookie( _this.cookieName + '_status', 'side', 30, '/;domain=' + this.domain );
		},
		setContrastItem: function(skuid, callback ) {

			var popCompare = $('#pop-compare'),
				resSkuid = readCookie( this.cookieName ) || '',
				skuLen = resSkuid.split('.').length,
				_this = this;


			if ( _this.hasCookie(skuid) && popCompare.attr('data-load') == 'true' ) {
				_this.delContrastItem(skuid);
			} else {
				if ( !skuid ) { return false; }
				$.ajax({
					url: 'http://d.jd.com/ware/history?ids=' + skuid,
					dataType: 'jsonp',
					success: function(data) {

						var ind = $('#diff-items dl').index($('#diff-items').find('.item-empty').eq(0));
						var data = data[skuid];

						data.url = 'http://item.jd.com/' + skuid + '.html';
						data.imagePath = encodeURI(pageConfig.FN_GetImageDomain(skuid) + 'n5/' + data.imagePath);
						data.name = encodeURI(data.name);
						data.skuid = skuid;
						data.ind = ind;

						if ( $('#cmp_item_'+skuid).length < 1 || !_this.hasCookie(skuid) ) {
							popCompare.find('.item-empty').eq(0).replaceWith(_this.TPL.item.process(data));
							_this.getPriceNum(skuid, $('#pop-compare'), null, function(sku, price, res){});
						}

						_this.bindEvent('delHover').setCookie(skuid).btnStyle(skuid, 'set');

						createCookie( _this.cookieName + '_status', 'show', 30, '/;domain=' + _this.domain );

						if ( typeof callback == 'function' ) {
							callback();
						}
						_this.setContrastBtn('add');
						$('#pop-compare').attr('data-load', 'true');
					}
				});

			}

			return this;
		},
		setContrastBtn: function(type) {
			var resSkuid = readCookie( this.cookieName ) || '',
			skuLen = resSkuid.split('.').length;

			if ( type == 'add' ) {
				if ( skuLen > 1 ) {
					$('#goto-contrast').addClass('compare-active');
				}
			}
			if ( type == 'reduce' ) {
				if ( skuLen < 2 ){
					$('#goto-contrast').removeClass('compare-active');
				}
			}
		},
		sortList: function() {

			// 删除对比栏的内容后重新排序列表
			var wrapDiv = $('#diff-items'),
				len = wrapDiv.find('.hasItem').length;

			wrapDiv.find('.item-empty').remove();
			for ( var i = len; i < 4; i++ ) {
				$('#diff-items').append('<dl class="item-empty"><dt>' + (i+1) + '</dt><dd>您还可以继续添加</dd></dl>');
			}

			this.bindEvent( 'delHover' );

			return this;
		},
		delContrastItem: function(skuid, All) {
			if ( All ) {

				// 删除所有
				$('#diff-items').html('');
				for ( var i = 1; i < 5; i++ ) {
					$('#diff-items').append('<dl class="item-empty"><dt>' + i + '</dt><dd>您还可以继续添加</dd></dl>');
				}

				this.btnStyle( null, 'del' );
				$('#goto-contrast').removeClass('compare-active');
				$('.btn-compare').removeClass('btn-compare-s-active');
				$('#goto-contrast').unbind('click');
				createCookie( this.cookieName, '', -1, '/;domain=' + this.domain );
			} else {

				// 删除单个
				$('#cmp_item_' + skuid).remove();
				//$('#cmp_item_' + skuid).replaceWith('<dl class="item-empty"><dt>' + (parseInt($('#cmp_item_' + skuid).attr('fore'), 10) + 1)  + '</dt><dd>您还可以继续添加</dd></dl>');
				this.sortList().delCookie(skuid).btnStyle( skuid, 'del' );

				this.setContrastBtn('reduce');
			}
			return this;
		},
		delCookie: function(skuid) {

			if ( this.hasCookie(skuid) && skuid !== null ) {
				var skuids = readCookie(this.cookieName);

				var resSkuids = skuids.replace( new RegExp(skuid + '\.|\.' + skuid + '|' + skuid), '' );

				createCookie( this.cookieName, resSkuids, 0, '/;domain=' + this.domain );
			}

			return this;
		},
		setCookie: function(skuid) {
			var sku = readCookie(this.cookieName) || '';
				skuArr = sku.split('.');

			if ( !this.hasCookie(skuid) && skuArr.length < 4 ) {

				if ( !!sku ) {
					skuArr.push(skuid);
					createCookie( this.cookieName, skuArr.join('.'), 1, '/;domain=' + this.domain);

				} else {
					createCookie( this.cookieName, skuid, 1, '/;domain=' + this.domain );
				}
			}
			return this;
		},
		hasCookie: function(skuid) {
			if ( !!skuid ) {
				return new RegExp(skuid).test( readCookie(this.cookieName) );
			}
		},
		setRecentScroll: function() {
			var _this = this;

			// setTimeout(function() {
				$(".scroll-con").imgScroll({
					visible: 4,
					speed: 300,
					step: 1,
					loop: false,
					direction: 'x',
					evtType: 'click',
					next: '.sb-next',
					prev: '.sb-prev',
					disableClass: 'disabled'
				});

				_this.bindEvent('cmpBtn');

			// }, 500);
		},
		getRecent: function(skuid, callback) {
			var _this = this;

			var reco_202001 = new GlobalReco({
	            $el: $('#scroll-con-inner'),
	            skuHooks: 'SKUS_recent_view',
	            // template: _this.TPL.recentItem,
	            param: {
	                p: 202001,
	                sku: '',
	                ck: 'pin,ipLocation,atw,aview',
	                lim: 50
	            },
	            callback: function(status, data){
	            	var data = data.data;
	            	var len = data.length;
	            	var htmlStr = '';

	            	if(status){
	            		for(var i=0; i<len; i++){
	            			data[i].img = encodeURI(pageConfig.FN_GetImageDomain(data[i].sku) + 'n7/' + data[i].img);
	            			data[i].url = 'http://item.jd.com/' + data[i].sku + '.html';

	            			htmlStr += _this.TPL.recentItem.process(data[i]);
	            		}
	            	}
	            	$('#scroll-con-inner').html(htmlStr);

	            	_this.setRecentScroll();
	            }
	        });

			// $.ajax({
			// 	url: 'http://www.360buy.com/lishiset.aspx?id=' + skuid,
			// 	dataType: 'jsonp',
			// 	success: function(data) {
			// 		if ( $('#scroll-con-inner p').length > 0 ) {
			// 			$('#scroll-con-inner p').remove();
			// 		}

			// 		$('#scroll-con-inner').append( _this.TPL.recentItem.process(data, skuid) );

			// 		if ( _this.hasCookie(skuid) ) {
			// 			_this.btnStyle( skuid, 'set' );
			// 		}

			// 		if ( typeof callback == 'function' ) {
			// 			callback();
			// 		}
			// 	}
			// });
		},
		setRecent: function(callback) {
			this.getRecent();

			// var recent = readCookie('aview'),
			// 	recentArr = !!recent ? recent.split('|') : [],
			// 	resSkus = [],
			// 	_this = this;


			// if ( recentArr.length < 1 ) {
			// 	$('.scroll-loading').text('暂无浏览记录。');
			// 	return false;
			// }

			// for ( var i = 0; i < recentArr.length; i++ ) {
			// 	resSkus.push(recentArr[i].split('.')[1]);

			// 	if ( (i+1) == recentArr.length ) {
			// 		_this.getRecent(recentArr[i].split('.')[1], function() {
			// 			callback(resSkus);
			// 		});
			// 	} else {
			// 		_this.getRecent(recentArr[i].split('.')[1]);
			// 	}
			// }
		},
		setMessage: function( text ) {
			$('.pop-compare-tips').text(text).fadeIn();

			setTimeout(function() {
				$('.pop-compare-tips').fadeOut();
			}, 8000);
		}
	};

	//pageConfig.FN_InitContrast =jd.contrast;
	var init = function( cookieName, /* script,*/ pageType ){
		cookieName = cookieName || '_contrast';
		pageType = pageType || 'list';
			//script = script || 'http://misc.360buyimg.com/contrast/js/contrast.js?ver=' + ( + new Date),
		status = readCookie(cookieName + '_status');
		
		//if (this.isInitContrast) {
		//	return false;
		//}

		var contrast = null;
		if ((status == 'show' || status == 'side') && !!readCookie(cookieName) == true) {
			//$.getScript(script,function() {
			//	if (Contrast) {
			if ( !contrast ) {
				contrast = Contrast.init(pageType, cookieName);
			} else {
				contrast.showPopWin(null);
			}

			//	}
			//});
		}

		$('.btn-compare').live('click',function() {
			var skuid = $(this).attr('skuid');
			if ( $(this).closest('#pop-compare').length == 0 ) {
				if ( !contrast ) {
					contrast = Contrast.init(pageType, cookieName, skuid);
				} else {
					contrast.showPopWin(skuid);
				}
			}
			return false;
		});

		//this.isInitContrast = 1;
	};

	return init;
});