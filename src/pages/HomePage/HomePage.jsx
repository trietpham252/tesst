import React, { useState, useEffect } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slidefirst.png';
import slider2 from '../../assets/images/slide1.png';
import slider3 from '../../assets/images/silde2.png';
import slider4 from '../../assets/images/silde3.png';
import slider5 from '../../assets/images/slide4.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import VideoSlider from '../../components/VideoComponent/VideoComponent';

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if(res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  };

  const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: '100%', maxWidth: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item}/>
            );
          })}
        </WrapperTypeProduct>
      </div>
      <div className='body'>
        <div id="container" style={{ width: '100%', maxWidth: '1270px', margin: '0 auto'}}>
          <VideoSlider />
          <SliderComponent arrImages={[slider1, slider2, slider3, slider4, slider5]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <div key={product._id}>
                  <CardComponent
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                  />
                </div>
              );
            })}
          </WrapperProducts>
          <div style={{ width: '100%', maxWidth: '1270px', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textbutton={isPreviousData ? 'Đang tải...' : "Xem thêm"} type="outline" styleButton={{
                border: `1px solid ${products?.total === products?.data?.length ? '#ffe67c' : '#295f2d'}`, color: `${products?.total === products?.data?.length ? '#ffe67c' : '#295f2d'}`,
                width: '240px', height: '38px', borderRadius: '4px'
              }}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default HomePage;
