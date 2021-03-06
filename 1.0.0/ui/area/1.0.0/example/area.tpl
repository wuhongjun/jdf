<div id="area1" class="ui-area-wrap">
    <div class="ui-area-text-wrap"><!--展示内容主体-->
        <div class="ui-area-text"></div><!--显示被选中的地区-->
        <b></b><!--小箭头-->
    </div>
    <div class="ui-area-content-wrap"><!--弹出内容主体-->
        <div class="ui-area-tab"></div><!--省市区选择标签-->
        <div class="ui-area-content"></div><!--地区内容-->
        <div class="ui-area-close"></div><!--关闭按钮-->
    </div>
</div>

<script type="text/javascript">
    seajs.use(['jdf/1.0.0/ui/switchable/1.0.0/switchable', 'jdf/1.0.0/ui/area/1.0.0/area'], function () {
        $('#area1').area({
            scopeLevel:4,
            className:{
                text:'ui-area-text-wrap',
                text_text:'ui-area-text',
                content:'ui-area-content-wrap',
                content_tab:'ui-area-tab',
                content_content:'ui-area-content',
                close:'ui-area-close'
            }
        });
    });
</script>