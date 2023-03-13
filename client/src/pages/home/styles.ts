import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: #000;
  }

  section {
    display: flex;
    flex-direction: column;
  }
`;

export const Loading = styled.div`
  margin-top: 20vh;
`;

export const Category = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;
