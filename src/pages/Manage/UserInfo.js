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
  message, Popover, Progress, AutoComplete,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfo.less';
import moment from 'moment'

const {Option} = Select;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@Form.create()
@connect(({ manage,register, loading }) => ({
  manage,
  register,
  loading: loading.models.manage,
}))
class UserInfo extends PureComponent {

	state = {
		count: 0,
		user:{},
		parents:[],
		help:'',
		visible: false,
		passwordVisible:false,
		phoneVisible:false,
    companys:[]
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

	modifyPassword = () =>{
		const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user = JSON.parse(localStorage.getItem("userinfo"));
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        user.password = form.getFieldValue('password');
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
	              this.setState({passwordVisible:false});
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

	modifyPhone = () =>{
		const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user = JSON.parse(localStorage.getItem("userinfo"));
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        user.contactPhone = form.getFieldValue('contactPhone');
	        dispatch({
	          type: 'register/verifyTel',
	          payload:{
	          	tel:values.contactPhone,
	          	verifyCode:values.captcha,
	          },
	          callback: (response) => {
	          	if(response === "success"){
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
			              this.setState({phoneVisible:false});
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
	          	}else{
	          		message.error("验证码错误");
	          	}
	          }
	      	});
	      }
	    });
	};

	checkPassword = (rule, value, callback) => {
		if(this.state.passwordVisible === false){
			callback();
		}
		const {
			visible,
			confirmDirty
		} = this.state;
		if (!value) {
			this.setState({
				help: '请输入密码',
				visible: !!value,
			});
			callback('error');
		} else {
			this.setState({
				help: '',
			});
			if (!visible) {
				this.setState({
					visible: !!value,
				});
			}
			if (value.length < 6) {
				callback('error');
			} else {
				const {
					form
				} = this.props;
				if (value && confirmDirty) {
					form.validateFields(['confirm'], {
						force: true
					});
				}
				callback();
			}
		}
	};
	checkConfirm = (rule, value, callback) => {
		const {
			form
		} = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('密码不一致');
		} else {
			callback();
		}
	};

	showPassword= () => {
		this.setState({passwordVisible:true});
	};

	handleCancel= () =>{
		this.setState({passwordVisible:false});
		this.setState({phoneVisible:false});
	};

	getPasswordStatus = () => {
		const {
			form
		} = this.props;
		const value = form.getFieldValue('password');
		if (value && value.length > 9) {
			return 'ok';
		}
		if (value && value.length > 5) {
			return 'pass';
		}
		return 'poor';
	};

	onGetCaptcha = () => {
	    let count = 59;
	    this.setState({
	        count
	    });
	    this.interval = setInterval(() => {
	        count -= 1;
	        this.setState({
	            count
	        });
	        if (count === 0) {
	            clearInterval(this.interval);
	        }
	    }, 1000);
	    const {form, dispatch} = this.props;
	    const tel = form.getFieldValue("contactPhone");
	    // 判断电话是否未空
	    if (tel === undefined) {
	        message.success("电话号码不能为空");
	    } else {
	        // 存在电话号码
	        dispatch({
	            type: 'register/sendVerify',
	            payload: {
	                tel
	            },
	            callback: (response) => {
	                if (response) {
	                    // 请求服务成功
	                    if (response === "success") {
	                        message.success("发送成功");
	                    } else {
	                        // 失败
	                        Modal.info({
	                            title: formatMessage({
	                                id: 'app.login.verification-code-warning.noExist'
	                            }),
	                        });
	                    }
	                }
	            }
	        });
	    }
	};


	getRepeatTel = (rule, value, callback) => {
	    const {dispatch} = this.props;
	    dispatch({
	        type: 'register/getRepeatTel',
	        payload: {
	            tel: value
	        },
	        callback: (response) => {
	            if (response === undefined || response === "null" ) {
	                callback("号码已注册");
	            } else if (response === "号码已注册") {
	                callback("号码已注册");
	            } else {
	                callback();
	            }
	        }
	    });
	};

	showModifyPhone = () =>{
		this.setState({phoneVisible:true});
	};

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };


  handleCompanySearch = value => {
    const {dispatch} = this.props;
    dispatch({
      type: 'manage/getBusiness',
      payload: {
        name: value
      },
      callback: (response) => {
        this.setState({companys: response})
      }
    });
  };


  render() {
 		const { getFieldDecorator } = this.props.form;
 		const FormItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
 		const { user ,help,visible, passwordVisible,phoneVisible, count,companys} = this.state;
    const companyOptions = companys.map(d => <Option key={d} value={d}>{d}</Option>);
 		return(
 			<Card>
	 			<Form {...FormItemLayout} >
	 				<Form.Item label="用户名">
						<span className="ant-form-text">{user.userName}</span>
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
                        <AutoComplete
                          className="global-search"
                          dataSource={companyOptions}
                          onSearch={this.handleCompanySearch}
                          placeholder="请输入公司名">
                        </AutoComplete>
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
                  <span className="ant-form-text">{user.contactPhone}</span>
		              <Fragment><a onClick={() => this.showModifyPhone()}>&nbsp;&nbsp;修改手机</a></Fragment>
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
						<Button type="primary" onClick={this.showPassword}>
					  	修改密码
						</Button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<Button type="primary" onClick={this.handleSubmit}>
					  	保存
						</Button>
			        </Form.Item>
			        <Modal
			        	title="修改密码"
          				visible={passwordVisible}
          				onOk={this.modifyPassword}
          				onCancel={this.handleCancel}>
          				<Form.Item label='密码:' help={help}>
			                <Popover
			                  getPopupContainer={node => node.parentNode}
			                  content={
			                    <div style={{ padding: '4px 0' }}>
			                      {passwordStatusMap[this.getPasswordStatus()]}
			                      {this.renderPasswordProgress()}
			                      <div style={{ marginTop: 10 }}>
			                        <FormattedMessage id="validation.password.strength.msg" />
			                      </div>
			                    </div>
			                  }
			                  overlayStyle={{ width: 240 }}
			                  placement="right"
			                  visible={visible}
			                >
			                  {getFieldDecorator('password', {
			                    rules: [
			                      {
			                        validator: this.checkPassword,
			                      },
			                    ],
			                  })(
			                    <Input
			                      size="large"
			                      type="password"
			                      placeholder={formatMessage({ id: 'form.password.placeholder' })}
			                    />
			                  )}
			                </Popover>
				        </Form.Item>
          				<Form.Item label='确认密码:'>
							{getFieldDecorator('confirm', {
			                  rules: [
			                   passwordVisible ?[{
			                      required: true,
			                      message: '请输入密码',
			                    }]:[],
			                    {
			                      validator: this.checkConfirm,
			                    },
			                  ],
			                })(
			                  <Input
			                    size="large"
			                    type="password"
			                    placeholder='请输入密码'
			                  />
			                )}
				          </Form.Item>
			        </Modal>
			        <Modal
			        	title="修改手机"
          				visible={phoneVisible}
          				onOk={this.modifyPhone}
          				onCancel={this.handleCancel}>
          				<Form.Item label='手机号:' >
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
          				<Form.Item label='验证码:'>
							{getFieldDecorator('captcha', {
			                  rules:
			                  	phoneVisible ?
			                    [{
			                      required: true,
			                      message: formatMessage({ id: 'validation.verification-code.required' }),
			                    }]:[],
			                })(
			                  <Input
			                    size="large"
			                   	style={{ width: '50%' }}
			                    placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
			                  />
			                )}
			                <Button
			                  size="large"
			                  disabled={count}
			                  className={styles.getCaptcha}
			                  onClick={this.onGetCaptcha}
			                >
			                  {count
			                    ? `${count} s`
			                    : formatMessage({ id: 'app.register.get-verification-code' })}
			                </Button>
				        </Form.Item>
			        </Modal>
			    </Form>
		    </Card>
 		);
 	}
}

export default UserInfo;
