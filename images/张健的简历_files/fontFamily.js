/**
 * font-family 集合
 * family  ----------> 在线字体面板的字体数据，包含所有的字体
 * family_theme -----> 主题面板的字体数据
 * art --------------> 艺术字模板
 * family_arr() -----> 将在线字体整合到一个数组中
 * search_exact -----> 精确搜索字体，返回对象
 * search_dim -------> 模糊搜索字体，返回数组
 */
var fontFamily = fontFamily || {};
fontFamily.main = fontFamily.main || {};
// 所有的字体
fontFamily.family = [{
    lang: 'cn',
    item: [{
            show: true,
            name: '微软雅黑',
            data: 'Microsoft YaHei',
            image: '/resources/500d/font/images/微软雅黑.png',
            loading: false,
            childrenList: [{
                show: true,
                name: '微软雅黑-细体',
                alias: 'Light',
                data: 'Microsoft YaHei Light',
                loading: false,
            }, {
                show: true,
                name: '微软雅黑',
                alias: 'Normal',
                data: 'Microsoft YaHei',
                loading: false,
            }]
        }, {
            show: true,
            name: '宋体',
            data: 'SimSun',
            image: '/resources/500d/font/images/宋体.png',
            loading: false,
        }, {
            show: true,
            name: '楷体',
            data: 'KaiTi',
            image: '/resources/500d/font/images/楷体.png',
            loading: false,
        }, {
            show: true,
            name: '黑体',
            data: 'simhei',
            image: '/resources/500d/font/images/黑体.png',
            loading: false,
        }, {
            show: true,
            name: '等线',
            data: '等线',
            image: '/resources/500d/font/images/等线.png',
            loading: false,
        }, {
            show: true,
            name: '幼圆体',
            data: 'woodo-QingNingYouYuan',
            image: '/resources/500d/font/images/幼圆.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-QingNingYouYuan.woff',
            loading: false,
        }, {
            show: true,
            name: '站酷酷黑体',
            data: 'woodo-ZhanKuKuHei',
            image: '/resources/500d/font/images/站酷酷黑体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuKuHei.woff',
            loading: false,
        }, {
            show: false,
            name: '文泉驿正黑',
            data: 'woodo-WenQuanZhengHei',
            image: '/resources/500d/font/images/文泉驿正黑.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-WenQuanZhengHei.woff',
            loading: false,
        }, {
            show: false,
            name: '方正黑体简体',
            data: 'woodo-FangZhengHeiTiJianTi',
            image: '/resources/500d/font/images/方正黑体简体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-FangZhengHeiTiJianTi.woff',
            loading: false,
        }, {
            show: false,
            name: '方正仿宋简体',
            data: 'woodo-FangZhengFangSongJianTi',
            image: '/resources/500d/font/images/方正仿宋简体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-FangZhengFangSongJianTi.woff',
            loading: false,
        }, {
            show: false,
            name: '方正楷体简体',
            data: 'woodo-FangZhengKaiTiJianTi',
            image: '/resources/500d/font/images/方正楷体简体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-FangZhengKaiTiJianTi.woff',
            loading: false,
        }, {
            show: true,
            name: '包图小白体',
            data: 'woodo-baotuxiaobaiti',
            image: '/resources/500d/font/images/包图小白体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-baotuxiaobaiti.woff',
            loading: false,
        }, {
            show: false,
            name: '刻石录颜体',
            data: 'woodo-INgaan',
            image: '/resources/500d/font/images/刻石录颜体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-INgaan.woff',
            loading: false,
        }, {
            show: false,
            name: '濑户字体',
            data: 'woodo-SetoFont',
            image: '/resources/500d/font/images/濑户字体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-SetoFont.woff',
            loading: false,
        }, {
            show: false,
            name: '说文解字',
            data: 'woodo-EBAS',
            image: '/resources/500d/font/images/EBAS.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-EBAS.woff',
            loading: false,
        }, {
            show: false,
            name: '台湾正宋体',
            data: 'woodo-TW-Sung',
            image: '/resources/500d/font/images/TW-Sung.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-TW-Sung.woff',
            loading: false,
        }, {
            show: true,
            name: '杨任东竹石体',
            data: 'woodo-YRDZST-Light',
            image: '/resources/500d/font/images/杨任东竹石体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Light.woff',
            loading: false,
            checked: false,
            childrenList: [{
                show: true,
                name: '杨任东竹石体-Light',
                data: 'woodo-YRDZST-Light',
                alias: 'Light',
                image: '/resources/500d/font/images/杨任东竹石体-Light.png',
                url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Light.woff',
                loading: false,
                checked: false,
            }, {
                show: true,
                name: '杨任东竹石体-Regular',
                data: 'woodo-YRDZST-Regular',
                alias: 'Regular',
                image: '/resources/500d/font/images/杨任东竹石体-Regular.png',
                url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Regular.woff',
                loading: false,
                checked: false,
            }, {
                show: true,
                name: '杨任东竹石体-Semibold',
                data: 'woodo-YRDZST-Semibold',
                alias: 'Semibold',
                image: '/resources/500d/font/images/杨任东竹石体-Semibold.png',
                url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Semibold.woff',
                loading: false,
                checked: false,
            }]
        }, {
            show: true,
            name: '手書き雑フォント',
            data: 'woodo-851tegakizatsu',
            image: '/resources/500d/font/images/手書き雑フォント.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-851tegakizatsu.woff',
            loading: false,
        }, {
            show: true,
            name: '沐瑶软笔手写体',
            data: 'woodo-Muyao-Softbrush',
            image: '/resources/500d/font/images/沐瑶软笔手写体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-Muyao-Softbrush.woff',
            loading: false,
        }, {
            show: true,
            name: '思源黑体',
            alias: 'ExtraLight',
            data: 'woodo-SourceHanSansCN-ExtraLight',
            image: '/resources/500d/font/images/思源黑体-ExtraLight.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-ExtraLight.woff',
            loading: false,
            childrenList: [{
                show: true,
                name: '思源黑体-ExtraLight',
                alias: 'ExtraLight',
                data: 'woodo-SourceHanSansCN-ExtraLight',
                image: '/resources/500d/font/images/思源黑体-ExtraLight.png',
                url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-ExtraLight.woff',
                loading: false,
            }, {
                show: true,
                name: '思源黑体-Light',
                alias: 'Light',
                data: 'woodo-SourceHanSansCN-Light',
                image: '/resources/500d/font/images/思源黑体-Light.png',
                url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-Light.woff',
                loading: false,
            }, {
                show: true,
                name: '思源黑体-Heavy',
                alias: 'Heavy',
                data: 'woodo-SourceHanSansCN-Heavy',
                image: '/resources/500d/font/images/思源黑体-Heavy.png',
                url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-Heavy.woff',
                loading: false,
            }]
        }, {
            show: true,
            name: '思源宋体',
            alias: 'Light',
            data: 'woodo-SourceHanSans-Simsun-Light',
            image: '/resources/500d/font/images/思源宋体-Light.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-Light.woff',
            loading: false,
            childrenList: [
                {
                    show: true,
                    name: '思源宋体-Light',
                    alias: 'Light',
                    data: 'woodo-SourceHanSans-Simsun-Light',
                    image: '/resources/500d/font/images/思源宋体-Light.png',
                    url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-Light.woff',
                    loading: false,
                }, {
                    show: true,
                    name: '思源宋体-SemiBold',
                    alias: 'SemiBold',
                    data: 'woodo-SourceHanSans-Simsun-SemiBold',
                    image: '/resources/500d/font/images/思源宋体-SemiBold.png',
                    url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-SemiBold.woff',
                    loading: false,
                }, {
                    show: true,
                    name: '思源宋体-Heavy',
                    alias: 'Heavy',
                    data: 'woodo-SourceHanSans-Simsun-Heavy',
                    image: '/resources/500d/font/images/思源宋体-Heavy.png',
                    url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-Heavy.woff',
                    loading: false,
                }
            ]
        }, {
            show: true,
            name: '汉仪力量黑简',
            data: 'woodo-HanYiLiLiangHeiJian',
            image: '/resources/500d/font/images/汉仪力量黑简.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HanYiLiLiangHeiJian.woff',
            loading: false,
        }, {
            show: true,
            name: '汉仪润圆',
            data: 'woodo-HYRunYuan',
            image: '/resources/500d/font/images/汉仪润圆.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HYRunYuan.woff',
            loading: false,
        }, {
            show: true,
            name: '郑庆科黄油体',
            data: 'woodo-ZhengQingKeHuangYouTi',
            image: '/resources/500d/font/images/郑庆科黄油体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhengQingKeHuangYouTi.woff',
            loading: false,
        }, {
            show: true,
            name: '汉鼎简美黑',
            data: 'woodo-HanDingJianMeiHei',
            image: '/resources/500d/font/images/汉鼎简美黑.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianMeiHei.woff',
            loading: false,
        }, {
            show: true,
            name: '汉鼎简特圆',
            data: 'woodo-HanDingJianTeYuan',
            image: '/resources/500d/font/images/汉鼎简特圆.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianTeYuan.woff',
            loading: false,
        }, {
            show: true,
            name: '汉鼎简行楷',
            data: 'woodo-HanDingJianXingKai',
            image: '/resources/500d/font/images/汉鼎简行楷.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianXingKai.woff',
            loading: false,
        }, {
            show: true,
            name: '汉鼎简新艺体',
            data: 'woodo-HanDingJianXinYiTi',
            image: '/resources/500d/font/images/汉鼎简新艺体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianXinYiTi.woff',
            loading: false,
        }, {
            show: false,
            name: '懷访體',
            data: 'woodo-HuaiFangTi',
            image: '/resources/500d/font/images/懷访體.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HuaiFangTi.woff',
            loading: false,
        }, {
            show: false,
            name: '日本青柳隷书',
            data: 'woodo-japan-aoyagireisyosimo',
            image: '/resources/500d/font/images/日本青柳隷书.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-japan-aoyagireisyosimo.woff',
            loading: false,
        }, {
            show: false,
            name: '日文毛笔',
            data: 'woodo-japan-RiWenMaoBiZiTi',
            image: '/resources/500d/font/images/日文毛笔.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-japan-RiWenMaoBiZiTi.woff',
            loading: false,
        }, {
            show: true,
            name: '庞门正道标题体',
            data: 'woodo-PangMenZhengDaoBiaoTiTi',
            image: '/resources/500d/font/images/庞门正道标题体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-PangMenZhengDaoBiaoTiTi.woff',
            loading: false,
        }, {
            show: true,
            name: '锐字真言体',
            data: 'woodo-RuiZiZhenYanTi',
            image: '/resources/500d/font/images/锐字真言体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-RuiZiZhenYanTi.woff',
            loading: false,
        }, {
            show: false,
            name: '思源真黑',
            data: 'woodo-GenShinGothic-Normal',
            image: '/resources/500d/font/images/思源真黑-Normal.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-GenShinGothic-Normal.woff',
            loading: false,
        }, {
            show: false,
            name: '思源柔黑',
            data: 'woodo-GenJyuuGothic-Normal',
            image: '/resources/500d/font/images/思源柔黑-Normal.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-GenJyuuGothic-Normal.woff',
            loading: false,
        }, {
            show: false,
            name: '王汉宗魏碑体',
            data: 'woodo-WangHanZongWeiBeiTiYi',
            image: '/resources/500d/font/images/王汉宗魏碑体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-WangHanZongWeiBeiTiYi.woff',
            loading: false,
        }, {
            show: false,
            name: '王汉宗勘亭流',
            data: 'woodo-WangHanZongKanTingLiuFan',
            image: '/resources/500d/font/images/王汉宗勘亭流.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-WangHanZongKanTingLiuFan.woff',
            loading: false,
        }, {
            show: false,
            name: '王汉宗超明体',
            data: 'woodo-WangHanZongChaoMingTiFan',
            image: '/resources/500d/font/images/王汉宗超明体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-WangHanZongChaoMingTiFan.woff',
            loading: false,
        }, {
            show: false,
            name: '装甲明朝体',
            data: 'woodo-SoukouMincho',
            image: '/resources/500d/font/images/装甲明朝体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-SoukouMincho.woff',
            loading: false,
        }, {
            show: false,
            name: '源界明朝体',
            data: 'woodo-Genkaimincho',
            image: '/resources/500d/font/images/源界明朝体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-Genkaimincho.woff',
            loading: false,
        }, {
            show: false,
            name: '超极细ゴシック体',
            data: 'woodo-Chogokuboso-Gothic',
            image: '/resources/500d/font/images/超极细ゴシック体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-Chogokuboso-Gothic.woff',
            loading: false,
        }, {
            show: true,
            name: '站酷文艺体',
            data: 'woodo-ZhanKuWenYi',
            image: '/resources/500d/font/images/站酷文艺体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuWenYi.woff',
            loading: false,
        }, {
            show: true,
            name: '站酷高端黑体',
            data: 'woodo-ZhanKuGaoDuanHei',
            image: '/resources/500d/font/images/站酷高端黑体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuGaoDuanHei.woff',
            loading: false,
        }, {
            show: true,
            name: '站酷快乐体',
            data: 'woodo-ZhanKuKuaiLe',
            image: '/resources/500d/font/images/站酷快乐体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuKuaiLe.woff',
            loading: false,
        }, {
            show: true,
            name: '站酷小薇logo体',
            data: 'woodo-ZhanKuXiaoWeiLOGO',
            image: '/resources/500d/font/images/站酷小薇logo体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuXiaoWeiLOGO.woff',
            loading: false,
        }, {
            show: true,
            name: '庞门正道轻松体',
            data: 'woodo-PangMenZhengDaoQingSongTi',
            image: '/resources/500d/font/images/庞门正道轻松体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-PangMenZhengDaoQingSongTi.otf',
            loading: false,
        }, {
            show: true,
            name: '庞门正道粗书体',
            data: 'woodo-PangMenZhengDaoCuShuTi',
            image: '/resources/500d/font/images/庞门正道粗书体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-PangMenZhengDaoCuShuTi.woff',
            loading: false,
        }, {
            show: true,
            name: '优设标题黑',
            data: 'woodo-YouSheBiaoTiHei',
            image: '/resources/500d/font/images/优设标题黑.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-YouSheBiaoTiHei.woff',
            loading: false,
        }, {
            show: true,
            name: '胡晓波男神体',
            data: 'woodo-HuXiaoBoNanShenTi',
            image: '/resources/500d/font/images/胡晓波男神体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HuXiaoBoNanShenTi.otf',
            loading: false,
        }, {
            show: true,
            name: '胡晓波真帅体',
            data: 'woodo-HuXiaoBoZhenShuaiTi',
            image: '/resources/500d/font/images/胡晓波真帅体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HuXiaoBoZhenShuaiTi.otf',
            loading: false,
        }, {
            show: true,
            name: '联盟起艺卢帅正锐黑体',
            data: 'woodo-LianMengQIYiLuShuaiZhengRuiHeiTi',
            image: '/resources/500d/font/images/联盟起艺卢帅正锐黑体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-LianMengQIYiLuShuaiZhengRuiHeiTi.woff',
            loading: false,
        }, {
            show: true,
            name: '问藏书房',
            data: 'woodo-WenZangShuFang',
            image: '/resources/500d/font/images/问藏书房.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-WenZangShuFang.woff',
            loading: false,
        }, {
            show: true,
            name: '江西拙楷',
            data: 'woodo-JiangXiZhuoKai',
            image: '/resources/500d/font/images/江西拙楷.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-JiangXiZhuoKai.woff',
            loading: false,
        }, {
            show: true,
            name: '卓健橄榄简体',
            data: 'woodo-ZhuoJianGanLanJianTi',
            image: '/resources/500d/font/images/卓健橄榄简体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZhuoJianGanLanJianTi.woff',
            loading: false,
        }, {
            show: true,
            name: '清松手写体',
            data: 'woodo-QingSongShouXieTi',
            image: '/resources/500d/font/images/清松手写体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-QingSongShouXieTi.woff',
            loading: false,
        }, {
            show: true,
            name: '峰广明锐体',
            data: 'woodo-FengGuangMingRuiTi',
            image: '/resources/500d/font/images/峰广明锐体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-FengGuangMingRuiTi.woff',
            loading: false,
        }, {
            show: true,
            name: '鸿雷板书简体',
            data: 'woodo-HongLeiBanShuTi',
            image: '/resources/500d/font/images/鸿雷板书简体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-HongLeiBanShuTi.woff',
            loading: false,
        }, {
            show: true,
            name: '演示佛系体',
            data: 'woodo-YanShifoXiTi',
            image: '/resources/500d/font/images/演示佛系体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-YanShifoXiTi.woff',
            loading: false,
        }, {
            show: true,
            name: '演示悠然小楷',
            data: 'woodo-YanShiYouRanXiaoKai',
            image: '/resources/500d/font/images/演示悠然小楷.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-YanShiYouRanXiaoKai.woff',
            loading: false,
        }, {
            show: true,
            name: '字体圈欣意冠黑体',
            data: 'woodo-ZiTiQuanXinYiGuanHeiTi',
            image: '/resources/500d/font/images/字体圈欣意冠黑体.png',
            url: 'https://file.woodo.cn/upload/fonts/woodo-ZiTiQuanXinYiGuanHeiTi.woff',
            loading: false,
    }],
}, {
    lang: 'en',
    item: [{
        show: true,
        name: 'IMPACT',
        data: 'Impact',
        image: '/resources/500d/font/images/Impact.png',
        loading: false,
    }, {
        show: true,
        name: 'Arial',
        data: 'Arial',
        image: '/resources/500d/font/images/Arial.png',
        loading: false,
    }, {
        show: true,
        name: 'Calibri',
        data: 'Calibri',
        image: '/resources/500d/font/images/Calibri.png',
        loading: false,
    }, {
        show: true,
        name: 'Cambria',
        data: 'Cambria',
        image: '/resources/500d/font/images/Cambria.png',
        loading: false,
    }, {
        show: true,
        name: 'Ebrima',
        data: 'Ebrima',
        image: '/resources/500d/font/images/Ebrima.png',
        loading: false,
    }, {
        show: true,
        name: 'Georgia',
        data: 'Georgia',
        image: '/resources/500d/font/images/Georgia.png',
        loading: false,
    }, {
        show: true,
        name: 'MV Boli',
        data: 'MV Boli',
        image: '/resources/500d/font/images/MV-Boli.png',
        loading: false,
    }, {
        show: true,
        name: 'Verdana',
        data: 'Verdana',
        image: '/resources/500d/font/images/Verdana.png',
        loading: false,
    }, {
        show: true,
        name: 'Segoe UI',
        data: 'Segoe UI',
        image: '/resources/500d/font/images/Segoe-UI.png',
        loading: false,
    }, {
        show: true,
        name: 'Sylfaen',
        data: 'Sylfaen',
        image: '/resources/500d/font/images/Sylfaen.png',
        loading: false,
    }, {
        show: true,
        name: 'Lineton Sans',
        data: 'woodo-Lineton-Sans',
        image: '/resources/500d/font/images/Lineton-Sans.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Lineton-Sans.woff',
        loading: false,
    }, {
        show: true,
        name: 'Lineton Slab',
        data: 'woodo-Lineton-Slab',
        image: '/resources/500d/font/images/Lineton-Slab.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Lineton-Slab.woff',
        loading: false,
    }, {
        show: true,
        name: 'Kiona',
        data: 'woodo-Kiona-Regular',
        image: '/resources/500d/font/images/Kiona.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Kiona-Regular.woff',
        loading: false,
    }, {
        show: true,
        name: 'Royal Twins',
        data: 'woodo-Royal-Twins',
        image: '/resources/500d/font/images/Royal-Twins.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Royal-Twins.woff',
        loading: false,
    }, {
        show: true,
        name: 'Reman',
        data: 'woodo-Reman',
        image: '/resources/500d/font/images/Reman.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Reman.woff',
        loading: false,
    }, {
        show: true,
        name: 'Apalu',
        data: 'woodo-Apalu',
        image: '/resources/500d/font/images/Apalu.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Apalu.woff',
        loading: false,
    }, {
        show: true,
        name: 'Stay Classy SLDT',
        data: 'woodo-Stay-Classy-SLDT',
        image: '/resources/500d/font/images/Stay-Classy-SLDT.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Stay-Classy-SLDT.woff',
        loading: false,
    }, {
        show: true,
        name: 'Saltery Alternate',
        data: 'woodo-Saltery-Alternate',
        image: '/resources/500d/font/images/Saltery-Alternate.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Saltery-Alternate.woff',
        loading: false,
    }, {
        show: true,
        name: 'Quantum',
        data: 'woodo-Quantum',
        image: '/resources/500d/font/images/Quantum.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Quantum.woff',
        loading: false,
    }, {
        show: true,
        name: 'Franca',
        data: 'woodo-FrancaBook',
        image: '/resources/500d/font/images/Franca.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-FrancaBook.woff',
        loading: false,
    }, {
        show: true,
        name: 'Asap BoldItalic',
        data: 'woodo-Asap-BoldItalic',
        image: '/resources/500d/font/images/Asap-BoldItalic.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Asap-BoldItalic.woff',
        loading: false,
    }, {
        show: true,
        name: 'Barrio Regular',
        data: 'woodo-Barrio-Regular',
        image: '/resources/500d/font/images/Barrio-Regular.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Barrio-Regular.woff',
        loading: false,
    }, {
        show: true,
        name: 'blowbrush',
        data: 'woodo-blowbrush',
        image: '/resources/500d/font/images/blowbrush.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-blowbrush.woff',
        loading: false,
    }, {
        show: true,
        name: 'lot',
        data: 'woodo-lot',
        image: '/resources/500d/font/images/lot.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-lot.woff',
        loading: false,
    }, {
        show: true,
        name: 'Seaside Resort NF',
        data: 'woodo-Seaside-Resort-NF',
        image: '/resources/500d/font/images/Seaside-Resort-NF.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Seaside-Resort-NF.woff',
        loading: false,
    }, {
        show: true,
        name: 'Times-New-Romance',
        data: 'woodo-Times-New-Romance',
        image: '/resources/500d/font/images/Times-New-Romance.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Times-New-Romance.woff',
        loading: false,
    }]
}];
// 主题区域的字体
fontFamily.family_theme = [{
        show: true,
        name: '微软雅黑',
        data: 'yahei',
        image: '/resources/500d/font/images/微软雅黑.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '宋体',
        data: 'songti',
        image: '/resources/500d/font/images/宋体.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '楷体',
        data: 'kaiti',
        image: '/resources/500d/font/images/楷体.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '黑体',
        data: 'heiti',
        image: '/resources/500d/font/images/黑体.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '等线',
        data: '等线',
        image: '/resources/500d/font/images/等线.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'IMPACT',
        data: 'Impact',
        image: '/resources/500d/font/images/Impact.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Arial',
        data: 'Arial',
        image: '/resources/500d/font/images/Arial.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Calibri',
        data: 'Calibri',
        image: '/resources/500d/font/images/Calibri.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Cambria',
        data: 'Cambria',
        image: '/resources/500d/font/images/Cambria.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Ebrima',
        data: 'Ebrima',
        image: '/resources/500d/font/images/Ebrima.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Georgia',
        data: 'Georgia',
        image: '/resources/500d/font/images/Georgia.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'MV Boli',
        data: 'MV Boli',
        image: '/resources/500d/font/images/MV-Boli.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Verdana',
        data: 'Verdana',
        image: '/resources/500d/font/images/Verdana.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Segoe UI',
        data: 'Segoe UI',
        image: '/resources/500d/font/images/Segoe-UI.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Sylfaen',
        data: 'Sylfaen',
        image: '/resources/500d/font/images/Sylfaen.png',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '幼圆体',
        data: 'woodo-QingNingYouYuan',
        image: '/resources/500d/font/images/幼圆.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-QingNingYouYuan.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '站酷酷黑体',
        data: 'woodo-ZhanKuKuHei',
        image: '/resources/500d/font/images/站酷酷黑体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuKuHei.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '文泉驿正黑',
        data: 'woodo-WenQuanZhengHei',
        image: '/resources/500d/font/images/文泉驿正黑.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-WenQuanZhengHei.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '方正黑体简体',
        data: 'woodo-FangZhengHeiTiJianTi',
        image: '/resources/500d/font/images/方正黑体简体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-FangZhengHeiTiJianTi.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '方正仿宋简体',
        data: 'woodo-FangZhengFangSongJianTi',
        image: '/resources/500d/font/images/方正仿宋简体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-FangZhengFangSongJianTi.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '方正楷体简体',
        data: 'woodo-FangZhengKaiTiJianTi',
        image: '/resources/500d/font/images/方正楷体简体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-FangZhengKaiTiJianTi.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '包图小白体',
        data: 'woodo-baotuxiaobaiti',
        image: '/resources/500d/font/images/包图小白体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-baotuxiaobaiti.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '刻石录颜体',
        data: 'woodo-INgaan',
        image: '/resources/500d/font/images/刻石录颜体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-INgaan.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '濑户字体',
        data: 'woodo-SetoFont',
        image: '/resources/500d/font/images/濑户字体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SetoFont.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '说文解字',
        data: 'woodo-EBAS',
        image: '/resources/500d/font/images/EBAS.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-EBAS.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '台湾正宋体',
        data: 'woodo-TW-Sung',
        image: '/resources/500d/font/images/TW-Sung.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-TW-Sung.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '杨任东竹石体-Light',
        data: 'woodo-YRDZST-Light',
        image: '/resources/500d/font/images/杨任东竹石体-Light.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Light.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '杨任东竹石体-Regular',
        data: 'woodo-YRDZST-Regular',
        image: '/resources/500d/font/images/杨任东竹石体-Regular.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Regular.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '杨任东竹石体-Semibold',
        data: 'woodo-YRDZST-Semibold',
        image: '/resources/500d/font/images/杨任东竹石体-Semibold.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-YRDZST-Semibold.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '手書き雑フォント',
        data: 'woodo-851tegakizatsu',
        image: '/resources/500d/font/images/手書き雑フォント.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-851tegakizatsu.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '沐瑶软笔手写体',
        data: 'woodo-Muyao-Softbrush',
        image: '/resources/500d/font/images/沐瑶软笔手写体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Muyao-Softbrush.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '思源黑体-ExtraLight',
        data: 'woodo-SourceHanSansCN-ExtraLight',
        image: '/resources/500d/font/images/思源黑体-ExtraLight.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-ExtraLight.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '思源黑体-Light',
        data: 'woodo-SourceHanSansCN-Light',
        image: '/resources/500d/font/images/思源黑体-Light.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-Light.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '思源黑体-Heavy',
        data: 'woodo-SourceHanSansCN-Heavy',
        image: '/resources/500d/font/images/思源黑体-Heavy.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSansCN-Heavy.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '思源宋体-Light',
        data: 'woodo-SourceHanSans-Simsun-Light',
        image: '/resources/500d/font/images/思源宋体-Light.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-Light.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '思源宋体-SemiBold',
        data: 'woodo-SourceHanSans-Simsun-SemiBold',
        image: '/resources/500d/font/images/思源宋体-SemiBold.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-SemiBold.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '思源宋体-Heavy',
        data: 'woodo-SourceHanSans-Simsun-Heavy',
        image: '/resources/500d/font/images/思源宋体-Heavy.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SourceHanSans-Simsun-Heavy.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '汉仪力量黑简',
        data: 'woodo-HanYiLiLiangHeiJian',
        image: '/resources/500d/font/images/汉仪力量黑简.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HanYiLiLiangHeiJian.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '汉仪润圆',
        data: 'woodo-HYRunYuan',
        image: '/resources/500d/font/images/汉仪润圆.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HYRunYuan.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '郑庆科黄油体',
        data: 'woodo-ZhengQingKeHuangYouTi',
        image: '/resources/500d/font/images/郑庆科黄油体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZhengQingKeHuangYouTi.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '汉鼎简美黑',
        data: 'woodo-HanDingJianMeiHei',
        image: '/resources/500d/font/images/汉鼎简美黑.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianMeiHei.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '汉鼎简特圆',
        data: 'woodo-HanDingJianTeYuan',
        image: '/resources/500d/font/images/汉鼎简特圆.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianTeYuan.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '汉鼎简行楷',
        data: 'woodo-HanDingJianXingKai',
        image: '/resources/500d/font/images/汉鼎简行楷.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianXingKai.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '汉鼎简新艺体',
        data: 'woodo-HanDingJianXinYiTi',
        image: '/resources/500d/font/images/汉鼎简新艺体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HanDingJianXinYiTi.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '懷访體',
        data: 'woodo-HuaiFangTi',
        image: '/resources/500d/font/images/懷访體.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HuaiFangTi.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '日本青柳隷书',
        data: 'woodo-japan-aoyagireisyosimo',
        image: '/resources/500d/font/images/日本青柳隷书.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-japan-aoyagireisyosimo.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '日文毛笔',
        data: 'woodo-japan-RiWenMaoBiZiTi',
        image: '/resources/500d/font/images/日文毛笔.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-japan-RiWenMaoBiZiTi.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '庞门正道标题体',
        data: 'woodo-PangMenZhengDaoBiaoTiTi',
        image: '/resources/500d/font/images/庞门正道标题体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-PangMenZhengDaoBiaoTiTi.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '锐字真言体',
        data: 'woodo-RuiZiZhenYanTi',
        image: '/resources/500d/font/images/锐字真言体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-RuiZiZhenYanTi.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '思源真黑',
        data: 'woodo-GenShinGothic-Normal',
        image: '/resources/500d/font/images/思源真黑-Normal.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-GenShinGothic-Normal.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '思源柔黑',
        data: 'woodo-GenJyuuGothic-Normal',
        image: '/resources/500d/font/images/思源柔黑-Normal.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-GenJyuuGothic-Normal.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '王汉宗魏碑体',
        data: 'woodo-WangHanZongWeiBeiTiYi',
        image: '/resources/500d/font/images/王汉宗魏碑体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-WangHanZongWeiBeiTiYi.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '王汉宗勘亭流',
        data: 'woodo-WangHanZongKanTingLiuFan',
        image: '/resources/500d/font/images/王汉宗勘亭流.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-WangHanZongKanTingLiuFan.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '王汉宗超明体',
        data: 'woodo-WangHanZongChaoMingTiFan',
        image: '/resources/500d/font/images/王汉宗超明体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-WangHanZongChaoMingTiFan.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '装甲明朝体',
        data: 'woodo-SoukouMincho',
        image: '/resources/500d/font/images/装甲明朝体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-SoukouMincho.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '源界明朝体',
        data: 'woodo-Genkaimincho',
        image: '/resources/500d/font/images/源界明朝体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Genkaimincho.woff',
        loading: false,
        checked: false,
    }, {
        show: false,
        name: '超极细ゴシック体',
        data: 'woodo-Chogokuboso-Gothic',
        image: '/resources/500d/font/images/超极细ゴシック体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Chogokuboso-Gothic.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '站酷文艺体',
        data: 'woodo-ZhanKuWenYi',
        image: '/resources/500d/font/images/站酷文艺体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuWenYi.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '站酷高端黑体',
        data: 'woodo-ZhanKuGaoDuanHei',
        image: '/resources/500d/font/images/站酷高端黑体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuGaoDuanHei.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '站酷快乐体',
        data: 'woodo-ZhanKuKuaiLe',
        image: '/resources/500d/font/images/站酷快乐体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuKuaiLe.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '站酷小薇logo体',
        data: 'woodo-ZhanKuXiaoWeiLOGO',
        image: '/resources/500d/font/images/站酷小薇logo体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZhanKuXiaoWeiLOGO.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: '峰广明锐体',
        data: 'woodo-FengGuangMingRuiTi',
        image: '/resources/500d/font/images/峰广明锐体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-FengGuangMingRuiTi.woff',
        loading: false,
    }, {
        show: true,
        name: '鸿雷板书简体',
        data: 'woodo-HongLeiBanShuTi',
        image: '/resources/500d/font/images/鸿雷板书简体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-HongLeiBanShuTi.woff',
        loading: false,
    }, {
        show: true,
        name: '演示佛系体',
        data: 'woodo-YanShifoXiTi',
        image: '/resources/500d/font/images/演示佛系体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-YanShifoXiTi.woff',
        loading: false,
    }, {
        show: true,
        name: '演示悠然小楷',
        data: 'woodo-YanShiYouRanXiaoKai',
        image: '/resources/500d/font/images/演示悠然小楷.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-YanShiYouRanXiaoKai.woff',
        loading: false,
    }, {
        show: true,
        name: '字体圈欣意冠黑体',
        data: 'woodo-ZiTiQuanXinYiGuanHeiTi',
        image: '/resources/500d/font/images/字体圈欣意冠黑体.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-ZiTiQuanXinYiGuanHeiTi.woff',
        loading: false,
    }, {
        show: true,
        name: 'Lineton Sans',
        data: 'woodo-Lineton-Sans',
        image: '/resources/500d/font/images/Lineton-Sans.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Lineton-Sans.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Lineton Slab',
        data: 'woodo-Lineton-Sans',
        image: '/resources/500d/font/images/Lineton-Slab.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Lineton-Slab.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Kiona',
        data: 'woodo-Kiona-Regular',
        image: '/resources/500d/font/images/Kiona.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Kiona-Regular.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Royal Twins',
        data: 'woodo-Royal-Twins',
        image: '/resources/500d/font/images/Royal-Twins.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Royal-Twins.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Reman',
        data: 'woodo-Reman',
        image: '/resources/500d/font/images/Reman.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Reman.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Apalu',
        data: 'woodo-Apalu',
        image: '/resources/500d/font/images/Apalu.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Apalu.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Stay Classy SLDT',
        data: 'woodo-Stay-Classy-SLDT',
        image: '/resources/500d/font/images/Stay-Classy-SLDT.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Stay-Classy-SLDT.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Saltery Alternate',
        data: 'woodo-Saltery-Alternate',
        image: '/resources/500d/font/images/Saltery-Alternate.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Saltery-Alternate.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Quantum',
        data: 'woodo-Quantum',
        image: '/resources/500d/font/images/Quantum.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Quantum.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Franca',
        data: 'woodo-FrancaBook',
        image: '/resources/500d/font/images/Franca.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-FrancaBook.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Asap BoldItalic',
        data: 'woodo-Asap-BoldItalic',
        image: '/resources/500d/font/images/Asap-BoldItalic.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Asap-BoldItalic.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Barrio Regular',
        data: 'woodo-Barrio-Regular',
        image: '/resources/500d/font/images/Barrio-Regular.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Barrio-Regular.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'blowbrush',
        data: 'woodo-blowbrush',
        image: '/resources/500d/font/images/blowbrush.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-blowbrush.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'lot',
        data: 'woodo-lot',
        image: '/resources/500d/font/images/lot.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-lot.woff',
        loading: false,
        checked: false,
    }, {
        show: true,
        name: 'Seaside Resort NF',
        data: 'woodo-Seaside-Resort-NF',
        image: '/resources/500d/font/images/Seaside-Resort-NF.png',
        url: 'https://file.woodo.cn/upload/fonts/woodo-Seaside-Resort-NF.woff',
        loading: false,
        checked: false,
}];
fontFamily.main = {
    event: function(){
        $('.common_fontfamily_list .family_lang button').on('click', function (e) {
            e.stopPropagation();
            var lang = $(this).attr('data-lang');
            $(this).addClass('check').siblings().removeClass('check');
            $('.common_fontfamily_list ul.' + lang).removeAttr('hidden').siblings().attr('hidden', 'hidden');
        });
        $(document).on('mouseenter mouseleave', '.common_fontfamily_list li.haschild', function () {
            $('.font_family_childrenList').attr('hidden', 'hidden');
            if (event.type === 'mouseover') {
                $(this).find('ul').css({
                    'top': $(this).offset().top,
                    'left': $(this).offset().left + $(this).width() + 7
                });
                $(this).find('ul').removeAttr('hidden');
            }
        });
    },
    // 创建字体列表
    create_family_list: function(type){
        var result = '';
        var item_html = "<li><img class='preview' alt='字体预览图'></li>"
        if (type === 'cn') list = fontFamily.family[0].item;
        if (type === 'en') list = fontFamily.family[1].item;
        for (var i = 0; i < list.length; i++) {
            var value = list[i];
            $item = $(item_html);
            if (!!value.childrenList) {
                var child_html = "<ul class='font_family_childrenList' hidden='hidden'>" + fontFamily.main.create_child_family_list(value.childrenList) +"</ul>"
                $item.append($(child_html)).addClass('haschild');
            }
            $item.attr('data-fontname', value.data);
            $item.find('img').attr('src', value.image);
            result += $item[0].outerHTML;
        }
        return result;
    },
    // 创建子字体列表
    create_child_family_list: function(list){
        var result = '';
        var item_html = "<li></li>";
        for (var i = 0; i < list.length; i++) {
            var value = list[i];
            var $item = $(item_html);
            $item.text(value.alias).attr('data-fontname', value.data);
            result += $item[0].outerHTML;
        }
        return result;
    },
    // 创建主题字体列表
    create_theme_list: function(){
        var result = '';
        var item_html = "<li><img class='preview' alt='字体预览图'><i></i></li>"
        for (var i = 0; i < fontFamily.family_theme.length; i++) {
            var value = fontFamily.family_theme[i];
            var $item = $(item_html);
            $item.find('i').text(value.name);
            $item.attr('data-fontname', value.data);
            $item.find('img').attr('src', value.image);
            result += $item[0].outerHTML;
        }
        return result;
    },
    // 获取所有列表 方法与数组结构有关
    family_arr: function() {
        var family_arr = [];
        for (var i = 0, family = fontFamily.family; i < family.length; i++) {
            for (var j = 0, item = family[i].item; j < item.length; j++) {
                family_arr = family_arr.concat(item[j]);
            }
        }
        return family_arr;
    },
    // 精确搜索字体
    search_exact: function(val) {
        var result = false;
        if (typeof val !== 'string') return result;
        var font = val.replace(/[\'\"]/g, '').toLocaleLowerCase();
        var family_arr = fontFamily.main.family_arr();
        // 查找对应的字体
        for (var index = 0; index < family_arr.length; index++) {
            if (font === family_arr[index].name.toLocaleLowerCase() || font === family_arr[index].data.toLocaleLowerCase()) {
                result = family_arr[index];
                break;
            }
            // 有子集时同时查找子集
            if (family_arr[index].childrenList) {
                var list = family_arr[index].childrenList;
                var flag = false;
                for (var i = 0; i < list.length; i++) {
                    if (font === list[i].name.toLocaleLowerCase() || font === list[i].data.toLocaleLowerCase()) {
                        result = list[i];
                        flag = true;
                    }
                    if (flag === true) break;
                }
            }
        }
        return result;
    },
    // 模糊搜索字体
    search_dim: function(val) {
        var result = [];
        if (typeof val !== 'string') return result;
        var font = val.replace(/[\'\"]/g, '').toLocaleLowerCase();
        var family_arr = fontFamily.main.family_arr();
        // 查找对应的字体
        for (var index = 0; index < family_arr.length; index++) {
            if (font === family_arr[index].name.toLocaleLowerCase() || font === family_arr[index].data.toLocaleLowerCase()) {
                result.push(family_arr[index]);
            }
            // 有子集时同时查找子集
            if (family_arr[index].childrenList) {
                var list = family_arr[index].childrenList;
                var flag = false;
                for (var i = 0; i < list.length; i++) {
                    if (font === list[i].name.toLocaleLowerCase() || font === list[i].data.toLocaleLowerCase()) {
                        flag = true;
                    }
                    if (flag === true) result.push(list[i]);
                }
            }
        }
        return result;
    },
};
$(function () {
    // 初始化
    fontFamily.main.event();
});