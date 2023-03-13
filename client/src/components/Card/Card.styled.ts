import styled from 'styled-components';

export const Container = styled.div`
  a {
    text-decoration: none;
    color: #000;

    img {
      width: 200px;
      height: 200px;
    }
  }

  h3 {
    margin-top: 20px;
    margin-bottom: 5px;
  }

  span {
    font-weight: 400;
  }

  @media (max-width: 480px) {
    a {
      img {
        width: 160px;
        height: 160px;
      }
    }
  }
`;
