import { Col, Row, Card, List, Avatar } from 'antd';
import React, { Component, Suspense } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));

interface AnalysisProps {
  dashboardAndanalysis: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

@connect(
  ({
    dashboardAndanalysis,
    loading,
  }: {
    dashboardAndanalysis: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboardAndanalysis,
    loading: loading.effects['dashboardAndanalysis/fetch'],
  }),
)
class Analysis extends Component<AnalysisProps, AnalysisState> {
  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardAndanalysis/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndanalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { dashboardAndanalysis, loading } = this.props;
    const version = [];

    for (const name:string in dashboardAndanalysis.versions) {
      version.push(`${name}: ${dashboardAndanalysis.versions[name]}`)
    }

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={dashboardAndanalysis.counts} />
          </Suspense>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="最新评论" bordered={false}>
                  <List
                    size="large"
                    dataSource={dashboardAndanalysis.latest_socialite_users}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={ item.avatar } />}
                          title={<a href="https://ant.design">{item.name}</a>}
                          description={item.created_at}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title="最新评论" bordered={false}>
                  <List
                    size="large"
                    dataSource={dashboardAndanalysis.latest_comments}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={ item.socialite_user.avatar } />}
                          title={<a href="https://ant.design">{item.article.title}</a>}
                          description={ `${item.socialite_user.name} : ${item.content}` }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title="环境" bordered={false}>
                  <List
                    size="large"
                    dataSource={version}
                    renderItem={item => (
                      <List.Item>
                        {item}
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;
