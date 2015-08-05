define(function(require,exports,module){
	/**
	* @插入css文件或者样式片断
	* @example 
		seajs.use('jdf/1.0.0/unit/insertStyles/1.0.0/insertStyles.js',function(insertStyles){
			insertStyles('a.css');
			insertStyles('#test{width:100px;}');
		})
	*/
	var insertStyles = function(cssString) {
		var doc = document,
			heads = doc.getElementsByTagName("head"),
			style = doc.createElement("style"),
			link = doc.createElement("link");

		if ( /\.css$/.test(cssString) ) {
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = cssString;

			if (heads.length) {
				heads[0].appendChild(link);
			} else {
				doc.documentElement.appendChild(link);
			}
		} else {
			style.setAttribute("type", "text/css");

			if (style.styleSheet) {
				style.styleSheet.cssText = cssString;
			} else {
				var cssText = doc.createTextNode(cssString);
				style.appendChild(cssText);
			}

			if (heads.length) {
				heads[0].appendChild(style);
			}
		}
	};

	return insertStyles;
});