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
  notification,
  Modal
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './SearchForEntrustment.less';
import moment from 'moment';




const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ applicant, loading }) => ({
  applicant,
  loading: loading.models.applicant,
}))

@Form.create()
class UnAccept extends PureComponent {
  state = {
    visible:false,
    prereportno:null,
    kindValue:"p.certcode",
    company:[],
  };

  columns = [
    {
      title: '检验日期',
      dataIndex: 'inspdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '检验机构',
      dataIndex: 'namec',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'chineselocalname',
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {text.overallstate === '未受理' ? [<a onClick={() => this.modifyItem(text, record)}>修改&nbsp;&nbsp;</a>]:[]}
          {text.overallstate === '未受理' ? [<a onClick={() => this.deleteItem(text, record)}>撤回&nbsp;&nbsp;</a>]:[]}
          {text.overallstate === '未受理' ? [<a onClick={() => this.uploadItem(text, record)}>附件编辑&nbsp;&nbsp;</a>]:[]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      consigoruser:user.userName
    };
    dispatch({
      type: 'applicant/getPremaininfoList',
      payload: params,
    });
    dispatch({
      type: 'applicant/getCompanyList',
      payload: {
        // certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({company : response.data})
      }
    });
  }

  deleteItem = text => {
    this.setState({visible:true});
    this.setState({prereportno:text.prereportno});
  };

  uploadItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    sessionStorage.setItem('applicant',text.applicant);
    router.push({
      pathname:'/Applicant/ModifyRecord',
    });
  };

  previewItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    router.push({
      pathname:'/Applicant/DetailForUnAccept',
    });
  };

  modifyItem = text => {
    sessionStorage.setItem('prereportno',text.prereportno);
    router.push({
      pathname:'/Applicant/ModifyApplication',
    });
  };


  handleFormReset = () => {

    const user = JSON.parse(localStorage.getItem("userinfo"));
    const params = {
      consigoruser:user.userName
    };
    const { form } = this.props;
    form.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/getPremaininfoList',
      payload: params,
    });
    this.setState({kindValue:"p.certcode"});
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
        consigoruser:user.userName,
      };
      dispatch({
        type: 'applicant/getPremaininfoList',
        payload: values,
      });
    });
  };

  handleCancel= () =>{
    this.setState({visible:false});
  };

  handleOk = () =>{
    const {prereportno} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'applicant/deletePremaininfo',
      payload: {
        prereportno,
      },
      callback : response =>{
        if (response.code === 200) {
          notification.open({
            message: '删除成功',
          });
          this.componentDidMount();
        }else {
          notification.open({
            message: '删除失败',
            description: response.data,
          });
        }
      }
    });
    this.setState({visible:false});
    this.setState({prereportno:null});
  };

  onChangeKind =(value) =>{
    this.setState({kindValue:value});
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {kindValue,company} = this.state;
    const companyOptions = company.map(d =><Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);
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
                initialValue:"p.certcode",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型" onChange={this.onChangeKind}>
                  <Option value="p.certcode">检验机构</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="chineselocalname">货名</Option>
                  <Option value="overallstate">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={20}>
            {kindValue === "p.certcode" ?
              [
                <FormItem>
                  {getFieldDecorator('value', { rules: [{ message: '搜索数据' }], })(
                    <Select placeholder="请选择检验机构">
                      {companyOptions}
                    </Select>
                    )}
                </FormItem>
              ] : [
                <FormItem>
                  {getFieldDecorator('value', { rules: [{ message: '搜索数据' }], })(
                    <Input placeholder="请输入" />)}
                </FormItem>
              ]
            }
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
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
      applicant: {preMainInfoList},
      loading,
    } = this.props;
    const {visible} = this.state;
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
              rowKey='prereportno'
              dataSource={preMainInfoList}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
          <Modal
            title="确认撤回"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UnAccept;
