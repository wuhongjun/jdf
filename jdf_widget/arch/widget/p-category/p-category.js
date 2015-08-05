seajs.use('jdf/1.0.0/ui/lazyload/1.0.0/lazyload', function(){
    var menu = $('.p-category');
    var item = menu.find('.item');
    var subMenu = menu.find('.sub-menu');
    var subItem = subMenu.find('.item');

    menu.bind('mouseenter', function(event) {
        subMenu.css('display', 'block');
    }).bind('mouseleave', function(event) {
        // 打开子菜单
        subMenu.css('display', 'none');
        item.removeClass('curr');
    });

    item.bind('mouseenter', function(event) {
        var index     = $(this).index();
        var lastIndex = item.length - 1;

        // 图片异步加载
        subItem.eq(index).lazyload({
            type: 'img',
            source: 'data-src'
        });

        // 打开子菜单
        $(this).addClass('curr')
            .siblings('.item').removeClass('curr');
        subItem.eq(index).css('display', 'block')
            .siblings('.item').css('display', 'none');
    });
});