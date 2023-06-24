import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { useAuthStore } from '@/store/auth';
import { deleteUser } from '@/services/api';

export default function Account() {
  const user = useAuthStore((state) => state.user);
  const authenticated = useAuthStore((state) => state.authenticated);
  const handleSignOut = useAuthStore((state) => state.handleSignOut);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');

    if (!confirmDelete) return;

    const response = await deleteUser();

    if (response?.success) {
      alert(response.message);
      handleSignOut();
    }
  };

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <h2 className="text-2xl font-semibold">Account</h2>
      {!authenticated ? (
        <div className="flex flex-col items-center justify-center mt-32 md:mt-16">
          <span className="text-lg font-semibold mb-4">Not signed in</span>
          <Image src={'./empty-cart.svg'} width={250} height={250} alt="Empty cart" />
          <ul className="flex flex-col items-center gap-4">
            <li>
              <Link href={'/signin'} className="underline">
                Sign in
              </Link>
            </li>
            <li>
              <Link href={'/signup'} className="underline">
                Create an account
              </Link>
            </li>
            <li>
              <Link href={'/'} className="underline">
                Shop now
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <section>
          <div className="flex flex-col font-medium my-8">
            <span>
              Name: {user?.firstName} {user?.lastName}
            </span>
            <span>Email: {user?.email}</span>
            <span>ID: {user?.id}</span>
            <span>Joined in: {new Date(user?.createdAt!).toLocaleDateString()}</span>
          </div>
          <nav>
            <ul className="flex flex-col gap-8">
              <li>
                <Link href={'/purchases'} className="underline">
                  Purchases
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="underline">
                  Sign out
                </button>
              </li>
              <li>
                <button onClick={handleDelete} className="underline">
                  Delete account
                </button>
              </li>
            </ul>
          </nav>
        </section>
      )}
    </>
  );
}
