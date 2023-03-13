import styled from 'styled-components';

import { primaryColor, secondaryColor } from '../../GlobalStyle';

export const Container = styled.header`
  width: 100%;
  height: fit-content;
  position: sticky;
  z-index: 1;
  top: 0;
  background: ${primaryColor};
  padding-top: 10px;
  padding-left: 40px;
  padding-right: 40px;

  a {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }
  svg {
    color: #fff;
    font-size: 25px;
  }
  p {
    font-weight: 500;
    margin-top: 5px;
  }
  @media (max-width: 480px) {
    padding-left: 10px;
    padding-right: 10px;
    a {
      text-align: center;
    }
  }
`;

export const UpperSection = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: auto 2fr auto;
  align-items: center;
  margin-bottom: 5px;

  @media (max-width: 480px) {
    margin-bottom: 0;
  }
`;

export const Logo = styled.div`
  a {
    width: fit-content;
    padding: 10px 20px;
    border-radius: 25px;
    display: flex;
    align-items: center;

    h2 {
      margin-right: 10px;
    }

    &:hover {
      background: ${secondaryColor};
    }
  }

  @media (max-width: 480px) {
    a {
      padding: 5px 10px;

      &:hover {
        background: none;
      }
    }
  }
`;

export const SearchBar = styled.div`
  form {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 60%;
      padding: 10px 20px;
      font-size: 0.9rem;
      border: none;
      border-radius: 25px;

      &::placeholder {
        color: #757575;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      width: 30px;
      height: 30px;
      position: relative;
      left: -35px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffc220;
      border-radius: 50%;
      border: none;
      cursor: pointer;

      svg {
        font-size: 1rem;
        color: #000;
      }
    }
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    gap: 0;
  }
`;

export const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  div,
  a,
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    color: #fff;
    background: inherit;
    padding: 5px 10px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.2s;

    svg {
      margin-bottom: 5px;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    span {
      font-size: 0.8rem;
    }

    &:hover {
      background: ${secondaryColor};
    }
  }

  @media (max-width: 480px) {
    gap: 5px;

    div,
    a,
    button {
      padding: 0;

      &:hover {
        background: none;
      }
    }
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  div {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 20px;
      font-weight: 500;
      transition: 0.2s;

      svg {
        margin-bottom: 5px;
      }

      &:hover {
        background: ${secondaryColor};
      }
    }
  }

  @media (max-width: 480px) {
    div {
      a {
        &:hover {
          background: none;
        }
      }
    }
  }
`;

export const Cart = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0;
    margin-left: 5px;
    padding: 10px;
    border: none;
    border-radius: 20px;

    div {
      width: 18px;
      height: 18px;
      font-size: 0.8rem;
      position: relative;
      top: -8px;
      left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffc220;
      border-radius: 50%;
      color: #000;
      border: 1px solid #000;

      &:hover {
        background: #ffc220;
      }
    }

    svg {
      margin-top: -20px;
    }

    &:hover {
      background: ${secondaryColor};
    }
  }

  @media (max-width: 480px) {
    div {
      margin-left: 0;

      &:hover {
        background: none;
      }
    }
  }
`;

export const Categories = styled.section`
  width: 100%;
  border-top: 1px solid #fff;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 0 20px;

    li {
      button {
        padding: 10px;
        transition: 0.2s;
        padding: 10px;
        border: none;
        border-radius: 20px;
        background: inherit;
        color: #fff;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          background: ${secondaryColor};
        }
      }
    }
  }

  @media (max-width: 480px) {
    overflow-x: auto;
    white-space: nowrap;
  }
`;
