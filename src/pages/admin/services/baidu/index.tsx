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
      label: 'appid',
      widget: Input,
      required: true,
    },
    {
      key: '175',
      label: 'appkey',
      widget: Input,
      required: true,
    },
    {
      key: '176',
      label: 'secret',
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
