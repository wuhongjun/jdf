/**
*####智能提示组件####
* 
***Demo**
* [suggestion](../ui/suggestion/1.0.0/example/suggestion.html "Demo")
*
***参数**
*
*  - `url` {String} "http://dd.search.360buy.com/?key=" 来源url
*  - `dataType` {String} jsonp 请求类型
*  - `mainId` {String} 主体ID
*  - `mainClass` {String} 主体样式名称
*  - `selectedClass` {selectedClass} 方向键操作时选中样式
*  - `onClick` {Function} 点击后回调函数
*  - `smartkey` {Boolean} 开启智能按键
*  - `itemTpl` {String}  列表模版
*
***举例**
* 
*	默认调用方式：
*	$('#suggestion').suggestion({
*		url:"http://dd.search.360buy.com/?key=",
*		dataType:"jsonp",
*		mainId :'suggestion'
*	});
*
* **update**
*
* 2014-11-17 15:26:00 by chenxiaochun
* 禁用浏览器默认的文本框自动完成功能
*
* 2013-11-11 15:54:53 by liuwei1
*
*/

;(function($, undefined) {
    var keyMap = {
        27: 'esc', 13: 'enter',17:'ctrl', 16:'shift',18:'alt',20: 'capslock',144: 'numlock',
        35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down'
    };
	$.ui.define('suggestion', {
		 options: {
            url:"http://dd.search.360buy.com/?key=",
			dataType:"jsonp",
			mainId :'suggestionMain',
			mainClass :'ui-suggestion',
            selectedClass :'current',
			onClick:null,
            smartkey:false,
			itemTpl:'<li class="ui-suggest-item"><a href="javascript:void(0)" class="ui-suggest-key"><%=keyword%></a></li>'
        },
        currentIndex : -1,
        currentKey : '',
        dataSize: 0,
		init:function(){
            var self = this;
			var opts = self.options;
			$('body').append($('<ul id="'+opts.mainId+'" style="display:none" class="'+opts.mainClass+'"></ul>'));
            self.main = $('#'+opts.mainId);

            self.set();
            self.bind();

            //启动智能快捷键
            if ( opts.smartkey ) {
                self.el.smartkey({
                    name:'searchInput'+(+new Date),
                    excludeInput:false,
                    keys:['esc','up','down','enter'],
                    callback:function(key){
                        switch ( key ) {
                            case 'up' :
                                self.prev();
                                break;
                            case 'down' :
                                self.next();
                                break;
                            case 'esc' :
                                self.hide();
                                break;
                            case 'enter' :
                                self.action();
                                break;
                        }
                    }
                });
            }
		},
		bind:function(){
			var self = this;
            self.el.attr('autocomplete', 'off');
            self.el.keyup(function(event){
                var e = event ? event : window.event;
				var key = $.trim($(this).val());
				if( !keyMap[e.keyCode || e.which] && key != ''){
					self.get(key);
				} else
                if ( !key ) {
                    self.hide();
                }
			});

            self.el.click(function(e){
				var key = $.trim($(this).val());
				if( key != '' ){
                    if ( self.main.css('display') == 'none' ) {
                        self.get(key);
                    } else {
                        self.show();
                    }
				}
			});

			$(window).resize(function(){
				self.set();
			});

			//点空白隐藏
			$(document).click(function(event){
                if ( self.el.get(0) != event.target ) {
                    self.hide();
                }
			});
		},
		/**
		 * 数据处理
		 * @method rander
		 * @param {Object} data 数据
		 */
		rander:function(data){
			var self = this;
			var sugLength = self.dataSize = data.length ;
			if (sugLength>0){
				for (var i =0 ; i<sugLength ;i++ ){
					var html = '';
					for (var j=0 ; j<sugLength ;j ++ ){
						var keyword = $.trim(data[j].keyword);
						if (keyword != 'undefined' && typeof(keyword) != 'undefined' ){
							html += $.tpl(self.options.itemTpl,data[j]);
						}
					}
					
					html += '<li class="ui-suggest-close"><a href="javascript:void(0)">关闭</a></li>'
					self.main.html(html).show();
				
					self.main.find('.ui-suggest-item').click(function(){
						var key = $('.ui-suggest-key',this).text();
						self.el.val(key);
						self.action();
					});

					self.main.find('.ui-suggest-close').click(function(){
						self.hide();
					})
				}
			}else{
				self.hide();
			}
		},
		hide:function(){
            this.main.hide();
		},
        show:function(){
            this.main.show();
        },
		set:function(){
            var self = this;
			var left = self.el.offset().left;
			var top = self.el.offset().top;
			var height = self.el.outerHeight();
			top = top + height;
            self.main.css({position:'absolute',top:top,left:left})
		},
		/**
		 * 获取数据
		 * @method get
		 * @param {Object} key 关键词
		 */
		get:function(key){
			var self = this;
			var opts = self.options;
            self.currentKey = key;
			$.ajax({
				url:opts.url+key,
				dataType:opts.dataType,
				success:function(data){
                    self.currentIndex = -1;
					self.rander(data);
				}
			});
		},
        next: function(){
            var self = this;
            if ( self.dataSize ) {
                if ( self.main.css('display') == 'none' ) {
                    self.main.show();
                } else {
                    self.currentIndex ++;
                    if ( self.currentIndex >= self.dataSize ) {
                        self.currentIndex = 0;
                    }
                    self.goTo();
                }
            }
        },
        prev: function(){
            var self = this;
            if ( self.dataSize ) {
                if ( self.main.css('display') == 'none' ) {
                    self.main.show();
                } else {
                    self.currentIndex--;
                    if (self.currentIndex < 0) {
                        self.currentIndex = self.dataSize - 1;
                    }
                    self.goTo();
                }
            }
        },
        goTo: function(index){
            var self = this;
            var opts = self.options;
            index = index || self.currentIndex;
            var currt = $('.ui-suggest-item:eq('+index+')', self.main);
            if ( currt && currt.length ) {
                self.currentKey = $('.ui-suggest-key', currt).text();
                self.el.val(self.currentKey);
                currt.addClass(opts.selectedClass).siblings().removeClass(opts.selectedClass);

                if ( self.main.css('display') == 'none' ) {
                    self.main.show();
                }
            }
        },
        action: function(){
            var self = this;
            var opts = self.options;
            if (opts.onClick){
                opts.onClick.call(null, self.currentKey);
            }
            self.hide();
        }
	});
})(jQuery);