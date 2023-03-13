import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from 'react-icons/bs';

import useCart from '../../hooks/useCart';
import * as Styles from './Header.styled';
import spark from '../../images/spark.png';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const cart = useCart();
  const auth = useAuth();
  const navigate = useNavigate();
  const [querySearch, setQuerySearch] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (querySearch.trim().length > 0) {
      navigate(`/search/${querySearch.trim().split(' ').join('-').toLowerCase()}`);
      setQuerySearch((prevQuerySearch) => prevQuerySearch.trim());
    }
  };

  const handleScroll = (categoryId: string) => {
    navigate('/');
    cart?.handleCategoryClicked(categoryId);
  };

  return (
    <Styles.Container>
      <Styles.UpperSection>
        <Styles.Logo>
          <Link to="/">
            <h2>Wowmart</h2>
            <img src={spark} alt="Wowmart logo" />
          </Link>
        </Styles.Logo>
        <Styles.SearchBar>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search everything at Wowmart online and in store"
              value={querySearch}
              onChange={(e) => setQuerySearch(e.target.value)}
              required
            />
            <button>
              <Icons.BsSearch />
            </button>
          </form>
        </Styles.SearchBar>
        <Styles.Navbar
          style={auth?.isLoadingUserData ? { visibility: 'hidden' } : { visibility: 'visible' }}
        >
          {auth?.user ? (
            <Styles.Account>
              <Link to="/account">
                <Icons.BsPerson />
                <span>Hi, {auth.user.firstName}</span>
                <strong>Account</strong>
              </Link>
              <Link to="/orders">
                <Icons.BsReceiptCutoff />
                Orders List
              </Link>
              <button onClick={auth.signOut}>
                <Icons.BsBoxArrowRight /> Sign out
              </button>
            </Styles.Account>
          ) : (
            <Styles.Options>
              <div>
                <Link to="/signin">
                  <Icons.BsPersonCheck />
                  Sign in
                </Link>
                <Link to="/signup">
                  <Icons.BsPersonPlus />
                  Sign up
                </Link>
              </div>
            </Styles.Options>
          )}
          <Styles.Cart>
            <Link to="/cart">
              <div>
                <div>{cart?.cartData?.itemsQuantity}</div>
                <Icons.BsCart4 />
                <p>${cart?.cartData?.total.toFixed(2)}</p>
              </div>
            </Link>
          </Styles.Cart>
        </Styles.Navbar>
      </Styles.UpperSection>
      <Styles.Categories>
        <ul>
          <li>
            <button onClick={() => handleScroll('snacks')}>Snacks</button>
          </li>
          <li>
            <button onClick={() => handleScroll('beverages')}>Beverages</button>
          </li>
          <li>
            <button onClick={() => handleScroll('pantry')}>Pantry</button>
          </li>
          <li>
            <button onClick={() => handleScroll('meat-seafood')}>Meat & Seafood</button>
          </li>
          <li>
            <button onClick={() => handleScroll('fresh-produce')}>Fresh Produce</button>
          </li>
          <li>
            <button onClick={() => handleScroll('deli')}>Deli</button>
          </li>
          <li>
            <button onClick={() => handleScroll('frozen-food')}>Frozen Food</button>
          </li>
          <li>
            <button onClick={() => handleScroll('daily-eggs')}>Daily & Eggs</button>
          </li>
          <li>
            <button onClick={() => handleScroll('household-essentials')}>
              Household Essentials
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll('personal-care')}>Personal Care</button>
          </li>
        </ul>
      </Styles.Categories>
    </Styles.Container>
  );
};

export default Header;
