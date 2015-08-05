/**
*####美化表单元素####
*
* 可以美化checkbox,radio,select,皮肤样式可以自定义,select暂不支持IE6
*
***Demo**
* [formbeautify](../ui/formbeautify/1.0.0/example/formbeautify.html "Demo")
*
***参数**
*
*  - `itemTpl` {String} null 模板
*  - `checkbox` {String} 'ui-form-checkbox' checkbox的className
*  - `checkboxReplacer` {String} 'ui-form-checkbox-replacer' checkbox的替代者className
*  - `checkboxOn` {String} 'ui-form-checkbox-on'  checkbox选中时加的className
*  - `checkboxToggle` {String} 'ui-form-checkbox-toggle'  checkbox按下时加的className
*  - `radio` {String} 'ui-form-radio'  radio的className
*  - `radioReplacer` {String} 'ui-form-radio-replacer' radio的替代者className
*  - `radioOn` {String} 'ui-form-radio-on'  radio选中时加的className
*  - `radioToggle` {String} 'ui-form-radio-toggle'  radio按下时加的className
*  - `select` {String} 'ui-form-select'  select的className
*  - `selectReplacer` {String} 'ui-form-select-replacer' select的替代者className
*
***举例**
*
* html部分
*
*	<input type="checkbox" class="ui-form-checkbox" />
*
* js部分
*	$('#formbeautify').formbeautify();
*
* **update**
* 2013-12-5 16:14:20 by liuwei1
*
*/

;(function(){
	 $.ui.define('formbeautify',{
		options:{
			 hasCssLink:true,
			 baseVersion:'1.0.0',
			 cssLinkVersion:'1.0.0',
			 itemTpl:null,//模板

			 checkbox:'ui-form-checkbox',
			 checkboxReplacer:'ui-form-checkbox-replacer',
			 checkboxOn:'ui-form-checkbox-on',
			 checkboxToggle:'ui-form-checkbox-toggle',

			 radio:'ui-form-radio',
			 radioReplacer:'ui-form-radio-replacer',
			 radioOn:'ui-form-radio-on',
			 radioToggle:'ui-form-radio-toggle',

			 select:'ui-form-select',
			 selectReplacer:'ui-form-select-replacer',
             selectAutoResize: true
		},
		init:function(){
			this.checkbox();
			this.radio();
			this.select();
		},
		checkbox:function(){
			var opts = this.options;
			var checkbox = this.el.find('.'+opts.checkbox);
			if(!checkbox){return;}
			$.each(checkbox,function(i){
				var item = $(checkbox[i]);
				if (item){
					item.hide();
					var tpl = opts.itemTpl ? $.tpl(opts.itemTpl,{key:''}) : '';
					var replacer = $('<span class="'+opts.checkboxReplacer+'">'+tpl+'</span>');
					replacer.insertBefore(item);
					var toogleClass = opts.checkboxOn;

					if(item.is(':checked')){
						replacer.addClass(toogleClass);
					}

					replacer.bind('mousedown',function(){
						$(this).addClass(opts.checkboxToggle)
					});

					replacer.bind('mouseup',function(){
						if(replacer.hasClass(toogleClass)){
							replacer.removeClass(toogleClass);
							replacer.next().attr('checked',false);
						}else{
							replacer.addClass(toogleClass);
							replacer.next().attr('checked',true);
						}
						$(this).removeClass(opts.checkboxToggle)
					})
				}
			})
		},
		radio:function(){
			var opts = this.options;
			var radio = this.el.find('.'+opts.radio);
			if(!radio){return;}
			var me = this;
			$.each(radio,function(i){
				var item = $(radio[i]);
				if (item){
					item.hide();
					var tpl = opts.itemTpl ? $.tpl(opts.itemTpl,{key:''}) : '';
					var replacer = $('<span class="'+opts.radioReplacer+'">'+tpl+'</span>');
					replacer.insertBefore(item);
					var toogleClass = opts.radioOn;

					if(item.is(':checked')){
						replacer.addClass(toogleClass);
					}

					replacer.bind('mousedown',function(){
						$(this).addClass(opts.radioToggle)
					});

					replacer.bind('mouseup',function(event){
						var radioNow = replacer.next();
						var radioName = radioNow.attr('name');
						var replacerAll = me.el.find('input[name="'+radioName+'"]').prev('.'+opts.radioReplacer);
						if(!replacer.hasClass(toogleClass)){
							$.each(replacerAll,function(i){
								$(replacerAll[i]).removeClass(toogleClass);
							})
							replacer.addClass(toogleClass);
							radioNow.attr('checked',true);
						}
						$(this).removeClass(opts.radioToggle)
					})
				}
			})
		},

		select:function(){
			var opts = this.options;
			var select = this.el.find('.'+opts.select);
			if(!select){return;}
			//取得选中的值
			var getText= function(select){
				 var text = select.find('option:selected').text();
				 if (opts.itemTpl) {
					return $.tpl(opts.itemTpl,{key:text});
				 }
				 return text;
			}

			$.each(select,function(i){
				var item = $(select[i]);
                var itemWidth = item.outerWidth();
                var itemHeight = item.outerHeight();

				if (item){
					item.parent().css({position:'relative'})
					var replacer = $('<span class="'+opts.selectReplacer+'">'+getText(item)+'</span>');
					var reg = new RegExp(opts.selectReplacer);

					if ( !reg.test(item.prev().attr('class')) ){
						replacer.insertBefore(item);
					}

					//处理ie6
					if($.browser.version == '6.0'){
						item.css('visibility', 'hidden');

						//selectOptions为模拟的下拉框，在其中添加一个iframe用来遮盖它周围的select框
						var selectOptions = $('<ul><iframe frameborder=no></iframe></ul>');
						item.find('option').each(function(){
							var value = $(this).attr('value') ? $(this).attr('value') : $(this).html();
							selectOptions.append('<li value=' + value + '>' + $(this).html() + '</li>');
						});

						selectOptions.addClass('ui-form-select-options');

						selectOptions.css({
							'top': itemHeight,
							'width': itemWidth - 2
						});

						//设置下拉列表的鼠标滑入滑出效果
						selectOptions.find('li').hover(function(){
							$(this).addClass('hover');

						}, function(){
							$(this).removeClass('hover');

						}).click(function(){
							$(this).parent().prev('select').val($(this).html());
							$(this).parent().prev('select').trigger('change');
							$(this).parent().hide();
						});

						selectOptions.find('iframe').css({
							'position': 'absolute',
							'left': 0,
							'top': 0,
							'z-index': -1
						});

						//延迟200毫秒，将iframe宽度和高度设置成和父级一样的
						setTimeout(function(){
							selectOptions.find('iframe').css({
								'width': selectOptions.width(),
								'height': selectOptions.height()
							});
						}, 200);

						item.after(selectOptions);

						replacer.click(function(){
							selectOptions.toggle();
							var currentSelect = $(this).parent().find('.ui-form-select-options');

							/**
							解决ie6中当元素为相对定位，与其平级的兄弟元素中的子元素绝对定位，无法遮盖它的问题。
							我是用一个定时器轮询，将不显示的菜单的父元素z-index都设置为2
							当前正在显示的父元素z-index设置为10
							**/	
							setInterval(function(){
								if(currentSelect.css('display') != 'none'){
									replacer.parent().css('z-index', 10);
								}else{
									replacer.parent().css('z-index', 2);
								}
							}, 0);
							
						});

						//处理当用户在文档的任意位置点击时，都能将当前显示的下拉菜单隐藏。
						$(document).click(function(event){
							var target = event.target;

							if(selectOptions.css('display') != 'none' && !($(target).is(replacer))){
								selectOptions.hide();
							}
						});
					}

                    if ( opts.selectAutoResize ) {
                        replacer.css({
                            height: itemHeight,
                            width: itemWidth
                        })
                    }

					item.bind('change',function(){
						var self = $(this);
						self.prev('.'+opts.selectReplacer).html(getText(self));
					})
				}
			})
		}
	 });
})();
