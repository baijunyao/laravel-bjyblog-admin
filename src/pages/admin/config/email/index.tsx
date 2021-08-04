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
      key: '154',
      label: 'Email Driver',
      widget: Input,
      required: true,
    },
    {
      key: '156',
      label: 'Email Encryption',
      widget: Input,
      required: true,
    },
    {
      key: '155',
      label: 'Email Port',
      widget: Input,
      required: true,
    },
    {
      key: '142',
      label: 'Email Host',
      widget: Input,
      required: true,
    },
    {
      key: '143',
      label: 'Email Username',
      widget: Input,
      required: true,
    },
    {
      key: '144',
      label: 'Email Password',
      widget: Input,
      required: true,
    },
    {
      key: '145',
      label: 'Email From Name',
      widget: Input,
      required: true,
    },
    {
      key: '157',
      label: 'Email From Address',
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
