<input type="text" name="keyword" id="searchInput" autocomplete="off"/>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/suggestion/1.0.0/suggestion'],function(){
		$('#searchInput').suggestion({
			url:"http://dd.search.360buy.com/?key=",
			dataType:"jsonp",
			mainId :'suggestion',
			itemTpl:'<li class="ui-suggest-item"><a href="javascript:void(0)" class="ui-suggest-key"><%=keyword%></a>&nbsp;&nbsp;<span>约<%=amount%>个商品</span></li>',
			onClick:function(key){
				 //alert(key);
			}
		});
	});
</script>
