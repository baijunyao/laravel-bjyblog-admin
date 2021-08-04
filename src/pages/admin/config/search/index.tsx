import {
  Form,
  Input,
  Radio,
} from 'antd';
import React, { Component } from 'react';

import ConfigForm from '@/pages/admin/config/components/ConfigForm';
import { MetaType } from '@/components/FormBuilder';

class TableList extends Component {
  meta: MetaType[] = [
    {
      key: '177',
      label: 'Driver',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'algolia',
            label: 'Algolia',
          },
          {
            value: 'elasticsearch',
            label: 'Elasticsearch',
          },
          {
            value: 'null',
            label: 'SQL',
          },
        ],
      },
      required: true,
    },
    {
      key: '178',
      label: 'Elasticsearch prefix',
      widget: Input,
      required: false,
    },
    {
      key: '179',
      label: 'Elasticsearch host',
      widget: Input,
      required: false,
    },
    {
      key: '180',
      label: 'Elasticsearch port',
      widget: Input,
      required: false,
    },
    {
      key: '181',
      label: 'Elasticsearch scheme',
      widget: Input,
      required: false,
    },
    {
      key: '182',
      label: 'Elasticsearch user',
      widget: Input,
      required: false,
    },
    {
      key: '183',
      label: 'Elasticsearch pass',
      widget: Input,
      required: false,
    },
    {
      key: '184',
      label: 'Elasticsearch analyzer',
      widget: Input,
      required: false,
    },
    {
      key: '186',
      label: 'Algolia id',
      widget: Input,
      required: false,
    },
    {
      key: '187',
      label: 'Algolia secret',
      widget: Input,
      required: false,
    },
  ];

  render() {
    return (
      <ConfigForm meta={this.meta} />
    );
  }
}

export default Form.create()(TableList);
