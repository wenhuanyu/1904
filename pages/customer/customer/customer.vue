<template>
	<view class="background fix-padding">
		<view class="container input-search">
			<view class="flex ">
				<uni-easyinput class="input" v-model="search_name" placeholder="请输入客户名查询"></uni-easyinput>
				<button class="btn-search" @click="search">搜索</button>
			</view>
		</view>
		<view class="customer_list container">
			<block v-for="(item,index) in list" :key='item.id'>
				<view class="list_box container"  @click='details(item.id)'>
					<view class="list">
						<view class="title">客户名称</view>
						<view class="value">{{item.name}}</view>
					</view>
					<view class="list">
						<view class="title">渠道</view>
						<view class="value">{{item.channel}}</view>
					</view>
					<view class="list">
						<view class="title">联系人</view>
						<view class="value">{{item.contact}}</view>
					</view>
					<view class="list">
						<view class="title">来源名称</view>
						<view class="value">{{item.format_source}}</view>
					</view>
					<view class="list">
						<view class="title">类型</view>
						<view class="value">{{item.format_type}}</view>
					</view>
				</view>
			</block>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				search_name:'',
				isShow:-1,
				page:0,
			}
		},
		onLoad() {
			this.page = 0
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
				url: this.api.Customer_list,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					name:this.search_name,
					page:this.page
				},
				success: res => {
					this.page+=1
					if(res.list.length == 0) {
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							duration: 2000
						})
					} else {
						this.list = this.list.concat(res.list)
					}
				}, 
			})
		},
		
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url: this.api.Customer_list,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						name:this.search_name,
						page:this.page
					},
					success: res => {
						this.page+=1
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
							this.list = res.list
						} else {
							this.list = res.list
						}
					}
				})
			},
			// 搜索
			search() {
				this.page = 0
				this.listInterface()
			},
			// 添加按钮点击
			add() {
				uni.navigateTo({
					url:"/pages/customer/add/add"
				})
			},
			// 详情
			details(eve) {
				uni.navigateTo({
					url:'/pages/customer/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
		}
	}
</script>

<style lang="scss">
.customer_list{
	width: 750rpx;
	background: $color-f;
	border-radius: 2rpx;
	.list_box {
		.list {
			.title {
				width: 120rpx;
				text-align-last: justify;
				
			}
		}
		
	}
}
</style>
