<template>
	<view class="background"  @click="hideIsShow">
		<!-- 新建信息按钮 -->
		<view class="container add">
			<navigator url="/pages/sales/add/add">
				<button class="flex" type="default">
					<image class="image" src="/static/image/add.png"></image>
				    <view>新增销售单</view>
				</button>
			</navigator>
		</view>
		<!-- 搜索 -->
		<view class="container search">
			<view class="flex">
			    <uni-easyinput class="input" v-model="customer_name"  placeholder="客户名称"style="width: 50%;"></uni-easyinput>
				<uni-easyinput class="input" v-model="goods_name" placeholder="商品名称"style="width: 50%;"></uni-easyinput>
			    <!-- <button class="btn-search" @click="search">搜索</button> -->
			</view>
			<view class="flex mt-10">
				<uni-easyinput class="input" v-model="order_no" placeholder="单号" style="width: 50%;"></uni-easyinput>
				<picker style="width: 50%;margin-left: 0;margin-right: 20rpx;border:none;" class="picker" @change="changeChoose($event,'cangkuIndex')" :value="cangkuIndex" :range="shoukuan" :range-key="'name'">
				    <view v-if="cangkuIndex == -1" class="uni-input" style="width: 250rpx;">收款状态</view>
				    <view v-else class="uni-input" style="width: 250rpx;">{{shoukuan[cangkuIndex].name}}</view>
				    <image class="image" src="/static/image/picker.png"></image>
				</picker>
			    <!-- <button class="btn-search" @click="search">搜索</button> -->
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
						<view class="title">订单号</view>
						<view class="value">{{item.order_no}}</view>
						<view><image class="edit_del" src="/static/image/edit_del.png" @click.stop="edit_del_click(item,index)"></image></view>
					</view>
					<view class="list">
						<view class="title">客户名称</view>
						<view class="value">{{item.customer_name}}</view>
					</view>
					<view class="list">
						<view class="title">收款状态</view>
						<view class="value">{{item.format_coll}}</view>
					</view>
					<view class="list">
						<view class="title">发货状态</view>
						<view class="value" v-if="item.start_send == 0">未开始发货</view>
						<view class="value" v-if="item.start_send == 1">开始发货</view>
					</view>
					<view class="list">
						<view class="title">存在补发</view>
						<view class="value">{{item.have_supply}}</view>
					</view>
					<view class="list">
						<view class="title">日期</view>
						<view class="value">{{item.date}}</view>
					</view>
					<view class="right" @click="details(item.id)"><image src="/static/image/right.png"></image></view>
					<view class="list_click_box" :class="[isShow  == index ?'show' :'hide']">
						<view class="list_click_text list_click_edit" @click="editor(item.id)" v-if="item.coll == 1">编辑</view>
						<view class="list_click_text list_click_del" @click="del(item.id)" v-if="item.coll == 1">删除</view>
						<view class="list_click_text list_click_del" style="color: #098;" v-if="item.coll == 1" @click="collection(item.id)">收款</view>
						<view class="list_click_text list_click_del" style="color: #FF5722;" v-if="item.coll == 2" @click="credentials(item.id)">查看凭证</view>
						<view class="list_click_text list_click_del" style="color: #1E11B7;" v-if="item.start_send == 1" @click="courier(item)">查看快递</view>
					</view>
				</view>
			</block>
		</view>
		<view v-show="showKuaidi" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop class="container">
					<view style="font-size: 35rpx; font-weight: bold;margin-bottom: 10rpx;">发货单号：</view>
					<view v-for="(item,index) in courierList" :key='index' style="display: flex; justify-content: space-between;align-items: center;margin-bottom: 10rpx; border-bottom: 2rpx solid #D8D8D8;">
						<view  @click="kuaidi(item.send_id)">
							<view style="line-height: 50rpx;">销售单号:{{kehu}}</view>
							<view style="line-height: 50rpx;">发货单号:{{item.express_no}}</view>
						</view>
						<view style="color: #FF5722;" @click="copy(item.express_no)">复制</view>
					</view>
				</view>
			</view>
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
						<view class="remarkImage flex" style="margin-left: 20rpx;">
							<view class="item_image" v-for="(item,index) in image" :key='index'>
								<image class="image" :src="item" @click="previewImage(index)" mode="aspectFill"></image>
								<image class="delete" src="../../../static/image/delete.png" @click="deleteImage(index)"></image>
							</view>
							<view class="item_image" @click="uploadImage">
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
						<view class="remarkImage flex" style="margin-left: 20rpx;">
							<view class="item_image" v-for="(item,index) in image" :key='index'>
								<image class="image" :src="item" @click="previewImage(index)" mode="aspectFill"></image>
							</view>
							<view class="item_image" v-if="image.length<=0">
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
				image:[],
				pingdate:'',
				showPing:false,
				showKuaidi:false,
				courierList:[],
				kehu:'',
				cangkuIndex:0,
				shoukuan:[
					{
						id:0,
						name:'全部',
					},
					{
						id:1,
						name:'未收款',
					},
					{
						id:2,
						name:'已收款',
					},
				],
				coll:0,
			}
		},
		onLoad() {
			let that = this
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
			that.page = 0
			that.uid = that.common.get("uid")
			// 列表接口
			that.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 列表接口
			this.http({
				url: this.api.Sales_list,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					order_no:this.order_no,
					goods_name:this.goods_name,
					customer_name:this.customer_name,
					coll:this.coll,
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
			copy(eve) {
				wx.setClipboardData({
					data:eve,
					showToast:false,
					success() {
					}
				})
			},
			courier(eve) {
				this.courierList = eve.express_no
				this.kehu = eve.order_no
				this.showKuaidi = true
			},
			credentials(eve) {
				this.http({
					url:this.api.Sales_collect,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						id:eve,
					},
					success:res=>{
						this.pingdate = res.date
						this.image = res.image
						this.image = this.image.split('|')
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
							this.image = this.image.join('|')
							this.http({
								url:this.api.Sales_collect_submit,
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
									this.image = []
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
				wx.previewImage({
					current: this.image[i],
					urls: this.image
				})
			},
			// 删除图片
			deleteImage(i) {
				this.image.splice(i, 1)
			},
			// 添加图片
			uploadImage() {
				uni.chooseImage({
					count: 9,
					success: res => {
						console.log('res.tempFilePaths',res.tempFilePaths)
						let filePath = res.tempFilePaths;
						filePath.forEach((item,index) => {
							uni.uploadFile({
							    url: this.common.baseUrl + this.api.upload,
							    filePath: item,
							    name: "file",
							    success: res => {
							        let data = JSON.parse(res.data);
							        if (data.code == 1) {
										this.image.push(data.data.url)
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
						})
					}
				})
			},
			changeDate(eve) {
				this.pingdate = eve
			},
			collection(eve) {
				this.pingId = eve
				this.show = true
			},
			// 关闭弹窗
			closeModal() {
				this.showPing = false
				this.show = false
				this.showKuaidi = false
				this.image = ''
				this.pingdate = ''
				this.pingId = ''
				this.courierList = []
				this.kehu = ''
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
			// 下拉搜索
			changeChoose(e) {
				this.cangkuIndex = e.target.value
				this.coll = this.shoukuan[this.cangkuIndex].id
			},
			// 列表接口
			listInterface() {
				this.http({
					url: this.api.Sales_list,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						order_no:this.order_no,
						goods_name:this.goods_name,
						customer_name:this.customer_name,
						coll:this.coll,
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
				if(this.date.length>5) {
					this.date = this.start_time + ' ' +'-'+ ' ' + this.end_time
				} else {
					this.date = ''
				}
				this.page = 0
				this.listInterface()
			},
			// 删除按钮
			del(eve){
				uni.showModal({
					title: '提示',
					content: '确定要删除此销售单吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.Sales_remove,
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
					url:'/pages/sales/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 详情按钮点击
			editor(eve){
				uni.navigateTo({
					url:'/pages/sales/editor/editor?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 快递点击
			kuaidi(eve) {
				uni.navigateTo({
					url:'/pages/sales/Courier/Courier?data='+encodeURIComponent(JSON.stringify(eve))
				})
				this.showKuaidi = false
			}
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
