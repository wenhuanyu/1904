<template>
	<view class="fix-padding">
		<view class="container good">
			<view class="group">
			    <view class="title">客户名称</view>
			    <uni-easyinput class="input" v-model="form.name" disabled></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">渠道</view>
			     <uni-easyinput class="input" v-model="form.channel" disabled></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">联系人</view>
			    <uni-easyinput class="input" v-model="form.contact" disabled></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">来源</view>
			    <uni-easyinput class="input" v-model="form.format_source" disabled></uni-easyinput>
			</view>
			<view class="group" v-if="form.source == 3">
			    <view class="title">同事</view>
				 <uni-easyinput class="input" v-model="form.other_user" disabled></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">类型</view>
			     <uni-easyinput class="input" v-model="form.format_type" disabled></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">提成比例</view>
			    <uni-easyinput class="input" v-model="form.rate" disabled></uni-easyinput>
			</view>
			<view class="group">
				<view class="title">上传图片</view>
				<view class="remarkImage flex">
					<view class="item_image" v-for="(item,index) in form.image" :key='index'>
						<image class="image" :src="item" @click="previewImage(index)" mode="aspectFill"></image>
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
				data:'',
				form:{},
			}
		},
		onLoad(option) {
			if (option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.http({
					url: this.api.Customer_detail,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						id:this.data
					},
					success: res => {
						this.form = res
						this.form.rate = this.form.rate+'%'
					}
				})
			} else  {
				
			}
			
		},
		methods: {
			// 图片放大
			previewImage(i) {
				wx.previewImage({
					current: this.form.image[i],
					urls: this.form.image
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.remarkImage {
	margin-left: 20rpx;
}
</style>
