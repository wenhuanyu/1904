(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sales/add/add"],{3312:function(t,e,i){"use strict";i.r(e);var s=i("81d3"),n=i.n(s);for(var o in s)"default"!==o&&function(t){i.d(e,t,(function(){return s[t]}))}(o);e["default"]=n.a},"81d3":function(t,e,i){"use strict";(function(t){e.__esModule=!0,e["default"]={data:function(){return{uid:0,invoiceList:[{id:0,name:"否"},{id:1,name:"是"}],ficList:[{id:1,name:"是"},{id:2,name:"否"}],fIndex:-1,wIndex:-1,list:[],clientId:0,clientName:"",showClient:!1,clientList:[],showGood:!1,goodList:[],textGood:"",itemIndex:0,preventEvent:!1,page:1,pageShop:1,total:"",totalShop:"",username:"",addressData:"",cityList:[],addressNode:{province:"",city:"",prefecture:""},sendcityList:[],sendaddressNode:{province:"",city:"",prefecture:""},contact_name:"",contact_phone:"",street:"",date:"",order_no:"",is_invoice:"",is_fic:"",send_name:"",send_phone:"",send_street:"",checkedArr:[],allCheck:{name:"全选",value:"all",checked:!1},totalAmount:"",totalWeight:"",totalProfit:"",totalprofitMargin:"",salesCommissions:"",colleaguesCommission:"",chengben:"",customer_rate:"",colleague_rate:""}},mounted:function(){},onLoad:function(){var t=this;t.http({url:t.api.Wechat_template_list,method:"POST",data:{uid:t.common.get("uid")},success:function(e){0==e.list[0].status&&wx.getSetting({withSubscriptions:!0,success:function(i){if(i.subscriptionsSetting.mainSwitch)if(null!=i.subscriptionsSetting.itemSettings){var s=i.subscriptionsSetting.itemSettings[tmplIds];"accept"===s?console.log("接受了消息推送"):"reject"===s?console.log("拒绝消息推送"):"ban"===s&&console.log("已被后台封禁")}else wx.showModal({title:"提示",content:"请授权开通发货提醒服务通知",showCancel:!0,success:function(i){i.confirm&&wx.requestSubscribeMessage({tmplIds:[e.list[0].template_id],success:function(i){console.log("订阅消息 成功 "),console.log(i);var s=[];s.push({template_id:e.list[0].template_id,status:!0}),t.http({url:t.api.Wechat_auth_template,method:"POST",data:{uid:t.common.get("uid"),data:JSON.stringify(s)},success:function(t){}})},fail:function(t){console.log("订阅消息 失败 "),console.log(t)}})}});else console.log("订阅消息未开启")},fail:function(t){console.log(t)}})}});var e=(new Date).toISOString();t.date=this.dateFormat(e),t.uid=this.common.get("uid"),t.http({url:t.api.Sales_send_info,method:"POST",data:{uid:t.common.get("uid")},success:function(e){t.sendaddressNode={province:e.send_province,city:e.send_city,prefecture:e.send_area},t.sendcityList[0]=e.send_province,t.sendcityList[1]=e.send_city,t.sendcityList[2]=e.send_area,t.send_name=e.send_name,t.send_phone=e.send_phone,t.send_street=e.send_street}})},methods:{changeDate:function(t){this.date=t},changeAll:function(t){console.log("changeAll",t);var e=t.detail.value;if("all"==e[0]){this.allCheck.checked=!0;for(var i=0,s=this.goodList;i<s.length;i++){var n=s[i],o=String(n.id);this.checkedArr.includes(o)||this.checkedArr.push(o)}}else this.allCheck.checked=!1,this.checkedArr=[]},changeCheck:function(t){this.checkedArr=t.detail.value,console.log("this.checkedArr",this.checkedArr),this.checkedArr.length>0&&this.checkedArr.length==this.goodList.length?this.allCheck.checked=!0:this.allCheck.checked=!1},noneEnoughPeople:function(){},dateFormat:function(t){var e=new Date(t),i=e.getFullYear(),s=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,n=e.getDate()<10?"0"+e.getDate():e.getDate(),o=e.getHours()<10?"0"+e.getHours():e.getHours(),c=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),a=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return i+"-"+s+"-"+n+" "+o+":"+c+":"+a},selCity:function(t){var e=this,i=t.target.value;this.cityList=i,e.addressNode={province:this.cityList[0],city:this.cityList[1],prefecture:this.cityList[2]}},sendCity:function(t){var e=this,i=t.target.value;this.sendcityList=i,e.sendaddressNode={province:this.sendcityList[0],city:this.sendcityList[1],prefecture:this.sendcityList[2]}},addressDataChange:function(t){var e=this;this.http({url:this.api.Sales_check_address,method:"POST",data:{uid:this.common.get("uid"),address:t},success:function(t){e.addressNode={province:t.province,city:t.city,prefecture:t.area},e.cityList[0]=t.province,e.cityList[1]=t.city,e.cityList[2]=t.prefecture,e.contact_name=t.send_name,e.contact_phone=t.send_phone,e.street=t.street}})},changeinvoice:function(t){this.wIndex=t.detail.value,this.is_invoice=this.invoiceList[this.wIndex].id},changefic:function(t){this.fIndex=t.detail.value,this.is_fic=this.ficList[this.fIndex].id},clientInList:function(){var t=this;this.http({url:this.api.Customer_list,method:"POST",data:{uid:this.common.get("uid"),name:this.username,page:this.page-1,length:20},success:function(e){t.clientList=e.list,t.total=e.total}})},selectClient:function(t){var e=this;this.clientId=this.clientList[t].id,this.clientName=this.clientList[t].name,this.showClient=!1,this.preventEvent=!1,this.page=1,this.http({url:this.api.Customer_to_rate,method:"POST",data:{uid:this.common.get("uid"),source:this.clientList[t].source},success:function(i){e.customer_rate=Number(i.customer_rate)/100,3==e.clientList[t].source?e.colleague_rate=Number(i.colleague_rate)/100:e.colleague_rate=0}}),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},searchClient:function(){this.clientInList()},handlePage:function(t){this.page=t.current,this.clientInList()},handlePageShop:function(t){this.pageShop=t.current,this.shopList()},shopList:function(){var t=this;this.http({url:this.api.Sales_goods_list,method:"POST",data:{uid:this.uid,name:this.textGood,page:this.pageShop-1,length:20},success:function(e){t.goodList=e.list,t.totalShop=e.total}})},searchGood:function(t){this.shopList()},openModal:function(t){this.preventEvent=!0,"client"==t?(this.showClient=!0,this.clientInList()):(this.showGood=!0,this.shopList())},closeModal:function(t){this.preventEvent=!1,"client"==t?this.showClient=!1:"good"==t&&(this.showGood=!1),this.page=1,this.pageShop=1,this.checkedArr=[]},selectGood:function(){var t=this;this.http({url:this.api.Sales_get_goods_by_id,method:"POST",data:{uid:this.uid,id:this.checkedArr},success:function(e){e.map((function(e,i){t.list.push(e)})),t.totalWeight=0,t.list.map((function(e,i){t.totalWeight=Number(t.totalWeight)+Number(e.weight)})),t.checkedArr=[]}}),console.log("this.list",this.list)},close:function(){this.preventEvent=!1},del:function(t){var e=this;this.list.splice(t,1),this.totalWeight=0,this.totalAmount=0,this.totalProfit=0,this.chengben=0,this.list.map((function(t,i){e.totalWeight=Number(e.totalWeight)+Number(t.weight),e.totalAmount=Number(e.totalAmount)+Number(t.salesAmount),e.totalProfit=Number(e.totalProfit)+Number(t.profits),e.chengben=Number(e.chengben)+Number(t.costAmount)})),this.totalprofitMargin=(Number(this.totalProfit)/Number(this.chengben)*100).toFixed(2),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},num:function(t,e){var i=this;""==t&&(t=0),this.totalAmount=0,this.totalProfit=0,this.totalprofitMargin=0,this.salesCommissions=0,this.colleaguesCommission=0,this.chengben=0,this.list[e].count=t,this.list[e].costAmount=(this.list[e].cost_price*this.list[e].count).toFixed(2),this.list[e].salesAmount=(this.list[e].sales_price*this.list[e].count).toFixed(2),this.list[e].profits=this.list[e].salesAmount-this.list[e].costAmount,this.list[e].profitMargin=(this.list[e].profits/this.list[e].costAmount*100).toFixed(2),this.list.map((function(t,e){i.totalAmount=Number(i.totalAmount)+Number(t.salesAmount),i.totalProfit=Number(i.totalProfit)+Number(t.profits),i.chengben=Number(i.chengben)+Number(t.costAmount)})),this.totalprofitMargin=(Number(this.totalProfit)/Number(this.chengben)*100).toFixed(2),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},price:function(t,e){var i=this;""==t&&(t=0),this.totalAmount=0,this.totalProfit=0,this.totalprofitMargin=0,this.salesCommissions=0,this.colleaguesCommission=0,this.chengben=0,this.list[e].sales_price=t,this.list[e].salesAmount=(this.list[e].sales_price*this.list[e].count).toFixed(2),this.list[e].profits=this.list[e].salesAmount-this.list[e].costAmount,this.list[e].profitMargin=(this.list[e].profits/this.list[e].costAmount*100).toFixed(2),this.list.map((function(t,e){i.totalAmount=Number(i.totalAmount)+Number(t.salesAmount),i.totalProfit=Number(i.totalProfit)+Number(t.profits),i.chengben=Number(i.chengben)+Number(t.costAmount)})),this.totalprofitMargin=(Number(this.totalProfit)/Number(this.chengben)*100).toFixed(2),this.salesCommissions=this.totalProfit*this.customer_rate.toFixed(2),this.colleaguesCommission=this.totalProfit*this.colleague_rate.toFixed(2)},updatePriceArr:function(){for(var t=[],e=0;e<this.list.length;e++)0!=this.list[e].id&&t.push(this.list[e]);return t},previous:function(){var e=getCurrentPages(),i=e[e.length-2];t.navigateBack({success:function(){i.onLoad()}})},submit:function(){var e=this,i=[];this.list.map((function(t,e){i.push({goods_id:t.id,price:t.sales_price,count:t.count,remark:t.remark})})),t.showModal({title:"提示",content:"确定当前操作吗？",success:function(s){s.confirm&&e.http({url:e.api.Sales_submit,method:"POST",data:{uid:e.uid,contact_name:e.contact_name,contact_phone:e.contact_phone,street:e.street,date:e.date,order_no:e.order_no,customer_id:e.clientId,is_invoice:e.is_invoice,is_fic:e.is_fic,send_name:e.send_name,send_phone:e.send_phone,send_street:e.send_street,province:e.addressNode.province,city:e.addressNode.city,area:e.addressNode.prefecture,send_province:e.sendaddressNode.province,send_city:e.sendaddressNode.city,send_area:e.sendaddressNode.prefecture,total_data:JSON.stringify(i)},success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3}),setTimeout((function(){e.previous()}),500)}})},fail:function(){},complete:function(){}})}}}}).call(this,i("d5d0")["default"])},"86e2":function(t,e,i){"use strict";i.r(e);var s=i("9515"),n=i("3312");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("a669");var c,a=i("f0c5"),r=Object(a["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],c);e["default"]=r.exports},9515:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return s}));var s={uniEasyinput:function(){return i.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(i.bind(null,"a715"))},uniDatetimePicker:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(i.bind(null,"1a41"))},uniPagination:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-pagination/components/uni-pagination/uni-pagination")]).then(i.bind(null,"c835"))}},n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.goodList,(function(e,i){var s=t.__get_orig(e),n=t.checkedArr.includes(String(e.id));return{$orig:s,g0:n}})));t.$mp.data=Object.assign({},{$root:{l0:i}})},o=[]},a669:function(t,e,i){"use strict";var s=i("a931"),n=i.n(s);n.a},a931:function(t,e,i){},c35e:function(t,e,i){"use strict";(function(t){i("4381");s(i("dc04"));var e=s(i("86e2"));function s(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("97ff")["createPage"])}},[["c35e","common/runtime","common/vendor"]]]);