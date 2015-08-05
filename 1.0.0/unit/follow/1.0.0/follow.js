define(function(require,exports,module){
	var jdLogin = require('jdf/1.0.0/unit/login/1.0.0/login.js');
	var dialog = require('jdf/1.0.0/ui/dialog/1.0.0/dialog.js');
	/**
	* @关注商品
	* @依赖 dialog组件
	* @举例
		<button data-id="1027342" class="coll">关注商品</button>
		seajs.use('jdf/1.0.0/unit/follow/follow.js',function(follow){
			follow.init($('.coll'));
			//或者 follow.add(1027342);
		})
	*/

	function init(el){
		 bind(el);
	}

	function bind(el){
		 el.live("click", function(e) {
		 	e.preventDefault();
			var current = $(this);
			var productId = current.attr("data-id");
			add(productId);
		});
	}

	function add(productId, callback){
		 //var serviceUrl = "http://t."+ pageConfig.FN_getDomain() +"/regard/follow.action?callback=?";
		var serviceUrl = 'http://t.jd.com/product/followProduct.action?productId=' + productId;

        callback = callback || function() {};
		jdLogin({
			clstag1: "login|keycount|5|3",
			clstag2: "login|keycount|5|4",
			id: productId,
			modal: true,
			complete: function() {
				$('body').dialog({
					title:'提示',
					width:530,
					height : 440,
					type:'iframe',
					autoIframe: false,
					fixed : !($.browser.msie && $.browser.version == 6),
					source: serviceUrl + "&t=" + Math.random(),
					mainId:'attboxr',
					contentId:'attconr',
					onReady: callback
				});
			}
		})
	}

    /*--- Usage:
    follow.check([1379839787,1379839794,1379838583], function (sku, isFollowed) {
        console.log(sku + '----' + isFollowed);
    });
    */
    function check(skus, callback) {
        var skuids = skus || [];

        callback = callback || function() {};

        // test case
        //if ( /isdebug/.test(location.href) ) {
            //skuids = [1379839787,1379839794,1379838583];
        //}

        $.ajax({
            url: 'http://follow.soa.jd.com/product/batchIsFollow?',
            data: {
                productIds: skuids.join(',')
            },
            dataType: 'jsonp',
            success: function(r) {
                function loopCallback(result) {
                    for ( var k in result) {
                        if ( result.hasOwnProperty(k) ) {
                            callback(k, result[k]);
                        }
                    }
                }

                if ( r && r.success ) {
                    loopCallback(r.data)
                } else if (r.code !== 'F10002') {
                    // 非登录情况抛出异常
                    throw new Error(r.msg);
                }
            }
        });
    }

	exports.init = init;
	exports.add = add;
	exports.check = check;
});
