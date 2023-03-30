import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';

import { getProducts } from '@/lib/db';
import { useCartStore } from '@/store/cart';
import { useProductsStore } from '@/store/products';
import { Button } from '@/components/button';
import { Product } from '@/interfaces';
import { Card } from '@/components/card';

export async function getStaticPaths() {
  const products = await getProducts();

  const paths = products?.map((product) => ({ params: { slug: product.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug;

  const data = await getProducts();
  const product = data?.find((product) => product.slug === slug);

  return {
    props: {
      data: product,
      revalidate: 60
    }
  };
}

interface ProductProps {
  data: Product;
}

export default function Page({ data }: ProductProps) {
  const cart = useCartStore((state) => state.data);
  const item = cart.itemsList.find((item) => item.id === data.id);
  const quantity = item ? item.quantity : 0;
  const productsList = useProductsStore((state) => state.productsList);

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <span>
        {data.category} / {data.name}
      </span>
      <section className="flex flex-col md:flex-row justify-between gap-8 mt-8 mb-16">
        <Image src={data.image} width={400} height={400} alt={`${data.name} image`} priority />
        <div className="flex flex-col md:ml-8">
          <span className="text-2xl font-semibold mb-4">{data.name}</span>
          <span className="text-3xl font-semibold mb-4">${(data.price / 100).toFixed(2)}</span>
          <Button parentComponent="product" id={data.id} quantity={quantity} />
          <p className="font-medium mt-4 leading-8">{data.description}</p>
        </div>
      </section>
      <section className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-semibold mb-16">
          This and other items you might like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {productsList?.map((product) => {
            if (product.category === data.category) {
              return <Card key={product.id} info={product} />;
            }
          })}
        </div>
      </section>
    </>
  );
}
