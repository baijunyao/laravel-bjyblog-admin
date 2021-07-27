import React, { Component } from 'react';
import { Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import styles from '@/utils/style.less';
import { updateModalFormProps } from '@/components/ModalForm'
import { MetaType } from '@/components/FormBuilder';

interface AddButtonPropType {
  dispatch: Dispatch;
  meta: MetaType[],
  actionType: string,
}

class AddButton extends Component<AddButtonPropType> {
  handleModalVisible = () => {
    updateModalFormProps(
      this.props.dispatch,
      true,
      formatMessage({ id: 'Add' }),
      this.props.meta,
      this.props.actionType,
    )
  };

  render() {
    return (
      <div className={styles.tableListOperator}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible()}>
          {formatMessage({ id: 'Add' })}
        </Button>
      </div>
    );
  }
}

export default connect((meta: MetaType) => (meta))(AddButton);
