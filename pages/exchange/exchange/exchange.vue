<template>
	<view class="background"  @click="hideIsShow">
		<!-- 新建信息按钮 -->
		<view class="container add">
			<navigator url="/pages/exchange/add/add">
				<button class="flex" type="default">
					<image class="image" src="/static/image/add.png"></image>
				    <view>新增换货单</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
			    <uni-easyinput class="input" v-model="customer_name"  placeholder="客户名称" style="width: 200rpx;"></uni-easyinput>
				<uni-easyinput class="input" v-model="goods_name" placeholder="商品名称" style="width: 200rpx;"></uni-easyinput>
				<uni-easyinput class="input" v-model="order_no" placeholder="单号" style="width: 200rpx;"></uni-easyinput>
			    <button class="btn-search" @click="search">搜索</button>
			</view>
			<view class="flex mt-10">
				<view class="text">自定义查</view>
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="start_time" placeholder="开始时间"/>
				至
				<uni-datetime-picker class="date-picker" ref="formDate" v-model="end_time" placeholder="结束时间"/>
				<button class="btn-search btn-color" @click="searchTime">查询</button>
			</view>
		</view>
		<!-- 列表 -->
		<view class="container customer_list">
			<block v-for="(item,index) in list" :key='item.id'>
				<view class="list_box container">
					<view class="list">
						<view class="title">销售单号</view>
						<view class="value">{{item.sales_order_no}}</view>
						<view><image class="edit_del" src="/static/image/edit_del.png" @click.stop="edit_del_click(item,index)"></image></view>
					</view>
					<view class="list">
						<view class="title">单号</view>
						<view class="value">{{item.order_no}}</view>
					</view>
					<view class="list">
						<view class="title">客户名称</view>
						<view class="value">{{item.customer_name}}</view>
					</view>
					<view class="list">
						<view class="title">是否确认</view>
						<view class="value">{{item.format_sure}}</view>
					</view>
					<view class="list">
						<view class="title">日期</view>
						<view class="value">{{item.date}}</view>
					</view>
					<view class="list" >
						<view class="title">快递单号</view>
						<view class="value">{{item.express_no}}</view>
					</view>
					<view class="right" @click="details(item.id)"><image src="/static/image/right.png"></image></view>
					<view class="list_click_box" :class="[isShow  == index ?'show' :'hide']">
						<view class="list_click_text list_click_del" @click="del(item.id)" v-if="item.is_sure == 0">删除</view>
						<view class="list_click_text list_click_del" style="color: #098;" v-if="item.is_sure == 0" @click="collection(item.id)">确认推送</view>
						<!-- <view class="list_click_text list_click_del" style="color: #FF5722;" v-if="item.is_sure == 1" @click="credentials(item.id)">查看凭证</view> -->
						<view class="list_click_text list_click_del" @click="sale(item.sales_id)" style="color: #34BCB5;">销售订单</view>
						<view class="list_click_text list_click_del" @click="courier(item.id)" style="color: #2454FD;">物流状态</view>
					</view>
				</view>
			</block>
		</view>
		<view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop class="container">
					<view class="group">
					    <view class="title">日期</view>
					   <uni-datetime-picker class="date-picker" ref="formDate":value="pingdate" type="date"  @change="changeDate($event)" placeholder="请选择日期"/>
					</view>
					<view class="group">
						<view class="title">图片</view>
						<view class="remarkImage flex">
							<view class="item_image" v-if="image.length>0" style="margin-left: 20rpx;">
								<image class="image" :src="image" @click="previewImage(index)" mode="aspectFill"></image>
							</view>
							<view class="item_image" @click="uploadImage" style="margin-left: 20rpx;">
								<view class="item_image">
									<image class="image" src="../../../static/image/pic.png"></image>
								</view>
							</view>
						</view>
					</view>
					<button class="btn-submit" @click="submit_mon">提交</button>
				</view>
			</view>
		</view>
		<view v-show="showPing" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop class="container">
					<view class="group">
					    <view class="title">日期</view>
					   <uni-easyinput type="text" class="input" v-model="pingdate" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
						<view class="title">图片</view>
						<view class="remarkImage flex">
							<view class="item_image" v-if="image.length>0" style="margin-left: 20rpx;">
								<image class="image" :src="image" @click="previewImage(index)" mode="aspectFill"></image>
							</view>
							<view class="item_image" v-if="image.length<=0" style="margin-left: 20rpx;">
								<view class="item_image">
									<image class="image" src="../../../static/image/wu.png"></image>
								</view>
							</view>
						</view>
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
				order_no:'',
				goods_name:'',
				customer_name:'',
				start_time:'',
				end_time:'',
				date:'',
				list:[],
				page:0,
				warehouse: [],
				goodList:[],
				isShow:-1,
				show:false,
				pingId:'',
				image:'',
				pingdate:'',
				showPing:false,
			}
		},
		onLoad() {
			this.page = 0
			this.uid = this.common.get("uid")
			// 列表接口
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
				url: this.api.Returns_list,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					order_no:this.order_no,
					goods_name:this.goods_name,
					customer_name:this.customer_name,
					date:this.date,
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
			courier(eve) {
				uni.navigateTo({
					url:'/pages/exchange/Courier/Courier?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			sale(eve) {
				uni.navigateTo({
					url:'/pages/sales/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			credentials(eve) {
				this.http({
					url:this.api.Returns_pay,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						id:eve,
					},
					success:res=>{
						this.pingdate = res.date
						this.image = res.image
						this.showPing = true
					}
				})
			},
			submit_mon() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) {
							this.http({
								url:this.api.Returns_pay_submit,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									id:this.pingId,
									image:this.image,
									date:this.pingdate
								},
								success:res=>{
									this.show = false
									this.page = 0
									this.listInterface()
									this.image = ''
									this.pingdate = ''
									this.pingId = ''
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});	
			},
			// 图片放大
			previewImage(i) {
				let imgsArray = [];
				imgsArray[0] = this.image;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
			// 添加图片
			uploadImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						let filePath = res.tempFilePaths[0];
						uni.uploadFile({
						    url: this.common.baseUrl + this.api.upload,
						    filePath: filePath,
						    name: "file",
						    success: res => {
						        let data = JSON.parse(res.data);
						        if (data.code == 1) {
									this.image=data.data.url
								} else {
						            uni.showToast({
						                title: "上传失败",
						                icon: "none"
						            })
						        }
						    },
						    fail: res => {
						        uni.showToast({
						            title: "上传失败," + res,
						            icon: "none"
						        })
						    }
						})
					}
				})
			},
			changeDate(eve) {
				this.pingdate = eve
			},
			collection(eve) {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.Change_sure,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        id:eve
							    },
							    success: res => {
									this.page = 0
							        this.listInterface()
							    }
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 关闭弹窗
			closeModal() {
				this.showPing = false
				this.show = false
				this.image = ''
				this.pingdate = ''
				this.pingId = ''
			},
			// 按钮点击
			edit_del_click(i,eve) {
				let that = this
				if(eve == that.isShow) {
					that.isShow = -1;
					return false;
				}
				that.isShow = eve;
			},
			// 隐藏
			hideIsShow() {
				this.isShow = -1;
			},
			// 列表接口
			listInterface() {
				this.http({
					url: this.api.Change_list,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						order_no:this.order_no,
						goods_name:this.goods_name,
						customer_name:this.customer_name,
						date:this.date,
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
			// 搜索 查询按钮点击
			search() {
				this.page = 0
				this.listInterface()
			},
			searchTime() {
				this.date = this.start_time + ' ' +'-'+ ' ' + this.end_time
				this.page = 0
				this.listInterface()
			},
			// 删除按钮
			del(eve){
				uni.showModal({
					title: '提示',
					content: '确定要删除此换货单吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.Change_remove,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        id:eve
							    },
							    success: res => {
									this.page = 0
							        this.listInterface()
							    }
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			details(eve) {
				uni.navigateTo({
					url:'/pages/exchange/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
		}
	}
</script>

<style lang="scss">
.list_box {
	.list {
		margin-bottom: 10rpx!important;
	}
}
.btn-color {
	width: 120rpx!important;
	height: 64rpx;
	line-height: 64rpx;
	background: $color-b5;
}
.search .uni-date-editor--x .uni-date__icon-clear {
	top: -4rpx;
}
.uni-date-single {
	padding: 0!important;
	height: 64rpx;
}
.date-picker {
	width: 42%!important;
}

.uniui-calendar {
	display: none;
}
.modal_bottom {
	z-index: 999;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	.modal-main {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 100;
		>view{
			width: 100%;
			box-shadow: 0px -13rpx 34rpx 0px rgba(0, 0, 0, 0.12);
			border-radius: 20rpx 20rpx 0px 0px;
			background: $color-f;
			position: absolute;
			bottom: 0;
			left: 0;
		}
		.date-picker {
			width: 550rpx!important;
			margin-left: 20rpx;
		}
	}
}
</style>
