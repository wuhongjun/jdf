<div id="dropdown">
	<ul>
		<li>...</li>
		<li>...</li>
		<li class="ui-dropdown-item">
			<span>标题</span>
			<div class="ui-dropdown-bd"><!--跳出的一级菜单主体-->
				<ul>
					<li>...</li>
					<li>...</li>
					<li class="ui-dropdown-sub"><!--跳出的二级菜单主体-->
						<span>二级标题</span>
						<div class="ui-dropdown-bd">
							...
						</div>
					</li>
				</ul>
			</div>
		</li>
	</ul>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/dropdown/1.0.0/dropdown'],function(){
		$('#dropdown').dropdown({
			hasCssLink:true,
			item:'ui-dropdown-item',//菜单className
			current:"ui-dropdown-hover",//菜单选中加的样式
			bodyClass:'ui-dropdown-bd',//菜单主体class
			subBodyClass:'ui-dropdown-sub'//二级菜单主体class
		});
	});
</script>