// getCode

//var testPrefix = ['-moz-','-o-',''];
//2014-2-14 13:42:35 删除了对opear的支持 注:opear19的ua已和chrome32一样了
var testPrefix = ['-moz-',''];

if (/debug/.test(location.search)) {
	testPrefix = [''];
}

var animateDefaults = animateData.defaults;

function getAnim(str,hasReturn){
	if (typeof(hasReturn) != 'undefined') {
		var hasReturn='\n';
	}else {
		var hasReturn='';
	}

	if (str) {
		var strTemp = str.slice();
		str += hasReturn;
		 for (var i = 0  ; i < testPrefix.length ; i++ ){
			str += strTemp.replace(/-webkit-/gim,testPrefix[i])+hasReturn ;
		 }
		 return str;
	 }
}

animateDefaults = getAnim(animateDefaults);

function setAnimCode(anim){
	 if (anim) {
		var anim = $.trim(anim);
		var keyframes = animateData[anim].keyframes;
		keyframes = getAnim(keyframes,'hasReturn');
		var a = animateDefaults.replace(/:/gm,':'+ anim +' ');
		a = '.animation{'+a +'}'  +'\n\n'+  keyframes;
		$('.codeContainer').show().val(a);
	}
}

/**
输出
#animation{-webkit-animation:flash 1s .2s ease both;-moz-animation:flash 1s .2s ease both;-o-animation:flash 1s .2s ease both;animation:flash 1s .2s ease both;}
@-webkit-keyframes flash{0%,50%,100%{opacity: 1;} 25%,75%{opacity: 0;}}
@-moz-keyframes flash{0%,50%,100%{opacity: 1;} 25%,75%{opacity: 0;}}
@-o-keyframes flash{0%,50%,100%{opacity: 1;} 25%,75%{opacity: 0;}}
@keyframes flash{0%,50%,100%{opacity: 1;} 25%,75%{opacity: 0;}}
*/

$('#getCode').click(function(){
	var anim = $(this).attr('data-anim');
	if (anim) {
		setAnimCode(anim);
	}else {
		alert('请先选中效果!~');
	}
})

$('.codeContainer').dblclick(function(){
	$(this).select();
})

function testAnim(x) {
	$('#animateTest').removeClass().addClass(x + ' animated');
	window.setTimeout(function() {
		$('#animateTest').removeClass()
	},1300);
}

$('.butt').click(function(){
	var anim = $(this).attr('data-test');
	$('#getCode').attr('data-anim',anim);
	testAnim(anim);
	$('.butt').removeClass('butt_on');
	$(this).addClass('butt_on');
	$('.codeContainer').hide();
});

