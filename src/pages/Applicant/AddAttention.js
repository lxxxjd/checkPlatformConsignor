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
  Descriptions,
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>取消关注</a>
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
      source:'已关注'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
    });
  }

  uploadItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Entrustment/EntrustmentRecord',
    });
  };
  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    localStorage.setItem('reportDetailNo',text.reportno);
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
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
    const params = {
      certCode:user.certCode
    };
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'entrustment/fetch',
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
        kind :fieldsValue.kind,
        value: fieldsValue.value,
        certCode:user.certCode,
      };
      dispatch({
        type: 'entrustment/fetch',
        payload: values,
      });
    });
  };

  handleOk = e =>{

  };

  handleCancel = ()=>{
    this.setState({visible:false});
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
                rules: [{  message: '搜索类型' }],
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
              {getFieldDecorator('password',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入密码" />)}
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
      applicant: {reports},
      loading,
    } = this.props;
    const { selectedRows, preMainInfo,visible} = this.state;
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
        <Modal
          title="加关注"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Descriptions size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{preMainInfo.preMainInfono}</Descriptions.Item>
            <Descriptions.Item label="查询密码">{preMainInfo.randomcode}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(preMainInfo.preMainInfodate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="申请人">{preMainInfo.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{preMainInfo.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{preMainInfo.payer}</Descriptions.Item>
            <Descriptions.Item label="检验费">{preMainInfo.price}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{preMainInfo.shipname}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default AddAttention;
