(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"+dQU":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,a,n,o,r,l,c,u,d=v(i("14Xm")),m=v(i("D3Ub")),f=v(i("SdNB")),b=v(i("7tqo")),h=v(i("fhF1")),p=v(i("otoU"));function v(e){return e&&e.__esModule?e:{default:e}}t.default={name:"account-security",components:{updPassword:b.default,bindMobile:h.default,bindEmail:p.default},data:function(){return{locationPath:location.href,userId:this.$storage.getItem("userId"),isLoading:!1,bindStatusForm:{isBindMobile:"1"},updPwdDialogVisible:!1,bindPhoneDialogVisible:!1,bindEmailDialogVisible:!1}},methods:{closeUpdPasswordDialog:function(){this.updPwdDialogVisible=!1},closeBindPhoneDialog:function(e){this.bindPhoneDialogVisible=!1,e&&this.getBindStatus()},closeBindEmailDialog:function(e){this.bindEmailDialogVisible=!1,e&&this.getBindStatus()},disBindEmailConfirm:function(){var e=this;this.$confirm("解绑邮箱？","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(function(){e.disBindEmail()}).catch(function(){})},disBindEmail:(u=(0,m.default)(d.default.mark(function e(){var t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new f.default).disBindEmail();case 2:(t=e.sent).fail?this.$message.error(t.retDesc):(this.$message.success({message:t.retDesc,duration:1e3}),this.getBindStatus());case 4:case"end":return e.stop()}},e,this)})),function(){return u.apply(this,arguments)}),disBindMobileConfirm:function(){var e=this;this.$confirm("解绑手机？","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(function(){e.disBindMobile()}).catch(function(){})},disBindMobile:(c=(0,m.default)(d.default.mark(function e(){var t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new f.default).disBindMobile();case 2:(t=e.sent).fail?this.$message.error(t.retDesc):(this.$message.success({message:t.retDesc,duration:1e3}),this.getBindStatus());case 4:case"end":return e.stop()}},e,this)})),function(){return c.apply(this,arguments)}),openWeixinBind:function(){var e=encodeURIComponent("http://websim.yunhf.com.cn/suzhou/#/mycenter/security"),t="https://open.weixin.qq.com/connect/qrconnect?appid="+window.API_CONFIG.wechatAppID+"&scope=snsapi_login&redirect_uri="+e+"&state=STATE#wechat_redirect&login_type=jssdk&self_redirect=false&styletype=&sizetype=&bgcolor=&rst=";window.open(t,"_self")},weixinBind:(l=(0,m.default)(d.default.mark(function e(t){var i;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,(new f.default).bindWeixin({wechatCode:t});case 4:i=e.sent,this.$router.push({name:"mycenter.security"}),this.isLoading=!1,i.fail?this.$message.error(i.retDesc):this.$message.success({message:i.retDesc,duration:1e3}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),this.$message.error(e.t0.retDesc),this.isLoading=!1;case 14:case"end":return e.stop()}},e,this,[[0,10]])})),function(e){return l.apply(this,arguments)}),disBindWeixin:(r=(0,m.default)(d.default.mark(function e(){var t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,(new f.default).disBindWeixin();case 4:t=e.sent,this.isLoading=!1,t.fail?this.$message.error(t.retDesc):(this.$message.success({message:t.retDesc,duration:1e3}),this.getBindStatus()),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),this.$message.error(e.t0.retDesc),this.isLoading=!1;case 13:case"end":return e.stop()}},e,this,[[0,9]])})),function(){return r.apply(this,arguments)}),openAlipayBind:function(){var e=encodeURIComponent("http://websim.yunhf.com.cn/suzhou/#/mycenter/security"),t="https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id="+window.API_CONFIG.alipayAppID+"&scope=auth_user&redirect_uri="+e+"&state=init";window.open(t,"_self")},aplipayBind:(o=(0,m.default)(d.default.mark(function e(t){var i;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,(new f.default).bindAlipay({authCode:t});case 4:i=e.sent,this.$router.push({name:"mycenter.security"}),this.isLoading=!1,i.fail?this.$message.error(i.retDesc):this.$message.success({message:i.retDesc,duration:1e3}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),this.$message.error(e.t0.retDesc),this.isLoading=!1;case 14:case"end":return e.stop()}},e,this,[[0,10]])})),function(e){return o.apply(this,arguments)}),disBindAlipay:(n=(0,m.default)(d.default.mark(function e(){var t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,(new f.default).disBindAlipay();case 4:t=e.sent,this.isLoading=!1,t.fail?this.$message.error(t.retDesc):(this.$message.success({message:t.retDesc,duration:1e3}),this.getBindStatus()),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),this.$message.error(e.t0.retDesc),this.isLoading=!1;case 13:case"end":return e.stop()}},e,this,[[0,9]])})),function(){return n.apply(this,arguments)}),getBindStatus:(a=(0,m.default)(d.default.mark(function e(){var t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,(new f.default).getBindStatus({userId:this.userId});case 4:t=e.sent,this.isLoading=!1,t.fail?this.$message.error(t.retDesc):this.bindStatusForm=t.data,e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),this.$message.error(e.t0.retDesc),this.isLoading=!1;case 13:case"end":return e.stop()}},e,this,[[0,9]])})),function(){return a.apply(this,arguments)}),init:(s=(0,m.default)(d.default.mark(function e(){return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("route",this.$route),this.$route.query.code)return e.next=4,this.weixinBind(this.$route.query.code);e.next=4;break;case 4:if(this.$route.query.auth_code)return e.next=7,this.aplipayBind(this.$route.query.auth_code);e.next=7;break;case 7:this.getBindStatus();case 8:case"end":return e.stop()}},e,this)})),function(){return s.apply(this,arguments)})},created:function(){this.init()}}},"/OtH":function(e,t,i){"use strict";i.d(t,"a",function(){return s}),i.d(t,"b",function(){return a});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"account-security"},[i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("修改密码")]),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"action"},[i("el-button",{on:{click:function(e){t.updPwdDialogVisible=!0}}},[t._v("修改密码")])],1)]),t._v(" "),i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("手机绑定")]),t._v(" "),i("div",{staticClass:"remark"},[i("div",[t._v("账号与手机绑定后可使用手机登录")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.bindStatusForm.isBindMobile,expression:"bindStatusForm.isBindMobile === '1'"}]},[t._v("您已绑定："+t._s(t.bindStatusForm.mobile))])]),t._v(" "),i("div",{staticClass:"action"},["1"===t.bindStatusForm.isBindMobile?i("el-button",{on:{click:t.disBindMobileConfirm}},[t._v("解除绑定")]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.bindPhoneDialogVisible=!0}}},[t._v("绑定")])],1)]),t._v(" "),i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("邮箱绑定")]),t._v(" "),i("div",{staticClass:"remark"},[i("div",[t._v("账号与邮箱绑定后可使用邮箱登录")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.bindStatusForm.isBindEmail,expression:"bindStatusForm.isBindEmail === '1'"}]},[t._v("您已绑定："+t._s(t.bindStatusForm.email))])]),t._v(" "),i("div",{staticClass:"action"},["1"===t.bindStatusForm.isBindEmail?i("el-button",{on:{click:t.disBindEmailConfirm}},[t._v("解除绑定")]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.bindEmailDialogVisible=!0}}},[t._v("绑定")])],1)]),t._v(" "),i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("微信绑定")]),t._v(" "),i("div",{staticClass:"remark"},[i("div",[t._v("账号与微信绑定后可使用微信登录")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.bindStatusForm.isBindWechat,expression:"bindStatusForm.isBindWechat === '1'"}]},[t._v("您已绑定："+t._s(t.bindStatusForm.wechat))])]),t._v(" "),i("div",{staticClass:"action"},["1"===t.bindStatusForm.isBindWechat?i("el-button",{on:{click:t.disBindWeixin}},[t._v("解除绑定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.openWeixinBind}},[t._v("绑定")])],1)]),t._v(" "),i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("企业微信绑定")]),t._v(" "),i("div",{staticClass:"remark"},[i("div",[t._v("账号与企业微信绑定后可使用企业微信登录")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.bindStatusForm.isBindEnterpriseWechat,expression:"bindStatusForm.isBindEnterpriseWechat === '1'"}]},[t._v("您已绑定："+t._s(t.bindStatusForm.enterpriseWechat))])]),t._v(" "),i("div",{staticClass:"action"},["1"===t.bindStatusForm.isBindEnterpriseWechat?i("el-button",{attrs:{disabled:""}},[t._v("解除绑定")]):i("el-button",{attrs:{disabled:""}},[t._v("绑定")])],1)]),t._v(" "),i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("支付宝绑定")]),t._v(" "),i("div",{staticClass:"remark"},[i("div",[t._v("账号与支付宝绑定后可使用支付宝登录")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.bindStatusForm.isBindAlipay,expression:"bindStatusForm.isBindAlipay === '1'"}]},[t._v("您已绑定："+t._s(t.bindStatusForm.alipay))])]),t._v(" "),i("div",{staticClass:"action"},["1"===t.bindStatusForm.isBindAlipay?i("el-button",{on:{click:t.disBindAlipay}},[t._v("解除绑定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.openAlipayBind}},[t._v("绑定")])],1)]),t._v(" "),i("div",{staticClass:"item-box"},[i("div",{staticClass:"title"},[t._v("域账号绑定")]),t._v(" "),i("div",{staticClass:"remark"},[i("div",[t._v("账号与域账号绑定后可使用域账号登录")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.bindStatusForm.isBindDomain,expression:"bindStatusForm.isBindDomain === '1'"}]},[t._v("您已绑定："+t._s(t.bindStatusForm.domain))])]),t._v(" "),i("div",{staticClass:"action"},["1"===t.bindStatusForm.isBindDomain?i("el-button",{attrs:{disabled:!0}},[t._v("解除绑定")]):i("el-button",{attrs:{disabled:""}},[t._v("绑定")])],1)]),t._v(" "),i("upd-password",{attrs:{updPwdDialogVisible:t.updPwdDialogVisible},on:{close:t.closeUpdPasswordDialog}}),t._v(" "),i("bind-mobile",{attrs:{bindPhoneDialogVisible:t.bindPhoneDialogVisible},on:{close:t.closeBindPhoneDialog}}),t._v(" "),i("bind-email",{attrs:{bindEmailDialogVisible:t.bindEmailDialogVisible},on:{close:t.closeBindEmailDialog}})],1)},a=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"remark"},[t("div",[this._v("定期修改你的密码，有助于保护账号安全")])])}]},"70lH":function(e,t){},"73uJ":function(e,t,i){"use strict";i.r(t);var s=i("+dQU"),a=i.n(s);for(var n in s)"default"!==n&&function(e){i.d(t,e,function(){return s[e]})}(n);var o=i("/OtH"),r=i("JFUb");function l(e){i("70lH")}var c=Object(r.a)(a.a,o.a,o.b,!1,l,null,null);t.default=c.exports},"7tqo":function(e,t,i){"use strict";i.r(t);var s=i("TVZl"),a=i.n(s);for(var n in s)"default"!==n&&function(e){i.d(t,e,function(){return s[e]})}(n);var o=i("xWqP"),r=i("JFUb");function l(e){i("cZxw")}var c=Object(r.a)(a.a,o.a,o.b,!1,l,null,null);t.default=c.exports},CZSI:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,a,n=d(i("QbLZ")),o=d(i("14Xm")),r=d(i("D3Ub")),l=d(i("FJnT")),c=d(i("SdNB")),u=d(i("I64P"));function d(e){return e&&e.__esModule?e:{default:e}}t.default={name:"bind-email",components:{imageCode:l.default},props:{bindEmailDialogVisible:{type:Boolean,default:!1}},data:function(){return{userId:this.$storage.getItem("userId"),isSubmitForm:!1,showPassword:!1,basicForm:{email:"",verificationCode:""},rules:{email:[{required:!0,message:"邮箱不能为空",trigger:"blur"}],verificationCode:[{required:!0,message:"验证码不能为空",trigger:"blur"}]},getImageCodeDialogVisible:!1,totalTime:60,btnContent:""}},mixins:[u.default],methods:{closeBindEmailDialog:function(e){this.$refs.basicForm.resetFields(),this.$emit("close",e)},closeImageDialog:function(){this.getImageCodeDialogVisible=!1},getVerificationCode:(a=(0,r.default)(o.default.mark(function e(t){var i,s;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={email:this.basicForm.email,imgCode:t},e.next=3,(new c.default).getBindEmaiVerificationCode(i);case 3:s=e.sent,this.getImageCodeDialogVisible=!1,s.fail?this.$message.error(s.retDesc):(this.$message.success(s.retDesc),this.countDown());case 6:case"end":return e.stop()}},e,this)})),function(e){return a.apply(this,arguments)}),countDown:function(){var e=this,t=window.setInterval(function(){--e.totalTime,e.btnContent=e.totalTime+"s后需重新获取",e.totalTime<0&&(window.clearInterval(t),e.btnContent="",e.totalTime=60)},1e3)},submitForm:(s=(0,r.default)(o.default.mark(function e(){var t,i;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.checkForm("basicForm")){e.next=2;break}return e.abrupt("return");case 2:return t=(0,n.default)({userId:this.userId},this.basicForm),this.isSubmitForm=!0,e.prev=4,e.next=7,(new c.default).bindEmail(t);case 7:i=e.sent,this.isSubmitForm=!1,i.fail?this.$message.error(i.retDesc):(this.$message.success({message:i.retDesc,duration:1e3}),this.closeBindEmailDialog(!0)),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),this.closeBindEmailDialog(),this.isSubmitForm=!1;case 16:case"end":return e.stop()}},e,this,[[4,12]])})),function(){return s.apply(this,arguments)})}}},I64P:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{checkForm:function(e){var t=!1;return this.$refs[e].validate(function(e){t=!!e}),t},validateSingleItem:function(e,t){this.$refs[e].validateField(t)}}}},MvG5:function(e,t,i){"use strict";i.d(t,"a",function(){return s}),i.d(t,"b",function(){return a});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:"绑定邮箱",visible:t.bindEmailDialogVisible,width:"500px","custom-class":"bind-email-dialog","close-on-click-modal":!1},on:{close:t.closeBindEmailDialog}},[i("el-form",{ref:"basicForm",attrs:{model:t.basicForm,"label-width":"80px","label-position":"left",rules:t.rules}},[i("el-form-item",{staticClass:"with-validBtn",attrs:{prop:"email",label:"邮箱"}},[i("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:t.basicForm.email,callback:function(e){t.$set(t.basicForm,"email",e)},expression:"basicForm.email"}}),t._v(" "),t.btnContent?i("el-button",{attrs:{disabled:""}},[t._v(t._s(t.btnContent))]):i("el-button",{attrs:{disabled:!t.basicForm.email},on:{click:function(e){t.getImageCodeDialogVisible=!0}}},[t._v("获取验证码")])],1),t._v(" "),i("el-form-item",{attrs:{label:"验证码",prop:"verificationCode"}},[i("el-input",{attrs:{placeholder:"请输入验证码",clearable:""},model:{value:t.basicForm.verificationCode,callback:function(e){t.$set(t.basicForm,"verificationCode",e)},expression:"basicForm.verificationCode"}})],1),t._v(" "),i("el-form-item",[i("el-button",{on:{click:t.closeBindEmailDialog}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.isSubmitForm},on:{click:t.submitForm}},[t._v("确定")])],1)],1),t._v(" "),i("imageCode",{attrs:{dialogVisible:t.getImageCodeDialogVisible,num:t.basicForm.email},on:{close:t.closeImageDialog,getImageCode:t.getVerificationCode}})],1)},a=[]},TVZl:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,a=c(i("14Xm")),n=c(i("D3Ub")),o=c(i("Ulge")),r=c(i("SdNB")),l=c(i("I64P"));function c(e){return e&&e.__esModule?e:{default:e}}t.default={name:"update-password",props:{updPwdDialogVisible:{type:Boolean,default:!1}},data:function(){var s=this;return{isSubmitForm:!1,showPassword:!1,basicForm:{oldPassword:"",newPassword:"",newPassword2:""},rules:{oldPassword:[{required:!0,message:"原密码不能为空",trigger:"blur"}],newPassword:[{required:!0,message:"新密码不能为空",trigger:"blur"},{min:8,max:16,message:"请输入8-16位密码"}],newPassword2:[{required:!0,message:"请确认新密码",trigger:"blur"},{validator:function(e,t,i){""===t?i(new Error("请再次输入新密码")):t!==s.basicForm.newPassword?i(new Error("两次输入密码不一致")):i()},trigger:"blur"}]}}},mixins:[l.default],methods:{closePwdDialog:function(){this.$refs.basicForm.resetFields(),this.$emit("close")},submitForm:(s=(0,n.default)(a.default.mark(function e(){var t,i;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.checkForm("basicForm")){e.next=2;break}return e.abrupt("return");case 2:return t={oldPassword:o.default.encrypt(this.basicForm.oldPassword),newPassword:o.default.encrypt(this.basicForm.newPassword)},this.isSubmitForm=!0,e.prev=4,e.next=7,(new r.default).changePassword(t);case 7:i=e.sent,this.isSubmitForm=!1,i.fail?this.$message.error(i.retDesc):(this.$message.success({message:i.retDesc,duration:1e3}),this.closePwdDialog()),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),this.closePwdDialog(),this.isSubmitForm=!1;case 16:case"end":return e.stop()}},e,this,[[4,12]])})),function(){return s.apply(this,arguments)})}}},cZxw:function(e,t){},fhF1:function(e,t,i){"use strict";i.r(t);var s=i("oujR"),a=i.n(s);for(var n in s)"default"!==n&&function(e){i.d(t,e,function(){return s[e]})}(n);var o=i("hd3X"),r=i("JFUb");function l(e){i("giIp")}var c=Object(r.a)(a.a,o.a,o.b,!1,l,null,null);t.default=c.exports},giIp:function(e,t){},hd3X:function(e,t,i){"use strict";i.d(t,"a",function(){return s}),i.d(t,"b",function(){return a});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:"绑定手机",visible:t.bindPhoneDialogVisible,width:"500px","custom-class":"bind-phone-dialog","close-on-click-modal":!1},on:{close:t.closeBindPhoneDialog}},[i("el-form",{ref:"basicForm",attrs:{model:t.basicForm,"label-width":"80px","label-position":"left",rules:t.rules}},[i("el-form-item",{staticClass:"with-validBtn",attrs:{prop:"phoneNum",label:"手机号码"}},[i("el-input",{attrs:{placeholder:"请输入手机号码"},model:{value:t.basicForm.phoneNum,callback:function(e){t.$set(t.basicForm,"phoneNum",e)},expression:"basicForm.phoneNum"}}),t._v(" "),t.btnContent?i("el-button",{attrs:{disabled:""}},[t._v(t._s(t.btnContent))]):i("el-button",{attrs:{disabled:!t.basicForm.phoneNum},on:{click:function(e){t.getImageCodeDialogVisible=!0}}},[t._v("获取验证码")])],1),t._v(" "),i("el-form-item",{attrs:{label:"验证码",prop:"verificationCode"}},[i("el-input",{attrs:{placeholder:"请输入验证码",clearable:""},model:{value:t.basicForm.verificationCode,callback:function(e){t.$set(t.basicForm,"verificationCode",e)},expression:"basicForm.verificationCode"}})],1),t._v(" "),i("el-form-item",[i("el-button",{on:{click:t.closeBindPhoneDialog}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.isSubmitForm},on:{click:t.submitForm}},[t._v("确定")])],1)],1),t._v(" "),i("imageCode",{attrs:{dialogVisible:t.getImageCodeDialogVisible,num:t.basicForm.phoneNum},on:{close:t.closeImageDialog,getImageCode:t.getBindPhoneVerificationCode}})],1)},a=[]},otoU:function(e,t,i){"use strict";i.r(t);var s=i("CZSI"),a=i.n(s);for(var n in s)"default"!==n&&function(e){i.d(t,e,function(){return s[e]})}(n);var o=i("MvG5"),r=i("JFUb");function l(e){i("owCc")}var c=Object(r.a)(a.a,o.a,o.b,!1,l,null,null);t.default=c.exports},oujR:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,a,n,o=m(i("QbLZ")),r=m(i("14Xm")),l=m(i("D3Ub")),c=m(i("FJnT")),u=m(i("SdNB")),d=m(i("I64P"));function m(e){return e&&e.__esModule?e:{default:e}}t.default={name:"bind-mobile",components:{imageCode:c.default},props:{bindPhoneDialogVisible:{type:Boolean,default:!1}},data:function(){return{userId:this.$storage.getItem("userId"),isSubmitForm:!1,showPassword:!1,basicForm:{phoneNum:"",verificationCode:""},rules:{phoneNum:[{required:!0,message:"手机号码不能为空",trigger:"blur"}],verificationCode:[{required:!0,message:"验证码不能为空",trigger:"blur"}]},getImageCodeDialogVisible:!1,totalTime:60,btnContent:"",clock:null}},watch:{bindPhoneDialogVisible:function(e){e||(window.clearInterval(this.clock),this.btnContent="",this.totalTime=60)}},mixins:[d.default],methods:{closeBindPhoneDialog:function(e){this.$refs.basicForm.resetFields(),this.$emit("close",e)},closeImageDialog:function(){this.getImageCodeDialogVisible=!1},getBindPhoneVerificationCode:(n=(0,l.default)(r.default.mark(function e(t){var i,s;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={phoneNum:this.basicForm.phoneNum,imgCode:t},e.next=3,(new u.default).getBindPhoneVerificationCode(i);case 3:s=e.sent,this.getImageCodeDialogVisible=!1,s.fail?this.$message.error(s.retDesc):(this.$message.success(s.retDesc),this.countDown());case 6:case"end":return e.stop()}},e,this)})),function(e){return n.apply(this,arguments)}),countDown:function(){var e=this;this.clock=window.setInterval(function(){--e.totalTime,e.btnContent=e.totalTime+"s后需重新获取",e.totalTime<0&&(window.clearInterval(e.clock),e.btnContent="",e.totalTime=60)},1e3)},submitForm:(a=(0,l.default)(r.default.mark(function e(){var t,i;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.checkForm("basicForm")){e.next=2;break}return e.abrupt("return");case 2:return t=(0,o.default)({},this.basicForm),this.isSubmitForm=!0,e.prev=4,e.next=7,(new u.default).getChangePhoneCode(t);case 7:i=e.sent,this.isSubmitForm=!1,i.fail||this.bindPhone(i.data),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),this.isSubmitForm=!1;case 15:case"end":return e.stop()}},e,this,[[4,12]])})),function(){return a.apply(this,arguments)}),bindPhone:(s=(0,l.default)(r.default.mark(function e(t){var i,s;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={phoneNum:this.basicForm.phoneNum,modifyCode:t,newPhoneNum:this.basicForm.phoneNum},this.isSubmitForm=!0,e.prev=2,e.next=5,(new u.default).changePhoneByModifyCode(i);case 5:s=e.sent,this.isSubmitForm=!1,s.fail?this.$message.error(s.retDesc):(this.$message.success({message:s.retDesc,duration:1e3}),this.closeBindPhoneDialog(!0)),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(2),this.closeBindPhoneDialog(),this.isSubmitForm=!1;case 14:case"end":return e.stop()}},e,this,[[2,10]])})),function(e){return s.apply(this,arguments)})}}},owCc:function(e,t){},xWqP:function(e,t,i){"use strict";i.d(t,"a",function(){return s}),i.d(t,"b",function(){return a});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:"修改密码",visible:t.updPwdDialogVisible,width:"500px","close-on-click-modal":!1},on:{close:t.closePwdDialog}},[i("el-form",{ref:"basicForm",attrs:{model:t.basicForm,"label-width":"100px","label-position":"left",rules:t.rules}},[i("el-form-item",{attrs:{prop:"oldPassword",label:"原密码"}},[i("el-input",{attrs:{placeholder:"请输入原密码",type:"password"},model:{value:t.basicForm.oldPassword,callback:function(e){t.$set(t.basicForm,"oldPassword",e)},expression:"basicForm.oldPassword"}})],1),t._v(" "),i("el-form-item",{attrs:{prop:"newPassword",label:"新密码"}},[i("el-input",{attrs:{placeholder:"请输入8-16位新密码",type:t.showPassword?"text":"password"},model:{value:t.basicForm.newPassword,callback:function(e){t.$set(t.basicForm,"newPassword",e)},expression:"basicForm.newPassword"}},[i("i",{staticClass:"el-input__icon el-icon-view",attrs:{slot:"suffix"},on:{click:function(e){t.showPassword=!t.showPassword}},slot:"suffix"})])],1),t._v(" "),i("el-form-item",{attrs:{prop:"newPassword2",label:"确认新密码"}},[i("el-input",{attrs:{placeholder:"请输入新密码",type:"password"},model:{value:t.basicForm.newPassword2,callback:function(e){t.$set(t.basicForm,"newPassword2",e)},expression:"basicForm.newPassword2"}})],1),t._v(" "),i("el-form-item",[i("el-button",{on:{click:t.closePwdDialog}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.isSubmitForm},on:{click:t.submitForm}},[t._v("确定")])],1)],1)],1)},a=[]}}]);