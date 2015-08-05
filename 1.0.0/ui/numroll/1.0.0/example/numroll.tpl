
<h1 id="myTargetElement">24.02</h1>
<input value="start" id="start" type="button"/>
<input value="stop" id="stop" type="button"/>
<input value="resume" id="resume" type="button"/>
<input value="reset" id="reset" type="button"/>

<script type="text/javascript">
	seajs.use('jdf/1.0.0/ui/numroll/1.0.0/numroll.js',function(){
		var demo = $('#myTargetElement').numroll({
			startVal: 24.02,//起始值
			endVal: 94.62,//结束值
			decimals: 2,//几位小数
			duration: 2.5,//动画持续时间
			complete: function(){
			}
		});

		$('#start').click($.proxy(demo.start, demo));
		$('#stop').click($.proxy(demo.stop, demo));
		$('#resume').click($.proxy(demo.resume, demo));
		$('#reset').click($.proxy(demo.reset, demo));
	})
</script>