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
  Modal,
  Radio,
  Table,
  DatePicker,
  notification,
  Upload,
  Icon,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfo.less';
import moment from 'moment'

@Form.create()
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class CompanyInfo extends PureComponent {

	state = {
		company:{},
		parents:[],
	};
	componentDidMount() {
	    const {
	    	dispatch ,
	    	form
	    } = this.props;
	    const user = JSON.parse(localStorage.getItem("userinfo"));
	    dispatch({
			type: 'company/getCompany',
			payload:{
			 	certCode : user.certCode,
			},
			callback:(response)=>{
				if(response.code === 200){
					this.setState({company:response.data});
					form.setFieldsValue({
						'namee':response.data.namee,
						'adres':response.data.adres,
						'account':response.data.account,
						'bank' : response.data.bank,
						'belongto': response.data.belongto,
					});
				}
			}
    	});
    	dispatch({
			type: 'company/getParent',
			payload:{
			 	certCode : user.certCode,
			},
			callback:(response)=>{
				if(response.code === 200){
					this.setState({parents:response.data});
				}
			}
    	});
	};

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let company  = this.state.company;
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        company.namee = form.getFieldValue('namee');
	       	company.adres = form.getFieldValue('adres');
	        company.account = form.getFieldValue('account');
	        company.bank = form.getFieldValue('bank');
	        company.belongto = form.getFieldValue('belongto');
	        dispatch({
	          type: 'company/updateCompany',
	          payload: {
	          	...company,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              this.componentDidMount();
	            } else {
	              notification.open({
	                message: '添加失败',
	                description: response.data,
	              });
	            }
	          }
	        });
	      }
	    });
	};
 	render() {
 		const { getFieldDecorator } = this.props.form;
 		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    const { company ,parents} = this.state;
 		return(
 			<Card>
	 			<Form {...formItemLayout} >
	 				<Form.Item label="公司名称">
						<span className="ant-form-text">{user.companyName}</span>
			        </Form.Item>
			        <Form.Item label="姓名">
			          {getFieldDecorator('contactName', {
			            rules: [
			              {
			                required: true,
			                message: '请输入英文名',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			       	<Form.Item label="地址">
			          {getFieldDecorator('adres', {
			            rules: [
			              {
			                required: true,
			                message: '请输入英文名',
			              },
			            ],
			          })(<Input />)}
			        </Form.Item>
			        <Form.Item label="联系方式：">
			          {getFieldDecorator('isvisible', {
			            rules: [
			              {
			                required: true,
			                message: '请输入英文名',
			              },
			            ],
			          })(
			            <Radio.Group >
		                    <Radio value='可见'>可见</Radio>
		                    <Radio value='不可见'>不可见</Radio>
		                 </Radio.Group>    
			          )}
			        </Form.Item>
			        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" onClick={this.handleSubmit}>
					  	保存
						</Button>
			        </Form.Item>
			    </Form>
		    </Card>
 		);
 	}
}

export default CompanyInfo;
