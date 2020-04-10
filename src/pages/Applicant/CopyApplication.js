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
} from 'antd';

import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './style.less';
import areaOptions from './areaOptions'

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
  shipname: '标识/船名',
  inspdate: '预报日期',
  cargoname: '货名',
  cargosort: '货物类别',
  quantityd: '申报数量',
  unit: '单位',
  ChineseName: '型号/俗称',
  inspplace1: '检验地点',
  reportno20: '自编号',
  area:'区/县/市',
  inspway: '申请项目',
  inspwaymemo1: '检验备注',
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
class CopyApplication extends PureComponent {
  state = {
    width: '100%',
    value: 1,
    applicantName: [],
    agentName:[],
    payerName:[],
    checkProject: [],
    cargos: [],
    applicantContacts: [],
    agentContacts: [],
    visible:false,
    departments:[],
    cargoname:"",
    fileList:[],
    tempFileList:[],
    company:[],
    placeName:[],
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

  componentDidMount() {
    const {form} = this.props;
    form.setFieldsValue({['unit']: "公吨"});
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    form.setFieldsValue({['inspdate']: moment(now, "YYYY-MM-DD HH:mm:ss")});
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const {dispatch} = this.props;
    const reportno = sessionStorage.getItem("reportno");
    dispatch({
      type: 'applicant/getReportInfo',
      payload: {
        reportno,
      },
      callback: (response) => {
        if(response.code === 200){
          const report = response.data;
          if(report.inspplace1!==undefined && report.inspplace1!==null){
            const placecodes=[];
            placecodes.push(`${report.inspplace1.substring(0,2)}0000`);
            placecodes.push(`${report.inspplace1.substring(0,4)}00`);
            placecodes.push(report.inspplace1);
            form.setFieldsValue({
              'inspplace1':placecodes
            });
          }
          console.log(report);
          form.setFieldsValue({
            'certcode': response.data.certcode,
            'unit': response.data.unit,
            'applicant': response.data.applicant,
            'applicanttel': response.data.applicanttel,
            'agent': response.data.agent,
            'agentname': response.data.agentname,
            'agenttel': response.data.agenttel,
            'payer': response.data.payer,
            'price': response.data.price,
           // 'shipname': response.data.shipname,
           // 'inspdate': moment(response.data.inspdate, "YYYY-MM-DD"),
            //'quantityd': response.data.quantityd,
            'chineselocalname': response.data.chineselocalname,
            'inspplace2': response.data.inspplace2,
            'applicantname':response.data.applicantname,
            'inspway': response.data.inspway.split(" "),
            'inspwaymemo1': response.data.inspwaymemo1,
          });
          dispatch({
            type: 'applicant/getCheckProject',
            payload: {
              certCode : report.certcode,
            },
            callback: (response2) => {
              this.setState({checkProject: response2})
            }
          });
        }
      }
    });
    dispatch({
      type: 'applicant/getClientName',
      payload: {},
      callback: (response) => {
        this.setState({applicantName: response});
        this.setState({agentName: response});
        this.setState({payerName:response});
      }
    });
    dispatch({
      type: 'applicant/getConfigorPlaceList',
      payload: {
        consigoruser : user.userName,
      },
      callback: (response) => {
        this.setState({placeName: response})
      }
    });
    dispatch({
      type: 'applicant/getCargos',
      payload: {
        // certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({cargos: response})
      }
    });
    dispatch({
      type: 'applicant/getCompanyList',
      payload: {
        // certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({company : response.data})
      }
    });
  }

  validate = () => {
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    const { tempFileList } = this.state;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
      if(values.inspplace1 !== null && values.inspplace1 !== undefined){
         values.inspplace1 = values.inspplace1[2];
      }
      if (!error) {
        // submit the values
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
              formData.append('creator', user.userName);
              dispatch({
                type: 'applicant/upload',
                payload:formData,
                callback: (response) =>{
                  if (response.code === 200) {
                    notification.open({
                      message: '添加成功',
                    });
                  }else {
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
      }
      else{
        console.log(error);
      }
    });
  };

  deleteItem = text =>{
    let files = this.state.tempFileList;
    for(let file in files){
      if(files[file].name === text.name){
        files.splice(file,1);
        break;
      }
    }
    this.setState({tempFileList:files});
    this.forceUpdate();
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
    const {form} = this.props;
    if (this.state.value === 1) {
      form.setFieldsValue({['payer']: form.getFieldValue('applicant')});
    } else {
      form.setFieldsValue({['payer']: form.getFieldValue('agent')});
    }
  };

  handleAgentSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'applicant/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({agentName: response})
      }
    });
  };

  onCertCodeChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'applicant/getCheckProject',
      payload: {
        certCode : value,
      },
      callback: (response) => {
        this.setState({checkProject: response})
      }
    });
  };



  handleApplicantSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'applicant/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({applicantName: response})
      }
    });
  };

  handlePayerSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'applicant/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {

        this.setState({payerName: response})
      }
    });
  };

  onChangeInspplace = value =>{
    this.setState({placecode:value[2]});
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const values={
      placename:"",
      placecode:value[2]!==undefined?value[2]:"",
      consigoruser : user.userName,
    };
    dispatch({
      type: 'applicant/searchPlaceByPlaceCode',
      payload: values,
      callback: (response) => {
        this.setState({placeName: response})
      }
    });
  };

  placeSearch = value =>{
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const values={
      placename:value,
      placecode:this.state.placecode!==undefined ?this.state.placecode:"",
      consigoruser : user.userName,
    };
    dispatch({
      type: 'applicant/searchPlaceByPlaceCode',
      payload: values,
      callback: (response) => {
        this.setState({placeName: response})
      }
    });
  };


  cargoSearch = value => {
    const {dispatch} = this.props;
   // const certCode = JSON.parse(localStorage.getItem("consignor_userinfo")).certCode;
    dispatch({
      type: 'applicant/searchCargos',
      payload: {
        // certCode,
        value
      },
      callback: (response) => {
        this.setState({cargos: response});
      }
    });
  };

  handleChangeCargo = value => {
    this.setState({cargoname:value});
  };

  onAppliantChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'applicant/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({applicantContacts: response.data});
      }
    });
  };

  handleChange = ({ file,fileList }) => {
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
    form.setFieldsValue({['filename']: val});
    this.setState({ fileList});
  };

  onAgentChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'applicant/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({agentContacts: response.data})
      }
    });
  };

  onAppliantNameChange = value => {
    const {form} = this.props;
    const {applicantContacts} = this.state;
    for (const applicantContact in applicantContacts) {
      if (applicantContacts[applicantContact].contactName === value) {
        form.setFieldsValue({'applicanttel': applicantContacts[applicantContact].contactPhone});
        break;
      }
    }
  };

  onAgentNameChange = value => {
    const {form} = this.props;
    const {agentContacts} = this.state;
    for (const agentContact in agentContacts) {
      if (agentContacts[agentContact].contactName === value) {
        form.setFieldsValue({'agenttel': agentContacts[agentContact].contactPhone});
        break;
      }
    }
  };

  show = value =>{
    this.setState({visible:true});
  };

  handleCancel = () =>{
    const {
      form
    } = this.props;
    form.setFieldsValue({'filename': null});
    this.setState({fileList:[]});
    this.setState({ visible: false });
  };

  handleOk =() =>{
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if(!error){
        values.MultipartFile.fileList[0].name = values.filename;
        this.state.tempFileList.push(values.MultipartFile.fileList[0]);
        this.setState({visible:false});
        const {
          form
        } = this.props;
        form.setFieldsValue({'filename':null});
        this.setState({fileList:[]});
      }
    });
  };

  back = () => {
    this.props.history.goBack();
  };

  render() {
    const parentMethods = {
      handleOk:this.handleOk,
      handleCancel:this.handleCancel
    };
    const {
      form: {getFieldDecorator},
      loading,
    } = this.props;
    const {applicantName, agentName, payerName  , checkProject, cargos, agentContacts, applicantContacts, visible, company , fileList,tempFileList,placeName} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const applicantOptions = applicantName.map(d => <Option key={d} value={d}>{d}</Option>);
    const agentOptions = agentName.map(d => <Option key={d} value={d}>{d}</Option>);
    const payerOptions = payerName.map(d => <Option key={d} value={d}>{d}</Option>);
    const cargosOptions = cargos.map(d => d.cargonamec);
    const placeOptions = placeName.map(d => d.placename);
    const applicantContactsOptions = applicantContacts.map(d => <Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const agentContactsOptions = agentContacts.map(d =><Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const companyOptions = company.map(d =><Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);
    //申请人选项
    return (
      <PageHeaderWrapper
      >
        <Card bordered={false} className={styles.card}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.validate}>提交</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.back}>返回</Button>
            </Col>
            <Col span={20} />
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
              <Col span={12} />
            </Row>
          </Form>
        </Card>
        <Card title="业务信息" className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.applicant}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
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
              <Col span={8}>
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
              <Col span={8}>
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
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.agent}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('agent', {})(
                    <AutoComplete
                      className="global-search"
                      dataSource={agentOptions}
                      onChange={this.handleAgentSearch}
                      onSearch={this.onAgentChange}
                      placeholder="请输入代理人"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
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
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.agenttel}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
                  colon={false}
                >
                  {getFieldDecorator('agenttel', {})(<Input style={{width: '100%'}} placeholder="请输入手机"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex">
              <Col span={8}>
                <Form.Item
                  label={fieldLabels.payer}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}
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
              <Col span={8}>
                <Form.Item
                  colon={false}
                >
                  <Radio.Group onChange={this.onChange}>
                    <Radio value={2}>付款人同申请人</Radio>
                    <Radio value={1}>付款人同代理人</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8}>
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
                  (<Input style={{width: '100%'}} placeholder="请输入"/>)
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
              <Col span={6}>
                <Form.Item
                  label={fieldLabels.quantityd}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
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
                    <Input placeholder="0"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={2}>
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
                    <Cascader options={areaOptions} placeholder="请选择检验地点" onChange={this.onChangeInspplace} />
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
                      <Input
                      />
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
                    rules:visible ? []: [{required: true, message: '请输入申请人'}]
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
                  {getFieldDecorator('inspwaymemo1', {})(<TextArea style={{minHeight: 32}} rows={5}/>)}
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

export default CopyApplication;
