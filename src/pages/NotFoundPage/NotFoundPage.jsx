import React from 'react';
import { Typography, Button } from 'antd';
import sadFace from '../../assets/images/feel-bad-emoji-2048x2048-b0nydmkz.png';

const { Title } = Typography;

const NotFoundPage = () => {
  return (
    <div className="not-found" >
      <img src={sadFace} alt="Sad face"  style={{width: '100%', height: '50%'}}/>
      
      <Title level={1}>Oops! Page not found</Title>
      
      <p>
        We're sorry, the page you requested could not be found. 
      </p>

      <Button type="primary">
        <a href="/">Go Back Home</a>  
      </Button>
    </div>
  );
};

export default NotFoundPage;