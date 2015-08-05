/**
 *####elevator电梯####
 *
 *在楼层中安装电梯
 *在电梯的显示位置需要使用fixable插件来控制
 *
 ***Demo**
 * [elevator](../ui/elevator/1.0.0/example/elevator.html "Demo")
 *
 ***参数**
 *	
 *  - 	`floorClass` {String} 'floor' 楼层class(必填)
 *  - 	`elevatorClass` {String} 'elevator'(必填)
 *  - 	`handlerClass` {String} 'handler' 电梯按钮class(必填)
 *  - 	`selectClass` {String} null 电梯按钮选中class
 *  - 	`event` {String} 'click' 电梯按钮执行事件
 *  - 	`delay` {Number} 切换效果延迟
 *  - 	`easing` {String} null 动画效果类型，依赖easing组件
 *  - 	`effectSmooth` {Boolean} true 在同时处理切换效果时，是否执行$(body,html).stop()
 *  - 	`threshold` {Number} 'auto' 显示电梯的阀值,默认 'auto',代表有楼层出现在可视区时显示，没有则消失。为null时不做处理
 *  - 	`floorScrollMargin` {Number} 0 在点击电梯时，指向某楼层，预留的空间位置
 *  - 	`onStart` {Function} 开始滚动时回调
 *  - 	`onEnd` {Function} 滚动结束时回调
 *  - 	`onOut` {Function} null 当所有楼层都不在可视区域时执行
 *
 ***举例**
 *
 *	seajs.use(['jdf/1.0.0/ui/fixable/1.0.0/fixable','jdf/1.0.0/ui/elevator/1.0.0/elevator'], function (fixable, elevator) {
 *		$('#elevator1').fixable({
 *			x:'right',
 *			y:'bottom',
 *			xValue:-$('#elevator1').width(),
 *			yValue:0,
 *			context:$('#content')
 *		});
 *	
 *		$('#content').elevator({
 *			floorClass:'floor',
 *			elevatorClass:'elevator',
 *			handlerClass:'handler',
 *			selectClass:'select',
 *			onStart:function(obj){
 *	
 *			},
 *			onEnd:function(obj){
 *				
 *			}
 *		});
 *	});
 *
 * **update**
 * 2014-12-10 16:40:00 by wuyaoheng
 *
 */
;(function($, undefined) {
    var windowScrollThread = -1;
    var resizeScrollThread = -1;
    var ElevatorList = [];
    var Elevator = function(self, options){
        var _this = this;
        $.extend(_this, options);
        _this.self = self;
        _this.isPlay = false;//是否控制用户点击楼层滚动时，不再处理滚动条的滚动事件
        _this.isScrolling = false;//用来控制滚动条滚动时，执行开始回调事件
        _this.scrollThread = -1;
        _this.resizeThread = -1;
        _this.currentIdx = -1;

        //建立索引
        _this.floorList.each(function(i){
            $(this).attr('data-idx',i);
        });
        //建立索引
        _this.handlers.each(function(i){
            if ( !$(this).attr('data-idx') ) {
                $(this).attr('data-idx',i);
            }
        });

        //初始化
        _this.onScroll();

        ElevatorList.push(_this);
    };

    Elevator.prototype.onScroll = function(){
        var _this = this;
        //手动操作时，不执行
        if ( _this.isPlay ) {
            return;
        }

        if ( !_this.isScrolling ) {
            _this.isScrolling = true;
            if ($.isFunction(_this.onStart)) {
                _this.onStart();
            }
        }
        clearTimeout(_this.scrollThread);
        _this.scrollThread = setTimeout(function(){
            var hasClient = false;
            var floor = getViewFloor(_this.floorList);

            if ( floor ) {
                hasClient = true;
                if ($.isFunction(_this.onEnd)) {
                    _this.onEnd.call(_this, floor);
                }
            }

            //电梯的显示阀值计算
            elevatorThreshold(_this, hasClient);

            //没有楼层在可视区域时执行回调
            if ( !hasClient ) {
                if ($.isFunction(_this.onOut)) {
                    _this.onOut.call(_this);
                }
            }

            _this.isScrolling = false;
        }, 200);
    };
    Elevator.prototype.onResize = function(){
        var _this = this;
        clearTimeout(_this.resizeThread);
        _this.resizeThread = setTimeout(function(){
            if ($.isFunction(_this.onResizeCallback)) {
                _this.onResizeCallback.call(_this);
            }
        }, 200);
    };
    Elevator.prototype.remove = function(){
        var _this = this;
        $.each(ElevatorList, function(i, elevator){
            if ( _this == elevator ) {
                ElevatorList.slice(i, 1);
                return true;
            }
        });
        return false;
    };

    function elevatorThreshold(_this, hasClient){
        //电梯的显示阀值自动计算，有楼层在可视区域时执行
        if ( _this.threshold == 'auto' ) {
            if ( hasClient ) {
                _this.elevatorBox.show();
            } else {
                _this.elevatorBox.hide();
            }
        } else
        if( _this.threshold != null ) {
            //手动设置电梯的显示阀值
            var bTop = $('body').scrollTop() || $('html').scrollTop();
            var threshold = _this.threshold;
            if ( _this.threshold instanceof $ ) {
                threshold = _this.threshold.offset().top;
            }
            if ( threshold > bTop ) {
                _this.elevatorBox.hide();
            } else {
                _this.elevatorBox.show();
            }
        } else {
            //为null 则不做任何处理
        }
    }

    function scrollTop(options, callback ){
        var body = $('body,html');
        //平滑效果
        if ( options.effectSmooth ) {
            body.stop();
        }

        body.animate({scrollTop:options.top}, options.delay, options.easing, function(){
            if ( callback ) {
                callback();
                callback = null;
            }
        });
    }

    //function inWindowClient(el) {
    //    var wHeight = $(window).height();
    //    var bTop = $('body').scrollTop() || $('html').scrollTop();
    //    var eTop = el.offset().top;
    //    return wHeight + bTop > eTop && ((bTop < eTop + (el.height()/2) || bTop < eTop));
    //}

    function getViewFloor(floors){
        var list = [];
        var wHeight = $(window).height();
        var bTop = $('body').scrollTop() || $('html').scrollTop();
        var top = 0;
        var height = 0;
        var th = 0;
        var floor = null;
        var firstC = false;
        $.each(floors, (function(){
            floor = $(this);
            top = floor.offset().top;
            height = floor.outerHeight();
            th = top + height;
            if ( th > bTop && top < bTop+wHeight) {
                var ch = 0;
                if ( top < bTop ) {
                    ch = th - bTop;
                }
                if ( top > bTop && top <  bTop+wHeight ) {
                    ch = bTop + wHeight - top;
                }
                //如果首个显示高度大于屏幕的一半，则它优先选中
                if ( !firstC && ch > (wHeight/3) ) {
                    firstC = true;
                    ch = 9999;
                }
                list.push({floor:floor, ch:ch});
            }
        }));
        if ( list.length > 0 ) {
            list.sort(function(f,f1){
                return f.ch < f1.ch ? -1 : 1;
            });
            return list.pop().floor;
        }
        return null;
    }

    function handlerSelect(handlers, handler, className){
        handlers.removeClass(className);
        handler.addClass(className);
    }

    function getCallbackParm(handlers, floorList, from, to){
        return {handler:handlers[to], floor:floorList[to], from:from||-1, to:to};
    }


    $(window).bind('scroll', function() {
        clearTimeout(windowScrollThread);
        windowScrollThread = setTimeout(function(){
            clearTimeout(windowScrollThread);
            $.each(ElevatorList, function(i,elevator){
                elevator.onScroll();
            });
        }, 50);
    });

    $(window).bind('resize', function() {
        clearTimeout(resizeScrollThread);
        resizeScrollThread = setTimeout(function(){
            $.each(ElevatorList, function(i, elevator){
                elevator.onResize();
            });
        }, 50);
    });

    $.ui.define('elevator', {
        options: {
            floorClass:'floor',
            elevatorClass:'elevator',
            handlerClass:'handler',
            selectClass: null,
            event:'click',
            delay: 300,
            easing:null, //动画效果类型，依赖easing组件
            effectSmooth:true,//在同时处理切换效果时，是否执行.stop()
            threshold:'auto',
            floorScrollMargin:0,//在点击电梯时，指向某楼层，预留的空间位置
            onStart:null,
            onEnd:null,
            onOut:null //当所有楼层都不在可视区域时执行
        },
        floorList: null,
        elevatorBox: null,
        handlers: null,
        elevator:null,
        init:function(){
            var self = this;
            var opts = self.options;
            var box = self.el;
            var floorList = self.floorList = box.find( '.' + opts.floorClass);
            var elevatorBox = self.elevatorBox = $('.'+opts.elevatorClass);
            var handlers = self.handlers = $('.'+opts.handlerClass, elevatorBox);

            opts.floorScrollMargin = !isNaN(parseInt(opts.floorScrollMargin)) ? parseInt(opts.floorScrollMargin) : 0;

            if ( floorList.length > 0 && floorList.length == handlers.length ) {

                if( opts.threshold != null ) {
                    elevatorBox.hide();
                }
                //创建电梯
                var elevator = self.elevator = new Elevator(self, {
                    floorList: floorList,
                    elevatorBox: elevatorBox,
                    handlers: handlers,
                    delay: opts.delay,
                    threshold: opts.threshold,
                    selectClass: opts.selectClass,
                    onStart: function(){
                        //因为是滚动条操作，所以没有to值
                        if ($.isFunction(opts.onStart)) {
                            opts.onStart.call(self, getCallbackParm(handlers, floorList, elevator ? elevator.currentIdx : -1, -1));
                        }
                    },
                    onEnd: function(floor){
                        //滚动结束时，选中对应的电梯按钮
                        if ( floor ) {
                            var idx = floor.attr('data-idx');
                            var oldIdx = elevator.currentIdx;

                            elevator.currentIdx = idx;//记住当前索引
                            if ( idx < elevator.handlers.length && idx > -1 ) {
                                var handler = $(elevator.handlers.filter('[data-idx='+idx+']'));
                                if ( !handler || handler.length < 1) {
                                    return false;
                                }
                                handlerSelect(handlers, handler, opts.selectClass);
                                if ($.isFunction(opts.onEnd)) {
                                    opts.onEnd.call(self, getCallbackParm(handlers, floorList, oldIdx, idx));
                                }
                            }
                        }
                    },
                    onOut: function(){
                        if ( opts.selectClass ){
                            handlers.removeClass(opts.selectClass);
                        }
                        if ($.isFunction(opts.onOut)) {
                            opts.onOut.call(self, elevatorBox);
                        }
                    }
                });

                if ( opts.event ) {
                    var eventThread = - 1;
                    handlers.live(opts.event, function(event){
                        var _this = $(this);
                        var _idx = _this.attr('data-idx');
                        var _floor = $(floorList[_idx]);
                        var oldIdx = elevator.currentIdx;
                        var callbackParm = null;

                        //关闭解锁
                        clearTimeout(eventThread);

                        elevator.isPlay = true;
                        elevator.currentIdx = _idx;//记住当前索引
                        callbackParm = getCallbackParm(handlers, floorList, oldIdx, _idx);

                        if ($.isFunction(opts.onStart)){
                            opts.onStart.call(self, callbackParm);
                        }

                        if ( opts.selectClass ) {
                            handlerSelect(handlers, _this, opts.selectClass);
                        }

                        scrollTop({
                            top: _floor.offset().top + opts.floorScrollMargin,
                            delay: opts.delay,
                            easing: opts.easing,
                            effectSmooth: opts.effectSmooth},
                            function(){
                                if ($.isFunction(opts.onEnd)) {
                                    opts.onEnd.call(self, callbackParm);
                                }
                                eventThread = setTimeout(function(){
                                    elevator.isPlay = false;
                                }, 100);
                                elevatorBox.show();
                            }
                        );
                        event.preventDefault();
                    });
                }
            }
        },
        goto: function(index){
            var self = this;
            var opts = self.options;
            var handlers = self.handlers;
            if ( index < 0 || index >= handlers.length || !opts.event) {
                return false;
            }
            handlers.eq(index).trigger(opts.event);
        }
    });
})(jQuery);