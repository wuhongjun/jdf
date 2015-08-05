/**
 * @无痕埋点 (纯JS版)
 * @2015-1-6 by liuwei1
 */
(function(){
	/**
	 * @evnet util
	 */
	var eventUtil = {
		addHandler:function(element,type,handler){
			 if (element.addEventListener){
				element.addEventListener(type,handler,false);
			 }else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			 }else{
				element["on"+type] = handler;
			 }
		},
		removeHandler:function(element,type,handler){
			if (element.addEventListener){
				element.removeEventListener(type,handler,false);
			 }else if(element.attachEvent){
				element.detachEvent("on" + type,handler);
			 }else{
				element["on"+type] = null;
			 }
		},
		getEvent:function(event){
			 return event ? event : window.event;
		},
		getTarget:function(event){
			 return event.target || event.srcElement;
		},
		preventDefault:function(event){
			 if (event.preventDefault){
				event.preventDefault();
			 }else{
				event.returnValue = false;
			 }
		},
		stopPropagation:function(event){
			 if (event.stopPropagaiton){
				event.stopPropagaiton;
			 }else{
				event.cancelBubble = true;
			 }
		}
	}

	/**
	 * @当前节点在兄弟节点的索引值
	 */
	function siblingIndex(el){
		var i = 0;
	  	var n = el.parentNode.firstChild;
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1) {
				if(n === el){
					break;
				}
				i += 1;
			}
		}
		return i;	 
	}

	/**
	 * @垂直距中于顶部
	 */
	function setElMiddle(el, width, height){
		var ow = width;
		var oh = height;

		var $$ = {};
		$$.page = function (){}
		$$.page.doc = function(){
			return document.compatMode == "BackCompat" ? document.body : document.documentElement;
		}
		$$.page.clientWidth = function(){
			return $$.page.doc().clientWidth;
		}
		$$.page.clientHeight = function(){
			return $$.page.doc().clientHeight;
		}
		$$.page.docWidth = function(){
			return Math.max($$.page.doc().clientWidth,$$.page.doc().scrollWidth);		 
		}
		$$.page.docHeight = function(){
			return Math.max($$.page.doc().clientHeight,$$.page.doc().scrollHeight);		 
		}

		var scrollbarWidth = $$.page.docHeight() != $$.page.clientHeight() ? 16 :0;
		//var top = ( $$.page.clientHeight() - oh ) / 2;
		//var top = $$.page.docHeight() - oh;
		var top = 0;
		var left = ( $$.page.clientWidth() - scrollbarWidth - (ow) ) / 2;
		
		el.style.position = 'fixed';
		el.style.left = left+'px';
		el.style.top = top+'px';
	}

	function getDomTree(el){
		if (el.nodeName.toLowerCase() == 'html' || el.nodeName.toLowerCase() == 'body') {
			return null;
		}

		var getDomTreeParent = function(el){
			var parentNode = el.parentNode;
			var res = '';
			if (parentNode){
				try {
					//check??
					if (parentNode.getAttribute('id')) {
						res += parentNode.nodeName.toLowerCase() + '[id="' + parentNode.getAttribute('id') + '"]' + '/';
					}else {
						res += parentNode.nodeName.toLowerCase() + '['+ siblingIndex(parentNode) +']/';
						res += getDomTreeParent(parentNode);
					}
				}catch(e){
					
				}
			}
			return res;
		}
		
		var res;
		if(el.getAttribute('id')){
			res =  el.nodeName.toLowerCase() + '[id="' + el.getAttribute('id') + '"]' + '/';
		}else{ 
			res =  el.nodeName.toLowerCase() + '['+ siblingIndex(el) +']/' + getDomTreeParent(el);
		}
		return res.split('/').reverse().join('/');
	}

	eventUtil.addHandler(document, 'click', function(event){
		var event = eventUtil.getEvent(event);
		var target = eventUtil.getTarget(event);
		var domTree =  getDomTree(target);
		//console.log(domTree);

		if (/isdebug=(-\d)*-30/.test(location.search)) {
			if (!document.getElementById('tracelessLogDebug')) {
				var t = document.createElement('textarea');
				var tWidth = 900;
				var tHeight = 20;
				t.id = 'tracelessLogDebug'
				t.style.border = '1px #C81623 solid';
				//t.style.border = 'none';
				t.style.padding = '5px 10px';
				t.style.width = tWidth +'px';
				t.style.height = tHeight +'px';
				//t.style.lineHeight = tHeight +'px';
				t.style.background ='#C81623';
				t.style.color ='#fff';
				t.style.zIndex = 100;
				t.style.textAlign = 'center';

				setElMiddle(t, tWidth, tHeight+3);
				
				document.getElementsByTagName('body')[0].appendChild(t);
			}
			if (target.getAttribute('id') != 'tracelessLogDebug') {
				document.getElementById('tracelessLogDebug').innerHTML = domTree;
			}
			eventUtil.preventDefault(event);
		}
	});
})();