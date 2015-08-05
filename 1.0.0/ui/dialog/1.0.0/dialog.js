/**
*####弹出层组件####
* 
***Demo**
* [dialog](../ui/dialog/1.0.0/example/dialog.html "Demo")
*
***参数**
*
*  - `maskHas` {Boolean} true  是否有遮盖层
*  - `maskClass`{String} 'ui-mask'  遮盖层的className
*  - `maskIframe`{Boolean} false  遮盖层是否用iframe
*  - `maskClose` {Boolean} false  是否可以点击mask关闭dialog
*  - `opacity` {Number} 0.15  遮盖层透明度
*  - `zIndex` {Number} 9998  遮盖层zIndex,主体和主体上面的元素依次累加
*  - `type` {String} 'text'  主体类型包括text,html,image,json,iframe
*  - `source` {String} null  主体的内容
*  - `extendMainClass` {String} null  扩展主体的class,可以添加多个，如 "class1 class2 ..."
*  - `autoIframe`{Boolean} true  主体类型如果是iframe是否自适应
*  - `autoOpen` {Boolean} true  是否直接打开对话框
*  - `autoCloseTime` {Number} 0  倒计时N秒后关闭,默认不开启
*  - `title` {String} ''  标题方案,设置为null则不显示标题
*  - `hasButton` {Boolean} false  是否有确定,取消按钮
*  - `submitButton` {String} ''  '确认' 确认按钮文字
*  - `cancelButton` {String} ''  '取消' 取消按钮文字
*  - `onSubmit` {Function} null 确认按钮回调函数
*  - `onCancel` {Function} null  取消按钮回调函数，或者是弹层关闭时的回调函数
*  - `closeButton` {Boolean} true  是否有关闭按钮
*  - `onReady` {Function} null  创建完成后回调
*  - `width` {Number} null  主体宽度
*  - `height ` {Number} null  主体高度
*  - `fixed` {Boolean} false  主体是否加position:fixed固定
*  - `autoUpdate` {Boolean} false  主体自适应窗口调整top值
*  - `maskId` {String} null 遮盖层id
*  - `mainId` {String} null 主体系id
*  - `contentId` {String} null 主体内容部分id
*  - `titleId` {String} null 标题id
*  - `iframeName` {String} 'dialogIframe' iframe类型iframe name
*  - `iframeTimestamp` {Boolean} true iframe类型iframe url加时间戳
*
***备注**
* 
*  关闭当前页面1个dialog:  var a = $('body').dialog(); a.close();
*  关闭当前页面所有dialog: $.closeDialog() 
* 
***举例**
* 
*	$('#dialog').dialog({
*		title:'title',
*		type:'iframe',
*		source:'iframe.html'
*	});
*
* **update**
* 2015-06-02 14:12:00 by chenxiaochun
* 当弹层关闭时调用onCancel函数
*
* 2015-02-11 16:33:00 by chenxiaochun
* 添加是否可以点击mask关闭dialog
*
* 2013-10-17 9:10:17 by liuwei1
*/

;(function($, undefined) {
	$.ui.define('dialog', {
		options:{		
			hasCssLink:true,
			baseVersion:'1.0.0',
			cssLinkVersion:'1.0.0',
			maskHas : true,//是否有遮盖层
			maskClass:'ui-mask',//遮盖层的className
			maskIframe:false,//遮盖层是否用iframe
			maskClose: false,//是否可以点击mask关闭dialog
			opacity : 0.15,//遮盖层透明度
			zIndex:9998,//遮盖层zIndex,主体和主体上面的元素依次累加

			type:'text',//主体类型 text,html,image,json,iframe
			source:null,//主体的内容
            extendMainClass:null,//扩展主体的class
			autoIframe:true,//主体类型如果是iframe是否自适应
			autoOpen:true,//是否直接打开对话框
			autoCloseTime:0,//倒计时N秒后关闭,默认不开启
			
			title:true,//标题方案,设置为null则不显示标题
			hasButton:false,//是否有确定,取消按钮
			submitButton:'确认',//确认按钮文字
			cancelButton:'取消',//取消按钮文字
			onSubmit:null,//确认按钮回调函数
			onCancel:null,//取消按钮回调函数

			closeButton:true,//是否有关闭按钮

			onReady:null,//创建完成后回调
			width : 480,//主体宽度
			height :null,//主体高度
			fixed:false,//主体是否加position:fixed固定
			autoUpdate:false,//主体自适应窗口调整top值

			maskId:null,//遮盖层id
			mainId:null,//主体系id
			contentId:null,//主体内容部分id
			titleId:null,//标题id

			iframeName:'dialogIframe', //iframe类型iframe name
			iframeTimestamp:true //iframe类型iframe url加时间戳
		},
		init:function(){
			var opts = this.options;
			
			if ($.browser.isIE6()) {
				opts.fixed = false;
			}

			this.createMain();
			this.createMask();
			this.mainStyle();
			
			if (opts.autoOpen){
				this.open();
			}else {
				this.hide();
			}

			this.bind();
		},
		show:function(){
			 this.mask.show();
			this.el.show();
		},
		hide:function(){
			 this.mask.hide();
			this.el.hide();
		},
		tpl:{
			mask: '<div class="ui-mask"></div>',
			
			close: '<a class="ui-dialog-close" title="关闭"><span class="ui-icon ui-icon-delete"></span></a>',
			title: '<div class="ui-dialog-title">\
						<span><%=title%></span>\
					</div>\
				',
			wrap: '<div class="ui-dialog"></div>',
			conten: '<div class="ui-dialog-content"></div>',
			button:'<div class="ui-dialog-btn">\
						<%if($.trim(submit)){%><a class="ui-dialog-btn-submit"><%=submit%></a><%}%>\
						<%if($.trim(cancel)){%><a class="ui-dialog-btn-cancel"><%=cancel%></a><%}%>\
					</div>\
				'
		},
		//创建主体
		createMain:function(){
			var self = this;
			var opts = this.options;
			var title = '';
			
			//title
			if (opts.title){
				title = $.tpl(this.tpl.title,{title:opts.title});
			}

			var button = $.tpl(this.tpl.button,{submit:this.options.submitButton,cancel:this.options.cancelButton});

            var dialogHtml = title + this.tpl.conten + (!opts.hasButton ? '' :  button);
			
			//wrap
			this.el = $(this.tpl.wrap);
            //添加扩展样式
            if ( opts.extendMainClass ) {
                this.el.addClass(opts.extendMainClass);
            }

			$(dialogHtml).appendTo(this.el);
			this.el.appendTo('body');

			
			//主体
			this.content = this.el.find('.ui-dialog-content');
			this.title = this.el.find('.ui-dialog-title');
			
			//配置id
			if (opts.mainId) {
				this.el.attr('id',opts.mainId);
			}

			if (opts.contentId) {
				this.content.attr('id',opts.contentId)
			}

			if (opts.titleId) {
				this.title.attr('id',opts.titleId)
			}

			//顶部关闭按钮
			if (opts.closeButton){
				this.el.append(this.tpl.close);
			}
		},
		/**
         * 创建遮盖层
         * @method createMask
         */
		createMask:function(){
			var self = this;
			var opts = this.options;
			if (!opts.maskHas) return;
			
			var maskObj = this.mask = $(document.createElement("div"));
			this.mask.addClass(opts.maskClass).css({
				position:"absolute",
				left:0,
				top:0,
				opacity:opts.opacity,
				zIndex:opts.zIndex,
				backgroundColor:"#000",
				width:$.page.docWidth(),
				height:$.page.docHeight()
			});

			if (opts.maskId) {
				this.mask.attr('id',opts.maskId)
			}

			if (!$('.'+opts.maskClass)[0]) this.mask.appendTo('body');
			
			//for IE6 add iframe
			if ($.browser.isIE6() || opts.maskIframe){
				this.mask.append('<iframe src="about:blank" class="jdMaskIframe" frameBorder="0" style="width:100%;height:100%;position:absolute;z-index:'+(opts.zIndex+1)+';opacity:0;filter:alpha(opacity=0);top:0;left:0;">');
			}

			//自适应窗口
			$(window).resize(function(){
				self.mask.css({
					width:$.page.docWidth(),
					height:$.page.docHeight()
				}); 
			});
		},
		getPadding:function(ele){
			 return {
			 	width:parseInt(ele.css('paddingLeft'),10) + parseInt(ele.css('paddingRight'),10),
			 	height:parseInt(ele.css('paddingTop'),10) + parseInt(ele.css('paddingBottom'),10)
			 }
		},
		/**
         * 主体样式配置
         * @method mainStyle
         */
		mainStyle:function(){
			var opts = this.options;

			if (opts.title){
				//增加一个title的高度
				opts.height = opts.height ? opts.height+28 : opts.height;
				this.title.css({width:opts.width-this.getPadding(this.content).width});
			}
			
			this.content.css({
				height:!opts.height ? '' : opts.height,
				width:!opts.width ? '' : opts.width-this.getPadding(this.content).width,
				overflow: 'hidden'
			})

			//主体宽度不设置IE6会有bug
			if (opts.width) {
				this.el.css({width:opts.width})
			}

			var postionValue = opts.fixed && !$.browser.isIE6() ? 'fixed' : 'absolute';
			this.el.css({
				position: postionValue,
				zIndex:opts.zIndex+2,
				display:'block',
				overflow:'hidden'
			});

			this.updateMain();
		},
		/**
         * 更新主体top,left (用在:窗口有变动时,更新一个主体位置)
         * @method updateMain
         */
		updateMain:function(){
			var opts = this.options;
			var scrollbarWidth = $.page.docWidth() != $.page.clientWidth() ? 16 :0;
			var scrollTop = opts.fixed ? 0 : $(document).scrollTop();
			var scrollLeft = opts.fixed ? 0 : $(document).scrollLeft();

			var top = ( $.page.clientHeight() - this.el.outerHeight() ) / 2 + scrollTop;
			//css3 border宽度
			//var borderWidth = !parseInt(this.el.css('borderWidth')) ?  0 :  2 * parseInt(this.el.css('borderWidth'));
			var borderWidth = $.browser.msie && $.browser.version < 10 ? 0 : 8;
			
			var left = ( $.page.clientWidth() - scrollbarWidth - (!opts.width ? 0 : opts.width +borderWidth) ) / 2 + scrollLeft;
			
			if (top<0) { top = 0;}
			if (left<0) { left = 0;}

			this.el.css({
				top:top,
				left:left
			});
		},
		bind:function(){
			var self = this;
			var opts = this.options;
			if (this.options.closeButton){
				this.el.find('.ui-dialog-close').bind('click',function(){
					self.close();
				});
			}

			if (this.options.autoUpdate) {
				$(window).resize(function(){
					self.updateMain();
				});
			}

			if (opts.hasButton) {
				this.el.find('.ui-dialog-btn-submit').bind('click',function(){
					if (opts.onSubmit){
						opts.onSubmit.call(this);
					}
				})

				this.el.find('.ui-dialog-btn-cancel').bind('click',function(){
					 self.close();
				})
			}

			if(this.options.maskHas && this.options.maskClose){
				$(this.mask).bind('click', function(){
					self.close();
				});
			}
		},
		/**
         * 打开对话框
         * @method open
         */
		open:function(){
			this.openType();
			this.autoClose();
			this.show();
			this.iframeSet();
			if (this.options.onReady){
				this.options.onReady.call(this);
			}
		},
		/**
         * 打开不同类型的遮盖层
         * @method openType
         */
		openType:function(){
			var opts = this.options;
			var self = this;
			switch (opts.type){
				case "text":
					this.content.html(opts.source);
					break ;
				case "html":
					$(opts.source).clone().appendTo(this.content);
					break ;
				case "iframe":
					var css = {
						width:"100%",
						height:"100%"
					}

					if(opts.iframeTimestamp){
						opts.source += (opts.source.indexOf('?') > -1 ?  '&' : '?') + 't=' + new Date().getTime();
					}
					
					this.iframe = $('<iframe src="'+opts.source+'" id="'+opts.iframeName+'" name="'+opts.iframeName+'" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" style="border:0"></iframe>').css(css).appendTo(this.content);
					//this.iframe.attr('name','dialogIframe' + new Date().getTime())
					break ;
				case "image":
					var width = opts.width ? 'width="' + opts.width +'"' : '';
					var height = opts.height ? 'height="' + opts.height +'"' : '';
					var img = $('<img src='+opts.source+' '+width+height+'/>');
					img.appendTo(this.content);
					img.bind('load',function(){
						self.updateMain();
					});
					break ;
				case "json":
					//todo
					break ;
			}
		},
		 /**
         * 关闭当前对话框
         * @method close
         */
		close:function(){
			var opts = this.options;
			var autoCloseTime = this.options.autoCloseTime;
			this.el.remove();
			this.mask.remove();

			if (opts.onCancel){
				opts.onCancel.call(this);
			}
		},
		 /**
         * 倒计时autoCloseTime秒后关闭当前对话框
         * @method autoClose
         * @param {Number} autoCloseTime
         */
		autoClose:function(){
			var self = this;
			var autoCloseTime = this.options.autoCloseTime;
			 if (autoCloseTime){
				var x = autoCloseTime;
				$("<div class='ui-dialog-autoclose'><span id='ui-autoclose'>" + x + "</span>秒后自动关闭</div>").appendTo(this.el);
				clearInterval(window.autoCloseTimerDialog);
				window.autoCloseTimerDialog = setInterval(function() {
					x--;
					$("#ui-autoclose").html(x);
					if (x == 0) {
						x = autoCloseTime;
						self.close();
						clearInterval(window.autoCloseTimerDialog);
					}
				}, 1000);
				this.updateMain();
			 }
		},
		//iframe高度
		getIframeHeight:function (iframe) {
			var doc = iframe[0].contentWindow.document;
			if (doc.body.scrollHeight && doc.documentElement.scrollHeight) {
				return Math.min(
					doc.body.scrollHeight,
					doc.documentElement.scrollHeight
				);
			} else if (doc.documentElement.scrollHeight) {
				return doc.documentElement.scrollHeight;
			} else if (doc.body.scrollHeight) {
				return doc.body.scrollHeight;
			}
		},
		//同步iframe高度
		syncHeight:function(){
			var opts = this.options;
			var height;
			try {
				height = this.getIframeHeight(this.iframe);
			}catch (error) {
				//页面跳转出错时处理
				height = 100;
			}

			//主体样式重置
			this.iframe.css({height:height});
			this.updateMain();
		},
		//iframe配置
		iframeSet:function(){
			var self = this;
			var opts = this.options;
			if (opts.type != "iframe"){
				return;
			}
			if(opts.autoIframe){
				//iframe加载慢的时候会有空白
				//this.el.css({visibility:'hidden'});
				this.iframe.one('load',function(){
					//this.iframeInterval = setInterval(function(){
					//	self.syncHeight();
					//},300);
					self.syncHeight();
					//self.el.css({visibility:'visible'});
				})
			}
		}
	});

	/**
	* @关闭当前页面的所有对话框
	*/
	$.closeDialog = function(){
		$('.ui-dialog,.ui-mask').remove();
		clearInterval(window.autoCloseTimerDialog);
	}

})(jQuery);