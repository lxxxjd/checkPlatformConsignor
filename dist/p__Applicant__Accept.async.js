(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"2QqH":function(e,a,t){"use strict";t.r(a);t("pC0b");var n,l,r,o,i=t("GzdX"),c=(t("2qtc"),t("kLXV")),s=(t("bP8k"),t("gFTJ")),p=(t("IzEo"),t("bx4M")),m=t("jehZ"),u=t.n(m),d=(t("g9YV"),t("wCAj")),h=(t("14J3"),t("BMrR")),g=(t("+L6B"),t("2/Rp")),f=(t("5NDa"),t("5rEg")),E=(t("jCWc"),t("kPKH")),b=t("p0pE"),v=t.n(b),C=(t("/xke"),t("TeRw")),y=t("2Taf"),k=t.n(y),S=t("vZ4D"),I=t.n(S),w=t("l4Ni"),D=t.n(w),O=t("ujKo"),V=t.n(O),F=t("MhPg"),N=t.n(F),x=(t("OaEy"),t("2fM7")),M=(t("y8nQ"),t("Vl3Y")),Y=t("q1tI"),R=t.n(Y),J=t("MuoO"),z=t("usdK"),A=t("zHco"),q=t("Lk6d"),T=t.n(q),K=t("wd/R"),B=t.n(K),L=M["a"].Item,j=x["a"].Option,P=(n=Object(J["connect"])(function(e){var a=e.applicant,t=e.loading;return{applicant:a,loading:t.models.applicant}}),l=M["a"].create(),n(r=l((o=function(e){function a(){var e,t;k()(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return t=D()(this,(e=V()(a)).call.apply(e,[this].concat(l))),t.state={ratevisible:!1,peopleVisible:!1,man:[],reportno:null,certVisible:!1,cert:{},kindValue:"certCode",company:[],reports:[]},t.columns1=[{title:"\u68c0\u9a8c\u4eba\u5458",dataIndex:"inspman"},{title:"\u624b\u673a",dataIndex:"tel"},{title:"\u4efb\u52a1",dataIndex:"inspway"}],t.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return R.a.createElement("span",null,B()(e).format("YYYY-MM-DD"))}},{title:"\u68c0\u9a8c\u673a\u6784",dataIndex:"namec"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u8d27\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(e){return t.handleDate(e)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u64cd\u4f5c",render:function(e,a){return R.a.createElement(Y["Fragment"],null,R.a.createElement("a",{onClick:function(){return t.peopleItem(e,a)}},"\u4eba\u5458"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return t.fileItem(e,a)}},"\u67e5\u770b\u8bc1\u4e66"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return t.deleteItem(e,a)}},"\u9000\u56de\u8bc1\u4e66"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return t.rateItem(e,a)}},"\u8bc4\u4ef7"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return t.copyItem(e,a)}},"\u590d\u5236"),"\xa0\xa0",R.a.createElement("a",{onClick:function(){return t.previewItem(e,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],t.rateItem=function(e){t.setState({reportno:e.reportno}),t.setState({ratevisible:!0})},t.handleDate=function(e){return void 0!==e&&null!==e?R.a.createElement("span",null,B()(e).format("YYYY-MM-DD")):null},t.onChangeKind=function(e){t.setState({kindValue:e})},t.deleteItem=function(e){var a=t.props.dispatch;a({type:"applicant/getApplyReason",payload:{reportno:e.reportno},callback:function(a){200===a.code?(t.setState({reportno:e.reportno}),t.setState({cert:a.data}),t.setState({certVisible:!0})):C["a"].open({message:"\u4e0d\u5b58\u5728\u7533\u8bf7\u4f5c\u5e9f\u8bc1\u4e66!",description:a.data})}})},t.fileItem=function(e){sessionStorage.setItem("reportno",e.reportno),z["a"].push({pathname:"/Applicant/CertificateDetail"})},t.peopleItem=function(e){var a=t.props.dispatch;a({type:"applicant/getAllMan",payload:{reportno:e.reportno,certcode:e.certcode},callback:function(e){200===e.code&&t.setState({man:e.data})}}),t.setState({peopleVisible:!0})},t.copyItem=function(e){sessionStorage.setItem("reportno",e.reportno),z["a"].push({pathname:"/Applicant/CopyApplication"})},t.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),z["a"].push({pathname:"/Applicant/DetailForAccept"})},t.handleFormReset=function(){var e=JSON.parse(localStorage.getItem("userinfo")),a=t.props,n=a.form,l=a.dispatch;n.resetFields();var r={consigoruser:e.userName,source:"\u5df2\u53d7\u7406"};l({type:"applicant/getReportByConfigor",payload:r,callback:function(e){t.setState({reports:e.data})}})},t.handleSearch=function(e){e.preventDefault();var a=t.props,n=a.dispatch,l=a.form;l.validateFields(function(e,a){if(console.log(a),!e){var l=JSON.parse(localStorage.getItem("userinfo")),r=v()({},a,{consigoruser:l.userName,source:"\u5df2\u53d7\u7406"});n({type:"applicant/getReportByConfigor",payload:r,callback:function(e){t.setState({reports:e.data})}})}})},t.handleCancel=function(){t.setState({ratevisible:!1}),t.setState({peopleVisible:!1}),t.setState({certVisible:!1})},t.handleEvaluationOk=function(e){var a=t.props.dispatch,n=t.state.reportno,l=JSON.parse(localStorage.getItem("userinfo")),r=v()({},e,{consigoruser:l.userName,reportno:n});a({type:"applicant/addEvaluation",payload:r,callback:function(e){200===e.code?(C["a"].open({message:"\u8bc4\u5206\u6210\u529f"}),t.componentDidMount()):C["a"].open({message:"\u8bc4\u5206\u5931\u8d25",description:e.data})}}),t.setState({ratevisible:!1})},t.handleCertOk=function(e){var a=t.state.reportno,n=t.props.dispatch,l=JSON.parse(localStorage.getItem("userinfo"));n({type:"applicant/returnReadRecord",payload:{reportno:a,organization:"\u59d4\u6258\u4eba",reader:l.userName,company:l.companyName},callback:function(e){200===e.code?(C["a"].open({message:"\u540c\u610f\u6210\u529f"}),t.setState({certVisible:!1})):C["a"].open({message:"\u540c\u610f\u5931\u8d25",description:e.data})}})},t}return N()(a,e),I()(a,[{key:"componentDidMount",value:function(){var e=this,a=JSON.parse(localStorage.getItem("userinfo")),t=this.props.dispatch;console.log(a);var n={consigoruser:a.userName,source:"\u5df2\u53d7\u7406"};t({type:"applicant/getReportByConfigor",payload:n,callback:function(a){e.setState({reports:a.data})}}),t({type:"applicant/getCompanyList",payload:{},callback:function(a){e.setState({company:a.data})}})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,a=this.state,t=a.kindValue,n=a.company,l=n.map(function(e){return R.a.createElement(j,{key:e.certcode,value:e.certcode},e.namec)});return R.a.createElement(M["a"],{onSubmit:this.handleSearch,layout:"inline"},R.a.createElement(h["a"],{gutter:{md:8,lg:24,xl:48}},R.a.createElement(E["a"],{md:3,sm:20},R.a.createElement(M["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"certCode",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(R.a.createElement(x["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b",onChange:this.onChangeKind},R.a.createElement(j,{value:"certCode"},"\u68c0\u9a8c\u673a\u6784"),R.a.createElement(j,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),R.a.createElement(j,{value:"chineselocalname"},"\u8d27\u540d"),R.a.createElement(j,{value:"overallstate"},"\u72b6\u6001"))))),R.a.createElement(E["a"],{md:8,sm:20},"certCode"===t?[R.a.createElement(L,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(R.a.createElement(x["a"],{placeholder:"\u8bf7\u9009\u62e9\u68c0\u9a8c\u673a\u6784"},l)))]:[R.a.createElement(L,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(R.a.createElement(f["a"],{placeholder:"\u8bf7\u8f93\u5165"})))]),R.a.createElement(E["a"],{md:8,sm:20},R.a.createElement("span",{className:T.a.submitButtons},R.a.createElement(g["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),R.a.createElement(g["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props.loading,a=this.state,t=a.peopleVisible,n=a.man,l=a.certVisible,r=a.cert,o=a.reports,i=a.ratevisible,c={handleCertOk:this.handleCertOk,handleCancel:this.handleCancel,handleEvaluationOk:this.handleEvaluationOk};return R.a.createElement(A["a"],null,R.a.createElement(p["a"],{size:"small",bordered:!1},R.a.createElement("div",null,R.a.createElement("div",{className:T.a.tableListForm},this.renderSimpleForm()),R.a.createElement(d["a"],{size:"middle",className:T.a.antTable,rowClassName:T.a.antTable2,loading:e,rowKey:"reportno",dataSource:o,columns:this.columns,pagination:{showQuickJumper:!0,showSizeChanger:!0}})),R.a.createElement(Q,u()({},c,{certVisible:l,cert:r})),R.a.createElement(H,u()({},c,{peopleVisible:t,loading:e,man:n,columns1:this.columns1})),R.a.createElement(X,u()({},c,{ratevisible:i}))))}}]),a}(Y["PureComponent"]),r=o))||r)||r),Q=function(e){var a=e.certVisible,t=e.handleCertOk,n=e.handleCancel,l=e.cert;return R.a.createElement(c["a"],{title:"\u9000\u56de\u8bc1\u4e66",visible:a,onOk:t,onCancel:n,okText:"\u540c\u610f",cancelText:"\u8fd4\u56de"},R.a.createElement(s["a"],{bordered:!0,column:2},R.a.createElement(s["a"].Item,{label:"\u8bf7\u6c42\u4eba"},l.applyman),R.a.createElement(s["a"].Item,{label:"\u8bf7\u6c42\u65e5\u671f"},B()(l.applydate).format("YYYY-MM-DD")),R.a.createElement(s["a"].Item,{label:"\u8bc1\u4e66\u9000\u56de\u539f\u56e0"},l.applyreason)))},H=function(e){var a=e.peopleVisible,t=e.handleCancel,n=e.loading,l=e.man,r=e.columns1;return R.a.createElement(c["a"],{title:"\u4eba\u5458",visible:a,onOk:t,onCancel:t},R.a.createElement(d["a"],{size:"middle",loading:n,rowKey:"inspman",dataSource:l,columns:r,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))},X=M["a"].create()(function(e){var a=e.ratevisible,t=e.handleCancel,n=e.handleEvaluationOk,l=e.form,r=function(){l.validateFields(function(e,a){e||(l.resetFields(),n(a))})};return R.a.createElement(c["a"],{title:"\u8bc4\u5206",visible:a,onOk:r,onCancel:t},R.a.createElement(M["a"],{layout:"horizontal"},R.a.createElement(M["a"].Item,{label:"\u5ba2\u6237\u670d\u52a1",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("customerService",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(R.a.createElement(i["a"],null))),R.a.createElement(L,{label:"\u73b0\u573a\u68c0\u67e5",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("inspect",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(R.a.createElement(i["a"],null))),R.a.createElement(L,{label:"\u5206\u6790\u6d4b\u8bd5",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("test",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(R.a.createElement(i["a"],null))),R.a.createElement(L,{label:"\u6d41\u7a0b\u65f6\u6548",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("cost",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(R.a.createElement(i["a"],null))),R.a.createElement(L,{label:"\u68c0\u9a8c\u8d39\u7528",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("process",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(R.a.createElement(i["a"],{tooltips:["\u6602\u8d35","\u8f83\u6602\u8d35","\u9002\u4e2d","\u8f83\u4f4e\u5ec9","\u4f4e\u5ec9"]})))))});a["default"]=P}}]);