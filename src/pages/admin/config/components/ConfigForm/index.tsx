import {
  Button,
  Card,
  Form,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConfigStateType } from '@/pages/admin/config/model';
import FormBuilder, { MetaType } from '@/components/FormBuilder';
import { ConfigType } from '@/pages/admin/config/data';

const FormItem = Form.Item;

interface ConfigFormProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'adminConfig/fetch'
      | 'adminConfig/update'
      >
    >;
  configs: ConfigType[];
  meta: MetaType[];
}

class ConfigForm extends Component<ConfigFormProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminConfig/fetch',
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const {
      configs,
      dispatch,
      form,
    } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.keys(values).forEach(id => {
          if (values[id] !== configs[id].value) {
            dispatch({
              type: 'adminConfig/update',
              payload: {
                id,
                value: values[id],
              },
            });
          }
        })
      }
    });
  };

  render() {
    const { meta } = this.props;
    const idAndValue = {};

    this.props.configs.forEach((config: ConfigType) => {
      idAndValue[config.id] = config.value;
    })

    meta.map((row: MetaType) => {
      row.initialValue = idAndValue[row.key];

      return row;
    })

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormBuilder
              meta={meta}
              // @ts-ignore
              form={this.props.form}
            />
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                {formatMessage({ id: 'Submit' })}
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ adminConfig }: { adminConfig: ConfigStateType }) => ({ configs: adminConfig.data.list }),
)(Form.create<ConfigFormProps>()(ConfigForm));
