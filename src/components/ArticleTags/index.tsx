import React, { Component } from 'react';
import { Action, Dispatch } from 'redux';
import { Checkbox } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { TagType } from '@/models/data';
import { TagStateType } from '@/models/tag';

interface ArticleTagPropsType extends FormComponentProps {
  dispatch: Dispatch<Action<'adminTag/fetch'>>;
  onChange: (checkedTagIds: CheckboxValueType[]) => void;
  value: number[];
  tags: TagType[];
}

@connect(
  ({ adminTag }: {
    adminTag: TagStateType
  }) => ({
    tags: adminTag.data.list,
  }),
)
class ArticleTags extends Component<ArticleTagPropsType> {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'adminTag/fetch',
    })
  }

  render() {
    const options = this.props.tags.map((tag: TagType) => ({
      label: tag.name,
      value: tag.id,
    }));

    return (
      <Checkbox.Group
        options={options}
        defaultValue={this.props.value}
        onChange={(checkedTagIds: CheckboxValueType[]) => this.props.onChange(checkedTagIds)}
      />
    )
  }
}

export default ArticleTags;
