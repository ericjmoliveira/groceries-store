import styled from 'styled-components';

import { primaryColor } from '../../GlobalStyle';

type ButtonProp = {
  parentComponent: string;
};

export const Container = styled.div<ButtonProp>`
  button {
    background: ${primaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background: #004f9a;
    }
  }

  div {
    width: ${(props) => (props.parentComponent === 'card' ? '75' : '33')}%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${primaryColor};
    border-radius: 20px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${primaryColor};
      color: #fff;
      font-size: 15px;
      font-weight: 500;
    }
  }

  @media (max-width: 480px) {
    div {
      width: ${(props) => (props.parentComponent === 'card' ? '75' : '50')}%;
    }
  }
`;
