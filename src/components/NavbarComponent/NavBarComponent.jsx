import React, { useEffect, useState } from 'react';
import { Checkbox, Rate } from 'antd';
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import * as ProductService from '../../services/ProductService'; 

const NavBarComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
          setCategories(res?.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onChange = () => { };

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => (
          <TypeProduct key={option} name={option} />
        ));
      case 'checkbox':
        return (
          <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
            {options.map((option) => (
              <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
            ))}
          </Checkbox.Group>
        );
      case 'star':
        return options.map((option) => (
          <div style={{ display: 'flex' }}>
            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
            <span>{` từ ${option} sao`}</span>
          </div>
        ));
      case 'price':
        return options.map((option) => (
          <WrapperTextPrice>{option}</WrapperTextPrice>
        ));
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLableText>Danh mục sản phẩm</WrapperLableText>
      <WrapperContent>
        {renderContent('text', categories)}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
