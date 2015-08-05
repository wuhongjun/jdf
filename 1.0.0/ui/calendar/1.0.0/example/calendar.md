#calendar
2014-11-18
[fix]调整在初始化日期时，设置了beginDate后，调整当前日期
[add]扩展初始化时defaultDate和beginDate的数据格式，支持Date对象及字符串

2014-11-13
[add]添加配置属性“isCloseOnSelectDay” 当点击日期“天”时，是否关闭窗口，默认开启
[fix]调整整个日历外框的结构，兼容主流浏览器
[bug]修复选择下拉框时，区分左右月份的日期HTML渲染模板

2014-11-09
[add]调整时分秒html结构
[add]添加“确定”按钮（当需要调时分秒时显示）
[bug]修正限制日期的判断条件，支持多种格式日期限制

2014-11-06
[bug]修复在当前月历中选择其它月份的日期失效
[bug]修复已选择的日期标亮失效
[add]添加Date.prototype.clone克隆日期函数，解决日期之前的引用，造成逻辑混乱
[add]添加限制日期（开始日期，结束日期）细化到“时分秒”
[bug]修复年月下拉框在处理限制日期时的逻辑
[bug]修复上一月下一月按钮在处理限制日期时的逻辑
[bug]修复setBeginDate、setEndDate等相关函数在处理限制日期时的逻辑


2014-10-17
[add]新增setValue方法
[fix]修正在setBeginDate和setEndDate时，如果输入框没有数据，则把当前时间改为beginDate

2014-10-16 更新日志
[add]新增初始值设定（多种方式）功能
[fix]修正24小时换算，去掉PM和AM。用0-23代替
[bug]修复点空白不能正常隐藏的问题
[bug]修复双日历日期同步问题
[add]新增setBeginDate、setEndDate 方法

##特性
支持农历/阴历节假日信息,按月取后台数据信息
选择某区间段日期 ,双日历 ,年月select,上下月切换,显示今日等

##todo

* [已完成]不可选择某区间段日期
* [已完成]双日历
* [已完成]按年切换
* [已完成]年月增加select
* 多语言支持
* 增加显示动画效果

##竞品分析
* [去哪儿](http://www.qunar.com/)
* [淘宝机票](http://s.jipiao.trip.taobao.com/flight_search_result.htm?spm=181.1108777.a315k.30.2cQega&tripType=0&searchBy=&depCity=&depCityName=%B1%B1%BE%A9&arrCity=SHA&arrCityName=%C9%CF%BA%A3&depDate=2014-11-24&arrDate=)
* [jqueryUI](http://jqueryui.com/datepicker/)