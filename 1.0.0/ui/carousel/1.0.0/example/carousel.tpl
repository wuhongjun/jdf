<div id="carousel">
	<div>
		<ul class="ui-switchable-panel-main"><!--内容主体-->
			<li class="ui-switchable-panel" >...</li>
			<li class="ui-switchable-panel" style="display:none;">...</li>
			<li class="ui-switchable-panel" style="display:none;">...</li>
		</ul>
	</div>
	<div>
		<a class="ui-switchable-prev">上一页</a>
		<a class="ui-switchable-next">下一页</a>
	</div>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable'],function(){
		$('#carousel').switchable({
			type:'carousel',
			contentClass:'ui-switchable-panel-main',//主体
			mainClass:'ui-switchable-panel',//主体panel的className
			mainSelectedClass:'ui-switchable-panel-selected',//主体panel选中时className
			prevClass:'ui-switchable-prev',//上一页
			nextClass:'ui-switchable-next'//下一页
		});
	});
</script>
