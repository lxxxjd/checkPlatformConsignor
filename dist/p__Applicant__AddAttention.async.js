(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{Okr4:function(e,a,t){"use strict";t.r(a);t("pC0b");var n,l,r,o,i=t("GzdX"),c=(t("bP8k"),t("gFTJ")),s=t("jehZ"),p=t.n(s),m=(t("IzEo"),t("bx4M")),d=(t("g9YV"),t("wCAj")),u=(t("14J3"),t("BMrR")),b=(t("+L6B"),t("2/Rp")),f=(t("jCWc"),t("kPKH")),g=(t("5NDa"),t("5rEg")),h=(t("2qtc"),t("kLXV")),E=t("p0pE"),v=t.n(E),I=(t("/xke"),t("TeRw")),C=t("2Taf"),k=t.n(C),y=t("vZ4D"),S=t.n(y),w=t("l4Ni"),O=t.n(w),D=t("ujKo"),M=t.n(D),V=t("MhPg"),N=t.n(V),F=(t("OaEy"),t("2fM7")),x=(t("y8nQ"),t("Vl3Y")),Y=t("q1tI"),J=t.n(Y),R=t("MuoO"),z=t("usdK"),A=(t("Y2fQ"),t("zHco")),T=t("VlDC"),q=t.n(T),j=t("wd/R"),B=t.n(j),K=x["a"].Item,P=(F["a"].Option,n=Object(R["connect"])(function(e){var a=e.applicant,t=e.loading;return{applicant:a,loading:t.models.applicant}}),l=x["a"].create(),n(r=l((o=function(e){function a(){var e,t;k()(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return t=O()(this,(e=M()(a)).call.apply(e,[this].concat(l))),t.state={preMainInfo:{},visible:!1,man:[],reports:[],reportno:null,certVisible:!1,cert:{},ratevisible:!1},t.columns1=[{title:"\u68c0\u9a8c\u4eba\u5458",dataIndex:"inspman"},{title:"\u624b\u673a",dataIndex:"tel"},{title:"\u4efb\u52a1",dataIndex:"inspway"}],t.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return t.isValidDate(e)}},{title:"\u68c0\u9a8c\u673a\u6784",dataIndex:"namec"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u8d27\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u64cd\u4f5c",render:function(e,a){return J.a.createElement(Y["Fragment"],null,J.a.createElement("a",{onClick:function(){return t.peopleItem(e,a)}},"\u4eba\u5458\xa0\xa0"),J.a.createElement("a",{onClick:function(){return t.fileItem(e,a)}},"\u67e5\u770b\u8bc1\u4e66\xa0\xa0"),J.a.createElement("a",{onClick:function(){return t.deleteItemApply(e,a)}},"\u9000\u56de\u8bc1\u4e66\xa0\xa0"),J.a.createElement("a",{onClick:function(){return t.rateItem(e,a)}},"\u8bc4\u4ef7\xa0\xa0"),J.a.createElement("a",{onClick:function(){return t.copyItem(e,a)}},"\u590d\u5236\xa0\xa0"),J.a.createElement("a",{onClick:function(){return t.deleteItem(e,a)}},"\u53d6\u6d88\u5173\u6ce8\xa0\xa0"),J.a.createElement("a",{onClick:function(){return t.previewItem(e,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],t.init=function(){var e=JSON.parse(localStorage.getItem("userinfo")),a=t.props.dispatch,n={consigoruser:e.userName,source:"\u5df2\u5173\u6ce8"};a({type:"applicant/getReportByConfigor",payload:n,callback:function(e){console.log(e.data),t.setState({reports:e.data})}})},t.isValidDate=function(e){return void 0!==e&&null!==e?J.a.createElement("span",null,B()(e).format("YYYY-MM-DD")):[]},t.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),z["a"].push({pathname:"/Applicant/DetailForAccept"})},t.deleteItem=function(e){var a=JSON.parse(localStorage.getItem("userinfo")),n=t.props.dispatch,l={consigoruser:a.userName,reportNo:e.reportno};n({type:"applicant/unfollow",payload:l,callback:function(e){200===e.code?(I["a"].open({message:"\u53d6\u6d88\u5173\u6ce8\u6210\u529f"}),t.componentDidMount()):I["a"].open({message:"\u53d6\u6d88\u5173\u6ce8\u5931\u8d25"})}})},t.deleteItemApply=function(e){var a=t.props.dispatch;a({type:"applicant/getApplyReason",payload:{reportno:e.reportno},callback:function(a){200===a.code?(t.setState({reportno:e.reportno}),t.setState({cert:a.data}),t.setState({certVisible:!0})):I["a"].open({message:"\u4e0d\u5b58\u5728\u7533\u8bf7\u4f5c\u5e9f\u8bc1\u4e66!",description:a.data})}})},t.rateItem=function(e){t.setState({reportno:e.reportno}),t.setState({ratevisible:!0})},t.copyItem=function(e){sessionStorage.setItem("reportno",e.reportno),z["a"].push({pathname:"/Applicant/CopyApplication"})},t.peopleItem=function(e){var a=t.props.dispatch;a({type:"applicant/getAllMan",payload:{reportno:e.reportno,certcode:e.certcode},callback:function(e){200===e.code&&t.setState({man:e.data})}}),t.setState({peopleVisible:!0})},t.fileItem=function(e){sessionStorage.setItem("reportno",e.reportno),z["a"].push({pathname:"/Applicant/CertificateDetail"})},t.handleFormReset=function(){var e=t.props.form;e.resetFields(),t.init()},t.handleSearch=function(e){e.preventDefault();var a=t.props,n=a.dispatch,l=a.form;l.validateFields(function(e,a){if(console.log(e),!e){JSON.parse(localStorage.getItem("userinfo"));var l=v()({},a);n({type:"applicant/getReportByRandomCode",payload:l,callback:function(e){200===e.code?(t.setState({visible:!0}),t.setState({preMainInfo:e.data})):h["a"].error({title:"\u59d4\u6258\u7f16\u53f7\u6216\u5bc6\u7801\u9519\u8bef\uff0c\u672a\u67e5\u8be2\u5230\u7ed3\u679c\uff01",okText:"\u5173\u95ed",onOk:function(){}})}})}})},t.handleCancel=function(){t.setState({visible:!1}),t.setState({peopleVisible:!1}),t.setState({certVisible:!1}),t.setState({ratevisible:!1})},t.handleEvaluationOk=function(e){var a=t.props.dispatch,n=t.state.reportno,l=JSON.parse(localStorage.getItem("userinfo")),r=v()({},e,{consigoruser:l.userName,reportno:n});a({type:"applicant/addEvaluation",payload:r,callback:function(e){200===e.code?(I["a"].open({message:"\u8bc4\u5206\u6210\u529f"}),t.init()):I["a"].open({message:"\u8bc4\u5206\u5931\u8d25",description:e.data})}}),t.setState({ratevisible:!1})},t.handleCertOk=function(e){var a=t.state.reportno,n=t.props.dispatch,l=JSON.parse(localStorage.getItem("userinfo"));n({type:"applicant/returnReadRecord",payload:{reportno:a,organization:"\u59d4\u6258\u4eba",reader:l.userName,company:l.companyName},callback:function(e){200===e.code?(I["a"].open({message:"\u540c\u610f\u6210\u529f"}),t.setState({certVisible:!1})):I["a"].open({message:"\u540c\u610f\u5931\u8d25",description:e.data})}})},t.handleOk=function(){var e=JSON.parse(localStorage.getItem("userinfo")),a=t.props.dispatch,n=t.state.preMainInfo,l={consigoruser:e.userName,reportNo:n.reportno};a({type:"applicant/follow",payload:l,callback:function(e){200===e.code?(I["a"].open({message:"\u5173\u6ce8\u6210\u529f"}),t.setState({visible:!1}),t.componentDidMount()):I["a"].open({message:"\u5173\u6ce8\u5931\u8d25"})}})},t.handleCancel=function(){t.setState({visible:!1}),t.setState({peopleVisible:!1}),t.setState({certVisible:!1}),t.setState({ratevisible:!1})},t}return N()(a,e),S()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return J.a.createElement(x["a"],{onSubmit:this.handleSearch,layout:"inline"},J.a.createElement(u["a"],{gutter:{md:8,lg:24,xl:48}},J.a.createElement(f["a"],{span:6},J.a.createElement(x["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7",labelCol:{span:8},wrapperCol:{span:16},colon:!1},e("reportno",{rules:[{message:"\u8f93\u5165\u59d4\u6258\u7f16\u53f7"}]})(J.a.createElement(g["a"],{placeholder:"\u8bf7\u8f93\u5165\u59d4\u6258\u7f16\u53f7"})))),J.a.createElement(f["a"],{span:6},J.a.createElement(K,{label:"\u5bc6\u7801",labelCol:{span:4},wrapperCol:{span:20},colon:!1},e("randomcode",{rules:[{message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}]})(J.a.createElement(g["a"].Password,{placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801"})))),J.a.createElement(f["a"],{md:8,sm:20},J.a.createElement("span",null,J.a.createElement(b["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),J.a.createElement(b["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props.loading,a=this.state,t=a.preMainInfo,n=a.visible,l=a.peopleVisible,r=a.man,o=a.certVisible,i=a.cert,s=a.ratevisible,u=a.reports,b={handleCertOk:this.handleCertOk,handleCancel:this.handleCancel,handleOk:this.handleOk,handleEvaluationOk:this.handleEvaluationOk};return J.a.createElement(A["a"],null,J.a.createElement(m["a"],{size:"small",bordered:!1},J.a.createElement("div",null,J.a.createElement("div",{className:q.a.tableListForm},this.renderSimpleForm()),J.a.createElement(d["a"],{size:"middle",className:q.a.antTable,rowClassName:q.a.antTable2,loading:e,rowKey:"reportno",dataSource:u,columns:this.columns,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),J.a.createElement(L,p()({},b,{certVisible:o,cert:i})),J.a.createElement(Q,p()({},b,{peopleVisible:l,loading:e,man:r,columns1:this.columns1})),J.a.createElement(H,p()({},b,{ratevisible:s})),J.a.createElement(h["a"],{title:"\u52a0\u5173\u6ce8",visible:n,onOk:this.handleOk,onCancel:this.handleCancel,width:1e3},J.a.createElement(c["a"],{size:"large",title:"\u4e1a\u52a1\u4fe1\u606f",style:{marginBottom:32},bordered:!0},J.a.createElement(c["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},t.reportno),J.a.createElement(c["a"].Item,{label:"\u59d4\u6258\u65e5\u671f"},B()(t.preMainInfodate).format("YYYY-MM-DD")),J.a.createElement(c["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},t.shipname),J.a.createElement(c["a"].Item,{label:"\u7533\u8bf7\u4eba"},t.applicant),J.a.createElement(c["a"].Item,{label:"\u8054\u7cfb\u4eba"},t.applicantname),J.a.createElement(c["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},t.applicanttel),J.a.createElement(c["a"].Item,{label:"\u4ee3\u7406\u4eba"},t.agent),J.a.createElement(c["a"].Item,{label:"\u8054\u7cfb\u4eba"},t.agentname),J.a.createElement(c["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},t.agenttel),J.a.createElement(c["a"].Item,{label:"\u4ed8\u6b3e\u4eba"},t.payer),J.a.createElement(c["a"].Item,{label:"\u68c0\u9a8c\u8d39"},t.price))))}}]),a}(Y["PureComponent"]),r=o))||r)||r),L=function(e){var a=e.certVisible,t=e.handleCertOk,n=e.handleCancel,l=e.cert;return J.a.createElement(h["a"],{title:"\u9000\u56de\u8bc1\u4e66",visible:a,onOk:t,onCancel:n,okText:"\u540c\u610f",cancelText:"\u8fd4\u56de"},J.a.createElement(c["a"],{bordered:!0,column:2},J.a.createElement(c["a"].Item,{label:"\u8bf7\u6c42\u4eba"},l.applyman),J.a.createElement(c["a"].Item,{label:"\u8bf7\u6c42\u65e5\u671f"},B()(l.applydate).format("YYYY-MM-DD")),J.a.createElement(c["a"].Item,{label:"\u8bc1\u4e66\u9000\u56de\u539f\u56e0"},l.applyreason)))},Q=function(e){var a=e.peopleVisible,t=e.handleCancel,n=e.loading,l=e.man,r=e.columns1;return J.a.createElement(h["a"],{title:"\u4eba\u5458",visible:a,onOk:t,onCancel:t},J.a.createElement(d["a"],{size:"middle",loading:n,rowKey:"inspman",dataSource:l,columns:r,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))},H=x["a"].create()(function(e){var a=e.ratevisible,t=e.handleCancel,n=e.handleEvaluationOk,l=e.form,r=function(){l.validateFields(function(e,a){e||(l.resetFields(),n(a))})};return J.a.createElement(h["a"],{title:"\u8bc4\u5206",visible:a,onOk:r,onCancel:t},J.a.createElement(x["a"],{layout:"horizontal"},J.a.createElement(x["a"].Item,{label:"\u5ba2\u6237\u670d\u52a1",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("customerService",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(J.a.createElement(i["a"],null))),J.a.createElement(K,{label:"\u73b0\u573a\u68c0\u67e5",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("inspect",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(J.a.createElement(i["a"],null))),J.a.createElement(K,{label:"\u5206\u6790\u6d4b\u8bd5",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("test",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(J.a.createElement(i["a"],null))),J.a.createElement(K,{label:"\u6d41\u7a0b\u65f6\u6548",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("cost",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(J.a.createElement(i["a"],null))),J.a.createElement(K,{label:"\u68c0\u9a8c\u8d39\u7528",labelCol:{span:6},wrapperCol:{span:18}},l.getFieldDecorator("process",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8bc4\u5206"}]})(J.a.createElement(i["a"],{tooltips:["\u6602\u8d35","\u8f83\u6602\u8d35","\u9002\u4e2d","\u8f83\u4f4e\u5ec9","\u4f4e\u5ec9"]})))))});a["default"]=P}}]);