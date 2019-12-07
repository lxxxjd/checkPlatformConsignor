import React, {PureComponent} from 'react';
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
  customsNo: '报关号',
  applicant: '申请人',
  applicantname: '联系人',
  applicanttel: '联系方式',
  businesssort: '业务分类',
  agent: '代理人',
  agentname: '联系人',
  agenttel: '联系方式',
  payer: '付款人',
  price: '检验费',
  reportdate: '委托日期',
  tradeway: '贸易方式',
  businesssource: '业务来源',
  shipname: '标识/船名',
  fromto: '产地/装卸港',
  insplinkway: '现场联系方式',
  inspdate: '检验时间',
  cargoname: '检查品名',
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
  customsName:'海关部门'
};


@connect(({applicant, loading}) => ({
  applicant,
  loading: loading.models.applicant,
}))
@Form.create()
class Application extends PureComponent {
  state = {
    width: '100%',
    value: 1,
    applicantName: [],
    agentName:[],
    payerName:[],
    businessSort: [],
    businessSource: [],
    tradeway: [],
    checkProject: [],
    cargos: [],
    applicantContacts: [],
    agentContacts: [],
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
    departments:[],
    cargoname:"",
  };
  columns = [
    {
      title: '记录名',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const {form} = this.props;
    form.setFieldsValue({['unit']: "公吨"});
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    form.setFieldsValue({['inspdate']: moment(now, "YYYY-MM-DD HH:mm:ss")});
    form.setFieldsValue({['reportdate']: moment(now, "YYYY-MM-DD HH:mm:ss")});
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const {dispatch} = this.props;
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
      type: 'applicant/getBusinessSort',
      payload: {},
      callback: (response) => {
        this.setState({businessSort: response})
      }
    });
    dispatch({
      type: 'applicant/getBusinessSource',
      payload: {},
      callback: (response) => {
        this.setState({businessSource: response})
      }
    });
    dispatch({
      type: 'applicant/getTradeWay',
      payload: {},
      callback: (response) => {
        this.setState({tradeway: response})
      }
    });
    dispatch({
      type: 'applicant/getCheckProject',
      payload: {
        certCode : user.certCode,
      },
      callback: (response) => {
        this.setState({checkProject: response})
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
      type: 'applicant/getDepartmentList',
      payload: {
        certCode: user.certCode,
      },
      callback: (response) => {
        console.log(response);
        this.setState({departments: response.data})
      }
    });
  }

  validate = () => {
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    const { cnasInfo } = this.state;
    validateFieldsAndScroll((error, values) => {
      const user = JSON.parse(localStorage.getItem("userinfo"));
      if(values.inspplace1 !== null && values.inspplace1 !== undefined){
         values.inspplace1 = values.inspplace1[2];
      }
      if(values.customsName !== null && values.customsName !== undefined){
        values.customsName = values.customsName[1];
      }
      console.log(error);
      if (!error) {
        // submit the values
        dispatch({
          type: 'entrustment/addReport',
          payload: {
            ...values,
            username: user.nameC,
            certcode: user.certCode,
            reportplace: user.place,
            cnasCode: cnasInfo.checkcode
          },
          callback: (response) => {
            if (response.code === 200) {
              notification.open({
                message: '添加成功',
              });
              sessionStorage.setItem('reportno', response.data.reportno);
              router.push({
                pathname: '/Entrustment/DetailForEntrustment',
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
      type: 'entrustment/getClientName',
      payload: {
        content: value
      },
      callback: (response) => {
        this.setState({agentName: response})
      }
    });
  };
  handleApplicantSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getClientName',
      payload: {
        content: value
      },
      callback: (response) => {
        this.setState({applicantName: response})
      }
    });
  };
  handlePayerSearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getClientName',
      payload: {
        content: value
      },
      callback: (response) => {
        this.setState({payerName: response})
      }
    });
  };
  cargoSearch = value => {
    const {dispatch} = this.props;
   // const certCode = JSON.parse(localStorage.getItem("userinfo")).certCode;
    dispatch({
      type: 'entrustment/searchCargos',
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
    console.log(value);
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getContacts',
      payload: {
        value
      },
      callback: (response) => {
        this.setState({applicantContacts: response.data});
      }
    });
  };

  onAgentChange = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'entrustment/getContacts',
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

  render() {
    const {
      form: {getFieldDecorator},
      loading,
    } = this.props;
    const {applicantName, agentName, payerName , businessSort, businessSource, tradeway, checkProject, cargos, agentContacts, applicantContacts, departments, disable} = this.state;

    const applicantOptions = applicantName.map(d => <Option key={d} value={d}>{d}</Option>);
    const agentOptions = agentName.map(d => <Option key={d} value={d}>{d}</Option>);
    const payerOptions = payerName.map(d => <Option key={d} value={d}>{d}</Option>);
    const businessSortOptions = businessSort.map(d => <Option key={d} value={d}>{d}</Option>);
    const businessSourceOptions = businessSource.map(d => <Option key={d} value={d}>{d}</Option>);
    const tradewayOptions = tradeway.map(d => <Option key={d} value={d}>{d}</Option>);
    const cargosOptions = cargos.map(d => d.cargonamec);
    const departmentOptions = departments.map(d => <Option key={d.branchname} value={d.branchname}>{d.branchname}</Option>);
    const applicantContactsOptions = applicantContacts.map(d => <Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    const agentContactsOptions = agentContacts.map(d =><Option key={d.contactName} value={d.contactName}>{d.contactName}</Option>);
    //申请人选项
    return (
      <PageHeaderWrapper
      >
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.validate}>提交</Button>
            </Col>
            <Col span={22}>
            </Col>
          </Row>
        </Card>
        <Card title="检验机构" className={styles.card} bordered={false}>
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
                    rules: [{required: true, message: '请选择检验机构'}],
                  })(
                    <Select
                      showSearch
                      placeholder="请选择检验机构"
                      filterOption={false}
                      onSearch={this.handleApplicantSearch}
                      onChange={this.onAppliantChange}
                    >
                      {applicantOptions}
                    </Select>
                  )}
                </Form.Item>            
              </Col>
              <Col span={16}>
              </Col>
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
                    rules: [{required: true, message: '请输入申请人'}],
                  })(
                    <Select
                      showSearch
                      placeholder="请选择申请人"
                      filterOption={false}
                      onSearch={this.handleApplicantSearch}
                      onChange={this.onAppliantChange}
                    >
                      {applicantOptions}
                    </Select>
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
                  {getFieldDecorator('applicanttel', {})(<Input style={{width: '100%'}} placeholder="联系方式"/>)}
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
                    <Select
                      showSearch
                      placeholder="请选择代理人"
                      filterOption={false}
                      onSearch={this.handleAgentSearch}
                      onChange={this.onAgentChange}
                    >
                      {agentOptions}
                    </Select>
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
                  {getFieldDecorator('agenttel', {})(<Input style={{width: '100%'}} placeholder="联系方式"/>)}
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
                    <Select                       
                      showSearch
                      placeholder="请选择付款人"
                      filterOption={false}
                      onSearch={this.handlePayerSearch}>
                      {payerOptions}
                    </Select>
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
                  {getFieldDecorator('cargoname', {
                    rules: [{required: true, message: '请输入检查品名'}],
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
                  label={fieldLabels.quantityD}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  colon={false}
                >
                  {getFieldDecorator('quantityD', {
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
                      placeholder="检查日期"
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
                    <Cascader options={areaOptions} placeholder="请选择检验地点" />
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
                    <Input placeholder="请输入详细地址" />
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
                    rules: [{required: true, message: '申请项目'}],
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
        <Card title="上传文件" className={styles.card} bordered={false}>
          <Table
            size="middle"
            loading={loading}
            //dataSource={recordData}
            columns={this.columns}
            rowKey="recordname"
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Application;
