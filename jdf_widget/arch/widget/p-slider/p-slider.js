seajs.use(['jdf/1.0.0/ui/lazyload/1.0.0/lazyload','jdf/1.0.0/ui/switchable/1.0.0/switchable'], function () {
    var $fScreen = $('.first-screen');
    var $sBanner = $fScreen.find('.slider-banner');

    $('#p-slider').switchable({
        type: 'focus',
        navItem:'ui-slider-trigger',//nav中item的className
        navSelectedClass:'curr',//nav选中时className
        mainClass:'ui-slider-item',
        mainSelectedClass:'curr',//主体选中时className
        delay: 200,
        speed: 260,
        autoPlay:true,

        callback: function(index) {
             var item  = this.main.eq(index);
            // 图片异步加载
            item.lazyload({
                source: 'data-src'
            });
        }
    });
});
