import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="w-full p-4 md:p-8 bg-blue-600 text-white shadow-md">
      <Link href={'/'} className="flex items-center gap-2">
        <span className="text-2xl font-medium">Wowmart</span>
        <Image src={'/spark.png'} width={33} height={33} alt="Wowmart spark" />
      </Link>
    </header>
  );
}
