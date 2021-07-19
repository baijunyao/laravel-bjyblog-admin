import React, { Component } from 'react';
import { Form } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const FormItem = Form.Item;

interface FormBuilderPropType {
  meta: MetaType[];
  form: any;
}

interface MetaType {
  key: string;
  label: string;
  widget: any;
  required: boolean;
}

class FormBuilder extends Component<FormBuilderPropType> {
  renderElement = (element: MetaType) => (
    <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Name' })}>
      {
        this.props.form.getFieldDecorator(element.key, {
          rule: element.required ? [{ required: true }] : [],
        })(<element.widget />)
      }
    </FormItem>
  )

  render() {
    return (
      <>
        {this.props.meta.map(this.renderElement)}
      </>
    );
  }
}

export default Form.create<FormBuilderPropType>()(FormBuilder);
