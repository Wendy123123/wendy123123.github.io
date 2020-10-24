/**
 * 在线简历简历前端交互操作
 */
var cvmutual = cvmutual || {};
cvmutual.main = cvmutual.main || {};   
cvmutual.info = {
	vipMessages: {},
    resume_type : "文档",
    focus_moduleList: null,         // 失焦前聚焦的子模块（用于应用案例）
    // 诊断结果对象
    diagnose: {
        looptimer: null,            // 诊断检查动画定时器
        diagnose_value: null,       // 分值 & 评价说明
        diagnose_content: null,     // 诊断模块项
        diagnose_handle: null,      // 处理后的结果
    },
    langBar: {
        "homePage" : {"zh" : "个人主页", "en" : "HOME"},
        "social" : {"zh" : "社交账号", "en" : "SOCIAL ACCOUNT"},
        "baseMsg" : {"zh" : "基本信息", "en" : "INFORMATION"},
        "job" : {"zh" : "求职意向", "en" : "JOB PREFERENCES"},
        "head": {"zh" : "头像" , "en" : "PHOTOGRAPH"},
        "letter" : {"zh" : "自荐信" , "en" : "LETTER"},
        "cover" : {"zh" : "封面" , "en" : "COVER"},
        "edu" : {"zh" : "教育背景", "en" : "EDUCATION"},
        "exper" : {"zh" : "工作经验", "en" : "WORK EXPERIENCE"},
        "intexper" : {"zh" : "校园活动", "en" : "CAMPUS ACTIVITIES"},
        "volexper" : {"zh" : "志愿者经历", "en" : "VOLUNTEER EXPERIENCE"},
        "proexper" : {"zh" : "项目经验", "en" : "PROJECT EXPERIENCE"},
        "honor" : {"zh" : "荣誉奖项", "en" : "HONORS & AWARDS"},
        "skill" : {"zh" : "技能特长", "en" : "SKILLS"},
        "language" : {"zh" : "语言能力", "en" : "LANGUAGE"},
        "self" : {"zh" : "自我评价", "en" : "SUMMARY"},
        "portfolio" : {"zh" : "作品展示", "en" : "PORTFOLIO"},
        "code":{"zh" : "二维码", "en" : "QR CODE"},

        "name" : {"zh" : "你的名字", "en":"Your Name"},
        "word" : {"zh" : "一句话介绍自己，告诉HR为什么选择你而不是别人", "en" : "Please Enter a summary"},
        "age" : {"zh" : "生日", "en":"Birthday"},
        "city" : {"zh" : "所在城市", "en":"City"},
        "experience" : {"zh" : "工作年限", "en":"Experience"},
        "phone" : {"zh" : "联系电话", "en":"Mobile"},
        "email" : {"zh" : "电子邮箱", "en":"Email"},
        "jobFun" : {"zh" : "意向岗位", "en" : "Function"},
        "jobType" : {"zh" : "职业类型", "en" : "Job Type"},
        "jobCity" : {"zh" : "意向城市", "en" : "Location"},
        "jobYear" : {"zh" : "工作年限", "en" : "Service Year"},
        "jobSalary" : {"zh" : "薪资要求", "en" : "Target Salary"},
        "jobTime" : {"zh" : "入职时间", "en" : "Duty Time"},
        "jobSalarySystem" : {"zh" : {"Month" : { name : "月", value : "Month", unit : "千"}, "Year" : { name : "年" , value : "Year", unit : "万"}}, "en" : {"Month" : { name : "Month", value : "Month", unit : "K" }, "Year" : { name : "Year", value : "Year", unit : "K"}}},
        "addSkills" : {"zh" : "添加我的技能特长" , "en" : "Add skills"},
        "addPortfolio" :{"zh" : "添加我的作品" , "en" : "Add portfolio items"},
        "recoment" : {"zh" : "推荐信", "en" : "Recommendations"},
        "requestRecomment" : {"zh" : "邀请别人为你写推荐信" , "en" : "request a recommendation"},
        "ewm" : {"zh" : "感谢您的阅读，扫一扫查看我的手机简历", "en" : "please scan my resume"},
        "contact" : {"zh" : "联系我", "en" : "Contact"},
        "send" : {"zh" : "发送" , "en" : "Send"},
        "custom" : {"zh" : "添加自定义模块" , "en" : "User-Defined"},
        "junior" : {"zh" : "初中及以下" , "en" : "Junior High and Below"},
        "height" : {"zh" : "高中" , "en" : "High School"},
        "technical" : {"zh" : "中技", "en" : "Technical School"},
        "polytechnic" : {"zh" : "中专", "en" : "Polytechnic"},
        "associate" : {"zh" : "大专", "en" : "Associate"},
        "bachelor" : {"zh" : "本科", "en" : "Bachelor"},
        "master" : {"zh" : "硕士", "en" : "Master"},
        "doctorate" : {"zh" : "博士", "en" : "Doctorate"},
        "noExp" : {"zh" : "应届生", "en" : "graduate"},
        "one" : {"zh" : "1年经验", "en" : "1year experience"},
        "two" : {"zh" : "2年经验", "en" : "2years experience"},
        "three" : {"zh" : "3年经验", "en" : "3years experience"},
        "four" : {"zh" : "4年经验", "en" : "4years experience"},
        "five" : {"zh" : "5年经验", "en" : "5years experience"},
        "six" : {"zh" : "6年经验", "en" : "6years experience"},
        "seven" : {"zh" : "7年经验", "en" : "7years experience"},
        "eight" : {"zh" : "8年经验", "en" : "8years experience"},
        "nine" : {"zh" : "9年经验", "en" : "9years experience"},
        "ten" : {"zh" : "10年经验", "en" : "10years experience"},
        "moreTen" : {"zh" : "10年以上经验", "en" : "More than 10 years experience"},
        "male" : {"zh" : "男", "en" : "Male"},
        "female" : {"zh" : "女", "en" : "Female"},
        "umMarried" : {"zh" : "未婚", "en" : "Unmarried"},
        "married" : {"zh" : "已婚", "en" : "Married"},
        "private" : {"zh" : "保密", "en" : "Private"},
        "party" : {"zh" : "中共党员", "en" : "Party Member"},
        "probationaryParty" : {"zh" : "中共预备党员", "en" : "Probationary Party"},
        "league" : {"zh" : "共青团员", "en" : "League Member"},
        "demo" : {"zh" : "民主党派人士", "en" : "Democratic Party"},
        "noParty" : {"zh" : "无党派民主人士", "en" : "No Party"},
        "citizen" : {"zh" : "普通公民", "en" : "Citizen"},
        "full" : {"zh" : "全职", "en" : "Full-time"},
        "part" : {"zh" : "兼职", "en" : "Part-time"},
        "intern" : {"zh" : "实习", "en" : "Intern/Trainee"},
        "immediately" : {"zh" : "随时", "en" : "immediately"},
        "oneW" : {"zh" : "1周内", "en" : "within 1 week"},
        "oneM" : {"zh" : "1个月内", "en" : "within 1 month"},
        "threeM" : {"zh" : "3个月内", "en" : "within 3 month"},
        "determined" : {"zh" : "待定", "en" : "to be determined"},
        "average" : {"zh" : "一般", "en" : "Average"},
        "good" : {"zh" : "良好", "en" : "Good"},
        "advanced" : {"zh" : "熟练", "en" : "Advanced"},
        "expert" : {"zh" : "精通", "en" : "Expert"},
        "RMB" : {"zh" : "元/日" , "en" : "RMB/day"},
        "time" : {"zh" : "设置时间", "en" : "Time period"},
        "school" : {"zh" : "学校名称", "en" : "School name"},
        "major" : {"zh" : "专业名称", "en" : "Major..."},
        "description" : {"zh" : "描述", "en" : "Description..."},
        "organization" : {"zh" : "公司名称", "en" : "organization..."},
        "JobTitle" : {"zh" : "", "en" : "Job title..."},
        "contactTip" : {"zh" : "Hi，感谢您愿意花费一些时间来阅读我的简历，如果看完简历之后您对我仍然有兴趣，可以电话联系我，也可以直接在这里留言，我收到消息后会第一时间回复您。" , "en" : "Send me a message, and I'll get back to you shortly."},
        "contactName" : {"zh" : "怎么称呼您..." , "en" : "Enter your name..."},
        "contactEmail" : {"zh" : "填写您的联系方式..." , "en" : "Enter your email..."},
        "contactMsg" : {"zh" : "在这里填写正文..." , "en" : "Type a message..."},
    },
};
// 贴士展示
cvmutual.tips_show = true;
cvmutual.main = {
    // 初始化
    init_:function(){
        // 浏览器版本
        cvmutual.main.resume_browser();
		// 事件初始化
        cvmutual.main.event_();
        // 简历分页
        cvresume.main.resume_page();
        // 通用裁剪方法初始化
        cvmutual.main.common_cropper_init();
        // 模块操作方法 初始化执行
        cvmutual.main.baseItem_operate();
        // 富文本编辑器
		cvmutual.main.editor_operate();
		// 模态框模块
		cvmutual.main.resume_modal();
        // 模块管理
        cvmutual.main.moduleItem_manager();
		// 删除模块
		cvmutual.main.resume_delete();
		// 简历封面
		cvmutual.main.set_coverItem();	
		// 添加hover删除编辑
		cvmutual.main.create_workItem_hover();
		// 个人信息弹框 & 交互
		cvmutual.main.set_infoItem();
		// 求职意向弹框 & 交互
		cvmutual.main.set_inteItem();
		// 自定义 select 控件 & 选择城市控件
        cvmutual.main.set_selectControl();
        // 复制到剪贴板
        cvmutual.main.set_copyToClipBoard();
        // 切换英文简历
		cvmutual.main.set_changLanguage();
		// 同步数据到基本信息弹框
		cvmutual.main.get_infoToModal();
		// 同步数据到求职弹框
		cvmutual.main.get_jobToModal();
		// 简历分享
		cvmutual.main.resume_share();
		// 更换模板
		cvmutual.main.resume_select_template();
		// 下载
		cvmutual.main.resume_download();
		// 内容模板数据放入localstroage
        cvmutual.main.content_data_put_local_stroage();
        // 简历风格主题
        cvmutual.main.resume_theme_operate();
        // 更换模块样式
        cvmutual.main.change_module_style();
        // 更换模块版式
        cvmutual.main.change_module_format();
        // 简历诊断
        cvmutual.main.diagnose_init();
        // 初始化简历投递
        common.main.send_resume();
	},
	event_:function(){
        // 功能区域初始化
        window.newCommon && newCommon.main.function_panel_event();
        // 未登录计时器弹窗
        cvmutual.main.edit_resume_login();
        // 判断简历类型
        cvmutual.info.resume_type = $(".wbdCv-container").hasClass("mobile") && "手机";
        // 手机编辑模式禁止页面滚动
        if (cvmutual.info.resume_type === '手机') {
            $('body').css('overflow', 'hidden');
        }
        // tooltip初始化
        $(document).tooltip();
        // 页面缩放监听
        $(window).on('resize', function () {
            cvmutual.main.richtext_image_resizable_adapt();
        });
        // 全局鼠标点击监听
        $(document).on('click', function(e){
            var $target = $(e.target);
            // 左侧栏收回
            if (!$target.closest($('.leftbar_editor_operate li')).length && !$target.closest("#resumeThemeModal").length && !$target.closest("#moduleManageModal").length && !$target.closest("#cvListModal").length) {
                $('.wbdCv-leftbar').removeClass("open");
                $(".litemodal").css('left', '-240px');
            }
            // 关闭更换样式弹框
            if ($('#change_parts_style').is(':visible')) {
                if (!$target.closest($('#change_parts_style')).length && !$target.closest('.baseItem-toolbar span.change_style').length) {
                    cvmutual.main.change_modal_event('style').close();
                }
            }
            // 关闭更换版式弹框
            if ($('#change_parts_format').is(':visible')) {
                if (!$target.closest($('#change_parts_format')).length && !$target.closest('.baseItem-toolbar span.change_format').length) {
                    cvmutual.main.change_modal_event('format').close();
                }
            }
            // 时间模块选择器去除（点击的元素非时间选择器）
            if (!$target.closest('.timeItem .dd-title .time').length) {
                $('.wbdCv-baseStyle .timeItem .dd-title .date_select').remove();
            }
            // 去除富文本图片选中（点击的元素非裁剪框和进入裁剪的富文本内img标签）
            if ($target.attr('data-id') !== $('#image_resizable').attr('data-id') && !$target.closest('#image_resizable').length) {
                $('#image_resizable').remove();
            }
            // 去除超链接设置面板（点击的元素非富文本内a标签和设置面板）
            if (!$target.closest('[contenteditable="true"] a').length && !$target.closest('.editor-link-panel').length && !$target.closest('.CreateLink').length) {
                $('.editor-link-panel').remove();
                $('.wbdCv-baseStyle [contenteditable="true"] a.selected').removeClass('selected');
            }
        });
		// 会员升级
		$(document).on("click","a.huiyuan-upload",function(){
			$("#upvip_tips").html($(this).attr("data_tips"));
			$("#upvipModal").modal("show");
        });
        // 遍历标题状态
        $(".moduleItem dl dt").each(function(){
            var $this = $(this).parents("dl").siblings().find(".hiddenTitle s")
        　 	if($(this).hasClass("hidden")){
                $this.addClass("checked");
                $this.prev("i").text("显示栏目标题");
            }
            if($this.hasClass("checked")){
                $this.parent().siblings(".changeTitle").addClass("hidden");
            }
        }); 
        // 遍历时间模块状态
        $(".moduleItem dl dd .dd-title").each(function(){
            var $this = $(this).parents("dl").siblings().find(".hiddenTime s");
        　 if($(this).hasClass("hidden")){
                $this.addClass("checked");
                $this.prev("i").text("显示时间模块")
            }
            if($this.hasClass("checked")){
                $this.parent().siblings(".hiddenText").addClass("hidden");
            }
        });
        // 遍历描述模块状态
        $(".moduleItem dl dd .dd-text").each(function(){
            var $this = $(this).parents("dl").siblings().find(".hiddenText s");
            　 if($(this).hasClass("hidden")){
                $this.addClass("checked");
                $this.prev("i").text("显示描述模块")
            }
            if($this.hasClass("checked")){
                $this.parent().siblings(".hiddenTime").addClass("hidden");
            }
        });
		// 在线编辑 6.2.0 隐私设置
		$(".resume_authority_modal .authority_list").click(function(){
            $(this).addClass("checked").siblings().removeClass("checked");
            $(".resume_access_authority .authority_tips").text('"' +$(this).find(".authority_title").text() + '"')
			if($(this).index() != 1){
                $("#resume_authority_modal").modal("hide");
			}
		});
        // 案例指引跳转 
        $('#resume_base').on('mousedown', '.case_guide_tool', function (event) {
            var $panel = $('.function_panel');
            if ($panel.find('.tips_case_panel').is(':visible')) {
                $panel.find('.tips_case_panel .navi a.case').trigger('click');
            } else {
                $panel.find('.contraction_panel .case').trigger('click');
            }
        });
		// 底部预览提示框
		$(".bottom-modal span.close").click(function(){
			$(this).parents(".bottom-modal").css('bottom','-150px');
		});
		// 模块标题打点统计
		$(document).on("click",".preItem500dtongji",function(){
			var id=$(this).closest(".moduleItem").attr("id");
			var id_str=$("#showul a[for-id="+id+"]").siblings("span").attr("data-placeholder");
			//正常的流程是到右侧菜单栏的模块管理中对应的菜单栏去那埋点的数据的
			if(id == "resume_name"){
				id_str="基本信息（名字）";
			}else if(id == "base_info"){
				id_str="基本信息（其他）";
			}
			var data_track=$(this).attr("data_track");
			//判断是否是自定义
			if($(this).closest(".moduleItem").hasClass("customItem")){
				if($(this).closest(".moduleItem").hasClass("timeItem")){
					data_track=data_track.replace("{0}","自定义（时间）");
				}else{
					data_track=data_track.replace("{0}","自定义（描述）");
				}
			}else{
				data_track=data_track.replace("{0}",id_str);
			}
			common.main._500dtongji(data_track);
        });
        // 分享事件
        $("#edit_resume_sharebtn").click(function(){
        	var $this = $(this);
        	if(!getCookie("memberId")){
        		window.open('/login/');
        		return;
        	}
        	var resumeId = cvresume.info.resumeid;
        	if(resumeId == 0){
        		layer.msg('请先保存简历！');
        		return;
        	}
        	var visitId = cvresume.info.visitid,
        		visitType = $this.attr("data-visittype"),
        		visitPwd = $this.attr("data-visitpwd");
        	common.main.resume_share(resumeId,visitId,visitType,visitPwd, function(visit_type, pwd){
        		$this.attr("data-visittype", visit_type);
        		$this.attr("data-visitpwd", pwd);
        		if(visit_type == "privary") {
        			$(".authority_tips").text('"仅自己"');
        		} else if(visit_type == "password") {
        			$(".authority_tips").text('"密码访问"');
        		} else {
        			$(".authority_tips").text('"公开"');
        		}
        	});
        });
    },
    resume_browser:function(){
		var appName = navigator.appName;
		var appVersion = navigator.appVersion;
		if(appName == "Microsoft Internet Explorer") {
			var broserVersion = appVersion.match(/MSIE (\d)\.0/i);
			if(broserVersion && broserVersion.length ==2) {
				var versionNumber = broserVersion[1];
				if(versionNumber < 10) {
					$("#browserModal").modal("show");
				} else if(!localStorage || !localStorage.getItem("#browserModal"));
					$("#browserModal").modal("show");
			}
		}	
    },
    // 编辑页登陆
    edit_resume_login:function(){
        // 未登录时定时器提示登陆  2分钟
        var islogin_timer, login_timer;
        islogin_timer = setInterval(function() {
            if (getCookie('memberId')) {
                $('.bottom-modal').css('bottom', '-150px');
                $('#userHead').show();
                $('#userHead #user_center img').attr('src', decodeURI(getCookie('memberHead')));
                $('.edit_resume_wxlogin').modal('hide');
                clearInterval(islogin_timer);
                clearTimeout(login_timer);
            }
        }, 1000 * 5);
        if (!getCookie("memberId")) {
            $('.bottom-modal').css('bottom', '0');
            var login_timer = setTimeout(function() {
                if (!getCookie("memberId")) {
                    $('.bottom-modal').css('bottom', '-150px');
                    $login_html = '<p class="tips_title">客官，您还未登录</p>'+
                                    '<p class="tips_title_m">当前处于预览状态，编辑简历数据不会被保存，请登录后继续</p>'+
                                    '<img class="wxewm" id="weixin_qrcode_image">'+
                                    '<p class="tips_wxlogin">打开 <s>微信</s> 扫描二维码注册或登录</p>';
                    common.main.resume_confirm({
                        title:"",
                        content_html:$login_html,
                        tips_modal_class:"edit_resume_wxlogin",
                        modal_class:"edit_resume_wxlogin_content",
                        onLayer: function(){
                            if (window.loginMain) {
                                loginMain.main.bind_weixin_clear();
                                cvmutual.main.edit_resume_login();
                            }
                            clearInterval(islogin_timer);
                            clearTimeout(login_timer);
                        },
                    });
                    if (window.loginMain) {
                        loginMain.main.bind_weixin("weiXinLoginQrCode");
                    }
                }
            }, 1000 * 60 * 2);
        } else {
            clearInterval(islogin_timer);
            clearTimeout(login_timer);
        }
    },
    // modal模态框调用
	resume_modal:function(){
        $(".litemodal .close").click(function(){
			$(".litemodal").css('left','-240px');
		});
        // 左侧栏交互效果
        $(".leftbar_editor_operate li").mouseenter(function(){
            $('.wbdCv-leftbar').addClass('open');
        });
    	// 切换编辑模式  ----------------------------------------------------
    	$(".resume_switch_style a").on('click',function(){
    		var _href = $(this).attr("data_href");
    		if(!cvresume.main.is_empty(cvresume.info.resumeid)){
    			_href += "&resumeId=" + cvresume.info.resumeid;
    		}
    		window.location.href = _href;
    	});
		// 调用推荐信邀请弹框
		$('.wbdCv-baseStyle').on("click",".recomentItem .baseItem-toolbar .add,.recomentItem .baseItem-null,.r-yqrecomentbar a",function(){
			if(cvresume.main.is_empty(cvresume.info.resumeid)){
				layer.msg("简历未保存");
			}else{
				var url = location.protocol+"//www.500d.me/recommend/send/"+cvresume.info.resumeid+"/";
				$("#recommend-modal .recommendContent").find("span").text(url);
				$("#recommend-modal").modal("show");
			}
		});
		// 调用访问权限弹框
		$(".resume_access_authority a").click(function(){
			$("#resume_authority_modal").modal("show")
		});
		// 所有人权限弹框
		$(".view-select #syr").click(function(){
		     $("#accessPassword-modal").find(".successPanel").show().find("h6").text("已设置权限为所有人可访问");
			 $("#accessPassword-modal").modal("show");
		});
		// 调用支付选择弹框
		$(".payBtn").click(function(){
			$("#payModal").modal("show");
		});	
		// 切换简历提示
		$(document).on("click","#cvListModal .edit",function(){
			var title = "确定要切换到其它简历吗？";
			var content = "我们将为您自动保存当前简历。";
			var href=$(this).attr("data_path");
			common.main.resume_confirm({
				title:title,
				content:content,
				onOk:function(){
					location.href=href;
				}
			});
			return false;
		});
		// 导入简历弹框
        $('#importResumeBtn').on("click", function(){
            if ($(this).hasClass('wbd-vip-lock')) {
                return;
            }
            $("#importRModal").modal("show");
        });
    },
    // 删除模块
	resume_delete:function(){
		function resumeDelete(){
			var key=$(".baseItem a.delete.selected").closest(".moduleItem").attr("id");
			if(key=="resume_recoment"){
			    // 推荐信删除
				var data_id=$(".baseItem a.delete.selected").closest(".moduleItemList").attr("data-id");
				$.ajax({
		    		 type: "POST",
		    		 async : false,
		             url: "/recommend/delete/",
		             data:{"id":data_id},
		          	 success:function(message){
		          		 if(message.type!="success"){
		          			 layer.msg(message.content);
		          			 return;
		          		 }
		          	 }
		    	})
			}
			$(".recomentItem .moduleItemList a.delete.selected").closest(".moduleItemList").remove();
		    $(".coverItem a.delete.selected").closest(".cover-list").remove();
			$(".info-list .delete.selected").parents(".info-list").addClass("hidden").find("span").text("");
			$(".inte-list .delete.selected").parents(".inte-list").find("span").text("");
            $(".inte-list .delete.selected").parents(".inte-list").addClass("hidden");
            if(!$(".recomentItem .recoment-list").length){
				$(".recomentItem .baseItem-null").css('display','block');
            }
            if($(".infoItem .info-list").hasClass("info-defind")){
                $('.defaultmodal .defindItem .add[data-value='+ $(".info-defind .delete.selected").parents(".info-defind").attr('id') +']').remove();
                $(".info-defind .delete.selected").parents(".info-defind").remove();
            }
            if($(".coverItem .cover-list").hasClass("cover-custom")){
	        	$(".cover-custom a.delete.selected").parents(".cover-custom").remove();
            }
	        cvmutual.main.get_infoToModal();
	        cvmutual.main.get_jobToModal();
            cvresume.main.delay_resume_save();
            // 处理基本信息样式
            cvresume.main.moduleItemList_handlestyle();
		};
		$("#delete-modal button.submit").click(function(){
			var $checked = $("#delete-modal #checkedNotfy:checked").val();
			addCookie("delete",$checked);
		});
		$("#delete-modal-child button.submit").click(function(){
			var $checked =  $("#delete-modal-child #checkedNotfy:checked").val();
			addCookie("delete",$checked);
		});
		$('.wbdCv-baseStyle').on("click","a.delete",function(){
			if($(this).hasClass("job")){
				$(".salaryItem .negotiable input[type='checkbox']").prop("checked", false);
                $(".salaryItem .monthly input, .salaryItem .daily input").attr("disabled",false);
			}
		    if(!$(this).parents(".set-list").length){
                $("a.delete").removeClass("selected");
                $(this).addClass("selected");
                resumeDelete();
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save(); 
            }
		});		
	},
    // 创建工具
	create_resume_tool:function(i,j){
		var html = i.html();
    	j.before(html);
    },
    // 创建 子模块删除按钮 移动按钮
    create_workItem_hover:function(){
    	var html_del = '<a class="delete preItem500dtongji" title="删除" data_track="PC-在线制作-'+cvmutual.info.resume_type+'编辑页-中间简历编辑-{0}-子模块删除"></a>';
    	$(".infoItem .info-con div, .coverItem .cover-list").append(html_del);
	},

    /**
     * 通用裁剪相关功能
     */
    // 通用裁剪弹窗 ，该方法提供一个方法 cvmutual.main.common_cropper_operate(opt) 用于调用裁剪弹窗
    common_cropper_init: function () {
        var cropper = {};           // 裁剪插件实例
        var originImage;            // 原图文件对象
        var $modal = $('#common-cropper-modal');
        var $cropper = $modal.find('#commoncropper-wrapper');
        var $inputImage = $modal.find("#inputCommonImage");
        // cvmutual.main.common_cropper_operate(opt) 参数，此处设置值无效
        var option = {
            act: '',                        // 弹窗行为标识
            image: '',                      // 生成裁剪的图片路径
            onOpen: null,                   // 打开弹窗回调 显示后
            originUploadDone: null,         // 原图上传成功回调 argument:(src)
            cropperDone: null,              // 裁剪图片上传成功回调 argument:(src)
        }
        // 实例化裁剪框方法
        var create_cropper = function ($img) {
            $cropper.html($img);
            var settings = {
                viewMode: 1,
                dragMode: 'none',
                checkCrossOrigin: false,
                guides: false,
                background: false,
                center: false,
                movable: false,
                rotatable: false,
                scalable: false,
                zoomable: false,
                ready: function () {
                    cvmutual.main.common_cropper_tools(cropper, $modal);
                }
            };
            cropper = new Cropper($cropper.find('img')[0], settings);
        }
        // 打开/关闭弹窗
        var toggle = function (s) {
            if (s) {
                // 清除自定义行为功能
                $modal.find('.custom-act').html('');
                $modal.modal('show');
                typeof option.onOpen === 'function' && option.onOpen($modal, cropper);
            } else {
                originImage = null;
                $modal.modal('hide');
            }
        }
        // 阻止全局点击冒泡
        $modal.on('click', function (event) {
            event.stopPropagation();
        });
        // 选择图片进行裁剪
        $inputImage.on('change', function () {
            var file = this.files[0];
            $(this).val('');
            if (!file) {
                return;
            }
            if (file.size > 1024 * 1024 * 50) {
                return layer.msg('图片最大不能超过50MB~');
            }
            originImage = file;
            var img = new Image();
            var reader = new FileReader();
            reader.onload = function () {
                img.src = reader.result;
                // 重新选择图片
                if (cropper.ready) {
                    cropper.replace(reader.result);
                } else {
                    create_cropper($(img));
                }
                toggle(true);
            }
            reader.readAsDataURL(file);
        });
        // 保存
        $modal.find('.button.submit').on('click', function () {
            var $this = $(this);
            if ($this.hasClass('disabled')) {
                return;
            }
            $this.addClass('disabled');
            if (!cropper.ready) {
                return;
            }
            layer.load();
            // 上传裁剪的图片
            var get_canvas = cropper.getCroppedCanvas();
            var width = get_canvas.width;
            var height = get_canvas.height;
            cvmutual.main.upload_cropper_image({
                value: get_canvas.toDataURL('image/jpeg', 0.8),
                fileName: '1.jpeg',
                success: function (src) {
                    // 上传原图
                    if (originImage) {
                        cvmutual.main.upload_cropper_image({
                            value: originImage,
                            fileName: originImage.name,
                            success: function (src) {
                                if (typeof option.originUploadDone === 'function') option.originUploadDone(src);
                            }
                        });
                    }
                    if (typeof option.cropperDone === 'function') option.cropperDone(src, { width: width, height: height, });
                },
                complete: function () {
                    $this.removeClass('disabled');
                    toggle(false);
                },
            });
        });
        // 向外暴露使用方法
        cvmutual.main.common_cropper_operate = function (opt) {
            if (!opt || typeof opt !== 'object') {
                return;
            }
            option = opt;
            if ($("html").hasClass("ie9")) {
                return layer.msg('当前浏览器内核为ie9，无法上传图片，请更换浏览器切换至极速模式，体验更多功能');
            }
            var src = option.image.replace(/^http(s)?:\/\/(.*?)\//, location.protocol+'//'+location.host+'/image_proxy/');
            if (!src) {
                $inputImage.click();
            } else {
                create_cropper($('<img src="'+ src +'" alt="" />'));
                toggle(true);
            }
            $modal.attr('act', option.act);
        };
    },
    common_cropper_operate: function () {},
    // 通用裁剪框工具栏方法
    common_cropper_tools: function (cropper, $modal) {
        if (typeof cropper !== 'object') {
            return;
        }
        // 裁剪框比例设置
        var ratio = [{
            type: 1,
            text: '1 : 1',
        }, {
            type: 0.75,
            text: '3 : 4',
        }, {
            type: 1.33,
            text: '4 : 3',
        }, {
            type: 1.77,
            text: '16 : 9',
        }, {
            type: NaN,
            text: '自由裁剪',
        }];
        if (!$modal.find('.cropper-ratio-select .options').children().length) {
            var option_li = '';
            var init_ratio = ratio[4];
            ratio.forEach(function (item) {
                option_li += '<li data-value="'+ item.type +'">'+ item.text +'</li>';
                if (cropper.options && (item.type === Math.floor(cropper.options.aspectRatio * 100) / 100)) {
                    init_ratio = item;
                }
            });
            $modal.find('.cropper-ratio-select .select-name').text(init_ratio.text).attr('data-value', init_ratio.type);
            $modal.find('.cropper-ratio-select .options').html(option_li);
        }
        // 事件处理
        $modal.find('.cropper-ratio-select').off('mouseenter mouseleave').on('mouseenter', function () {
            $(this).addClass('open');
        }).on('mouseleave', function () {
            $(this).removeClass('open');
        }).find('.options li').off('click').on('click', function () {
            var $parent = $(this).parents('.cropper-ratio-select');
            $parent.removeClass('open');
            $parent.find('.select-name').text($(this).text()).attr('data-value', $(this).attr('data-value'));
            if (cropper.setAspectRatio) {
                cropper.setAspectRatio(Number($(this).attr('data-value')));
            }
        });
    },
    // 通用裁剪图片上传
    upload_cropper_image: function (opt) {
        var option = {
            value: undefined,
            fileName: '1.png',
            success: null,
            error: null,
            complete: null,
        };
        option = $.extend(option, opt);
        if (!option.value) {
            return;
        }
        // base64 转 blob
        if (typeof option.value === 'string' && option.value.indexOf('data:image') > -1) {
            var arr = option.value.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
	        while (n--) {
	            u8arr[n] = bstr.charCodeAt(n);
	        }
            option.value = new Blob([u8arr], { type: mime });
        }
        var formData = new FormData();
        formData.append('file', option.value, option.fileName);
        formData.append('fileType',"uimage");
        $.ajax({
            url: wbdcnf.base + "/file/upload/new_cropper_image/",
            type: "POST",
            dataType:'text',
            data:formData,
            contentType:false,
            processData:false,
            success: function(data) {
                var result = JSON.parse(data);
                if (result.type === 'success') {
                    typeof option.success === 'function' && option.success(result.content);
                } else {
                    typeof option.error === 'function' && option.error();
                    alert(result.content);
                }
            },
            error: function () {
                typeof option.error === 'function' && option.error();
            },
            complete: function () {
                typeof option.complete === 'function' && option.complete();
                layer.closeAll();
            }
        });
    },

    /**
     * 各模块操作方法
     */
    // 通用模块
    baseItem_operate: function () {
        // 工具栏生成
        cvmutual.main.create_resume_tool($('#itemTool'), $('.wbdCv-baseStyle .baseItem dl'));
        cvmutual.main.create_resume_tool($('#itemTool'), $('.wbdCv-baseStyle .bInfoItem dl'));
        cvmutual.main.create_resume_tool($('#itemTool'), $('.wbdCv-baseStyle .coverItem dl'));
        cvmutual.main.create_resume_tool($('#caseTool'), $('.wbdCv-baseStyle .timeItem .dd-text .resume_content, .wbdCv-baseStyle .descItem .dd-text .resume_content'));
        // 背景图模块
        cvmutual.main.backgroundItem_operate();
        // 头像模块
        cvmutual.main.headItem_operate();
        // 时间模块
        cvmutual.main.timeItem_operate();
        // 作品模块
        cvmutual.main.workItem_operate();
        // 技能特长模块
        cvmutual.main.skillItem_operate();
        // 语言能力模块
        cvmutual.main.languageItem_operate();
        // 个人标签 / 兴趣爱好
        cvmutual.main.hobbyItem_operate();
        // 模块logo
        cvmutual.main.baseItem_logo();
        // 模块图标
        cvmutual.main.baseItem_icon();
        // 模块标签
        cvmutual.main.baseItem_tags();
        // 模块排序
        cvmutual.main.baseItem_sortable();
        // 姓名一句话字数限制
        common.main.limit_input_length('.wbdCv-baseStyle .name-con .name[contenteditable="true"]', cvresume.info.language === 'en' ? 30 : 20);
        common.main.limit_input_length('.wbdCv-baseStyle .name-con .word[contenteditable="true"]', cvresume.info.language === 'en' ? 150 : 100);
        // 模块标题 字数限制
        common.main.limit_input_length('.wbdCv-baseStyle .module_item_title[contenteditable="true"]', cvresume.info.language === 'en' ? 100 : 30);
        // 封面 自荐信
        common.main.limit_input_length('.wbdCv-cover .coverItem div[contenteditable="true"]', 100);
        common.main.limit_input_length('.wbdCv-letter .letterItem div[contenteditable="true"]', 5000);
        // 模块详细描述字数提示
        common.main.limit_input_length('.wbdCv-baseStyle .baseItem:not(.schoolElementItem) .dd-text div[contenteditable="true"]', 5000, {
            focus: function(e){
                var $this = $(e.target);
                var $parent = $this.parents('.dd-text');
                if ($parent.children('.content_length').length === 0) {
                    $parent.append('<div class="content_length"><span class="current_length">0</span>/<span class="max_length">5000</span></div>');
                }
                var content_length = $this.text().length;
                var $content_length = $parent.find('.content_length');
                var max_length = Number($content_length.find('.max_length').text());
                $content_length.find('.current_length').text(content_length);
                if (content_length >= max_length) {
                    $content_length.css('color', 'red');
                } else {
                    $content_length.removeAttr('style');
                }
            },
            keyup: function(e){
                var $this = $(e.target);
                var $parent = $this.parents('.dd-text');
                var content_length = $this.text().length;
                var $content_length = $parent.find('.content_length');
                var max_length = Number($content_length.find('.max_length').text());
                $parent.find('.content_length .current_length').text(content_length);
                if (content_length >= max_length) {
                    $content_length.css('color', 'red');
                } else {
                    $content_length.removeAttr('style');
                }
            },
            blur: function(e){
                var $this = $(e.target);
                var $parent = $this.parents('.dd-text');
                $parent.children('.content_length').remove();
            },
        });
        // 校招元素字数限制
        common.main.limit_input_length('.wbdCv-baseStyle .baseItem.schoolElementItem .dd-text div[contenteditable="true"]', 100);
        // 作品限制
        common.main.limit_input_length('.wbdCv-baseStyle .work-list .work-title', 20);
        common.main.limit_input_length('.wbdCv-baseStyle .work-list .work-text', 50);
        // 鼠标移入模块显示工具栏  移出隐藏
        $('.wbdCv-baseStyle').on('mouseenter mouseleave', '.moduleItem', function (event) {
            if (event.type === 'mouseenter') {
                $(this).find('.baseItem-toolbar').show();
            } else {
                // 更换版式/样式弹框显示时，不隐藏工具栏
                if (!$(this).find('#change_parts_style').is(':visible') && !$(this).find('#change_parts_format').is(':visible')){
                    $(this).find('.baseItem-toolbar').hide();
                } 
            }
        });
        // 阻止模块设置激活
        $('.wbdCv-baseStyle').on('mousedown', '.prevent_moduleItem_current', function (event) {
            event.stopPropagation();
        });
        // 描述内容板块 鼠标移入背景色修改， 子模块内编辑域激活时去除
        $('.wbdCv-baseStyle').on('mouseenter mouseleave focusin', '.baseItem .dd-content', function (event) {
            if (event.type === 'mouseenter') {
                (!$(this).find('div[contenteditable="true"]:focus').length) && $(this).css('background-color', 'rgba(0, 205, 143, 0.1)');
            } else {
                $(this).css('background-color', 'transparent');
            }
        });
        // 编辑器内部分按键操作禁止 （不限于编辑弹窗）
        $('.wbdCv-baseStyle').on('keydown keyup', 'div[contenteditable="true"]', function(event) {
            var $this = $(this);
            var key = event.keyCode;
            // 处理没有内容但存在dom时的情况
            if (event.type === 'keyup') {
                if ($this.children().length === 1 && !$this.text()) {
                    $this.html('');
                }
                return;
            }
            // 描述域 && 姓名一句话 && 自荐信 封面 阻止使用tab键切换输入域
            if ($this.parents('.wbdCv-resume').length || $this.parents('.nameItem').length || $this.parents('.dd-text').length) {
                if (key === 9) return false;
            }
            // 姓名一句话 模块标题 时间轴模块 单位职位栏禁止使用回车
		    if ($this.parents('.name-con').length || $this.parents('.dd-title').length || $this.hasClass('module_item_title') || $this.hasClass('work-title')) {
                if (key === 13) {
                    layer.msg("此处不可以使用回车键");
    		        return false;
                }
            }
        });
        // 模块工具栏 - 显示/隐藏
		$('.wbdCv-baseStyle').on('click', '.baseItem-toolbar .set', function () {
            var $this = $(this);
            var $module = $this.parents('.moduleItem');
			$this.find('.set-con').css({
                'height': 'auto',
                'overflow': 'visible',
            });
            // 状态回显
            $this.find('.hiddenTitle .toggle-btn').toggleClass('checked', $module.find('dl dt').hasClass('hidden'));
            $this.find('.hiddenTime .toggle-btn').toggleClass('checked', $module.find('dl .dd-title').hasClass('hidden'));
            $this.find('.hiddenText .toggle-btn').toggleClass('checked', $module.find('dl .dd-text').hasClass('hidden'));
            $this.find('.hiddenLogo .toggle-btn').toggleClass('checked', $module.find('dl .dd-logo').hasClass('hidden'));
        });
        $('.wbdCv-baseStyle').on('mouseleave', '.baseItem-toolbar', function (event) {
            var x = event.pageX;
            var y = event.pageY;
            var $list = $(this).find('.set-con');
            var listx1 = $list.offset().left;
            var listx2 = $list.offset().left + $list.width();
            var listy1 = $list.offset().top;
            var listy2 = $list.offset().top + $list.height();
            if (!(x > listx1 && x < listx2 && y > listy1 && y < listy2)) {
                $list.css({
                    'height': 0,
                    'overflow': 'hidden',
                });
            }
        });
        var hidden_title = function ($module) {
            var $this = $module.find('dl dt');
            var $tool = $module.find('.baseItem-toolbar .hiddenTitle .toggle-btn');
            $this.toggleClass('hidden', $tool.hasClass('checked'));
        }
        var hidden_time = function ($module) {
            var $this = $module.find('dl .dd-title');
            var $tool = $module.find('.baseItem-toolbar .hiddenTime .toggle-btn');
            var $hidetext = $module.find('.baseItem-toolbar .hiddenText');
            $this.toggleClass('hidden', $tool.hasClass('checked'));
            $hidetext.toggleClass('hidden', $tool.hasClass('checked'));
        }
        var hidden_text = function ($module) {
            var $this = $module.find('dl .dd-text');
            var $tool = $module.find('.baseItem-toolbar .hiddenText .toggle-btn');
            var $hidetime = $module.find('.baseItem-toolbar .hiddenTime');
            $this.toggleClass('hidden', $tool.hasClass('checked'));
            $hidetime.toggleClass('hidden', $tool.hasClass('checked'));
        }
        var hidden_logo = function ($module) {
            var $this = $module.find('dl .dd-logo');
            var $tool = $module.find('.baseItem-toolbar .hiddenLogo .toggle-btn');
            $this.toggleClass('hidden', $tool.hasClass('checked'));
        }
        var recovery_style = function ($module) {
            var module_style = $module.attr('data-parts');
            if (!common.main.is_empty(module_style) && module_style != "template_css") {
                $module.removeClass(module_style).addClass("template_css").attr("data-parts","template_css");
            }
        }
        // 模块工具栏 - 开关按钮
        $('.wbdCv-baseStyle').on('click', '.baseItem-toolbar .set-list .toggle-btn', function (event) {
            var $this = $(this);
            var $module = $this.parents('.moduleItem');
            $this.toggleClass('checked');
            // 显示隐藏title
            if ($this.parents('.hiddenTitle').length) {
                hidden_title($module);
            }
            // 显示隐藏时间栏目
            if ($this.parents('.hiddenTime').length) {
                hidden_time($module);
            }
            // 显示隐藏描述栏目
            if ($this.parents('.hiddenText').length) {
                hidden_text($module);
            }
            // 显示隐藏logo
            if ($this.parents('.hiddenLogo').length) {
                hidden_logo($module);
            }
            // 恢复模块初始样式
            if ($this.parents('.recoveryStyle').length) {
                recovery_style($module);
            }
            cvresume.main.delay_resume_save();
        });
        // 模块工具栏 - 删除按钮
        $('.wbdCv-baseStyle').on('click', '.baseItem-toolbar .set-list .delete', function (event) {
            var $module = $(this).parents('.moduleItem');
            $module.removeClass('current');
            // 自定义模块直接删除
            if($module.hasClass('customItem')){
                common.main.resume_confirm({
                    title: "确定删除当前模块吗？",
                    content: "此模块为自定义模块,删除后无法恢复.",
                    onOk: function () {
                        $module.remove();
                    },
                });
            }else{
                $module.addClass('hidden');
            }
            $('#delete-modal').modal('hide');
            cvresume.main.resume_page();
            cvresume.main.delay_resume_save();
        });
    },
    // 通用模块 - 拖动排序操作
	baseItem_sortable: function(){
        $('.moduleItem:not(#resume_qrcode) .ui-sortable-handle').on('mousedown',function(e){
            $('.wbdCv-baseStyle').css('overflow','hidden');
            $(this).parents('.moduleItem').css('transform','scale(1.05)');
        }).on('mouseup',function(e){
            $('.wbdCv-baseStyle').css('overflow', '');
            $(this).parents('.moduleItem').css('transform','');
        });
        // 拖动排序 - right板块
        $("#bar").sortable({
            connectWith: "#foo",
            items: ".baseItem",
            cancel: ".hidden, .ewmItem",
            handle: ".handle",
            cursor: "grabbing",
            helper: "clone",
            scrollSensitivity: 50,
            scrollSpeed: 30,
            tolerance: "pointer",
            start: function(event,ui){
                ui.item.show();
                ui.item.css('transform','');
                ui.helper.css('transform','')
                ui.placeholder.css('height', ui.item[0].clientHeight);
                ui.item.hide();
            },
            activate: function (event, ui) {
                // 更新模块项目位置，解决较高的模块无法拖动
                $("#bar").sortable("refreshPositions");
                $("#foo").sortable("refreshPositions");
            },
            update: function (event, ui) {
                // 获取当前选择项
                var id = ui.item.attr("id");
                var id_str = $("#showul a[for-id=" + id + "]").siblings("span").attr("data-placeholder");
                common.main._500dtongji("PC-在线制作-" + cvmutual.info.resume_type + "编辑页-中间简历编辑-" + id_str + "-拖动");
                // 分栏适配
                cvresume.main.module_format_fit(ui.item);
                // 求职意向排版
                if (ui.item.hasClass('inteItem')) cvresume.main.moduleItemList_handlestyle();
            },
            stop: function (event, ui) {
                // 拖动结束还原高度
                $(".wbdCv-resume .wbdCv-baseRight").removeAttr('style');
                $('.wbdCv-baseStyle').css('overflow', '');
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save();
            },
        });
        // 拖动排序 - left板块
        $("#foo").sortable({
            connectWith: "#bar",
            items: ".baseItem",
            handle: ".handle",
            cursor: "grabbing",
            helper: "clone",
            scrollSensitivity: 50,
            scrollSpeed: 30,
            tolerance: "pointer",
            start: function (event, ui) {
                ui.item.show();
                ui.item.css('transform', '');
                ui.helper.css('transform', '')
                ui.placeholder.css('height', ui.item[0].clientHeight);
                ui.item.hide();
            },
            activate: function (event, ui) {
                // 更新模块项目位置，解决较高的模块无法拖动
                $("#foo").sortable("refreshPositions");
                $("#bar").sortable("refreshPositions");
            },
            update: function (event, ui) {
                // 获取当前选择项
                var id = ui.item.attr("id");
                var id_str = $("#showul a[for-id=" + id + "]").siblings("span").attr("data-placeholder");
                common.main._500dtongji("PC-在线制作-" + cvmutual.info.resume_type + "编辑页-中间简历编辑-" + id_str + "-拖动");
                // 分栏适配
                cvresume.main.module_format_fit(ui.item);
                // 求职意向排版
                if (ui.item.hasClass('inteItem')) cvresume.main.moduleItemList_handlestyle();
            },
            stop: function () {
                // 拖动结束还原高度
                $(".wbdCv-resume .wbdCv-baseRight").removeAttr('style');
                $('.wbdCv-baseStyle').css('overflow', '');
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save();
            },
        });
        /**
         * cv6.9.5 二维码改随意拖动
         * 手机简历不可拖动
         */
        if (!$('.wbdCv-editorBody .wbdCv-container').hasClass('mobile') || cvmutual.info.resume_type !== "手机") {
            $("#foo").sortable('option', {items:'.baseItem:not(#resume_qrcode)'});
            $("#bar").sortable('option', {items:'.baseItem:not(#resume_qrcode)'});
            $('#resume_qrcode .baseItem-toolbar .ui-sortable-handle').on('mousedown', function(){
                $(this).parents('#resume_qrcode').css({
                    'position': 'absolute',
                });
            });
            // 拖动
            $('#resume_qrcode').draggable({
                handle: '.baseItem-toolbar .ui-sortable-handle',
                containment: '.wbdCv-baseStyle',
                appendTo: '.wbdCv-editorBody .wbdCv-container',
                zIndex: 999,
                scroll: true,
                stop: function(event, ui){
                    $('#resume_qrcode').attr('data-point', ui.position.left +','+ ui.position.top).css('z-index', '');
                    cvresume.main.delay_resume_save();
                },
            });
            // 缩放
            cvmutual.main.set_ewm_resizable();
        }
    },
    // 通用模块 - 图标操作
    baseItem_icon: function () {
        var $modal = $('#IconModal');
        var $search = $('#icon_search_value');
        var $checked = null;
        var updateNum = function (id) {
            $.get('/cvresume/icon/updateNum/', { id: id, });
        }
        // 获取图标
        var get_icon = function () {
            var type = $modal.find('.icon-typebtn.current').attr('data-style');
            var param = {
                name: $search.val(),
                isColor: type === 'colour',
            };
            var $icon_contain = $('#' + type);
            $.get("/cvresume/icon/", param, function(result){
                $icon_contain.children('li').remove();
                if (result) {
                    $icon_contain.append(result);
                } else {
                    $icon_contain.append('<li class="empty">暂时没有相关图标</li>');
                }
                common.main.iconfont_async_load($('#colour'));
                // 替换图标
                $icon_contain.children('li:not(.empty)').on('click', function () {
                    var $this = $(this);
                    if ($checked) {
                        $checked.html($this.find('.wbdfont').html());
                        common.main._500dtongji("PC-在线制作-"+cvmutual.info.resume_type+"编辑页-中间简历编辑-通用-点击模块图标(all)-选择某图标");
                        updateNum($this.attr('id'));
                        $checked = null;
                        $modal.modal('hide');
			            cvresume.main.delay_resume_save();
                    }
                });
            });
        }
        $modal.find('.close').on('click', function () {
            $checked = null;
        });
        // 切换分类
        $modal.find('.icon-typebtn').on('click', function () {
            if ($(this).hasClass('current')) return;
            $(this).addClass('current').siblings().removeClass('current');
            var $ul = $('#' + $(this).attr('data-style'));
            $ul.removeClass('hidden').siblings().addClass('hidden');
            get_icon();
        });
        // 搜索图标
        $search.on('input', common.main.debounce(get_icon, 500));
        // 点击图标准备替换
        $('#resume_base').on('click', 'a.wbdfont', function () {
            var $this = $(this);
            // 需会员权限 获取权限消息
            if ($('#importResumeBtn').hasClass('wbd-vip-lock')) {
                $.ajax({
					url: '/cvresume/validate_opt_auth/',
					type: 'GET',
					async: false,
					data:{
                        opt: 'icon',
                    },
					success: function (res) {
                        if (res.type === 'error') {
							layer.msg(res.content);
                            return;
                        }
                        if (res.type === 'warn') {
							common.main.vip_opt_tips();
                        }
					}
				});
                return;
            }
            $checked = $this;
            $modal.modal('show');
            // 初次打开立即搜索
            if (!$modal.find('.icon-list li:not(.empty)').length) {
                get_icon();
            }
            common.main._500dtongji("PC-在线制作-"+cvmutual.info.resume_type+"编辑页-中间简历编辑-更换图标(all)");
        });
    },
    // 通用小模块 - 删除按钮 evtCallback: 按钮点击事件（处理当前模块的事件）
    baseItem_delete_tool: function (evtCallback) {
        var $del = $('<a class="delete preItem500dtongji" title="删除" data_track="PC-在线制作-'+ cvmutual.info.resume_type +'编辑页-中间简历编辑-{0}-子模块删除"></a>');
        if (typeof evtCallback === 'function') {
            $del.on('click', evtCallback);
        } else {
            // 默认绑定事件为删除 moduleItemList 操作
            $del.on('click', function (event) {
                var $module = $(this).parents('.moduleItem');
                $(this).parent('.moduleItemList').remove();
                if (!$module.find('.moduleItemList').length) {
                    $module.find('.baseItem-null').show();
                    $module.find('.placeholder').remove();
                } else {
                    cvmutual.main.baseItem_format_placeholder($module);
                }
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save();
            });
        }
        return $del;
    },
    // 通用模块 - logo替换
    baseItem_logo: function () {
        var cropper = {};           // 裁剪插件实例
        var originImage;            // 原图文件对象
        var $moduleItem = null;
        var $modal = $('#logoimg-modal');
        var $inputImage = $modal.find("#inputLogoImage");
        var $logoCropper = $modal.find('#logoimg-cropper');
        // 实例化裁剪框方法
        var create_cropper = function ($img) {
            $logoCropper.html($img);
            // 生成并初始化裁剪框方法
            var settings = {
                viewMode: 1,
                dragMode: 'none',
                checkCrossOrigin: false,
                aspectRatio: 1,
                guides: false,
                background: false,
                center: false,
                movable: false,
                rotatable: false,
                scalable: false,
                zoomable: false,
                ready: function () {
                    var style = $modal.find('.cropper-type-option li.checked').attr('data-style') || 'square';
                    style_to_cropper(style);
                },
            };
            cropper = new Cropper($logoCropper.find('img')[0], settings);
        }
        // 同步裁剪样式到弹窗
        var style_to_cropper = function (style) {
            var style = style || $moduleItem.find('.dd-logo').attr('data-style');
            switch (style) {
                case 'round':
                    $logoCropper.find('.cropper-view-box').css('border-radius', '50%');
                    break;
                case 'square':
                    $logoCropper.find('.cropper-view-box').css('border-radius', 0);
                    break;
                case 'squareRound':
                    $logoCropper.find('.cropper-view-box').css('border-radius', '10%');
                    break;
                default:
                    $logoCropper.find('.cropper-view-box').css('border-radius', 0);
                    break;
            }
            $modal.find('.cropper-type-option li[data-style="'+ style +'"]').addClass('checked').siblings().removeClass('checked');
        }
        // 点击更换logo
        $('.wbdCv-baseStyle').on('click', '.baseItem .dd-logo', function () {
            if ($("html").hasClass("ie9")) {
                return layer.msg('当前浏览器内核为ie9，无法上传图片，请更换浏览器切换至极速模式，体验更多功能');
            }
            $moduleItem = $(this).parents('.moduleItemList');
            var $img = $(this).find('img');
            var origin_src = $img.attr('data-src').replace(/^http(s)?:\/\/(.*?)\//, location.protocol+'//'+location.host+'/image_proxy/');
            if (!origin_src) {
                $inputImage.click();
            } else {
                create_cropper($('<img src="'+ origin_src +'" alt="" />'));
                $modal.modal("show");
            }
        });
        // 选择图片进行裁剪
        $inputImage.on('change', function () {
            var file = this.files[0];
            $(this).val('');
            if (!file) {
                return;
            }
            if (file.size > 1024 * 1024 * 10) {
                return layer.msg('图片最大不能超过10MB~');
            }
            originImage = file;
            var img = new Image();
            var reader = new FileReader();
            reader.onload = function () {
                img.src = reader.result;
                // 重新选择图片
                if (cropper.ready) {
                    cropper.replace(reader.result);
                } else {
                    create_cropper($(img));
                }
                $modal.modal("show");
            }
            reader.readAsDataURL(file);
        });
        // 选择裁剪类型
        $modal.find('.cropper-type-option li').on('click', function () {
            if ($(this).hasClass('checked') || !cropper.ready) {
                return;
            }
            style_to_cropper($(this).attr('data-style'));
        });
        // 保存
        $modal.find('.button.submit').on('click', function () {
            var $this = $(this);
            if ($this.hasClass('disabled')) {
                return;
            }
            $this.addClass('disabled');
            if (!cropper.ready) {
                return;
            }
            // 上传原图
            if (originImage) {
                cvmutual.main.upload_cropper_image({
                    value: originImage,
                    fileName: originImage.name,
                    success: function (src) {
                        $moduleItem.find('.dd-logo img').attr('data-src', src);
                    }
                });
            }
            layer.load();
            // 上传裁剪的图片
            var get_canvas = cropper.getCroppedCanvas();
            cvmutual.main.upload_cropper_image({
                value: get_canvas.toDataURL('image/jpeg', 0.7),
                fileName: '1.jpeg',
                success: function (src) {
                    $moduleItem.find('.dd-logo img').attr('src', src);
                    $moduleItem.find('.dd-logo').attr('data-style', $modal.find('.cropper-type-option li.checked').attr('data-style'));
                },
                complete: function () {
                    $this.removeClass('disabled');
                    originImage = null;
                    $modal.modal('hide');
                }
            });
        });
    },
    // 通用内容模块 - 标签
    baseItem_tags: function () {
        var $moduleList;
        var add_moduletag_length = 5;
        // 当前模块是否添加标签  修改添加按钮名称
        $('.wbdCv-baseStyle .baseItem .dd-tags').each(function(){
            if ($(this).children('.moduleTags').length > 0) {
                $(this).find('.inset_moduleTags').text('修改标签');
            }
        });
        $('.wbdCv-baseStyle').on('mousedown', '.baseItem .dd-tags .inset_moduleTags', function (event) {
            var $module = $(this).parents('.baseItem');
            $moduleList = $(this).parents('.moduleItemList');
            $('#moduleTags-modal').modal('show');
            // 同步标签
            $('#moduleTags-modal .item-content').remove();
            $(this).siblings('span.moduleTags').each(function(){
                addModuleTag($(this).text());
            });
            var _url, params = {};
            if ($module.attr('id') === 'resume_work' || $module.attr('id') === 'resume_internship' || $module.attr('id') === 'resume_project') {
                // 工作经验、项目经验、校园活动模块使用技能特长标签
                _url = '/cvresume/skill/';
                var json = common.main.get_job_json(),
                    jobFunction = $("#jobFunction").find("span").text(),
                    _position;
                if(json.indexOf(jobFunction) > 0){
                    var list = JSON.parse(json);
                    is_break:for(var i in list) {
                        for(var j in list[i].children) {
                            for(var k in list[i].children[j].children) {
                                if (list[i].children[j].children[k].name.indexOf(jobFunction) >= 0) {
                                    position = list[i].children[j].name;
                                    break is_break;
                                }
                            }
                        }
                    }
                }
                params.position = _position;
            } else {
                _url = '/cvresume/module_tag/';
                params.moduleType = $module.attr('id');
            }
            params.language = 'zh';
            if(cvresume.info.language === "en" || common.main.getUrlParamsValue("language") === "en"){
                params.language = 'en';
            }
            $.get(_url, params, function(result){
                $('#moduleTags').html('');
                $("#moduleTags").append(result);
                render_moduletagbody();
            });
            // 重新渲染推荐技能dom的class
            function render_moduletagbody(){
                $("#addModuleTags .item-content").each(function(index, item){
                    $("#moduleTags a").each(function(_index, _item){
                        if($(_item).text().replace(/\s/g, "") == $(item).children("span").text().replace(/\s/g, "")) {
                            $(_item).addClass("checked");
                        }
                    });
                });
            }
        });
        // 点击添加
        $('#moduleTags').on('click','a',function(){
            if($("#addModuleTags .item-content").length >= add_moduletag_length) {
                return layer.msg('不能再添加了!');
            }
            var $this = $(this);
            if($this.hasClass("checked")) {
                return;
            }
            var	$text = $this.text();
            $this.addClass("checked");
            addModuleTag($text);
        });
        // 删除
        $('#addModuleTags').on("click", ".closeDefind", function(){
            var item = $(this).parent(".item-content");
            item.remove();
            $("#moduleTags a.checked").each(function(index, ele){
                if(item.children("span").text().replace(/\s/g, "") == $(ele).text().replace(/\s/g, "")) {
                    $(ele).removeClass("checked");
                }
            });
            $("#addModuleTags .item-length span").text(add_moduletag_length - $("#addModuleTags .item-content").length);
        });
        // 回车添加
        $("#moduleTags-modal .TagsClass_addinput").on("keydown", function(e){
            if(e.keyCode !== 13) {
                return;
            }
            manual_add($(this));
        });
        // 用户自定义点击添加
        $("#moduleTags-modal .TagsClass_addbtn").on('click',function(event){
            manual_add($(this).siblings(".TagsClass_addinput"));
        });
        // 手动添加
        function manual_add($this){
            if($("#addModuleTags .item-content").length >= add_moduletag_length) {
                return layer.msg('不能再添加了!');
            }
            var name = $this.val();
            if(name.replace(/\s+/g, '') === ""){
                layer.msg("亲，输入的标签不能为空噢~");
                return;
            }
            var is_add = false;
            $("#addModuleTags .item-content").each(function(index, ele){
                if(name.replace(/\s/g, "") == $(ele).children("span").text().replace(/\s/g, "")) {
                    is_add = true;
                }
            });
            if(is_add) {
                return layer.msg("亲，已经添加了这个标签噢~");
            }
            addModuleTag(name);
            $this.val('');
        }
        function addModuleTag(text){
            $("#addModuleTags").append('<div class="item-content"><span>'+ text +'</span><a href="javascript:void(0);" class="closeDefind"></a></div>');
            $("#addModuleTags .item-length span").text(add_moduletag_length - $("#addModuleTags .item-content").length);
        }
        // 取消保存
        $("#moduleTags-modal .modal-footer .cancel").on('click',function(){
            $module = null;
            $("#moduleTags-modal").modal('hide');
            $("#addModuleTags").find('.item-content').remove();
        });
        // 保存
        $("#moduleTags-modal .modal-footer .submit").on('click',function(){
            if ($moduleList) {
                $moduleList.find('.dd-tags span.moduleTags').remove();
                $('#moduleTags-modal .item-content').each(function(){
                    var text = $(this).children('span').text();
                    $moduleList.find('.dd-tags').append('<span class="moduleTags">'+ text +'</span>');
                });
                $moduleList.find('.inset_moduleTags').text($moduleList.find('span.moduleTags').length > 0 ? '修改标签' : '+添加标签');
            }
            $moduleList = null;
            $("#moduleTags-modal").modal('hide');
        });
    },
    // 通用模块 - 分栏占位
    baseItem_format_placeholder: function ($module) {
        // 没有特定模块时，遍历所有具有分栏属性的模块
        if (!$module) {
            $module = $('.wbdCv-baseStyle').find('.moduleItem[data-format]:not(.hidden)');
        }
        $module.each(function () {
            var $this = $(this);
            // 作品特殊处理
            if ($this.attr('id') === 'resume_portfolio') {
                cvmutual.main.workItem_image_placeholder();
                return;
            };
            var holder_length = 0;
            var $content = $this.find('dd');
            var $holder = $content.find('.placeholder');
            var module_format = $this.attr('data-format');
            var content_length = $content.find('.dd-content:not(.placeholder)').length;
            // 移除旧占位
            $holder.remove();
            if (!content_length || !module_format || module_format === 'full_column') {
                return;
            }
            // 计算占位数量
            switch (module_format) {
                case 'two_column':
                    holder_length = content_length % 2 ? 2 - content_length % 2 : 0;
                    break;
                case 'three_column':
                    holder_length = content_length % 3 ? 3 - content_length % 3 : 0;
                    break;
                default:
                    break;
            }
            // 插入占位节点
            for (let index = 0; index < holder_length; index++) {
                cvmutual.main.timeItem_create_child($this, true);
            }
        })
    },

    // 背景模块-----------------------------------------
    backgroundItem_operate: function () {
        var $module = $('#resume_background');
        var $backimg = $module.find('.background-con img');
        $module.find('.background-upload').on('click', function () {
            cvmutual.main.common_cropper_operate({
                act: 'background',
                image: $backimg.attr('data-src'),
                onOpen: function ($modal) {
                    // 添加自定义行为
                    var recovery = $('<a href="javascript:;" class="recovery">还原</a>');
                    $modal.find('.custom-act').html(recovery);
                    recovery.on('click', function () {
                        $modal.modal('hide');
                        $backimg.attr({
                            'src': '/resources/500d/newcvresume/images/4.png',
                            'data-src': '',
                        });
                    });
                    cvresume.main.delay_resume_save();
                },
                originUploadDone: function (src) {
                    $backimg.attr('data-src', src);
                    cvresume.main.delay_resume_save();
                },
                cropperDone: function (src) {
                    $backimg.attr('src', src);
                },
            });
        });
    },

    // 头像模块-----------------------------------------
    headItem_operate: function () {
        var cropper = {};           // 裁剪插件实例
        var originImage;            // 原图文件对象
        var $module = $('#resume_head');
        var $modal = $('#headimg-modal');
        var $headCon = $module.find('.head-con');
        var $headPreview = $module.find('.img-preview image');
        var $inputImage = $modal.find("#inputHeadImage");
        var $headCropper = $modal.find('#headimg-cropper');
        var $svg = $modal.find('#clone-clipcontent');
        var cropper_ismove = false;
        // 预加载原图
        if ($headPreview.attr('data-src')) {
            setTimeout(function () {
                var img = new Image();
                img.src = $headPreview.attr('data-src');
                img.onload = function () {};
            }, 5000);
        }
        // 实例化裁剪框方法
        var create_cropper = function () {
            var settings = {
                viewMode: 1,
                dragMode: 'none',
                aspectRatio: $headCon.width() / $headCon.height(),
                checkCrossOrigin: false,
                guides: false,
                background: false,
                center: false,
                movable: false,
                rotatable: false,
                scalable: false,
                zoomable: false,
                ready: function () {
                    cropper_ismove = false;
                    var style = $modal.find('.cropper-type-option li.checked').attr('data-style') || $module.attr('data-style');
                    style_to_cropper(style);
                },
                crop: function () {
                    cropper_ismove = true;
                    var CropBoxData = cropper.getCropBoxData();
                    $svg.find('clipPath').children().css('transform', 'scale('+ (CropBoxData.width / $headCon.width()) +')');
                },
            };
            cropper = new Cropper($headCropper.find('img')[0], settings);
        }
        // 模块更新状态
        var set_dataStyle = function (data) {
            $module.attr("data-style", data);
            $module.find('.toolbar_headtype_con .headtype_option li[data-style="'+ data +'"]').addClass('checked').siblings().removeClass('checked');
            var svg = $module.find('svg').attr('clip-path', 'url(#'+ data +')');
            svg.find('use').attr('xlink:href', '#'+ data +'-path');
            var height = 120;
            if ('rectangle' === data) {
                height = 150;
            }
            if ('hexagon' === data) {
                height = 138;
            }
            svg.find('image').attr({
                'height': height,
            });
        }
        // 同步裁剪样式到弹窗
        var style_to_cropper = function (style) {
            var style = style || $module.attr('data-style');
            var CropBoxData = cropper.getCropBoxData();
            var left = CropBoxData.left;
            var top = CropBoxData.top;
            // 切换裁剪框比例
            switch (style) {
                case 'round':
                    cropper.setAspectRatio(1);
                    break;
                case 'rectangle':
                    cropper.setAspectRatio(120 / 150);
                    break;
                case 'square':
                    cropper.setAspectRatio(1);
                    break;
                case 'squareDiagonalRadius':
                    cropper.setAspectRatio(1);
                    break;
                case 'pentagon':
                    cropper.setAspectRatio(1);
                    break;
                case 'hexagon':
                    cropper.setAspectRatio(120 / 138);
                    break;
            }
            CropBoxData = cropper.getCropBoxData();
            // 处理裁剪形状在裁剪框内尺寸不符
            var $clonePath = $('#'+ style).clone();
            var clipid = 'head-modal-' + style;
            $clonePath.attr('id', clipid);
            $svg.html($clonePath);
            $svg.find('clipPath').children().attr('id', '').css('transform', 'scale('+ (CropBoxData.width / $headCon.width()) +')');
            $headCropper.find('.cropper-view-box').css('clip-path', 'url(#'+ clipid +')');
            // 手动移动过裁剪框后位置固定
            if (cropper_ismove) {
                cropper.setCropBoxData({
                    left: left,
                    top: top,
                });
            }
            $modal.find('.cropper-type-option li[data-style="'+ style +'"]').addClass('checked').siblings().removeClass('checked');
        }
        // 工具栏生成
        cvmutual.main.create_resume_tool($("#headItemTool"), $headCon);
        // 调用更换头像弹框
        $headCon.on('click', function () {
            if ($("html").hasClass("ie9")) {
                return layer.msg('当前浏览器内核为ie9，无法上传图片，请更换浏览器切换至极速模式，体验更多功能');
            }
            var origin_src = $headPreview.attr('data-src').replace(/^http(s)?:\/\/(.*?)\//, location.protocol+'//'+location.host+'/image_proxy/');
            // 首次打开上传图片
            if (!origin_src) {
                $inputImage.click();
            } else {
                $headCropper.html($('<img src="'+ origin_src +'" alt="" />'));
                create_cropper();
                $modal.modal("show");
            }
        });
        // 更换头像显示方式操作
        $module.find('.toolbar_headtype_con .roundToggleBtn').on('click', function(){
            $module.addClass('hidden');
            cvresume.main.delay_resume_save();
        });
        $module.find('.toolbar_headtype_con .headtype_option li[data-style="'+ $module.attr('data-style') +'"]').addClass('checked').siblings().removeClass('checked');
        $modal.find('.cropper-type-option li[data-style="'+ $module.attr('data-style') +'"]').addClass('checked').siblings().removeClass('checked');
        $module.find('.toolbar_headtype_con .headtype_option li').on('click', function (event) {
            event.stopPropagation();
            var data = $(this).attr("data-style");
            set_dataStyle(data);
            $modal.find('.cropper-type-option li[data-style="'+ data +'"]').addClass('checked').siblings().removeClass('checked');
            $module.find('.baseItem-toolbar .set-con').css({ 'height': 0, 'overflow': 'hidden', });
            cvresume.main.delay_resume_save();
        });
        // 选择图片进行裁剪
        $inputImage.on('change', function () {
            var file = this.files[0];
            $(this).val('');
            if (!file) {
                return;
            }
            if (file.size > 1024 * 1024 * 10) {
                return layer.msg('图片最大不能超过10MB~');
            }
            originImage = file;
            var img = new Image();
            var reader = new FileReader();
            reader.onload = function () {
                img.src = reader.result;
                // 重新选择图片
                if (cropper.ready) {
                    cropper.replace(reader.result);
                } else {
                    $headCropper.html($(img));
                    create_cropper();
                }
                $modal.modal("show");
            }
            reader.readAsDataURL(file);
        });
        // 选择裁剪类型
        $modal.find('.cropper-type-option li').on('click', function () {
            if ($(this).hasClass('checked') || !cropper.ready) {
                return;
            }
            style_to_cropper($(this).attr('data-style'));
        });
        // 保存
        $modal.find('.button.submit').on('click', function () {
            var $this = $(this);
            if ($this.hasClass('disabled')) {
                return;
            }
            $this.addClass('disabled');
            if (!cropper.ready) {
                return;
            }
            // 上传原图
            if (originImage) {
                cvmutual.main.upload_cropper_image({
                    value: originImage,
                    fileName: originImage.name,
                    success: function (src) {
                        $headPreview.attr('data-src', src);
                    }
                });
            }
            layer.load();
            // 上传裁剪的图片
            var get_canvas = cropper.getCroppedCanvas();
            cvmutual.main.upload_cropper_image({
                value: get_canvas.toDataURL('image/jpeg', 0.7),
                fileName: '1.jpeg',
                success: function (src) {
                    $headPreview.attr({
                        'href': src,
                        'xlink:href': src,
                    });
                    set_dataStyle($modal.find('.cropper-type-option li.checked').attr('data-style'));
                },
                complete: function () {
                    $this.removeClass('disabled');
                    originImage = null;
                    $modal.modal('hide');
                }
            });
        });
    },

    // 时间模块------------------------------------------
    timeItem_operate: function () {
        // 生成工具栏
		cvmutual.main.timeItem_datetime();
        cvmutual.main.reusme_autocompleter();
        // 只有一项，不生成子模块工具栏
        $('.wbdCv-baseStyle .timeItem, .wbdCv-baseStyle .descItem').each(function () {
            $(this).find('.moduleItemList').length > 1 && cvmutual.main.timeItem_child_tool_create($(this));
        });
        // 创建子模块
        $('.wbdCv-baseStyle').on('click', '.timeItem .baseItem-toolbar .add, .descItem .baseItem-toolbar .add', function (event) {
            cvmutual.main.timeItem_create_child($(this).parents('.moduleItem'));
        });
        // 子模块 - 上移动
		$('.wbdCv-baseStyle').on('click', '.timeItem .move-downup .up, .descItem .move-downup .up', function (event) {
			var $this = $(this).parents(".move-downup").parents(".dd-content");
			cvmutual.main.set_timeItem_moveup($this);
            cvresume.main.delay_resume_save();
		});
		// 子模块 - 下移动
		$('.wbdCv-baseStyle').on('click', '.timeItem .move-downup .down, .descItem .move-downup .down', function (event) {
			var $this = $(this).parents(".move-downup").parents(".dd-content");
			cvmutual.main.set_timeItem_movedown($this);
            cvresume.main.delay_resume_save();
        });
        // 子模块 - 删除
        $('.wbdCv-baseStyle').on('click', '.timeItem .move-downup .delete, .descItem .move-downup .delete', function (event) {
            var $module = $(this).parents('.moduleItem');
            if ($module.find('.moduleItemList').length === 1) {
                return layer.msg('只剩一项了不能删除了呀~');
            }
            $(this).parents('.moduleItemList').remove();
            // 只剩一项，删除子模块工具栏
            $module.find('.moduleItemList').length === 1 && $module.find('.moduleItemList .move-downup').remove();
            cvresume.main.resume_page();
            cvresume.main.delay_resume_save();
        });
    },
    // 时间模块 - 创建子模块（isholder是否用于分栏占位）
    timeItem_create_child: function($module,isholder){
        cvmutual.main.reusme_autocompleter();
        var $this = $module.find(".dd-content:first-child");
        var $lastchild = $module.find(".dd-content:last-child");
        var $item = $this.clone();
        // 重置内容 删除文本节点、id、子模块标签
        $item.find('.dd-logo').removeAttr('data-style').find('img').attr({ 'src': '/resources/500d/newcvresume/images/3.png', 'data-src': '' });
        $item.find(".dd-title .time div[contenteditable]").html("");
        $item.find(".dd-title .company div").html("");
        $item.find(".dd-title .post div").html("");
        $item.find(".dd-text div").html("");
        $item.find('.dd-tags span.moduleTags').remove();
        $item.find('.dd-tags .inset_moduleTags').text('+添加标签');
        if (isholder) $item.addClass('placeholder');
        $item.insertAfter($lastchild);
        cvmutual.main.timeItem_child_tool_create($module);
        cvresume.main.resume_page();
        cvresume.main.delay_resume_save();
    },
    // 子模块工具栏
    timeItem_child_tool_create: function ($module) {
        var $moduleList = $module.find('.moduleItemList');
        var tool = '<div class="move-downup">'+
                        '<a class="up save_opt preItem500dtongji" title="上移" data_track="PC-在线制作-'+ cvmutual.info.resume_type +'编辑页-中间简历编辑-{0}-子模块上移"></a>'+
                        '<a class="down save_opt preItem500dtongji" title="下移" data_track="PC-在线制作-'+ cvmutual.info.resume_type +'编辑页-中间简历编辑-{0}-子模块下移"></a>'+
                        '<a class="delete preItem500dtongji" title="删除" data_track="PC-在线制作-'+ cvmutual.info.resume_type +'编辑页-中间简历编辑-{0}-子模块删除"></a>'+
                    '</div>';
        // 工具栏已存在不插入
        $moduleList.each(function () {
            if (!$(this).find('.move-downup').length) {
                $(this).prepend($(tool));
            }
        });
    },
    // 时间模块 - 时间选择器
    timeItem_datetime: function () {
        // 时间模块 时间内容点击
        $('.wbdCv-baseStyle').on('click', '.timeItem .dd-title .time', function (event) {
            var $this = $(this);
            var $module = $this.parents('.timeItem');
            var $time = $this.find('div[contenteditable]');
            // 生成时间选择器节点
            if ($this.find('.date_select').length) {
                return;
            }
            $('.wbdCv-baseStyle .timeItem .dd-title .date_select').remove();
            cvmutual.main.create_resume_tool($('#dateTool'), $time);
            // 选择器日期生成
            var $start = $this.find('.time-start');
            var $end = $this.find('.time-end');
            var $date = $this.find('.date_select');
            var $begin_panel = $date.find('.start_time');
            var $end_panel = $date.find('.end_time');
            // 定义事件选择器的最大值 & 最小值
            var __year = new Date().getFullYear();
            var rang = {
                years_max: __year + 4,    // 根据当前时间定位到年份最大值
                years_min: __year - 40,   // 根据年份最大值定位年份最小值
            };
            // 判断年份不可点
            var decide_able = function () {
                var begin_year_rang = $begin_panel.find('.years_rang').text().split('-');
                var end_year_rang = $end_panel.find('.years_rang').text().split('-');
                var begin_time = $start.text();
                // 开始时间上一页按钮显示判断
                $begin_panel.find('.prev_years').toggle(begin_year_rang[0] > rang.years_min);
                // 开始时间下一页按钮显示判断
                $begin_panel.find('.next_years').toggle(begin_year_rang[1] < rang.years_max);
                // 结束时间上一页按钮显示判断
                $end_panel.find('.prev_years').toggle(end_year_rang[0] > rang.years_min);
                // 结束时间下一页按钮显示判断
                if (end_year_rang[1] >= rang.years_max) {
                    var present_text = (cvresume.info.language === "en" || common.main.getUrlParamsValue("language") === "en") ? 'present' : '至今';
                    $end_panel.find('.year_body span:last').text(present_text);
                    $end_panel.find('.next_years').hide();
                } else {
                    $end_panel.find('.next_years').show();
                }
                if (begin_time.length) {
                    begin_time = begin_time.split('.')[0];
                    $end_panel.find('.year_body span').each(function (index, elem) {
                        var $this = $(elem);
                        $this.toggleClass('unable', Number($this.text()) < begin_time);
                    });
                }
            }
            // data-date 当前面板已选时间标识
            $date.find('[data-type="time-start"]').attr('data-date', $start.text());
            $date.find('[data-type="time-end"]').attr('data-date', $end.text());
            // 重新设置日期
            if ($start.text()) {
                var begin_time = isNaN($start.text().split('.')[0]) ? 0 : $start.text().split('.')[0];
                var end_time = $end.text().indexOf('.') > 0 ? $end.text().split('.') : $end.text();
                var begin_rang_index = Math.floor((begin_time - rang.years_min) / 9);
                var begin_panel_min = begin_rang_index * 9 + rang.years_min;
                var begin_panel_max = begin_panel_min + 8;
                var begin_obj = cvmutual.main.set_time_year(begin_panel_min, begin_panel_max, rang);
                var end_panel_min, end_panel_max;
                if (typeof end_time === 'string') {
                    end_time = __year;
                    end_panel_max = end_time + 4;
                    end_panel_min = end_panel_max - 8;
                } else {
                    end_panel_min = begin_rang_index * 9 + rang.years_min;
                    end_panel_max = begin_panel_min + 8;
                }
                var end_obj = cvmutual.main.set_time_year(end_panel_min, end_panel_max, rang);
                $begin_panel.find('.years_rang').text(begin_obj.title);
                $begin_panel.find('.year_body').html(begin_obj.content);
                $end_panel.find('.years_rang').text(end_obj.title);
                $end_panel.find('.year_body').html(end_obj.content);
            }else{
                var time_max = rang.years_max;
                var time_min = time_max - 8;
                var time_obj = cvmutual.main.set_time_year(time_min, time_max, rang);
                $begin_panel.find('.years_rang').text(time_obj.title);
                $begin_panel.find('.year_body').html(time_obj.content);
                $end_panel.find('.years_rang').text(time_obj.title);
                $end_panel.find('.year_body').html(time_obj.content).find('span:last').text('至今');
            }
            // 渲染日期列表
            $date.find('[data-type="time-start"]').addClass('current').siblings().removeClass('current');
            $begin_panel.removeClass('hide').siblings().addClass('hide');
            $begin_panel.find('.year_select').show().siblings().hide();
            decide_able();
            // 日期选择器事件绑定
            // 选择开始 / 结束时间 点击
            $date.on('click', '.date_type a', function () {
                var $t = $(this);
                var $panel = $date.find('.select_panel').eq($t.index());
                $t.addClass('current').siblings().removeClass('current');
                $panel.removeClass('hide').siblings().addClass('hide');
                $panel.find('.year_select').show().siblings().hide();
                decide_able();
            });
            // 年份上下页 点击
            $date.on('click', '.year_select .year_header a', function () {
                var $t = $(this);
                var year_rang = $t.siblings('.years_rang').text().split('-');
                var min, max, year_obj;
                if ($t.hasClass('prev_years')) {
                    max = Number(year_rang[0]) - 1;
                    min = max - 8;
                    year_obj = cvmutual.main.set_time_year(min, max, rang);
                } else if ($t.hasClass('next_years')) {
                    min = Number(year_rang[1]) + 1;
                    max = min + 8;
                    year_obj = cvmutual.main.set_time_year(min, max, rang);
                }
                $t.siblings('.years_rang').text(year_obj.title);
                $t.parents('.year_select').find('.year_body').html(year_obj.content);
                decide_able();
            });
            // 选择年份 点击
            $date.on('click', '.year_select .year_body span', function () {
                var $t = $(this);
                var text = $t.text();
                var $begin = $date.find('.date_type a').eq(0);
                var $current_type = $date.find('.date_type .current');
                var time_type = $current_type.attr('data-type');
                var $month_select = $t.parents('.select_panel').find('.month_select');
                if ($t.hasClass('unable')) {
                    return;
                }
                $t.addClass('current').siblings().removeClass('current');
                $month_select.show().find('.month_header').text(text);
                // 判断为至今时，不显示月份选择
                if (['至今', 'present'].indexOf(text) > -1) {
                    $current_type.attr('data-date', text);
                    // 模块时间设置
                    if (!$time.children().length) {
                        $time.html('<i class="time-start"></i>-<i class="time-end"></i>');
                    }
                    $time.find('.' + time_type).text(text);
                    // 日期选择完成
                    if ($begin.attr('data-date')) {
                        $date.remove();
                        cvmutual.main.timeItem_child_sort($module);
                        cvresume.main.delay_resume_save();
                    } else {
                        $begin.click();
                    }
                } else {
                    // 显示月份选择
                    $t.addClass('current');
                    $month_select.show().find('.month_header').text(text);
                }
                decide_able();
            });
            // 选择月份 点击
            $date.on('click', '.month_select .month_body span', function () {
                var $t = $(this);
                var $begin = $date.find('.date_type a').eq(0);
                var $end = $date.find('.date_type a').eq(1);
                var $current_type = $date.find('.date_type .current');
                var time_type = $current_type.attr('data-type');
                var date = $t.parents('.select_panel').find('.year_select .current').text() + '.' + $t.attr('data-value');
                // 模块时间设置
                if (!$time.children().length) {
                    $time.html('<i class="time-start"></i>-<i class="time-end"></i>');
                }
                $time.find('.' + time_type).text(date);
                $current_type.attr('data-date', date);
                if (!$begin.attr('data-date')) {
                    $begin.click();
                } else if (!$end.attr('data-date')) {
                    $end.click();
                } else {
                    $date.remove();
                    cvmutual.main.timeItem_child_sort($module);
                    cvresume.main.delay_resume_save();
                }
                decide_able();
            });
        });
    },
    // 时间模块 - 自动按由近到远排序
    timeItem_child_sort: function ($module) {
        if (!$module || !$module.hasClass('timeItem')) {
            return;
        }
        var $moduleList = $module.find('.moduleItemList');
        if ($moduleList.length < 2) {
            return;
        }
        var sort = [];
        // 获取子模块时间和节点
        $moduleList.each(function (index, elem) {
            var obj = {
                elem: elem,
            }
            var start_text = $(elem).find('.time-start').text();
            var end_text = $(elem).find('.time-end').text();
            // 转时间戳 兼容ios
            var start_date = new Date(start_text.replace('.', '/'));
            var end_date = new Date(end_text.replace('.', '/'));
            obj.start = start_date === 'Invalid Date' ? 0 : start_date.getTime() / 1000;
            obj.end = end_date === 'Invalid Date' ? 0 : end_date.getTime() / 1000;
            if (['至今', 'present'].indexOf(end_text) > -1) {
                obj.end = 'present';
            }
            sort.push(obj);
        });
        // 重新排序
        sort = sort.sort(function (a, b) {
            return b.start - a.start;
        });
        sort = sort.sort(function (a, b) {
            // 结束时间为至今时，置顶
            if (a.end === 'present') {
                a.end = new Date('2099/12').getTime() / 1000;
                return b.end - a.end;
            }
        });
        // 调整节点
        sort.forEach(function (item) {
            $module.find('dl dd').append($(item.elem));
        });
    },
    // 教育背景模块 学校自动填写
    reusme_autocompleter:function(){
	    $('.eduItem .company div[contenteditable]').autocompleter({
	    	source: school,  	
	    	limit: 6,
	    	cache: true,
	        focusOpen: false,
	        hiliteColorMatches: true,
	        template: ' <span>{{ label }}</span>'	    	
	    });			
	},
    // 时间模块 - 子模块上移动
    set_timeItem_moveup: function (obj) {
		var this_obj = $(obj);
		var prev_obj = $(obj).prev();
	    if(prev_obj.length == 0){
	        layer.msg("第一行,无法移动");
	    }else{
	        prev_obj.before(this_obj);
	    }		
    },
    // 时间模块 - 子模块下移动
	set_timeItem_movedown: function (obj) {
		var this_obj = $(obj);
		var next_obj = $(obj).next();
	    if(next_obj.length == 0){
	        layer.msg("最后一行,无法移动");
	    }else{
	        next_obj.after(this_obj);
	    }	
	},
    // 时间选择器
    set_time_year:function(min,max,rang){
        var obj = {}, _max, _min;
        if(Number(max) > Number(rang.years_max)){
            _max = rang.years_max;
            _min = rang.years_max - 8;
        }else if(Number(min) < Number(rang.years_min)){
            _min = rang.years_min;
            _max = rang.years_min + 8;
        }else{
            _max = max;
            _min = min;
        }
        obj.title = _min + '-' + _max;
        obj.content = '';
        for(var i=_min; i<=_max; i++){
            obj.content += '<span>'+ i +'</span>';
        }
        return obj;
    },

    // 作品模块------------------------------------------
    workItem_operate: function () {
        var cropper = {};           // 裁剪插件实例
        var originImage;            // 原图文件对象
        var $module = $('#resume_portfolio');
        var $moduleItem;            // 当前正在编辑的作品子模块
        var $modal = $('#portfolio-modal');
        var $inputWorkImage = $modal.find('#inputWorkImage');
        var $workCropper = $modal.find('#workimg-cropper');
        var $editimage = $modal.find('#portfolio-edit-image');
        var $editlink = $modal.find('#portfolio-edit-link');
        // 子模块删除按钮
        $module.find('.work-con-link .link-list, .work-con .work-list').append(cvmutual.main.baseItem_delete_tool());
        // 作品拖动
        $module.sortable({
            items: ".work-list",
            handle: ".work-img",
            cursor: "grabbing",
            helper: "clone",
            scrollSensitivity: 50,
            scrollSpeed: 30,
            tolerance: "pointer",
		 	activate:function(event,ui){
                ui.item.siblings('.placeholder').hide();
            },
            update: function (event, ui) {
                cvresume.main.delay_resume_save();
            },
            stop: function(event, ui){
                ui.item.siblings('.placeholder').show();
            }
        });
        // 实例化裁剪框方法
        var cropper_ismove = false;
        var create_cropper = function ($img) {
            $workCropper.html($img);
            // 生成并初始化裁剪框方法
            var settings = {
                viewMode: 1,
                aspectRatio: Number($modal.find('.cropper-ratio-select .select-name').attr('data-value')) || NaN,
                dragMode: 'none',
                checkCrossOrigin: false,
                guides: false,
                background: false,
                center: false,
                movable: false,
                rotatable: false,
                scalable: false,
                zoomable: false,
                ready: function () {
                    cvmutual.main.common_cropper_tools(cropper, $modal);
                },
                crop: function () {
                    cropper_ismove = true;
                },
            };
            cropper = new Cropper($workCropper.find('img')[0], settings);
        }
        // 重置弹窗内容
        var reset_form = function () {
            if (cropper.ready) {
                cropper.clear();
                cropper = {};
                $workCropper.html('').removeAttr('cropper-src origin-src');
            }
            $modal.find('.form-title').html('');
            $modal.find('.form-title').val('');
            $modal.find('.form-content').html('');
            $modal.find('.form-tags input').val('');
            $modal.find('.form-tags .tags-list').remove();
            $modal.find('.portfolio-link-preview .link-title').html('www.example.com');
            $modal.find('.portfolio-link-preview .link-content').html('这里是作品描述');
            $moduleItem = null;
            cvmutual.main.common_cropper_tools(cropper, $modal);
        }
        // 切换作品类型 图片/链接
        var tab_show = function (index) {
            $modal.find('.portfolio-tab .textbtn').eq(index).addClass('checked').siblings('.textbtn').removeClass('checked');
            $modal.find('.portfolio-edit').eq(index).show().siblings('.portfolio-edit').hide();
        }
        $modal.find('.portfolio-tab .textbtn').on('click', function () {
            tab_show($(this).index());
        });
        // 打开作品编辑弹窗 - 新增
        $module.on('click', '.baseItem-toolbar .add, .baseItem-null, .work-list.placeholder', function () {
            tab_show(0);
            reset_form();
            $modal.modal('show');
        });
        // 打开作品编辑弹窗 - 二次编辑
        $module.on('click', '.work-edit', function () {
            reset_form();
            var $this = $(this);
            $moduleItem = $this.parents('.moduleItemList');
            var imgwork = $moduleItem.hasClass('work-list');
            var linkwork = $moduleItem.hasClass('link-list');
            if (imgwork) {
                tab_show(0);
                var src = $moduleItem.find('.img-preview img').attr('src');
                var origin_src = $moduleItem.find('.img-preview img').attr('data-src').replace(/^http(s)?:\/\/(.*?)\//, location.protocol+'//'+location.host+'/image_proxy/');
                $workCropper.attr({
                    'cropper-src': src,
                    'origin-src': origin_src,
                });
                create_cropper($('<img src="'+ origin_src +'" alt="" />'));
                cvmutual.main.workItem_image_to_modal($moduleItem);
            }
            if (linkwork) {
                tab_show(1);
                cvmutual.main.workItem_link_to_modal($moduleItem);
            }
            $modal.modal('show');
        }); 
        // 选择图片进行裁剪
        $inputWorkImage.on('change', function () {
            var file = this.files[0];
            $(this).val('');
            if (!file) {
                return;
            }
            if (file.size > 1024 * 1024 * 50) {
                return layer.msg('图片最大不能超过50MB~');
            }
            cropper_ismove = true;
            originImage = file;
            var img = new Image();
            var reader = new FileReader();
            reader.onload = function () {
                img.src = reader.result;
                // 重新选择图片
                if (cropper.ready) {
                    cropper.replace(reader.result);
                } else {
                    create_cropper($(img));
                }
                $modal.modal("show");
            }
            reader.readAsDataURL(file);
        });
        // 弹窗内作品标题/描述字数限制
        common.main.limit_input_length($editimage.selector + ' .form-title', 20);
        common.main.limit_input_length($modal.selector + ' .form-content', 50);
        // 图片作品标题描述空状态监听
        $module.on('blur', '.work-title, .work-text', function () {
            if (!$(this).text().length) {
                $(this).addClass('hidden');
            }
        })
        // 弹窗内作品标题禁止回车
        $editimage.find('.form-title').on('keydown', function (event) {
            if (event.keyCode === 13) return false;
        });
        // 弹窗内链接作品预览
        $editlink.find('.form-title').on('input', function () {
            var val = $(this).val();
            $editlink.find('.portfolio-link-preview .link-title').html(val ? 'http://' + val.replace(/^https?:\/\//, '') : 'www.example.com');
        });
        $editlink.find('.form-content').on('input', function () {
            var html = $(this).html();
            $editlink.find('.portfolio-link-preview .link-content').html(html || '这里是作品描述');
        });
        // 弹窗内作品描述字数监听
        $modal.find('.form-content').on('input', function () {
            $(this).parents('.portfolio-form').find('.words-num > span').text($(this).text().length);
        });
        // 作品标签添加
        var $taginput = $modal.find('.form-tags input');
        var addtag = function (val) {
            var have = false;
            $modal.find('.form-tags .tags-list').each(function () {
                if (have) return false;
                have = $(this).text() === val;
            });
            if (have) {
                return layer.msg('您已添加此标签');
            }
            $taginput.before($('<span class="tags-list">'+ val +'<i class="del"></i></span>'));
        }
        $taginput.on('keydown', function (event) {
            if (event.keyCode === 13) {
                addtag($(this).val());
                $(this).val('');
            }
        });
        $modal.find('.tags-prepare > span').on('click', function () {
            addtag($(this).text());
        });
        $modal.on('click', '.tags-list > .del', function () {
            $(this).parent().remove();
        });
        // 保存
        var save_reset = function () {
            $modal.find('.button.submit').removeClass('disabled');
            originImage = null;
            $modal.modal('hide');
        }
        $modal.find('.button.submit').on('click', function () {
            var $this = $(this);
            if ($this.hasClass('disabled')) {
                return;
            }
            $this.addClass('disabled');
            var imgwork = $editimage.is(':visible');
            var linkwork = $editlink.is(':visible');
            // 图片作品添加校验
            if (imgwork) {
                if (!cropper.ready) {
                    save_reset();
                    return layer.msg('请上传作品图片~');
                }
                var timer = null;
                var complete = 1;
                // 已操作过裁剪框
                if (cropper_ismove) {
                    // 上传原图
                    if (originImage) {
                        complete += 1;
                        cvmutual.main.upload_cropper_image({
                            value: originImage,
                            fileName: originImage.name,
                            success: function (src) {
                                $workCropper.attr('origin-src', src);
                            },
                            complete: function () {
                                complete--;
                            }
                        });
                    }
                    layer.load();
                    // 上传裁剪的图片
                    var get_canvas = cropper.getCroppedCanvas();
                    cvmutual.main.upload_cropper_image({
                        value: get_canvas.toDataURL('image/jpeg', 0.9),
                        fileName: '1.jpeg',
                        success: function (src) {
                            $workCropper.attr('cropper-src', src);
                        },
                        complete: function () {
                            complete--;
                        }
                    });
                } else {
                    complete = 0;
                }
                // 轮询监听是否上传成功
                timer = setInterval(function () {
                    if (complete <= 0) {
                        clearInterval(timer)
                        cvmutual.main.workItem_image_set($moduleItem);
                        save_reset();
                    }
                }, 60);
            }
            // 链接作品添加校验
            if (linkwork) {
                var title = $editlink.find('.form-title').val().replace(/\s+/g, '');
                if (!title) {
                    save_reset();
                    return layer.msg('请填写作品链接~');
                }
                cvmutual.main.workItem_link_set($moduleItem);
                save_reset();
            }
        });
    },
    // 作品模块 - 图片作品 - 弹窗回显内容
    workItem_image_to_modal: function ($module_item) {
        var $form = $('#portfolio-modal #portfolio-edit-image');
        // 内容回显
        var title = $module_item.find('.work-title').html();
        var content = $module_item.find('.work-text').html();
        $form.find('.form-title').html(title);
        $form.find('.form-content').html(content);
        $form.find('.words-num > span').text($form.find('.form-content').text().length);
        $module_item.find('.work-tags > span').each(function (index, element) {
            $form.find('.form-tags input').before($('<span class="tags-list">'+ $(element).text() +'<i class="del"></i></span>'))
        });
    },
    // 作品模块 - 图片作品 - 保存渲染内容
    workItem_image_set: function ($module_item) {
        var $module = $('#resume_portfolio');
        var $form = $('#portfolio-modal #portfolio-edit-image');
        var html_template = function () {
            var src = $form.find('#workimg-cropper').attr('cropper-src');
            var originsrc = $form.find('#workimg-cropper').attr('origin-src');
            var title = $form.find('.form-title').html();
            var title_ishidden = $form.find('.form-title').text().length ? '' : 'hidden';
            var content = $form.find('.form-content').html();
            var content_ishidden = $form.find('.form-content').text().length ? '' : 'hidden';
            var tags = '';
            var tags_ishidden = $form.find('.form-tags .tags-list').length ? '' : 'hidden';
            $form.find('.form-tags .tags-list').each(function (index, element) {
                tags += '<span>'+ $(element).text() +'</span>';
            });
            var html = '<span class="work-img">'+
                            '<div class="work-img-inner">'+
                                '<div class="img-preview">'+
                                    '<img src="'+ src +'" data-src="'+ (originsrc || src) +'" alt="" />'+
                                '</div>'+
                                '<div class="span-hover"></div>'+
                            '</div>'+
                        '</span>'+
                        '<div class="work-title '+ title_ishidden +'" contenteditable="true">'+ title +'</div>'+
                        '<div class="work-text '+ content_ishidden +'" contenteditable="true">'+ content +'</div>'+
                        '<div class="work-tags ' + tags_ishidden +'">'+ tags +'</div>'+
                        '<a class="work-edit" title="编辑"></a>';
            return html;
        }
        if ($module_item) {
            $module_item.html(html_template());
        } else {
            $module_item = $('<div class="work-list moduleItemList">'+ html_template() +'</div>');
            $module.find('.work-con-img').append($module_item);
        }
        $module_item.append(cvmutual.main.baseItem_delete_tool());
        $module.find('.baseItem-null').hide();
        // 分栏占位计算
        cvmutual.main.baseItem_format_placeholder($module);
        cvresume.main.resume_page();
    },
    // 作品模块 - 图片作品 - 作品占位计算
    workItem_image_placeholder: function () {
        var $work = $('#resume_portfolio');
        var length = $work.find('.work-list:not(.placeholder)').length;
        var holder_length = 0;
        $('.work-list.placeholder').remove();
        if (length) {
            switch ($work.attr('data-format')) {
                case 'two_column':
                    holder_length = length % 2 ? 2 - length % 2 : 0;
                    break;
                case 'three_column':
                    holder_length = length % 3 ? 3 - length % 3 : 0;
                    break;
                default:
                    break;
            }
            var holder = '<div class="work-list placeholder">上传作品</div>'
            for (let index = 0; index < holder_length; index++) {
                $(holder).appendTo($work.find('.work-con-img'));
            }
        }
    },
    // 作品模块 - 链接作品 - 弹窗回显内容
    workItem_link_to_modal: function ($module_item) {
        var $form = $('#portfolio-modal #portfolio-edit-link');
        // 内容回显
        var title = $module_item.find('.work-title').text();
        var content = $module_item.find('.work-text').html();
        $form.find('.form-title').val(title);
        $form.find('.form-content').html(content);
        $form.find('.portfolio-link-preview .link-title').html(title);
        $form.find('.portfolio-link-preview .link-content').html(content);
    },
    // 作品模块 - 链接作品 - 保存渲染内容
    workItem_link_set: function ($module_item) {
        var $module = $('#resume_portfolio');
        var $form = $('#portfolio-modal #portfolio-edit-link');
        var html_template = function () {
            var title = $form.find('.form-title').val();
            var title_ishidden = title.length ? '' : 'hidden';
            var content = $form.find('.form-content').html();
            var content_ishidden = $form.find('.form-content').text().length ? '' : 'hidden';
            var html =  '<a class="work-title '+ title_ishidden +'" href="http://'+ title.replace(/^https?:\/\//, '') +'" target="_blank">'+ title +'</a>'+
                        '<div class="work-text '+ content_ishidden +'" contenteditable="true">'+ content +'</div>'+
                        '<a class="work-edit" title="编辑"></a>';
            return html;
        }
        if ($module_item) {
            $module_item.html(html_template());
        } else {
            $module_item = $('<div class="link-list moduleItemList">'+ html_template() +'</div>');
            $module.find('.work-con-link').append($module_item);
        }
        $module_item.append(cvmutual.main.baseItem_delete_tool());
        $module.find('.baseItem-null').hide();
        cvresume.main.resume_page();
    },

    // 技能特长模块------------------------------------------
    skillItem_operate: function () {
        var $module = $('#resume_skill');
        var $modal = $('#skills-modal');
        var $skilllist = $modal.find('#skillistBody');
        var $readyadd = $modal.find('#addedSkill');
        var resume_language = cvresume.info.language || common.main.getUrlParamsValue('language') || 'zh';
        var language_level = cvmutual.info.langBar;
        var skill_maxlength = 10;
        // 子模块删除按钮
        $module.find('.skill-con .skill-list').append(cvmutual.main.baseItem_delete_tool());
        // 检查选中状态
        var check_add_status = function () {
            $skilllist.find('a').each(function (j, elem) {
                var name = $(elem).text().replace(/(^\s+|\s+$)/g, '');
                $(elem).removeClass('checked');
                $readyadd.find('.item-content').each(function (i, element) {
                    if ($(element).find('.item-skill-name').text().replace(/(^\s+|\s+$)/g, '') === name) {
                        $(elem).addClass('checked');
                        return false;
                    }
                });
            });
            $readyadd.find('.item-length span').text(skill_maxlength - $readyadd.find('.item-content').length);
        }
        // 添加节点
        var add_skill = function (name) {
            if ($readyadd.find('.item-content').length >= skill_maxlength) {
                layer.msg('不能再添加了');
                return false;
            }
            cvmutual.main.skillItem_update_readyadd(name);
            check_add_status();
            return true;
        }
        // 技能特长拖动
        $module.sortable({
            items: ".skill-list",
            cancel: ".skill-title",
            cursor: "grabbing",
            helper: "clone",
            scrollSensitivity: 50,
            scrollSpeed: 30,
            tolerance: "pointer",
            update: function (event, ui) {
                cvresume.main.delay_resume_save();
            },
        });
        // 技能图形鼠标移入交互
        $module.on('mouseenter', '.skill-list:not(.ui-sortable-helper) .skill-slider', function () {
            var $this = $(this);
            var mouseenter_outtime;
            var current_level = $this.attr('data_level');
            // 预览数值状态
            var preview_level = function (cur, average, good, advanced) {
                clearTimeout(mouseenter_outtime);
                mouseenter_outtime = setTimeout(function(){
                    if (cur < average) {
                        $this.attr('data_level', 'average');
                        $this.children('span').text(language_level['average'][cvresume.info.language]);
                    }
                    if (cur >= average) {
                        $this.attr('data_level', 'good');
                        $this.children('span').text(language_level['good'][cvresume.info.language]);
                    }
                    if (cur >= good) {
                        $this.attr('data_level', 'advanced');
                        $this.children('span').text(language_level['advanced'][cvresume.info.language]);
                    }
                    if (cur >= advanced) {
                        $this.attr('data_level', 'expert');
                        $this.children('span').text(language_level['expert'][cvresume.info.language]);
                    }
                    if ($this.attr('data_level') !== current_level) {
                        $this.css('opacity', 0.7);
                    } else {
                        $this.removeAttr('style');
                    }
                }, 16);
            }
            // 设置状态
            var set_level = function () {
                clearTimeout(mouseenter_outtime);
                current_level = $this.attr('data_level');
                $this.removeAttr('style');
                if (current_level === 'average') $this.children('span').text(language_level['average'][cvresume.info.language]);
                if (current_level === 'good') $this.children('span').text(language_level['good'][cvresume.info.language]);
                if (current_level === 'advanced') $this.children('span').text(language_level['advanced'][cvresume.info.language]);
                if (current_level === 'expert') $this.children('span').text(language_level['expert'][cvresume.info.language]);
                cvresume.main.delay_resume_save();
            }
            // 预览
            $this.on('mousemove', function(e){
                e.stopPropagation();
                var x = e.offsetX;
                var move_val = Math.round(x / $(this).width() * 100) / 100;
                var average = 0.4;
                var good = 0.6;
                var advanced = 0.85;
                preview_level(move_val, average, good, advanced);
            });
            // 设置
            $this.find('s').on('click', function(){
                set_level();
            });
            // 鼠标移出还原
            $this.on('mouseleave', function(){
                clearTimeout(mouseenter_outtime);
                $this.off('mousemove');
                $this.find('s').off('mousemove');
                $this.removeAttr('style');
                if (current_level !== $this.attr('data_level')) {
                    $this.attr('data_level', current_level);
                    if (current_level === 'average') $this.children('span').text(language_level['average'][cvresume.info.language]);
                    if (current_level === 'good') $this.children('span').text(language_level['good'][cvresume.info.language]);
                    if (current_level === 'advanced') $this.children('span').text(language_level['advanced'][cvresume.info.language]);
                    if (current_level === 'expert') $this.children('span').text(language_level['expert'][cvresume.info.language]);
                }
            });
        });
        // 弹窗自定义内添加技能 - 英文简历字数限制
        if (resume_language === 'en') {
            $modal.find(".TagsClass_addinput").attr({
                'placeholder': '自定义技能（例如：数据分析），限制30个字以内',
                'maxlength': 30,
            });
        }
        // 打开弹窗
        $module.find('.baseItem-toolbar .edit, .baseItem-null').on('click', function () {
            var json = common.main.get_job_json();
            var jobFunction = $("#jobFunction").find("span").text();
            var position = '';
            if (jobFunction && json.indexOf(jobFunction) > -1) {
                var list = JSON.parse(json);
                b:for(var i in list) {
                    for(var j in list[i].children) {
                        for(var k in list[i].children[j].children) {
                            if (list[i].children[j].children[k].name.indexOf(jobFunction) > -1) {
                                position = list[i].children[j].name;
                                break b;
                            }
                        }
                    }
                }
            }
            $.get('/cvresume/skill/', {
                "language": resume_language,
                "position": position,
            }, function(result){
                $skilllist.html(result);
                cvmutual.main.skillItem_update_readyadd();
                check_add_status();
		    });
            $modal.modal('show');
        });
        // 添加技能
        $skilllist.on('click', 'a', function () {
            var $this = $(this);
            var text = $this.text();
            if ($this.hasClass('checked')) {
            	return;
            }
            var add_success = add_skill(text);
            if (add_success) {
                $.get('/cvresume/skill/updateNum/', {
                    id: $this.attr("id"),
                }, function (res) {
                    if (res.type === 'success') {
                        common.main._500dtongji("PC-CV6.9.2-在线制作-简历编辑页-技能弹窗-推荐技能-通用");
                    }
                });
            }
        });
        // 自定义添加
        var custom_add_skill = function () {
            var val = $modal.find('.TagsClass_addinput').val().replace(/\s+/g, '');
            if(!val){
            	return layer.msg('亲，输入的技能特长不能为空噢~');
            }
            var is_add = false;
            $readyadd.find('.item-content').each(function (index, element) {
                if (val === $(element).find('.item-skill-name').text().replace(/(^\s+|\s+$)/g, '')) {
                    is_add = true;
                }
            });
            if (is_add) {
            	return layer.msg('亲，已经添加了这个技能噢~');
            }
            add_skill(val);
            $modal.find('.TagsClass_addinput').val('');
        }
        $modal.find('.TagsClass_addinput').on('keyup', function (event) {
            if (event.keyCode === 13) {
                custom_add_skill();
            }
        });
        $modal.find('.TagsClass_addbtn').on('click', function () {
            custom_add_skill();
        });
        // 删除
        $readyadd.on('click', '.closeDefind', function(){
        	var item = $(this).parent('.item-content');
            item.remove();
            check_add_status();
        });
        // 保存 - 更新技能特长列表
        $modal.find('.button.submit').on('click', function () {
            $module.find('.skill-con .skill-list').remove();
            if ($readyadd.find('.item-content').length) {
                $module.find('.baseItem-null').hide();
                $readyadd.find('.item-content').each(function (index, element) {
                    var name = $(element).children('.item-skill-name').text();
                    var masterLevel = $(element).find('.skill-drag-mark').attr('data-level');
                    var masterLevelDesc = $(element).find('.skill-drag-mark').attr('data-leveltext');
                    var $h = $('<div class="skill-list moduleItemList">'+
                                '<div class="skill-title item_title" contenteditable="true">'+ name +'</div>'+
                                '<span class="skill-slider item_level" data_level="'+ masterLevel +'" data_level_desc="'+ masterLevelDesc +'"><s><i></i></s></span>'+
                            '</div>');
                    $h.append(cvmutual.main.baseItem_delete_tool());
                    $module.find('.skill-con').append($h);
                });
            } else {
                $module.find('.baseItem-null').show();
            }
            $modal.modal('hide');
            cvresume.main.delay_resume_save();
        });
    },
    // 技能模块 - 弹窗内 准备添加列表更新
    skillItem_update_readyadd: function(text){
        var $module = $('#resume_skill');
        var $modal = $('#skills-modal');
        var $readyadd = $modal.find('#addedSkill');
        var language_level = cvmutual.info.langBar;
        // 滑块设置同步数值属性设置
        var operation = function ($el, left, bar_width) {
            var level_value = {
                'average': 0.25,
                'good': 0.5,
                'advanced': 0.75,
            };
            if (left < bar_width * level_value['average']) {
                var average_value = language_level['average'][cvresume.info.language];
                $el.attr({ 'data-level':'average', 'data-leveltext':average_value, });
                $el.parents('.item-content').find('.skill-drag-level').text(average_value);
            }
            if (left >= bar_width * level_value['average']) {
                var good_value = language_level['good'][cvresume.info.language];
                $el.attr({ 'data-level':'good', 'data-leveltext':good_value, });
                $el.parents('.item-content').find('.skill-drag-level').text(good_value);
            }
            if (left >= bar_width * level_value['good']) {
                var advanced_value = language_level['advanced'][cvresume.info.language];
                $el.attr({ 'data-level':'advanced', 'data-leveltext':advanced_value, });
                $el.parents('.item-content').find('.skill-drag-level').text(advanced_value);
            }
            if (left >= bar_width * level_value['advanced']) {
                var expert_value = language_level['expert'][cvresume.info.language];
                $el.attr({ 'data-level':'expert', 'data-leveltext':expert_value, });
                $el.parents('.item-content').find('.skill-drag-level').text(expert_value);
            }
        }
        // 生成拖动条
        var create_drag = function (level) {
            var lang_level = language_level[level][cvresume.info.language];
            var $drag = $('<div class="skill-drag-bar"><div class="skill-drag-mark" data-level="'+ level +'" data-leveltext="'+ lang_level +'"></div></div><span class="skill-drag-level">'+ lang_level +'</span>');
            $drag.on('click', function(e){
                e.stopPropagation();
                var left = e.offsetX;
                var bar_width = $(e.target).width();
                var $mark = $(e.target).children('.skill-drag-mark');
                operation($mark, left, bar_width);
            });
            $drag.find('.skill-drag-mark').on('mousedown', function(down_event){
                var $this = $(down_event.target);
                var start_x = down_event.clientX;
                var bar_width = $this.parent('.skill-drag-bar').width();
                var left = $this.position().left;
                var move = function (move_event){
                    var min = 0;
                    var max = 9.6;
                    var move_x = move_event.clientX - start_x + left;
                    if (move_x >= min && move_x < (bar_width / 10 * max)) {
                        $this.css('left', move_x + 'px');
                    }
                    var current_left = $this.position().left;
                    operation($this, current_left, bar_width);
                }
                var up = function (){
                    $(document).off('mousemove', move);
                    $(document).off('mouseup', up);
                    $this.removeClass('show-title').removeAttr('style');
                }
                $this.addClass('show-title');
                $(document).on('mousemove', move);
                $(document).on('mouseup', up);
            });
            return $drag;
        }
        // 新增
        if (text && typeof text === 'string') {
            var $h = $('<div class="item-content"><a href="javascript:void(0);" class="closeDefind"></a><span class="item-skill-name">'+ text +'</span></div>');
            $h.append(create_drag('advanced'));
            $readyadd.append($h);
        } else {
            $readyadd.find('.item-content').remove();
            // 渲染全部
            var $skill = $module.find('.skill-list');
            $skill.each(function(){
                var name = $(this).find(".skill-title").text() || '无技能名称';
                var level = $(this).find('[data_level]').attr('data_level') || 'average';
                var level_name = $(this).find(".skill-slider").find("span").text() || '未设置';
                var $h = $('<div class="item-content"><a href="javascript:void(0);" class="closeDefind"></a><span class="item-skill-name">'+ name +'</span></div>');
                $h.append(create_drag(level, level_name));
                $readyadd.append($h);
            });
        }
    },

    // 语言能力模块------------------------------------------
    languageItem_operate: function () {
        var $module = $('#resume_language');
        var $modal = $('#language-modal');
        var $langlist = $modal.find('#langlistBody');
        var $readyadd = $modal.find('#addedlang');
        var resume_language = cvresume.info.language || common.main.getUrlParamsValue('language') || 'zh';
        var language_level = cvmutual.info.langBar;
        var lang_maxlength = 10;
        // 子模块删除按钮
        $module.find('.language-con .language-list').append(cvmutual.main.baseItem_delete_tool());
        // 检查选中状态
        var check_add_status = function () {
            $langlist.find('a').each(function (j, elem) {
                var name = $(elem).text().replace(/(^\s+|\s+$)/g, '');
                $(elem).removeClass('checked');
                $readyadd.find('.item-content').each(function (i, element) {
                    if ($(element).find('.item-lang-name').text().replace(/(^\s+|\s+$)/g, '') === name) {
                        $(elem).addClass('checked');
                        return false;
                    }
                });
            });
            $readyadd.find('.item-length span').text(lang_maxlength - $readyadd.find('.item-content').length);
        }
        // 添加节点
        var add_lang = function (name) {
            if ($readyadd.find('.item-content').length >= lang_maxlength) {
                layer.msg('不能再添加了');
                return false;
            }
            cvmutual.main.languageItem_update_readyadd(name);
            check_add_status();
            return true;
        }
        // 语言能力拖动
        $module.sortable({
            items: ".language-list",
            cancel: ".language-title",
            cursor: "grabbing",
            helper: "clone",
            scrollSensitivity: 50,
            scrollSpeed: 30,
            tolerance: "pointer",
            update: function (event, ui) {
                cvresume.main.delay_resume_save();
            },
        });
        // 技能图形鼠标移入交互
        $module.on('mouseenter', '.language-list:not(.ui-sortable-helper) .language-slider', function () {
            var $this = $(this);
            var mouseenter_outtime;
            var current_level = $this.attr('data_level');
            // 预览数值状态
            var preview_level = function (cur, average, good, advanced) {
                clearTimeout(mouseenter_outtime);
                mouseenter_outtime = setTimeout(function(){
                    if (cur < average) {
                        $this.attr('data_level', 'average');
                        $this.children('span').text(language_level['average'][cvresume.info.language]);
                    }
                    if (cur >= average) {
                        $this.attr('data_level', 'good');
                        $this.children('span').text(language_level['good'][cvresume.info.language]);
                    }
                    if (cur >= good) {
                        $this.attr('data_level', 'advanced');
                        $this.children('span').text(language_level['advanced'][cvresume.info.language]);
                    }
                    if (cur >= advanced) {
                        $this.attr('data_level', 'expert');
                        $this.children('span').text(language_level['expert'][cvresume.info.language]);
                    }
                    if ($this.attr('data_level') !== current_level) {
                        $this.css('opacity', 0.7);
                    } else {
                        $this.removeAttr('style');
                    }
                }, 16);
            }
            // 设置状态
            var set_level = function () {
                clearTimeout(mouseenter_outtime);
                current_level = $this.attr('data_level');
                $this.removeAttr('style');
                if (current_level === 'average') $this.children('span').text(language_level['average'][cvresume.info.language]);
                if (current_level === 'good') $this.children('span').text(language_level['good'][cvresume.info.language]);
                if (current_level === 'advanced') $this.children('span').text(language_level['advanced'][cvresume.info.language]);
                if (current_level === 'expert') $this.children('span').text(language_level['expert'][cvresume.info.language]);
                cvresume.main.delay_resume_save();
            }
            // 预览
            $this.children('s').on('mousemove', function(e){
                e.stopPropagation();
                var x = e.offsetX;
                var move_val = Math.round(x / $(this).width() * 100) / 100;
                var average = 0.25;
                var good = 0.5;
                var advanced = 0.75;
                preview_level(move_val, average, good, advanced);
            });
            // 设置
            $this.children('s').on('click', function(){
                set_level();
            });
            // 鼠标移出还原
            $this.on('mouseleave', function(){
                clearTimeout(mouseenter_outtime);
                $this.off('mousemove');
                $this.find('s').off('mousemove');
                $this.removeAttr('style');
                if (current_level !== $this.attr('data_level')) {
                    $this.attr('data_level', current_level);
                    if (current_level === 'average') $this.children('span').text(language_level['average'][cvresume.info.language]);
                    if (current_level === 'good') $this.children('span').text(language_level['good'][cvresume.info.language]);
                    if (current_level === 'advanced') $this.children('span').text(language_level['advanced'][cvresume.info.language]);
                    if (current_level === 'expert') $this.children('span').text(language_level['expert'][cvresume.info.language]);
                }
            });
        });
        // 弹窗自定义内添加语言 - 英文简历字数限制
        if (resume_language === 'en') {
            $modal.find(".TagsClass_addinput").attr({
                'placeholder': '自定义语言（例如：英语），限制30个字以内',
                'maxlength': 30,
            });
        }
        // 打开弹窗
        $module.find('.baseItem-toolbar .edit, .baseItem-null').on('click', function () {
            $.get('/newcvresume/language/', {
                'language': resume_language,
            }, function(result){
                $langlist.html(result);
                cvmutual.main.languageItem_update_readyadd();
                check_add_status();
		    });
            $modal.modal('show');
        });
        // 添加语言
        $langlist.on('click', 'a', function () {
            var $this = $(this);
            var text = $this.text();
            if ($this.hasClass('checked')) {
            	return;
            }
            var add_success = add_lang(text);
            if (add_success) {
                $.get('/newcvresume/language/updateUseNum/', {
                    id: $this.attr("id"),
                }, function (res) {
                    if (res.type === 'success') {
                        common.main._500dtongji("PC-CV6.9.2-在线制作-简历编辑页-语言弹窗-推荐语言-通用");
                    }
                });
            }
        });
        // 自定义添加
        var custom_add_lang = function () {
            var val = $modal.find('.TagsClass_addinput').val().replace(/\s+/g, '');
            if(!val){
            	return layer.msg('亲，输入的语言不能为空噢~');
            }
            var is_add = false;
            $readyadd.find('.item-content').each(function (index, element) {
                if (val === $(element).find('.item-lang-name').text().replace(/(^\s+|\s+$)/g, '')) {
                    is_add = true;
                }
            });
            if (is_add) {
            	return layer.msg('亲，已经添加了这个语言噢~');
            }
            add_lang(val);
            $modal.find('.TagsClass_addinput').val('');
        }
        $modal.find('.TagsClass_addinput').on('keyup', function (event) {
            if (event.keyCode === 13) {
                custom_add_lang();
            }
        });
        $modal.find('.TagsClass_addbtn').on('click', function () {
            custom_add_lang();
        });
        // 删除
        $readyadd.on('click', '.closeDefind', function(){
        	var item = $(this).parent('.item-content');
            item.remove();
            check_add_status();
        });
        // 保存 - 更新语言能力列表
        $modal.find('.button.submit').on('click', function () {
            $module.find('.language-con .language-list').remove();
            if ($readyadd.find('.item-content').length) {
                $module.find('.baseItem-null').hide();
                var langs = [];
                $readyadd.find('.item-content').each(function (index, element) {
                    var lang = {};
                    lang['name'] = $(element).children('.item-lang-name').text();
                    lang['masterLevel'] = $(element).find('.lang-drag-mark').attr('data-level');
                    lang['masterLevelDesc'] = $(element).find('.lang-drag-mark').attr('data-leveltext');
                    langs.push(lang);
                });
                $.each(langs, function(i,item){
                    var $h = $('<div class="language-list moduleItemList">'+
                                '<div class="language-title item_title" contenteditable="true">'+ item['name'] +'</div>'+
                                '<span class="language-slider item_level" data_level="'+ item['masterLevel'] +'" data_level_desc="'+ item['masterLevelDesc'] +'"><s><i></i></s></span>'+
                            '</div>');
                    $h.append(cvmutual.main.baseItem_delete_tool());
                    $module.find('.language-con').append($h);
                });
            } else {
                $module.find('.baseItem-null').show();
            }
            $modal.modal('hide');
            cvresume.main.delay_resume_save();
        });
    },
    // 语言能力模块 - 弹窗内 准备添加列表更新
    languageItem_update_readyadd: function (text) {
        var $module = $('#resume_language');
        var $modal = $('#language-modal');
        var $readyadd = $modal.find('#addedlang');
        var language_level = cvmutual.info.langBar;
        // 滑块设置同步数值属性设置
        var operation = function ($el, left, bar_width) {
            var level_value = {
                'average': 0.25,
                'good': 0.5,
                'advanced': 0.75,
            };
            if (left < bar_width * level_value['average']) {
                var average_value = language_level['average'][cvresume.info.language];
                $el.attr({ 'data-level':'average', 'data-leveltext':average_value, });
                $el.parents('.item-content').find('.lang-drag-level').text(average_value);
            }
            if (left >= bar_width * level_value['average']) {
                var good_value = language_level['good'][cvresume.info.language];
                $el.attr({ 'data-level':'good', 'data-leveltext':good_value, });
                $el.parents('.item-content').find('.lang-drag-level').text(good_value);
            }
            if (left >= bar_width * level_value['good']) {
                var advanced_value = language_level['advanced'][cvresume.info.language];
                $el.attr({ 'data-level':'advanced', 'data-leveltext':advanced_value, });
                $el.parents('.item-content').find('.lang-drag-level').text(advanced_value);
            }
            if (left >= bar_width * level_value['advanced']) {
                var expert_value = language_level['expert'][cvresume.info.language];
                $el.attr({ 'data-level':'expert', 'data-leveltext':expert_value, });
                $el.parents('.item-content').find('.lang-drag-level').text(expert_value);
            }
        }
        // 生成拖动条
        var create_drag = function (level) {
            var lang_level = language_level[level][cvresume.info.language];
            var $drag = $('<div class="lang-drag-bar"><div class="lang-drag-mark" data-level="'+ level +'" data-leveltext="'+ lang_level +'"></div></div><span class="lang-drag-level">'+ lang_level +'</span>');
            $drag.on('click', function(e){
                e.stopPropagation();
                var left = e.offsetX;
                var bar_width = $(e.target).width();
                var $mark = $(e.target).children('.lang-drag-mark');
                operation($mark, left, bar_width);
            });
            $drag.find('.lang-drag-mark').on('mousedown', function(down_event){
                var $this = $(down_event.target);
                var start_x = down_event.clientX;
                var bar_width = $this.parent('.lang-drag-bar').width();
                var left = $this.position().left;
                var move = function (move_event){
                    var min = 0;
                    var max = 9.6;
                    var move_x = move_event.clientX - start_x + left;
                    if (move_x >= min && move_x < (bar_width / 10 * max)) {
                        $this.css('left', move_x + 'px');
                    }
                    var current_left = $this.position().left;
                    operation($this, current_left, bar_width);
                }
                var up = function (){
                    $(document).off('mousemove', move);
                    $(document).off('mouseup', up);
                    $this.removeClass('show-title').removeAttr('style');
                }
                $this.addClass('show-title');
                $(document).on('mousemove', move);
                $(document).on('mouseup', up);
            });
            return $drag;
        }
        // 新增
        if (text && typeof text === 'string') {
            var $h = $('<div class="item-content"><a href="javascript:void(0);" class="closeDefind"></a><span class="item-lang-name">'+ text +'</span></div>');
            $h.append(create_drag('advanced'));
            $readyadd.append($h);
        } else {
            $readyadd.find('.item-content').remove();
            // 渲染全部
            var $language = $module.find('.language-list');
            var langs = [];
            $language.each(function(){
                var obj = {};
                obj['name'] = $(this).find(".language-title").text() || '无语言名称';
                obj['level'] = $(this).find('[data_level]').attr('data_level') || 'average';
                obj['level_name'] = $(this).find(".language-slider").find("span").text() || '未设置';
                langs.push(obj);
            });
            $.each(langs, function(i, item){
                var $h = $('<div class="item-content"><a href="javascript:void(0);" class="closeDefind"></a><span class="item-lang-name">'+ item['name'] +'</span></div>');
                $h.append(create_drag(item['level'], item['level_name']));
                $readyadd.append($h);
            });
        }
    },

    // 个人标签模块（已下架，旧数据保留）------------------------------------------
    hobbyItem_operate: function () {
        var $module = $('#resume_hobby');
        var $modal = $('#hobbys-modal');
        var $hobbylist = $modal.find('#hobbyBody');
        var $readyadd = $modal.find('#addedHobby');
        var resume_language = cvresume.info.language || common.main.getUrlParamsValue('language') || 'zh';
        var hobby_maxlength = 10;
        // 子模块删除按钮
        $module.find('.hobby-con .hobby-list').append(cvmutual.main.baseItem_delete_tool());
        // 检查选中状态
        var check_add_status = function () {
            $hobbylist.find('a').each(function (j, elem) {
                var name = $(elem).text().replace(/(^\s+|\s+$)/g, '');
                $(elem).removeClass('checked');
                $readyadd.find('.item-content').each(function (i, element) {
                    if ($(element).find('span').text().replace(/(^\s+|\s+$)/g, '') === name) {
                        $(elem).addClass('checked');
                        return false;
                    }
                });
            });
            $readyadd.find('.item-length span').text(hobby_maxlength - $readyadd.find('.item-content').length);
        }
        // 添加节点
        var add_hobby = function (name, icon) {
            if ($readyadd.find('.item-content').length >= hobby_maxlength) {
                layer.msg('不能再添加了');
                return false;
            }
            cvmutual.main.hobbyItem_update_readyadd(name, icon);
            check_add_status();
            return true;
        }
        // 弹窗自定义内添加标签 - 英文简历字数限制
        if (resume_language === 'en') {
            $modal.find(".TagsClass_addinput").attr({
                'placeholder': '自定义标签，限制30个字以内',
                'maxlength': 30,
            });
        }
        // 打开弹窗
        $module.find('.baseItem-toolbar .edit, .baseItem-null').on('click', function () {
            $.get('/cvresume/hobby/', {
                "language": resume_language,
            }, function(result){
                $hobbylist.html(result);
                cvmutual.main.hobbyItem_update_readyadd();
                check_add_status();
		    });
            $modal.modal('show');
        });
        // 添加标签
        $hobbylist.on('click', 'a', function () {
            var $this = $(this);
            var text = $this.text();
            var icon = $this.attr('data-icon');
            if ($this.hasClass('checked')) {
            	return;
            }
            var add_success = add_hobby(text, icon);
            if (add_success) {
                $.get('/cvresume/hobby/updateNum/', {
                    id: $this.attr("id"),
                }, function (res) {
                    if (res.type === 'success') {
                        common.main._500dtongji("PC-CV6.9.2-在线制作-简历编辑页-技能弹窗-推荐技能-通用");
                    }
                });
            }
        });
        // 自定义添加
        var custom_add_hobby = function () {
            var val = $modal.find('.TagsClass_addinput').val().replace(/\s+/g, '');
            if(!val){
            	return layer.msg('亲，输入的标签不能为空噢~');
            }
            var is_add = false;
            $readyadd.find('.item-content').each(function (index, element) {
                if (val === $(element).find('span').text().replace(/(^\s+|\s+$)/g, '')) {
                    is_add = true;
                }
            });
            if (is_add) {
            	return layer.msg('亲，已经添加了这个标签噢~');
            }
            add_hobby(val);
            $modal.find('.TagsClass_addinput').val('');
        }
        $modal.find('.TagsClass_addinput').on('keyup', function (event) {
            if (event.keyCode === 13) {
                custom_add_hobby();
            }
        });
        $modal.find('.TagsClass_addbtn').on('click', function () {
            custom_add_hobby();
        });
        // 删除
        $readyadd.on('click', '.closeDefind', function(){
        	var item = $(this).parent('.item-content');
            item.remove();
            check_add_status();
        });
        // 保存 - 更新技能特长列表
        $modal.find('.button.submit').on('click', function () {
            $module.find('.hobby-con .hobby-list').remove();
            if ($readyadd.find('.item-content').length) {
                $module.find('.baseItem-null').hide();
                $readyadd.find('.item-content').each(function (index, element) {
                    var key = cvmutual.main.makeId();
                    var icon = $(element).attr('data-iconFont');
                    var name = $(element).find('span').text();
                    var $h = $('<div class="hobby-list moduleItemList" id="'+ key +'">'+
                                '<a class="wbdfont divIconFont" for-key="'+ key +'">'+ icon +'</a>'+
                                '<span class="hobby-title item_title">'+ name +'</span>'+
                            '</div>');
                    $h.append(cvmutual.main.baseItem_delete_tool());
                    $module.find('.hobby-con').append($h);
                });
            } else {
                $module.find('.baseItem-null').show();
            }
            $modal.modal('hide');
            cvresume.main.delay_resume_save();
        });
    },
    // 个人标签模块 - 弹窗内 准备添加列表更新
    hobbyItem_update_readyadd: function (text, icon) {
        var $module = $('#resume_hobby');
        var $modal = $('#hobbys-modal');
        var $readyadd = $modal.find('#addedHobby');
        // 新增
        if (text && typeof text === 'string') {
            if (!icon) {
                icon = '&#xe70f;';
            }
            var $h = $('<div class="item-content" data-iconfont="'+ icon +'"><span>'+ text +'</span><a href="javascript:void(0);" class="closeDefind"></a></div>');
            $readyadd.append($h);
        } else {
            $readyadd.find('.item-content').remove();
            // 渲染全部
            var $hobby = $module.find('.hobby-list');
            $hobby.each(function (i, item) {
                var $h = $('<div class="item-content" data-iconfont="'+ $(item).find('.divIconFont').text() +'"><span>'+ $(item).find('.hobby-title').text() +'</span><a href="javascript:void(0);" class="closeDefind"></a></div>');
                $readyadd.append($h);
            });
        }
    },

    // 二维码模块----------------------------------------------
    set_ewm_resizable: function (destroy) {
        var $module = $('#resume_qrcode');
        var $ewm = $module.find('.ewm-con > span');
        var width = '';
        var height = '';
        if (destroy) {
            $ewm.removeAttr('style').find('img').removeAttr('style');
            $ewm.resizable("destroy");
            width = $ewm.width();
            height = $ewm.height();
            $module.attr({
                'data-width': width,
                'data-height': height,
            })
        } else {
            width = $ewm.width();
            height = $ewm.height();
            $ewm.css({
                'width': $module.attr('data-width'),
                'height': $module.attr('data-height'),
            })
        }
        $ewm.resizable({
            aspectRatio: true,
            minWidth: 90,
            minHeight: 90,
            maxWidth: width,
            maxHeight: height,
            autoHide: true,
            handles: 'ne, se, sw, nw',
            stop: function (event, ui) {
                $('#resume_qrcode').attr({'data-width':ui.size.width,'data-height':ui.size.height}).css('z-index', '');
                cvresume.main.delay_resume_save();
            },
        });
    },

    // 模块管理----------------------------------------------
    moduleItem_manager: function () {
        var $modal = $("#moduleManageModal");
        var $resume = $('#resume_base');
        var $manage = $('#showul');
        var sort_li = function () {
            let $sort = $manage.children('li').sort(function (a, b) {
                if (!$(a).find('.roundToggleBtn').hasClass('off') && $(b).find('.roundToggleBtn').hasClass('off')) {
                    return -1;
                } else {
                    return 0;
                }
            });
            $manage.html($sort);
        }
        // 左侧栏弹窗open
        $(".leftbar_editor_operate .module_editor").click(function(e){
            // 显示modal
            $modal.css("left",'0');
            common.main._500dtongji("PC-在线制作-"+ $(this).attr("data-value") +"-左侧设置-左侧设置-模块管理");
            // 更新模块状态
            $resume.find('.wbdCv-cover, .wbdCv-letter, .wbdCv-resume .moduleItem').each(function (index, elem) {
                var $this = $(elem);
                var title = $this.find('.module_item_title').text();
                var $manage_statebtn = $manage.find('[for-id="'+ $this.attr('id') +'"]');
                $manage_statebtn.siblings('.name').text(title);
                if ($this.hasClass('hidden') || $this.is(':hidden')){
                    $manage_statebtn.attr('title', '显示此模块').addClass('off');
                } else {
                    $manage_statebtn.attr('title', '隐藏此模块').removeClass('off');
                }
            });
            // 遍历自定义模块 & 校招模块(内置自定义 wbdCv-schoolElement )
            $manage.find('.custom-li').remove();
            $resume.find('.customItem').each(function (index, elem) {
                var $this = $(elem);
                // 校招元素自定义模块
                if ($this.hasClass('wbdCv-schoolElement')) {
                    var $manage_statebtn = $manage.find('.roundToggleBtn[for-id="'+ $this.attr('id') +'"]');
                    if ($this.hasClass('hidden') || $this.is(':hidden')){
                        $manage_statebtn.attr('title', '显示此模块').addClass('off');
                    } else {
                        $manage_statebtn.attr('title', '隐藏此模块').removeClass('off');
                    }
                } else {
                    var title = $this.find('.module_item_title').text();
                    var $manage_li = $manage.find('li').eq(1).clone();
                    $manage_li.find('.name').text(title).attr('data-placeholder', '自定义模块');
                    $manage_li.find('.roundToggleBtn').attr('for-id', $this.attr('id'));
                    $manage_li.attr('class', 'custom-li');
                    $manage.append($manage_li);
                }
            });
            // 调整排序，关闭状态后排
            sort_li();
        });
		// 隐藏 && 显示模块事件
        $manage.on('click', '.roundToggleBtn', function () {
            var $this = $(this);
            var id = $this.attr('for-id');
            var $li = $this.parents('li');
            if (!id) {
                return;
            }
            // 自定义模块无显示，直接删除
            if ($li.hasClass('custom-li')) {
                common.main.resume_confirm({
                    title:"确定删除当前模块吗？",
                    content:"此模块为自定义模块,删除后无法恢复.",
                    onOk:function(){
                        $li.remove();
                        $resume.find('#'+ id +'.customItem').remove();
                        cvresume.main.resume_page();
                    },
                });
            } else {
                $this.toggleClass('off');
                var $module = $resume.find('#' + id);
                // 隐藏模块
                if ($this.hasClass('off')) {
                    $this.attr('title', '显示此模块');
                    $module.addClass('hidden');
                } else {
                    // 显示模块   判断vip权限
                    if ($this.hasClass('wbd-vip-lock')) {
                        return;
                    }
                    $this.attr('title', '隐藏此模块');
                    // 模块放置到最后显示  排除不能拖动的模块
                    if ($module.length && $module.find('.baseItem-toolbar .ui-sortable-handle').length && $module.find('.baseItem-toolbar .ui-sortable-handle').is(':visible')) {
                        $module.parent().append($module);
                        $module.removeClass('hidden');
                        // 模块定位
                        if ($('.wbdCv-container.resume').hasClass('mobile')) {
                            $('.wbdCv-container.mobile .wbdCv-baseStyle').animate({
                                scrollTop: $module.position().top
                            }, 500);
                        } else {
                            $('html, body').animate({
                                scrollTop: $module.position().top
                            }, 500);
                        }
                    } else {
                        $module.removeClass('hidden');
                    }
                    if ($module.attr('id') === 'resume_job_preference') {
                        cvresume.main.moduleItemList_handlestyle();
                    }
                }
                var track = $this.attr('data_track');
                if (!track) {
                    common.main._500dtongji("PC-在线制作-模块管理功能（"+ cvmutual.info.resume_type +"编辑）-已有模块管理-已有模块管理-隐藏" + track);
                }
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save();
                sort_li();
            }
        });
        // 自定义模块添加
        $modal.find('.add_custom').on('click', function (event) {
            var $module = $("#add_resume_time").clone();
            var $manage_li = $manage.find('li').eq(1).clone();
            var uuid = cvresume.main.uuid();
            // 插入模块
            $module.attr('id', uuid);
            $module.find('[for-key]').attr('for-key', uuid);
            $module.removeAttr('style');
            $('.wbdCv-baseRight').append($module);
            cvmutual.main.create_resume_tool($('#itemTool'), $module.find('dl'));
            common.main._500dtongji("PC-在线制作-"+cvmutual.info.resume_type+"编辑页-中间简历编辑-自定义模块-添加描述模块");
            // 模块管理列表更新
            $manage_li.find('.name').text('自定义标题').attr('data-placeholder', '自定义模块');
            $manage_li.find('.roundToggleBtn').attr('for-id', uuid);
            $manage_li.attr('class', 'custom-li');
            $manage.append($manage_li);
            sort_li();
            // 更新画布
            $('#bar').sortable('refresh');
            $('#foo').sortable('refresh');
            cvresume.main.resume_page();
            // 模块选中
            $manage.parents('#moduleManageModal').find('.close').click();
            // 模块定位
            if ($('.wbdCv-container.resume').hasClass('mobile')) {
                $('.wbdCv-container.mobile .wbdCv-baseStyle').animate({
                    scrollTop: $module.position().top
                }, 500);
            } else {
                $('html, body').animate({
                    scrollTop: $module.position().top
                }, 500);
            }
        });
    },

    // 设置富文本编辑器
    editor_operate:function(){
        var $edit = '';
        var sel = '';
        var $tool = $('#textExecCommand');
        var save_selection_text = '';    //	选中的文本
        var is_blur_change_link = true;  // 处理 取消超链接时 失焦自动识别超链接的冲突操作
        // 兼容性处理
		if(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1){
			$("div[contenteditable='true']").attr("contentEditable","true");
            var CEA = document.querySelectorAll("div[contenteditable='true]");
            CEA.onfocusin = function(){
                if ($('.moduleItem.current:not(.nameItem)').length > 0) {
                    showToolbar($(this));
                }
			}
		}else{
			document.execCommand("styleWithCSS", false, null);
        }
        /**
         * 工具栏相关方法
         */
        // 工具栏显示
        $('.wbdCv-baseStyle').on('focusin', '.moduleItem:not(.nameItem) dl div[contenteditable="true"]', function () {
            var $this = $(this);
            var $module = $this.parents('.moduleItem');
            // 已选中阻止
            if ($module.hasClass('current')) {
                return;
            };
            // 聚焦添加模块选中效果
            $('.wbdCv-baseStyle .moduleItem').removeClass('current');
            $module.addClass('current');
            $module.find('.inset_moduleTags').hide();
            $(this).parents('.moduleItemList').find('.case_guide_tool').show();
            // 显示工具栏
            showToolbar($this);
            cvmutual.info.focus_moduleList = $(this).parents('.moduleItemList');
        });
        // 工具栏隐藏
        $('.wbdCv-baseStyle').on('focusout', '.moduleItem:not(.nameItem) dl div[contenteditable="true"]', function (event) {
            var $this = $(this);
            var $module = $this.parents('.moduleItem');
            $('#image_resizable').remove();
            $module.removeClass('current');
            $module.find('.inset_moduleTags').removeAttr('style');
            $module.find('.case_guide_tool').fadeOut(200);
            $(".tips_content_text ul li[data-list-id='resume_default']").addClass("selected").siblings().removeClass("selected");
            hideToolbar();
            // 失焦时自动识别超链接
            if (is_blur_change_link) {
                var $text = $this.text();
                var $html = $this.html();
                // 匹配内容纯文本
                var match = $text.match(/(((ht|f)tps?):\/\/)?www(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/g) || [];
                match.forEach(function (item) {
                    // 转换为html
                    var link_text = item;
                    if (!/^((ht|f)tps?):\/\//.test(item)) {
                        link_text = 'http://' + item;
                    }
                    var link_html = '<a href="' + link_text + '" target="_blank">' + item + '</a>';
                    var html_change = $html.replace(item, link_html);
                    // 过滤已经是超链接的内容
                    var is_rewrite = true;
                    var item_match = $html.match(new RegExp('<a.*>' + item + '</a>', 'g'));
                    if (item_match) {
                        is_rewrite = false;
                    }
                    if (is_rewrite) {
                        $this.html(html_change);
                    }
                });
            }
            cvresume.main.resume_page();
            is_blur_change_link = true;
        });
        // 隐藏模块操作
        $(document).on('click', '#showul a.roundToggleBtn:not(.off), .moduleItem .baseItem-toolbar .delete', function () {
            hideToolbar();
        });
        // 点击工具栏阻止失焦
        $tool.on('mousedown', function (event) {
            if ($(":focus").length > 0) {
                $edit = $(':focus');
                event.preventDefault();
            };
        });
        // 显示工具栏
        function showToolbar($this) {
            $tool.removeClass('hidden');
            module_editor_selector($this);
            $this.attr("contenteditable", "true");
            // 添加选中样式监听
            $('.wbdCv-baseStyle').off('click keydown', 'div[contenteditable=true]', showToolbarChecked);
            $('.wbdCv-baseStyle').on('click keydown', 'div[contenteditable=true]', showToolbarChecked);
        }
        // 隐藏工具栏
        function hideToolbar() {
            $tool.addClass('hidden');
            $tool.find(".open").removeClass("open");
            $(".commonColor_list").hide();
            $('#image_resizable').remove();
            // 移除按钮选中效果
            $('.wbdCv-baseStyle').off('click keydown', 'div[contenteditable=true]', showToolbarChecked);
        }
        // 富文本功能筛选
        function module_editor_selector($editor) {
            var $module = $editor.parents('.moduleItem');
            var class_string = $module.attr('class');
            var $special = $('#textExecCommand').find('.btn-group + .btn-group, .fontFamily, .Italic, .CreateLink');
            // 只支持 字号/ 字体颜色/ 加粗/ 下划线/ 高亮
            if($editor.hasClass('module_item_title') || $editor.parents('.dd-title').length || $.grep(['skillItem', 'workItem', 'ewmItem', 'languageItem'], function(item) { return class_string.split(' ').indexOf(item) > -1 }).length){
                $special.hide();
            } else {
                $special.show();
            }
        }
        // 设置显示选中样式
        function showToolbarChecked() {
            $('#textExecCommand a').removeClass('checked');
            $('#textExecCommand .foreColor .foreColor-bg').css('background-color', 'transparent');
            var $target;
            if (window.getSelection) {
                $target = window.getSelection().anchorNode;
            } else if (document.selection && document.selection.createRange) {
                $target = document.selection.createRange();
            }
            if ($target && $target.nodeName === '#text') {
                $target = $target.parentNode;
            }
            if (!$target) {
                return;
            }
            $target = $($target);
            $('#textExecCommand .foreColor .foreColor-bg').css('background-color', $target.css('color'));
            $('#textExecCommand .hiliteColor .hiliteColor-bg').css('background-color', $target.css('background-color') === 'rgba(0, 0, 0, 0)' || $target.css('background-color') === 'rgba(188, 188, 188, 0.3)' ? '#ffd800' : $target.css('background-color'));
            $('#textExecCommand .fontSize p').text($target.css('font-size'));
            if ($target.css('font-weight') === '700') $('#textExecCommand .Bold').addClass('checked');
            if ($target.css('font-style') === 'italic') $('#textExecCommand .Italic').addClass('checked');
            if ($target.css('text-decoration').indexOf('underline') >= 0) $('#textExecCommand .Underline').addClass('checked');
            if ($target.parents('ol').length > 0 || $target[0].nodeName === 'OL') $('#textExecCommand .InsertOrderedList').addClass('checked');
            if ($target.parents('ul').length > 0 || $target[0].nodeName === 'UL') $('#textExecCommand .InsertUnorderedList').addClass('checked');
            if ($target.parents('blockquote').length > 0 || $target[0].nodeName === 'BLOCKQUOTE') $('#textExecCommand .Indent').addClass('checked');
            if ($target[0].nodeName === 'A') $('#textExecCommand .CreateLink').addClass('checked');
        };
        // 点击其他地方关闭工具栏设置下拉窗
        function toobar_listener(e) {
            var $target = $(e.target);
            if (!($target.hasClass("colorPick") || $target.parents(".colorPick").length > 0)) {
                $("#textExecCommand .colorPick").removeClass("open");
                $("#textExecCommand .commonColor_list").hide();
                $('#textExecCommand .color_choose_list').hide();
            }
            if (!($target.hasClass("pullButton") || $target.parents(".pullButton").length > 0)) {
                $("#textExecCommand .pullButton").removeClass("open");
            }
        };
        // 存储选区
        function editor_save_selection() {
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.type === 'Range' || sel.length > 0) {
                    return {
                        sel: sel,
                        range: sel.getRangeAt(0),
                        text: sel.toString().replace(/\s+/g, '')
                    };
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        };
        function open_execcommand_list($btn){
            $btn.siblings('.open').removeClass('open');
            $btn.parents('.btn-group').siblings().find('.open').removeClass('open');
            $btn.toggleClass('open');
        }
        
        /**
         * 富文本相关方法
         */
        // 粗体
		$tool.find(".Bold").on('click', function(){
            if (!editor_save_selection()) document.execCommand('selectAll');
            document.execCommand('Bold');
        });
        // 斜体
		$tool.find(".Italic").on('click', function(){
            if (!editor_save_selection()) document.execCommand('selectAll');
            document.execCommand('Italic');
        });
        // 下划线
        $tool.find(".Underline").on('click', function(){
            save_selection_text = editor_save_selection();
            if (!save_selection_text) {
                document.execCommand('selectAll');
                save_selection_text = editor_save_selection();
            }
            document.execCommand('Underline');
            var range = save_selection_text.range;
            // 当前导出pdf服务 wkhtmltopdf 不支持 css text-decoration-line 属性 需要替换成 text-decoration
            $(range.commonAncestorContainer).closest("div[contenteditable='true']").find("[style *='text-decoration-line: underline']")
            .css({
                textDecorationLine: 'none',
                textDecoration: 'underline',
            });
        });
        // 右缩进
		$tool.find(".Indent").on('click', function(){
            if (!editor_save_selection()) document.execCommand('selectAll');
            document.execCommand('Indent')
        });
        // 左缩进
		$tool.find(".Outdent").on('click', function(){
            if (!editor_save_selection()) document.execCommand('selectAll');
            document.execCommand('Outdent')
        });
        // 撤销
		$tool.find(".Undo").on('click', function(){
			document.execCommand('Undo')
        });
        // 恢复
        $tool.find(".Redo").on('click', function(){
			document.execCommand('Redo')
        });

        /* 超链接 */
        var toggleLinkPanel = function ($a) {
            // 显示面板
            if ($a && $a.length) {
                var $parent = $a.parents('[contenteditable="true"]');
                if ($parent.parent().find('.editor-link-panel').length && $a.hasClass('selected')) {
                    return;
                }
                // 文本内容为链接网址的不显示此面板
                if (/^(ht|f)tp(s?)\:\/\/([0-9a-zA-z.]+)(:[0-9]+)?([/0-9a-zA-Z.]+)?(\?[0-9a-zA-Z&=]+)?(#[0-9-a-zA-Z]+)?$/.test($a.text())){
                    return;
                }
                // 面板节点
                var $panel = $('<div class="editor-link-panel">'+
                                '<div class="modify-content">'+
                                    '<div class="list text"><span class="name">文本</span><input type="text"/></div>'+
                                    '<div class="list link"><span class="name">链接</span><input type="text"/></div>'+
                                    '<div class="list btn"><button class="use">应用</button></div>'+
                                '</div>'+
                                '<div class="preview-content"><a></a><span class="unlink">取消链接</span><span class="modify">修改</span></div>'+
                            '</div>');
                // 面板定位
                $panel.css({
                    'top': ($a.position().top + $a.outerHeight() + 5) + 'px',
                    'left': $a.position().left + 'px',
                });
                // 按需显示面板，已设置链接显示预览面板
                if ($a.attr('href')) {
                    $panel.attr('class', 'editor-link-panel preview');
                } else {
                    $panel.attr('class', 'editor-link-panel modify');
                }
                // 内容渲染
                var $modify = $panel.find('.modify-content');
                var $preview = $panel.find('.preview-content');
                var use_link = function () {
                    var $text = $modify.find('.text input');
                    var $link = $modify.find('.link input');
                    if (!/^((ht|f)tps?):\/\//.test($link.val())) {
                        $link.val('http://' + $link.val());
                    }
                    common.main.validate({
                        rules: [{
                            target: $text,
                            required: true,
                            massage: '请填写链接文本~',
                        }, {
                            target: $link,
                            type: 'url',
                            required: true,
                            massage: '链接格式错误~',
                        }],
                        onTips: function (tag, msg) {
                            tag.focus();
                            layer.msg(msg);
                        },
                        onOk: function () {
                            $a.html($text.val()).attr('href', $link.val());
                            toggleLinkPanel();
                        },
                    });
                }
                $modify.find('.text input').val($a.text());
                $modify.find('.link input').val($a.attr('href'));
                $preview.find('a').attr({
                    'href': $a.attr('href'),
                    'target': '_blank',
                }).text($a.attr('href'));
                // 取消链接
                $preview.find('.unlink').on('click', function () {
                    window.getSelection().removeAllRanges();
                    if ($a[0].nodeType === 1 && $a[0].childNodes[0]) {
                        var textnode = $a[0].childNodes[0];
                        var range = new Range();
                        range.setStart(textnode, 0);
                        range.setEnd(textnode, textnode.textContent.length);
                        window.getSelection().addRange(range);
                        document.execCommand('unLink');
                        window.getSelection().removeAllRanges();
                    }
                    toggleLinkPanel();
                });
                // 修改链接
                $preview.find('.modify').on('click', function () {
                    $panel.attr('class', 'editor-link-panel modify');
                });
                // 应用修改
                $modify.find('.use').on('click', use_link);
                $modify.find('input').on('keyup', function (event) {
                    if (event.keyCode === 13) {
                        use_link();
                    }
                });
                // 插入节点显示面板
                $a.addClass('selected');
                $parent.after($panel);
            } else {
                $('.editor-link-panel').remove();
                $('.wbdCv-baseStyle [contenteditable="true"] a.selected').removeClass('selected');
            }
        }
        // 创建超链接
        $tool.find(".CreateLink").on('click', function () {
            // 获取选区生成超链接
            editor_save_selection();
            document.execCommand('CreateLink', false, ' ');
            var $a = $(sel.anchorNode).closest('a');
            $a.attr({
                'href': '',
                'target': '_blank',
            });
            toggleLinkPanel($a);
        });
        // 显示/隐藏超链接面板
        $('.wbdCv-baseStyle').on('click keyup', '[contenteditable="true"]', function () {
            var _sel = window.getSelection();
            var $a = $(_sel.anchorNode).closest('a');
            toggleLinkPanel($a);
        });

        /* 字体 */
        $tool.find('.fontFamily').on('click', function () {
            var $this = $(this);
            save_selection_text = editor_save_selection();
            open_execcommand_list($this);
            if ($this.hasClass('open')) {
                // 生成字体列表节点
                if ($this.find('.family_list li').length === 0) {
                    $this.find('.family_list.cn')[0].innerHTML = fontFamily.main.create_family_list('cn');
                    $this.find('.family_list.en')[0].innerHTML = fontFamily.main.create_family_list('en');
                }
                // 回显选中的颜色
                var $sel = window.getSelection().anchorNode;
                if ($sel.nodeType !== 1) {
                    $sel = $sel.parentNode;
                }
                $tool.find(".fontFamily_list li").removeClass('selected');
                $tool.find(".fontFamily_list li").each(function () {
                    if ($($sel).css('font-family') == $this.attr('data-fontname')) {
                        $this.addClass('selected');
                    }
                });
            }
        });
        $('#textExecCommand').on('click','.fontFamily_list li', function () {
            var data = $(this).attr('data-fontname');
            if (save_selection_text) {
                document.execCommand('fontName', false, data);
            } else {
                document.execCommand('selectAll');
                document.execCommand('fontName', false, data);
                document.execCommand('Unselect');
            }
            $edit.find('font').contents().unwrap().wrap('<span style=" font-family: ' + data + '"></span>');
        });

        /* 字体大小 */
        $tool.find('.fontSize').on('click', function () {
            var $this = $(this);
            save_selection_text = editor_save_selection();
            open_execcommand_list($this);
            if ($this.hasClass('open')) {
                // 回显选中的颜色
                var $sel = window.getSelection().anchorNode;
                if ($sel.nodeType !== 1) {
                    $sel = $sel.parentNode;
                }
                $tool.find(".fontSize_list li").removeClass('selected');
                $tool.find(".fontSize_list li").each(function () {
                    if ($($sel).css('font-size') == $this.text()) {
                        $this.addClass('selected');
                    }
                });
            }
        });
        $tool.find('.fontSize_list li').on('click', function () {
            var data = $(this).attr('data-fontSize');
            if (save_selection_text) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(save_selection_text.range);
                    document.execCommand('fontSize', false, data + 'px');
                } else if (document.selection && save_selection_text.range.select) {
                    save_selection_text.range.select();
                    document.execCommand('fontSize', false, data + 'px');
                }
                $edit.find('font[size]').css("font-size", data + 'px');
                // 过滤fontsize的非法字符，例如xx-large，small等等
                var $allFontSizeTag = $edit.find('[style*="font-size"]');
                $allFontSizeTag.each(function (index, item) {
                    let $item = $(item);
                    if ($item[0].style == undefined) {
                        return;
                    }
                    //如果fontSize不是数字，则需要替换成当前的执行字体大小
                    var fs = $item[0].style.fontSize.replace(/\D+/g, '');
                    if (fs == "" || fs == undefined || Number(fs) <= 0) {
                        $item.css("font-size", data + 'px');
                        // 高亮效果继承处理
                        if ($item.parent().attr('style').indexOf('background') > -1) {
                            $item.css('background-color', $item.parent().css('background-color'));
                        }
                    }
                });
            } else {
                document.execCommand('selectAll');
                document.execCommand('fontSize', false, data + 'px');
                document.execCommand('Unselect');
            }
        });

        /* 字体颜色 */
        // 添加字体颜色 - 保存选择字段
        $tool.find(".colorPick").on('click', function () {
            var $this = $(this);
            save_selection_text = editor_save_selection();
            open_execcommand_list($this);
            var type = $this.hasClass('foreColor') ? 'color' : 'backgroundColor';
            if ($this.hasClass('open')) {
                $tool.find(".commonColor_list").show().css('left', $this.offset().left - 10);
                // 回显选中的颜色
                var $sel = window.getSelection().anchorNode;
                if ($sel.nodeType !== 1) {
                    $sel = $sel.parentNode;
                }
                $tool.find(".commonColor_list i").removeClass('selected');
                $tool.find(".commonColor_list i").each(function () {
                    if ($($sel).css(type) === $this.css('backgroundColor')) {
                        $this.addClass('selected');
                    }
                });
                if ($tool.find(".commonColor_list i.selected").length === 0) {
                    $tool.find(".commonColor_list .default_color i").addClass('selected');
                }
                // 初始化显示系统颜色选项
                $tool.find('.color_choose_name').text('系统颜色');
                $tool.find('.color_choose_panel li').eq(0).show().siblings('li').hide();
            } else {
                $tool.find(".commonColor_list").hide();
            }
            $(document).off('click', toobar_listener).on('click', toobar_listener);
        });
        // 切换系统颜色 & 自定义
        $tool.find('.color_choose_name').on('click', function (e) {
            e.stopPropagation();
            $(this).siblings('.color_choose_list').fadeToggle(200);
        });
        $tool.find('.color_choose_list li').on('click', function (e) {
            e.stopPropagation();
            var $parent = $(this).parent('.color_choose_list');
            $parent.fadeOut(200);
            $parent.siblings('.color_choose_name').text($(this).text());
            $('.color_choose_panel li').eq($(this).index()).show().siblings('li').hide();
        });
        // 点击设置颜色
        $tool.find(".commonColor_list i").on('click', function () {
            var get_color;
            var type = $tool.find('.colorPick.open')[0].classList[0];
            if ($(this).parents('.default_color').length > 0) {
                // 添加字体颜色 - 选择默认颜色去除颜色
                $(this).addClass("selected");
                $tool.find(".other_color i").removeClass("selected");
                get_color = '#747474';
            } else {
                $tool.find(".default_color i").removeClass("selected");
                $(this).addClass("selected").siblings().removeClass("selected");
                get_color = $(this).css('backgroundColor');
            }
            // rgb转hex
            if (get_color.indexOf('rgb(') >= 0) {
                get_color = common.main.rgb2hex(get_color);
            }
            if (save_selection_text) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(save_selection_text.range);
                    document.execCommand(type, false, get_color);
                } else if (document.selection && save_selection_text.range.select) {
                    save_selection_text.range.select();
                    document.execCommand(type, false, get_color);
                }
            } else {
                document.execCommand('selectAll');
                document.execCommand(type, false, get_color);
                document.execCommand('Unselect');
            }
            $tool.find(".colorPick").removeClass("open");
            $tool.find(".commonColor_list").hide();
        });
        // 自定义颜色
        if (window.ColorPicker) {
            var slideIndicator = document.getElementById('slider-indicator');
            var pickerIndicator = document.getElementById('picker-indicator');
            ColorPicker.fixIndicators(slideIndicator, pickerIndicator);
            var color_pircker = ColorPicker(document.getElementById('slider'), document.getElementById('picker'), function (hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {
                if ($tool.find('.colorPick.open').length <= 0) return;
                var type = $tool.find('.colorPick.open')[0].classList[0];
                ColorPicker.positionIndicators(slideIndicator, pickerIndicator, sliderCoordinate, pickerCoordinate);
                if (save_selection_text) {
                    document.execCommand(type, false, hex);
                } else {
                    document.execCommand('selectAll');
                    document.execCommand(type, false, hex);
                    document.execCommand('Unselect');
                }
            });
            color_pircker.setHex('#FF0000');
        }

        /* 行高 */
        $tool.find(".LineHeight").on('click', function () {
            save_selection_text = editor_save_selection();
            open_execcommand_list($(this));
            $(document).off('click', toobar_listener).on('click', toobar_listener);
        });
        $tool.find(".lineHeight_list li").on('click', function () {
            common.main._500dtongji("PC-CV6.9.5-简历编辑页-编辑器-文本编辑器-右侧-行距");
            $tool.find(".LineHeight").removeClass('open');
            var value = $(this).attr('data-value');
            if (save_selection_text) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(save_selection_text.range);
                    document.execCommand("subscript", false);
                } else if (document.selection && save_selection_text.range.select) {
                    save_selection_text.range.select();
                    document.execCommand("subscript", false);
                }
            } else {
                document.execCommand('selectAll');
                document.execCommand('subscript', false);
                document.execCommand('Unselect');
            }
            // execCommand不能直接设置行高  这里使用 subscript 代替
            var need_setcss_dom = $('.moduleItem.current div[contenteditable="true"]').find('[style*="vertical-align: sub;"]');
            var reg = new RegExp("vertical-align: sub", "g");
            var get_css = need_setcss_dom.attr('style').replace(reg, '').split(';');
            get_css.splice(get_css.indexOf('vertical-align:sub'), 1);
            need_setcss_dom.attr('style', get_css.join(';'));
            need_setcss_dom.css("lineHeight", value);
            // 富文本子级继承行高
            need_setcss_dom.find('span[style*="line-height"]').css('lineHeight', 'inherit');
        });

        /* 文本对齐 */
        $tool.find(".Justify").on('click', function () {
            var $this = $(this);
            save_selection_text = editor_save_selection();
            open_execcommand_list($this);
            if ($this.hasClass('open')) {
                var $list = $tool.find(".Justify_list");
                var $li = $tool.find(".Justify_list li");
                $li.each(function () {
                    if ($edit.css('text-align') === $this.attr('data-value')) {
                        $this.addClass('selected').siblings().removeClass('selected');
                    }
                });
                if ($list.find('.selected').length === 0) {
                    $li.eq(0).addClass('selected');
                }
            }
            $(document).off('click', toobar_listener).on('click', toobar_listener);
        });
        $tool.find(".Justify_list li").on('click', function () {
            var type = $(this).attr('data-value');
            $(this).addClass('selected').siblings().removeClass('selected');
            document.execCommand('styleWithCSS', false, true);
            document.execCommand('selectAll');
            switch (type) {
                case 'left':
                    document.execCommand('justifyLeft');
                    break;
                case 'center':
                    document.execCommand('justifyCenter');
                    break;
                case 'right':
                    document.execCommand('justifyRight');
                    break;
            }
            document.execCommand('Unselect');
        });

        /* 有序无序列表 */
        $tool.find(".textOrder").on('click', function () {
            var $this = $(this);
            save_selection_text = editor_save_selection();
            open_execcommand_list($this);
            if ($this.hasClass('open')) {
                var $list = $this.find('.list_item');
                var $li = $list.find('li');
                var type = $this[0].classList[2];
                var style = '';
                if (type === 'insertOrderedList') {
                    var $ol = $edit.find('ol').eq(0);
                    var ol_style = $ol.attr('class') || $ol.css('listStyleType');
                    style = ol_style || 'none';
                } else {
                    var $ul = $edit.find('ul').eq(0);
                    var ul_style = $ul.attr('class') || $ul.css('listStyleType')
                    style = ul_style || 'none';
                }
                $li.each(function () {
                    if (style === $this[0].className) {
                        $this.addClass('selected').siblings().removeClass('selected');
                    }
                });
            }
            $(document).off('click', toobar_listener).on('click', toobar_listener);
        });
        $tool.find(".textOrder .list_item li").on('click', function () {
            var type = $(this).parents('.textOrder')[0].classList[2];
            var style = $(this)[0].className;
            var text = '';
            $(this).addClass('selected').siblings().removeClass('selected');
            // 无选中文本情况 - 选中全部
            if (!save_selection_text || save_selection_text.text.length <= 0) {
                $edit.focus();
                document.execCommand('selectAll');
                save_selection_text = editor_save_selection();
            }
            text = save_selection_text.sel;
            // 存在选中文本情况 - 设置列表
            if (save_selection_text) {
                // 获取富文本内 span 标签 -> 保留标签样式
                let $span = $edit.find('span');
                $span.each(function () {
                    $(this).before('<span style="font-size:0;">wd_savecss</span>');
                });
                // 序列表样式设置处理
                if (style !== 'none') {
                    // 设置有序无序列表 列表项标志
                    if (type === 'insertOrderedList') {
                        if ($(text.anchorNode).parents('ol').length === 0) {
                            document.execCommand("styleWithCSS", false, true);
                            document.execCommand(type);
                        }
                        $(text.anchorNode).parents('ol').css('list-style-type', style);
                    } else {
                        if ($(text.anchorNode).parents('ul').length === 0) {
                            document.execCommand("styleWithCSS", false, true);
                            document.execCommand(type);
                        }
                        $(text.anchorNode).parents('ul').removeAttr('class');
                        if (['disc', 'square'].indexOf(style) >= 0) {
                            $(text.anchorNode).parents('ul').css('list-style-type', style);
                        } else {
                            $(text.anchorNode).parents('ul').attr('class', style).css('list-style-type', 'none');
                        }
                    }
                }
                // 选区移除序列表 - 遍历编辑区域内所有的dom，is_conntains是否在选区中
                else {
                    $edit.find('*:not(br)').each(function (i, item) {
                        let is_contains = text.containsNode(item, true);
                        if (is_contains) {
                            if ($(item).is('ol') || $(item).parents('ol').length > 0) {
                                document.execCommand("styleWithCSS", false, true);
                                document.execCommand('insertOrderedList');
                            }
                            if ($(item).is('ul') || $(item).parents('ul').length > 0) {
                                document.execCommand("styleWithCSS", false, true);
                                document.execCommand('insertUnorderedList');
                            }
                        }
                    });
                }
                // 去除保留样式标识
                if ($edit[0].innerHTML.indexOf("wd_savecss") >= 0) {
                    let reg = new RegExp('wd_savecss', 'gi'),
                        html = $edit[0].innerHTML;
                    $edit[0].innerHTML = html.replace(reg, "");
                }
                // 重新获取 span 标签
                $span = $edit.find("span");
                $span.each(function () {
                    let $this = $(this), background;
                    // 不继承子节点的高亮设置
                    if ($this[0].style.cssText.indexOf('background') >= 0) {
                        background = $this.css('background-color');
                        $this.css('background', 'none');
                    }
                    // 恢复子节点高亮设置
                    $this.css('background', background);
                    // 去除多余空标签
                    if ($this.text() === '' && $this.css('font-size') === '0px') $this.remove();
                });
            }
        });

        /* 图片 */
        $tool.find('#inputTextImage').on('change', function () {
            var file = this.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function () {
                var img = new Image();
                img.src = reader.result;
                img.onload = function () {
                    cvmutual.main.upload_cropper_image({
                        value: file,
                        fileName: file.name,
                        success: function (src) {
                            document.execCommand('insertImage', false, src);
                            var $img = $('img[src="'+ src +'"]');
                            var parent = $img.parents('div[contenteditable="true"]');
                            $img.attr('data-id', cvmutual.main.makeId());
                            if (img.width > parent.width()) {
                                $img.css('width', parent.width());
                            }
                            // 模拟点击进入裁剪状态，只在刚插入时触发
                            $img.one('load', function () {
                                $img.click();
                                setTimeout(function () {
                                    $('#image_resizable').dblclick();
                                }, 30);
                            });
                        }
                    });
                }
            }
            reader.readAsDataURL(file);
            $(this).val('');
        });
        // 富文本内图片操作
        cvmutual.main.richtext_image_operate();
    },
    // 富文本图片相关功能
    richtext_image_operate: function () {
        var $rich = $('.moduleItem .dd-content .dd-text div[contenteditable]');
        // 进入图片编辑状态
        $rich.on('click', function (event) {
            if (event.target.tagName !== 'IMG') {
                return;
            }
            var $this = $(this);
            $this.blur();
            // 生成图片缩放控制元素
            var $img = $(event.target);
            var maxWidth = $this.width();
            // 没有原图地址的情况下，当前图片就是原图
            if (!$img.attr('data-src')) {
                $img.attr('data-src', $img.attr('src'));
            }
            var css = $img.offset();
            css.width = $img.width();
            css.height = $img.height();
            var $resize = $('<div id="image_resizable" class="image_resizable" data-id="'+ $img.attr('data-id') +'" tabindex="0"><div class="resizable-container"></div></div>').css(css);
            $('body').append($resize);
            // 聚焦元素，绑定事件
            $resize.focus();
            $resize.on('keyup', function (event) {
                // 按键事件
                var key = event.keyCode;
                switch (key) {
                    // 删除
                    case 8:
                    case 46:
                        $(this).remove();
                        $img.remove();
                        $this.focus();
                        break;
                    // 方向键调整光标
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                        $(this).remove();
                        $this.focus();
                        break;
                }
            }).on('dblclick', function () {
                // 图片裁剪
                cvmutual.main.common_cropper_operate({
                    image: $img.attr('data-src'),
                    originUploadDone: function (src) {
                        $img.attr('data-src', src);
                    },
                    cropperDone: function (src, rect) {
                        var width = rect.width;
                        if (width > maxWidth) {
                            width = maxWidth;
                        }
                        $img.attr('src', src).css({
                            'width': width,
                            'height': '',
                        });
                        $resize.remove();
                        cvresume.main.resume_page();
                        cvresume.main.delay_resume_save();
                    },
                });
            });
            // 图片缩放操作
            $resize.find('.resizable-container').resizable({
                aspectRatio: true,
                edge: 0,
                aspectRatio: true,
                maxWidth: maxWidth,
                handles: 'ne, se, sw, nw',
                resize: function (event, ui) {
                    var $resize = ui.element.parents('#image_resizable');
                    var css = $img.offset();
                    css.width = ui.size.width + 2;
                    css.height = ui.size.height + 2;
                    $resize.css(css);
                    $img.css({
                        'width': ui.size.width,
                        'height': ui.size.height,
                    });
                },
                stop: function () {
                    cvresume.main.resume_page();
                    cvresume.main.delay_resume_save();
                },
            });
        });
    },
    // 富文本图片自适应更新
    richtext_image_adapt: function($module){
        var $content = $module.find('.dd-content');
        $content.each(function(){
            var $this = $(this);
            var $rich = $this.find('.dd-text div[contenteditable]');
            var $img = $rich.find('img');
            var maxWidth = $rich.width();
            var ratio = $img.width() / $img.height();
            if ($img.length && $img.width() > maxWidth) {
                $img.css({
                    width: maxWidth,
                    height: maxWidth / ratio,
                })
            }
        })
    },
    // 富文本图片缩放工具自适应更新
    richtext_image_resizable_adapt: function () {
        var $resize = $('#image_resizable');
        if ($resize.length) {
            var id = $resize.attr('data-id');
            var rect = $('img[data-id="'+ id +'"]').offset();
            $resize.css(rect);
        }
    },
    

    // 设置封面
    set_coverItem:function(){
        $('.wbdCv-baseStyle').on("click",".coverItem .baseItem-toolbar .add",function(){
            var $coverlist = '<div class="cover-list moduleItemList"><a class="wbdfont divIconFont">&#xe88c;</a><div contenteditable="true" data-placeholder="自定义"></div><a class="delete 500dtongji" data_track="PC-在线制作-'+cvmutual.info.resume_type+'编辑页-中间简历编辑-{0}-删除"></a></div>';        		
            var $conchild = $(".coverItem .cover-con");
            $conchild.append($coverlist);
        });    		
    },
	set_infoItem:function(){
		function click_baseMsgModal_openMore(){
			var open =  $(this).attr("data-open");
			if(open == "false"){
				$(".moreMsg").eq(0).css("display","block");
				$(this).attr("data-open","true");
			}else{
				$(".moreMsg").eq(0).css("display","none");
				$(this).attr("data-open","false")
			}
		}
        function click_baseMsgModal_adddefind(){
            var dom = $("<div  data-panel='defind' class='add'></div>").html("<input type='text' placeholder='字段名称' class='defindName' maxlength='5'><input type='text' placeholder='字段内容不超过20个字' maxlength='20' class='defindContent'><a href='javascript:;' class='closeDefind'></a>");
            dom.insertBefore($(this));
            if($("#openMore").css("margin-top") == "46px"){
                $("#openMore").removeAttr("style")
            }
        }
        function click_baseMsgModal_closeDefind(){
            $(this).parent("div").remove();
            if($(".defindItem").length <= 0){
                $("#openMore").css("margin-top","46px")
            }
        }
        $("#baseMsg-modal #openMore").on("click",click_baseMsgModal_openMore);
        $(document).on('click','#addDefind',click_baseMsgModal_adddefind);
        $(document).on('click','.closeDefind',click_baseMsgModal_closeDefind);
        $(document).on("click",".bInfoItem .baseItem-toolbar span.edit,.info-list span",function(){
            $("#baseMsg-modal").modal("show");
            cvmutual.main.get_infoToModal();
            if($(this).parents(".socialItem").length > 0){
                $("#baseMsg-modal #openMore").attr("data-open","true");
				$(".moreMsg").eq(0).css("display","block");
				setTimeout(function(){
                    $("#baseMsg-modal .modal-dialog").scrollTop(400)
				},400)
			}else{
                setTimeout(function(){
                    $("#baseMsg-modal .modal-dialog").scrollTop(0)
                },400)
			}
        });
        $("#baseMsg-modal .modal-footer .submit").click(function(){
        	$(".wormItem").each(function(){
        		$(this).children().unwrap()
			});
        	var missDefind, missSelf, NaN, check_input;
			if($("[data-panel='defind']").length > 0){
                $("[data-panel='defind']").each(function(){
                	if(($(this).children(".defindName").val() == "" && $(this).children(".defindContent").val() == "") || ($(this).children(".defindName").val() != "" && $(this).children(".defindContent").val() != "")){
                        missDefind = false;
					}else{
						missDefind = true;
						return missDefind;
					}
				})
			}else{
				missDefind = false;
			}
			if($("[data-panel='homePage']").length > 0){
				$("[data-panel='homePage']").each(function(){
					if(($(this).find("[name=homeUrl]").val() == "" && $(this).find("[name=homeDesc]").val() == "") || ($(this).find("[name=homeUrl]").val() != "" && $(this).find("[name=homeDesc]").val() != "")){
                        missSelf = false;
					}else{
						missSelf = true;
						return missSelf;
					}
				})
			}else{
				missSelf = false;
			}
            check_input = cvmutual.main.check_input();
            if($(".NaN").length > 0){NaN = true}else{NaN = false}
			if(missDefind || missSelf || NaN || check_input){
                $("[data-panel='defind']").each(function () {
                    if(($(this).children(".defindName").val() == "" && $(this).children(".defindContent").val() == "") || ($(this).children(".defindName").val() != "" && $(this).children(".defindContent").val() != "")){}else{
                        $(this).children(".defindName").val() == "" ? $(this).children(".defindName").wrap("<span class='wormItem'></span>") : "";
                        $(this).children(".defindContent").val() == "" ? $(this).children(".defindContent").wrap("<span class='wormItem'></span>") : "";
                    }
                });
                $("[data-panel='homePage']").each(function(){
                    if(($(this).find("[name=homeUrl]").val() == "" && $(this).find("[name=homeDesc]").val() == "") || ($(this).find("[name=homeUrl]").val() != "" && $(this).find("[name=homeDesc]").val() != "")){}else{
                        $(this).find("[name=homeUrl]").val() == "" ? $(this).find("[name=homeUrl]").wrap("<span class='wormItem'></span>") : "";
                        $(this).find("[name=homeDesc]").val() == "" ? $(this).find("[name=homeDesc]").wrap("<span class='wormItem'></span>") : "";
                    }
                });
                $(".wormItem").children().hover(function(){
                    $(".wormItem").children().unwrap("<span class='wormItem'></span>");
				})
			}else{
                $("#baseMsg-modal").modal("hide");
                var head = $('[data-panel=head]').val(),
					name = $("[data-panel=name]").val(),
                    word = $("[data-panel=one]").val() === '' ? '一句话介绍自己，告诉HR为什么选择你而不是别人' : $("[data-panel=one]").val(),
                    word_show = $('.roundToggleBtn[data-panel="minSummaryShow"]').hasClass('off'),
                    age = $("[data-panel=birthday]").val(),
                    phone = $("[data-panel=phone]").val(),
                    email = $("[data-panel=email]").val(),
                    work = $("[data-panel=work]").siblings('span').text(),
                    work_val = $("[data-panel=work]").val(),
                    highedu = $("[data-panel=highedu]").siblings('span').text(),
                    highedu_val = $("[data-panel=highedu]").val(),
                    nation = $("[data-panel=nation]").val(),
                    marital = $("[data-panel=marital]").siblings('span').text(),
                    marital_val = $("[data-panel=marital]").val(),
                    status = $("[data-panel=status]").siblings('span').text(),
                    status_val = $("[data-panel=status]").val(),
                    height = $("[data-panel=height]").val(),
                    weight = $("[data-panel=weight]").val(), h_w,
                    $sex = $(".sexItem label :checked"),
                    $home_page = $("[data-panel=homePage]"),
                    $defined = $("[data-panel=defind]");

                if(head === 'show'){
                    $('#resume_head').removeClass('hidden')
                }else{
                    $('#resume_head').addClass('hidden')
                }
                $(".name-con .name").text(name);
                $(".name-con .word").text(word);
                if (word_show) {
                    $(".name-con .word").removeClass('hidden');
                } else {
                    $(".name-con .word").addClass('hidden');
                }
                if(age !== ""){
                    var this_year = new Date().getFullYear(),
                        birth = age.split('.'),
                        age_text = this_year - birth[0];
                    if(cvresume.info.language === "en" || common.main.getUrlParamsValue("language") === "en"){
                        age_text = age_text + " years old"
                    }else{
                        age_text = age_text + "岁"
                    }
                    $(".info-age span").attr("data-value", age).text(age_text);
                    $(".info-age").removeClass('hidden');
                }else{
                    $(".info-age span").text("").attr("data-value","");
                }                       // age
                if(phone === ""){
                   $(".info-phone span").text("");
                }else{
                   $(".info-phone span").text(phone);
                   $(".info-phone").removeClass("hidden");
                }                    // phone
                if(email === ""){
                    $(".info-email span").text("");
                }else{
                    $(".info-email span").text(email);
                    $(".info-email").removeClass("hidden");
                }                    // email
                if(work === "选择工作年限"){
                    $(".info-work span").text("").attr("data-value", "");
                }else{
                    $(".info-work span").text(work).attr("data-value", work_val);
                    $(".info-work").removeClass("hidden");
                }           // work
                if($sex.length > 0){
                    $(".info-sex span").text($sex.prev().text());
                    $(".info-sex").removeClass("hidden");
                }else{
                    $(".info-sex span").text("");
                    $(".info-sex").addClass("hidden");
                }                 // sex
                if(highedu === "选择最高学历"){
                    $(".info-highedu span").text("").attr("data-value", "");
                    $(".info-highedu").addClass("hidden");
                }else{
                    $(".info-highedu span").text(highedu).attr("data-value", highedu_val);
                    $(".info-highedu").removeClass("hidden");
                }       // highedu
                if(nation === ""){
                    $(".info-nation span").text("");
                    $(".info-nation").addClass("hidden");
                }else{
                    $(".info-nation span").text(nation);
                    $(".info-nation").removeClass("hidden");
                }                  // nation
                if(marital === "选择婚姻状况"){
                    $(".info-marital span").text("").attr("data-value", "");
                    $(".info-marital").addClass("hidden");
                }else{
                    $(".info-marital span").text(marital).attr("data-value", marital_val);
                    $(".info-marital").removeClass("hidden");
                }      // marital
                if(status === "选择政治面貌"){
                    $(".info-status span").text("").attr("data-value", "");
                    $(".info-status").addClass("hidden");
                }else{
                    $(".info-status span").text(status).attr("data-value", status_val);
                    $(".info-status").removeClass("hidden");
                }       // status
                if(height === "" && weight === ""){
                    $(".info-height").addClass("hidden").children("span").attr("data-value","").text("");
                    $(".info-weight").addClass("hidden").children("span").attr("data-value","");
                }else if(height !== "" && weight !== ""){
                    h_w = height + "cm/" + weight + "kg";
                    $(".info-height").removeClass("hidden").children("span").attr("data-value",height).text(h_w);
                    $(".info-weight").addClass("hidden").children("span").attr("data-value",weight);
                }else{
                    if(height !== ""){
                        h_w = height + "cm";
                        $(".info-height").removeClass("hidden").children("span").attr("data-value",height).text(h_w);
                        $(".info-weight").addClass("hidden").children("span").attr("data-value","");
                    }else{
                        h_w = weight.val() + "kg";
                        $(".info-height").removeClass("hidden").children("span").attr("data-value","").text(h_w);
                        $(".info-weight").addClass("hidden").children("span").attr("data-value",weight);
                    }
                }				// height && weight
                if($home_page.length >0 && $home_page.eq(0).find("[name=homeUrl]").val() !== "" && $home_page.eq(0).find("[name=homeDesc]").val() !== ""){
                    $(".homeItem").removeClass("hidden");
                    $(".home-con").html("");
                    var inner = "";
                    $home_page.each(function(){
                        var key = typeof $(this).attr("data-value") === 'undefined' ? cvmutual.main.makeId() : $(this).attr("data-value");
                        var icon = typeof $(this).attr('data-iconFont') === 'undefined' ? "&#xe8e6;" : $(this).attr('data-iconFont');
                        var $url;
                        if($(this).find('input').eq(1).val().indexOf("http://") >= 0 || $(this).find('input').eq(1).val().indexOf("https://") >= 0){
                            $url = $(this).find('input').eq(1).val();
                        }else{
                            $url = "http://" + $(this).find('input').eq(1).val();
                        }
                        inner += "<div class='home-list moduleItemList' id='"+ key +"'><a class='wbdfont divIconFont' for-key='"+ key +"'>"+ icon +"</a><a class='name' href='"+ $url +"' target='_blank'>"+ $(this).find('input').eq(0).val() +"</a><a class='delete'></a></div>"
                    });
                    $(".home-con").html(inner);
                }else{
                    $(".homeItem").addClass("hidden");
                    $(".home-con").html("");
                }       // self
                if($defined.length > 0 && $defined.children("input").eq(0).val() !== "" && $defined.children("input").eq(1).val() !== ""){
                    $(".info-defind").remove();
                    $defined.each(function(){
                        if($(this).find('.defindContent').val() !== ""){
                            var key = cvmutual.main.makeId();
                            var icon = typeof $(this).attr('data-iconFont') === 'undefined' ? "&#xe70f;" : $(this).attr('data-iconFont');
                            $(this).attr("data-value",key);
                            var inner = $("<div class='info-defind info-list' id='"+ key +"'></div>").html("<a title='"+ $(this).find(".defindName").val() +"' class='wbdfont divIconFont' for-key='"+ key +"'>"+ icon +"</a><span>"+ $(this).find(".defindContent").val() +"</span><a class='delete'></a>");
                            inner.appendTo($(".info-con"));
                        }
                    })
                }else{
                    $(".info-defind").remove();
                }       // defind

                if($("[data-panel = 'city']").attr('data-name') == "" || $("[data-panel = 'city']").attr('data-name') == "意向城市"){
                    $(".info-city span").text("");
                    $(".info-city").addClass("hidden");
                }else{
                    $(".info-city span").text($("[data-panel = 'city']").attr('data-name')).attr("data-value",$("[data-panel = 'city']").val());
                    $(".info-city").removeClass("hidden");
                }       // city

                if($(".infoItem .info-list.hidden").length<12){
                	$(".infoItem").removeClass("hidden");
                }
                cvresume.main.delay_resume_save();
            }
            // 处理基本信息样式
            cvresume.main.moduleItemList_handlestyle();
        });
        $("#baseMsg-modal .modal-footer .cancel").click(function(){
            $(".NaN").removeClass("NaN");
            $(".wrong_input").removeClass("wrong_input");
            cvmutual.main.get_infoToModal();
            $("#baseMsg-modal").modal("hide");
		});

        // 出生日期选择器时间绑定
        var rang = {
            birth_year_max : new Date().getFullYear(),
            birth_year_min : new Date().getFullYear() - 60
        };
        // 显示 || 隐藏 出生日期选择器
        $(document).on('click', '.birthItem .item-content', function(e){
            var $birth = $('input[data-panel=birthday]'),
                $birth_select = $('.birth_select'),
                birth_val = $birth.val(),
                year_min, year_max, year_boj;
            if($birth_select.hasClass('show')){
                // 判断已显示选择器时，隐藏选择器
                $birth_select.removeClass('show');
                var select_year = $birth_select.find('.birth_year').attr('data-value') || null,
                    select_month = $birth_select.find('.birth_month').attr('data-value') || null;
                // 当 已选年份 & 已选月份时重置出生年月
                if(select_year && select_month){
                    $birth.val(select_year + '.' + select_month);
                    $birth.prev().text(select_year + '年' + select_month + '月');
                }
                // 重置选择器
                $birth_select.find('.birth_year').show().siblings().hide();
                $birth_select.find('.current').removeClass('current');
            }else{
                // 判断已隐藏选择器时，显示选择器
                $birth_select.addClass('show');
                if(birth_val.length > 0){
                    // 当存在已选时间情况
                    var birth_year = birth_val.split('.')[0],
                        birth_month = birth_val.split('.')[1],
                        year_index = Math.floor((birth_year - rang.birth_year_min)/12);
                    year_min = rang.birth_year_min + year_index * 12;
                    year_max = year_min + 11;
                    year_boj = cvmutual.main.set_time_year(year_min, year_max,rang);

                    $birth_select.find('.years_rang').text(year_boj.title);
                    $birth_select.find('.birth_year_body').html(year_boj.content);
                    // 回显已选年份
                    $birth_select.find('.birth_year_body span').each(function(){
                        if($(this).text() === birth_year){$(this).addClass('current');}
                    });
                    // 回显已选月份
                    $birth_select.find('.birth_month_body span').each(function(){
                        if($(this).attr('data-value') === birth_month){$(this).addClass('current').siblings().removeClass('current')}
                    });
                }else{
                    // 未选时间情况
                    year_max = rang.birth_year_max - 12;
                    year_min = year_max - 11;
                    year_boj = cvmutual.main.set_time_year(year_min, year_max, rang);

                    $birth_select.find('.years_rang').text(year_boj.title);
                    $birth_select.find('.birth_year_body').html(year_boj.content);
                }
            }
            // 判断上一页是否显示
            if(year_min <= rang.birth_year_min){
                $birth_select.find('.prev_years').hide()
            }else{
                $birth_select.find('.prev_years').show()
            }
            // 判断下一页是否显示
            if(year_max >= rang.birth_year_max){
                $birth_select.find('.next_years').hide()
            }else{
                $birth_select.find('.next_years').show()
            }
            e.stopPropagation();
        });
        // 年份点击事件
        $(document).on('click', '.birth_select .birth_year_body span', function(e){
            var $year = $('.birth_select .birth_year'),
                $month = $('.birth_select .birth_month'),
                year = $(this).text();
            $year.attr('data-value', year).hide();
            $month.find('.birth_month_header').text(year);
            $month.show();
            e.stopPropagation();
        });
        // 月份点击事件
        $(document).on('click', '.birth_select .birth_month_body span', function(e){
            var $birth = $('input[data-panel=birthday]'),
                $birth_select = $('.birth_select'),
                $year = $('.birth_select .birth_year'),
                $month = $('.birth_select .birth_month'),
                year = $year.attr('data-value'),
                month = $(this).attr('data-value');
            $month.attr('data-value', month);
            $birth.val(year +'.'+ month);
            $birth.prev().text(year + '年' + month + '月').css('color','#000000');
            $birth_select.removeClass('show');
            // 重置选择器
            $birth_select.find('.birth_year').show().siblings().hide();
            $birth_select.find('.current').removeClass('current');
            e.stopPropagation();
        });
        // 出生日期 - 上下页点击
        $(document).on('click', '.birth_select .birth_year_header a', function(e){
            var $this = $(this),
                $birth_select = $('.birth_select'),
                year_rang = $('.birth_select .years_rang').text().split('-'),
                year_min,year_max,year_obj;
            if($this.hasClass('prev_years')){
                year_max = Number(year_rang[0]) - 1;
                year_min = year_max - 11;
                year_obj = cvmutual.main.set_time_year(year_min, year_max, rang);
            }else if($this.hasClass('next_years')){
                year_min = Number(year_rang[1]) + 1;
                year_max = year_min + 11;
                year_obj = cvmutual.main.set_time_year(year_min, year_max, rang);
            }
            $birth_select.find('.years_rang').text(year_obj.title);
            $birth_select.find('.birth_year_body').html(year_obj.content);
            // 判断上一页是否显示
            if(year_min <= rang.birth_year_min){
                $birth_select.find('.prev_years').hide()
            }else{
                $birth_select.find('.prev_years').show()
            }
            // 判断下一页是否显示
            if(year_max >= rang.birth_year_max){
                $birth_select.find('.next_years').hide()
            }else{
                $birth_select.find('.next_years').show()
            }
            e.stopPropagation();
        })
        // 显示隐藏一句话描述
        $('#baseMsg-modal .oneItem .roundToggleBtn').off('click').on('click', function(){
            $(this).toggleClass('off');
        });
	},
	set_inteItem:function(){
		$('.wbdCv-baseStyle').on("click",".inteItem .baseItem-toolbar .edit,.inte-con span",function(){
			cvmutual.main.get_jobToModal();
			$("#jobIntension-modal").modal("show");
			// 意向岗位输入限制
			$("[data-panel = 'inteJob']").attr("maxlength", (cvresume.info.language == "zh" ? 15 : 30));
        });
        // 意向岗位选择器
        $('#jobIntension-modal input[name="jobFunction"]').on('focus', function(){
            if ($('#job_selector:visible').length === 0) {
                var $this = $(this);
                common.main.job_selector_show($('#job_selector'), $this, {
                    checkThree: function(){
                        $this.siblings('.open_status').removeClass('open_select');
                    },
                });
                $this.siblings('.open_status').addClass('open_select');
            }
        });
        $('#jobIntension-modal .job_name_area .open_status').on('click', function(){
            var job_selector = $('#job_selector:visible').length > 0;
            var $this = $(this);
            $this.toggleClass('open_select');
            if ($this.hasClass('open_select')) {
                if (!job_selector) {
                    common.main.job_selector_show($('#job_selector'), $('#jobIntension-modal input[name="jobFunction"]'), {
                        checkThree: function(){
                            $this.removeClass('open_select');
                        },
                    });
                }
            } else {
                $('#jobIntension-modal input[name="jobFunction"]').focus();
                common.main.job_selector_hide($('#job_selector'));
            }
        });
        $('#jobIntension-modal').on('click', function(e){
            // 点击其他地方关闭岗位选择器
            if ($(e.target).parents('.job_name_area').length === 0 && $('#job_selector:visible').length > 0) {
                common.main.job_selector_hide($('#job_selector'));
                $('#jobIntension-modal .job_name_area .open_status').removeClass('open_select');
            }
        });
		$("#jobIntension-modal .modal-footer .submit").click(function(){
		    var job_name = $("[data-panel = 'inteJob']").val(),
                work_city_text = $("[data-panel = 'chosecity']").prev().prev("span").text(),
                work_city_val = $("[data-panel = 'chosecity']").val(),
                work_time_text = $("[data-panel = 'inteTime']").prevAll("span").text(),
                work_time_val = $("[data-panel='inteTime']").val(),
                salary_system = $('input[name=jobSalarySystem]').val(),
                min_job_price = $('input[name=jobMinSalary]').val(),
                max_job_price = $('input[name=jobMaxSalary]').val();

            //判断意向职位
            if(cvresume.main.is_empty(job_name)){
                $(".inte-job span").text("");
            }else{
                $(".inte-job span").text(job_name);
                $(".inte-list.inte-job").removeClass("hidden");
                // 同步岗位名称到案例筛选
                $('.function_panel .panel_case input[name=case_job]').val(job_name);
                // 获取对应岗位的案例
                var job_jsonstr = common.main.get_job_json(),
                    position='';
                if(job_jsonstr.indexOf(job_name) > 0){
                    var job_json = JSON.parse(job_jsonstr);
                    is_break:for(var i in job_json) {
                        for(var j in job_json[i].children) {
                            for(var k in job_json[i].children[j].children) {
                                if (job_json[i].children[j].children[k].name.indexOf(job_name) >= 0) {
                                    position = job_json[i].children[j].children[k].data_url;
                                    break is_break;
                                }
                            }
                        }
                    }
                }
                $('.case_filter_job input[name=case_job]').val(job_name).attr('data-url', position);
                $('.panel_case .change_case').trigger('click');
            }
            //去除工作类型
            $(".inte-type span").text("").attr("data-value","");
            $(".inte-list.inte-type").addClass("hidden");
            //判断意向城市
            if(work_city_text === "选择意向城市"){
                $(".inte-city span").text("").attr("data-value","");
            }else{
                $(".inte-city span").text(work_city_text).attr("data-value",work_city_val);
                $(".inte-list.inte-city").removeClass("hidden");
            }
            //判断最快到岗时间
            if(cvresume.main.is_empty(work_time_val)){
                $(".inte-time span").text("").attr("data-value","");
            }else{
                $(".inte-time span").text(work_time_text).attr("data-value",work_time_val);
                $(".inte-list.inte-time").removeClass("hidden");
            }
            // 判断薪资要求
            if(cvresume.main.is_empty(min_job_price)){
                $(".inte-price span").text('');
            }else if(min_job_price === "0"){
                $(".inte-price span").text(cvresume.info.language == 'en' ? 'Negotiable' : '薪资面议');
                $(".inte-list.inte-price").removeClass("hidden");
            }else{
                var langBar = cvmutual.info.langBar['jobSalarySystem'][cvresume.info.language];
                var jobSalarySystem = langBar[salary_system];
                var job_price_text = '';
                job_price_text += min_job_price;
                if(max_job_price && max_job_price !== min_job_price){
                    job_price_text += '-' + max_job_price;
                }
                if(job_price_text){
                    job_price_text += ($("#resume_base").attr('data_font_type') == 1 ? $.s2t(jobSalarySystem.unit) : jobSalarySystem.unit) + '/' + jobSalarySystem.name;
                }
                $(".inte-price span").text(job_price_text);
                $(".inte-list.inte-price").removeClass("hidden");
            }
            // 隐藏弹框 & 保存
            $("#jobIntension-modal").modal("hide");
            cvresume.main.delay_resume_save();
            // 处理基本信息样式
            cvresume.main.moduleItemList_handlestyle();
		});
        $("#jobIntension-modal .modal-footer .cancel").click(function(){
            cvmutual.main.get_infoToModal();
            $("#jobIntension-modal").modal("hide");
        });
	},
	set_selectControl:function(){
        var $choseParent;
        function selectBoxClick(event){
            // 判断未选择最下薪资时，无法选择最大薪资
            if($(this).attr('id') === 'max_salary_select' && $('input[name=jobMinSalary]').val() === ''){
                return
            }
            // 下拉框容器点击时 展示/隐藏 下拉框
            if(!$(this).attr("data-selected") || $(this).attr("data-selected") === "false"){
                $("div [data-selected]").attr("data-selected","false");
                $("div [data-chosecity]").attr("data-chosecity","false");
                $(this).attr("data-selected","true");
                if($(this).children(".select").css("display") === "block"){
                	if($(this).find(".select li[data-click='selected']").length > 0){
                        var top = $(this).find(".select li[data-click='selected']")[0].offsetTop;
                        $(this).find(".select").scrollTop(top);
					}else{
                        $(this).find(".select").scrollTop(top);
					}
				}
                $("body").bind("click",selectLisener);
            }else if($(this).attr("data-selected") && $(this).attr("data-selected") == "true"){
                $(this).attr("data-selected","false");
                $("body").unbind("click",selectLisener);
            }
            event.stopPropagation();
        }
        function selectLisener(event){
            // 监听 点击范围不在下拉框范围内时收起
            var s = "Select";
            if($("[data-selected = 'true']").length > 0 && event.target.className.indexOf(s) < 0){
                $("[data-selected = 'true']").attr("data-selected","false");
                $("body").unbind("click",selectLisener);
            }else{
                // 监听 选择城市
                var tagName = "LI" || "A";
                var name = event.target.parentNode.className || event.target.parentNode.parentNode.className;
                if($("[data-chosecity = 'true']").length > 0 && event.target.tagName != tagName && name.indexOf(s) < 0){
                    $("[data-chosecity = 'true']").attr("data-chosecity","false");
                    $("body").unbind("click",selectLisener);
                }
            }
        }
        function selectLiClick(event){
            var text, parent = $(this).parent().parent('div');
            text = $(this).text();
            if(parent.children("span").length <= 0){
                var span = $("<span></span>").text(text);
                parent.prepend(span);
            }else{
                parent.children("span").eq(0).text(text).css("color","black");
            }
            $(this).attr("data-click","selected").siblings().attr("data-click","");
            $(this).parents('[data-selected]').find("input[type='hidden']").val($(this).attr("data-value"));

            // 薪资要求选择器重置选项
            if($(this).parents('#salary_system_select').length){
                var val = $(this).attr('data-value');
                var langBar = cvmutual.info.langBar['jobSalarySystem'][cvresume.info.language];
                var jobSalarySystem = langBar[val];
                $('#min_salary_select ul.select li, #max_salary_select ul.select li').each(function(i,item){
                    $(item).text($(item).text().replace(/(千|万|萬|K)/g, jobSalarySystem.unit));
                });
                var $jobMinSalarySpan = $('input[name=jobMinSalary]').siblings('span');
                var $jobMaxSalarySpan = $('input[name=jobMaxSalary]').siblings('span');
                $jobMinSalarySpan.text($jobMinSalarySpan.text().replace(/(千|万|萬|K)/g, jobSalarySystem.unit));
                $jobMaxSalarySpan.text($jobMaxSalarySpan.text().replace(/(千|万|萬|K)/g, jobSalarySystem.unit));
            }
            if($(this).parents('#min_salary_select').length){
                var langBar = cvmutual.info.langBar['jobSalarySystem'][cvresume.info.language];
                var jobSalarySystem = langBar[$('input[name="jobSalarySystem"]').val()];
                var val = Number($(this).attr('data-value'));
                if(isNaN(val)){
                    $('input[name=jobMinSalary]').val(0);
                    $('#max_salary_select > span').text('');
                    $('input[name=jobMaxSalary]').val(0);
                    // 隐藏最大薪资
                    $('#max_salary_select').hide();
                    $('.salary_middle').hide();
                }else{
                    // 显示最大薪资
                    $('.salary_middle').show();
                    $('#max_salary_select').show();
                    // 更新最大薪资下拉选项
                    var $max_salary_select_temp = $('<ul></ul>');
                    $max_salary_select_temp.append($('<li data-value="'+ val +'">不填写</li>'));
                    // minK - min*2
                    for (var i = (val + 1); i <= val * 2; i++) {
                        $max_salary_select_temp.append($('<li data-value="'+ i +'">'+ i + jobSalarySystem.unit + '</li>'));
                    }
                    $('#max_salary_select .select').html($max_salary_select_temp.html());
                    $('input[name=jobMaxSalary]').val(val + 1).siblings('span').text((val + 1) + jobSalarySystem.unit).css('color','#000000');
                }
            }
            event.stopPropagation()
        }
        function choseCity(event){
            $choseParent = $(this).next();
            if(!$(this).attr("data-chosecity") || $(this).attr("data-chosecity") == "false" && !$(this).attr("data-inputcity")){
                $("div [data-selected]").attr("data-selected","false");
                $(this).attr("data-chosecity","true");
                $choseParent.children(".leftSelect").scrollTop($choseParent.children(".leftSelect").find(".leftclick").index()*$choseParent.children(".leftSelect").find(".leftclick").height());

            }else if($(this).attr("data-chosecity") && $(this).attr("data-chosecity") == "true"){
                $(this).attr("data-chosecity","false");
            }
            $choseParent.find(".rightSelect").children('li').eq($choseParent.find(".leftSelect").children(".leftclick").index()).css("display","block");
            $("body").bind("click",selectLisener);

            // 岗位名称选择器兼容
            common.main.job_selector_hide($('#job_selector'));
            $('#jobIntension-modal .job_name_area .open_status').removeClass('open_select');

            event.stopPropagation();
        }
        function click_choseCity_leftSelect() {
            var index = $(this).index();
			$(this).addClass('leftclick').siblings().removeClass('leftclick');
			$choseParent.find(".rightSelect").children().eq(index).css('display','block').siblings().css('display','none')

        }
        function click_choseCity_rightSelect(){
        	if($(this).attr('id') == "defindCity"){
                $choseParent.prev().attr({
                    'data-chosecity':'false',
                    'data-inputcity':'true'
                });
                $choseParent.prev().find(".inputcity").focus().val("");
			}else{
                var text ;
                if($choseParent.find(".leftSelect .leftclick").index() == 0){
                	var attrStr = ".rightSelect [data-value='"+$(this).attr("data-value")+"']";
					var $index = $choseParent.find(attrStr).eq(1).parent().index();
					text = $index > 0 ? $choseParent.find(".leftSelect").children().eq($index).text() + $(this).text() : $(this).text();
				}else if($choseParent.find(".leftSelect .leftclick").index() > 0){
                	text = $choseParent.find(".leftSelect .leftclick").text() + $(this).text();
				} 		// 判断 城市省份
                $choseParent.prev().find("[type= 'hidden']").val($(this).attr("data-value")).attr("data-name",text);
                $(this).addClass("rightclick").siblings().removeClass("rightclick");
                $choseParent.prev().attr('data-chosecity','false');
                $choseParent.prev().find("span").text(text).css("color","black");
			}
        }
        function keydown_choseCity_input(event) {
            if($(this).css('display') == 'block' && event.keyCode == "13"){
                var text = $(this).val();
                $(this).blur();
                $choseParent.prev().removeAttr('data-inputcity');
                $choseParent.prev().find("span").text(text).css("color", "black");
                $choseParent.prev().find("[type= 'hidden']").attr("data-name",text).val("");
            }
        }
        function blur_choseCity_input(){
            var text = $(this).val();
            $choseParent.prev().removeAttr('data-inputcity');
            $choseParent.prev().find("span").text(text).css("color", "black");
            $choseParent.prev().find("[type= 'hidden']").attr("data-name",text).val("");
		}
        $(document).on('click','.bSelect, .sSelect', selectBoxClick);
        $(document).on('click','.bSelect .select li, .sSelect .select li', selectLiClick);
        $(".citySelect").on('click',choseCity);
        $(".leftSelect").on('click',"li",click_choseCity_leftSelect);
        $(".rightSelect").on('click','a',click_choseCity_rightSelect);
        $(".inputcity").on('keypress',keydown_choseCity_input);
        $(".inputcity").on('blur',blur_choseCity_input);
	},

    set_copyToClipBoard:function (str) {
        // 复制到剪贴板
    	 var copyInput = $("<input type='text' value='"+ str +"' style='opacity:1;position:absolute;top:20px;z-index:999;' id='copyText'>");
         $(".in").length >0 ? dom = $(".in")[0] : dom = "body"
         copyInput.appendTo(dom);
         document.getElementById("copyText").select();
         document.execCommand("copy",false,null)
         $("#copyText").remove();
    },
    set_reCommentCase:function (){
        function carouselAnimate(index, newIndex){		// 动画判定
            if(index < newIndex){
                $(".carousel-list .item").eq(index).addClass('leftOut');
                $(".carousel-list .item").eq(newIndex).addClass('rightIn');
            }else if(index > newIndex){
                $(".carousel-list .item").eq(index).addClass('rightOut');
                $(".carousel-list .item").eq(newIndex).addClass('leftIn');
            }
            // 动画过程中不可点击
            $("[data-slide = 'next']").removeClass("carousel-control");
            $("[data-slide = 'prev']").removeClass("carousel-control");
            $(".carousel-pointe li").off('click',indicatorsClick);
            cIndex = newIndex;
            control(newIndex);
        }
        function control(index){		// 顺序判定
            $(".carousel-pointe li").eq(index).addClass("active").siblings().removeClass("active");
            setTimeout(function(){
                // 动画后恢复点击
                if(index >= $(".carousel-list .item").length -1){
                    $("[data-slide = 'next']").removeClass("carousel-control");
                    $("[data-slide = 'prev']").addClass("carousel-control");
                }else if(index <= 0){
                    $("[data-slide = 'next']").addClass("carousel-control");
                    $("[data-slide = 'prev']").removeClass("carousel-control");
                }else{
                    $("[data-slide = 'next']").addClass("carousel-control");
                    $("[data-slide = 'prev']").addClass("carousel-control");
                }
                $(".carousel-pointe li").on('click',indicatorsClick);

                $(".carousel-list .item").removeClass('leftIn leftOut rightIn rightOut');
                $(".carousel-list .item").eq(index).addClass("active").siblings().removeClass("active");
            },1000)
            if(index >= $(".carousel-list .item").length -1){
                $("[data-slide = 'next']").addClass("Uncarousel-control");
                $("[data-slide = 'prev']").removeClass("Uncarousel-control");
            }else if(index <= 0){
                $("[data-slide = 'next']").removeClass("Uncarousel-control");
                $("[data-slide = 'prev']").addClass("Uncarousel-control");
            }else{
                $("[data-slide = 'next']").removeClass("Uncarousel-control");
                $("[data-slide = 'prev']").removeClass("Uncarousel-control");
            }


            event.stopPropagation();
        }
        function indicatorsClick(){
            var newIndex = $(this).index();
            carouselAnimate(cIndex,newIndex);
        }
        $("body").on('click',".carousel-control",function(){
            var cIndex = $(".carousel-list .active").index();
            if($(this).attr("data-slide") == "next"){
                var newIndex;
                if(cIndex+1 >= $(".carousel-list .item").length -1){
                    newIndex = $(".carousel-list .item").length -1;
                    $(this).attr("data-slide", "").addClass("Uncarousel-control").removeClass("carousel-control");
                    $("#reCase-caeousel .left").attr("data-slide","prev").addClass("carousel-control").removeClass("Uncarousel-control");
                }else{
                    newIndex = cIndex+1;
                    $(this).attr("data-slide", "next");
                    $("#reCase-modal .left").attr("data-slide","prev");
                }
                carouselAnimate(cIndex, newIndex);
            }else if($(this).attr("data-slide") == "prev"){
                var newIndex;
                if(cIndex-1 <= 0){
                    newIndex = 0 ;
                    $(this).attr("data-slide","").addClass("Uncarousel-control").removeClass("carousel-control");
                    $("#reCase-caeousel .right").attr("data-slide","next").addClass("carousel-control").removeClass("Uncarousel-control");
                }else{
                    newIndex = cIndex -1;
                    $(this).attr("data-slide","prev");
                    $("#reCase-modal .right").attr("data-slide","next").addClass("carousel-control").removeClass("Uncarousel-control");
                }
                carouselAnimate(cIndex,newIndex);
            }
        });
        $(document).on('click','.carousel-pointe li', indicatorsClick);
    },
	set_changLanguage:function () {
        var a ="language";
        var langBar = cvmutual.info.langBar;
		// 切换英文简历
		function changeLang(){
			if(cvresume.info.language=="en"){
				$("body").attr("data-lang","en");
				if($("[data-textLang]").length > 0){
                    if(cvresume.main.is_empty(cvresume.info.resumeid)){
						$("[data-textLang]").each(function(){
                            var key = $(this).attr("data-textLang");
                            var text = langBar[key] ? langBar[key].en : '';
                            $(this).text(text);
						});
                        $(".skill-list").eq(0).find(".skill-title").text("Skill");
                        $(".skill-list").eq(0).find(".skill-slider").find("span").text("level");
					}else{
                        $("[data-textLang]").each(function(){
                        	var classStr = "'"+$(this).attr("class")+"'";
                        	if (classStr.indexOf("module_item_title") < 0){
                                var key = $(this).attr("data-textLang");
                                var text = langBar[key] ? langBar[key].en : '';
                                $(this).text(text);
							}
						});
                        $(".headItem [data-textLang]").text(langBar[$(".headItem [data-textLang]").attr("data-textLang")].en);
                        $(".infoItem [data-textLang]").text(langBar[$(".infoItem [data-textLang]").attr("data-textLang")].en);
                        //$(".contactItem [data-textLang]").text(eval("langBar." +$(".contactItem [data-textLang]").attr("data-textLang")+ ".en"));
					}
					$("[data-placeLang]").each(function(){
                        var key = $(this).attr("data-placeLang");
                        var text = langBar[key] ? langBar[key].en : '';
						$(this).attr("data-placeholder",text);
					});
				}
			}
		};
		if(cvresume.info.language=="en"||common.main.getUrlParamsValue("language")=="en"){
			cvresume.main.set_language("en");
            changeLang();
            $(".r-createywbar a").find("span").text("创建中文简历");
		};
        // 创建英文简历提示
        $(document).on("click",".r-createywbar a",function(){
        	var $title = "确定创建英文简历吗？", $text = "当前简历我们将自动为你进行保存";
        	var language="en";
        	if(cvresume.info.language=="en"){
        		$title = "确定创建中文简历吗？";
        		language="";
        	}
        	var href="/cvresume/edit/?itemid="+cvresume.info.itemid+"&language="+language;
        	if(cvresume.main.is_empty(cvresume.info.resumeid)){
        		location.href=href;
        	}else{
        		common.main.resume_confirm({
                    title:$title,
                    content:$text,
                    onOk:function(){
    					location.href=href;
                    }
                });
        	}
        });

    },
	makeId:function(){
		var uuid = "";
        for (var i = 1; i <= 32; i++){
            var n = Math.floor(Math.random() * 16.0).toString(16);
            uuid += n;
            if(i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "";
            }
        }
        return uuid;
	},                             
    get_infoToModal:function(){
        $(".wormItem").each(function(){
            $(this).children().unwrap()
        });
        var name = $(".name-con .name").text(),
            word = $(".name-con .word").text(),
            word_show = $(".name-con .word").hasClass('hidden'),
            $birth = $('.birthItem'),
            birth = $(".info-age span").text(),
            phone = $(".info-phone span").text(),
            email = $(".info-email span").text(),
            $work = $("[data-panel='work']"),
            work = $(".info-work span").text(),
            sex = $(".info-sex span").text(),
            $highedu = $("[data-panel='highedu']"),
            highedu = $(".info-highedu span").text(),
            nation = $(".info-nation span").text(),
            $marital = $("[data-panel='marital']"),
            marital = $(".info-marital span").text(),
            $status = $("[data-panel='status']"),
            status = $(".info-status span").text(),
            height = $(".info-height span").attr("data-value"),
            weight = $(".info-weight span").attr("data-value"),
            $defined = $(".info-defind"),
            $home_page = $(".home-con .home-list");

        if($('#resume_head').hasClass('hidden')){
            $('[data-panel=head]').val('hide').prev().text('隐藏').css('color','#000000');
        }else{
            $('[data-panel=head]').val('show').prev().text('显示').css('color','#000000');
        }
        if(name === "你的名字" || name === "Your Name"){
            $("[data-panel='name']").val("")
        }else{
            $("[data-panel='name']").val(name)
        }   // name
        if(word === "" || word ===  "Please Enter a summary" || word === "一句话介绍自己，告诉HR为什么选择你而不是别人"){
            $("[data-panel='one']").val("")
        }else{
            $("[data-panel='one']").val(word)
        }   // word
        if (word_show) {
            $('.roundToggleBtn[data-panel="minSummaryShow"]').removeClass('off');
        } else {
            $('.roundToggleBtn[data-panel="minSummaryShow"]').addClass('off');
        }
        if(birth === "生日" || birth === "" || birth === "Birthday"){
            $birth.find('.item-content>span').text('选择年月').removeAttr('style');
            $birth.find('[data-panel=birthday]').val('');
        }else{
            var age = $(".info-age span").attr('data-value');
            $birth.find('.item-content>span').text(birth).css('color','#000000');
            $birth.find('[data-panel=birthday]').val(age);
        }       // age
        if(phone === "联系电话" || phone === "" || phone === "Mobile"){
            $("[data-panel='phone']").val("")
        }else{
            $("[data-panel='phone']").val(phone)
        }   // phone
        if(email === "电子邮箱" || email === "" || email === "Email"){
            $("[data-panel='email']").val("")
        }else{
            $("[data-panel='email']").val(email)
        }   // email
        if(work === "工作年限" || work === ""){
            $work.prev().text("选择工作年限").removeAttr("style");
            $work.next().children().removeAttr("data-click");
            $work.val("");
        }else{
            $work.attr("value",$(".info-work span").attr("data-value")).prev().text(work).css("color","black");
            $work.next().children("[data-value='"+ $(".info-work span").attr("data-value") +"']").attr("data-click","selected").removeAttr("data-click");
        }   // work
        if(sex === "性别" || sex === ""){
            $("#sexB , #sexG").removeAttr("checked");
            $("[data-panel='sex']").val("")
        }else if(sex === "男"){
            $("#sexB").click();
            $("[data-panel='sex']").val(sex)
        }else if(sex === "女"){
            $("#sexG").click();
            $("[data-panel='sex']").val(sex)
        }   // sex
        if(highedu === "最高学历" || highedu === ""){
            $highedu.prev().text("选择最高学历").removeAttr("style");
            $highedu.next().children().removeAttr("data-click");
            $highedu.val("");
        }else{
            $highedu.attr("value",$(".info-highedu span").attr("data-value")).prev().text(highedu).css("color","black");
            $highedu.next().children("[data-value='"+$(".info-highedu span").attr("data-value")+"']").attr("data-click","selected").siblings().removeAttr("data-click");
        }   // highedu
        if(nation === "民族" || nation === ""){
            $("[data-panel='nation']").val("");
        }else{
            $("[data-panel='nation']").val(nation)
        }   // nation
        if(marital === "婚姻状况" || marital === ""){
            $marital.prev().text("选择婚姻状况").removeAttr("style");
            $marital.next().children().removeAttr("data-click");
            $marital.val("")
        }else{
            $marital.attr("value",$(".info-marital span").attr("data-value")).prev().text(marital).css("color","black");
            $marital.next().children("[data-value='"+$(".info-marital span").attr("data-value")+"']").attr("data-click","selected").siblings().removeAttr("data-click");
        }   // marital
        if(status === "政治面貌" || status === ""){
            $status.prev().text("选择政治面貌").removeAttr("style");
            $status.next().children().removeAttr("data-click");
            $status.val("")
        }else{
            $status.attr("value",$(".info-status span").attr("data-value")).prev().text(status).css("color","black");
            $status.next().children("[data-value='"+$(".info-status span").attr("data-value")+"']").attr("data-click","selected").siblings().removeAttr("data-click");
        }   // status
        if(cvresume.main.is_empty(height)){
            $("[data-panel='height']").val("");
        }else{
            $("[data-panel='height']").val(height);
        }   // height
        if(cvresume.main.is_empty(weight)){
            $("[data-panel='weight']").val("");
        }else{
            $("[data-panel='weight']").val(weight)
        }   // weight
        if($defined.length > 0){
            $(".defindItem").html("");
            var inner = $('<div></div>');
            $defined.each(function () {
                var $div = $('<div data-panel="defind" class="add" data-value="'+ $(this).attr("id") +'" data-iconFont=""></div>');
                $div.attr('data-iconFont', $(this).children(".divIconFont").text());

                var $input_defindName = $('<input type="text" placeholder="字段名称" class="defindName" maxlength="5" value="" />');
                $input_defindName.attr("value",$(this).find('a').attr('title'));
                $div.append($input_defindName);

                var $input_defindContent = $('<input type="text" placeholder="字段内容不超过20个字" class="defindContent" maxlength="20" value="" />');
                $input_defindContent.attr("value",$(this).find("span").text());
                $div.append($input_defindContent);

                var $closeDefind = $('<a href="javascript:;" class="closeDefind"></a>');
                $div.append($closeDefind);

                inner.append($div);
            });
            inner.append('<a href="javascript:;" class="openDefind" id="addDefind">自定义字段</a>');
            $(".defindItem").html(inner.html());
        }   // defind
        if($home_page.length > 0){
            $(".self_bar .self_list").remove();
            $(".home-con .home-list").each(function(){
                var $self_list = $('<li class="self_list" data-panel="homePage"></li>');
                var $content = $('<div></div>');
                $content.append('<div class="self_list_header"></div>');

                var $self_list_body = $('<div class="self_list_body"></div>');
                
                var $homeDesc = $('<input type="text" name="homeDesc" placeholder="添加主页描述（10字以内）" maxlength="10" value="">');
                $homeDesc.val($(this).find('.name').text());
                $self_list_body.append($homeDesc);

                var $homeUrl = $('<input type="text" name="homeUrl" placeholder="输入个人主页" value="">');
                $homeUrl.val($(this).find('.name').attr('href'));
                $self_list_body.append($homeUrl);

                $content.append($self_list_body);

                $content.append($('<div class="self_list_footer"></div>'));
                
                $self_list.attr({
                    "data-value": $(this).find(".divIconFont").attr("for-key"),
                    "data-iconFont": $(this).find(".divIconFont").text(),
                });
                $self_list.html($content.html());
                $self_list.appendTo($(".self_bar"))
            });
        }else{
            $(".self_bar .self_list").remove();
        }// self

        if($(".info-city span").text() == "所在城市" || $(".info-city span").text() == "" || $(".info-city span").text() == "City"){
            $("[data-panel='city']").prev().prev().text("选择城市").removeAttr("style");
            $("[data-panel='city']").val("").attr("data-name", "");
            $("[data-panel='city']").parent().next().children().children().eq(0).addClass("leftclick").siblings().removeAttr("class");
            $("#baseMsg-modal [data-inputcity='true']").removeAttr("data-inputcity");
        }else{
            var city = $(".info-city span").text();
            $("[data-panel='city']").prev().prev().text(city).css("color","black");
            if(cvresume.main.is_empty($(".info-city span").attr("data-value"))){
            	$("#baseMsg-modal .doubleSelect .leftSelect").children().eq(0).addClass("leftclick").siblings().removeClass("leftclick");
                $("#baseMsg-modal .doubleSelect .rightSelect").children().eq(0).show().siblings().hide();
                $("#baseMsg-modal .doubleSelect .rightclick").removeClass("rightclick");
                $("[data-panel='city']").attr("data-name",city);
			}else{
                $("[data-panel='city']").attr({"data-name" : city, "value": $(".info-city span").attr("data-value")});
                var $right = $("[data-panel='city']").parent().next().find("[data-value='"+$(".info-city span").attr("data-value")+"']");
                var $index = $right.parent().index();
                $right.addClass("rightclick").siblings().removeClass("rightclick").parent().show().siblings().hide();
                $("[data-panel='city']").parent().next().children().eq(0).children().eq($index).addClass("leftclick").siblings().removeClass("leftclick");
			}
            $("#baseMsg-modal [data-inputcity='true']").removeAttr("data-inputcity");
        }       // city
	},
	get_jobToModal:function(){
        $(".wormItem").each(function(){
            $(this).children().unwrap()
        });

		var job_name = $(".inte-job span").text(),		// 岗位名称
			work_city = $(".inte-city span").text(),	// 工作城市
			work_time = $(".inte-time span").text(),	// 到岗时间
			job_price = $(".inte-price span").text();	// 工作薪资

        if(job_name === '' || job_name === '意向岗位' || job_name === 'Function'){
            $("[data-panel= 'inteJob']").val("");
        }else{
            $("[data-panel= 'inteJob']").val(job_name);
        }   // 判断意向岗位
        if(work_city === '' || work_city === 'Location'){
            $("[data-panel='chosecity']").val("").attr("data-name", "");
            $("[data-panel='chosecity']").parent().find("span").text("选择意向城市").removeAttr("style");
            $("[data-panel='chosecity']").parent().next().children().children().eq(0).addClass("leftclick").siblings().removeAttr("class");
            $("#jobIntension-modal [data-inputcity='true']").removeAttr("data-inputcity");
        }else{
            var city = $(".inte-city span").text();
            $("[data-panel='chosecity']").prev().prev().text(city).css("color","black");
            if(cvresume.main.is_empty($(".inte-city span").attr("data-value"))){
                $("#jobIntension-modal .doubleSelect .leftSelect").children().eq(0).addClass("leftclick").siblings().removeClass("leftclick");
                $("#jobIntension-modal .doubleSelect .rightSelect").children().eq(0).show().siblings().hide();
                $("#jobIntension-modal .doubleSelect .rightclick").removeClass("rightclick");
                $("[data-panel='chosecity']").attr("data-name",city);
            }else{
                $("[data-panel='chosecity']").attr({"data-name" : city, "value": $(".inte-city span").attr("data-value")});
                var $right = $("[data-panel='city']").parent().next().find("[data-value='"+$(".inte-city span").attr("data-value")+"']");
                var $index = $right.parent().index();
                $right.addClass("rightclick").siblings().removeClass("rightclick").parent().show().siblings().hide();
                $("[data-panel='chosecity']").parent().next().children().eq(0).children().eq($index).addClass("leftclick").siblings().removeClass("leftclick");
            }
            $("#jobIntension-modal [data-inputcity='true']").removeAttr("data-inputcity");
        }        // 判断工作城市
        if(work_time === '' || work_time === 'Duty Time'){
            $("[data-panel='inteTime']").val("");
            $("[data-panel='inteTime']").prev().text("选择入职时间").removeAttr("style");
        }else{
            $("[data-panel='inteTime']").attr("value",$(".inte-time span").attr("data-value")).prev().text($(".inte-time span").text()).css("color","black");
            $("[data-panel='inteTime']").next().find("[data-value='"+$(".inte-time span").attr("data-value")+"']").attr("data-click","selected").siblings().attr("data-click","")
        }       // 判断到岗时间

        // 判断工作薪资
        var langBar = cvmutual.info.langBar['jobSalarySystem'][cvresume.info.language];
        var jobSalarySystem = langBar['Month'];
        var min_price = 0;
        var max_price = 0;
        if(job_price === '薪资面议' || job_price.toLowerCase() === 'negotiable'){
            $('#min_salary_select > span').text('面议').css('color','#000000');
            $('input[name=jobMinSalary]').val(0);
            $('#max_salary_select > span').text('');
            $('input[name=jobMaxSalary]').val(0);
            // 隐藏最大范围薪资
            $('#max_salary_select, .salary_middle').hide();
        }else if(job_price.indexOf('千') < 0 && job_price.indexOf('万') < 0 && job_price.indexOf('萬') < 0 && job_price.indexOf('K') < 0){
            // 判断为日薪时 设置薪资初始值
            $('#min_salary_select > span').text('请选择').attr('style','');
            $('#max_salary_select > span').text('请选择').attr('style','');
            $('input[name=jobMinSalary]').val('');
            $('input[name=jobMaxSalary]').val('');
        }else{
            var job_price_parse = job_price.split('/');
            if(job_price_parse.length > 1){
                for (var key in langBar) {
                    var value = langBar[key];
                    if(job_price_parse[1].indexOf(value.name) !== -1){
                        jobSalarySystem = langBar[key];
                        break;
                    }
                }
            }
            $('input[name=jobSalarySystem]').val(jobSalarySystem.value).siblings('span').text((jobSalarySystem.value === 'Year' ? '年' : '月') + '薪').css('color','#000000');
            var price_range = job_price_parse[0].split('-').map(function(item) {
                return Number(item.replace(/(千|万|萬|K)/g, ''));
            });
            var min_price = price_range[0];
            var max_price = price_range[1] || min_price;
            $('input[name=jobMinSalary]').val(min_price).siblings('span').text(min_price+jobSalarySystem.unit).css('color','#000000');
            // 判断为不填写最大薪资
            if (min_price === max_price) {
                $('input[name=jobMaxSalary]').val(max_price).siblings('span').text('不填写').css('color','');
            } else {
                $('input[name=jobMaxSalary]').val(max_price).siblings('span').text(max_price+jobSalarySystem.unit).css('color','#000000');
            }
        }
        // 初始化薪资选择器
        // 最少薪资
        var $min_salary_select_temp = $('<ul></ul>');
        $min_salary_select_temp.append($('<li data-value="Negotiable">面议</li>'));
        // 1 - 50
        for (var i = 1; i <= 50; i++) {
            $min_salary_select_temp.append($('<li data-value="'+ i +'">'+ i + jobSalarySystem.unit +'</li>'));
        }
        // 60 - 100
        for (var i = 6; i <= 10; i++) {
            $min_salary_select_temp.append($('<li data-value="'+ (i * 10) +'">'+ (i * 10) + jobSalarySystem.unit +'</li>'));
        }
        $('#min_salary_select .select').html($min_salary_select_temp.html());
        // 最大薪资
        var $max_salary_select_temp = $('<ul></ul>');
        $max_salary_select_temp.append($('<li data-value="'+ min_price +'">不填写</li>'));
        // minK - min*2
        for (var i = (min_price + 1); i <= min_price * 2; i++) {
            $max_salary_select_temp.append($('<li data-value="'+ i +'">'+ i + jobSalarySystem.unit +'</li>'));
        }
        $('#max_salary_select .select').html($max_salary_select_temp.html());
    },
	content_data_put_local_stroage:function(){
		if(!cvresume.main.is_empty(cvresume.info.resumecontentid)){
			if (window.localStorage) {
			    localStorage.setItem("resumeContentData",JSON.stringify(cvresume.main.get_resume()));
			} else {
			   console.log("浏览器版本太低，无法使用localStorage");	
			}
		} else {
            localStorage.removeItem('resumeContentData');
        }
	},
	check_input: function(){
		var check_input = false;
        var phone = $("[data-panel='phone']").val().trim(),
			email = $("[data-panel='email']").val(),
			check_tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
			check_phone = /^((\+86)|(86))?(-| )*(1)\d{2}(-| )*\d{4}(-| )*\d{4}$/,
			check_email = /^[A-Za-z\d\-\_\.]*@[A-Za-z\d\-\_\.]+[A-Za-z\d]+$/;

        $("[data-panel='height'], [data-panel='weight'], .monthly input, .daily input").on('input',function(){
			var val = $(this).val();
			if(isNaN(Number(val))){
				$(this).addClass("NaN");
			}else{
                $(this).removeClass("NaN");
			}
		});

		if(phone.length > 0 && (!check_tel.test(phone) && !check_phone.test(phone))){
            $("[data-panel='phone']").parent().addClass("wrong_input");
            check_input = true;
		}else{
            $("[data-panel='phone']").parent().removeClass("wrong_input");
		}
		if(email.length > 0 && !check_email.test(email)){
            $("[data-panel='email']").parent().addClass("wrong_input");
            check_input = true;
		}else{
            $("[data-panel='email']").parent().removeClass("wrong_input");
		}
		return check_input;
	},
    close_tips_event:function(){
        setTimeout(function () { 
            $(".tips_bar_modal").css("right","-320px");
            setTimeout(function () { 
                //初始化
                $(".tips_content_select ul li[data-select-id='base_info']").addClass("selected").siblings().removeClass("selected");                                
                $(".tips_content_select span").text("基本信息");
                $(".tips_content_text ul li[data-list-id='base_info']").addClass("selected").siblings().removeClass("selected");                             

            }, 500);
        }, 200);	
    },
    // 更换模块样式
    change_module_style:function(){
        // 点击唤醒更换模块弹框
 	    $('.wbdCv-baseStyle').on("click",".baseItem-toolbar span.change_style",function(){
            common.main._500dtongji("PC-CV6.9.2-在线制作-简历编辑页-内容模块-右上角-更换样式");
            if($("html").hasClass("ie9")){
                layer.msg("当前浏览器内核为ie9,请更换浏览器,或切换至极速模式,体验更佳");
            }
            var $this = $(this).parents(".moduleItem");
            var id = $this.attr("id");
            var type = '';
            // 打开弹框
            cvmutual.main.change_modal_event('style', $this).open();
 	        // 异步加载模块样式
            var editMode = $(".itemType").val();
            if($this.hasClass("customItem")){
                type = "resume_custom_descItem";
            }else{
                type = id;
            }
 	        $.get("/newcvresume/model_list/",{"type":type},function(result){
 	        	if(result != null){
                    $("#change_parts_style").find(".parts_style_list").remove();
                    $("#change_parts_style").find(".modal_list").append(result);
                    $('#change_parts_style').find('.parts_style_list').each(function(){
                        if ($this.attr('data-parts').indexOf($(this).attr('data-parts')) >= 0){
                            $(this).addClass('checked').siblings().removeClass('checked');
                        }
                    })
				}
 	        });
        })
        // 替换模块样式
 	    $(document).on("click","#change_parts_style .parts_style_list",function(){
            var id = $("#change_parts_style").attr("data-selected");
            var $target = $("#" + id);
            var old_parts = $target.attr("data-parts");
            var new_parts = $(this).attr("data-parts");
            $target.removeClass(old_parts).addClass(new_parts).attr("data-parts", new_parts + ' template_css');
            $target.removeClass('template_css').addClass('template_css');
            $target.attr("data-parts", new_parts + ' template_css');
            // 求职意向特殊处理
            if ($target.hasClass('inteItem')) {
                if ($(this).attr('data-content')) {
                    var icon_list = $(this).attr('data-content').split(',');
                    $target.find(".inte-con .wbdfont").each(function(index){
                        $(this).html(icon_list[index]);
                    })
                }
                // 处理求职意向样式
                cvresume.main.moduleItemList_handlestyle();
            }
            cvmutual.main.change_modal_event('style').close();
            cvresume.main.delay_resume_save(); 
            cvmutual.main.set_ewm_resizable(true);
        });
        // 二维码样式列表点击滑动展示
        $('#change_parts_style a.switch').click(function () {
            var type = $(this).hasClass('previous') ? 'previous' : 'next';
            var $modal = $('#change_parts_style');
            var $list = $modal.find('.modal_list');
            var left = +$list.css('margin-left').slice(0, -2);
            var total_page = Math.ceil($list.find('.parts_style_list').length / 3);
            var cur_page = Math.abs(left / 356) + 1;
            if (type === 'previous' && cur_page > 1) {
                $list.css('margin-left', left + 356 + 'px');
            } else if (type === 'next' && cur_page < total_page) {
                $list.css('margin-left', left + 356 + 'px');
            }
        })
    },
    // 更换模块版式
    change_module_format: function(){
        // 点击唤醒更换模块弹框
        $('.baseItem-toolbar span.change_format').click(function(){
            var $this = $(this).parents(".moduleItem");
            cvmutual.main.change_modal_event('format', $this).open();
            if (!$this.attr('data-format')) {
                $('#change_parts_format').find('.parts_format_list').eq(0).addClass('checked').siblings().removeClass('checked');
            } else {
                $('#change_parts_format').find('.parts_format_list').each(function () {
                    if ($this.attr('data-format') === $(this).attr('data-format')) {
                        $(this).addClass('checked').siblings().removeClass('checked');
                    }
                })
            }
        });
        // 替换模块样式
        $('#change_parts_format .parts_format_list').click(function(){
            var $module = $('.moduleItem.checked');
            $module.attr('data-format', $(this).attr('data-format'));
            cvmutual.main.change_modal_event('format').close();
            // 占位计算
            cvmutual.main.baseItem_format_placeholder($module);
            cvresume.main.resume_page();
            cvresume.main.delay_resume_save();
        });
    },
    // 更换弹框通用事件
    change_modal_event: function(type,$module){
        var $modal = '';
        if (type === 'style'){
            $modal = $('#change_parts_style');
        } else if (type === 'format') {
            $modal = $('#change_parts_format');
        }
        function open(){
            var id = $module.attr("id");
            var modal_class = $module[0].classList[0].slice(0,-4);
            var $parent = $module.parents('.ui-sortable');
            $module.addClass('checked');
            $modal.removeAttr('class').addClass('fade change' + type);
            if ($parent.width() < $parent.siblings('.ui-sortable').width() / 2 && $parent.css('float') !== 'right') {
                $modal.addClass('left');
            }
            $modal.show().attr("data-selected", id).addClass(modal_class).appendTo($module);
            // 防止顶部被遮挡
            if ($modal[0].getBoundingClientRect().top < 0){
                $modal.addClass('down');
            }
        }
        function close() {
            if (type === 'style') $modal.find(".modal_list div").remove();
            $modal.hide().removeClass($modal[0].classList[$modal[0].classList.length - 1]).appendTo($('body'));
            $('.baseItem-toolbar').hide();
            $('.moduleItem').removeClass('checked');
        }
        return {
            "open": open,
            "close": close 
        }
    },

    /**
     * 简历其它功能操作方法
     */
    // 简历分享
    resume_share: function () {
        $("#recommend-modal #recommendUrl").on('click', function () {
            var str = $("#recommend-modal .recommendContent span").html();
            cvmutual.main.set_copyToClipBoard(str);
            $("#recommendUrl").html("复制成功")
        });
        // 分享
        $("#share_btn").click(function () {
            var visitid = cvresume.info.visitid;
            if (cvresume.main.is_empty(visitid)) {
                layer.msg("亲，保存简历才可以分享简历哦~");
                return false;
            }
            $(".shareContent input").val(visitid);
            $("#shareResume-modal").modal("show");
        });
        $("#shareResume-modal #copyUrl").on("click", function () {
            var str = $(".shareContent span").html() + $(".shareContent input").val() + "/";
            cvmutual.main.set_copyToClipBoard(str);
            $("#copyUrl").html("复制成功");
            setTimeout(function () {
                $("#copyUrl").html("复制链接")
            }, 2000);
        });
    },
    // 更换模板
    resume_select_template: function () {
        var $modal = $('#changeTemplateModal');
        var first_time = true;
        var page_number = 1;  //页码
        var loading_template = false;
        var $container = $modal.find(".modal_body");
        // 获取模板列表
        function reload_template_list(scroll) {
            if (loading_template) return;
            loading_template = true;
            $.get("/newcvresume/select_template/", {
                "type": 'common',
                "resumeBankType": $(".wbdCv-container").hasClass("mobile") ? 'wap' : 'doc',
                "pageNumber": page_number,
                "pageSize": 30,
            }, function (result) {
                loading_template = result.replace(/\s/g, '') === '';
                if (loading_template) {
                    return layer.msg("没有更多了");
                }
                if (first_time) {
                    first_time = false;
                    $container.find('div').remove();
                }
                page_number++;
                $(result).appendTo($container);
                if (!scroll) {
                    // 显示选中效果
                    var $checked = $container.find('.template_list a[data-itemid="' + common.main.getUrlParamsValue('itemid') + '"]').parents('.template_list').addClass('checked');
                    // 滚动条定位，如未找到选中项则加载下一页
                    if ($checked[0]) {
                        $container.scrollTop($checked[0].offsetTop - 120);
                    } else {
                        reload_template_list();
                    }
                }
            });
        }
        // 打开更换模板侧栏
        $(document).on("click","#change_temlate_btn:not(.wbd-vip-lock)",function(e){
            $modal.show().removeClass('mobile');
            // 添加手机模板标识
            if ($(".wbdCv-container").hasClass("mobile")) {
                $modal.addClass('mobile');
            }
            $('body').css('overflow','hidden');
            // 判断是否已加载过模板
            if (!loading_template) {
                // 无节点，发送ajax请求渲染回ul
                reload_template_list();
            } else {
                // 显示选中效果
                var $checked = $container.find('.template_list.checked');
                $container.scrollTop($checked[0].offsetTop - 120);
            }
        });
        // 模板关闭
        $modal.find('.close').on('click', function () {
            $modal.hide();
            $('body').css('overflow','');
        })
        // 模板项点击跳转
        $(document).on('click','#changeTemplateModal .select_template',function(){
            $(this).text('更换中...');
            // 日志上报
            common.main.resumeOperationLogUpload(cvresume.info.resumeid, "changemoban", "", "");
            var id = $(this).attr("data-itemid");
            var create_param_json = common.main.getUrlParamStringUnescape("createParamJson", false);
            location.href = "/newcvresume/edit/?itemid=" + id + "&resumeId=" + cvresume.info.resumeid + "&language=" + cvresume.info.language + "&createParamJson=" + create_param_json;
        })
        // 滚动加载
        $container.on('scroll', function (e) {
            var scroll_height = this.scrollHeight;
            var client_height = $(this).outerHeight();
            var scroll_top = $(this).scrollTop();
            if (client_height + scroll_top >= scroll_height - 600) {
                reload_template_list(true);
            }
        });
    },
    // 简历主题相关
    resume_theme_operate: function() {
        var $themeModal = $("#resumeThemeModal");
        var event_int = true;
        // 打开主题弹框
        $(".leftbar_editor_operate .theme_editor").on('click',function (e) {
            $themeModal.css('left', '0');
            // 主题事件绑定
            if (event_int) {
                // 生成字体列表节点
                if ($('#themeFontfamily').find('.family_list li').length === 0) {
                    $('#themeFontfamily').find('.family_list')[0].innerHTML = fontFamily.main.create_theme_list();
                }
                cvmutual.main.resume_theme_event();
            }
            cvmutual.main.resume_theme_render();
            event_int = false;
            var data_value = $(this).attr("data-value");
            common.main._500dtongji("PC-在线制作-" + data_value + "-左侧设置-左侧设置-风格设置");
        });	
    },
    // 主题回显渲染
    resume_theme_render: function() {
        var $resume = $(".wbdCv-baseStyle");
        var $color = $('#themeColor');
        var $fontsize = $('#themeFontsize');
        var $fontfamily = $('#themeFontfamily');
        var $pageMargin = $('#themePageMargin');
        var $moduleMargin = $('#themeModuleMargin');
        var $fontType = $('#themeFontType');
        var $offpaging = $('#themeOffpaging a');
        var theme_color = $resume.attr("data_color");
        var theme_fontsize = $resume.attr("data_font_size");
        var theme_fontname = $resume.attr("data_font_name");
        var theme_module_margin = $resume.attr("data-modal_margin");
        var theme_page_margin = $resume.attr("data-modal_pageMargin");
        var theme_font_type = $resume.attr("data_font_type");
        var theme_hidden_paging = $resume.attr("data_hidden_paging");

        // 颜色 ----------------------------------
        if (theme_color) {
            $color.find("li[data-color='" + theme_color + "']").addClass("checked").siblings().removeClass("checked");
        } else {
            $color.find('li[data-color="j1"]').addClass("checked");
        }

        // 字体 -------------------------------------------
        if (theme_fontname) {
            var font_name = $fontfamily.find("li[data-fontname=" + theme_fontname + "] i").text();
            $fontfamily.find("input").val(font_name);
        } else {
            $fontfamily.find("input").val("微软雅黑");
        }

        // 字号 -----------------------------------------
        if (theme_fontsize) {
            var $font_size = $fontsize.find("li[data-font-size=" + theme_fontsize + "]").text();
            $fontsize.find("input").val($font_size);
        } else {
            $fontsize.find("input").val("14");
        }

        // 页边距 -----------------------------------------
        if (theme_page_margin) {
            var $page_margin = $pageMargin.find('li[data-page-margin="' + theme_page_margin + '"]').text();
            $pageMargin.find("input").val($page_margin);
        } else {
            $pageMargin.find("input").val("适中");
        }

        // 模块距离 --------------------------------------
        if (theme_module_margin) {
            var $module_margin = $moduleMargin.find('li[data-module-margin="' + theme_module_margin + '"]').text();
            $moduleMargin.find("input").val($module_margin);
        } else {
            $module_margin.find("input").val("1");
        }

        // 简繁体 --------------------------------------
        if (theme_font_type == "0") {
            $fontType.find("input").val('简体');
        } else {
            $fontType.find("input").val('繁体');
        }

        // 隐藏分页 ---------------------------------
        if (theme_hidden_paging === 'true') {
            $offpaging.removeClass('off');
        } else {
            $offpaging.addClass('off');
        }
    },
    // 简历主题事件
    resume_theme_event: function() {
        var $resume = $(".wbdCv-baseStyle");
        var $themeModal = $("#resumeThemeModal");

        // 颜色 ----------------------------------
        $('#themeColor').find('ul li').on("click", function () {
            $(this).addClass("checked").siblings().removeClass("checked");
            $resume.attr("data_color", $(this).attr("data-color"));
        });

        // 字体 -------------------------------------------
        $('#themeFontfamily').find('input').on('click', function () {
            var $input = $(this);
            var $list = $('#themeFontfamily').find('.fontFamily_list');
            $list.fadeToggle(200);
            $list.off('mouseleave').on('mouseleave', function () {
                $list.fadeOut(200);
            });
            $list.find('li').on('click', function () {
                var font_family = $(this).find('i').text();
                $list.fadeOut(200);
                $input.val(font_family);
                $resume.attr("data_font_name", $(this).attr("data-fontname"));
                // 处理基本信息样式
                cvresume.main.moduleItemList_handlestyle();
                cvresume.main.delay_resume_save();
            });
        });

        // 字号 -----------------------------------------
        $('#themeFontsize').find('input').on('click', function () {
            var $input = $(this);
            var $list = $('#themeFontsize').find('ul');
            $list.fadeToggle(200);
            $list.off('mouseleave').on('mouseleave', function () {
                $list.fadeOut(200);
            });
            $list.find('li').on('click', function () {
                var font_size = $(this).attr('data-font-size');
                $list.fadeOut(200);
                $input.val(font_size);
                $resume.attr("data_font_size", font_size);
                // 因css3过渡动画效果，执行方法不能获取动画结束后的尺寸
                setTimeout(function () {
                    cvresume.main.resume_page();
                }, 400);
                cvresume.main.moduleItemList_handlestyle();
            });
        });

        // 页边距 -----------------------------------------
        $('#themePageMargin').find('input').on('click', function () {
            var $input = $(this);
            var $list = $('#themePageMargin').find('ul');
            $list.fadeToggle(200);
            $list.off('mouseleave').on('mouseleave', function () {
                $list.fadeOut(200);
            });
            $list.find('li').on('click', function () {
                var margin = $(this).attr('data-page-margin');
                $list.fadeOut(200);
                $input.val($(this).text());
                $resume.attr("data-modal_pageMargin", margin);
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save();
            });
        });

        // 模块距离 --------------------------------------
        $('#themeModuleMargin').find('input').on('click', function () {
            var $input = $(this);
            var $list = $('#themeModuleMargin').find('ul');
            $list.fadeToggle(200);
            $list.off('mouseleave').on('mouseleave', function () {
                $list.fadeOut(200);
            });
            $list.find('li').on('click', function () {
                var margin = $(this).attr('data-module-margin');
                $list.fadeOut(200);
                $input.val(margin);
                $resume.attr("data-modal_margin", margin);
                cvresume.main.resume_page();
                cvresume.main.delay_resume_save();
            });
        });

        // 简繁体 --------------------------------------
        $('#themeFontType').find('input').on('click', function () {
            var $input = $(this);
            var $list = $('#themeFontType').find('ul');
            $list.fadeToggle(200);
            $list.off('mouseleave').on('mouseleave', function () {
                $list.fadeOut(200);
            });
            $list.find('li').on('click', function () {
                var type = $(this).attr("data-font-type");
                $list.fadeOut(200);
                $resume.attr("data_font_type", type);
                if (type == 0) {
                    $input.val('简体');
                    cvresume.main.set_document_sf(0);
                } else {
                    $input.val('繁体');
                    cvresume.main.set_document_tw(1);
                }
                cvresume.main.delay_resume_save();
            });
        });

        // 统一格式 -----------------------------------
        $('#themeUnified p').on('click', function () {
            $themeModal.css('left', '-240px');
            var title = "确定要统一简历内容格式吗？";
            var content = "统一后内容排版和文字大小及颜色可能发生变化。";
            common.main.resume_confirm({
                title: title,
                content: content,
                onOk: function () {
                    var resume_left = $('.wbdCv-baseStyle').offset().left - 5;
                    $('.unify_masking').css('left', resume_left).show().delay(1000).fadeOut();
                    $('.unify_loading').css('left', resume_left).show().delay(1000).fadeOut();
                    setTimeout(function () {
                        common.main._500dtongji("PC-CV6.7.0-在线制作-简历编辑页-左侧功能区-中间-风格设置-统一格式");
                        $(".resume_content").each(function () {
                            var $this = $(this);
                            var _str = $this.text();
                            $this.empty();
                            $this.html(_str);
                        })
                        cvresume.main.delay_resume_save();
                    }, 1500)
                },
                onCancel: function () {
                    $themeModal.css('left', '0');
                }
            });
            return false;
        });

        // 隐藏分页 ---------------------------------
        $('#themeOffpaging a').on('click', function () {
            var $this = $(this);
            $this.toggleClass('off');
            var is_hide = $this.hasClass('off');
            $resume.attr('data_hidden_paging', !is_hide);
            cvresume.main.resume_page();
            // 未保存时触发隐藏分页
            if (cvresume.info.resumeid === 0) {
                cvresume.main.base_resume_save(null, cvresume.main.get_resume());
            }
            // 定时器获取id  这里只是保存状态值 无需在接口请求之后触发效果
            var interval = setInterval(function () {
                if (cvresume.info.resumeid > 0) {
                    clearInterval(interval);
                    $.post('/cvresume/set_resume_hidden_paging/', { 'resumeId': cvresume.info.resumeid, 'resumeHiddenPaging': !is_hide });
                }
            }, 100);
        });
    },
    // 计算简历制作进度
    caclulate_resume_scale:function(resume){
		if(!resume){
			resume = cvresume.main.get_resume();
		}
		var org_resume = JSON.parse('{\"attr\":{\"language\":\"zh\",\"background\":\"https://file.500d.me/upload/work_order/201908/29/80bb946f-c9c6-4ae6-b30b-d127042395b8.png\",\"color\":\"j2\",\"font\":\"yahei\",\"fontSize\":\"14\",\"pageMargin\":\"1\",\"margin\":\"1\",\"fontType\":\"0\",\"isPagingHidden\":false,\"modulesSort\":\"{\\\"left\\\":[\\\"resume_head\\\",\\\"base_info\\\",\\\"resume_skill\\\"],\\\"top\\\":[],\\\"right\\\":[\\\"resume_name\\\",\\\"resume_job_preference\\\",\\\"resume_edu\\\",\\\"resume_work\\\",\\\"resume_internship\\\",\\\"resume_project\\\",\\\"resume_honor\\\",\\\"resume_summary\\\",\\\"resume_portfolio\\\",\\\"resume_qrcode\\\"],\\\"bottom\\\":[]}\"},\"modules\":{\"resume_cover\":{\"key\":\"resume_cover\",\"title\":\"封面\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":null,\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"},\"resume_letter\":{\"key\":\"resume_letter\",\"title\":\"自荐信\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":null,\"style\":null,\"format\":null,\"margin\":null},\"content\":null},\"resume_head\":{\"key\":\"resume_head\",\"title\":\"头像\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":\"template_css\",\"format\":null,\"margin\":null},\"content\":\"/resources/500d/cvresume/images/1.jpg\"},\"base_info\":{\"key\":\"base_info\",\"title\":\"基本信息\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"birth\\\":null,\\\"age\\\":null,\\\"jobYear\\\":null,\\\"mobile\\\":null,\\\"email\\\":null,\\\"custom\\\":null,\\\"sex\\\":null,\\\"education\\\":null,\\\"nation\\\":null,\\\"city\\\":null,\\\"cityName\\\":null,\\\"marriageStatus\\\":null,\\\"politicalStatus\\\":null,\\\"height\\\":null,\\\"weight\\\":null,\\\"birthIcon\\\":\\\"\\\",\\\"jobYearIcon\\\":\\\"\\\",\\\"mobileIcon\\\":\\\"\\\",\\\"emailIcon\\\":\\\"\\\",\\\"sexIcon\\\":\\\"\\\",\\\"educationIcon\\\":\\\"\\\",\\\"nationIcon\\\":\\\"\\\",\\\"cityIcon\\\":\\\"\\\",\\\"marriageStatusIcon\\\":\\\"\\\",\\\"politicalStatusIcon\\\":\\\"\\\",\\\"heightIcon\\\":\\\"\\\",\\\"weightIcon\\\":\\\"\\\"}\"},\"resume_name\":{\"key\":\"resume_name\",\"title\":\"姓名\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"name\\\":null,\\\"minSummary\\\":null,\\\"isMinSummaryShow\\\":true}\"},\"resume_job_preference\":{\"key\":\"resume_job_preference\",\"title\":\"求职意向\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"jobFunction\\\":null,\\\"jobCity\\\":null,\\\"jobCityName\\\":null,\\\"jobTime\\\":null,\\\"jobSalarySystem\\\":\\\"Month\\\",\\\"jobMinSalary\\\":null,\\\"jobMaxSalary\\\":null,\\\"jobFunctionIcon\\\":\\\"\\\",\\\"jobCityIcon\\\":\\\"\\\",\\\"jobTimeIcon\\\":\\\"\\\",\\\"jobSalaryIcon\\\":\\\"\\\"}\"},\"resume_edu\":{\"key\":\"resume_edu\",\"title\":\"教育背景\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[{\\\"logo\\\":\\\"https://file.500d.me/upload/work_order/201908/29/97fb93f3-a406-4f9f-9291-81b6dcf024b9.png\\\",\\\"beginTime\\\":null,\\\"endTime\\\":null,\\\"unit\\\":null,\\\"job\\\":null,\\\"content\\\":null,\\\"tags\\\":null}]\"},\"resume_work\":{\"key\":\"resume_work\",\"title\":\"工作经验\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"},\"resume_internship\":{\"key\":\"resume_internship\",\"title\":\"校园活动\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"},\"resume_project\":{\"key\":\"resume_project\",\"title\":\"项目经验\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"},\"resume_summary\":{\"key\":\"resume_summary\",\"title\":\"自我评价\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"logo\\\":null,\\\"content\\\":\\\"\\\",\\\"tags\\\":null}\",\"tags\":[]},\"resume_honor\":{\"key\":\"resume_honor\",\"title\":\"奖项荣誉\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"logo\\\":null,\\\"content\\\":\\\"\\\",\\\"tags\\\":null}\",\"tags\":[]},\"resume_skill\":{\"key\":\"resume_skill\",\"title\":\"技能特长\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"},\"resume_language\":{\"key\":\"resume_language\",\"title\":null,\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":null,\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"},\"resume_portfolio\":{\"key\":\"resume_portfolio\",\"title\":\"作��展示\",\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"img\\\":[],\\\"link\\\":[]}\"},\"resume_qrcode\":{\"key\":\"resume_qrcode\",\"title\":\"二维码\",\"mg\":{\"isShow\":false,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":\"\",\"style\":null,\"format\":null,\"margin\":null},\"content\":\"{\\\"point\\\":null,\\\"width\\\":null,\\\"img\\\":null,\\\"tips\\\":\\\"扫一扫查看我的手机简历\\\"}\"},\"resume_school_element\":{\"key\":\"resume_school_element\",\"title\":null,\"mg\":{\"isShow\":true,\"isTitleShow\":true,\"isTimeShow\":true,\"isContentShow\":true,\"isLogoShow\":true,\"icon\":null,\"style\":null,\"format\":null,\"margin\":null},\"content\":\"[]\"}}}');
        var grade = 0;
        var grade_text = "";
		try{
            //头像模块
            var old_resume_head = org_resume.modules.resume_head;
            var new_resume_head = resume.modules.resume_head;
            if(common.main.isEffect(new_resume_head,old_resume_head)){
                grade += 3;
            }
            //姓名模块
            var old_resume_name = org_resume.modules.resume_name;
            var new_resume_name = resume.modules.resume_name;
            var old_resume_name_content = JSON.parse(old_resume_name.content);
            var new_resume_name_content = JSON.parse(new_resume_name.content);
            //姓名
            if(common.main.isEffect(new_resume_name_content.name,old_resume_name_content.name)){
                grade += 3;
            }
            //一句话
            if(common.main.isEffect(new_resume_name_content.minSummary,old_resume_name_content.minSummary)){
                grade += 2;
            }
            //基本信息
            var old_base_info = org_resume.modules.base_info;
            var new_base_info = resume.modules.base_info;
            var old_base_info_content = JSON.parse(old_base_info.content);
            var new_base_info_content = JSON.parse(new_base_info.content);
            //生日
			if(common.main.isEffect(new_base_info_content.birth,old_base_info_content.birth)){
				grade += 2;
			}
            //工作年限
			if(common.main.isEffect(new_base_info_content.jobYear,old_base_info_content.jobYear)){
				grade += 2;
			}
            //电话号码
			if(common.main.isEffect(new_base_info_content.mobile,old_base_info_content.mobile)){
				grade += 3;
			}
            //联系邮箱
			if(common.main.isEffect(new_base_info_content.email,old_base_info_content.email)){
				grade += 3;
			}
			if(grade > 0){//当默认信息有填写时，补充信息分数才生效
                //性别
				if(common.main.isEffect(new_base_info_content.sex,old_base_info_content.sex)){
					grade += 1;
				}
                //学历
				if(common.main.isEffect(new_base_info_content.education,old_base_info_content.education)){
					grade += 1;
				}
                //民族
				if(common.main.isEffect(new_base_info_content.nation,old_base_info_content.nation)){
					grade += 1;
                }
                //所在城市
                if(common.main.isEffect(new_base_info_content.cityName,old_base_info_content.cityName)){
                    grade += 1;
                }
                //婚姻
				if(common.main.isEffect(new_base_info_content.marriageStatus,old_base_info_content.marriageStatus)){
					grade += 1;
				}
                //政治面貌
				if(common.main.isEffect(new_base_info_content.politicalStatus,old_base_info_content.politicalStatus)){
					grade += 1;
				}
                //身高体重
				if(common.main.isEffect(new_base_info_content.weight,old_base_info_content.weight) || common.main.isEffect(new_base_info_content.height,old_base_info_content.height)){
					grade += 1;
				}
            }
            //求职意向
            var old_resume_job_preference = org_resume.modules.resume_job_preference;
            var new_resume_job_preference = resume.modules.resume_job_preference;
            var old_resume_job_preference_content = JSON.parse(old_resume_job_preference.content);
            var new_resume_job_preference_content = JSON.parse(new_resume_job_preference.content);
            //意向岗位
			if(common.main.isEffect(new_resume_job_preference_content.jobFunction,old_resume_job_preference_content.jobFunction)){
				grade += 4;
            }
            //意向城市
            if(common.main.isEffect(new_resume_job_preference_content.jobCityName,old_resume_job_preference_content.jobCityName)){
				grade += 4;
			}
            //薪资
			if(common.main.isEffect(new_resume_job_preference_content.jobMinSalary,old_resume_job_preference_content.jobMinSalary)){
				grade += 2;
			}
            //入职时间
			if(common.main.isEffect(new_resume_job_preference_content.jobTime,old_resume_job_preference_content.jobTime)){
				grade += 4;
            }
            //教育背景
            var old_resume_edu = org_resume.modules.resume_edu;
            var new_resume_edu = resume.modules.resume_edu;
            var old_resume_edu_content = JSON.parse(old_resume_edu.content);
            var new_resume_edu_content = JSON.parse(new_resume_edu.content);
			if(new_resume_edu.mg.isShow && common.main.isEffect(new_resume_edu_content,old_resume_edu_content)){
                if (new_resume_edu_content[0]) {
                    if (common.main.isEffect(new_resume_edu_content[0].endTime, old_resume_edu_content[0] ? old_resume_edu_content[0].endTime : '')) {
                        grade += 3;
                    }
                    if (common.main.isEffect(new_resume_edu_content[0].unit, old_resume_edu_content[0] ? old_resume_edu_content[0].unit : '')) {
                        grade += 3;
                    }
                    if (common.main.isEffect(new_resume_edu_content[0].job, old_resume_edu_content[0] ? old_resume_edu_content[0].job : '')) {
                        grade += 3;
                    }
                    if (common.main.isEffect(new_resume_edu_content[0].content, old_resume_edu_content[0] ? old_resume_edu_content[0].content : '')) {
                        grade += 6;
                    }
                }
            }
            //工作经验
            var old_resume_work = org_resume.modules.resume_work;
            var new_resume_work = resume.modules.resume_work;
            var old_resume_work_content = JSON.parse(old_resume_work.content);
            var new_resume_work_content = JSON.parse(new_resume_work.content);
			if(new_resume_work.mg.isShow && common.main.isEffect(new_resume_work_content,old_resume_work_content)){
				if (new_resume_work_content[0]) {
                    if (common.main.isEffect(new_resume_work_content[0].endTime, old_resume_work_content[0] ? old_resume_work_content[0].endTime : '')) {
                        grade += 4;
                    }
                    if (common.main.isEffect(new_resume_work_content[0].unit, old_resume_work_content[0] ? old_resume_work_content[0].unit : '')) {
                        grade += 4;
                    }
                    if (common.main.isEffect(new_resume_work_content[0].job, old_resume_work_content[0] ? old_resume_work_content[0].job : '')) {
                        grade += 4;
                    }
                    if (common.main.isEffect(new_resume_work_content[0].content, old_resume_work_content[0] ? old_resume_work_content[0].content : '')) {
                        grade += 8;
                    }
                }
            }
            //校园活动
            var old_resume_internship = org_resume.modules.resume_internship;
            var new_resume_internship = resume.modules.resume_internship;
            var old_resume_internship_content = JSON.parse(old_resume_internship.content);
            var new_resume_internship_content = JSON.parse(new_resume_internship.content);
			if(new_resume_internship.mg.isShow && common.main.isEffect(new_resume_internship_content,old_resume_internship_content)){
                //工作经验模块存在时  分数减半
				if (new_resume_internship_content[0]) {
                    if (common.main.isEffect(new_resume_internship_content[0].endTime, old_resume_internship_content[0] ? old_resume_internship_content[0].endTime : '')) {
                        grade += 4;
                        if (new_resume_work.mg.isShow) {
                            grade -= 2;
                        }
                    }
                    if (common.main.isEffect(new_resume_internship_content[0].unit, old_resume_internship_content[0] ? old_resume_internship_content[0].unit : '')) {
                        grade += 4;
                        if (new_resume_work.mg.isShow) {
                            grade -= 2;
                        }
                    }
                    if (common.main.isEffect(new_resume_internship_content[0].job, old_resume_internship_content[0] ? old_resume_internship_content[0].job : '')) {
                        grade += 4;
                        if (new_resume_work.mg.isShow) {
                            grade -= 2;
                        }
                    }
                    if (common.main.isEffect(new_resume_internship_content[0].content, old_resume_internship_content[0] ? old_resume_internship_content[0].content : '')) {
                        grade += 8;
                        if (new_resume_work.mg.isShow) {
                            grade -= 4;
                        }
                    }
                }
            }
            //项目经验
            var old_resume_project = org_resume.modules.resume_project;
            var new_resume_project = resume.modules.resume_project;
            var old_resume_project_content = JSON.parse(old_resume_project.content);
            var new_resume_project_content = JSON.parse(new_resume_project.content);
			if(new_resume_project.mg.isShow && common.main.isEffect(new_resume_project_content,old_resume_project_content)){
				if (new_resume_project_content[0]) {
                    if (common.main.isEffect(new_resume_project_content[0].endTime, old_resume_project_content[0] ? old_resume_project_content[0].endTime : '')) {
                        grade += 2;
                    }
                    if (common.main.isEffect(new_resume_project_content[0].unit, old_resume_project_content[0] ? old_resume_project_content[0].unit : '')) {
                        grade += 2;
                    }
                    if (common.main.isEffect(new_resume_project_content[0].job, old_resume_project_content[0] ? old_resume_project_content[0].job : '')) {
                        grade += 2;
                    }
                    if (common.main.isEffect(new_resume_project_content[0].content, old_resume_project_content[0] ? old_resume_project_content[0].content : '')) {
                        grade += 4;
                    }
                }
            }
            //自我评价
            var old_resume_summary = org_resume.modules.resume_summary;
            var new_resume_summary = resume.modules.resume_summary;
			if(new_resume_summary.mg.isShow && common.main.isEffect(new_resume_summary,old_resume_summary)){
				grade += 15;
			}
            //奖项荣誉
            var old_resume_honor = org_resume.modules.resume_honor;
            var new_resume_honor = resume.modules.resume_honor;
			if(new_resume_honor.mg.isShow && common.main.isEffect(new_resume_honor,old_resume_honor)){
				grade += 10;
			}
            //技能特长
            var old_resume_skill = org_resume.modules.resume_skill;
            var new_resume_skill = resume.modules.resume_skill;
			if(new_resume_skill.mg.isShow && common.main.isEffect(new_resume_skill,old_resume_skill)){
				grade += 10;
			}
            //作品展示
            var old_resume_portfolio = org_resume.modules.resume_portfolio;
            var new_resume_portfolio = resume.modules.resume_portfolio;
			if(new_resume_portfolio.mg.isShow && (common.main.isEffect(new_resume_portfolio,old_resume_portfolio))){
				grade += 10;
            }
            if (grade > 80 && grade <= 150) {
                grade = Math.round(80 + (grade - 80) * 2 / 7);
            }
            // 简历制作进度分数上报
            $('.diagnose_defalut .diagnose_score').attr('data-value', grade);
            var name = new_resume_name_content.name;
            if(cvresume.main.is_empty(name)){
                name = "";
            }
            switch (true) {
                case grade < 60:
                    grade_text = "Hi " + name + "，你的简历内容有点少哦，至少还有${length}处可以改进，请根据优化建议继续填写。";
                    break;
                case grade >= 60 && grade < 80:
                    grade_text = "Hi " + name + "，你的简历内容尚有部分缺失，还有${length}处可以改进，再加把劲儿，机会总是留给准备充分的人。";
                    break;
                case grade >= 80 && grade_text < 90:
                    grade_text = "Hi " + name + "，你的简历内容比较完整了，不过还有一些小问题可以改进，优化到90分，能获得2倍以上的面试机会哦！";
                    break;
                case grade >= 90:
                    grade_text = "Hi " + name + "，你的简历简直太完美了，赶快去投递心仪的岗位吧，相信一定能收到不错的反馈，祝你好运！";
                    break;
            }
		}catch(e){
			console.log("计算比例出错~"+e);
        }
        return {
            grade: grade,
            gradeText: grade_text,
        }
    },
    // 简历导出
	resume_download:function(){
		$(document).on("click","#downloadPDFBtn:not(.wbd-vip-lock)",function(){
			if(cvresume.main.is_empty(cvresume.info.resumeid)){
				layer.msg("亲，没有编辑简历不能导出哦~");
				return;
			}
			if(!cvresume.info.downloadFlag){
				// 请求判断一下是否具有下载权限，没有，则弹框提示
				$.ajax({type : "get",
    	    		cache: false,
    	    		async : false,
    	    		url : "/cvresume/get_download_url/"+cvresume.info.resumeid+"/",
    	    		success : function(message) {
    	    			if(message.type=="success"){
							cvresume.info.downloadUrl=message.content;
							cvresume.info.downloadFlag=true
						}else{
							layer.msg(message.content);
						}
    	    		}
    	    	});
			}
			if(cvresume.info.downloadFlag){
				var timestr=new Date().getTime();
				var reg=/_\d*\.pdf/;
				cvresume.info.downloadUrl=cvresume.info.downloadUrl.replace(reg,"_"+timestr+".pdf");
				window.open(cvresume.info.downloadUrl);
				$("#downloadPDF").modal("show");
				setTimeout(function(){
					$("#downloadPDF").modal("hide");
				},1000)
			}
		});
    },

    /**
     * 简历诊断功能
     */
    // 初始化诊断
    diagnose_init: function () {
        var $contain = $('.wbdCv-editorBody');
        var $panel = $contain.find('.function_panel');
        var $diagnose = $panel.find('.diagnose_defalut');
        var $diagnoseitem = $panel.find('#diagnose_item');
        var $perfect_modal = $('#diagnose_perfect_modal');
        // 退出 / 关闭 诊断
        $diagnose.find('.out_diagnose').on('click', function () {
            // 中止诊断
            if ($(this).parents('.diagnose_midway').length) {
                cvmutual.main.diagnose_end('break');
            }
            // 退出诊断
            if ($(this).parents('.diagnose_end').length) {
                cvmutual.main.diagnose_out();
            }
        });
        // 去完善/关闭按钮
        $perfect_modal.find('.diagnose_item_close, .to_module_perfect').on('click', function () {
            $perfect_modal.css({
                'display': 'none',
                'top': '-999px',
                'left': '-999px',
            });
            $diagnoseitem.find('li').removeClass('checked');
        });
        // 全局点击关闭诊断弹窗
        $(document).on('click', function (e) {
            // 排除点击弹窗 以及 触发弹窗的节点
            if (!$('#diagnose_perfect_modal:visible').length) return;
            var is_modal = $(e.target).parents('.diagnose_perfect_modal').length;
            var is_mark = $(e.target).hasClass('perfect_mark_item');
            var is_item = $(e.target).parents('.diagnose_item').length;
            if (!is_modal && !is_mark && !is_item) {
                $('#diagnose_perfect_modal').css({
                    'top': '-999px',
                    'left': '-999px',
                });
                $diagnoseitem.find('li').removeClass('checked');
            }
        });
        /**
         * 执行诊断方法
         */
        // 自动诊断，跳过动画
        var state_index = -1;
        if (window.localStorage && window.localStorage.getItem('ReDiagnoseState')) {
            var state = window.localStorage.getItem('ReDiagnoseState').split(',');
            state_index = state.indexOf(String(cvresume.info.resumeid));
            if (state_index > -1) {
                cvmutual.main.diagnose_number_update();
                // 监听简历修改更新诊断结果
                cvmutual.main.listen_diagnose_result_update();
            }
        }
        // 手动诊断
        $diagnose.find('.start_diagnose').on('click', function () {
            if (state_index > -1) {
                cvmutual.main.diagnose_run('result');
            } else {
                cvmutual.main.diagnose_run();
            }
        });
        // 重新诊断
        $diagnose.find('.rediagnose_btn').on('click', function () {
            cvmutual.main.diagnose_run();
            $diagnose.find('.rediagnose_btn').hide();
        });
    },
    // 获取诊断结果
    get_diagnose_result: function () {
        var _resume = cvresume.main.get_resume();
        var _diagnose_obj = {};
        // 检测时间模块方法 诊断时调用
        var diagnose_check_timeItem = function (modal_arr, min_length, max_length) {
            var _result = {};
            min_length = min_length || 0;
            max_length = max_length || 1000;
            _result._has_time = true;   //  判断是否存在 时间
            _result._has_unit = true;   //  判断是否存在 学校|公司
            _result._has_job = true;   //  判断是否存在 职位|角色|专业
            _result._un_over_job = true;    // 职位|角色|专业 内容超出    工作经验 校园活动用到
            _result._un_over_unit = true;   // 学校|公司 内容超出         工作经验 校园活动用到
            _result._has_content = true;   //  判断是否存在内容
            _result._un_less_content = true;   //  判断内容是否过短
            _result._un_over_content = true;   //  判断内容是否超出
            _result._time_sort = true;   //  判断时间排序是否正确
            _result._un_key_word = true;   //  判断是否存在关键词
            _result._un_key_symbol = true;    //  判断描述内容中是否存在指定符号     教育经历描述用到
            var _max_time = "";
            for (var i in modal_arr) {
                var _time = modal_arr[i].beginTime,
                    _unit = modal_arr[i].unit ? modal_arr[i].unit.replace(/&nbsp;| |<\/?.+?>/g, "") : modal_arr[i].unit,
                    _job = modal_arr[i].job ? modal_arr[i].job.replace(/&nbsp;| |<\/?.+?>/g, "") : modal_arr[i].job,
                    _content = modal_arr[i].content ? modal_arr[i].content.replace(/&nbsp;| |<\/?.+?>/g, "") : modal_arr[i].content;
                // 时间
                if (common.main.is_empty(_time)) { 
                    _result._has_time = false;
                }
                // 学校|公司
                if (common.main.is_empty(_unit)) {
                    _result._has_unit = false;
                }else if(_unit.length > 20){
                    _result._un_over_unit = false;
                }
                // 职位|角色|专业
                if (common.main.is_empty(_job)) {
                    _result._has_job = false;
                }else if (_job.length > 15) {
                    _result._un_over_job = false;
                }
                // 描述
                if (common.main.is_empty(_content)) {
                    _result._has_content = false;
                } else {
                    if (_content.length < min_length) _result._un_less_content = false;
                    if (_content.length > max_length) _result._un_over_content = false;
                    // 判断内容关键词  我 你 他 她 它 们
                    if (/[\u6211|\u4eec]/g.test(_content)) {
                        _result._un_key_word = false;
                    }
                    if (_content.match(/、+/g) && _content.match(/、+/g).length > 15) {
                        _result._un_key_symbol = false;
                    }
                }
            }   //  遍历数组，判断时间、公司、职位和内容
            if (_result._has_time) {
                for (var j in modal_arr) {
                    var _time = modal_arr[j].beginTime;
                    if (_max_time !== "" && _time > _max_time) {
                        _result._time_sort = false;
                    } else {
                        _max_time = _time;
                    }
                }
            }   // 单独判断时间排序
            return _result;
        }
        // 判断头像模块
        var _resume_head = _resume['modules']['resume_head'];
        _diagnose_obj.resume_head = { name: '照片', need_tips: false, content: [] };
        if (_resume_head.mg.isShow) {
            _diagnose_obj.resume_head.need_tips = true;
            _resume_head_content = JSON.parse(_resume_head.content);
            if (_resume_head_content.img.indexOf("/resources/500d/cvresume/images/1.jpg") >= 0) {
                _diagnose_obj.resume_head.content.push("放上一张符合规范的求职照，推荐使用纯色背景的近期免冠照片，加深HR对你的印象");
            }
        }
        _diagnose_obj.base_info = { name: '基本信息', need_tips: true, content: [] };
        var _resume_base_info = _resume['modules']['base_info'];
        var _resume_base_info_content = JSON.parse(_resume_base_info.content);
        // 判断姓名模块
        var _resume_name = _resume['modules']['resume_name'];
        var _resume_name_content = JSON.parse(_resume_name.content);
        if (common.main.is_empty(_resume_name_content.name) || _resume_name_content.name === "五百丁") {//姓名
            _diagnose_obj.base_info.content.push("记得写上自己的姓名哦");
        }
        if (common.main.is_empty(_resume_name_content.minSummary)) {//一句话描述
            _diagnose_obj.base_info.content.push("一句话鲜明的自我介绍，加深HR对你的印象");
        }
        // 判断基本信息模块
        if (common.main.is_empty(_resume_base_info_content.mobile) || _resume_base_info_content.mobile === '13800138000') {//电话号码
            _diagnose_obj.base_info.content.push("填写个人电话号码，方便招聘方与你联系 ");
        }
        if (common.main.is_empty(_resume_base_info_content.email) || _resume_base_info_content.email === 'bd@500d.me') {//邮箱
            _diagnose_obj.base_info.content.push("填写个人邮箱，接收面试邀请函");
        }
        if (common.main.is_empty(_resume_base_info_content.jobYear)) {//工作年限
            _diagnose_obj.base_info.content.push("写明工作年限可以快速抓住HR的眼球");
        }
        var selective_filling = ['sex', 'education', 'nation', 'city', 'marriageStatus', 'politicalStatus', 'height'];//选填项 填写字段超过4个
        var selective_filling_number = 0;
        $.each(selective_filling, function (index, item) {
            if (!common.main.is_empty(_resume_base_info_content[item])) {
                selective_filling_number++;
            }
        });
        if (selective_filling_number >= 4) {
            _diagnose_obj.base_info.content.push("基本信息需简明扼要，无关紧要的字段不必展示出来");
        }
        // 判断求职意向
        var _resume_job_preference = _resume['modules']['resume_job_preference'];
        var _resume_job_preference_content = JSON.parse(_resume_job_preference.content);
        _diagnose_obj.resume_job_preference = { name: '求职意向', need_tips: true, content: [] };
        if (_resume_job_preference.mg.isShow) {
            if (common.main.is_empty(_resume_job_preference_content.jobFunction)) {//意向岗位
                _diagnose_obj.resume_job_preference.content.push("写明意向岗位很有必要，是否匹配对方的招聘岗位是很重要的评估依据~")
            } else if (_resume_job_preference_content.jobFunction.length > 10) {
                _diagnose_obj.resume_job_preference.content.push("建议一份简历只针对一个意向岗位，请检查是否需要修改")
            }
            if (common.main.is_empty(_resume_job_preference_content.jobCityName)) {//意向城市
                _diagnose_obj.resume_job_preference.content.push("有时候会出现异地工作的情况，所以写明意向工作城市可以减少不必要的麻烦~");
            }
            if (common.main.is_empty(_resume_job_preference_content.jobTime)) {//入职时间
                _diagnose_obj.resume_job_preference.content.push("如实填写到岗时间可以帮助HR更好的评估优先级");
            }
            if (common.main.is_empty(_resume_job_preference_content.jobMinSalary) && common.main.is_empty(_resume_job_preference_content.jobMaxSalary)) {//薪资要求
                _diagnose_obj.resume_job_preference.content.push("准确写明自己的薪资要求可以大大降低沟通成本");
            } else if (Number(_resume_job_preference_content.jobMaxSalary) / Number(_resume_job_preference_content.jobMinSalary) >= 2) {
                _diagnose_obj.resume_job_preference.content.push("填写合理的薪资范围可以提升沟通效率，建议不超过2倍");
            }
        } else {
            _diagnose_obj.resume_job_preference.content.push("写清楚求职意向可以大大提升双方的沟通效率");
        }
        // 判断教育背景
        var _resume_edu = _resume['modules']['resume_edu'];
        var _resume_edu_content = JSON.parse(_resume_edu.content);
        _diagnose_obj.resume_edu = { name: '教育背景', need_tips: true, content: [] };
        if (_resume_edu.mg.isShow) {
            if (_resume_edu_content.length) {
                var resume_edu_result = diagnose_check_timeItem(_resume_edu_content, 0, 300);
                if (!resume_edu_result._has_time) {
                    _diagnose_obj.resume_edu.content.push("应根据实际情况填写在校时间");
                }
                if (!resume_edu_result._has_unit) {
                    _diagnose_obj.resume_edu.content.push("学校名称不可或缺，如就读名牌院校可注明对应类型");
                }
                if (!resume_edu_result._has_job) {
                    _diagnose_obj.resume_edu.content.push("告诉HR你是学习什么专业~");
                }
                if (!resume_edu_result._un_over_content) {
                    _diagnose_obj.resume_edu.content.push("教育背景的描述应尽量简洁、突出重点，篇幅不宜过长，有重要的经历可单独拆分出来填写，建议重新梳理内容，如无需修改，请忽略");
                }
                if (!resume_edu_result._un_key_symbol) {
                    _diagnose_obj.resume_edu.content.push("教育背景不应罗列过多课程，学的多不代表懂的多，建议呈现成绩优秀的课程即可~");
                }
                if (!resume_edu_result._un_key_word) {
                    _diagnose_obj.resume_edu.content.push("简历中请尽可能不要使用任何人称，避免使用你、我、他、他们等代词进行描述");
                }
            } else {
                _diagnose_obj.resume_edu.content.push("请填写完整的学校名称/专业名称");
            }
        } else {
            _diagnose_obj.resume_edu.content.push("教育背景不可或缺，请添加教育背景模块");
        }
        // 判断工作经验
        var _resume_work = _resume['modules']['resume_work'];
        var _resume_work_content = JSON.parse(_resume_work.content);
        _diagnose_obj.resume_work = { name: '工作经验', need_tips: true, content: [] };
        if (_resume_work.mg.isShow) {
            // 当工作经验模块显示时判断内容是否合法
            if (_resume_work_content.length) {
                var resume_work_result = diagnose_check_timeItem(_resume_work_content, 50, 1000);
                if (!resume_work_result._has_time) {
                    _diagnose_obj.resume_work.content.push("请根据实际情况填写在岗时间");
                }
                if (!resume_work_result._has_unit) {
                    _diagnose_obj.resume_work.content.push("公司名称很重要，请如实填写哦");
                }
                if (!resume_work_result._has_job) {
                    _diagnose_obj.resume_work.content.push("请补充所在公司的任职岗位");
                }
                if (!resume_work_result._un_over_job) {
                    _diagnose_obj.resume_work.content.push("如担任多个岗位可在描述处补充，无需全部展示，请以关键词形式呈现，建议重新梳理内容，如无需修改，请忽略本建议");
                }
                if (!resume_work_result._has_content) {
                    _diagnose_obj.resume_work.content.push("添加工作经验描述，对工作进行概述和提炼，用成绩和结果证明自己的能力能力");
                }
                if (!resume_work_result._un_over_content) {
                    _diagnose_obj.resume_work.content.push("工作经验描述篇幅较长，HR查看简历时间有限，建议提炼出你对目标岗位最有价值的资源、业绩、做事方法和能力，精简语言，突出重点");
                }
                if (!resume_work_result._un_less_content) {
                    _diagnose_obj.resume_work.content.push("工作内容的描述较单薄，建议使用STAR法则（情景、任务、行动、结果），结合具体数字和实例，描述清楚工作背景、具体职责、取得的成果等内容，注意分点描述");
                }
                if (!resume_work_result._un_key_word) {
                    _diagnose_obj.resume_work.content.push("简历中请尽可能不要使用任何人称，避免使用你、我、他、他们等代词进行描述");
                }
            } else {
                _diagnose_obj.resume_work.content.push("工作经验是简历最重要的部分，建议您至少添加一段工作经验，这是企业评估候选人的重要依据");
            }
        } else {
            _diagnose_obj.resume_work.content.push("工作经验是简历最重要的部分，建议您至少添加一段工作经验，这是企业评估候选人的重要依据");
        }
        // 判断校园活动
        var _resume_internship = _resume['modules']['resume_internship'];
        var _resume_internship_content = JSON.parse(_resume_internship.content);
        _diagnose_obj.resume_internship = { name: '校园活动', need_tips: false, content: [] };
        if (_resume_internship.mg.isShow) {
            _diagnose_obj.resume_internship.need_tips = true;
            //  当实习经验模块显示时判断内容是否合法
            if (_resume_internship_content.length) {
                var resume_internship_result = diagnose_check_timeItem(_resume_internship_content, 50, 1000);
                if (!resume_internship_result._has_time) {
                    _diagnose_obj.resume_internship.content.push("请根据实际情况填写活动时间")
                }
                if (!resume_internship_result._has_unit) {
                    _diagnose_obj.resume_internship.content.push("活动名称很重要，请如实填写哦？")
                }
                if (!resume_internship_result._has_job) {
                    _diagnose_obj.resume_internship.content.push("请补充填写角色名称");
                }
                if (!resume_internship_result._un_over_job) {
                    _diagnose_obj.resume_internship.content.push("如担任多个岗位可在描述处补充，无需全部展示+关键词形式呈现，建议重新梳理内容，如无需修改，请忽略本建议");
                }
                if (!resume_internship_result._un_over_content) {
                    _diagnose_obj.resume_internship.content.push("活动描述应注意内容清晰、结果导向，同时要与目标申请岗位相结合，升华内容，篇幅不宜过长。建议重新整理下语言，如无需修改，请忽略");
                }
                if(!resume_internship_result._un_key_word){
                    _diagnose_obj.resume_internship.content.push("简历中请尽可能不要使用任何人称，避免使用你、我、他、他们等代词进行描述");
                }
            } else {
                _diagnose_obj.resume_internship.content.push("选取与目标岗位相关的社团活动、比赛活动、志愿者活动、个人实践等经历，如不需要该模块，可选择隐藏");
            }
        }
        // 判断项目经验
        var _resume_project = _resume['modules']['resume_project'];
        var _resume_project_content = JSON.parse(_resume_project.content);
        _diagnose_obj.resume_project = { name: '项目经验', need_tips: false, content: [] };
        if (_resume_project.mg.isShow) {
            _diagnose_obj.resume_project.need_tips = true;
            if (_resume_project_content.length) {
                var resume_project_result = diagnose_check_timeItem(_resume_project_content, 50, 1000);
                if (!resume_project_result._has_time) {
                    _diagnose_obj.resume_project.content.push("请根据实际情况填写项目时间")
                }
                if (!resume_project_result._has_unit) {
                    _diagnose_obj.resume_project.content.push("项目名称很重要，请如实填写哦")
                }
                if (!resume_project_result._has_job) {
                    _diagnose_obj.resume_project.content.push("请补充填写角色名称")
                }
                if (!resume_project._un_over_job) {
                    _diagnose_obj.resume_project.content.push("如担任多个岗位可在描述处补充，无需全部展示，请以关键词形式呈现，建议重新梳理内容，如无需修改，请忽略本建议");
                }
                if (!resume_project_result._un_over_content) {
                    _diagnose_obj.resume_project.content.push("项目描述应注意内容清晰、结果导向，同时要与目标申请岗位相结合，升华内容，篇幅不宜过长。建议重新整理下语言，如无需修改，请忽略")
                }
                if (!resume_project_result._un_key_word) {
                    _diagnose_obj.resume_project.content.push("简历中请尽可能不要使用任何人称，避免使用你、我、他、他们等代词进行描述");
                }
            } else {
                _diagnose_obj.resume_project.content.push("选取有价值的项目经历，突出自己的工作能力");
            }
        }
        // 判断自我评价模块
        var _resume_summary = _resume['modules']['resume_summary'];
        var _resume_summary_content = JSON.parse(_resume_summary.content);
        _diagnose_obj.resume_summary = { name: '自我评价', need_tips: false, content: [] };
        if (_resume_summary.mg.isShow) {
            _diagnose_obj.resume_summary.need_tips = true;
            if (_resume_summary_content.length) {
                _resume_summary_content = _resume_summary_content[0].content.replace(/&nbsp;| |<\/?.+?>/g, "");
                if (common.main.is_empty(_resume_summary_content)) {
                    _diagnose_obj.resume_summary.content.push("写一段简洁得体的自我评价，既可以节省HR筛选成本，同时又能快速突出自己价值。")
                }
                if (_resume_summary_content.length < 50) {
                    _diagnose_obj.resume_summary.content.push("结合岗位需求对自身进行总结，可以描述行业背景/岗位经验，针对应聘的岗位你有什么拿得出手的优势、技能，简述职业动机/发展目标，介绍你的热情/与公司、产品的交集等。")
                }
                if (_resume_summary_content.length > 500) {
                    _diagnose_obj.resume_summary.content.push("自我评价篇幅不要太长，注意言简意赅，筛选核心能力，运用数据或实例进行描述，如果确实有很多内容要展示，建议以求职信的形式附上。")
                }
            } else {
                _diagnose_obj.resume_summary.content.push("写一段简洁得体的自我评价，既可以节省HR筛选成本，同时又能快速突出自己价值。");
            }
        }
        // 荣誉奖项
        var _resume_honor = _resume['modules']['resume_honor'];
        var _resume_honor_content = JSON.parse(_resume_honor.content);
        _diagnose_obj.resume_honor = { name: '奖项荣誉', need_tips: false, content: [] };
        if (_resume_honor.mg.isShow) {
            _diagnose_obj.resume_honor.need_tips = true;
            if (_resume_honor_content.length) {
                _resume_honor_content = _resume_honor_content[0].content.replace(/&nbsp;| |<\/?.+?>/g, "");
                if (common.main.is_empty(_resume_honor_content)) {
                    _diagnose_obj.resume_honor.content.push("选取含金量高的荣誉奖项按时间倒叙填写，如不需要该模块，可选择隐藏。");
                }
            } else {
                _diagnose_obj.resume_honor.content.push("选取含金量高的荣誉奖项按时间倒叙填写，如不需要该模块，可选择隐藏。");
            }
        }
        // 判断技能特长
        var _resume_skill = _resume['modules']['resume_skill'];
        var _resume_skill_content = JSON.parse(_resume_skill.content);
        _diagnose_obj.resume_skill = { name: '技能特长', need_tips: false, content: [] };
        if (_resume_skill.mg.isShow) {
            _diagnose_obj.resume_skill.need_tips = true;
            if (_resume_skill_content.length) {
                if (_resume_skill_content.length === 1) {
                    _diagnose_obj.resume_skill.content.push("多添加与工作相关的技能特长，方便HR进一步了解你");
                }
                if (_resume_skill_content.length > 6) {
                    _diagnose_obj.resume_skill.content.push("技贵在精而不在于多，建议不要填写超过6个");
                }
            } else {
                _diagnose_obj.resume_skill.content.push("请添加与工作和业务相关的技能特长，如不需要该模块，可选择隐藏");
            }
        }
        // 判断语言能力
        var _resume_language = _resume['modules']['resume_language'];
        var _resume_language_content = JSON.parse(_resume_language.content);
        _diagnose_obj.resume_language = { name: '语言能力', need_tips: false, content: [] };
        if (_resume_language.mg.isShow) {
            _diagnose_obj.resume_language.need_tips = true;
            if (!_resume_language_content.length) {
                _diagnose_obj.resume_language.content.push("如果目标岗位有语言要求，请添加语言能力哦，如不需要该模块，可选择隐藏");
            }
        }
        // 判断作品展示
        var _resume_portfolio = _resume['modules']['resume_portfolio'];
        var _resume_portfolio_content = JSON.parse(_resume_portfolio.content);
        _diagnose_obj.resume_portfolio = { name: '作品展示', need_tips: false, content: [] };
        if (_resume_portfolio.mg.isShow && !_resume_portfolio_content.img.length && !_resume_portfolio_content.link.length) {
            _diagnose_obj.resume_portfolio.need_tips = true;
            _diagnose_obj.resume_portfolio.content.push("添加你最得意的作品，用实际作品说话，方便HR更直观的了解你的个人能力");
        }
        return _diagnose_obj;
    },
    // 处理诊断结果数据，分值、诊断文本、结果
    format_diagnose_result: function () {
        /**
         * diagnose_value = 分值 & 评价说明
         * diagnose_content = 诊断模块项
         * diagnose_handle = 处理后的结果
         */
        var value = cvmutual.main.caclulate_resume_scale();
        var content = cvmutual.main.get_diagnose_result();
        var handle = [];
        //需要提示的模块整理处理
        for (var item in content) {
            content[item].moduleId = item;
            if (content[item].need_tips) {
                handle.push(content[item]);
            }
        }
        cvmutual.info.diagnose.diagnose_value = value;
        cvmutual.info.diagnose.diagnose_content = content;
        cvmutual.info.diagnose.diagnose_handle = handle;
    },
    // 更新诊断问题角标数值
    diagnose_number_update: function () {
        var $panel = $('.wbdCv-editorBody .function_panel');
        // 显示问题项
        if (!cvmutual.info.diagnose.diagnose_handle) {
            cvmutual.main.format_diagnose_result();
        }
        var diagnose_number = 0;
        cvmutual.info.diagnose.diagnose_handle.forEach(function (item) {
            diagnose_number += item.content.length;
        });
        $panel.find('.diagnose_number').attr('data-number', diagnose_number).text(diagnose_number);
        return diagnose_number;
    },
    // 诊断问题项插入
    diagnose_item_insert: function (handle_item) {
        if (typeof handle_item !== 'object') {
            return;
        }
        var $contain = $('.wbdCv-editorBody');
        var $panel = $contain.find('.function_panel');
        var $diagnoseitem = $panel.find('#diagnose_item');
        var $item = $diagnoseitem.find('li[data-module-id="'+ handle_item.moduleId +'"]:not(.delete)');
        var $module = $('#'+ handle_item.moduleId).children('dl');
        if ($item.length) {
            $item.find('.diagnose_item_number').text(handle_item.content.length);
        } else {
            $diagnoseitem.append('<li data-module-id="'+ handle_item.moduleId +'"><span>'+ handle_item.name +'</span><i class="diagnose_item_number">'+ handle_item.content.length +'</i></li>');
            $item = $diagnoseitem.find('li[data-module-id="'+ handle_item.moduleId +'"]');
            // 点击显示诊断弹窗 渲染诊断评价内容
            $item.on('click', function (event) {
                var $this = $(this);
                var isTrigger = !!event.isTrigger;
                var $perfect_modal = $('#diagnose_perfect_modal');
                if ($perfect_modal.is(':visible') && $this.hasClass('checked')) {
                    return;
                }
                $this.addClass('checked').siblings('li').removeClass('checked');
                // 对应的模块
                var perfect_obj = cvmutual.info.diagnose.diagnose_content[$this.attr('data-module-id')];
                // 弹窗内容渲染
                $perfect_modal.hide();
                $perfect_modal.find('#diagnose_item_list').html('');
                $perfect_modal.find('.diagnose_module_title').text(perfect_obj.name + '（' + perfect_obj.content.length + '）');
                $.each(perfect_obj.content, function (index, item) {
                    $perfect_modal.find('#diagnose_item_list').append('<li>' + item + '</li>');
                });
                // 被动触发时 页面不滚动 提示框不超出屏幕范围
                var module_offset = $module.find('.perfect_mark_item').offset();
                module_offset.left = module_offset.left + $module.find('.perfect_mark_item').width() + 5;
                // 被动触发，有下面的诊断问题标识触发
                if (isTrigger) {
                    var modal_bottom = module_offset.top + $perfect_modal.height();
                    var win_height = $(window).height() + $(window).scrollTop();
                    if (modal_bottom > win_height) {
                        module_offset.top = module_offset.top - (modal_bottom - win_height) - 10;
                    }
                    $perfect_modal.css(module_offset).fadeIn(100);
                } else {
                    // 模块未显示，触发打开模块管理侧栏
                    if ($module.is(':hidden')) {
                        $this.removeClass('checked');
                        setTimeout(function () {
                            $(".leftbar_editor_operate .module_editor").trigger('click');
                        }, 100);
                    } else {
                        $('html, body').animate({
                            'scrollTop': module_offset.top - 100
                        }, 200, function () {
                            $perfect_modal.css(module_offset).fadeIn(100);
                        });
                    }
                }
            });
        }
        // 模块处添加标识（手机模板忽略）
        if (!$contain.find('.wbdCv-container').hasClass('mobile')) {
            if (['relative', 'absolute', 'fixed'].indexOf($module.css('position')) < 0) {
                $module.css('position', 'relative');
            }
            var $mark = $module.find('.perfect_mark_item');
            if ($mark.length) {
                $mark.text(handle_item.content.length);
            } else {
                $module.append('<i class="perfect_mark_item prevent_moduleItem_current" data-module-id="'+ handle_item.moduleId +'">'+ handle_item.content.length +'</i>');
                $mark = $module.find('.perfect_mark_item');
                // 事件传递给上面的诊断列表项
                $mark.on('click', function () {
                    $item.trigger('click');
                });
            }
        }
    },
    // 诊断问题项移除
    diagnose_item_remove: function ($module) {
        if (typeof $module !== 'object') {
            return;
        }
        var $panel = $('.wbdCv-editorBody .function_panel');
        var $diagnoseitem = $panel.find('#diagnose_item li[data-module-id="'+ $module.attr('id') +'"]').addClass('delete');
        $module.find('dl .perfect_mark_item').remove();
        $diagnoseitem.css('transform', 'translateX(150%)');
        setTimeout(function () {
            $diagnoseitem.remove();
        }, 600);
    },
    // 诊断开始方法  runType = result(跳过动画) | init(默认)
    diagnose_run: function (runType) {
        var runType = runType || 'init';
        //数据埋点
        common.main._500dtongji("PC-CV6.9.5-简历编辑页-编辑器-诊断区-右上角-全面诊断");
        // 改变动画状态 初始化内容状态
        var $contain = $('.wbdCv-editorBody');
        var $panel = $contain.find('.function_panel');
        var $diagnose = $panel.find('.diagnose_defalut');
        var $progress = $panel.find('.diagnose_progress .bar');
        var $diagnoseitem = $panel.find('#diagnose_item');
        // 初始化样式
        $diagnose.show().removeClass('diagnose_midway diagnose_end');
        $diagnose.find('.diagnose_bar').removeClass('low_score');
        $diagnoseitem.html('');
        $contain.find('.perfect_mark_item').remove();
        // 获取诊断结果
        cvmutual.main.format_diagnose_result();
        // 诊断结果内容
        var handle = cvmutual.info.diagnose.diagnose_handle;
        // 诊断过程
        switch (runType) {
            // 播放动画诊断
            case 'init':
                // 分数
                var score = 0;
                $diagnose.addClass('diagnose_midway');
                $diagnose.find('.diagnose_score').text(score);
                // 定时器循环下标
                var loop_index = 0;
                var time = parseInt(Math.random() * 1000);
                // 进度条平均值
                var progress_phase = 100 / handle.length;
                // 定时器遍历处理诊断
                var diagnose_each = function () {
                    // 检测模块中
                    $diagnose.find('.diagnose_title').text('正在全面诊断');
                    $diagnose.find('.diagnose_message').text('检查'+ handle[loop_index].name +'模块内容');
                    // 诊断问题项
                    handle[loop_index].content.length && cvmutual.main.diagnose_item_insert(handle[loop_index]);
                    // 分值计算
                    var grade_max = Math.floor(cvmutual.info.diagnose.diagnose_value.grade / handle.length);
                    score += Math.round(Math.random() * grade_max * 2);
                    if (score > cvmutual.info.diagnose.diagnose_value.grade) {
                        score = cvmutual.info.diagnose.diagnose_value.grade;
                    }
                    $diagnose.find('.diagnose_score').text(score);
                    // index++  && 诊断进度条
                    loop_index++;
                    $progress.css('width', (progress_phase * loop_index) + '%');
                    // 重新生成定时器时间，每次遍历时间不一致
                    time = parseInt(Math.random() * 1000);
                    cvmutual.info.diagnose.looptimer = setTimeout(diagnose_each, time);
                    // 在定时器内创建定时器后才能取消整个定时器循环
                    if (loop_index >= handle.length) {
                        score = cvmutual.info.diagnose.diagnose_value.grade;
                        setTimeout(function () {
                            cvmutual.main.diagnose_end();
                        }, 300);
                    }
                }
                cvmutual.info.diagnose.looptimer = setTimeout(diagnose_each, time);
                break;
            // 直接展示结果
            case 'result':
                handle.forEach(function (item) {
                    // 诊断问题项
                    item.content.length && cvmutual.main.diagnose_item_insert(item);
                });
                cvmutual.main.diagnose_end();
                break;
        }
        cvmutual.main.listen_diagnose_result_update();
    },
    // 诊断结束方法  outType = break(中断) | end(诊断结果)
    diagnose_end: function (outType) {
        var outType = outType || 'end';
        var $contain = $('.wbdCv-editorBody');
        var $panel = $contain.find('.function_panel');
        var $diagnose = $panel.find('.diagnose_defalut');
        var $progress = $panel.find('.diagnose_progress .bar');
        clearTimeout(cvmutual.info.diagnose.looptimer);
        if (outType === 'break') {
            cvmutual.main.diagnose_out();
            // 中断诊断  清除localStorage状态
            if (window.localStorage) {
                var diagnose_state = window.localStorage.getItem('ReDiagnoseState') ? window.localStorage.getItem('ReDiagnoseState').split(',') : [];
                var state_index = diagnose_state.indexOf(String(cvresume.info.resumeid));
                if (state_index >= 0 && cvresume.info.resumeid !== 0) {
                    diagnose_state.splice(state_index, 1);
                    window.localStorage.setItem('ReDiagnoseState', diagnose_state.join(','));
                }
            }
        } else {
            var score = cvmutual.info.diagnose.diagnose_value.grade;
            var diagnose_number = cvmutual.main.diagnose_number_update();
            // 诊断面板打开状态下 更新视图 诊断结果状态
            if ($diagnose.is(':visible')) {
                $diagnose.addClass('diagnose_end').removeClass('diagnose_midway');
                $diagnose.find('.diagnose_score').text(score);
                $diagnose.find('.diagnose_title').text('您的简历综合评分');
                $diagnose.find('.diagnose_message').text(cvmutual.info.diagnose.diagnose_value.gradeText.replace('${length}', diagnose_number));
                $progress.css('width', 0);
                $diagnose.find('.rediagnose_btn').show();
                // 低分样式
                $diagnose.find('.diagnose_bar').toggleClass('low_score', score <= 60);
            }
            // 诊断结束  设置 localStorage保存状态 下次诊断不需要执行动画
            if (window.localStorage) {
                var diagnose_state = window.localStorage.getItem('ReDiagnoseState') ? window.localStorage.getItem('ReDiagnoseState').split(',') : [];
                if (diagnose_state.indexOf(String(cvresume.info.resumeid)) < 0 && cvresume.info.resumeid !== 0) {
                    diagnose_state.push(cvresume.info.resumeid);
                    window.localStorage.setItem('ReDiagnoseState', diagnose_state.join(','));
                }
            }
        }
    },
    // 诊断退出方法
    diagnose_out: function () {
        var $contain = $('.wbdCv-editorBody');
        var $panel = $contain.find('.function_panel');
        var $diagnose = $panel.find('.diagnose_defalut');
        var $progress = $panel.find('.diagnose_progress .bar');
        var $diagnoseitem = $panel.find('#diagnose_item');
        $panel.find('.close_panel').click();
        $diagnose.removeClass('diagnose_end diagnose_midway');
        $diagnose.find('.diagnose_score').text(0);
        $diagnose.find('.diagnose_title').text('智能诊断');
        $diagnose.find('.diagnose_message').html('通过AI算法为你的简历进行诊断');
        $progress.css('width', 0);
        $diagnoseitem.find('li').remove();
        // 删除标记
        $contain.find('.perfect_mark_item').remove();
        // 诊断提示框还原
        $('#diagnose_perfect_modal').css({
            'display': 'none',
            'top': '-999px',
            'left': '-999px',
        });
    },
    /**
     * 监听简历内容修改  实时更新诊断分数和诊断问题项
     * listen_diagnose_event              事件方法
     * listen_diagnose_result_update      监听触发
     */
    listen_diagnose_event: function (event) {
        var $panel = $('.wbdCv-editorBody .function_panel');
        var $diagnose = $panel.find('.diagnose_defalut');
        var is_update = false;      // 是否进行更新
        var $module;
        var uploadImg;
        var $this = $(event.currentTarget);
        // 获取最新简历状态
        var update = function () {
            if (!$module) {
                return;
            }
            setTimeout(function () {
                // 诊断面板打开状态下 并且诊断结束 更新诊断结果
                cvmutual.main.format_diagnose_result();
                if ($diagnose.is(':visible') && $diagnose.hasClass('diagnose_end')) {
                var not_tips = true;
                cvmutual.info.diagnose.diagnose_handle.forEach(function (item) {
                        // 在简历模块标题处添加标记
                        if (item.moduleId === $module.attr('id')) {
                            not_tips = false;
                            if (item.content.length) {
                                cvmutual.main.diagnose_item_insert(item);
                            } else {
                                cvmutual.main.diagnose_item_remove($module);
                            }
                        }
                    });
                }
                // 当前模块不需要诊断提示
                if (not_tips) {
                    cvmutual.main.diagnose_item_remove($module);
                }
                cvmutual.main.diagnose_end();
            }, 300);
        }
        // 内容输入监听
        if ($this.is('div[contenteditable]')) {
            // 是否改变内容
            if (window.cvresume && cvresume.cur_opt_content !== $this.html()) {
                if ($this.parents('#resume_name').length > 0) {
                    $module = $('#base_info');
                } else {
                    $module = $this.parents('.moduleItem');
                }
                is_update = true;
            }
        }
        // 点击监听  
        if (event.type === 'click' || event.type === 'mousedown') {
            // 目前使用到弹窗修改数据的有 基本信息 岗位信息 技能 
            if ($this.hasClass('submit') && $this.parents('.modal').length) {
                // 基本信息
                if ($this.parents('#baseMsg-modal').length) {
                    $module = $('#base_info');
                }
                // 头像
                if ($this.parents('#headimg-modal').length) {
                    $module = $('#resume_head');
                    uploadImg = $('#resume_head .img-preview img');
                }
                // 岗位信息
                if ($this.parents('#jobIntension-modal').length) {
                    $module = $('#resume_job_preference');
                }
                // 技能特长
                if ($this.parents('#skills-modal').length) {
                    $module = $('#resume_skill');
                }
                // 语言能力
                if ($this.parents('#language-modal').length) {
                    $module = $('#resume_language');
                }
                // 作品
                if ($this.parents('#portfolio-modal').length) {
                    $module = $('#resume_portfolio');
                }
                is_update = true;
            }
            // 时间选择器点击
            if ($this.parents('.month_body').length) {
                $module = $this.parents('.moduleItem');
                is_update = true;
            }
            // 删除操作
            if ($this.hasClass('delete')) {
                $module = $this.parents('.moduleItem');
                is_update = true;
            }
            // 模块管理操作
            if ($this.parents('#moduleManageModal').length) {
                $module = $('#' + $this.attr('for-id'));
                is_update = true;
            }
            // 应用案例
            if ($this.parents('.panel_case').length > 0) {
                $module = $('#' + $this.parents('.panel_case').find('.case_filter_modulename').attr('data-module'));
                is_update = true;
            }
        }
        // 更新视图
        if (is_update && $module && $module.length) {
            // 图片上传成功监听
            if (!!uploadImg) {
                var interval;
                var before_src = uploadImg.attr('src');
                interval = setInterval(function () {
                    if (uploadImg.attr('src') !== before_src) {
                        clearInterval(interval);
                        update();
                    }
                }, 100);
                // 10秒后清除setInterval  防止一直执行
                setTimeout(function () {
                    clearInterval(interval);
                }, 10000);
            } else {
                update();
            }
        }
    },
    listen_diagnose_result_update: function () {
        // 此方法会多次调用  事件绑定需要先清除
        $(document).off('blur', 'div[contenteditable=true]', cvmutual.main.listen_diagnose_event);
        $(document).off('click', '.dd-title .month_body span, #baseMsg-modal .submit, #jobIntension-modal .submit, #skills-modal .submit, #language-modal .submit', cvmutual.main.listen_diagnose_event);
        $(document).off('click', '.baseItem-toolbar .delete, #showul li:not(.custom-li) a[for-id], .panel_case .case_masking span', cvmutual.main.listen_diagnose_event);
        $(document).off('mousedown', 'dd .moduleItemList:not(.hidden) .delete', cvmutual.main.listen_diagnose_event);
        $(document).off('click', '#headimg-modal .submit, #portfolio-modal .submit', cvmutual.main.listen_diagnose_event);
        // 编辑更新诊断结果
        $(document).on('blur', 'div[contenteditable=true]', cvmutual.main.listen_diagnose_event);
        // 弹窗修改更新诊断结果 删除模块 删除子模块更新结果
        $(document).on('click', '.dd-title .month_body span, #baseMsg-modal .submit, #jobIntension-modal .submit, #skills-modal .submit, #language-modal .submit', cvmutual.main.listen_diagnose_event);
        // 增删模块操作  案例应用
        $(document).on('click', '.baseItem-toolbar .delete, #showul li:not(.custom-li) a[for-id], .panel_case .case_masking span', cvmutual.main.listen_diagnose_event);
        // 删除子模块  这里如果用click 技能、兴趣模块获取不到父级标签，因为删除dom的事件操作在这个事件之前执行
        $(document).on('mousedown', 'dd .moduleItemList:not(.hidden) .delete', cvmutual.main.listen_diagnose_event);
        // 头像上传 作品上传
        $(document).on('click', '#headimg-modal .submit, #portfolio-modal .submit', cvmutual.main.listen_diagnose_event);
    },
};
$(function(){
    // 初始化
	cvmutual.main.init_();
});