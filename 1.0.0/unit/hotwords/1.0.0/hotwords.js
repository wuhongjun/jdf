/**
* @搜索下热搜
* @接口人 马顺风
* @接口格式
{
	"data": [
		{
			"u": "http://sale.jd.com/act/ifcLXMqThGzHEyd.html?from=jr_jdpopularsearch &jdr=hot", //url链接
			"c": "", // 0 默认; 1样式飘红; 2搜索默认输入框
			"n": "618揭秘" //链接文字
		}
	]
}
*/

define(function(require,exports,module){	
	function init(id){
		if (typeof(id) == 'undefined') {
			var id = 0;
		}
		$.ajax({
			url:'http://dc.3.cn/cathot/get',
			dataType : "jsonp",
			scriptCharset:'gb2312',
			success:function(data){
				if (!data || typeof(data) != 'object' ) return;
				var data = data.data;
				var html = '';
				var defaultSearchArray = [];
				
				$.each(data,function(i){
					var item = data[i];
					if (item.n){
						if(item.c == 2){
							defaultSearchArray.push(item.n);
						}else{
							if (i<9) {
								var c = item.c == 1 ? 'class="style-red"' : '';
								html += '<a href="'+item.u+'" target="_blank" '+c+'>'+item.n+'</a>';
							}
						}
					}
				});
				
				if (defaultSearchArray.length) {
					var i = Math.floor(defaultSearchArray.length*Math.random());
					var text = defaultSearchArray[i];
					$('#search-2014 #key').val(text).bind("focus",function() {
						if (this.value == text) {
							this.value = "";
							this.style.color = "#333"
						}
					}).bind("blur",function() {
						if (!this.value) {
							this.value = text;
							this.style.color = "#999"
						}
					});
				}
				
				$('#hotwords-2014').html(html);
			}
		});
	}
	return init;
});