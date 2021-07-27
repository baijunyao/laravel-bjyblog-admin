import React, { Component } from 'react';
import { Form } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;

export interface FormBuilderPropType extends FormComponentProps {
  meta: MetaType[];
}

export interface MetaType {
  key: string;
  label: string;
  required: boolean;
  widget: any;
  initialValue?: any;
  visibility?: string;
}

class FormBuilder extends Component<FormBuilderPropType> {
  renderElement = (element: MetaType) => (
    <FormItem
      key={element.key}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label={formatMessage({ id: element.label })}
      style={{
        visibility: element.visibility === 'hidden' ? 'hidden' : 'visible',
      }}
    >
      {
        this.props.form.getFieldDecorator(element.key, {
          rules: [{ required: element.required }],
          initialValue: element.initialValue,
        })(<element.widget />)
      }
    </FormItem>
  )

  render() {
    return (
      <>
        {
          this.props.meta.map(this.renderElement)
        }
      </>
    );
  }
}

export default Form.create<FormBuilderPropType>()(FormBuilder);
