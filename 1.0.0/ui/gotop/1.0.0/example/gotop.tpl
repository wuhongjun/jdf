<div id="gotop">
	<a class="go-top-but">返回顶部</a>
	<a>...</a>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/fixable/1.0.0/fixable','jdf/1.0.0/ui/gotop/1.0.0/gotop'],function(){
		var gotop = $('#gotop');
		gotop.fixable({//固定位置
			x:'right',
			y:'bottom',
			xValue:0,
			yValue:0
		});

		gotop.gotop({
			gotopClass:'go-top-but'//如果不指定class，则以div#gotop作为按钮
		});
	});
</script>