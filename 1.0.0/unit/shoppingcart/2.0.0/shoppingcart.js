define(function(require,exports,module){
	var dropdown = require('jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js');
	var trimPath = require('jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js');

	/**
	* @购物车结算
	*/
	var mcart={
		el:null,
		init:function(){
			var MCART = this;
			var amount = function(){
				 if(MCART.DATA_Amount!=null){
					$("#shopping-amount").html(MCART.DATA_Amount);
				}
			}
			if(document.getElementById("settleup")){
				if(MCART.DATA_Amount!=null){
					$("#settleup s").eq(0).addClass("shopping");
				}
				this.el = $('#settleup dl');
			}else if(document.getElementById("settleup-2013")){
				this.el = $('#settleup-2013 dl');
			}else if(document.getElementById("settleup-2014")){
				this.el = $('#settleup-2014');
				//2015-1-28
				this.el.find('.ci-right').html('&gt;');
				this.el.find('.dorpdown-layer').html('<div class="spacer"></div><div id="settleup-content"><span class="loading"></span></div>');
				this.el.find('.cw-icon .ci-right').after('<i class="ci-count" id="shopping-amount"></i>')
			}

			amount();

			if (this.el != null) {
				this.el.dropdown({
					enterDelay:200,
					trigger:true,
					current:'hover',
					onchange:function(){
						 MCART.FN_Refresh();
						// 新购物车链接
						$('#settleup-url').attr('href', 'http://cart.jd.com/cart/cart.html?r='+(+new Date));
					}
				});
			}
		},
		DATA_Cookie:"cn",
		DATA_Amount:readCookie("cn")||"0",
		URL_Serv:"http://cart.jd.com/cart/miniCartServiceNew.action",
		TPL_Iframe:"<iframe scrolling=\"no\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" id=\"settleup-iframe\"></iframe>",
		TPL_NoGoods:"<div class=\"spacer\"></div><div class=\"prompt\"><div class=\"nogoods\"><b></b>购物车中还没有商品，赶紧选购吧！</div></div>",
		TPL_List: {
			wrap: '<div class="spacer"></div><div id="settleup-content"><div class="smt"><h4 class="fl">最新加入的商品</h4></div><div class="smc"></div><div class="smb ar"><div class="p-total">共<b>${Num}</b>件商品　共计<strong>￥ ${TotalPromotionPrice.toFixed(2)}</strong></div><a href="http://cart.jd.com/cart/cart.html?r=${+new Date}" title="去购物车" id="btn-payforgoods">去购物车</a></div></div>',
			sigle: '<ul id="mcart-sigle">'
				+'{for list in TheSkus}'
				+'  <li>'
				+'      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>'
				+'      <div class="p-name fl"><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>'
				+'      <div class="p-detail fr ar">'
				+'          <span class="p-price"><strong>￥${list.PromotionPrice.toFixed(2)}</strong>×${list.Num}</span>'
				+'          <br>'
				+'          {if parseInt(list.FanPrice)>0}'
				+'          <span class="hl-green">返现：￥<em>${list.FanPrice}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          {if parseInt(list.Score)>0}'
				+'          <span class="hl-orange">送京豆：<em>${list.Score}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          <a class="delete" data-id="${list.Id}" data-type="RemoveProduct" href="javascript:void(0)">删除</a>'
				+'      </div>'
				+'      {for jq in list.CouponAD}'
				+'      <div class="gift-jq">[赠券] 赠送${jq.Jing}京券 ${jq.LimitAd}</a></div>'
				+'      {/for}'
				+'  </li>'
				+'{/for}'
				+'</ul>',
			gift: '<ul id="mcart-gift">'
				+'{for list in TheGifts}'
				+'  <li>'
				+'      <div class="p-img fl"><a href="http://item.jd.com/${list.MainSKU.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.MainSKU.Id)}n5/${list.MainSKU.ImgUrl}" width="50" height="50" alt=""></a></div>'
				+'      <div class="p-name fl"><a href="http://item.jd.com/${list.MainSKU.Id}.html" title="${list.MainSKU.Name}" target="_blank">${list.MainSKU.Name}</a></div>'
				+'      <div class="p-detail fr ar">'
				+'          <span class="p-price"><strong>￥${list.PromotionPrice.toFixed(2)}</strong>×${list.Num}</span>'
				+'          <br>'
				+'          {if parseInt(list.FanPrice)>0}'
				+'          <span class="hl-green">返现：￥<em>${list.FanPrice}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          {if parseInt(list.Score)>0}'
				+'          <span class="hl-orange">送京豆：<em>${list.Score}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          <a class="delete" data-id="${list.MainSKU.Id}" data-type="RemoveProduct" href="#delete">删除</a>'
				+'      </div>'
				+'      {for gift in list.Skus}'
				+'      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}赠品{/if}{if gift.Type==1}附件{/if}] ${gift.Name}</a></div>'
				+'      {/for}'
				+'      {for jq in list.CouponAD}'
				+'      <div class="gift-jq">[赠券] 赠送${jq.Jing}元京券 ${jq.LimitAd}</a></div>'
				+'      {/for}'
				+'  </li>'
				+'  {/for}'
				+'</ul>',
			suit: '{for suit in TheSuit}'
				+'<ul id="mcart-suit">'
				+'  <li class="dt">'
				+'      <div class="fl"><span>[套装]</span> ${suit.Name}</div>'
				+'      <div class="fr"><em>小计：￥${(suit.PromotionPrice*suit.Num).toFixed(2)}</em></div>'
				+'      <div class="clr"></div>'
				+'  </li>'
				+'  {for list in suit.Skus}'
				+'  <li>'
				+'      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>'
				+'      <div class="p-name fl"><span></span><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>'
				+'      <div class="p-detail fr ar">'
				+'          <span class="p-price"><strong>￥${list.PromotionPrice.toFixed(2)}</strong>×${list.Num}</span>'
				+'          <br>'
				+'          {if parseInt(list.FanPrice)>0}'
				+'          <span class="hl-green">返现：￥<em>${list.FanPrice}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          {if parseInt(list.Score)>0}'
				+'          <span class="hl-orange">送京豆：<em>${list.Score}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          <a class="delete" data-id="${list.Id}|${suit.Id}" data-type="RemoveSuit" href="javascript:void(0)">删除</a>'
				+'      </div>'
				+'      {for gift in list.Gifts}'
				+'      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}赠品{/if}{if gift.Type==1}附件{/if}] ${gift.Name}</a></div>'
				+'      {/for}'
				+'      {for jq in list.CouponAD}'
				+'      <div class="gift-jq">[赠券] 赠送${jq.Jing}元京券 ${jq.LimitAd}</a></div>'
				+'      {/for}'
				+'  </li>'
				+'  {/for}'
				+'</ul>'
				+'{/for}',
			mj: '{for mj in ManJian}'
				+'<ul id="mcart-mj">'
				+'  <li class="dt">'
				+'      <div class="fl"><span class="hl-green">满减</span>{if mj.ManFlag} 已购满{if mj.ManNum>0}${mj.ManNum}件{else}${mj.ManPrice}元{/if}，已减${mj.JianPrice}元{else}购满{if mj.ManNum>0}${mj.ManNum}件{else}${mj.ManPrice}元{/if}，即可享受满减优惠{/if}</div>'
				+'      <div class="fr"><em>小计：￥${(mj.PromotionPrice*mj.Num).toFixed(2)}</em></div>'
				+'      <div class="clr"></div>'
				+'  </li>'
				+'  {for list in mj.Skus}'
				+'  <li>'
				+'      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>'
				+'      <div class="p-name fl"><span></span><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>'
				+'      <div class="p-detail fr ar">'
				+'          <span class="p-price"><strong>￥${list.PromotionPrice.toFixed(2)}</strong>×${list.Num}</span>'
				+'          <br>'
				+'          {if parseInt(list.FanPrice)>0}'
				+'          <span class="hl-green">返现：￥<em>${list.FanPrice}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          {if parseInt(list.Score)>0}'
				+'          <span class="hl-orange">送京豆：<em>${list.Score}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          <a class="delete" data-id="${list.Id}|${mj.Id}" data-type="RemoveSuit" href="#delete">删除</a>'
				+'      </div>'
				+'      {for gift in list.Gifts}'
				+'      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}赠品{/if}{if gift.Type==1}附件{/if}] ${gift.Name}</a></div>'
				+'      {/for}'
				+'      {for jq in list.CouponAD}'
				+'      <div class="gift-jq">[赠券] 赠送${jq.Jing}元京券 ${jq.LimitAd}</a></div>'
				+'      {/for}'
				+'  </li>'
				+'  {/for}'
				+'</ul>'
				+'{/for}',
			mz: '{for mz in ManZeng}'
				+'<ul id="mcart-mz">'
				+'  <li class="dt">'
				+'      <div class="fl"><span class="hl-orange">满赠</span>'
				+'          {if mz.ManFlag}'
				+'              已购满${mz.ManPrice}元，您{if mz.ManGifts.length>0}已{else}可{/if}领赠品'
				+'          {else}'
				+'              购满${mz.ManPrice}元，即可领取赠品'
				+'          {/if}'
				+'      </div>'
				+'      <div class="fr"><em>小计：￥${(mz.PromotionPrice*mz.Num).toFixed(2)}</em></div>'
				+'      <div class="clr"></div>'
				+'  </li>'
				+'  {for gift in mz.ManGifts}<li class="dt-mz"><a href="${gift.Id}" target="_blank">[赠品]${gift.Name}</a>×${gift.Num}</li>{/for}'
				+'  {for list in mz.Skus}'
				+'  <li>'
				+'      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>'
				+'      <div class="p-name fl"><span></span><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>'
				+'      <div class="p-detail fr ar">'
				+'          <span class="p-price"><strong>￥${list.PromotionPrice.toFixed(2)}</strong>×${list.Num}</span>'
				+'          <br>'
				+'          {if parseInt(list.FanPrice)>0}'
				+'          <span class="hl-green">返现：￥<em>${list.FanPrice}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          {if parseInt(list.Score)>0}'
				+'          <span class="hl-orange">送京豆：<em>${list.Score}</em></span>'
				+'          <br>'
				+'          {/if}'
				+'          <a class="delete" data-id="${list.Id}|${mz.Id}" data-type="RemoveSuit" href="#delete">删除</a>'
				+'      </div>'
				+'      {for gift in list.Gifts}'
				+'      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}赠品{/if}{if gift.Type==1}附件{/if}] ${gift.Name}</a></div>'
				+'      {/for}'
				+'      {for jq in list.CouponAD}'
				+'      <div class="gift-jq">[赠券] 赠送${jq.Jing}元京券 ${jq.LimitAd}</a></div>'
				+'      {/for}'
				+'  </li>'
				+'  {/for}'
				+'</ul>'
				+'{/for}'
		},
		FN_BindEvents:function(){
			var me = this;

			$("#settleup-content .delete").bind("click",function(){
				var id=$(this).attr("data-id").split('|'),
					name=$(this).attr("data-type"),
					data = {
						method:name,
						cartId:id[0]
					};
				if(!id)return;

				if ( id.length > 1 && !!id[1] ) {
					data.targetId = id[1];
				}

				$.ajax({
					url:me.URL_Serv,
					data: data,
					dataType:"jsonp",
					success:function(json){
						if(json.Result) {
							me.FN_Refresh();
						}
					}
				})
			})
		},
		FN_Refresh:function(){
			var MCART = this;
			var object = this.el;
			//var object=document.getElementById("settleup")?$("#settleup dl"):$("#settleup-2013 dl");
			//if(object.attr("load")  &&readCookie(MCART.DATA_Cookie)==MCART.DATA_Amount)return;//非首次访问&&cookie值未发生改变
			var element;
			if (/dl/.test(object.selector)) {
				//old
				element=object.find("dd").eq(0);
			}else {
				//2014
				element=object.find(".dorpdown-layer").eq(0);
			}
			
			var html,
				refreshCallback=function(data){
					var r = data.Cart,
						len = r.TheSkus.length + r.TheSuit.length + r.TheGifts.length + r.ManJian.length + r.ManZeng.length,
						sigle = MCART.TPL_List.sigle.process(data.Cart),
						gift = MCART.TPL_List.gift.process(data.Cart),
						suit = MCART.TPL_List.suit.process(data.Cart),
						mz = MCART.TPL_List.mz.process(data.Cart),
						mj = MCART.TPL_List.mj.process(data.Cart);

				if ( len > 0 ) {
					element.html(MCART.TPL_List.wrap.process(data.Cart));
					element.find('#settleup-content .smc').html(sigle+gift+suit+mj+mz);
					$('#settleup-url').attr('href', 'http://cart.jd.com/cart/cart.html?r='+(+new Date));
				} else {
					element.html(MCART.TPL_NoGoods);
				}

				if($.browser.msie && $.browser.version == 6){
					var content=$("#settleup-content");
					content.before(MCART.TPL_Iframe);
					var iframe=$("#settleup-iframe");
					iframe.height(content.height());
				}
				MCART.FN_BindEvents();
			};

			$.ajax({
				url:MCART.URL_Serv,
				data:{
					method:"GetCart"
				},
				dataType:"jsonp",
				success:function(json){
					refreshCallback(json);
				}
			});

			MCART.DATA_Amount=readCookie(MCART.DATA_Cookie);
			if(MCART.DATA_Amount!=null){
				$("#shopping-amount").html(MCART.DATA_Amount).parent().show();
			}
			//object.attr("load","1");
		}
	}

	function init(){
		mcart.init();
	}
	return init;
});