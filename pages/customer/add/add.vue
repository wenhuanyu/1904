<template>
	<view class="fix-padding">
		<view class="container good">
			<view class="group">
			    <view class="title">客户名称</view>
			    <uni-easyinput class="input" v-model="form.name" placeholder="请输入客户名称" ></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">渠道</view>
			    <picker class="picker" @change="changeChannel($event)" :value="ChannelIndex" :range="ChannelList" :range-key="'name'">
			        <view v-if="ChannelIndex == -1" class="uni-input">请选择渠道</view>
			        <view v-else class="uni-input">{{ChannelList[ChannelIndex].name}}</view>
			        <image class="image" src="/static/image/picker.png"></image>
			    </picker>
			</view>
			<view class="group">
			    <view class="title">联系人</view>
			    <uni-easyinput class="input" v-model="form.contact" placeholder="请输入联系人"></uni-easyinput>
			</view>
			<view class="group">
			    <view class="title">来源</view>
			    <picker class="picker" @change="changeSource($event)" :value="sourceIndex" :range="sourceList" :range-key="'name'">
			        <view v-if="sourceIndex == -1" class="uni-input">请选择来源</view>
			        <view v-else class="uni-input">{{sourceList[sourceIndex].name}}</view>
			        <image class="image" src="/static/image/picker.png"></image>
			    </picker>
			</view>
			<view class="group" v-if="form.source == 3">
			    <view class="title">同事</view>
				<view class="outModal" @click="openModal()">
				    <uni-easyinput class="input" v-model="clientName" placeholder="请选择同事"
				        placeholder-style="color:#8D8D8D;" disabled>
				    </uni-easyinput>
				</view>
			</view>
			<view class="group">
			    <view class="title">类型</view>
			    <picker class="picker" @change="changeType($event)" :value="typeIndex" :range="typeList" :range-key="'name'">
			        <view v-if="typeIndex == -1" class="uni-input">请选择类型</view>
			        <view v-else class="uni-input">{{typeName}}</view>
			        <image class="image" src="/static/image/picker.png"></image>
			    </picker>
			</view>
			<view class="group">
			    <view class="title">提成比例</view>
			    <uni-easyinput class="input" v-model="customer_rate" disabled></uni-easyinput>
			</view>
			<view class="group">
				<view class="title">上传图片</view>
				<view class="remarkImage flex">
					<view class="item_image" v-for="(item,index) in form.image" :key='index'>
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
			<view v-show="showClient" class="modal">
			    <view class="modal-main">
			        <view class="modal-title">
			            <view class="text">同事选择</view>
			            <image class="close" src="/static/image/modal-close.png" @click="closeModal('client')">
			            </image>
			        </view>
			        <view class="modal-body">
			            <view class="search flex">
			                <uni-easyinput class="input" v-model="username" placeholder="请输入登录账号" style="width: 230rpx;"></uni-easyinput>
							<uni-easyinput class="input" v-model="nickname" placeholder="请输入用户名称" style="width: 230rpx;"></uni-easyinput>
			                <button class="btn-search" @click="searchClient">搜索</button>
			            </view>
			            <view class="contact" style="height: 80%;">
			                <view class="item_box" v-for="(item,i) in clientList" :key="i" @click="selectClient(i,index)">
								<view class="flex">
								    <view class="title" style="width: 130rpx;">ID</view><view>：</view>
								    <view class="value">{{item.id}}</view>
								</view>
			                    <view class="flex">
			                        <view class="title" style="width: 130rpx;text-align-last: justify;">登录账号</view><view>：</view>
			                        <view class="value">{{item.username}}</view>
			                    </view>
			                    <view class="flex">
			                        <view class="title" style="width: 130rpx;text-align-last: justify;">用户名称</view><view>：</view>
			                        <view class="value">{{item.nickname}}</view>
			                    </view>
			                    <view class="flex">
			                        <view class="title" style="width: 130rpx; text-align-last: justify;">等级</view><view>：</view>
			                        <view class="value ellipsis">{{item.grade}}</view>
			                    </view>
			                </view>
			            </view>
							<uni-pagination
								@change = "handlePage"
								:total="total"
								pageSize='5'
								:current="page"
								:showIcon="true"
							>
							</uni-pagination>
			        </view>
			    </view>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">确定添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:'',
					channel_id:'',
					channel:'',
					contact:'',
					source:'',
					format_source:'',
					other_uid:'',
					image:[],
					type:'',
				},
				ChannelIndex:-1,
				ChannelList:[],
				sourceIndex:-1,
				sourceList:[],
				showClient: false,
				clientList:[],
				typeList:[],
				typeIndex:-1,
				page:1,
				total:'',
				nickname:'',
				username:'',
				clientName:'',
				typeName:'',
				customer_rate:'',
			}
		},
		onLoad() {
			this.http({
			    url: this.api.Customer_must_data,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			    },
			    success: res => {
					this.ChannelList= res.channel_list
					this.sourceList= res.source_list
					this.typeList = res.type_list
			    }
			})
		},
		methods: {
			clientInList() {
				this.http({
				    url: this.api.Customer_staff_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						username:this.username,
						nickname:this.nickname,
						page:this.page-1,
						length:5
				    },
				    success: res => {
						this.clientList= res.list
						this.total = res.total
				    }
				})
			},
			searchClient() {
				this.clientInList()
				
			},
			// 名称选择
			openModal(name, index) {
			    this.showClient = true
				this.clientInList()
			},
			handlePage(params) {
				this.page = params.current;
				this.clientInList()
			},

			// 弹窗关闭按钮
			closeModal(name) {
			    this.showClient = false
			},
			// 客户选择点击
			selectClient(i) {
				this.showClient = false
				this.clientName = this.clientList[i].username
				this.form.other_uid =  this.clientList[i].id
			},
			// 渠道选择
			changeChannel(e) {
				this.ChannelIndex = e.target.value
				this.form.channel_id =  this.ChannelList[this.ChannelIndex].id
				this.form.channel = this.ChannelList[this.ChannelIndex].name
			},
			// 来源选择
			changeSource(e) {
				this.sourceIndex = e.target.value
				this.form.source =  this.sourceList[this.sourceIndex].id
				this.form.format_source = this.sourceList[this.sourceIndex].name
				this.http({
				    url: this.api.Customer_to_rate,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						source:this.form.source,
				    },
				    success: res => {
						this.customer_rate= res.customer_rate+'(%)'
				    }
				})
			},
			// 类型选择
			changeType(e) {
				this.typeIndex =  e.target.value
				this.form.type =  this.typeList[this.typeIndex].id
				this.typeName = this.typeList[this.typeIndex].name
			},
			// 删除图片
			deleteImage(i) {
				this.form.image.splice(i, 1)
			},
			// 图片放大
			previewImage(i) {
				wx.previewImage({
					current: this.form.image[i],
					urls: this.form.image
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
								console.log('data',data)
						        if (data.code == 1) {
									this.form.image.push(data.data.url)
									console.log('this.form.image',this.form.image)
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
			// 返回上一页
			previous() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			// 添加/编辑按钮点击
			add() {
				// 添加
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) {
							this.form.image = this.form.image.join('|')
							this.http({
								url:this.api.Customer_submit,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									...this.form
								},
								success:res=>{
									this.previous()
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});	
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.remarkImage {
	margin-left: 20rpx;
}
.modal {
	margin-left: -30rpx;
}
</style>
