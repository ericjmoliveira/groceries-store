import Head from 'next/head';

import { getProducts } from '@/lib/db';
import { categoriesList } from '@/helpers/categories';
import { Card } from '@/components/card';
import { Product } from '@/interfaces';

interface HomeProps {
  data: Product[];
}

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      data: products,
      revalidate: 60
    }
  };
}

export default function Home({ data }: HomeProps) {
  return (
    <>
      <Head>
        <title>Wowmart</title>
      </Head>
      {categoriesList.map((category) => (
        <section key={category} className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {data.map((product) => {
              if (product.category === category) {
                return <Card key={product.id} info={product} />;
              }
            })}
          </div>
        </section>
      ))}
    </>
  );
}
