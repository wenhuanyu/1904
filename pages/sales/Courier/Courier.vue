<template>
	<view class="background">
			<view class="container info mb-20">
				<view class="group">
				    <view class="title">物流单号</view>
				   <uni-easyinput type="text" class="input" v-model="express_no" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">物流公司编码</view>
				    <uni-easyinput type="text" class="input" v-model="express_code" placeholder="请输入"
				        placeholder-style="color:#8D8D8D;" disabled>
				    </uni-easyinput>
				</view>
			</view>
			<view style="padding: 30rpx;font-size: 30rpx;font-weight: 500;display: flex;justify-content: space-between;">
				<view>物流信息：</view>
				<view style="width: 200rpx; height: 60rpx;line-height:60rpx;background: #007AFF;text-align: center; color: #ffffff;border-radius: 10rpx;"
				@click="update"
				>物流更新</view>
			</view>
			<view class="background_bottom">
				<view v-for="(item,index) in expressage" :key='index'>
					<view class="background_bottom_box mt-10">
						<view class="background_bottom_box_top">
							<view class="background_bottom_box_ball">
								<view class="line" v-if="index !== expressage.length-1"></view>
							</view>
							<view class="ml-12 background_bottom_box_top_text">{{item.context}}</view>
						</view>
						<view class="background_bottom_box_bottom">
							<view class="ml-20">{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				salesId:'',
				express_no:'',
				express_code:'',
				expressage:[],
			}
		},
		onLoad(option) {
			this.uid = this.common.get("uid")
			this.salesId = this.option = JSON.parse(decodeURIComponent(option.data))
			// 列表接口
			this.listInterface()
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url: this.api.Sales_express_info,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						send_id:this.salesId,
					},
					success: res => {
						this.express_code = res.express_code
						this.express_no = res.express_no
						this.expressage = res.expressage
					}
				})
			},
			update() {
				this.http({
					url: this.api.Sales_update_express,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						send_id:this.salesId,
					},
					success: res => {
						this.listInterface()
					}
				})
			},
		}
	}
</script>

<style>
.background {
	width: 100%;
	box-sizing: border-box;
	background: #FFFFFF;
	font-size: 14px;
	color: #333333;
}
.background_top {
	display: flex;
	font-weight: 500;
	margin-left: 40rpx;
}
.background_bottom {
	margin-left: 24rpx;
	margin-top: 7%;
}
.background_bottom_box {
	height: 220rpx;
}
.background_bottom_box_ball {
	width: 8px;
	height: 8px;
	background-color: #2578FF;
	border-radius: 50%;
	position: absolute;
}
.background_bottom_box_ball .line {
	position:  relative;
	left: 43%;
	width: 2px;
	height: 240rpx;
	background-color: #2578FF;
}
.background_bottom_box_top {
	font-weight: 400;
	display: flex;
	align-items: center;
}
.background_bottom_box_top_text {
	width: 680rpx;
}
.background_bottom_box_bottom {
	font-size: 24rpx;
	color: #CDCDCD;
	display: flex;
}
.ml-12 {
	margin-left: 15px;
}
.ml-20 {
	margin-left: 20px;
	margin-top: 8px;
}
.mt-10 {
	margin-top: -10px;
}
</style>
