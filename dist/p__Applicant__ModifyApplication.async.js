(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{UbDb:function(e,a,t){"use strict";t.r(a);t("6UJt");var n,l,c,r,p=t("DFOY"),o=(t("iQDF"),t("+eQT")),s=(t("7Kak"),t("9yH6")),i=(t("O3gP"),t("lrIw")),m=(t("IzEo"),t("bx4M")),u=(t("14J3"),t("BMrR")),d=(t("jCWc"),t("kPKH")),g=(t("+L6B"),t("2/Rp")),h=(t("Pwec"),t("CtXQ")),f=t("eHn4"),E=t.n(f),y=(t("/xke"),t("TeRw")),C=t("p0pE"),b=t.n(C),v=(t("miYZ"),t("tsqr")),S=(t("2qtc"),t("kLXV")),N=t("2Taf"),k=t.n(N),w=t("vZ4D"),I=t.n(w),P=t("l4Ni"),F=t.n(P),A=t("ujKo"),M=t.n(A),q=t("MhPg"),O=t.n(q),L=(t("y8nQ"),t("Vl3Y")),D=(t("5NDa"),t("5rEg")),V=(t("OaEy"),t("2fM7")),j=(t("sRBo"),t("kaz8")),x=t("q1tI"),Y=t.n(x),J=t("MuoO"),B=t("zHco"),R=t("wd/R"),T=t.n(R),G=t("8kut"),z=t.n(G),H=t("TNiW"),Q=j["a"].Group,U=V["a"].Option,_=D["a"].TextArea,K={applicant:"\u7533\u8bf7\u4eba",applicantname:"\u8054\u7cfb\u4eba",applicanttel:"\u624b\u673a",businesssort:"\u4e1a\u52a1\u5206\u7c7b",agent:"\u4ee3\u7406\u4eba",agentname:"\u8054\u7cfb\u4eba",agenttel:"\u624b\u673a",payer:"\u4ed8\u6b3e\u4eba",price:"\u68c0\u9a8c\u8d39",reportdate:"\u59d4\u6258\u65e5\u671f",tradeway:"\u8d38\u6613\u65b9\u5f0f",businesssource:"\u4e1a\u52a1\u6765\u6e90",shipname:"\u6807\u8bc6/\u8239\u540d",fromto:"\u4ea7\u5730/\u88c5\u5378\u6e2f",insplinkway:"\u73b0\u573a\u624b\u673a",inspdate:"\u9884\u62a5\u65e5\u671f",cargoname:"\u8d27\u540d",cargosort:"\u8d27\u7269\u7c7b\u522b",quantityd:"\u7533\u62a5\u6570\u91cf",unit:"\u5355\u4f4d",ChineseName:"\u578b\u53f7/\u4fd7\u79f0",inspplace1:"\u68c0\u9a8c\u5730\u70b9",reportno20:"\u81ea\u7f16\u53f7",area:"\u533a/\u53bf/\u5e02",inspway:"\u7533\u8bf7\u9879\u76ee",inspwaymemo1:"\u68c0\u9a8c\u5907\u6ce8",certstyle:"\u8bc1\u4e66\u8981\u6c42",section:"\u6267\u884c\u90e8\u95e8",customsName:"\u6d77\u5173\u90e8\u95e8"};var W=(n=Object(J["connect"])(function(e){var a=e.applicant,t=e.loading;return{applicant:a,loading:t.models.applicant}}),l=L["a"].create(),n(c=l((r=function(e){function a(){var e,t;k()(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return t=F()(this,(e=M()(a)).call.apply(e,[this].concat(l))),t.state={width:"100%",value:1,applicantName:[],agentName:[],payerName:[],checkProject:[],cargos:[],applicantContacts:[],agentContacts:[],visible:!1,departments:[],cargoname:"",company:[],placeName:[]},t.columns=[{title:"\u8bb0\u5f55\u540d",dataIndex:"name"},{title:"\u64cd\u4f5c",render:function(e,a){return Y.a.createElement(x["Fragment"],null,Y.a.createElement("a",{onClick:function(){return t.deleteItem(e,a)}},"\u5220\u9664"))}}],t.validate=function(){S["a"].confirm({title:"\u786e\u5b9a\u63d0\u4ea4\u6b64\u59d4\u6258\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){v["a"].success("\u6b63\u5728\u63d0\u4ea4\u6570\u636e...");var e=t.props,a=e.form.validateFieldsAndScroll,n=e.dispatch;a(function(e,a){var t=JSON.parse(localStorage.getItem("consignor_userinfo")),l=sessionStorage.getItem("prereportno");null!==a.inspplace1&&void 0!==a.inspplace1&&(a.inspplace1=a.inspplace1[2]),e?console.log(e):n({type:"applicant/updatePremaininfo",payload:b()({},a,{prereportno:l,consigoruser:t.userName}),callback:function(e){200===e.code?y["a"].open({message:"\u4fee\u6539\u6210\u529f"}):y["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:e.data})}})})}})},t.deleteItem=function(e){var a=t.state.tempFileList;for(var n in a)if(a[n].name===e.name){a.splice(n,1);break}t.setState({tempFileList:a}),t.forceUpdate()},t.onChange=function(e){t.setState({value:e.target.value});var a=t.props.form;1===t.state.value?a.setFieldsValue(E()({},"payer",a.getFieldValue("applicant"))):a.setFieldsValue(E()({},"payer",a.getFieldValue("agent")))},t.handleAgentSearch=function(e){var a=t.props.dispatch;a({type:"applicant/getBusiness",payload:{name:e},callback:function(e){t.setState({agentName:e})}})},t.handleApplicantSearch=function(e){var a=t.props.dispatch;a({type:"applicant/getBusiness",payload:{name:e},callback:function(e){t.setState({applicantName:e})}})},t.handlePayerSearch=function(e){var a=t.props.dispatch;a({type:"applicant/getBusiness",payload:{name:e},callback:function(e){t.setState({payerName:e})}})},t.cargoSearch=function(e){var a=t.props.dispatch;a({type:"applicant/searchCargos",payload:{value:e},callback:function(e){t.setState({cargos:e})}})},t.handleChangeCargo=function(e){t.setState({cargoname:e})},t.onAppliantChange=function(e){var a=t.props.dispatch;a({type:"applicant/getContacts",payload:{value:e},callback:function(e){t.setState({applicantContacts:e.data})}})},t.handleChange=function(e){var a=e.file,n=e.fileList,l="image/jpg"===a.type,c="image/jpeg"===a.type,r="image/gif"===a.type,p="image/png"===a.type,o="application/pdf"===a.type,s=a.size/1024/1024<20;if(l||c||r||p||o)if(s){var i=a.name,m=/\.{1}[a-z]{1,}$/;null!==m.exec(i)&&(i=i.slice(0,m.exec(i).index));var u=t.props.form;u.setFieldsValue(E()({},"filename",i)),t.setState({fileList:n})}else S["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"});else S["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20JPG \u3001JPEG \u3001GIF\u3001 PNG\u3001 PDF\u683c\u5f0f\u7684\u56fe\u7247~"})},t.onAgentChange=function(e){var a=t.props.dispatch;a({type:"applicant/getContacts",payload:{value:e},callback:function(e){t.setState({agentContacts:e.data})}})},t.onAppliantNameChange=function(e){var a=t.props.form,n=t.state.applicantContacts;for(var l in n)if(n[l].contactName===e){a.setFieldsValue({applicanttel:n[l].contactPhone});break}},t.onAgentNameChange=function(e){var a=t.props.form,n=t.state.agentContacts;for(var l in n)if(n[l].contactName===e){a.setFieldsValue({agenttel:n[l].contactPhone});break}},t.show=function(e){t.setState({visible:!0})},t.handleCancel=function(){var e=t.props.form;e.setFieldsValue({filename:null}),t.setState({fileList:[]}),t.setState({visible:!1})},t.handleOk=function(){var e=t.props,a=e.form.validateFieldsAndScroll;e.dispatch;a(function(e,a){if(!e){a.MultipartFile.fileList[0].name=a.filename,t.state.tempFileList.push(a.MultipartFile.fileList[0]),t.setState({visible:!1});var n=t.props.form;n.setFieldsValue({filename:null}),t.setState({fileList:[]})}})},t.onChangeInspplace=function(e){t.setState({placecode:e[2]});var a=t.props.dispatch,n=JSON.parse(localStorage.getItem("consignor_userinfo")),l={placename:"",placecode:void 0!==e[2]?e[2]:"",consigoruser:n.userName};a({type:"applicant/searchPlaceByPlaceCode",payload:l,callback:function(e){t.setState({placeName:e})}})},t.placeSearch=function(e){var a=t.props.dispatch,n=JSON.parse(localStorage.getItem("consignor_userinfo")),l={placename:e,placecode:void 0!==t.state.placecode?t.state.placecode:"",consigoruser:n.userName};a({type:"applicant/searchPlaceByPlaceCode",payload:l,callback:function(e){t.setState({placeName:e})}})},t.back=function(){t.props.history.goBack()},t.onCertCodeChange=function(e){var a=t.props.dispatch;a({type:"applicant/getCheckProject",payload:{certCode:e},callback:function(e){t.setState({checkProject:e})}})},t}return O()(a,e),I()(a,[{key:"componentDidMount",value:function(){var e=this,a=this.props.form,t=JSON.parse(localStorage.getItem("consignor_userinfo")),n=sessionStorage.getItem("prereportno"),l=this.props.dispatch;l({type:"applicant/getPremaininfo",payload:{prereportno:n},callback:function(t){200===t.code&&l({type:"applicant/getCheckProject",payload:{certCode:t.data.certcode},callback:function(n){e.setState({checkProject:n});var l=[];l.push("".concat(t.data.inspplace1.substring(0,2),"0000")),l.push("".concat(t.data.inspplace1.substring(0,4),"00")),l.push(t.data.inspplace1),a.setFieldsValue({certcode:t.data.certcode,unit:t.data.unit,applicant:t.data.applicant,applicanttel:t.data.applicanttel,agent:t.data.agent,agentname:t.data.agentname,agenttel:t.data.agenttel,payer:t.data.payer,price:t.data.price,shipname:t.data.shipname,inspdate:T()(t.data.inspdate,"YYYY-MM-DD"),quantityd:t.data.quantityd,chineselocalname:t.data.chineselocalname,inspplace1:l,inspplace2:t.data.inspplace2,applicantname:t.data.applicantname,inspway:t.data.inspway.split(" "),inspwaymemo1:t.data.inspwaymemo1})}})}}),l({type:"applicant/getClientName",payload:{},callback:function(a){e.setState({applicantName:a}),e.setState({agentName:a}),e.setState({payerName:a})}}),l({type:"applicant/getConfigorPlaceList",payload:{consigoruser:t.userName},callback:function(a){e.setState({placeName:a})}}),l({type:"applicant/getCargos",payload:{},callback:function(a){e.setState({cargos:a})}}),l({type:"applicant/getCompanyList",payload:{},callback:function(a){e.setState({company:a.data})}})}},{key:"render",value:function(){this.handleOk,this.handleCancel;var e=this.props,a=e.form.getFieldDecorator,t=(e.loading,this.state),n=t.applicantName,l=t.agentName,c=t.payerName,r=t.checkProject,f=t.cargos,E=t.agentContacts,y=t.applicantContacts,C=t.company,b=t.placeName,v=(Y.a.createElement("div",null,Y.a.createElement(h["a"],{type:"plus"}),Y.a.createElement("div",{className:"ant-upload-text"},"Upload")),n.map(function(e){return Y.a.createElement(U,{key:e,value:e},e)})),S=l.map(function(e){return Y.a.createElement(U,{key:e,value:e},e)}),N=c.map(function(e){return Y.a.createElement(U,{key:e,value:e},e)}),k=f.map(function(e){return e.cargonamec}),w=y.map(function(e){return Y.a.createElement(U,{key:e.contactName,value:e.contactName},e.contactName)}),I=E.map(function(e){return Y.a.createElement(U,{key:e.contactName,value:e.contactName},e.contactName)}),P=C.map(function(e){return Y.a.createElement(U,{key:e.certcode,value:e.certcode},e.namec)}),F=b.map(function(e){return e.placename});return Y.a.createElement(B["a"],null,Y.a.createElement(m["a"],{bordered:!1,className:z.a.card},Y.a.createElement(u["a"],{gutter:16},Y.a.createElement(d["a"],{span:2},Y.a.createElement(g["a"],{type:"primary",onClick:this.validate},"\u63d0\u4ea4")),Y.a.createElement(d["a"],{span:2},Y.a.createElement(g["a"],{type:"primary",onClick:this.back},"\u8fd4\u56de")),Y.a.createElement(d["a"],{span:20}))),Y.a.createElement(m["a"],{title:"\u68c0\u9a8c\u673a\u6784",className:z.a.card,bordered:!1},Y.a.createElement(L["a"],{hideRequiredMark:!0,labelAlign:"left"},Y.a.createElement(u["a"],{gutter:16},Y.a.createElement(d["a"],{span:12},Y.a.createElement(L["a"].Item,{label:"\u68c0\u9a8c\u673a\u6784",labelCol:{span:4},wrapperCol:{span:20},colon:!1},a("certcode",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u673a\u6784"}]})(Y.a.createElement(V["a"],{placeholder:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u673a\u6784",filterOption:!1,onChange:this.onCertCodeChange},P)))),Y.a.createElement(d["a"],{span:12})))),Y.a.createElement(m["a"],{title:"\u4e1a\u52a1\u4fe1\u606f",className:z.a.card,bordered:!1},Y.a.createElement(L["a"],{hideRequiredMark:!0,labelAlign:"left"},Y.a.createElement(u["a"],{gutter:16},Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.applicant,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("applicant",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4eba"}]})(Y.a.createElement(i["a"],{className:"global-search",dataSource:v,onChange:this.onAppliantChange,onSearch:this.handleApplicantSearch,placeholder:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4eba"},Y.a.createElement(D["a"],null))))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.applicantname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("applicantname",{})(Y.a.createElement(V["a"],{placeholder:"\u8bf7\u9009\u62e9\u8054\u7cfb\u4eba",filterOption:!1,onChange:this.onAppliantNameChange},w)))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.applicanttel,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("applicanttel",{})(Y.a.createElement(D["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u624b\u673a"}))))),Y.a.createElement(u["a"],{gutter:16},Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.agent,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("agent",{})(Y.a.createElement(i["a"],{className:"global-search",dataSource:S,onChange:this.handleAgentSearch,onSearch:this.onAgentChange,placeholder:"\u8bf7\u8f93\u5165\u4ee3\u7406\u4eba"},Y.a.createElement(D["a"],null))))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.agentname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("agentname",{})(Y.a.createElement(V["a"],{placeholder:"\u8bf7\u9009\u62e9\u8054\u7cfb\u4eba",filterOption:!1,onChange:this.onAgentNameChange},I)))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.agenttel,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("agenttel",{})(Y.a.createElement(D["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u624b\u673a"}))))),Y.a.createElement(u["a"],{gutter:16,type:"flex"},Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.payer,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("payer",{})(Y.a.createElement(i["a"],{className:"global-search",dataSource:N,onSearch:this.handlePayerSearch,placeholder:"\u8bf7\u8f93\u5165\u4ed8\u6b3e\u4eba"},Y.a.createElement(D["a"],null))))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{colon:!1},Y.a.createElement(s["a"].Group,{onChange:this.onChange},Y.a.createElement(s["a"],{value:2},"\u4ed8\u6b3e\u4eba\u540c\u7533\u8bf7\u4eba"),Y.a.createElement(s["a"],{value:1},"\u4ed8\u6b3e\u4eba\u540c\u4ee3\u7406\u4eba")))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.price,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("price",{rules:[{message:"\u8bf7\u8f93\u5165\u68c0\u9a8c\u8d39"}]})(Y.a.createElement(D["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165"}))))))),Y.a.createElement(m["a"],{title:"\u68c0\u67e5\u5bf9\u8c61",className:z.a.card,bordered:!1},Y.a.createElement(L["a"],{hideRequiredMark:!0,labelAlign:"left"},Y.a.createElement(u["a"],{gutter:16},Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.cargoname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("chineselocalname",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8d27\u7269\u540d\u79f0"}]})(Y.a.createElement(i["a"],{className:"global-search",dataSource:k,onChange:this.handleChangeCargo,onSearch:this.cargoSearch,placeholder:"\u8bf7\u8f93\u5165\u8d27\u7269\u540d\u79f0"},Y.a.createElement(D["a"],null))))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.shipname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("shipname",{rules:[]})(Y.a.createElement(D["a"],{placeholder:"\u8bf7\u8f93\u5165\u8239\u540d"})))),Y.a.createElement(d["a"],{span:6},Y.a.createElement(L["a"].Item,{label:K.quantityd,labelCol:{span:8},wrapperCol:{span:16},colon:!1},a("quantityd",{rules:[{whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]})(Y.a.createElement(D["a"],{placeholder:"0"})))),Y.a.createElement(d["a"],{span:2},Y.a.createElement(L["a"].Item,{colon:!1},a("unit",{rules:[]})(Y.a.createElement(V["a"],{placeholder:"\u8bf7\u9009\u62e9"},Y.a.createElement(U,{value:"\u516c\u5428"},"\u516c\u5428"),Y.a.createElement(U,{value:"\u5305"},"\u5305"),Y.a.createElement(U,{value:"\u5343\u514b"},"\u5343\u514b"),Y.a.createElement(U,{value:"\u4e2a"},"\u4e2a"),Y.a.createElement(U,{value:"\u6346"},"\u6346")))))),Y.a.createElement(u["a"],{gutter:16},Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.inspdate,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("inspdate",{rules:[]})(Y.a.createElement(o["a"],{placeholder:"\u9884\u62a5\u65e5\u671f",style:{width:"100%"},format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}})))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.inspplace1,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("inspplace1",{rules:[]})(Y.a.createElement(p["a"],{options:H["a"],placeholder:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u5730\u70b9",onChange:this.onChangeInspplace})))),Y.a.createElement(d["a"],{span:8},Y.a.createElement(L["a"].Item,{label:K.area,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("inspplace2",{rules:[]})(Y.a.createElement(i["a"],{className:"global-search",dataSource:F,onSearch:this.placeSearch,placeholder:"\u8bf7\u8f93\u5165\u8be6\u7ec6\u5730\u5740"},Y.a.createElement(D["a"],null)))))))),Y.a.createElement(m["a"],{title:"\u68c0\u67e5\u9879\u76ee",className:z.a.card,bordered:!1},Y.a.createElement(L["a"],{hideRequiredMark:!0,labelAlign:"left"},Y.a.createElement(u["a"],null,Y.a.createElement(d["a"],{span:24},Y.a.createElement(L["a"].Item,{label:K.inspway,labelCol:{span:2},wrapperCol:{span:22},colon:!1},a("inspway",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4eba"}]})(Y.a.createElement(Q,{options:r}))))),Y.a.createElement(u["a"],null,Y.a.createElement(d["a"],{span:24},Y.a.createElement(L["a"].Item,{label:K.inspwaymemo1,labelCol:{span:2},wrapperCol:{span:22},colon:!1},a("inspwaymemo1",{})(Y.a.createElement(_,{style:{minHeight:32},rows:5,placeholder:"\u7533\u8bf7\u54c1\u8d28\u65f6\uff0c\u8bf7\u7b80\u8981\u8bf4\u660e\u54c1\u8d28\u6307\u6807\u8981\u6c42"}))))))))}}]),a}(x["PureComponent"]),c=r))||c)||c);a["default"]=W}}]);