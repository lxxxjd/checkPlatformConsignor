import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
  Modal,
  Rate,
  notification,
  Descriptions
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SearchForEntrustment.less';
import moment from 'moment';




const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ applicant, loading }) => ({
  applicant,
  loading: loading.models.applicant,
}))

@Form.create()
class Accept extends PureComponent {
  state = {
    ratevisible:false,
    peopleVisible:false,
    man:[],
    reportno:null,
    certVisible:false,
    cert:{},
    kindValue:"certCode",
    company:[],
    reports:[],
  };

  columns1 = [
    {
      title: '检验人员',
      dataIndex: 'inspman',
    },

    {
      title: '手机',
      dataIndex: 'tel',
    },
    {
      title: '任务',
      dataIndex: 'inspway',
    },
  ];

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    // {
    //   title: '委托人',
    //   dataIndex: 'applicant',
    // },
    {
      title: '检验机构',
      dataIndex: 'namec',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '状态日期',
      dataIndex: 'overalltime',
      render: val => this.handleDate(val),
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.peopleItem(text, record)}>人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.fileItem(text, record)}>查看证书</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>退回证书</a>
          &nbsp;&nbsp;
          <a onClick={() => this.rateItem(text, record)}>评价</a>
          &nbsp;&nbsp;
          <a onClick={() => this.copyItem(text, record)}>复制</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const { dispatch } = this.props;
    console.log(user);
    const params = {
      consigoruser:user.userName,
      source:'已受理'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
      callback: (response) => {
        this.setState({reports : response.data})
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

  rateItem = text =>{
    this.setState({reportno:text.reportno});
    this.setState({ratevisible:true});
  };

  handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  onChangeKind =(value) =>{
    this.setState({kindValue:value});
  };

  deleteItem = text =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getApplyReason',
      payload: {
        reportno:text.reportno,
      },
      callback:response =>{
        if (response.code === 200) {
          this.setState({reportno:text.reportno});
          this.setState({cert:response.data});
          this.setState({certVisible:true});
        }else{
          notification.open({
            message: '不存在申请作废证书!',
            description: response.data,
          });
        }
      }
    });
  };

  fileItem = text =>{
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/CertificateDetail',
    });
  };

  peopleItem = text =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getAllMan',
      payload: {
        reportno:text.reportno,
        certcode:text.certcode,
      },
      callback:response =>{
        if (response.code === 200) {
          this.setState({man:response.data});
        }
      }
    });
    this.setState({peopleVisible:true});
  };

  copyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/CopyApplication',
    });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('accept_namec',text.namec);
    router.push({
      pathname:'/Applicant/DetailForAccept',
    });
  };

  handleFormReset = () => {

    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const { form,dispatch } = this.props;
    form.resetFields();
    const params = {
      consigoruser:user.userName,
      source:'已受理'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
      callback: (response) => {
        this.setState({reports : response.data})
      }
    });
  };



  handleSearch = e => {

    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
      const values = {
        ...fieldsValue,
        consigoruser:user.userName,
        source:'已受理'
      };
      dispatch({
        type: 'applicant/getReportByConfigor',
        payload: values,
        callback: (response) => {
          this.setState({reports : response.data})
        }
      });
    });
  };

  handleCancel = () =>{
    this.setState({ratevisible:false});
    this.setState({peopleVisible:false});
    this.setState({certVisible:false});
  };

  handleEvaluationOk = (fieldsValue) => {
    const { dispatch} = this.props;
    const {reportno} = this.state;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const values = {
      ...fieldsValue,
      consigoruser:user.userName,
      reportno,
    };
    dispatch({
      type: 'applicant/addEvaluation',
      payload: values,
      callback: (response) =>{
        if (response.code === 200) {
          notification.open({
            message: '评分成功',
          });
          this.componentDidMount();
        }else {
          notification.open({
            message: '评分失败',
            description: response.data,
          });
        }
      }
    });
    this.setState({ratevisible:false});
  };


  handleCertOk = value =>{
    const { reportno } = this.state;
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    dispatch({
      type: 'applicant/returnReadRecord',
      payload: {
        reportno:reportno,
        organization:"委托人",
        reader:user.userName,
        company:user.companyName
      },
      callback:response =>{
        if (response.code === 200) {
          notification.open({
            message: "同意成功",
          });
          this.setState({certVisible:false});
        }else{
          notification.open({
            message: '同意失败',
            description: response.data,
          });
        }
      }
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {kindValue,company} = this.state;
    const companyOptions = company.map(d =><Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={5} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:"certCode",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型" onChange={this.onChangeKind}>
                  <Option value="certCode">检验机构</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="chineselocalname">货名</Option>
                  <Option value="overallstate">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={10} sm={20}>
            {kindValue === "certCode" ?
              [
                <FormItem>
                  {getFieldDecorator('value', { rules: [{ message: '搜索数据' }], })(
                    <Select placeholder="请选择检验机构">
                      {companyOptions}
                    </Select>
                  )}
                </FormItem>
              ] : [
                <FormItem>
                  {getFieldDecorator('value', { rules: [{ message: '搜索数据' }], })(
                    <Input placeholder="请输入" />)}
                </FormItem>
              ]
            }
          </Col>

          <Col md={6} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }



  render() {
    const {
      loading,
    } = this.props;
    const { peopleVisible , man, certVisible, cert,reports,ratevisible} = this.state;
    const parentMethods = {
      handleCertOk:this.handleCertOk,
      handleCancel:this.handleCancel,
      handleEvaluationOk:this.handleEvaluationOk,

    };
    return (
      <PageHeaderWrapper>
        <Card size='small' bordered={false}>
          <div>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              className={styles.antTable}
              rowClassName={styles.antTable2}
              loading={loading}
              rowKey='reportno'
              dataSource={reports}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
          <CertBackFrom {...parentMethods} certVisible={certVisible} cert={cert} />
          <PersonFrom {...parentMethods} peopleVisible={peopleVisible} loading={loading} man={man} columns1={this.columns1} />
          <RateFrom {...parentMethods} ratevisible={ratevisible} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}



// 查看框
const CertBackFrom = (props => {
  const { certVisible, handleCertOk,handleCancel,cert  } = props;
  return (
    <Modal
      title="退回证书"
      visible={certVisible}
      onOk={handleCertOk}
      onCancel={handleCancel}
      okText="同意"
      cancelText="返回"
    >
      <Descriptions
        bordered
        column={2}
      >
        <Descriptions.Item label="请求人">{cert.applyman}</Descriptions.Item>
        <Descriptions.Item label="请求日期">{moment(cert.applydate).format('YYYY-MM-DD')}</Descriptions.Item>
        <Descriptions.Item label="证书退回原因">{cert.applyreason}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});

// 查看框
const PersonFrom = (props => {
  const { peopleVisible,handleCancel,loading ,man,columns1} = props;
  return (
    <Modal
      title="人员"
      visible={peopleVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <Table
        size="middle"
        loading={loading}
        rowKey='inspman'
        dataSource={man}
        columns={columns1}
        pagination={{showQuickJumper:true,showSizeChanger:true}}
      />
    </Modal>
  );
});


// 查看框
const RateFrom = Form.create()(props => {
  const { ratevisible,handleCancel,handleEvaluationOk ,form} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEvaluationOk(fieldsValue);
    });
  };
  return (
    <Modal
      title="评分"
      visible={ratevisible}
      onOk={okHandle}
      onCancel={handleCancel}
    >
      <Form layout='horizontal'>
        <Form.Item
          label="客户服务"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          {form.getFieldDecorator('customerService', {
            rules: [{required: true, message: '请选择评分'}],
          })(
            <Rate />
          )}
        </Form.Item>
        <FormItem
          label="现场检查"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          {form.getFieldDecorator('inspect', {
            rules: [{required: true, message: '请选择评分'}],
          })(
            <Rate />
          )}
        </FormItem>
        <FormItem
          label="分析测试"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          {form.getFieldDecorator('test', {
            rules: [{required: true, message: '请选择评分'}],
          })(
            <Rate />
          )}
        </FormItem>
        <FormItem
          label="流程时效"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          {form.getFieldDecorator('cost', {
            rules: [{required: true, message: '请选择评分'}],
          })(
            <Rate />
          )}
        </FormItem>
        <FormItem
          label="检验费用"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          {form.getFieldDecorator('process', {
            rules: [{required: true, message: '请选择评分'}],
          })(
            <Rate tooltips={['昂贵','较昂贵','适中','较低廉','低廉']} />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});





export default Accept;
