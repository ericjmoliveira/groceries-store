import Link from 'next/link';
import Image from 'next/image';

import { useCartStore } from '@/store/cart';
import { Button } from './button';
import { Product } from '@/interfaces';

interface CardProps {
  info: Product;
}

export function Card({ info }: CardProps) {
  const data = useCartStore((state) => state.data);
  const item = data.itemsList.find((item) => item.id === info.id);
  const quantity = item ? item.quantity : 0;

  return (
    <div className="flex flex-col">
      <Link href={`/${info.slug}`} className="mb-2">
        <Image
          src={info.image}
          width={200}
          height={200}
          alt={info.name}
          priority
          className="w-auto h-auto"
        />
      </Link>
      <Button parentComponent="card" id={info.id} quantity={quantity} />
      <span className="text-lg font-semibold">${(info.price / 100).toFixed(2)}</span>
      <span className="font-medium">{info.name}</span>
    </div>
  );
}
