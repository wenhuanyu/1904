(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/customer/add/add"],{3735:function(t,e,n){"use strict";n.r(e);var i=n("bca6"),o=n("8300");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("90e1");var a,c=n("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"1f0b2a4b",null,!1,i["a"],a);e["default"]=u.exports},6096:function(t,e,n){},8300:function(t,e,n){"use strict";n.r(e);var i=n("bfc6"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},"90e1":function(t,e,n){"use strict";var i=n("6096"),o=n.n(i);o.a},bca6:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"a715"))},uniPagination:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-pagination/components/uni-pagination/uni-pagination")]).then(n.bind(null,"c835"))}},o=function(){var t=this,e=t.$createElement;t._self._c},s=[]},bfc6:function(t,e,n){"use strict";(function(t){function n(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function i(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){o(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{form:{name:"",channel_id:"",channel:"",contact:"",source:"",format_source:"",other_uid:"",image:[],type:""},ChannelIndex:-1,ChannelList:[],sourceIndex:-1,sourceList:[],showClient:!1,clientList:[],typeList:[],typeIndex:-1,page:1,total:"",nickname:"",username:"",clientName:"",typeName:"",customer_rate:""}},onLoad:function(){var t=this;this.http({url:this.api.Customer_must_data,method:"POST",data:{uid:this.common.get("uid")},success:function(e){t.ChannelList=e.channel_list,t.sourceList=e.source_list,t.typeList=e.type_list}})},methods:{clientInList:function(){var t=this;this.http({url:this.api.Customer_staff_list,method:"POST",data:{uid:this.common.get("uid"),username:this.username,nickname:this.nickname,page:this.page-1,length:5},success:function(e){t.clientList=e.list,t.total=e.total}})},searchClient:function(){this.clientInList()},openModal:function(t,e){this.showClient=!0,this.clientInList()},handlePage:function(t){this.page=t.current,this.clientInList()},closeModal:function(t){this.showClient=!1},selectClient:function(t){this.showClient=!1,this.clientName=this.clientList[t].username,this.form.other_uid=this.clientList[t].id},changeChannel:function(t){this.ChannelIndex=t.target.value,this.form.channel_id=this.ChannelList[this.ChannelIndex].id,this.form.channel=this.ChannelList[this.ChannelIndex].name},changeSource:function(t){var e=this;this.sourceIndex=t.target.value,this.form.source=this.sourceList[this.sourceIndex].id,this.form.format_source=this.sourceList[this.sourceIndex].name,this.http({url:this.api.Customer_to_rate,method:"POST",data:{uid:this.common.get("uid"),source:this.form.source},success:function(t){e.customer_rate=t.customer_rate+"(%)"}})},changeType:function(t){this.typeIndex=t.target.value,this.form.type=this.typeList[this.typeIndex].id,this.typeName=this.typeList[this.typeIndex].name},deleteImage:function(t){this.form.image.splice(t,1)},previewImage:function(t){wx.previewImage({current:this.form.image[t],urls:this.form.image})},uploadImage:function(){var e=this;t.chooseImage({count:1,success:function(n){var i=n.tempFilePaths[0];t.uploadFile({url:e.common.baseUrl+e.api.upload,filePath:i,name:"file",success:function(n){var i=JSON.parse(n.data);console.log("data",i),1==i.code?(e.form.image.push(i.data.url),console.log("this.form.image",e.form.image)):t.showToast({title:"上传失败",icon:"none"})},fail:function(e){t.showToast({title:"上传失败,"+e,icon:"none"})}})}})},previous:function(){var e=getCurrentPages(),n=e[e.length-2];t.navigateBack({success:function(){n.onLoad()}})},add:function(){var e=this;t.showModal({title:"提示",content:"确定当前操作吗？",success:function(t){t.confirm&&(e.form.image=e.form.image.join("|"),e.http({url:e.api.Customer_submit,method:"POST",data:i({uid:e.common.get("uid")},e.form),success:function(t){e.previous()}}))},fail:function(){},complete:function(){}})}}};e.default=s}).call(this,n("d5d0")["default"])},f337:function(t,e,n){"use strict";(function(t){n("4381");i(n("dc04"));var e=i(n("3735"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("97ff")["createPage"])}},[["f337","common/runtime","common/vendor"]]]);