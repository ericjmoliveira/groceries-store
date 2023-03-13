import styled from 'styled-components';
import { primaryColor } from '../../GlobalStyle';

export const Container = styled.div`
  h2 {
    margin-bottom: 40px;
  }

  h3,
  p {
    margin-bottom: 10px;
  }

  a {
    color: #000;
    text-decoration: underline;

    &:visited {
      color: #000;
    }
  }
`;

export const Info = styled.section`
  button {
    background: transparent;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Options = styled.section`
  margin-top: 25px;

  div {
    margin-bottom: 25px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 90vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 75px;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);

  @media (max-width: 480px) {
    top: 80px;
    height: 100vh;
  }
`;

export const Form = styled.form`
  width: 33%;
  display: flex;
  flex-direction: column;

  .save-changes {
    background-color: ${primaryColor};
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      background: #004f9a;
    }
  }

  .cancel-edit {
    width: 25%;
    align-self: flex-end;
    background-color: ${primaryColor};
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      background: #004f9a;
    }
  }

  @media (max-width: 480px) {
    width: 75%;
  }
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;

  label {
    text-align: center;
    font-size: 0.8rem;
    color: #fff;
    background-color: ${primaryColor};
    position: relative;
    border-radius: 3px;
    padding: 0 10px;
    top: 10px;
    left: 5px;
    width: fit-content;
    margin-bottom: 5px;
  }

  input {
    padding: 10px 15px;
    font-size: 0.9rem;
    border: 1px solid #000;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }
`;
