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
  Table, message, Modal, DatePicker, Icon,
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
      title="CNAS三级分类修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="三级编码">
        {form.getFieldDecorator('checkCode', {
          initialValue: modalInfo.checkCode,
          rules: [
            {
              required: true,
              message: "请输入CNAS三级编码",
            },
          ],
        })(<Input placeholder="请输入CNAS三级编码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="三级分类">
        {form.getFieldDecorator('checkName', {
          initialValue: modalInfo.checkName,
          rules: [
            {
              required: true,
              message: "请输入CNAS三级分类",
            },
          ],
        })(<Input placeholder="请输入CNAS三级分类" />)}
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
      title="CNAS三级分类新增"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="三级编码">
        {form.getFieldDecorator('checkCode', {
          rules: [
            {
              required: true,
              message: "请输入CNAS三级编码",
            },
          ],
        })(<Input placeholder="请输入CNAS三级编码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="三级分类">
        {form.getFieldDecorator('checkName', {
          rules: [
            {
              required: true,
              message: "请输入CNAS三级分类",
            },
          ],
        })(<Input placeholder="请输入CNAS三级分类" />)}
      </FormItem>

    </Modal>
  );
});


@connect(({ cnas, loading }) => ({
  cnas,
  loading: loading.models.cnas,
}))
@Form.create()
class CNASThree extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
  };

  columns = [
    {
      title: 'CNAS三级编码',
      dataIndex: 'checkCode',
    },
    {
      title: 'CNAS三级分类',
      dataIndex: 'checkName',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
          &nbsp;&nbsp;
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.goCNASFour(text, record)}>编辑检查项目</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.init();
  }



  init =()=>{
    const { dispatch } = this.props;
    const code =  sessionStorage.getItem('cnasTwo_subDomainCode');
    dispatch({
      type: 'cnas/getCNASLevelThreeList',
      payload:{code},
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
        }
      }
    });
  }

  goCNASFour =(text)=>{
    sessionStorage.setItem('cnasThree_checkCode',text.checkCode);
    router.push({
      pathname:'CNASFour',
    });
  }

  // 返回
  back = () => {
    this.props.history.goBack();
  };




  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  }

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const code =  sessionStorage.getItem('cnasTwo_subDomainCode');
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        code,
      };
      dispatch({
        type: 'cnas/getCNASLevelThreeList',
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
      keyno:text.keyno,
    };
    dispatch({
      type: 'cnas/deleteCNASLevelThree',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("删除成功");
          this.init();
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
    prams.checkCode =  fields.checkCode;
    prams.checkName =  fields.checkName;
    const values = {
      ...prams,
    };
    dispatch({
      type: 'cnas/updateCNASLevelThree',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("修改成功");
          this.init();
        } else{
          message.success("修改失败");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  }

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const code =  sessionStorage.getItem('cnasTwo_subDomainCode');
    const values = {
      ...fields,
      subDomainCode:code,
    };
    dispatch({
      type: 'cnas/addCNASLevelThree',
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
                initialValue:"checkName",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型" >
                  <Option value="checkName">分类名称</Option>
                  <Option value="checkCode">分类编码</Option>

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
              <Button style={{ marginLeft: 8  ,paddingLeft:0}} type="primary" onClick={this.back}><Icon type="left" />返回</Button>
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
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="sort1"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CNASThree;
