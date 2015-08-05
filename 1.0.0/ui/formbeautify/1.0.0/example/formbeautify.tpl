
<div id="formbeautify">
	<input type="checkbox" checked="checked" class="ui-form-checkbox" />Checked
	<input type="radio" class="ui-form-radio"/>Unchecked
	<select class="ui-form-select">
		<option>1</option>
		<option>2</option>
		<option>3</option>
	</select>
</div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/formbeautify/1.0.0/formbeautify'],function(){
		$('#formbeautify').formbeautify({
			checkbox:'ui-form-checkbox',
			radio:'ui-form-radio',
			select:'ui-form-select'
		});
	});
</script>
