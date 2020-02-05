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
  notification
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
class SearchCert extends PureComponent {
  state = {
    certs:[],
    visible:false,
  };

  columns = [
    {
      title: '证书名称',
      dataIndex: 'name',
    },
    {
      title: '签署日期',
      dataIndex: 'signdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '签署人 ',
      dataIndex: 'signer',
    },
    {
      title: '状态',
      dataIndex: 'status',
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
  }

  previewItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getOssPdf',
      payload:{
        osspath:text.pdfpath
      },
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          // this.setState({url:url});
          window.open(url);
        }
      }
    });
    this.setState({showVisible:true});
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };



  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      dispatch({
        type: 'applicant/getCerFilesByRandomCode',
        payload: {
          ...fieldsValue,
        },
        callback: (response) =>{
          if (response.code === 200) {
            this.setState({visible:true});
            this.setState({certs:response.data});
            const { form } = this.props;
            form.resetFields();
          }else {
            notification.open({
              message: '查询错误',
              description: response.data,
            });
          }
        }
      });
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
    const {  certs,visible} = this.state;
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
              rowKey='name'
              dataSource={certs}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SearchCert;
