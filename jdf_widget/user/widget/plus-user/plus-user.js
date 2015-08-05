$(function(){
	if($('#content').attr('isPlus') && $('#content').attr('isPlus') == '1010'){
		$.ajax({
			type: "POST",
			url: "http://vip.jd.com/index.php?mod=Vip.MemberIndex&action=getPlusInfoByPin",
			dataType: "json",
			success:function(result){
				if(result.success == true){
					var data = result.result.plusPinVo,
						usedCouponCount = data.usedCouponCount,//// 已使用的优惠券
						unUseCouponCount = data.unUseCouponCount,//未使用的优惠券
						userIssue = data.userIssue,// 已返的京豆
						userUnIssue = data.userUnIssue,//未返的京豆
						lessDates = data.lessDates,// 剩余10天
						expireCouponCount = data.expireCouponCount,// 即将过期劵
						closeStatus = data.closeStatus,
						expireDate = data.expireDate;
					// var str = expireDate.split(' ')[0].split('-');
					// year = str[0];
					// month = str[1];
					// date = str[2];
					surDate = lessDates;
					$('#plus-info .item01 span a').html(userIssue+'京豆');
					$('#plus-info .item02 span a').html(unUseCouponCount+'张');
					if(expireCouponCount == 0){
						$('#plus-info .item02 .tips').hide();
					}else{
						$('#plus-info .item02 .tips').html('有'+expireCouponCount+'张即将过期');
					}
					if(closeStatus == 2){
						$('#plus-chart span').html('0');
					}else{
						$('#plus-chart span').html(lessDates);
					}
				}else{
					$('#plus-info .item01 span a').html('0京豆');
					$('#plus-info .item02 span a').html('0张');
					$('#plus-chart span').html('0');
					$('#plus-info .item02 .tips').html('有零张即将过期');
				}
			},
			error:function(){
				alert('请求出错');
			}
		})
	}
})
