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
  Modal,
  Table,
  notification,
  Upload,
  message,
  Icon,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './style.less';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({ applicant, loading }) => ({
  applicant,
  loading: loading.models.applicant,
}))
class CertificateDetail extends PureComponent {
  state = {
    visible: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  columns = [
    {
      title: '证稿名',
      dataIndex: 'name',
      render: val => {
        // 取文件名
        const pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        }
          return <span>{val}</span>;

      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }
      </span>
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.ViewItem(text, record)}>查看&nbsp;&nbsp;</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'applicant/getCertFiles',
      payload:{
         reportno,
      },
    });
  }


  ViewItem = text =>{
    const { dispatch } = this.props;

    let path ;
    if (text.status === "已作废") {
      path = text.abandonpdfpath;
    }else{
      path = text.certpdfpath;
    }
    dispatch({
      type: 'applicant/getPdfByOssPath',
      payload:{osspath:path},
      callback: (response) => {
        if(response.code === 200){
          window.open(response.data);
          const user = JSON.parse(localStorage.getItem("userinfo"));
          const params ={
              reader:user.userName,
              organization:'委托人',
              company:user.companyName,
              // tel:user.isvisible==='可见'?user.contactPhone:null,
              tel:user.contactPhone,
              realname:user.contactName,
              reportno:text.reportno,
          };
          dispatch({
            type: 'applicant/addReadRecord',
            payload:params,
            callback: (response2) => {
              if(response2==="success"){
                message.success("已阅成功！")
              }else {
                message.success("已阅失败");
              }
            }
          });

        }else {
          message.success("打开文件失败");
        }
      }
    });
  };


  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    const params = {
      keyno:text.keyno
    };
    const reportno = sessionStorage.getItem('reportno');
    dispatch({
      type: 'applicant/deleteCertFile',
      payload:params,
      callback: (response) => {
        if(response.code === 400){
          notification.open({
            message: '删除失败',
            description:response.data,
          });
        }else{
          dispatch({
            type: 'applicant/getCertFiles',
            payload:{
              reportno,
            }
          });
        }
      }
    });
  };



  back = () =>{
    this.props.history.goBack();
  };


  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      applicant:{recordData},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    // state 方法

    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const applicant = sessionStorage.getItem('applicant');
    const reprotText= {
      reportno,
      shipname,
      applicant,
    };


    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8  ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={recordData}
              columns={this.columns}
              rowKey="name"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CertificateDetail;
