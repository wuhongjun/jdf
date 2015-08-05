<a class="tips" data-tips="我是1">1</a>
<a class="tips" data-tips="我是2">2</a>

<script type="text/javascript">	
	seajs.use(['jdf/1.0.0/ui/tips/1.0.0/tips'],function(){
		$('.tips').tips({
			callback: function(el, tip){

			}
		});
	});
</script>