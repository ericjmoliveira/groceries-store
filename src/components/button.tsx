import { useCartStore } from '@/store/cart';

interface ButtonProps {
  parentComponent: 'card' | 'product';
  id: string;
  quantity: number;
}

export function Button({ parentComponent, id, quantity }: ButtonProps) {
  const handleCart = useCartStore((state) => state.handleCart);

  return (
    <div
      className={`${
        parentComponent === 'card' ? 'w-3/4 md:w-1/2' : 'w-2/4 md:w-1/4'
      } h-9 flex items-center justify-center mb-2 p-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md`}
    >
      {quantity === 0 ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCart(id, true);
          }}
          className="w-full"
        >
          + Add to cart
        </button>
      ) : (
        <div className="w-full flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCart(id, false);
            }}
            className="w-4 h-4 flex items-center p-3 justify-center text-sm rounded-full hover:bg-blue-800"
          >
            -
          </button>
          <span>
            {parentComponent === 'product' && 'Added '}
            {quantity}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCart(id, true);
            }}
            className="w-4 h-4 flex items-center p-3 justify-center text-sm rounded-full hover:bg-blue-800"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
