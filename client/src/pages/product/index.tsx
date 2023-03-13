import { Link, useParams } from 'react-router-dom';

import useCart from '../../hooks/useCart';
import Button from '../../components/Button/Button';
import * as Styles from './styles';
import useProducts from '../../hooks/useProducts';

const Product = () => {
  const { id } = useParams();
  const { getProduct } = useProducts();

  const product = getProduct(id!);

  const cart = useCart();
  const item = cart?.cartData?.itemsOrdered.find((item) => item.id === id!);
  const quantityOrdered = item ? item.quantity : 0;

  return (
    <Styles.Container>
      <Styles.Image>
        <img src={product.thumbnail} alt={product.name} />
      </Styles.Image>
      <Styles.Info>
        <h2>{product.name}</h2>
        <h3>${(product.price / 100).toFixed(2)}</h3>
        <Button
          quantity={quantityOrdered}
          buttonHandler={cart?.handleCart!}
          id={id!}
          component="product"
        />
        <p>{product.description}</p>
        <Link to="/">See more products</Link>
      </Styles.Info>
    </Styles.Container>
  );
};

export default Product;
