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
      key: '167',
      label: 'Use Slug',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'true',
            label: 'Yes',
          },
          {
            value: 'false',
            label: 'No',
          },
        ],
      },
      required: true,
    },
    {
      key: '194',
      label: 'Breadcrumb',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'true',
            label: 'Yes',
          },
          {
            value: 'false',
            label: 'No',
          },
        ],
      },
      required: true,
    },
    {
      key: '101',
      label: 'Blog Name',
      widget: Input,
      required: false,
    },
    {
      key: '149',
      label: 'Blog Title',
      widget: Input,
      required: false,
    },
    {
      key: '102',
      label: 'Blog Keywords',
      widget: Input,
      required: false,
    },
    {
      key: '103',
      label: 'Blog Description',
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
