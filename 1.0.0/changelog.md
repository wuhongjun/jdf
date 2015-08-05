# JDF工具更新日志

* [JDF工具CHANGELOG](https://github.com/putaoshu/jdf/blob/master/CHANGELOG.md)

# JDF News

## JDF News 201502期  2015-4-1
 
* jdf工具(jdf tool)：
	* 修复cssSprite时的一些问题，并可以自定义合并方式 
	* 修复jdf server访问非html，css，js文件抛异常的问题 
	* 修复jdf o/jdf u可以对单独文件进行操作 
	* 修复scss解析错误的问题 
	* 添加jdf compress压缩html功能 
	* 优化combo文件合并方式 
	* 优化widget的解析方式
 
* jdf组件(jdf ui)：

* jdf/1.0.0/unit/login/1.0.0/login.js 
	* 添加组件自动居中

* jdf/1.0.0/ui/switchable/1.0.0/switchable.js  
	* 添加onNext，onPrev回调 
	* 添加playDirection参数，控制自动播放方向 
	* update回调时，添加自定义索引 
	* 修复无缝回调时的索引值 
	* 优化IE低版本播放性能 
	* 修复显示个数低于步进的值，同时空节点时，能使用update接口

* jdf/1.0.0/ui/accordion/1.0.0/accordion.js 
	* 修复absolute下的坐标定位算法

* jdf/1.0.0/ui/area/1.0.0/area.js 
	* 更换地区获取数据接口 
	* 添加选中样式 
	* 优化地区展示时逻辑 
	* 删除上海两个地区数据（此地区与后台数据不同步）

* jdf/1.0.0/ui/miniArea/1.0.0/miniArea.js 
	* 添加缩小版地区选择组件，只支持一级地区

* jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js 
	* 优化事件绑定及触发机制的性能

* jdf/1.0.0/ui/fixable/1.0.0/fixable.js 
	* 修复IE6下抖动 
	* 修复指定的context不存在时报错
  
* jdf/1.0.0/ui/ceilinglamp/1.0.0/ceilinglamp.js 
	* 添加hasStyle参数控制，是否需要自动添加样式 
	* 添加hasWrap参数，控制是否添加外层结构 
	* 添加scrollDelay参数，控制页面滚动时节流 
	* 调整外框结构 
	* 修复IE6下抖动

* jdf/1.0.0/ui/suggestion/1.0.0/suggestion.js 
	* 添加快捷键，支持上下键回车键以及ESC关闭键 
	* 调整点击事件逻辑

* jdf/1.0.0/ui/smartkey/1.0.0/smartkey.js 
	* 修复与浏览器自身快捷键的冲突处理

* jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js 
	* 修复展示动态内容时反复触发事件回调
	* jdf/1.0.0/unit/ui-base/1.0.0/ui-base.css
	* 添加img-error样式

* jdf/1.0.0/unit/category/2.0.0/category.js 
	* 新版类目 
	* 支持默认一级分类显示/隐藏初始化 
	* 支持仅显示一级分类菜单

* Demo页 
	* 减化所有Demo中冗余代码

## JDF News 201501期 2015-1-9

* JDF组件新增
	* 二维码组件 
	* elevator电梯 
	* smartkey快捷键：支持组合键、支持指定某个context下响应
  
* JDF组件修复
	* ui/switchable/1.0.0/switchable.js 
	* 组件支持移动端滑动交互
	* 添加update函数，支持动态修改节点
	* 支持设置class[selected]
	* 默认选中tab支持设置class[disabled] 使tab不能操作

* ui/share/1.0.0/share.js 
	* 添加分享到微信朋友圈功能

* ui/area/1.0.0/area.js 
	* 修复自动引入css文件 
	* 调整性能，只渲染指定层级范围内的数据
	* 支持直辖市跨级选择
	* 支持自定义一级数据 

* ui/ceilinglamp/1.0.0/ceilinglamp.js 
	* 添加align显示视角方向控制 
	* 添加onShow、onHide回调
 
* ui/fixable/1.0.0/fixable.js 
	* 修复在ie6下分辨率过低、定位目标超出右屏目时，会自动调整位置 @周琪力

* unit/cookie/1.0.0/cookie.js 
	* 修复get时转码异常问题

* JDF网站
	* 首页优化和顶部公共菜单统一

* JDF工具
	* 修复新增widget有命名冲突时的提示逻辑 
	* jdf@1.6.43 output时可以去掉html文件中的注释，参数配置为output.comment：true

* JDD工具(前端文档自动生成)
	* v1.2.0新增增加自定义菜单/统计/版本信息/额外HTML片断

* 其它
	* JDF文档/demo/wiki/FE首页增加统计


# unit组件更新日志

* 2014-7-29 16:27:36 
	* [demand]unit/myjd/ 我的京东修改我的订单链接
    * [demand]unit/follow/ 关注弹出层宽度修改

* 2014-5-22 13:42:36 
	* [demand]unit/myjd/ 我的京东删除"为我推荐"链接
* 2014-5-20 11:54:15 
	* [fix]login登陆注册iframe增加默认高度
	* [fix]base宽窄版加className放在html元素上,这样base放在页面head也可以了
* 2014-4-24 9:51:53 
	* [fix]globalPath增加调试模式
	* [fix]base为响应式布局增加在dom.ready之后body加root61
* 2014-4-10 17:55:45 全部商品分类方案更新
* 2014-3-31 18:20:11 登陆 unit/login/1.0.0/login 增加firstCheck配置项,即不管是否登陆总是弹出登陆浮层
* 2014-3-24 16:37:37
	* base unit/base/1.0.0/base恢复pageConfig.FN_GetRandomData方法
	* 头尾补丁 unit/globalPathch/1.0.0/globalPathch采用广告位来管理
	* 全部商品分类 unit/category/1.0.0/category默认显示的文案更新至最新
* 2014-1-3 脚印;我的京东
* 2014-1-2 到货通知;商品对比;
* 2013-12-27 登录注册;商品加关注
* 2013-12-26 lib-v2

# ui组件更新日志

* 2014-8-7 10:50
	* [add]{晓春}range组件
	* [add]{晓春}placeholder组件

* 2014-8-6 17:33
	* [fix]lazyload边界值和图片加载失败修正

* 2014-8-4 6:48
	* [bug]对话框-拖拽失效了

* 2014-7-25 10:50
	* [add]{建国}老虎机
	* [add]{建国}数字滚动

* 2014-7-7 20:43
	* [bug]switchable回调传参在无限循环滚动时边界值出错

* 2014-7-3 11:12:00		
	* [new]老虎机
	* [new]数字滚动

* 2014-5-21 16:00:56

	* [fix]ui/dialog主体增加隐藏样式
	* [fix]ui/drag mouseover unbind
	* [bug]unit/login 登陆注册IE6出现滚动条

* 2014-5-20 11:54:15 
	* [new]日历增加小时/分钟选择框
	* [fix]去掉对话框iframe加载的隐藏,提升用户体验
* 2014-5-16 18:45
	* [fix]美化表单修正
	* [fix]吸顶灯页面元素有变动更新高度值修正
* 2014-5-15 20:25:57
	* [fix]tips移出加延时
	* [fix]dialog多次重复点击,倒计时间错乱修正
* 2014-5-7 15:13:07
	* [fix]switchable步进边界值修正
* 2014-5-6 14:35:20
	* [fix]对话框倒计时关闭修正
	* [fix]ui基类样式加载完成后再执行组件初始化
	* [fix]lazyload图片加载失败或为空时替换成空白图片
	* [fix]tips hover模式修正
	* [add]switchable增加鼠标移入主体时停止滚动
* 2014-5-5 更新日历组件:支持设置起始和结束日期;按天传后台数据;
* 2014-4-18 增加分享到组件
* 2014-4-17 修正分页组件交互展示部分
* 2014-4-10 美化表单增加表单模板功能
* 2014-2-20 UI组件 修正lazyload的节流函数使IE绑定失效的问题
* 2014-2-19 UI组件 手风琴
* 2014-2-17 UI组件 自动加载组件相对应的样式文件
* 2014-2-14 UI组件 修正ceilinglamp 增加到达某元素停止悬挂的交互
* 2014-2-14 UI组件 修正marquee 增加对元素动态更新的方法
* 2014-2-14 UI组件 修正switchable 增加开始自动播放和停止播放方法以及动画easing选项
* 2014-2-11 UI组件 修正marquee,ceilinglamp,switchable
* 2014-1-24 UI组件 图片切换
* 2013-12-25 UI组件 switch增加hash固定位置
* 2013-12-24 UI组件 日历组件
* 2013-12-23 UI组件 倒计时
* 2013-12-20 css3动画组件
* 2013-12-19 组件animate动画函数
* 2013-12-18 组件transform(兼容IE)
* 2013-12-17 组件demo首页;jdd新增:根据demo目录自动生成列表
* 2013-12-16 组件样式优化
* 2013-12-13 动画组件
* 2013-12-12 优化dropdown,同时增加三级菜单
* 2013-12-11 优化switchable,同时增加无缝滚动
* 2013-12-10 优化dialog,同时增加6个举例,拖拽,双dialog;优化drag,同时增加边界值
* 2013-12-9 优化美化表单组件
* 2013-12-6 UI组件 tips组件;ui基类增加guid;
* 2013-12-5 UI组件 美化表单组件
* 2013-11-15 商务舱项目约2周
* 2013-11-14 UI组件 拖拽组件
* 2013-11-14 UI组件 scrollBar模拟滚动条
* 2013-11-13 UI组件 fixable
* 2013-11-13 UI组件 吸顶灯;jdu beta v0.1
* 2013-11-12 UI组件 修正switchable 多次触发的问题
* 2013-11-12 UI组件 跑马灯
* 2013-11-11 UI组件 智能提示
* 2013-11-11 UI组件 增加自定义事件
* 2013-11-8 UI组件 分页
* 2013-11-7 JS文档生成工具jdd v1.0
* 2013-11-7 UI组件暂更名为jdj
* 2013-11-5 UI组件 打包方案
* 2013-11-4 css文件中图片加时间戳
* 2013-10-30 模块化加载方案 - demo
* 2013-10-29 模块化加载方案 - 版本管理
* 2013-10-28 模块化加载方案
* 2013-10-23 UI组件 tab 增加小箭头特效
* 2013-10-23 UI组件 懒惰加载
* 2013-10-22 UI组件 下拉菜单
* 2013-10-21 UI组件 slider轮播,旋转木马
* 2013-10-19 UI组件 基类新版本,增加data-type传参
* 2013-10-18 UI组件 焦点图
* 2013-10-17 UI组件 对话框
* 2013-10-16 UI组件 tab
* 2013-10-15 UI组件 返回顶部
* 2013-10-15 UI组件 基类
* 2013-10-14 UI组件 规划
* 2013-10-14 项目整体规划