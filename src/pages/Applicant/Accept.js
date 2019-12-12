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
  Rate
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
    visible:false,

  };

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
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
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
          <a onClick={() => this.modifyItem(text, record)}>人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.uploadItem(text, record)}>查看证书</a>
          &nbsp;&nbsp;
          <a onClick={() => this.uploadItem(text, record)}>退回证书</a>
          &nbsp;&nbsp;
          <a onClick={() => this.rateItem(text, record)}>评价</a>
          &nbsp;&nbsp;
          <a onClick={() => this.uploadItem(text, record)}>复制</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      consigoruser:user.userName,
      source:'已受理'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
    });
  }

  rateItem = text =>{
    this.setState({visible:true});
  };

  uploadItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/EntrustmentRecord',
    });
  };
  
  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/DetailForAccept',
    });
  };

  modifyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/ModifyForEntrustment',
    });
  };

  copyItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/copyForEntrustment',
    });
  };

  handleFormReset = () => {

    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { form,dispatch } = this.props;
    form.resetFields();
    const params = {
      consigoruser:user.userName,
      source:'已受理'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
    });
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
        consigoruser:user.userName,
        source:'已受理'
      };
      dispatch({
        type: 'applicant/getReportByConfigor',
        payload: values,
      });
    });
  };

  handleCancel = () =>{
    this.setState({visible:false});
  };

  handleOk = () => {

  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={20}>
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
      applicant: {reports},
      loading,
      form:{getFieldDecorator}
    } = this.props;
    const { visible, } = this.state;
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
        <Modal
          title="文件上传"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout= 'horizontal' >
            <Form.Item 
              label="客户服务"
              labelCol={{span: 6}}
              wrapperCol={{span: 18}}
            >
              {getFieldDecorator('MultipartFile', {
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
              {getFieldDecorator('filename', {
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
              {getFieldDecorator('filename', {
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
              {getFieldDecorator('filename', {
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
              {getFieldDecorator('filename', {
                rules: [{required: true, message: '请选择评分'}],
              })(
                <Rate tooltips={['昂贵','较昂贵','适中','较低廉','低廉']}/>
              )}
            </FormItem>
          </Form>
        </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Accept;
