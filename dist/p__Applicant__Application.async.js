(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"fbk+":function(e,a,t){"use strict";t.r(a);t("DZo9");var l,n,o,s,c=t("8z0m"),r=(t("iQDF"),t("+eQT")),i=(t("O3gP"),t("lrIw")),p=(t("g9YV"),t("wCAj")),m=(t("6UJt"),t("DFOY")),u=(t("7Kak"),t("9yH6")),d=(t("IzEo"),t("bx4M")),h=(t("Pwec"),t("CtXQ")),g=(t("14J3"),t("BMrR")),f=(t("+L6B"),t("2/Rp")),C=(t("jCWc"),t("kPKH")),y=t("eHn4"),E=t.n(y),v=(t("/xke"),t("TeRw")),b=t("p0pE"),N=t.n(b),S=(t("2qtc"),t("kLXV")),k=(t("miYZ"),t("tsqr")),F=t("2Taf"),w=t.n(F),I=t("vZ4D"),V=t.n(I),P=t("l4Ni"),O=t.n(P),L=t("ujKo"),A=t.n(L),M=t("MhPg"),D=t.n(M),Y=(t("y8nQ"),t("Vl3Y")),q=(t("5NDa"),t("5rEg")),x=(t("OaEy"),t("2fM7")),j=(t("sRBo"),t("kaz8")),J=t("q1tI"),R=t.n(J),z=t("Y2fQ"),H=t("MuoO"),B=t("zHco"),T=t("wd/R"),G=t.n(T),U=t("TNiW"),Q=t("usdK"),K=t("glGN"),_=t.n(K),W=j["a"].Group,Z=x["a"].Option,X=q["a"].TextArea,$={applicant:"\u7533\u8bf7\u4eba",applicantname:"\u8054\u7cfb\u4eba",applicanttel:"\u624b\u673a",businesssort:"\u4e1a\u52a1\u5206\u7c7b",agent:"\u4ee3\u7406\u4eba",agentname:"\u8054\u7cfb\u4eba",agenttel:"\u624b\u673a",payer:"\u4ed8\u6b3e\u4eba",price:"\u68c0\u9a8c\u8d39",reportdate:"\u59d4\u6258\u65e5\u671f",tradeway:"\u8d38\u6613\u65b9\u5f0f",businesssource:"\u4e1a\u52a1\u6765\u6e90",shipname:"\u6807\u8bc6/\u8239\u540d",fromto:"\u4ea7\u5730/\u88c5\u5378\u6e2f",insplinkway:"\u73b0\u573a\u624b\u673a",inspdate:"\u9884\u62a5\u65e5\u671f",cargoname:"\u8d27\u540d",cargosort:"\u8d27\u7269\u7c7b\u522b",quantityD:"\u7533\u62a5\u6570\u91cf",unit:"\u5355\u4f4d",ChineseName:"\u578b\u53f7/\u4fd7\u79f0",inspplace1:"\u68c0\u9a8c\u5730\u70b9",reportno20:"\u81ea\u7f16\u53f7",area:"\u533a/\u53bf/\u5e02",inspway:"\u7533\u8bf7\u9879\u76ee",inspwaymemo1:"\u68c0\u9a8c\u5907\u6ce8",certstyle:"\u8bc1\u4e66\u8981\u6c42",section:"\u6267\u884c\u90e8\u95e8",customsName:"\u96b6\u5c5e\u5173",customsNo:"\u62a5\u5173\u53f7",iscostoms:"\u662f\u5426\u9700\u8981\u5411\u6d77\u5173\u63a8\u9001\u62a5\u544a\uff1f"};var ee=(l=Object(H["connect"])(function(e){var a=e.applicant,t=e.loading;return{applicant:a,loading:t.models.applicant}}),n=Y["a"].create(),l(o=n((s=function(e){function a(){var e,t;w()(this,a);for(var l=arguments.length,n=new Array(l),o=0;o<l;o++)n[o]=arguments[o];return t=O()(this,(e=A()(a)).call.apply(e,[this].concat(n))),t.state={value:1,applicantName:[],agentName:[],payerName:[],checkProject:[],cargos:[],applicantContacts:[],agentContacts:[],visible:!1,departments:[],cargoname:"",fileList:[],tempFileList:[],company:[],placeName:[],placecode:void 0,customsOption:[],isCustoms:!1,dataSource:[]},t.columns=[{title:"\u8bb0\u5f55\u540d",dataIndex:"name"},{title:"\u64cd\u4f5c",render:function(e,a){return R.a.createElement(J["Fragment"],null,R.a.createElement("a",{onClick:function(){return t.deleteItem(e,a)}},"\u5220\u9664"))}}],t.columnsCompany=[{title:"\u5546\u6807",dataIndex:"photourl",align:"center",render:function(e){return t.getImageSource(e)}},{title:"\u68c0\u9a8c\u673a\u6784",dataIndex:"namec"},{title:"\u6ce8\u518c\u5730\u5740",dataIndex:"adres"},{title:"\u54a8\u8be2\u7535\u8bdd",dataIndex:"tel"},{title:"\u80fd\u529b\u8bf4\u660e",dataIndex:"explanation",key:"desc",width:"25%"},{title:"\u64cd\u4f5c",render:function(e,a){return R.a.createElement(J["Fragment"],null,R.a.createElement("a",{onClick:function(){return t.setCompany(e,a)}},"\u9009\u53d6"),"\xa0\xa0")}}],t.getImageSource=function(e){var a="https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/platform/publiclogo/defaultlogo.png";return void 0!==e&&null!==e&&(a="https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/".concat(e)),R.a.createElement("img",{src:a,height:40})},t.setCompany=function(e){var a=t.props.form;a.setFieldsValue({certcode:e.certcode}),k["a"].success("\u9009\u53d6\u6210\u529f"),t.onCertCodeChange(e.certcode)},t.resetform=function(){S["a"].confirm({title:"\u786e\u5b9a\u8981\u5237\u65b0\u9875\u9762\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){var e=t.props.form;e.resetFields(),t.setState({checkProject:[]});var a=t.props.dispatch;a({type:"applicant/searchAllCompanyListForContact",payload:{},callback:function(e){t.setState({company:e.data})}}),t.setState({isCustoms:!1})}})},t.changeIsCustoms=function(e){var a=t.props.form;1===e.target.value?(t.setState({isCustoms:!0}),a.resetFields("iscostoms",1)):(t.setState({isCustoms:!1}),a.resetFields("iscostoms",0)),a.resetFields("customsName",void 0),a.resetFields("customsNo",void 0),t.okHandle()},t.saveFormInfo=function(){var e=t.props.form,a=N()({isCustoms:t.state.isCustoms},e.getFieldsValue());sessionStorage.setItem("applicationFormValues",JSON.stringify(a))},t.setFormInfo=function(){var e=t.props,a=e.form,l=e.dispatch,n=sessionStorage.getItem("applicationFormValues");if(void 0!==n&&null!==n){var o=JSON.parse(n);void 0!==o.certcode&&null!==o.certcode&&(a.setFieldsValue({certcode:o.certcode}),l({type:"applicant/getCheckProject",payload:{certCode:o.certcode},callback:function(e){t.setState({checkProject:e})}})),void 0!==o.unit&&null!==o.unit&&a.setFieldsValue({unit:o.unit}),void 0!==o.applicant&&null!==o.applicant&&a.setFieldsValue({applicant:o.applicant}),void 0!==o.applicanttel&&null!==o.applicanttel&&a.setFieldsValue({applicanttel:o.applicanttel}),void 0!==o.agent&&null!==o.agent&&a.setFieldsValue({agent:o.agent}),void 0!==o.applicantname&&null!==o.applicantname&&a.setFieldsValue({applicantname:o.applicantname}),void 0!==o.agentname&&null!==o.agentname&&a.setFieldsValue({agentname:o.agentname}),void 0!==o.agenttel&&null!==o.agenttel&&a.setFieldsValue({agenttel:o.agenttel}),void 0!==o.payer&&null!==o.payer&&a.setFieldsValue({payer:o.payer}),void 0!==o.price&&null!==o.price&&a.setFieldsValue({price:o.price}),void 0!==o.shipname&&null!==o.shipname&&a.setFieldsValue({shipname:o.shipname}),void 0!==o.inspdate&&null!==o.inspdate&&a.setFieldsValue({inspdate:G()(o.inspdate,"YYYY-MM-DD")}),void 0!==o.quantityd&&null!==o.quantityd&&a.setFieldsValue({quantityd:o.quantityd}),void 0!==o.chineselocalname&&null!==o.chineselocalname&&a.setFieldsValue({chineselocalname:o.chineselocalname}),void 0!==o.inspplace1&&null!==o.inspplace1&&a.setFieldsValue({inspplace1:o.inspplace1}),void 0!==o.inspplace2&&null!==o.inspplace2&&a.setFieldsValue({inspplace2:o.inspplace2}),void 0!==o.inspway&&null!==o.inspway&&a.setFieldsValue({inspway:o.inspway}),void 0!==o.inspwaymemo1&&null!==o.inspwaymemo1&&a.setFieldsValue({inspwaymemo1:o.inspwaymemo1}),void 0!==o.customsNo&&null!==o.customsNo&&a.setFieldsValue({customsNo:o.customsNo}),void 0!==o.customsName&&null!==o.customsName&&a.setFieldsValue({customsName:o.customsName}),void 0!==o.iscostoms&&null!==o.iscostoms&&(t.setState({isCustoms:!0}),a.setFieldsValue({iscostoms:o.iscostoms})),t.forceUpdate()}},t.validate=function(){S["a"].confirm({title:"\u786e\u5b9a\u63d0\u4ea4\u6b64\u59d4\u6258\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){k["a"].success("\u6b63\u5728\u63d0\u4ea4\u6570\u636e...");var e=t.props,a=e.form,l=e.dispatch,n=t.state.tempFileList;a.validateFieldsAndScroll(function(e,t){var o=JSON.parse(localStorage.getItem("consignor_userinfo"));null!==t.inspplace1&&void 0!==t.inspplace1&&(t.inspplace1=t.inspplace1[2]);var s=a.getFieldValue("customsName");null!==s&&void 0!==s&&0!==s.length&&(t.customsName=s[1]),e||l({type:"applicant/addPremaininfo",payload:N()({},t,{consigoruser:o.userName}),callback:function(e){if(200===e.code){var a=new FormData,t=JSON.parse(localStorage.getItem("consignor_userinfo"));n.forEach(function(e){a.append("files",e.originFileObj)}),a.append("prereportno",e.data),a.append("creator",t.contactName),l({type:"applicant/upload",payload:a,callback:function(a){200===a.code?(v["a"].open({message:"\u6dfb\u52a0\u6210\u529f"}),Q["a"].push({pathname:"/Applicant/UnAccept"})):v["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:e.data})}})}else v["a"].open({message:"\u6dfb\u52a0\u5931\u8d25",description:e.data})}})})}})},t.deleteItem=function(e){var a=t.state.tempFileList;for(var l in a)if(a[l].name===e.name){a.splice(l,1);break}t.setState({tempFileList:a}),t.forceUpdate()},t.onChange=function(e){t.setState({value:e.target.value});var a=t.props.form;1===t.state.value?a.setFieldsValue(E()({},"payer",a.getFieldValue("applicant"))):a.setFieldsValue(E()({},"payer",a.getFieldValue("agent")))},t.handleAgentSearch=function(e){var a=t.props.dispatch;a({type:"applicant/getBusiness",payload:{name:e},callback:function(e){t.setState({agentName:e})}})},t.onCertCodeChange=function(e){var a=t.props.dispatch;a({type:"applicant/getCheckProject",payload:{certCode:e},callback:function(e){t.setState({checkProject:e})}})},t.handleApplicantSearch=function(e){var a=t.props.dispatch;a({type:"applicant/getBusiness",payload:{name:e},callback:function(e){t.setState({applicantName:e})}})},t.handlePayerSearch=function(e){var a=t.props.dispatch;a({type:"applicant/getBusiness",payload:{name:e},callback:function(e){t.setState({payerName:e})}})},t.onChangeInspplace=function(e){t.setState({placecode:e[2]});var a=t.props.dispatch,l=JSON.parse(localStorage.getItem("consignor_userinfo")),n={placename:"",placecode:void 0!==e[2]?e[2]:"",consigoruser:l.userName};a({type:"applicant/searchPlaceByPlaceCode",payload:n,callback:function(e){t.setState({placeName:e})}})},t.placeSearch=function(e){var a=t.props.dispatch,l=JSON.parse(localStorage.getItem("consignor_userinfo")),n={placename:e,placecode:void 0!==t.state.placecode?t.state.placecode:"",consigoruser:l.userName};a({type:"applicant/searchPlaceByPlaceCode",payload:n,callback:function(e){t.setState({placeName:e})}})},t.cargoSearch=function(e){var a=t.props.dispatch,l=JSON.parse(localStorage.getItem("consignor_userinfo"));a({type:"applicant/getConfigorCargoList",payload:{kind:"cargoname",value:e,consigoruser:l.userName},callback:function(e){t.setState({cargos:e})}})},t.handleChangeCargo=function(e){t.setState({cargoname:e})},t.onAppliantChange=function(e){var a=t.props.dispatch;a({type:"applicant/getContacts",payload:{value:e},callback:function(e){t.setState({applicantContacts:e.data})}})},t.handleChange=function(e){var a=e.file,l=e.fileList,n="image/jpg"===a.type,o="image/jpeg"===a.type,s="image/gif"===a.type,c="image/png"===a.type,r="application/pdf"===a.type,i=a.size/1024/1024<20;if(n||o||s||c||r)if(i){var p=a.name,m=/\.{1}[a-z]{1,}$/;null!==m.exec(p)&&(p=p.slice(0,m.exec(p).index));var u=t.props.form;u.setFieldsValue(E()({},"filename",p)),t.setState({fileList:l})}else S["a"].error({title:"\u8d85\u8fc720M\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u4e0a\u4f20~"});else S["a"].error({title:"\u53ea\u80fd\u4e0a\u4f20JPG \u3001JPEG \u3001GIF\u3001 PNG\u3001 PDF\u683c\u5f0f\u7684\u56fe\u7247~"})},t.onAgentChange=function(e){var a=t.props.dispatch;a({type:"applicant/getContacts",payload:{value:e},callback:function(e){t.setState({agentContacts:e.data})}})},t.onAppliantNameChange=function(e){var a=t.props.form,l=t.state.applicantContacts;for(var n in l)if(l[n].contactName===e){a.setFieldsValue({applicanttel:l[n].contactPhone});break}},t.onAgentNameChange=function(e){var a=t.props.form,l=t.state.agentContacts;for(var n in l)if(l[n].contactName===e){a.setFieldsValue({agenttel:l[n].contactPhone});break}},t.show=function(e){t.setState({visible:!0})},t.handleCancel=function(){var e=t.props.form;e.setFieldsValue({filename:null}),t.setState({fileList:[]}),t.setState({visible:!1})},t.handleOk=function(){var e=t.props,a=e.form.validateFieldsAndScroll;e.dispatch;a(function(e,a){if(!e){a.MultipartFile.fileList[0].name=a.filename,t.state.tempFileList.push(a.MultipartFile.fileList[0]),t.setState({visible:!1});var l=t.props.form;l.setFieldsValue({filename:null}),t.setState({fileList:[]})}})},t.getRepeatCustomsNo=function(e,a,l){var n=t.props.dispatch;n({type:"applicant/getRepeatCustomsNo",payload:{customsNo:a},callback:function(e){"repeat"===e?l(Object(z["formatMessage"])({id:"validation.customsNo.repeat"})):"success"===e?l():l(Object(z["formatMessage"])({id:"validation.customsNo.error"}))}})},t.handleSearch=function(e){var a=t.props.dispatch;1===e.iscostoms&&void 0!==e.customsCompany&&0!==e.customsCompany.length?a({type:"applicant/searchCompanyList",payload:e,callback:function(e){e&&t.setState({company:e.data})}}):a({type:"applicant/searchAllCompanyListForContact",payload:e,callback:function(e){e&&t.setState({company:e.data})}})},t.handleFormReset=function(){var e=t.props,a=e.dispatch,l=e.form;a({type:"applicant/searchAllCompanyListForContact",payload:{},callback:function(e){t.setState({company:e.data})}}),l.resetFields("value",void 0),l.resetFields("iscostoms",0),l.resetFields("customsName",void 0),t.setState({isCustoms:!1})},t.onChangeCustomsNameValue=function(e){console.log("test");var a=t.props.form,l=a.getFieldValue("kind"),n=a.getFieldValue("value"),o=a.getFieldValue("iscostoms"),s=e;if(1===o&&void 0!==s&&0!==s.length){var c={kind:l,value:n,iscostoms:o,customsCompany:s[1]};t.handleSearch(c)}else{var r={kind:l,value:n,iscostoms:o};t.handleSearch(r)}},t.okHandle=function(){var e=t.props.form,a=e.getFieldValue("kind"),l=e.getFieldValue("value"),n=e.getFieldValue("iscostoms"),o=e.getFieldValue("customsName");if(1===n&&void 0!==o&&0!==o.length){var s={kind:a,value:l,iscostoms:n,customsCompany:o[1]};t.handleSearch(s)}else{var c={kind:a,value:l,iscostoms:n};t.handleSearch(c)}},t}return D()(a,e),V()(a,[{key:"componentDidMount",value:function(){var e=this,a=this.props.form;a.setFieldsValue(E()({},"unit","\u516c\u5428"));var t=G()().format("YYYY-MM-DD HH:mm:ss");a.setFieldsValue(E()({},"inspdate",G()(t,"YYYY-MM-DD HH:mm:ss")));var l=JSON.parse(localStorage.getItem("consignor_userinfo")),n=this.props.dispatch;n({type:"applicant/getClientName",payload:{},callback:function(a){e.setState({applicantName:a}),e.setState({agentName:a}),e.setState({payerName:a})}}),n({type:"applicant/getCheckProject",payload:{certCode:l.certCode},callback:function(a){e.setState({checkProject:a})}}),n({type:"applicant/getConfigorPlaceList",payload:{consigoruser:l.userName},callback:function(a){e.setState({placeName:a})}}),n({type:"applicant/getConfigorCargoList",payload:{consigoruser:l.userName},callback:function(a){e.setState({cargos:a})}}),n({type:"applicant/searchAllCompanyListForContact",payload:{},callback:function(a){e.setState({company:a.data})}}),n({type:"applicant/getCustomInfos",payload:{},callback:function(a){e.setState({customsOption:a})}}),this.setFormInfo()}},{key:"componentWillUnmount",value:function(){this.saveFormInfo()}},{key:"renderSimpleForm",value:function(){Y["a"].create();var e=this.props.form;return R.a.createElement(Y["a"],{onSubmit:this.okHandle,layout:"inline"},R.a.createElement(g["a"],{gutter:{md:8,lg:24,xl:48}},R.a.createElement(C["a"],{md:4,sm:20},R.a.createElement(Y["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e.getFieldDecorator("kind",{initialValue:"namec",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(R.a.createElement(x["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},R.a.createElement(Z,{value:"namec"},"\u68c0\u9a8c\u673a\u6784"),R.a.createElement(Z,{value:"adres"},"\u6ce8\u518c\u5730\u5740"),R.a.createElement(Z,{value:"tel"},"\u54a8\u8be2\u7535\u8bdd"))))),R.a.createElement(C["a"],{md:6,sm:20},R.a.createElement(Y["a"].Item,null,e.getFieldDecorator("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(R.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),R.a.createElement(C["a"],{span:7},R.a.createElement("span",{className:_.a.submitButtons},R.a.createElement(f["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),R.a.createElement(f["a"],{style:{marginLeft:12},onClick:this.handleFormReset},"\u91cd\u7f6e\u67e5\u8be2")))))}},{key:"render",value:function(){this.handleOk,this.handleCancel,this.handleSearch;var e=this.props,a=e.form.getFieldDecorator,t=e.loading,l=this.state,n=l.applicantName,o=l.agentName,s=l.payerName,y=l.checkProject,E=l.cargos,v=l.agentContacts,b=l.applicantContacts,N=l.visible,k=l.company,F=l.isCustoms,w=l.customsOption,I=l.fileList,V=l.tempFileList,P=l.placeName,O=R.a.createElement("div",null,R.a.createElement(h["a"],{type:"plus"}),R.a.createElement("div",{className:"ant-upload-text"},"Upload")),L=n.map(function(e){return R.a.createElement(Z,{key:e,value:e},e)}),A=o.map(function(e){return R.a.createElement(Z,{key:e,value:e},e)}),M=s.map(function(e){return R.a.createElement(Z,{key:e,value:e},e)}),D=E.map(function(e){return e.cargoname}),j=P.map(function(e){return e.placename}),J=b.map(function(e){return R.a.createElement(Z,{key:e.contactName,value:e.contactName},e.contactName)}),z=v.map(function(e){return R.a.createElement(Z,{key:e.contactName,value:e.contactName},e.contactName)}),H=k.map(function(e){return R.a.createElement(Z,{key:e.certcode,value:e.certcode},e.namec," ",e.tel)});return R.a.createElement(B["a"],null,R.a.createElement(d["a"],{bordered:!1,className:_.a.card},R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:2},R.a.createElement(f["a"],{type:"primary",onClick:this.validate},"\u63d0\u4ea4")),R.a.createElement(C["a"],{span:2},R.a.createElement(f["a"],{type:"primary",onClick:this.resetform},"\u91cd\u7f6e")),R.a.createElement(C["a"],{span:18}))),R.a.createElement(d["a"],{title:"\u68c0\u9a8c\u673a\u6784",className:_.a.card,bordered:!1},R.a.createElement(Y["a"],{hideRequiredMark:!0,labelAlign:"left"},R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:12},R.a.createElement(Y["a"].Item,{label:"\u68c0\u9a8c\u673a\u6784",labelCol:{span:4},wrapperCol:{span:20},colon:!1},a("certcode",{rules:N?[]:[{required:!0,message:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u673a\u6784"}]})(R.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u673a\u6784",filterOption:!1,onChange:this.onCertCodeChange},H)))),R.a.createElement(C["a"],{span:12},R.a.createElement(Y["a"].Item,null," ",R.a.createElement("div",{style:{color:"grey",paddingLeft:10}},"\u8bf4\u660e\uff1a\u53ef\u5728\u4e0b\u9762\u5217\u8868\u641c\u7d22\u540e\u9009\u53d6")))),R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:10},R.a.createElement(Y["a"].Item,{label:$.iscostoms,labelCol:{span:10},wrapperCol:{span:14},colon:!1},a("iscostoms",{initialValue:0,rules:[]})(R.a.createElement(u["a"].Group,{onChange:this.changeIsCustoms},R.a.createElement(u["a"],{value:0},"\u4e0d\u9700\u8981"),R.a.createElement(u["a"],{value:1},"\u9700\u8981"))))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.customsName,labelCol:{span:4},wrapperCol:{span:19},colon:!1},a("customsName",{})(R.a.createElement(m["a"],{options:w,disabled:!F,placeholder:"\u8bf7\u9009\u62e9\u96b6\u5c5e\u5173\u540d\u79f0",onChange:this.onChangeCustomsNameValue})))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.customsNo,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("customsNo",{rules:[{validator:this.getRepeatCustomsNo}]})(R.a.createElement(q["a"],{disabled:!F,placeholder:"\u8bf7\u8f93\u5165\u62a5\u544a\u53f7"}))))),R.a.createElement("div",{className:_.a.tableListForm},this.renderSimpleForm()),R.a.createElement(p["a"],{size:"middle",loading:t,dataSource:k,columns:this.columnsCompany,rowKey:"keyno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),R.a.createElement(d["a"],{title:"\u4e1a\u52a1\u4fe1\u606f",className:_.a.card,bordered:!1},R.a.createElement(Y["a"],{hideRequiredMark:!0,labelAlign:"left"},R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:10},R.a.createElement(Y["a"].Item,{label:$.applicant,labelCol:{span:4},wrapperCol:{span:20},colon:!1},a("applicant",{rules:N?[]:[{required:!0,message:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4eba"}]})(R.a.createElement(i["a"],{className:"global-search",dataSource:L,onChange:this.onAppliantChange,onSearch:this.handleApplicantSearch,placeholder:"\u8bf7\u8f93\u5165\u7533\u8bf7\u4eba"},R.a.createElement(q["a"],null))))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.applicantname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("applicantname",{})(R.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9\u8054\u7cfb\u4eba",filterOption:!1,onChange:this.onAppliantNameChange},J)))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.applicanttel,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("applicanttel",{})(R.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u624b\u673a"}))))),R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:10},R.a.createElement(Y["a"].Item,{label:$.agent,labelCol:{span:4},wrapperCol:{span:20},colon:!1},a("agent",{})(R.a.createElement(i["a"],{className:"global-search",dataSource:A,onSearch:this.handleAgentSearch,onChange:this.onAgentChange,placeholder:"\u8bf7\u8f93\u5165\u4ee3\u7406\u4eba"},R.a.createElement(q["a"],null))))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.agentname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("agentname",{})(R.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9\u8054\u7cfb\u4eba",filterOption:!1,onChange:this.onAgentNameChange},z)))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.agenttel,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("agenttel",{})(R.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u624b\u673a"}))))),R.a.createElement(g["a"],{gutter:16,type:"flex"},R.a.createElement(C["a"],{span:10},R.a.createElement(Y["a"].Item,{label:$.payer,labelCol:{span:4},wrapperCol:{span:20},colon:!1},a("payer",{})(R.a.createElement(i["a"],{className:"global-search",dataSource:M,onSearch:this.handlePayerSearch,placeholder:"\u8bf7\u8f93\u5165\u4ed8\u6b3e\u4eba"},R.a.createElement(q["a"],null))))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{colon:!1},R.a.createElement(u["a"].Group,{onChange:this.onChange},R.a.createElement(u["a"],{value:2},"\u540c\u7533\u8bf7\u4eba"),R.a.createElement(u["a"],{value:1},"\u540c\u4ee3\u7406\u4eba")))),R.a.createElement(C["a"],{span:7},R.a.createElement(Y["a"].Item,{label:$.price,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("price",{rules:[{message:"\u8bf7\u8f93\u5165\u68c0\u9a8c\u8d39"}]})(R.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165"}))))))),R.a.createElement(d["a"],{title:"\u68c0\u67e5\u5bf9\u8c61",className:_.a.card,bordered:!1},R.a.createElement(Y["a"],{hideRequiredMark:!0,labelAlign:"left"},R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:8},R.a.createElement(Y["a"].Item,{label:$.cargoname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("chineselocalname",{rules:N?[]:[{required:!0,message:"\u8bf7\u8f93\u5165\u8d27\u7269\u540d\u79f0"}]})(R.a.createElement(i["a"],{className:"global-search",dataSource:D,onChange:this.handleChangeCargo,onSearch:this.cargoSearch,placeholder:"\u8bf7\u8f93\u5165\u8d27\u7269\u540d\u79f0"},R.a.createElement(q["a"],null))))),R.a.createElement(C["a"],{span:8},R.a.createElement(Y["a"].Item,{label:$.shipname,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("shipname",{rules:[]})(R.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u8239\u540d"})))),R.a.createElement(C["a"],{span:5},R.a.createElement(Y["a"].Item,{label:$.quantityD,labelCol:{span:10},wrapperCol:{span:14},colon:!1},a("quantityd",{rules:[{whitespace:!0,type:"number",transform:function(e){if(e)return Number(e)},message:"\u8bf7\u8f93\u5165\u6570\u5b57"}]})(R.a.createElement(q["a"],{placeholder:"0"})))),R.a.createElement(C["a"],{span:3},R.a.createElement(Y["a"].Item,{colon:!1},a("unit",{rules:[]})(R.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9"},R.a.createElement(Z,{value:"\u516c\u5428"},"\u516c\u5428"),R.a.createElement(Z,{value:"\u7acb\u65b9\u7c73"},"\u7acb\u65b9\u7c73"),R.a.createElement(Z,{value:"\u6876"},"\u6876"),R.a.createElement(Z,{value:"\u5305"},"\u5305"),R.a.createElement(Z,{value:"\u5343\u514b"},"\u5343\u514b"),R.a.createElement(Z,{value:"\u4e2a"},"\u4e2a"),R.a.createElement(Z,{value:"\u6346"},"\u6346")))))),R.a.createElement(g["a"],{gutter:16},R.a.createElement(C["a"],{span:8},R.a.createElement(Y["a"].Item,{label:$.inspdate,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("inspdate",{rules:[]})(R.a.createElement(r["a"],{placeholder:"\u9884\u62a5\u65e5\u671f",style:{width:"100%"},format:"YYYY-MM-DD",getPopupContainer:function(e){return e.parentNode}})))),R.a.createElement(C["a"],{span:8},R.a.createElement(Y["a"].Item,{label:$.inspplace1,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("inspplace1",{rules:[]})(R.a.createElement(m["a"],{options:U["a"],placeholder:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u5730\u70b9",onChange:this.onChangeInspplace})))),R.a.createElement(C["a"],{span:8},R.a.createElement(Y["a"].Item,{label:$.area,labelCol:{span:6},wrapperCol:{span:18},colon:!1},a("inspplace2",{rules:[]})(R.a.createElement(i["a"],{className:"global-search",dataSource:j,onSearch:this.placeSearch,placeholder:"\u8bf7\u8f93\u5165\u8be6\u7ec6\u5730\u5740"},R.a.createElement(q["a"],null)))))))),R.a.createElement(d["a"],{title:"\u68c0\u67e5\u9879\u76ee",className:_.a.card,bordered:!1},R.a.createElement(Y["a"],{hideRequiredMark:!0,labelAlign:"left"},R.a.createElement(g["a"],null,R.a.createElement(C["a"],{span:24},R.a.createElement(Y["a"].Item,{label:$.inspway,labelCol:{span:2},wrapperCol:{span:22},colon:!1},a("inspway",{rules:N?[]:[{required:!0,message:"\u8bf7\u9009\u62e9\u7533\u8bf7\u9879\u76ee"}]})(R.a.createElement(W,{options:y}))))),R.a.createElement(g["a"],null,R.a.createElement(C["a"],{span:24},R.a.createElement(Y["a"].Item,{label:$.inspwaymemo1,labelCol:{span:2},wrapperCol:{span:22},colon:!1},a("inspwaymemo1",{})(R.a.createElement(X,{style:{minHeight:32},rows:5,placeholder:"\u7533\u8bf7\u54c1\u8d28\u65f6\uff0c\u8bf7\u7b80\u8981\u8bf4\u660e\u54c1\u8d28\u6307\u6807\u8981\u6c42"}))))))),R.a.createElement(d["a"],{className:_.a.card,bordered:!1},R.a.createElement(g["a"],null,R.a.createElement(C["a"],{span:24},R.a.createElement(f["a"],{style:{marginBottom:12},type:"primary",onClick:this.show},"\u4e0a\u4f20\u6587\u4ef6"))),R.a.createElement(S["a"],{title:"\u6587\u4ef6\u4e0a\u4f20",visible:N,onOk:this.handleOk,onCancel:this.handleCancel},R.a.createElement(Y["a"].Item,{label:"\u6587\u4ef6\u4e0a\u4f20"},a("MultipartFile",{rules:N?[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u4ef6\u4e0a\u4f20"}]:[]})(R.a.createElement(c["a"],{listType:"picture-card",fileList:I,onPreview:this.handlePreview,beforeUpload:this.handleBeforeUpload,onChange:this.handleChange},I.length>=1?null:O))),R.a.createElement(Y["a"].Item,{label:"\u6587\u4ef6\u540d\u79f0"},a("filename",{rules:N?[{required:!0,message:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"}]:[]})(R.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0"})))),R.a.createElement(p["a"],{size:"middle",loading:t,dataSource:V,columns:this.columns,rowKey:"name",pagination:{showQuickJumper:!0,showSizeChanger:!0}})))}}]),a}(J["PureComponent"]),o=s))||o)||o);a["default"]=ee}}]);