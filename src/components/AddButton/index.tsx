import React, { Component } from 'react';
import { Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import styles from '@/utils/style.less';

interface AddButtonPropType {
  dispatch: Dispatch;
}

@connect((state: any) => (state))
class AddButton extends Component<AddButtonPropType> {
  handleModalVisible = (visible: boolean) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'modal/update',
      payload: {
        visible,
      },
    });
  };

  render() {
    return (
      <div className={styles.tableListOperator}>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
          {formatMessage({ id: 'Add' })}
        </Button>
      </div>
    );
  }
}

export default AddButton;
