/**
 * 新版编辑器通用js文件
 * newCommon.info:存放全局通用属性
 */
var newCommon = newCommon || {};
newCommon.main = newCommon.main || {};
// 全局参数绑定
newCommon.info = {
};
newCommon.main = {
    // 编辑页功能区域初始化
    function_panel_event: function () {
        var $body = $('.wbdCv-editorBody');
        var $container = $body.find('.wbdCv-container');
        var $editor = $body.find('.wbdCv-baseStyle');
        var $panel = $('.function_panel');
        var $panel_modal = $panel.find('.panel_item');
        var mobile_adapt = function () {
            if ($container.hasClass('mobile')) {
                var mobile_resume_height = $container.height();
                var body_height = $('body').height() - 50;
                body_height = body_height <= 750 ? 750 : body_height;
                $container.css({
                    'margin': ((body_height - mobile_resume_height) / 2) + 'px auto 0',
                    'opacity': 1,
                });
                // 诊断隐藏（手机简历不支持诊断）
                $panel.find('.contraction_panel .diagnose').hide();
                $panel.find('.diagnose_defalut').hide();
                $panel.css('top', $container[0].getBoundingClientRect().top);
            }
        }
        var adapt_init = function () {
            var base_width = 1240;
            var radio = 240 / base_width;
            var window_w = $(window).width();
            // 简历编辑区域居中计算
            if ($panel.hasClass('open')){
                var function_panel_width = Math.floor(window_w > base_width ? window_w * radio : base_width * radio);
                $panel_modal.css({
                    'width': function_panel_width,
                });
                // 手机模式不触发
                if (!$container.hasClass('mobile')) {
                    $editor.css({
                        'left': -(function_panel_width / 2) + 35,
                    });
                }
            } else {
                if (!$container.hasClass('mobile')) {
                    $editor.css({
                        'left': '35px',
                    });
                }
            }
            mobile_adapt();
        }
        common.main.function_panel_initial();
        adapt_init();
        // 位置计算
        $(window).resize(adapt_init);
        // 打开诊断面板
        $panel.find('.contraction_panel .diagnose').on('click', function() {
            $panel.addClass('open');
            $panel.find('.start_diagnose').trigger('click');
            adapt_init();
        });
        // 打开贴士面板
        $panel.find('.contraction_panel .tips').on('click', function() {
            $panel.addClass('open');
            $panel.find('.tips_case_panel').show();
            $panel.find('.panel_tips').show();
            $panel.find('.tips_case_panel .navi .tips').addClass('current');
            adapt_init();
        });
        // 打开案例面板
        $panel.find('.contraction_panel .case').on('click', function() {
            $panel.addClass('open');
            $panel.find('.tips_case_panel').show();
            $panel.find('.panel_case').show();
            $panel.find('.tips_case_panel .navi .case').addClass('current');
            adapt_init();
        });
        // 贴士&案例面板切换
        $('.tips_case_panel .navi a').on('click', function(e) {
            var $target = $(e.target);
            if ($target.hasClass('current')) {
                return;
            }
            $target.addClass('current').siblings().removeClass('current');
            if ($target.hasClass('case')) {
                $panel.find('.panel_case').show();
                $panel.find('.panel_tips').hide();
            }
            if ($target.hasClass('tips')) {
                $panel.find('.panel_tips').show();
                $panel.find('.panel_case').hide();
            }
        });
        // 面板关闭
        $panel.find('.panel_item .close_panel').on('click', function (e) {
            $panel.removeClass('open');
            $panel.find('.panel_item').hide();
            $panel.find('.panel_case').hide();
            $panel.find('.panel_tips').hide();
            $panel.find('.navi a').removeClass('current');
            adapt_init();
        });
    },
};
$(function () {
});