import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment'
const { Title} = Typography;
@connect(({ entrustment,testRecordEntrustment, loading }) => ({
  entrustment,
  testRecordEntrustment,
  loading: loading.models.entrustment,
}))
class DetailForUnAccept extends Component {
  state = {
    visible: false ,
    showVisible:false,
    url:"",
  };
  columns = [
    {
      title: '记录名',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  componentWillMount() {
    const reportnNo = sessionStorage.getItem("reportno");
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'entrustment/getReport',
      payload: reportnNo,
    });
    dispatch({
      type: 'testRecordEntrustment/getRecordInfo',
      payload:{
         reportno : reportnNo,
         source : '委托',
      }
    });
  }
  componentDidMount(){
    const {
      entrustment:{ report  },
      dispatch
    } = this.props;

    if(report.cnasCode!==undefined && report.cnasCode!==null  ){
      if(report.iscnas === 1){
        dispatch({
          type: 'entrustment/getCnasInfo',
          payload: {
            checkCode:report.cnasCode,
          },
          callback: (response) => {
            if (response.code === 200) {
              this.setState({cnasInfo: response.data});
            }
          }
        });
      }
    }

  }
  previewItem = text => {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      ...text,
      reportno:reportno
    };
    dispatch({
      type: 'testRecordEntrustment/getRecord',
      payload:params,
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          this.setState({url:url});
          //window.open(url);
        }
      }
    });
    this.setState({showVisible:true});
  };

  handleOk = e => {
    console.log(e);
    const { dispatch, match } = this.props;
    const reportnNo = sessionStorage.getItem("reportno");
    dispatch({
      type: 'entrustment/remove',
      payload: {reportno:reportnNo},
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  deleteReport = () => {
    this.setState({
      visible: true,
    });
  };

  back = () =>{
    this.props.history.goBack();
  };

  showCancel = () =>{
    this.setState({showVisible:false});
  }
  render() {
    const {
      entrustment,
      testRecordEntrustment:{recordData},
      loading
    } = this.props;
    const { report  } = entrustment;
    const { showVisible ,url, cnasInfo} = this.state;
    return (
      <PageHeaderWrapper loading={loading}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={3}>
              <Title level={3}>委托详情</Title>
            </Col>
            <Col span={19}>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Modal
          title="确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
            <p>是否撤销</p>
          </Modal>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{report.reportno}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(report.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="申请人">{report.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{report.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{report.payer}</Descriptions.Item>
            <Descriptions.Item label="检验费">{report.price}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{report.shipname}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="检查品名">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="申报数量和单位">{((report.quantityd === undefined || report.quantityd === null ) ? "":report.quantityd  )+report.unit }</Descriptions.Item>
            <Descriptions.Item label="到达地点">{report.inspplace1}</Descriptions.Item>
            <Descriptions.Item label="详细地址">{report.inspplace2}</Descriptions.Item>
            <Descriptions.Item label="检验时间">{moment(report.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="large" title="申请项目" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="申请项目">{report.inspway}</Descriptions.Item>
            <Descriptions.Item label="检验备注">{report.inspwaymemo1}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}  title="附件">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={recordData}
              columns={this.columns}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
        >
          <embed src={url} width="700" height="700"/>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForUnAccept;