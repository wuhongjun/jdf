/* jdf-1.0.0/ myjd.js Date:2015-05-20 17:56:10 */
define("jdf/1.0.0/unit/myjd/2.0.0/myjd.js",["jdf/1.0.0/unit/login/1.0.0/login.js","jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js","jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js","jdf/1.0.0/unit/cookie/1.0.0/cookie.js"],function(require){var c=require("jdf/1.0.0/unit/login/1.0.0/login.js");require("jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js");var e=require("jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js");var f=require("jdf/1.0.0/unit/cookie/1.0.0/cookie.js");var g={init:function(){var a=$("#ttbar-myjd");a.find(".dd").html('<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>'),this.el=a,this.bind()},bind:function(){var b=this;this.el.dropdown({enterDelay:100,trigger:!0,current:"hover",onchange:function(a){a.attr("data-load")||(a.attr("data-load",1),b.checkLoginInit())}})},checkLoginInit:function(){var a=this;c({automatic:!0,complete:function(b){if(b){var c="";b.Identity.IsAuthenticated?(c=a.tpl(1,b.Identity.Unick),a.hasLoginInit()):c=a.tpl(0,""),a.el.find(".dd").html(c),a.viewlist(),a.baitiaoInit()}}})},tpl:function(a,b){var c="http://misc.360buyimg.com/lib/img/e/blank.gif";var d='<div class="u-name"><a href="http://home.jd.com/">'+b+"</a></div>";0==a&&(c="http://i.jd.com/commons/img/no-img_mid_.jpg",d='<div class="u-name u-login"><a href="javascript:login();" class="link-login">\u4f60\u597d\uff0c\u8bf7\u767b\u5f55</a></div>');var e='					<div class="u-pic"><a href="http://home.jd.com/"><img src="'+c+'" width="60" height="60" /></a></div>'+d+'					<div class="u-extra">						<a href="http://quan.jd.com/user_quan.action" target="_blank">\u4f18\u60e0\u5238<span id="num-ticket"></span></a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;						<a href="http://joycenter.jd.com/msgCenter/queryHistoryMessage.action" target="_blank">\u6d88\u606f<span id="num-tip"></span></a>					</div>			';var f='<div class="dd-spacer"></div>				<div class="userinfo">'+e+'</div>				<div class="otherlist">					<div class="fore1">						<div class="item">							<a href="http://order.jd.com/center/list.action" clstag="" target="_blank">\u5f85\u5904\u7406\u8ba2\u5355<span id="num-unfinishedorder"></span></a>						</div>						<div class="item">							<a href="http://club.jd.com/myjd/userConsultationList_1.html" clstag="" target="_blank">\u54a8\u8be2\u56de\u590d<span id="num-consultation"></span></a>						</div>						<div class="item">							<a href="http://t.jd.com/product/followProductList.action?isReduce=true" clstag="" target="_blank">\u964d\u4ef7\u5546\u54c1<span id="num-reduction"></span></a>						</div>						<div class="item">							<a href="http://myjd.jd.com/repair/orderlist.action" clstag="" target="_blank">\u8fd4\u4fee\u9000\u6362\u8d27</a>						</div>					</div>					<div class="fore2">						<div class="item">							<a href="http://t.jd.com/home/follow" clstag="" target="_blank">\u6211\u7684\u5173\u6ce8</a>						</div>						<div class="item">							<a href="http://bean.jd.com/myJingBean/list" clstag="" target="_blank">\u6211\u7684\u4eac\u8c46</a>						</div>						<div class="item">							<a href="http://trade.jr.jd.com/centre/browse.action" clstag="" target="_blank">\u6211\u7684\u7406\u8d22</a>						</div>						<div class="item baitiao hide">							<a href="http://baitiao.jd.com/creditUser/list" clstag="njdhome|wdbaitiao" target="_blank">\u6211\u7684\u767d\u6761</a>						</div>						<div class="item jincai hide">							<a href="http://baitiao.jd.com/jinCai/record" clstag="" target="_blank">\u4eac\u4e1c\u91d1\u91c7</a>						</div>					</div>				</div>				<div class="viewlist" style="display:none;">					<div class="smt">						<h4>\u6700\u8fd1\u6d4f\u89c8</h4>						<span class="extra">							<a target="_blank" href="http://my.jd.com/history/list.html">\u66f4\u591a&nbsp;&gt;</a>						</span>					</div>					<div class="smc"></div>				</div>			';return f},hasLoginInit:function(){var a=this;$.ajax({url:"http://minijd.jd.com/getHomeCount",dataType:"jsonp",success:function(b){b&&0==b.error&&a.el.find("#num-unfinishedorder").html(a.numStyleSet(b.orderCount))}}),$.ajax({url:"http://comm.360buy.com/index.php?mod=Consultation&action=havingReplyCount",dataType:"jsonp",success:function(b){b&&a.el.find("#num-consultation").html(a.numStyleSet(b.cnt))}}),$.ajax({url:"http://follow.soa.jd.com/product/queryForReduceProductCount.action?",dataType:"jsonp",success:function(b){b&&b.data>0&&a.el.find("#num-reduction").html(a.numStyleSet(b.data))}}),$.ajax({url:"http://quan.jd.com/getcouponcount.action",dataType:"jsonp",success:function(b){b&&a.el.find("#num-ticket").html(a.numStyleSet(b.CouponCount))}}),$.ajax({url:"http://joycenter.jd.com/msgCenter/init.action",dataType:"jsonp",success:function(b){b&&"G001001"==b.result&&a.el.find("#num-tip").html(a.numStyleSet(b.msgUnreadCount))}}),$.ajax({url:"http://i.jd.com/user/petName/getUserInfoForMiniJd.action",dataType:"jsonp",success:function(b){b&&b.imgUrl&&a.el.find(".u-pic img").attr("src",b.imgUrl)}})},numStyleSet:function(a){return 0==a?"":'<span class="num" style="color:#c00">&nbsp;'+a+"</span>"},viewlist:function(){var a=this;new e({$el:$("#jduc-viewlist"),skuHooks:"SKUS_recent_view",template:"",param:{p:202001,sku:"",ck:"pin,ipLocation,atw,aview",lim:5},callback:function(b,c){if(b&&c){var d="";c=c.data,$.each(c,function(a){4>a&&(d+='<div class="item"><a href="http://item.jd.com/'+c[a].sku+'.html" target="_blank" title="'+c[a].t+'"><img src="'+pageConfig.FN_GetImageDomain(c[a].sku)+"n5/"+c[a].img+'" width="50" height="50" alt="'+c[a].t+'" /></a></div>')});var e=a.el.find(".viewlist");e.find(".smc").html(d),e.show()}}})},baitiaoInit:function(){var b=this;f("pin")?this.baitiaoLinkSet(function(a){"3"==a?b.el.find(".jincai").show():b.el.find(".baitiao").show()}):b.el.find(".baitiao").show()},baitiaoLinkSet:function(a){$.ajax({url:"http://api.credit.wangyin.com/veyron/query/queryCreditJsonp",type:"get",dataType:"jsonp",data:{platform:1,userId:f("pin"),productId:-1},success:function(b){b&&b[0]&&a(b[0].productId)}})}};function h(){g.init()}return h});
