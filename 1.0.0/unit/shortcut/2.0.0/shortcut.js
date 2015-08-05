define(function(require,exports,module){
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	//var switchable = require('jdf/1.0.0/ui/switchable/1.0.0/switchable.js');
	var areamini = require('jdf/1.0.0/ui/areamini/1.0.0/areamini.js');
	var setUserInfo = require('jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js');
	var myjd = require('jdf/1.0.0/unit/myjd/2.0.0/myjd.js');
	
	var lStorage = require('jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js');
	var cookie = require('jdf/1.0.0/unit/cookie/1.0.0/cookie.js');
	
	function init(){
		var el = $('#shortcut-2014');
		var loadingText = '<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>';

		/**
		 * @用户欢迎信息
		 */
		setUserInfo({
			el:$("#ttbar-login")
		});

		/**
		 * @地区
		 */
		var ttbar_mycity_html = '\
			<div class="dt cw-icon ui-areamini-text-wrap" style="display:none;">\
				<i class="ci-right"><s>◇</s></i>\
				送至：<span class="ui-areamini-text"></span> \
			</div>\
			<div class="dd dorpdown-layer">\
				<div class="dd-spacer"></div>\
				<div class="ui-areamini-content-wrap"> \
					<div class="ui-areamini-content"></div> \
				</div> \
			</div>\
		';
		$('#ttbar-mycity').html(ttbar_mycity_html).areamini({
			hasCssLink:false,
			className:{
				hover:'hover',
				selected:'selected'
			},
			provinceList:[
				{name:'海外', tpl:'<div class="item"><a href="http://en.jd.com/chinese.html" target="_blank" data-onchange="1"><%=name%></a></div>'}
			],
			tplContentWrap: '<div class="ui-areamini-content-list"><%=list%></div>',
			tplContentItem: '<div class="item"><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></div>',
			syncServer:true,
			writeCookie:false,
			//3个字省份加个class
			threeWordDeal:function(el){
				var text = el.find('.ui-areamini-text').html();
				var spacer = el.find('.dd-spacer');
				if(text.length == 3){
					spacer.addClass('dd-spacer-extend');
				}else{
					spacer.removeClass('dd-spacer-extend');
				}		
			},
			onReady:function(local){ 
				this.el.find('.ui-areamini-text-wrap').show();
				var id = cookie('areaId');
				if(lStorage.check() && id){
					var name = 'areaId';
					if (!lStorage.get(name)) {
						lStorage.set(name, id);
					}else{
						if(lStorage.get(name) != id){
							lStorage.set(name,id);
							//切换城市后清除首页所有的storage
							lStorage.clearByReg('^jd_home_2015_');
						}
					}
				}
				this.options.threeWordDeal(this.el);
			},
			onChange: function(a,area,local){
				this.options.threeWordDeal(this.el);
				if(typeof(area) != 'undefined'){
					window.location.reload();
				}
			}
		});

		/**
		 * @我的京东
		 */
		myjd();

		/**
		 * @手机京东
		 */
		var ttbar_apps_html = '\
			<div class="dd dorpdown-layer">\
				<div class="dd-spacer"></div>\
				<div class="dd-inner" id="ttbar-apps-main">'+loadingText+'\
				</div>\
			</div>\
		';
		$('#ttbar-apps').append(ttbar_apps_html).attr('aid', '2_955_6342').dropdown({
			enterDelay:50,
			trigger:true,
			current:'hover',
			onchange:function(o){
				if (!o.attr('data-load')){
					o.attr('data-load',1);
					//el.find('.dd-inner').html(loadingText);
					$.ajax({
						url:"http://nfa.jd.com/loadFa.js?aid=2_955_6342",
						dataType:'script',
						success:function(data){

						}
					});
				}
			}
		});

		/**
		 * @关注京东
		 */
		var ttbar_atte_html = '\
			<div class="dd dorpdown-layer">\
				<div class="dd-spacer"></div>\
				<div class="dd-inner" id="ttbar-atte-main">'+loadingText+'\
				</div>\
			</div>\
		';
		$('#ttbar-atte').append(ttbar_atte_html).attr('aid', '2_955_6494').dropdown({
			enterDelay:50,
			trigger:true,
			current:'hover',
			onchange:function(o){
				if (!o.attr('data-load')){
					o.attr('data-load',1);
					$.ajax({
						url:"http://nfa.jd.com/loadFa.js?aid=2_955_6494",
						dataType:'script',
						success:function(data){

						}
					});
				}
			}
		});

		/**
		 * @客户服务
		 * @接口人 马顺风
		 * @old api : http://www.jd.com/hotwords.aspx?position=new-index-002
		 */
		el.find('#ttbar-serv .dd').html(loadingText);
		el.find('#ttbar-serv').dropdown({
			enterDelay:50,
			trigger:true,
			current:'hover',
			onchange:function(o){
				if (!o.attr('data-load')){
					o.attr('data-load',1);
					//el.find('#ttbar-serv .dd').html(loadingText);
					$.ajax({
						url:'http://dc.3.cn/client/get',
						dataType : "jsonp",
						scriptCharset:'gb2312',
						cache:true,
						jsonpCallback:'ui_getClientCallback',
						success:function(data){
							if (!data || typeof(data) != 'object' ) return;
							data = data.data;
							var html = '<div class="dd-spacer"></div>';
							$.each(data,function(i){
								var item = data[i];
								var type = !item.type ? '' : 'class="'+item.c+'"';
								html += '<div class="item"><a href="'+item.u+'" target="_blank" '+type+'>'+item.n+'</a></div>';
							});
							
							el.find('#ttbar-serv .dd').html(html);
						}
					});
				}
			}
		});
		
		/**
		 * @网站导航
		 * @接口人 马顺风
		 * @old api : http://www.jd.com/hotwords.aspx?position=new-index-003
		 */
		el.find('#ttbar-navs .dd').html(loadingText);
		el.find('#ttbar-navs').dropdown({
			enterDelay:50,
			trigger:true,
			current:'hover',
			leaveDelay:100,
			onchange:function(o){
				if (!o.attr('data-load')){
					o.attr('data-load',1);
					//el.find('#ttbar-navs .dd').html(loadingText);
					$.ajax({
						url:'http://dc.3.cn/navigation/get',
						dataType : "jsonp",
						scriptCharset:'gb2312',
						cache:true,
						jsonpCallback:'ui_getNavigationCallback',
						success:function(data){
							if (!data || typeof(data) != 'object' ) return;
							data = data.data;
							var html = '<div class="dd-spacer"></div>';
							$.each(data,function(i){
								var item = data[i];
								var list = item.s;
								var listHtml = '';
								$.each(list,function(i){
									var item_list = list[i];
									var type = !item_list.c ? '' : 'class="'+item_list.c+'"';
									listHtml += '<div class="item"><a href="'+item_list.u+'" target="_blank" '+type+'>'+item_list.n+'</a></div>';
								});
								
								var itemDt = item.n;
								var type = !item.c ? '' : 'class="'+item.c+'"';
								if (item.u) {
									itemDt = '<a href="'+item.u+'" target="_blank" '+type+'>'+item.n+'</a>';
								}
								html += '<dl class="fore'+(i+1)+'">\
									<dt>'+itemDt+'</dt>\
									<dd>\
										'+listHtml+'\
									</dd>\
								</dl>';
							});
							
							el.find('#ttbar-navs .dd').html(html);
						}
					});
				}
			}
		});
	}

	return init;
});