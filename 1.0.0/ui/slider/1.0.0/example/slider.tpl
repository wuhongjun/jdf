<div id="slider">
	<div>
		<ul>
			<li class="ui-switchable-item">1</li>
			<li class="ui-switchable-item">2</li>
			<li class="ui-switchable-item">3</li>
		</ul>
	</div>
	<div class="ui-switchable-body">
		<div class="ui-switchable-panel-main">
			<div class="ui-switchable-panel" ><img src="..."></img></div>
			<div class="ui-switchable-panel" ><img src="..."></img></div>
			<div class="ui-switchable-panel" ><img src="..."></img></div>
		</div>
	</div>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable'],function(){
		$('#slider').switchable({
			type:'slider',
			navItem:'ui-switchable-item',//nav中item的className
			bodyClass:'ui-switchable-panel-body',//主体panel的父级元素className
			contentClass:'ui-switchable-panel-main',//主体
			mainClass:'ui-switchable-panel',//主体panel的className
			mainSelectedClass:'ui-switchable-panel-selected'//主体panel选中时className
		});
	});
</script>