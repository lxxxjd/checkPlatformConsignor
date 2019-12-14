import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

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
  message,Popover
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfo.less';
import moment from 'moment'

@Form.create()
@connect(({ manage, loading }) => ({
  manage,
  loading: loading.models.manage,
}))
class CompanyInfo extends PureComponent {

	state = {
		user:{},
		parents:[],
		help:'',
		visible: false,
	};
	componentDidMount() {
	    const {
	    	dispatch ,
	    	form
	    } = this.props;
	    const user = JSON.parse(localStorage.getItem("userinfo"));
	    this.setState({user});
	    form.setFieldsValue({
			'companyName':user.companyName,
			'contactName':user.contactName,
			'isvisible':user.isvisible,
			'contactPhone':user.contactPhone,
		});
	};

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user = JSON.parse(localStorage.getItem("userinfo"));
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        user.companyName = form.getFieldValue('companyName');
	       	user.contactName = form.getFieldValue('contactName');
	        user.contactPhone = form.getFieldValue('contactPhone');
	        user.isvisible = form.getFieldValue('isvisible');
	        console.log('aa');
	        dispatch({
	          type: 'manage/updateContact',
	          payload: {
	          	...user,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              localStorage.setItem('userinfo',JSON.stringify(user));
	              this.componentDidMount();
	            } else {
	              notification.open({
	                message: '修改失败',
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
 		const FormItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    const { user ,help,visible} = this.state;
 		return(
 			<Card>
	 			<Form {...FormItemLayout} >
	 				<Form.Item label="用户名">
						<span className="ant-form-text">{user.username}</span>
			        </Form.Item>
			        <Form.Item label='公司名：'>
		                {getFieldDecorator('companyName', {
		                  rules: [
		                    {
		                      required: true,
		                      message: formatMessage({ id: 'validation.company.required' }),
		                    },
		                  ],
		                })(
		                  <Input size="large" placeholder={formatMessage({ id: 'form.company.placeholder' })} />
		                )}
			          </Form.Item>
			          <Form.Item label='姓名：'>
			                {getFieldDecorator('contactName', {
			                  rules: [
			                    {
			                      required: true,
			                      message: formatMessage({ id: 'validation.contact.required' }),
			                    },
			                  ],
			                })(
			                  <Input size="large" placeholder={formatMessage({ id: 'form.contact.placeholder' })} />
			                )}
			          </Form.Item>
			          <Form.Item label='手机号码：'>

		                  {getFieldDecorator('contactPhone', {
		                    rules: [
		                      {
		                        required: true,
		                        message: formatMessage({ id: 'validation.phone-number.required' }),
		                      },
		                      {
		                        pattern: /^\d{11}$/,
		                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
		                      },
		                      {
		                        validator: this.getRepeatTel,
		                      },
		                    ],
		                  })(
		                    <Input
		                      size="large"
		                      style={{ width: '75%' }}
		                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
		                    />
		                  )}
			          </Form.Item>
			          <Form.Item label='联系方式:'>
			                {getFieldDecorator('isvisible', {
			                  rules: [
			                    {
			                      required: true,
			                      message: '请选择是否可见',
			                    },
			                  ],
			                })(
			                  <Radio.Group >
			                    <Radio value='可见'>可见</Radio>
			                    <Radio value='不可见'>不可见</Radio>
			                  </Radio.Group>                )}
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
