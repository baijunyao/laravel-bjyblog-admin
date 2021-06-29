import { Col, Row } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
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

const IntroduceRow = ({ visitData }: { visitData: Counts }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={formatMessage({ id: 'Number of comments' })}
        total={() => visitData.comments}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={formatMessage({ id: 'Number of Socialite users' })}
        total={() => visitData.socialite_users}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={formatMessage({ id: 'Number of articles' })}
        total={() => visitData.articles}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={formatMessage({ id: 'Number of notes' })}
        total={() => visitData.notes}
        contentHeight={46}
      >
      </ChartCard>
    </Col>

  </Row>
);

export default IntroduceRow;
