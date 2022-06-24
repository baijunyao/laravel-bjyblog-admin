import {
  Form,
  Input,
} from 'antd';
import React, { Component } from 'react';

import ConfigForm from '@/pages/admin/config/components/ConfigForm';
import { MetaType } from '@/components/FormBuilder';

class TableList extends Component {
  meta: MetaType[] = [
    {
      key: '174',
      label: 'Baidu appid',
      widget: Input,
      required: true,
    },
    {
      key: '175',
      label: 'Baidu appkey',
      widget: Input,
      required: true,
    },
    {
      key: '176',
      label: 'Baidu secret',
      widget: Input,
      required: true,
    },
  ];

  render() {
    return (
      <ConfigForm meta={this.meta} />
    );
  }
}

export default Form.create()(TableList);
