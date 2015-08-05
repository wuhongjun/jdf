<div id="countdown"></div>

<script type="text/javascript">
	seajs.use(['jdf/1.0.0/ui/countdown/1.0.0/countdown'],function(){
		$('#countdown').countdown({
			isTwoDigits:true,
			endTime:"2025/12/23 00:00:00",
			onEnd:function() {
				this.el.html("结束了")
			},
			onChange:function(leaveTime){
				this.el.html("现在离" + leaveTime.endTime + "还有" + leaveTime.day + "天" + leaveTime.hour + "小时" + leaveTime.minute + "分" + leaveTime.second + "秒")
			}
		});
	});
</script>
