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
 *  - `scopeLevel`  {Number}   3  地区层级; 数据范围（1-4）
 *  - `openMunicipality`  {Boolean}   false  开启直辖市，在展示层级大于1级时，直辖市选择会少一层级别(声明，scopeLevel必须大于1)
 *  - `repLevel` {Boolean}  true  自动补充地区;如果scopeLevel=4，而数据只有省，则市、区、县将自动获取第一位, 说明：补充的数据不会同步到服务器或COOKIE中，仅作为显示和操作
 *  - `initArea`  {String}   null  设置地区位置-数据源优先级最高; 格式："1-0-0-0" （省ID-市ID-区ID-县ID）;如果只有省和市ID，那区和县ID设为0，如：1-0-0-0、1-72-0-0;不允许头和中间为空，如：0-1-0-0、1-0-23-0;五种数据源的优先级排序: opt.initArea > sever > cookie > opt.defaultArea > defaultLocal(allLocal)
 *  - `defaultArea` {String}  null   默认值地区-数据源优先级低,格式和优先级请查看参数initArea
 *  - `provinceList` {Array}  object  自定义省级数据，目前只支持一级数据，具体说明请看demo
 *  - 对象属性：
 *  - {
 *  -   `id` {Number} ''    地区ID （真实的省级地区ID）
 *  -   `name` {String} ''    地区名称（真实的省级地区名称）
 *  -   `tpl` {String} ''    显示地区模板，用于自定义模板和内容
 *  - };
 *  - `provinceExtend` {Boolean}  true  在原省级数据基本中扩展
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
 *  - `hover` {String}  'ui-area-hover'   控制地区选择box显示
 *  - `text` {String}  'ui-area-text-wrap' 文本box
 *  - `text_text` {String}  'ui-area-text' 显示地区信息
 *  - `content` {String}  'ui-area-content-wrap' 地区选择box
 *  - `content_tab` {String}  'ui-area-tab' 地区标签
 *  - `content_content` {String}  'ui-area-content'  地区内容box
 *  - `content_content_list` {String}  'ui-area-content-list'  地区内容列表
 *  - `close` {String}  'ui-area-close' 关闭地区选择box按钮
 *  - };
 *  - `selectTip` {String}  '请选择'
 *  - `switchable` {Object} {} 地区展示框css配置及html模板
 *  - 配置属性：
 *  - {
 *  - `navItem` {String} 'ui-switchable-item'
 *  - `navSelectedClass` {String} 'ui-area-current'
 *  - `mainClass` {String} 'ui-switchable-panel'
 *  - `mainSelectedClass` {String} 'ui-switchable-panel-selected'
 *  - `event` {String} 'click'
 *  - `delay` {String} '0'
 *  - `tplTab` {String} `<a class="ui-switchable-item" data-id="<%=id%>"><em><%=name%></em><i></i></a>`
 *  - `tplContentWrap` {String} `<div style="display: none;" class="ui-switchable-panel" data-index="<%=index%>"><ul class="ui-area-content-list"><%=list%></ul></div>`
 *  - `tplContentItem` {String} `<li><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></li>`
 *  - }
 *  - `showLoading` {Boolean}  true  显示数据加载过程
 *  - `loadingHtml` {String}  `<div style="text-align: center; line-height: 60px;height: 60px;"><img src="http://misc.360buyimg.com/201007/skin/df/i/loading.gif"/></div>`  数据加载过程的html模板
 *  - `event` {String}  'hover' 地区选择框展示或隐藏触发事件，内容限制为：hover（鼠标经过和离开），click(鼠标点击和离开)
 *  - `onReady` {Function}  null 初始化完成后回调;
 *  - 返回数据：
 *  - `this` {Object} {`el`: 当前主体$this,`options`:配置属性};
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
 *  - `this` {Object} {当前主体$this};
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
 *	$('#area').area();
 *
 *html部分
 *
    <div id="area" class="ui-area-wrap">
        <div class="ui-area-text-wrap">
            <div class="ui-area-text"></div>
            <b></b>
        </div>
        <div class="ui-area-content-wrap">
            <div class="ui-area-tab"></div>
            <div class="ui-area-content"></div>
            <div class="ui-area-close"></div>
        </div>
    </div>
 *
 *
 * **create**
 * 2014-10-30 12:12:12  by wuyaoheng
 *
 * **upate**
 * 2014-12-31 15:00:00  by wuyaoheng
 * [add]添加openMunicipality,开启直辖市
 * [add]添加cookieOpts,本地cookie配置
 *
 */
;(function($, undefined) {
    var win = window;
    var areaId = 1;
    var defaultLocal = [1,72,0,0];
    var allLocal = defaultLocal.join('-');

//    如果为1，说明要加载数据，控制面板不能隐藏,则允许隐藏
    var isLoadingData = false;
    //暂时不开放替换API接口
    var url = 'http://d.jd.com/area/get?fid=';
    var showThread = -1;
    var cache = {
        province: {"北京": { id: "1", c:72, z:1 },"上海": { id: "2", c:78, z:1 },"天津": { id: "3", c:51035, z:1},"重庆": { id: "4", c:113, z:1},"河北": { id: "5", c:142 },"山西": { id: "6", c:303 },"河南": { id: "7", c:412 },"辽宁": { id: "8", c:560 },"吉林": { id: "9", c:639 },"黑龙江": { id: "10", c:698 },"内蒙古": { id: "11", c:799 },"江苏": { id: "12", c:904 },"山东": { id: "13", c:1000 },"安徽": { id: "14", c:1116 },"浙江": { id: "15", c:1158 },"福建": { id: "16", c:1303 },"湖北": { id: "17", c:1381 },"湖南": { id: "18", c:1482 },"广东": { id: "19", c:1601 },"广西": { id: "20", c:1715 },"江西": { id: "21", c:1827 },"四川": { id: "22", c:1930 },"海南": { id: "23", c:2121 },"贵州": { id: "24", c:2144 },"云南": { id: "25", c:2235 },"西藏": { id: "26", c:2951 },"陕西": { id: "27", c:2376 },"甘肃": { id: "28", c:2487 },"青海": { id: "29", c:2580 },"宁夏": { id: "30", c:2628 },"新疆": { id: "31", c:2652 },"台湾": { id: "32", c:2768 },"香港": { id: "42", c:2754 },"澳门": { id: "43", c:2770 },"钓鱼岛": { id: "84", c:84 }}
        ,city: {"1":[{"朝阳区":72},{"海淀区":2800},{"西城区":2801},{"东城区":2802},{"崇文区":2803},{"宣武区":2804},{"丰台区":2805},{"石景山区":2806},{"门头沟":2807},{"房山区":2808},{"通州区":2809},{"大兴区":2810},{"顺义区":2812},{"怀柔区":2814},{"密云区":2816},{"昌平区":2901},{"平谷区":2953},{"延庆县":3065}],"2":[{"徐汇区":2813},{"长宁区":2815},{"静安区":2817},{"闸北区":2820},{"虹口区":2822},{"杨浦区":2823},{"宝山区":2824},{"闵行区":2825},{"嘉定区":2826},{"浦东新区":2830},{"青浦区":2833},{"松江区":2834},{"金山区":2835},{"奉贤区":2837},{"普陀区":2841},{"崇明县":2919},{"黄浦区":78}],"3":[{"东丽区":51035},{"和平区":51036},{"河北区":51037},{"河东区":51038},{"河西区":51039},{"红桥区":51040},{"蓟县":51041},{"静海县":51042},{"南开区":51043},{"塘沽区":51044},{"西青区":51045},{"武清区":51046},{"津南区":51047},{"汉沽区":51048},{"大港区":51049},{"北辰区":51050},{"宝坻区":51051},{"宁河县":51052}],"4":[{"万州区":113},{"涪陵区":114},{"梁平县":115},{"南川区":119},{"潼南县":123},{"大足区":126},{"黔江区":128},{"武隆县":129},{"丰都县":130},{"奉节县":131},{"开县":132},{"云阳县":133},{"忠县":134},{"巫溪县":135},{"巫山县":136},{"石柱县":137},{"彭水县":138},{"垫江县":139},{"酉阳县":140},{"秀山县":141},{"璧山县":48131},{"荣昌县":48132},{"铜梁县":48133},{"合川区":48201},{"巴南区":48202},{"北碚区":48203},{"江津区":48204},{"渝北区":48205},{"长寿区":48206},{"永川区":48207},{"江北区":50950},{"南岸区":50951},{"九龙坡区":50952},{"沙坪坝区":50953},{"大渡口区":50954},{"綦江区":50995},{"渝中区":51026},{"高新区":51027},{"北部新区":51028},{"城口县":4164}],"5":[{"石家庄市":142},{"邯郸市":148},{"邢台市":164},{"保定市":199},{"张家口市":224},{"承德市":239},{"秦皇岛市":248},{"唐山市":258},{"沧州市":264},{"廊坊市":274},{"衡水市":275}],"6":[{"太原市":303},{"大同市":309},{"阳泉市":318},{"晋城市":325},{"朔州市":330},{"晋中市":336},{"忻州市":350},{"吕梁市":368},{"临汾市":379},{"运城市":398},{"长治市":3074}],"7":[{"郑州市":412},{"开封市":420},{"洛阳市":427},{"平顶山市":438},{"焦作市":446},{"鹤壁市":454},{"新乡市":458},{"安阳市":468},{"濮阳市":475},{"许昌市":482},{"漯河市":489},{"三门峡市":495},{"南阳市":502},{"商丘市":517},{"周口市":527},{"驻马店市":538},{"信阳市":549},{"济源市":2780}],"8":[{"沈阳市":560},{"大连市":573},{"鞍山市":579},{"抚顺市":584},{"本溪市":589},{"丹东市":593},{"锦州市":598},{"葫芦岛市":604},{"营口市":609},{"盘锦市":613},{"阜新市":617},{"辽阳市":621},{"朝阳市":632},{"铁岭市":6858}],"9":[{"长春市":639},{"吉林市":644},{"四平市":651},{"辽源市":2992},{"通化市":657},{"白山市":664},{"松原市":674},{"白城市":681},{"延边州":687}],"10":[{"鹤岗市":727},{"双鸭山市":731},{"鸡西市":737},{"大庆市":742},{"伊春市":753},{"牡丹江市":757},{"佳木斯市":765},{"七台河市":773},{"黑河市":776},{"绥化市":782},{"大兴安岭地区":793},{"哈尔滨市":698},{"齐齐哈尔市":712}],"11":[{"呼和浩特市":799},{"包头市":805},{"乌海市":810},{"赤峰市":812},{"乌兰察布市":823},{"锡林郭勒盟":835},{"呼伦贝尔市":848},{"鄂尔多斯市":870},{"巴彦淖尔市":880},{"阿拉善盟":891},{"兴安盟":895},{"通辽市":902}],"12":[{"南京市":904},{"徐州市":911},{"连云港市":919},{"淮安市":925},{"宿迁市":933},{"盐城市":939},{"扬州市":951},{"泰州市":959},{"南通市":965},{"镇江市":972},{"常州市":978},{"无锡市":984},{"苏州市":988}],"13":[{"济宁市":2900},{"济南市":1000},{"青岛市":1007},{"淄博市":1016},{"枣庄市":1022},{"东营市":1025},{"潍坊市":1032},{"烟台市":1042},{"威海市":1053},{"莱芜市":1058},{"德州市":1060},{"临沂市":1072},{"聊城市":1081},{"滨州市":1090},{"菏泽市":1099},{"日照市":1108},{"泰安市":1112}],"14":[{"黄山市":1151},{"滁州市":1159},{"阜阳市":1167},{"亳州市":1174},{"宿州市":1180},{"池州市":1201},{"六安市":1206},{"宣城市":2971},{"铜陵市":1114},{"合肥市":1116},{"淮南市":1121},{"淮北市":1124},{"芜湖市":1127},{"蚌埠市":1132},{"马鞍山市":1137},{"安庆市":1140}],"15":[{"宁波市":1158},{"衢州市":1273},{"丽水市":1280},{"台州市":1290},{"舟山市":1298},{"杭州市":1213},{"温州市":1233},{"嘉兴市":1243},{"湖州市":1250},{"绍兴市":1255},{"金华市":1262}],"16":[{"福州市":1303},{"厦门市":1315},{"三明市":1317},{"莆田市":1329},{"泉州市":1332},{"漳州市":1341},{"南平市":1352},{"龙岩市":1362},{"宁德市":1370}],"17":[{"孝感市":1432},{"黄冈市":1441},{"咸宁市":1458},{"恩施州":1466},{"鄂州市":1475},{"荆门市":1477},{"随州市":1479},{"神农架林区":3154},{"武汉市":1381},{"黄石市":1387},{"襄阳市":1396},{"十堰市":1405},{"荆州市":1413},{"宜昌市":1421},{"潜江市":2922},{"天门市":2980},{"仙桃市":2983}],"18":[{"长沙市":1482},{"株洲市":1488},{"湘潭市":1495},{"韶山市":1499},{"衡阳市":1501},{"邵阳市":1511},{"岳阳市":1522},{"常德市":1530},{"张家界市":1540},{"郴州市":1544},{"益阳市":1555},{"永州市":1560},{"怀化市":1574},{"娄底市":1586},{"湘西州":1592}],"19":[{"广州市":1601},{"深圳市":1607},{"珠海市":1609},{"汕头市":1611},{"韶关市":1617},{"河源市":1627},{"梅州市":1634},{"揭阳市":1709},{"惠州市":1643},{"汕尾市":1650},{"东莞市":1655},{"中山市":1657},{"江门市":1659},{"佛山市":1666},{"阳江市":1672},{"湛江市":1677},{"茂名市":1684},{"肇庆市":1690},{"云浮市":1698},{"清远市":1704},{"潮州市":1705}],"20":[{"崇左市":3168},{"南宁市":1715},{"柳州市":1720},{"桂林市":1726},{"梧州市":1740},{"北海市":1746},{"防城港市":1749},{"钦州市":1753},{"贵港市":1757},{"玉林市":1761},{"贺州市":1792},{"百色市":1806},{"河池市":1818},{"来宾市":3044}],"21":[{"南昌市":1827},{"景德镇市":1832},{"萍乡市":1836},{"新余市":1842},{"九江市":1845},{"鹰潭市":1857},{"上饶市":1861},{"宜春市":1874},{"抚州市":1885},{"吉安市":1898},{"赣州市":1911}],"22":[{"凉山州":2103},{"成都市":1930},{"自贡市":1946},{"攀枝花市":1950},{"泸州市":1954},{"绵阳市":1960},{"德阳市":1962},{"广元市":1977},{"遂宁市":1983},{"内江市":1988},{"乐山市":1993},{"宜宾市":2005},{"广安市":2016},{"南充市":2022},{"达州市":2033},{"巴中市":2042},{"雅安市":2047},{"眉山市":2058},{"资阳市":2065},{"阿坝州":2070},{"甘孜州":2084}],"23":[{"三亚市":3690},{"文昌市":3698},{"五指山市":3699},{"临高县":3701},{"澄迈县":3702},{"定安县":3703},{"屯昌县":3704},{"昌江县":3705},{"白沙县":3706},{"琼中县":3707},{"陵水县":3708},{"保亭县":3709},{"乐东县":3710},{"三沙市":3711},{"海口市":2121},{"琼海市":3115},{"万宁市":3137},{"东方市":3173},{"儋州市":3034}],"24":[{"贵阳市":2144},{"六盘水市":2150},{"遵义市":2155},{"铜仁市":2169},{"毕节市":2180},{"安顺市":2189},{"黔西南州":2196},{"黔东南州":2205},{"黔南州":2222}],"25":[{"迪庆州":4108},{"昆明市":2235},{"曲靖市":2247},{"玉溪市":2258},{"昭通市":2270},{"普洱市":2281},{"临沧市":2291},{"保山市":2298},{"丽江市":2304},{"文山州":2309},{"红河州":2318},{"西双版纳州":2332},{"楚雄州":2336},{"大理州":2347},{"德宏州":2360},{"怒江州":2366}],"26":[{"阿里地区":3970},{"林芝地区":3971},{"拉萨市":2951},{"那曲地区":3107},{"山南地区":3129},{"昌都地区":3138},{"日喀则地区":3144}],"27":[{"延安市":2428},{"汉中市":2442},{"榆林市":2454},{"商洛市":2468},{"安康市":2476},{"西安市":2376},{"铜川市":2386},{"宝鸡市":2390},{"咸阳市":2402},{"渭南市":2416}],"28":[{"庆阳市":2525},{"陇南市":2534},{"武威市":2544},{"张掖市":2549},{"酒泉市":2556},{"甘南州":2564},{"临夏州":2573},{"定西市":3080},{"兰州市":2487},{"金昌市":2492},{"白银市":2495},{"天水市":2501},{"嘉峪关市":2509},{"平凉市":2518}],"29":[{"西宁市":2580},{"海东地区":2585},{"海北州":2592},{"黄南州":2597},{"海南州":2603},{"果洛州":2605},{"玉树州":2612},{"海西州":2620}],"30":[{"银川市":2628},{"石嘴山市":2632},{"吴忠市":2637},{"固原市":2644},{"中卫市":3071}],"31":[{"五家渠市":4110},{"阿拉尔市":15945},{"图木舒克市":15946},{"乌鲁木齐市":2652},{"克拉玛依市":2654},{"石河子市":2656},{"吐鲁番地区":2658},{"哈密地区":2662},{"和田地区":2666},{"阿克苏地区":2675},{"喀什地区":2686},{"克孜勒苏州":2699},{"巴音郭楞州":2704},{"昌吉州":2714},{"博尔塔拉州":2723},{"伊犁州":2727},{"塔城地区":2736},{"阿勒泰地区":2744}],"32":[{"台湾市":2768}],"42":[{"香港特别行政区":2754}],"43":[{"澳门市":2770}],"84":[{"钓鱼岛":1310}]}
        //区县,格式同city
        ,area: {},
        //服务器(.jd.com)的COOKIE,是一个对象{addr:"*-*-*-*"}
        serverLocal : null,
        provinceList : null
    };

    //把压缩过的数据转为带格式的数据
    cache.city = (function(){
        var list = {};
        $.each(cache.city, function(k,v){
            var l = [];
            $.each(v, function(i,vv){
                var nv = {};
                for( var vvk in vv ) {
                    nv['id'] = vv[vvk];
                    nv['name'] = vvk;
                }
                l.push(nv);
            });
            list[k] = l;
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

    function getDTArea(id, callback) {
        var areaData = cache.area[id];
        if ( areaData && $.isFunction(callback) ) {
            callback(id, areaData);
        } else {
            $.getJSON(url+id+'&callback=?', function(result){
                var data = [];
                if ( !isBlank(result) ) {
                    cache.area[id] = data = result;
                }
                if ( $.isFunction(callback) ) {
                    callback(id, data);
                }
            });
        }
    }

    //通过格式 省-市-区-县 ID序列获取对应地区
    function changeAreaByIdSeq(str, scopeLevel, callback, needAutoFill, process){
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
        var tasks = [];
        var list = str.split('-');

        //如果省份数据为0，则使用默认地区
        if ( list[0] == 0 ) {
            list = defaultLocal;
        }

        //补齐地区位数，及市区补充
        if( needAutoFill ) {
            list = replenishLevel(list, scopeLevel);
        }

        $.each(['province','city','district','town'], function(index, name){
            if ( index < scopeLevel) {
                tasks.push((function(){
                    var dtd = $.Deferred();
                    getAreaByIndex(list, index, function( area, def ){
                        //这一步是为了自动补充 district,
                        if ( !area && needAutoFill && scopeLevel > index && local.districtId == 0 ) {
                            area = def;
                        }

                        if ( area ) {
                            local[name + 'Id'] = area.id;
                            local[name + 'Name'] = area.name;
                            if (area.c) {
                                local['c'] = area.c;
                            }
                        }

                        if ($.isFunction(process)) {
                            process(local);
                        }
                        dtd.resolve();
                    }, needAutoFill);
                    return dtd.promise();
                })());
            }
        });

        $.when.apply($,tasks).always(function(){
            //这一步是为了自动补充 town,
            if ( needAutoFill && scopeLevel == 4 && local.districtId > 0 && local.townId == 0) {
                getDTArea(local.districtId, function( pid, result ){
                    if ($.isArray(result) && result.length > 0) {
                        var t = result[0];
                        local['townId'] = t.id;
                        local['townName'] = t.name;
                    }
                    callback(local);
                });
            } else {
                callback(local);
            }
        });
    }

    //补充地区级别
    function replenishLevel(list, scopeLevel){
        //补充地区位数
        if (list.length < scopeLevel ) {
            for ( var i = 0,len = scopeLevel - list.length; i < len; i++ ) {
                list.push(0);
            }
        }
        //补充市
        if ( list[1] == 0 && scopeLevel >=2 ) {
            var ps = getCityListByProvinceId(list[0]);
            if ( ps && ps.length > 0 ) {
                list[1] = ps[0].id;
            } else {
                //在同步服务器时，会返回异常数据，所以出现异常数据时，替换成默认数据
                list = defaultLocal;
            }
        }

        return list;
    }

    function getProvinceList(){
        var list = [];
        if ( cache.provinceList && cache.provinceList.length > 0 ) {
            list = cache.provinceList;
        } else {
            for( var k in cache.province ) {
                list.push({id: cache.province[k].id, name: k});
            }
            cache.provinceList = list;
        }
        return list;
    }

    function getProvince( id ){
        var area = null;
        var isDefault = 1;
        $.each(cache.province, function(key, value){
            if ( value.id == id || defaultLocal[0] == value.id) {
                //在匹配过程中加入对初始值的匹配，但最终以设置的为主
                area = {id: id, name: key, c: value.c, z: value.z};
                if ( value.id == id ) {
                    isDefault = 0;
                    return false;
                }
            }
        });
        return {value:area,isDefault:isDefault};
    }

    function getCityListByProvinceId( id ){
        var list = [];
        $.each(cache.city, function(key, value){
            if ( id == key ) {
                list = value;
                return false;
            }
        });
        return list;
    }

    function getCity( id ){
        var area = null;
        var isDefault = 1;
        $.each(cache.city, function(key, value){
            var on = true;
            $.each(value, function(idx, v){
                if ( v.id == id || (!area && key == defaultLocal[1] )) {
                    //在匹配过程中加入对初始值（初始值规则:本省第一个城市）的匹配，但最终以设置的为主
                    area = {id: id, name: v.name};
                    if ( v.id == id ) {
                        isDefault = 0;
                        return on = false;
                    }
                }
            });
            if ( !on ) return on;
        });
        return {value:area,isDefault:isDefault};
    }


//     *
//     * @param list
//     * @param index
//     * @param callback
//     * @param hasDefault 为true 时，如果获取了数据中，没有指定的，则输出数据第一个。
//     * @returns {boolean}
    function getAreaByIndex(list, index, callback, hasDefault){
        var _area = null;
        if ( list.length > index ) {
            var id = list[index];
            switch (index){
                case 0 ://省
                var _pro = getProvince(id);
                    _area = _pro.value;
                    if ( _pro.isDefault ) {//如果省是获取的默认值，则市区县等将获取默认值
                        list = defaultLocal;
                    }
                    break;
                case 1 ://市
                _area = getCity(id).value;
                    break;
                default ://区县从服务器或缓存获取
                    if ( list[index-1] > 0 ) {
                        getDTArea(list[index-1], function(pid, result){
                            var def = null;
                            $.each(result, function(idx, v){
                                if ( idx == 0 ) {
                                    def = {id: v.id, name: v.name};
                                }
                                if ( v.id == id ) {
                                    _area = {id: v.id, name: v.name};
                                    return false;
                                }
                            });

                            if ( hasDefault ) {
                                callback(_area, def);
                            } else {
                                callback(_area);
                            }
                        });
                    } else {
                        callback();
                    }
                    return false;
            }
        }
        callback(_area);
    }

//    /**
//     * 加载本机地区位置
//     * 五种数据源的优先级排序
//     * opt.initArea > syncServer > cookie > opt.defaultArea > defaultLocal(allLocal)
//     * */
    function loadLocal(opt, callback, process){
        var _default = opt.initArea || cookie(opt.cookieMapping.allLocal)|| opt.defaultArea || allLocal;
        if ( isBlank(opt.initArea) && opt.syncServer ) {
            server.sync(function(result){
                var adds = (result && result.adds) || _default;
                changeAreaByIdSeq(adds || _default, opt.scopeLevel, callback, opt.repLevel, process);
            });
        } else {
            changeAreaByIdSeq(_default, opt.scopeLevel, callback, opt.repLevel, process);
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

    function localObjectToValidList(local){
        var list = [];
        $.each(localObjectToList(local), function(idx, v){
            if ( !isBlank(v.id) && v.id != 0 ) {
                list.push({id: v.id, name: v.name});
            }
        });
        return list;
    }

    function longAreaNameProcess(tplItem, area ){
        var className = null;
        if ( area.name.length > 12 ) {
            className = 'longer-area';
        } else
        if (area.name.length > 5){
            className = 'long-area';
        }

        if ( className ) {
            tplItem = $('<div/>').html($(tplItem).addClass(className)).html();
            tplItem = tplItem.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
        }

        //支持自动设置item
        if ( area.tpl ) {
            return $.tpl(area.tpl, area);
        }

        return $.tpl(tplItem, area);
    }

    function renderContentTab(list, tpl){
        var html = [];
        $.each(list,function(idx, value){
            if ( !isBlank(value, value.id) && value.id != 0 ) {
                html.push($.tpl(tpl, value));
            }
        });
        return html.join('');
    }

    function renderProvinceList(tplWrap, tplItem, index){
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
            html.push(longAreaNameProcess(tplItem, value));
        });
        return $.tpl(tplWrap, {list:html.join(''), index:index});
    }

    function renderCityList(tplWrap, tplItem, id, index){
        var html = [];
        var list = getCityListByProvinceId(id);
        $.each(list, function(idx, value){
            html.push(longAreaNameProcess(tplItem, value));
        });
        return $.tpl(tplWrap, {list:html.join(''), index:index});
    }

    function renderDTAreaListAsync(tplWrap, tplItem, id, index, callback){
        getDTArea(id, function( _id, result ){
            var html = [];
            if ($.isArray(result)) {
                $.each(result, function(idx, value){
                    html.push(longAreaNameProcess(tplItem, value));
                });
            }
            if ($.isFunction(callback)){
                callback($.tpl(tplWrap, {list:html.join(''), index:index}));
            }
        });
    }

    function bindAreaSelectEvent(){
        var self = this;
        var box = self.el;
        var opts = self.options;
        var sOpt = opts.switchable;
        var optCss = opts.className;
        $('.'+optCss.content_content, box)
            .undelegate('a[data-id]', 'click')
            .delegate('a[data-id]', 'click', function(event){
                //兼容IE6在a.click中，误以为页面要离开，从而中断所有请求;
                event.preventDefault();

                var _t = $(this);
                var content = _t.closest('.'+sOpt.mainClass);

                var levelIndex = parseInt( content.data('index') );
                var currentArea = {id:_t.data('id'), name:_t.html()};
                var selectLocal = saveSelectedLocal(box, currentArea.id, levelIndex);
                var callback;

                var hasMunicipality = false;
                var hasNext = false;
                //检查是否直辖市
                if ( opts.openMunicipality && selectLocal ) {
                    hasMunicipality = checkMunicipality(selectLocal.split('-')[0]);
                }

                if ( hasMunicipality && levelIndex + 2 >= opts.scopeLevel ) {
                    hasNext = false;
                } else
                if ( levelIndex + 1 < opts.scopeLevel ) {
                    hasNext = true;
                }

                if ( hasNext ) {
                    callback = function( local ){
                        //如果为1，说明要加载数据，控制面板则不隐藏
                        box.data('isLoadingData', true);
                        drawSelectAreaContent.call(self, local, levelIndex+1);
                    };
                } else {

                    callback = function(local){
                        //如果为0，说明加载完数据，控制面板可以隐藏
                        if ( opts.selectedClose ) {
                            showAreaContent.call(self, false);
                        }
                        drawSelectAreaText.call(self, local);
                        if ($.isFunction(opts.onChange)){
                            opts.onChange.call(box, currentArea, local);
                        }
                        if ( opts.writeCookie ) {
                            writeCookie(opts, local.provinceId, selectLocal);
                        }
                        if ( opts.syncServer && opts.writeServer ) {
                            writeServer(selectLocal, local.provinceId);
                        }

                        //选择了之后重绘，主要用于修改 请选择 标签， 此性能有待优先
                        drawSelectAreaContent.call(self,local, opts.scopeLevel);

                        ////选择了之后修改 请选择 标签
                        //var tabBox = _t.closest('.'+optCss.content).find('.'+optCss.content_tab);
                        //tabBox.find('.'+sOpt.navSelectedClass).remove();
                        //tabBox.append($($.tpl(sOpt.tplTab, currentArea)).addClass(sOpt.navSelectedClass));
                    };
                }
                changeAreaByIdSeq(selectLocal, levelIndex + 1, callback);
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

    /**
     * 通过ID检查是否直辖市
     */
    function checkMunicipality( pid ){
        var _zxs = getProvince(pid).value;
        return _zxs && _zxs.z == 1;
    }

//    /***
//     * 修正跳出框的位置，避免超过屏幕边界
//     * 说明：目前仅支持左右两边超出边框修复
//     */
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

//    /***
//     * 校正选择索引
//     * @param local
//     * @param selectIndex
//     */
    function reviseSelectIndex(local, selectIndex){
        var self = this;
        var scopeLevel = self.options.scopeLevel;
        var list = convertAreaIdList(local);
        var allowIndex = 0;

        //选择索引不能大于限制层级
        if ( selectIndex >= scopeLevel ) {
            selectIndex = scopeLevel - 1;
        }

        $.each(list, function(i,v){
            if ( v > 0 ) {
                allowIndex = i + 1;
            } else {
                return false;
            }
        });
        if ( selectIndex == -1 ) {
            if ( scopeLevel > allowIndex ) {
                return allowIndex;
            }
            return scopeLevel - 1;
        }

        return selectIndex;
    }

//    /***
//     * 修正标签页显示数据，及默认显示内容的索引
//     * @param local
//     * @param selectIndex
//     * @returns {list:list,index:index}
//     */
    function reviseTabListData(local, selectIndex){
        var self = this;
        var opts = self.options;
        var list = localObjectToValidList(local);
        var selectOption = {id:-1,name:opts.selectTip};
        if ( selectIndex > -1 ) {
            if ( selectIndex < opts.scopeLevel ) {
                list.push(selectOption);
            }
        } else {
            selectIndex = opts.scopeLevel - 1;
            //修正数据没有限制层级大时，标签页补上一个
            if ( selectIndex == 2 && local.districtId == 0 ) {
                list.push(selectOption);
            } else
            if ( selectIndex == 3 && local.townId == 0 ) {
                list.push(selectOption);
            }
        }

        if ( opts.scopeLevel < 2 ) {
            list = [];
            $(self.css.content_tab).hide();
        } else {
            $(self.css.content_tab).show();
        }

        if ( opts.openMunicipality && checkMunicipality(local.provinceId) ) {
            if ( opts.scopeLevel == selectIndex || list.length == opts.scopeLevel) {
                selectIndex --;
                if ( list.length == opts.scopeLevel ) {
                    list.pop();
                }
            }
            if ( list.length <= 1 ) {
                list = [];
                $(self.css.content_tab).hide();
            }
        }

        return list;
    }

    function drawSelectAreaContent(local, selectIndex){
        var self = this;
        var box = self.el;
        var opts = self.options;
        var tasks = [];
        var tasksResult = [];
        var loading = null;
        var sOpt = opts.switchable;
        var contentWrap = sOpt.tplContentWrap;
        var contentItem = sOpt.tplContentItem;
        var content = $(self.css.content_content).html(renderProvinceList.call(self, contentWrap, contentItem, 0));
        var newIndex = reviseSelectIndex.call(self, local, selectIndex);
        var list = reviseTabListData.call(self, local, selectIndex);
        var tabHtml = renderContentTab(list, sOpt.tplTab);
        var scopeLevel = opts.scopeLevel;

        // selectIndex = -1 为初始化进入，需要保存当前地区
        if ( selectIndex == -1 ) {
            saveSelectedLocal(box, local);
        }

        if ( opts.openMunicipality && checkMunicipality(local.provinceId) ) {
            if ( newIndex + 1 == opts.scopeLevel || selectIndex == -1) {
                newIndex --;
            }
        }

        //添加市
        if ( scopeLevel > 1 ) {
            content.append(renderCityList(contentWrap, contentItem, local.provinceId, 1));
        }

        sOpt.defaultPanel = selectIndex = newIndex;
        if ( selectIndex > 1 ) {
            if ( opts.showLoading ) {
                loading = $($.tpl(contentWrap, {list:opts.loadingHtml,index:-1}));
                sOpt.defaultPanel = 2;
                content.append(loading);
                $(self.css.content_tab).html(tabHtml);
                $(self.css.content).switchable(sOpt);
            }

            var cdIds = [];
            if ( scopeLevel > 2 ) {//区
                cdIds.push(local.cityId);
            }
            if ( scopeLevel > 3 ) {//县
                cdIds.push(local.districtId);
            }
            //异步执行区县,最终结果按顺序输出
            $.each(cdIds, function(idx, id){
                if ( !isBlank(id) && id > 0 ) {
                    tasks.push((function(){
                        var dtd = $.Deferred();
                        renderDTAreaListAsync(contentWrap, contentItem, id, 2+idx, function( html ){
                            tasksResult[idx] = html;
                            dtd.resolve();
                        });
                        return dtd.promise();
                    })());
                }
            });
        }

        $.when.apply($,tasks).always(function(){
            if ( loading ) {
                loading.remove();
                sOpt.defaultPanel = selectIndex;
            }

            $.each(tasksResult, function(idx, value){
                content.append(value);
            });
            bindAreaSelectEvent.call(self, opts);
            $(self.css.content_tab).html(tabHtml);
            $(self.css.content).switchable(sOpt);

            //延迟，避免在IE8中，地区选择框会消失
            setTimeout(function(){box.data('isLoadingData', false);},100);
        });

    }

    function drawSelectAreaText(local){
        var self = this;
        var opts = self.options;
        var names = [], ids = [];
        localObjectToArray(local, ids, names);
        if ( opts.openMunicipality && checkMunicipality(ids[0])) {
            ids.length = names.length = opts.scopeLevel - 1;
        }
        ids = ids.join('-');
        names = names.join('');
        $(self.css.text_text).html(names).attr('data-id',ids).attr('title',names);
    }

//    /**把options.cssName 中的内容转为全路径，方便使用
//     * 格式：
//     * {
//        hover:'ui-area-hover',
//        text:'ui-area-text-wrap',
//        text_text:'ui-area-text',
//        content:'ui-area-content-wrap',
//        content_tab:'ui-area-tab',
//        content_content:'ui-area-content',
//        content_content_list:'ui-area-content-list'
//        close:'ui-area-close',
//        }
//     * 转换后：
//     * {
//            hover:'#id .ui-area-hover',
//            text:'#id .ui-area-text-wrap',
//            text_text:'#id .ui-area-text-wrap .ui-area-text',
//            content:'#id .ui-area-content-wrap',
//            content_tab:'#id .ui-area-content-wrap .ui-area-tab',
//            content_content:'#id .ui-area-content-wrap .ui-area-content',
//            content_content_list:'#id .ui-area-content-wrap .ui-area-content .ui-area-content-list'
//            close:'#id .ui-area-close',
//        }
//     *  其中name_name 中的 ‘_’ 为层级关系
//     * */
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

    $.ui.define('area', {
        options: {
            hasCssLink:true,
            baseVersion:'1.0.0',
            cssLinkVersion:'1.0.0',

            //同步服务器
            syncServer: false,
            //展示层级 1-4
            scopeLevel: 3,
//            /**自动补充地区
//             * 如果scopeLevel=4，而数据只有省，则市、区、县将自动获取第一位，
//             * 说明：补充的数据不会同步到服务器或COOKIE中，仅作为显示和操作
//             * */
            openMunicipality: false,//开启直辖市，在展示层级大于1级时，直辖市选择会少一层级别
            repLevel:true,
//            //设置地区位置-数据源优先级最高
//             * 格式：1-0-0-0 （省ID-市ID-区ID-县ID）
//             * 如果只有省和市ID，那区和县ID设为0，如：1-0-0-0、1-72-0-0
//             * 不允许头和中间为空，如：0-1-0-0、1-0-23-0
//             *
//             * 五种数据源的优先级排序
//             * opt.initArea > sever > cookie > opt.defaultArea > defaultLocal(allLocal)
//             * */
            initArea: null,
//            /**
//             * 默认值地区-数据源优先级低(上面有介绍)
//             * 格式：同initArea
//             * **/
            defaultArea:null,
            provinceList:null,//省份地区数据
            provinceExtend:true,//在原数据基本中扩展
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
                hover:'ui-area-hover',
                text:'ui-area-text-wrap',
                text_text:'ui-area-text',
                content:'ui-area-content-wrap',
                close:'ui-area-close',
                content_tab:'ui-area-tab',
                content_content:'ui-area-content',
                content_content_list:'ui-area-content-list'
            },
            selectTip:'请选择',
            switchable: {
                navItem:'ui-switchable-item',
                navSelectedClass:'ui-area-current',
                mainClass:'ui-switchable-panel',
                mainSelectedClass:'ui-switchable-panel-selected',
                event:'click',
                delay:0,
                tplTab: '<a class="ui-switchable-item" data-id="<%=id%>"><em><%=name%></em><i></i></a>',
                tplContentWrap: '<div style="display: none;" class="ui-switchable-panel" data-index="<%=index%>"><ul class="ui-area-content-list"><%=list%></ul></div>',
                tplContentItem: '<li><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></li>'
            },
            showLoading:true,
            loadingHtml: '<div style="text-align: center; line-height: 60px;height: 60px;"><img src="http://misc.360buyimg.com/201007/skin/df/i/loading.gif"/></div>',
//            /**
//             * 支持两种选择 hover 和 click
//             * hover : 默认值
//             * 鼠标移到text时显示，离开则隐藏
//             *
//             * click：
//             * 鼠标点击时显示,鼠标离开时消失
//             *
//             * */
            event:'hover',
//            /***
//             * @return
//             * this = {
//             *      el:this.el,
//             *      options:this.options
//             * };
//             * arguments[0] = {
//                    provinceId : 0,
//                    provinceName : '',
//                    cityId: 0,
//                    cityName: '',
//                    districtId: 0,
//                    districtName: '',
//                    townId: 0,
//                    townName: ''
//                }
//             */
            //初始化完成后回调*
            onReady: null,
//            /***
//             * @return
//             *  this = this.el;
//             *
//             *  arguments[0] = {
//                    id : 0,
//                    name: ''
//                };
//                arguments[1] = {
//                    provinceId : 0,
//                    provinceName : '',
//                    cityId: 0,
//                    cityName: '',
//                    districtId: 0,
//                    districtName: '',
//                    townId: 0,
//                    townName: ''
//                };
//             */
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
            //地区最多支持4联级
            if ( opts.scopeLevel > 4 ) {
                opts.scopeLevel = 4;
            }

            //一级时，不开启直辖市
            if ( opts.scopeLevel == 1 && opts.openMunicipality ) {
                opts.openMunicipality = false;
            }

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
                    if ( box.data('isLoadingData') == false ) {
                        showAreaContent.call(self, false);
                    }
                });

                //绑定关闭图标事件*
                $(self.css.close).bind('click',function(){
                    showAreaContent.call(self, false);
                });

                //*当显示4个地区时，把div.content的宽度再放大
                if ( opts.scopeLevel == 4) {
                    $(self.css.content).css({width:'420px'});
                }

                //加载及绘制完成后执行回调*
                if ($.isFunction(opts.onReady)){
                    opts.onReady.call({el:box,options:opts}, local);
                }
            }, function(local){
                drawSelectAreaText.call(self, local);
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