<div id="qrcode"></div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/qrcode/1.0.0/qrcode'], function(){
		$('#qrcode').html('').qrcode({
			text: '把我转为二唯码吧'
		});
	});
</script>