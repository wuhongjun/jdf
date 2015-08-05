/**
* @global header footer init 
* @v2.0.0 2014-12-10 新首页改版
*/

define(function(require,exports,module){
	var switchable = require('jdf/1.0.0/ui/switchable/1.0.0/switchable.js');
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	var dialog = require('jdf/1.0.0/ui/dialog/1.0.0/dialog.js');
	var lazyload = require('jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js');
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');
	var getjsonp = require('jdf/1.0.0/unit/getjsonp/1.0.0/getjsonp.js');
	var login = require('jdf/1.0.0/unit/login/1.0.0/login.js');
	var event = require('jdf/1.0.0/unit/event/1.0.0/event.js');
	var hotkey  = require('jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js');
	var globalReco = require('jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js');
	var cookie = require('jdf/1.0.0/unit/cookie/1.0.0/cookie.js');
	var search = require('jdf/1.0.0/unit/search/1.0.0/search.js');
	var setUserInfo = require('jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js');
	var areamini = require('jdf/1.0.0/ui/areamini/1.0.0/areamini.js');
	var lStorage = require('jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js');

	var myjd = require('jdf/1.0.0/unit/myjd/2.0.0/myjd.js');
	var shortcut = require('jdf/1.0.0/unit/shortcut/2.0.0/shortcut.js');
	var shoppingcart = require('jdf/1.0.0/unit/shoppingcart/2.0.0/shoppingcart.js');
	var category = require('jdf/1.0.0/unit/category/2.0.0/category.js');
	var log = require('jdf/1.0.0/unit/log/1.0.0/log.js');
	
	function init(){
		hotkey();
		shortcut();
		shoppingcart();
		category();
	}
	return init;
});