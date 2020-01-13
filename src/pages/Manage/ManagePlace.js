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

/* eslint react/no-multi-comp:0 */
@Form.create()
@connect(({manage, loading}) => ({
  manage,
  loading: loading.models.manage,
}))
class ManagePlace extends PureComponent {
  state = {
    visible: false,
  };

  columns = [
    {
      title: '地址',
      dataIndex: 'placename',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const {dispatch} = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'manage/getConfigorPlaceList',
      payload: {
        consigoruser : user.username,
      }
    });
  }

  deleteItem = text => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'manage/deleteConfigorPlace',
      payload: {
        keyno:text.keyno
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
    const user = JSON.parse(localStorage.getItem("userinfo"));
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        dispatch({
          type: 'manage/addConfigorPlace',
          payload: {
            ...values,
            consigoruser : user.username,
          },
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
      manage: {placeList},
      loading,
      form: {getFieldDecorator},
    } = this.props;
    // state 方法
    const {visible} = this.state
    return (
      <PageHeaderWrapper title='地址管理'>
        <Modal
          title="新建地址"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="文件名称">
              {getFieldDecorator('placename', {
                rules: [{required: true, message: '请输入地址'}],
              })(
                <Input style={{width: '100%'}} placeholder="请输入地址"/>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Card bordered={false} size="small">
          <Row>
            <Col span={22}>
              <Button style={{marginBottom: 12}} type="primary" onClick={this.show}>新建地址</Button>
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
              dataSource={placeList}
              columns={this.columns}
              rowKey="id"
              pagination={{showQuickJumper: true, showSizeChanger: true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

/*         <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.showDownloadVisible}>下载模板</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>批量上传</Button>
          <Button style={{ marginBottom: 12, marginLeft:12 }} type="primary" onClick={this.show}>工作目录</Button>*/
export default ManagePlace;
