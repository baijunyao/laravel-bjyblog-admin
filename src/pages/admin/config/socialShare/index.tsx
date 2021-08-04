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
      key: '168',
      label: 'Select Plugin',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'jssocials',
            label: 'jssocials',
          },
          {
            value: 'sharejs',
            label: 'sharejs',
          },
        ],
      },
      required: true,
    },
    {
      key: '169',
      label: 'jsSocials Config',
      widget: Input,
      required: false,
    },
    {
      key: '170',
      label: 'ShareJs Config',
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
