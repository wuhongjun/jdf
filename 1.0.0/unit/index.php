<?php

/**
 * cb.php
 * 		只处理\?\?.+的情况
 * 		部署在项目根目录中
 *	author:	拔赤 - lijine00333@163.com
 */


//CDN 设置
//$CDN = 'http://a.tbcdn.cn/'; 
$CDN = 'http://misc.360buyimg.com/jdf/1.0.0/unit/'; //如果是在服务器上配置的话，则打开这一句的注释
 
//读到-min文件时会转读源文件，这些文件除外
// 新策略的文件转读功能去掉了，没有多少人用
//$exp = '/(editor-min|editor-core-pkg-min|calendar-pkg-min|editor-pkg-min|editor-plugin-pkg-min|kissy-min|simplecalendar-min|sizzle-pkg-min|list-min|base-pkg-min|jstorage-pkg-min)/';
 
// 线上未找到的文件
$unfound = array();
 
//抓取文件
function get_contents($url){
    $ch =curl_init($url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $str =curl_exec($ch);
    curl_close($ch);
    if ($str !==false) {
        return $str;
    }else {
        return '';
    }  
}
 
//得到扩展名
function get_extend($file_name) { 
	$extend =explode("." , $file_name);
	$va=count($extend)-1;
	return $extend[$va];
} 
 
/**
 * begin
 */
//cdn上存在的各种可能的文件类型
$header = array(
    'js' => 'Content-Type: application/x-javascript',
    'css' => 'Content-Type: text/css',
    'jpg' => 'Content-Type: image/jpg',
    'gif' => 'Content-Type: image/gif',    
    'png' => 'Content-Type: image/png',
    'jpeg' => 'Content-Type: image/jpeg',
    'swf' => 'Content-Type: application/x-shockwave-flash'
);
 
//文件类型
$type = '';
 
//原始请求文件完整路径数组
$files = array();
 
//原始请求文件相对路径数组
$tmp_files = array();

//过滤后的文件完整路径数组，即待抓取的文件列表
//$a_files = array();
//
////文件的最后修改时间
$last_modified_time = 0;
//
////获得当前目录，比如，/home/a.tbcdn.cn/
//$pwd = getcwd().'/';
//
//// request headers
//$request_headers = getallheaders(); 
//
// 输出结果使用的数组
$R_files = array();
// 
////得到请求的前缀
//$prefix = $_SERVER['SCRIPT_NAME'];

// 处理请求中附带的文件列表，得到原始数据
$split_a= explode("??",$_SERVER['REQUEST_URI']);
$tmp_files = explode(",",$split_a[1]);
 
if(preg_match('/,/',$split_a[1])){//多文件
	$_tmp = explode(',',$split_a[1]);
	foreach($_tmp as $v){
		$files[] = $CDN.$v;
	}
}else{//单文件
	$files[] = $CDN.$split_a[1];
}


//// 得到拼接文件的Last-Modified时间
foreach ($files as $k){
	if(file_exists($k)){
		$filemtime = filemtime($k);
		if($filemtime && ($filemtime > $last_modified_time)){
			$last_modified_time = $filemtime;
		}
	}
}


foreach ($files as $k) {
	if(empty($type)) {
		$type = get_extend($k);
    }
//	echo $k;
//	echo filemtime($k);
	//文件存在 todo 检测有问题
//    if(file_exists($k)) {
		$R_files[] = get_contents($k);
//    }
}

$result = join("\n",$R_files);
echo $result;

?>
