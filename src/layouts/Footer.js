import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '检验检测委托人',
          title: '检验检测委托人',
          href: 'http://www.xnjfbm.vip:84/user/login',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 水木梁清
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
