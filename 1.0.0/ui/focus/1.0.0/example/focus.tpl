<div id="focus">
	<div>
		<a class="ui-switchable-item">1</a>
		<a class="ui-switchable-item">2</a>
		<a class="ui-switchable-item">3</a>
	</div>
	<ul class="ui-switchable-panel-main"><!--内容主体-->
		<li class="ui-switchable-panel" >...</li>
		<li class="ui-switchable-panel" style="display:none;">...</li>
		<li class="ui-switchable-panel" style="display:none;">...</li>
	</ul>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable'],function(){
		$('#focus').switchable({
			type:'focus',
			navItem:'ui-switchable-item',
			navSelectedClass:'ui-switchable-selected',
			contentClass:'ui-switchable-panel-main',
			mainClass:'ui-switchable-panel'
		});
	});
</script>