import { Col, Row, Card, List, Avatar } from 'antd';
import React, { Component, Suspense } from 'react';
import { Action, Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import PageLoading from './components/PageLoading';
import IntroduceRow from './components/IntroduceRow';
import { DashboardType } from './data.d';

interface AnalysisProps {
  adminDashboard: DashboardType;
  dispatch: Dispatch<
    Action<
      'adminDashboard/fetch'
    >
  >;
}

@connect(
  ({
    adminDashboard,
  }: {
    adminDashboard: DashboardType;
  }) => ({
    adminDashboard,
  }),
)
class Analysis extends Component<AnalysisProps> {
  componentDidMount() {
    this.props.dispatch({
      type: 'adminDashboard/fetch',
    });
  }

  render() {
    const { adminDashboard } = this.props;
    const version:string[] = [];

    Object.keys(adminDashboard.versions).map(name => (version.push(`${name}: ${adminDashboard.versions[name]}`)))

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow visitData={adminDashboard.counts} />
          </Suspense>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card title={ formatMessage({ id: 'Latest logged in users' }) } bordered={false}>
                  <List
                    size="large"
                    dataSource={adminDashboard.latest_socialite_users}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={ item.avatar } />}
                          title={item.name}
                          description={item.created_at}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title={ formatMessage({ id: 'Recent Comments' }) } bordered={false}>
                  <List
                    size="large"
                    dataSource={adminDashboard.latest_comments}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={ item.socialite_user.avatar } />}
                          title={<a href={`/article/${item.article.id}#comment-${item.id}`} target="_blank" rel="noopener noreferrer">{item.article.title}</a>}
                          description={ `${item.socialite_user.name} : ${item.content}` }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title={ formatMessage({ id: 'Server environment' }) } bordered={false}>
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
