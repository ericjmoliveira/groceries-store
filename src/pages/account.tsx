import Head from 'next/head';
import Link from 'next/link';

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
        <section className="mt-8 flex flex-col gap-2">
          <p>
            <Link href={'/signin'} className="underline">
              Sign in
            </Link>
          </p>
          <p>
            <Link href={'/signup'} className="underline">
              Create an account
            </Link>
          </p>
        </section>
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
            <ul className="flex flex-col gap-2">
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
