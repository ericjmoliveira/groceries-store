import styled from 'styled-components';
import { primaryColor } from '../../GlobalStyle';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 5px;
  }

  h3 {
    margin-bottom: 5px;
  }

  p {
    margin-top: 25px;
    margin-bottom: 10px;
  }

  a {
    &:last-child {
      width: 33%;
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
      border-radius: 20px;
      padding: 15px 20px;
      text-align: center;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      color: #000;
    }
  }

  @media (max-width: 480px) {
    margin-top: 40%;

    a {
      &:last-child {
        @media (max-width: 480px) {
          width: 90%;
        }
      }
    }
  }
`;

export const Form = styled.form`
  width: 33%;
  display: flex;
  flex-direction: column;

  button {
    margin-top: 15px;
    background-color: ${primaryColor};
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 15px 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: 0.2s;

    &:hover {
      background: #004f9a;
    }
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  label {
    text-align: center;
    font-size: 0.8rem;
    color: #444;
    background-color: #fff;
    position: relative;
    padding: 0 3px;
    top: 15px;
    left: 5px;
    width: fit-content;
    margin-bottom: 5px;
  }

  input {
    padding: 15px 20px;
    font-size: 0.9rem;
    border: 1px solid #000;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }
`;
