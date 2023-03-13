import { useParams } from 'react-router-dom';

import * as Styles from './styles';
import Card from '../../components/Card/Card';
import useProducts from '../../hooks/useProducts';

const Search = () => {
  const { query } = useParams();
  const keywords = query?.split('-');

  const { searchProducts } = useProducts();

  const searchResults = searchProducts(keywords!);

  return (
    <Styles.Container>
      <h2>
        You searched for: <em>{query?.split('-').join(' ')}</em>
      </h2>
      <Styles.Results>
        {searchResults.length > 0 ? (
          searchResults.map((item) => <Card key={item.id} info={item} />)
        ) : (
          <p>{!query ? 'No search' : 'Your search returned no results'}</p>
        )}
      </Styles.Results>
    </Styles.Container>
  );
};

export default Search;
