(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"1feA":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,c,l=a("bx4M"),i=(a("g9YV"),a("wCAj")),s=(a("14J3"),a("BMrR")),p=(a("+L6B"),a("2/Rp")),d=(a("jCWc"),a("kPKH")),u=(a("Pwec"),a("CtXQ")),m=(a("/xke"),a("TeRw")),f=(a("miYZ"),a("tsqr")),g=(a("2qtc"),a("kLXV")),y=a("2Taf"),h=a.n(y),v=a("vZ4D"),k=a.n(v),w=a("l4Ni"),E=a.n(w),b=a("ujKo"),I=a.n(b),x=a("MhPg"),C=a.n(x),S=(a("y8nQ"),a("Vl3Y")),z=a("q1tI"),M=a.n(z),N=a("MuoO"),P=a("zHco"),R=a("wd/R"),Y=a.n(R),D=a("8kut"),L=a.n(D);var V=(n=S["a"].create(),r=Object(N["connect"])(function(e){var t=e.applicant,a=e.loading;return{applicant:t,loading:a.models.applicant}}),n(o=r((c=function(e){function t(){var e,a;h()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=E()(this,(e=I()(t)).call.apply(e,[this].concat(r))),a.state={visible:!1,previewVisible:!1,previewImage:"",fileList:[]},a.columns=[{title:"\u8bc1\u7a3f\u540d",dataIndex:"name",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?M.a.createElement("span",null,e.slice(0,t.exec(e).index)):M.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){return M.a.createElement("span",null,Y()(e).format("YYYY-MM-DD"))}},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(e,t){return M.a.createElement(z["Fragment"],null,"\u5df2\u4f5c\u5e9f"===e.status?[M.a.createElement("a",{onClick:function(){return a.viewAbandonItem(e,t)}},"\u4f5c\u5e9f\u539f\u56e0\xa0\xa0")]:[],"\u5df2\u53d1\u5e03"===e.status||"\u5df2\u4f5c\u5e9f"===e.status?[M.a.createElement("a",{onClick:function(){return a.ViewItem(e,t)}},"\u67e5\u770b\xa0\xa0")]:[M.a.createElement("div",null,"\u67e5\u770b\xa0\xa0")])}}],a.viewAbandonItem=function(e){g["a"].info({title:"\u4f5c\u5e9f\u539f\u56e0",okText:"\u77e5\u9053\u4e86",content:M.a.createElement("div",null,M.a.createElement("p",null,e.abandonreason)),onOk:function(){}})},a.ViewItem=function(e){var t,n=a.props.dispatch;t="\u5df2\u4f5c\u5e9f"===e.status?e.abandonpdfpath:e.certpdfpath,n({type:"applicant/getPdfByOssPath",payload:{osspath:t},callback:function(t){if(200===t.code){window.open(t.data);var a=JSON.parse(localStorage.getItem("userinfo")),r={reader:a.userName,organization:"\u59d4\u6258\u4eba",company:a.companyName,tel:a.contactPhone,realname:a.contactName,reportno:e.reportno};n({type:"applicant/addReadRecord",payload:r,callback:function(e){"success"===e?f["a"].success("\u5df2\u9605\u6210\u529f\uff01"):f["a"].success("\u5df2\u9605\u5931\u8d25")}})}else f["a"].success("\u6253\u5f00\u6587\u4ef6\u5931\u8d25")}})},a.deleteItem=function(e){var t=a.props.dispatch,n={keyno:e.keyno},r=sessionStorage.getItem("reportno");t({type:"applicant/deleteCertFile",payload:n,callback:function(e){400===e.code?m["a"].open({message:"\u5220\u9664\u5931\u8d25",description:e.data}):t({type:"applicant/getCertFiles",payload:{reportno:r}})}})},a.back=function(){a.props.history.goBack()},a}return C()(t,e),k()(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=sessionStorage.getItem("reportno");e({type:"applicant/getCertFiles",payload:{reportno:t}})}},{key:"render",value:function(){M.a.createElement("div",null,M.a.createElement(u["a"],{type:"plus"}),M.a.createElement("div",{className:"ant-upload-text"},"Upload"));var e=this.props,t=e.applicant.recordData,a=e.loading,n=(e.form.getFieldDecorator,sessionStorage.getItem("reportno")),r=sessionStorage.getItem("shipname"),o=sessionStorage.getItem("applicant"),c={reportno:n,shipname:r,applicant:o};return M.a.createElement(P["a"],{text:c},M.a.createElement(l["a"],{bordered:!1,size:"small"},M.a.createElement(s["a"],null,M.a.createElement(d["a"],{span:22}),M.a.createElement(d["a"],{span:2},M.a.createElement(p["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},M.a.createElement(u["a"],{type:"left"}),"\u8fd4\u56de"))),M.a.createElement("div",{className:L.a.tableList},M.a.createElement(i["a"],{size:"middle",loading:a,dataSource:t,columns:this.columns,rowKey:"name",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),t}(z["PureComponent"]),o=c))||o)||o);t["default"]=V}}]);