/**
 * 全局通用js文件
 * common.info:存放全局通用属性
 * 目录的对应js交互， 请写在对应的cvresume.main.xxx_event方法里去，如要新增,命名规则：cvresume.main.目录名_event
 */
var common = common || {};
common.main = common.main || {};
//全局参数绑定
common.info={
	//异步加载
	isReload:true,//是有已加载，默认是已加载
	isMaxPage:false,//是否是最大页码
	reloadWallfulPage:2//页码	
};
//PC/WAP链接映射
//注意：匹配规则顺序问题
common.urlMapping={
	"^/member/myresume/$" : {url:"/mobile/member/",params:[]},//个人中心-我的简历
	"^/member/message_notification/$" : {url:"/mobile/member/message/",params:[]},//个人中心-消息中心
	"^/member/set/$" : {url:"/mobile/member/set/",params:[]},//个人中心-我的设置
	"^/member/hr/center/(\\d*)/$" : {url:"/mobile/member/hr/index/",params:[]},//求职行家-我是HR
	"^/member/hr/detail/$" : {url:"/mobile/member/hr/order_detail/",params:[{"id":"orderId"}]},//求职行家-订单详情
	"^/member/hr/eval/$" : {url:"/mobile/member/hr/eval/",params:[]},//求职行家-评价管理
	"^/member/hr/hr_task/$" : {url:"/mobile/member/hr/hr_task/",params:[]},//求职行家-求职任务
	"^/member/hr/earning_record/$" : {url:"/mobile/member/hr/earning_record/",params:[]},//求职行家-收益记录
	"^/member/hr/job_management/$" : {url:"/mobile/member/hr/job_management/",params:[]},//求职行家-岗位管理
	"^/member/hr/job_handle/$" : {url:"/mobile/member/hr/job_handle/",params:[]},//求职行家-岗位处理	
	"^/member/order/$" : {url:"/mobile/member/order/",params:[]},//个人中心-我的订单
    "^/member/coupon/$" : {url:"/mobile/member/coupon/",params:[]},//个人中心-优惠券
	"^/member/workOrder/$" : {url:"/mobile/member/workOrder/",params:[]},//个人中心-我的工单
	"^/member/workOrder/create/$" : {url:"/mobile/member/workOrder/create/",params:[]},//个人中心-我的工单-创建工单
	"^/member/workOrder/([A-Za-z\\d]*)/$" : {url:"/mobile/member/workOrder/{0}/",params:[]},//个人中心-我的工单-工单详情
	"^/hr/$" : {url:"/mobile/hr/index/",params:[]},//求职行家
	"^/customize/$" : {url:"/mobile/hr/index/",params:[]},//求职行家
	"^/hr/hr_list/$" : {url:"/mobile/hr/list/",params:[]},//求职行家-hr列表
	"^/hr/select_publish_type/$" : {url:"/mobile/hr/select_publish_type/",params:[]},//求职行家-选择发布任务类型
	"^/hr/case_detail/(\\d*)/$" : {url:"/mobile/hr/case_detail/?caseId={0}",params:[]},//求职行家-案例详情
	"^/hr/publish_([A-Za-z]*)/$" : {url:"/mobile/hr/publish_{0}/",params:[]},//求职行家-发布需求
	"^/hr/job_detail/(\\d*)/$" : {url:"/mobile/hr/job_detail/{0}/",params:[]},//求职行家-岗位详情
	"^/hr/([A-Za-z\\d]*)/$" : {url:"/mobile/hr/{0}/",params:[]},//求职行家-hr详情
	"^/login/$" : {url:"/mobile/login/",params:[]},//登录
	"^/template/$" : {url:"/mobile/template/",params:[]},//模板商城
	"^/template/find([-A-Za-z\\d]*)/$": {url:"/mobile/template/",params:[]},//模板商城
	"^/template/(\\d*).html$": {url:"/mobile/template/{0}.html",params:[]},//商品详情
	"^/cvresume/edit/$": {url:"/mobile/cvresume/edit/",params:[]},//文档编辑器
	"^/newcvresume/edit/$": {url:"/mobile/newcvresume/edit/",params:[]},//新版文档编辑器
}
common.main = {
	init_:function(){//事件初始化
		common.main.event_();//全局事件初始化
		common.main.dropresume_event();//自由编辑事件
		common.main.cvresume_event();//在线简历事件
		common.main.editresume_event();//在线简历事件
		common.main.hr_event();//定制商城事件
		common.main.print_event();//打印商城事件
		common.main.member_event();//个人中心事件
		common.main.team_vip_event();//集体会员子会员管理事件
		common.main.urlMapping();
		common.main.onlineKefu();//在线客服
		common.main.request_job_json();// 接口获取岗位列表
		common.main.advert_operation();
		// 优惠券活动  在线编辑  和 登录页 不出现
		if(
			!(window.location.href.indexOf("cvresume/") >= 0 ||
			window.location.href.indexOf("/order/vip_member/") >= 0 ||
			window.location.href.indexOf("/login/") >= 0 ||
			window.location.href.indexOf("/register/") >= 0)
		) {
			common.main.get_discount_ticket();
			common.main.top_discount_ticket();
		}
		if( window.location.pathname === '/' || window.location.pathname === "/member/myresume/") {
			common.main.recruit_event();
		}
	},
	event_: function () {//全局事件绑定
		//如果是ie9添加class
		if(common.main.isIE9()){
			$("html").addClass("ie9");
		}	    	
		//导航选中
		var pathName = window.location.pathname;
		var $navli = $('.nav-li');
		$navli.removeClass('current');
		switch (true) {
			// 模板中心页
			case pathName.indexOf('/cvresume') > -1:
				$navli.eq(0).addClass('current');
				break;
			// 求职行家页
			case pathName.indexOf('/customize') > -1:
			case pathName.indexOf('/hr') > -1:
				$navli.eq(1).addClass('current');
				break;
		}
		//获取消息个数
		if(common.main.check_login_by_cookie()){
			$.get(wbdcnf.base+"/common/get_message_notification_count/",function(data){
				var $message_notification=$("#user_center i");
				if(data>0){
					$message_notification.show();
					$('#userHead li.gd').find('s').text(data);
					$('#userHead li.gd').find('s').css('visibility','visible');
				}else{
					$message_notification.hide();
					$('#userHead li.gd').find('s').css('visibility','hidden');
				}
			});
		}else{
			$("#user_center i").hide();
		}
		//百度打点数据
		try{
			$(document).on("click",".500dtongji",function(){
				var lable=$(this).attr("data_track");
				if(lable!=null&&lable!=""&&lable!=undefined){
					window._hmt && window._hmt.push(['_trackEvent', lable, 'click']);
				}
			});
		}catch(e){
			console.log("统计埋点错误~");
		}
		//百度推广统计来源记录
		try{
			var sparam="";
			var f = common.main.getUrlParamString("f");
			var from =common.main.getUrlParamString("from");
			var bd_vid =common.main.getUrlParamString("bd_vid");
			//特殊连接处理--PC推广追踪
			if(from && from!=undefined&&(from=="22661"||from=="22662"||from=="22663")){
				f=from;
				from=undefined;
			}
			if (f && f!=undefined){
				sparam="f="+f;
			}
			if (from && from!=undefined){
				if (f && f!=undefined){
					sparam=sparam+"&";
				}
				sparam=sparam+"code="+from+"&isCover=true";
			}
			//百度opcp回传
			if (bd_vid && bd_vid!=undefined){
				if(sparam != ""){
					sparam=sparam+"&";
				}
				sparam=sparam+"bd_vid="+bd_vid;
			}
			if (sparam && sparam!=undefined &&sparam!=""){
				$.getScript(location.protocol+"//www.500d.me/index/setSource/?"+sparam,function(){});
			}
			if(location.hostname!="www.500d.me"){
				$.getScript("/index/setSource/?"+sparam,function(){});
			}
		}catch(e){
				
		}
		//图片延迟加载
		try{
			$("img.lazy").lazyload({
				threshold : 200
			});
		}catch(e){
			console.log("图片延迟加载错误~");
		}
		//商桥客服处理，如果没有没有在线人工客服标记，则隐藏客服
		try{
			var $onlineFlag=$("#onlineFlag");
			if($onlineFlag==null||$onlineFlag==undefined||$onlineFlag.length<=0){
				var style_css='<style>#newBridge{display:none !important}</style>'
				$("body").after($(style_css));
			}
		}catch(e){
			console.log("商桥客服处理错误~");
		}
		//全局复制事件
		$(".copy_url_btn").click(function(){
			var str = $(".ym-input").val();
			common.main.copyToClipBoard(str);
		})
		//全局登录信息绑定
		common.main.loginMsg();
		//全局二维码扫码事件
		$(document).on("click",".jl-header .jl-ej-nav .sj-btn",function(){
			common.main.resume_confirm({
				title:"",
				content_html:"<span></span><p>微信扫一扫，开始制作你的简历</p>",	
				tips_modal_class:"mobile_ewm_modal",
				modal_class:"index-mobile-content",
				ok:"",
				cancel:"",
				onOk:function(){
				
				}
			});		    		
		});
		// 向jQuery添加方法
		$.fn.extend({
			// 富文本框黏贴事件去除格式
			insertAtCaret: function (myValue) {
				if (document.selection && document.selection.createRange) {
					document.selection.createRange().pasteHTML(myValue);
				}else if (window.getSelection && window.getSelection().getRangeAt(0)){
					var j = window.getSelection();
					var range = j.getRangeAt(0);
					range.collapse(false);
					var node = range.createContextualFragment(myValue);
					var c = node.lastChild;
					range.insertNode(node);
					if(c){
						range.setEndAfter(c);
						range.setStartAfter(c)
					}
					j.deleteFromDocument();
					j.removeAllRanges();
					j.addRange(range);
				}
			},
			// 设置光标位置到dom上
			placeCaretAtEnd: function () {
				$(this).focus();
				if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
					var range = document.createRange();
					range.selectNodeContents($(this).get(0));
					range.collapse(false);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				} else if (typeof document.body.createTextRange != "undefined") {
					var textRange = document.body.createTextRange();
					textRange.moveToElementText($(this).get(0));
					textRange.collapse(false);
					textRange.select();
				}
			},
		});
	},
	index_event:function(){},
	hr_page_init_event:function(){
	},
	dropresume_event:function(){
		$(document).on("click","#dropdownloadPdfBtn:not(.wbd-vip-lock)",function(){
			var id=$("#hidden_data_resume_id").val();
			if(common.main.is_empty(id)){
				layer.msg("请先保存简历~");
				return false;
			}
			var downloadUrl="";
			$.ajax({type : "get",
				cache: false,
				async : false,
				url : "/cvresume/get_download_url/"+id+"/",
				success : function(message) {
					if(message.type=="success"){
						downloadUrl=message.content;
					}else{
						layer.msg(message.content);
					}
				}
			});
			if(!common.main.is_empty(downloadUrl)){
				var timestr=new Date().getTime();
				var reg=/_\d*\.pdf/;
				downloadUrl=downloadUrl.replace(reg,"_"+timestr+".pdf");
				window.open(downloadUrl);
			}
		});
	},
	template_down_event:function(){
		$(document).on("click","#template_download_btn:not(.wbd-vip-lock)",function(){
			var _id=$(this).attr("data-id");
			//检查是否超过限制
			var result="0";
			$.ajax({
				url: wbdcnf.base + "/order/check_product_downtimes/",
				type: "GET",
				dataType: "json",
				data:{"pid":_id},
				cache: false,
				async: false,
				success: function(data) {
					result = data;
				}
			});
			if(result.type=="error"&&result.content=="0"){
					//未登录
					show_login_modal();
			}else if(result.type=="error"&&result.content=="1"){
					//没有权限
						common.main.vip_opt_tips("template");
			}else if(result.type=="error"&&result.content=="-1"){
					//商品不存在
					layer.msg("商品不能存在，请刷新重试");
			}else if(result.type=="error"&&result.content=="3"){
					//提示超过每天限制
					common.main.temp_download_modal();
			}else if(result.type=="success"){
					//可以下载
					window.open(result.content);
			}
		});
	},
	cvresume_event:function(){	    	
		//发布页面的下载按钮
		$(document).on("click","#releaseDownloadPDFBtn:not(.wbd-vip-lock)",function(){
			var visitid=$(this).attr("data_visitid");
			var id=$(this).attr("data_id");
			var downloadFlag=false;
			var downloadUrl="";
			if(!downloadFlag){
				$.ajax({type : "get",
					cache: false,
					async : false,
					url : "/cvresume/get_download_url/"+id+"/",
					success : function(message) {
						if(message.type=="success"){
							downloadUrl=message.content;
							downloadFlag=true
						}else{
							layer.msg(message.content);
						}
					}
				});
			}
			if(downloadFlag){
				var timestr=new Date().getTime();
				var reg=/_\d*\.pdf/;
				downloadUrl=downloadUrl.replace(reg,"_"+timestr+".pdf");
				window.open(downloadUrl);
				//下载提示
				var param=location.search;
				if(param!=""&&visitid!=""&&visitid!=undefined){
					var rclid=common.main.getUrlParamString("rclid");
					$.post("/cvresume/resume_email_track/",{"rclid":rclid,"replyType":"hrDownload"},function(data){
						
					})
				}
			}
		});
	},
	editresume_event:function(){
		//简历同步导入
		common.main.resume_import();
		//简历导入
		$(document).on("click",".import_resume_btn:not(.wbd-vip-lock),.show_import_btn:not(.wbd-vip-lock)",function(){
			if($.checkLogin()){
				$("#importRModal").modal("show");
			}else{
				show_login_modal();
				return;
			}
		});
		//登录
		$(".unlogin a").click(function(){
			show_login_modal();
		});
	},
	resume_cases_event:function(){
		var _isPreview = false;//是否预览案例
		common.info.isReload = true;
		common.info.isMaxPage=false;
		var win=$(".zx-con-box"); //得到窗口对象
		win.scroll(function(){
			if(_isPreview){
				return;
			}
			win_scroll();
		}); 
			
		// 滚动条兼容性处理（除了Webkit内核，其他隐藏滚动条）
		if (!(navigator.userAgent.indexOf('Chrome') >= 0 || navigator.userAgent.indexOf('Safari') >= 0)){
			$("#case-modal .zx-con-box").css({"width":"102%","padding-right":"10px"})
		}

		//左侧导航二级显示隐藏事件
		$(document).on("mouseover","#case-modal .zx-mblist-nav .nav-box",function(){
			$(this).addClass("current");
		});
		$(document).on("mouseleave","#case-modal .zx-mblist-nav .nav-box",function(){
			$(this).removeClass("current");
		});
		//加载案例
		function get_cases(href,keyword){
			if(common.main.contain_emoji(keyword)){
				layer.msg("请填写正确的搜索内容~");
				return;
			}
			common.info.isReload = true;
			common.info.isMaxPage = false;
			common.info.reloadWallfulPage=1;
			$("#case-modal .list").remove();
			if(common.main.is_empty(keyword)){
				$("#case-modal #keyword").val("");
			}
			$.get(href,{"keyword":keyword,"itemid":cvresume.info.itemid},function(result){
				$("#case-modal .zx_caselist .zx_case_box").append(result);
				$('#case-modal .zx_case_box').attr("data-url",href);
			});
		};
		//左侧导航点击事件
		$("#case-modal .zx-mblist-nav .nav-box a").click(function(){
			common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-行业类型选区-通用-行业");
			$(this).addClass("checked").siblings().removeClass("checked");
			$(this).parents("dl").siblings().find("a.checked").removeClass('checked');
			$(this).parents(".nav-box").siblings().find("a.checked").removeClass('checked');
			var language = $('.case_modal .language button.checked').text() === '中文' ? 'y1-' : 'y2-';
			var url_tag = language + $(this).attr("data_url");
			var href="/cvresume/cases/"+url_tag+"/";
			get_cases(href,null);
		});
		//右侧搜索按钮点击事件
		$("#case-modal #seachBtn").click(function(){
			common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-搜索区-左上-搜索");
			var _keyword = $("#case-modal #keyword").val();
			var href="/cvresume/cases_list/";
			get_cases(href,_keyword);
		});
		//右侧搜索输入框回车事件
		$("#case-modal #keyword").keypress(function(){
			common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-搜索区-左上-搜索");
			if(event.keyCode == 13){
				var _keyword = $("#case-modal #keyword").val();
				var href="/cvresume/cases_list/"
				get_cases(href,_keyword);
			}
		});
		// 中英文选择事件
		$(".case_modal .language button").on("click",function(){
			$(this).addClass("checked").siblings().removeClass("checked");
			var href=$(this).attr("data_href");
			get_cases(href,null);
			if($(this).text()=="中文"){
				common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-语言类型选区-通用-中文");
			}else{
				common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-语言类型选区-通用-英文");
			}
			
		})
		// 行业展开事件
		$(".case_modal .modal-body .doc_category i").on("click",function(){
			$("#case-modal .doc_category>i").toggleClass("checked")
			$("#case-modal .zx-mblist-nav").toggleClass("checked")
		})
		//滚动加载
		function win_scroll(){
			//计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，
			var _itemNum=$('#case-modal .zx_caselist').find('.zx_case_box .list').length;
			if(_itemNum>=15&&common.info.isReload&&!common.info.isMaxPage){
				var _itemArr=[];
				_itemArr[0]=$('#case-modal .zx_caselist').find('.zx_case_box .list').eq(_itemNum-1).offset().top+$('#case-modal .zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
				_itemArr[1]=$('#case-modal .zx_caselist').find('.zx_case_box .list').eq(_itemNum-2).offset().top+$('#case-modal .zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
				_itemArr[2]=$('#case-modal .zx_caselist').find('.zx_case_box .list').eq(_itemNum-3).offset().top+$('#case-modal .zx_caselist').find('.zx_case_box .list').eq(_itemNum-1)[0].offsetHeight;
				if  ($('#case-modal .zx-con-box').scrollTop() > $('#case-modal .zx_case_box').height() - $('#case-modal .zx-con-box').height()-50){
					common.info.isReload=false;
					reload()
				}
			}
		};
		//加载数据
		function reload(){
			var _dataUrl = $('#case-modal .zx_case_box').attr("data-url");
			var _itemid  = $('#case-modal .zx_case_box').find('.list').eq(0).attr("data_itemid");
			var _resumeid  = $('#case-modal .zx_case_box').find('.list').eq(0).attr("data_resumeid");
			var _requetUrl;
			if(_dataUrl.indexOf("?")!=-1){
				_requetUrl = _dataUrl + "&pageNumber=" + common.info.reloadWallfulPage;
			}else{
				_requetUrl = _dataUrl + "?keyword=" + $("#keyword").val() + "&pageNumber=" + common.info.reloadWallfulPage;
			}
			$.get(_requetUrl, function(result){
				if(result.indexOf("jl_search_null")!=-1){
					common.info.isMaxPage = true;
				}else{
					$('#case-modal .zx_case_box').append(result);
					common.info.isReload = true;
					common.info.reloadWallfulPage=common.info.reloadWallfulPage+1;
					$('#case-modal .list').attr("data_itemid",_itemid);
					$('#case-modal .list').attr("data_resumeid",_resumeid);
				}
			});
		}
		//案例详情显示隐藏
		$(document).on("click", "#case-modal .zx_case_detail .return", function(){
			$(".case_modal .zx_case_detail").removeClass("show");
			$(".case_modal .zx_caselist").css({"opacity":"1"},{"z-index":"120"},{"transition":"all 0.3s"});
			$(".case_modal .modal-header").css("display","block");
			$(".case_modal .modal-body").css("display","block");
			_isPreview = false;
		});
		$(document).on("click", ".case_modal .list .preview", function(){
			var $list = $(this).closest(".list"),
				_dataStyle=$list.attr("data-style"),
				_contentId= $list.attr("data_resume_contentid"),
				_itemid=$list.attr("data_itemid"),
				_base_itemid=$('#resume_base').attr('data_itemid');
			var _href;
			if(_itemid!=null&&_itemid==535){
				_href="/dropcvresume/edit/?resumeContentId="+_contentId+"&resumeId="+cvresume.info.resumeid+"&itemid="+_itemid;
			}else{
				_href="/cvresume/edit/?resumeContentId="+_contentId+"&resumeId="+cvresume.info.resumeid+"&itemid="+_base_itemid;
			}
			$list.addClass("checked").siblings().removeClass("checked");
			$(".case_modal #dongtaicss").attr("href", _dataStyle);
				$.get("/cvresume/resume_case_detail/",{"resumeContentId":_contentId}, function(dataHtml){
				$(".case_modal .zx_case_detail").empty();
				$(".case_modal .zx_case_detail").append(dataHtml);
				$(".case_modal .zx_case_detail").addClass("show");
				$(".case_modal .select_case").attr("data_href",_href);
				preview_resume_module_sort();
				$(".case_modal .zx_caselist").css({"opacity":"0"},{"z-index":"-1"},{"transition":"all 0.3s"});
				$(".case_modal .modal-header").css("display","none");
				$(".case_modal .modal-body").css("display","none");
				_isPreview = true;
				common.main.listen_unlogin_copy();
			});
			$(".case_modal .zx-mblist-nav").removeClass("fixednav");
		});
		// 应用案例详情
		$(document).on("click",".case_modal .zx_case_detail .select_case",function(){
			var _href=$(this).attr("data_href");
			$(".modal-backdrop").remove();
			$("#case-modal").css("display","none")
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='tips_title'>确定应用此内容范文？</span><span class='tips-content'>应用后已编辑的简历内容将被覆盖。</span><label class='neverNotfy'><input type='checkbox' id='checkedNotfy' class='checkedNotfy'><span>不再提醒</span></label>",
				tips_modal_class:"confirm_modal",
				modal_class:"tips-modal-content change_content_confirm case_confirm_modal",
				onOk:function(){
					common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-范文选区-通用-范文查看-应用此范文");
					location.href=_href;
				},
				onCancel:function(){
					$("#case-modal").css("display","block")
					$("#case-modal").css({"background":"rgba(0,0,0,0.85)"})
					$("#case-modal").css("animation","none")
				}
			});
			$(".case_confirm_modal .close").on("click",function(){
				$("#case-modal").css("display","block")
				$(".case_confirm_modal").modal("hide");
				$(".case_confirm_modal").remove();
				$("#tips-common-modal").remove()
				$("body").removeClass("suggestModal");
				$("body").removeClass("modal-open");
					return false
			});
		});

		function preview_resume_module_sort(){
			var _sortPosition = new Array("Left","Top","Right","Bottom")
			var _resume_sort=$("#resume_base").attr("resume_sort");
			var _template_set=$("#resume_base").attr("template_set");
			if(!common.main.is_empty(_resume_sort)){
				var _sort = JSON.parse(_resume_sort);
				if(_sort){
					var _classStr="#resume_base .wbdCv-base";
					$(_sortPosition).each(function(i,item){//遍历方位
						var _pos = _sort[item.toLocaleLowerCase()];
						var $preModuleId;
						$(_pos).each(function(j,jtem){//遍历各方位的id
							if(common.main.is_empty($preModuleId)){
								$(_classStr+item).prepend($("#"+jtem));//在所在方位的div开头添加节点
							}else{
								$($preModuleId).after($("#"+jtem));//在前一个节点后添加节点
							}
							$preModuleId=$("#"+jtem);//把当前节点作为下次循环的子节点
						});
					});
				}
			}else if(!common.main.is_empty(_template_set)){
				var _settings = JSON.parse(_template_set);
				if(_settings){
					var _classStr="#resume_base .wbdCv-base";
					$(_sortPosition).each(function(i,item){//遍历方位
						var _pos_set = _settings[item.toLocaleLowerCase()];
						var $preModuleId;
						$(_pos_set).each(function(j,jtem){
							//隐藏
							if(!jtem.isShow){
								$("#"+jtem.key).addClass("hidden");
							}
							//移位
							if(common.main.is_empty($preModuleId)){
								$(_classStr+item).prepend($("#"+jtem.key));
							}else{
								$($preModuleId).after($("#"+jtem.key));
							}
							$preModuleId=$("#"+jtem.key);
						});
					});
				}
			}
		}
		// 点击遮罩关闭弹窗
		$("#case-modal .modal-dialog").on("click", function(e){
			if($(e.target).hasClass("modal-dialog")) {
				$(this).parent().modal("hide");
			}
		});
	},
	// 范文详情- 通过鼠标按下前后坐标位置判断是否进行复制操作
	listen_unlogin_copy:function () {
		try{
			if(!getCookie("memberId")){
				if($(".case_detail").length>0){
					var _modal = ".case_detail";
				}else if($(".zx-preview-ld").length>0){
					var _modal = ".zx-preview-ld"
				}else{ return }
				var x ,y;
				$(document).on("mousedown", _modal ,function(event){ //获取鼠标按下的位置
					x = event.pageX;
					y = event.pageY;
					$(this).addClass("noselect"); //禁止选中文字
				});
				$(document).on("mouseup", _modal ,function(event){ //鼠标释放
					var newX = event.pageX;
					var newY = event.pageY;
					if(x != newX && y != newY){
						//鼠标前后位置不同 用户欲进行复制操作
						layer.msg("登录后才可以复制哦~");
					}
				})
			}
		}catch(e){
			console.log("限制复制异常:"+e)
		}
	},
	agreement_event:function(){
		//设置标杆
		var _line=parseInt($(window).height()/3);
		$(window).scroll(function(){
			$('.agreement_nav li').eq(0).addClass('active');
			//滚动到标杆位置,左侧导航加active
			$('.agreement_content li').each(function(){
				var _target=parseInt($(this).offset().top-$(window).scrollTop()-_line);
				var _i=$(this).index();
				if (_target<=0) {
					$('.agreement_nav li').removeClass('active');
					$('.agreement_nav li').eq(_i).addClass('active');
				}
				//如果到达页面底部，给左侧导航最后一个加active
				else if($(document).height()==$(window).scrollTop()+$(window).height()){
					$('.agreement_nav li').removeClass('active');
					$('.agreement_nav li').eq($('.agreement_content li').length-1).addClass('active');
				}
			});
		});
		$('.agreement_nav li').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			var _i=$(this).index();
				$('body, html').animate({scrollTop:$('.agreement_content li').eq(_i).offset().top-_line},500);
		});
	},
	resume_import:function(){//简历导入
		//导入简历tab切换
		$('.importRnav .resumeSource input[name="importly"]').on('change', function(){
			var $parent = $(this).parents('li');
			$parent.addClass('checked').siblings().removeClass("checked");
			// 显示对应内容
			var num = $parent.index();
			var $relation = $('.importRcon .source_opearte li').eq(num);
			$relation.addClass("current").siblings("li").removeClass("current");
			if($parent.hasClass('source_clone')){
				$("#copy_resume_id option").remove();
				$.get("/cvresume/resume_list/",{},function(result){
					if(result!=null){
						$("#copy_resume_id").append(result);
					}
				});
			}
		});			
		//点击"选择HTML文件按钮"进行导入本地已经下载了的html格式简历文件
		$(".importRcon .a-input").click(function(){
			$(this).siblings("input").trigger("click");
		});
		//导入简历提示,显示文件名
		$("input[name='filename']").on('change', function(){
			var name = $(this).val();
			$(this).siblings("span.addr").text(name);
		});
		//51导入
		$("#51job_import").click(function(){
			var $this=$(this);
			var name = $this.closest("li").find("input").val();
			if(name==""||name==null){
				layer.msg("请选择文件上传");
				return;
			}
			if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
				layer.msg("亲，登录后才可以导入简历哦~");
				return false;
			}
			var fileName = name.substring(name.lastIndexOf("\\") + 1);
			var fileType = name.substring(name.lastIndexOf(".") + 1);
			//校验文件格式是否正确
			if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
				$("#importResetModal").modal("show");
				$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
				$("#importRModal").modal("hide");
				return;
			}
			$this.prop("disabled",true);
			show_pro($this.closest("li").find("div.progressbar"),1);
			read_local_file($this.closest("li").find("input")[0],"206","");
			setTimeout(function(){
				$this.prop("disabled",false);
			},2000);
		});
		
		//智联简历导入
		$("#zhilian_import").click(function(){
			var $this=$(this);
			var name = $this.closest("li").find("input").val();
			if(name==""||name==null){
				layer.msg("请选择文件上传");
				return;
			}
			if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
				layer.msg("亲，登录后才可以导入简历哦~");
				return false;
			}
			var fileName = name.substring(name.lastIndexOf("\\") + 1);
			var fileType = name.substring(name.lastIndexOf(".") + 1);
			//校验文件格式是否正确
			if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
				$("#importResetModal").modal("show");
				$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
				$("#importRModal").modal("hide");
				return;
			}
			//判断用户权限
			$this.prop("disabled",true);
			show_pro($this.closest("li").find("div.progressbar"),1);
			read_local_file($this.closest("li").find("input")[0],"206",""); 
			setTimeout(function(){
				$this.prop("disabled",false);
			},2000);
		});
		//拉勾简历导入
		$("#laggou_import").click(function(){
			var $this=$(this);
			var name = $this.closest("li").find("input").val();
			if(name==""||name==null){
				layer.msg("请选择文件上传");
				return;
			}
			if(typeof cvresume != "undefined"&&cvresume.main.is_empty(cvresume.info.memberid)){
				layer.msg("亲，登录后才可以导入简历哦~");
				return false;
			}
			var fileName = name.substring(name.lastIndexOf("\\") + 1);
			var fileType = name.substring(name.lastIndexOf(".") + 1);
			//校验文件格式是否正确
			if(fileType.toLocaleLowerCase() != "html" && fileType.toLocaleLowerCase() != "htm") {
				$("#importResetModal").modal("show");
				$("#importResetModal").find(".tips_show").text("只支持HTML，HTM格式，请重新选择导入");
				$("#importRModal").modal("hide");
				return;
			}
			$this.prop("disabled",true);
			show_pro($this.closest("li").find("div.progressbar"),1);
			read_local_file($this.closest("li").find("input")[0],"206","");
			setTimeout(function(){
				$this.prop("disabled",false);
			},2000);
		});
		//本地简历复制
		$("#copyt_import").click(function(){
			var $this=$(this);
			var resumeid=$("#copy_resume_id").val();
			if(resumeid==null||resumeid==undefined||resumeid==""){
				layer.msg("请选择你需要复制的简历");
				return;
			}
			show_pro($this.closest("li").find("div.progressbar"),1);
			if(typeof cvresume != "undefined"){
				common.main.resumeOperationLogUpload(resumeid,"copyresume","","复制至简历（ID："+cvresume.info.resumeid+"）");
				if(window.sessionStorage) {
					window.sessionStorage.removeItem("history");
					cvresume.main.resume_save_history();
				}
				location.href="/cvresume/clone/"+resumeid+"/?clone2ResumeId="+cvresume.info.resumeid;
			}else{
				common.main.resumeOperationLogUpload(resumeid,"copyresume","","创建简历");
				location.href="/cvresume/clone/"+resumeid+"/";
			}
		});
		//简历导入的进度条显示
		function show_pro(tag,time){
			if(time==null||time==undefined){
				time=1;
			}
			tag.show();
			var ss_pro=100/(time*10);
			var sum_width=0;
			intervalid=setInterval(function(){
				sum_width=sum_width+ss_pro;
				update_pro(Math.round(sum_width)+"%",tag);
				if(sum_width>=95){
					sum_width=0;
					clearInterval(intervalid);
					//hide_pro();
				}
			},100);
			
		}	
		function update_pro(width,tag){
			tag.find("i").css("width",width);
			tag.find("span").text(width);
		}
		function hide_pro(){
			update_pro("100%",$("div.progressbar").find("div.progressbar"));
			clearInterval(intervalid);
			setTimeout(function(){
				$("div.progressbar").fadeOut("slow");
			},1000);
			setTimeout(function(){
				$("div.progressbar").find("i").css("width","0%");
				$("div.progressbar").find("span").text("0%");
			},2000);
		}
		$(".zx-dr-tips .span-close").click(function(){			
			$(".zx-dr-tips").css('display','none');
			return false;
		});
	},
	hr_event:function(){
		//离线提示框
		$('.hr-detail-fwnr .hr-lx a').click(function(){
			var $this=$(this);
			var caseid=$(this).attr("data_casesid");
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师好像暂时没有时间接单，你可以先去了解一下其他HR老师哟~</span>",					
				modal_class:"delete-content",
				ok:"确定",
				cancel:"取消",
				onOk:function(){
				$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
						if(message.type=="success"){
							window.location.reload();
						}else{
							$.message("warn",message.content);
						}
					});
				
				}
			});	    		
		});	
		$('.hr-detail-fwnr .hr-ml #pay_btn').click(function(){
			var $this=$(this);
			var caseid=$(this).attr("data_casesid");
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>提示</span><span class='delete-tips'>这位HR老师手上正在处理的订单太多啦，暂时不接受下单，亲可以去看看其他HR老师哦~</span>",					
				modal_class:"delete-content",
				ok:"确定",
				cancel:"取消",
				onOk:function(){
				$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
						if(message.type=="success"){
							window.location.reload();
						}else{
							$.message("warn",message.content);
						}
					});
				
				}
			});	    		
		});		    	
	},
	print_event:function(){
		
	},
	member_event:function(){
		//我的简历下载
		var _href,_html;
		$(document).on("click",".wbd-member-contentresume .down_btn",function(){
			var $this = $(this);
			$.get("/member/down_ad_data/",function(message){
				
				if(message.type=="success"){					
					var _content = JSON.parse(message.content);
					if(_content.can_down){
						_href = $this.attr("data-href");
						window.location.href = _href;
					}else{
						_href = location.protocol+"//www.500d.me/order/vip_member/";
						window.location.href = _href;	
					}
				}
			}); 
		});		    	
		$(document).on("click",".wbd_resume_download_modal .a_download_reusme,.wbd_resume_download_modal .a_img",function(){
			$(".wbd_resume_download_modal").modal("hide");
		});
		//个人在线会员升级操作
		$(".huiyuan-upload").click(function(){
			common.main.vip_opt_tips();
		});
		//个人中心设置弹框隐藏
		$("#setResumeModal .wbd-vip-lock").click(function(){
			// 获取权限接口删除 wbd-vip-lock 这个class后  页面加载完查找到的dom节点仍然被绑定着这个class
			if($(this).hasClass("wbd-vip-lock")) {
				$("#setResumeModal").modal("hide");
			}
		});
		//我的主页select	    	
		$(".myhome-select-cv .select-btn").on('click',function(event){
			event.stopPropagation();
			event.preventDefault();
			if($(this).siblings(".select-box").hasClass('hidden')){
					$(this).siblings(".select-box").removeClass("show");
			}else{
				$(this).siblings(".select-box").addClass("show");
			}
		});
		//我的简历
		$(document).on("click",".zxjl-ul .set-btn",function(event){
			event.stopPropagation();
			event.preventDefault();
			$(this).parents(".item").siblings().find(".set-box").removeClass("show");
			$(this).find(".set-box").toggleClass("show");
		});
		$(".zxjl-ul .item").each(function(){
			if ($(this).hasClass("doc_resume")) {
				$(this).find(".set-btn .set-box-list.qh b").text("切换手机简历");
				$(this).find(".set-btn .set-box-list.qh s").removeClass("web").addClass("wap");			
			}else if($(this).hasClass("wap_resume")) {
				$(this).find(".set-btn .set-box-list.qh b").text("切换文档简历");
				$(this).find(".set-btn .set-box-list.qh s").removeClass("wap").addClass("web");	
			}
		});
		$(document).on("click",".set-box-list.qh s",function(event){
			if ($(this).hasClass("wap")) {
				$(this).removeClass("wap").addClass("web");
				$(this).siblings("a").find("b").text("切换文档简历");
				
			}else{
				$(this).addClass("wap").removeClass("web");
				$(this).siblings("a").find("b").text("切换手机简历");
			}
		});					
		//旧版删除简历提示（winna）
		$(document).on('click', '.del_resume', function() {
			var $this=$(this);
			var data_id=$(this).attr("data-id");				
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>确定删除当前简历吗？</span><span class='delete-tips'>简历删除后将无法恢复。</span>",
				modal_class:"delete-content",
				ok:"确定",
				cancel:"取消",
				onOk:function(){
					var url="/editresume/delete/?resumeId="+data_id;
					$.get(url, function(message) {
						if(message.type == "success"){
							window.location.reload();
						}else{
							layer.msg(message.content);
						}
					});
				}
			});
		});	 
		$(document).on('click', '.del_cvresume', function() {
			var $this=$(this);
			var data_id=$(this).attr("data-id");	
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>确定删除当前简历吗？</span><span class='delete-tips'>简历删除后将无法恢复。</span>",					
				modal_class:"delete-content",
				ok:"确定",
				cancel:"取消",
				onOk:function(){
					common.main.resumeOperationLogUpload(data_id,"delete","","");//日志上报      
					var url="/cvresume/delete/"+data_id + "/";
					$.get(url, function(message) {
						if(message.type == "success"){
							window.location.reload();
						}else{
							layer.msg(message.content);
						}
					});
				}
			});
		});				
		//我是hr回复评论
		$('.hr_eval .eval_list .eval_btn').click(function(){
			var $this=$(this);
			var data_id=$(this).attr("data_id");
			var reply=$(this).attr("data");
			common.main.resume_confirm({
				title:"回复评论",
				content_html:"<div contenteditable='true'></div>",					
				modal_class:"hr_eval_content",
				ok:"确定",
				cancel:"取消",
				onOk:function(){
					var content = $(".hr_eval_content div[contenteditable]").text();
					if(content.length==0){
						layer.msg("字数不能为空");
						return ;
					}
					if(content.length>200){
						layer.msg("字数不能超过200字");
						return ;
					}
					$.post("/member/hr/reply/",{"id":data_id,"content":content},function(message){
						if(message.type=="success"){
							layer.msg("回复成功");
							window.location.reload();
						}else{
							$.message("warn",message.content);
						}
					});
					
				}
			});	 
			$(".hr_eval_content div[contenteditable]").text(reply)
		});
		//删除案例提示框
		$('.hr_case_content .span_btn .del').click(function(){
			var $this=$(this);
			var caseid=$(this).attr("data_casesid");
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>确定删除当前案例吗？</span><span class='delete-tips'>案例删除后将无法恢复。</span>",					
				modal_class:"delete-content",
				ok:"确定",
				cancel:"取消",
				onOk:function(){
				$.get("/member/hr/deleteCases/?caseid="+caseid,function(message){
						if(message.type=="success"){
							window.location.reload();
						}else{
							$.message("warn",message.content);
						}
					});
				
				}
			});	    		
		});	
		//警告弹框
		$(document).on("click",".ts",function(){
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>提醒</span><span class='delete-tips'>您选择的HR尚未上传已完成简历，无法确认订单。</span>",					
				modal_class:"delete-content",
				ok:"确定",
				cancel:"取消",
				onOk:null
			});	    		
		});
		//专家服务完成案例提示框
		$(document).on("click",".hr_li .complete:not(.yituikuan),.task_hr_li .complete:not(.yituikuan)",function(){
			var $this=$(this);
			var sn=$(this).attr("data_sn");
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='delete-title'>确认完成订单？</span><span class='delete-tips'>认可服务结果并确认，确认后无法撤销。</span>",					
				modal_class:"delete-content hr_detail_tipModal",
				ok:"确定",
				cancel:"取消",
				onOk:function(){					
					$.post("/member/order/confrim_receive_order/",{"token":getCookie("token"),"sn":sn},function(message){
						layer.msg(message.content);
						if(message.type=="success"){
								var id=$this.attr("date_id");
								var orderName=$this.parents("li").find(".orderName").text();
								if(!common.main.is_empty(orderName)){
									var reg=new RegExp("/$");    
									if(reg.test(orderName)){
										orderName=orderName.substring(0,orderName.length-1)
									} 
								}
								$.get("/member/review/hrReview/",{"id":id,"orderName":orderName},function(result){
										$("#hr-eval-modal div").remove();
										if(result.div!=-1){
										$("#hr-eval-modal").append(result);
										}
								});
								$("#hr-eval-modal").modal("show")
						}
					});					
				}
			});	    		
		});
		//订单下拉框
		$(".wdddDiv .orderHead .info").click(function()  
		{  
			$(this).css({backgroundImage:"url(down.png)"}).next("ul.select-box").slideToggle(300).siblings("ul.select-box").slideUp("slow");  
			$(this).siblings().css({backgroundImage:"url(left.png)"});  
		});

		//工单列表状态
		$(document).on("click",".workorder_head .span_select s",function(){
			if($(this).find(".select_box").css("display") == "none"){
				$(this).find(".select_box").css("display","block");
				$(this).find("i").css({
					"transform":"rotate(180deg)",
					"top":"-1px"
				});
			}else{
				$(this).find(".select_box").css("display","none");
				$(this).find("i").css({
					"transform":"rotate(0deg)",
					"top":"5px"
				});
			}
			return false
		});	   

		$(document).on("click",".workorder_head .select_box s",function(){
			var s_text = $(this).text();
			$(this).addClass("current").siblings().removeClass("current");
			$(this).parent("s").find("b").text(s_text);
			$(".workorder_head .span_select i").css({
				"transform":"rotate(0deg)",
				"top":"5px"
			});	    		
			$(this).parents(".select_box").css("display","none");
		});    	
		//工单创建
		$(document).on("click",".create_step .create_item a",function(){
			var data_create = $(this).attr("data_create");
			$(".member_workorder_create .create_tab span").eq(1).addClass("current").siblings().removeClass("current");
			$(".create_content .create_step").eq(1).addClass("current").siblings().removeClass("current");
		});
		$(document).on('click',function(){
			$(".myhome-select-cv .select-box").removeClass("show");
			$(".zxjl-ul .set-box").removeClass("show");
			$(".workorder_head .select_box").css("display","none");
			$(".workorder_head .span_select i").css({
				"transform":"rotate(0deg)",
				"top":"5px"
			});	
		});
		
		$(document).on("click",".reply_form_div",function(){
			$(this).hide();
			$(".reply_form .textarea_editor").css("display","block");
		});	
		//工单类型选择点击事件
		$(document).on("click", ".create_item a", function(){
			$(this).closest("div.create_item").addClass("type_selected");
		});
		//创建工单操作
		var _workOrderIsSubmit = true;
		$(document).on('click', '.create_btn button', function(){
			var $this = $(this);
			if(!_workOrderIsSubmit){
				return;
			}
			//获取工单类型
			var type = $(".type_selected a").attr("data_create");
			//获取工单标题
			var title = $(".create_form [name=title]").val();
			//获取工单描述
			var description = $(".create_form [name=description]").val();
			//获取微信号
			var weixin = $(".create_form [name=weixin]").val();
			//获取工单附件
			var attachment = $(".create_form [name=attachment]").val();
			if(title == "" || description == "" || weixin == ""){
				layer.msg("标题   | 问题描述 | 微信号都不能为空喔！");
				return;
			}
			if(common.main.contain_emoji(description)||common.main.contain_emoji(title)){
				layer.msg("不支持发送含emjoy表情的数据,请清除后再进行发送");
				return ;
			}
			$this.text('正在提交...');
			_workOrderIsSubmit = false;
			$.ajax({
				type:"post",
				dataType:"json",
				url:"/member/workOrder/create_submit/",
				data:{
					type:type,
					title:title,
					description:description,
					weixin:weixin,
					attachment:attachment
				},
				success:function(data){
					if(data.type == "success"){
						location.href = "/member/workOrder/";
					}else{
						layer.msg(data.content);
						$this.text('提交');
						_workOrderIsSubmit = true;
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					$this.text('提交');
					_workOrderIsSubmit = true;
				}
			})
		});
		//工单回复操作
		$(document).on('click', '#work_order_reply_btn', function(){
			//获取SN号
			var sn = $(this).closest("div.reply_btn").attr("data-value");
			//获取回复的内容
			var content = $("textarea[name=content]").val();
			if(common.main.contain_emoji(content)){
				return layer.msg("请填写正确的搜索内容~");
			}
			$.ajax({
				type:"post",
				url:"/member/workOrder/"+sn+"/reply/",
				data:{
					content: content
				},
				dataType:"json",
				success:function(data){
					if(data.type == "success"){
						location.reload();  //回复成功刷新页面
					}else{
						layer.msg(data.content);
					}
				}
			});
			
		});
		//工单状态更新操作
		$(document).on('click', '#work_order_solved_btn', function(){
			//获取SN号
			var sn = $(this).closest("div.reply_btn").attr("data-value");
			$.ajax({
				type:"post",
				url:"/member/workOrder/"+sn+"/solved/",
				data:{},
				dataType:"json",
				success:function(data){
					if(data.type == "success"){
						location.href = "/member/workOrder/"; //状态更新成功后跳转到工单首页
					}else{
						layer.msg(data.content);
					}
				}
			});
		});
		//我的订单顶部提示关闭
		$(".jl-member-order .timeout_tips a").on("click",function(){
			$(this).parents(".timeout_tips").remove();
		});
	},
	create_editor:function(){//创建工单富文本
		// http://www.wangeditor.com/
		var editor = new wangEditor('create_editor');
		if (!editor.config) return;
		// 上传图片
		editor.config.uploadImgUrl = '/file/upload/';
		editor.config.uploadImgFileName = 'file';
		editor.config.uploadParams = {
			token: getCookie("token"),
			"fileType":"workOrderFile"
		};
		// 自定义上传事件
		editor.config.uploadImgFns.onload = function (resultText, xhr) {
			if("error" == resultText){
				layer.msg("上传失败,请稍后再试~");
			}else if("limit" == resultText){
				layer.msg("您的请求过于频繁,请稍后再试~",{time:2000});
			}else{
				// resultText 服务器端返回的text
				// xhr 是 xmlHttpRequest 对象，IE8、9中不支持
				// 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
				var originalName = editor.uploadImgOriginalName || '';  
				// 如果 resultText 是图片的url地址，可以这样插入图片：
				var html='<img src=' + resultText + ' alt="' + originalName + '"  style="max-width:100%;"/>';
				editor.command(null, 'insertHtml', html);
				// 如果不想要 img 的 max-width 样式，也可以这样插入：
				// editor.command(null, 'InsertImage', resultText);
				// 统一删除富文本内base64码图片
				editor.$txt.find('img').each(function (i, elem) {
					if ($(elem).attr('src').indexOf('data:image') > -1) {
						$(elem).remove();
					}
				});
			}
		};
		editor.config.uploadHeaders = {
			// 'Accept' : 'text/x-json'
		}
		editor.config.menus = [
			'img',
		];
		editor.create();
		var textArea = $(".wangEditor-txt");
		var numItem = $(".textarea_counter .word");
		common.main.words_deal_textarea(textArea,numItem);    	
	},
	team_vip_event:function(){
		// 引导弹框
		var inner, inner_top, inner_left;
		try{
			if(window.localStorage && localStorage.getItem("has_guide") === null && $('.team_main').length> 0){
				inner_top = $('.tt_detail + .huiyuan-upload').offset().top +40;
				inner_left = $('.tt_detail + .huiyuan-upload').offset().left -7;
				inner = '<div class="team_guide_masking"><div class="team_guide_modal" style="top:'+
					inner_top+ 'px; left:'+
					inner_left+'px'+
					';"><span>点击这里可以查看会员权限哦~</span><a href="javascript:;" class="team_guide_close">我知道了</a></div></div>';
				$(inner).appendTo($('body'));
			}else if(window.localStorage && localStorage.getItem("has_guide") === null && $('.team_child').length> 0){
				inner_top = $('.tt_detail').offset().top +30;
				inner_left = $('.tt_detail').offset().left;
				inner = '<div class="team_guide_masking"><div class="team_guide_modal" style="top:'+
					inner_top+ 'px; left:'+
					inner_left+'px'+
					';"><span>点击这里可以查看会员权限哦~</span><a href="javascript:;" class="team_guide_close">我知道了</a></div></div>';
				$(inner).appendTo($('body'));
			}
			$('.team_guide_masking .team_guide_close,.team_guide_masking').on('click',function(){
				localStorage.setItem('has_guide','true');
				$('.team_guide_masking').fadeOut().remove();
			});
		}catch(e){
			console.log("显示团体会员蒙层错误~");
		}
		//	复制邀请链接
		$("#add_team_child #copyUrl").on("click",function(){
			var str = $(".shareContent span").html();
			common.main.set_copyToClipBoard(str);
			$("#copyUrl").html("复制成功");
			setTimeout(function(){
				$("#copyUrl").html("复制链接")
			},2000);
			layer.msg("复制成功~");
			$("#add_team_child").modal("hide");
		});
		//	放大流程图片
		$('.team_tutorial_list .team_tutorial_amplify').on('click',function(){
			var src = $(this).parent('.team_tutorial_list').find('img').attr('src');
			$('.team_tutorial_amplify_masking img').attr('src',src);
			$('.team_tutorial_amplify_masking').fadeIn();
			$('body').css('overflow-y','hidden')
		});
		$('.team_tutorial_amplify_masking').on('click',function(){
			$(this).fadeOut();
			$('body').css('overflow-y','auto');
			$(this).find('img').attr('src','');
		});
		//生成团体会员邀请链接的点击事件
		$("#genInviLinks").click(function(){
			$.ajax({
				type: "post",
				dataType: "json",
				url: '/member/team/gengerat_code/',
				data: {},
				success: function (data) {
					if(data.type == "success"){
						$(".shareContent span").text(location.protocol+"//"+window.location.hostname+"/bind/team_vip/?code="+data.content);
						$("#add_team_child").modal("show");
					}else{
						layer.msg(data.content);
					}
				}
			});
		});
	},
	page_form_event:function(){
		var $listForm = $("#pf_listForm");
		var $pageNumber = $("#pf_pageNumber");
		var $selectOption = $listForm.find(".pf_selectOption");

		//自定义下拉按钮
		$selectOption.click(function(){
			var $this = $(this);
			var $name = $("[name="+$this.attr("pf-data-name")+"]");
			$name.val($this.attr("pf-data-value"));
			$listForm.submit();
			return false;
		});

		//页码跳转
		$.page_form_pageSkip = function(pageNumber){
			$pageNumber.val(pageNumber);
			$listForm.submit();
			return false;
		}
	},
	//分享简历
	resume_share:function(resume_id, visit_id, visit_type, pwd, callback){
		var password = pwd || "";
		var visittype = visit_type;
		var $html = '<div class="share_body">'+
						'<p class="sharepower_title">权限设置</p>'+
						'<div class="sharepower_panel">'+
							'<i class="sharepower_icon open"></i>'+
							'<p class="sharepower_name">公开</p>'+
							'<span class="sharepower_tips">获得链接的人都可以访问</span>'+
						'</div>'+
						'<ul class="sharepower_list">'+
							'<li data-status="open" class="share_checked">'+
								'<i class="sharepower_icon open"></i>'+
								'<p class="sharepower_name">公开</p>'+
								'<span class="sharepower_tips">获得链接的人都可以访问</span>'+
							'</li>'+
							'<li data-status="password">'+
								'<i class="sharepower_icon password"></i>'+
								'<p class="sharepower_name">密码</p>'+
								'<span class="sharepower_tips">仅能通过密码才能访问</span>'+
								'<div class="password_box"><input type="text" class="password" value="' + password + '" maxlength="6" placeholder="密码格式仅限6位纯数字" /><button type="button" class="confirm_btn">确定</button></div>'+
							'</li>'+
							'<li data-status="privary">'+
								'<i class="sharepower_icon privary"></i>'+
								'<p class="sharepower_name">仅自己</p>'+
								'<span class="sharepower_tips">仅自己可以查看简历</span>'+
							'</li>'+
						'</ul>'+
						'<p class="share_link_title">分享链接已生成，复制或扫码分享给相关的人即可查看简历</p>'+
						'<div class="share_link">'+
							'<input type="text" class="share_url" readonly="readonly" value="" />'+
							'<button type="button" class="share_button copyUrl">复制链接</button>'+
						'</div>'+
					'</div>'+
					'<div class="share_footer">'+
						'<div class="share_qrcode">'+
							'<div id="share_resume_modal_qrcode"></div>'+
						'</div>'+
						'<ul class="share_type_setting">'+
							'<li data-setting="qrcode" class="setting_checked">'+
								'<p>扫码分享文档给好友</p>'+
								'<span>微信、手机浏览器扫二维码</span>'+
							'</li>'+
							'<li data-setting="poster">'+
								'<p>生成海报分享给好友</p>'+
								'<span>保存海报使用微信发朋友圈分享给好友</span>'+
								'<img class="hidden" src="/resources/500d/common/images/download_loading.gif" />'+
							'</li>'+
						'</ul>'+
					'</div>';
		common.main.resume_confirm({
			title: "分享简历",
			tips_modal_class:"share_resume_modal",
			modal_class:"share_content",
			content_html: $html
		});
		// 分享链接
		var share_url = location.origin + "/cvresume/" + visit_id + "/";
		$(".share_resume_modal .share_body .share_url").val(share_url);
		// 渲染权限内容
		init_select(visittype);
		function init_select(visit) {
			var $power = $(".share_resume_modal .sharepower_list li[data-status='" + visit + "']");
			var $panel = $('.share_resume_modal .sharepower_panel');
			$power.addClass('share_checked').siblings('li').removeClass('share_checked');
			if (visit !== 'password') {
				var $pwdbox = $(".share_resume_modal .sharepower_list .password_box");
				$pwdbox.hide().siblings('.sharepower_tips').show();
			}
			$panel.children('.sharepower_icon').attr('class', $power.children('.sharepower_icon').attr('class'));
			$panel.children('.sharepower_name').text($power.children('.sharepower_name').text());
			$panel.children('.sharepower_tips').text($power.children('.sharepower_tips').text());
		}
		// 选择权限
		$('.share_resume_modal .sharepower_panel').on('click', function(){
			$('.share_resume_modal .sharepower_list').fadeToggle();
			if ($('.share_resume_modal .sharepower_list:visible').length > 0) {
				init_select(visittype);
			}
		});
		$(".share_resume_modal .sharepower_list li").on("click", function(){
			var $this = $(this);
			if($this.hasClass("share_checked")) return;
			var status = $this.attr('data-status');
			var $pwdbox = $(".share_resume_modal .sharepower_list .password_box");
			$this.addClass('share_checked').siblings('li').removeClass('share_checked');
			if(status === 'password') {
				$pwdbox.show().siblings('.sharepower_tips').hide();
			} else {
				$pwdbox.hide().siblings('.sharepower_tips').show();
				$(".share_resume_modal .sharepower_list .password_box").hide();
				// 设置公开状态
				$.post("/cvresume/set_visit_type/",{
					visitType: status,
					resumeid: resume_id
				},function(data){
					if(data.type == "success") {
						layer.msg("设置成功！");
						visittype = status;
						init_select(status);
						$('.share_resume_modal .sharepower_list').fadeOut();
						if(callback && typeof callback == "function") callback(status, null);
					}
				});
			}
		});
		// 长度限制
		var maxlength = $(".share_resume_modal .password_box .password").attr("maxlength");
		$(".share_resume_modal .password_box .password").on("input", function(){
			var $this = $(this),
				val = $this.val();
			if(val.length > maxlength) {
				$this.val(val.substring(0, maxlength));
			}
		});
		// 确认设置密码
		$(".share_resume_modal .password_box .confirm_btn").on("click", function(){
			var $this = $(this),
				pwd = $this.siblings(".password");
			common.main.validate({
				rules: [{
					target: pwd,
					required: true,
					type: "int",
					rangelength: [6,6],
					massage: "请输入6位纯数字密码",
				}],
				onTips: function(tag, massage){
					layer.msg(massage);
					tag.css("border", "1px solid red");
				},
				onOk: function(value){
					pwd.removeAttr("style");
					$.post("/cvresume/set_visit_password/", {
						password: pwd.val(),
						resumeid: resume_id
					},function(message){
						if(message.type=="success"){
							layer.msg("保存成功！");
							visittype = 'password';
							init_select('password');
							$('.share_resume_modal .sharepower_list').fadeOut();
							if(callback && typeof callback == "function") callback("password", pwd.val());
						}
					});
				},
			});
		});
		// 复制链接
		$(".share_resume_modal .copyUrl").on("click", function(){
			var str = $(".share_resume_modal .share_url").val();
			common.main.set_copyToClipBoard(str);
			layer.msg("复制成功！");
		});
		// 生成二维码 && 海报 选项
		$('.share_type_setting li').on('click', function(){
			var $this = $(this);
			if ($this.hasClass('setting_checked')) return;
			$this.addClass('setting_checked').siblings('li').removeClass('setting_checked');
			if ($this.attr('data-setting') === 'poster') {
				common.main._500dtongji("PC-CV6.9.5-简历编辑页-编辑器-分享简历-底部-生成海报分享");
				// 先保存二维码，防止弹窗重置dom 删除掉二维码canvas
				var QRcode_base64 = $('#share_resume_modal_qrcode canvas')[0].toDataURL("image/png");
				// 加载弹窗
				common.main.readbar_loadingModal('正在生成海报，使用移动端也可以生成海报分享');
				// 克隆简历内容 只生成第一页 使用 html2canvas 转换成图片
				// html2canvas插件中使用了Promise ie中不支持
				if (window.navigator.userAgent.indexOf('Trident') >= 0 || window.navigator.userAgent.indexOf('Edge') >= 0) {
					$.getScript('/resources/plugin/html2canvas/bluebird.min.js');
				}
				$.getScript('/resources/plugin/html2canvas/html2canvas.min.js', function(){
					var $resume_clone = $('#resume_base').clone();
					$resume_clone.attr('id', 'resume_clone');
					$resume_clone.css({
						'position': 'fixed',
						'top': '-9999px',
						'left': '-9999px',
						'width': '820px',
						'height': '1160px',
						'overflow': 'hidden',
						'zoom': '1',
						'transform': 'scale(1)',
					});
					$resume_clone.appendTo($('body'));
					var image_size = $resume_clone.find('img').length;
					image_size += $resume_clone.find('image').length;
					$resume_clone.find('img,image').each(function(i,item){
						var _is_svg = false;
						var _src = $(item).attr('src');
						if(!_src){
							_is_svg = true;
							_src = $(item).attr('xlink:href');
						}
						if(_src && _src.indexOf('resources') === -1){
							var img_src = _src.replace(/^http(s)?:\/\/(.*?)\//, location.protocol+'//'+location.host+'/image_proxy/');
							var canvas = document.createElement('canvas');
							canvas.width = $(item).width();
							canvas.height = $(item).height();
							var cxt = canvas.getContext('2d');
							var image = new Image();
							image.src = img_src;
							image.onload = function () {
								cxt.drawImage(image, 0, 0, canvas.width, canvas.height);
								var base64 = canvas.toDataURL("image/png");
								if(!_is_svg){
									$(item).attr("src", base64);
								}else{
									$(item).attr({"href": base64,"xlink:href":base64});
								}
								image_size--;
							};
							image.onerror = function(){
								image_size--;
							};
						}else{
							image_size--;
						}
					});
					// 生成海报
					var interval = setInterval(function(){
						if (image_size === 0) {
						clearInterval(interval);
						html2canvas(document.getElementById('resume_clone')).then(function(canvas){
							$resume_clone.remove();
							common.main.resume_share_poster({
							resume: canvas.toDataURL('image/png'),
							QRcodeUrl: QRcode_base64,
							});
						});
						}
					}, 500);
				});
			}
		});
		// 二维码渲染
		$.getScript("/resources/500d/js/jquery.qrcode.min.js", function(){
			$("#share_resume_modal_qrcode").qrcode({
				width: 120,
				height:120,
				text: share_url
			});
		});
	},
	// 读条加载弹窗
	readbar_loadingModal: function(tips){
		var $html = '<img src="/resources/500d/common/images/download_loading.gif" /><p class="loadingstyle_tips">'+ tips +'</p>';
		common.main.resume_confirm({
			title: '',
			content_html: $html,
			tips_modal_class: 'readbar_loading_modal',
		});
	},
	// 简历分享海报
	resume_share_poster: function(options){
		var opt = {
			resume: '',
			QRcodeUrl: '',
		};
		$.extend(opt, options);
		var $html = '<img id="show_poster" class="poster_image" />'+
					'<p class="poster_download_tips">您的简历海报已生成，请下载保存至本地</p>'+
					'<p class="poster_footer_tips">快来与好友一起分享您的精美简历吧~</p>'+
					'<a href="javascript:void(0);" id="poster_download" class="poster_download 500dtongji" data_track="PC-CV6.9.5-简历编辑页-编辑器-生成海报-底部-海报下载">立即下载</a>'+
					'<div class="hidden">'+
						'<img id="poster_canvas_bg" src="/resources/500d/common/images/share_poster_bg.png" />'+
						'<img id="poster_canvas_resume" src="'+ opt.resume +'" width="292" height="410" />'+
						'<img id="poster_canvas_qrcode" src="'+ opt.QRcodeUrl +'" width="135" height="135" />'+
						'<canvas id="poster_canvas"></canvas>'+
					'</div>';
		common.main.resume_confirm({
			title: "",
			tips_modal_class:"resume_poster_modal",
			modal_class:"poster_modal_content",
			content_html: $html,
			onLayer: function () {},
		});
		var resumename = ($('#resume_name .name').text() || '我') + '的简历';
		// 海报图背景图加载完成
		var $poster_bg = document.getElementById('poster_canvas_bg');
		$poster_bg.onload = function(){
			var $this = this;
			// 设置canvas尺寸，开始生成
			var $canvas = document.getElementById('poster_canvas');
			$canvas.width = $this.width;
			$canvas.height = $this.height;
			var ctx = $canvas.getContext('2d');
			// 绘制背景
			ctx.drawImage($this, 0, 0, $this.width, $this.height);
			// 绘制文本 用户的简历
			ctx.font = "normal normal normal 20px microsoft yahei";
			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			ctx.fillText(resumename, $canvas.width / 2, 670);
			// 绘制用户数量文本
			ctx.font = 'normal normal normal 16px microsoft yahei';
			ctx.fillStyle = '#ffffff';
			ctx.textAlign = "left";
			ctx.fillText('超 过 800 万 用 户 在 用', 280, 838);
			// 绘制简历
			var $resume = document.getElementById('poster_canvas_resume');
			ctx.drawImage($resume, 189, 223, $resume.width, $resume.height);
			// 绘制二维码
			var $qrcode = document.getElementById('poster_canvas_qrcode');
			ctx.drawImage($qrcode, 512, 750, $qrcode.width, $qrcode.height);
			var img_base64 = $canvas.toDataURL("image/png");
			$('#show_poster').attr('src', img_base64);
		}
		// 下载图片
		document.getElementById('poster_download').onclick = function(){
			// ie 下载文件
			if (window.navigator.msSaveBlob) {
				try {
					var blobObject = new Blob([document.getElementById('show_poster').src]);
					window.navigator.msSaveBlob(blobObject, resumename);
				} catch (error) {
					console.log(error);
				}
			} else {
				// 支持 a标签download
				this.download = resumename;
				this.href = document.getElementById('show_poster').src;
			}
		};
	},
	set_copyToClipBoard:function (str) {
		//复制到剪贴板
			var copyInput = $("<input type='text' value='"+ str +"' style='opacity:1;position:absolute;top:20px;z-index:999;' id='copyText' />");
			$(".in").length > 0 ? dom = $(".in")[0] : dom = "body";
			copyInput.appendTo(dom);
			document.getElementById("copyText").select();
			document.execCommand("copy",false,null);
			$("#copyText").remove();
	},
	is_empty:function(str){
		if(str==null||str==""||str==undefined){
			return true;
		}else{
			return false;
		}
	},
	resume_confirm:function(options){//系统确认性弹框
		var settings = {
				title:"操作提示标题",
				content:"操作提示内容",
				content_html:"",
				tips_modal_class:"confirm_modal",
				modal_class:"tips-modal-content",
				ok: "确定",
				cancel: "取消",
				onOk: null,
				onCancel: null,
				onLayer: null,
				onClose: null,
				showOk:true,
				showCancel:true
		};
		$.extend(settings, options);
		var html='<div class="modal smallmodal fade" id="tips-common-modal">'+
		'	<div class="modal-dialog">'+
		'		<div class="modal-content show-swal2">'+
		'			<div class="modal-header">'+
		'				<span class="tips-title"></span>'+
		'				<button type="button" class="close 500dtongji" data_track="PC-MB03.1.1-模板商城-会员弹窗-弹窗-通用-关闭按钮" data-dismiss="modal" aria-hidden="true"></button>'+
		'			</div>'+
		'			<div class="modal-body">'+
		'				<span class="tips-content"></span>'+
		'			</div>'+
		'			<div class="modal-footer">'+
		'				<button type="button"  class="button submit">确定</button><button type="button"  data-dismiss="modal" aria-hidden="true" class="button cancel">取消</button>'+
		'			</div>'+
		'		</div>'+
		'	</div>'+
		'</div>'
		var $modal=$(html);
		//组装弹框内容
		$modal.find(".tips-title").text(settings.title);
		$modal.addClass(settings.tips_modal_class);
		$modal.find(".modal-content").addClass(settings.modal_class);
		$("#tips-common-modal").remove();
		if(settings.content_html==""){
			$modal.find(".tips-content").text(settings.content);
		}else{
			$modal.find(".tips-content").remove();
			$modal.find(".modal-body").html(settings.content_html);
		}
		$modal.find("button.submit").text(settings.ok);
		$modal.find("button.cancel").text(settings.cancel);
		if(!settings.showOk){
            $modal.find("button.submit").addClass('hidden');
		}
        if(!settings.showCancel){
            $modal.find("button.cancel").addClass('hidden');
        }
		$modal.appendTo("body");
		// onOk
		$modal.find("button.submit").click(function() {
			if (typeof settings.onOk === 'function') {
				var fn = settings.onOk();
				if (fn === undefined || !fn) {
					tips_modal_close();
				}
			} else {
				tips_modal_close();
			}
			return false;
		});
		// onCancel
		$modal.find("button.cancel").click(function() {
			if (typeof settings.onCancel === 'function') {
				var fn = settings.onCancel();
				if (fn === undefined || !fn) {
					tips_modal_close();
				}
			} else {
				tips_modal_close();
			}
			return false;
		});
		// onLayer
		$modal.find(".modal-dialog").click(function(e) {
			if ($(e.target).hasClass("modal-dialog")) {
				if (typeof settings.onLayer === 'function') {
					var fn = settings.onLayer();
					if (fn === undefined || !fn) {
						tips_modal_close();
					}
					return false;
				}
				if (settings.onLayer) {
					tips_modal_close();
					return false;
				}
			}
		});
		// onClose
		$modal.find('button.close').click(function() {
			if (typeof settings.onClose === 'function') {
				settings.onClose();
			}
		});
		// append
		$modal.modal("show");
		if($(".modal-backdrop").length > 1) {
			$(".modal-backdrop:last").remove();
		}
		//弹框关闭通用方法
		function tips_modal_close(){
			$modal.modal("hide");
			$modal.remove();
			$(".modal-backdrop").remove();
			$("body").removeClass("suggestModal");
			$("body").removeClass("modal-open");
		}
	},
	resume_danger_alert: function(callback){ // 警告性弹窗
		$("#wxloginModal").modal("hide");
		$("#zhloginModal").modal("hide");
		var $html = '<div class="danger_alert_title">您的账户已被封号</div><div class="danger_alert_msg">系统检测到当前账号违反<a href="/resources/html/member6.0.1/agreement.html">《五百丁用户协议》</a>，涉及利用五百丁资源非法牟利及违规分享等行为，已进行封号处理。</div>';
		common.main.resume_confirm({
			content_html: $html,
			modal_class:"danger_alert_content",
			onOk: function(){
				if(window.location.href.indexOf("/login/") < 0) {
					window.location.href = "/login/";
				}
			}
		});
	},
	getUrlParamsValue:function(name){//获取url中指定参数的值
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return (r[2]); return null;
	},
	repairResumeLeftHeight:function(complete){//修复简历左侧高度
		setTimeout(function () {
			var resumeHeight = $(".wbdCv-resume").css({"height" : "auto","min-height":1160}).outerHeight();
			$(".wbdCv-resume").css({"height" : resumeHeight + "px"});
			if (typeof complete === 'function') complete();
		}, 100);
	},
	date_format:function(date,format){
		var month=date.getMonth() + 1;
		if(month<10){
			month="0"+month;
		}
		var o = {
			"M+" :month, // month

			"d+" : date.getDate(), // day

			"H+" : date.getHours(), // hour

			"m+" : date.getMinutes(), // minute

			"s+" : date.getSeconds(), // second

			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter

			"S" : date.getMilliseconds()
		}

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]: ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format; 
	},
	isEffect:function(sourcetStr,targetStr){//内容是否有效
		try{
			if(common.main.is_empty(sourcetStr)||$.isEmptyObject(sourcetStr)){
				return false;
			}
			if(common.main.is_empty(targetStr)){
				return true;
			}
			sourcetStr=JSON.stringify(sourcetStr).replace(/\s/g, "");
			targetStr=JSON.stringify(targetStr).replace(/\s/g, "");
			if(sourcetStr==targetStr){
				return false;
			}else{
				return true;
			}
		}catch(e){
			console.log("内容判断异常。。。。"+e);
			return false;
		}
	},
	init_authority_lock:function(){//初始化会员权限锁
		$.get("/cvresume/get_member_authoritys/",function(message){
			if(message.type=="success"){
				var ths=JSON.parse(message.content);
				$.each(ths,function(index,val){
					$('[data_auth="'+val+'"]').removeClass("wbd-vip-lock");
				});
			}
		});
		$(document).on("click",".wbd-vip-lock",function(){
			var data_show_vip_type = $(this).attr("data-show-vip-type");
			var $this=$(this);
			if(common.main.is_empty(data_show_vip_type)){
				data_show_vip_type=="super";
			}
			var opt=$this.attr("data_auth");
			//获取权限消息
			$.ajax({
				async:false,
				cache:false,
				type:"GET",
				data:{"opt":opt},
				url:"/cvresume/validate_opt_auth/",
				success:function(message){
					if(message.type=="warn"){
						common.main.vip_opt_tips();
						layer.msg(message.content);
						return;
					}else if(message.type=="error"){
						layer.msg(message.content);
						return false;
					}else if(message.type=="success"){
						$this.removeClass("wbd-vip-lock");
						$this.attr("readonly","");
						$this.trigger("click");
						return false;
					}
				}
			});
		});
	},
	//会员登录状态检查
	check_login_by_cookie:function(){
		//检测是否登录
		if(!getCookie("memberId")) {   
			return false;
		}	
		return true;
	},
	//会员类型判断（判断显示是普通弹框还是差价弹框）
	vip_opt_tips:function(){
		//检测是否登录
		if(!common.main.check_login_by_cookie()){
			if(typeof show_login_modal != "undefined" && typeof(show_login_modal)=="function"){
				show_login_modal();
			}else{
				window.open('/login/');
			}
			return ;
		}
		$.ajax({
			type:"GET",
			url:"/order/up_vip/",
			success:function(data){
				if(data.type == "success") {
					var _data = JSON.parse(data.content);
					common.main.vip_upgrade_modal(_data);
				} else {
					layer.msg("获取会员信息失败");
				}
			}
		});									
	},
	//会员升级弹层
	vip_upgrade_modal:function(data){
		var $upgrade = '<div class="upgrade_vip_panel" id="upgrade_vip_panel">'+
			'<div class="upgrade_panel_container">'+
				'<a href="javascript:;" class="upgrade_panel_close"></a>'+
				'<div class="upgrade_panel_head">'+
					'<ul class="upgrade_head_content">'+
						'<li><p class="content_number">15,000+</p><p class="content_text">每日更新简历</p></li>'+
						'<li><p class="content_number">60,000+</p><p class="content_text">每周新增会员</p></li>'+
						'<li><p class="content_number">2,000+</p><p class="content_text">每月新增素材</p></li>'+
					'</ul>'+
					'<h1 class="upgrade_head_title">会员权限</h1>'+
				'</div>'+
				'<div class="upgrade_panel_body">'+
					'<div class="upgrade_card_list free">'+
						'<div class="card_top">'+
							'<p class="card_title">免费会员</p>'+
							'<p class="card_price">￥<span>0</span></p>'+
							'<a href="javascript:;" class="upgrade_vip_btn disabled">已注册</a>'+
						'</div>'+
						'<div class="card_bottom">'+
							'<ul class="power_list">'+
								'<li><span>有效期</span><span>永久</span></li>'+
								'<li><span>简历创建份数</span><span>3份</span></li>'+
								'<li><span>在线投递上限</span><span>10份</span></li>'+
								'<li><span>在线简历导出</span><span>—</span></li>'+
								'<li><span>导入站外简历</span><span>—</span></li>'+
								'<li><span>一键更换模板</span><span>—</span></li>'+
								'<li><span>自定义图标</span><span>—</span></li>'+
								'<li><span>设置个性封面</span><span>—</span></li>'+
								'<li><span>设置简历自荐信</span><span>—</span></li>'+
								'<li><span>个性简历域名</span><span>—</span></li>'+
							'</ul>'+
							'<ul class="power_list">'+
								'<li><span>WORD模板下载</span><span>可单独购买</span></li>'+
								'<li><span>PPT模板下载</span><span>不支持</span></li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="upgrade_card_list high">'+
						'<div class="card_top">'+
							'<p class="card_title">高级会员</p>'+
							'<p class="card_price">￥<span>29.9</span></p>'+
							'<a href="javascript:;" class="upgrade_vip_btn" data-key="highVip">立即升级</a>'+
						'</div>'+
						'<div class="card_bottom">'+
							'<ul class="power_list">'+
								'<li><span>有效期</span><span>1年</span></li>'+
								'<li><span>简历创建份数</span><span>5份</span></li>'+
								'<li><span>在线投递上限</span><span>30份</span></li>'+
								'<li><span>在线简历导出</span><span class="checked"></span></li>'+
								'<li><span>导入站外简历</span><span class="checked"></span></li>'+
								'<li><span>一键更换模板</span><span class="checked"></span></li>'+
								'<li><span>自定义图标</span><span class="checked"></span></li>'+
								'<li><span>设置个性封面</span><span>—</span></li>'+
								'<li><span>设置简历自荐信</span><span>—</span></li>'+
								'<li><span>个性简历域名</span><span>—</span></li>'+
							'</ul>'+
							'<ul class="power_list">'+
								'<li><span>WORD模板下载</span><span>1套/天</span></li>'+
								'<li><span>PPT模板下载</span><span>不支持</span></li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="upgrade_card_list forever">'+
						'<div class="card_top">'+
							'<p class="card_title">终身会员</p>'+
							'<p class="card_price">￥<span>59.9</span></p>'+
							'<a href="javascript:;" class="upgrade_vip_btn" data-key="foreverVip">立即升级</a>'+
							'<p class="diff_price">当前为补差价升级，仅需：￥<span>0</span></p>'+
						'</div>'+
						'<div class="card_bottom">'+
							'<ul class="power_list">'+
								'<li><span>有效期</span><span>永久</span></li>'+
								'<li><span>简历创建份数</span><span>100份</span></li>'+
								'<li><span>在线投递上限</span><span>无上限</span></li>'+
								'<li><span>在线简历导出</span><span class="checked"></span></li>'+
								'<li><span>导入站外简历</span><span class="checked"></span></li>'+
								'<li><span>一键更换模板</span><span class="checked"></span></li>'+
								'<li><span>自定义图标</span><span class="checked"></span></li>'+
								'<li><span>设置个性封面</span><span class="checked"></span></li>'+
								'<li><span>设置简历自荐信</span><span class="checked"></span></li>'+
								'<li><span>个性简历域名</span><span class="checked"></span></li>'+
							'</ul>'+
							'<ul class="power_list">'+
								'<li><span>WORD模板下载</span><span>30套/天</span></li>'+
								'<li><span>PPT模板下载</span><span>不支持</span></li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="upgrade_card_list joint">'+
						'<div class="card_top">'+
							'<p class="card_title">超级联名会员</p>'+
							'<p class="card_price">￥<span>99.9</span><del>￥180</del></p>'+
							'<div class="discount_lt"></div>'+
							'<p class="card_joint_1">五百丁 × 吾道幻灯片联合推出 <i></i></p>'+
							'<div class="card_joint_2">会员说明 <i></i>'+
								'<div class="joint_explain">'+
									'<div class="joint_explain_p">'+
										'<p>吾道幻灯片是什么？</p>'+
										'<span><a href="https://www.woodo.cn/" target="_blank">吾道幻灯片</a> 是一款极其简单的PPT在线制作神器，提供一站式设计资源支撑，内置1000+精美原创PPT模板，操作简单方便，支持多人协作，轻松即可完成优秀的PPT作品。</span>'+
									'</div>'+
									'<div class="joint_explain_p">'+
										'<p>为什么要购买联名会员？</p>'+
										'<span>1.价格超实惠，相比299元的PPT模板网站会员市场价，这里只需<b style="color: #62c8af;">99</b>元，即可享受PPT模板+简历制作的双重权限。</span>'+
										'<span>2.购买联名会员后，可以在一年内不限量不限次数下载吾道幻灯片全站的精美模板，让你的工作和学习如虎添翼。</span>'+
									'</div>'+
									'<div class="joint_explain_p">'+
										'<p>购买后如何使用？</p>'+
										'<span>购买成功后，无需再次注册，直接使用五百丁的账号密码登录 <a href="https://www.woodo.cn/" target="_blank">吾道幻灯片网站</a> 即可享受会员权益。</span>'+
										'<strong style="color: #383e44;">重要提醒：</strong>'+
										'<span>1.如你此前未注册过吾道账号，请使用五百丁的账号密码登录 <a href="https://www.woodo.cn/" target="_blank">吾道幻灯片网站</a> <span style="color: #ff6e6e;">（首次登录勿用微信扫码）</span>，即可享受会员权益；<br/>2.如你已有吾道账号，直接使用该账号登录即可，无需做其它操作，我们将会自动帮你升级会员；</span>'+
										'<span>如需使用微信扫码功能可在首次登录成功后，在账户中心绑定微信账号即可。</span>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<a href="javascript:;" class="upgrade_vip_btn" data-key="jointVip">立即升级</a>'+
							'<p class="diff_price">当前为补差价升级，仅需：￥<span>0</span></p>'+
						'</div>'+
						'<div class="card_bottom">'+
							'<ul class="power_list">'+
								'<li><span>有效期</span><span>1年</span></li>'+
								'<li><span>简历创建份数</span><span>20份</span></li>'+
								'<li><span>在线投递上限</span><span>50份</span></li>'+
								'<li><span>在线简历导出</span><span class="checked"></span></li>'+
								'<li><span>导入站外简历</span><span class="checked"></span></li>'+
								'<li><span>一键更换模板</span><span class="checked"></span></li>'+
								'<li><span>自定义图标</span><span class="checked"></span></li>'+
								'<li><span>设置个性封面</span><span class="checked"></span></li>'+
								'<li><span>设置简历自荐信</span><span class="checked"></span></li>'+
								'<li><span>个性简历域名</span><span class="checked"></span></li>'+
							'</ul>'+
							'<ul class="power_list">'+
								'<li><span>WORD模板下载</span><span>30套/天</span></li>'+
								'<li><span>PPT模板下载</span><span class="mark_hot">任意下载，不限次数</span></li>'+
							'</ul>'+
						'</div>'+
						'<a href="https://www.woodo.cn/upgrade/" target="_blank" class="to_woodo">更多吾道会员说明></a>'+
					'</div>'+
				'</div>'+
				'<div class="upgrade_panel_foot">'+
					'<div class="upgrade_foot_content">'+
						'<p class="question_title">常见问题</p>'+
						'<div class="question_list">'+
							'<p>• 以前购买的旧版会员权益会有变化吗？</p>'+
							'<p>旧版会员保留原始权益，不受会员体系变更的影响。如果想要享受新版会员权益，可以在以往购买价格的基础上补差价优惠购买。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>• 会员时间如何计算？</p>'+
							'<p>会员有效期自付费成功之日起的自然时间段来计算，如购买普通会员，即付费日期后的一个月内均可享受会员服务。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>• 会员到期后有什么影响？</p>'+
							'<p>会员到期前3天会通过微信服务号收到相关提示（需绑定微信），若不续费或升级，会员到期后，将恢复普通用户身份，相关权益也将随之变更，已创建的简历数据不会受到影响。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>• 已开通会员了怎么还显示是免费会员？</p>'+
							'<p>由于网络情况导致数据更新不及时，请刷新页面或重新登录。</p>'+
						'</div>'+
						'<div class="question_list">'+
							'<p>* 如仍有疑问，请直接<a target="_blank" href="/member/workOrder/create/">联系客服</a>。</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		// 插入节点
		$("body").addClass("open");
		if($("#upgrade_vip_panel").length > 0) {
			$("#upgrade_vip_panel").fadeIn(500);
		} else {
			$($upgrade).appendTo($("body"));
			var $upgrade_panel = $("#upgrade_vip_panel");
			$upgrade_panel.fadeIn(500);
			// 初始化状态
			var $highVipbtn = $upgrade_panel.find('.upgrade_vip_btn[data-key="highVip"]');
			var $foreverVipbtn = $upgrade_panel.find('.upgrade_vip_btn[data-key="foreverVip"]');
			var $jointVipbtn = $upgrade_panel.find('.upgrade_vip_btn[data-key="jointVip"]');
			var $highUp = $upgrade_panel.find('.upgrade_card_list.high .card_top');
			var $foreverUp = $upgrade_panel.find('.upgrade_card_list.forever .card_top');
			var $jointUp = $upgrade_panel.find('.upgrade_card_list.joint .card_top');
			$highVipbtn.removeClass('disabled');
			$foreverVipbtn.removeClass('disabled');
			$jointVipbtn.removeClass('disabled');
			$foreverUp.removeClass('diff');
			$jointUp.removeClass('diff');
			// 更新会员数据
			$highUp.find('.card_price span').text(data.highVip.price);
			$foreverUp.find('.card_price span').text(data.foreverVip.price);
			$jointUp.find('.card_price span').text(data.jointVip.price);
			$foreverUp.find('.diff_price span').text(data.foreverVip.diffPrice);
			$jointUp.find('.diff_price span').text(data.jointVip.diffPrice);
			// 差价升级
			if (data.type === 'up') {
				$highVipbtn.addClass('disabled');
				$foreverVipbtn.removeClass('disabled');
				$jointVipbtn.removeClass('disabled');
				$foreverUp.addClass('diff');
				$jointUp.addClass('diff');
			} else if (data.type === 'foreverVip' || data.type === 'jointVip') {// 顶级会员，无法购买其他的会员
				$highVipbtn.addClass('disabled');
				$foreverVipbtn.addClass('disabled');
				$jointVipbtn.addClass('disabled');
			}
			// 升级按钮点击
			$upgrade_panel.find(".upgrade_vip_btn").click(function(){
				var $this = $(this);
				var _key = $this.attr('data-key');
				var value = data[_key];
				if ($this.hasClass('disabled') || !value) {
					return;
				}
				// 联合会员需校验是否绑定手机号和邮箱号
				if (_key === 'jointVip') {
					var email = getCookie('memberEmail');
					var email_validate = email ? /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email) : false;
					var phone = getCookie('memberMobile');
					if ((!email || !email_validate) && !phone) {
						return layer.msg('请完成绑定手机号或邮箱号~');
					}
				}
				// 支付提交
				common.main.orders_confirm_form({
					type: "memberVip",
					action: "/member/order/create_vip_order/",
					data: {
						"productid": value.id,
						"price": value.diffPrice || value.price,
						"mcid": ""
					},
					product: [{
						pid: value.id,
						name: value.name,
						price: value.diffPrice || value.price,
						sn: value.sn,
					}],
					total_price: value.diffPrice || value.price,
					onSubmit_after: function(){
						common.main.pay_tips_modal();
						$(".payType_modal").stop().show();
						$(".payTips_modal").stop().show();
					}
				});
			});
			// 关闭按钮触发
			var close = $upgrade_panel.find(".upgrade_panel_close");
			close.click(function(){
				close_panel();
			});
			// 关闭弹窗方法
			function close_panel(){
				$upgrade_panel.fadeOut(500, function(){
					$("body").removeClass("open");
					$upgrade_panel.remove();
				});
			}
		}
	},
	// 会员升级 确认支付 弹窗
	orders_confirm_form: function(obj){
		var form_data = {
			type: "",					// 调用支付弹窗的类型 vip  hr  template
			action: "",					// form表单属性
			method: "post",				// form表单属性
			target: "_blank",			// form表单属性  _blank：form表单提交     ajax：ajax提交
			data: {},					// form表单数据
			product: [{
				name: "",
				price: "",				// 如果没有价格  就传 number
				pid: "",
				sn: ""
			}],							// 商品数据
			total_price: 0,				// 商品价钱总数
			onOpen: null,				// 打开弹窗回调
			onCancel: null,				// 关闭弹窗回调
			onSubmit_before: null,		// 表单提交前执行回调
			onSubmit_after: null,		// 表单提交后执行回调
		};
		$.extend(form_data, obj);
		if(form_data.target === '_blank'){
			if(common.main.get_device_info().qqLite || common.main.get_device_info().wechat){
				form_data.target = '_self';
			}
		}
		if(!form_data.action) {
			console.error("form链接为空");
			return;
		}
		// 生成弹窗
		var html =	'<div class="modal smallmodal fade orders_confirmorder_modal" id="orders_confirmorder_modal">'+
						'<div class="modal-dialog">'+
							'<div class="modal-content show-swal2 orders_confirmorder">'+
								'<div class="modal-header">'+
									'<span class="tips-title">订单确认</span>'+
									'<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
								'</div>'+
								'<div class="modal-body">'+
									'<form id="order_form" action="" method="" target="" novalidate="novalidate"></form>'+
									'<div id="product_table" class="item"><h2>服务清单</h2></div>'+
									'<div class="item">'+
										'<h2>使用优惠券 '+
											'<div class="discount_list_toggle"><i></i><span>可用优惠券</span>'+
												'<div class="discount_rule_details">'+
													'<p><b>1. </b>一次下单只能只用一张优惠券；</p>'+
													'<p><b>2. </b>凭优惠券在五百丁付款时可抵现金使用， 不可兑换现金、不设找零；</p>'+
													'<p><b>3. </b>各优惠券仅可使用一次，使用后不退还；</p>'+
													'<p><b>4. </b>优惠券的最终解释权归五百丁所有。</p>'+
												'</div>'+
											'</div>'+
										'</h2>'+
										'<div class="discount_ticket_checked">'+
											'<ul>'+
												'<li class="ticket_checked_title">'+
													'<div class="left">优惠券名称</div>'+
													'<div class="right">优惠</div></li><li>'+
													'<div class="left ticket_checked_name">不使用</div>'+
													'<div class="right">- &yen;<span class="ticket_checked_money">0</span></div>'+
												'</li>'+
											'</ul>'+
										'</div>'+
										'<div class="discount_ticket_show">'+
											'<ul id="ticket_list_container"></ul>'+
										'</div>'+
									'</div>'+
									'<div class="item">'+
										'<h2>选择支付方式</h2>'+
										'<div class="con_pay">'+
											'<div class="con">'+
												'<label class="wx"><input name="pay_type" pay_id="weixin" type="radio" checked="checked"/>微信</label>'+
												'<label class="zfb"><input name="pay_type" pay_id="alipay" type="radio"/>支付宝</label>'+
												'<label class="db"><input name="pay_type" pay_id="dbpay" type="radio"/>丁币</label>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<p class="orders_confirm_total">合计：<span>￥</span><span id="orders_total_price">'+form_data.total_price+'</span></p>'+
									'<button type="button" class="button submit">立即支付</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
		var $modal = $(html);
		// 丁币显示
		if(form_data.type != "common") {
			$modal.find(".con_pay .db").hide();
		}
		// 服务清单商品列表展示
		var product_tr = [];
		product_tr.push('<div class="product_table title"><p class="left">商品名称</p><p class="right">'+ (form_data.product[0].number ? '数量' : '价格') +'</p></div>');
		$.each(form_data.product, function(i, e) {
			product_tr.push('<div class="product_table"><p class="left">'+e.name+'</p><p class="right">'+ (form_data.product[0].number ? e.number : '&yen;'+e.price) +'</p></div>');
		});
		$modal.find("#product_table").append($(product_tr.join("")));
		// 渲染支付弹窗
		$("#orders_confirmorder_modal").remove();
		$modal.appendTo("body");
		// form表单数据处理
		if(form_data.target != "ajax") {
			$modal.find("form#order_form").attr("action", form_data.action).attr("method", form_data.method).attr("target", form_data.target);
			$modal.find("form#order_form").append('<input type="hidden" name="paytype" value="" />');
			$modal.find("form#order_form").append('<input type="hidden" name="token" value="'+getCookie("token")+'" />');
			$.each(form_data.data, function(i, e) {
				var form_input = '<input type="hidden" name="'+i+'" value="'+e+'" />';
				$modal.find("form#order_form").append(form_input);
			});
			// 支付弹窗操作
			$modal.find("form#order_form input[name='paytype']").val($modal.find("input[name='pay_type']:checked").attr("pay_id"));
			$modal.find("input[name='pay_type']").change(function(){
				$modal.find("form#order_form input[name='paytype']").val($modal.find("input[name='pay_type']:checked").attr("pay_id"));
			});
		}
		// 打开弹窗回调
		if(form_data.onOpen && typeof form_data.onOpen == "function") {
			form_data.onOpen();
		}
		// 优惠券列表方法调用-----------------------------------------------------
		var _sn = [];
		$.each(form_data.product, function(i, e){
			_sn.push(e.sn);
		});
		common.main.pay_modal_coupon_list({
			type: form_data.type,
			price: form_data.total_price,
			sn: _sn.join(",")
		}, function(price, mcid){
			$modal.find("#orders_total_price").text(price);
			if(form_data.target == "ajax") {
				form_data.data.mcid = mcid;
			} else {
				$modal.find("form#order_form input[name='mcid']").val(mcid);
			}
		});
		// 优惠券列表方法调用----------------------------------------------------
		// 弹窗操作
		var $submit_btn = $("#orders_confirmorder_modal").find("button.submit"),
			$cancel_btn = $("#orders_confirmorder_modal").find("button.close");
		$submit_btn.click(function() {
			var ajax_massage = {};
			// 表单提交前回调
			if(form_data.onSubmit_before && typeof form_data.onSubmit_before == "function") {
				var _data = form_data.onSubmit_before();
				if("hr" == form_data.type){
					$.extend(form_data.data, _data);
				}
			}
			// 判断提交方式
			if(form_data.target == "ajax"){
				form_data.data.paytype = $modal.find("input[name='pay_type']:checked").attr("pay_id");
				form_data.data.token = getCookie("token");
				$.ajax({
					type: form_data.method,
					url: form_data.action,
					async: false,
					data: form_data.data,
					success: function(data){
						ajax_massage = data;
					}
				});
			} else {
				$("form#order_form").submit();
			}
			// 表单提交后回调
			if(form_data.onSubmit_after && typeof form_data.onSubmit_after == "function") {
				form_data.onSubmit_after(ajax_massage);
			}
			tips_modal_close();
		});
		$cancel_btn.click(function() {
			if(form_data.onCancel && typeof form_data.onCancel == "function") {
				form_data.onCancel();
			}
			tips_modal_close();
		});
		setTimeout(function(){
			$modal.modal("show");
			var confirm_content = $modal.find(".orders_confirmorder");
			if(confirm_content.height() != 0) {
				confirm_content.css({
					"top": "50%",
					"margin-top": - (confirm_content.height() / 2) + "px"
				});
			}
		}, 50);
		//弹框关闭通用方法
		function tips_modal_close(){
			$modal.modal("hide");
			$modal.remove();
			$(".modal-backdrop").remove();
			$("body").removeClass("suggestModal");
			$("body").removeClass("modal-open");
		}
	},
	// 优惠券获取可用优惠券列表
	pay_modal_coupon_list: function(obj, callback){
		var _obj = {
			type: "",
			price: "",
			sn: "",
		},
		discount_price = _obj.price;
		$.extend(_obj, obj);
		// 优惠券列表 渲染
		var ticket_list = [];
		ticket_list.push('<li><div class="left"><p class="ticket_name" data-money="0">不使用</p></div><div class="right"><i class="checkbox"></i></div></li>');
		$.get("/coupon/available/", {
			type: _obj.type,
			sn: _obj.sn
		}, function(data){
			if(data.type === "success") {
				var _data = JSON.parse(data.content);
				$.each(_data.couponList, function(i, e) {
					if(e.pName.length == 0) {
						e.pName.push("指定商品");
					}
					var list_html = '<li class="'+ (e.can_use && (_obj.price >= e.minPrice) ? "ticket_list_allow" : "ticket_list_disable") +'" data-type="'+e.type+'" data-mcid="'+e.mcid+'">'+
										'<div class="left">'+ 
											((!e.can_use ? "<i></i>" : '') || (_obj.price < e.minPrice ? "<i></i>" : '')) +
											'<p class="ticket_name" data-money="'+e.discount+'">'+ 
											(e.type == "减免券" ? e.discount+"元-"+e.name : e.discount+"折-"+e.name) +
											'</p>'+
											'<p>有效期：'+ e.effectBeginDate.replace(/\-/g, ".")+'-'+e.effectEndDate.replace(/\-/g, ".") +'</p>'+
											((!e.can_use ? '<p class="info_hide">使用范围：'+e.pName.join("，")+'</p><p class="info_hide">最低消费：'+e.minPrice+'元</p><p class="info_hide">'+e.result+'</p>' : '') ||
											(_obj.price < e.minPrice ? '<p class="info_hide">使用范围：'+e.pName.join("，")+'</p><p class="info_hide">最低消费：'+e.minPrice+'元</p><p class="info_hide">实付金额未达优惠门槛</p>' : '')) +
										'</div>'+
										'<div class="right">'+
											'<i class="checkbox"></i>'+
										'</div>'+
									'</li>';
					// 可用 放前面  不可用 放后面
					e.can_use && (_obj.price >= e.minPrice) ? ticket_list.unshift(list_html) : ticket_list.push(list_html);
				});
				// 插入dom
				$("#ticket_list_container").html(ticket_list.join(""));
				// 默认使用第一张
				$(".discount_ticket_show li:not(.ticket_list_disable)").eq(0).find("i.checkbox").addClass("checked");
				checked_ticket();
				// 选中按钮点击
				$(".discount_ticket_show li:not(.ticket_list_disable) i.checkbox").on('click', function(){
					$(".discount_list_toggle span").removeClass("open");
					$(this).addClass("checked").parents("li").siblings("li").find("i.checkbox").removeClass("checked");
					$(".discount_ticket_show").slideUp(200);
					checked_ticket();
				});
				// 不可用优惠券信息展开
				$(".ticket_list_disable .left").on('click', function(){
					$(this).parents("li.ticket_list_disable").toggleClass("open_info");
				});
			} else {
				$(".discount_ticket_checked").parent().remove();
			}
		});
		// 优惠券选择
		$(".discount_list_toggle span").on('click', function(){
			$(this).toggleClass("open");
			$(".discount_ticket_show").slideToggle(200);
		});
		// 切换优惠券计算金额
		function checked_ticket(){
			var $checked = $("i.checkbox.checked"),
				data_money = $checked.parent(".right").siblings(".left").find(".ticket_name").attr("data-money"),
				ticket_type = $checked.parents("li.ticket_list_allow").attr("data-type"),
				swich_reduce_money = data_money;
			$(".ticket_checked_name").text($checked.parent(".right").siblings(".left").find(".ticket_name").text());
			$(".ticket_checked_money").text(data_money);
			if(ticket_type == "减免券") {
				discount_price = (_obj.price - data_money) < 0 ? 0 : _obj.price - data_money;
			} else if(ticket_type == "折扣券") {
				discount_price = (_obj.price * (data_money / 10)).toFixed(1) < 0 ? 0 : (_obj.price * (data_money / 10)).toFixed(1);
				swich_reduce_money = (_obj.price - (_obj.price * (data_money / 10))).toFixed(1);
			} else {
				discount_price = _obj.price;
			}
			$(".ticket_checked_money").text(swich_reduce_money);
			if(callback && typeof callback == "function") callback(Number(discount_price).toFixed(1), $checked.parents("li.ticket_list_allow").attr("data-mcid") || "");
		}
	},
	// 砍价活动  二维码弹窗
	activity_down_price: function(qrcode_url){
		// 显示砍价活动 二维码
		var qrcode_modal = '<div class="qrcode_modal_body">'+
								'<p class="qrcode_modal_tit">邀请好友砍价</p>'+
								'<p class="qrcode_modal_msg">使用微信扫一扫，邀请好友来砍价，最高可享5折会员优惠</p>'+
								'<div class="qrcode_modal_img"></div>'+
								'<p class="qrcode_modal_footer">砍价成功并确认支付后，重新登录账号继续其它操作</p>'+
							'</div>';
		common.main.resume_confirm({
			tips_modal_class: "member_qrcodeModal preserve-3d",
			modal_class: "member_qrcodeModal_content preserve-rotateY",
			content_html: qrcode_modal
		});
		$(".member_qrcodeModal_content").removeClass("show-swal2");
		// 引入js文件
		$.getScript("/resources/plugin/jq-styleqrcode/jquery.qrcode.js", function(){
			// 生成二维码
			$(".member_qrcodeModal .qrcode_modal_img").qrcode({
				render: "canvas",			//设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
				text: location.origin + "/" + qrcode_url,		//扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
				width: "140",				//二维码的宽度
				height: "140",				//二维码的高度
				background: "#ffffff",		//二维码的后景色
				foreground: "#008a66",		//二维码的前景色
				src: "/resources/500d/common/images/qrcodeIcon_logo.png"	//二维码中间的图片
			});
			var timer,
				time = 2000;
			timer = setTimeout(intervalreq, time);
			function intervalreq(){
				time += 200;
				// 定时器递增请求 是否已访问手机端网页
				$.get("/member/bargain/find_member_scan_code/", function(data){
					if(data.type === "success") {
						var _data = JSON.parse(data.content);
						if(_data) {
							// 判断 返回的数据  是否true  然后关闭setTimeout
							clearTimeout(timer);
							// 重新渲染弹窗内容
							$(".qrcode_modal_body").find(".qrcode_modal_tit").remove();
							$(".qrcode_modal_body").find(".qrcode_modal_msg").remove();
							$(".qrcode_modal_body").find(".qrcode_modal_img").remove();
							var downtime = 5,
								scanhtml = '<i class="icon"></i><p class="scan_msg">扫码完成，请在手机端上操作</p><p class="scan_time">（<span>'+downtime+'</span>s后自动关闭）</p>';
							$(".member_qrcodeModal_content .qrcode_modal_body").append($(scanhtml));
							// 定时器关闭弹窗
							var interval = setInterval(function(){
								downtime--;
								$(".member_qrcodeModal_content .qrcode_modal_body").find(".scan_time span").html(downtime);
								if(downtime <= 0) {
									//弹框关闭通用方法
									$("#tips-common-modal").modal("hide");
									$("#tips-common-modal").remove();
									$(".modal-backdrop").remove();
									$("body").removeClass("suggestModal");
									$("body").removeClass("modal-open");
									clearInterval(interval);
								}
							}, 1000);
						}
					}
				});
				// 重新设置定时器调用当前函数 请求 接口
				timer = setTimeout(intervalreq, time);
			}
			// 主动关闭弹窗清除定时器
			$(".member_qrcodeModal_content").find("button.close").click(function(){
				clearTimeout(timer);
			});
		});
	},
	//支付返回提示弹框
	pay_tips_modal:function(){			
		common.main.resume_confirm({
			title:"支付提示",
			tips_modal_class:"payTips_modal",
			content:"请在你新打开的页面上完成付款，支付完成后，请根据您支付的情况点击下面按钮。",
			ok:"支付完成",
			cancel:"支付遇到问题",
			onOk:function(){									
				var pathName = location.pathname;
				if(!common.main.is_empty(common.main.getUrlParamString("redirectUrl"))){
					location.href=common.main.getUrlParamString("redirectUrl");
				}else if(pathName.indexOf("order/vip_member/") > 0 || pathName.indexOf("member/") > 0){
					location.href="/member/order/"; 
				}else{
					location.reload();
				}	    	
			},
			onCancel:function(){
				window.open("http://help.500d.me");
			}
		});		
		$(".modal-backdrop").remove();
		
	},
	//模板下载超出数量提示框
	temp_download_modal:function(){
		common.main.resume_confirm({
			title:"下载提示",
			content:"根据您的会员权限，您当日的可下载额度已用完，请明天再来或升级会员后继续。",
			tips_modal_class:"template_download_modal",
			ok:"确定",
			cancel:"",
			onOk:function(){
			
			}
		});
	},
	resumeOperationLogUpload:function(resumeId,opt,headerDesc,optExtDesc){//操作日志上报
		if(common.main.is_empty(resumeId)){
			return;
		}
		$.post('/cvresume/operationLog/upload/',{"resumeId" : resumeId,"opt":opt,"headerDesc": headerDesc, "optExtDesc":optExtDesc},function(result){
			if(result.type != "success"){
				console.log(result.content);
			}
		});
	},
	//计算天数
	DateDiff:function(sDate1,  sDate2){//sDate1和sDate2是2006-12-18格式
		var  aDate,  oDate1,  oDate2,  iDays
		aDate  =  sDate1.split("-")
		oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
		aDate  =  sDate2.split("-")
		oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
		iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
		return  iDays
	},
	GetDateStr:function(AddDayCount) { 
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;//获取当前月份的日期 
		var d = dd.getDate(); 
		return y+"-"+m+"-"+d; 
	},
	moveBackground:function(classname){
		var lFollowX = 0,
				lFollowY = 0,
				x = 0,
				y = 0,
				friction = 1 / 30;
		
		function moveBackground() {
		x += (lFollowX - x) * friction;
		y += (lFollowY - y) * friction;
		
		translate = 'translate(' + x + 'px) scale(1.1)';
		
		$(classname).css({
			'-webit-transform': translate,
			'-moz-transform': translate,
			'transform': translate
		});
		
		window.requestAnimationFrame(moveBackground);
		}
		
		$(window).on('mousemove click', function(e) {
		
		var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
		var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
		lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
		lFollowY = (10 * lMouseY) / 100;
		
		});
		
		moveBackground(); 			
	},
	//百度打点
	_500dtongji:function(lable){
		try{
			if(lable!=null&&lable!=""&&lable!=undefined){
				window._hmt && window._hmt.push(['_trackEvent', lable, 'click']);
			}
		}catch(e){
			console.log("统计埋点错误~");
		}
	},
	//获取设备信息
	get_device_info:function(){
		var _defaultDeviceInfo = {
			pc:true,
			ios:false,
			android:false,
			winPhone:false,
			wechat:false,
			qqLite:false
		};

		var _deviceInfo;
		try{
			var _ua = navigator.userAgent;
			var _pf = navigator.platform.toLocaleLowerCase();
			var _isAndroid = (/android/i).test(_ua)||((/iPhone|iPod|iPad/i).test(_ua) && (/linux/i).test(_pf))
				|| (/ucweb.*linux/i.test(_ua));
			var _isIOS =(/iPhone|iPod|iPad/i).test(_ua) && !_isAndroid;
			var _isWinPhone = (/Windows Phone|ZuneWP7/i).test(_ua);
			var _isWechat = (/micromessenger/gi).test(_ua);
			var _isQQLite = (/QQBrowserLite/gi).test(_ua);

			_deviceInfo = {
				pc:!_isAndroid && !_isIOS && !_isWinPhone,
				ios:_isIOS,
				android:_isAndroid,
				winPhone:_isWinPhone,
				wechat:_isWechat,
				qqLite:_isQQLite
			};
		}catch(e){
			console.log("获取设备信息失败",e);
		}
		_deviceInfo = $.extend({}, _defaultDeviceInfo, _deviceInfo);
		return _deviceInfo;
	},
	zx_mblist_event:function(){
		//列表鼠标经过效果
		$(".zx-mblist-box .list-con").each(function(){
				$(this).on('mouseenter',function(e){
					var e=e||window.event;
					var angle=direct(e,this)
					mouseEvent(angle,this,'in')
				})
				$(this).on('mouseleave',function(e){
					var e=e||window.event;
					var angle=direct(e,this)
					mouseEvent(angle,this,'off')
				})
		});
		function direct(e,o){
				var w=o.offsetWidth;
				var h=o.offsetHeight;
				var top= o.offsetTop;                    //包含滚动条滚动的部分
				var left= o.offsetLeft;
				var scrollTOP=document.body.scrollTop||document.documentElement.scrollTop;
				var scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft;
				var offTop=top-  scrollTOP;
				var offLeft= left- scrollLeft;
				var ex= (e.pageX-scrollLeft)|| e.clientX;
				var ey=(e.pageY-scrollTOP)|| e.clientY;
				var x=(ex-offLeft-w/2)*(w>h?(h/w):1);
				var y=(ey-offTop-h/2)*(h>w?(w/h):1);
		
				var angle=(Math.round((Math.atan2(y,x)*(180/Math.PI)+180)/90)+3)%4 //atan2返回的是弧度 atan2(y,x)
				var directName=["上","右","下","左"];
				return directName[angle];  //返回方向  0 1 2 3对应 上 右 下 左
		}
		function mouseEvent(angle,o,d){ //方向  元素  鼠标进入/离开
				var w=o.offsetWidth;
				var h=o.offsetHeight;
		
				if(d=='in'){
					switch(angle){
						case '上':
							$(o).find(".hover-btn").css({left:0,top:-h+"px"}).stop(true).animate({left:0,top:0},300)
							break;
						case '右':
							$(o).find(".hover-btn").css({left:w+"px",top:0}).stop(true).animate({left:0,top:0},300)
							break;
						case '下':
							$(o).find(".hover-btn").css({left:0,top:h+"px"}).stop(true).animate({left:0,top:0},300)
							break;
						case '左':
							$(o).find(".hover-btn").css({left:-w+"px",top:0}).stop(true).animate({left:0,top:0},300)
							break;
					}
				}else if(d=='off'){
					switch(angle){
						case '上':
							setTimeout(function(){
								$(o).find(".hover-btn").stop(true).animate({left:0,top:-h+"px"},300)
							},200)
							break;
						case '右':
							setTimeout(function(){
								$(o).find(".hover-btn").stop(true).animate({left:w+"px",top:0},300)
							},200)
							break;
						case '下':
							setTimeout(function(){
								$(o).find(".hover-btn").stop(true).animate({left:0,top:h+"px"},300)
							},200)
							break;
						case '左':
							setTimeout(function(){
								$(o).find(".hover-btn").stop(true).animate({left:-w+"px",top:0},300)
							},200)
							break;
					}
				}
		}
		
	},
	ppt_imgmove_event:function(){
		// PPT缩略图 上 & 下 移动

		//已修改
		var ImgDown , ImgUp;
		$("body").on('mouseenter','.imgUp',function(){
			var $this = $(this).parent().find("img"), ImgTop = $this.css("top").substring(0,$this.css("top").indexOf("px"));
			clearInterval(ImgUp);
			ImgUp = setInterval(function(){
				if(ImgTop < 0){
					ImgTop++;
					$this.css("top",ImgTop+"px");
				}else{
					clearInterval(ImgUp);
				}
			},5)
		});
		$("body").on("mouseleave ",".imgUp",function(){
			clearInterval(ImgUp)
		});
		$("body").on('mouseenter','.imgDown',function(){
			var $this = $(this).parent().find("img"), ImgTop = $this.css("top").substring(0,$this.css("top").indexOf("px")), ImgH = $this.height();
			clearInterval(ImgDown);
			ImgDown = setInterval(function(){
				if($this.height() > $this.parent().height()){
					if(-ImgTop == (ImgH - $this.parent().height())){
						clearInterval(ImgDown);
					}else{
						ImgTop--;
						$this.css("top",ImgTop+"px");
					}
				}
			},5)
		});
		$("body").on("mouseleave ",".imgDown",function(){
			clearInterval(ImgDown)
		});
		// end			
	},
	getCheck:function(){
		var documentH = document.documentElement.clientHeight;
		var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
		return documentH+scrollH>=common.main.getLastH() ?true:false;

	},
	getLastH:function(){//ppt-listItem为ul的id，listItem为li的class
		var wrap = document.getElementById('ul_listItem');
		var boxs = common.main.getClass(wrap,'li_item');
		return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
	},
	getClass:function(wrap,className){
		var obj = wrap.getElementsByTagName('*');
		var arr = [];
		for(var i=0;i<obj.length;i++){
			if(obj[i].className == className){
				arr.push(obj[i]);
			}
		}
		return arr;
	},		
	lazyLoadData:function(url){
		if(!common.main.is_empty(url)){
			var keyword = $("#search_btn").val();
			var type = $("#search_btn").attr('data_type');
			var sortType = $("#search_btn").attr('sort_type');
			$.get(
				url,
				{
					keyword:keyword,
					type:type,
					sortType:sortType,
					pageNumber:common.info.reloadWallfulPage
				},
				function(data){
					common.info.isReload=true;
					if(data == ""){
						common.info.isMaxPage=true;
					}else{
						$("#ul_listItem .li_item:last").before(data);
					}
					common.info.reloadWallfulPage++;
				}
			);
		}
	},
	lazyLoadInit:function(url){//异步加载列表动作初始化
		window.onscroll = function(){
			if(common.main.getCheck()&&common.info.isReload&&!common.info.isMaxPage){
				common.info.isReload=false;
				common.main.lazyLoadData(url);
			}
		}
	},	
	text_maxlength:function(className,maxwidth){
		function Trim(str){return str.replace(/(^\s*)|(\s*$)/g, "");}            
		className.each(function(){
		var max_width=maxwidth;
			if($(this).text().length>maxwidth){ 
				$text = Trim($(this).text().substring(0,max_width))
				$(this).text($text); 
				$(this).html($(this).html()+'…');
			}
		});            
	},
	search_event:function(){
		//搜索框回车按钮事件
		$("#search_btn").keydown(function(event){
			if(event.keyCode ==13){
				var keyword = $(this).val();
				if(keyword == ""){
					layer.msg("搜索内容不能为空喔~");
					return;
				}
				if(common.main.contain_emoji(keyword)){
					layer.msg("请填写正确的搜索内容~");
					return;
				}
				var type = $(this).attr('data_type');
				var sortType = $(this).attr('sort_type');
				location.href = "/search/?type=" + type + "&keyword=" + keyword + "&sortType=" + sortType;
				}
		});
		$("#search_mg_btn").on("click", function(){
			var keyword = $("#search_btn").val();
			if(keyword == ""){
				layer.msg("搜索内容不能为空喔~");
				return;
			}
			if(common.main.contain_emoji(keyword)){
				layer.msg("请填写正确的搜索内容~");
				return;
			}
			var type = $("#search_btn").attr('data_type');
			var sortType = $("#search_btn").attr('sort_type');
			location.href = "/search/?type=" + type + "&keyword=" + keyword + "&sortType=" + sortType;
		});
		//加载更多
		common.main.lazyLoadInit('/search/');
	},
	//判断是否开启团体会员管理的入口
	is_open_team_vip_manager_enter: function(){
		$.ajax({
			type:"get",
			url:"/member/team/get_rest_size/",
			success:function(data){
				if(data > 0){  //显示团体会员子账号管理入口
					$('#team_vip_manager_identifer').removeClass("team_child");
					$('#team_vip_manager_identifer').addClass("team_main");
					$('#team_vip_manager_enter').css("display","block");
				}
			}
		});
	},
	//获取社区消息或系统消息或求职消息的未读消息数量
	set_message_notification_count: function(type,id){
		$.get("/member/message_notification/count/",{"type":type},function(data){
			if(data>0){
				$("#"+id).text(data);
				$("#"+id).closest(".mess-num").show();
			}else{
				$("#"+id).closest(".mess-num").hide();
			}
		})
	},
	words_deal_textarea:function(textArea,numItem){
		var max = numItem.siblings("span").text(),curLength;
		curLength = textArea.text().length;
		numItem.text(curLength);
		textArea.on('keyup', function () {
			var _value = $(this).text().replace(/\n/gi,"");
			if(_value.length>max){
				numItem.addClass("over");
			}else{
				numItem.removeClass("over");
			}
			numItem.text( _value.length);
		});
	},
	// 在线编辑6.2.0 发布页新增 - 分页和图片放大镜
	pagination_and_magnifier:function(){
		if($(".wbdCv-container").length > 0 && $(".wbdCv-container").hasClass("resume") && !$(".wbdCv-container").hasClass("mobile")){
			// 分页
//	            var nowPageSize = 0; // 当前页数
//	            var resumePageHeight = 1160;// 每页高度
//	            var resumePageHtml = '<div class="resumePageBreak"><span>内容超过一页请用回车键避开空白处</span></div>';
//	            var resumeHeight = $(".wbdCv-resume").css({"height" : "auto","min-height":1160*2/3}).outerHeight();
//	            var pageSize = Math.ceil(resumeHeight / resumePageHeight);
//	            if(pageSize != nowPageSize) {
//	                var nowResumeHeight = pageSize * resumePageHeight;
//	                $(".wbdCv-resume").css({"height" : nowResumeHeight + "px"});
//	                nowPageSize = pageSize;
//	                // 清楚resumePageBreak
//	                $("div.resumePageBreak").remove();
//	                for(var index = 1; index < pageSize; index++) {
//	                    if(index!=pageSize){
//	                        var pageBreakObj = $(resumePageHtml);
//	                        pageBreakObj.css({"top" : ((index * resumePageHeight)-20) + "px"});
//	                        $(".wbdCv-resume").append(pageBreakObj);
//	                    }
//	                }
//	            }

			//	图片作品放大镜
			if($(".cv-preview .work-img").length > 0){
				$(".cv-preview .work-img").each(function(){
					var $open_magnifier = $('<div class="open_magnifier"></div>').html('<span>查看大图</span>');
					$open_magnifier.appendTo($(this))
				});
			}
			$(".work-list .work-img .open_magnifier span").on('click',function(){
				var src = $(this).parents(".work-img").find(".work-img-inner").find("img").attr("src"),
					$magnifier_masker = $('<div class="magnifier_masker"></div>').html('<div></div><span class="magnifier" style="background:url('+src+') center no-repeat; background-size:100%;"></span>');
				$magnifier_masker.appendTo($('body'));
				$('body').css('overflow','hidden');
			});
			$(document).on('click','.magnifier_masker>div',function(){
				$(".magnifier_masker").remove();
				$('body').removeAttr('style')
			})
		}
	},
	/**购物车数量*/
	cartSize:function() {
		var size = getCookie("cartSize");
		if(!size)
			$.ajax({async : false, url : wbdcnf.base + "/cart/size/", cache : false, type : "GET", success : function(data) {
				size = data;
			}});
		if(size && size > 0){
			$("#cart").addClass("cur");
		}else{
			$("#cart").removeClass("cur");
		}
	},
	/** 回到顶部 **/
	gotop:function(){
		var gotop = '<div class="gotop 500dtongji" data_track="PC-通用-通用-全屏右侧-帮助浮标-返回顶部"></div>';
		$("body").append(gotop);
		$(".gotop").click(function(){$('html, body').animate({scrollTop:0}, 700);});
		var min_height = 200;
		$(window).scroll(function(){
			var s = $(window).scrollTop();
			if(s > min_height){
				$(".gotop").fadeIn(100);
			}else{
				$(".gotop").fadeOut(100);
			};
		});
	},
	/**
	 * 登录信息
	 */
	loginMsg:function() {
		userHead = getCookie("memberHead");
		userId = getCookie("memberId");
		userEmail = getCookie("memberEmail");
		userIsVerifyEmail = getCookie("memberIsVerifyEmail");
		memberIsVerifyMobile = getCookie("memberIsVerifyMobile");
		if (userId != null || userEmail != null) {
			$("#login").hide(); // 登录|注册按钮
			$("#userHead").show().find("img").attr("src", userHead); // 显示头像
			$("#user_logout").show().click(function(){ // 登出按钮事件
				common.main.loginOut();
			});
			//是否验证
			if(!common.main.is_empty(userEmail)&&userEmail.indexOf("@")!=-1&&userIsVerifyEmail=="false"){//邮箱注册
				$(".tips_div").find(".email_tips").show();
				$(".tips_div").find(".mobile_tips").hide();
			}else{
				if(memberIsVerifyMobile=="false"){
					$(".tips_div").find(".email_tips").hide();
					$(".tips_div").find(".mobile_tips").show();
				}
			}
			if(userIsVerifyEmail=="false"&&memberIsVerifyMobile=="false"){
				$(".tips_div").show();
				$(".message_notification").show();
			}else{
				$(".tips_div").hide();
			}
		} else {
			$("#login").show(); // 登录按钮显示
			$("#userHead").hide();	//隐藏头像
		}
	},
	/**
	 * 注销登录
	 */
	loginOut:function() {
		if(window.localStorage) {
			// 退出登录清除
			window.localStorage.removeItem("discount_ticket");
			window.localStorage.removeItem("ticket_name");
		}
		// 防止退出登录接口缓存返回304处理
		$.get(wbdcnf.base + "/logout/?v=" + new Date().getTime(), function(data){
			if(data.type == "success") {
				$("#userHead").hide(); // 头像隐藏
				$(".ul_top_user").hide(); // 用户操作菜单隐藏
				$(".m-top_user").hide(); // 用户操作菜单隐藏
				
				$("#login").show(); // 显示登录|注册按钮
				var synarr = $(data.content); // 同步登出论坛
				synarr.each(function(index, ele) {
					$.getScript(ele.src, function(){});
				});
				location.reload();
			} else {
				var loaded = 0;
				var synarr = $(data.content);
				if(data.content != "" && synarr.length > 0) {
					synarr.each(function(index, ele) {
						$.getScript(ele.src, function(){
							if (++loaded == synarr.length) {
								location.href = wbdcnf.base + "/";
							}
						}).fail(function() {
							location.href = wbdcnf.base + "/";
						});
					});
				} else {
					location.href = wbdcnf.base + "/";
				}
			}
		});
	},
	//发送邮件
	sendEmail:function(email,send_url,send_method){
		var flag=false;
		//发送邮件
		$.ajax({
			url: send_url,
			type: send_method,
			data: {"email":email},
			dataType: "json",
			async:false,
			cache: false,
			success: function(message) {
				if(message.type=="success"){
					flag=true;
				}else{
					layer.msg(message.content);
				}
			}
		});
		return flag;
	},
	checkSize:function(file, showAlert, max_size) {
		if(!max_size)
			max_size = 3;
		var max_file_size = max_size * 1024 * 1024;
		if(file && file.files && file.files[0] && file.files[0].size) {
			var size = file.files[0].size;
			if(size > max_file_size) {
				if(showAlert)
					alert("上传图片文件过大，请上传小于" + max_size + "M的文件！");
				return false;
			}
		}
		return true;
	},
	/**百度连接主动推送*/
	baiduPoster:function() {
		var bp = document.createElement('script');
		bp.src = '//push.zhanzhang.baidu.com/push.js';
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(bp, s);
	},
	/** xss 过滤*/
	xssFilter:function(str){
		//1校验JavaScript运行环境
		if(str==null||str==""){
			return;
		}
		str=str.trim();//去空格
		str=str.toLowerCase();
		str=str.replace(new RegExp("javascript:;","gm"),"");//移除全局的javascript:;标记
		str=str.replace(new RegExp("javascript：;","gm"),"");
		if(str.indexOf("<script")!=-1){
			return "<script>";
		}
		if(str.indexOf("javascript:")!=-1){
			return "javascript:";
		}
		if(str.indexOf("javascript：")!=-1){
			return "javascript：";
		}
		if(str.indexOf("vbscript:")!=-1){
			return "vbscript:";
		}
		if(str.indexOf("vbscript：")!=-1){
			return "vbscript：";
		}
		if(str.indexOf("eval(")!=-1){
			return "eval(";
		}
		if(str.indexOf("<body")!=-1){
			return "<body>";
		}
		if(str.indexOf("document.write(")!=-1){
			return "document.write";
		}
		if(str.indexOf("innerhtml(")!=-1){
			return "innerHTML()";
		}
		if(str.indexOf("document.cookie")!=-1){
			return "document.cookie";
		}
		if(str.indexOf("<iframe")!=-1){
			return "<iframe>";
		}
		if(str.indexOf("<link")!=-1){
			return "<link>";
		}
		if(str.indexOf("document.location")!=-1){
			return "document.location";
		}
		if(str.indexOf("location.href")!=-1){
			return "location.href";
		}
	},
	/** 浏览器版本支持检查*/
	brower_check:function(){
			try{
			// 用于帮助 GA 检测各种奇奇怪怪的浏览器
			// 参考：http://jeffshow.com/get-more-precise-browser-info-in-google-analytics.html
			var browserName = "Other";
			var ua = window.navigator.userAgent;
			browserRegExp = {
			Sogou : /SE\s2\.X|SogouMobileBrowser/,
			Explorer2345 : /2345Explorer|2345chrome|Mb2345Browser/,
			Liebao : /LBBROWSER/,
			QQBrowser : /QQBrowser/,
			Baidu : /BIDUBrowser|baidubrowser|BaiduHD/,
			UC : /UBrowser|UCBrowser|UCWEB/,
			MiuiBrowser : /MiuiBrowser/,
			Wechat : /MicroMessenger/,
			MobileQQ : /Mobile\/\w{5,}\sQQ\/(\d+[\.\d]+)/,
			Shoujibaidu : /baiduboxapp/,
			Firefox : /Firefox/,
			Maxthon : /Maxthon/,
			Se360 : /360SE/,
			Ee360 : /360EE/,
			TheWorld : /TheWorld/,
			Weibo : /__weibo__/,
			NokiaBrowser : /NokiaBrowser/,
			Opera : /Opera|OPR\/(\d+[\.\d]+)/,
			Edge : /Edge/,
			AndroidBrowser : /Android.*Mobile\sSafari|Android\/(\d[\.\d]+)\sRelease\/(\d[\.\d]+)\sBrowser\/AppleWebKit(\d[\.\d]+)/i,
			IE : /Trident|MSIE/,
			Chrome : /Chrome|CriOS/,
			Safari : /Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/,
			};
			for (var i in browserRegExp) {
			if (browserRegExp[i].exec(ua)) {
				browserName = i;
				break;
			}
			}
			//判断是否是国产双核浏览器，是的话，则判断是否是兼容模式
			var browserAgent   = (navigator.userAgent).toLocaleLowerCase();
			var two_kit=false;//是否是国产双核浏览器
			if(browserName.indexOf("Se360") != -1 || browserName.indexOf("Ee360") != -1 || browserName.indexOf("QQBrowser") != -1|| browserName.indexOf("Explorer2345") != -1|| browserName.indexOf("Sogou") != -1|| browserName.indexOf("Liebao") != -1) {
				two_kit = true; //国产双核浏览器
			}
			user_agent = navigator.userAgent.toLowerCase();
			//当前是支持IE10以上的
			var title="你的浏览器版本过低不支持在线制作。";
			var content="本网站不支持您当前的浏览器版本，如果继续使用会影响编辑效果<br/>请将浏览器升级至最新版本<br/>或使用以下浏览器，以获得最佳使用体验。";
			var is_show=false;
			if (user_agent.indexOf("msie 7.0")>-1&&user_agent.indexOf("trident/5.0")>-1){
				is_show=true;
			}else if (user_agent.indexOf("msie 8.0")>-1&&user_agent.indexOf("trident/5.0")>-1){
				is_show=true;
			}else if(user_agent.indexOf("msie 8.0")>-1) {
				is_show=true;
			}else if(user_agent.indexOf("msie 7.0")>-1&&user_agent.indexOf("trident/4.0")>-1){
				is_show=true;
			}else if(user_agent.indexOf("msie 7.0")>-1){
				is_show=true;
			}else if(user_agent.indexOf("msie 6.0")>-1){
				is_show=true;
			}
			if(is_show){
				if(two_kit){
					title="你当前浏览器使用的是兼容模式";
					content="本网站不支持您当前的浏览器的兼容模式，如果继续使用会影响编辑效果<br/>请你将浏览器模式调为极速模式<br/>或使用以下浏览器，以获得最佳使用体验。";
				}
				$("#brower_title_tips").html(title);
				$("#brower_content_tips").html(content);
				$("#browserModal").modal("show");
			}
			}catch(e){
			console.log("浏览器版本检测失败");
			}
	},
	check_mobile:function(mobile){
		var flag=false;
		//发送邮件
		$.ajax({
			url: '/register/check_mobile/',
			type: "GET",
			data: {"mobile":mobile},
			dataType: "json",
			async:false,
			cache: false,
			success: function(bindFlag) {
				if(bindFlag){
					flag=true;
				}
			}
		});
		return flag;
	},
	check_email:function(email){
		var flag=false;
		//发送邮件
		$.ajax({
			url: '/register/check_email/',
			type: "GET",
			data: {"email":email},
			dataType: "json",
			async:false,
			cache: false,
			success: function(bindFlag) {
				if(bindFlag){
					flag=true;
				}
			}
		});
		return flag;
	},
	getUrlParamString:function(name) { 
		return common.main.getUrlParamStringUnescape(name,true);
	},
	getUrlParamStringUnescape:function(name,is_unescape) {
		try{
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) {
				return is_unescape ? unescape(r[2]) : r[2];
			}
			return "";
		}catch(e){
			
		}
		return "";
	},
	copyToClipBoard:function(str){
		var copyInput = $("<input type='text' value='http://www.500d.me/resume/"+ str +"/' style='opacity:0' id='copyText'>");
		copyInput.appendTo("body");
		document.getElementById("copyText").select();
		document.execCommand("copy",false,null)
		$("#copyText").remove();
	},
	form_to_json:function(form){    
		var o = {};    
		var a = form.serializeArray();    
		$.each(a, function() {    
			if (o[this.name]) {    
				if (!o[this.name].push) {    
					o[this.name] = [o[this.name]];    
				}    
				o[this.name].push(this.value || '');    
			} else {    
				o[this.name] = this.value || '';    
			}    
		});    
		return o;    
	},
	ajax_sync_send:function(url,data,method){
		var _rsp="";
		$.ajax({
			type : method,
			cache: false,
			async : false,
			url : url,
			data:data,
			success : function(rsp) {
				_rsp= rsp;
			}
		});
		return _rsp;
	},
	trim:function(str){ 
	  return str.replace(/\s+/g, "");
	},
	/**
	 * 初始化创建简历弹层
	 */
	init_create_resume_panel: function () {
		var category = common.info.resumeContentCategory;
		var $contain = $('#create_resume_panel');
		common.main.resume_search_operation();
		/**
		 * 初始化执行
		 */
		// 渲染分类
		if (category && category.length) {
			var $lv1 = $('<ul></ul>');
			category.forEach(function (item) {
				$lv1.append('<li data-id="'+ item.id +'">'+ item.name +'</li>');
			});
			$contain.find('.resume_select_lv1 .list').html($lv1.html());
		}
		/**
		 * 绑定事件
		 */
		// 关闭弹层
		$contain.find('.close').on('click', function () {
			$contain.removeClass('show');
			$('body').removeClass('open');
			common.info.createParamJson = undefined;
			custom_reset();
			$contain.find('.resume_select_search .search_show_btn').show();
			$contain.find('.resume-search-container').hide();
		});
		$contain.find('.header_backdrop').on('click', function () {
			$(this).parents('.resume_select_header').removeClass('open').find('.resume_select_lv2 .more').text('更多').addClass('toggle');
		});
		// 一级分类下拉
		$contain.find('.resume_select_lv1').on('mouseenter', function () {
			$(this).addClass('open');
		}).on('mouseleave', function () {
			$(this).removeClass('open');
		}).on('click', '.list li', function () {
			$contain.find('.resume_select_lv1').removeClass('open');
		});
		// 搜索
		$contain.find('.resume_select_search .search_show_btn').on('click', function () {
			$(this).hide();
			$contain.find('.resume_select_search .resume-search-container').show();
		});
		$contain.find('.resume-search-container .close-search').on('click', function () {
			$(this).parents('.resume-search-container').hide();
			$contain.find('.resume_select_search .search_show_btn').show();
		});
		// 自由编辑
		$contain.find('.to_drop_resume').on('click', function () {
			var $this = $(this);
			$this.addClass('checked');
			common.main.resume_confirm({
				title: "",
				content_html: "<span class='tips_title'>进入完全自由编辑模式</span><span class='tips-content'>你可以根据自己的喜好来控制整体的布局</span>",
				tips_modal_class: "dropcvresume_modal",
				ok: "开始编辑",
				showCancel: false,
				onOk: function () {
					window.location.href = "/dropcvresume/edit/";
				},
				onCancel: function () {
					$this.removeClass('checked');
				},
				onClose: function () {
					$this.removeClass('checked');
				},
			});
		});
		/**
		 * 自定义上传学校功能
		 */
		var $custom = $contain.find('.editor_university_from');
		var custom_reset = function () {
			$custom.find('input.name').val('');
			clipLogo.reset();
			$custom.find('#range-clip-logo input[type="range"]').attr({
				'disabled': 'disabled',
				'min': '1',
				'max': '100',
				'step': '1',
				'value': '50',
			});
			clipBackground.reset();
			$custom.find('#range-clip-background input[type="range"]').attr({
				'disabled': 'disabled',
				'min': '1',
				'max': '100',
				'step': '1',
				'value': '50',
			});
		}
		/**
		 * logo裁剪功能初始化
		 */
		var clipLogo = new Clip($custom.find('#clip-logo')[0], {
			clipSize: [160,160],
			outputSize: 1.25,
			fillBackground: '#ffffff',
			loaddone: function () {
				var $slide = $custom.find('#range-clip-logo input[type="range"]');
				$slide.attr({
					'min': clipLogo.imageScaleMin,
					'max': clipLogo.imageScaleMax,
					'step': (clipLogo.imageScaleMax - clipLogo.imageScaleMin) / 100,
				}).removeAttr('disabled').val(clipLogo.imageScaleRatio);
			},
			scaleChange: function (scale) {
				$custom.find('#range-clip-logo input[type="range"]').val(scale);
			},
			error: function () {
				layer.msg('图片载入失败！');
			},
		});
		// 加载图片
		$custom.find('#upload-clip-logo').on('change', function () {
			var $this = $(this);
			if ($this[0] && $this[0].files[0]) {
				clipLogo.load($this[0].files[0]);
				setTimeout(function () {
					$this.val('');
				}, 300);
			}
		});
		// 调整缩放
		$custom.find('#range-clip-logo input[type="range"]').on('input', function () {
			var val = $(this).val();
			var scaleRatio = clipLogo.imageScaleRatio;
			clipLogo.scale(clipLogo.sourceImageWidth * val - clipLogo.sourceImageWidth * scaleRatio);
		});
		$custom.find('#range-clip-logo .reduce, #range-clip-logo .add').on('click', function () {
			if (!clipLogo.ready) {
				return;
			}
			if ($(this).hasClass('add')) {
				clipLogo.scale(clipLogo.sourceImageWidth * 0.02);
			} else {
				clipLogo.scale(-(clipLogo.sourceImageWidth * 0.02));
			}
		});
		/**
		 * 背景图裁剪功能初始化
		 */
		var clipBackground = new Clip($custom.find('#clip-background')[0], {
			clipSize: [500,175],
			outputSize: 2,
			fillBackground: '#ffffff',
			loaddone: function () {
				var $slide = $custom.find('#range-clip-background input[type="range"]');
				$slide.attr({
					'min': clipBackground.imageScaleMin,
					'max': clipBackground.imageScaleMax,
					'step': (clipBackground.imageScaleMax - clipBackground.imageScaleMin) / 100,
				}).removeAttr('disabled').val(clipBackground.imageScaleRatio);
			},
			scaleChange: function (scale) {
				$custom.find('#range-clip-background input[type="range"]').val(scale);
			},
			error: function () {
				layer.msg('图片载入失败！');
			},
		});
		// 加载图片
		$custom.find('#upload-clip-background').on('change', function () {
			var $this = $(this);
			if ($this[0] && $this[0].files[0]) {
				clipBackground.load($this[0].files[0]);
				setTimeout(function () {
					$this.val('');
				}, 300);
			}
		});
		// 调整缩放
		$custom.find('#range-clip-background input[type="range"]').on('input', function () {
			var val = $(this).val();
			var scaleRatio = clipBackground.imageScaleRatio;
			clipBackground.scale(clipBackground.sourceImageWidth * val - clipBackground.sourceImageWidth * scaleRatio);
		});
		$custom.find('#range-clip-background .reduce, #range-clip-background .add').on('click', function () {
			if (!clipBackground.ready) {
				return;
			}
			if ($(this).hasClass('add')) {
				clipBackground.scale(clipBackground.sourceImageWidth * 0.02);
			} else {
				clipBackground.scale(-(clipBackground.sourceImageWidth * 0.02));
			}
		});
		// 下一步 / 上传信息
		$custom.find('.editdone-btn').on('click', function () {
			if (!clipLogo.ready) {
				layer.msg('请上传LOGO');
				return;
			}
			if (!clipBackground.ready) {
				layer.msg('请上传背景图');
				return;
			}
			common.main.validate({
				rules: [{
					target: $custom.find('input.name'),
					required: true,
					massage: '请输入正确的学校名称',
				}],
				onTips: function(tag, massage){
					layer.msg(massage);
					tag.focus();
				},
				onOk: function(value){
					var time_out = setTimeout(function () {
						layer.load();
					}, 100);
					// 上传图片
					var clips = [clipLogo, clipBackground];
					var clip_result = [];
					var updone = clips.length;
					clips.forEach(function (item, index) {
						var formData = new FormData();
						formData.append('file', item.toBlob(), item.fileName);
						formData.append('fileType',"uimage");
						$.ajax({
							url: wbdcnf.base + '/file/upload/',
							type: 'POST',
							dataType: 'text',
							data: formData,
							contentType: false,
							processData: false,
							success: function(res) {
								clip_result[index] = res;
							},
							complete: function () {
								updone--;
							},
						});
					});
					var timer = setInterval(function () {
						if (updone === 0) {
							clearTimeout(time_out);
							clearInterval(timer);
							layer.closeAll();
							// 生成校招所需参数
							common.info.createParamJson = {
								'schoolName': $custom.find('input.name').val(),
								'schoolLogo': clip_result[0],
								'schoolBackground': clip_result[1],
							};
							// 下一步 / 切换弹层状态
							common.main.open_create_resume_panel({
								type: 'university',
							});
						}
					}, 50);
				}
			});
		});
		/**
		 * 自定义上传学校功能  end
		 */
	},
	// 创建模板弹层模板列表获取
	get_create_resume_template: function (id, callback) {
		$.get('/cvresume/frame_template_list/', {
			id: id,
			pageSize: 50,
		}, function (res) {
			if (!res) {
				return;
			}
			var $temp = $('<div></div>');
			$temp.html(res);
			$temp.find('.template-common-cards').removeClass('hover');
			$temp.find('.template-common-pages').remove();
			common.main.__resume_template_list_operation($temp);
			if (typeof callback === 'function') {
				callback($temp.children());
			}
		});
	},
	// 打开创建简历弹层
	open_create_resume_panel: function(opt){
		var option = {
			type: 'resumeItemdoc',		// resumeContent（内容简历） || university（校招模板） || resumeItemdoc(在线模板风格) || resumeItemwap(在线模板设备)
			id: null,					// resumeContent：模板id  || university：学校id
			custom: false,				// university：校招状态下自定义上传学校
		};
		option = $.extend(option, opt);
		var $contain = $('#create_resume_panel');
		if (!$contain.length) {
			return;
		}
		$('body').addClass('open');
		$contain.addClass('show');
		var $custom = $contain.find('.school_custom_panel');
		var $resume = $contain.find('.resume_select_panel');
		var $head = $contain.find('.resume_select_header');
		var $slick = $contain.find('.resume_select_slick');
		var create_param_json = common.info.createParamJson;
		// 初始化样式
		$custom.addClass('hidden');
		$resume.removeClass('hidden');
		// 自定义上传学校打开
		if (option.type === 'university' && option.custom) {
			$custom.removeClass('hidden');
			$resume.addClass('hidden');
		}
		// 自定义学校上传状态下，不进行模板列表渲染
		if (!$custom.hasClass('hidden')) {
			return;
		}
		var category = common.info.resumeContentCategory;
		var current_category = {};
		// 渲染模板列表方法
		var render_slick = function () {
			var $card = $slick.find('.template-common-cards');
			// slick create
			$slick.slick({
				lazyLoad:'ondemand',
				accessibility: false,
				centerMode: true,
				speed: 300,
				slidesToShow: 3,
				centerPadding: $card.hasClass('wap') ? '18.2%' : '8.2%',
			});
			// to click template
			setTimeout(function () {
				$slick.find('.template-common-cards').each(function (index, element) {
					var $this =	$(element);
					$this.find('a.make-btn').removeAttr('target');
					$this.on('click', function () {
						var index = Number($this.attr('data-slick-index'));
						if (isNaN(index)) {
							return;
						}
						$slick.slick('slickGoTo', index);
					});
				})
			}, 16);
		}
		// 通过分类列表更新模板
		var use_category_get_template = function (opt, success) {
			var is_school = current_category.name === '院校' || $resume.find('.resume_select_lv1 .name').text().replace(/\s+/g, '') === '院校';
			var is_area = is_school && !!current_category.children;
			var _option = {
				searchType:'resumeCreate',
				resume: is_school ? 'university' : 'content',
				type: is_area ? 'universityArea' : 'university',
				id: current_category.id,
				size: 50,
				concat: false,
			};
			//风格、设备在线模板
			var is_fengge = current_category.name === '风格' || $resume.find('.resume_select_lv1 .name').text().replace(/\s+/g, '') === '风格';
			var is_shebei = current_category.name === '设备' || $resume.find('.resume_select_lv1 .name').text().replace(/\s+/g, '') === '设备';
			if(is_fengge || is_shebei){
				_option = {
					resume: 'resumeItem',
					type: is_fengge ? 'doc' : 'wap',
					id: current_category.id,
					size: 50,
					concat: false,
				};
			}
			_option = $.extend(_option, opt);
			if (is_school && !is_area) {
				_option.school = {
					logo: current_category.logo,
					background: current_category.background,
				};
			}
			_option.before = function () {
				if ($slick.hasClass('slick-initialized')) {
					$slick.slick('unslick').html('');
				}
			}
			_option.complete = function () {
				$slick.find('.template-common-cards').removeClass('hover');
				$slick.find('.template-common-pages').remove();
				render_slick();
				if (typeof success === 'function') success();
			}
			// 更新模板列表
			common.main.resume_template_center_list($slick, _option);
		}
		// 渲染二级分类方法
		var render_category = function (_level) {
			if (!current_category.children) {
				return;
			}
			var level = _level || [JSON.parse(JSON.stringify(current_category))];
			var $ul = $('<ul></ul>');
			// 2级分类以下显示返回
			if (level.length > 1) {
				var $back = $('<li>返回上一级</li>');
				$back.on('click', function () {
					current_category = level[level.length - 2];
					level.pop();
					render_category(level);
					use_category_get_template();
				});
				$ul.append($back);
			} else {
				var $all = $('<li class="checked">全部</li>');
				$all.on('click', function () {
					current_category = level[0];
					render_category();
					use_category_get_template();
				});
				$ul.append($all);
			}
			// 生成子级分类列表
			current_category.children.forEach(function (item) {
				if (item.id || current_category.name == '设备') {
					$li = $('<li data-id="'+ item.id +'">'+ item.name +'</li>');
					$li.on('click', function () {
						$(this).addClass('checked').siblings('li').removeClass('checked');
						current_category = item;
						if (current_category.children) {
							level.push(JSON.parse(JSON.stringify(item)));
						}
						render_category(level);
						use_category_get_template();
					});
					$ul.append($li);
				}
			});
			var $lv2 = $resume.find('.resume_select_lv2').html($ul.children());
			// 判断超出一行
			if ($ul.length && $lv2.find('li:last').offset().top > $lv2.offset().top) {
				$lv2.css('textAlign', 'left');
				var $more = $('<div class="more toggle">更多</div>');
				// 展开状态
				if ($head.hasClass('open')) {
					$more.text('收起').removeClass('toggle');
				}
				$more.on('click', function () {
					if ($head.hasClass('open')) {
						$head.removeClass('open');
						$(this).text('更多').addClass('toggle');
					} else {
						$head.addClass('open');
						$(this).text('收起').removeClass('toggle');
					}
				});
				$lv2.append($more);
			} else {
				$lv2.css('textAlign', 'center');
			}
		}
		// 筛选分类，渲染指定分类
		var filter_category = function (target, parent_arr) {
			var deepfind = function (val, arr, deep) {
				for (var i = 0; i < arr.length; i++) {
					var item = arr[i];
					if (item.id == val || item.name == val) {
						return JSON.parse(JSON.stringify(item));
					}
					if (deep && item.children) {
						var result = deepfind(val, item.children, deep);
						if (result) {
							return JSON.parse(JSON.stringify(result));
						}
					}
				}
			}
			// 根据父级分类路径查找
			if (parent_arr) {
				var path = String(parent_arr).split(',') || [];
				// 过滤无效值
				path = $.grep($.map(path, function (n) { return n.replace(/(^\s+|\s+$)/g, '') }), function (n) { return isNaN(n) ? !!n : !!Number(n) });
				var parents = [];
				path.forEach(function (item, index) {
					if (!index) {
						var root = deepfind(item, category);
						if (root) {
							parents.push(root);
						}
					} else {
						var prev = parents[index - 1];
						if (prev && prev.children) {
							parents.push(deepfind(item, prev.children));
						}
					}
				});
				if (parents.length) {
					current_category = parents[parents.length - 1];
					render_category(parents);
					$resume.find('.resume_select_lv1 .name').text(parents[0].name);
					$resume.find('.resume_select_lv2 li[data-id="'+ target +'"]').addClass('checked');
				}
			} else {
				current_category = deepfind(target, category, true) || category[0];
				render_category();
				$resume.find('.resume_select_lv1 .name').text(current_category.name);
			}
		}
		/**
		 * 首次打开初始化渲染
		 */
		if (!$slick.children().length) {
			// 内容模板处理
			if (option.type === 'resumeContent') {
				// 获取模板
				common.main.get_create_resume_template(option.id, function (children) {
					$slick.html(children);
					render_slick();
					// 指定模板搜索定位当当前模板
					if (option.id) {
						$slick.slick('slickGoTo', $slick.find('[data-id="'+ option.id +'"]').attr('data-slick-index') || 0, true);
					}
					// 根据模板渲染分类
					filter_category($slick.find('.template-common-cards').attr('data-category'), $slick.find('.template-common-cards').attr('data-category-path'));
				});
			}
			// 校招模板处理
			if (option.type === 'university') {
				// 设置选中院校，获取模板
				use_category_get_template({
					resume: 'university',
					type: option.id ? 'university' :"universityArea",
					id: option.id,
				}, function () {
					if (create_param_json) {
						$slick.find('.template-common-cards img.school-logo').attr('src', create_param_json.schoolLogo);
						$slick.find('.template-common-cards img.school-background').attr('src', create_param_json.schoolBackground);
						create_param_json = JSON.stringify(create_param_json);
						var $make = $slick.find('.template-common-cards a.make-btn');
						$make.each(function (i, element) {
							var href = $(element).attr('href');
							var query_index = href.indexOf('?');
							var path = query_index < 0 ? href : href.substring(0, query_index);
							var query = query_index < 0 ? '' : href.substring(query_index + 1);
							if (query_index < 0) {
								$(element).attr('href', path + '?' + create_param_json);
							} else {
								var href_params = {};
								query.split('&').forEach(function (item) {
									href_params[item.split('=')[0]] = item.split('=')[1];
								});
								href_params['createParamJson'] = decodeURI(create_param_json);
								$(element).attr('href', path + '?' + $.param(href_params));
							}
						});
					}
					filter_category($slick.find('.template-common-cards').attr('data-area-id'), '院校,' + $slick.find('.template-common-cards').attr('data-area-path'));
				});
			}
			//在线模板处理
			if(option.type.indexOf('resumeItem') != -1){
				use_category_get_template({
					resume: 'resumeItem',
					type: option.type.indexOf('doc') != -1 ? 'doc' : 'wap',
					category:'resumeItemId',
					id: option.id,
				}, function () {
					// 指定模板搜索定位当当前模板
					if (option.id) {
						$slick.slick('slickGoTo', $slick.find('[data-id="'+ option.id +'"]').attr('data-slick-index') || 0, true);
					}
					filter_category($slick.find('.template-common-cards').attr('data-tag-id'), option.type.indexOf('doc') != -1 ? '风格' : '设备');
				});				
			}
		} else {
			current_category = $.grep(category, function (n, i) {
				return n.name === $resume.find('.resume_select_lv1 .name').text();
			})[0];
			// 重新渲染列表
			if (option.id) {
				$slick.slick('unslick').html('');
				// 内容模板处理
				if (option.type === 'resumeContent') {
					// 获取模板
					common.main.get_create_resume_template(option.id, function (children) {
						$slick.html(children);
						render_slick();
						// 指定模板搜索定位当当前模板
						if (option.id) {
							$slick.slick('slickGoTo', $slick.find('[data-id="'+ option.id +'"]').attr('data-slick-index') || 0, true);
						}
						// 根据模板渲染分类
						filter_category($slick.find('.template-common-cards').attr('data-category'), $slick.find('.template-common-cards').attr('data-category-path'));
					});
				}
			}
			// 校招模板处理
			if (option.type === 'university') {
				// 设置选中院校，获取模板
				use_category_get_template({
					resume: 'university',
					type: option.id ? 'university' :"universityArea",
					id: option.id,
				}, function () {
					if (create_param_json) {
						$slick.find('.template-common-cards img.school-logo').attr('src', create_param_json.schoolLogo);
						$slick.find('.template-common-cards img.school-background').attr('src', create_param_json.schoolBackground);
						create_param_json = JSON.stringify(create_param_json);
						var $make = $slick.find('.template-common-cards a.make-btn');
						$make.each(function (i, element) {
							var href = $(element).attr('href');
							var query_index = href.indexOf('?');
							var path = query_index < 0 ? href : href.substring(0, query_index);
							var query = query_index < 0 ? '' : href.substring(query_index + 1);
							if (query_index < 0) {
								$(element).attr('href', path + '?' + create_param_json);
							} else {
								var href_params = {};
								query.split('&').forEach(function (item) {
									href_params[item.split('=')[0]] = item.split('=')[1];
								});
								href_params['createParamJson'] = create_param_json;
								$(element).attr('href', path + '?' + $.param(href_params));
							}
						});
					}
					filter_category($slick.find('.template-common-cards').attr('data-area-id'), '院校,' + $slick.find('.template-common-cards').attr('data-area-path'));
				});
			}
			//在线模板处理 
			if(option.type.indexOf('resumeItem') != -1){
				use_category_get_template({
					resume: 'resumeItem',
					type: option.type.indexOf('doc') != -1 ? 'doc' : 'wap',
					category:'resumeItemId',
					id: option.id,
				}, function () {
					// 指定模板搜索定位当当前模板
					if (option.id) {
						$slick.slick('slickGoTo', $slick.find('[data-id="'+ option.id +'"]').attr('data-slick-index') || 0, true);
					}
					filter_category($slick.find('.template-common-cards').attr('data-tag-id'), option.type.indexOf('doc') != -1 ? '风格' : '设备');
				});				
			}
		}
		// 渲染选中分类
		$resume.find('.resume_select_lv1 .list li').off('click').on('click', function () {
			current_category = category[$(this).index()];
			$resume.find('.resume_select_lv1 .name').text(current_category.name);
			render_category();
			use_category_get_template();
		});
	},
	/**
	 * 
	 * @param  selector			渲染容器
	 * @param  endowed_input 	数据渲染dom  inputElement
	 * @param  callback_opt 	{ checkOne, checkTow, checkThree } 点击事件回调
	 */
	job_selector_show: function(selector, endowed_input, callback_opt){
		common.main.job_selector_hide(selector);
		setTimeout(function(){
			selector.fadeIn(100);
			common.main.job_selector(selector, endowed_input, callback_opt);
		}, 50);
	},
	job_selector_hide: function(selector){
		selector.fadeOut(50);
	},
	job_selector: function(selector, endowed_input, callback_opt){
		if (!selector || !endowed_input) return;
		var opt = {
			checkOne: null,
			checkTow: null,
			checkThree: null,
		}
		$.extend(opt, callback_opt);
		try {
			var job_json = JSON.parse(common.main.get_job_json());
			// 渲染一级分类
			var $selector = selector;
			var $first_list = $('<div></div>');
			// 已遍历添加过 不需要触发
			if ($selector.find('.first_filter_bar a').length === 0) {
				$.each(job_json, function(index, item){
					$first_list.append('<a href="javascript:void(0);" data-url="'+ item.data_url +'">'+ item.name +'</a>');
				});
				$selector.children('.first_filter_bar').append($first_list.html());
			}
			$selector.children('.first_filter_bar').scrollTop(0);
			// 点击一级分类
			$selector.off('click', '.first_filter_bar a').on('click', '.first_filter_bar a', function(){
				var text = $(this).text();
				var url = $(this).attr('data-url');
				var index = $(this).index();
				if ($(this).hasClass('checked')) return;
				$(this).addClass('checked').siblings().removeClass('checked');
				render_tow_selector(job_json[index].children);
				$selector.find('.next_filter_bar .job_class a:eq(0)').trigger('click');
				if (opt.checkOne && typeof(opt.checkOne) === 'function') opt.checkOne(text, url);
			});
			$selector.find('.first_filter_bar a:eq(0)').trigger('click');
			// 渲染二级分类
			function render_tow_selector(arr){
				var $contain = $selector.children('.next_filter_bar');
				var $next_class = $('<div class="job_class"></div>');
				var $job_contain = $('<div class="job_contain"></div>');
				$.each(arr, function(tow_index, tow_item){
					// 二级分类
					$next_class.append('<a href="javascript:void(0);" data-url="'+ tow_item.data_url +'">'+ tow_item.name +'</a>');
					var $job = $('<div class="job_containlist"></div>');
					// 3级： 岗位列表 可能出现没有的情况
					if (!tow_item.children) {
						tow_item.children = [];
					}
					$.each(tow_item.children, function(three_index, three_item){
						// 岗位名称列表
						$job.append('<a href="javascript:void(0);" data-url="'+ three_item.data_url +'">'+ three_item.name +'</a>');
						$job.appendTo($job_contain);
					});
				});
				$contain.html('');
				$contain.append($next_class);
				$contain.append($job_contain);
				$contain.children('.job_contain').css('height', $contain.height() - $contain.children('.job_class').outerHeight() + 'px');
				// 岗位类型点击事件
				var is_jobclass_tap = false;
				$selector.off('click', '.next_filter_bar .job_class a').on('click', '.next_filter_bar .job_class a', function(){
					var text = $(this).text();
					var url = $(this).attr('data-url');
					var index = $(this).index();
					var $job_contain = $selector.find('.next_filter_bar .job_contain .job_containlist');
					if ($(this).hasClass('checked') || is_jobclass_tap) return;
					is_jobclass_tap = true;
					$(this).addClass('checked').siblings().removeClass('checked');
					$job_contain.fadeOut(200);
					setTimeout(function(){
						$job_contain.eq(index).fadeIn(200);
						is_jobclass_tap = false;
						if (opt.checkTow && typeof(opt.checkTow) === 'function') opt.checkTow(text, url);
					}, 200);
				});
				// 岗位点击选择
				$selector.off('click', '.next_filter_bar .job_containlist a').on('click', '.next_filter_bar .job_containlist a', function(){
					var text = $(this).text();
					var url = $(this).attr('data-url');
					endowed_input.val($(this).text());
					common.main.job_selector_hide(selector);
					if (opt.checkThree && typeof(opt.checkThree) === 'function') opt.checkThree(text, url);
				});
			}
		} catch (error) {
			console.log(error);
			$('#job_selector').hide();
		}
	},
	// 简历投递跳转
	send_resume:function(){
		$(document).on("click",".open_send_resume_modal",function(){
			if($("html").attr("class") == 'sendResumePage'){
				window.location.href ="/member/resume_send_records/resume_send_edit/";
			}else{
				window.open("/member/resume_send_records/resume_send_edit/")
			}
		});
	},
	ab_test_event:function(){
		var _abTest;
		if(window.localStorage){
			_abTest = localStorage.getItem("abTest");
			if(common.main.is_empty(_abTest)){
				_abTest = Math.floor(Math.random()*2+1);
				localStorage.setItem("abTest", _abTest);
			}
		}else{
			_abTest = Math.floor(Math.random()*2+1);
		}
		common.info.abTest = _abTest;
	},
	isIE9:function(){
		try{
			if(navigator.userAgent.indexOf("MSIE")>0){    
				if(navigator.userAgent.indexOf("MSIE 9.0")>0){  
					return true;
				}else{
					return false;
				}
			} 
		}catch(e){
			console.log("浏览器版本判断错误"+e);
			return false;
		}
	},
	// 倒计时器
	countDown: function(time) {
		var time = time || {},
			h = time.h || 0,
			m = time.m || 0,
			s = time.s || 1,
			interval;
		// 判断秒 和 分超出时间规则  分 和 时 递增
		if(h <= 0 && m <= 0 && s <= 0) {
			h = 0;
			m = 0;
			s = 0;
			if(time.run) time.run(h, m, s);
			if(time.end) time.end(h, m, s);
			return;
		}
		if(s >= 60) {
			m += parseInt(s / 60);
			s = s % 60;
		}
		if(m >= 60) {
			h += parseInt(m / 60);
			m = m % 60;
		}
		interval = setInterval(function() {
			s--;
			if(s < 0) {
				if(m <= 0) {
					if(h <= 0) {
						if(h <= 0 && m <= 0 && s <= 0) {
							clearInterval(interval);
							// 倒计时结束回调
							if(time.end) time.end(h, m, s);
						}
					} else {
						h -= 1;
						m = 59;
						s = 59;
					}
				} else {
					m -= 1;
					s = 59;
				}
			}
			// 计时 实时回调
			if(time.run) time.run(h, m, s);
		}, 1000);
	},
	// 随机数
	random: function (max, min){
		return ~~(Math.random() * (max + 1 - min) + min);
	},
    urlMapping:function(){//PC/WAP链接映射匹配函数方法
    	try{
    		var _currentDeviceInfo = common.main.get_device_info();
    		if(_currentDeviceInfo.pc){
    			return;
    		}
        	$.each(common.urlMapping,function(key1,value1){
        		var reg = new RegExp(key1);
        		var _pathname = window.location.pathname;
        		var _search = window.location.search;
        		if(reg.test(_pathname)){
        			var _params = _pathname.match(reg);
        			if(_params != null && _params.length > 0){
        				_params.splice(0,1);//去除素组第一个元素
        				var _url = value1.url;
        				//restful风格参数替换
        				$.each(_params,function(i,param){
        					_url = _url.replace("{"+i+"}", param);
        				});
        				//普通参数替换
        				if(_search.length != 0){
        					if(_url.indexOf("?") != -1 && _search.indexOf("?") != -1){
        						_search = _search.replace("?","&");
        					}
        					//解决pc与wap端参数key不一致
        					$.each(value1.params,function(j,params){
        						$.each(params,function(key2,value2){
									_search = _search.replace(key2, value2);
        						});
        					})
        				}
        				window.location.href = _url + _search;
        			}
        		}
        	});
		}catch(err){
			console.error(err)
		}
    },
    onlineKefu:function(){
    	try{
    		$('.workorder_bar').css('cssText', 'display:none !important');
    		//接入页面url
	    	var includeUrls = [
		    	"^/$",
		    	"^/member/myresume/$",
		    	"^/member/order/$",
		    	"^/member/resume_cover_letter/list/$",
		    	"^/member/workOrder/$",
		    	"^/cvresume/edit/$",
		    	"^/cvresume/([A-Za-z\\d]*)/$",
		    	"^/customize/",
		    	"^/hr/select_publish_type/$",
		    	"^/hr/publish_([-A-Za-z\\d]*)/$",
		    	"^/hr/([A-Za-z\\d]*)/$",
                "^/template/find/$",
                "^/template/find-([A-Za-z\\d]*)/$"
	    	];
	    	var is = false;
	    	$.each(includeUrls,function(i,item){
	    		var reg = new RegExp(item);
	    		var _pathname = window.location.pathname;
	    		if(reg.test(_pathname)){
	    			is = true;
	    			return;
	    		}
	    	});
	    	if(!is){
	    		return;
			}
	    	$.get('/common/online_kefu_status/',function(result){
	            if(result.type == 'success' && result.content == '1'){//激活在线客服
	                initMeiQia();
	            }else{
	                $('.workorder_bar').css('cssText', 'display:block!important;');
	                $('#yeyingKefuWidget').attr('style','display:none!important;');
	            }
	        });
	    	function initMeiQia(){
	            var _uid = getCookie('memberId');
	            var _vip = getCookie('memberVip');
	            var _register_date = getCookie('memberRegisterDate');
	            var _name = getCookie('memberName');
	            var _tel = getCookie('memberMobile');
	            var _email = getCookie('memberEmail');;
	            (function(m, ei, q, i, a, j, s) {
	                m[i] = m[i] || function() {
	                            (m[i].a = m[i].a || []).push(arguments)
	                        };
	                j = ei.createElement(q),
	                        s = ei.getElementsByTagName(q)[0];
	                j.async = true;
	                j.charset = 'UTF-8';
	                j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
	                s.parentNode.insertBefore(j, s);
	            })(window, document, 'script', '_MEIQIA');
	            _MEIQIA('entId', 110962);
	            // 用户信息
	            _MEIQIA('metadata', {
	                uid:_uid!=undefined?_uid:'无',
	                vip:_vip!=undefined?_vip:'无',
	                register_date:_register_date!=undefined?_register_date:'无' ,
	                name:_name!=undefined?_name:'无' ,
	                tel:_tel!=undefined?_tel:'无',
	                email:_email!=undefined?_email:'无'
	            });
	            _MEIQIA('allSet', function(){
					$("#MEIQIA-BTN-HOLDER").css('cssText', 'display:block;right: 10px !important;bottom:90px !important;');
					$("#MEIQIA-BTN").css('cssText', 'background-color:#80e0c8; border:none; box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.13);');
					$("#MEIQIA-BTN-ICON").css('cssText', 'width:100%; height:100%; top:0; left:0; background-image:url(/resources/500d/common/images/online_kefu_icon.png) !important; background-size:auto !important; background-position:0 0 !important;');
	            });	            
	        }
    	}catch(e){
    		console.error("初始化在线客服入口异常",e)
    	}
    },
	//	优惠券弹窗
	get_discount_ticket: function(){
		if(!getCookie("memberId")|| !window.localStorage) {
			return;
		}
		var day=common.main.date_format(new Date(),"yyyyMMdd");
		var stroage_discount_ticket=window.localStorage.getItem("discount_ticket");
		if(stroage_discount_ticket!=undefined && stroage_discount_ticket.indexOf("all_close")>=0){//判断是否全部关闭
			//判断时效性，一天有效
			var all_close_day="all_close,"+day;
			if(stroage_discount_ticket==all_close_day){//一天不再显示
				return;
			}
		}
		if(!stroage_discount_ticket) {
			window.localStorage.setItem("discount_ticket", "show_modal");
		}
		if(stroage_discount_ticket !== "show_modal") {
			return;
		}
		$.get("/coupon/can_receive/", function(data){
			if(data.type === "success" && data.content) {
				var _data = JSON.parse(data.content),
					_ids = [];
				// 优惠券弹窗
				var html = '<p class="discount_ticket_title">专享福利&emsp;限时「领取」</p><ul id="discount_ticket_lists" class="discount_ticket_lists"></ul>';
				common.main.resume_confirm({
					title:"",
					content_html: html,
					modal_class:"modal_discount_ticket",
					ok: "立即领取",
					onOk: function(){
						_data.couponList.forEach(function(i, e){
							_ids.push(i.id);
						});
						$.post("/coupon/receive/", {
							ids: _ids.join(",")
						}, function(data){
							if(data.type == "success") {
								common.main._500dtongji("PC-GR6.3.1-通用-领取页面-悬浮弹窗-底部-立即领取");
								// 领取优惠券成功
								window.localStorage.setItem("discount_ticket", "all_close," +day);
								window.localStorage.removeItem("ticket_name");
								setTimeout(function(){
									var success_html = '<p class="getticket_success_title">成功领取福利</p>'+
														'<p class="getticket_success_link">可在<a href="/member/coupon/">个人中心</a>查看</p>'+
														'<p class="getticket_success_msgtitle">开始完善你的求职材料！</p>'+
														'<ul class="getticket_success_msglist"><li class="getticket_success_massage"><p>在线编辑简历，海量内容模板供您参考</p></li>'+
														'<li class="getticket_success_massage"><p>各行业资深HR答疑解惑，求职烦恼全解决</p></li>'+
														'<li class="getticket_success_massage"><p><span>4,000,000+</span>位求职者在使用的五百丁</p></li></ul>';
									common.main.resume_confirm({
										title:"",
										content_html: success_html,
										modal_class:"modal_discount_ticket success",
										ok: "去使用",
										onOk: function(){
											common.main._500dtongji("PC-GR6.3.1-通用-使用页面-悬浮弹窗-底部-去使用");
											location.href = "/member/coupon/";
										},
									});
								}, 300);
							}
						});
					},
					onLayer: function(){
						window.localStorage.setItem("discount_ticket", "show_banner");
					},
				});
				// 优惠券节点渲染 2张
				$.each(_data.couponList, function(i, e) {
					var $html = '<li class="discount_ticket_list">'+
									'<div class="left">'+
										'<p class="ticket_name">'+e.name+'</p>'+
										'<p class="ticket_massage">'+e.scope+'</p>'+
										'<p class="ticket_massage">有效期：'+e.effectBeginDate.replace(/\-/g, ".")+' - '+e.effectEndDate.substring(5).replace(/-/g, ".")+'</p>'+
									'</div>'+
									'<div class="right">'+
										'<p class="ticket_money">'+(e.type == "减免券" ? '&yen;<span>'+e.discount+'</span>' : '<span>'+e.discount+'</span>折')+'</p>'+
										'<p class="ticket_condition">满'+e.minPrice+'可用</p>'+
									'</div>'+
								'</li>';
					$("#discount_ticket_lists").append($html);
				});
				// 监听关闭按钮
				$(".modal_discount_ticket").find("button.close").click(function(){
					common.main._500dtongji("PC-GR6.3.1-通用-领取页面-悬浮弹窗-右上角-关闭");
					window.localStorage.setItem("discount_ticket", "show_banner");
				});
				window.localStorage.setItem("ticket_name", _data.couponList[0].name);
			} else {
				// 已领取
				window.localStorage.setItem("discount_ticket", "all_close," + day);
			}
		});
	},
	//	优惠券置顶板块
	top_discount_ticket: function(){
		if(!getCookie("memberId")||!window.localStorage) {
			// 退出登录清除
			window.localStorage.removeItem("discount_ticket");
			window.localStorage.removeItem("ticket_name");
			return;
		}
		var stroage_discount_ticket=window.localStorage.getItem("discount_ticket")
		if( !stroage_discount_ticket || stroage_discount_ticket!=="show_banner" || $(".top_discount_ticket").length > 0) {
			return;
		}
		var html = '<div class="top_discount_ticket">'+
						'<div class="discount_ticket_content">'+
							'<i class="ticket_content_img"></i>'+
							'<p class="ticket_content_text">您有待领取的优惠券——<span>'+(window.localStorage.getItem("ticket_name") || "优惠券")+'</span></p>'+
							'<div class="ticket_content_btn">立即领取</div>'+
						'</div>'+
						'<i class="close_discount_ticket"></i>'+
					'<div>';
		$("body").prepend($(html));
		// 处理首页顶部导航条重叠
		if(window.location.pathname == "/") {
			if($(window).scrollTop() > 800) {
				setTimeout(function(){
					$(".jl-header").css("top", 0);
				}, 50);
			} else {
				$(".jl-header").css("top", "auto");
			}
			$(window).on("scroll", function(){
				if($(".jl-header").css("position") == "fixed") {
					$(".jl-header").css("top", 0);
				} else {
					$(".jl-header").css("top", "auto");
				}
			});
		}
		// 立即领取点击
		$(".top_discount_ticket").find(".ticket_content_btn").click(function(){
			common.main._500dtongji("PC-GR6.3.1-通用-通用-顶部横幅-右侧-立即领取");
			window.localStorage.setItem("discount_ticket", "show_modal");
			common.main.get_discount_ticket();
			close();
		});
		// 关闭按钮点击
		$(".top_discount_ticket").find(".close_discount_ticket").click(function(){
			common.main._500dtongji("PC-GR6.3.1-通用-通用-顶部横幅-右侧-关闭")
			close();
			window.localStorage.setItem("discount_ticket", "all_close," + common.main.date_format(new Date(),"yyyyMMdd"));
		});
		// 关闭
		function close(){
			$(".top_discount_ticket").animate({
				"height": 0
			}, 500, function(){
				$(this).hide();
			});
		}
	},
    // 编辑页功能区域初始化
    function_panel_initial:function(){
		// 案例贴士顶部阴影
		$('.function_panel .panel_container').on('scroll', function(){
			if ($(this).scrollTop() > 0) {
				$(this).siblings('.top_boxshadow').show();
			} else {
				$(this).siblings('.top_boxshadow').hide();
			}
		});
		// 案例初始化
		var page_number = 1;
		var case_filter_buffer = false;		// 阻止连续点击
		var resume_case_list = {}; //存放当前岗位筛选过的案例
		var resume_case_no_content = false;//案例无内容标记
		var old_case_job = ''; // 记录旧的岗位
		// 案例接口获取内容
		function get_filter_case(is_pageadd){
			if (case_filter_buffer) return;
			case_filter_buffer = true;
			// pageNumber是否递增
			if (is_pageadd) {
				page_number++;
			} else {
				page_number = 1;
			}
			var case_language = cvresume.info.language;
			var case_module = $('.case_filter_modulename').attr('data-module');
			var case_job = $('.case_filter_job input[name=case_job]').val() || '';

			//如果岗位发生变化，清空resume_case_list
			if(case_job !== old_case_job){
				resume_case_list = {};
				old_case_job = case_job;
			}else if(page_number > 1 || resume_case_no_content){
				//换一批时,只清空当前模块
				delete resume_case_list[case_module];
				resume_case_no_content = false;
				if ($(".panel_case .case_bar .case_list").length <= 0) {
					page_number = 1;
				}
			}else{
				//判断resume_case_list中是否已有渲染过的案例
				if(!common.main.is_empty(resume_case_list[case_module])){
					$(".panel_case .case_bar").html(resume_case_list[case_module]);
					case_filter_buffer = false;
					return;
				}
			}
			$.get('/cvresume/cases_filter/', {
				moduleType: case_module,
				pageNumber: page_number,
				keyword: case_job,
				language: case_language,
			}, function(result){
				case_filter_buffer = false;
				var $result = $('<div></div>').append(result);
				// 单位  岗位  去除格式
				$result.find('.case_title span').each(function(){
					$(this).html($(this).text());
				});
				// 内容去除格式
				$result.find('.case_content').each(function(){
					$(this).find('*:not(br)').each(function(i, item){
						$(item).removeAttr('style');
						if (/^(font|strong|b|em|i|s|del|u|ins)$/i.test(item.nodeName)) {
							$(item).prop('outerHTML', '<span>' + item.textContent + '</span>');
						}
					});
				});
				$(".panel_case .case_bar").html($result.prop('outerHTML'));
				if (result.indexOf('case_list') < 0) {
					page_number = 0;
					resume_case_no_content = true;
				}
				//保存当前模块案例数据
				resume_case_list[case_module] = result;
			});
		}
		// 获取对应岗位的案例
		var job_jsonstr = common.main.get_job_json(),
			jobFunction = $("#jobFunction").find("span").text(),
			position;
		// 过滤空内容
		if (jobFunction.replace(/\s/g, '') !== '') {
			if(job_jsonstr.indexOf(jobFunction) > 0){
				var job_json = JSON.parse(job_jsonstr);
				is_break:for(var i in job_json) {
					for(var j in job_json[i].children) {
						for(var k in job_json[i].children[j].children) {
							if (job_json[i].children[j].children[k].name.indexOf(jobFunction) >= 0) {
								position = job_json[i].children[j].children[k].data_url;
								break is_break;
							}
						}
					}
				}
			}
			$('.case_filter_job input[name=case_job]').val(jobFunction).attr('data-url', position);
		}
		get_filter_case();
		// 案例初始化 end
		/**
		 * 案例筛选
		 */
		$('.panel_case .case_filter_job input[name=case_job]').on('click', function(){
			var $this = $(this);
			var $case_job = $('#case_job_selector');
			$this.toggleClass('show_selector');
			if ($this.hasClass('show_selector')) {
				common.main.job_selector_show($case_job, $this, {
					checkThree: function(text, url){
						$this.removeClass('show_selector');
						$this.attr('data-url', url);
						get_filter_case();
					},
				});
				var case_job_width = $this.parents('.panel_container').width() - 6;
				var case_job_left_width = $case_job.children('.first_filter_bar').outerWidth();
				$case_job.css('width', case_job_width + 'px');
				$case_job.children('.next_filter_bar').css('width', case_job_width - case_job_left_width - 2 + 'px');
			} else {
				common.main.job_selector_hide($case_job);
			}
			$(document).off('click', listen_hideselector).on('click', listen_hideselector);
		});
		// 案例筛选  模块筛选
		$('.panel_case .case_filter_modulename').on('click', function(){
			$(this).siblings('.case_filter_modulelist').fadeToggle(200);
			$(document).off('click', listen_hideselector).on('click', listen_hideselector);
		});
		$('.panel_case .case_filter_modulelist li').on('click', function(){
			var $parent = $(this).parents('.case_filter_modulelist');
			$parent.siblings('.case_filter_modulename').text($(this).text()).attr('data-module', $(this).attr('data-module'));
			$parent.fadeOut(200);
			get_filter_case();
		});
		// 下一页
		$('.panel_case .change_case').on('click', function(e){
			// 被动触发时 初始化到第一页
			if (e.isTrigger) {
				get_filter_case();
			} else {
				get_filter_case(true);
			}
		});
		// 更多案例弹框
        $(".panel_case .more_case").on("click", function(){
            if($("#case-modal").empty()){
                var itemid=$(this).attr("itemid");
                $.get("/cvresume/cases/",{"itemid":itemid,"resumeId":cvresume.info.resumeid},function(result){
                    $("#case-modal").append(result);
                    common.main.resume_cases_event();
                });
            }
            $("#case-modal").modal("show");
            $("#case-modal").css({"background":"none"})
        });
        /**
		 * 小贴士
		 */
        $(document).on("click",".tips_content_text .list .title",function(){
            var $thislist = $(this).parent(".list");
            if($thislist.hasClass("show")){
                $thislist.removeClass("show");
                $thislist.siblings(".list").removeClass("show");
            }else{
                $thislist.addClass("show");
                $thislist.siblings(".list").removeClass("show");
            }
        });
        // 点击模块显示小贴士事件 (切换案例方法可以写在这里)
        $(document).on("click",".moduleItem",function(){
			// 自定义模板 && 二维码 不触发
			if($(this).hasClass("customItem") || $(this).hasClass("ewmItem")) return;
			var $id = $(this).attr("id");
            if($(this).hasClass("bInfoItem")){
                $(".tips_content_select ul li[data-select-id='base_info']").addClass("selected").siblings().removeClass("selected");
                $(".tips_content_select span").text("基本信息");
                $(".tips_content_text ul li[data-list-id='base_info']").addClass("selected").siblings().removeClass("selected");
            } else {
                if($(this).hasClass("coverItem") || $(this).hasClass("letterItem")){
                    $id = $(this).parent().attr("id");
                }
                var $text = $(".tips_content_select ul li[data-select-id="+$id+"]").text();
                $(".tips_content_select ul li[data-select-id="+$id+"]").addClass("selected").siblings().removeClass("selected");
                $(".tips_content_select span").text($text);
                $(".tips_content_text ul li[data-list-id="+$id+"]").addClass("selected").siblings().removeClass("selected");
			}
			// 显示相关案例
			if ($id === $('.panel_case .case_filter_modulename').attr('data-module')) return;
			$('.panel_case .case_filter_modulelist li').each(function(){
				if ($id === $(this).attr('data-module')) {
					$('.panel_case .case_filter_modulename').text($(this).text()).attr('data-module', $(this).attr('data-module'));
					get_filter_case();
				}
			});
		});
		/**
		 * 案例弹框
		 */
        $(document).on("click","#case-modal .close",function(){
            common.main._500dtongji("PC-CV6.7.0-在线制作-案例库弹窗页-顶部-右上-关闭");
            $(".modal-backdrop").remove();
            $(".defaultmodal.case_modal .modal-content").css({"animation": "close_slow 0.5s ease forwards"});
            setTimeout(function(){
                $("#case-modal").modal("hide");
            },800);
		});
		// 点击其他地方关闭案例岗位选择和模块选择
		function listen_hideselector(e){
			var $target = $(e.target);
			if ($target.parents('.case_filter_job').length === 0) {
				$('.panel_case .case_filter_job input[name=case_job]').removeClass('show_selector');
				common.main.job_selector_hide($('#case_job_selector'));
			}
			if ($target.parents('.case_filter_module').length === 0) {
				$('.panel_case .case_filter_module .case_filter_modulelist').fadeOut(200);
			}
		}
        // 面板应用案例按钮
        $(document).on('click','.panel_case .case_masking span',function(){
			var $this = $(this);
			common.main.resume_confirm({
				title:"",
				content_html:"<span class='tips_title'>确定应用此案例内容？</span><span class='tips-content'>应用后已编辑的简历内容将被覆盖。</span><label class='neverNotfy'><input type='checkbox' id='checkedNotfy' class='checkedNotfy'><span>不再提醒</span></label>",
				tips_modal_class:"confirm_modal",
				modal_class:"tips-modal-content change_content_confirm case_confirm_modal",
				onOk:function(){
                    common.main._500dtongji("PC-CV6.9.1-在线制作-简历编辑页-右侧选项-案例蒙层-应用此案例");
					var $case = $this.parents('.case_list'),
                        $item = $('#' + $('.panel_case .case_filter_modulename').attr('data-module')),
                        $focus = (cvmutual && cvmutual.info.focus_moduleList && cvmutual.info.focus_moduleList.parents('.moduleItem').attr('id') === $case.attr('data-id')) ? cvmutual.info.focus_moduleList : null,
                        $target, content = $case.find('.case_content').html();
					if($item.hasClass('timeItem')){
                        $target = $focus || $item.find('.moduleItemList').eq(0);
						$target.find('.dd-title span.company div[contenteditable]').html($case.find('.case_title span').eq(0).text());
						$target.find('.dd-title span.post div[contenteditable]').html($case.find('.case_title span').eq(1).text());
						$target.find('div.resume_content').html(content);
					}else{
						$target = $focus || $item.find('.resume_content[contenteditable]');
						$target.html(content);
					}
				},
			});
        });
    },
	contain_emoji:function(content){
		try{
			var ranges = [
		        '\ud83c[\udc00-\udfff]', 
		        '\ud83d[\udc00-\udfff]', 
		        '\ud83e[\udd00-\udfff]',
		        '[\u2600-\u27ff]',
		        '[\udc00-\udfff]'
	    	];
	    	var reg = new RegExp(ranges.join('|'), 'g');
	    	return reg.test(content);
    	}catch(e){
    		return false;
    	}
	},
	validate: function(obj) {
		/*	配置项
			common.main.validate({
				rules: [{
					target: tag | string,
					required: boolean,
					type: string | regexp,
					rangelength: number | array,
					equalTo: tag | string,
					massage: string
				}],
				onTips: function(tag, massage){},
				onOk: function(value){},
			})
		*/
		var validate_data = {
			rules: [],
			onTips: null,
			onOk: null
		};
		// 验证提示文案
		var massage = {
			"common": '请输入正确的内容！',
			"email": '请输入正确的邮箱地址！',
			"phone": '请输入正确的电话号码！',
			"number": '请输入数字！',
			"int": '请输入0以上的整数！',
			"floor": '请输入带有小数点的数字！',
			"url": '请输入正确的链接！',
			"cn": '请输入中文！',
			"en": '请输入英文！',
			"equalTo": '再次输入内容不一致！',
			"required": '请输入必填项！',
			"rangelength": '输入的内容字数不符和！',
			"nopassword": '请输入密码！',
			"noconfirm_password": '请输入确认密码！',
			"illegal": '存在非法内容，请输入正确的内容！'
		};
		$.extend(validate_data, obj);
		if (validate_data.rules.length <= 0) {
			return console.error("rules No iteration");
		}
		var validate_val = []; // 验证字段数组
		for (var i = 0, len = validate_data.rules.length; i < len; i++) {
			var item = validate_data.rules[i];
			if (typeof item.target !== "string" && !item.target) {
				return console.error('rules.target not defined'); // 没有target 跳过
			}
			var val = get_target_val(item.target),
				msg = null,
				tag = item.target;
			// 验证内容是否非法
			if (is_illegal(val)) {
				validate_tips(tag, massage['illegal']);
				return;
			}
			// 是否必填项    空值跳过，有值会进行验证
			if (!item.required && is_null(val)) {
				// 放入数组通过回调导出
				validate_val.push(val);
				continue; // 非必填项跳过
			}
			// 是否定制massge提示文案
			if (item.massage && typeof item.massage == "string") {
				msg = item.massage;
			}
			// 必填项验证类型
			if (item.type && typeof item.type !== "string") {
				// type为正则 正则判断
				try {
					if (!item.type.test(val)) {
						validate_tips(tag, msg || massage['common']);
						return;
					}
				} catch (e) {
					return console.error("type is not a Regexp");
				}
			} else {
				switch (item.type) {
					case "email":
						if (!is_email(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "phone":
						if (!is_phone(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "number":
						if (!is_number(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "int":
						if (!is_int(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "floor":
						if (!is_floor(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "url":
						if (!is_url(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "cn":
						if (!is_cn(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "en":
						if (!is_en(val)) {
							validate_tips(tag, msg || massage[item.type]);
							return;
						}
						break;
					case "password":
						if (is_null(val)) {
							validate_tips(tag, msg || massage['nopassword']);
							return;
						}
						break;
					case "confirm_password":
						if (is_null(val)) {
							validate_tips(tag, msg || massage['noconfirm_password']);
							return;
						}
						break;
					default:
						if (is_null(val)) {
							validate_tips(tag, msg || massage['required']);
							return;
						}
						break;
				}
			}
			// 验证长度
			if (item.rangelength && !rangelength(val, item.rangelength)) {
				validate_tips(tag, msg || massage['rangelength']);
				return;
			}
			// 验证相同值
			if (item.equalTo) {
				var equalTo_val = get_target_val(item.equalTo);
				if (val !== equalTo_val) {
					validate_tips(tag, msg || massage['equalTo']);
					return;
				}
			}
			// 放入数组通过回调导出
			validate_val.push(val);
		}
		// 回调
		if (validate_data.onOk && typeof validate_data.onOk == "function") {
			validate_data.onOk(validate_val);
		}
		// 验证提示 定制
		function validate_tips(tag, msg) {
			if (validate_data.onTips && typeof validate_data.onTips == "function") {
				validate_data.onTips(tag, msg);
				return;
			}
			alert(msg);
		}
		// 获取target值
		function get_target_val(val) {
			var val = val;
			if (typeof val.jquery == "string") { // 判断是否是jq
				val = val.val();
			} else if (val.nodeType === 1) { // 判断是否是dom
				val = val.value;
			}
			return val;
		}
		// 空值判断
		function is_null(val) {
			return /^\s*$/.test(val);
		}
		// 非法字符串验证
		function is_illegal(val) {
			return /(<\/?script>|select\s|insert\s|update\s|delete\s|from\s|join\s|where\s|and\s|or\s|\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff])/gi.test(val);
		}
		// 验证中文
		function is_cn(val) {
			return /^[\u4e00-\u9fa5]+$/g.test(val);
		}
		// 验证英文
		function is_en(val) {
			return /^[a-zA-Z]+$/g.test(val);
		}
		// 验证数字
		function is_number(val) {
			return /^(\d)+\.?\d*$/g.test(val);
		}
		// 验证整数
		function is_int(val) {
			return /^\d+$/g.test(val);
		}
		// 验证浮点
		function is_floor(val) {
			return /^\d*\.\d+$/g.test(val);
		}
		// 验证url
		function is_url(val) {
			return /^(ht|f)tp(s?)\:\/\/([0-9a-zA-z.]+)(:[0-9]+)?([/0-9a-zA-Z.]+)?(\?[0-9a-zA-Z&=]+)?(#[0-9-a-zA-Z]+)?$/.test(val);
		}
		// 验证手机号
		function is_phone(val) {
			if (val.indexOf('-') >= 0) {
				return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(val);
			} else {
				return /^1\d{10}$/.test(val);
			}
		}
		// 验证邮箱
		function is_email(val) {
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(val);
		}
		// 长度验证
		function rangelength(val, len) {
			var min, max;
			if (Array.isArray(len) && len.length >= 2) {
				min = len[0];
				max = len[1];
			} else if (is_int(len)) {
				min = 0;
				max = len;
			}
			if (val.length >= min && val.length <= max) {
				return true;
			}
			return false;
		}
	},
	// 接口获取职位列表
	request_job_json: function(){
		var is_request = false;		// 是否使用接口获取
		var name = 'jobjson';
		var session = window.sessionStorage;
		try {
			if (!session || !JSON.parse(session.getItem(name))) {
				is_request = true;
			}
		} catch (error) {
			is_request = true;
		}
		if (is_request) {
			$.get('/cvresume/get_resume_category/', function(data, status){
				if (status === 'success' && data.type === 'success') {
					if (session) {
						session.setItem(name, data.content);
					} else {
						common.info[name] = data.content;
					}
				}
			});
		}
	},
	// 职位列表json
	get_job_json: function(){
		// session和 common.info.jobjson 不存在 json  则使用本地json
		var name = 'jobjson';
		var session = window.sessionStorage;
		var json = [{'name': '职能支持', 'data_url': 'znzc', 'children': [
			{'name': '市场', 'data_url': 'sc', 'children': [
				{'name': '营销推广', 'data_url': 'yingxiaotg'},
				{'name': '品牌公关', 'data_url': 'pinpaigg'},
				{'name': '商务合作', 'data_url': 'shangwuhz'},
				{'name': '销售代表', 'data_url': 'xiaosoudb'},
				{'name': '市场调研', 'data_url': 'diaoyandy'}],
			}, {'name': '财务', 'data_url': 'cw', 'children': [
				{'name': '财务', 'data_url': 'caiwu'},
				{'name': '会计', 'data_url': 'kuaiji'},
				{'name': '审计', 'data_url': 'shenji'},
				{'name': '出纳', 'data_url': 'chuna'},
				{'name': '税务', 'data_url': 'shuiwu'},
				{'name': '统计', 'data_url': 'tongji'},
				{'name': '成本管理', 'data_url': 'chengben'},
				{'name': '资产管理', 'data_url': 'zichan'}],
			}, {'name': '法务', 'data_url': 'fw', 'children': [
				{'name': '法务', 'data_url': 'fawu'},
				{'name': '律师', 'data_url': 'lvshi'},
				{'name': '合规', 'data_url': 'hegui'},
				{'name': '知识产权', 'data_url': 'zhishicq'},
				{'name': '法律顾问', 'data_url': 'falvgw'}],
			}, {'name': '人事', 'data_url': 'rs', 'children': [
				{'name': '人力资源', 'data_url': 'renli'},
				{'name': 'HRBP', 'data_url': 'hrbp'},
				{'name': '猎头', 'data_url': 'lietou'},
				{'name': '薪酬福利', 'data_url': 'xinchou'},
				{'name': '绩效考核', 'data_url': 'jixiao'},
				{'name': '企业文化', 'data_url': 'wenhua'},
				{'name': '招聘', 'data_url': 'zhaopin'},
				{'name': '培训', 'data_url': 'peixun'}],
			}, {'name': '行政', 'data_url': 'xz', 'children': [
				{'name': '行政', 'data_url': 'xingzheng'},
				{'name': '前台', 'data_url': 'qiantai'},
				{'name': '秘书', 'data_url': 'mishu'},
				{'name': '文员', 'data_url': 'wenyuan'},
				{'name': '总助', 'data_url': 'zongzhu'},
				{'name': '总机', 'data_url': 'zongji'}],
			}],
		}, {'name': '互联网通信', 'data_url': 'hlwtx', 'children': [
			{'name': '技术', 'data_url': 'js', 'children': [
				{'name': '前端开发', 'data_url': 'qianduan'},
				{'name': '后端开发', 'data_url': 'houduan'},
				{'name': '移动开发', 'data_url': 'yidong'},
				{'name': '测试', 'data_url': 'ceshi'},
				{'name': '运维', 'data_url': 'yunwei'},
				{'name': 'DBA', 'data_url': 'dba'},
				{'name': '硬件开发', 'data_url': 'yingjian'},
				{'name': '项目管理', 'data_url': 'xiangmugl21'},
				{'name': '网络运输', 'data_url': 'wangluo'}],
			}, {'name': '产品', 'data_url': 'chanpin', 'children': [
				{'name': '产品经理', 'data_url': 'chanpingjl22'},
				{'name': '产品策划', 'data_url': 'chanpinch'},
				{'name': '游戏策划', 'data_url': 'youxich'},
				{'name': '产品助理', 'data_url': 'chanpinzl'}],
			}, {'name': '设计', 'data_url': 'sheji', 'children': [
				{'name': 'UI交互设计', 'data_url': 'ui'},
				{'name': '平面设计', 'data_url': 'pingmiansj'},
				{'name': '网页设计', 'data_url': 'wangyesj'},
				{'name': '动画人物设计', 'data_url': 'donghuarw'},
				{'name': '游戏原画', 'data_url': 'youxiyh'},
				{'name': '游戏场景', 'data_url': 'youxicj'},
				{'name': '游戏特效设计', 'data_url': 'youxitx'}],
			}, {'name': '运营编辑', 'data_url': 'yy', 'children': [
				{'name': '产品运营', 'data_url': 'chanpinyy'},
				{'name': '新媒体运营', 'data_url': 'xinmeitiyy'},
				{'name': '游戏运营', 'data_url': 'youxiyy'},
				{'name': '用户运营', 'data_url': 'yonghuyy'},
				{'name': '活动运营', 'data_url': 'huodongyy'},
				{'name': '社区运营', 'data_url': 'shequyy'},
				{'name': '内容运营', 'data_url': 'neirongyy'},
				{'name': '客服', 'data_url': 'kefu'}],
			}],
		}, {'name': '金融投资', 'data_url': 'jrtz', 'children': [
			{'name': '银行', 'data_url': 'yh', 'children': [
				{'name': '客户经理', 'data_url': 'kehujl31'},
				{'name': '大堂经理', 'data_url': 'datangjl31'},
				{'name': '银行柜员', 'data_url': 'guiyuan'},
				{'name': '支行行长', 'data_url': 'zhihanghz'},
				{'name': '风险控制', 'data_url': 'fengxiankz31'}],
			}, {'name': '证券基金', 'data_url': 'zqjj', 'children': [
				{'name': '交易员', 'data_url': 'jiaoyi'},
				{'name': '投资顾问', 'data_url': 'touzigw'},
				{'name': '客户经理', 'data_url': 'kehujl32'},
				{'name': '基金经理', 'data_url': 'jijinjl'},
				{'name': '证券分析', 'data_url': 'zhengquanfx'},
				{'name': '风险控制', 'data_url': 'fengxiankz32'},
				{'name': '债券发行', 'data_url': 'zhaiquanfx'},
				{'name': '基金会计', 'data_url': 'jijinkj'},
				{'name': '行业研究', 'data_url': 'hangyeyj'}],
			}, {'name': '保险', 'data_url': 'bx', 'children': [
				{'name': '销售代表', 'data_url': 'xiaoshoudb33'},
				{'name': '综合柜员', 'data_url': 'zonghegy'},
				{'name': '培训讲师', 'data_url': 'peixunjs33'},
				{'name': '业务员', 'data_url': 'yewu'},
				{'name': '理财规划', 'data_url': 'licaigh'},
				{'name': '风险控制', 'data_url': 'fengxiankz33'},
				{'name': '产品研发', 'data_url': 'chanpinyf'}],
			}, {'name': '信托期货', 'data_url': 'xtqh', 'children': [
				{'name': '客户经理', 'data_url': 'kehujl34'},
				{'name': '信托经理', 'data_url': 'xintuojl'},
				{'name': '产品经理', 'data_url': 'chanpinjl34'},
				{'name': '资产管理', 'data_url': 'zichangl34'},
				{'name': '资产证券化', 'data_url': 'zichanzqh'},
				{'name': '风险控制', 'data_url': 'fengxiankz34'},
				{'name': '期货经纪人', 'data_url': 'qihuojjr'}],
			}],
		}, {'name': '房地产建筑', 'data_url': 'fdcjz', 'children': [
			{'name': '房地产', 'data_url': 'fdc', 'children': [
				{'name': '投资分析', 'data_url': 'touzifx41'},
				{'name': '项目策划', 'data_url': 'xiangmuch'},
				{'name': '项目管理', 'data_url': 'xiangmugl41'},
				{'name': '项目招投标', 'data_url': 'xiangmuztb'},
				{'name': '资产管理', 'data_url': 'zichangl41'},
				{'name': '合同管理', 'data_url': 'hetonggl'},
				{'name': '房产中介', 'data_url': 'fangchanzj'},
				{'name': '房产经纪人', 'data_url': 'fangchanjjr'}],
			}, {'name': '土建', 'data_url': 'tj', 'children': [
				{'name': '建筑工程师', 'data_url': 'jianzhugc'},
				{'name': '工程造价', 'data_url': 'gongchengzj'},
				{'name': '给排水工程师', 'data_url': 'geipaishui'},
				{'name': '测绘工程师', 'data_url': 'cehuigc42'},
				{'name': '水电工程师', 'data_url': 'shuidian'},
				{'name': '工程监理', 'data_url': 'jianli'},
				{'name': '现场管理', 'data_url': 'xianchang'}],
			}, {'name': '物业', 'data_url': 'wy', 'children': [
				{'name': '物业管理', 'data_url': 'wuyegl'},
				{'name': '设施管理', 'data_url': 'sheshigl'},
				{'name': '物业招商', 'data_url': 'wuyezs'},
				{'name': '客服顾问', 'data_url': 'kefugw'},
				{'name': '物业维修', 'data_url': 'wuyewx'},
				{'name': '机电维修', 'data_url': 'jidianwx'},
				{'name': '保洁', 'data_url': 'baojie'},
				{'name': '绿化', 'data_url': 'lvhua'},
				{'name': '保安', 'data_url': 'baoan'}],
			}, {'name': '设计', 'data_url': 'sj4', 'children': [
				{'name': '室内设计', 'data_url': 'shineisj'},
				{'name': '景观设计', 'data_url': 'jingguansj'},
				{'name': '结构设计', 'data_url': 'jiegousj'},
				{'name': '软装设计', 'data_url': 'ruanzhuang'},
				{'name': '硬装设计', 'data_url': 'yingzhuang'},
				{'name': '幕墙设计', 'data_url': 'muqiang'},
				{'name': '城市规划', 'data_url': 'chengshigh'}],
			}, {'name': '家装', 'data_url': 'jz', 'children': [
				{'name': '工长', 'data_url': 'gongzhang'},
				{'name': '木工', 'data_url': 'mugong'},
				{'name': '泥瓦工', 'data_url': 'niwa'},
				{'name': '油漆工', 'data_url': 'youqi'},
				{'name': '水电工', 'data_url': 'shuidiang'},
				{'name': '安装施工', 'data_url': 'anzhang'}],
			}],
		}, {'name': '休闲服务', 'data_url': 'xxfw', 'children': [
			{'name': '旅游', 'data_url': 'ly', 'children': [
				{'name': '导游', 'data_url': 'daoyou'},
				{'name': '旅游顾问', 'data_url': 'lvyougw'},
				{'name': '线路策划', 'data_url': 'xianluch'},
				{'name': '计调', 'data_url': 'jidiao'},
				{'name': '领队', 'data_url': 'lingdui'},
				{'name': '票务', 'data_url': 'piaowu'},
				{'name': '会展策划', 'data_url': 'huizhan'}],
			}, {'name': '酒店', 'data_url': 'jd', 'children': [
				{'name': '大堂经理', 'data_url': 'datangjl5'},
				{'name': '礼宾', 'data_url': 'libin'},
				{'name': '总机', 'data_url': 'zongji5'},
				{'name': '商务中心', 'data_url': 'shangwuzx'},
				{'name': '行李员', 'data_url': 'xingli'},
				{'name': '客房服务', 'data_url': 'kefangfw'},
				{'name': '餐厅服务', 'data_url': 'cantingfw'},
				{'name': '厨师', 'data_url': 'chushi'}],
			}, {'name': '餐饮', 'data_url': 'cy', 'children': [
				{'name': '西餐厨师', 'data_url': 'xican'},
				{'name': '中餐厨师', 'data_url': 'zhongcan'},
				{'name': '面点师', 'data_url': 'miandian'},
				{'name': '调酒师', 'data_url': 'tiaojiu'},
				{'name': '咖啡师', 'data_url': 'kafei'},
				{'name': '服务员', 'data_url': 'fuwu'},
				{'name': '传菜员', 'data_url': 'chuancai'}],
			}, {'name': '美容', 'data_url': 'mr', 'children': [
				{'name': '美容师', 'data_url': 'meirong'},
				{'name': '发型师', 'data_url': 'faxing'},
				{'name': '美甲师', 'data_url': 'meijia'},
				{'name': '化妆师', 'data_url': 'huazhuang'},
				{'name': '美体师', 'data_url': 'meiti'},
				{'name': '美发培训', 'data_url': 'meifapx'},
				{'name': '美容整形', 'data_url': 'meirongzx'}],
			}, {'name': '体育保健', 'data_url': 'tybj', 'children': [
				{'name': '健身教练', 'data_url': 'jianshenjl'},
				{'name': '健身顾问', 'data_url': 'jianshengw'},
				{'name': '按摩师', 'data_url': 'anmo'},
				{'name': '足疗师', 'data_url': 'zuliao'},
				{'name': '体育教练', 'data_url': 'tiyujl'},
				{'name': '赛事策划', 'data_url': 'saishich'},
				{'name': '体育馆管理', 'data_url': 'tiyuguan'},
				{'name': '运动员', 'data_url': 'yundong'}],
			}, {'name': '生活', 'data_url': 'sh', 'children': [
				{'name': '家政', 'data_url': 'jiazheng'},
				{'name': '保姆', 'data_url': 'baomu'},
				{'name': '月嫂', 'data_url': 'yuesao'},
				{'name': '钟点工', 'data_url': 'zhongdian'},
				{'name': '家电维修', 'data_url': 'jiadianwx'},
				{'name': '婚礼策划', 'data_url': 'hunlich'},
				{'name': '宠物美容', 'data_url': 'chongwumr'},
				{'name': '摄影师', 'data_url': 'sheying'}],
			}],
		}, {'name': '教育培训', 'data_url': 'jypx', 'children': [
			{'name': '教育', 'data_url': 'jy', 'children': [
				{'name': '舞蹈老师', 'data_url': 'wudaols'},
				{'name': '英语老师', 'data_url': 'yingyuls'},
				{'name': '音乐老师', 'data_url': 'yinyuels'},
				{'name': '语文老师', 'data_url': 'yuwenls'},
				{'name': '化学老师', 'data_url': 'huaxuels'},
				{'name': '数学老师', 'data_url': 'shuxuels'},
				{'name': '物理老师', 'data_url': 'wulils'},
				{'name': '政治老师', 'data_url': 'zhengzhils'},
				{'name': '历史老师', 'data_url': 'lishils'},
				{'name': '幼师', 'data_url': 'youshi'},
				{'name': '家教', 'data_url': 'jiajiao'}],
			}, {'name': '培训', 'data_url': 'px', 'children': [
				{'name': '培训讲师', 'data_url': 'peixunjs'},
				{'name': '教务助理', 'data_url': 'jiaowuzl'},
				{'name': '课程顾问', 'data_url': 'kechenggw'},
				{'name': '课程设计', 'data_url': 'kechengsj'}],
			}, {'name': '咨询', 'data_url': 'zx', 'children': [
				{'name': '法律咨询', 'data_url': 'falvzx'},
				{'name': '翻译咨询', 'data_url': 'fanyi'},
				{'name': '心理咨询', 'data_url': 'xinlizx'},
				{'name': '财务咨询', 'data_url': 'caiwuzx'},
				{'name': '调研员', 'data_url': 'diaoyan'}],
			}],
		}, {'name': '广告传媒', 'data_url': 'ggcm', 'children': [
			{'name': '广告', 'data_url': 'gg', 'children': [
				{'name': '广告销售', 'data_url': 'guanggaoxs'},
				{'name': '广告优化', 'data_url': 'guanggaoyh'},
				{'name': '广告设计', 'data_url': 'guanggaosj'},
				{'name': '文案策划', 'data_url': 'wenanch'},
				{'name': '广告执行', 'data_url': 'guanggaozx'}],
			}, {'name': '影视', 'data_url': 'ys1', 'children': [
				{'name': '导演', 'data_url': 'daoyan'},
				{'name': '编导', 'data_url': 'biandao'},
				{'name': '导演助理', 'data_url': 'daoyanzl'},
				{'name': '影视制作', 'data_url': 'yingshizz'},
				{'name': '艺术指导', 'data_url': 'yishuzd'},
				{'name': '摄像师', 'data_url': 'shexiang'},
				{'name': '后期制作', 'data_url': 'houqizz'},
				{'name': '音效师', 'data_url': 'yinxiao'},
				{'name': '配音员', 'data_url': 'peiyin'},
				{'name': '灯光师', 'data_url': 'dengguang'}],
			}, {'name': '媒体', 'data_url': 'mt', 'children': [
				{'name': '主编', 'data_url': 'zhubian'},
				{'name': '编辑', 'data_url': 'bianji'},
				{'name': '记者', 'data_url': 'jizhe'},
				{'name': '美术编辑', 'data_url': 'meishubj'},
				{'name': '排版设计', 'data_url': 'paiban'},
				{'name': '出版', 'data_url': 'chuban'}],
			}, {'name': '娱乐', 'data_url': 'yule', 'children': [
				{'name': '经纪人', 'data_url': 'jingjiren'},
				{'name': '练习生', 'data_url': 'lianxi'},
				{'name': '主持人', 'data_url': 'zhuchi'},
				{'name': '模特', 'data_url': 'mote'},
				{'name': '演员', 'data_url': 'yanyuan'},
				{'name': '歌手', 'data_url': 'geshou'}],
			}],
		}, {'name': '医疗制药', 'data_url': 'ylzy', 'children': [
			{'name': '医疗服务', 'data_url': 'ylfw', 'children': [
				{'name': '外科医生', 'data_url': 'waike'},
				{'name': '内科医生', 'data_url': 'neike'},
				{'name': '放射科医生', 'data_url': 'fangshe'},
				{'name': '麻醉医生', 'data_url': 'mazui'},
				{'name': '护士', 'data_url': 'hushi'},
				{'name': '理疗师', 'data_url': 'liliao'},
				{'name': '中医', 'data_url': 'zhongyi'},
				{'name': '心理医生', 'data_url': 'xinliys'},
				{'name': '检验师', 'data_url': 'jianyan'},
				{'name': '药剂师', 'data_url': 'yaoji'},
				{'name': '兽医', 'data_url': 'shouyi'}],
			}, {'name': '医疗器械', 'data_url': 'yiliaoqx', 'children': [
				{'name': '器械销售', 'data_url': 'qixiexs'},
				{'name': '质量管理', 'data_url': 'zhilianggl'},
				{'name': '器械采购', 'data_url': 'qixiecg'},
				{'name': '器械研发', 'data_url': 'qixieyf'},
				{'name': '供应链', 'data_url': 'gongyingl82'},
				{'name': '器械维修', 'data_url': 'qixiewx'}],
			}, {'name': '制药', 'data_url': 'zhiyao', 'children': [
				{'name': '药品研发', 'data_url': 'yaopinyf'},
				{'name': '化学分析', 'data_url': 'huaxuefx'},
				{'name': '药品注册', 'data_url': 'yaopinzc'},
				{'name': '产品经理', 'data_url': 'chanpjl83'},
				{'name': '医药代表', 'data_url': 'yiyaodb'},
				{'name': '医药招商', 'data_url': 'yiyaozs'}],
			}],
		}, {'name': '消费运输', 'data_url': 'xfys', 'children': [
			{'name': '消费品', 'data_url': 'xfp', 'children': [
				{'name': '研发', 'data_url': 'yanfa'},
				{'name': '产品', 'data_url': 'chanpin9'},
				{'name': '生产', 'data_url': 'shengchan'},
				{'name': '品牌', 'data_url': 'pinpai'},
				{'name': '采购', 'data_url': 'caigou'},
				{'name': '供应链', 'data_url': 'gongyingl91'},
				{'name': '质检', 'data_url': 'zhijian'}],
			}, {'name': '贸易', 'data_url': 'my', 'children': [
				{'name': '跟单', 'data_url': 'gendan'},
				{'name': '买手', 'data_url': 'maishou'},
				{'name': '采购', 'data_url': 'caigou92'}],
			}, {'name': '交通运输', 'data_url': 'ys2', 'children': [
				{'name': '铁路乘务员', 'data_url': 'tielucwy'},
				{'name': '列车长', 'data_url': 'lieche'},
				{'name': '公交司机', 'data_url': 'gongjiao'},
				{'name': '的士司机', 'data_url': 'dishi'},
				{'name': '飞行员', 'data_url': 'feixing'},
				{'name': '空乘', 'data_url': 'kongcheng'},
				{'name': '地勤', 'data_url': 'diqin'},
				{'name': '船长', 'data_url': 'chuanzhang'},
				{'name': '水手', 'data_url': 'shuishou'},
				{'name': '安检', 'data_url': 'anjian'},
				{'name': '调度员', 'data_url': 'diaodu'},
				{'name': '海关事务', 'data_url': 'haiguan'}],
			}, {'name': '物流仓储', 'data_url': 'wl', 'children': [
				{'name': '快递', 'data_url': 'kuaidi'},
				{'name': '邮递', 'data_url': 'youdi'},
				{'name': '理货', 'data_url': 'lihuo'},
				{'name': '仓库管理', 'data_url': 'cangkugl'},
				{'name': '订单处理', 'data_url': 'dingdan'},
				{'name': '集装箱业务', 'data_url': 'jizhuangx'},
				{'name': '物流管理', 'data_url': 'wuliugl'},
				{'name': '货运代理', 'data_url': 'huoyundl'}],
			}],
		}, {'name': '制造能源', 'data_url': 'zhizaony', 'children': [
			{'name': '汽车制造', 'data_url': 'qczz', 'children': [
				{'name': '机械设计', 'data_url': 'jixiesj'},
				{'name': '动力系统工程师', 'data_url': 'donglixt'},
				{'name': '底盘工程师', 'data_url': 'dipan'},
				{'name': '总装工艺工程师', 'data_url': 'zongzhuangy'},
				{'name': '项目管理', 'data_url': 'xiangmugl101'},
				{'name': '二手车评估师', 'data_url': 'qichepg'},
				{'name': '汽车销售', 'data_url': 'qichexs'},
				{'name': '汽车美容', 'data_url': 'qichemr'}],
			}, {'name': '机械制造', 'data_url': 'jxzz', 'children': [
				{'name': '机械工程师', 'data_url': 'jixiegc'},
				{'name': '自动化工程师', 'data_url': 'zidonghua'},
				{'name': '机电工程师', 'data_url': 'jidiangc'},
				{'name': '结构工程师', 'data_url': 'jiegougc'},
				{'name': '焊接工艺工程师', 'data_url': 'hanjiegy'},
				{'name': '液压工程师', 'data_url': 'yeyagc'},
				{'name': '模具设计工程', 'data_url': 'mujusj'}],
			}, {'name': '能源', 'data_url': 'ny', 'children': [
				{'name': '燃气技术', 'data_url': 'ranqijs'},
				{'name': '热能工程师', 'data_url': 'renenggc'},
				{'name': '电力工程师', 'data_url': 'dianligc'},
				{'name': '管道设计', 'data_url': 'guandaosj'},
				{'name': '自控工程师', 'data_url': 'zikonggc'},
				{'name': '水利工程师', 'data_url': 'shuiligc'},
				{'name': '测绘工程师', 'data_url': 'cehuigc103'},
				{'name': '地质工程师', 'data_url': 'dizhigc'},
				{'name': '钻井工程师', 'data_url': 'zuanjing'},
				{'name': '地质勘查', 'data_url': 'dizhikc'},
				{'name': '采矿', 'data_url': 'caikuang'}],
			}, {'name': '化工', 'data_url': 'hg', 'children': [
				{'name': '材料工程师', 'data_url': 'cailiao'},
				{'name': '配方工程师', 'data_url': 'peifang'},
				{'name': '工艺工程师', 'data_url': 'gongyi'}],
			}],
		}, {'name': '公共事业', 'data_url': 'ggsy', 'children': [
			{'name': '公务事业', 'data_url': 'gwsy', 'children': [
				{'name': '警察', 'data_url': 'jingcha'},
				{'name': '公务员', 'data_url': 'gongwu'},
				{'name': '事业单位人员', 'data_url': 'shiyedw'},
				{'name': '国企员工', 'data_url': 'guoqi'}],
			},{'name':'学术科研', 'data_url': 'xsky', 'children': [
				{'name': '大学教授', 'data_url': 'jiaoshou'},
				{'name': '研究员', 'data_url': 'yanjiu'}],
			},{'name':'非盈利组织', 'data_url':'fylzz', 'children': [
				{'name': '义工', 'data_url': 'yigong'},
				{'name': '志愿者', 'data_url': 'zhiyuanz'},
				{'name': '支教老师', 'data_url': 'zhijiao'}]
			},{ 'name': '农林牧渔', 'data_url': 'nlmy', 'children': [
				{'name': '饲养员', 'data_url': 'siyang'},
				{'name': '农艺师', 'data_url': 'nongyi'},
				{'name': '畜牧师', 'data_url': 'xumu'},
				{'name': '护林员', 'data_url': 'hulin'},
				{'name': '园艺师', 'data_url': 'yuanyi'},
				{'name': '动物养殖', 'data_url': 'dongwuyz'},
				{'name': '饲料研发', 'data_url': 'siliaoyf'}],
			}],
		}];
		json = JSON.stringify(json);
		// common.info中存在json
		try {
			if (!!JSON.parse(common.info[name])) {
				json = common.info[name];
			}
		} catch (error) {
		}
		// // session中存在json
		try {
			if (!!session && !!JSON.parse(session.getItem(name))) {
				json = session.getItem(name);
			}
		} catch (error) {
		}
		return json;
	},
	position2angle: function(x, y){
		// 返回相对中心点的弧度 r 角度
		var angle = Math.round(Math.atan2(x, y) * 180 / Math.PI);
		if (angle < 0) angle = 360 + angle;
		return angle;
	},
	// 限制输入方法 包含 contenteditable 、 input
	limit_input_length: function(selector, length, callback_obj){
		var callback = {
			focus: null,
			keyup: null,
			input: null,
			blur: null,
		};
		$.extend(callback, callback_obj);
		if (isNaN(length)) {
			return console.error('length not is number');
		}
		$(document).on('focus', selector, function(e){
			if (callback.focus && typeof callback.focus === 'function') callback.focus(e);
		});
		$(document).on('keyup', selector, function(e){
			if (callback.keyup && typeof callback.keyup === 'function') callback.keyup(e);
		});
		$(document).on('blur', selector, function(e){
			if (callback.blur && typeof callback.blur === 'function') callback.blur(e);
		});
		if ($(selector).is('input') || $(selector).is('textarea')) {
			$(selector).attr('maxLength', length);
			$(document).on('input', selector, function(e){
				if (callback.input && typeof callback.input === 'function') callback.input(e);
			});
		} else if ($(selector).is('[contenteditable]')) {
			// keypress ie 和 chrome都兼容，这里就不使用input事件了
			$(document).on('paste keypress', selector, function(e){
				var word = $(this).text();
				// 粘贴内容处理
				if (e.type === 'paste') {
					e.preventDefault();
					let ie = !!(window.ActiveXObject || "ActiveXObject" in window);
					var _text = ie ? window.clipboardData.getData("text") : e.originalEvent.clipboardData.getData("text");
					// 超出截取
					var whole = _text;			// 完整的文本
					var overflow = word.length + _text.length - length;
					if (overflow > 0) {
						_text = _text.substring(0, _text.length - overflow);
					}
					if (!ie) {
						// 保留超链接格式
						if (/^(ht|f)tp(s?)\:\/\/([0-9a-zA-z.]+)(:[0-9]+)?([/0-9a-zA-Z.]+)?(\?[0-9a-zA-Z&=]+)?(#[0-9-a-zA-Z]+)?$/.test(_text)) {
							_text = '<a href="'+ whole +'" target="_blank">'+ _text +'</a>';
						}
						document.execCommand('insertHTML', false, _text);
					} else {
						document.execCommand('insertText', false, _text);
					}
				}
				if (callback.input && typeof callback.input === 'function') callback.input(e);
				if (word.length >= length) {
					layer.msg("你输入的字数不能超过" + length);
					e.preventDefault();
					return false;
				}
			});
			// 中文输入状态下
			var composition_html = '', composition_text = '';
			$(document).on('compositionstart compositionend', selector, function(e){
				if (callback.input && typeof callback.input === 'function') callback.input(e);
				if (e.type === 'compositionstart') {
					composition_html = $(this).html();
					composition_text = $(this).text();
				} else {
					if (composition_text.length + e.originalEvent.data.length > length) {
						$(this).html(composition_html);
						$(this).placeCaretAtEnd();
						composition_html = '';
						composition_text = '';
						layer.msg("你输入的字数不能超过" + length);
						return false;
					}
				}
			});
		}
	},
	// 广告位操作
	advert_operation: function () {
		// 关闭广告
		$(".live_ad .close").on("click", function(){
			$('.live_ad').fadeOut();
		});
	},
	// 前端生成静态广告位
	static_render_advert: function (options) {
		var opt = {
			title: '',				// 广告标题
			url: '',				// 广告链接
			image: '',				// 广告图片
			showPath: [],			// 定义显示广告位的页面
		};
		opt = $.extend(opt, options);
		var html = '<div class="advert_fixed_container">'+
						'<i class="close"></i>'+
						'<a href="'+ opt.url +'" title="'+ opt.title +'" target="_blank" class="link"><image src="'+ opt.image +'" /></a>';
					'</div>';
		// 异步执行渲染
		setTimeout(function(){
			var path = window.location.pathname;
			if (opt.showPath.length > 0) {
				if (opt.showPath.indexOf(path) >= 0) {
					$('body').append($(html));
				}
			} else {
				$('body').append($(html));
			}
			$('.advert_fixed_container .close').on('click', function(){
				$(this).parent().hide();
			});
		}, 1);
	},
	// 异步加载彩色图标 iconfont.js 
	iconfont_async_load: function ($html) {
		var $resume = $html || $('#resume_base');
		var $icon = $resume.find('a.wbdfont svg');
		var url = wbdcnf.base + '/resources/500d/editresume/fonts/iconfont.js';
		if ($icon.length > 0) {
			if ($('script[src="'+ url +'"]').length > 0) {
				return;
			}
			// 使用jQuery将默认调用jQuery.getScript 方法，无法缓存文件
			var $script = document.createElement('script');
			$script.type = 'text/javascript';
			$script.src = url;
			document.querySelector('head').appendChild($script);
		}
	},
	rgb2hex: function (color) {
		var rgb = color.split(',');
		var r = parseInt(rgb[0].split('(')[1]);
		var g = parseInt(rgb[1]);
		var b = parseInt(rgb[2].split(')')[0]);
		var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		return hex;
	},
	save_member_log: function (type,resumeId) {
		$.ajax({
			type:"post",
			dataType:"json",
			url:"/cvresume/save_member_log/",
			data:{
				type:type,
				resumeId:resumeId
			},
			success:function(data){
				if(data.type != "success"){
					console.log(data)
				}
			}
		})
	},
	/**
	 * @desc 函数防抖
	 * @param func 函数
	 * @param wait 延迟执行毫秒数
	 * @param immediate true 表立即执行，false 表非立即执行
	 */
	debounce: function (func, wait, immediate) {
		var timeout;
		return function () {
			var context = this;
			var args = arguments;
			if (timeout) clearTimeout(timeout);
			if (immediate) {
				var callNow = !timeout;
				timeout = setTimeout(function () {
					timeout = null;
				}, wait)
				if (callNow) func.apply(context, args)
			}
			else {
				timeout = setTimeout(function(){
					func.apply(context, args)
				}, wait);
			}
		}
	},
	/**
	 * @desc 函数节流
	 * @param func 函数
	 * @param wait 延迟执行毫秒数
	 * @param type true 表时间戳版，false 表定时器版
	 */
	throttle: function(func, wait, type) {
		var previous = 0;
		var timeout;
		return function() {
			var context = this;
			var args = arguments;
			if (type) {
				var now = Date.now();
				if (now - previous > wait) {
					func.apply(context, args);
					previous = now;
				}
			} else {
				if (!timeout) {
					timeout = setTimeout(function () {
						timeout = null;
						func.apply(context, args)
					}, wait)
				}
			}
		}
	},
	// 通用简历搜索方法  关联500d/common/search.ftl
	resume_search_operation: function () {
		// 方法已运行
		if (common.info.run_resume_search_operation) {
			return;
		}
		common.info.run_resume_search_operation = true;
		var contain = '.resume-search-container';
		var close = function ($this) {
			return $this.removeClass('open-results');
		}
		// 关闭搜索
		$(contain).find('.close-search').on('click', function () {
			var $contain = $(this).parents(contain);
			close($contain).find('.result-list').html('');
			$contain.find('.search-input input').val('');
		});
		$(document).on('click', function (event) {
			var $target = $(event.target);
			if (!$target.closest(contain).length) {
				close($(contain));
			}
		});
		// 热门搜索
		$(contain).find('.result-hot li > a').on('click', function () {
			close($(this).parents(contain));
			common.main.open_create_resume_panel({
				id: $(this).attr('data-id'),
				type: $(this).attr('data-type'),
			});
		});
		// 展开搜索框
		$(contain).find('.search-input input').on('focus', function () {
			$(this).parents(contain).addClass('open-results');
		}).on('input', function () {
			var $contain = $(this).parents(contain);
			if (!$contain.hasClass('open-results')) {
				return;
			}
			var $result = $contain.find('.result-list');
			var content = $(this).val();
			if (!content) {
				$result.html('');
				return;
			}
			$.get('/cvresume/search/', {
				keyWord: content,
			}, function (res) {
				if (res.type !== 'success') {
					$result.html('');
					return;
				}
				// 搜索结果
				var result = '';
				var data = res.data;
				if (data.length) {
					data.forEach(function (item) {
						result += '<li><a href="javascript:;" data-id="'+ item.id +'" data-type="'+ item.type +'">'+ item.name +'</a></li>';
					});
				} else {
					result = '<div class="not-result"><i class="icon"></i><span>抱歉~没有找到您想要的结果...</span></div>';
				}
				$result.html(result).find('li > a').on('click', function () {
					close($(this).parents(contain));
					common.main.open_create_resume_panel({
						id: $(this).attr('data-id'),
						type: $(this).attr('data-type'),
					});
				});
			});
		});
		// 搜索按钮
		$(contain).find('.search-btn').on('click', function () {
			common.main.open_create_resume_panel();
		});
	},
	// 通用简历分类列表操作方法  关联500d/template_center/resume_classify.ftl
	resume_classify_operation: function (opt) {
		var option = {
			lv1_click: null,
			lv2_click: null,
			lv3_click: null,
			lv4_click: null,
		};
		option = $.extend(option, opt);
		var $contain = $('.resume-classify-container');
		// 用于固定页面位置
		var scroll_top = null;
		$(window).on('scroll', function () {
			if (scroll_top) {
				$(window).scrollTop(scroll_top);
			}
		});
		// 院校排序调整
		$contain.find('.resume-classify-lv1').eq(1).after($contain.find('.resume-classify-lv1[data-name="院校"]'));
		/**
		 * 一级分类
		 */
		$contain.find('.lv1-head').on('click', function (event) {
			var $this = $(this);
			var id = $this.attr('data-id');
			var $lv1 = $this.parents('.resume-classify-lv1');
			if ($lv1.find('.lv1-next-level').is(':visible') && !event.isTrigger) {
				$lv1.find('.lv1-next-level').slideUp(100);
			} else {
				$lv1.addClass('checked').find('.lv1-next-level').slideDown(100, function () {
					$(this).css('overflow', 'visible');
				});
				$lv1.siblings().removeClass('checked').find('.lv1-next-level').slideUp(100);
				$contain.find('.resume-classify-lv2').removeClass('checked');
				if (typeof option.lv1_click === 'function') {
					option.lv1_click({
						id: id,
						name: $this.find('.name').text(),
						class: $lv1.attr('data-name'),
					}, event);
				}
			}
		});
		/**
		 * 二级分类
		 */
		$contain.find('.lv2-head').on('click', function (event) {
			var $this = $(this);
			var id = $this.attr('data-id');
			var parent_name = $this.parents('div.resume-classify-lv1').attr('data-name');
			if (!id && parent_name != '设备') {
				return;
			}
			var $lv1 = $this.parents('.resume-classify-lv1');
			var $lv2 = $this.parents('.resume-classify-lv2');
			if ($lv2.hasClass('checked')) {
				return;
			}
			$lv2.addClass('checked').siblings().removeClass('checked');
			if (typeof option.lv2_click === 'function') {
				option.lv2_click({
					id: id,
					name: $this.find('.name').text(),
					class: $lv1.attr('data-name'),
				}, event);
			}
		});
		// 二级分类鼠标移入显示三级、四级分类
		$contain.find('.resume-classify-lv2').on('mouseenter', function () {
			var $this = $(this);
			var $lv2 = $this.find('.lv2-next-level');
			// 当前下级分类展开状态不触发折叠
			if ($lv2.is(':visible')) {
				return;
			}
			$lv2.show();
			// 4级分类折叠
			var fold_height = 48;
			$this.find('.lv3-next-level').each(function (index, element) {
				var $lv3 = $(element);
				var $lv4 = $lv3.find('.resume-classify-lv4');
				var haslv4 = $lv3.siblings('.lv3-head').length;
				if (haslv4 && $lv4.length) {
					if ($lv4.last()[0].offsetTop > fold_height) {
						$lv3.addClass('fold');
						// 添加更多按钮
						if (!$lv3.find('.more').length) {
							var $more = $('<div class="more">更多</div>');
							$more.on('click', function () {
								var lv2_height = $lv2.height();
								// 异常当前分类下更多按钮并打开其他分类下更多按钮
								$(this).parents('.fold').removeClass('fold');
								$lv3.parents('.resume-classify-lv3').siblings('.resume-classify-lv3').find('.lv3-next-level').addClass('fold');
								if ($lv2.height() < lv2_height) {
									$lv3.parents('.resume-classify-lv2-panel').height(400);
								}
							});
							$lv3.append($more);
						}
					}
				}
			});
			// 向下溢出处理
			if ($lv2[0]) {
				var overflow = $lv2[0].getBoundingClientRect().bottom - $(window).height();
				$lv2.css('top', overflow > 0 ? -overflow : 0);
			}
		}).on('mouseleave', function () {
			scroll_top = null;
			$(this).find('.lv2-next-level, .resume-classify-lv2-panel').removeAttr('style');
		});
		// 二级分类下的分类面板滚动时，window禁止滚动
		$contain.find('.resume-classify-lv2-panel').on('scroll', function () {
			scroll_top = $(window).scrollTop();
		});
		/**
		 * 三、四级分类
		 */
		$contain.find('.resume-classify-lv4').on('click', function (event) {
			var $this = $(this);
			var id = $this.attr('data-id');
			var $lv1 = $this.parents('.resume-classify-lv1');
			var $lv2 = $this.parents('.resume-classify-lv2');
			$lv2.addClass('checked').siblings().removeClass('checked');
			$this.parents('.lv2-next-level').fadeOut();
			if (typeof option.lv4_click === 'function') {
				option.lv4_click({
					id: id,
					name: $this.text(),
					class: $lv1.attr('data-name'),
				}, event);
			}
		});
		// 校招三级分类面板 自定义学校按钮
		$contain.find('.custom-link').on('click', function () {
			$(this).parents('.lv2-next-level').fadeOut();
			common.main.open_create_resume_panel({
				type: 'university',
				custom: true,
			});
		});
	},
	// 通用 模板中心 - 简历模板列表  关联500d/template_center/resume_template_list.ftl
	resume_template_center_list: function ($contain, opt) {
		var option = {
			resume: 'content',		// content（内容模板） / university（校招模板）
			id: null,				// 分类id
			type: '',				// resume = university： universityArea（地区） /  university（学校）
			school: {},				// 校招模板专有属性，school.logo , school.background
			sort: 'usenum',			// createDate（最新） / usenum（热门）
			size: 10,
			concat: true,
			complete: null,
			before: null,
		};
		option = $.extend(option, opt);
		// 数据获取
		var page_number = 1;
		var get_data = function () {
			if (!$contain || !$contain.jquery) {
				return;
			}
			var url;
			var params = {};
			// 内容模板
			if (option.resume === 'content') {
				url = '/cvresume/resume_template_list/';
				params = {
					resumeCategoryId: option.id,
					sort: option.sort,
					pageNumber: page_number,
					pageSize: option.size,
					searchType:option.searchType
				};
			}
			// 校招模板
			if (option.resume === 'university') {
				url = '/cvresume/school_template_list/';
				params = {
					id: option.id,
					type: option.type,
					sort: option.sort,
					pageNumber: page_number,
					pageSize: option.size,
				};
			}
			// 在线模板
			if (option.resume === 'resumeItem') {
				url = '/cvresume/resume_bank_item_list/';
				params = {
					id: option.id,
					resumeBankType: option.type,
					sort: option.sort,
					pageNumber: page_number,
					pageSize: option.size,
					category: option.category
				};
			}
			if (!url) {
				return;
			}
			if (typeof option.before === 'function') option.before();
			$.get(url, params, function (res) {
				res = res.replace(/(^\s+|\s+$)/g, '');
				// 渲染节点
				var $html = $('<div></div>');
				$html.html(res);
				// 校招模板 logo、background 设置
				if (option.resume === 'university') {
					if (option.school.logo) {
						$html.find('img.school-logo').attr('src', option.school.logo);
					}
					if (option.school.background) {
						$html.find('img.school-background').attr('src', option.school.background);
					}
				}
				// 添加操作事件
				common.main.__resume_template_list_operation($html);
				// 立即免费制作
				if (option.concat) {
					$contain.append($html.children('.template-common-cards'));
				} else {
					$contain.html('').append($html.children());
				}
				if (typeof option.complete === 'function') option.complete(JSON.parse(JSON.stringify(option)), res);
				
				//当前在模板中心, 更新浏览器地址
				var pathname = location.pathname;
				if(pathname.indexOf('cvresume') != -1){
					if(url.indexOf('resume_bank_item') != -1){
						//在线模板
						var id = common.main.is_empty(params.id) ? 0 : params.id;
						history.pushState(null,'','/cvresume/resume_bank_item/'+params.resumeBankType+'/'+id+'/');
					}else if(url.indexOf('resume_template') != -1){
						//内容模板
						var dataurl = $('.template-container .resume-classify-lv1.checked').attr('data-url');
						history.pushState(null,'','/cvresume/resume_template/'+dataurl+'/'+params.resumeCategoryId+'/');
					}else if(url.indexOf('school_template') != -1){
						//校招模板
						var id = common.main.is_empty(params.id) ? 0 : params.id;
						history.pushState(null,'','/cvresume/school_template/'+params.type+'/'+id+'/');
					}
				}
			});
		}
		get_data();
		// 提供 上一页 下一页 方法
		return {
			next: function () {
				page_number++;
				get_data();
			},
			prev: function () {
				page_number--;
				if (page_number < 1) {
					return;
				}
				get_data();
			},
			to: function (n) {
				if (isNaN(n)) {
					return;
				}
				page_number = n;
				get_data();
			},
		}
	},
	// 模板中心 - 简历模板列表 操作
	__resume_template_list_operation: function ($html) {
		var likeStorage = {};
		if (window.localStorage && window.localStorage.getItem('likeStorage')) {
			try {
				likeStorage = JSON.parse(window.localStorage.getItem('likeStorage'));
			} catch (error) {}
		}
		// 模板点赞
		var likeup = function (id, type, success) {
			if (!id) {
				return;
			}
			if (type === 'content') {
				$.post('/cvresume/add_likes/', {
					resumeContentId: id,
				}, function (res) {
					if (res.type === 'success') {
						if (typeof success === 'function') success();
					}
				});
			}
			if (type === 'school' || type === 'resumeItem') {
				$.post('/cvresume/resume_bank_add_likes/', {
					resumeBankId: id,
				}, function (res) {
					if (res.type === 'success') {
						if (typeof success === 'function') success();
					}
				});
			}
		}
		// 点赞状态
		$html.find('.template-common-cards').each(function (index, element) {
			var $card = $(element);
			var id = $card.attr('data-id');
			var type = $card.attr('data-template');
			for (var key in likeStorage) {
				var value = likeStorage[key];
				if (key == id && value && value === type) {
					$card.find('.template-like-btn').addClass('active');
					$card.find('.template-like').addClass('active');
					break;
				}
			}
		});
		// 点赞功能
		$html.find('.template-like-btn .normal').on('click', function (event) {
			event.stopPropagation();
			var $this = $(this);
			var $btn = $this.parents('.template-like-btn');
			var $card = $this.parents('.template-common-cards');
			if ($btn.hasClass('disabled')) {
				return;
			}
			$btn.addClass('disabled');
			likeup($card.attr('data-id'), $card.attr('data-template'), function () {
				if (window.localStorage) {
					likeStorage[$card.attr('data-id')] = $card.attr('data-template');
					window.localStorage.setItem('likeStorage', JSON.stringify(likeStorage));
				}
				$btn.removeClass('disabled').addClass('active');
				var $like = $card.find('.template-like');
				var num = Number($like.find('.total').attr('data-like')) + 1;
				$like.addClass('active');
				if (num > 1000) {
					num = (num / 1000).toFixed(1) + 'K';
				}
				$like.find('.total').text(num);
			});
		});
		$html.find('.template-like-btn .active').on('click', function (event) {
			event.stopPropagation();
			var $this = $(this);
			var $card = $this.parents('.template-common-cards');
			$this.parents('.template-like-btn').removeClass('active');
			$card.find('.template-like').removeClass('active');
			if (window.localStorage) {
				delete likeStorage[$card.attr('data-id')];
				window.localStorage.setItem('likeStorage', JSON.stringify(likeStorage));
			}
		});
		// 放大功能
		$html.find('.enlarge-btn').on('click', function (event) {
			event.stopPropagation();
			var $card = $(this).parents('.template-common-cards').clone();
			$card.removeClass('hover');
			$card.find('.enlarge-btn, .template-common-info').remove();
			var enlarge_html = '<div class="template-common-enlarge"><div class="enlarge-container"><a href="javascript:;" class="enlarge-close"></a>'+ $card.prop('outerHTML') +'</div></div>';
			var $enlarge = $(enlarge_html);
			$('body').addClass('open').append($enlarge);
			$card = $enlarge.find('.template-common-cards');
			$enlarge.fadeIn();
			// 关闭
			var close = function () {
				$enlarge.fadeOut(function () {
					$enlarge.remove();
					$('body').removeClass('open');
					$(window).off('resize', resize);
				});
			}
			// resize 自适应
			var resize = function () {
				$card.css('width', $enlarge.height() / $card.height() * 0.9 * $card.width());
			}
			$(window).on('resize', resize);
			resize();
			// 关闭
			$enlarge.on('click', function (event) {
				event.target === this && close();
			});
			$enlarge.find('.enlarge-close').on('click', function () {
				close();
			});
		});
		// 详情页跳转
		$html.find('.template-view-layer').on('click', function (event) {
			if (event.target !== event.currentTarget) {
				return;
			}
			var url = $(this).parents('.template-common-cards').attr('data-path');
			if (url) {
				window.open(window.location.origin + url);
			}
		});
	},
	// 模板列表骨架图生成
	resume_template_list_skeleton: function (element, n) {
		if (!element || !element.length || isNaN(n)) {
			return;
		}
		var colors = ['#ffffff', '#e9e7ef', '#f0f0f4', '#e9f1f6', '#f0fcff', '#e3f9fd', '#d6ecf0', '#fffbf0', '#f2ecde', '#fcefe8', '#fff2df', '#f3f9f1', '#e0eee8'];
		var list = '';
		for (var i = 0; i < n; i++) {
			list += '<li class="template-common-cards skeleton" style="background-color: '+ colors[common.main.random(colors.length, 0)] +';"><div class="template-common-image"></div><div class="template-common-info"></div></li>';
		}
		element.html(list);
	},
	// 关闭招聘推送
	recruit_event: function() {
		var $recruit = $('#recruitBox');
		var userId = getCookie("memberId");
		if (userId && $recruit.length) {
			let recruitStatus = localStorage.getItem("wbdHideRecruitAdvert");
			if (!recruitStatus) {
				$recruit.show();
			};
			$recruit.find('.close').on('click', function() {
				$recruit.hide();
			})
			$recruit.find('#hideRecruitAdvert').on('click', function(){
				$recruit.hide();
				localStorage.setItem("wbdHideRecruitAdvert", true);
			})
		};
	}
};
$(function(){
	common.main.init_();//初始化对象
});