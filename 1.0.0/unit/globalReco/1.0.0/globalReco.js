define(function(require,exports,module){
    /**
     * Usage:
        var reco_202001 = new GlobalReco({
            $el: $('#jduc-viewlist'),
            skuHooks: 'SKUS_recent_view',
            template: UC.TPL_VList.fragment,
            param: {
                p: 202001,
                sku: '',
                ck: 'pin,ipLocation,atw,aview',
                lim: 5
            },
            callback: function() {
            }
        });    
    */


    // 推荐系统公用对象
    var GlobalReco = function(opts) {
        // 推荐位参数
        this.param = $.extend({
            lid   : readCookie('ipLoc-djd') || '',
            lim   : 6,
            ec    : 'utf-8',
            uuid  : -1,
            pin   : readCookie('pin') || ''
        }, opts.param);

        this.$el       = opts.$el;
        this.template = opts.template;

        // 是否重组JSON结果集合，每组 n 条数据
        /*
        >> Before
        data: [
            {},
            {},
            {},
            {},
            {},
            {}
            ...
        ]
        >> After
        data: [
            {
                tabs: [{}, {}, {}]
            },
            {
                tabs: [{}, {}, {}]
            },
            ...
        ]
         */
        this.reBuildJSON = opts.reBuildJSON;

        // sku集合，挂载到pageConfig上的哪个变更
        this.skuHooks = opts.skuHooks || 'SKUS_recommend';
        this.ext = opts.ext || {};

        this.callback   = opts.callback || function() {};
        this.debug    = opts.debug;

        if ( !this.param.p ) {
            throw new Error('The param [p] is not Specificed');
        }

        this.init();
    };
    GlobalReco.prototype = {
        init: function() {
            var __jda = readCookie('__jda');

            if ( this.param.lid.indexOf('-') > 0 ) {
                this.param.lid = this.param.lid.split('-')[0];
            } else {
                this.param.lid = '1';
            }

            // split uuid
            if ( __jda ) {
                if ( __jda.split('.')[1] == '-' ) {
                    this.param.uuid = -1;
                } else {
                    this.param.uuid = __jda.split('.')[1];
                }
            } else {
                this.param.uuid = -1;
            }

            this.get(this.rid);
        },
        get: function(rid, skus) {
            var _this = this;
            var i;
            var queryParam = pageConfig.queryParam;
            var extParam = [];;

            // 1，2，3级分类
            if ( pageConfig.product ) {
                for ( i = 0; i < pageConfig.product.cat.length; i++ ) {
                    this.param['c'+(i+1)] = pageConfig.product.cat[i];
                }
            }

            if ( queryParam ) {
                for ( var k in queryParam ) {
                    if ( queryParam.hasOwnProperty(k) ) {
                        if ( k == 'c1' || k == 'c2' || k == 'c3' ) {
                            _this.param[k] = queryParam[k];
                        } else {
                            extParam.push(k + ':' + queryParam[k]);
                        }
                    }
                }
                _this.param.hi = extParam.join(',');
            }
            if ( this.debug ) {
                console.info( 'http://diviner.jd.com/diviner?' + decodeURIComponent($.param(this.param)) );
            }
            $.ajax({
                url: 'http://diviner.jd.com/diviner?' + decodeURIComponent($.param(this.param)),
                dataType: 'jsonp',
                scriptCharset: this.param.ec,
                cache: true,
                jsonpCallback: 'call' + parseInt((Math.random()*100000), 10),
                success: function(r) {
                    var hasData = !!(r.success && r && r.data && r.data.length);
                    if ( hasData ) {
                        _this.set(r);
                    } else {
                        _this.$el.html('<div class="ac">「暂无数据」</div>');
                    }
                    if ( this.debug ) {
                        console.log(r);
                    }

                    _this.callback.apply(_this, [hasData, r]);
                }
            });
        },
        set: function(data) {
            pageConfig[this.skuHooks] = [];

            // 挂载sku全局变量钩子
            data.skuHooks = this.skuHooks;

            // 扩展字段调用
            data.ext = this.ext;

            if ( this.reBuildJSON && this.reBuildJSON > 0 ) {
                data.data = tools.reBuildJSON(data.data, this.reBuildJSON);
            }

            if ( this.debug ) {
                alert(this.template.process(data));
            }
            
            try {
                this.$el.show().html(this.template.process(data));
            } catch(err) {
                if ( /isdebug/.test(location.href) && typeof console !== 'undefined' ) {
                    console.error( '[pid=' + this.param.p + '] ' + err);
                }
            }

            this.setTrackCode(data.impr);
        },
        setTrackCode: function(str) {
            var list = this.$el.find('li');
            var _this = this;
            var exParam = '&m=UA-J2011-1&ref=' + encodeURIComponent(document.referrer);

            list.each(function() {
                var clk = $(this).attr('data-clk');

                $(this).bind('click', function(e) {
                    var currTagName = $(e.target);
                    if (currTagName.is('a') || currTagName.is('img') || currTagName.is('span')) {
                        _this.newImage(clk + exParam, true);
                    }
                    if (currTagName.is('input') && currTagName.attr('checked') == true ) {
                        _this.newImage(clk + exParam, true);
                    }
                });
            });

            this.newImage(str + exParam, true);
        },
        newImage: function(src, random, callback) {
            var img = new Image();
            src = random ? (src + '&random=' + Math.random()+''+(new Date)) : src;

            img.onload = function() {
                if ( typeof callback !== 'undefined' ) {
                    callback(src);
                }
            };

            img.setAttribute('src', src);
        }
    };

    return GlobalReco;
});
