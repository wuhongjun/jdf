define(function(require,exports,module){
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	/**
	* @导航
	*/
	function init(){
		if(document.getElementById("navitems")){
			$('#navitems li').dropdown({
				enterDelay:0,
				trigger:true,
				current:'hover'
			});
		}else{
			$('#navitems-2013 li').dropdown({
				enterDelay:0,
				trigger:true,
				current:'hover'
			});
		}
	}
	return init;
});