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
  selectedCategory: CategoryType | undefined;
  onCategoryChange: (selectedCategoryId: number) => void;
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
  constructor(props: ArticleCategoriesPropsType) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'adminCategory/fetch',
    })
  }

  handleChange(selectedCategoryId: number) {
    this.props.onCategoryChange(selectedCategoryId);
  }

  render() {
    const { categories, selectedCategory } = this.props;

    let defaultValue: string | undefined;

    if (selectedCategory !== undefined) {
      defaultValue = selectedCategory.name;
    }

    return (
      <Select
        style={{ width: '100%' }}
        defaultValue={defaultValue}
        onChange={this.handleChange}
      >
        {categories &&
        categories.map((category: CategoryType) => (
          <Option key={category.id}>{category.name}</Option>
        ))}
      </Select>
    )
  }
}

export default ArticleCategories;
