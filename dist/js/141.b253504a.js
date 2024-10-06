"use strict";(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[141],{7354:(e,t,r)=>{r.d(t,{A:()=>c});var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"description"},[e.title?t("div",{staticClass:"title"},[e._v(e._s(e.title))]):e._e(),e.checkbox?t("input",{attrs:{type:"checkbox"}}):e._e(),e._t("default")],2)},o=[];const s={name:"TextDescription",props:{title:{type:String,default:""},color:{type:String,default:"#333"},checkbox:{type:Boolean,default:!1}}},i=s;var a=r(1656),u=(0,a.A)(i,n,o,!1,null,"4c5ffc5e",null);const c=u.exports},2444:(e,t,r)=>{r.r(t),r.d(t,{default:()=>h});var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("PageTitle",[e._v("Login")]),t("b-form",{on:{submit:function(t){return t.preventDefault(),e.onLogin.apply(null,arguments)}}},[t("custom-input",{attrs:{id:"Username",label:"Username:",hasError:e.$v.form.username.$error},scopedSlots:e._u([{key:"feedback",fn:function(){return[e._v(" Username is required ")]},proxy:!0}])},[t("b-form-input",{attrs:{id:"Username",type:"text",state:e.validateState("username")},model:{value:e.$v.form.username.$model,callback:function(t){e.$set(e.$v.form.username,"$model",t)},expression:"$v.form.username.$model"}})],1),t("custom-input",{attrs:{id:"Password",label:"Password:",hasError:e.$v.form.password.$error},scopedSlots:e._u([{key:"feedback",fn:function(){return[e._v(" Password is required ")]},proxy:!0}])},[t("b-form-input",{attrs:{id:"Password",type:"password",state:e.validateState("password")},model:{value:e.$v.form.password.$model,callback:function(t){e.$set(e.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}})],1),t("CustomButton",{attrs:{fullWidth:!0,type:"submit",variant:"primary"}},[e._v(" Login ")]),t("div",{staticClass:"mt-2"},[e._v(" Do not have an account yet? "),t("router-link",{attrs:{to:"register"}},[e._v(" Register in here")])],1)],1),e.form.submitError?t("b-alert",{staticClass:"mt-2",attrs:{variant:"warning",dismissible:"",show:""}},[e._v(" Login failed: "+e._s(e.form.submitError)+" ")]):e._e()],1)},o=[],s=r(459),i=r(388),a=(r(4114),r(2010),r(3278)),u=r(3484),c=r(2411),l=r(4903),m=r(5454);const d={name:"Login",components:{CustomInput:c.A,PageTitle:l.A,CustomButton:m.A},data:function(){return{form:{username:"",password:"",submitError:void 0}}},validations:{form:{username:{required:a.mw},password:{required:a.mw}}},methods:{validateState:function(e){var t=this.$v.form[e],r=t.$dirty,n=t.$error;return r?!n:null},Login:function(){var e=this;return(0,i.A)((0,s.A)().mark((function t(){return(0,s.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=4,(0,u.az)(e.form.username,e.form.password);case 4:t.sent,e.$root.store.login(e.form.username),e.$router.push("/")["catch"]((function(e){if("NavigationDuplicated"!==e.name)throw e})),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),e.form.submitError=t.t0.response?t.t0.response.data.message:"Login failed";case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},onLogin:function(){this.form.submitError=void 0,this.$v.form.$touch(),this.$v.form.$anyError||this.Login()}}},f=d;var p=r(1656),v=(0,p.A)(f,n,o,!1,null,"3771d3e4",null);const h=v.exports},8957:(e,t,r)=>{r.r(t),r.d(t,{default:()=>$});var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[e.$root.store.username?t("PageTitle",[e._v("Welcome "+e._s(e.$root.store.username))]):t("PageTitle",[e._v("Welcome Guest")]),t("div",{staticClass:"columns"},[t("div",{staticClass:"left-column"},[t("RecipePreviewList",{key:e.rerenderKey,ref:"randomList",attrs:{"fetch-function":e.updateRandomList,familyRecipe:!1}},[e._v(" Explore these recipes")]),t("button",{staticClass:"btnRandom",on:{click:e.updateRandomList}},[e._v("Random New Recipes")])],1),t("div",{staticClass:"right-column"},[t(e.rightColumnComponent,{ref:"family",tag:"component",class:{"login-border":"LoginPage"===e.rightColumnComponent},attrs:{title:e.rightColumnTitle,fetchFunction:e.updateFamily,familyRecipe:!0}}),e.$root.store.username?e._e():t("ReasonsToLogin")],1)])],1)},o=[],s=r(459),i=r(388),a=r(9713),u=r(4903),c=r(2444),l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"reasons-to-login"},[t("TextDescription",{attrs:{title:e.loginTitle}},[e._v(" Discover more with Vue Recipes! "),t("strong",[e._v("Unlock the full experience")]),e._v(" by logging in today. Whether you're searching for culinary inspiration, organizing your "),t("strong",[e._v("favorite recipes")]),e._v(", or sharing creations, our community enhances your cooking journey. ")]),t("TextDescription",[e._v(" Log in to save and discover recipes, track culinary adventures, and connect with food enthusiasts. Start enhancing your cooking now! ")])],1)},m=[],d=r(7354);const f={name:"ReasonsToLogin",components:{TextDescription:d.A},computed:{loginTitle:function(){return"Discover More with Vue Recipes!"}}},p=f;var v=r(1656),h=(0,v.A)(p,l,m,!1,null,"093e14f8",null);const g=h.exports;r(8708);const _={components:{RecipePreviewList:a.A,PageTitle:u.A,LoginPage:c["default"],ReasonsToLogin:g},data:function(){return{rerenderKey:0}},methods:{updateRandomList:function(){var e=this;return(0,i.A)((0,s.A)().mark((function t(){return(0,s.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.randomList.updateRandom();case 1:case"end":return t.stop()}}),t)})))()},updateFamily:function(){var e=this;return(0,i.A)((0,s.A)().mark((function t(){return(0,s.A)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.family.mockGetFamilyRecipes();case 1:case"end":return t.stop()}}),t)})))()}},computed:{rightColumnComponent:function(){return this.$root.store.username?"RecipePreviewList":"LoginPage"},rightColumnFetchFunction:function(){return this.$root.store.username?this.mockGet3LastWatchedRecipes:null},rightColumnFamilyRecipe:function(){return!this.$root.store.username&&null},rightColumnTitle:function(){return this.$root.store.username?"Last watched recipes":""}}},w=_;var y=(0,v.A)(w,n,o,!1,null,"7f1f9637",null);const $=y.exports}}]);
//# sourceMappingURL=141.b253504a.js.map