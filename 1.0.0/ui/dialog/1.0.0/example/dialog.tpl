<button id="dialog1">text dialog</button>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/dialog/1.0.0/dialog'],function(){
		$('#dialog1').bind('click',function(){
			 $('body').dialog({
				title:'text',
				width:500,
				height:150,
				type:'text',
				source:'这是dialog'
			});
		});
	});
</script>