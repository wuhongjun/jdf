/**
* @global header footer init 
* @v1.0.0 2014-3-20
*/
seajs.use(
	[
		'jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js','jdf/1.0.0/ui/dialog/1.0.0/dialog.js','jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js','jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js','jdf/1.0.0/unit/getjsonp/1.0.0/getjsonp.js','jdf/1.0.0/unit/login/1.0.0/login.js','jdf/1.0.0/unit/event/1.0.0/event.js','jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js','jdf/1.0.0/unit/globalPatch/1.0.0/globalPatch.js','jdf/1.0.0/unit/search/1.0.0/search.js',
		'jdf/1.0.0/unit/category/1.0.0/category.js','jdf/1.0.0/unit/myjd/1.0.0/myjd.js','jdf/1.0.0/unit/shoppingcart/1.0.0/shoppingcart.js','jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js','jdf/1.0.0/unit/nav/1.0.0/nav.js','jdf/1.0.0/unit/shortcut/1.0.0/shortcut.js','jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js'
	],
	function(dropdown,dialog,lazyload,trimPath,getjsonp,login,event,setUserInfo,globalPatch,search,category,myjd,shoppingcart,hotkey,nav,shortcut,globalReco){
		setUserInfo();
		globalPatch.init();
		category();
		myjd();
		shoppingcart();
		hotkey();
		nav();
		shortcut();
});
