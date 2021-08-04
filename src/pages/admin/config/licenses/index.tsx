import {
  Form,
  Radio,
} from 'antd';
import React, { Component } from 'react';

import ConfigForm from '@/pages/admin/config/components/ConfigForm';
import { MetaType } from '@/components/FormBuilder';

class TableList extends Component {
  meta: MetaType[] = [
    {
      key: '196',
      label: 'Allow adaptation',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: '',
            label: 'Yes',
          },
          {
            value: '-nd',
            label: 'No',
          },
          {
            value: '-sa',
            label: 'Yes, as long as others share alike',
          },
        ],
      },
      required: true,
    },
    {
      key: '197',
      label: 'Allow commercial',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: '',
            label: 'Yes',
          },
          {
            value: '-nc',
            label: 'No',
          },
        ],
      },
      required: true,
    },
    {
      key: '198',
      label: 'Language',
      widget: Radio.Group,
      children: {
        widget: Radio,
        list: [
          {
            value: 'en',
            label: 'English',
          },
          {
            value: 'fr',
            label: 'French',
          },
          {
            value: 'ru',
            label: 'Russian',
          },
          {
            value: 'zh',
            label: 'Chinese(Simplified)',
          },
        ],
      },
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
