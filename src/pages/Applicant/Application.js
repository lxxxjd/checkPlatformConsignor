import React, {PureComponent,Fragment} from 'react';
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Cascader,
  Icon,
  Popover,
  Radio,
  notification,
  AutoComplete,
  Table,
  Divider,
  Modal,
  Upload,
  message,
  Tooltip
} from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import areaOptions from './areaOptions'
import router from 'umi/router';
import styles from '../table.less';


const CheckboxGroup = Checkbox.Group;
const {Option} = Select;
const {TextArea} = Input;
const options = [
  {
    value: 'need',
    label: '需要',
    children: [
      {
        value: '中文',
        label: '中文',
      },
      {
        value: '英文',
        label: '英文',
      },
      {
        value: '中英文',
        label: '中英文',
      },
    ],
  },
  {
    value: '不需要',
    label: '不需要',
  },
];
const fieldLabels = {
  applicant: '申请人',
  applicantname: '联系人',
  applicanttel: '手机',
  businesssort: '业务分类',
  agent: '代理人',
  agentname: '联系人',
  agenttel: '手机',
  payer: '付款人',
  price: '检验费',
  reportdate: '委托日期',
  tradeway: '贸易方式',
  businesssource: '业务来源',
  shipname: '标识/船名',
  fromto: '产地/装卸港',
  insplinkway: '现场手机',
  inspdate: '预报日期',
  cargoname: '货名',
  cargosort: '货物类别',
  quantityD: '申报数量',
  unit: '单位',
  ChineseName: '型号/俗称',
  inspplace1: '检验地点',
  reportno20: '自编号',
  area:'区/县/市',
  inspway: '申请项目',
  inspwaymemo1: '检验备注',
  certstyle: '证书要求',
  section:'执行部门',
  customsName:'隶属关',
  customsNo:"报关号",
  iscostoms:"是否需要向海关推送报告？"

};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(({applicant, loading}) => ({
  applicant,
  loading: loading.models.applicant,
}))
@Form.create()
class Application extends PureComponent {
  state = {
    value: 1,
    applicantName: [],
    agentName: [],
    payerName: [],
    checkProject: [],
    cargos: [],
    applicantContacts: [],
    agentContacts: [],
    visible: false,
    departments: [],
    cargoname: "",
    fileList: [],
    tempFileList: [],
    company: [],
    placeName: [],
    placecode: undefined,
    customsOption: [],
    isCustoms: false,
    dataSource: [],
  };

  columns = [
    {
      title: '记录名',
      dataIndex: 'name',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  columnsCompany = [
    {
      title: '商标',
      dataIndex: 'photourl',
      align: 'center',  // 设置文本居中的属性
      render: val => this.getImageSource(val)
    },
    {
      title: '检验机构',
      dataIndex: 'namec',
    },
    {
      title: '注册地址',
      dataIndex: 'adres',
    },
    {
      title: '咨询电话',
      dataIndex: 'tel',
    },


    { title: '能力说明',
      dataIndex: 'explanation',
      key:"desc",
      width:'25%',
      // onCell: () => {
      //   return {
      //     style: {
      //       maxWidth: 200,
      //       overflow: 'hidden',
      //       whiteSpace: 'nowrap',
      //       textOverflow:'ellipsis',
      //       cursor:'pointer'
      //     }
      //   }
      // },
      // render: (text) => <Tooltip placement="topLeft" arrowPointAtCenter title={text}>{text}</Tooltip>
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.setCompany(text, record)}>选取</a>&nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { form } = this.props;
    form.setFieldsValue({ ['unit']: "公吨" });
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    form.setFieldsValue({ ['inspdate']: moment(now, "YYYY-MM-DD HH:mm:ss") });
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({ applicantName: response });
        this.setState({ agentName: response });
        this.setState({ payerName: response });
      }
    });
    dispatch({
      type: 'applicant/getCheckProject',
      payload: {
        certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({ checkProject: response })
      }
    });
    dispatch({
      type: 'applicant/getConfigorPlaceList',
      payload: {
        consigoruser: user.userName,
      },
      callback: (response) => {
        this.setState({ placeName: response })
      }
    });
    dispatch({
      type: 'applicant/getConfigorCargoList',
      payload: {
        consigoruser: user.userName,
      },
      callback: (response) => {
        this.setState({ cargos: response })
      }
    });
    // dispatch({
    //   type: 'applicant/getCargos',
    //   payload: {
    //     // certCode: user.certCode,
    //   },
    //   callback: (response) => {
    //     this.setState({cargos: response})
    //   }
    // });
    dispatch({
      type: 'applicant/searchAllCompanyListForContact',
      payload: {
        // certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({ company: response.data })
      }
    });

    dispatch({
      type: 'applicant/getCustomInfos',
      payload: {},
      callback: (response) => {
        this.setState({ customsOption: response })
      }
    });

    this.setFormInfo();
  }

  componentWillUnmount() {
    this.saveFormInfo();
  }

  getImageSource =val=> {
    let imgpath = "https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/platform/publiclogo/defaultlogo.png";
    if(val !==undefined && val !==null ){
      imgpath=`https://checkplatform2.oss-cn-hangzhou.aliyuncs.com/${val}`;
    }
    return <img src={imgpath} height={40} />;
  };

  setCompany=(text)=>{
    const {form} = this.props;
    form.setFieldsValue({  'certcode':text.certcode,});
    message.success("选取成功");
    this.onCertCodeChange(text.certcode);
    // Modal.confirm({
    //   title: '确认选取该检验机构吗？',
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => {
    //     form.setFieldsValue({  'certcode':text.certcode,});
    //   },
    // });
  };


  resetform = () => {
    Modal.confirm({
      title: '确定要刷新页面吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
          checkProject: [],
        });
        const { dispatch} = this.props;
        dispatch({
          type: 'applicant/searchAllCompanyListForContact',
          payload: {
            // certCode: user.certCode,
          },
          callback: (response) => {
            this.setState({ company: response.data });
          }
        });
        this.setState({ isCustoms: false });
      }
    });
  };

  changeIsCustoms = e => {
    const{form} = this.props;
    if (e.target.value === 1) {
      this.setState({ isCustoms: true });
      form.resetFields(`iscostoms`,1);
    } else {
      this.setState({ isCustoms: false });
      form.resetFields(`iscostoms`,0);
    }
    form.resetFields(`customsName`,undefined);
    form.resetFields(`customsNo`,undefined);
    this.okHandle();
  };


  saveFormInfo = () => {
    const { form } = this.props;
    const formValues = {
      isCustoms:this.state.isCustoms,
      ...form.getFieldsValue(),
    };
    sessionStorage.setItem("applicationFormValues", JSON.stringify(formValues));
  };

  setFormInfo = () => {
    const { form, dispatch } = this.props;
    const applicationFormValues = sessionStorage.getItem("applicationFormValues");
    if (applicationFormValues !== undefined && applicationFormValues !== null) {
      const formValues = JSON.parse(applicationFormValues);
      if (!(formValues.certcode === undefined || formValues.certcode === null)) {
        form.setFieldsValue({ 'certcode': formValues.certcode });
        dispatch({
          type: 'applicant/getCheckProject',
          payload: {
            certCode: formValues.certcode,
          },
          callback: (response2) => {
            this.setState({ checkProject: response2 });
          }
        });
      }
      if (!(formValues.unit === undefined || formValues.unit === null)) {
        form.setFieldsValue({ 'unit': formValues.unit });
      }
      if (!(formValues.applicant === undefined || formValues.applicant === null)) {
        form.setFieldsValue({ 'applicant': formValues.applicant });
      }
      if (!(formValues.applicanttel === undefined || formValues.applicanttel === null)) {
        form.setFieldsValue({ 'applicanttel': formValues.applicanttel });
      }
      if (!(formValues.agent === undefined || formValues.agent === null)) {
        form.setFieldsValue({ 'agent': formValues.agent });
      }
      if (!(formValues.applicantname === undefined || formValues.applicantname === null)) {
        form.setFieldsValue({ 'applicantname': formValues.applicantname });
      }
      if (!(formValues.agentname === undefined || formValues.agentname === null)) {
        form.setFieldsValue({ 'agentname': formValues.agentname });
      }
      if (!(formValues.agenttel === undefined || formValues.agenttel === null)) {
        form.setFieldsValue({ 'agenttel': formValues.agenttel });
      }
      if (!(formValues.payer === undefined || formValues.payer === null)) {
        form.setFieldsValue({ 'payer': formValues.payer });
      }
      if (!(formValues.price === undefined || formValues.price === null)) {
        form.setFieldsValue({ 'price': formValues.price });
      }
      if (!(formValues.shipname === undefined || formValues.shipname === null)) {
        form.setFieldsValue({ 'shipname': formValues.shipname });
      }
      if (!(formValues.inspdate === undefined || formValues.inspdate === null)) {
        form.setFieldsValue({ 'inspdate': moment(formValues.inspdate, "YYYY-MM-DD") });
      }
      if (!(formValues.quantityd === undefined || formValues.quantityd === null)) {
        form.setFieldsValue({ 'quantityd': formValues.quantityd });
      }
      if (!(formValues.chineselocalname === undefined || formValues.chineselocalname === null)) {
        form.setFieldsValue({ 'chineselocalname': formValues.chineselocalname });
      }
      if (!(formValues.inspplace1 === undefined || formValues.inspplace1 === null)) {
        form.setFieldsValue({ 'inspplace1': formValues.inspplace1 });
      }
      if (!(formValues.inspplace2 === undefined || formValues.inspplace2 === null)) {
        form.setFieldsValue({ 'inspplace2': formValues.inspplace2 });
      }
      if (!(formValues.inspway === undefined || formValues.inspway === null)) {
        form.setFieldsValue({ 'inspway': formValues.inspway });
      }
      if (!(formValues.inspwaymemo1 === undefined || formValues.inspwaymemo1 === null)) {
        form.setFieldsValue({ 'inspwaymemo1': formValues.inspwaymemo1 });
      }
      if (!(formValues.iscostoms === undefined || formValues.iscostoms === null)) {
        form.setFieldsValue({ 'iscostoms': formValues.iscostoms });
      }
      if (!(formValues.customsNo === undefined || formValues.customsNo === null)) {
        form.setFieldsValue({ 'customsNo': formValues.customsNo });
      }
      if (!(formValues.customsName === undefined || formValues.customsName === null)) {
        form.setFieldsValue({ 'customsName': formValues.customsName });
      }
      if (!(formValues.iscostoms === undefined || formValues.iscostoms === null)) {
        this.setState({isCustoms:true})
        form.setFieldsValue({ 'iscostoms': formValues.iscostoms });
      }
      this.forceUpdate();
    }
  };


  validate = () => {
    Modal.confirm({
      title: '确定提交此委托吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        message.success("正在提交数据...");
        const {form,dispatch} = this.props;
        const { tempFileList } = this.state;
        form.validateFieldsAndScroll((error, values) => {
          const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
          if (values.inspplace1 !== null && values.inspplace1 !== undefined) {
            values.inspplace1 = values.inspplace1[2];
          }
          const customsNameItem =  form.getFieldValue('customsName');
          if (customsNameItem !== null && customsNameItem !== undefined && customsNameItem.length !== 0) {
            values.customsName = customsNameItem[1];
          }
          if (!error) {
            dispatch({
              type: 'applicant/addPremaininfo',
              payload: {
                ...values,
                consigoruser: user.userName,
              },
              callback: (response) => {
                if (response.code === 200) {
                  let formData = new FormData();
                  const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
                  tempFileList.forEach(file => {
                    formData.append('files', file.originFileObj);
                  });
                  formData.append('prereportno', response.data);
                  formData.append('creator', user.contactName);
                  dispatch({
                    type: 'applicant/upload',
                    payload: formData,
                    callback: (response2) => {
                      if (response2.code === 200) {
                        notification.open({
                          message: '添加成功',
                        });
                        //sessionStorage.setItem('prereportno',response.data);
                        router.push({
                          pathname: '/Applicant/UnAccept',
                        });
                      } else {
                        notification.open({
                          message: '添加失败',
                          description: response.data,
                        });
                      }
                    }
                  });
                } else {
                  notification.open({
                    message: '添加失败',
                    description: response.data,
                  });
                }
              }
            });
          } else {
          }
        });
      },
    });

  };

  deleteItem = text => {
    let files = this.state.tempFileList;
    for (let file in files) {
      if (files[file].name === text.name) {
        files.splice(file, 1);
        break;
      }
    }
    this.setState({ tempFileList: files });
    this.forceUpdate();
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    const { form } = this.props;
    if (this.state.value === 1) {
      form.setFieldsValue({ ['payer']: form.getFieldValue('applicant') });
    } else {
      form.setFieldsValue({ ['payer']: form.getFieldValue('agent') });
    }
  };


  handleAgentSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({ agentName: response })
      }
    });
  };


  onCertCodeChange = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getCheckProject',
      payload: {
        certCode: value,
      },
      callback: (response) => {
        this.setState({ checkProject: response })
      }
    });
  };

  handleApplicantSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({ applicantName: response })
      }
    });
  };

  handlePayerSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({ payerName: response })
      }
    });
  };

  onChangeInspplace = value => {
    this.setState({ placecode: value[2] });
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const values = {
      placename: "",
      placecode: value[2] !== undefined ? value[2] : "",
      consigoruser: user.userName,
    };
    dispatch({
      type: 'applicant/searchPlaceByPlaceCode',
      payload: values,
      callback: (response) => {
        this.setState({ placeName: response })
      }
    });
  };

  placeSearch = value => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const values = {
      placename: value,
      placecode: this.state.placecode !== undefined ? this.state.placecode : "",
      consigoruser: user.userName,
    };
    dispatch({
      type: 'applicant/searchPlaceByPlaceCode',
      payload: values,
      callback: (response) => {
        this.setState({ placeName: response })
      }
    });
  };

  cargoSearch = value => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    dispatch({
      type: 'applicant/getConfigorCargoList',
      payload: {
        kind: 'cargoname',
        value,
        consigoruser: user.userName,
      },
      callback: (response) => {
        this.setState({ cargos: response })
      }
    });
  };

  handleChangeCargo = value => {
    this.setState({ cargoname: value });
  };

  onAppliantChange = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({ applicantContacts: response.data });
      }
    });
  };

  handleChange = ({ file, fileList }) => {
    // 限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    const isPDF = file.type === 'application/pdf'
    const size = file.size / 1024 / 1024 < 20;
    if (!(isJPG || isJPEG || isGIF || isPNG || isPDF)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG、 PDF格式的图片~',
      });
      return;
    } else if (!size) {
      Modal.error({
        title: '超过20M限制，不允许上传~',
      });
      return;
    }
    let val = file.name;
    const pattern = /\.{1}[a-z]{1,}$/;
    if (pattern.exec(val) !== null) {
      val = val.slice(0, pattern.exec(val).index)
    }
    const {
      form
    } = this.props;
    form.setFieldsValue({ ['filename']: val });
    this.setState({ fileList });
  };

  onAgentChange = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({ agentContacts: response.data })
      }
    });
  };

  onAppliantNameChange = value => {
    const { form } = this.props;
    const { applicantContacts } = this.state;
    for (const applicantContact in applicantContacts) {
      if (applicantContacts[applicantContact].contactName === value) {
        form.setFieldsValue({ 'applicanttel': applicantContacts[applicantContact].contactPhone });
        break;
      }
    }
  };

  onAgentNameChange = value => {
    const { form } = this.props;
    const { agentContacts } = this.state;
    for (const agentContact in agentContacts) {
      if (agentContacts[agentContact].contactName === value) {
        form.setFieldsValue({ 'agenttel': agentContacts[agentContact].contactPhone });
        break;
      }
    }
  };

  show = value => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    const {
      form
    } = this.props;
    form.setFieldsValue({ 'filename': null });
    this.setState({ fileList: [] });
    this.setState({ visible: false });
  };

  handleOk = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        values.MultipartFile.fileList[0].name = values.filename;
        this.state.tempFileList.push(values.MultipartFile.fileList[0]);
        this.setState({ visible: false });
        const {
          form
        } = this.props;
        form.setFieldsValue({ 'filename': null });
        this.setState({ fileList: [] });
      }
    });
  };

  getRepeatCustomsNo = (rule, value, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getRepeatCustomsNo',
      payload: { customsNo: value },
      callback: (response) => {
        if (response === "repeat") {
          callback(formatMessage({ id: 'validation.customsNo.repeat' }));
        } else if (response === "success") {
          callback();
        } else {
          callback(formatMessage({ id: 'validation.customsNo.error' }));
        }
      }
    });
  };

  handleSearch = (values)=> {
    const{dispatch} = this.props;
    if(values.iscostoms===1 && values.customsCompany!==undefined && values.customsCompany.length!==0){
      dispatch({
        type: 'applicant/searchCompanyList',
        payload: values,
        callback: (response) => {
          if (response) {
            this.setState({ company: response.data })
          }
        }
      });
    } else{
        dispatch({
          type: 'applicant/searchAllCompanyListForContact',
          payload: values,
          callback: (response) => {
            if (response) {
              this.setState({ company: response.data })
            }
          }
        });
      }
  };

  handleFormReset = () => {
    const { dispatch,form} = this.props;
    dispatch({
      type: 'applicant/searchAllCompanyListForContact',
      payload: {
        // certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({ company: response.data });
      }
    });
    form.resetFields(`value`,undefined);
    form.resetFields(`iscostoms`,0);
    form.resetFields(`customsName`,undefined);
    this.setState({ isCustoms: false });
  };

  onChangeCustomsNameValue = e => {
    const{form} = this.props;
    const kind =  form.getFieldValue('kind');
    const value =  form.getFieldValue('value');
    const iscostoms =  form.getFieldValue('iscostoms');
    const customsNameItem =  e;
    if(iscostoms===1&&customsNameItem!==undefined && customsNameItem.length!==0){
      const values={
        kind,
        value,
        iscostoms,
        customsCompany:customsNameItem[1],
      };
      this.handleSearch(values);
    }else{
      const values={
        kind,
        value,
        iscostoms,
      };
      this.handleSearch(values);
    }
  };

  okHandle = () => {
    const{form} = this.props;
    const kind =  form.getFieldValue('kind');
    const value =  form.getFieldValue('value');
    const iscostoms =  form.getFieldValue('iscostoms');
    const customsNameItem =  form.getFieldValue('customsName');
    if(iscostoms===1&&customsNameItem!==undefined && customsNameItem.length!==0){
      const values={
        kind,
        value,
        iscostoms,
        customsCompany:customsNameItem[1],
      };
      this.handleSearch(values);
    }else{
      const values={
        kind,
        value,
        iscostoms,
      };
      this.handleSearch(values);
    }
  };

  renderSimpleForm() {
    const simple = Form.create()
    {
      const {
        form
      } = this.props;
      return (
        <Form onSubmit={this.okHandle} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={4} sm={20}>
              <Form.Item
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 6 }}
                colon={false}
              >
                {form.getFieldDecorator('kind', {
                  initialValue: "namec",
                  rules: [{ message: '搜索类型' }],
                })(
                  <Select placeholder="搜索类型">
                    <Option value="namec">检验机构</Option>
                    <Option value="adres">注册地址</Option>
                    <Option value="tel">咨询电话</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col md={6} sm={20}>
              <Form.Item>
                {form.getFieldDecorator('value', { rules: [{ message: '搜索数据' }], })(<Input placeholder="请输入"/>)}
              </Form.Item>
            </Col>

            <Col span={7}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 12 }} onClick={this.handleFormReset}>重置查询</Button>
            </span>
            </Col>
          </Row>
        </Form>
      );
    }
    return simple();
  }



  render() {
    const parentMethods = {
      handleOk:this.handleOk,
      handleCancel:this.handleCancel,
      handleSearch:this.handleSearch,
    };
    const {
      form: {getFieldDecorator},
      loading,
    } = this.props;
    const {applicantName, agentName, payerName  , checkProject, cargos, agentContacts, applicantContacts, visible, company , isCustoms,customsOption,fileList,tempFileList,placeName} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const applicantOptions = applicantName.map(d => <Option key={d} value={d}>{d}</Option>);
    const agentOptions = agentName.map(d => <Option key={d} value={d}>{d}</Option>);
    const payerOptions = payerName.map(d => <Option key={d} value={d}>{d}</Option>);
    const cargosOptions = cargos.map(d => d.cargoname);
    const placeOptions = placeName.map(d => d.placename);
    const applicantContactsOptions = applicantContacts.map(d => <Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const agentContactsOptions = agentContacts.map(d =><Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const companyOptions = company.map(d =><Option key={d.certcode} value={d.certcode}>{d.namec} {d.tel}</Option>);
    // 申请人选项
    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.card}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.validate}>提交</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.resetform}>重置</Button>
            </Col>
            <Col span={18} />
          </Row>
        </Card>
        <Card title="检验机构" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label='检验机构'
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('certcode', {
                    rules: visible ?[]:[{required: true, message: '请选择检验机构'}]
                  })(
                    <Select
                      // showSearch
                      placeholder="请选择检验机构"
                      filterOption={false}
                      // onSearch={this.handleApplicantSearch}
                      onChange={this.onCertCodeChange}
                    >
                      {companyOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item> <div style={{color:'grey',paddingLeft:10}}>说明：可在下面列表搜索后选取</div></Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label={fieldLabels.iscostoms}
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                  colon={false}
                >
                  {getFieldDecorator('iscostoms', {
                    initialValue:0,
                    rules: [],
                  })(
                    <Radio.Group onChange={this.changeIsCustoms}>
                      <Radio value={0}>不需要</Radio>
                      <Radio value={1}>需要</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.customsName}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 19}}
                  colon={false}
                >
                  {getFieldDecorator('customsName', {
                  })(
                    <Cascader options={customsOption} disabled={!isCustoms} placeholder="请选择隶属关名称" onChange={this.onChangeCustomsNameValue} />
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.customsNo}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('customsNo', {
                    rules: [
                      {
                        validator: this.getRepeatCustomsNo,
                      },
                    ],
                  })(<Input disabled={!isCustoms} placeholder="请输入报告号" />)}
                </Form.Item>
              </Col>
            </Row>

            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={company}
              columns={this.columnsCompany}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </Form>

        </Card>
        <Card title="业务信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label={fieldLabels.applicant}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('applicant', {
                    rules: visible ?[]:[{required: true, message: '请输入申请人'}]
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={applicantOptions}
                      onChange={this.onAppliantChange}
                      onSearch={this.handleApplicantSearch}
                      placeholder="请输入申请人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.applicantname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('applicantname', {})(
                    <Select
                      placeholder="请选择联系人"
                      filterOption={false}
                      onChange={this.onAppliantNameChange}
                    >
                      {applicantContactsOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.applicanttel}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('applicanttel', {})(<Input style={{width: '100%'}} placeholder="请输入手机"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label={fieldLabels.agent}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('agent', {})(
                    <AutoComplete
                      className="global-search"
                      dataSource={agentOptions}
                      onSearch={this.handleAgentSearch}
                      onChange={this.onAgentChange}
                      placeholder="请输入代理人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.agentname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('agentname', {})(
                    <Select
                      placeholder="请选择联系人"
                      filterOption={false}
                      onChange={this.onAgentNameChange}
                    >
                      {agentContactsOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.agenttel}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('agenttel', {})(<Input style={{width: '100%'}} placeholder="请输入手机" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex">
              <Col span={10}>
                <Form.Item
                  label={fieldLabels.payer}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}
                  colon={false}
                >
                  {getFieldDecorator('payer', {
                    //rules: [{required: true, message: '请输入付款人'}],
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={payerOptions}
                      onSearch={this.handlePayerSearch}
                      placeholder="请输入付款人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  colon={false}
                >
                  <Radio.Group onChange={this.onChange}>
                    <Radio value={2}>同申请人</Radio>
                    <Radio value={1}>同代理人</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label={fieldLabels.price}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('price', {
                    rules: [{
                      message: '请输入检验费'
                    }],
                  })
                  (<Input style={{width: '100%'}} placeholder="请输入" />)
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="检查对象" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.cargoname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('chineselocalname', {
                    rules: visible ?[]:[{required: true, message: '请输入货物名称'}]
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={cargosOptions}
                      onChange={this.handleChangeCargo}
                      onSearch={this.cargoSearch}
                      placeholder="请输入货物名称"
                    >
                      <Input
                      />
                    </AutoComplete>

                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.shipname}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('shipname', {
                    rules: [],
                  })(<Input placeholder="请输入船名" />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  label={fieldLabels.quantityD}
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                  colon={false}
                >
                  {getFieldDecorator('quantityd', {
                    rules: [{
                      whitespace: true,
                      type: 'number',
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }, message: '请输入数字'
                    }],
                  })(
                    <Input placeholder="0" />
                  )}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item
                  colon={false}
                >
                  {getFieldDecorator('unit', {
                    rules: [],
                  })(
                    <Select placeholder="请选择">
                      <Option value="公吨">公吨</Option>
                      <Option value="包">包</Option>
                      <Option value="千克">千克</Option>
                      <Option value="个">个</Option>
                      <Option value="捆">捆</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspdate}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspdate', {
                    rules: [],
                  })(
                    <DatePicker
                      placeholder="预报日期"
                      style={{width: '100%'}}
                      format="YYYY-MM-DD"
                      getPopupContainer={trigger => trigger.parentNode}

                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.inspplace1}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace1', {
                    rules: [],
                  })(
                    <Cascader
                      options={areaOptions}
                      placeholder="请选择检验地点"
                      onChange={this.onChangeInspplace}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.area}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('inspplace2', {
                    rules: [],
                  })(
                    <AutoComplete
                      className="global-search"
                      dataSource={placeOptions}
                      onSearch={this.placeSearch}
                      placeholder="请输入详细地址"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="检查项目" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row>
              <Col span={24}>
                <Form.Item
                  label={fieldLabels.inspway}
                  labelCol={{span: 2}}
                  wrapperCol={{span: 22}}
                  colon={false}
                >
                  {getFieldDecorator('inspway', {
                    rules:visible ? []: [{required: true, message: '请选择申请项目'}]
                  })(
                    <CheckboxGroup
                      options={checkProject}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={fieldLabels.inspwaymemo1}
                  labelCol={{span: 2}}
                  wrapperCol={{span: 22}}
                  colon={false}
                >
                  {getFieldDecorator('inspwaymemo1', {})(<TextArea style={{minHeight: 32}} rows={5}  placeholder="申请品质时，请简要说明品质指标要求" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className={styles.card} bordered={false}>
          <Row>
            <Col span={24}>
              <Button style={{ marginBottom: 12 }} type="primary" onClick={this.show}>上传文件</Button>
            </Col>
          </Row>
        <Modal
            title="文件上传"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
         >
          <Form.Item label="文件上传">
                {getFieldDecorator('MultipartFile', {
                  rules: visible ?[{required: true, message: '请输入文件上传'}]:[],
              })(
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  beforeUpload={this.handleBeforeUpload}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              )}
              </Form.Item>
              <Form.Item label="文件名称">
                {getFieldDecorator('filename', {
                  rules: visible ? [{required: true, message: '请输入文件名称'}]:[],
              })(
                <Input style={{width: '100%'}} placeholder="请输入文件名称"/>
              )}
            </Form.Item>
        </Modal>
        <Table
            size="middle"
            loading={loading}
            dataSource={tempFileList}
            columns={this.columns}
            rowKey="name"
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Application;
