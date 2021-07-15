import { Form, Input, Modal, Radio } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { OpenSourceType } from '@/pages/admin/openSource/index/data';
import { formatMessage } from 'umi-plugin-react/locale';

export type NewItem = Pick<OpenSourceType, 'name' | 'type' | 'sort'>

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: NewItem) => void;
  handleModalVisible: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title={formatMessage({ id: 'Add' })}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Type' })}>
        {form.getFieldDecorator('type', {
          rules: [{ required: true }],
          initialValue: 1,
        })(<Radio.Group>
          <Radio value={1}>GitHub</Radio>
          <Radio value={2}>Gitee</Radio>
        </Radio.Group>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Name' })}>
        {form.getFieldDecorator('name', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({ id: 'Sort' })}>
        {form.getFieldDecorator('sort', {
          rules: [{ required: true }],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
