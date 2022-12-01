<template>
    <view class="background">
        <view :class="preventEvent ? 'prevent': ''">
            <view class="container info mb-20">
				<view class="group">
				    <view class="title">订单号</view>
				   <uni-easyinput type="text" class="input" v-model="order_no" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">日期</view>
				    <view class="outModal">
						<uni-datetime-picker class="date-picker" ref="formDate":value="date" placeholder="请选择日期" disabled/>
				    </view>
				</view>
                <!-- <view class="group"  v-if="pingbi == 1">
                    <view class="title">是否开票</view>
                    <picker class="picker" @change="changeinvoice($event)" :value="wIndex" :range="invoiceList"
                        :range-key="'name'" disabled>
                        <view v-if="wIndex == -1" class="uni-input">请选择</view>
                        <view v-else class="uni-input">{{invoiceList[wIndex].name}}</view>
                        <image class="image" src="/static/image/picker.png"></image>
                    </picker>
                </view> -->
				<view class="group" v-if="pingbi == 1">
				    <view class="title">是否虚拟</view>
				    <picker class="picker" @change="changefic($event)" :value="fIndex" :range="ficList"
				        :range-key="'name'" disabled>
				        <view v-if="fIndex == -1" class="uni-input">请选择</view>
				        <view v-else class="uni-input">{{ficList[fIndex].name}}</view>
				        <image class="image" src="/static/image/picker.png"></image>
				    </picker>
				</view>
				<view class="group">
				    <view class="title">客户名称</view>
				    <view class="outModal">
				        <uni-easyinput class="input" v-model="clientName" placeholder="请选择"
				            placeholder-style="color:#8D8D8D;" disabled>
				        </uni-easyinput>
				    </view>
				</view>
				<view class="group">
				    <view class="title">收货地址</view>
					<view class="input" style="font-size:28rpx;border: 2rpx solid #e5e5e5;padding: 20rpx;width: 510rpx;border-radius: 10rpx;color: #808080 ;min-height: 40rpx;">
						{{addressData}}
					</view>
				   <!-- <uni-easyinput type="number" class="input" :value="addressData" @input="addressDataChange($event)" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" suffixIcon="none" disabled>
				   </uni-easyinput> -->
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">收货人姓名</view>
				   <uni-easyinput type="text" class="input" v-model="contact_name" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">收货人电话</view>
				   <uni-easyinput type="text" class="input" v-model="contact_phone" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">收货所在区域</view>
				   <picker
				   disabled
				   	class="picker"
				   	mode = region
				   	@change="selCity"
				   	:value="cityList"
				   	:range="cityList"
				   >
				   	<view class="flex">
				   		<view class="date_text"  style="color: #666666;" v-if="!addressNode.province">请选择省市区</view>
				   		<view  class="date_text" v-else>
				   			{{addressNode.province}}{{addressNode.city}}{{addressNode.prefecture}}
				   		</view>
				   		<image class="image" src="/static/image/picker.png"></image>
				   	</view>
				   	
				   </picker>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">街道</view>
				   <uni-easyinput type="text" class="input" v-model="street" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">寄件人姓名</view>
				   <uni-easyinput type="text" class="input" v-model="send_name" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">寄件人电话</view>
				   <uni-easyinput type="text" class="input" v-model="send_phone" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">寄件所在区域</view>
				   <picker
				   disabled
				   	class="picker"
				   	mode = region
				   	@change="sendCity"
				   	:value="sendcityList"
				   	:range="sendcityList"
				   >
				   	<view class="flex">
				   		<view class="date_text"  style="color: #666666;" v-if="!sendaddressNode.province">请选择省市区</view>
				   		<view  class="date_text" v-else>
				   			{{sendaddressNode.province}}{{sendaddressNode.city}}{{sendaddressNode.prefecture}}
				   		</view>
				   		<image class="image" src="/static/image/picker.png"></image>
				   	</view>
				   	
				   </picker>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">寄件街道</view>
				   <uni-easyinput type="text" class="input" v-model="send_street" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
            </view>
           <view class="container" style=" display: flex;justify-content: space-between;">
			   <view style="font-size: 30rpx;">销售产品清单：</view>
			   <view style="padding: 10rpx 20rpx;background: #007AFF;color: #FFFFFF;" @click="pingbiclick"  v-if="pingbi == 1 && yincang == 1">一键屏蔽</view>
				<view style="padding: 10rpx 20rpx;background: #B12C54;color: #FFFFFF;" @click="huifu"  v-if="pingbi == 2 && yincang == 1">一键恢复</view>
		   </view>
            <view class=" good ">
                <view class="add_list" v-for="(item,index) in list" :key="item.id">
                    <view class="flex group">
						<view class="title">商品名称</view>
                        <view class="outModal">
                            <uni-easyinput class="input" v-model="item.name" placeholder="请选择"
                                placeholder-style="color:#8D8D8D;" disabled>
                            </uni-easyinput>
                        </view>
                    </view>
					<view class="group" v-if="pingbi == 1">
					    <view class="title">重量(克)</view>
					   <uni-easyinput type="text" class="input" v-model="item.weight" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">销售数量</view>
					   <uni-easyinput type="number" class="input" :value="item.count" @input="num($event,index)" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group"  v-if="pingbi == 1">
					    <view class="title">成本单价</view>
					   <uni-easyinput type="number" class="input" :value="item.cost_price"  placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group"  v-if="pingbi == 1">
					    <view class="title">成本金额</view>
					   <uni-easyinput type="number" class="input" v-model="item.costAmount" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">销售单价</view>
					   <uni-easyinput type="number" class="input" v-model="item.sales_price" @input="price($event,index)" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">销售金额</view>
					   <uni-easyinput type="number" class="input" v-model="item.salesAmount" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group"  v-if="pingbi == 1">
					    <view class="title">利润</view>
					   <uni-easyinput type="number" class="input" v-model="item.profits" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group"  v-if="pingbi == 1">
					    <view class="title">利润率(%)</view>
					   <uni-easyinput type="number" class="input" v-model="item.profitMargin" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">备注</view>
						<view class="input" style="font-size:28rpx;border: 2rpx solid #e5e5e5;padding: 20rpx;width: 510rpx;border-radius: 10rpx;color: #808080 ;min-height: 40rpx;">
							{{item.remark}}
						</view>
					  <!-- <uni-easyinput type="number" class="input" v-model="item.remark " placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput> -->
					</view>
					<view style="width: 100%; height: 16rpx; background: #f6f6f6;"></view>
                </view>
               
            </view>
			<view class="container relative mt-20">
				<view class="group">
				    <view class="title">总销售金额</view>
				   <uni-easyinput type="number" class="input" v-model="totalAmount" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">总重量</view>
				   <uni-easyinput type="number" class="input" v-model="totalWeight" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">整单利润</view>
				   <uni-easyinput type="number" class="input" v-model="totalProfit" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">整单利润率(%)</view>
				   <uni-easyinput type="number" class="input" v-model="totalprofitMargin" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">销售提成</view>
				   <uni-easyinput type="number" class="input" v-model="salesCommissions" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group"  v-if="pingbi == 1">
				    <view class="title">同事提成</view>
				   <uni-easyinput type="number" class="input" v-model="colleaguesCommission" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
			</view>
			<view class="container" style=" display: flex;justify-content: space-between;" v-if="supply_list.length>0">
				<view style="font-size: 30rpx;">补发产品清单：</view>
			</view>
			<view class=" good "  v-if="supply_list.length>0">
			    <view class="add_list" v-for="(item,index) in supply_list" :key='index'>
			        <view class="flex group">
						<view class="title">商品名称</view>
			            <view class="outModal">
			                <uni-easyinput class="input" v-model="item.goods_name" placeholder="请选择"
			                    placeholder-style="color:#8D8D8D;" disabled>
			                </uni-easyinput>
			            </view>
			        </view>
					<view class="group">
					    <view class="title">补发日期</view>
					   <uni-easyinput type="text" class="input" v-model="item.supply_date" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">补发数量</view>
					   <uni-easyinput type="text" class="input" v-model="item.count" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view style="width: 100%; height: 16rpx; background: #f6f6f6;"></view>
			    </view>
			</view>
			<view style=" display: flex;justify-content: space-between;padding-left: 30rpx;padding-right: 30rpx;margin-top: 20rpx;" v-if="express_no.length>0">
				<view style="font-size: 30rpx;">快递详情：</view>
				 <view style="padding: 10rpx 20rpx;background: #007AFF;color: #FFFFFF;margin-right: 10rpx;" @click="update" >物流更新</view>
			</view>
			<view class="container mt-20 info"  v-if="express_no.length>0">
				<view v-for="(item,index) in express_no" :key='index' style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 20rpx;">
					<view style="display: flex;font-size: 26rpx; ":class="{btna:count == index}">
						<view style="width: 130rpx;">快递单号：</view>
						<view style="width: 300rpx;">{{item.express_no}}</view>
					</view>
					<view style="display: flex;">
						<view style="padding: 10rpx 20rpx;background: #007AFF;color: #FFFFFF;margin-right: 10rpx;font-size: 20rpx;" @click="changeCourier(item,index)" >查询物流</view>
						<view style="padding: 10rpx 20rpx;background: #FF5722;color: #FFFFFF;font-size: 20rpx;" @click="copy(item)" >复制单号</view>
					</view>
				</view>
			</view>
			<view class="background_bottom" v-if="express_no.length>0">
				<view v-for="(item,index) in expressage" :key='index'>
					<view class="background_bottom_box mt-10">
						<view class="background_bottom_box_top">
							<view class="background_bottom_box_ball">
								<view class="line" v-if="index !== expressage.length-1"></view>
							</view>
							<view class="background_bottom_box_top_text" style="margin-left: 40rpx;">{{item.context}}</view>
						</view>
						<view class="background_bottom_box_bottom">
							<view style="margin-left: 40rpx;">{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="showClient" class="modal"  catchtouchmove="noneEnoughPeople">
				    <view class="modal-main">
				        <view class="modal-title">
				            <view class="text">客户选择</view>
				            <image class="close" src="/static/image/modal-close.png" @click="closeModal('client')">
				            </image>
				        </view>
				        <view class="modal-body">
				            <view class="search flex">
				                <uni-easyinput class="input" v-model="username" placeholder="请输入客户名称" ></uni-easyinput>
				                <button class="btn-search" @click="searchClient">搜索</button>
				            </view>
				            <view class="contact" style="height: 800rpx;">
				                <view class="item_box" v-for="(item,i) in clientList" :key="i" @click="selectClient(i,index)">
									<view class="flex">
									    <view class="title" style="width: 130rpx;">ID</view><view>：</view>
									    <view class="value">{{item.id}}</view>
									</view>
				                    <view class="flex">
				                        <view class="title" style="width: 130rpx;text-align-last: justify;">客户名称</view><view>：</view>
				                        <view class="value">{{item.name}}</view>
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
			<view v-show="showGood" class="modal"  catchtouchmove="noneEnoughPeople">
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
					    <view class="contact" style="height: 700rpx;">
							<checkbox-group @change="changeCheck" class="check_box">
								<view class="item_box flex" v-for="(item,i) in goodList" :key="i">
									<checkbox class="checkClick round mr-20" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
									<view>
										<view class="flex">
											<view class="title" style="width: 130rpx;">ID</view><view>：</view>
											<view class="value">{{item.id}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">商品名称</view><view>：</view>
											<view class="value">{{item.name}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">品牌</view><view>：</view>
											<view class="value">{{item.brand_name}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">条码</view><view>：</view>
											<view class="value">{{item.barcode}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">成本价</view><view>：</view>
											<view class="value">{{item.cost_price}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">销售价</view><view>：</view>
											<view class="value">{{item.sales_price}}</view>
										</view>
										<view class="flex">
											<view class="title" style="width: 130rpx;text-align-last: justify;">重量</view><view>：</view>
											<view class="value">{{item.weight}}</view>
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
	</view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                uid: 0,
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
				ficList: [
					{
						id:1,
						name:'是'
					},
					{
						id:2,
						name:'否'
					},
				],
				fIndex:-1,
                wIndex: -1,
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
				total:'',
				totalShop:'',
				username:'',
				addressData:'',
				cityList:[],
				addressNode:{
					province:'',
					city:'',
					prefecture:''
				},
				sendcityList:[],
				sendaddressNode:{
					province:'',
					city:'',
					prefecture:''
				},
				contact_name:'',//收货人姓名
				contact_phone:'',//收货人电话
				street:'',//收货街道
				date: "",//日期
				order_no:'',//单号
				// is_invoice:'',//是否开票
				send_name:'',//寄件人姓名
				send_phone:'',//寄件人电话
				send_street:'',//寄件人街道
				checkedArr:[], //复选框选中的值，工种
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				totalAmount:'',
				totalWeight:'',
				totalProfit:'',
				totalprofitMargin:'',
				salesCommissions:'',
				colleaguesCommission:'',
				chengben:'',
				customer_rate:'',
				colleague_rate:'',
				salesId:'',
				pingbi:1,
				data:[],
				yincang:1,
				supply_list:[],
				express_no:[],
				expressage:[],
				express_text:'',
				express_id:'',
				count:-1,
            }
        },
        mounted() {
        },
		onShareAppMessage(res){
		    return { 
		         title:'您好,这是销售单详情',
				 path: `/pages/sales/details/details?uid=${this.data}`,
		         // path:'/pages/user/uesr',
				 success(res) {
					 uni.showToast({
					 	title:'分享成功',
					 	icon:'none',
					 	duration: 2000
					 })
				 },
				 fail(res) {
					 uni.showToast({
					 	title:'分享失败',
					 	icon:'none',
					 	duration: 2000
					 })
				 }
			}
		},
        onLoad(option) {
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
			let dateTime = new Date().toISOString()
			that.date = this.dateFormat(dateTime)
			that.uid = this.common.get("uid")
			that.http({
			    url: that.api.Sales_send_info,
			    method: "POST",
			    data: {
			        uid: that.common.get("uid"),
			    },
			    success: res => {
					that.sendaddressNode = {
						province: res.send_province,
						city: res.send_city,
						prefecture:res.send_area,
					}
					that.sendcityList[0] = res.send_province
					that.sendcityList[1] = res.send_city
					that.sendcityList[2] = res.send_area
					that.send_name = res.send_name
					that.send_phone = res.send_phone
					that.send_street = res.send_street
			    }
			})
			if(option.uid) {
				console.log('e',option)
				var a = option.uid.split(",")
				console.log('a',a)
				that.uid = a[0]
				that.salesId = a[1]
				that.pingbi = 2
				that.yincang = 2
				that.data[0] = that.uid
				that.data[1] = that.salesId
			} else {
				console.log('e',option)
				that.uid = that.common.get("uid")
				that.salesId = that.option = JSON.parse(decodeURIComponent(option.data))
				that.data[0] = that.uid
				that.data[1] = that.salesId
			}
			setTimeout(() =>{
				// 进入页面
				that.http({
				    url: that.api.Sales_detail,
				    method: "POST",
				    data: {
				        uid: that.uid,
						id:that.salesId
				    },
				    success: res => {
						that.clientName = res.customer_name
						that.clientId = res.customer_id
						that.contact_name = res.contact_name,//收货人姓名
						that.contact_phone = res.contact_phone,//收货人电话
						that.street = res.street,//收货街道
						that.date = res.date,//日期
						that.order_no = res.order_no,//单号
						// that.is_invoice = res.is_invoice,//是否开票
						that.is_fic = res.is_fic,//是否虚拟
						that.send_name = res.send_name,//寄件人姓名
						that.send_phone = res.send_phone,//寄件人电话
						that.send_street = res.send_street,//寄件人街道
						that.addressNode.province = res.province,
						that.addressNode.city = res.city,
						that.addressNode.prefecture = res.area,
						that.sendaddressNode.province = res.send_province,
						that.sendaddressNode.city = res.send_city,
						that.sendaddressNode.prefecture = res.send_area,
						that.addressData = res.address
						that.colleague_rate = res.colleague_rate
						that.customer_rate = res.customer_rate
						that.salesCommissions = res.sales_percent
						that.colleaguesCommission = res.other_percent
						// that.invoiceList.map((item,index) =>{
						// 	if(item.id == res.is_invoice) {
						// 		that.wIndex = index
						// 	}
						// })
						that.ficList.map((item,index) =>{
							if(item.id == res.is_fic) {
								that.fIndex = index
							}
						})
						res.total_data.map((item,index) =>{
							that.list.push({
								'id':item.goods_id,
								'sales_price':item.price,
								'count':item.count,
								'remark':item.remark,
								'weight':item.weight,
								'name':item.goods_name,
								'cost_price':item.cost_price,
								'costAmount':item.total_cost_price,
								'sales_price':item.price,
								'salesAmount':item.total_price,
								'profits':item.total_profit_price,
								'profitMargin':item.profit_rate,
								'remark':item.remark
							})
						})
						that.list.map((item,index) => {
							that.totalWeight = Number(that.totalWeight)+Number(item.weight)
							that.totalAmount = Number(that.totalAmount)+Number(item.salesAmount)
							that.totalProfit = Number(that.totalProfit)+Number(item.profits)
							that.chengben = Number(that.chengben)+Number(item.costAmount)
						})
						if(that.totalProfit>0 && that.chengben>0) {
							that.totalprofitMargin =((Number(that.totalProfit)/Number(that.chengben))*100).toFixed(2)
						}
						that.supply_list = res.supply_list
						that.express_no = res.express_no
				    }
				})
			},500)
        },
        methods: {
			copy(eve) {
				wx.setClipboardData({
					data:eve.express_no,
					showToast:false,
					success() {
					}
				})
			},
			
			pingbiclick() {
				this.pingbi = 2
			},
			huifu() {
				this.pingbi = 1
			},
			// 全选事件
			changeAll(e){
				console.log('changeAll',e)
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.goodList){
			            let itemVal=String(item.id);
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
			// 选择省市区
			// 获取地址信息
			selCity(e) {
				const that = this;
				let val = e.target.value
				this.cityList = val
				that.addressNode = {
					province: this.cityList[0],
					city: this.cityList[1],
					prefecture:this.cityList[2],
				}
			},
			// 寄件人
			sendCity(e) {
				const that = this;
				let val = e.target.value
				this.sendcityList = val
				that.sendaddressNode = {
					province: this.sendcityList[0],
					city: this.sendcityList[1],
					prefecture:this.sendcityList[2],
				}
			},
			// 收货地址识别
			addressDataChange(eve) {
				this.http({
				    url: this.api.Sales_check_address,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						address:eve,
				    },
				    success: res => {
						this.addressNode = {
							province: res.province,
							city: res.city,
							prefecture:res.area,
						}
						this.cityList[0] = res.province
						this.cityList[1] = res.city
						this.cityList[2] = res.prefecture
						this.contact_name = res.send_name
						this.contact_phone = res.send_phone
						this.street = res.street
				    }
				})
			},
			// 是否开票
			// changeinvoice(eve) {
			// 	this.wIndex = eve.detail.value
			// 	this.is_invoice = this.invoiceList[this.wIndex].id
			// },
			// 是否虚拟
			changefic(eve) {
				this.fIndex = eve.detail.value
				this.is_fic = this.ficList[this.fIndex].id
			},
			// 查询物流
			changeCourier(eve,index) {
				this.count = index
				this.express_id = eve.send_id
				this.http({
					url: this.api.Sales_express_info,
					method: "POST",
					data: {
						uid: this.uid,
						send_id:eve.send_id,
					},
					success: res => {
						this.expressage = res.expressage
					}
				})
			},
			update() {
				if(this.express_id.length > 0) {
					uni.showToast({
						title:'请先查询快递物流',
						icon:'none',
						duration: 2000
					})
				} else {
					this.http({
						url: this.api.Sales_update_express,
						method: "POST",
						data: {
							uid: this.uid,
							send_id:this.express_id,
						},
						success: res => {
							this.http({
								url: this.api.Sales_express_info,
								method: "POST",
								data: {
									uid: this.uid,
									send_id:this.express_id,
								},
								success: res => {
									this.expressage = res.expressage
								}
							})
						}
					})
				}
				
			},
			// 客户列表
			clientInList() {
				this.http({
				    url: this.api.Customer_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						name:this.username,
						page:this.page-1,
						length:20
				    },
				    success: res => {
						this.clientList= res.list
						this.total = res.total
				    }
				})
			},
			// 客户选择点击
			selectClient(i) {
				this.clientId = this.clientList[i].id
				this.clientName = this.clientList[i].name
				this.showClient = false
			    this.preventEvent = false
				this.page = 1
				
				this.http({
				    url: this.api.Customer_to_rate,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						source:this.clientList[i].source,
				    },
				    success: res => {
						if(this.clientList[i].source == 3) {
							this.colleague_rate = Number(res.colleague_rate)/100
						} else {
							this.colleague_rate = 0
						}
						this.customer_rate= Number(res.customer_rate)/100
				    }
				})
				this.salesCommissions = this.totalProfit*this.customer_rate.toFixed(2)
				this.colleaguesCommission = this.totalProfit*this.colleague_rate.toFixed(2)
			},
			// 客户名称搜索
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
			// 商品接口
			shopList() {
				this.http({
				    url: this.api.Sales_goods_list,
				    method: "POST",
				    data: {
				        uid: this.uid,
						name: this.textGood,
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
                } else {
					this.showGood = true
					this.shopList()
				}
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
            },
			
			// 商品选择点击
            selectGood() {
                this.prevent = false
                this.showGood = false
				this.http({
				    url: this.api.Sales_get_goods_by_id,
				    method: "POST",
				    data: {
				        uid: this.uid,
						id:this.checkedArr,
				    },
				    success: res => {
						res.map((item,index) => {
							this.list.push(item)
						})
						this.totalWeight = 0
						this.list.map((item,index) => {
							this.totalWeight = Number(this.totalWeight)+Number(item.weight)
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
				if (this.list.length == 1) {
					uni.showToast({
						title:'最少添加一个商品',
						icon:'none',
						duration: 2000
					})
				} else{
					this.list.splice(index, 1)
					this.totalWeight = 0
					this.totalAmount = 0
					this.totalProfit = 0
					this.chengben = 0
					this.list.map((item,index) => {
						this.totalWeight = Number(this.totalWeight)+Number(item.weight)
						this.totalAmount = Number(this.totalAmount)+Number(item.salesAmount)
						this.totalProfit = Number(this.totalProfit)+Number(item.profits)
						this.chengben = Number(this.chengben)+Number(item.costAmount)
					})
					this.totalprofitMargin =((Number(this.totalProfit)/Number(this.chengben))*100).toFixed(2)
					this.salesCommissions = this.totalProfit*this.customer_rate.toFixed(2)
					this.colleaguesCommission = this.totalProfit*this.colleague_rate.toFixed(2)
				}
            },
			// 销售数量  总价
            num(e, i) {
                if (e == "") {
                    e = 0
                }
				this.totalAmount = 0
				this.totalProfit = 0
				this.totalprofitMargin = 0
				this.salesCommissions = 0
				this.colleaguesCommission = 0
				this.chengben = 0
                this.list[i].count = e
				this.list[i].costAmount = (this.list[i].cost_price * this.list[i].count).toFixed(2)
				this.list[i].salesAmount = (this.list[i].sales_price * this.list[i].count).toFixed(2)
				this.list[i].profits = this.list[i].salesAmount - this.list[i].costAmount
				this.list[i].profitMargin = ((this.list[i].profits/this.list[i].costAmount)*100).toFixed(2)
				this.list.map((item,index) => {
					this.totalAmount = Number(this.totalAmount)+Number(item.salesAmount)
					this.totalProfit = Number(this.totalProfit)+Number(item.profits)
					this.chengben = Number(this.chengben)+Number(item.costAmount)
				})
				this.totalprofitMargin =((Number(this.totalProfit)/Number(this.chengben))*100).toFixed(2)
				this.salesCommissions = this.totalProfit*this.customer_rate.toFixed(2)
				this.colleaguesCommission = this.totalProfit*this.colleague_rate.toFixed(2)
            },
			// 销售单价
			price(e, i) {
			    if (e == "") {
			        e = 0
			    }
				this.totalAmount = 0
				this.totalProfit = 0
				this.totalprofitMargin = 0
				this.salesCommissions = 0
				this.colleaguesCommission = 0
				this.chengben = 0
			    this.list[i].sales_price = e
				this.list[i].salesAmount = (this.list[i].sales_price * this.list[i].count).toFixed(2)
				this.list[i].profits = this.list[i].salesAmount - this.list[i].costAmount
				this.list[i].profitMargin = ((this.list[i].profits/this.list[i].costAmount)*100).toFixed(2)
				this.list.map((item,index) => {
					this.totalAmount = Number(this.totalAmount)+Number(item.salesAmount)
					this.totalProfit = Number(this.totalProfit)+Number(item.profits)
					this.chengben = Number(this.chengben)+Number(item.costAmount)
				})
				this.totalprofitMargin =((Number(this.totalProfit)/Number(this.chengben))*100).toFixed(2)
				this.salesCommissions = this.totalProfit*this.customer_rate.toFixed(2)
				this.colleaguesCommission = this.totalProfit*this.colleague_rate.toFixed(2)
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
					a.push({'goods_id':item.id,'price':item.sales_price,'count':item.count,'remark':item.remark})
				})
				console.log('a',a)
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.Sales_submit,
							    method: "POST",
							    data: {
							        uid: this.uid,
									contact_name:this.contact_name,//收货人姓名
									contact_phone:this.contact_phone,//收货人电话
									street:this.street,//收货街道
									date: this.date,//日期
									order_no:this.order_no,//单号
									customer_id:this.clientId,//客户id
									// is_invoice:this.is_invoice,//是否开票
									is_fic:this.is_fic,//是否虚拟
									send_name:this.send_name,//寄件人姓名
									send_phone:this.send_phone,//寄件人电话
									send_street:this.send_street,//寄件人街道
									province:this.addressNode.province,
									city:this.addressNode.city,
									area:this.addressNode.prefecture,
									send_province:this.sendaddressNode.province,
									send_city:this.sendaddressNode.city,
									send_area:this.sendaddressNode.prefecture,
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
	.btna {
		color: #F5605A;
	}
	.background_bottom {
		margin-left: 24rpx;
		margin-top: 7%;
	}
	.background_bottom_box {
		height: 200rpx;
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
		height: 260rpx;
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
	image {
		width: 16rpx;
		height: 10rpx;
		position: absolute;
		right: 20rpx;
		bottom: 36rpx;
	}
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
