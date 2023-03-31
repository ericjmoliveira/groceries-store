import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, FormEvent } from 'react';

import { useAuthStore } from '@/store/auth';

export default function SignIn() {
  const formRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null)
  };

  const authenticated = useAuthStore((state) => state.authenticated);
  const handleSignIn = useAuthStore((state) => state.handleSignIn);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await handleSignIn({
      email: formRefs.email.current?.value!,
      password: formRefs.password.current?.value!
    });
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      {!authenticated && (
        <div className="w-10/12 md:w-1/3 mt-8 flex flex-col items-center justify-center mx-auto">
          <Link href={'/'} className="flex flex-col items-center justify-center mb-2">
            <Image src={'/spark.png'} width={30} height={30} alt="Wowmart spark" />
          </Link>
          <h2 className="text-lg font-semibold mb-8">Sign in to your Wowmart account</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-4">
            <section>
              <input
                type="email"
                placeholder="Your email"
                autoComplete="off"
                required
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg"
                ref={formRefs.email}
              />
            </section>
            <section>
              <input
                type="password"
                placeholder="Your password"
                autoComplete="off"
                required
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg"
                ref={formRefs.password}
              />
            </section>
            <button className="flex items-center justify-center my-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-800 transition">
              Sign in
            </button>
          </form>
          <p className="font-medium">
            Do not have an account?
            <Link href={'/signup'} className="ml-1 text-blue-600 font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
