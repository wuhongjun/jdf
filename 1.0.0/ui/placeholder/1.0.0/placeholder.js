/**
####placeholder组件####
*
可以提供两种形式的placeholder：
1、直接给元素添加placeholder属性。
2、以元素的value形式提供placeholder，在这种情况下，也是直接添加元素的placeholder即可，由程序自动帮你处理。
*
***Demo**
* [placeholder](../ui/placeholder/1.0.0/example/placeholder.html "Demo")
*
***参数**
*
*  - `color`    {String}  '#ccc  指定placeholder的显示颜色
*  - `isValue`  {Boolean} false	 指定是否以value的形式提供placeholder
*  - `leftDiff` {Number}  0		 根据自己的需要对placeholder进行左右微调
*  - `topDiff`  {Number}  0		 根据自己的需要对placeholder进行上下微调
*
***举例**
*
*	默认调用方式
*	$('input[placeholder], textarea').placeholder();
*
*	可以更改placeholder的颜色
*	$('input[placeholder], textarea').placeholder(
*		color: 'blue'
*	);
*
*	以value的形式提供placeholder
*	$('input[placeholder], textarea').placeholder({
*		isValue: true
*	});
*
*
* **update**
*
* 2015-1-27 16:29:00 by chenxiaochun
* 修复页面初始化时placeholder的bug
*
* 2014-12-26 16:08:00 by chenxiaochun
* asValue时在密码框上也会显示提醒信息
*
* 2014-11-19 11:10:00 by chenxiaochun
* 统一ie9以上浏览器对placeholder的实现方式
*
* 2014-7-21 10:23:00 by chenxiaochun
*/

;(function($, undefined){
	$.ui.define('placeholder', {
		options: {
			color: '#ccc',		//指定placeholder的显示颜色
			isValue: false,		//指定是否以value的形式提供placeholder
			leftDiff: 0,		//左右偏移数量
			topDiff: 0			//上下偏移数量
		},

		init: function(){
			if(this.options.isValue){
				this.asValue();
			}else{
				this.asPlaceholder();
			}

			var me = this;
			$(document).click(function(event){
				var target = event.target;
				if(me.isTxt(target)){
					$(target).next('input[placeholder], textarea').focus();
				}
			});
		},

		//以value的形式提供placeholder
		asValue: function(){
			var me = this;

			me.appendTxt();
			me.isShow();

			$(this.el).focus(function(){
				$(this).prev('txt').hide();
				if($(this).val() == $(this).attr('data-placeholder')){
					$(this).val('');
				}

			}).blur(function(){
				me.isShow();
			});

			$(this.el).click(function(event){
				$(this).focus();
			});
		},

		//提供html5中原生placeholder的形式
		asPlaceholder: function(){
			var me = this;

			me.appendTxt();
			me.isShow();

			//处理当点击txt元素时，它下面的文本框能够获得焦点
			$(me.el).bind('keyup keydown change click', function(){
				if($(this).val() == ''){
					me.showTxt();
				}else{
					me.hideTxt();
				}
			});
		},

		appendTxt: function(){
			var me = this;
			var self = me.el;
			var placeText = document.createElement('txt');
			var color = me.options.color;

			//如果在文本框之前已经存在一个txt节点，则不再创建
			if(self.prev().is('txt')){
				placeText = self.prev();
			}else{
				self.before(placeText);
			}
			$(placeText).text(self.attr('placeholder'));

			//经过测试，直接把它设置为空的话，在ie6中此属性会被删除。因此才给它设置了一个空格。
			self.attr('placeholder', ' ');
			if(self.is('input')){
				$(placeText).css({
					'position': 'absolute',
					'z-index': '2',
					'line-height': self.outerHeight() + 'px',
					'margin-left': parseInt(self.css('padding-left')) + parseInt(self.css('border-left-width')) + parseInt(me.options.leftDiff),
					'margin-top': me.options.topDiff,
					'font-size': self.css('font-size'),
					'font-family': self.css('font-family'),
					'color': color
				});
			}

			if(self.is('textarea')){
				$(placeText).css({
					'position': 'absolute',
					'z-index': '2',
					'line-height': 1,
					'margin-left': parseInt(self.css('padding-left')) + parseInt(self.css('border-left-width')) + parseInt(me.options.leftDiff),
					'margin-top': parseInt(self.css('padding-top')) + parseInt(self.css('border-top-width')) + parseInt(me.options.topDiff),
					'font-size': self.css('font-size'),
					'font-family': self.css('font-family'),
					'color': color
				});
			}

			if(self.val() != ''){
				me.hideTxt(this);
			}
		},

		isShow: function(){
			//当文本框失去焦点时，如果value值为空，则将placeholder显示出来
			if(this.el.val() == ''){
				this.showTxt();
			}else{
				this.hideTxt();
			}
		},

		isTxt: function(target){
			return $(target).is('txt');
		},

		showTxt: function(){
			this.el.prev('txt').css('display', 'inline');
		},

		hideTxt: function(){
			this.el.prev('txt').hide();
		}
	});
	
})(jQuery);

