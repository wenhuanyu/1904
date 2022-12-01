<template>
    <view class="fix-padding background">
        <view :class="preventEvent ? 'prevent': ''">
            <view class="container info mb-20">
				<view class="group">
				    <view class="title">换货单号</view>
				   <uni-easyinput type="text" class="input" v-model="order_no" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">日期</view>
				    <view class="outModal">
						<uni-datetime-picker class="date-picker" ref="formDate":value="date"  @change="changeDate($event)" placeholder="请选择日期" disabled/>
				    </view>
				</view>
				<view class="group">
				    <view class="title">销售单</view>
				    <view class="outModal">
				        <uni-easyinput class="input" v-model="clientName" placeholder="请选择"
				            placeholder-style="color:#8D8D8D;" disabled>
				        </uni-easyinput>
				    </view>
				</view>
            </view>
           
            <view class="good ">
                <view class="add_list" v-for="(item,index) in list" :key="item.id">
                    <view class="flex group">
						<view class="title">商品名称</view>
                        <view class="outModal">
                            <uni-easyinput class="input" v-model="item.goods_name" placeholder="请选择"
                                placeholder-style="color:#8D8D8D;" disabled>
                            </uni-easyinput>
                        </view>
                    </view>
					<view class="group">
					    <view class="title">销售数量</view>
					   <uni-easyinput  class="input" :value="item.sales_count" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">换货数量</view>
						<uni-easyinput  class="input" :value="item.count" placeholder="请输入"
						    placeholder-style="color:#8D8D8D;" disabled>
						</uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">备注</view>
					   <uni-easyinput class="input" v-model="item.remark " placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view style="width: 100%; height: 16rpx; background: #f6f6f6;"></view>
                </view>
            </view>
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
				showExpress:false,
				ExpressList:[],
				expressSearch:'',
				totalexpress:'',
				salesId:'',
            }
        },
        mounted() {
        },
        onLoad(option) {
        	this.uid = this.common.get("uid")
        	this.salesId = this.option = JSON.parse(decodeURIComponent(option.data))
        	setTimeout(() =>{
        		// 进入页面
        		this.http({
        		    url: this.api.Change_detail,
        		    method: "POST",
        		    data: {
        		        uid: this.uid,
        				id:this.salesId
        		    },
        		    success: res => {
        				this.clientName = res.sales_order_no
        				this.order_no = res.order_no
        				this.date = res.date,//日期
        				this.order_no = res.order_no,//单号
        				res.total_data.map((item,index) =>{
        					this.list.push({
        						'goods_name':item.goods_name,
								'count':item.count,
								'remark':item.remark,
								'sales_count':item.sales_count,
        					})
        				})
        		    }
        		})
        	},500)
        },
        methods: {}
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
        padding-top: 20rpx;
		.group {
			padding: 0 30rpx;
		}
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
