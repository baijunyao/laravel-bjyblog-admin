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
      key: '200',
      label: 'AccessKeyID',
      widget: Input,
      required: false,
    },
    {
      key: '201',
      label: 'AccessKeySecret',
      widget: Input,
      required: false,
    },
    {
      key: '202',
      label: 'BUCKET',
      widget: Input,
      required: false,
    },
    {
      key: '203',
      label: 'ENDPOINT',
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
