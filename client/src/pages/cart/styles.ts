import styled from 'styled-components';
import { primaryColor } from '../../GlobalStyle';

export const Empty = styled.div`
  div {
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      margin-bottom: 20px;
    }

    p {
      margin-bottom: 10px;
    }

    img {
      margin-bottom: 20px;
    }

    a {
      color: #000;
    }
  }

  @media (max-width: 480px) {
    h2 {
      margin-bottom: 100px;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export const Confirm = styled.div`
  button {
    background: ${primaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    transition: 0.2s;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  h2 {
    margin-bottom: 20px;
  }

  a {
    color: #000;
  }
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 5fr 0.5fr 0.5fr 1fr;
  align-items: center;
  gap: 0 100px;
  margin-bottom: 40px;

  a {
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
  }

  img {
    width: 100px;
    height: 100px;
    margin-right: 50px;
  }

  button {
    border: none;
    background: transparent;
    padding: 5px 10px;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    grid-template-columns: 2fr 0.5fr 0.5fr 2fr;
    gap: 0 20px;

    a {
      flex-direction: column;
    }

    img {
      margin-right: 0px;
      margin-bottom: 10px;
    }
  }
`;

export const Controller = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 20px;

  button {
    text-decoration: none;
    border-radius: 20px;

    &:hover {
      background: #bbb;
    }
  }

  span {
    font-weight: 500;
  }
`;
