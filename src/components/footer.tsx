import { useRouter } from 'next/router';

export function Footer() {
  const { pathname } = useRouter();
  const changeStyle = pathname === '/signin' || pathname === '/signup';

  return (
    <footer
      className={`flex items-center justify-center p-4 md:p-8 ${
        changeStyle
          ? 'bg-transparent text-gray-500 border-t-4 border-gray-200'
          : 'bg-blue-600 text-white font-normal'
      } shadow-md`}
    >
      <span>&copy; {new Date().getFullYear()} Wowmart. All Rights Reserved.</span>
    </footer>
  );
}
