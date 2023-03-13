import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Image = styled.div`
  img {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 480px) {
    img {
      width: 250px;
      height: 250px;
      margin-bottom: 25px;
    }

    margin-right: 0;
  }

  margin-right: 50px;
`;

export const Info = styled.div`
  h2 {
    margin-bottom: 10px;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 25px;
  }

  p {
    margin-top: 40px;
    margin-bottom: 30px;
    font-weight: 500;
    line-height: 2;
  }

  a {
    color: #000;
    font-weight: 500;
  }
`;
