/**
*####弹出层组件####
* 
***Demo**
* [imgpreview](../ui/imgpreview/1.0.0/example/imgpreview.html "Demo")
*
***参数**
*
*  - `title` {String} '商品预览'  预览弹出层的标题
*  - `on`    {String} 'mouseover, grab, click, toggle, toggle' 预览时的交互方式
*
***举例**
* 
*	$('.img-preview').imgpreview();
*
* **update**
* 2015-06-03 15:32:00 by chenxiaochun
* 修复不能出现多个弹层的问题
*
* 2015-02-10 18:03:00 by chenxiaochun
*/

;(function ($) {
	$.ui.define('imgpreview', {
		options: {
			title: '商品预览',
			on: 'click', //mouseover, grab, click, toggle, toggle
			hasCssLink:true,
			baseVersion:'1.0.0',
			cssLinkVersion:'1.0.0'
		},

		init: function(){
			this.bind();

			this.imgs = this.el.find('img.ui-preview-img');
			this.seeker =  this.seeker || 0;
		},

		create: function(){
			var source = '<div class="ui-preview-box">' +
							'<a href="javascript:void(0);" class="ui-preview-prev" title="上一张">&lt;</a>' +
							'<div class="ui-preview-big"><img width=400 height=400 src="' + $(this.imgs[this.seeker]).attr('data-big-img') + '"></div>' +
							'<a href="javascript:void(0);" class="ui-preview-next" title="下一张">&gt;</a>' +
							'<div class="ui-preview-num">0/0</div>' +
						 '</div>';

			return source;
		},

		bind: function(){
			var self = this;

			this.el.bind('click', function(event){
				var target = event.target;

				if($(target).is('img')){
					
					var index = $(self.imgs).index(target);
					self.seeker = index;

					var source = self.create();
					self.dialog(source);
				}
			});
		},
		setNum: function(){
			$('.ui-preview-num').html((this.seeker+1) + '/' + this.imgs.length);
		},

		dialog: function(source){
			var self = this;
			var opts = this.options;

			$('body').dialog({
				title: opts.title,
				width: 850,
				height: 450,
				type: 'html',
				source: source,
				autoUpdate: true,
				maskClose: true,
				onReady: function(){
					$('.ui-preview-prev').bind('click', function(){
						if(self.seeker > 0){
							--self.seeker;
							$('.ui-preview-big img').attr('src', $(self.imgs[self.seeker]).attr('data-big-img'));
							
						}else{
							self.seeker = 0;
						}
						self.setNum();
						self.ready();
					});

					$('.ui-preview-next').bind('click', function(){
						if(self.seeker < self.imgs.length-1){
							++self.seeker;
							$('.ui-preview-big img').attr('src', $(self.imgs[self.seeker]).attr('data-big-img'));
							
						}else{
							self.seeker = self.imgs.length-1;
						}
						self.setNum();
						self.ready();
					});

					self.ready();
				}
			});
		},
		ready: function(){
			var self = this;
			var bigImg = $('.ui-preview-big');

			$(bigImg).zoom({
				on: self.options.on,
				onZoomIn: function(){
					bigImg.addClass('ui-preview-zoom-out');
				},
				onZoomOut: function(){
					bigImg.removeClass('ui-preview-zoom-out');
				}
			});

			self.setNum(); //设置弹出框页码
		}
	});

	/**http://www.jacklmoore.com/zoom*/
	var defaults = {
		url: false,
		callback: false,
		target: false,
		duration: 120,
		on: 'mouseover', // other options: grab, click, toggle
		touch: true, // enables a touch fallback
		onZoomIn: false,
		onZoomOut: false,
		magnify: 1
	};

	$.zoom = function(target, source, img, magnify) {
		var targetHeight,
			targetWidth,
			sourceHeight,
			sourceWidth,
			xRatio,
			yRatio,
			offset,
			position = $(target).css('position'),
			$source = $(source);

		target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
		target.style.overflow = 'hidden';

		img.style.width = img.style.height = '';

		$(img)
			.addClass('zoomImg')
			.css({
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: 0,
				width: img.width * magnify,
				height: img.height * magnify,
				border: 'none',
				maxWidth: 'none',
				maxHeight: 'none'
			})
			.appendTo(target);

		return {
			init: function() {
				targetWidth = $(target).outerWidth();
				targetHeight = $(target).outerHeight();

				if (source === target) {
					sourceWidth = targetWidth;
					sourceHeight = targetHeight;
				} else {
					sourceWidth = $source.outerWidth();
					sourceHeight = $source.outerHeight();
				}

				xRatio = (img.width - targetWidth) / sourceWidth;
				yRatio = (img.height - targetHeight) / sourceHeight;

				offset = $source.offset();
			},
			move: function (e) {
				var left = (e.pageX - offset.left),
					top = (e.pageY - offset.top);

				top = Math.max(Math.min(top, sourceHeight), 0);
				left = Math.max(Math.min(left, sourceWidth), 0);

				img.style.left = (left * -xRatio) + 'px';
				img.style.top = (top * -yRatio) + 'px';
			}
		};
	};

	$.fn.zoom = function (options) {
		return this.each(function () {
			var
			settings = $.extend({}, defaults, options || {}),
			//target will display the zoomed image
			target = settings.target || this,
			//source will provide zoom location info (thumbnail)
			source = this,
			$source = $(source),
			img = document.createElement('img'),
			$img = $(img),
			mousemove = 'mousemove.zoom',
			clicked = false,
			touched = false,
			$urlElement;

			// If a url wasn't specified, look for an image element.
			if (!settings.url) {
				$urlElement = $source.find('img');
				if ($urlElement[0]) {
					settings.url = $urlElement.data('src') || $urlElement.attr('src');
				}
				if (!settings.url) {
					return;
				}
			}

			(function(){
				var position = target.style.position;
				var overflow = target.style.overflow;

				$source.one('zoom.destroy', function(){
					$source.unbind(".zoom");
					target.style.position = position;
					target.style.overflow = overflow;
					$img.remove();
				});
				
			}());

			img.onload = function () {
				var zoom = $.zoom(target, source, img, settings.magnify);

				function start(e) {
					zoom.init();
					zoom.move(e);

					$img.stop()
					.fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
				}

				function stop() {
					$img.stop()
					.fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
				}

				// Mouse events
				if (settings.on === 'grab') {
					$source
						.bind('mousedown.zoom',
							function (e) {
								if (e.which === 1) {
									$(document).one('mouseup.zoom',
										function () {
											stop();

											$(document).unbind(mousemove, zoom.move);
										}
									);

									start(e);

									$(document).bind(mousemove, zoom.move);

									e.preventDefault();
								}
							}
						);
				} else if (settings.on === 'click') {
					$source.bind('click.zoom',
						function (e) {
							if (clicked) {
								// bubble the event up to the document to trigger the unbind.
								return;
							} else {
								clicked = true;
								start(e);
								$(document).bind(mousemove, zoom.move);
								$(document).one('click.zoom',
									function () {
										stop();
										clicked = false;
										$(document).unbind(mousemove, zoom.move);
									}
								);
								return false;
							}
						}
					);
				} else if (settings.on === 'toggle') {
					$source.bind('click.zoom',
						function (e) {
							if (clicked) {
								stop();
							} else {
								start(e);
							}
							clicked = !clicked;
						}
					);
				} else if (settings.on === 'mouseover') {
					zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.

					$source
						.bind('mouseenter.zoom', start)
						.bind('mouseleave.zoom', stop)
						.bind(mousemove, zoom.move);
				}

				// Touch fallback
				if (settings.touch) {
					$source
						.bind('touchstart.zoom', function (e) {
							e.preventDefault();
							if (touched) {
								touched = false;
								stop();
							} else {
								touched = true;
								start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
							}
						})
						.bind('touchmove.zoom', function (e) {
							e.preventDefault();
							zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
						});
				}
				
				if ($.isFunction(settings.callback)) {
					settings.callback.call(img);
				}
			};

			img.src = settings.url;
		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery));
