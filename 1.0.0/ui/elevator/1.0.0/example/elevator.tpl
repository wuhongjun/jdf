<div id="floorContent"><!--楼层内容主体-->
    <div class="ui-elevator-floor">楼层内容1</div>
    <div class="ui-elevator-floor">楼层内容2</div>
    <div class="ui-elevator-floor">楼层内容3</div>
</div>
<div class="ui-elevator"><!--电梯主体-->
    <div class="ui-elevator-handler">1</div>
    <div class="ui-elevator-handler">2</div>
    <div class="ui-elevator-handler">3</div>
</div>

<script type="text/javascript">
    seajs.use(['jdf/1.0.0/ui/fixable/1.0.0/fixable','jdf/1.0.0/ui/elevator/1.0.0/elevator'], function () {
        $('.ui-elevator').fixable({//定位
            x:'right',
            y:'bottom',
            xValue:-$('.ui-elevator').width(),//减去自身宽度，定位于楼层的最右侧
            yValue:0,
            context:$('#floorContent')//相对floorContent容器定位
        });

        $('#floorContent').elevator({
            floorClass:'ui-elevator-floor',//楼层className
            elevatorClass:'ui-elevator',//电梯主体className
            handlerClass:'ui-elevator-handler',//电梯按钮className
            selectClass:'ui-elevator-select',//电梯按钮被选中的className
            onStart:function(obj){

            },
            onEnd:function(obj){

            }
        });
    });
</script>