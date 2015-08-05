<div id="fixable1">
	坐标为：left,top
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/fixable/1.0.0/fixable'],function(){
		$('#fixable1').fixable({
			x:'left',
			y:'top',
			xValue:50,
			yValue:40
		});
	});
</script>