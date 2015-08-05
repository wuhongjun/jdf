/**
 *####懒惰加载####
 *
 ***Demo**
 * [lazyload](../ui/lazyload/1.0.0/example/lazyload.html "Demo")
 *
 ***参数**
 *
 *  - `type` {String} 'js'    加载js时为js,图片为img,执行函数为fn
 *  - `source` {String}  'data-lazy-path'    加载js文件为data-lazy-path，图片类型默认为data-lazy-img
 *  - `init` {String} 'data-lazy-init'    加载js文件时的初始化方法
 *  - `delay` {Number} 100    滚动条滚动加载时加延时
 *  - `space` {Number} 100    预加载距屏幕下多长的距离的元素
 *  - `onchange` {Function} null    触发后执行的回调函数
 *  - `placeholderClass` {String} "loading-style2", //加载中样式
 *  - `errorClass` {String} "err-poster", //加载失败样式
 *  - `blankImgUrl` {String} "http://misc.360buyimg.com/lib/img/e/blank.gif"//默认占位图片
 *
 * **依赖**
 * seajs.js
 *
 ***举例**
 **js*
 *
 *	$('#content').lazyload();
 *
 *	$('body').lazyload({
*		type:'fn',
*		source:$('#product-track'),
*		onchange:function(){
			//todo
*		}
*	});
 *
 **html*
 *
 *	<img  data-lazy-img="http://img12.360buyimg.com/n4/g7/M03/08/0D/rBEHZlBzwZwIAAAAAAI4sOvIiLkAABpMQDf8E4AAjjI749.jpg" />
 *	<div	data-lazy-init="{data:222}" data-lazy-path="test.js">
 *
 * **update**
 * 2013-10-23 9:18:05 by liuwei1
 *
 */

;(function($, undefined) {
    function lazyloadImg(_this, data, opts){
        if (!_this.attr('src') && data){
            _this.attr('src', opts.blankImgUrl);
            _this.addClass(opts.placeholderClass);
        }

        _this.attr('src',data);
        _this.attr(opts.source,'done');

        //data-lazy-img为空时src为空图片
        if (!data && !_this.attr('src')) {
            _this.attr('src',opts.blankImgUrl);
        }

        //图片加载失败src为空图片,class为err-poster
        // $this.bind('error',function(e){}); 有性能问题
        if( data ) {
            _this[0].onerror = function(){
                _this.attr('src',opts.blankImgUrl).removeClass(opts.placeholderClass).addClass(opts.errorClass);
            };

            //图片加载完成,去掉图片增加默认样式
            _this[0].onload = function(){
                _this.removeClass(opts.placeholderClass);
            };
        }

        if( $.isFunction(opts.onchange) ){
            opts.onchange.call(this);
        }
    }

    function lazyloadJs(_this, path, data, callback){
        if (typeof define === "function" && define.cmd) {
            seajs.use(path,function(e){
                e.init(data);
                //eval(data);
                _this.attr(opts.init,'done');
                callback();
            });
        }else {
            $.ajax({
                url:path ,
                dataType: 'script',
                cache: true
            });
            callback();
        }
    }

    function lazyloadFn(_this, opts, callback){
        if (_this.attr('data-lazyload-fn') == '0' ) {
            _this.attr('data-lazyload-fn','done');
            callback();
            if(opts.onchange){
                opts.onchange(_this);
            }
        }
    }

    $.ui.define('lazyload', {
        options:{
            type:'img',
            source:'data-lazy-path',
            init:'data-lazy-init',
            delay:100,
            space:100,
            onchange:null,//触发后执行的回调函数
            //placeholder:"http://misc.360buyimg.com/lib/skin/e/i/loading-jd.gif", // 废除
            placeholderClass:"loading-style2", //加载中样式
            errorClass:"err-poster", //加载失败样式
            blankImgUrl:"http://misc.360buyimg.com/lib/img/e/blank.gif"//默认占位图片
        },
        init:function(){
            var self = this;
            var opts = this.options;
            var item = null;
            var itemSize = null;
            var installTag = null;
            if (opts.type == 'img'){
                if ( opts.source == 'data-lazy-path' ) {
                    opts.source = 'data-lazy-img';
                }
                installTag = opts.source+'-install';
            }

            var tag = 'div';
            if (opts.type =='img') {
                tag = 'IMG';
                item = $('img['+opts.source+']['+opts.source+'!=done]', self.el);
                itemSize = item.size();
                //没有需在加载的图片或事件，就不绑定事件
                if ( !itemSize ) {
                    return false;
                }

            }else if (opts.type =='fn'){
                tag = opts.source;
            }

            var lazyload = function (){
                if (opts.type =='img') {
                    item = $('img['+opts.source+']['+opts.source+'!=done]', self.el);
                } else {
                    item = $(tag, self.el);
                }
                itemSize = item.size();
                var scrollHeight = $(document).scrollTop() ;
                var docHeight = scrollHeight + $.page.clientHeight() + opts.space;
                $.each(item, function(){
                    var _this = $(this);
                    var path = null;
                    if (opts.type == 'js' || opts.type == 'img' ) {
                        path = _this.attr(opts.source);
                    }

                    if (path || opts.type == 'fn' || opts.type == 'img'){
                        var top = self.getTop(_this[0]);
                        if ( top > 0 && itemSize > 0 && ( top > scrollHeight-_this.outerHeight() ) && top < docHeight ){
                            var data = _this.attr(opts.init);
                            if (opts.type == 'img'){
                                data = _this.attr(opts.source);
                                if ( data != 'done' ) {
                                    //图片增加默认样式
                                    lazyloadImg(_this, data, opts);
                                    itemSize -= 1;
                                } else
                                if ( data == 'done' ) {
                                    itemSize -= 1;
                                }
                            } else
                            if (opts.type == 'js') {
                                lazyloadJs(_this, path, data, function(){
                                    itemSize -= 1;
                                });
                            } else
                            if (opts.type == 'fn') {
                                lazyloadFn(_this, opts, function(){
                                    itemSize -= 1;
                                });
                            }
                        }
                    }
                });

                if ( !itemSize ){
                    if (opts.type =='img' && installTag) {
                        self.el.removeAttr(installTag);
                    }
                    $(window).unbind('scroll',throttled);
                }
            };
            /*
             //为了首屏,初始化时加载一次 多个绑定scroll IE有bug
             lazyload();
             var throttleFn= function(){
             lazyload();
             };
             var throttled = $.throttle(throttleFn,opts.delay);
             */

            var lazyTimer = setTimeout(lazyload, 0);
            var throttled = function(){
                if(lazyTimer){
                    clearTimeout(lazyTimer);
                }
                lazyTimer = setTimeout(lazyload, opts.delay);
            };

            //同一节点,同一类型 只监听一个线程
            if ( self.el.attr(installTag) != '1' ) {
                self.el.attr(installTag, 1);
                $(window).bind('scroll',throttled);
            }

            if ( opts.type == 'fn') {
                opts.source.attr('data-lazyload-fn','0');
            }
        },
        getTop: function ( elements ){
            var top = elements.offsetTop;
            if (elements.parentNode != null) {
                var parent  = elements.offsetParent;
                while( parent != null ){
                    top += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            return top;
        }
    });
})(jQuery);