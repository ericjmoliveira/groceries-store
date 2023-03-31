import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, FormEvent } from 'react';

import { useAuthStore } from '@/store/auth';

export default function SignUp() {
  const formRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null)
  };

  const authenticated = useAuthStore((state) => state.authenticated);
  const handleSignUp = useAuthStore((state) => state.handleSignUp);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (formRefs.password.current?.value! !== formRefs.confirmPassword.current?.value!) {
      alert('Passwords do not match!');
      return;
    }

    await handleSignUp({
      firstName: formRefs.firstName.current?.value!,
      lastName: formRefs.lastName.current?.value!,
      email: formRefs.email.current?.value!,
      password: formRefs.password.current?.value!
    });
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      {!authenticated && (
        <div className="w-10/12 md:w-1/3 mt-8 flex flex-col items-center justify-center mx-auto">
          <Link href={'/'} className="flex flex-col items-center justify-center mb-2">
            <Image src={'/spark.png'} width={30} height={30} alt="Wowmart spark" />
          </Link>
          <h2 className="text-lg font-semibold mb-8">Create your Wowmart account</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-4">
            <section>
              <input
                type="text"
                placeholder="Your first name"
                autoComplete="off"
                required
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg"
                ref={formRefs.firstName}
              />
            </section>
            <section>
              <input
                type="text"
                placeholder="Your last name"
                autoComplete="off"
                required
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg"
                ref={formRefs.lastName}
              />
            </section>
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
                placeholder="Your password (min: 6 characters)"
                autoComplete="off"
                required
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg"
                ref={formRefs.password}
              />
            </section>
            <section>
              <input
                type="password"
                placeholder="Confirm the password"
                autoComplete="off"
                required
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg"
                ref={formRefs.confirmPassword}
              />
            </section>
            <button className="flex items-center justify-center my-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-800 transition">
              Sign up
            </button>
          </form>
          <p className="font-medium">
            Already have an account?
            <Link href={'/signin'} className="ml-1 text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
