<div id="tab">
	<ul>
		<li class="ui-switchable-item">...</li>
		<li class="ui-switchable-item">...</li>
		<li class="ui-switchable-item">...</li>
	</ul>
	<div class="ui-switchable-body">
		<div class="ui-switchable-panel-main">
			<div class="ui-switchable-panel" >...</div>
			<div class="ui-switchable-panel" style="display:none;">...</div>
			<div class="ui-switchable-panel" style="display:none;">...</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable'],function(){
		$('#tab').switchable({
			navItem:'ui-switchable-item',//nav中item的className
			navSelectedClass:'ui-switchable-selected',
			bodyClass:'ui-switchable-panel-body',//主体panel的父级元素className
			contentClass:'ui-switchable-panel-main',//主体
			mainClass:'ui-switchable-panel',//主体panel的className
			mainSelectedClass:'ui-switchable-panel-selected',//主体panel选中时className
			callback:function(index){

			}
		});
	});
</script>