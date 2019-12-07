import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEdit(fieldsValue,modalInfo);
    });
  };


  return (
    <Modal
      destroyOnClose
      title="修改公司审核"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司名称">
        {form.getFieldDecorator('company', {
          initialValue: modalInfo.company,
          rules: [
            {
              required: true,
              message: "请输入公司名称",
            },
          ],
        })(<Input placeholder="请输入公司名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('username', {
          initialValue: modalInfo.username,
          rules: [
            {
              required: true,
              message: "请输入管理员用户名",
            },
          ],
        })(<Input placeholder="请输入管理员用户名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          initialValue: modalInfo.password,
          rules: [
            {
              required: true,
              message: "请输入管理员密码",
            },
          ],
        })(<Input placeholder="请输入管理员密码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司编号">
        {form.getFieldDecorator('certcode', {
          initialValue: modalInfo.certcode,
          rules: [
            {
              required: true,
              message: "请输入公司编号CertCode",
            },
          ],
        })(<Input placeholder="请输入公司编号CertCode" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系人">
        {form.getFieldDecorator('contact', {
          initialValue: modalInfo.contact,
          rules: [
            {
              required: true,
              message: "请输入联系人",
            },
          ],
        })(<Input placeholder="请输入联系人" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电话">
        {form.getFieldDecorator('tel', {
          initialValue: modalInfo.tel,
          rules: [
            {
              required: true,
              message: "请输入电话",
            },
          ],
        })(<Input placeholder="请输入电话" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('message', {
          initialValue: modalInfo.message,
          rules: [
            {
              message: "请输入备注信息",
            },
          ],
        })(<Input placeholder="请输入备注信息" />)}
      </FormItem>

    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新增公司审核信息"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司名称">
        {form.getFieldDecorator('company', {
          rules: [
            {
              required: true,
              message: "请输入公司名称",
            },
          ],
        })(<Input placeholder="请输入公司名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: "请输入管理员用户名",
            },
          ],
        })(<Input placeholder="请输入管理员用户名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: "请输入管理员密码",
            },
          ],
        })(<Input placeholder="请输入管理员密码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司编号">
        {form.getFieldDecorator('certcode', {
          rules: [
            {
              required: true,
              message: "请输入公司编号CertCode",
            },
          ],
        })(<Input placeholder="请输入公司编号CertCode" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系人">
        {form.getFieldDecorator('contact', {
          rules: [
            {
              required: true,
              message: "请输入联系人",
            },
          ],
        })(<Input placeholder="请输入联系人" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电话">
        {form.getFieldDecorator('tel', {
          rules: [
            {
              required: true,
              message: "请输入电话",
            },
          ],
        })(<Input placeholder="请输入电话" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('message', {
          rules: [
            {
              message: "请输入备注信息",
            },
          ],
        })(<Input placeholder="请输入备注信息" />)}
      </FormItem>

    </Modal>
  );
});


@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
@Form.create()
class PreCompany extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
  };


  columns = [
    {
      title: '公司名称',
      dataIndex: 'company',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '公司编号',
      dataIndex: 'certcode',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
    },
    {
      title: '电话',
      dataIndex: 'tel',
    },
    {
      title: '备注',
      dataIndex: 'message',
    },

    {
      title: '状态',
      dataIndex: 'status',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.pass(text, record)}>审核通过</a>
          &nbsp;&nbsp;
          <a onClick={() => this.nopass(text, record)}>审核退回</a>
          &nbsp;&nbsp;
          {text.status==="通过"?[<a onClick={() => this.createAccount(text, record)}>创建账号&nbsp;&nbsp;</a>]:[]}
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }



  init =()=>{
    const { dispatch } = this.props;
    const params = {
    };
    dispatch({
      type: 'company/getPreCompanyList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
        }
      }
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  }

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
      };
      dispatch({
        type: 'company/getPreCompanyList',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.data;
          }
        }
      });
    });
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  }

  modifyItem = text => {
    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };

  pass = (text) =>{
    this.review(text,"通过","操作成功","操作不成功")
  }

  nopass = (text) =>{
    this.review(text,"不通过","操作成功","操作不成功")
  }

  createAccount =(text) =>{
    const { dispatch } = this.props;
    const values = {
      ...text
    };
    dispatch({
      type: 'company/createAccount',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("创建成功");
          this.init();
        } else {
          message.success("创建失败");
        }
      }
    });
  }

  review = (text,status,successMessage,errorMessage) =>{
    const { dispatch } = this.props;
    let prams = text;
    prams.status =  status;
    const values = {
      ...prams
    };
    dispatch({
      type: 'company/updatePreCompany',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success(successMessage);
          this.init();
        } else {
          message.success(errorMessage);
        }
      }
    });
  }


  deleteItem = text =>{
    const { dispatch } = this.props;
    const values = {
      ...text
    };
    dispatch({
      type: 'company/deletePreCompany',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("删除成功");
        } else{
          message.success("删除失败");
        }
      }
    });
  }


  addItem = () => {
    this.addHandleModalVisible(true);
  };




  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  addHandleModalVisible = (flag) => {
    this.setState({
      addModalVisible: !!flag,
    });
  };

  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    let prams = modalInfo;
    prams.company =  fields.company;
    prams.username =  fields.username;
    prams.password =  fields.password;
    prams.certcode =  fields.certcode;
    prams.tel =  fields.tel;
    prams.contact =  fields.contact;
    prams.message =  fields.message;
    prams.status =  "未审核";
    const values = {
      ...prams
    };
    dispatch({
      type: 'company/updatePreCompany',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else {
          message.success("保存失败");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  }

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const values = {
      ...fields,
    };
    dispatch({
      type: 'company/addPreCompany',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else{
          message.success("保存失败");
        }
      }
    });
    this.setState({
      addModalVisible: false,
    });

  }




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
                initialValue:"company",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="company">公司名称</Option>
                  <Option value="username">用户名</Option>
                  <Option value="password">密码</Option>
                  <Option value="certcode">公司编号</Option>
                  <Option value="tel">电话</Option>
                  <Option value="contact">联系人</Option>
                  <Option value="message">备注</Option>
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.addItem}>
                新增
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
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo,addModalVisible,dataSource} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="middle">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PreCompany;
