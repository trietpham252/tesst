import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;

    & > * {
        flex: 1 1 calc(20% - 12px); 
        max-width: calc(20% - 12px); 
    }

    @media (max-width: 1200px) {
        & > * {
            flex: 1 1 calc(33.333% - 12px);
            max-width: calc(33.333% - 12px); 
    }

    @media (max-width: 768px) {
        & > * {
            flex: 1 2 calc(50% - 100px); 
            max-width: calc(50% - 100px);
            margin-left: 90px;
        }
    }

    @media (max-width: 480px) {
        & > * {
            flex: 1 1 100%; 
            max-width: 100%; 
        }
    }
`;

export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    border-radius: 4px;
    height: fit-content;
    margin-top: 20px;
    width: 200px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const MobileNavBarWrapper = styled.div`
    display: none;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;

    @media (max-width: 768px) {
        display: ${props => (props.isNavVisible ? 'block' : 'none')};
    }
`;

export const PageWrapper = styled.div`
    width: 100%;
    background: #efefef;
    min-height: calc(100vh - 64px);
    padding: 20px;

    .mobile-nav-toggle {
        display: none;
        margin-bottom: 10px;
    }

    @media (max-width: 768px) {
        padding: 10px;

        .mobile-nav-toggle {
            display: block;
        }
    }
`;

export const ContentRow = styled(Row)`
    width: 100%;
    margin: 0 auto;
    max-width: 1270px;
    flex-wrap: nowrap;
    padding-top: 10px;
    height: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        flex-wrap: wrap;
        padding: 0 10px;
    }
`;
