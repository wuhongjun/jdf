
/*
    Jlazyload
*/
(function($){
    $.fn.Jlazyload=function(option,callback){
        if(!this.length)return;
        var settings=$.extend({
            type:null,
            offsetParent:null,
            source:"data-lazyload",
            placeholderImage:"http://misc.360buyimg.com/lib/img/e/blank.gif",
            placeholderClass:"loading-style2",
            threshold:200//阈值，控制显示位置，默认为200
        },option||{}),
        _this=this,_timer,_client,
        rect=function(object){
            var left = object.scrollLeft,
                top = object.scrollTop,
                width = object.offsetWidth,
                height = object.offsetHeight;
            while(object.offsetParent){
                left += object.offsetLeft;
                top += object.offsetTop;
                object = object.offsetParent;
            }
            return {
                left:left,
                top:top,
                width:width,
                height:height
            }
        },
        client=function(){
            var de=document.documentElement,
                dc=document.body,
                left = window.pageXOffset?window.pageXOffset:(de.scrollLeft || dc.scrollLeft),
                top =  window.pageYOffset?window.pageYOffset:(de.scrollTop || dc.scrollTop),
                width =  de.clientWidth,
                height = de.clientHeight;
            return {
                left:left,
                top:top,
                width:width,
                height:height
            }
        },
        intersect=function(rect1,rect2){
            var lc1, lc2, tc1, tc2, w1, h1,t = settings.threshold?parseInt(settings.threshold):0;
            lc1 = rect1.left + rect1.width / 2;
            lc2 = rect2.left + rect2.width / 2;
            tc1 = rect1.top + rect1.height / 2 ;
            tc2 = rect2.top + rect2.height / 2 ;
            w1 = (rect1.width + rect2.width) / 2 ;
            h1 = (rect1.height + rect2.height) / 2;
            return Math.abs(lc1 - lc2) < (w1+t) && Math.abs(tc1 - tc2) < (h1+t);
        },
        imagesInit=function(flag,source,object){
            if(settings.placeholderImage&&settings.placeholderClass){
                object.attr("src",settings.placeholderImage).addClass(settings.placeholderClass);
            }
            if(flag){
                object.attr("src",source).removeAttr(settings.source);
                if(callback)callback(source,object);
            }
        },
        textareaInit=function(flag,source,object){
            if(flag){
                var element=$("#"+source);
                element.html(object.val()).removeAttr(settings.source);
                object.remove();
                if(callback)callback(source,object);
            }
        },
        moduleInit=function(flag,source,object){
            if(flag){
                object.removeAttr(settings.source);
                if(callback)callback(source,object);
            }
        },
        init=function(){
            //alert(_this.length)
            _client=client(),
            _this=_this.filter(function(){
                return $(this).attr(settings.source);
            });
            $.each(_this,function(){
                var source=$(this).attr(settings.source);
                if(!source){
                    return;
                }
                var rect1=(!settings.offsetParent)?_client:rect($(settings.offsetParent).get(0)),
                    rect2=rect(this),
                    flag=intersect(rect1,rect2);
                switch(settings.type){
                    case "image":
                        imagesInit(flag,source,$(this));
                        break;
                    case "textarea":
                        textareaInit(flag,source,$(this));
                        break;
                    case "module":
                        moduleInit(flag,source,$(this));
                        break;
                    default:
                        break;
                }
            });
        },
        rander=function(){
            if(_this.length>0){
                clearTimeout(_timer);
                _timer=setTimeout(function(){
                    init();
                },10);
            }
        };
        init();
        if(!settings.offsetParent){
            $(window).bind("scroll",function(){
                rander();
            }).bind("reset",function(){
                rander();
            });
        }else{
            $(settings.offsetParent).bind("scroll",function(){
                rander();
            });
        }
    }
})(jQuery);
