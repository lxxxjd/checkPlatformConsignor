(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"5OjH":function(e,a,t){"use strict";t.r(a);t("IzEo");var n,l,o,r,s=t("bx4M"),i=(t("g9YV"),t("wCAj")),c=(t("14J3"),t("BMrR")),p=(t("+L6B"),t("2/Rp")),d=(t("jCWc"),t("kPKH")),u=(t("5NDa"),t("5rEg")),m=t("p0pE"),f=t.n(m),h=(t("/xke"),t("TeRw")),v=(t("2qtc"),t("kLXV")),g=t("2Taf"),w=t.n(g),b=t("vZ4D"),E=t.n(b),y=t("l4Ni"),k=t.n(y),C=t("ujKo"),I=t.n(C),S=t("MhPg"),F=t.n(S),O=(t("OaEy"),t("2fM7")),D=(t("y8nQ"),t("Vl3Y")),x=t("q1tI"),M=t.n(x),N=t("MuoO"),V=t("zHco"),R=t("VlDC"),T=t.n(R),P=t("wd/R"),Y=t.n(P),j=D["a"].Item,z=(O["a"].Option,n=Object(N["connect"])(function(e){var a=e.applicant,t=e.loading;return{applicant:a,loading:t.models.applicant}}),l=D["a"].create(),n(o=l((r=function(e){function a(){var e,t;w()(this,a);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return t=k()(this,(e=I()(a)).call.apply(e,[this].concat(l))),t.state={certs:[],visible:!1},t.columns=[{title:"\u8bc1\u4e66\u540d\u79f0",dataIndex:"name"},{title:"\u7b7e\u7f72\u65e5\u671f",dataIndex:"signdate",render:function(e){return t.isValidDate(e)}},{title:"\u7b7e\u7f72\u4eba ",dataIndex:"signNameC"},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(e,a){return M.a.createElement(x["Fragment"],null,"\u5df2\u7b7e\u7f72"===e.status||"\u5df2\u53d1\u5e03"===e.status||"\u5df2\u4f5c\u5e9f"===e.status||"\u7533\u8bf7\u4f5c\u5e9f"===e.status?[M.a.createElement("a",{onClick:function(){return t.ViewItem(e,a)}},"\u67e5\u770b\xa0\xa0")]:[M.a.createElement("div",null,"\u67e5\u770b\xa0\xa0")],"\u5df2\u4f5c\u5e9f"===e.status?[M.a.createElement("a",{onClick:function(){return t.viewAbandonItem(e,a)}},"\u4f5c\u5e9f\u539f\u56e0\xa0\xa0")]:[])}}],t.isValidDate=function(e){return void 0!==e&&null!==e?M.a.createElement("span",null,Y()(e).format("YYYY-MM-DD")):[]},t.viewAbandonItem=function(e){v["a"].info({title:"\u4f5c\u5e9f\u539f\u56e0",okText:"\u77e5\u9053\u4e86",content:M.a.createElement("div",null,M.a.createElement("p",null,e.abandonreason)),onOk:function(){}})},t.ViewItem=function(e){var a,n=t.props.dispatch;"\u5df2\u62df\u5236"===e.status?a=e.pdfeditorpath:"\u5df2\u590d\u6838"===e.status?a=e.pdfpath:"\u5df2\u7f2e\u5236"===e.status?a=e.titlepdfpath:"\u5df2\u7b7e\u7f72"===e.status||"\u5df2\u53d1\u5e03"===e.status?a=e.certpdfpath:"\u5df2\u4f5c\u5e9f"===e.status?a=e.abandonpdfpath:void 0!==a||void 0!==e.filepath&&null!==e.filepath||(a=e.certpdfpath),n({type:"applicant/getPdfByOssPath",payload:{osspath:a},callback:function(e){200===e.code?window.open(e.data):message.success("\u6253\u5f00\u6587\u4ef6\u5931\u8d25")}})},t.previewItem=function(e){var a=t.props.dispatch,n=e.filepath;if(void 0!==n&&null!==n){var l=n.substring(n.lastIndexOf(".")+1);if("pdf"===l)a({type:"applicant/getOssPdf",payload:{osspath:n},callback:function(e){if(console.log(e),400===e.code)h["a"].open({message:"\u6253\u5f00\u5931\u8d25",description:e.data});else{var a=e.data;t.setState({url:a}),console.log(a),window.open(a)}}});else{var o="https://www.smlq.vip/api/cert_report/getFileStream?osspath=".concat(n);window.open(o)}}},t.handleFormReset=function(){var e=t.props.form;e.resetFields()},t.handleSearch=function(e){e.preventDefault();var a=t.props,n=a.dispatch,l=a.form;l.validateFields(function(e,a){console.log(e),e||n({type:"applicant/getCerFilesByRandomCode",payload:f()({},a),callback:function(e){if(200===e.code){t.setState({visible:!0}),t.setState({certs:e.data});var a=t.props.form;a.resetFields()}else v["a"].error({title:"\u8be5\u8bc1\u4e66\u67e5\u8be2\u9519\u8bef\uff0c\u53ef\u80fd\u4f2a\u9020\uff01",okText:"\u5173\u95ed",onOk:function(){}})}})})},t.handleOk=function(){var e=JSON.parse(localStorage.getItem("consignor_userinfo")),a=t.props.dispatch,n=t.state.preMainInfo,l={consigoruser:e.userName,reportNo:n.reportno};a({type:"applicant/follow",payload:l,callback:function(e){200===e.code?(h["a"].open({message:"\u5173\u6ce8\u6210\u529f"}),t.setState({visible:!1}),t.componentDidMount()):h["a"].open({message:"\u5173\u6ce8\u5931\u8d25"})}})},t.handleCancel=function(){t.setState({visible:!1})},t}return F()(a,e),E()(a,[{key:"componentDidMount",value:function(){}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return M.a.createElement(D["a"],{onSubmit:this.handleSearch,layout:"inline"},M.a.createElement(c["a"],{gutter:{md:8,lg:24,xl:48}},M.a.createElement(d["a"],{span:6},M.a.createElement(D["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7",labelCol:{span:8},wrapperCol:{span:16},colon:!1},e("reportno",{rules:[{message:"\u8f93\u5165\u59d4\u6258\u7f16\u53f7"}]})(M.a.createElement(u["a"],{placeholder:"\u8bf7\u8f93\u5165\u59d4\u6258\u7f16\u53f7"})))),M.a.createElement(d["a"],{span:6},M.a.createElement(j,{label:"\u5bc6\u7801",labelCol:{span:4},wrapperCol:{span:20},colon:!1},e("randomcode",{rules:[{message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}]})(M.a.createElement(u["a"],{type:"password",name:"password",autoComplete:"new-password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801"})))),M.a.createElement(d["a"],{md:8,sm:20},M.a.createElement("span",null,M.a.createElement(p["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),M.a.createElement(p["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props.loading,a=this.state,t=a.certs;a.visible;return M.a.createElement(V["a"],null,M.a.createElement(s["a"],{size:"small",bordered:!1},M.a.createElement("div",null,M.a.createElement("div",{className:T.a.tableListForm},this.renderSimpleForm()),M.a.createElement(i["a"],{size:"middle",className:T.a.antTable,rowClassName:T.a.antTable2,loading:e,rowKey:"name",dataSource:t,columns:this.columns,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(x["PureComponent"]),o=r))||o)||o);a["default"]=z}}]);