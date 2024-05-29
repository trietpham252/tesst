import { Col, Image, Rate, Row, Space, Button, InputNumber, Typography } from 'antd';
import React from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide';
import { convertPrice, initFacebookSDK } from '../../utils';
import * as message from '../Message/Message';
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent';
import CommentComponent from '../CommentComponent/CommentComponent';
import Loading from '../LoadingComponent/Loading';
const { Title, Text } = Typography;

const Wrapper = styled.div`
    padding: 16px;
    background: #fff;
    border-radius: 4px;
    max-width: 1200px;
    margin: auto;
`;

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1);
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const [errorLimitOrder, setErrorLimitOrder] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onChange = value => {
        setNumProduct(Number(value));
    };

    const fetchGetDetailsProduct = async context => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    useEffect(() => {
        initFacebookSDK();
    }, []);

    useEffect(() => {
        const orderRedux = order?.orderItems?.find(item => item.product === productDetails?._id);
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false);
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true);
        }
    }, [numProduct]);

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng');
        }
        return () => {
            dispatch(resetOrder());
        };
    }, [order.isSucessOrder]);

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1);
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1);
            }
        }
    };

    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct });

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find(item => item.product === productDetails?._id);
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }));
            } else {
                setErrorLimitOrder(true);
            }
        }
    };

    return (
        <Loading isLoading={isLoading}>
            <Wrapper>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={10}>
                        <Image src={productDetails?.image} alt="image product" preview={true} />
                        <Row style={{ paddingTop: '10px' }} gutter={[8, 8]}>
                            {[...Array(6)].map((_, index) => (
                                <Col key={index} xs={8} md={4}>
                                    <Image src={productDetails?.image} alt="image small" preview={true} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={24} md={14}>
                        <Title level={2}>{productDetails?.name}</Title>
                        <Space size="middle">
                            <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                            <Text type="secondary">Đã bán 1000+</Text>
                        </Space>
                        <div>
                            <Text type="danger" strong style={{ fontSize: '24px' }}>{convertPrice(productDetails?.price)}</Text>
                        </div>
                        <div>
                            <Text>Giao đến {user?.address} - </Text>
                            <Text type="link">Đổi địa chỉ</Text>
                        </div>
                        <LikeButtonComponent
                            dataHref={process.env.REACT_APP_IS_LOCAL
                                ? "https://developers.facebook.com/docs/plugins/"
                                : window.location.href
                            }
                        />
                        <div style={{ margin: '20px 0' }}>
                            <Text>Số lượng</Text>
                            <Space>
                                <Button icon={<MinusOutlined />} onClick={() => handleChangeCount('decrease', numProduct === 1)} />
                                <InputNumber min={1} max={productDetails?.countInStock} value={numProduct} onChange={onChange} />
                                <Button icon={<PlusOutlined />} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)} />
                            </Space>
                        </div>
                        <Space>
                            <Button type="primary" size="large" onClick={handleAddOrderProduct}>Chọn mua</Button>
                            <Button size="large">Mua trả sau</Button>
                        </Space>
                        {errorLimitOrder && <Text type="danger">Sản phẩm hết hàng</Text>}
                    </Col>
                </Row>
                <CommentComponent />
            </Wrapper>
        </Loading>
    );
};

export default ProductDetailsComponent;
