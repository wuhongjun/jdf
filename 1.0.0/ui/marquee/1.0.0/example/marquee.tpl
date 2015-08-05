<div id="marquee">
	<ul class="ui-marquee-main">
		<li class="ui-marquee-item">...</li>
		<li class="ui-marquee-item">...</li>
		<li class="ui-marquee-item">...</li>
	</ul>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/marquee/1.0.0/marquee.js'],function(){
		$('#marquee').marquee({
			mainClass : 'ui-marquee-main',//主体样式
			itemClass : 'ui-marquee-item',//列表样式
			step:1,//步长
			delay:40,//间距
			timeout:0//延时timeout后第一次触发
		});
	});
</script>