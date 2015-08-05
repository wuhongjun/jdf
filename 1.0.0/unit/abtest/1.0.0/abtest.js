/**
 * Created by wuyaoheng on 2014/9/30.
 */
/**
 * 第一种，Object
 * 当我们只需要两个条件来显示逻辑时，可以采用它
 *
 * @Param:
 *
 * -percent:
 * 显示概率百分比
 *
 * -id:
 * Dom节点ID，用于当JDA数值在设定的百分比时，程序会将它的style.display设为block
 * --为空时，不执行此逻辑
 *
 * -fn:
 * 当百分比条件达成时（也就是JDA数据在其范围时），会在Dom节点显示后执行
 * @return this 指向为当前对象{percent: 20, id: 'aaaaa1',...}
 * --为空时，不执行此逻辑
 *
 * -inverse:
 * 当百分比条件未达成时，会执行此函数，通常用于第二个百分比逻辑
 * @return this 指向为当前对象{percent: 20, id: 'aaaaa1',...}
 * --注意，此属性只在第一种数据类型（Object）采用
 *
 * @test debug param
 * --flag:
 * jd数值，用于逻辑测试使用，实际上线时，请勿使用
 */

/**
 * 第二，Array
 * 当我们需要两个以上条件来显示逻辑时，可以采用它
 *
 * @Param: [obj,obj,obj,...]
 *
 * @Param -obj
 *
 * -percent:
 * 显示概率百分比
 *
 * -id:
 * Dom节点ID，用于当JDA数值在设定的百分比时，程序会将它的style.display设为block
 * --可以为空
 *
 * -fn:
 * 当百分比条件达成时（也就是JDA数据在其范围时），会在Dom节点显示后执行
 * @return this 指向为当前对象{percent: 20, id: 'aaaaa1',...}
 * --如果id不为空时，fn可以为空
 *
 * @test debug param
 * --flag:
 * jd数值，用于逻辑测试使用，实际上线时，请勿使用
 *
 */

/**
 * 声明：为了避免逻辑预判失误，分配的各项百分比总和不能大于100，否则代码不会执行且还会出现讨厌的alert对话框！--开启isdebug=1才会检测
 * */
define(function(require,exports,module){
    var cookie = require('jdf/1.0.0/unit/cookie/1.0.0/cookie.js');
    var cacheData = {param : convertObject( location.href )};

    function isType(obj, type) {
        if (type) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']';
        }
        return false;
    }

    function trim( value ) {
        return ( value || '' ).replace( /(^\s*)|(\s*$)/g, '' );
    }

    function isBlank ( value ) {
        /**function(v, v2, v3, ...) or compare*/
        var args = arguments;
        if ( args.length > 1 ) {
            for ( var i = 0, len = args.length; i < len; i++) {
                if ( isBlank( args[ i ] ) ) return true;
            }
            return false;
        }
        return String(value) === 'undefined' || String( value ) === 'null' || (typeof (value) === 'string' ? trim( value ) === '' : false );
    }

    function convertObject ( href ) {
        var v,
            ps = href,
            idx = ps ? ps.indexOf( '?' ) : -1,
            pvs = {};
        if ( idx > -1 ) {
            ps = ps.substring( idx + 1 );
            ps = ps.split( '&' );

            for ( var i = 0, length = ps.length; i < length; i++ ) {
                v = ps[i].split( '=' );
                if ( i == 0 ) {
                    /**a.html???k=v*/
                    v[0] = v[0] && v[0].replace(/\?/g, '');
                }
                if ( !isBlank( v[0], v[1] ) ) {
                    pvs[v[0]] = v[1];
                }
            }
        }
        return pvs;
    }

    function getHashProbability(strNum, baseNum){
        function hashCode(str) {
            for (var result = 0, i = 0; i < str.length; i++) {
                result = (result << 5) - result + str.charCodeAt(i);
                result &= result;
            }
            return result;
        }

        return Math.abs(hashCode(strNum)) % baseNum;
    }

    function getJda(baseNum) {
        if (!cacheData.jda) {
            cacheData.jda = getHashProbability(cookie('__jda') || 0, baseNum);
        }
        return cacheData.jda;
    }

    function match(num, num1) {
        return num >= num1 ? 1 : 0;
    }

    function show( id ){
        var node = document.getElementById(id);
        if ( node ) {
            node.style.display = 'block';
        }
    }

    /**check 100%**/
    function checkSet(s, ratio){
        var r = 0;
        for (var i = 0; i < s.length; i++) {
            r += s[i].percent || 0;
        }
        if ( r > ratio ) {
            alert('很抱歉，概率百分比总数超出了'+ratio+'，为了避免逻辑预判失误，请重新分配各显示项的百分比！');
            return true;
        }
        return false;
    }

    var abtest = function (s) {
        var baseNum = 10000;
        var ratio = 100;
        var rp = baseNum / ratio;
        var param = cacheData.param;
        var isDebug = parseInt(param.isdebug) || 0;
        var _testFlag = parseInt(param.abtest) || 0;
        /**1-100*/
        _testFlag = _testFlag > 0 ? Math.min(_testFlag, 100) * rp : 0 ;

        var flag = (isDebug && _testFlag > 0) ? _testFlag : getJda(baseNum);
        var on = 0;
        var callback = function(){
            if ( this.id ) {
                show( this.id );
            }
            if ( isType(this.fn, 'Function') ) {
                this.fn.call(this);
            }
        };

        if ( isType(s, 'Object') ) {
            if ( !isDebug || (isDebug && !checkSet([s], ratio)) ) {
                on = match(s.percent * rp, flag);
                if ( on ) {
                    callback.call(s);
                } else {
                    s.inverse.call(s);
                }
            }
        } else if ( isType(s, 'Array') ) {
            if ( !isDebug || (isDebug && !checkSet(s, ratio)) ) {
                var _r = 0;
                for (var i = 0; i < s.length; i++) {
                    var _s = s[i];
                    if (!_s.percent) {
                        _s.percent = ratio - _r;
                    }
                    if (match((_s.percent + _r) * rp, flag)) {
                        callback.call(_s);
                        break;
                    }
                    _r += _s.percent;
                }
            }
        }
    };
    return abtest;
});