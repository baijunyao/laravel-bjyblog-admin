import React, { Component } from 'react';
import { Form } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;

export interface FormBuilderPropType extends FormComponentProps {
  meta: MetaType[];
}

interface ChildrenListType {
  value: string | number;
  label: string;
}

interface ChildrenType {
  widget: any;
  list: ChildrenListType[]
}

export interface MetaType {
  key: string;
  label: string;
  required: boolean;
  widget: any;
  initialValue?: any;
  children?: ChildrenType,
  visibility?: string;
}

class FormBuilder extends Component<FormBuilderPropType> {
  renderChildren = (children: ChildrenType) => (
    <>
      {children.list.map(
        (list: ChildrenListType) => (
          <children.widget key={`children-${list.label}`} value={list.value}>
            {formatMessage({ id: list.label })}
          </children.widget>
        ),
      )}
    </>
  )

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
        })(
          <element.widget>
            {
              element.children === undefined ? null : this.renderChildren(element.children)
            }
          </element.widget>,
        )
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
