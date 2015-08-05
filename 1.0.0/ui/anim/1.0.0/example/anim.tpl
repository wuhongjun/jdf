<div id="animate">
	<div>
		<a class="ui-switchable-item">1</a>
		<a class="ui-switchable-item">2</a>
		<a class="ui-switchable-item">3</a>
	</div>
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
	seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable','jdf/1.0.0/ui/easing/1.0.0/easing','jdf/1.0.0/ui/transform/1.0.0/transform','jdf/1.0.0/ui/anim/1.0.0/anim'],function(){
		var anim = $('#animate').anim();

		$('#animate').switchable({
			type:'focus',
			navItem:'ui-switchable-item',//nav中item的className
			navSelectedClass:'ui-switchable-selected',//nav选中时className
			contentClass:'ui-switchable-panel-main',//主体
			mainClass:'ui-switchable-panel',//主体panel的className
			mainSelectedClass:'ui-switchable-panel-selected',//主体panel选中时className
			bodyClass:'ui-switchable-panel-body',//主体panel的父级元素className
			prevClass:'ui-switchable-prev',//上一页
			nextClass:'ui-switchable-next',//下一页
			callback:function(index){
				var item = this.main.eq(index);
				var el = item;
				anim.trigger(el);
			}
		});
	});
</script>
