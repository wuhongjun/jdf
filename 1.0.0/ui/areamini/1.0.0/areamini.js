/**
 *####地区选择####
 *
 ***Demo**
 *
 * [area](../ui/area/1.0.0/example/area.html "Demo")
 *
 ***参数**
 *
 *  - `syncServer` {Boolean}   false  是否同步服务器的地区信息
 *  - `initArea`  {String}   null  设置地区位置-数据源优先级最高; 格式："1-0-0-0" （省ID-市ID-区ID-县ID）;如果只有省和市ID，那区和县ID设为0，如：1-0-0-0、1-72-0-0;不允许头和中间为空，如：0-1-0-0、1-0-23-0;五种数据源的优先级排序: opt.initArea > sever > cookie > opt.defaultArea > defaultLocal(allLocal)
 *  - `defaultArea` {String}  null   默认值地区-数据源优先级低,格式和优先级请查看参数initArea
 *  - `provinceList` {Array}  object  自定义省级数据,具体说明请看demo
 *  - 对象属性：
 *  - {
 *  -   `id` {Number} ''    地区ID （真实的省级地区ID）
 *  -   `name` {String} ''    地区名称（真实的省级地区名称）
 *  -   `tpl` {String} ''    显示地区模板，用于自定义模板和内容，注意：带有此参数，不执行默认点击监控事件，添加data-onchange=1属性会执行onchange回调，arguments[0] 只有一个参数，当前a对象
 *  - };
 *  - `provinceExtend` {Boolean}  true  在原省级数据基本中扩展
 *  - `longAreaSize` {Number}  4  地区名称达到指定个数之后 应用long-area 样式
 *  - `longerAreaSize` {Number}  12  地区名称达到指定个数之后 应用longer-area 样式
 *  - `cookieMapping` {Object}  {} cookie匹配，不建议修改
 *  - 对象属性：
 *  - {
 *  -   `areaId` {String} 'areaId'    省地区ID
 *  -   `allLocal` {String} 'ipLoc-djd'    所有地区ID，格式:省ID-市ID-区ID-县ID
 *  - };
 *  - `writeCookie` {Boolean}  true  允许保存地区信息到本地COOKIE
 *  - `cookieOpts` {Object}  true  cookie配置
 *  - 对象属性：
 *  - {
 *  - `expires` {Number}  null  有效时间
 *  - `path` {String}  null  路径
 *  - `domain` {String}  null  域
 *  - `secure` {Boolean}  null  是否安全
 *  - };
 *  - `writeServer` {Boolean}  true  允许保存地区信息到服务器;依赖参数 syncServer=true
 *  - `className` {Object}  {} 组件css设置;注意“_” 代表层级关系
 *  - 对象属性：
 *  - {
 *  - `hover` {String}  'ui-areamini-hover'   控制地区选择box显示
 *  - `text` {String}  'ui-areamini-text-wrap' 文本box
 *  - `text_text` {String}  'ui-areamini-text' 显示地区信息
 *  - `content` {String}  'ui-areamini-content-wrap' 地区选择box
 *  - `content_tab` {String}  'ui-areamini-tab' 地区标签
 *  - `content_content` {String}  'ui-areamini-content'  地区内容box
 *  - `content_content_list` {String}  'ui-areamini-content-list'  地区内容列表
 *  - `close` {String}  'ui-areamini-close' 关闭地区选择box按钮
 *  - };
 *  - `tplContentWrap` {String} `<ul class="ui-areamini-content-list"><%=list%></ul>`
 *  - `tplContentItem` {String} `<li><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></li>`
 *  - `event` {String}  'hover' 地区选择框展示或隐藏触发事件，内容限制为：hover（鼠标经过和离开），click(鼠标点击和离开)
 *  - `onReady` {Function}  null 初始化完成后回调;
 *  - 返回数据：
 *  - `this` {areamini} self;
 *  - arguments[0] = {完整地区信息}
 *  - 完整地区信息:
 *  - {
 *  - `provinceId` {Number} 省ID
 *  - `provinceName` {String} 省名称
 *  - `cityId` {Number} 市ID
 *  - `cityName` {String} 市名称
 *  - `districtId` {Number} 区ID
 *  - `districtName` {String} 区名称
 *  - `townId` {Number} 县ID
 *  - `townName` {String} 县名称
 *  - };
 *  - `onChange` {Function}  null 选择地区后回调;
 *  - 返回内容格式：
 *  - `this` {areamini} self;
 *  - arguments[0] = {最后选择的地区}
 *  - 最后选择的地区:
 *  - {
 *  - `id` {Number} 地区ID
 *  - `name` {String} 地区名称
 *  - };
 *  - arguments[1] = {完整地区信息}
 *  - 完整地区信息:
 *  - {
 *  - `provinceId` {Number} 省ID
 *  - `provinceName` {String} 省名称
 *  - `cityId` {Number} 市ID
 *  - `cityName` {String} 市名称
 *  - `districtId` {Number} 区ID
 *  - `districtName` {String} 区名称
 *  - `townId` {Number} 县ID
 *  - `townName` {String} 县名称
 *  - };
 *  - `selectedClose` {Boolean}  true 选择完最终地区后，地区框是否关闭
 *
 *
 ***举例**
 *
 *
 *js部分
 *
 *	$('#areamini').areamini();
 *
 *html部分
 *
 <div id="areamini" class="ui-areamini-wrap">
 <div class="ui-areamini-text-wrap">
 <div class="ui-areamini-text"></div>
 <b></b>
 </div>
 <div class="ui-areamini-content-wrap">
 <div class="ui-areamini-content"></div>
 <div class="ui-areamini-close"></div>
 </div>
 </div>
 *
 *
 * **create**
 * 2015-01-14 12:12:12  by wuyaoheng
 *
 *
 */
;(function($, undefined) {
    var win = window;
    var areaId = 1;
    var defaultLocal = [1,72,0,0];
    var allLocal = defaultLocal.join('-');

    //如果为1，说明要加载数据，控制面板不能隐藏,则允许隐藏
    var showThread = -1;
    var cache = {
        province: {"北京": 1,"上海": 2,"天津": 3,"重庆": 4,"河北": 5,"山西": 6,"河南": 7,"辽宁": 8,"吉林": 9,"黑龙江": 10,"内蒙古": 11,"江苏": 12,"山东": 13,"安徽": 14,"浙江": 15,"福建": 16,"湖北": 17,"湖南": 18,"广东": 19,"广西": 20,"江西": 21,"四川": 22,"海南": 23,"贵州": 24,"云南": 25,"西藏": 26,"陕西": 27,"甘肃": 28,"青海": 29,"宁夏": 30,"新疆": 31,"台湾": 32,"香港": 42,"澳门": 43,"钓鱼岛": 84}
        ,city: {}
        //区县,格式同city
        ,area: {},
        //服务器(.jd.com)的COOKIE,是一个对象{addr:"*-*-*-*"}
        serverLocal : null,
        provinceList : null
    };

    //把压缩过的数据转为 id:name
    cache.province = (function(){
        var list = {};
        $.each(cache.province, function(k,v){
            list[v] =k;
        });
        return list;
    })();

    var server = {
        getUrl : 'http://uprofile.jd.com/u/getadds?callback=?',
        setUrl : 'http://uprofile.jd.com/u/setadds',
        sync : function( arg, provinceId ){
            var isJdDomain = document.domain == 'jd.com';
            if ( $.isFunction(arg) ) {
                if ( cache.serverLocal ) {
                    return cache.serverLocal;
                } else {
                    if ( isJdDomain ) {
                        arg({addr:cookie('ipLoc-djd')});
                    } else {
                        $.getJSON(this.getUrl,function(result){
                            cache.serverLocal = result;
                            arg(result);
                        });
                    }
                }
            } else {
                if ( isJdDomain ) {
                    var opt = {domain:'.jd.com',path:'/',expires:10};
                    cookie('areaId', provinceId, opt);
                    cookie('ipLoc-djd', arg, opt);
                } else {
                    cache.serverLocal = {adds:arg};
                    $.ajax({url:this.setUrl ,type:"get", dataType:"jsonp", data:cache.serverLocal});
                }
            }
        }
    };

    var cookie = function(name, value, options) {
        if (typeof value != 'undefined') {
            //set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                // for IE
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            //get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]).split('=');
                    if ( cookie[0] == name && cookie.length > 1 ) {
                        try{
                            cookieValue = decodeURIComponent(cookie[1]);
                        }catch (e){
                            cookieValue = cookie[1];
                        }
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

    function trim( value ) {
        return ( value || '' ).replace( /(^\s*)|(\s*$)/g, '' );
    }

    function isBlank ( value ) {
        //function(v, v2, v3, ...) or compare
        var args = arguments;
        if ( args.length > 1 ) {
            for ( var i = 0, len = args.length; i < len; i++) {
                if ( isBlank( args[ i ] ) ) return true;
            }
            return false;
        }
        return String(value) === 'undefined' || String( value ) === 'null' || (typeof (value) === 'string' ? trim( value ) === '' : false );
    }

    //通过格式 省 获取对应地区
    function changeAreaByIdSeq(str, callback){
        var local = {
            provinceId : 0,
            provinceName : '',
            cityId: 0,
            cityName: '',
            districtId: 0,
            districtName: '',
            townId: 0,
            townName: ''
        };
        var list = str.split('-');

        //如果省份数据为0，则使用默认地区
        if ( list[0] == 0 ) {
            list = defaultLocal;
        }

        var province = getProvince(list[0]).value;
        local.provinceId = province.id;
        local.provinceName = province.name;

        callback(local);
    }

    function getProvinceList(){
        var list = [];
        if ( cache.provinceList && cache.provinceList.length > 0 ) {
            list = cache.provinceList;
        } else {
            for( var k in cache.province ) {
                list.push({id: k, name: cache.province[k]});
            }
            cache.provinceList = list;
        }
        return list;
    }

    function getProvince( id ){
        var province = {id:id, name:''};
        var name = null;
        var isDefault = 0;

        name = cache.province[id];
        if ( !name ) {
            name = cache.province[defaultLocal[0]];
            isDefault = 1;
            province.id = defaultLocal[0];
        }

        province.name = name;
        return {value:province, isDefault:isDefault};
    }

    ///**
    // * 加载本机地区位置
    // * 五种数据源的优先级排序
    // * opt.initArea > syncServer > cookie > opt.defaultArea > defaultLocal(allLocal)
    // * */
    function loadLocal(opt, callback){
        var _default = opt.initArea || cookie(opt.cookieMapping.allLocal)|| opt.defaultArea || allLocal;
        if ( isBlank(opt.initArea) && opt.syncServer ) {
            server.sync(function(result){
                var adds = (result && result.adds) || _default;
                changeAreaByIdSeq(adds || _default, callback);
            });
        } else {
            changeAreaByIdSeq(_default, callback);
        }
    }

    function localObjectToList(local){
        return local && [
                {id:local.provinceId, name:local.provinceName},
                {id:local.cityId, name:local.cityName},
                {id:local.districtId, name:local.districtName},
                {id:local.townId, name:local.townName}
            ] || [];
    }

    function localObjectToArray(local, ids, names){
        $.each(localObjectToList(local), function(idx, v){
            if ( !isBlank(v.id) && v.id != 0 ) {
                ids.push(v.id);
                names.push(v.name);
            }
        });
    }

    function longAreaNameProcess(tplItem, area, options, isCurrent ){
        var className = '';
        if ( area.name.length >= options.longerAreaSize ) {
            className = 'longer-area';
        } else
        if (area.name.length >= options.longAreaSize){
            className = 'long-area';
        }


        if ( (isCurrent && options.className.selected) ||  className ) {
            var tplEle = $(tplItem);
            if ( (isCurrent && options.className.selected) ) {
                tplEle.find('a:first').addClass( options.className.selected );
            }
            if ( className ) {
                tplEle.addClass(className);
            }

            tplItem = $('<div/>').html(tplEle).html();
            tplItem = tplItem.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
        }

        //支持自动设置item
        if ( area.tpl ) {
            return $.tpl(area.tpl, area);
        }

        return $.tpl(tplItem, area);
    }

    function renderProvinceList(tplWrap, tplItem, index, local){
        var self = this;
        var optProvinceList = self.options.provinceList;
        var html = [];
        var list = [];
        if ( optProvinceList ) {
            list = optProvinceList;
        } else {
            list = getProvinceList();
        }

        $.each(list, function(idx, value){
            html.push(longAreaNameProcess(tplItem, value, self.options, value.id == local.provinceId));
        });
        return $.tpl(tplWrap, {list:html.join(''), index:index});
    }

    function bindAreaSelectEvent(){
        var self = this;
        var box = self.el;
        var opts = self.options;
        var optCss = opts.className;
        $('.'+optCss.content_content, box)
            .undelegate('a[data-id]', 'click')
            .delegate('a[data-id]', 'click', function(event){
                //兼容IE6在a.click中，误以为页面要离开，从而中断所有请求;
                event.preventDefault();
                var _t = $(this);

                var currentArea = {id:_t.data('id'), name:_t.html()};
                var selectLocal = saveSelectedLocal(box, currentArea.id, 0);


                if ( opts.className.selected ) {
                    $('.'+optCss.content_content+' a.'+opts.className.selected, box).removeClass(opts.className.selected);
                }

                changeAreaByIdSeq(selectLocal, function(local){
                    if ( opts.className.selected ) {
                        _t.addClass(opts.className.selected);
                    }
                    //如果为false，控制面板隐藏
                    if ( opts.selectedClose ) {
                        showAreaContent.call(self, false);
                    }
                    drawSelectAreaText.call(self, local);
                    if ($.isFunction(opts.onChange)){
                        opts.onChange.call(self, _t, currentArea, local);
                    }
                    if ( opts.writeCookie ) {
                        writeCookie(opts, local.provinceId, selectLocal);
                    }
                    if ( opts.syncServer && opts.writeServer ) {
                        writeServer(selectLocal, local.provinceId);
                    }
                });
            });

        $('.'+optCss.content_content, box)
            .undelegate('a[data-onchange=1]', 'click')
            .delegate('a[data-onchange=1]', 'click', function(){
                var _t = $(this);
                if ( opts.className.selected ) {
                    $('.'+optCss.content_content+' a.'+opts.className.selected, box).removeClass(opts.className.selected);
                    _t.addClass(opts.className.selected);
                }
                //如果为false，控制面板隐藏
                if ( opts.selectedClose ) {
                    showAreaContent.call(self, false);
                }
                if ($.isFunction(opts.onChange)){
                    opts.onChange.call(self, _t);
                }
        });
    }

    function writeCookie(options, provinceId, addr){
        cookie(options.cookieMapping.areaId, provinceId, options.cookieOpts);
        cookie(options.cookieMapping.allLocal, addr, options.cookieOpts);
    }

    function writeServer(addr, provinceId){
        server.sync(addr, provinceId);
    }

    function showAreaContent(on){
        var self = this;
        var hover = self.options.className.hover;
        if ( on ) {
            if ( showThread > -1 ) {
                clearTimeout(showThread);
                showThread = -1;
            }
            offsetBoxLeft.call(self);
            //兼容IE6做的处理
            self.el.addClass(hover);
            showThread = setTimeout(function(){
                self.el.addClass(hover);
            },1);
        } else {
            if ( showThread > -1 ) {
                clearTimeout(showThread);
                showThread = -1;
            }
            self.el.removeClass(hover);
        }
    }

    ///***
    // * 修正跳出框的位置，避免超过屏幕边界
    // * 说明：目前仅支持左右两边超出边框修复
    // */
    function offsetBoxLeft(){
        var self = this;
        var box = self.el;
        var content = $(self.css.content);
        var tWidth = $(self.css.text).width();
        var cWidth = content.width();
        var width = $(win).width();
        var left = box.offset().left;
        var tl = $(self.css.text).offset().left;

        //当屏幕大小来回切换时，恢复最原始坐标，然后再重新计算新坐标*
        if ( !content.data('left') ) {
            content.data('left', content.css('left'));
        } else {
            content.css('left', content.data('left'));
        }

        //超出右边屏幕
        if ( left + cWidth > width  ) {
            var nl = cWidth-tWidth-10;
            //当移动左边时，判断是否超出左边屏幕
            if ( nl > tl ) {
                nl -= (nl - tl + tWidth - 20);
            }
            content.css({left:'-'+(nl) + 'px'});
        } else
        //超出左边屏幕
        if ( left < (parseInt(content.css('left')) * -1) ) {
            content.css({left:'0px'});
        }
    }

    function convertAreaIdList(local){
        if ( local ) {
            return [local.provinceId,local.cityId,local.districtId,local.townId];
        }
        return [0,0,0,0];
    }

    function saveSelectedLocal(box, id, index){
        var selectLocal = box.data('select-local');
        selectLocal = (selectLocal && selectLocal.split('-')) || [0,0,0,0];

        if ( typeof id == 'object' ) {
            selectLocal = convertAreaIdList(id);
        }

        for ( var i = 0; i < selectLocal.length; i++ ) {
            if ( i == index ) {
                selectLocal[i] = id;
            } else if (i > index ){
                selectLocal[i] = 0;
            }
        }

        selectLocal = selectLocal.join('-');
        box.data('select-local', selectLocal);
        return selectLocal;
    }

    function drawSelectAreaContent(local, selectIndex){
        var self = this;
        var box = self.el;
        var opts = self.options;
        var contentWrap = opts.tplContentWrap;
        var contentItem = opts.tplContentItem;
        $(self.css.content_content).html(renderProvinceList.call(self, contentWrap, contentItem, 0, local));

        // selectIndex = -1 为初始化进入，需要保存当前地区
        if ( selectIndex == -1 ) {
            saveSelectedLocal(box, local);
        }

        bindAreaSelectEvent.call(self, opts);

        //$(self.css.content).switchable(sOpt);
    }

    function drawSelectAreaText(local){
        var self = this;
        var names = [], ids = [];
        localObjectToArray(local, ids, names);
        ids = ids.join('-');
        names = names.join('');
        $(self.css.text_text).html(names).attr('data-id',ids).attr('title',names);
    }

    ///**把options.cssName 中的内容转为全路径，方便使用
    // * 格式：
    // * {
    //    hover:'ui-areamini-hover',
    //    text:'ui-areamini-text-wrap',
    //    text_text:'ui-areamini-text',
    //    content:'ui-areamini-content-wrap',
    //    content_tab:'ui-areamini-tab',
    //    content_content:'ui-areamini-content',
    //    content_content_list:'ui-areamini-content-list'
    //    close:'ui-areamini-close',
    //    }
    // * 转换后：
    // * {
    //        hover:'#id .ui-areamini-hover',
    //        text:'#id .ui-areamini-text-wrap',
    //        text_text:'#id .ui-areamini-text-wrap .ui-areamini-text',
    //        content:'#id .ui-areamini-content-wrap',
    //        content_tab:'#id .ui-areamini-content-wrap .ui-areamini-tab',
    //        content_content:'#id .ui-areamini-content-wrap .ui-areamini-content',
    //        content_content_list:'#id .ui-areamini-content-wrap .ui-areamini-content .ui-areamini-content-list'
    //        close:'#id .ui-areamini-close',
    //    }
    // *  其中name_name 中的 ‘_’ 为层级关系
    // * */
    function transformClassName(id, className){
        var css = {};
        $.each(className, function(key,value){
            var name = key.split('_');
            var cn = [];
            var len = name.length;
            $.each(name,function(idx,v){
                cn.push('.' + className[v]);
                if ( len > 1 && 2+idx == len) {
                    cn.push('.'+value);
                    return false;
                }
            });
            css[key] = id + ' ' + cn.join(' ');
        });
        return css;
    }

    $.ui.define('areamini', {
        options: {
            hasCssLink:true,
            baseVersion:'1.0.0',
            cssLinkVersion:'1.0.0',

            //同步服务器
            syncServer: false,
            ////设置地区位置-数据源优先级最高
            // * 格式：省ID
            // *
            // * 五种数据源的优先级排序
            // * opt.initArea > sever > cookie > opt.defaultArea > defaultLocal(allLocal)
            // * */
            initArea: null,
            ///**
            // * 默认值地区-数据源优先级低(上面有介绍)
            // * 格式：同initArea
            // * **/
            defaultArea:null,
            provinceList:null,//省份地区数据
            provinceExtend:true,//在原数据基本中扩展
            longAreaSize: 4,//地区名称达到指定个数之后 应用long-area 样式
            longerAreaSize: 12,//地区名称达到指定个数之后 应用longer-area 样式
            //cookie匹配，一般不需要修改
            cookieMapping: {areaId:'areaId', allLocal:'ipLoc-djd'},
            //保存到本地COOKIE
            writeCookie:true,
            //cookie配置
            cookieOpts:{
                expires: null,
                path:null,
                domain:null,
                secure:null
            },
            //保存到服务器--需要syncServer=true
            writeServer:true,
            className:{
                hover:'ui-areamini-hover',
                text:'ui-areamini-text-wrap',
                text_text:'ui-areamini-text',
                content:'ui-areamini-content-wrap',
                close:'ui-areamini-close',
                content_tab:'ui-areamini-tab',
                content_content:'ui-areamini-content',
                content_content_list:'ui-areamini-content-list',
                selected:''
            },

            tplContentWrap: '<ul class="ui-areamini-content-list"><%=list%></ul>',
            tplContentItem: '<li><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></li>',
            ///**
            // * 支持两种选择 hover 和 click
            // * hover : 默认值
            // * 鼠标移到text时显示，离开则隐藏
            // *
            // * click：
            // * 鼠标点击时显示,鼠标离开时消失
            // *
            // * */
            event:'hover',
            ///***
            //* @return
            //* this = {
            //*      el:this.el,
            //*      options:this.options
            //* };
            //* arguments[0] = {
            //        provinceId : 0,
            //        provinceName : '',
            //        cityId: 0,
            //        cityName: '',
            //        districtId: 0,
            //        districtName: '',
            //        townId: 0,
            //        townName: ''
            //    }
            //*/
            //初始化完成后回调*
            onReady: null,
            ///***
            // * @return
            // *  this = this.el;
            // *
            //    arguments[0] = $a;
            // *  arguments[1] = {
            //        id : 0,
            //        name: ''
            //    };
            //    arguments[2] = {
            //        provinceId : 0,
            //        provinceName : '',
            //        cityId: 0,
            //        cityName: '',
            //        districtId: 0,
            //        districtName: '',
            //        townId: 0,
            //        townName: ''
            //    };
            // */
            //选择地区后回调*
            onChange: null,
            //选择最终地区后，是否关闭跳出框
            selectedClose:true
        },
        css : {},
        init:function(){
            var self = this;
            var opts = self.options;
            var box = self.el;
            //只接受一级数据请求;
            opts.scopeLevel = 1;

            //转换CSS为全路径，方便使用
            self.css = transformClassName('#' + box[0].id, opts.className);

            if ( opts.provinceList ) {
                if ( opts.provinceExtend ) {
                    opts.provinceList = $.extend(true, [], getProvinceList().concat(opts.provinceList));
                }
            }

            //加载本机位置信息
            loadLocal( opts, function( local ){

                drawSelectAreaText.call(self, local);
                // -1 作为初始化标识
                drawSelectAreaContent.call(self, local, -1);

                //绑定地区选择框显示事件
                var tevent = opts.event == 'hover' ? 'mouseenter' : 'click';
                $(self.css.text).bind(tevent, function(){
                    showAreaContent.call(self, true);
                    return false;
                });

                //绑定地区选择框隐藏事件
                $(box).bind('mouseleave', function(event){
                    showAreaContent.call(self, false);
                });

                //绑定关闭图标事件*
                $(self.css.close).bind('click',function(){
                    showAreaContent.call(self, false);
                });

                //加载及绘制完成后执行回调*
                if ($.isFunction(opts.onReady)){
                    opts.onReady.call(self, local);
                }
            });
        },
        hide: function(){
            var self = this;
            var hover = self.options.className.hover;
            self.el.removeClass(hover);
        },
        show: function(){
            var self = this;
            var hover = self.options.className.hover;
            self.el.addClass(hover);
        }
    });
})(jQuery);