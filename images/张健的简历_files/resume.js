/**
 * 在线简历简历数据操作
 * @author huangcanhui
 * 文档提示
 * .moduleItem 标记模块
 * .moduleItemList 标记模块下的子栏目
 * .divIconFont 标记自定义图标
 **/
var cvresume = cvresume || {};
cvresume.main = cvresume.main || {};
cvresume.info={
		itemid:0,
		resumeid:0,
		memberid:0,
		downloadFlag:false,
		downloadUrl:"",
		resumecontentid:0,
		visitid:"",
		sortPosition:["Left","Top","Right","Bottom"],
		cases:"",
		language:"zh",
		resume_type:"文档",
		resume_fontType_change:-1, //0：简历，1：繁体，-1：不做任何操作
		timeout_resume_save: {},		// 简历保存延迟定时器
		loginMsg:null,
		version:null,//简历版本号
}
cvresume.localStorage=true;//localStorge兼容，方便测试（默认true）
cvresume.save_trigger=true;
cvresume.resume_save_trigger=true;
cvresume.history_save_trigger=true;//历史记录
cvresume.cur_opt_content="";//当前用户正在操作原始数据，使用获得焦点数据保存
cvresume.main = {
		event_: function () {//事件绑定
            cvresume.main.moduleItemList_handlestyle();
            // 简历回退旧版本
            $('#resumeFallback').on('click', function () {
                if (!cvresume.info.resumeid) {
                	cancel_resume_update();
                    location.href = location.href.replace('newcvresume', 'cvresume');
                } else {
                    common.main.resume_confirm({
                        title: "返回旧版本提示",
                        content_html: "<p>返回旧版本可能存在一些风险，是否继续操作。</p>",
                        modal_class: "fallback_resume_modal",
                        ok: '返回旧版本',
                        onOk: function () {
                            $.post(wbdcnf.base + '/newcvresume/downgrade/', {
                                token: getCookie("token"),
                                id: cvresume.info.resumeid
                            }, function (result) {
                                if (result.type != "success") {
                                    layer.msg(result.content);
                                } else {
                                	cancel_resume_update();
                                    location.reload();
                                }
                            })
                        }
                    });
                }
            });
            function cancel_resume_update(){
            	if (window.localStorage) {
            		var resume_update_tips = window.localStorage.getItem("resume_update_tips");
            		resume_update_tips = resume_update_tips ? resume_update_tips.split(',') : [];
	            	if(resume_update_tips.indexOf(String(cvresume.info.resumeid)) === -1){
	            		resume_update_tips.push(String(cvresume.info.resumeid));
	            	}
            		window.localStorage.setItem("resume_update_tips", resume_update_tips.join(','));
				} 	
            }
	    	//分享功能
	    	$("#shareResume-modal #copyUrl").on("click",function(){
                var str = $(".shareContent span").html() + $(".shareContent input").val()+"/";
                cvresume.main.set_copyToClipBoard(str);
                $("#copyUrl").html("复制成功");
                setTimeout(function(){
                    $("#copyUrl").html("复制链接")
                },2000);
	        });
	    	
	    	//设置隐私id
	    	$("#visitid").change(function(){
	    		cvresume.main.set_visitid($(this).val());
	    	});
	    	//设置访问类别
	    	$("#resume_authority_modal .authority_list:not(li:eq(1))").click(function(){
	    		if(cvresume.main.is_empty(cvresume.info.resumeid)){
	    			layer.msg("没有登录");
	    		}else{
		    		var data_type=$(this).attr("data-type");
		    		if(!cvresume.main.is_empty(data_type)){
		    			$.post("/cvresume/set_visit_type/",{"visitType":data_type,"resumeid":cvresume.info.resumeid},function(message){
		    				if(message.type=="success"){
		    					$("#edit_resume_sharebtn").attr("data-visittype",data_type)
		    				}
		    			});
		    		}
	    		}
	    	});
	    	//设置访问密码
	    	$("#visitPasswordSubBtn").click(function(){
	    		//设置密码访问类别
	    		var data_type=$("#resume_authority_modal .authority_list:nth-child(1)").attr("data_type");
		    	if(!cvresume.main.is_empty(data_type)){
		    		$.post("/cvresume/set_visit_type/",{"visitType":data_type,"resumeid":cvresume.info.resumeid},function(message){
		    			$("#edit_resume_sharebtn").attr("data-visittype",data_type)
		    		});
		    	}
		    	var password=$("#visitPassword").val();
		    	if(cvresume.main.is_empty(password)){
					layer.msg("密码不能为空~");
					return;
		    	}
	    		if(password.length > 6){
	                layer.msg("密码长度不允许超过6位数！");
	                return;
	            }
	            if(!/^[0-9]*$/.test(password)){
	                layer.msg("密码只允许输入数字！");
	                return;
				}
				$.post("/cvresume/set_visit_password/",{"password":password,"resumeid":cvresume.info.resumeid},function(message){
    				if(message.type=="success"){
						layer.msg("密码设置成功~");
                        $("#resume_authority_modal").modal("hide");
                    }else{
    					layer.msg(message.content);
    				}
    			});
	    	});
            
			// 简历 设置/修改 名称/标题 ------------------------
			/**
			 * __resume_name__  			原本的简历名称
			 * __resumename_illegal   		简历非法字符匹配
			 * __resumename_illegal_close   清除非法字符规则
			 * info_object     				生成简历名称的字段
			 * reload_info_object()    		更新字段内容
			 * show_selected_resumetitle()	渲染生成标题字段的选中效果
			 */
			var __resume_name__ = $('#resumeName_value').val();
			var __resumename_illegal = /^[a-zA-Z0-9_@\.\- \u4e00-\u9fa5]*$/;
			var __resumename_illegal_close = /[^a-zA-Z0-9_@\.\- \u4e00-\u9fa5]*/g;
            // 7个字段对应的dom
            var info_object = {};
            // 刷新value
            reload_info_object();
            function reload_info_object(){
                info_object = {
                    'jobFunction': $('#jobFunction span').text(),
                    'name': $('#resume_name .name').text(),
                    'jobYear': $('#jobYear span').text(),
                    'mobile': $('#mobile span').text(),
                    'email': $('#email span').text(),
                    'education': $('#education span').text(),
                    'cityName': $('#city span').text(),
                }
            }
			// 回显选中的li   先设置好顶部标题的选中
			if ($('#head_resume_name').length > 0) show_selected_resumetitle($('#head_resume_name'));
            function show_selected_resumetitle($input){
                var base_info = $input.val().split(/\s?-\s?/);	// 正则匹配 - 分割 前后有无空格都分割
				$input.attr('readonly', 'readonly');
				$('.set_resumename_panel .panel_operate li').removeClass('selected');
                base_info.forEach(function(info_item){
                    for (var i in info_object) {
                        if (info_item === info_object[i]) {
                            $('.set_resumename_panel .panel_operate li[data-data="'+ i +'"]').addClass('selected');
                            break;
                        }
                    }
				});
				// 有内容 && 没匹配信息项
                if ($input.val() !== '' && $input.parent().find('.set_resumename_panel .panel_operate li:not(.custom).selected').length !== base_info.length) {
                    $('.set_resumename_panel .panel_operate li.custom').addClass('selected').siblings('li').removeClass('selected');
                }
            }
			/**
			 * 简历命名(顶部命名框)
			 */
            // 设置名称面板 显示/隐藏
            $('#head_resume_name').on('click', function(){
                if (!$(this).attr('readonly')) return;
                $(this).addClass('focus');
				$(this).siblings('.set_resumename_panel').fadeIn();
				$(document).off('click', click_ohter_closepanel).on('click', click_ohter_closepanel);
				reload_info_object();
				// 自定义输入移除文本框只读属性
				show_selected_resumetitle($(this));
				if ($(this).siblings('.set_resumename_panel').find('.panel_operate li.custom').hasClass('selected')) {
					$(this).removeAttr('readonly');
				}
            });
            // 面板设置简历名称 （头部 和 命名弹窗统一）
            $('.set_resumename_panel .panel_operate li').on('click', function(){
                var $input = $('#head_resume_name, #resumeName_value');
                // 自定义名称
                if ($(this).attr('data-data') === 'custom') {
                    if (!$(this).hasClass('selected')) {
                        $(this).addClass('selected').siblings('li').removeClass('selected');
                        $input.removeAttr('readonly').val('');
                        $(this).parents('.set_resumename_panel').siblings('input.resume_name').focus();
                    } else {
                        $(this).parents('.set_resumename_panel').siblings('input.resume_name').focus();
                    }
                } else {
                    $(this).toggleClass('selected');
                    // 使用基本信息组成名称
                    $(this).siblings('li[data-data="custom"]').removeClass('selected');
                    $input.attr('readonly', 'readonly');
                    var resume_title_baseinfo = [];
					reload_info_object();
					// 当前选择项没有内容不添加到数组
					var $selected_arr = $(this).parent().children('li.selected').toArray();
					for (var i in $selected_arr) {
						var $selected_li = $($selected_arr[i]);
						var value = info_object[$selected_li.attr('data-data')];
						if (value.replace(/\s+/g, '') === '') {
							layer.msg($selected_li.text() + '未填写！');
							$selected_li.removeClass('selected');
							continue;
						}
						// 清除特殊字符
						if (!__resumename_illegal.test(value)) {
							value = value.replace(__resumename_illegal_close, '');
						}
						resume_title_baseinfo.push(value);
					}
					$input.val(resume_title_baseinfo.join(' - '));
                }
			});
			// 触发关闭
            $('.header_resume_area .set_resumename_panel .panel_close').on('click', close_resumetitle_panel);
            $('#head_resume_name, #resumeName_value').on('input', function(){
                // 同步到命名内容
                $('#head_resume_name, #resumeName_value').val($(this).val());
            });
            // 关闭设置标题面板  自定义输入保存
            function close_resumetitle_panel(){
                var $input = $('#head_resume_name');
                // 空命名使用默认
                if ($input.val().replace(/\s+/g, '') === '') {
					$('#head_resume_name, #resumeName_value').val('我的简历 - ' + common.main.date_format(new Date(), 'yyyyMMddmmss'));
				}
                if (__resume_name__ !== $input.val()) {
					__resume_name__ = $input.val();
					// 头部标题命名保存  清除特殊字符
					if (!__resumename_illegal.test($input.val())) {
						$input.val($input.val().replace(__resumename_illegal_close, ''));
						layer.msg('不能输入特殊字符');
					}
					cvresume.main.base_resume_save(true,cvresume.main.get_resume(),false);
				}
                $input.removeClass('focus').attr('readonly', 'readonly');
				$('.header_resume_area .set_resumename_panel').fadeOut();
				$(document).off('click', click_ohter_closepanel);
			}
			// 点击其他地方关闭
			function click_ohter_closepanel(e){
				if (!e) return;
				var $click_this = $(e.target);
				if ($click_this.parents('.header_resume_area').length === 0) {
					close_resumetitle_panel();
				}
			}
            /**
			 * 简历命名(弹框) 保存
			 */
            $("#resumeName .submit").click(function(){
            	var $input = $('#resumeName_value');
                if ($input.val().replace(/\s+/g, '') === '') {
                    return layer.msg('请输入简历名称');
				}
                __resume_name__ = $input.val();
				// 清除特殊字符
                if (!__resumename_illegal.test($input.val())) {
					$input.val($input.val().replace(__resumename_illegal_close, ''));
                    layer.msg('不能输入特殊字符');
                }
                $input.removeClass('focus').attr('readonly', 'readonly');
                $('#resumeName').modal('hide');
                cvresume.main.base_resume_save(true,cvresume.main.get_resume(),false);
			});
			/**
			 * 监听内容生成标题的字段改变，同步标题名称
			 */
			function listenter_title(){
				// 以字段生成的标题编辑简历后同步标题名称
				if (!$('.header_resume_area .panel_operate li.custom').hasClass('selected')) {
					reload_info_object();
					var $selected_arr = $('.header_resume_area .panel_operate li.selected').toArray();
					var resume_title_baseinfo = [];
					var $input = $('#head_resume_name, #resumeName_value');
					// 当前选择项没有内容不添加到数组
					for (var i in $selected_arr) {
						var $selected_li = $($selected_arr[i]);
						var value = info_object[$selected_li.attr('data-data')];
						// 清除特殊字符
						if (!__resumename_illegal.test(value)) {
							value = value.replace(__resumename_illegal_close, '');
						}
						resume_title_baseinfo.push(value);
					}
					$input.val(resume_title_baseinfo.join(' - '));
				}
			}
			$(document).on('click', '#baseMsg-modal .submit, #jobIntension-modal .submit', listenter_title);
			$(document).on('blur', '#resume_name .name', listenter_title);
			/**
			 * 生成初始标题
			 * 从创建流程新建的简历设置标题  定义fn 防止变量污染
			 */
			newresume_settitle();
			function newresume_settitle(){
				// 新创建的简历
				if (!cvresume.info.resumeid) {
					var $input = $('#head_resume_name, #resumeName_value');
					var resume_title_baseinfo = [];
					var info_object_index = 0;
					// 遍历基本信息字段 获取前4个 岗位 - 姓名 - 年限 - 电话
					for (var l in info_object) {
						if (!common.main.is_empty(info_object[l]) && info_object_index < 4) {
							resume_title_baseinfo.push(info_object[l]);
						}
						info_object_index++;
					}
					// 有填写set标题 && 处理特殊字符
					if (resume_title_baseinfo.length > 0) {
						var resume_title_baseinfo_str = resume_title_baseinfo.join(' - ');
						if (!__resumename_illegal.test(resume_title_baseinfo_str)) {
							resume_title_baseinfo_str = resume_title_baseinfo_str.replace(__resumename_illegal_close, '');
						}
						$input.val(resume_title_baseinfo_str);
					}
				}
			}
            // 设置简历名称/标题 end-----------
			//发布(保存->简历->历史记录)
			$(document).on("click","#cvresumeDownloadBtn",function(){
				if (cvmutual.info.resume_type == '手机' || $(this).hasClass('wbd-vip-lock')) return;
	    		var resume_title = $("#resumeName_value").val();
	    		var url_resume_title = decodeURI(common.main.getUrlParamsValue("title"));
	 	    	if($("html").hasClass("ie9")){
	 	    		alert("当前浏览器内核为ie9,如果简历加载不出来,请更换浏览器,或切换至极速模式,可以正常下载简历.");
	 	    	}
	    		if(cvresume.main.is_empty(resume_title) && (cvresume.main.is_empty(url_resume_title) || url_resume_title == "null")){//如果简历未保存并且url没带简历命名就弹出简历命名框
	    			$("#resumeName").modal("show");
                    show_selected_resumetitle($("#resumeName_value"));
	    		}else{
	    			var isSaveSuccess = cvresume.main.resume_save(true,false);
					if(isSaveSuccess){
						var _href = "/cvresume/release/"+cvresume.info.visitid+"/"
						if(!cvresume.main.is_empty($(this).attr("data-value"))){
							_href += "?device="+$(this).attr("data-value");
						}
						window.open(_href);
					}
	    		}
	    		return;
			});
			//简历打印
			$(document).on("click","#cvresumePrintBtn:not(.wbd-vip-lock)",function(){
				cvresume.main._500dtongji("PC-CV6.9.5-简历编辑页-编辑器-顶部-右上角-打印");
				var css_path = $(this).attr("data-css");
    			$.ajax({
		    		type: "POST",
					url: "/member/check_vip_rank/",
					cache: false,
		           	success:function(message){
		           		if(message.content == "novip"){
		           			layer.msg("您还没有这个权限,请升级后再进行操作");
		           			common.main.vip_opt_tips();
			    			return;
			    		}else{
							if (cvmutual.info.resume_type == '手机' || $(this).hasClass('wbd-vip-lock')) return;
							//如果是IE,提示用户更换浏览器打印或使用下载简历功能
				 	    	if (window.ActiveXObject || "ActiveXObject" in window){
				 	    		alert("暂不支持IE浏览器打印功能,请更换浏览器或使用简历下载功能")
				 	    		return;
							}
							var print_html = '<div class="printtips_img"></div>'+
											 '<p>1、在打印设置中将边距设置为 <span>“无”</span></p>'+
											 '<p>2、然后请勾选 <span>“背景图形”</span></p>';
							common.main.resume_confirm({
								title: "打印提示",
								content_html: print_html,
								modal_class:"resume_printtips_modal",
								ok: '知道了，去打印',
								onOk: function(){
									var version = new Date().getTime();
									// 打印时隐藏其他内容
									$(".case_guide_tool").hide();
									$("#resume_base .baseItem-toolbar").addClass("hidden");
						 	    	$("#resume_base .date_select").addClass("hidden");
									$("#resume_base .page_tips").addClass("hidden");
						 	    	$("#resume_base").print({
					 	    		    globalStyles:false,//是否包含父文档的样式，默认为true
					 	    		    stylesheet:[
					 	    				"/resources/500d/newcvresume/css/base_template.css?v=" + version,
					 	    				"/resources/500d/newcvresume/css/parts_css.css?v=" + version,
					 	    				"/resources/500d/newcvresume/css/export.css?v=" + version,
					 	    				"/resources/500d/font/fontFamily.css?v=" + version,
					 	    				css_path + '?v=' + version,
					 	    			]//外部样式表的URL地址，默认为null
									});
									$("#resume_base .baseItem-toolbar").removeClass("hidden");
						 	    	$("#resume_base .date_select").removeClass("hidden");
									$("#resume_base .page_tips").removeClass("hidden");
								}
							});
			    		}
	           	 	}
		    	});
			});
			//自动调整为1页功能
			$(document).on("click","#autoOnePage", function(){
				cvresume.main._500dtongji("PC-CV6.9.5-简历编辑页-编辑器-画布底部-底部-自动一页");
				var $this = $(this);
                var cannot_save = true;
                var resume_page_height = 1160;
                var resume_left = $('#resume_base').offset().left - 5;
                var line_height_arr = ["3","2.5","2","1.5","1"];
				var page_distance_arr = ["1.5","1","0.5"];
				var module_distance_arr = ["1.6","1.4","1.2","1","0.8","0.6","0.4","0.2","0"];
				var old_modal_margin = $('#resume_base').attr("data-modal_margin");
				var old_modal_pagemargin = $('#resume_base').attr("data-modal_pagemargin");
				// 延迟800毫秒 显示动画效果
                $this.find('.roundToggleBtn').removeClass('off');
                $('.autopage_masking').css('left', resume_left).fadeIn();
				setTimeout(function(){
					//文本输入框，删除内容为空的div
					$(".wbdCv-resume .resume_content").find("div,p,li").each(function(){
						if(common.main.is_empty($(this).text())){
							$(this).remove();
						}
					});
					//调整行高
					$.each(line_height_arr,function(index,value){
						$(".wbdCv-resume [style*=line-height]").each(function(){
							if (index === 0) {
								$(this).attr('data-old-line-height', $(this).css('line-height'));
							}
							$(this).css("line-height", value);
							var height = $(".wbdCv-resume").css({"height" : "auto"}).outerHeight();
							if(height <= resume_page_height){
								return cannot_save = false;
							}
						});
					});
					//调整模块距离
					if(cannot_save){
						$.each(module_distance_arr,function(index,value){
                            $("#resume_base").attr("data-modal_margin",value);
                            var height = $(".wbdCv-resume").css({"height" : "auto"}).outerHeight();
							if(height <= resume_page_height){
                                return cannot_save = false;
							}
						});
					}
					//调整页边距
					if(cannot_save){
						$.each(page_distance_arr,function(index,value){
							$("#resume_base").attr("data-modal_pagemargin",value);
							var height = $(".wbdCv-resume").css({"height" : "auto"}).outerHeight();
							if(height <= resume_page_height){
								return cannot_save = false;
							}
						});
					}
					// 是否能保存
					if(!cannot_save){
						cvresume.main.delay_resume_save();
					}else{
						layer.msg("您的简历内容太多了，小丁无法帮您生成");
						// 还原设置
						$("#resume_base").attr("data-modal_margin", old_modal_margin);
						$("#resume_base").attr("data-modal_pagemargin", old_modal_pagemargin);
						$(".wbdCv-resume [style*=line-height]").each(function() {
							$(this).css('line-height', $(this).attr('data-old-line-height'));
							$(this).attr('data-old-line-height', '');
						});
					}
					// 同步模块边距 页边距
					var modal_margin = $('#resume_base').attr("data-modal_margin");
                    var modal_pagemargin = $('#resume_base').attr("data-modal_pagemargin");
					// 模块边距
					if(modal_margin){
						$("#margin_amount").val(modal_margin);
						var math_modal_margin = (modal_margin - 0) / 0.2 * (1 / 8).toFixed(4);
						var modal_margin_left = math_modal_margin * 100 + "%";
						$("#margin_slider .ui-slider-handle").css("left",modal_margin_left);
					}else{
						$("#margin_amount").val("1");
					}
					// 页边距
					if(modal_pagemargin) {
						$('#page_margin li[data-value="'+  modal_pagemargin +'"]').addClass('checked').siblings().removeClass('checked');
						if ($('#page_margin li.checked').length === 0) {
							$('#page_margin li:eq(0)').addClass('checked');
						}
					} else {
						$('#page_margin li:eq(0)').addClass('checked').siblings().removeClass('checked');
					}
					cvresume.main.resume_page();
					// 调整结束 隐藏按钮  恢复状态
					$('.autopage_masking').fadeOut(100);
					$this.find('.roundToggleBtn').addClass('off');
				}, 800);
			});
			
			//获得焦点,保存原始操作内容
			$(document).on("mousedown","div[contenteditable='true']",function(e){
                cvresume.cur_opt_content=$(this).html();
			});
			//失去焦点就保存
			$(document).on("blur","div[contenteditable='true']",function(e){ 
				var html_content = $(this).html();
			    //焦点失去后，对去两者的内容是否有修改，如果有修改则保存
				if(cvresume.cur_opt_content == html_content){
					console.log("没有修改不用保存");
					return;
				}
				// 直接编辑姓名一句话同步到弹窗
				if ($(this).parents('#resume_name')) {
					$('#baseMsg-modal input[name="name"]').val($('#resume_name .name-con .name').text());
					$('#baseMsg-modal input[name="minSummary"]').val($('#resume_name .name-con .word').text());
				}
				cvresume.main.delay_resume_save();
			});
			// .save_opt
			$(document).on("click",".save_opt:not(.wbd-vip-lock)",function(){
				//简繁体切换标识
				var _id = $(this).attr("id");
				if(_id == "zh_cn"){
					cvresume.info.resume_fontType_change = 0;
				}else if(_id == "zh_tw"){
					cvresume.info.resume_fontType_change = 1;
				}else{
					cvresume.info.resume_fontType_change = -1;
				}
				cvresume.main.delay_resume_save();
			});
        	//判断简历类型
        	if($(".wbdCv-container").hasClass("mobile")){
        		cvresume.info.resume_type="手机";
        	}
        	//发布页切换简历类型点击事件
        	$("div.release_operation div.resume_type a").click(function(){
        		var _url = "/cvresume/" + cvresume.info.visitid + "/";
        		if(!$(this).hasClass("phone_resume")){
        			_url += "?device=wap";
        		}
        		location.href = _url;
			});
			// 免费会员点击出现升级页
			$(".vip_container .free").on('click', function(){
				common.main.vip_opt_tips();
			});
	    },
		init_:function(){//初始化
			common.main.iconfont_async_load();
	    	cvresume.main.event_();
	    },
	    save_notice:function(save_status) {
	    	if(save_status == undefined)
	    		save_status = false;
            $(window).unbind("beforeunload",cvresume.main.not_save_notice);
	    	if(!save_status){
                $(window).bind("beforeunload", cvresume.main.not_save_notice);
	    	}
	    },
	    not_save_notice:function(event) {
	    	return "你有修改内容没有保存，确定要离开吗？";
	    },
	    template_set:function(settings,resumeid,resumecontentid){//模板配置渲染
	    	if(settings){
	    		var _classStr="#resume_base .wbdCv-base";	
	    		$(cvresume.info.sortPosition).each(function(i,item){//遍历方位
	    			var pos_set = settings[item.toLocaleLowerCase()];
	    			$(pos_set.reverse()).each(function(j,jtem){//reverse()素组翻转
	    				if(cvresume.main.is_empty(resumeid) && cvresume.main.is_empty(resumecontentid)){
							//隐藏
		    				if(!jtem.isShow){
								$("#"+jtem.key).addClass("hidden");
		    				}
	    				}
	    				//移位
	    				$(_classStr+item).prepend($("#"+jtem.key));
						var _class=$("#"+jtem.key).attr("data-parts");
		    			if(_class!=null&&_class!=""){
		    				$("#"+jtem.key).removeClass(_class).addClass("template_css").attr("data-parts","");
		    			}
	    			});
	    		});
	    	}
		},
		resume_sort:function(sort){//简历初始排序(sort:排序配置)
	    	if(sort){
	    		var _classStr="#resume_base .wbdCv-base";	
	    		$(cvresume.info.sortPosition).each(function(i,item){//遍历方位
	    			var pos = sort[item.toLocaleLowerCase()];
	    			$(pos.reverse()).each(function(j,jtem){//遍历各方位的id，reverse()素组翻转
	    				$(_classStr+item).prepend($("#"+jtem));//在所在方位的div开头添加节点
	    			});
	    		});
	    	}
	    },
	    resume_save_recoment:function(item){//推荐信保存
	    	if(item.length<=0){
	    		layer.msg("推荐信保存出错，请刷新重试~");
	    		return;
	    	}
    		var recoment={};
    		var $e=item;
    		recoment["id"]=$e.attr("data-id");
    		recoment["name"]=$e.find(".name").find("div[contenteditable]").html();
    		recoment["mobile"]=$e.find(".contact_mobile").html();
    		recoment["content"]=$e.find(".resume_content").html();
	    	$.ajax({
	    		 type: "POST",
	             url: "/recommend/update/",
	             data:recoment,
	           	 success:function(message){
	           		 if(message.type!="success"){
	           			 layer.msg(message.content);
	           		 }
	           	 }
	    	});
	    },
	    resume_draw:function(itemid,resumeid,memberid,visitid,version){
			cvresume.info.itemid = itemid;
			cvresume.info.resumeid = resumeid;
			cvresume.info.memberid = memberid;
			cvresume.info.visitid = visitid;
			cvresume.info.version = version;
	    },
	    set_language:function(language){
	    	cvresume.info.language = language;
	    },
	    delay_resume_save:function(s){
	    	try{
		    	if(cvresume.main.is_empty(s)){
		    		s=2000;
				}
				clearTimeout(cvresume.info.timeout_resume_save);
		    	cvresume.info.timeout_resume_save = setTimeout(function(){
		    		cvresume.main.resume_save();
		    	},s);
	    	}catch(e){
		    	console.error(e);
		    	common.main.resume_confirm({
					title:"提示",
					content:"保存简历数据异常～请联系客服人员"
				});
		    }
	    },
	    //isAsync:是否异步（默认true）
	    resume_save:function(isRelease, isAsync){//简历保存
	    	try{
		    	if(isAsync==undefined){
		    		isAsync=true;
		    	}
		    	var resume=cvresume.main.get_resume();
		    	var title = decodeURI(common.main.getUrlParamsValue("title"));
				if(!cvresume.main.is_empty(title) && title != "null"){
					resume["resume_title"]=title;
		    	}
		    	return cvresume.main.base_resume_save(isRelease, resume, isAsync);
	    	}catch(e){
		    	console.error(e);
		    	common.main.resume_confirm({
					title:"提示",
					content:"保存简历数据异常～请联系客服人员"
				});
		    }
	    },
	    //isAsync:是否异步（默认true）
	    base_resume_save:function(isRelease, resume, isAsync){//isRelease 控制history保存
	    	try{
		    	if(isAsync==undefined){
		    		isAsync=true;
		    	}
		    	if(isAsync && cvresume.resume_save_trigger){//异步并且可以保存
		    		cvresume.resume_save_trigger=false;
		    	}else if(isAsync && !cvresume.resume_save_trigger){//异步并且可以不可以保存
		    		console.log("简历数据正在保存...");
		    		return;
		    	}
	            cvresume.main.resume_save_state('not');
	            cvresume.main.save_notice(false);
		    	cvmutual.main.caclulate_resume_scale(resume);//计算简历进度
		    	var resumeSaveflag = cvresume.main.validate_resume(resume);//校验简历内容
		    	if(!resumeSaveflag){
		    		cvresume.resume_save_trigger = true;
		    		return false;
		    	}
				var _resumeJson = JSON.stringify(resume);
				//简繁体切换标识
		    	if(cvresume.info.resume_fontType_change == 0){
		    		_resumeJson = resumeJson=$.t2s(_resumeJson);
		    	}else if(cvresume.info.resume_fontType_change == 1){
					_resumeJson = resumeJson=$.s2t(_resumeJson);
		    	}
		    	cvresume.info.resume_fontType_change = -1;
		    	$.ajax({
		    		type : 'post',
		    		cache: false,
		    		async : isAsync,
		    		url : '/newcvresume/save/',
		    		data : {
		    			'resumeContentId' : cvresume.info.resumecontentid,
		    			'memberid' : cvresume.info.memberid,
		    			'itemid' : cvresume.info.itemid,
		    			'resumeid' : cvresume.info.resumeid,
		    			'json' : _resumeJson
		    		},
		    		beforeSend:function(){
		    			cvresume.main.resume_save_state('in');
		    		},
		    		success : function(message) {
		    			if(message.type === 'success'){//保存成功
		    				cvresume.main.save_notice(true);
		    				resumeSaveflag = true;
		    				var content = JSON.parse(message.content);
		    				if(!cvresume.info.resumeid){//首次保存
		    					//浏览器url更新
		    					var url = wbdcnf.base + '/newcvresume/edit/?itemid=' + content.itemid + '&resumeId=' + content.resumeid;
		    					history.pushState(null, "简历首次保存" ,url);
		    					//内容模板
		    					if(cvresume.info.resumecontentid != 0 && !cvresume.main.is_empty(cvresume.info.resumecontentid)){
		    						$.post("/cvresume/resume_content/post_use_num/",{"rcid":cvresume.info.resumecontentid},function(){});
		    					}
		    				}else{
		    					cvresume.main._500dtongji("PC-简历-修改简历");
		    				}
		    				cvresume.main.resume_draw(content.itemid,content.resumeid,content.memberid,content.visitid,content.version);
		    				setTimeout(function(){
			    	    		cvresume.main.resume_save_state('success');
			    	    	},1000);
			    	    	cvresume.main.gernateResumeWapQrCodeImage(cvresume.info.resumeid);
		    			}else{//保存失败
		    				cvresume.main.save_notice(false);
		    				cvresume.main.resume_save_state('error');
		    				if(message.content.indexOf('未登陆') !== -1){
		    					clearTimeout(cvresume.info.loginMsg);
		    					cvresume.info.loginMsg = setTimeout(function(){
		    						layer.msg(message.content);
				    	    	 },1000 * 60);
		    				}else if(message.content.indexOf('已超过最大简历创建数量') !== -1 && cvresume.save_trigger){
	    						cvresume.save_trigger = false;
	    						common.main.resume_confirm({
									title:"简历超限提示",
									modal_class:"vip-content",
									content:"简历数量超出账号权限，请删除部分简历或升级会员后继续",
									ok:"确定",
									showCancel: false
								});
		    				}else if(message.content.indexOf("当前简历数据非最新") !== -1){
		    					common.main.resume_confirm({
									title:"提示",
									content:message.content,
									onOk:function(){
										location.reload(true);
									},
								});
		    				}else if(message.content.indexOf('未知异常') !== -1){
		    					common.main.resume_confirm({
									title:"提示",
									content:"保存简历数据异常～请联系客服人员"
								});
		    				}else{
		    					layer.msg(message.content,{time : 4 * 1000});
		    				}
		    			}
		    			cvresume.resume_save_trigger = true;
		    		},
		    		error:function(){
		    			cvresume.main.resume_save_state('error');
		    			cvresume.resume_save_trigger = true;
		    		}
		    	});
		    	return resumeSaveflag;
	    	}catch(e){
		    	console.error(e);
		    	common.main.resume_confirm({
					title:"提示",
					content:"保存简历数据异常～请联系客服人员"
				});
		    }
		},
		resume_save_state: function(state){
            var $live = $(".liveupdate");
            var $text = $live.find('span');
            $live.removeClass('success error in not').addClass(String(state));
			switch (String(state)) {
				case 'success':
                    $text.text(common.main.date_format(new Date(),"HH:mm")+" 保存成功");
					break;
				case 'error':
					$text.text(common.main.date_format(new Date(),"HH:mm")+" 保存失败");
					break;
				case 'in':
					$text.text("正在保存...");
					break;
                case 'not':
                    $text.text("文档未保存");
                    break;
			}
		},
		//获取简历数据
	    get_resume:function(){//获取保存数据
	    	var resume = {};
	    	//获取简历一般属性数据
	    	resume = cvresume.main.get_resume_title(resume);
	    	resume = cvresume.main.get_resume_scale(resume);
	    	//获取简历属性数据
	    	resume = cvresume.main.get_resume_attr(resume);
	    	//获取简历模块数据
	    	resume = cvresume.main.get_resume_modules(resume);
	    	return resume;
	    },
    	//获取简历标题
    	get_resume_title:function(resume){
    		var title = $('#resumeName_value').val();
    		resume['title'] = !cvresume.main.is_empty(title) ? title : null;
	    	return resume;
    	},
    	//获取简历修改比例
    	get_resume_scale:function(resume){
    		var scale = $('.diagnose_defalut .diagnose_score').attr("data-value");
    		resume["scale"] = !cvresume.main.is_empty(scale) ? scale : null;
	    	return resume
    	},
    	//获取简历属性
    	get_resume_attr:function(resume){
    		var attr = {};
    		attr = cvresume.main.get_resume_attr_language(attr);
	    	attr = cvresume.main.get_resume_attr_background(attr);
	    	attr = cvresume.main.get_resume_attr_color(attr);
	    	attr = cvresume.main.get_resume_attr_font(attr);
	    	attr = cvresume.main.get_resume_attr_fontSize(attr);
	    	attr = cvresume.main.get_resume_attr_pageMargin(attr);
	    	attr = cvresume.main.get_resume_attr_margin(attr);
	    	attr = cvresume.main.get_resume_attr_fontType(attr);
	    	attr = cvresume.main.get_resume_attr_isPagingHidden(attr);
	    	attr = cvresume.main.get_resume_attr_modulesSort(attr);
	    	attr = cvresume.main.get_resume_attr_version(attr);
	    	resume['attr'] = attr;
	    	return resume;
    	},
    	//获取简历属性语言
    	get_resume_attr_language:function(attr){
    		var language = cvresume.info.language;
    		attr['language'] = !cvresume.main.is_empty(language) ? language : null;
	    	return attr;
    	},
    	//获取简历背景
		get_resume_attr_background:function(attr){
			var $module = $('#resume_base #resume_background');
			var img = $module.find(".background-con img").attr('src');
			var originImg = $module.find(".background-con img").attr('data-src');
			attr['background'] = JSON.stringify({
				img : !cvresume.main.is_empty(img) ? img : null,
				originImg : !cvresume.main.is_empty(originImg) ? originImg : null
			});
			return attr;
		},
    	//获取简历颜色
    	get_resume_attr_color:function(attr){
    		var color = $('#resume_base').attr('data_color');
    		attr['color'] = !cvresume.main.is_empty(color) ? color : null;
	    	return attr;
    	},
    	//获取简历字体
    	get_resume_attr_font:function(attr){
    		var font = $('#resume_base').attr('data_font_name');
    		attr['font'] = !cvresume.main.is_empty(font) ? font : null;
	    	return attr;
    	},
    	//获取简历字号
    	get_resume_attr_fontSize:function(attr){
    		var fontSize = $('#resume_base').attr('data_font_size');
    		attr['fontSize'] = !cvresume.main.is_empty(fontSize) ? fontSize : null;
	    	return attr;
    	},
    	//获取简历页间距
    	get_resume_attr_pageMargin:function(attr){
    		var pageMargin = $('#resume_base').attr('data-modal_pageMargin');
    		attr['pageMargin'] = !cvresume.main.is_empty(pageMargin) ? pageMargin : null;
	    	return attr;
    	},
    	//获取简历模块间距
    	get_resume_attr_margin:function(attr){
    		var margin = $('#resume_base').attr('data-modal_margin');
    		attr['margin'] = !cvresume.main.is_empty(margin) ? margin : null;
	    	return attr;
    	},
    	//获取简历字体类型
    	get_resume_attr_fontType:function(attr){
	    	var fontType = $('#resume_base').attr("data_font_type");
	    	attr['fontType'] = !cvresume.main.is_empty(fontType) ? fontType : null;
	    	return attr;
    	},
    	//获取简历是否隐藏分页
    	get_resume_attr_isPagingHidden:function(attr){
    		var isPagingHidden = $('#resume_base').attr('data_hidden_paging');
			attr['isPagingHidden'] = !cvresume.main.is_empty(isPagingHidden) ? isPagingHidden : false;
    		return attr;
    	},
    	//获取简历模块排序
    	get_resume_attr_modulesSort:function(attr){
    		var sort = {};
	    	$(cvresume.info.sortPosition).each(function(index,item){
	    		var arr=[];
	    		$('#resume_base .wbdCv-base' + item + ' .resume_sort').each(function(j,jtem){
	    			arr.push($(jtem).attr('id'));
	    		});
	    		sort[item.toLocaleLowerCase()] = arr;
	    	});
	    	attr["modulesSort"] = JSON.stringify(sort);
    		return attr;
    	},
    	//获取简历版本
    	get_resume_attr_version:function(attr){
    		if(!cvresume.main.is_empty(cvresume.info.version)){
	    		attr['version'] = cvresume.info.version;
	    	}
	    	return attr;
    	},
    	//获取简历模块
    	get_resume_modules:function(resume){
    		var modules = {};
    		modules = cvresume.main.get_resume_module_cover(modules);//封面
    		modules = cvresume.main.get_resume_module_letter(modules);//自荐信
    		modules = cvresume.main.get_resume_module_head(modules);//头像
    		modules = cvresume.main.get_resume_module_base_info(modules);//基本信息
    		modules = cvresume.main.get_resume_module_name(modules);//姓名、一句话
    		modules = cvresume.main.get_resume_module_job_preference(modules);//求职意向
    		modules = cvresume.main.get_resume_module_time(modules, 'resume_edu');//教育背景
    		modules = cvresume.main.get_resume_module_time(modules, 'resume_work');//工作经验
    		modules = cvresume.main.get_resume_module_time(modules, 'resume_internship');//校园活动
    		modules = cvresume.main.get_resume_module_time(modules, 'resume_volunteer');//志愿者经验
    		modules = cvresume.main.get_resume_module_time(modules, 'resume_project');//项目经验
    		modules = cvresume.main.get_resume_module_desc(modules, 'resume_summary');//自我评价
    		modules = cvresume.main.get_resume_module_desc(modules, 'resume_honor');//奖项荣誉
			modules = cvresume.main.get_resume_module_skill(modules);//技能特长
			modules = cvresume.main.get_resume_module_hobby(modules);//个人标签（已下架，旧数据保留）
    		modules = cvresume.main.get_resume_module_language(modules);//语言能力
    		modules = cvresume.main.get_resume_module_portfolio(modules);//作品展示
    		modules = cvresume.main.get_resume_module_qrcode(modules);//二维码
    		modules = cvresume.main.get_resume_module_custom(modules);//自定义模块
    		modules = cvresume.main.get_resume_module_school_element(modules);//校招元素
    		$.each(modules,function(key,value){//模块内容为对象序列化成json字符串
    			if(value.content !== null && typeof(value.content) !== 'string'){
    				value.content = JSON.stringify(value.content);
    			}
    		});
    		resume['modules'] = modules;
    		return resume;
    	},
    	//获取简历模块-封面
    	get_resume_module_cover:function(modules){
    		var key = 'resume_cover';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = [];
    		//数据抽取
    		var $resume_cover = $('#resume_base #' + key);
    		mg['isShow'] = !$resume_cover.hasClass("hidden");
	    	$resume_cover.find('.moduleItemList').each(function(index,item){
	    		var $item = $(item);
	    		var item_icon = $item.find(".divIconFont").html();
	    		var item_content = $item.find('div[contenteditable="true"]').html();
	    		if(!cvresume.main.is_empty(item_content)){
	    			if(cvresume.main.is_empty(item_icon)){
		    			item_icon = null;
		    		}
	    			content.push({
		    			icon : item_icon,
		    			content : item_content
		    		});
	    		}
	    	});
	    	modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-自荐信
    	get_resume_module_letter:function(modules){
    		var key = 'resume_letter';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = null;
    		//数据抽取
    		var $resume_letter = $('#resume_base #' + key);
    		var resume_letter_isShow = !$resume_letter.hasClass("hidden");
    		var resume_letter_content = $resume_letter.find('div[contenteditable="true"]').html();
    		if(!cvresume.main.is_empty(resume_letter_isShow)){
    			mg['isShow'] = resume_letter_isShow;
    		}
    		if(!cvresume.main.is_empty(resume_letter_content)){
    			content = resume_letter_content;
    		}
	    	modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-头像
		get_resume_module_head:function(modules){
			var key = 'resume_head';
			var title = cvresume.main.get_resume_module_title(key);
			var mg = cvresume.main.get_resume_module_mg(key);
			var content = {};
			//数据抽取
			var $resume_head = $("#resume_base #" + key);
			var resume_head_isShow = !$resume_head.hasClass("hidden");
			var resume_head_img = $resume_head.find('.img-preview image').attr("xlink:href");
			var resume_head_originImg = $resume_head.find('.img-preview image').attr("data-src");
			var resume_head_style = $resume_head.attr("data-style");
			if(!cvresume.main.is_empty(resume_head_isShow)){
				mg['isShow'] = resume_head_isShow;
			}
			content['img'] = !cvresume.main.is_empty(resume_head_img) ? resume_head_img : null;
			content['originImg'] = !cvresume.main.is_empty(resume_head_originImg) ? resume_head_originImg : null;
			content['style'] = !cvresume.main.is_empty(resume_head_style) ? resume_head_style : null;
			modules[key] = {
				key : key,
				title : title,
				mg : mg,
				content : content
			};
			return modules;
		},
    	//获取简历模块-基本信息
    	get_resume_module_base_info:function(modules){
    		var key = 'base_info';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = {};
    		//数据抽取
    		var $resume_base_info = $("#resume_base #" + key);
    		var $baseMsg = $("#baseMsg-modal");
    		var brith = $baseMsg.find('input[name="birth"]').val();
    		var age = $resume_base_info.find('.info-age span').text();
    		var jobYear = $baseMsg.find('input[name="jobYear"]').val();
    		var mobile = $baseMsg.find('input[name="mobile"]').val();
    		var email = $baseMsg.find('input[name="email"]').val();
    		var custom = [];
	    	$baseMsg.find('.defindItem [data-panel="defind"]').each(function(index,item){
	    		var $item = $(item);
	    		var item_key = $item.attr("data-value");
	    		var item_name = $item.find(".defindName").val();
	    		var item_desc = $item.find(".defindContent").val();
	    		if(!cvresume.main.is_empty(item_key) && !cvresume.main.is_empty(item_name) && !cvresume.main.is_empty(item_desc)){
		    		var item_icon = cvresume.main.get_resume_module_icon(item_key);
		    		custom.push({
		    			key : item_key,
		    			name : item_name,
		    			desc : item_desc,
		    			icon : item_icon
		    		});
	    		}
	    	});
    		var sex = $baseMsg.find('input[name="sex"]:checked').val()
    		var education = $baseMsg.find('input[name="education"]').val();
    		var nation = $baseMsg.find('input[name="nation"]').val();
    		var city = $baseMsg.find('input[name="city"]').val();
    		var cityName = $baseMsg.find('input[name="city"]').attr("data-name");
    		var marriageStatus = $baseMsg.find('input[name="marriageStatus"]').val();
    		var politicalStatus = $baseMsg.find('input[name="politicalStatus"]').val();
    		var height = $baseMsg.find('input[name="height"]').val();
    		var weight = $baseMsg.find('input[name="weight"]').val();
    		content['birth'] = !cvresume.main.is_empty(brith) ? brith : null;
    		content['age'] = !cvresume.main.is_empty(age) ? age : null;
    		content['jobYear'] = !cvresume.main.is_empty(jobYear) ? jobYear : null;
    		content['mobile'] = !cvresume.main.is_empty(mobile) ? mobile : null;
    		content['email'] = !cvresume.main.is_empty(email) ? email : null;
    		content['custom'] = !cvresume.main.is_empty(custom) ? custom : null;
    		content['sex'] = !cvresume.main.is_empty(sex) ? sex : null;
    		content['education'] = !cvresume.main.is_empty(education) ? education : null;
    		content['nation'] = !cvresume.main.is_empty(nation) ? nation : null;
    		content['city'] = !cvresume.main.is_empty(city) ? city : null;
    		content['cityName'] = !cvresume.main.is_empty(cityName) ? cityName : null;
    		content['marriageStatus'] = !cvresume.main.is_empty(marriageStatus) ? marriageStatus : null;
    		content['politicalStatus'] = !cvresume.main.is_empty(politicalStatus) ? politicalStatus : null;
    		content['height'] = !cvresume.main.is_empty(height) ? height : null;
    		content['weight'] = !cvresume.main.is_empty(weight) ? weight : null;
    		//图标
    		$.each(['birth', 'jobYear', 'mobile', 'email', 'sex', 'education', 'nation', 'city', 'marriageStatus', 'politicalStatus', 'height', 'weight'],function(i,item){
    			content[item + "Icon"] = cvresume.main.get_resume_module_icon(item);
    		});
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-姓名
    	get_resume_module_name:function(modules){
    		var key = 'resume_name';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = {};
    		//数据抽取
    		var $baseMsg = $("#baseMsg-modal");
    		var name = $baseMsg.find('input[name="name"]').val();
			var minSummary = $baseMsg.find('input[name="minSummary"]').val();
			var isMinSummaryShow = $baseMsg.find('.roundToggleBtn[data-panel="minSummaryShow"]').hasClass('off');
			content['name'] = !cvresume.main.is_empty(name) ? name : null;
    		content['minSummary'] = !cvresume.main.is_empty(minSummary) ? minSummary : null;
    		content['isMinSummaryShow'] = isMinSummaryShow;
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-求职意向
    	get_resume_module_job_preference:function(modules){
    		var key = 'resume_job_preference';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = {};
    		//数据抽取
    		var $jobIntension = $("#jobIntension-modal");
    		var jobFunction = $jobIntension.find('input[name="jobFunction"]').val();
    		var jobCity = $jobIntension.find('input[name="jobCity"]').val();
    		var jobCityName = $jobIntension.find('input[name="jobCity"]').attr("data-name");
    		var jobTime = $jobIntension.find('input[name="jobTime"]').val();
    		var jobSalarySystem = $jobIntension.find("input[name=jobSalarySystem]").val();
    		var jobMinSalary = $jobIntension.find('input[name="jobMinSalary"]').val();
    		var jobMaxSalary = $jobIntension.find('input[name="jobMaxSalary"]').val();
    		var negotiable = $jobIntension.find('input[name="negotiable"]').prop("checked");
    		content['jobFunction'] = !cvresume.main.is_empty(jobFunction) ? jobFunction : null;
    		content['jobCity'] = !cvresume.main.is_empty(jobCity) ? jobCity : null;
    		content['jobCityName'] = !cvresume.main.is_empty(jobCityName) ? jobCityName : null;
    		content['jobTime'] = !cvresume.main.is_empty(jobTime) ? jobTime : null;
    		content['jobSalarySystem'] = !cvresume.main.is_empty(jobSalarySystem) ? jobSalarySystem : null;
    		content['jobMinSalary'] = !cvresume.main.is_empty(jobMinSalary) ? Number(jobMinSalary) : null;
    		content['jobMaxSalary'] = !cvresume.main.is_empty(jobMaxSalary) ? Number(jobMaxSalary) : null;
    		if(negotiable){
    			content['jobMinSalary'] = 0;
    			content['jobMaxSalary'] = 0;
    		}
    		//图标
    		$.each(['jobFunction', 'jobCity', 'jobTime', 'jobType', 'jobSalary'],function(i,item){
    			content[item + "Icon"] = cvresume.main.get_resume_module_icon(item);
    		});
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-时间模块（教育背景、工作经验、校园活动、项目经验）
		get_resume_module_time:function(modules, id){
			var key = id;
			var title = cvresume.main.get_resume_module_title(key);
			var mg = cvresume.main.get_resume_module_mg(key);
			var content = [];
			var tags = cvresume.main.get_resume_module_tags(key);
			//数据抽取
			$("#resume_base #" + key).find('.moduleItemList').each(function(index,item){
				var $item = $(item);
				var item_logo = $item.find(".dd-logo img").attr('src');
				var item_originLogo = $item.find(".dd-logo img").attr('data-src');
				var item_logoStyle = $item.find(".dd-logo").attr('data-style');
				var item_beginTime = $item.find("i.time-start").text();
				var item_endTime = $item.find("i.time-end").text();
				var item_unit = $item.find(".company").find("div[contenteditable]").html();
				var item_job = $item.find(".post").find("div[contenteditable]").html();
				var item_content = $item.find(".resume_content").html();
				var itemData = {
					logo : null,
					logoStyle : null,
					originLogo : null,
					beginTime : null,
					endTime : null,
					unit : null,
					job : null,
					content : null,
					tags : null,
				};
				var flag = false;
				if(!cvresume.main.is_empty(item_originLogo)){
					itemData['logo'] = item_logo;
					itemData['logoStyle'] = item_logoStyle;
					itemData['originLogo'] = item_originLogo;
					flag = true;
				}
				if(!cvresume.main.timeModuleIsEmpty(item_beginTime)){
					itemData['beginTime'] = item_beginTime;
					flag = true;
				}
				if(!cvresume.main.timeModuleIsEmpty(item_endTime)){
					itemData['endTime'] = item_endTime;
					flag = true;
				}
				if(!cvresume.main.is_empty(item_unit)){
					itemData['unit'] = item_unit;
					flag = true;
				}
				if(!cvresume.main.is_empty(item_job)){
					itemData['job'] = item_job;
					flag = true;
				}
				if(!cvresume.main.is_empty(item_content)){
					itemData['content'] = item_content;
					flag = true;
				}
				if(!cvresume.main.is_empty(tags) && !cvresume.main.is_empty(tags[index])){
					itemData['tags'] = tags[index];
					flag = true;
				}
				if(flag){
					content.push(itemData);
				}
			});
			modules[key] = {
				key : key,
				title : title,
				mg : mg,
				content : content
			};
			return modules;
		},
    	//获取简历模块-描述模块(自我评价、奖项荣誉)
		get_resume_module_desc:function(modules, id){
			var key = id;
			var title = cvresume.main.get_resume_module_title(key);
			var mg = cvresume.main.get_resume_module_mg(key);
			var content = [];
			var tags = cvresume.main.get_resume_module_tags(key);
			$('#resume_base #' + id).find('.moduleItemList').each(function(index,item){
				var $item = $(item);
				var item_logo = $item.find('.dd-logo img').attr('src');
				var item_originLogo = $item.find('.dd-logo img').attr('data-src');
				var item_logoStyle = $item.find('.dd-logo').attr('data-style');
				var item_content = $item.find('div.resume_content').html();
				var itemData = {
					logo : null,
					originLogo : null,
					logoStyle : null,
					content : null,
					tags : null
				};
				var flag = false;
				if(!cvresume.main.is_empty(item_originLogo)){
					itemData['logo'] = item_logo;
					itemData['logoStyle'] = item_logoStyle;
					itemData['originLogo'] = item_originLogo;
					flag = true;
				}
				if(!cvresume.main.is_empty(item_content)){
					itemData['content'] = item_content;
					flag = true;
				}
				if(!cvresume.main.is_empty(tags) && !cvresume.main.is_empty(tags[index])){
					itemData['tags'] = tags[index];
					flag = true;
				}
				if(flag){
					content.push(itemData);
				}
			});
			modules[key] = {
				key : key,
				title : title,
				mg : mg,
				content : content,
			};
			return modules;
		},
    	//获取奖励模块-技能特长
    	get_resume_module_skill:function(modules){
    		var key = 'resume_skill';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = [];
    		//数据抽取
    		var $resume_skill = $('#resume_base #' + key);
    		$resume_skill.find('.moduleItemList').each(function(i,item){
    			var $item = $(item);
    			content.push({
    				name : $item.find(".item_title").html(),
    				masterLevel : $item.find('.item_level').attr("data_level"),
    				masterLevelDesc : $item.find('.item_level').attr("data_level_desc"),
    			});
            });
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-语言能力
    	get_resume_module_language:function(modules){
    		var key = 'resume_language';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = [];
    		var $resume_language = $('#resume_base #' + key);
    		$resume_language.find('.moduleItemList').each(function(i,item){
    			content.push({
    				name : $(item).find(".item_title").html(),
    				masterLevel : $(item).find('.item_level').attr('data_level'),
    				masterLevelDesc : $(item).find('.item_level').attr('data_level_desc')
    			});
    		});
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
		},
		// 获取简历模块-个人标签/兴趣爱好
		get_resume_module_hobby: function (modules) {
    		var key = 'resume_hobby';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
			var content = [];
    		var $resume_hobby = $('#resume_base #' + key);
			$resume_hobby.find('.moduleItemList').each(function(i,item){
				var $item = $(item);
				var _key = $item.find('.divIconFont').attr('for-key');
    			content.push({
					key: _key,
					icon: cvresume.main.get_resume_module_icon(_key),
					name: $item.find('.item_title').text(),
    			});
            });
			modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
		},
    	//获取简历模块-作品展示
    	get_resume_module_portfolio:function(modules){
    		var key = 'resume_portfolio';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = {};
    		//数据抽取
    		var $resume_portfolio = $('#resume_base #' + key);
    		var img = [];
    		var link = [];
    		$resume_portfolio.find('.moduleItemList').each(function(index, item){
				var $item = $(item);
                var itemData = {};
                itemData['title'] = $item.find('.work-title').text().length ? $item.find('.work-title').html() : null;
				itemData['desc'] = $item.find('.work-text').text().length ? $item.find('.work-text').html() : null;
				if($item.find('.work-img').length > 0){
					itemData['img'] = $item.find('.work-img').find('img').attr('src');
					itemData['originImg'] = $item.find('.work-img').find('img').attr('data-src');
					itemData['tags'] = [];
					$item.find('.work-tags > span').each(function (tag_index, tag_item) {
						itemData['tags'].push($(tag_item).text());
					});
	    		  	img.push(itemData);
	    		} else {
				  	link.push(itemData);
                }
	    	});
	    	content['img'] = img;
	    	content['link'] = link;
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-二维码
    	get_resume_module_qrcode:function(modules){
    		var key = 'resume_qrcode';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = {};
    		//数据抽取
    		var $resume_qrcode = $('#resume_base #' + key);
    		var point = $resume_qrcode.attr('data-point');
    		var width = $resume_qrcode.attr('data-width');
            var height = $resume_qrcode.attr('data-height');
            var img = $resume_qrcode.find("img").attr('src');
    		var tips = $resume_qrcode.find(".resume_content").html();
    		content['point'] = !cvresume.main.is_empty(point) ? point : null;
    		content['width'] = !cvresume.main.is_empty(width) ? width : null;
            content['height'] = !cvresume.main.is_empty(height) ? height : null;
            content['img'] = !cvresume.main.is_empty(img) && img.indexOf('ad_Attention_weixin_ewm.png') === -1 ? img : null;
    		content['tips'] = !cvresume.main.is_empty(tips) ? tips : null;
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//获取简历模块-自定义
    	get_resume_module_custom:function(modules){
    		$("#resume_base .customItem").each(function(index,item){
    			var $item = $(item);
    			var key = $item.attr('id');
	    		if($item.hasClass('timeItem')){//时间模块
	    			modules = cvresume.main.get_resume_module_time(modules, key);
	    		}
    		});
    		return modules;
    	},
    	//获取简历模块-校招元素
    	get_resume_module_school_element:function(modules){
    		var key = 'resume_school_element';
    		var title = cvresume.main.get_resume_module_title(key);
    		var mg = cvresume.main.get_resume_module_mg(key);
    		var content = [];
    		//数据抽取
    		var $resume_school_element = $('#resume_base #' + key);
			$resume_school_element.find(".resume_content").each(function(index,item){
				var $item = $(item);
				var itemData = $item.text();
				content.push(!cvresume.main.is_empty(itemData) ? itemData : '');
			});
    		modules[key] = {
	    		key : key,
	    		title : title,
	    		mg : mg,
	    		content : content
	    	};
	    	return modules;
    	},
    	//通用方法-获取简历模块标题
    	get_resume_module_title:function(id){
    		var $module = $('#resume_base #' + id);
    		var title = $module.find(".module_item_title").html();
    		return !cvresume.main.is_empty(title) ? title : null;
    	},
    	//通用方法-获取简历模块管理
    	get_resume_module_mg:function(id){
    		var mg = {
    			isShow : true,//是否显示
    			isTitleShow : true,//是否标题显示
    			isTimeShow : true,//是否时间显示
    			isContentShow : true,//是否内容显示
    			isLogoShow : true,//是否logo显示
    			icon : null,//图标
    			style : null,//样式
    			format : null,//版式
    			margin : null//间距
    		};
    		var $module = $('#resume_base #' + id);
    		mg['isShow'] = !$module.hasClass("hidden") || !$module.is(':hidden');
			mg['isTitleShow'] = !$module.find('dl dt').hasClass("hidden") || !$module.find('dl dt').is(':hidden');
			mg['isLogoShow'] = !$module.find('.dd-logo').hasClass('hidden') || !$module.find('.dd-logo').is(':hidden');
    		mg['isTimeShow'] = !$module.find('.dd-title').hasClass("hidden") || !$module.find('.dd-title').is(':hidden');
			mg['isContentShow'] = !$module.find('.dd-text').hasClass("hidden") || !$module.find('.dd-text').is(':hidden');
    		mg['icon'] = cvresume.main.get_resume_module_icon(id);
    		var style = $module.attr("data-parts");
    		if(!cvresume.main.is_empty(style)){
    			mg['style'] = style;
            }
            var format = $module.attr("data-format");
            if (!cvresume.main.is_empty(format)) {
                mg['format'] = format;
            }
            var margin = $module.attr("data-margin");
            if (!cvresume.main.is_empty(margin)) {
                mg['margin'] = margin;
            }
    		return mg; 
    	},
    	//通用方法-获取简历图标
    	get_resume_module_icon:function(key){
    		var $icon = $("#resume_base").find("a.divIconFont[for-key='" + key + "']");
    		var icon = null;
    		if($icon.children('svg').length > 0){
    			icon = $icon.find('use').attr('xlink:href');
    		}else{
    			icon = $icon.html();
    		}
    		return !cvresume.main.is_empty(icon) ? icon : null;
    	},
    	//通用方法-获取简历标签
    	get_resume_module_tags:function(key){
    		var tags = null;
    		var $module = $('#resume_base #' + key);
    		if($module.length === 0){
    			return tags;
    		}
    		tags = [];
    		$module.find('.moduleItemList').each(function(index, item){
    			var itemData = [];
				$(item).find('span.moduleTags').each(function(tag_index, tag_item){
					if ($(tag_item).text().replace(/\s+/g, '') !== '') {
						itemData.push($(tag_item).text());
					}
				});
				tags.push(itemData);
			});
    		return tags;
    	},
    	//校验简历
		validate_resume:function(resume){
			var msg = '简历保存失败，';
			//封装格式校验
			if(!resume || !resume['attr'] || !resume['modules']){
				layer.msg(msg + '数据格式异常');
				return false;
			}
			//头像链接校验（无域名图片导出异常）
			// var resume_head = JSON.parse(resume['modules']['resume_head'].content);
			// if(!/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(resume_head.img)){
			// 	layer.msg(msg + '头像链接异常');
			// 	return false;
			// }
			//emojy表情拦截
			/*if(common.main.contain_emoji(JSON.stringify(resume))){
				layer.msg(msg + '暂不支持emoji表情，请清除后进行保存');
				return false;
			}*/
			return true;
		},
	    set_copyToClipBoard:function (str) {
	        //复制到剪贴板
	    	 var copyInput = $("<input type='text' value='"+ str +"' style='opacity:1;position:absolute;top:20px;z-index:999;' id='copyText'>");
	         $(".in").length >0 ? dom = $(".in")[0] : dom = "body"
	         copyInput.appendTo(dom);
	         document.getElementById("copyText").select();
	         document.execCommand("copy",false,null)
	         $("#copyText").remove();
	    },
	    set_cvresume_info:function(itemid,resumeid,memberid){//简历id,模板ID，会员id设置
	    	if(!cvresume.main.is_empty(itemid)){
	    		cvresume.main.info.itemid=itemid;
	    	}
	    	if(!cvresume.main.is_empty(resumeid)){
	    		cvresume.main.info.resumeid=resumeid;
	    	}
	    	if(!cvresume.main.is_empty(memberid)){
	    		cvresume.main.info.memberid=memberid;
	    	}
	    },
	    get_resume_history:function(){//获取简历历史记录
	    	return;
	    },	    
	    resume_save_history:function(){//保存简历历史记录
	    	return;
		},
		// 简历分页
		resume_page:function(){
            // 手机简历拦截
            if ($(".wbdCv-container").hasClass("mobile")) {
                return;
            }
            setTimeout(function () {
                var $autoOnePage = $('#autoOnePage');
                var $resume = $('.wbdCv-resume');
                var resumePageHtml = '<div class="page_tips"><div class="tips_modal"><p>分页提示</p><s class="modal_content">此处为分页栏，如有内容被遮盖请在上方文本框内<i>按回车键跳过</i></s></div><span></span></div>';
                var resumeHeight = $(".wbdCv-resume").css({ "height": "auto", "min-height": 1160 }).outerHeight();
                $autoOnePage.addClass('hidden');
                // 隐藏分页  同时简历高度自适应内容  隐藏自动一页功能
                if ($('#resume_base').attr('data_hidden_paging') === 'true') {
                    $("div.page_tips").remove();
                    $resume.css('height', resumeHeight + 'px');
                    $resume.append(resumePageHtml);
                    $("div.page_tips:last-child").css("top", resumeHeight + "px");
                } else {
                    var nowPageSize = 0;          // 当前页数
                    var resumePageHeight = 1160;  // 每页高度
                    var pageSize = Math.ceil(resumeHeight / resumePageHeight);
                    var pageHeight = resumePageHeight * pageSize;
                    $resume.css("height", pageHeight + 'px');
                    if (pageSize != nowPageSize) {
                        nowPageSize = pageSize;
                        $("div.page_tips").remove();
                        for (var index = 1; index <= pageSize; index++) {
                            var pageBreakObj = $(resumePageHtml);
                            var page_top = (index * resumePageHeight) - 16;
                            pageBreakObj.css("top", page_top + 'px');
                            pageBreakObj.find('span').text(index + '/' + pageSize);
                            $resume.append(pageBreakObj);
                            if (pageSize === 2 && index === 1) {
                                $autoOnePage.removeClass('hidden').css('top', page_top + 5 + 'px');
                                $resume.append($autoOnePage);
                            }
                        }
                        $("div.page_tips:last-child").css("top", pageHeight + "px");
                        // 二维码模块超出处理
                        var $ewmItem = $('#resume_qrcode');
                        if ($ewmItem.css('position') === 'absolute') {
                            if (($ewmItem.position().top + $ewmItem.outerHeight()) > pageHeight) {
                                $ewmItem.css('top', (pageHeight - $ewmItem.outerHeight()) + 'px');
                            }
                        }
                    }
                }
            }, 300);
		},
	    resume_preview_pageInit:function(){//简历预览页面初始化
	    	$("div[contenteditable]").attr("contenteditable","false");//可编辑状态为false
	    	$(".baseItem-null").attr("style","display:none;");//自定义框隐藏
	    	//求职意向图标去除
	    	$("#resume_job_preference .moduleItemList").each(function(id,item){
	    		var _span = $(item).find("span").text();
	    		if(cvresume.main.is_empty(_span)){
	    			$(this).attr("style","display:none");
	    		}
			});
			// 下载查看页 下拉翻页
			if ($('.resumepage-select').length) {
				$(document).on('click', function (event) {
					var $select = $(event.target).parents('.resumepage-select');
					if (!$select.length) {
						$('.cv-release .resumepage-select').removeClass('open');
					}
				});
				setTimeout(function () {
					var page_height = parseInt($('.cv-release .wbdCv-resume').css('min-height'));
					var resume_height = parseInt($('.cv-release .wbdCv-resume').css('height'));
					var page_size = Math.ceil(resume_height / page_height);
					for (var i = 0; i < page_size; i++) {
						$('.cv-release .resumepage-select .resumepage-option').append('<li data-number="'+ i +'">第 '+ (i + 1) +' 页</li>');
					}
					$('.cv-release .wbdCv-resume').css('height', page_size * page_height);
					$('.cv-release .resumepage-select').on('click', function (event) {
						var $select = $(event.currentTarget);
						$select.toggleClass('open');
						var $this = $(event.target);
						var number = $this.attr('data-number');
						if (!isNaN(number)) {
							$select.find('.name').text($this.text());
							$('.cv-release .wbdCv-container').css('transform', 'translateY(-'+ number * page_height +'px)');
						}
					});
				}, 100);
			}
	    },
	    resume_release_pageInit:function(){//简历发布页面初始化
	    	$(document).off("blur","div[contenteditable='true']");//去除失去焦点保存
	    	$("div[contenteditable='true']").off("blur");
	    	$("div[contenteditable]").attr("contenteditable","false");//可编辑状态为false
	    	$(".baseItem-null").attr("style","display:none;");//自定义框隐藏
			$("#resume_contact").find("div[contenteditable]:gt(0)").attr("contenteditable","true");//联系我可编辑状态
            if(!$(".wbdCv-baseStyle").parents('.mobile').length){
				setTimeout(function () {
					// 第三方查看页高度自适应
					if ($('.cv-preview').length > 0) {
						var resumePageHtml = '<div class="page_tips"><span></span></div>';
						var resumeHeight = $(".wbdCv-resume").css({"height" : "auto","min-height":1160}).outerHeight();
						$('.wbdCv-resume').css('height', resumeHeight + 'px');
						$(".wbdCv-resume").append(resumePageHtml);
						$("div.page_tips:last-child").css("top", resumeHeight + "px");
					} else {
						var nowPageSize = 0; // 当前页数
						var resumePageHeight = 1160;// 每页高度
						var resumePageHtml = '<div class="page_tips"><span></span></div>';
						var resumeHeight = $(".wbdCv-resume").css({"height" : "auto","min-height":1160}).outerHeight();
						var pageSize = Math.ceil(resumeHeight / resumePageHeight);
						$(".wbdCv-resume").css("height",resumePageHeight*pageSize);
						if(pageSize != nowPageSize){
							nowPageSize = pageSize;
							$("div.page_tips").remove();
							for(var index = 1; index <= pageSize; index++){
								var pageBreakObj = $(resumePageHtml);
								pageBreakObj.css({"top" : (index * resumePageHeight)-16 + "px"});
								pageBreakObj.find('span').text('第'+ index +'页');
								$(".wbdCv-resume").append(pageBreakObj);
							}
							$("div.page_tips:last-child").css("top", resumePageHeight*pageSize + "px");
						}
					}
				}, 300);
			}
	    },
	    resume_visit_pwd:function(visitid,visitpwd){//密码访问简历
	    	$.ajax({type : "post",
	    		cache: false,
	    		async : false,
	    		url : "/cvresume/"+visitid+"/pwd/",
	    		data : {"visitpwd" : visitpwd},
	    		success : function(message) {
	    			if(message.type == "success"){
	    				location.href = "/cvresume/" + visitid + "/";
	    			}else{
	    				layer.msg(message.content);
	    			}
	    		}
	    	});
	    },
	    contact_me:function(resumeid){//联系我
            var name = $("#resume_contact").find('.resume_contact_name').text();
            var contact = $("#resume_contact").find('.resume_contact_mobile').text();
            var content = $("#resume_contact").find('.resume_contact_content').text();
            $.ajax({
                type: "POST",
                url: "/leaveWord/save/",
                data:{
                	resumeId:resumeid,
                	name:name,
                	contact:contact,
                	content:content
                },
                datetype:"Json",
                success: function(message){
                    if(message.type == "success"){
                    	layer.msg(message.content);
                    	$("#resume_contact").find('.resume_contact_name').text("");
                    	$("#resume_contact").find('.resume_contact_mobile').text("");
                    	$("#resume_contact").find('.resume_contact_content').text("");
                    } else {
                    	layer.msg(message.content);
                    }
                }
            });
	    },
	    is_empty:function(str){
	    	if(str==null||str==""||str==undefined){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    is_empty_ext:function(str){
	    	if(str===null||str===""||str===undefined){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    isJsonFormat:function(str){//json格式校验
	    	try{
	    		JSON.parse(str);
	    		return true;
	    	}catch(e){
				return false;
	    	}
	    },
	    strToJson:function(str){ 
	    	return JSON.parse(str); 
	    },
	    set_visitid:function(visitid){
	    	$.post("/cvresume/set_visitid/",{"visitid":visitid,"resumeid":cvresume.info.resumeid},function(message){
	    		if(message.type=="success"){
	    			if(cvresume.main.is_empty(cvresume.info.resumeid)||cvresume.info.resumeid==0){
	    				var resumeJson=cvresume.main.strToJson(message.content);
		    			cvresume.info.resumeid=resumeJson.resumeid;
		    			cvresume.info.memberid=resumeJson.memberid;
		    		}
		    		var _oldVisitid = cvresume.info.visitid;
	    			cvresume.info.visitid=visitid;
	    			if(location.href.indexOf("/cvresume/"+_oldVisitid+"/") != -1){//发布页修改浏览器地址
		    			history.pushState(null,"个性域名修改",wbdcnf.base + "/cvresume/" + cvresume.info.visitid+"/");
		    		}
	    			layer.msg("修改成功~");
	    		}else{
	    			layer.msg(message.content);
	    			setTimeout(function(){
	    				$("#visitid").val(cvresume.info.visitid);
	    			},1500)
	    		}
	    	});
	    },
	    /**获取唯一标识*/
	    uuid:function() {
	        var uuid = "";
	        for (var i = 1; i <= 32; i++){
	          var n = Math.floor(Math.random() * 16.0).toString(16);
	          uuid += n;
	          if(i == 8 || i == 12 || i == 16 || i == 20)
	            uuid += "";
	        }
	        return uuid;    
	    },
	    replaceAll:function(str,sou,tar){
	    	return str.replace(new RegExp(sou,"gm"),tar); 	
	    },
	    //时间模块空值校验
	    timeModuleIsEmpty:function(str){
	    	if(cvresume.main.is_empty(str) || str == "开始时间" || str == "结束时间"){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    gernateResumeWapQrCodeImage:function(resumeid){//生成手机简历二维码
	    	var message={};
	    	//1拼接二维码连接
	    	if(cvresume.main.is_empty(resumeid)){
	    		message["type"]="error";
	    		message["content"]="resumeid不能为空";
	    		return message;
	    	}
	    	//判断二维码图片地址
	    	var $resume_qrcode=$("#resume_qrcode").find("img")
	    	var resume_qrcode_url=$resume_qrcode.attr("src");
	    	if(resume_qrcode_url.indexOf("ad_Attention_weixin_ewm.png")==-1){
	    		message["type"]="error";
	    		message["content"]="已生成为二维码，不能重复生成";
	    		return message;
	    	}
	    	var host=location.hostname;
	    	var codeUrl=location.protocol+"//"+host+"/cvresume/qrcode_redirect/"+resumeid+"/";
	    	//2生成隐藏的画布节点
	    	var $qrCodeImage=$("#gernateResumeWapQrCodeImage");
	    	if($qrCodeImage.length<=0){
	    		$("body").append("<div style='display:none' id='gernateResumeWapQrCodeImage'></div>");
	    		$qrCodeImage=$("#gernateResumeWapQrCodeImage");
	    		$qrCodeImage.hide();
			}
			/**
			 * 二维码logo图片路径已在common.css中使用css的background-image发起请求，这里onload直接从缓存中读取
			 * 否则第一次加载图片由于异步进行，上传的二维码图片不会有logo
			 */
			var new_image = new Image(),
				logo_src = '/resources/500d/common/images/qrcode_icon_logo.png';
	    	$qrCodeImage.qrcode({ 
				render: "canvas",
	    	    width: 120,
	    	    height: 120,
				text: codeUrl,
				background: '#ffffff',
				foreground: '#000000',
				src: logo_src,
			}); 
			new_image.src = logo_src;
			// 二维码的logo加载完成
			new_image.onload = function(){
				//3获取图片base64编码
				var iamge_data=$qrCodeImage.children("canvas")[0].toDataURL("image/png");
				//4上传图片并返回连接
				$.post(wbdcnf.base+'/file/upload/cropper_image/',{"token" : getCookie("token"),"cropper_image":iamge_data.toString()},function(result){
					if(result.type == 'error'){
						message["type"]="error";
						message["content"]=result.content;
					}else{
						$resume_qrcode.attr("src",result.content);
					 	message["type"]="success";
						message["content"]=result.content;
					}
					return message;
				});
			}
	    },
	    _500dtongji:function(lable){
	    	try{
	    		if (window.localStorage && (cvresume.main.is_empty(localStorage.getItem("pcEditDataUpdated")) || localStorage.getItem("pcEditDataUpdated") != cvresume.info.resumeid)) {
	    			common.main._500dtongji(lable);
	    			localStorage.setItem("pcEditDataUpdated",cvresume.info.resumeid);
				} 	
			}catch(e){
				console.log("统计埋点错误~");
			}
	    },
		preview_pdf:function(){
			var isChrome = navigator.userAgent.indexOf("Chrome");
			var isFirefox = navigator.userAgent.indexOf("Firefox");
			var is360 = window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length;
			var isqq = window.navigator.userAgent.indexOf('QQBrowser')>-1;
			var isSg = window.navigator.userAgent.toLowerCase().indexOf('se 2.x')>-1;
			var isSafari = window.navigator.userAgent.indexOf("Safari")>-1;
			var isIe = window.navigator.userAgent.indexOf('MSIE') >-1;
			function isShow(){
				$(".pdf_tips").addClass("show");				
			}
			function isHide(){
				$(".pdf_tips").removeClass("show");				
			}			
			if(is360 || isSg ){
				isShow();
			}else{
				isHide();
			}
			$(".pdf_tips .close").click(function(){
				isHide();
			});
		},
		moduleItemList_handlestyle: function(){
			// 手机模式不处理
			if ($('.wbdCv-baseStyle').parents('.mobile').length > 0) return;
			// 编辑页调用
			/**
			 * 基本信息
			 * 竖线分割样式处理最后一个竖线  css选择器没法去除最后一个  看到的最后一项并不是真正的最后一项
			 * 目前模板基本信息有2种样式 jm0203、jm0256 2套模板为例子  需要处理的只有jm0256这类的
			 */
			var $infoitem = $('.wbdCv-baseStyle .infoItem .info-list:visible');
			$infoitem.removeClass('last-child');
			$infoitem.last().addClass('last-child');
			/**
			 * 求职意向
			 * 自适应分布处理，导出pdf插件不支持flex
			 * 目前有少数模板是竖排显示的，需在模板css里覆盖这里的样式
			 * 
			 * 自适应规则：
			 * 清除外边距计算所有项所占总宽度，如果在一行内则平均分布外边距，最后一项不设置，公式：Math.floor( 容器宽 - 所有项总宽 ) / ( 项目数量 - 1 ) = 剩余空间
			 * 注：(项目数量需大于一)
			 * 多行情况时，每行剩余空间最大值不超过30像素，最后一项不设置
			 */
			var $inteitem = $('.wbdCv-baseStyle .inteItem .inte-list:visible');
			var $inteparent = $('.wbdCv-baseStyle .inteItem .inte-con');
            var intecontain_width = $inteparent.width();
            var interstyle = $('.wbdCv-baseStyle .inteItem').attr('data-parts');
			var inte_width = 0;
			var inte_line = 1;
			$inteitem.each(function(i, item){
				$(item).removeAttr('style');
				// 内容总长
				inte_width += $(item).outerWidth();
				// 设置行
				var item_line = (item.offsetTop + $(item).outerHeight()) / $inteparent.height() * ($inteparent.height() / $(item).outerHeight());
				$(item).attr('temp-line', item_line);
				inte_line = item_line;
				// 设置列 索引值1开始
				$(item).attr('temp-index', 1);
				if (i > 0) {
					var $prev = $inteitem.eq(i - 1);
					if ($prev.attr('temp-line') === $(item).attr('temp-line')) {
						$(item).attr('temp-index', +$prev.attr('temp-index') + 1);
					} else {
						$(item).attr('temp-index', 1);
					}
				}
			});
			if (intecontain_width >= inte_width && $inteitem.length > 2) {
				var inte_margin = Math.floor((intecontain_width - inte_width) / ($inteitem.length - 1)) - 2; // 每个项减少一个像素预留出空位防止计算错误
                if (inte_margin < 0) inte_margin = 0;
				$inteitem.not($inteitem.eq($inteitem.length - 1)).css('margin-right', inte_margin + 'px');
                $inteitem.not($inteitem.eq($inteitem.length - 1)).find('i.inte-after').css('right', -(inte_margin / 2) + 'px');
            } else {
				for (var i = 1; i <= inte_line; i++) {
					var $inteitem_line = $('.wbdCv-baseStyle .inteItem .inte-list[temp-line='+ i +']');
					var inte_line_width = 0;
					$inteitem_line.each(function(){
						inte_line_width += $(this).outerWidth();
					});
					$inteitem_line.each(function(){
                        var inte_margin = Math.floor((intecontain_width - inte_line_width) / (($inteitem_line.length - 1) || 1) ) - 2; // 每个项减少2个像素预留出空位防止计算错误
                        if (inte_margin > 0 && ['inte_style_01','inte_style_03'].indexOf(interstyle) >= 0) inte_margin += 20;
						if (inte_margin < 0) inte_margin = 0;
                        if (inte_margin > 30) inte_margin = 30;
						$inteitem_line.not($inteitem_line.eq($inteitem_line.length - 1)).css('margin-right', inte_margin + 'px');
                        $inteitem_line.not($inteitem_line.eq($inteitem_line.length - 1)).find('i.inte-after').css('right', -(inte_margin / 2) + 'px');
                    });
				}
			}
		},
		// 简历编辑器繁体切换
		set_document_tw: function () {
			// 简历内容转繁体
			$(".wbdCv-baseStyle").s2t();
			// 编辑模块弹窗节点转繁体
			$('#baseMsg-modal').s2t();
			$('#jobIntension-modal').s2t();
			$('#skills-modal').s2t();
			$('#portfolio-modal').s2t();
			//水印
			$.each($('#resume_base_info .moduleItemList span,#resume_job_preference .moduleItemList span'),function(i,item){
				var $item = $(item);
				var value = $item.attr('data-placeholder');
				if(!value){
					return true;
				}
                $item.attr('data-placeholder', $.s2t(value));
			});
		},
		// 简历编辑器简体切换
		set_document_sf: function () {
			// 简历内容转简体
			$(".wbdCv-baseStyle").t2s();
			// 编辑模块弹窗节点转简体
			$('#baseMsg-modal').t2s();
			$('#jobIntension-modal').t2s();
			$('#skills-modal').t2s();
			$('#portfolio-modal').t2s();
			//水印
            $.each($('#resume_base_info .moduleItemList span,#resume_job_preference .moduleItemList span'),function(i,item){
                var $item = $(item);
                var value = $item.attr('data-placeholder');
                if(!value){
                    return true;
                }
                $item.attr('data-placeholder', $.t2s(value));
            });
        },
        // 简历模块版式适配
        module_format_fit: function ($module,type) {
            var $resume = $('.wbdCv-baseStyle');
            var resume_width = $resume.width();
            if (!$module) {
                $module = $resume.find('.baseItem:not(.hidden)');
            }
            $module.each(function () {
                var $this = $(this);
                // 富文本图片尺寸适配
                if ($this.find('.dd-text img').length) {
                    cvresume.main.richtext_image_adapt($this);
                }
                if (type === 'wap') {
                    $this.attr('data-format', 'full_column');
                    // 占位重新计算
                    if(typeof cvmutual !== 'undefined'){
                    	cvmutual.main.baseItem_format_placeholder($this);
                    }
                } else {
                    // 分栏适配
                    if ($this.attr('data-format')) {
                        var module_width = $this.width();
                        var current_format = $this.attr('data-format');
                        if (current_format && current_format !== 'full_column') {
                            if ((module_width / resume_width) < 0.5) {
                                $this.attr('data-format', 'full_column');
                            }
                            // 占位重新计算
                            if(typeof cvmutual !== 'undefined'){
                            	cvmutual.main.baseItem_format_placeholder($this);
                            }
                        }
                    }
                }
            })
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
}
$(function(){
    // 初始化
	cvresume.main.init_();
});