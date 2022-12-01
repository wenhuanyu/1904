<template>
	<view>
		<view>
			<view class="banner flex">
				<image class="image" :src="logoImage"></image>
				<view class="name">
					{{name}}
				</view>
			</view>

			<view v-if="isLogin" class="icon_box">
				<block v-for="item in guide" :key="item.name">
					<view class="item" @click="jump(item.id)">
						<view class="icon_box_text">
							<view class="flex icon_box_text_left">
								<image :src="item.image"></image>
								<view class="icon_title">{{item.name}}</view>
							</view>
							<view class="icon_box_text_right">
								<image src="../../static/image/right.png"></image>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				isLogin: false,
				name: "",
				logoImage:'',
				guide: [],
			}
		},
		onLoad() {
			let state = this.common.get("state")
			if (state == 1) {
				uni.reLaunch({
					url: "/pages/login/login"
				})
				return
			} else if (state == 2) {
				let that = this
				that.isLogin = true
				that.http({
				    url: that.api.Wechat_template_list,
				    method: "POST",
				    data: {
				        uid: that.common.get("uid"),
				    },
				    success: res => {
						if(res.list[0].status == false) {
							wx.getSetting({
								withSubscriptions: true,   //  这里设置为true,下面才会返回mainSwitch
									success: function(res1){   
									// 调起授权界面弹窗
									if (res1.subscriptionsSetting.mainSwitch) {  // 用户打开了订阅消息总开关
										if (res1.subscriptionsSetting.itemSettings != null) {   // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
											let moIdState = res1.subscriptionsSetting.itemSettings[tmplIds];  // 用户同意的消息模板id
											if(moIdState === 'accept'){   
												console.log('接受了消息推送');
											}else if(moIdState === 'reject'){
												console.log("拒绝消息推送");
											}else if(moIdState === 'ban'){
												console.log("已被后台封禁");
											}
										}else {
											// 当用户没有点击 ’总是保持以上选择，不再询问‘  按钮。那每次执到这都会拉起授权弹窗
											wx.showModal({
												title: '提示',
												content:'请授权开通发货提醒服务通知',
												showCancel: true,
												success: function (ress) {
													if (ress.confirm) {
														wx.requestSubscribeMessage({   // 调起消息订阅界面
															tmplIds: [res.list[0].template_id],
															success (res2) { 
																console.log('订阅消息 成功 ');
																console.log(res2);
																let data = []
																data.push({
																	'template_id':res.list[0].template_id,
																	'status':true
																})
																that.http({
																    url: that.api.Wechat_auth_template,
																    method: "POST",
																    data: {
																        uid: that.common.get("uid"),
																		data:JSON.stringify(data)
																    },
																    success: res3 => {
																    }
																})
															},
															fail (er){
																console.log("订阅消息 失败 ");
																console.log(er);
															}
														})     
														
													}
												}
											})
										}
									}else {
										console.log('订阅消息未开启')
									}      
								},
								fail: function(error){
									console.log(error);
								},
							})
						}
				    }
				})
				
			} else {
				// this.name = "云仓储"
				uni.switchTab({
					url: "/pages/user/user"
				})
			}
		},
		onShow() {
		    let uid = this.common.get("uid")
		    if (uid != "") {
		        this.http({
		            url: this.api.merchant,
		            method: "POST",
		            data: {
		                uid: uid
		            },
		            success: res => {
		                this.name = res.shop_name
						this.logoImage = res.shop_logo
		            }
		        })
				this.index_list()
		    } else {
				uni.switchTab({
				    url: "/pages/user/user"
				})
			}
		},
		methods: {
			// 主页功能列表接口
			index_list() {
				this.http({
					url: this.api.users_auth,
					method: "POST",
					data: {
						uid: this.common.get("uid")
					},
					success: res => {
						this.guide = res
					}
				})
				
			},
			// 页面跳转
			jump(item) {
				console.log('item',item)
				// 订单管理
				if(item == 3) {
					uni.navigateTo({
						url: "/pages/sales/sales/sales"
					})
				}
				// 客户管理
				if(item == 1) {
					uni.navigateTo({
						url: "/pages/customer/customer/customer"
					})
				}
				// 退货管理
				if(item == 2) {
					uni.navigateTo({
						url: "/pages/salesReturn/salesReturn/salesReturn"
					})
				}
				// 换货单
				if(item == 5) {
					uni.navigateTo({
						url: "/pages/exchange/exchange/exchange"
					})
				}
				// 数据
				if(item == 6) {
					uni.navigateTo({
						url: "/pages/stock/stock"
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
    .banner {
        width: 750rpx;
        height: 192rpx;
        background: #2E74F4;
        box-sizing: border-box;
        padding: 30rpx;
        color: $color-f;
        .image {
            width: 100rpx;
            height: 100rpx;
            margin-right: 30rpx;
			border-radius: 50%;
        }
    }
	.icon_box {
		margin-top: 30rpx;
		.item {
			box-shadow: 0px 2rpx 16rpx 2rpx rgba(179,175,175,0.2500);
			background: #ffffff;
			border-radius: 8rpx;
			margin: 20rpx 30rpx;
			.icon_box_text {
				display: flex;
				align-items: center;
				justify-content: space-between;
				// width: 690rpx;
				padding: 20rpx 50rpx ;
				font-size: 32rpx;
				font-weight: 500;
				color: $color-3;
				.icon_box_text_left {
					image {
						width: 100rpx;
						height: 100rpx;
						margin-right: 28rpx;
					}
				}
				.icon_box_text_right {
					image {
						width: 36rpx;
						height: 24rpx;
					}
				}
			}
		}
	}
	
</style>
