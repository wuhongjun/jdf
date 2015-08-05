/**
 * @ base-v1.js 补丁
 */

/////////////////////////////////////////////////////////////////////// 伟平

//根据屏幕分辨率返回对象
pageConfig.FN_GetCompatibleData=function(object){
	var flag=(screen.width<1210);
	if(flag){
		object.width=object.widthB?object.widthB:object.width;
		object.height=object.heightB?object.heightB:object.height;
		object.src=object.srcB?object.srcB:object.src;
	}
	return object
};

//初始化焦点图
pageConfig.FN_InitSlider=function(object,data){
	var sortData=function(a,b){
		return a.group-b.group;
	};
	data.sort(sortData);
	var tempList=data[0].data,
	tempHtml=[],
	style=(tempList.length==3)?"style2":"style1",
	x;
	/*
	flag=(screen.width<1210),
	width,
	height,
	src;*/
	tempHtml.push("<div class=\"slide-itemswrap\"><ul class=\"slide-items\"><li class=\"");
	tempHtml.push(style);
	tempHtml.push("\" data-tag=\"");
	tempHtml.push(data[0].aid);
	tempHtml.push("\">");
	for(var i=0;i<tempList.length;i++){
		/*x=tempList[i];
		width=flag?x.widthB:x.width;
		height=flag?x.heightB:x.height;
		src=flag?x.srcB:x.src;*/
		x=this.FN_GetCompatibleData(tempList[i]);
		tempHtml.push("<div class=\"fore");
		tempHtml.push(i+1);
		tempHtml.push("\" width=\"");
		tempHtml.push(x.width);
		tempHtml.push("\" height=\"");
		tempHtml.push(x.height);
		tempHtml.push("\"><a target=\"_blank\" href=\"");
		tempHtml.push(x.href);
		tempHtml.push("\" title=\"");
		tempHtml.push(x.alt);
		tempHtml.push("\"><img src=\"");
		if(i==0){
			tempHtml.push(x.src);
		}else{
			tempHtml.push("http://misc.360buyimg.com/lib/img/e/blank.gif\" style=\"background:url(");
			tempHtml.push(x.src);
			tempHtml.push(") no-repeat center 0;");
		}
		tempHtml.push("\" width=\"");
		tempHtml.push(x.width);
		tempHtml.push("\" height=\"");
		tempHtml.push(x.height);
		tempHtml.push("\" /></a></div>");
	}
	tempHtml.push("</li></ul></div><div class=\"slide-controls\"><span class=\"curr\">1</span></div>");
	document.getElementById(object).innerHTML=tempHtml.join("");
};