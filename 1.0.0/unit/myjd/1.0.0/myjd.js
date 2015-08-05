define(function(require,exports,module){
	var jdLogin = require('jdf/1.0.0/unit/login/1.0.0/login.js');
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	var getjsonp = require('jdf/1.0.0/unit/getjsonp/1.0.0/getjsonp.js');
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');
	var GlobalReco = require('jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js');

	//格式化字符串
	pageConfig.FN_StringFormat=function(){
		var a = arguments[0],
			c = arguments.length;
		if (c > 0) {
			for (var b = 0; b < c; b++) {
				a = a.replace(new RegExp("\\{" + b + "\\}", "g"), arguments[b+1]);
			}
		}
		return a;
	};

	/**
	* @我的京东
	* @update 2014-1-15 18:36:17 修正未登陆不执行 FN_InitOList
	*/
	var UC={
		//2014-1-6 10:53:04 修正
		init:function(){
			var me = this;
			var _my360buy=document.getElementById("my360buy")?$("#my360buy"):$("#my360buy-2013");
			if (_my360buy) {
				_my360buy.find('dl').dropdown({
					enterDelay:100,
					trigger:true,
					current:'hover',
					onchange:function(object){
						if(object.attr("load")) return;
                        
                        function setBaitiaoLink(fn) {
                            $.ajax({
                                url: 'http://api.credit.wangyin.com/veyron/query/queryCreditJsonp',
                                type:'get',
                                dataType:'jsonp',
                                data: {
                                    platform: 1,
                                    userId: readCookie('pin'),
                                    productId: -1
                                },
                                success:function(r){
                                    //productId: 3  是金采
                                    //productId: 1  是白条
                                    //activatedStatus 0 未激活
                                    //activatedStatus 1 激活
                                    if ( r && r[0]  ) {
                                        fn(r[0].productId);
                                    }
                                }
                            });
                        }
                        
						jdLogin({
							automatic: true,
							complete: function(data) {
								if(!data)return;
								var element=object.find("dd").eq(0),
									html="";
								var hasLogin = data.Identity.IsAuthenticated;
								if(hasLogin){
									//登陆了
									html+=UC.TPL_Regist.process(data.Identity);
									html+=UC.TPL_OList.placeholder;
									html+=UC.TPL_UList;
								}else{
									//未登陆
									html+=UC.TPL_UnRegist;
									html+=UC.TPL_UList;
								}

								//if(vlist){
									html+=UC.TPL_VList.placeholder;
								//}
								element.html(html);

                                if ( readCookie('pin') ) {
                                    setBaitiaoLink(function(r) {
                                        if ( r == '3' ) {
                                            element.find('.J_jincai').show();
                                        } else {
                                            element.find('.J_baitiao').show();
                                        }
                                    });
                                } else {
                                    element.find('.J_baitiao').show();
                                }
                                
								//控制访问频率
								object.attr("load","1");
								setTimeout(function(){
									object.removeAttr("load");
								},60000);

								if (hasLogin) {
									UC.FN_InitOList();
								}
                                
                                // 显示最近浏览
                                UC.FN_InitRecent();
							}
						});
					}
				});
			}
		},
		DATA_Cookie:"aview",
		TPL_UnRegist:"<div class=\"prompt\">\
				<span class=\"fl\">您好，请<a href=\"javascript:login()\" clstag=\"homepage|keycount|home2013|04a\">登录</a></span>\
				<span class=\"fr\"></span>\
			</div>",
		TPL_Regist:"<div class=\"prompt\">\
					<span class=\"fl\"><strong>${Unick}</strong></span>\
					<span class=\"fr\"><a href=\"http://home.jd.com/\">去我的京东首页&nbsp;&gt;</a></span>\
				</div>",
		TPL_OList:{
			placeholder:"<div id=\"jduc-orderlist\"></div>",
			fragment:"<div class=\"orderlist\">\
					<div class=\"smt\">\
						<h4>最新订单状态：</h4>\
						<div class=\"extra\"><a href=\"http://order.jd.com/center/list.action\" target=\"_blank\">查看所有订单&nbsp;&gt;</a></div>\
					</div>\
					<div class=\"smc\">\
						<ul>\
							{for item in orderList}\
							<li class=\"fore${parseInt(item_index)+1}\">\
								<div class=\"p-img fl\">\
									{for image in item.OrderDetail}\
										{if image_index<2}\
											<a href=\"http://www.jd.com/product/${image.ProductId}.html\" target=\"_blank\"><img src=\"${pageConfig.FN_GetImageDomain(image.ProductId)}n5/${image.ImgUrl}\" width=\"50\" height=\"50\" alt=\"${image.ProductName}\" /></a>\
										{/if}\
									{/for}\
									{if item.OrderDetail.length>2}\
										<a href=\"${item.passKeyUrl}\" target=\"_blank\" class=\"more\">更多</a>\
									{/if}\
								</div>\
								<div class=\"p-detail fr\">\
									订单号：${item.OrderId}<br />\
									状　态：<span>${UC.FN_SetState(item.OrderState)}</span><br />\
									　　　　<a href=\"${item.passKeyUrl}\">查看详情</a>\
								</div>\
							</li>\
							{/for}\
						</ul>\
					</div>\
				</div>"
		},
        TPL_UList:"<div class=\"uclist\">\
                <ul class=\"fore1 fl\">\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04b\" href=\"http://order.jd.com/center/list.action\">待处理订单<span id=\"num-unfinishedorder\"></span></a></li>\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04c\" href=\"http://club.jd.com/myjd/userConsultationList_1.html\">咨询回复<span id=\"num-consultation\"></span></a></li>\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04d\" href=\"http://t.jd.com/product/followProductList.action?isReduce=true\">降价商品<span id=\"num-reduction\"></span></a></li>\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|shouhou\" href=\"http://myjd.jd.com/repair/orderlist.action\">返修退换货</a></li>\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04e\" href=\"http://quan.jd.com/user_quan.action\">优惠券<span id=\"num-ticket\"></span></a></li>\
                </ul>\
                <ul class=\"fore2 fl\">\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04i\" href=\"http://t.jd.com/home/follow\">我的关注&nbsp;&gt;</a></li>\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|04g\" href=\"http://bean.jd.com/myJingBean/list\">我的京豆&nbsp;&gt;</a></li>\
                    <li><a target=\"_blank\" clstag=\"homepage|keycount|home2013|licai\" href=\"http://trade.jr.jd.com/centre/browse.action\">我的理财&nbsp;&gt;</a></li>\
                    <li class=\"J_baitiao hide\"><a target=\"_blank\" clstag=\"homepage|keycount|home2013|baitiao\" href=\"http://baitiao.jd.com/creditUser/list\">我的白条&nbsp;&gt;</a></li>\
                    <li class=\"J_jincai hide\"><a target=\"_blank\" clstag=\"homepage|keycount|home2013|jincai\" href=\"http://baitiao.jd.com/jinCai/record\">京东金采&nbsp;&gt;</a></li>\
                </ul>\
            </div>",
        TPL_VList:{
            placeholder:"<div class=\"viewlist\">\
                    <div class=\"smt\" clstag=\"homepage|keycount|home2013|04k\">\
                        <h4>最近浏览的商品：</h4>\
                        <div style=\"float:right;padding-right:9px;\"><a style=\"border:0;color:#005EA7\" href=\"http://my.jd.com/history/list.html\" target=\"_blank\">查看浏览历史&nbsp;&gt;</a></div>\
                    </div>\
                    <div class=\"smc\" id=\"jduc-viewlist\" clstag=\"homepage|keycount|home2013|04j\">\
                        <div class=\"loading-style1\"><b></b>加载中，请稍候...</div>\
                        <ul class=\"lh hide\"></ul>\
                    </div>\
                </div>",
            fragment:"<ul class=\"lh\">{for item in data}<li data-clk=\"${item.clk}\"><a href=\"http://item.jd.com/${item.sku}.html\" target=\"_blank\" title=\"${item.t}\"><img src=\"${pageConfig.FN_GetImageDomain(item.sku)}n5/${item.img}\" width=\"50\" height=\"50\" alt=\"${item.t}\" /></a></li>{/for}</ul>"
        },
		FN_SetState:function(word){
			var word=word;
			if(word.length>4){
				word="<span title="+word+">"+word.substr(0,4)+"...</span>"
			}
			return word;
		},
        FN_InitRecent: function() {
            // 迷你我我的京东 最近浏览

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
        },
		FN_ShowVList:function(data){
			if (!data) {
				return;
			}
			var loading=$("#jduc-viewlist").find(".loading-style1");
			data.length = data.length > 5 ? 5 : data.length;
			var resData = { list: data };

			if(loading.length>0){
				loading.hide();
			}
			var html=this.TPL_VList.fragment.process(resData);
			$("#jduc-viewlist").find("ul").eq(0).html(html).show();
		},
		FN_setWords:function(num){
			var html="<font style=\"color:{0}\">({1})</font>",
				color="";
			if(num==0){
				color="#ccc";
			}else{
				color="#c00";
			}
			return pageConfig.FN_StringFormat(html,color,num)
		},
		FN_InitOList:function(){
			//initOrderlist
			$.ajax({
				//url:"http://minijd.360buy.com/getOrderList",
				url:"http://minijd.jd.com/getOrderList",
				dataType:"jsonp",
				//timeout:5,
				success:function(json){
					if(json&&json.error==0&&json.orderList){
						var html=UC.TPL_OList.fragment.process(json);
						try {
							$("#jduc-orderlist").html(html);
						} catch (e) {}
					}
				}
			});

			/**
			 * @待处理订单
			 * @接口人 : weishi@jd.com
			 */
			$.ajax({
				//url : "http://minijd.360buy.com/getHomeCount",
				url : "http://minijd.jd.com/getHomeCount",
				dataType : "jsonp",
				success : function(json) {
					if (json && json.error==0) {
						$("#num-unfinishedorder").html(UC.FN_setWords(json.orderCount));
					}
				}
			});

			//咨询回复
			$.ajax({
				url:"http://comm.360buy.com/index.php?mod=Consultation&action=havingReplyCount",
				dataType : "jsonp",
				success : function(json) {
					if (json) {
						$("#num-consultation").html(UC.FN_setWords(json.cnt));
					}
				}
			});

			//降价商品
			$.ajax({
				// url : "http://t.360buy.com/follow/followProductCount.action",
				url : "http://follow.soa.jd.com/product/queryForReduceProductCount.action?",
				dataType : "jsonp",
				success : function(json) {
					if (json && json.data > 0) {
						$("#num-reduction").html(UC.FN_setWords(json.data));
					}
				}
			});

			//优惠券
            $.ajax({
                //url : "http://coupon.360buy.com/service.ashx",
                url : "http://quan.jd.com/getcouponcount.action",
                //data : {
                    //m : "getcouponcount"
                //},
                dataType : "jsonp",
                success : function(json) {
                    if (json) {
                        $("#num-ticket").html(UC.FN_setWords(json.CouponCount));
                    }
                }
            });
		}
	};

	//todo需要修正接口
	window.UC = UC;

	function init(){
		UC.init();
	}
	return init;
});
