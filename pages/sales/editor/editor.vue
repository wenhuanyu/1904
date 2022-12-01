<template>
    <view class="fix-padding background">
        <view :class="preventEvent ? 'prevent': ''">
            <view class="container info mb-20">
				<view class="group">
				    <view class="title">订单号</view>
				   <uni-easyinput type="text" class="input" v-model="order_no" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">日期</view>
				    <view class="outModal">
						<uni-datetime-picker class="date-picker" ref="formDate" :value="date"  @change="changeDate($event)" placeholder="请选择日期"/>
				    </view>
				</view>
                <!-- <view class="group">
                    <view class="title">是否开票</view>
                    <picker class="picker" @change="changeinvoice($event)" :value="wIndex" :range="invoiceList"
                        :range-key="'name'">
                        <view v-if="wIndex == -1" class="uni-input">请选择</view>
                        <view v-else class="uni-input">{{invoiceList[wIndex].name}}</view>
                        <image class="image" src="/static/image/picker.png"></image>
                    </picker>
                </view> -->
				<view class="group">
				    <view class="title">是否虚拟</view>
				    <picker class="picker" @change="changefic($event)" :value="fIndex" :range="ficList"
				        :range-key="'name'">
				        <view v-if="fIndex == -1" class="uni-input">请选择</view>
				        <view v-else class="uni-input">{{ficList[fIndex].name}}</view>
				        <image class="image" src="/static/image/picker.png"></image>
				    </picker>
				</view>
				<view class="group">
				    <view class="title">客户名称</view>
				    <view class="outModal" @click="openModal('client')">
				        <uni-easyinput class="input" v-model="clientName" placeholder="请选择"
				            placeholder-style="color:#8D8D8D;" disabled>
				        </uni-easyinput>
				    </view>
				</view>
				<view class="group">
				    <view class="title">收货地址</view>
				   <uni-easyinput  class="input" :value="addressData" @input="addressDataChange($event)" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" suffixIcon="none">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">收货人姓名</view>
				   <uni-easyinput type="text" class="input" v-model="contact_name" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">收货人电话</view>
				   <uni-easyinput type="text" class="input" v-model="contact_phone" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">收货所在区域</view>
				   <picker
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
				<view class="group">
				    <view class="title">街道</view>
				   <uni-easyinput type="text" class="input" v-model="street" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">寄件人姓名</view>
				   <uni-easyinput type="text" class="input" v-model="send_name" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">寄件人电话</view>
				   <uni-easyinput type="text" class="input" v-model="send_phone" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;">
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">寄件所在区域</view>
				   <picker
				   	class="picker"
				   	mode = region
				   	@change="sendCity"
				   	:value="sendcityList"
				   	:range="sendcityList"
					disabled
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
				<view class="group">
				    <view class="title">寄件街道</view>
				   <uni-easyinput type="text" class="input" v-model="send_street" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
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
					    <view class="title">重量(克)</view>
					   <uni-easyinput type="text" class="input" v-model="item.weight" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">销售数量</view>
					   <uni-easyinput  class="input" :value="item.count" @input="num($event,index)" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" >
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">成本单价</view>
					   <uni-easyinput  class="input" :value="item.cost_price"  placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">成本金额</view>
					   <uni-easyinput  class="input" v-model="item.costAmount" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">销售单价</view>
					   <uni-easyinput  class="input" v-model="item.sales_price" @input="price($event,index)" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;">
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">销售金额</view>
					   <uni-easyinput  class="input" v-model="item.salesAmount" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">利润</view>
					   <uni-easyinput type="number" class="input" v-model="item.profits" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
					</view>
					<view class="group">
					    <view class="title">利润率(%)</view>
					   <uni-easyinput type="number" class="input" v-model="item.profitMargin" placeholder="请输入"
					       placeholder-style="color:#8D8D8D;" disabled>
					   </uni-easyinput>
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
				    <view class="title">总销售金额</view>
				   <uni-easyinput type="number" class="input" v-model="totalAmount" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">总重量</view>
				   <uni-easyinput type="number" class="input" v-model="totalWeight" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">整单利润</view>
				   <uni-easyinput type="number" class="input" v-model="totalProfit" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">整单利润率(%)</view>
				   <uni-easyinput type="number" class="input" v-model="totalprofitMargin" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">销售提成</view>
				   <uni-easyinput type="number" class="input" v-model="salesCommissions" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
				<view class="group">
				    <view class="title">同事提成</view>
				   <uni-easyinput type="number" class="input" v-model="colleaguesCommission" placeholder="请输入"
				       placeholder-style="color:#8D8D8D;" disabled>
				   </uni-easyinput>
				</view>
			</view>
			<view v-show="showClient" class="modal" >
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
				            <view class="contact" style="height: 80%">
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
        <view class="container fix-bottom">
            <button class="btn-submit" @click="submit">编辑</button>
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
				salesId:''
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
				    url: this.api.Sales_detail,
				    method: "POST",
				    data: {
				        uid: this.uid,
						id:this.salesId
				    },
				    success: res => {
						this.clientName = res.customer_name
						this.clientId = res.customer_id
						this.contact_name = res.contact_name,//收货人姓名
						this.contact_phone = res.contact_phone,//收货人电话
						this.street = res.street,//收货街道
						this.date = res.date,//日期
						this.order_no = res.order_no,//单号
						// this.is_invoice = res.is_invoice,//是否开票
						this.is_fic = res.is_fic,//是否虚拟
						this.send_name = res.send_name,//寄件人姓名
						this.send_phone = res.send_phone,//寄件人电话
						this.send_street = res.send_street,//寄件人街道
						this.addressNode.province = res.province,
						this.addressNode.city = res.city,
						this.addressNode.prefecture = res.area,
						this.sendaddressNode.province = res.send_province,
						this.sendaddressNode.city = res.send_city,
						this.sendaddressNode.prefecture = res.send_area,
						this.addressData = res.address
						this.colleague_rate = res.colleague_rate
						this.customer_rate = res.customer_rate
						this.salesCommissions = res.sales_percent
						this.colleaguesCommission = res.other_percent
						// this.invoiceList.map((item,index) =>{
						// 	if(item.id == res.is_invoice) {
						// 		this.wIndex = index
						// 	}
						// })
						this.ficList.map((item,index) =>{
							if(item.id == res.is_fic) {
								this.fIndex = index
							}
						})
						res.total_data.map((item,index) =>{
							this.list.push({
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
								'remark':item.remark,
								'sales_detail_id':item.sales_detail_id
							})
						})
						this.list.map((item,index) => {
							this.totalWeight = Number(this.totalWeight)+Number(item.weight)
							this.totalAmount = Number(this.totalAmount)+Number(item.salesAmount)
							this.totalProfit = Number(this.totalProfit)+Number(item.profits)
							this.chengben = Number(this.chengben)+Number(item.costAmount)
						})
						if(this.totalProfit>0 && this.chengben>0) {
							this.totalprofitMargin =((Number(this.totalProfit)/Number(this.chengben))*100).toFixed(2)
						}
				    }
				})
			},500)
        },
        methods: {
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
						this.customer_rate= Number(res.customer_rate)/100
						if(this.clientList[i].source == 3) {
							this.colleague_rate = Number(res.colleague_rate)/100
						} else {
							this.colleague_rate = 0
						}
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
				this.checkedArr = []
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
						this.checkedArr = []
				    }
				})
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
					a.push({'goods_id':item.id,'price':item.sales_price,'count':item.count,'remark':item.remark,'sales_detail_id':item.sales_detail_id})
				})
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
									id:this.salesId,
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
