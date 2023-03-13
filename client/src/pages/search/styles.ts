import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    margin-bottom: 40px;
  }
`;

export const Results = styled.div`
  margin: 25px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
`;
