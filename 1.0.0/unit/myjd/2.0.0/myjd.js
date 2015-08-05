define(function(require,exports,module){
	var jdLogin = require('jdf/1.0.0/unit/login/1.0.0/login.js');
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	var GlobalReco = require('jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js');
	var readCookie = require('jdf/1.0.0/unit/cookie/1.0.0/cookie.js');

	var myjd = {
		init:function(){
			var el = $('#ttbar-myjd');
			el.find('.dd').html('<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>');
			this.el = el;
			this.bind();
		},
		bind:function(el){
			var self = this;
			this.el.dropdown({
				enterDelay:100,
				trigger:true,
				current:'hover',
				onchange:function(o){
					if (!o.attr('data-load')){
						o.attr('data-load',1);
						self.checkLoginInit();
					}
				}
			});
		},
		checkLoginInit:function(){
			var self = this;
			jdLogin({
				automatic: true,
				complete: function(data) {
					if (data){
						var html = '';
						if(data.Identity.IsAuthenticated){
							//已登陆
							html = self.tpl(1, data.Identity.Unick);
							self.hasLoginInit();
						}else{
							//未登陆
							html =  self.tpl(0, '' );
						}
						self.el.find('.dd').html(html);
						self.viewlist();
						self.baitiaoInit();
					}
				}
			});
		},
		tpl:function(login, nickname){
			var userHeadImg =  'http://misc.360buyimg.com/lib/img/e/blank.gif';
			var userName = '<div class="u-name"><a href="http://home.jd.com/">'+nickname+'</a></div>';
			if(login==0){
				userHeadImg = 'http://i.jd.com/commons/img/no-img_mid_.jpg';
				userName = '<div class="u-name u-login"><a href="javascript:login();" class="link-login">你好，请登录</a></div>';
			}
			var userinfoHtml = '\
					<div class="u-pic"><a href="http://home.jd.com/"><img src="'+userHeadImg+'" width="60" height="60" /></a></div>'+userName+'\
					<div class="u-extra">\
						<a href="http://quan.jd.com/user_quan.action" target="_blank">优惠券<span id="num-ticket"></span></a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;\
						<a href="http://joycenter.jd.com/msgCenter/queryHistoryMessage.action" target="_blank">消息<span id="num-tip"></span></a>\
					</div>\
			';
						
			var html = '<div class="dd-spacer"></div>\
				<div class="userinfo">'+userinfoHtml+'</div>\
				<div class="otherlist">\
					<div class="fore1">\
						<div class="item">\
							<a href="http://order.jd.com/center/list.action" clstag="" target="_blank">待处理订单<span id="num-unfinishedorder"></span></a>\
						</div>\
						<div class="item">\
							<a href="http://club.jd.com/myjd/userConsultationList_1.html" clstag="" target="_blank">咨询回复<span id="num-consultation"></span></a>\
						</div>\
						<div class="item">\
							<a href="http://t.jd.com/product/followProductList.action?isReduce=true" clstag="" target="_blank">降价商品<span id="num-reduction"></span></a>\
						</div>\
						<div class="item">\
							<a href="http://myjd.jd.com/repair/orderlist.action" clstag="" target="_blank">返修退换货</a>\
						</div>\
					</div>\
					<div class="fore2">\
						<div class="item">\
							<a href="http://t.jd.com/home/follow" clstag="" target="_blank">我的关注</a>\
						</div>\
						<div class="item">\
							<a href="http://bean.jd.com/myJingBean/list" clstag="" target="_blank">我的京豆</a>\
						</div>\
						<div class="item">\
							<a href="http://trade.jr.jd.com/centre/browse.action" clstag="" target="_blank">我的理财</a>\
						</div>\
						<div class="item baitiao hide">\
							<a href="http://baitiao.jd.com/creditUser/list" clstag="njdhome|wdbaitiao" target="_blank">我的白条</a>\
						</div>\
						<div class="item jincai hide">\
							<a href="http://baitiao.jd.com/jinCai/record" clstag="" target="_blank">京东金采</a>\
						</div>\
					</div>\
				</div>\
				<div class="viewlist" style="display:none;">\
					<div class="smt">\
						<h4>最近浏览</h4>\
						<span class="extra">\
							<a target="_blank" href="http://my.jd.com/history/list.html">更多&nbsp;&gt;</a>\
						</span>\
					</div>\
					<div class="smc"></div>\
				</div>\
			';
			return html;
		},
		//已登陆取数字
		hasLoginInit:function(){
			var self = this;

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
						self.el.find("#num-unfinishedorder").html(self.numStyleSet(json.orderCount));
					}
				}
			});

			//咨询回复
			$.ajax({
				url:"http://comm.360buy.com/index.php?mod=Consultation&action=havingReplyCount",
				dataType : "jsonp",
				success : function(json) {
					if (json) {
						self.el.find("#num-consultation").html(self.numStyleSet(json.cnt));
					}
				}
			});

			//降价商品
			$.ajax({
				url : "http://follow.soa.jd.com/product/queryForReduceProductCount.action?",
				dataType : "jsonp",
				success : function(json) {
					if (json && json.data > 0) {
						self.el.find("#num-reduction").html(self.numStyleSet(json.data));
					}
				}
			});

			//优惠券
            $.ajax({
                url : "http://quan.jd.com/getcouponcount.action",
                dataType : "jsonp",
                success : function(json) {
                    if (json) {
                        self.el.find("#num-ticket").html(self.numStyleSet(json.CouponCount));
                    }
                }
            });
			
			/**
			 * @消息数
			 * @接口人 : yfzhoudong -> 何露
			 * @api : http://jd.com/tOG0kL
			 */
			$.ajax({
				url:'http://joycenter.jd.com/msgCenter/init.action',
				dataType : "jsonp",
				success:function(json){
					if (json && json.result == 'G001001') {
						self.el.find("#num-tip").html(self.numStyleSet(json.msgUnreadCount));
                    }
				}
			});

			/**
			 * @头像
			 * @接口人 : yfzhangliang --> lichangye
			 * @return {"realName ":aaa,"nickName ":bbb,"imgUrl ":ccc}
			 */
			 $.ajax({
				url:'http://i.jd.com/user/petName/getUserInfoForMiniJd.action',
				dataType : "jsonp",
				success:function(json){
					if (json && json.imgUrl) {
						self.el.find(".u-pic img").attr('src', json.imgUrl);
                    }
				}
			});
		},
		//数字样式设置
		numStyleSet:function(num){
			if(num == 0){
				return '';
			}
			return '<span class="num" style="color:#c00">&nbsp;'+num+'</span>';
		},
		//最近浏览
		viewlist:function(){
			var self = this;
			var reco_202001 = new GlobalReco({
				$el: $('#jduc-viewlist'),
				skuHooks: 'SKUS_recent_view',
				template: '',
				param: {
					p: 202001,
					sku: '',
					ck: 'pin,ipLocation,atw,aview',
					lim: 5
				},
				callback: function(r,data) {
					if (r && data) {
						var html = '';
						data = data.data;
						$.each(data,function(i){
							if (i<4){
								html +=    '<div class="item"><a href="http://item.jd.com/'+data[i].sku+'.html" target="_blank" title="'+data[i].t+'"><img src="'+pageConfig.FN_GetImageDomain(data[i].sku)+'n5/'+data[i].img+'" width="50" height="50" alt="'+data[i].t+'" /></a></div>';
							}
						})
						var viewlist = self.el.find('.viewlist');
						viewlist.find('.smc').html(html);
						viewlist.show();
					}
				}
         });
		},
		//白条状态
		baitiaoInit:function(el){
			var self = this;
			 if (readCookie('pin')) {
				this.baitiaoLinkSet(function(r) {
					if ( r == '3' ) {
						self.el.find('.jincai').show();
					} else {
						self.el.find('.baitiao').show();
					}
				});
			} else {
				self.el.find('.baitiao').show();
			}
		},
		baitiaoLinkSet:function(fn) {
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
	};

	function init(){
		myjd.init();
	}
	return init;
});
