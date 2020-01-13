import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Table,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import styles from './style.less';

const {Option} = Select;

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
@connect(({applicant, loading}) => ({
  applicant,
  loading: loading.models.applicant,
}))
class ModifyRecord extends PureComponent {
  state = {
    visible: false,
    downloadVisible: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    modelName: [],
    url: null,
    showVisible: false,
  };

  columns = [
    {
      title: '文件名称',
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
      title: '上传人',
      dataIndex: 'creator',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const {dispatch} = this.props;
    const prereportno = sessionStorage.getItem('prereportno');
    dispatch({
      type: 'applicant/getPreRecord',
      payload: {
        prereportno,
      }
    });
  }

  previewItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getOssPdf',
      payload:{
        osspath:text.filepath
      },
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          this.setState({url:url});
          //window.open(url);
        }
      }
    });
    this.setState({showVisible:true});
  };

  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'applicant/deletePreRecord',
      payload: {
        id:text.id
      },
      callback: (response) => {
        if (response.code === 400) {
          notification.open({
            message: '删除失败',
            description: response.data,
          });
        } else {
          this.componentDidMount();
        }
      }
    });
  };

  handleOk = () => {
    const {
      form: {validateFieldsAndScroll},
      dispatch,
    } = this.props;
    const prereportno = sessionStorage.getItem('prereportno');
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        let formData = new FormData();
        const user = JSON.parse(localStorage.getItem("userinfo"));
        values.MultipartFile.fileList.forEach(file => {
          formData.append('files', file.originFileObj);
        });
        formData.append('prereportno', prereportno);
        formData.append('creator', user.userName);
        dispatch({
          type: 'applicant/upload',
          payload: formData,
          callback: (response) => {
            if (response.code === 400) {
              notification.open({
                message: '添加失败',
                description: response.message,
              });
            } else {
              this.componentDidMount();
            }
          }
        });
        this.setState({visible: false});
        form.resetFields();
      }
      console.log(error);
    });
  };

  show = () => {
    const {
      form,
      dispatch,
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    form.resetFields();
    this.setState({fileList: []});
    this.setState({visible: true});
  };

  handleCancel = () => {
    const {
      form
    } = this.props;
    form.resetFields();
    this.setState({visible: false});
  };


  onChange = e => {
    if (e.target.value === "按单价" || e.target.value === "按比例") {
      this.setState({showPrice: true});
    } else {
      this.setState({showPrice: false});
    }
  };

  Cancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
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

  handleBeforeUpload = file => {
    return false;
  };

  back = () => {
    this.props.history.goBack();
  };
  showCancel = () => {
    this.setState({showVisible: false});
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      applicant: {preRecordData},
      loading,
      form: {getFieldDecorator},
    } = this.props;
    // state 方法
    const {fileList, visible, previewVisible, previewImage, downloadVisible, modelName, url, showVisible} = this.state
    const typeOptions = modelName.map(d => <Option key={d} value={d}>{d}</Option>);


    const shipname = sessionStorage.getItem('shipname');
    const reprotText = {
      shipname,
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <Modal
          title="文件上传"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="文件上传">
              {getFieldDecorator('MultipartFile', {
                rules: [{required: true, message: '请选择上传文件'}],
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
                rules: [{required: true, message: '请输入文件名称'}],
              })(
                <Input style={{width: '100%'}} placeholder="请输入文件名称"/>
              )}
            </Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={this.Cancel}>
              <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              <Button style={{marginBottom: 12}} type="primary" onClick={this.show}>上传文件</Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{marginLeft: 8, paddingLeft: 0, paddingRight: 15}} onClick={this.back}>
                <Icon type="left"/>返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={preRecordData}
              columns={this.columns}
              rowKey="id"
              pagination={{showQuickJumper: true, showSizeChanger: true}}
            />
          </div>
        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
          style={{top: 10}}
        >
          <embed src={url} width="700" height="700"/>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

/*         <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.showDownloadVisible}>下载模板</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>批量上传</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>工作目录</Button>*/
export default ModifyRecord;
