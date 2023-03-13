import styled from 'styled-components';

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20vh;
`;

export const Status = styled.div`
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
