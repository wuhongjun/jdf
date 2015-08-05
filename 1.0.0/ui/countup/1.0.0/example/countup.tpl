<div id="countup"></div>
<button id="start">开始</button>
<button id="stop">停止</button>
<button id="reset">重置</button>

<script type="text/javascript">
    seajs.use("jdf/1.0.0/ui/countup/1.0.0/countup", function(){
        $("#countdown").countup({
            startBtn: "#start",
            stopBtn: "#stop",
            resetBtn: "#reset",
            onchange: function(data){
                $(this).html(data.d + "天" + data.h + "时" + data.m + "分" + data.s + "秒" + data.ms + "毫秒");
            }
        });
    });
</script>
