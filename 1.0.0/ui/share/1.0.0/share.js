/**
 *####分享到####
 *
 * 类型有 sinaweibo 新浪微博  	qqweibo 腾讯微博  	qzone QQ空间  	renren 人人网  	weibo163 网易微博  	
 * kaixin001 开心网  	douban 豆瓣网  	sohuweibo 搜狐微博  	qq QQ好友  	yixin 易信 	
 *
 ***Demo**
 * [share](../ui/share/1.0.0/example/share.html "Demo")
 *
 ***参数**
 *
 *  - `content` {String}  分享的内容
 *  - `url` {String}  分享的url, 默认为location.href
 *  - `pic` {String}   分享的图片 (可选)
 *  - `title` {String}   内容略要 (可选)
 *  - `sinaweiboAppkey` {String}   新浪微博appkey (可选)
 *
 ***举例**
 * 
 *js部分
 *
 * $('#share').share({
 *		content:"#content# 这是content 测试内容 ", 
 *		url:"http://www.jd.com/", 
 *		pic:"http://misc.360buyimg.com/lib/img/e/logo-201305.png", 
 *		title:"#title# 这是title 测试内容",
 *		sinaweiboAppkey:"2445336821"
 * });
 * 
 *html部分
 *	
 *	 <div id="share" class="ui-share">
 *		<a class="sinaweibo"></a> 
 *		<a class="qqweibo"></a> 
 *		<a class="qzone"></a> 
 *		<a class="renren"></a> 
 *		<a class="weibo163"></a> 
 *		<a class="kaixin001"></a> 
 *		<a class="douban"></a> 
 *		<a class="sohuweibo"></a> 
 *		<a class="qq"></a>
 *		<a class="yixin"></a>
 *		<a class="weixin"></a>
 *	</div>
 *
 ***update**
 *
 * 2014-12-22 15:19:00 by chenxiaochun
 * 添加微信分享
 * 优化代码处理逻辑
 *
 * 2014-4-18 13:30:25 by liuwei1
 *
 */
;(function($, undefined) {
	$.ui.define('share', {
		options: {
			hasCssLink:true,
			baseVersion:'1.0.0',
			cssLinkVersion:'1.0.0',
			content:'', 
			url:'', 
			pic:'', 
			title:'',
			sinaweiboAppkey:null
        },
		init:function(){
			var me = this;
			var shareLink = this.el.find('a');
			shareLink.each(function (){
				var self = $(this);
				var type = self.attr('class');
				var share = me.share(type, true);
				var target = '_blank';

				if(type == 'weixin'){
					target = '_self';
				}

				self.attr({
					'href': share.share_to,
					'title': '分享到'+share.name,
					'target': target
				});
			});
		},
		share:function(type, getNameTag){
			var opts = this.options;
			var name = typeof(getNameTag) == 'undefined' ? null : getNameTag;
			var content = encodeURIComponent(opts.content);
			var url = opts.url ? encodeURIComponent(opts.url) : encodeURIComponent(location.href);
			var pic = opts.pic ? encodeURIComponent(opts.pic) : '';
			var title = opts.title ? encodeURIComponent(opts.title) : encodeURIComponent(window.document.title);
			
			var share_to = null;
			var obj = {};
			switch (type) {
				case "sinaweibo":
					if(name) name = "新浪微博";
					var appkey = '';
					if (opts.sinaweiboAppkey) {
						appkey = "&appkey=" + opts.sinaweiboAppkey;
					}
					share_to = "http://service.weibo.com/share/share.php?url=" + url + appkey+"&title=" + content + "&pic=" + pic;
					
					break;
				case "qqweibo":
					if(name) name = "腾讯微博";
					share_to = "http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&url=" + url + "&title=" + content + "&pic=" + pic;
					break;
				case "qzone":
					if(name) name = "QQ空间";
					share_to = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + content + "&desc=&summary=";
					break;
				case "renren":
					if(name) name = "人人网";
					share_to = "http://widget.renren.com/dialog/share?resourceUrl=" + url + "&pic=" + pic + "&title="+title+"&description=" + content + "&srcUrl=" + url;
					break;
				case "weibo163" :
					if(name) name = "网易微博";
					share_to = "http://t.163.com/article/user/checkLogin.do?info="+content+""+url+"&images="+pic;
					break;
				case "kaixin001" :
					if(name) name = "开心网";
					share_to = "http://www.kaixin001.com/rest/records.php?url="+url+"&style=11&content=" + content;
					break;
				case "douban" :
					if(name) name = "豆瓣网";
					share_to = "http://www.douban.com/share/service?href="+url+"&name="+title+"&text="+content;
					break;
				case "sohuweibo" :
					if(name) name = "搜狐微博";
					share_to = "http://t.sohu.com/third/post.jsp?url="+url+"&title="+ content;
					break;
				case "qq" :
					if(name) name = "QQ好友";
					share_to = "http://connect.qq.com/widget/shareqq/index.html?url="+url+"&desc="+ content+"&summary="+title;
					break;
				case "yixin" :
					if(name) name = "易信";
					share_to = "http://open.yixin.im/share?type=webpage&text="+ content+"&pic="+pic+"&url="+url;
					break;
				case "weixin" :
					if(name) name = "微信";
					share_to = "javascript:void(0);";

					var wq = $(
						'<div class="weixin-qrcode">'+
							'<div class="qrcode-head">'+
								'<a class="qrcode-close" title="关闭" href="javascript:void(0)" id=>×</a><h3>分享到微信朋友圈</h3>'+
							'</div>'+
							'<div id="weixinQrcode"></div>'+
							'<div class="msg">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。</div>'+
						'</div>');

					if(!$('.weixin-qrcode').length){
						$('body').append(wq);
						$("#weixinQrcode").html('').qrcode({
							text: decodeURIComponent(url),
							width: 200,
							height: 200
						});

						$('.qrcode-close').click(function(){
							$('.weixin-qrcode').hide();
						});

						$('.ui-share .weixin').click(function(){
							$('.weixin-qrcode').show();
						});
					}
					
					break;
			}
			
			return obj = {
				name: name,
				share_to: share_to
			}
		}
	});
})(jQuery);