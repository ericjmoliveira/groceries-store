import { Container } from './Footer.styled';

const Footer = () => {
  return (
    <Container>
      <span>&copy; {new Date().getFullYear()} Wowmart. All rights reserved.</span>
    </Container>
  );
};

export default Footer;
