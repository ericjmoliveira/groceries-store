import { Container } from './Content.styled';

const Content = ({ children }: { children: JSX.Element }) => {
  return <Container>{children}</Container>;
};

export default Content;
