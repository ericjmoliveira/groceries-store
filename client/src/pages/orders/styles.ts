import styled from 'styled-components';

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
`;

export const Empty = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }

  a {
    color: #000;
  }

  @media (max-width: 480px) {
    img {
      margin-top: 50px;
    }
  }
`;

export const Container = styled.div`
  h2 {
    margin-bottom: 40px;
  }
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }

  p {
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    span {
      margin-right: 5px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;

    a {
      img {
        margin-right: 10px;
      }

      span {
        margin-right: 10px;
      }
    }

    span {
      margin-left: 10px;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1.2rem;
`;
