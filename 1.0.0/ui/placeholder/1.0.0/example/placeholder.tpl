<input type="text" id="username" placeholder="用户名" autocomplete="off"/>
<input type="password" id="password" placeholder="密码"/>
<textarea placeholder="说点儿什么吧！" cols="30" rows="5"></textarea>


<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/placeholder/1.0.0/placeholder'], function(){
		$('input[placeholder], textarea').placeholder();
	});
</script>
