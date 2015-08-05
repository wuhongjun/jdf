<div id="scrollbar" class="ui-scrollbar">
	<div class="ui-scrollbar-main">
		....
	</div>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/scrollbar/1.0.0/scrollbar' , 'jdf/1.0.0/ui/drag/1.0.0/drag'],function(){
		var scrollbar = $('#scrollbar').scrollbar({
			scrollClass : 'ui-scrollbar-item',//滚动条class
			mainClass:'ui-scrollbar-main',//主体clsass
			wrapClass : 'ui-scrollbar-wrap',//最外层class
			hasHeadTailM: true//是否有最上和最下
		});
	});
</script>