seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable','jdf/1.0.0/ui/easing/1.0.0/easing','jdf/1.0.0/ui/transform/1.0.0/transform','jdf/1.0.0/ui/anim/1.0.0/anim'],function(switchable, easing, transform, anim){
	
	var anim = $('#animate').anim();

	$('#animate').switchable({
		type:'focus',
		delay: 300,
		speed: 500,
		hasPage:true,
		callback:function(index){
			var item  = this.main.eq(index);
			var el = item;
			anim.trigger(el);
			return;
		}
	});

});

