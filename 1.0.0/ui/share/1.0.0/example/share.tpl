<div id="share" class="ui-share">
	<a class="sinaweibo"></a> 
	<a class="qqweibo"></a> 
	<a class="qzone"></a> 
	<a class="renren"></a> 
	<a class="weibo163"></a> 
	<a class="kaixin001"></a> 
	<a class="douban"></a> 
	<a class="sohuweibo"></a> 
	<a class="qq"></a>
	<a class="yixin"></a> 
	<a class="weixin"></a> 
</div>

<script>					
    //组件初始化
	$('#share').share({
		content:"#content# 这是content 测试内容 ", 
		url:"http://www.jd.com/", 
		pic:"http://misc.360buyimg.com/lib/img/e/logo-201305.png", 
		title:"#title# 这是title 测试内容",
		sinaweiboAppkey:"2445336821" //新浪微博appkey
	});
</script>