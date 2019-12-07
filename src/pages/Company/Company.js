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
      title="修改公司"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司名称">
        {form.getFieldDecorator('namec', {
          initialValue: modalInfo.namec,
          rules: [
            {
              required: true,
              message: "请输入公司名称",
            },
          ],
        })(<Input placeholder="请输入公司名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="英文名">
        {form.getFieldDecorator('namee', {
          initialValue: modalInfo.namee,
          rules: [
            {
              message: "请输入公司英文名",
            },
          ],
        })(<Input placeholder="请输入公司英文名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
        {form.getFieldDecorator('adres', {
          initialValue: modalInfo.adres,
          rules: [
            {
              message: "请输入公司地址",
            },
          ],
        })(<Input placeholder="请输入公司地址" />)}
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

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司电话">
        {form.getFieldDecorator('tel', {
          initialValue: modalInfo.tel,
          rules: [
            {
              message: "请输入公司电话",
            },
          ],
        })(<Input placeholder="请输入公司电话" />)}
      </FormItem>


      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开户行">
        {form.getFieldDecorator('bank', {
          initialValue: modalInfo.bank,
          rules: [
            {
              message: "请输入开户行",
            },
          ],
        })(<Input placeholder="请输入开户行" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="母公司">
        {form.getFieldDecorator('belongto', {
          initialValue: modalInfo.belongto,
          rules: [
            {
              message: "请输入母公司编号",
            },
          ],
        })(<Input placeholder="请输入母公司编号" />)}
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
      title="新增公司信息"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司名称">
        {form.getFieldDecorator('namec', {
          rules: [
            {
              required: true,
              message: "请输入公司名称",
            },
          ],
        })(<Input placeholder="请输入公司名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="英文名">
        {form.getFieldDecorator('namee', {
          rules: [
            {
              message: "请输入公司英文名",
            },
          ],
        })(<Input placeholder="请输入公司英文名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
        {form.getFieldDecorator('adres', {
          rules: [
            {
              message: "请输入公司地址",
            },
          ],
        })(<Input placeholder="请输入公司地址" />)}
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

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="公司电话">
        {form.getFieldDecorator('tel', {
          rules: [
            {
              message: "请输入公司电话",
            },
          ],
        })(<Input placeholder="请输入公司电话" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="开户行">
        {form.getFieldDecorator('bank', {
          rules: [
            {
              message: "请输入开户行",
            },
          ],
        })(<Input placeholder="请输入开户行" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="母公司">
        {form.getFieldDecorator('belongto', {
          rules: [
            {
              message: "请输入母公司编号",
            },
          ],
        })(<Input placeholder="请输入母公司编号" />)}
      </FormItem>



    </Modal>
  );
});


@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
@Form.create()
class Company extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
  };


  columns = [

    {
      title: '公司名称',
      dataIndex: 'namec',
    },
    {
      title: '地址',
      dataIndex: 'adres',
    },
    {
      title: '电话',
      dataIndex: 'tel',
    },

    {
      title: '开户行',
      dataIndex: 'bank',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.setCNAS(text, record)}>编辑CNAS检查项目</a>
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

  setCNAS =(text) =>{
    sessionStorage.setItem('goCNASCheckFourCertCodeListInfo_CertCode',text.certcode);
    router.push({
      pathname:'CNASCheckFourCertCode',
    });
  };


  init =()=>{
    const { dispatch } = this.props;
    const params = {
    };
    dispatch({
      type: 'company/getCompanyList',
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
        type: 'company/getCompanyList',
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




  deleteItem = text =>{
    const { dispatch } = this.props;
    const values = {
      ...text
    };
    dispatch({
      type: 'company/deleteCompany',
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
    prams.namec =  fields.namec;
    prams.adres =  fields.adres;
    prams.tel =  fields.tel;
    prams.certcode =  fields.certcode;
    prams.bank =  fields.bank;
    prams.belongto =  fields.belongto;
    prams.namee =  fields.namee;
    const values = {
      ...prams
    };
    dispatch({
      type: 'company/updateCompany',
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
      type: 'company/addCompany',
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
                initialValue:"namec",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="namec">公司名称</Option>
                  <Option value="adres">地址</Option>
                  <Option value="tel">电话</Option>
                  <Option value="certcode">公司编码</Option>
                  <Option value="bank">开户行</Option>
                  <Option value="belongto">母公司编号</Option>
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

export default Company;
