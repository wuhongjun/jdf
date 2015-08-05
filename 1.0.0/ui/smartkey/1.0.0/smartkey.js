/**
 *####smartkey####
 *
 *快捷键
 *
 ***Demo**
 * [smartkey](../ui/smartkey/1.0.0/example/smartkey.html "Demo")
 *
 ***参数**
 *  - 	`name` {String} '' 快捷键名称(必填，名字唯一)
 *  - 	`keys` {Array[String]} [] 快捷键数组(必填)
 *  - 	`excludeInput` {Boolean} true 是否排除输出框
 *  - 	`callback` {Function} null 回调
 *
 ***举例**
 *
 *	seajs.use(['jdf/1.0.0/ui/smartkey/1.0.0/smartkey'], function () {
 *		$('#smartkey').smartkey({
 *			name:'testkey',
 *			keys:['1','2','3'],
 *			callback:function(key){
 *
 *			}
 *		});
 *	});
 *
 * **update**
 * 2015-03-26 13:30:00 by wuyaoheng
 * 2014-12-10 16:40:00 by wuyaoheng
 *
 */
;(function($, undefined) {
    var hotKeys = {};
    var currentKeys = [];
    var currentKey = null;
    var currentEle = null;
    var bindDocument = false;
    var isClicking = false;
    var keyMap = {
        27: 'esc', 9: 'tab', 32:'space', 13: 'enter', 8:'backspace', 145: 'scrollclock',
        20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'delete',
        35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down',
        112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8',18:'alt',
        120:'f9', 121:'f10', 122:'f11', 123:'f12', 17:'ctrl', 16:'shift',
        109:'-',107:'=',219:'[',221:']',220:'\\',222:'\'',187:'=',188:',',189:'-',190:'.',191:'/',
        96: '0', 97:'1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7',
        104: '8', 105: '9', 106: '*', 110: '.', 111 : '/',
        48: '0', 49:'1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7',
        56: '8', 57: '9',
        65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',
        77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z'
    };
    var keyMap2 = {
        27: 'esc',9: 'tab', 13: 'enter',17:'ctrl', 16:'shift', 18:'alt',20: 'capslock',144: 'numlock',
        35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down'
    };

    var HotKey = function(el, opt){
        this.el = el;
        this.name = opt.name;
        this.keys = opt.keys;
        this.excludeInput = opt.excludeInput;
        this.callback = opt.callback;
        hotKeys[opt.name] = this;
        if ( el != null ) {
            el.bind('click', function(e){
                isClicking = true;
                currentEle = el;
                //不能阻止冒泡与此事件的其它绑定
                setTimeout(function(){isClicking = false},50);
            });
            if ( !bindDocument ) {
                bindDocument = true;
                $(document).bind('click', function(){
                    if ( !isClicking ) {
                        currentEle = null;
                    }
                });
            }
        }
    };

    function action(isInput){
        var ck = currentKeys.join('+');
        $.each(hotKeys, function(k,h){
            if ( (isInput && !h.excludeInput) || ( !isInput && h.excludeInput ) ) {
                $.each(h.keys, function(j, k){
                    if ( ck == k ) {
                        if ( currentEle == h.el ) {
                            h.callback.call(h.el, currentKey);
                        } else
                        if ( currentEle == null ) {
                            h.callback(currentKey);
                        }
                        return false;
                    }
                });
            }
        });
    }

    function isOtherKey(){
        for ( var i = 0; i < currentKeys.length; i++ ) {
            //简单粗爆处理,长度大于1的当成特殊符号，主要用于解决 ctrl+n 或 alt+tab 这类浏览器自身的快捷键
            if ( currentKeys[i].length > 1 ) return true;
        }
        return false;
    }

    $(document).bind('keydown', function(event){
        var tagName = document.activeElement.tagName.toLowerCase();
        var e = event ? event : window.event;
        var key = null;
        if( tagName == "input" || tagName=="textarea" ) {
            key = keyMap2[e.keyCode || e.which];
            if ( key && key != currentKey ) {
                currentKey = key;
                //不支持组合键
                currentKeys = [key];
                action(true);
                //支持重复按键
                currentKey = null;
            }
        } else {
            key = keyMap[e.keyCode || e.which];
            if ( key && key != currentKey ) {
                currentKey = key;
                currentKeys.push(key);
                action(false);
            }
        }
    });

    $(document).bind('keyup', function(event){
        var tagName = document.activeElement.tagName.toLowerCase();
        var e = event ? event : window.event;
        key = keyMap[e.keyCode || e.which];
        if( tagName == "input" || tagName=="textarea" ) {
            //全清空
            currentKeys = [];
            currentKey = null;
        } else {
            var key = keyMap[e.keyCode || e.which];
            for( var i = currentKeys.length -1 ; i >= 0; i-- ) {
                if ( key == currentKeys[i] ) {
                    currentKeys.splice(i, 1);
                }
            }
            //如果最后一位是特殊KEY，全清空
            if ( isOtherKey() ) {
                currentKeys = [];
            }
            currentKey = null;
        }
    });

    $.ui.define('smartkey', {
        options: {
            name: null,
            keys: null,
            excludeInput: true,//排除输出框
            callback: null
        },
        hotKey: null,
        init:function(){
            var self = this;
            var el = self.el;
            var opt = self.options;

            if ( el[0] == document.body || el[0] == document || el[0] == window ) {
                el = null;
            }
            self.hotKey = new HotKey(el, opt);
        }
    });

})(jQuery);