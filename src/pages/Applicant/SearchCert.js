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
      render: val => this.isValidDate(val)
},
{
  title: '签署人 ',
    dataIndex: 'signNameC',
},
{
  title: '状态',
    dataIndex: 'status',
},
{
  title: '操作',
    render: (text, record) => (
  <Fragment>
    {(text.status==="已签署"|| text.status==="已发布"|| text.status==="已作废"|| text.status==="申请作废")?[<a onClick={() => this.ViewItem(text, record)}>查看&nbsp;&nbsp;</a>]:[<div>查看&nbsp;&nbsp;</div>]}
    {(text.status==="已作废")?[<a onClick={() => this.viewAbandonItem(text, record)}>作废原因&nbsp;&nbsp;</a>]:[]}
  </Fragment>
),
},
];


componentDidMount() {
}

isValidDate =date=> {
  if(date !==undefined && date !==null ){
    return <span>{moment(date).format('YYYY-MM-DD')}</span>;
  }
  return [];
};

  viewAbandonItem =text =>{
    Modal.info({
      title: '作废原因',
      okText:"知道了",
      content: (
        <div>
          <p>{text.abandonreason}</p>
        </div>
      ),
      onOk() {},
    });
  };

  ViewItem = text =>{
    const { dispatch } = this.props;

    let path ;
    if (text.status === "已拟制") {
      path = text.pdfeditorpath;
    }else if(text.status === "已复核"){
      path = text.pdfpath;
    }else if(text.status === "已缮制"){
      path = text.titlepdfpath;
    }else if(text.status === "已签署" || text.status === "已发布"){
      path = text.certpdfpath;
    }else if (text.status === "已作废"){
      path = text.abandonpdfpath;
    }else if(path ===undefined && (text.filepath ===undefined || text.filepath ===null)){   // 此证书通过上传产生;
      path = text.certpdfpath;
    }

    dispatch({
      type: 'applicant/getPdfByOssPath',
      payload:{osspath:path},
      callback: (response) => {
        if(response.code === 200){
          window.open(response.data);
        }else {
          message.success("打开文件失败");
        }
      }
    });
  };

  previewItem = text => {
    const { dispatch } = this.props;
    const osspath = text.filepath
    if(osspath === undefined || osspath === null){
      return;
    }
    var extension = osspath.substring(osspath.lastIndexOf(".")+1);
    if(extension==="pdf"){
      dispatch({
        type: 'applicant/getOssPdf',
        payload:{
          osspath
        },
        callback:(response) =>{
          console.log(response);
          if(response.code === 400){
            notification.open({
              message: '打开失败',
              description:response.data,
            });
          }else{
            const url = response.data;
            this.setState({url:url});
            console.log(url);
            window.open(url);
          }
        }
      });
    }else{
      const picUrl = `https://www.smlq.vip/api/cert_report/getFileStream?osspath=${osspath}`;
      window.open(picUrl);
    }
    // this.setState({showVisible:true});
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
            Modal.error({
              title: '该证书查询错误，可能伪造！',
              okText:"关闭",
              onOk() {},
            });
            // notification.open({
            //   message: '查询错误',
            //   description: response.data,
            // });
          }
        }
      });
    });
  };

  handleOk = () =>{
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
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
              {getFieldDecorator('randomcode',{rules: [{ message: '请输入密码' }],})(<Input type="password" name="password" autoComplete="new-password" placeholder="请输入密码" />)}
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
