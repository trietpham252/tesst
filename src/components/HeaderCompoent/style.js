import styled from "styled-components";
import { Row } from "antd";
import { Link } from "react-router-dom";

export const WrapperHeader = styled(Row)`
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 1270px;
  padding: 10px 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const WrapperTextHeader = styled(Link)`
  font-size: 18px;
  color: #ffe67c;
  font-weight: bold;
  letter-spacing: 5px;
  &:hover {
    font-size: 18px;
    color: #fff;
  }
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MenuContent = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    width: 100%;
    text-align: center;
  }
`;

export const WrapperSearch = styled.div`
  flex: 1;
  max-width: 600px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px 0;
  }
`;
