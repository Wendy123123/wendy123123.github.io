//数字正则匹配
var int_reg=/^\+?[1-9][0-9]*$/;

/**
 * 获取前程无忧简历
 * @param html
 * @param itemId
 * @param memberId
 * @returns {String}
 */
function get51ResumeHtml(html,itemId,memberId){
	var $importRModal = $("#importRModal");
	var $importResetModal = $("#importResetModal");
	if(!html){
		$importRModal.modal("hide");
        $importResetModal.modal("show");
        $importResetModal.find(".tips_show").text("由于文件内容为空,导入失败，请重新导入")
		return "";
	}
	try{
		if(html.indexOf("zhaopin.com") !== -1){
			$importRModal.modal("hide");
            $importResetModal.modal("show");
            $importResetModal.find(".tips_show").text("当前导入的简历是智联简历，请选择前程无忧简历再导入");
			return;
		}else if(html.indexOf("lagou.com") !== -1){
			$importRModal.modal("hide");
            $importResetModal.modal("show");
            $importResetModal.find(".tips_show").text("当前导入的简历拉勾简历，请选择前程无忧简历再导入");
			return;
		}else if(html.indexOf("51job") === -1){
			$importRModal.modal("hide");
            $importResetModal.modal("show");
            $importResetModal.find(".tips_show").text("当前导入的简历不是前程无忧简历，请选择正确文件再重新导入");
			return;
		}
		//初初始化简历
		var resume = init_resume();
		//解析Html
		var $html = $(html);
		//姓名
		var resume_name = resume['modules']['resume_name'];
		var resume_name_content = JSON.parse(resume_name['content']);
		var $base = $html.find("table.infr");
		var tmp_name = $base.find(".name").text();
		if(tmp_name){
			resume_name_content['name'] = tmp_name;
		}
		resume_name['content'] = JSON.stringify(resume_name_content);
		//基本信息
		var base_info = resume['modules']['base_info'];
		var base_info_content = JSON.parse(base_info['content']);
		var more_info = $base.find("tr:last").text();
		var more_infos = more_info.split("|");
		//性别
		var tmp_sex = more_infos[0];
		if(tmp_sex){
			base_info_content['sex'] = getSex(tmp_sex);
		}
		//年龄
		var tmp_birth = more_infos[1].split(/[()\/]/);
		if(tmp_birth[0]){
			base_info_content['age'] = tmp_birth[0].replace(/\s+/g, "");
		}
		//生日
		if(int_reg.test(tmp_birth[1].trim()) && int_reg.test(tmp_birth[2].trim())){
			base_info_content['birth'] = tmp_birth[1] + '.' + tmp_birth[2];
		}
		//工作年限
		var tmp_jobYear = more_infos[3].split("年")[0];
		if(tmp_jobYear < 11){
			tmp_jobYear = getJobYear(tmp_jobYear);
		}else{
			tmp_jobYear = 'more';
		}
		if(tmp_jobYear){
			base_info_content['jobYear'] = tmp_jobYear;
		}
		//邮箱
		var tmp_email = $base.find(".email").text().trim();
		if(tmp_email){
			base_info_content['email'] = tmp_email;
		}
		//电话
		var tmp_mobile = $base.find(".email").closest("td").prev().text().trim();
		if(tmp_mobile){
			base_info_content['mobile'] = tmp_mobile;
		}
		$html.find("table.box").each(function(i,item){
			var $item = $(item);
			var titleName = $item.find("td.plate1").text();
			if(titleName.indexOf('个人信息') !== -1){
				var tmp_custom = [];
				$item.find(".tb2").each(function(j,jtem){
					var $jtem = $(jtem);
					if($jtem.find("td.keys").text().indexOf("婚姻") !== -1){
						//婚姻状况
						var tmp_marriageStatus = $jtem.find("td.txt2").text().trim();
						if(tmp_marriageStatus){
							base_info_content['marriageStatus'] = getMarriageStatus(tmp_marriageStatus);
						}
					}else if($jtem.find("td.keys").text().indexOf("政治") !== -1){
						//政治面貌
						var tmp_politicalStatus = $jtem.find("td.txt2").text().trim();
						if(tmp_politicalStatus){
							base_info_content['politicalStatus'] = getPoliticalStatus(tmp_politicalStatus);
						}
					}else if($jtem.find("td.keys").text().indexOf("身高") !== -1){
						//自定义信息
						var tmp_custom_desc = $jtem.find("td.txt2").text().trim();
						if(tmp_custom_desc){
							tmp_custom.push({
								'key' : uuid(),
								'name' : 'height',
								'desc' : tmp_custom_desc,
								'icon' : null
							});
						}
					}
				});
				if(tmp_custom){
					base_info_content['custom'] = tmp_custom;
				}
			} else if(titleName.indexOf('工作经验') !== -1){
				//工作经验
				var resume_work = resume['modules']['resume_work'];
				var resume_work_content = JSON.parse(resume_work['content']);
				if(!resume_work_content){
					resume_work_content = [];
				}
				$item.find(".p15").each(function(j,jtem){
					resume_work['mg']['isShow'] = true;
					var $jtem = $(jtem);
					var time = $jtem.find(".time").text().trim().split("-");
					var beginTime = time[0].replace("/","\.");
					var endTime = time[1].replace("/","\.");
					var unit = $jtem.find(".phd").eq(0).find("span:first").text().trim();
					var job = $jtem.find(".rtbox").text().trim();
					var content = $jtem.find(".tb1:last").text().trim();
					resume_work_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_work['content'] = JSON.stringify(resume_work_content);
			} else if(titleName.indexOf('项目经验') !== -1){
				var resume_project = resume['modules']['resume_project'];
				var resume_project_content = JSON.parse(resume_project['content']);
				if(!resume_project_content){
					resume_project_content = [];
				}
				$item.find(".p15").each(function(j,jtem){
					resume_project['mg']['isShow'] = true; 
					var $jtem = $(jtem);
					var time = $jtem.find(".time").text().trim().split("-");
					var beginTime = time[0].replace("/","\.");
					var endTime = time[1].replace("/","\.");
					var unit = '';
					var job = $jtem.find(".rtbox").text().trim();
					var content = $jtem.find(".tb1").eq(0).text().trim() + $jtem.find(".tb1").eq(1).text().trim();
					resume_project_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_project['content'] = JSON.stringify(resume_project_content);
			} else if(titleName.indexOf('教育经历') !== -1){
				//教育背景
				var resume_edu = resume['modules']['resume_edu'];
				var resume_edu_content = JSON.parse(resume_edu['content']);
				if(!resume_edu_content){
					resume_edu_content = [];
				}
				$item.find(".p15").each(function(j,jtem){
					resume_edu['mg']['isShow'] = true;
					var $jtem = $(jtem);
					var time = $jtem.find(".time").text().trim().split("-");
					var beginTime = time[0].replace("/","\.");
					var endTime = time[1].replace("/","\.");
					var unit = $jtem.find(".tb1").eq(0).text().trim();
					var job = $jtem.find(".rtbox").text().trim();
					var content = $jtem.find(".tb1").eq(1).text().trim();
					resume_edu_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_edu['content'] = JSON.stringify(resume_edu_content);
			} else if(titleName.indexOf("在校") !== -1){
				$item.find(".tbb table").each(function(j,jtem){
					var $jtem = $(jtem);
					var jtem_name = $jtem.find(".tit").text();
					if(jtem_name.indexOf('校内荣誉') !== -1){
						//奖项荣誉
						var resume_honor = resume['modules']['resume_honor'];
						var resume_honor_content = [];
						var resume_honor_content_item = {
							'logo' : null,
							'orginLogo' : null,
							'logoStyle' : null,
							'content' : null,
							'tags' : null 
						}
						var content = '';
						$jtem.find(".tb3").each(function(k,ktem){
							var $ktem = $(ktem);
							content += $ktem.find(".time").text().trim() + "    " + $ktem.find(".rtbox").text().trim() + "<br/>";
						});
						if(content){
							resume_honor['mg']['isShow'] = true;
							resume_honor_content_item['content'] = content;
							resume_honor_content.push(resume_honor_content_item);
						}
						resume_honor['content'] = JSON.stringify(resume_honor_content);
					} else if(jtem_name.indexOf('校内职务') !== -1){
						//自定义模块
						var resume_custom = get_resume_module_time(uuid());
						resume_custom['title'] = jtem_name;
						var resume_custom_content = JSON.parse(resume_custom['content']);
						if(!resume_custom_content){
							resume_custom_content = [];
						}
						$jtem.find(".p15").each(function(k,ktem){
							var $ktem = $(ktem);
							var time = $ktem.find(".time").text().trim().split("-");
							var beginTime = time[0].replace("/","\.");
							var endTime = time[1].replace("/","\.");
							var unit = '';
							var job = $ktem.find(".rtbox").text().trim();
							var content = $ktem.find(".tb1").eq(0).text().trim();
							resume_custom_content.push({
								logo : null,
								beginTime : beginTime,
								endTime : endTime,
								unit : unit,
								job : job,
								content : content,
								tags : null
							});
						});
						resume_custom['content'] = JSON.stringify(resume_custom_content);
						resume['modules'][resume_custom['key']] = resume_custom;
					}
				});
			} else if(titleName.indexOf("技能特长") !== -1){
				$item.find(".tbb table").each(function(j,jtem){
					var $jtem = $(jtem);
					var jtem_name = $jtem.find(".tit").text();
					if(jtem_name.indexOf('技能/语言') !== -1){
						//技能特长
						var resume_skill = resume['modules']['resume_skill'];
						var resume_skill_content = JSON.parse(resume_skill['content']);
						if(!resume_skill_content){
							resume_skill_content = [];
						}
						$jtem.find(".tb2").each(function(k,ktem){
							resume_skill['mg']['isShow'] = true;
							var $ktem = $(ktem);
							var name = $ktem.find(".skill").text().trim();
							var masterLevelDesc = $ktem.find(".skco").text().trim();
							var masterLevel = getMasterLevel(masterLevelDesc);
							resume_skill_content.push({
								'name' : name,
								'masterLevel' : masterLevel,
								'masterLevelDesc' : masterLevelDesc
							});
						});
						resume_skill['content'] = JSON.stringify(resume_skill_content);
					} else if(jtem_name.indexOf('证书') !== -1){
						//自定义模块
						var resume_custom = get_resume_module_desc(uuid());
						resume_custom['title'] = jtem_name;
						var resume_custom_content = JSON.parse(resume_custom['content']);
						if(!resume_custom_content){
							resume_custom_content = {
								'logo' : null,
								'orginLogo' : null,
								'content' : null,
								'tags' : null 
							};
						}
						var content = '';
						$jtem.find(".tb3").each(function(k,ktem){
							var $ktem = $(ktem);
							content = content + $ktem.find(".time").text().trim() + "    " + $ktem.find(".rtbox").text().trim() + "<br/>";
						});
						if(content){
							resume_custom_content['content'] = content;
						}
						resume_custom['content'] = JSON.stringify(resume_custom_content);
						resume['modules'][resume_custom['key']] = resume_custom;
					} else if(jtem_name.indexOf('培训经历') !== -1){
						//自定义模块
						var resume_custom = get_resume_module_time(uuid());
						resume_custom['title'] = jtem_name;
						var resume_custom_content = JSON.parse(resume_custom['content']);
						if(!resume_custom_content){
							resume_custom_content = [];
						}
						$jtem.find(".p15").each(function(k,ktem){
							var $ktem = $(ktem);
							var time = $ktem.find(".time").text().trim().split("-");
							var beginTime = time[0].replace("/","\.");
							var endTime = time[1].replace("/","\.");
							var unit = $ktem.find(".tb2").eq(0).text().trim();
							var job = $ktem.find(".rtbox").text().trim();
							var content = $ktem.find(".tb1").eq(0).text().trim();
							resume_custom_content.push({
								logo : null,
								beginTime : beginTime,
								endTime : endTime,
								unit : unit,
								job : job,
								content : content,
								tags : null
							});
						});
						resume_custom['content'] = JSON.stringify(resume_custom_content);
						resume['modules'][resume_custom['key']] = resume_custom;
					}
				});
			} else if(titleName.indexOf("求职意向") !== -1){
				//求职意向
				var resume_job_preference = resume['modules']['resume_job_preference'];
				var resume_job_preference_content = JSON.parse(resume_job_preference['content']);
				resume_job_preference['mg']['isShow'] = true;
				$item.find(".tb2").each(function(j,jtem){
					var $jtem = $(jtem);
					var jtem_key = $jtem.find('.keys').text();
					if(jtem_key.indexOf('职能') !== -1){
						//求职意向
						var tmp_jobFunction = $jtem.find(".txt2").text().replace(/\s/g, '');
						if(tmp_jobFunction.lenght >= 15){
							tmp_jobFunction = tmp_jobFunction.substring(0,15);
						}
						if(tmp_jobFunction){
							resume_job_preference_content['jobFunction'] = tmp_jobFunction;
						}
					}else if(jtem_key.indexOf("到岗时间")!=-1){
						//到岗时间
						var tmp_jobTime = $jtem.find(".txt2").text().trim();
						if(tmp_jobTime){
							resume_job_preference_content['jobTime'] = tmp_jobTime;
						}
					}else if(jtem_key.indexOf("地点")!=-1){
						//意向城市
						var tmp_jobCityName = "";
						$jtem.find(".txt2").find("span").each(function(k,ktem){
							var $ktem = $(ktem);
							tmp_jobCityName += $ktem.text() + " ";
						});
						if(tmp_jobCityName){
							resume_job_preference_content['jobCityName'] = tmp_jobCityName;
						}
					}else if(jtem_key.indexOf("期望薪资")!=-1){
						//薪资要求
						var tmp_jobMinSalary;
						var tmp_jobMaxSalary;
						var salary = $jtem.find(".txt2").text().trim().split(/[元|-]/);
						if(salary.length == 3){
							if (salary[2].indexOf('年') >= 0) {
								tmp_jobMinSalary=Math.round(parseFloat(parseInt(salary[0]) * 10000 / 12)/1000);
								tmp_jobMaxSalary=Math.round(parseFloat(parseInt(salary[1]) * 10000 / 12)/1000);
							} else {
								tmp_jobMinSalary=Math.round(parseFloat(salary[0])/1000);
								tmp_jobMaxSalary=Math.round(parseFloat(salary[1])/1000);
							}
						}else{
							if(int_reg.test(salary[0].trim())){
								tmp_jobMinSalary=Math.round(parseFloat(salary[0].trim())/1000)
							}		
						}
						if(tmp_jobMinSalary){
							resume_job_preference_content['jobMinSalary'] = tmp_jobMinSalary;
						}
						if(tmp_jobMaxSalary){
							resume_job_preference_content['jobMaxSalary'] = tmp_jobMaxSalary;
						}
					}
				});
				resume_job_preference['content'] = JSON.stringify(resume_job_preference_content);
				//自我评价
				var resume_summary = resume['modules']['resume_summary'];
				var resume_summary_content = [];
				var resume_summary_content_item = {
					'logo' : null,
					'orginLogo' : null,
					'logoStyle' : null,
					'content' : null,
					'tags' : null 
				}
				var content = $item.find(".tb1").find(".txt1").text().trim();
				if(content){
					resume_summary['mg']['isShow'] = true;
					resume_summary_content_item['content'] = content;
					resume_summary_content.push(resume_summary_content_item);
				}
				resume_summary['content'] = JSON.stringify(resume_summary_content);
			}
		});
		base_info['content'] = JSON.stringify(base_info_content);
	    var return_json = resume_save(resume,itemId,memberId);
		setTimeout(function(){
			$("div.progressbar").find("i").css("width","100%");
			$("div.progressbar").find("span").text("100%");
		},1000);
		setTimeout(function(){
			$("#importRModal").modal("hide");
			if(return_json.flag){
				$("#importRsuccModal").modal("show");
				$("#importRsuccModal").find(".bd a").attr("href",return_json.content);
			}else{
				if(return_json.content.indexOf("已超过最大简历创建数量") !== -1){
					//获取对应的提示内容
					common.main.resume_confirm({
						title:"VIP会员升级提示",
						modal_class:"vip-content",
						content:"超出最大创建简历数量，请删除部分简历或升级会员后继续",
						ok:"立即升级",
						onOk:function(){
								window.open("/order/vip_member/");
								setTimeout(function(){
									common.main.resume_confirm({
										title:"支付提示",
										content:"请在你新打开的页面上完成付款，支付完成后，请根据您支付的情况点击下面按钮。",
										ok:"支付完成",
										cancel:"支付遇到问题",
										onOk:function(){
											location.reload();
										},
										onCancel:function(){
											window.open("http://help.500d.me");
										}
									});	
								},1000);
						}
					});	
				}else{
					$("#importResetModal").find(".tips_show").text(return_json.content);
					$("#importResetModal").modal("show");
				}
			}
			hide_pro();
		},2000)
		return;
	}catch(e){
		console.log(e);
		$("#importRModal").modal("hide");
		$("#importResetModal").modal("show");
		$("#importResetModal").find(".tips_show").text("简历文件内容解析错误,导入失败，请重新选择文件导入");
	}
}

/**
 * 获取拉勾简历
 * @param html
 * @param itemId
 * @param memberId
 * @returns {String}
 */
function getLagouResumeJson(html,itemId,memberId){
	var $importRModal = $('#importRModal');
	var $importResetModal = $('#importResetModal');
	if(!html){
		$importRModal.modal("hide");
		$importResetModal.modal("show");
		$importResetModal.find(".tips_show").text("由于文件内容为空,导入失败，请重新导入")
		return "";
	}
	try{
		if(html.indexOf("zhaopin.com")!=-1){
			$importRModal.modal("hide");
			$importResetModal.modal("show");
			$importResetModal.find(".tips_show").text("当前导入的简历是智联简历，请选择拉勾简历再导入");
			return;
		}else if(html.indexOf("lagou.com")==-1){
			$importRModal.modal("hide");
			$importResetModals.modal("show");
			$importResetModal.find(".tips_show").text("当前导入的简历不是拉勾简历，请选择正确文件再重新导入");
			return;
		}
		//初始化简历数据
		var resume = init_resume();
		//解析html
		var $html = $(html);
		//姓名
		var resume_name = resume['modules']['resume_name'];
		var resume_name_content = JSON.parse(resume_name['content']);
		var $base = $html.find("#baseInfo");
		var tmp_name = $base.find(".basic-info").find(".basic-name").text();
		if(tmp_name){
			resume_name_content['name'] = tmp_name;
		}
		resume_name['content'] = JSON.stringify(resume_name_content);
		//基本信息
		var base_info = resume['modules']['base_info'];
		var base_info_content = JSON.parse(base_info['content']);
		//工作年限
		var tmp_jobYear = $base.find(".basic-exp").text().replace(/[^0-9]/ig,"");
		if(tmp_jobYear){
			base_info_content['jobYear'] = getJobYear(tmp_jobYear);
		}
		//邮箱
		var tmp_email = $base.find("span.basic-email").text();
		if(tmp_email){
			base_info_content['email'] = tmp_email;
		}
		//手机
		var tmp_mobile = $base.find("span.basic-tel").text();
		if(tmp_mobile){
			base_info_content['mobile'] = tmp_mobile;
		}
		base_info['content'] = JSON.stringify(base_info_content);
		//工作经验
		var resume_work = resume['modules']['resume_work'];
		var resume_work_content = JSON.parse(resume_work['content']);
		if(!resume_work_content){
			resume_work_content = [];
		}
		$html.find("#workExp").find(".work-exp_list").each(function(i,item){
			resume_work['mg']['isShow'] = true;
			var $item = $(item);
			var time = clearAllHtmlText($item.find(".exp-list_time").text()).split("-");
			var beginTime = time[0];
			var endTime = time[1];
			var unit = clearAllHtmlText($item.find(".exp-list_right").find("strong").html());
			var job = clearAllHtmlText($item.find(".exp-list_right").find("p").html());
			var content = clearText($item.find(".exp-list_content").html());
			resume_work_content.push({
				logo : null,
				beginTime : beginTime,
				endTime : endTime,
				unit : unit,
				job : job,
				content : content,
				tags : null
			});
		});
		resume_work['content'] = JSON.stringify(resume_work_content);
		//教育经历
		var resume_edu = resume['modules']['resume_edu'];
		var resume_edu_content = JSON.parse(resume_edu['content']);
		if(!resume_edu_content){
			resume_edu_content = [];
		}
		$html.find("#eduExp").find(".edu-exp_list").each(function(i,item){
			resume_edu['mg']['isShow'] = true;
			var $item = $(item);
			var time = clearAllHtmlText($item.find(".exp-list_time").html()).split("-");
			var beginTime = time[0];
			var endTime = time[1];
			var unit = clearAllHtmlText($item.find(".exp-list_right").find("strong").html());
			var job = clearAllHtmlText($item.find(".exp-list_right").find("p").html());
			var content = null;
			resume_edu_content.push({
				logo : null,
				beginTime : beginTime,
				endTime : endTime,
				unit : unit,
				job : job,
				content : content,
				tags : null
			});
		})
		resume_edu['content'] = JSON.stringify(resume_edu_content);
		//项目经验
		var resume_project = resume['modules']['resume_project'];
		var resume_project_content = JSON.parse(resume_project['content']);
		if(!resume_project_content){
			resume_project_content = [];
		}
		$html.find("#proExp").find(".pro-exp_list").each(function(i,item){
			resume_project['mg']['isShow'] = true;
			var $item = $(item);
			var time = clearAllHtmlText($item.find(".exp-list_time").html()).split("-");
			var beginTime = time[0];
			var endTime = time[1];
			var unit = clearAllHtmlText($item.find(".exp-project_name").html());
			var job = clearAllHtmlText($item.find(".exp-list_content").html());
			var content = clearText($item.find(".exp-project_des").html());
			resume_project_content.push({
				logo : null,
				beginTime : beginTime,
				endTime : endTime,
				unit : unit,
				job : job,
				content : content,
				tags : null
			});
		})
		resume_project['content'] = JSON.stringify(resume_project_content);
		//自我评价
		var resume_summary = resume['modules']['resume_summary'];
		var resume_summary_content = [];
		var resume_summary_content_item = {
			'logo' : null,
			'orginLogo' : null,
			'logoStyle' : null,
			'content' : null,
			'tags' : null 
		};
		var content = $html.find("#perAbility").find(".per-self_des").html();
		if(content){
			resume_summary['mg']['isShow'] = true;
			resume_summary_content_item['content'] = clearAllHtmlText(content);
			resume_summary_content.push(resume_summary_content_item);
		}
		resume_summary['content'] = JSON.stringify(resume_summary_content);
		//求职意向
		var resume_job_preference = resume['modules']['resume_job_preference'];
		var resume_job_preference_content = JSON.parse(resume_job_preference['content']);
		resume_job_preference['mg']['isShow'] = true;
		//求职意向
		var tmp_jobFunction = $base.find(".basic-job").html();
		if(tmp_jobFunction){
			resume_job_preference_content['jobFunction'] = tmp_jobFunction;
		}
		//到岗时间
		var tmp_jobTime = getJobTime('withinOneWeek');
		if(tmp_jobTime){
			resume_job_preference_content['jobTime'] = tmp_jobTime;
		}
		//意向城市
		var tmp_jobCityName = $html.find("#expectJob").find(".mr_job_adr").html();
		if(tmp_jobCityName){
			resume_job_preference_content['jobCityName'] = tmp_jobCityName;
		}
		//期望薪资
		var tmp_jobMinSalary = 5;
		var tmp_jobMaxSalary = 10;
		if($html.find("#expectJob").find(".mr_job_range").length > 0){
	        var salary = $html.find("#expectJob").find(".mr_job_range").html().replace(/k/g,"000").split("-");
	        if(salary.length === 2){
	        	if(int_reg.test(salary[0].trim())){
	        		tmp_jobMinSalary = Math.round(parseFloat(salary[0].trim())/1000);
	        	}
	        	if(int_reg.test(salary[1].trim())){
	        		tmp_jobMaxSalary = Math.round(parseFloat(salary[1].trim())/1000);
	        	}
	        }else{
	        	if(int_reg.test(salary[0].split("以")[0].trim())){
	        		tmp_jobMinSalary = tmp_jobMaxSalary = Math.round(parseFloat(salary[0].split("以")[0].trim())/1000);
	        	}
	        }
        }
        if(tmp_jobMinSalary){
        	resume_job_preference_content['jobMinSalary'] = tmp_jobMinSalary;
        }
        if(tmp_jobMaxSalary){
        	resume_job_preference_content['jobMaxSalary'] = tmp_jobMaxSalary;
        }
		resume_job_preference['content'] = JSON.stringify(resume_job_preference_content);
		//技能特长
		var resume_skill = resume['modules']['resume_skill'];
		var resume_skill_content = JSON.parse(resume_skill['content']);
		if(!resume_skill_content){
			resume_skill_content = [];
		}
		$html.find(".tagboard-tag").each(function(i,item){
			resume_skill['mg']['isShow'] = true;
			var $item = $(item);
			var name = clearAllHtmlText($item.html());
			var masterLevelDesc = $clearAllHtmlText($item.find(".mr_skill_level").html());
			var masterLevel = getMasterLevel(masterLevelDesc);
			resume_skill_content.push({
				'name' : name,
				'masterLevel' : masterLevel,
				'masterLevelDesc' : masterLevelDesc
			});
		});
		resume_skill['content'] = JSON.stringify(resume_skill_content);
		//自定义模块
		var $customBlock = $html.find("#customBlock");
		var content = clearText($customBlock.find(".mr_moudle_content").html());
		if(content){
			var resume_custom = get_resume_module_desc(uuid());
			resume_custom['title'] = clearText($customBlock.find(".cust_title").html());
			var resume_custom_content = JSON.parse(resume_custom['content']);
			if(!resume_custom_content){
				resume_custom_content = {
					'logo' : null,
					'orginLogo' : null,
					'content' : null,
					'tags' : null 
				};
			}
			resume_custom_content['content'] = content;
			resume_custom['content'] = JSON.stringify(resume_custom_content);
			resume['modules'][resume_custom['key']] = resume_custom;
		}
		var return_json = resume_save(resume,itemId,memberId);
		setTimeout(function(){
			$("div.progressbar").find("i").css("width","100%");
			$("div.progressbar").find("span").text("100%");
		},1000);
		setTimeout(function(){
			$("#importRModal").modal("hide");
			if(return_json.flag){
				$("#importRsuccModal").modal("show");
				$("#importRsuccModal").find(".bd a").attr("href",return_json.content);
			}else{
				if(return_json.content.indexOf("已超过最大简历创建数量，请升级会员继续") !== -1){
					//获取对应的提示内容
					common.main.resume_confirm({
						title:"VIP会员升级提示",
						modal_class:"vip-content",
						content:"超出最大创建简历数量，请删除部分简历或升级会员后继续",
						ok:"立即升级",
						onOk:function(){
								window.open("/order/vip_member/");
								setTimeout(function(){
									common.main.resume_confirm({
										title:"支付提示",
										content:"请在你新打开的页面上完成付款，支付完成后，请根据您支付的情况点击下面按钮。",
										ok:"支付完成",
										cancel:"支付遇到问题",
										onOk:function(){
											location.reload();
										},
										onCancel:function(){
											window.open("http://help.500d.me");
										}
									});	
								},1000);
						}
					});	
				}else{
					$("#importResetModal").find(".tips_show").text(return_json.content);
					$("#importResetModal").modal("show");
				}
			}
			hide_pro();
		},2500);
		return ;
	}catch(e){
		console.log(e);
		$("#importRModal").modal("hide");
		$("#importResetModal").modal("show");
		$("#importResetModal").find(".tips_show").text("简历文件内容解析错误,导入失败，请重新选择文件导入");
	}
}

/**
 * 获取智联简历
 * @param html
 * @param itemId
 * @param memberId
 * @returns {String}
 */
function getZhilianResumeJson(html,itemId,memberId){
	var $importRModal = $('#importRModal');
	var $importResetModal = $('#importResetModal');
	if(!html){
		$importRModal.modal("hide");
		$importResetModal.modal("show");
		$importResetModal.find(".tips_show").text("由于文件内容为空,导入失败，请重新导入")
		return "";
	}
	try{
		if(html.indexOf("lagou.com")!=-1){
			$importRModal.modal("hide");
			$importResetModal.modal("show");
			$importResetModal.find(".tips_show").text("当前导入的简历是拉勾简历，请选择智联简历再导入");
			return;
		}else if(html.indexOf("zhaopin.com")==-1){
			$importRModal.modal("hide");
			$importResetModal.modal("show");
			$importResetModal.find(".tips_show").text("当前导入的简历不是智联简历，请选择正确文件再重新导入");
			return;
		}
		//初始化简历数据
		var resume = init_resume();
		//解析html
		var $html = $(html);
		//姓名
		var resume_name = resume['modules']['resume_name'];
		var resume_name_content = JSON.parse(resume_name['content']);
		var $base = $html.find(".summary");
		var tmp_name = $base.find("h1").eq(0).text();
		if(tmp_name){
			resume_name_content['name'] = tmp_name;
		}
		resume_name['content'] = JSON.stringify(resume_name_content);
		//基本信息
		var base_info = resume['modules']['base_info'];
		var base_info_content = JSON.parse(base_info['content']);
		$base.find("h1").eq(0).remove();
		$base.find("p").remove();
		$base.find("img").remove();
		var more_info = clearAllHtmlText($base.html());
		var more_infos = more_info.split("|");
		$.each(more_infos,function(index,item){
			if(/[男|女]/.test(item)){
				base_info_content['sex'] = getGender(item);
			} else if(/[未婚|已婚|离异]/.test(item)){
				base_info_content["marriageStatus"] = getMarriageStatus(item);
			} else if(item.indexOf("居住") !== -1){
	        	var tmp_jobYear = "";
	        	$.each(val.split(""),function(j, jtem){
	        		if(!isNaN(jtem)){
	        			tmp_jobYear += jtem;
	        		}
	        	});
	        	tmp_jobYear = tmp_jobYear.trim();
	        	if(tmp_jobYear < 11){
	                base_info_content["jobYear"] = getJobYear(tmp_jobYear);
	            }else{
	                base_info_content["jobYear"] = "more";
	            }
			} else if(/[中共党员(含预备党员)|团员|群众|民主党派|无党派人士]/.test(item.trim())){
				base_info_content["politicalStatus"] = getPoliticalStatus(item);
			}
		});
		base_info['content'] = JSON.stringify(base_info_content);
		$html.find(".details").children("dt").each(function(i,item){
			var $item = $(item);
			var item_name = clearAllHtmlText($item.html());
			if(item_name.indexOf("求职意向") !== -1){
				//求职意向
				var resume_job_preference = resume['modules']['resume_job_preference'];
				var resume_job_preference_content = JSON.parse(resume_job_preference['content']);
				resume_job_preference['mg']['isShow'] = true;
				$item.next("dd").find("li").each(function(j,jtem){
					var $jtem = $(jtem);
					var jtems = clearAllHtmlText($jtem.html()).split("：");
					if(jtems[0].indexOf("期望职业") !== -1){
						var tmp_jobFunction = jtems[1];
						if(tmp_jobFunction){
							resume_job_preference_content['jobFunction'] = tmp_jobFunction;
						}
					}else if(jtems[0].indexOf("期望月薪") !== -1){
						var tmp_jobMinSalary = 5;
						var tmp_jobMaxSalary = 10;
						var salary = jtems[1].split(/[元|-]/);
						if(salary.length === 3){
							if(int_reg.test(salary[0].trim())){
								tmp_jobMinSalary = Math.round(parseFloat(salary[0].trim()) / 1000);
							}
							if(int_reg.test(salary[1].trim())){
								tmp_jobMaxSalary = Math.round(parseFloat(salary[1].trim()) / 1000);
							}
						}else{
							if(int_reg.test(salary[0].trim())){
								tmp_jobMinSalary = tmp_jobMaxSalary = Math.round(parseFloat(salary[0].trim()) / 1000);
							}
						}
						if(tmp_jobMinSalary){
							resume_job_preference_content['tmp_jobMinSalary'] = jobMinSalary;
						}
						if(tmp_jobMaxSalary){
							resume_job_preference_content['tmp_jobMaxSalary'] = jobMaxSalary;
						}
					}
				});
				resume_job_preference_content['jobTime'] = 'withinOneWeek';
				resume_job_preference['content'] = JSON.stringify(resume_job_preference_content);
			} else if(item_name.indexOf("自我评价") !== -1){
				//自我评价
				var resume_summary = resume['modules']['resume_summary'];
				var resume_summary_content = [];
				var resume_summary_content_item = {
					'logo' : null,
					'orginLogo' : null,
					'logoStyle' : null,
					'content' : null,
					'tags' : null 
				}
				var content = clearAllHtmlText($item.next("dd").html());
				if(content){
					resume_summary['mg']['isShow'] = true;
					resume_summary_content_item['content'] = clearAllHtmlText(content);
					resume_summary_content.push(resume_summary_content_item);
				}
				resume_summary['content'] = JSON.stringify(resume_summary_content);
			} else if(item_name.indexOf("工作经历") !== -1){
				//工作经验
				var resume_work = resume['modules']['resume_work'];
				var resume_work_content = JSON.parse(resume_work['content']);
				if(!resume_work_content){
					resume_work_content = [];
				}
				$item.next("dd").find(".work-experience").each(function(j,jtem){
					var $jtem = $(jtem);
					var time = clearAllHtmlText($jtem.find("p").eq(0).html()).split("--");
					var beginTime = time[0].replace("/","\.").trim();
					var endTime = time[1].replace("/","\.").trim();
					var unit_job = $jtem.find("h6").text().split("|");
					var unit = clearAllHtmlText(unit_job[0]);
					var job = clearAllHtmlText(unit_job[1]);
					var content = clearText($jtem.find("p").eq(2).html());
					resume_work_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_work['content'] = JSON.stringify(resume_work_content);
			} else if(item_name.indexOf("项目经验") !== -1){
				//项目经验
				var resume_project = resume['modules']['resume_project'];
				var resume_project_content = JSON.parse(resume_project['content']);
				if(!resume_project_content){
					resume_project_content = [];
				}
				$item.next("dd").find(".project-experience").each(function(j,jtem){
					var $jtem = $(jtem);
					var time = clearAllHtmlText($jtem.find("p").eq(0).html()).split("--");
					var beginTime = time[0].replace("/","\.").trim();
					var endTime = time[1].replace("/","\.").trim();
					var unit = "";
					var job = clearAllHtmlText($jtem.find("h6").eq(0).html());
					var content = clearAllHtmlText($jtem.find("div").nextAll().eq(0).html() + $jtem.find("div").nextAll().eq(1).html());
					resume_project_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_project['content'] = JSON.stringify(resume_project_content);
			} else if(item_name.indexOf("教育经历") !== -1){
				//教育经历
				var resume_edu = resume['modules']['resume_edu'];
				var resume_edu_content = JSON.parse(resume_edu['content']);
				if(!resume_edu_content){
					resume_edu_content = [];
				}
				$item.next("dd").find(".education-background").each(function(j,jtem){
					var $jtem = $(jtem);
					var time = clearAllHtmlText($jtem.find("p").eq(0).html()).split("--");
					var beginTime = time[0].replace("/","\.").trim();
					var endTime = time[1].replace("/","\.").trim();
					var unit_job = $jtem.find("h6").text().split("|");
					var unit = clearAllHtmlText(unit_job[0]);
					var job = clearAllHtmlText(unit_job[1]);
					var content = null;
					resume_edu_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_edu['content'] = JSON.stringify(resume_edu_content);
			} else if(item_name.indexOf("在校实践经验") !== -1){
				//自定义模块
				var resume_custom = get_resume_module_time(uuid());
				resume_custom['title'] = item_name;
				var resume_custom_content = JSON.parse(resume_custom['content']);
				if(!resume_custom_content){
					resume_custom_content = [];
				}
				$item.next("dd").find(".social").each(function(j,jtem){
					var $jtem = $(jtem);
					var time = clearAllHtmlText($jtem.find("p").eq(0).html()).split("--");
					var beginTime = time[0].replace("/","\.").trim();
					var endTime = time[1].replace("/","\.").trim();
					var unit = "";
					var job = clearAllHtmlText($jtem.find("h6").eq(0).html());
					$jtem.find("p").eq(0).remove();
					$jtem.find("h6").eq(0).remove();
					var content = clearAllHtmlText($jtem.html());
					resume_custom_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_custom['content'] = JSON.stringify(resume_custom_content);
				resume['modules'][resume_custom['key']] = resume_custom;
			} else if(item_name.indexOf("培训经历") !== -1){
				//自定义模块
				var resume_custom = get_resume_module_time(uuid());
				resume_custom['title'] = item_name;
				var resume_custom_content = JSON.parse(resume_custom['content']);
				if(!resume_custom_content){
					resume_custom_content = [];
				}
				$item.next("dd").find(".training").each(function(j,jtem){
					var $jtem = $(jtem);
					var time = clearAllHtmlText($jtem.find("p").eq(0).html()).split("--");
					var beginTime = time[0].replace("/","\.").trim();
					var endTime = time[1].replace("/","\.").trim();
					var unit = "";
					var job = clearAllHtmlText($jtem.find("h6").eq(0).html());
					$jtem.find("p").eq(0).remove();
					$jtem.find("h6").eq(0).remove();
					var content = clearAllHtmlText($jtem.html());
					resume_custom_content.push({
						logo : null,
						beginTime : beginTime,
						endTime : endTime,
						unit : unit,
						job : job,
						content : content,
						tags : null
					});
				});
				resume_custom['content'] = JSON.stringify(resume_custom_content);
				resume['modules'][resume_custom['key']] = resume_custom;
			} else if(item_name.indexOf("证书") !== -1){
				//自定义模块
				var resume_custom = get_resume_module_desc(uuid());
				resume_custom['title'] = item_name;
				var resume_custom_content = JSON.parse(resume_custom['content']);
				if(!resume_custom_content){
					resume_custom_content = {
						'logo' : null,
						'orginLogo' : null,
						'content' : null,
						'tags' : null 
					};
				}
				var content = '';
				$html.find(".details").find(".certificates").each(function(j,jtem){
					var $jtem = $(jtem);
					content+= $jtem.html();
				});
				if(content){
					resume_custom_content['content'] = content;
				}
				resume_custom['content'] = JSON.stringify(resume_custom_content);
				resume['modules'][resume_custom['key']] = resume_custom;
			} else if(item_name.indexOf("专业技能") !== -1){
				var resume_skill = resume['modules']['resume_skill'];
				var resume_skill_content = JSON.parse(resume_skill['content']);
				if(!resume_skill_content){
					resume_skill_content = [];
				}
				$item.next("dd").find(".professional-skill").each(function(j,jtem){
					var $jtem = $(jtem);
					var name = clearAllHtmlText($jtem.html()).split("|")[0].trim();
					var masterLevels = clearAllHtmlText($jtem.html()).split("|");
					var masterLevelDesc = masterLevels[0].trim();
					var masterLevel = getMasterLevel(masterLevels[1]);
					resume_skill_content.push({
						'name' : name,
						'masterLevel' : masterLevel,
						'masterLevelDesc' : masterLevelDesc
					});
				})
				resume_skill['content'] = JSON.stringify(resume_skill_content);
			} else if(item_name.indexOf("获得荣誉") !== -1){
				//奖项荣誉
				var resume_honor = resume['modules']['resume_honor'];
				var resume_honor_content = [];
				var resume_honor_content_item = {
					'logo' : null,
					'orginLogo' : null,
					'logoStyle' : null,
					'content' : null,
					'tags' : null 
				};
				var content = clearText($item.next("dd").html());
				if(content){
					resume_honor['mg']['isShow'] = true;
					resume_honor_content_item['content'] = content
					resume_honor_content.push(resume_honor_content_item);
				}
				resume_honor['content'] = JSON.stringify(resume_honor_content);
			} else {
				//自定义模块
				var resume_custom = get_resume_module_desc(uuid());
				resume_custom['title'] = item_name;
				var resume_custom_content = JSON.parse(resume_custom['content']);
				if(!resume_custom_content){
					resume_custom_content = {
						'logo' : null,
						'orginLogo' : null,
						'content' : null,
						'tags' : null 
					};
				}
				var content = clearText($item.next("dd").html());;
				if(content){
					resume_custom_content['content'] = content;
				}
				resume_custom['content'] = JSON.stringify(resume_custom_content);
				resume['modules'][resume_custom['key']] = resume_custom;
			}
		});
		var return_json = resume_save(resume,itemId,memberId);
		setTimeout(function(){
			$("div.progressbar").find("i").css("width","100%");
			$("div.progressbar").find("span").text("100%");
		},1000);
		setTimeout(function(){
			$("#importRModal").modal("hide");
			if(return_json.flag){
				$("#importRsuccModal").modal("show");
				$("#importRsuccModal").find(".bd a").attr("href",return_json.content);
			}else{
				if(return_json.content.indexOf("已超过最大简历创建数量，请升级会员继续") !== -1){
					//获取对应的提示内容
					common.main.resume_confirm({
						title:"VIP会员升级提示",
						modal_class:"vip-content",
						content:"超出最大创建简历数量，请删除部分简历或升级会员后继续",
						ok:"立即升级",
						onOk:function(){
								window.open("/order/vip_member/");
								setTimeout(function(){
									common.main.resume_confirm({
										title:"支付提示",
										content:"请在你新打开的页面上完成付款，支付完成后，请根据您支付的情况点击下面按钮。",
										ok:"支付完成",
										cancel:"支付遇到问题",
										onOk:function(){
											location.reload();
										},
										onCancel:function(){
											window.open("http://help.500d.me");
										}
									});	
								},1000);
						}
					});	
				}else{
					$("#importResetModal").find(".tips_show").text(return_json.content);
					$("#importResetModal").modal("show");
				}
			}
			hide_pro();
		},2000)
		return;
	}catch(e){
		console.log(e);
		$("#importRModal").modal("hide");
		$("#importResetModal").modal("show");
		$("#importResetModal").find(".tips_show").text("由于文件内容格式错误,导入失败，请重新导入")
	}
}

/**
 * 通过ajax保存简历数据
 * @param resume 解析html简历后封装的数据
 * @param itemId 简历item的id, 固定值设置为"206"
 * @returns {___anonymous36152_36153}
 */
function resume_save(resume,itemId){
	var returnJson = {};
	if(!resume){
		returnJson['flag'] = false;
		returnJson['content'] = '没成功识别导入内容';
		return returnJson;
	}
	$.ajax({
		type : "post",
		cache : false,
		async : false,
		url :  wbdcnf.base + "/newcvresume/save/",
		data : {
			'itemid' : itemId,
			'json' : JSON.stringify(resume)
		},
		success : function(message) {
			if(message.type == "success") {
				var content = JSON.parse(message.content);
				returnJson['flag'] = true;
				//returnJson["resumeTitle"]=resume.resumeTitle;
				returnJson['content'] = '/newcvresume/edit/?itemid=' + content.itemid + '&resumeId=' + content.resumeid;
				common.main.resumeOperationLogUpload(content.resumeid,'importresume','','');//导入简历日志上报
			} else {
				if(message.content.indexOf('未登陆') !== -1){
					window.open(wbdcnf.base + '/login/');
				}else{
					returnJson['flag'] = false;
					returnJson['content'] = message.content;
				}
			}
		}
	});
	return returnJson;
}

/**
 * 获取唯一标识
 */
function uuid() {
    var uuid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random() * 16.0).toString(16);
      uuid += n;
      if(i == 8 || i == 12 || i == 16 || i == 20)
        uuid += "";
    }
    return uuid;    
}
/**
 * 清除所有的HTMl的标签，计算实际内容字数
 */
function clearAllHtmlText(text) {
	if(!text)
		return "";
	text = text.replace(/<[^>]+>/g,"");
	text = text.replace(/[\n]/ig,'');
	text = text.replace(/[\r]/ig,'');
	text = text.replace(/[\t]/ig,'');
	return text;
}
/**
 * 清除一些\n\r等等
 */
function clearText(text) {
	if(!text)
		return "";
	text = text.replace(/[\n]/ig,'');
	text = text.replace(/[\r]/ig,'');
	text = text.replace(/[\t]/ig,'');
	return text;
}
function read_local_file(input,itemid,memberId) {
	var fileContent="";
	var type=$(input).attr("data_type");	//导入的input的data_type中的属性"51job/lagou/zhilian"
	//支持chrome IE10
	if (window.FileReader) {
		var file = input.files[0];
		filename = file.name.split(".")[0];
		var reader = new FileReader();
		reader.onload = function() {
			fileContent=this.result;
			if(type=="lagou"){
				getLagouResumeJson(fileContent,itemid,memberId);
			}else if(type=="zhilian"){
				getZhilianResumeJson(fileContent,itemid,memberId);
			}else if(type=="51job"){
				get51ResumeHtml(fileContent,itemid,memberId);
			}
		}
		if(type=="51job"){
			reader.readAsText(file,'GBK');
		}else{
			reader.readAsText(file);
		}
	} 
	//支持IE 7 8 9 10
	else if (typeof window.ActiveXObject != 'undefined'){
		var xmlDoc; 
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); 
		xmlDoc.async = false; 
		if(type=="51job"){
			xmlDoc.Charset="GBK"; 
		}
		xmlDoc.load(input.value); 
		fileContent=xmlDoc.xml; 
		if(type=="lagou"){
			getLagouResumeJson(fileContent,itemid,memberId);
		}else if(type=="zhilian"){
			getZhilianResumeJson(fileContent,itemid,memberId);
		}else if(type=="51job"){
			get51ResumeHtml(fileContent,itemid,memberId);
		}
	} 
	//支持FF
	else if (document.implementation && document.implementation.createDocument) { 
		var xmlDoc; 
		xmlDoc = document.implementation.createDocument("", "", null); 
		xmlDoc.async = false; 
		if(type=="51job"){
			xmlDoc.Charset="GBK"; 
		}
		xmlDoc.load(input.value); 
		fileContent=xmlDoc.xml;
		if(type=="lagou"){
			getLagouResumeJson(fileContent,itemid,memberId);
		}else if(type=="zhilian"){
			getZhilianResumeJson(fileContent,itemid,memberId);
		}else if(type=="51job"){
			get51ResumeHtml(fileContent,itemid,memberId);
		}
	} else { 
		layer.msg("上传出错") 
	}
}
function init_resume(){
	return {
		"title": null,
		"attr": {
			"language": "zh",
			"background": "{\"img\":\"https://file.500d.me/upload/work_order/201908/29/80bb946f-c9c6-4ae6-b30b-d127042395b8.png\",\"originImg\":\"https://file.500d.me/upload/work_order/201908/29/80bb946f-c9c6-4ae6-b30b-d127042395b8.png\"}",
			"color": "j2",
			"font": "yahei",
			"fontSize": "14",
			"pageMargin": "1",
			"margin": "1",
			"fontType": "0",
			"isPagingHidden": false,
			"modulesSort": null,
			"wapModulesSort": null
		},
		"modules": {
			"resume_cover": {
				"key": "resume_cover",
				"title": "封面",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": null,
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_letter": {
				"key": "resume_letter",
				"title": "自荐信",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": null,
					"style": null,
					"format": null,
				},
				"content": null
			},
			"resume_head": {
				"key": "resume_head",
				"title": "头像",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"img\":\"/resources/500d/cvresume/images/1.jpg\",\"orginImg\":null,\"style\":\"rectangle\"}"
			},
			"base_info": {
				"key": "base_info",
				"title": "基本信息",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"birth\":null,\"age\":null,\"jobYear\":null,\"mobile\":null,\"email\":null,\"custom\":null,\"sex\":null,\"education\":null,\"nation\":null,\"city\":null,\"cityName\":null,\"marriageStatus\":null,\"politicalStatus\":null,\"height\":null,\"weight\":null,\"birthIcon\":\"\",\"jobYearIcon\":\"\",\"mobileIcon\":\"\",\"emailIcon\":\"\",\"sexIcon\":\"\",\"educationIcon\":\"\",\"nationIcon\":\"\",\"cityIcon\":\"\",\"marriageStatusIcon\":\"\",\"politicalStatusIcon\":\"\",\"heightIcon\":\"\",\"weightIcon\":\"\"}"
			},
			"resume_name": {
				"key": "resume_name",
				"title": "姓名",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"name\":null,\"minSummary\":null,\"isMinSummaryShow\":true}"
			},
			"resume_job_preference": {
				"key": "resume_job_preference",
				"title": "求职意向",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"jobFunction\":null,\"jobCity\":null,\"jobCityName\":null,\"jobTime\":null,\"jobSalarySystem\":\"Month\",\"jobMinSalary\":null,\"jobMaxSalary\":null,\"jobFunctionIcon\":\"\",\"jobCityIcon\":\"\",\"jobTimeIcon\":\"\",\"jobSalaryIcon\":\"\"}"
			},
			"resume_edu": {
				"key": "resume_edu",
				"title": "教育背景",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_work": {
				"key": "resume_work",
				"title": "工作经验",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_internship": {
				"key": "resume_internship",
				"title": "校园活动",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_project": {
				"key": "resume_project",
				"title": "项目经验",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_summary": {
				"key": "resume_summary",
				"title": "自我评价",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"logo\":null,\"orginLogo\":null,\"content\":\"\",\"tags\":null}",
				"tags": []
			},
			"resume_honor": {
				"key": "resume_honor",
				"title": "奖项荣誉",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"logo\":null,\"orginLogo\":null,\"content\":\"\",\"tags\":null}",
				"tags": []
			},
			"resume_skill": {
				"key": "resume_skill",
				"title": "技能特长",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_language": {
				"key": "resume_language",
				"title": null,
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": null,
					"style": null,
					"format": null,
				},
				"content": "[]"
			},
			"resume_portfolio": {
				"key": "resume_portfolio",
				"title": "作品展示",
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": "full_column",
				},
				"content": "{\"img\":[],\"link\":[]}"
			},
			"resume_qrcode": {
				"key": "resume_qrcode",
				"title": "二维码",
				"mg": {
					"isShow": false,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": "",
					"style": null,
					"format": null,
				},
				"content": "{\"point\":null,\"width\":null,\"img\":null,\"tips\":\"扫码查看\"}"
			},
			"resume_school_element": {
				"key": "resume_school_element",
				"title": null,
				"mg": {
					"isShow": true,
					"isTitleShow": true,
					"isTimeShow": true,
					"isContentShow": true,
					"isLogoShow": false,
					"icon": null,
					"style": null,
					"format": null,
				},
				"content": "[]"
			}
		}
	}
}

function hide_pro(){
	setTimeout(function(){
		$("div.progressbar").fadeOut("slow");
	},1000);
	setTimeout(function(){
		$("div.progressbar").find("i").css("width","0%");
		$("div.progressbar").find("span").text("0%");
	},2000);
}

/** 通过数字的字符串形式, 转换成英文 */
function getJobYear(jobYear){
	switch (jobYear)
	{
	case "1":
		return "one";
	case "2":
		return "two";
	case "3":
		return "three";
	case "4":
		return "four";
	case "5":
		return "five";
	case "6":
		return "six";
	case "7":
		return "seven";
	case "8":
		return "eight";
	case "9":
		return "nine";
	case "10":
		return "ten";
	}
}

/** 获取技能/语言等级中文对应的英文 */
function getMasterLevel(masterLevel){
	//average:一般,good:良好,advanced:熟练,expert:精通
	switch (masterLevel.trim())
	{
	case "一般":
	case "了解":
		return "average";
	case "良好":
	case "熟悉":
		return "good";
	case "熟练":
	case "掌握":
		return "advanced";
	case "精通":
	case "专家":
		return "expert";
	}
}

/** 入职时间转换 */
function getJobTime(jobTime){
	switch (jobTime.trim())
	{
	case "随时":
		jobTime="immediately";
	  break;
	case "1周内":
		jobTime="withinOneWeek";
	  break;
	case "1个月内":
		jobTime="withinOneMonth";
	  break;
	case "3个月内":
		jobTime="withinThreemonth";
	  break;
	case "待定":
		jobTime="toBeDetermined";
	  break;
	}
}

/** 性别转换 */
function getSex(sex){
	return sex.indexOf("女") !== -1 ? 'female' : 'male'
}

/** 婚姻状态转换 */
	//婚姻状态
function getMarriageStatus(status){
    switch(status.trim()){
        case "未婚":
            return "unMarried";
        case "已婚":
            return "married";
        case "保密":
            return "privary";
    }
}

/** 政治角色转换 */
function getPoliticalStatus(status){
	switch(status.trim()){
		case "中共党员":
		case "中共党员(含预备党员)":
			return "partyMember";
		case "共青团员":
		case "团员":
			return "leagueMember";
		case "民主党派人士":
		case "民主党派":
			return "democraticParty";
		case "无党派民主人士":
		case "无党派人士":
			return "noParty";
		default:
			return "citizen";
	}
}

/** 工作类型转换 */
function getJobType(jobType){
	if(jobType == undefined){
		return "fullTime";
	}
	switch (jobType.trim())
	{
	case "全职":
	  return "fullTime";
	case "兼职":
	  return "partTime";
	case "实习":
	  return "intern";
	default:
	  return "fullTime";
	}
}

/** 获取自定义描述模块 **/
function get_resume_module_desc(key){
	return {
		'key' : key,
		'title' : null,
		'mg': {
			'isShow': true,
			'isTitleShow': true,
			'isTimeShow': true,
			'isContentShow': true,
			'isLogoShow': false,
			'icon': null,
			'style': null,
			'format': null,
			'margin': null
		},
		'content' : '{"logo":null,"orginLogo":null,"content":"","tags":null}',
		'tags' : null
	}
}

/** 获取自定义时间模块 **/
function get_resume_module_time(key){
	return {
		'key' : key,
		'title' : null,
		'mg': {
			'isShow': true,
			'isTitleShow': true,
			'isTimeShow': true,
			'isContentShow': true,
			'isLogoShow': false,
			'icon': null,
			'style': null,
			'format': null,
			'margin': null
		},
		'content' : '[]',
		'tags' : null
	}
}