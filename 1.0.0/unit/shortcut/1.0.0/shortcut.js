define(function(require,exports,module){
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	/**
	* @顶导
	*/
	function init(){
		if(document.getElementById("shortcut")){
			$('#shortcut .menu').dropdown({
				enterDelay:50,
				trigger:true,
				current:'hover'
			});
		}else{
			//客户服务
			$('#biz-service').dropdown({
				enterDelay:50,
				trigger:true,
				current:'hover',
				onchange:function(){
					$.ajax({
						url:"http://www.jd.com/hotwords.aspx?position=new-index-002",
						dataType:"script",
						scriptCharset:"gb2312",
						cache:true
					});
				}
			});

			//网站导航
			$('#site-nav').dropdown({
				enterDelay:50,
				trigger:true,
				current:'hover',
				onchange:function(){
					$.ajax({
						url:"http://www.jd.com/hotwords.aspx?position=new-index-003",
						dataType:"script",
						scriptCharset:"gb2312",
						cache:true
					});
				}
			});
		}
	}

	return init;
});