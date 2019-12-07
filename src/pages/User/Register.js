import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Progress,message } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

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

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };


  componentDidUpdate() {

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    const { form,dispatch} = this.props;
    const tel = form.getFieldValue("mobile");
    // 判断电话是否未空
    if(tel===undefined){
      message.success("电话号码不能为空");
    }else{
      // 存在电话号码
      dispatch({
        type: 'register/sendVerify',
        payload:{tel},
        callback: (response) => {
          if(response){
            // 请求服务成功
            if(response === "success"){
                message.success("发送成功");
            }else{
              // 失败
              Modal.info({
                title: formatMessage({ id: 'app.login.verification-code-warning.noExist' }),
              });
            }
          }
        }
      });
    }
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };



  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        // 1. 验证验证码
        const tel = values.mobile;
        const verifyCode = values.captcha;
        const params={
          tel,
          verifyCode
        }
        dispatch({
          type: 'register/verifyTel',
          payload:params,
          callback: (response) => {
            if(response){
              // 请求服务成功
              if(response === "success"){
                // 注册逻辑
                let params={
                  company:values.company,
                  username:values.username,
                  password:values.confirm,
                  certcode:values.certcode,
                  tel:values.mobile,
                  contact:values.contact,
                }
                console.log(params);
                dispatch({
                  type: 'register/registerPreCompany',
                  payload:params,
                  callback: (response2) => {
                    if(response2){
                      // 请求服务成功
                      if(response2 === "success"){
                        message.success("注册成功");
                      }else if(response2 === "手机号未验证"){
                        message.success("手机号未验证");
                      } else if(response2 === "公司重复注册"){
                        message.success("公司重复注册");
                      } else{
                        // 失败
                        message.success("注册失败");
                      }
                    }else{
                      message.success("注册失败");
                    }
                  }
                });
              }else{
                message.success("验证码错误");
              }
            }else{
              message.success("验证码失败");
            }
            // 注册逻辑
          }
        });

        }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkUserName = (rule, value, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/checkUserNameFetch',
      payload:{username:value},
      callback: (response) => {
        if (response===undefined || response === "error") {
          callback(formatMessage({ id: 'validation.userExist.error' }));
        } else if(response === "repeat"){
          callback(formatMessage({ id: 'validation.userExist.repeated' }));
        }else{
          callback();
        }
      }
    });
  };


  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
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
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
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

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>公司名：</div></Col>
              <Col span={19}>
                {getFieldDecorator('company', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.company.required' }),
                    },
                  ],
                })(
                  <Input size="large" placeholder={formatMessage({ id: 'form.company.placeholder' })} />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>Certcode：</div></Col>
              <Col span={19}>
                {getFieldDecorator('certcode', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.certcode.required' }),
                    },
                  ],
                })(
                  <Input size="large" placeholder={formatMessage({ id: 'form.certcode.placeholder' })} />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>用户名：</div></Col>
              <Col span={19}>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.username.required' }),
                    },
                    {
                      validator: this.checkUserName,
                    },
                  ],
                })(
                  <Input size="large" placeholder={formatMessage({ id: 'form.username.placeholder' })} />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem help={help}>
            <Row gutter={4}>
              <Col span={5}><div>输入密码：</div></Col>
              <Col span={19}>
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
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>确认密码：</div></Col>
              <Col span={19}>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.confirm-password.required' }),
                    },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })}
                  />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>联系人：</div></Col>
              <Col span={19}>
                {getFieldDecorator('contact', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.contact.required' }),
                    },
                  ],
                })(
                  <Input size="large" placeholder={formatMessage({ id: 'form.contact.placeholder' })} />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>手机号码：</div></Col>
              <Col span={19}>
                <InputGroup compact>
                  <Select
                    size="large"
                    value={prefix}
                    onChange={this.changePrefix}
                    style={{ width: '25%' }}
                  >
                    <Option value="86">+86</Option>
                  </Select>
                  {getFieldDecorator('mobile', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'validation.phone-number.required' }),
                      },
                      {
                        pattern: /^\d{11}$/,
                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      style={{ width: '75%' }}
                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
                    />
                  )}
                </InputGroup>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={4}>
              <Col span={5}><div>验证码：</div></Col>
              <Col span={11}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.verification-code.required' }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                  />
                )}
              </Col>
              <Col span={8}>
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
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
