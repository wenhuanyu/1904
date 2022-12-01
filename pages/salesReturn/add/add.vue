<template>
    <view class="fix-padding background">
        <view :class="preventEvent ? 'prevent': ''">
            <view class="container info mb-20">
				<view class="group">
				    <view class="title">退货单号</view>
				   <uni-easyinput type="text" class="input" v-model="order_no" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">日期</view>
				    <view class="outModal">
						<uni-datetime-picker class="date-picker" ref="formDate":value="date"  @change="changeDate($event)" placeholder="请选择日期"/>
				    </view>
				</view>
				<view class="group">
				    <view class="title">销售单</view>
				    <view class="outModal" @click="openModal('client')">
				        <uni-easyinput class="input" v-model="clientName" placeholder="请选择"
				            placeholder-style="color:#8D8D8D;" disabled>
				        </uni-easyinput>
				    </view>
				</view>
            </view>
           
            <view class="container good ">
                <view class="add_list" v-for="(item,index) in list" :key="item.id">
                    <view class="flex group">
						<view class="title">商品名称</view>
                        <view class="outModal">
                            <uni-easyinput class="input" v-model="item.name" placeholder="请选择"
                                placeholder-style="color:#8D8D8D;" disabled>
                            </uni-easyinput>
                        </view>
                    </view>
					<view class="group">
					    <view class="title">销售数量</view>
					   <uni-easyinput  class="input" :value="item.count" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">剩余发货数量</view>
					   <uni-easyinput  class="input" :value="item.remain_send_count"  placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">退货数量</view>
						<input style="width: 525rpx;; border: 2rpx solid #e5e5e5;color:#8D8D8D;height: 80rpx;line-height: 80rpx;padding-left: 20rpx;" type="digit" class="input" v-model="item.countReturn" @input="num($event,index)" placeholder="请输入"
						    placeholder-style="color:#8D8D8D;" >
					</view>
					<view class="group">
					    <view class="title">优先补发扣除</view>
					    <picker class="picker" @change="changeinvoice($event,index)" :value="item.wIndex" :range="invoiceList"
					        :range-key="'name'">
					        <view v-if="item.wIndex == -1" class="uni-input">请选择</view>
					        <view v-else class="uni-input">{{invoiceList[item.wIndex].name}}</view>
					        <image class="image" src="/static/image/picker.png"></image>
					    </picker>
					</view>
					<view class="group">
					    <view class="title">备注</view>
					   <uni-easyinput  class="input" v-model="item.remark " placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" >
					   </uni-easyinput>
					</view>
					<button class="btn-submit flex mb-20" style="background: #F89435;" @click="del(index)">
					    <view>删除</view>
					</button>
                </view>
                <button class="btn-submit flex btn-submit_color mb-20" @click="openModal('good')">
                    <image class="image" src="/static/image/plus.png"></image>
                    <view>批量添加商品</view>
                </button>
            </view>
			<view class="container relative mt-20">
				<view class="group">
				    <view class="title">快递单号</view>
				   <uni-easyinput  class="input" v-model="express_no" @blur="express($event,index)" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">快递公司</view>
					<view class="outModal" @click="openModal('express')">
					    <uni-easyinput  class="input" v-model="express_name" placeholder="请输入"
					        placeholder-style="color:#8D8D8D;" disabled>
					    </uni-easyinput>
					</view>
				</view>
				<view class="group">
				    <view class="title">快递编号</view>
				   <uni-easyinput  class="input" v-model="express_code" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
			</view>
			<view v-show="showExpress" class="modal" >
				    <view class="modal-main">
				        <view class="modal-title">
				            <view class="text">快递选择</view>
				            <image class="close" src="/static/image/modal-close.png" @click="closeModal('express')">
				            </image>
				        </view>
				        <view class="modal-body">
				            <view class="search flex">
				                <uni-easyinput class="input" v-model="expressSearch" placeholder="请输入快递名称"></uni-easyinput>
				                <button class="btn-search" @click="searchexpress">搜索</button>
				            </view>
				            <view class="contact" style="height: 80%">
				                <view class="item_box" v-for="(item,i) in ExpressList" :key="i" @click="selectExpress(i,index)">
									<view class="flex">
									    <view class="title" style="width: 130rpx;text-align-last: justify;">ID</view><view>：</view>
									    <view class="value">{{item.id}}</view>
									</view>
				                    <view class="flex">
				                        <view class="title" style="width: 130rpx;text-align-last: justify;">编号</view><view>：</view>
				                        <view class="value">{{item.comCode}}</view>
				                    </view>
									<view class="flex">
									    <view class="title" style="width: 130rpx;text-align-last: justify;">快递公司</view><view>：</view>
									    <view class="value">{{item.name}}</view>
									</view>
				                </view>
				            </view>
								<uni-pagination
									@change = "handlePageExpress"
									:total="totalexpress"
									pageSize='20'
									:current="pageexpress"
									:showIcon="true"
								>
								</uni-pagination>
				        </view>
				    </view>
				</view>
			<view v-show="showClient" class="modal" >
				    <view class="modal-main">
				        <view class="modal-title">
				            <view class="text">销售单选择</view>
				            <image class="close" src="/static/image/modal-close.png" @click="closeModal('client')">
				            </image>
				        </view>
				        <view class="modal-body">
				            <view class="search flex">
				                <uni-easyinput class="input" v-model="order_noSearch" placeholder="单号"  style="width: 300rpx;"></uni-easyinput>
								<uni-easyinput class="input" v-model="customer_nameSearch" placeholder="客户名称" style="width: 300rpx;" ></uni-easyinput>
				                <button class="btn-search" @click="searchClient">搜索</button>
				            </view>
				            <view class="contact" style="height: 80%">
				                <view class="item_box" v-for="(item,i) in clientList" :key="i" @click="selectClient(i,index)">
									<view class="flex">
									    <view class="title" style="width: 130rpx;text-align-last: justify;">单号</view><view>：</view>
									    <view class="value">{{item.order_no}}</view>
									</view>
				                    <view class="flex">
				                        <view class="title" style="width: 130rpx;text-align-last: justify;">客户</view><view>：</view>
				                        <view class="value">{{item.customer_name}}</view>
				                    </view>
									<view class="flex">
									    <view class="title" style="width: 130rpx;text-align-last: justify;">收货地址</view><view>：</view>
									    <view class="value">{{item.address}}</view>
									</view>
									<view class="flex">
									    <view class="title" style="width: 130rpx;text-align-last: justify;">收款状态</view><view>：</view>
									    <view class="value">{{item.format_coll}}</view>
									</view>
									<view class="flex">
									    <view class="title" style="width: 130rpx;text-align-last: justify;">下单日期</view><view>：</view>
									    <view class="value">{{item.date}}</view>
									</view>
				                </view>
				            </view>
								<uni-pagination
									@change = "handlePage"
									:total="total"
									pageSize='20'
									:current="page"
									:showIcon="true"
								>
								</uni-pagination>
				        </view>
				    </view>
				</view>
			<view v-show="showGood" class="modal" >
			    <view class="modal-main">
			        <view class="modal-title">
			            <view class="text">商品选择</view>
			            <image class="close" src="/static/image/modal-close.png" @click="closeModal('good')">
			            </image>
			        </view>
					<view class="modal-body">
					    <view class="search flex">
					        <uni-easyinput class="input" v-model="textGood" placeholder="请输入商品信息"></uni-easyinput>
					        <button class="btn-search" @click="searchGood(index)">搜索</button>
					    </view>
						<view class="flex" style="justify-content: space-between;">
							<checkbox-group name="allCheck" @change="changeAll">
								<checkbox class="checkClick round" :value="allCheck.value" :checked="allCheck.checked"/>
								<text class="cl fs28">{{allCheck.name}}</text>
								<text class="cl fs28 ml-20">共{{checkedArr.length}}条</text>
							</checkbox-group>
							<button class="btn-search" style="width: 180rpx;" @click="selectGood">确定添加</button>
						</view>
					    <view class="contact"  style="height: 70%;">
							<checkbox-group @change="changeCheck" class="check_box">
								<view class="item_box flex" v-for="(item,i) in goodList" :key="i">
									<checkbox class="checkClick round mr-20" :value="item.sales_detail_id" :checked="checkedArr.includes(String(item.sales_detail_id))"></checkbox>
									<view>
										<view class="flex">
											<view class="title" style="width: 130rpx;">ID</view><view>：</view>
											<view class="value">{{item.sales_detail_id}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">商品名称</view><view>：</view>
											<view class="value">{{item.goods_name}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">条码</view><view>：</view>
											<view class="value">{{item.barcode}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">销售数量</view><view>：</view>
											<view class="value">{{item.count}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">剩余发货</view><view>：</view>
											<view class="value">{{item.remain_send_count}}</view>
										</view>
									</view>
								</view>
							</checkbox-group>	
					    </view>
							<uni-pagination
								@change = "handlePageShop"
								:total="totalShop"
								pageSize='20'
								:current="pageShop"
								:showIcon="true"
							>
							</uni-pagination>
					</view>
			    </view>
			</view>
        </view>
        <view class="container fix-bottom">
            <button class="btn-submit" @click="submit">添加</button>
        </view>
	</view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
				order_noSearch:'',
				customer_nameSearch:'',
                uid: 0,
                list: [],
                clientId: 0,
                clientName: "",
                showClient: false,
                clientList: [],
                showGood: false,
                goodList: [],
                textGood: "",
                itemIndex: 0,
                preventEvent: false,
				page:1,
				pageShop:1,
				pageexpress:1,
				total:'',
				totalShop:'',
				username:'',
				
				date: "",//日期
				order_no:'',//单号
				checkedArr:[], //复选框选中的值，工种
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				invoiceList: [
					{
						id:0,
						name:'否'
					},
					{
						id:1,
						name:'是'
					},
				],
				express_no:'',//快递单号
				express_code:'',//快递编号
				express_name:'',//快递公司
				showExpress:false,
				ExpressList:[],
				expressSearch:'',
				totalexpress:'',
            }
        },
        mounted() {
        },
        onLoad() {
			let dateTime = new Date().toISOString()
			this.date = this.dateFormat(dateTime)
            this.uid = this.common.get("uid")
        },
        methods: {
			// 优先补发扣除
			changeinvoice(eve,i) {
				this.list[i].wIndex = eve.detail.value
				this.list[i].is_supply = this.invoiceList[this.list[i].wIndex].id
			},
			changeDate(eve) {
				this.date = eve
			},
			// 全选事件
			changeAll(e){
				console.log('changeAll',e)
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.goodList){
			            let itemVal=String(item.sales_detail_id);
			            if(!this.checkedArr.includes(itemVal)){
			                this.checkedArr.push(itemVal);
						}
			        }
			    }else{
			        // 取消全选
			        this.allCheck.checked=false;
			        this.checkedArr=[];
			    }
			},
			// 多选复选框改变事件
			changeCheck(e){
				this.checkedArr = e.detail.value;
				console.log('this.checkedArr',this.checkedArr)
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if(this.checkedArr.length>0 && this.checkedArr.length==this.goodList.length){
				    this.allCheck.checked=true;
				}else{
				    this.allCheck.checked=false;
				}
			},
			noneEnoughPeople() {
				
			},
			dateFormat(time) {
			    let date = new Date(time);
			    let year = date.getFullYear();
			    // 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			    // 拼接
			    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			    // return year + "-" + month + "-" + day;
			},
			
			// 销售单列表
			clientInList() {
				this.http({
				    url: this.api.Returns_sales_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						customer_name:this.customer_nameSearch,
						order_no:this.order_noSearch,
						page:this.page-1,
						length:20
				    },
				    success: res => {
						this.clientList= res.list
						this.total = res.total
				    }
				})
			},
			// 销售单选择点击
			selectClient(i) {
				this.clientId = this.clientList[i].id
				this.clientName = this.clientList[i].order_no
				this.showClient = false
			    this.preventEvent = false
				this.page = 1
			},
			selectExpress(i) {
				this.express_name = this.ExpressList[i].name
				this.express_code = this.ExpressList[i].comCode
				this.showExpress = false
				this.preventEvent = false
				this.pageexpress = 1
			},
			// 销售单搜索
			searchClient() {
			    this.clientInList()
			},
			handlePage(params) {
				this.page = params.current;
				this.clientInList()
			},
			handlePageShop(params) {
				this.pageShop = params.current;
				this.shopList()
			},
			handlePageExpress(params) {
				this.pageexpress = params.current;
				this.expressList()
			},
			// 商品接口
			shopList() {
				this.http({
				    url: this.api.Returns_sales_goods_list,
				    method: "POST",
				    data: {
				        uid: this.uid,
						sales_id: this.clientId,
						page:this.pageShop-1,
						length:20
				    },
				    success: res => {
				        this.goodList = res.list
						this.totalShop = res.total
				    }
				})
			},
			// 商品搜索
			searchGood(index) {
				this.shopList()
			},
			// 名称选择
            openModal(name) {
                this.preventEvent = true
                if (name == "client") {
                    this.showClient = true
					this.clientInList()
                } else if(name == 'good') {
					if(this.clientId == '') {
						uni.showToast({
							title:'请先选择销售单',
							icon:'none',
							duration: 2000
						})
					} else {
						this.showGood = true
						this.shopList()
					}
				} else {
					this.showExpress = true
					this.expressList()
				}
            },
			// 快递搜索
			searchexpress() {
				this.expressList()
			},
			expressList() {
				this.http({
				    url: this.api.Common_express_list,
				    method: "POST",
				    data: {
				        uid: this.uid,
						name: this.expressSearch,
						page:this.pageexpress-1,
						length:20
				    },
				    success: res => {
				        this.ExpressList = res.list
						this.totalexpress = res.total
				    }
				})
			},
			// 弹窗关闭按钮
            closeModal(name) {
                this.preventEvent = false
                if (name == "client") {
                    this.showClient = false
                } else if (name == "good") {
                    this.showGood = false
                }
				this.page = 1
				this.pageShop = 1
				this.checkedArr = []
            },
			
			// 商品选择点击
            selectGood() {
                // this.prevent = false
                // this.showGood = false
				this.http({
				    url: this.api.Returns_get_sales_goods_by_id,
				    method: "POST",
				    data: {
				        uid: this.uid,
						id:this.checkedArr,
				    },
				    success: res => {
						res.map((item,index) => {
							item.wIndex = -1
							this.list.push(item)
						})
				    }
				})
				console.log('this.list',this.list)
            },
            close() {
                this.preventEvent = false
            },
			// 商品删除按钮
            del(index) {
				this.list.splice(index, 1)
            },
			// 销售数量  总价
            num(e, i) {
                const a = e.target.value
                const inputRule = /[^\d]/g
				this.list[i].countReturn = a.replace(inputRule,'')
            },
			// 快递单号识别
			express(e) {
				this.express_no = e.detail.value
				this.http({
				    url: this.api.Common_auto_express,
				    method: "POST",
				    data: {
				        uid: this.uid,
						express_no:e.detail.value,
				    },
				    success: res => {
						this.express_name = res.name
						this.express_code = res.comCode
				    }
				})
			},
            updatePriceArr() {
                let arr = []
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id != 0) {
                        arr.push(this.list[i])
                    }
                }
                return arr
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
			// 确定添加按钮点击
            submit() {
				let a = []
				this.list.map((item,index) =>{
					a.push({'sales_detail_id':item.id ,'count':item.countReturn,'remark':item.remark,'is_supply':item. is_supply})
				})
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.Returns_submit,
							    method: "POST",
							    data: {
							        uid: this.uid,
									date: this.date,//日期
									order_no:this.order_no,//单号
									sales_id:this.clientId,//客户id
									express_no:this.express_no,//快递单号
									express_code:this.express_code,//快递编号
									express_name:this.express_name,//快递公司
									total_data:JSON.stringify(a),
							    },
							    success: res => {
									uni.showToast({
										title:'操作成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.previous()
									},500) 
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

<style lang="scss">
.modal .modal-main .modal-body .contact .item_box .value {
	width: 300rpx;	
}
.uni-date-editor--x .uni-date__icon-clear {
	top: 10rpx!important;
}
.uniui-calendar {
	display: none;
}
.uni-date-single {
	padding: 0!important;
	height: 64rpx;
}
.background {
	background: #F6F6F6;
}
.picker {
    width: 556rpx;
    height: 80rpx;
    border-radius: 8rpx;
    border: 2rpx solid #E5E5E5;
    text-align: left;
    margin-left: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
}

.relative {
	background: $color-f;
    .uni-easyinput__content {
        padding-right: 70rpx;
    }

    .image {
		position: absolute;
        top: 16rpx;
        right: 20rpx;
        width: 48rpx;
        height: 48rpx;
    }
}
.info {
	background: $color-f;
}

.good {
	margin-bottom: 20rpx;
    .add_list {
        margin-bottom: 20rpx;
        .select {
			width: 590rpx;

            .input {
                height: 72rpx;
                line-height: 66rpx;
            }
        }
        .count {
            margin-top: 20rpx;
        
            .input {
                width: 210rpx;
                margin-right: 10rpx;
        
                &:last-child {
                    margin-right: 0;
                }
            }
        }    
		.delete_box {
			width: 44rpx;
			height: 50rpx;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			.delete {
			    width: 44rpx;
				height: 6rpx;
				background: #2578FF;
			}
		}
		
            
    }
	.btn-submit_color {
			background: #34BCB5;
		}
	    .btn-submit {
	        justify-content: center;
	        height: 80rpx;
	        line-height: 72rpx;
	
	        .image {
	            width: 30rpx;
	            height: 30rpx;
	            margin-right: 20rpx;
	        }
	    }
	}	
    .modal-body {
        .code {
            width: 360rpx;
            height: 360rpx;
            margin: 30rpx 0;
        }

        .slide {
            .image {
                width: 54rpx;
                height: 54rpx;
                margin-left: 20rpx;
            }
        }
    }
</style>
