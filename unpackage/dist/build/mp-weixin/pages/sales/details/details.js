(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sales/details/details"],{1660:function(t,e,i){"use strict";(function(t){i("4381");s(i("dc04"));var e=s(i("cc4d"));function s(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("97ff")["createPage"])},"5cd3":function(t,e,i){"use strict";i.r(e);var s=i("a8a0"),n=i.n(s);for(var o in s)"default"!==o&&function(t){i.d(e,t,(function(){return s[t]}))}(o);e["default"]=n.a},a8a0:function(t,e,i){"use strict";(function(t){function i(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}e.__esModule=!0,e["default"]={data:function(){return{uid:0,invoiceList:[{id:0,name:"否"},{id:1,name:"是"}],ficList:[{id:1,name:"是"},{id:2,name:"否"}],fIndex:-1,wIndex:-1,list:[],clientId:0,clientName:"",showClient:!1,clientList:[],showGood:!1,goodList:[],textGood:"",itemIndex:0,preventEvent:!1,page:1,pageShop:1,total:"",totalShop:"",username:"",addressData:"",cityList:[],addressNode:{province:"",city:"",prefecture:""},sendcityList:[],sendaddressNode:{province:"",city:"",prefecture:""},contact_name:"",contact_phone:"",street:"",date:"",order_no:"",is_invoice:"",send_name:"",send_phone:"",send_street:"",checkedArr:[],allCheck:{name:"全选",value:"all",checked:!1},totalAmount:"",totalWeight:"",totalProfit:"",totalprofitMargin:"",salesCommissions:"",colleaguesCommission:"",chengben:"",customer_rate:"",colleague_rate:"",salesId:"",pingbi:1,data:[],yincang:1,supply_list:[],express_no:[],cIndex:-1,expressage:[]}},mounted:function(){},onShareAppMessage:function(e){return{title:"您好,这是销售单详情",path:"/pages/sales/details/details?uid="+this.data,success:function(e){t.showToast({title:"分享成功",icon:"none",duration:2e3})},fail:function(e){t.showToast({title:"分享失败",icon:"none",duration:2e3})}}},onLoad:function(t){var e=this;e.http({url:e.api.Wechat_template_list,method:"POST",data:{uid:e.common.get("uid")},success:function(t){0==t.list[0].status&&wx.getSetting({withSubscriptions:!0,success:function(i){if(i.subscriptionsSetting.mainSwitch)if(null!=i.subscriptionsSetting.itemSettings){var s=i.subscriptionsSetting.itemSettings[tmplIds];"accept"===s?console.log("接受了消息推送"):"reject"===s?console.log("拒绝消息推送"):"ban"===s&&console.log("已被后台封禁")}else wx.showModal({title:"提示",content:"请授权开通发货提醒服务通知",showCancel:!0,success:function(i){i.confirm&&wx.requestSubscribeMessage({tmplIds:[t.list[0].template_id],success:function(i){console.log("订阅消息 成功 "),console.log(i);var s=[];s.push({template_id:t.list[0].template_id,status:!0}),e.http({url:e.api.Wechat_auth_template,method:"POST",data:{uid:e.common.get("uid"),data:JSON.stringify(s)},success:function(t){}})},fail:function(t){console.log("订阅消息 失败 "),console.log(t)}})}});else console.log("订阅消息未开启")},fail:function(t){console.log(t)}})}});var s=(new Date).toISOString();if(e.date=this.dateFormat(s),e.uid=this.common.get("uid"),e.http({url:e.api.Sales_send_info,method:"POST",data:{uid:e.common.get("uid")},success:function(t){e.sendaddressNode={province:t.send_province,city:t.send_city,prefecture:t.send_area},e.sendcityList[0]=t.send_province,e.sendcityList[1]=t.send_city,e.sendcityList[2]=t.send_area,e.send_name=t.send_name,e.send_phone=t.send_phone,e.send_street=t.send_street}}),t.uid){console.log("e",t);var n=t.uid.split(",");console.log("a",n),e.uid=n[0],e.salesId=n[1],e.pingbi=2,e.yincang=2}else console.log("e",t),e.uid=e.common.get("uid"),e.salesId=e.option=JSON.parse(decodeURIComponent(t.data)),e.data[0]=e.uid,e.data[1]=e.salesId;setTimeout((function(){e.http({url:e.api.Sales_detail,method:"POST",data:{uid:e.uid,id:e.salesId},success:function(t){e.clientName=t.customer_name,e.clientId=t.customer_id,e.contact_name=t.contact_name,e.contact_phone=t.contact_phone,e.street=t.street,e.date=t.date,e.order_no=t.order_no,e.is_invoice=t.is_invoice,e.is_fic=t.is_fic,e.send_name=t.send_name,e.send_phone=t.send_phone,e.send_street=t.send_street,e.addressNode.province=t.province,e.addressNode.city=t.city,e.addressNode.prefecture=t.area,e.sendaddressNode.province=t.send_province,e.sendaddressNode.city=t.send_city,e.sendaddressNode.prefecture=t.send_area,e.addressData=t.address,e.colleague_rate=t.colleague_rate,e.customer_rate=t.customer_rate,e.salesCommissions=t.sales_percent,e.colleaguesCommission=t.other_percent,e.invoiceList.map((function(i,s){i.id==t.is_invoice&&(e.wIndex=s)})),e.ficList.map((function(i,s){i.id==t.is_fic&&(e.fIndex=s)})),t.total_data.map((function(t,s){var n;e.list.push((n={id:t.goods_id,sales_price:t.price,count:t.count,remark:t.remark,weight:t.weight,name:t.goods_name,cost_price:t.cost_price,costAmount:t.total_cost_price},i(n,"sales_price",t.price),i(n,"salesAmount",t.total_price),i(n,"profits",t.total_profit_price),i(n,"profitMargin",t.profit_rate),i(n,"remark",t.remark),n))})),e.list.map((function(t,i){e.totalWeight=Number(e.totalWeight)+Number(t.weight),e.totalAmount=Number(e.totalAmount)+Number(t.salesAmount),e.totalProfit=Number(e.totalProfit)+Number(t.profits),e.chengben=Number(e.chengben)+Number(t.costAmount)})),e.totalProfit>0&&e.chengben>0&&(e.totalprofitMargin=(Number(e.totalProfit)/Number(e.chengben)*100).toFixed(2)),e.supply_list=t.supply_list,e.express_no=t.express_no}})}),500)},methods:{pingbiclick:function(){this.pingbi=2},huifu:function(){this.pingbi=1},changeAll:function(t){console.log("changeAll",t);var e=t.detail.value;if("all"==e[0]){this.allCheck.checked=!0;for(var i=0,s=this.goodList;i<s.length;i++){var n=s[i],o=String(n.id);this.checkedArr.includes(o)||this.checkedArr.push(o)}}else this.allCheck.checked=!1,this.checkedArr=[]},changeCheck:function(t){this.checkedArr=t.detail.value,console.log("this.checkedArr",this.checkedArr),this.checkedArr.length>0&&this.checkedArr.length==this.goodList.length?this.allCheck.checked=!0:this.allCheck.checked=!1},noneEnoughPeople:function(){},dateFormat:function(t){var e=new Date(t),i=e.getFullYear(),s=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,n=e.getDate()<10?"0"+e.getDate():e.getDate(),o=e.getHours()<10?"0"+e.getHours():e.getHours(),a=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),c=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return i+"-"+s+"-"+n+" "+o+":"+a+":"+c},selCity:function(t){var e=this,i=t.target.value;this.cityList=i,e.addressNode={province:this.cityList[0],city:this.cityList[1],prefecture:this.cityList[2]}},sendCity:function(t){var e=this,i=t.target.value;this.sendcityList=i,e.sendaddressNode={province:this.sendcityList[0],city:this.sendcityList[1],prefecture:this.sendcityList[2]}},addressDataChange:function(t){var e=this;this.http({url:this.api.Sales_check_address,method:"POST",data:{uid:this.common.get("uid"),address:t},success:function(t){e.addressNode={province:t.province,city:t.city,prefecture:t.area},e.cityList[0]=t.province,e.cityList[1]=t.city,e.cityList[2]=t.prefecture,e.contact_name=t.send_name,e.contact_phone=t.send_phone,e.street=t.street}})},changeinvoice:function(t){this.wIndex=t.detail.value,this.is_invoice=this.invoiceList[this.wIndex].id},changefic:function(t){this.fIndex=t.detail.value,this.is_fic=this.ficList[this.fIndex].id},changeCourier:function(t){var e=this;this.cIndex=t.detail.value,this.http({url:this.api.Sales_express_info,method:"POST",data:{uid:this.uid,send_id:this.express_no[this.cIndex].send_id},success:function(t){e.expressage=t.expressage}})},update:function(){var e=this;-1==this.cIndex?t.showToast({title:"请先选择快递单号",icon:"none",duration:2e3}):this.http({url:this.api.Sales_update_express,method:"POST",data:{uid:this.uid,send_id:this.express_no[this.cIndex].send_id},success:function(t){e.http({url:e.api.Sales_express_info,method:"POST",data:{uid:e.uid,send_id:e.express_no[e.cIndex].send_id},success:function(t){e.expressage=t.expressage}})}})},clientInList:function(){var t=this;this.http({url:this.api.Customer_list,method:"POST",data:{uid:this.common.get("uid"),name:this.username,page:this.page-1,length:20},success:function(e){t.clientList=e.list,t.total=e.total}})},selectClient:function(t){var e=this;this.clientId=this.clientList[t].id,this.clientName=this.clientList[t].name,this.showClient=!1,this.preventEvent=!1,this.page=1,this.http({url:this.api.Customer_to_rate,method:"POST",data:{uid:this.common.get("uid"),source:this.clientList[t].source},success:function(i){3==e.clientList[t].source?e.colleague_rate=Number(i.colleague_rate)/100:e.colleague_rate=0,e.customer_rate=Number(i.customer_rate)/100}}),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},searchClient:function(){this.clientInList()},handlePage:function(t){this.page=t.current,this.clientInList()},handlePageShop:function(t){this.pageShop=t.current,this.shopList()},shopList:function(){var t=this;this.http({url:this.api.Sales_goods_list,method:"POST",data:{uid:this.uid,name:this.textGood,page:this.pageShop-1,length:20},success:function(e){t.goodList=e.list,t.totalShop=e.total}})},searchGood:function(t){this.shopList()},openModal:function(t){this.preventEvent=!0,"client"==t?(this.showClient=!0,this.clientInList()):(this.showGood=!0,this.shopList())},closeModal:function(t){this.preventEvent=!1,"client"==t?this.showClient=!1:"good"==t&&(this.showGood=!1),this.page=1,this.pageShop=1},selectGood:function(){var t=this;this.prevent=!1,this.showGood=!1,this.http({url:this.api.Sales_get_goods_by_id,method:"POST",data:{uid:this.uid,id:this.checkedArr},success:function(e){e.map((function(e,i){t.list.push(e)})),t.totalWeight=0,t.list.map((function(e,i){t.totalWeight=Number(t.totalWeight)+Number(e.weight)}))}}),console.log("this.list",this.list)},close:function(){this.preventEvent=!1},del:function(e){var i=this;1==this.list.length?t.showToast({title:"最少添加一个商品",icon:"none",duration:2e3}):(this.list.splice(e,1),this.totalWeight=0,this.totalAmount=0,this.totalProfit=0,this.chengben=0,this.list.map((function(t,e){i.totalWeight=Number(i.totalWeight)+Number(t.weight),i.totalAmount=Number(i.totalAmount)+Number(t.salesAmount),i.totalProfit=Number(i.totalProfit)+Number(t.profits),i.chengben=Number(i.chengben)+Number(t.costAmount)})),this.totalprofitMargin=(Number(this.totalProfit)/Number(this.chengben)*100).toFixed(2),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2))},num:function(t,e){var i=this;""==t&&(t=0),this.totalAmount=0,this.totalProfit=0,this.totalprofitMargin=0,this.salesCommissions=0,this.colleaguesCommission=0,this.chengben=0,this.list[e].count=t,this.list[e].costAmount=(this.list[e].cost_price*this.list[e].count).toFixed(2),this.list[e].salesAmount=(this.list[e].sales_price*this.list[e].count).toFixed(2),this.list[e].profits=this.list[e].salesAmount-this.list[e].costAmount,this.list[e].profitMargin=(this.list[e].profits/this.list[e].costAmount*100).toFixed(2),this.list.map((function(t,e){i.totalAmount=Number(i.totalAmount)+Number(t.salesAmount),i.totalProfit=Number(i.totalProfit)+Number(t.profits),i.chengben=Number(i.chengben)+Number(t.costAmount)})),this.totalprofitMargin=(Number(this.totalProfit)/Number(this.chengben)*100).toFixed(2),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},price:function(t,e){var i=this;""==t&&(t=0),this.totalAmount=0,this.totalProfit=0,this.totalprofitMargin=0,this.salesCommissions=0,this.colleaguesCommission=0,this.chengben=0,this.list[e].sales_price=t,this.list[e].salesAmount=(this.list[e].sales_price*this.list[e].count).toFixed(2),this.list[e].profits=this.list[e].salesAmount-this.list[e].costAmount,this.list[e].profitMargin=(this.list[e].profits/this.list[e].costAmount*100).toFixed(2),this.list.map((function(t,e){i.totalAmount=Number(i.totalAmount)+Number(t.salesAmount),i.totalProfit=Number(i.totalProfit)+Number(t.profits),i.chengben=Number(i.chengben)+Number(t.costAmount)})),this.totalprofitMargin=(Number(this.totalProfit)/Number(this.chengben)*100).toFixed(2),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},updatePriceArr:function(){for(var t=[],e=0;e<this.list.length;e++)0!=this.list[e].id&&t.push(this.list[e]);return t},previous:function(){var e=getCurrentPages(),i=e[e.length-2];t.navigateBack({success:function(){i.onLoad()}})},submit:function(){var e=this,i=[];this.list.map((function(t,e){i.push({goods_id:t.id,price:t.sales_price,count:t.count,remark:t.remark})})),console.log("a",i),t.showModal({title:"提示",content:"确定当前操作吗？",success:function(s){s.confirm&&e.http({url:e.api.Sales_submit,method:"POST",data:{uid:e.uid,contact_name:e.contact_name,contact_phone:e.contact_phone,street:e.street,date:e.date,order_no:e.order_no,customer_id:e.clientId,is_invoice:e.is_invoice,is_fic:e.is_fic,send_name:e.send_name,send_phone:e.send_phone,send_street:e.send_street,province:e.addressNode.province,city:e.addressNode.city,area:e.addressNode.prefecture,send_province:e.sendaddressNode.province,send_city:e.sendaddressNode.city,send_area:e.sendaddressNode.prefecture,total_data:JSON.stringify(i)},success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3}),setTimeout((function(){e.previous()}),500)}})},fail:function(){},complete:function(){}})}}}}).call(this,i("d5d0")["default"])},bc6a:function(t,e,i){"use strict";var s=i("f406"),n=i.n(s);n.a},cc4d:function(t,e,i){"use strict";i.r(e);var s=i("ee2e"),n=i("5cd3");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("bc6a");var a,c=i("f0c5"),r=Object(c["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],a);e["default"]=r.exports},ee2e:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return s}));var s={uniEasyinput:function(){return i.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(i.bind(null,"a715"))},uniDatetimePicker:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(i.bind(null,"1a41"))},uniPagination:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-pagination/components/uni-pagination/uni-pagination")]).then(i.bind(null,"c835"))}},n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.goodList,(function(e,i){var s=t.__get_orig(e),n=t.checkedArr.includes(String(e.id));return{$orig:s,g0:n}})));t.$mp.data=Object.assign({},{$root:{l0:i}})},o=[]},f406:function(t,e,i){}},[["1660","common/runtime","common/vendor"]]]);