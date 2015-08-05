<div id="r1"></div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/ranger/1.0.0/ranger'], function(){
		$('#r1').ranger({
			min: 0,//指定ranger的最小值
			max: 100,//指定ranger的最大值
			value: 0,//当前ranger的值
			step: 1,//每次ranger可挪动的步长
			onchange: function(value){

			}
		});
	});
</script>