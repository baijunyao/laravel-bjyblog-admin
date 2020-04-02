import { Col, Row } from 'antd';

import React from 'react';
import { ChartCard } from './Charts';
import { Counts } from '../data.d';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: Counts }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="评论"
        loading={loading}
        total={() => visitData.comments}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="用户"
        loading={loading}
        total={() => visitData.socialite_users}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="文章"
        loading={loading}
        total={() => visitData.articles}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="随言碎语"
        loading={loading}
        total={() => visitData.notes}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

  </Row>
);

export default IntroduceRow;
