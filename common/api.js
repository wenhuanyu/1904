/**
 * API接口统一管理
 */
module.exports = {
	users_auth:"users/auth",//首页授权界面
	personal:'index/personal',//我的列表
	login: "login/login",//登录
	bind: "Login/bind",//绑定账号
	userData: "users/userData",//个人资料
	merchant: "users/merchantData",//公司信息
	upload: "upload/upload",//图片
	
	// 客户管理
	Customer_list:'Customer/list',//列表
	Customer_must_data:'Customer/must_data',//获取添加客户必要数据
	Customer_staff_list:'Customer/staff_list',//员工列表
	Customer_to_rate:'Customer/to_rate',//提成比例(根据添加客户选择来源计算)
	Customer_submit:'Customer/submit',//添加客户
	Customer_detail:'Customer/detail',//客户详情
	
	// 订单管理
	Sales_list:'Sales/list',//列表
	Sales_check_address:'Sales/check_address',//识别地址
	Sales_goods_list:'Sales/goods_list',//商品列表 用作添加订单选择商品
	Sales_get_goods_by_id:'Sales/get_goods_by_id',//获取选中商品数据
	Sales_submit:'Sales/submit',//添加|编辑销售单
	Customer_to_rate:'Customer/to_rate',//提成比例(根据添加客户选择来源计算)
	Sales_detail:'Sales/detail',//销售单详情
	Sales_remove:'Sales/remove',//删除销售单
	Sales_collect_submit:'Sales/collect_submit',//确认收款
	Sales_collect:'Sales/collect',//查看收款凭证
	Sales_express_info:'Sales/express_info',//快递信息
	Sales_update_express:'Sales/update_express',//更新物流
	Sales_send_info:'Sales/send_info',//系统寄件信息


	// 数据统计
	Statistic_index:'Statistic/index',//数据统计
	
	
	// 退货管理
	Returns_list:'Returns/list',//列表
	Returns_sales_list:'Returns/sales_list',//销售单列表 用作添加退货单选择
	Returns_sales_goods_list:'Returns/sales_goods_list',//商品列表 用作添加退货单选择商品
	Returns_get_sales_goods_by_id:'Returns/get_sales_goods_by_id',//获取选中销售单商品数据
	Returns_submit:'Returns/submit',//添加退货单
	Common_auto_express:'Common/auto_express',//智能识别快递单号
	Common_express_list:'Common/express_list',//快递公司列表
	Returns_remove:'Returns/remove',//删除退货单
	Returns_detail:'Returns/detail',//退货单详情
	Returns_express_info:'Returns/express_info',//快递信息详情
	Returns_pay_submit:'Returns/pay_submit',//确认退款
	Returns_pay:'Returns/pay',//退款凭证
	Returns_update_express:'Returns/update_express',//物流更新
	
	
	// 换货单管理
	Change_list:'Change/list',//列表
	Change_submit:'Change/submit',//添加换货单
	Change_detail:'Change/detail',//换货单详情
	Change_remove:'Change/remove',//删除换货单
	Change_express_info:'Change/express_info',//快递详情
	Change_update_express:'Change/update_express',//更新物流
	Change_sure:'Change/sure',//确认换货单
	
	
	// 商品管理
	goods_list:'goods/list',//列表
	goods_brand_list:'goods/brand_list',//品牌列表
	goods_submit:'goods/submit',//商品添加
	goods_detail:'goods/detail',//商品详情
	goods_remove:'goods/remove',//删除商品
	
	
	Wechat_auth_template:'Wechat/auth_template',//授权订阅消息
	Wechat_template_list:'Wechat/template_list',//微信订阅消息模板ID
}
