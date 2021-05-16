import React, { Component } from 'react';
import { Action, Dispatch } from 'redux';
import { Checkbox } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { TagType, TagListType } from '@/models/data';

interface ArticleTagPropsType extends FormComponentProps {
  dispatch: Dispatch<Action<'adminTag/fetch'>>;
  checkedTagIds: number[];
  onTagsChange: (checkedTagIds: CheckboxValueType[]) => void;
  adminTag: {
    data: TagListType
  };
}

@connect(
  ({ adminTag }: {
    adminTag: TagListType
  }) => ({
    adminTag,
  }),
)
class ArticleTags extends Component<ArticleTagPropsType> {
  constructor(props: ArticleTagPropsType) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'adminTag/fetch',
    })
  }

  handleChange(checkedTagIds: CheckboxValueType[]) {
    this.props.onTagsChange(checkedTagIds);
  }

  render() {
    const { checkedTagIds } = this.props;

    const options = this.props.adminTag.data.list.map((tag: TagType) => ({
      label: tag.name,
      value: tag.id,
    }));

    return (
      <>
        <Checkbox.Group
          options={options}
          defaultValue={checkedTagIds}
          onChange={this.handleChange}
        />
      </>
    )
  }
}

export default ArticleTags;
