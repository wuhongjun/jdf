//drap list
seajs.use(['jdf/1.0.0/ui/drag/1.0.0/drag'],function(dialog){
	

	var el = $('#drag');
	var elLeft = el.offset().left;
	var elTop = el.offset().top;
	var elHeight = el.outerHeight();
	// console.log(elHeight)
	
	var item = el.find('.'+'ui-drag-item');
	var itemLength = item.size();
	//console.log(itemLength)
	var dragFn = {} ;
	var num,direction;



	String.prototype.inc=function(s){
    	return this.indexOf(s)>-1?true:false
    };

    var agent=navigator.userAgent;
    window.isOpr=agent.inc("Opera");
    window.isIE=agent.inc("IE")&&!isOpr;
    window.isMoz=agent.inc("Mozilla")&&!isOpr&&!isIE;
    
    if(isMoz){
        Event.prototype.__defineGetter__("x",function(){return this.clientX+2});
        Event.prototype.__defineGetter__("y",function(){return this.clientY+2});
    }

	// window.dragFn = dragFn;
	item.bind('mousedown',function(event){
		var item1 = el.find('.'+'ui-drag-item');

		var _this = $(this);
		var left = _this.offset().left;
		var top = _this.offset().top;
		var index = _this.index();
		var width = _this.outerWidth();
		var height = _this.outerHeight();

		// el.find('.'+'ui-drag-hidden').remove();
		_this.after('<li class="ui-drag-hidden">'+(_this.index()+1)+'******</li>');
		el.find('.'+'ui-drag-hidden').css({
			width:_this.width(),
			height:_this.height()
		})
		
		event.left = left;
		event.top = top;

		dragFn = _this.drag({
			autoStart:false,
			autoStartEvent:event,
			start:function(){
				
			},
			drag:function(data){
				num = parseInt( (data.top-top) / height  );
				var tag = parseInt( (data.left-left) / width ) == 0;
				tag = true;
								
				//next
				if (num>0) {
					direction = 1;
					num = num + index;
					if(num>itemLength-1) num=itemLength-1;
					if(tag){
						el.find('.'+'ui-drag-hidden').insertAfter(item1.eq(num));
					}
				}

				//prev
				if (num<0) {
					direction = -1;
					num = num + index;
					if(num<0) num=0;
					if(tag){
						el.find('.'+'ui-drag-hidden').insertBefore(item1.eq(num));
					}
				}
				// console.log(num);
			},
			end:function(){
				el.find('.'+'ui-drag-hidden').remove();
				
				if (direction>0) {
					_this.insertAfter(item1.eq(num));
				}else if(direction<0){
					_this.insertBefore(item1.eq(num));
				};

				_this[0].style.position = '';
				_this[0].style.top = '';
				_this[0].style.left = '';
				_this[0].style = null;
				
			}
		});

		item.bind('mouseup',function(event){
			dragFn = null;
		});
	})

});