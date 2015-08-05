define(function(require,exports,module){
	/**
	* @返回顶部,问卷调查
	* @依赖pageConfig
	* @example
		seajs.use('jdf/1.0.0/unit/sidebar.js',function(sidebar){
			var sidePanle = new sidebar();
			sidePanle.setTop();
			sidePanle.scroll();
		})
	*/
	var sidebar=function(){
		if(!$("#toppanel").length){
			$(document.body).prepend("<div class=\"w ld\" id=\"toppanel\"></div>");
		}
		$("#toppanel").append("<div id=\"sidepanel\" class=\"hide\"></div>");
		var object=$("#sidepanel");
		this.scroll=function(){
			var _this=this;
			$(window).bind("scroll",function(){
				var top=document.body.scrollTop||document.documentElement.scrollTop;
				if(top==0){
					object.hide()
				}else{
					object.show()
				}
			});
			_this.initCss();
			$(window).bind("resize",function(){
				_this.initCss();
			});
		};
		this.initCss=function(){
			var css,width=pageConfig.compatible?1210:990;
			if(screen.width>=1210){
				if($.browser.msie&&$.browser.version<=6){
					css={"right":"-26px"}
				}else{
					css={
						"right":(document.documentElement.clientWidth-width)/2-26+"px"
					}
				}
				object.css(css)
			}
		};
		this.addCss=function(a){
			object.css(a)
		};
		this.addItem=function(a){
			object.append(a)
		};
		this.setTop=function(){
			this.addItem("<a href='#' class='gotop' title='使用快捷键T也可返回顶部哦！'><b></b>返回顶部</a>");
		}
	};
	return sidebar;
});
