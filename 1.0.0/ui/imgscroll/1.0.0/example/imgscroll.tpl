
<div id="imgscroll">
	<div><!--大图显示主体-->
		<img src="..." class="ui-switchable-imgscroll-img"/>
	</div>
	<div class="ui-switchable-panel-body"><!--内容主体-->
		<ul class="ui-switchable-panel-main">
			<li class="ui-switchable-panel"><img src="小图url" data-url="大图rul"/></li>
			<li class="ui-switchable-panel"><img src="小图url" data-url="大图rul"/></li>
			<li class="ui-switchable-panel"><img src="小图url" data-url="大图rul"/></li>
		</ul>
	</div>
	<div>
		<a class="ui-switchable-prev">上一页</a>
		<a class="ui-switchable-next">下一页</a>
	</div>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable'],function(){
		$('#imgscroll').switchable({
			imgscrollClass:'ui-switchable-imgscroll-img',//焦点放大图片className
			bodyClass:'ui-switchable-panel-body',//主体panel的父级元素className
			contentClass:'ui-switchable-panel-main',//主体
			mainClass:'ui-switchable-panel',//主体panel的className
			mainSelectedClass:'ui-switchable-panel-selected',//主体panel选中时className
			prevClass:'ui-switchable-prev',//上一页
			nextClass:'ui-switchable-next',//下一页
			type:'imgscroll',
			step:1,
			autoLock:true,
			hasPage:true,
			visible:3,
			event:'mouseover',
			width:52
		});
	});
</script>