import React, { Component } from 'react';
import { Form, Modal } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import FormBuilder, { FormBuilderPropType } from '@/components/FormBuilder';
import { ModalModelState } from '@/models/modal';

interface ModalFormPropType extends FormBuilderPropType{
  dispatch: Dispatch;
  modal: ModalModelState;
  model: string;
  title: string;
  visible: boolean;
}

class ModalForm extends Component<ModalFormPropType> {
  handleAdd = (fields: any) => {
    const { dispatch, model } = this.props;

    dispatch({
      type: `${model}/add`,
      payload: fields,
    });
  };

  okHandle = () => {
    const { form } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      this.handleAdd(fieldsValue);
    });
  };

  cancelHandle = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'modal/update',
      payload: {
        visible: false,
      },
    });
  }

  render() {
    return (
      <Modal
        title={formatMessage({ id: this.props.title })}
        visible={this.props.modal.visible}
        onOk={this.okHandle}
        onCancel={this.cancelHandle}
      >
        <FormBuilder
          meta={this.props.meta}
          form={this.props.form}
        />
      </Modal>
    );
  }
}

export default connect(
  ({ modal }: { modal: ModalModelState }) => (modal),
)(Form.create<ModalFormPropType>()(ModalForm))
