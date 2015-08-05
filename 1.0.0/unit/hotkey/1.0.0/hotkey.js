define(function(require,exports,module){
	/**
	* @ 全局快捷捷
	*/
	function init(){
		document.onkeyup=function(e){
			var tagName=document.activeElement.tagName.toLowerCase();
			if(tagName=="input"||tagName=="textarea")return;
			var e=e?e:window.event,
			code=e.keyCode||e.which;
			switch(code){
				case 68://down 按?字母
					if(!window.pageConfig.clientViewTop){
						window.pageConfig.clientViewTop=0;
					}
					window.pageConfig.clientViewTop+=document.documentElement.clientHeight;
					window.scrollTo(0,pageConfig.clientViewTop);
					break;
				case 83://search 按s字母
					window.scrollTo(0,0);
					window.pageConfig.clientViewTop=0;
					document.getElementById("key").focus();
					break;
				case 84://top 按t字母
					window.scrollTo(0,0);
					window.pageConfig.clientViewTop=0;
					break;
				default:
					break;
			}
		}
	}
	return init;
});