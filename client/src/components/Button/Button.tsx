import { Container } from './Button.styled';

type ButtonProps = {
  quantity: number;
  buttonHandler: (id: string, add?: boolean, removeAll?: boolean) => void;
  id: string;
  component: string;
};

const Button = ({ quantity, buttonHandler, id, component }: ButtonProps) => {
  return (
    <Container parentComponent={component}>
      {quantity === 0 ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            buttonHandler(id);
          }}
        >
          + Add to cart
        </button>
      ) : (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              buttonHandler(id, false);
            }}
          >
            -
          </button>
          <span>
            {component === 'product' && 'Added '}
            {quantity}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              buttonHandler(id);
            }}
          >
            +
          </button>
        </div>
      )}
    </Container>
  );
};

export default Button;
