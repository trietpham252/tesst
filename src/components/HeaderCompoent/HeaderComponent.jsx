import { Badge, Col, Popover } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  MenuButton,
  MenuContent,
  HeaderContent,
  WrapperSearch,
} from './style';
import './style.css';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user');
    } else if (type === 'admin') {
      navigate('/system/admin');
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
    setIsMenuOpen(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div className='header-container'>
      <WrapperHeader>
        <HeaderContent>
          <WrapperTextHeader to="/">L O U I S V U I T T O N</WrapperTextHeader>
          {!isHiddenSearch && (
            <WrapperSearch>
              <ButttonInputSearch
                size="large"
                bordered={false}
                textbutton="Tìm kiếm"
                placeholder="Hãy nhập thông tin cần tìm nhé..."
                onChange={onSearch}
                backgroundcolorbutton="#295f2d"
              />
            </WrapperSearch>
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Loading isLoading={loading}>
              <WrapperHeaderAccout>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="avatar"
                    style={{
                      height: '30px',
                      width: '30px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: '30px' }} />
                )}
                {user?.access_token ? (
                  <>
                    <Popover content={content} trigger="click" open={isOpenPopup}>
                      <div
                        style={{
                          cursor: 'pointer',
                          maxWidth: 100,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        onClick={() => setIsOpenPopup((prev) => !prev)}
                      >
                        {userName?.length ? userName : user?.email}
                      </div>
                    </Popover>
                  </>
                ) : (
                  <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccout>
            </Loading>
            {!isHiddenCart && (
              <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', marginLeft: '20px' }}>
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </div>
            )}
          </div>
        </HeaderContent>
        <MenuContent isOpen={isMenuOpen}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {!isHiddenSearch && (
              <div style={{ margin: '10px 0', width: '100%' }}>
                <ButttonInputSearch
                  size="large"
                  bordered={false}
                  textbutton="Tìm kiếm"
                  placeholder="Hãy nhập thông tin cần tìm nhé..."
                  onChange={onSearch}
                  backgroundcolorbutton="#295f2d"
                />
              </div>
            )}
            <Loading isLoading={loading}>
              <WrapperHeaderAccout>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="avatar"
                    style={{
                      height: '30px',
                      width: '30px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: '30px' }} />
                )}
                {user?.access_token ? (
                  <>
                    <Popover content={content} trigger="click" open={isOpenPopup}>
                      <div
                        style={{
                          cursor: 'pointer',
                          maxWidth: 100,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        onClick={() => setIsOpenPopup((prev) => !prev)}
                      >
                        {userName?.length ? userName : user?.email}
                      </div>
                    </Popover>
                  </>
                ) : (
                  <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccout>
            </Loading>
            {!isHiddenCart && (
              <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', marginTop: '10px' }}>
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </div>
            )}
          </div>
        </MenuContent>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
