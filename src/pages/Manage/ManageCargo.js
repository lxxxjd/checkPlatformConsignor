import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale/index';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker, notification,AutoComplete
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo,cargonamesOptions,cargoSearch } = props;
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
      title="货物名称修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="货物名称">
        {form.getFieldDecorator('cargoname', {
          initialValue: modalInfo.cargoname,
          rules: [
            {
              required: true,
              message: "请输入货物名称",
            },
          ],
        })(
          <AutoComplete
            className="global-search"
            dataSource={cargonamesOptions}
            placeholder="请输入货物名称"
            onSearch={cargoSearch}
          >
            <Input style={{width:'100%'}} />
          </AutoComplete>
          )}
      </FormItem>


    </Modal>
  );
});


const AddForm = Form.create()(props => {
  const { addModalVisible, form, handleAdd, addHandleModalVisible ,cargonamesOptions,cargoSearch} = props;
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
      title="货物名称新增"
      style={{ top: 100 }}
      visible={addModalVisible}
      onOk={okHandle}
      onCancel={() => addHandleModalVisible()}
    >

      <FormItem style={{width:'100%'}} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="货物名称">
        {form.getFieldDecorator('cargoname', {
          rules: [
            {
              required: true,
              message: "请输入货物名称",
            },
          ],
        })(
          <AutoComplete
            className="global-search"
            dataSource={cargonamesOptions}
            placeholder="请输入货物名称"
            onSearch={cargoSearch}
          >
            <Input />
          </AutoComplete>
        )}
      </FormItem>

    </Modal>
  );
});


@connect(({ manage, loading }) => ({
  manage,
  loading: loading.models.manage,
}))
@Form.create()
class ManageCargo extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalInfo :{},
    dataSource:[],
    cargonames:[],
  };

  columns = [
    {
      title: '货物名称',
      dataIndex: 'cargoname',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改</a>
          &nbsp;&nbsp;
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
   this.init();

   // 货物默认的数据
    const {dispatch} = this.props;
    dispatch({
      type: 'manage/searchCargos',
      callback: (response) => {
        this.setState({cargonames: response});
      }
    });
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const { dispatch } = this.props;
    const params = {
      consigoruser : user.userName,
    };
    dispatch({
      type: 'manage/getConfigorCargoList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response;
        }
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        consigoruser : user.userName,
      };
      dispatch({
        type: 'manage/getConfigorCargoList',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response;
          }
        }
      });
    });
  };

  cargoSearch = value => {
    const {dispatch} = this.props;
    const param = new FormData();
    param.append("value",value);
    dispatch({
      type: 'manage/searchCargos',
      payload:param,
      callback: (response) => {
        this.setState({cargonames: response});
      }
    });
  };


  modifyItem = text => {
    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };

  deleteItem = text =>{
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'manage/deleteConfigorCargo',
      payload: {
        keyno:text.keyno
      },
      callback: (response) => {
        if (response.code === 400) {
          message.error("删除失败");
        } else {
          message.success("删除成功");
          this.init();
        }
      }
    });
  };


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

    if( modalInfo.cargoname === fields.cargoname){
      message.success("保存成功");
      this.setState({
        modalVisible: false,
      });
      return;
    }

    if( this.state.dataSource.find(item=>item.cargoname === fields.cargoname)){
      message.info("添加货物名称已存在");
      this.setState({
        modalVisible: false,
      });
      return;
    }

    const { dispatch } = this.props;
    let prams = modalInfo;
    prams.cargoname =  fields.cargoname;
    const values = {
      ...prams,
    };
    dispatch({
      type: 'manage/updateConfigorCargo',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else {
          message.error("保存失败");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  };

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("consignor_userinfo"));
    const values = {
      ...fields,
      consigoruser : user.userName,
    };

    this.setState({
      addModalVisible: false,
    });
    if( this.state.dataSource.find(item=>item.cargoname === fields.cargoname)){
      message.info("添加货物名称已存在");
      return;
    }
    dispatch({
      type: 'manage/addConfigorCargo',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else{
          message.error("保存失败");
        }
      }
    });


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
                initialValue:"cargoname",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="cargoname">货物名称</Option>
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

    const {  modalVisible,modalInfo,addModalVisible,dataSource,cargonames} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleAdd:this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      addHandleModalVisible:this.addHandleModalVisible,
      cargoSearch:this.cargoSearch,
    };
    const cargonamesOptions = cargonames.map(d => <Option key={d.cargonamec} value={d.cargonamec}>{d.cargonamec}</Option>);

    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} cargonamesOptions={cargonamesOptions} />
            <AddForm {...parentMethods} addModalVisible={addModalVisible} dispatch={dispatch} cargonamesOptions={cargonamesOptions} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="itemno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ManageCargo;
