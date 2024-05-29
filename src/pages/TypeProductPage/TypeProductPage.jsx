import React, { useState, useEffect } from 'react';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row, Button } from 'antd';
import { WrapperNavbar, WrapperProducts, PageWrapper, ContentRow, MobileNavBarWrapper } from './style';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);

    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });
    const [isNavVisible, setIsNavVisible] = useState(false);

    const fetchProductType = async (type, page, limit) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status === 'OK') {
            setLoading(false);
            setProducts(res?.data);
            setPanigate({ ...panigate, total: res?.totalPage });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize });
    };

    return (
        <Loading isLoading={loading}>
            <PageWrapper>
                <Button className="mobile-nav-toggle" onClick={() => setIsNavVisible(!isNavVisible)}>
                    {isNavVisible ? 'Hide Categories' : 'Show Categories'}
                </Button>
                <ContentRow>
                    <WrapperNavbar span={4} isNavVisible={isNavVisible}>
                        <NavBarComponent />
                    </WrapperNavbar>
                    <MobileNavBarWrapper isNavVisible={isNavVisible}>
                        <NavBarComponent />
                    </MobileNavBarWrapper>
                    <Col span={20} className="products-wrapper">
                        <WrapperProducts>
                            {products?.filter((pro) => {
                                if (searchDebounce === '') {
                                    return pro;
                                } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                    return pro;
                                }
                                return false;
                            })?.map((product) => (
                                <CardComponent
                                    key={product._id}
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
                            ))}
                        </WrapperProducts>
                        <Pagination
                            defaultCurrent={panigate.page + 1}
                            total={panigate?.total}
                            onChange={onChange}
                            className="pagination"
                        />
                    </Col>
                </ContentRow>
            </PageWrapper>
        </Loading>
    );
};

export default TypeProductPage;
