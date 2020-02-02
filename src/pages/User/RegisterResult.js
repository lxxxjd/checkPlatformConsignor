import React from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large" type="primary">
          返回登录
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="app.register-result.msg"
          values={{ userName: location.state.userName ? location.state.userName : '尚无账户' ,password:location.state.password ? location.state.password : '尚无密码'}}
        />
      </div>
    }
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
