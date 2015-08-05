#readme
by putaoshu citme：2014-6-26

* 组件调试
	* 法1：svn根目录本地映射到misc145环境，用apache/nginx
	* 法2：使用jdf server功能，首先在jdf/1.0.0/文件夹下执行
		
			jdf server
			
* ui/unit组件上线
	* 以输出dialog为例，在jdf/1.0.0/文件夹下，cmd命令行窗口下执行

			jdf output ui/dialog/1.0.0/dialog.js

* 生成api/demo文档
	* 在jdf/1.0.0/文件夹下，cmd命令行窗口下执行

			jdd -b
		
	* jdd安装
		
			npm install jdd -g
		
	

