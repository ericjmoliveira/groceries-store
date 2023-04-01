import Head from 'next/head';
import { useRouter } from 'next/router';

import { useProductsStore } from '@/store/products';
import { Card } from '@/components/card';

export default function Search() {
  const { query } = useRouter();
  const keywords = query.query! as string;

  const searchProducts = useProductsStore((state) => state.searchProducts);
  const searchResults = searchProducts(keywords.split('-'));

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <h2 className="text-2xl font-semibold mb-8">
        Your searched for: <em>{keywords.split('-').join(' ')}</em>
      </h2>
      {searchResults?.length! > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {searchResults?.map((product) => {
            return <Card key={product.id} info={product} />;
          })}
        </div>
      ) : (
        <p>Your search returned no results</p>
      )}
    </>
  );
}
