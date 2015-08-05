<div id="pager" class="ui-pager"></div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/pager/1.0.0/pager'],function(){
		var pager = $('#pager').pager({
			total:220,
			pageSize:10,
			currentPageClass:'ui-pager-current',
			pageHref:'#comments', //页码上的href
			prevClass:'ui-pager-prev',//上一页className
			nextClass:'ui-pager-next',//下一页className
			callback:function(currentPage){
			},
			onLastPage:function(currentPage){
			},
			onFirstPage:function(currentPage){
			}
		});
	});
</script>