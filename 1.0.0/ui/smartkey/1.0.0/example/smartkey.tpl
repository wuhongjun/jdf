<script type="text/javascript">
    seajs.use(['jdf/1.0.0/ui/smartkey/1.0.0/smartkey'], function () {
        $('body').smartkey({
            name:'testbody',//不能为空
            keys:['1','2','3','4','5','6','7','8','9','f+1','f+2'],
            callback:function(key){

            }
        });

    });
</script>