import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #8aaae5;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #8aaae5;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
    
    @media (max-width: 768px) {
        width: auto;
        padding: 10px 20px;
    }
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 442px) {
        flex-direction: row;
        justify-content: center;
        margin-left: 20px;
        align-items: stretch;
        gap: 10px;
        & > div {
            flex: 0 0 calc(50% - 50px);
            max-width: calc(50% - 50px);
            box-sizing: border-box;
        }
    }
`
