import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

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
  Descriptions,
  notification, Rate,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddAttention.less';
import moment from 'moment';


const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ applicant, loading }) => ({
  applicant,
  loading: loading.models.applicant,
}))
@Form.create()
class AddAttention extends PureComponent {
  state = {
    preMainInfo:{},
    visible:false,
    man:[],
    reports:[],
    reportno:null,
    certVisible:false,
    cert:{},
    ratevisible:false,
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
      render: val =>this.isValidDate(val),
    },
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
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.peopleItem(text, record)}>人员&nbsp;&nbsp;</a>
          <a onClick={() => this.fileItem(text, record)}>查看证书&nbsp;&nbsp;</a>
          <a onClick={() => this.deleteItemApply(text, record)}>退回证书&nbsp;&nbsp;</a>
          <a onClick={() => this.rateItem(text, record)}>评价&nbsp;&nbsp;</a>
          <a onClick={() => this.copyItem(text, record)}>复制&nbsp;&nbsp;</a>
          <a onClick={() => this.deleteItem(text, record)}>取消关注&nbsp;&nbsp;</a>
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
   this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      consigoruser:user.userName,
      source:'已关注'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
      callback: (response) => {
        console.log(response.data)
        this.setState({reports : response.data})
      }
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/DetailForAccept',
    });
  };

  deleteItem = text => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      consigoruser:user.userName,
      reportNo:text.reportno
    };
    dispatch({
      type: 'applicant/unfollow',
      payload: params,
      callback: (response) =>{
        if (response.code === 200) {
          notification.open({
            message: '取消关注成功',
          });
          this.componentDidMount();
        }else {
          notification.open({
            message: '取消关注失败',
          });
        }
      }
    });
  };

  deleteItemApply = text =>{
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

  rateItem = text =>{
    this.setState({reportno:text.reportno});
    this.setState({ratevisible:true});
  };

  copyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/CopyApplication',
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

  fileItem = text =>{
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/CertificateDetail',
    });
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };



  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        ...fieldsValue,
      };
      dispatch({
        type: 'applicant/getReportByRandomCode',
        payload: values,
        callback: (response) =>{
          if (response.code === 200) {
            this.setState({visible:true});
            this.setState({preMainInfo:response.data});
          }else {
            // notification.open({
            //   message: '查询错误',
            //   description: response.data,
            // });
            Modal.error({
              title: '委托编号或密码错误，未查询到结果！',
              okText:"关闭",
              onOk() {},
            });
          }
        }
      });
    });
  };

  handleCancel = () =>{
    this.setState({visible:false});
    this.setState({peopleVisible:false});
    this.setState({certVisible:false});
    this.setState({ratevisible:false});
  };

  handleEvaluationOk = (fieldsValue) => {
    const { dispatch} = this.props;
    const {reportno} = this.state;
    const user = JSON.parse(localStorage.getItem("userinfo"));
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
          this.init();
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
    const user = JSON.parse(localStorage.getItem("userinfo"));
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

  handleOk = () =>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const {preMainInfo} = this.state;
    const params = {
      consigoruser:user.userName,
      reportNo:preMainInfo.reportno,
    };
    dispatch({
      type: 'applicant/follow',
      payload: params,
      callback: response =>{
        if (response.code === 200) {
          notification.open({
            message: '关注成功',
          });
          this.setState({visible:false});
          this.componentDidMount();
        }else {
          notification.open({
            message: '关注失败',
          });
        }
      }
    });
  };


  handleCancel = () =>{
    this.setState({visible:false});
    this.setState({peopleVisible:false});
    this.setState({certVisible:false});
    this.setState({ratevisible:false});
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span = {6}>
            <Form.Item
              label='委托编号'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              colon={false}
            >
              {getFieldDecorator('reportno', {
                rules: [{  message: '输入委托编号' }],
              })(
                <Input placeholder="请输入委托编号" />
              )}
            </Form.Item>
          </Col>
          <Col span = {6}>
            <FormItem
              label='密码'
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              colon={false}
            >
              {getFieldDecorator('randomcode',{rules: [{ message: '请输入密码' }],})(<Input.Password placeholder="请输入密码" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={20}>
            <span >
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
    const { preMainInfo,visible,peopleVisible , man, certVisible, cert,ratevisible,reports} = this.state;
    const parentMethods = {
      handleCertOk:this.handleCertOk,
      handleCancel:this.handleCancel,
      handleOk:this.handleOk,
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
        </Card>
        <CertBackFrom {...parentMethods} certVisible={certVisible} cert={cert} />
        <PersonFrom {...parentMethods} peopleVisible={peopleVisible} loading={loading} man={man} columns1={this.columns1} />
        <RateFrom {...parentMethods} ratevisible={ratevisible} />
        <Modal
          title="加关注"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
        >
          <Descriptions size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{preMainInfo.reportno}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(preMainInfo.preMainInfodate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{preMainInfo.shipname}</Descriptions.Item>
            <Descriptions.Item label="申请人">{preMainInfo.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{preMainInfo.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{preMainInfo.payer}</Descriptions.Item>
            <Descriptions.Item label="检验费">{preMainInfo.price}</Descriptions.Item>
          </Descriptions>
        </Modal>
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



export default AddAttention;
