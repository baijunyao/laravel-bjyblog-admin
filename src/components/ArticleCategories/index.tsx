import React, { Component } from 'react';
import { Action, Dispatch } from 'redux';
import { Select } from 'antd';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import { CategoryType } from '@/models/data';
import { CategoryStateType } from '@/models/category';

const { Option } = Select;

interface ArticleCategoriesPropsType extends FormComponentProps {
  dispatch: Dispatch<Action<'adminCategory/fetch'>>;
  value: number | undefined;
  onChange: (selectedCategoryId: number | string) => void;
  categories: CategoryType[];
}

@connect(
  ({ adminCategory }: {
    adminCategory: CategoryStateType
  }) => ({
    categories: adminCategory.data.list,
  }),
)
class ArticleCategories extends Component<ArticleCategoriesPropsType> {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'adminCategory/fetch',
    })
  }

  render() {
    const { categories, value } = this.props;

    let defaultValue = '';

    categories.forEach((category: CategoryType) => {
      if (category.id === value) {
        defaultValue = category.name;
      }
    })

    return (
      categories.length !== 0 &&
      <Select
        style={{ width: '100%' }}
        defaultValue={defaultValue}
        onChange={(selectedCategoryId: number | string) => this.props.onChange(selectedCategoryId)}
      >
        {categories.map((category: CategoryType) => (
          <Option key={category.id}>{category.name}</Option>
        ))}
      </Select>
    )
  }
}

export default ArticleCategories;
