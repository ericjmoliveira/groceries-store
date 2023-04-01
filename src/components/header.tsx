import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { BsSearch, BsPersonFill, BsCart4 } from 'react-icons/bs';

import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';

export function Header() {
  const searchRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);
  const authenticated = useAuthStore((state) => state.authenticated);
  const { totalPrice, totalItems } = useCartStore((state) => state.data);

  return (
    <header className="sticky top-0 w-full flex items-center justify-between p-4 md:py-4 md:p-8 bg-blue-600 text-white shadow-md">
      <Link href={'/'} className="flex items-center gap-2">
        <span className="hidden md:block text-2xl font-medium">Wowmart</span>
        <Image src={'/spark.png'} width={33} height={33} alt="Wowmart spark" />
      </Link>
      <form className="relative w-1/2 md:w-1/3 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search"
          required
          ref={searchRef}
          className="w-full px-4 py-2 text-black rounded-full focus:outline-none"
        />
        <button className="absolute right-1 w-8 h-8 flex items-center justify-center bg-yellow-400 rounded-full">
          <BsSearch className="text-xl text-black" />
        </button>
      </form>
      <nav>
        <ul className="flex items-center justify-between gap-4">
          <li>
            <Link href={'/account'} className="flex flex-col items-center">
              <BsPersonFill className="text-3xl" />
              {authenticated ? <small>Hi, {user?.firstName}</small> : <small>Options</small>}
              <span className="font-medium -mt-1">Account</span>
            </Link>
          </li>
          <li>
            <Link href={'/cart'} className="relative flex flex-col items-center">
              <BsCart4 className="text-3xl" />
              <div className="absolute right-1 -top-1 w-5 h-5 flex items-center justify-center bg-yellow-400 text-black font-medium border border-black rounded-full">
                {totalItems}
              </div>
              <small>Cart</small>
              <span className="font-medium -mt-1">${totalPrice.toFixed(2)}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
