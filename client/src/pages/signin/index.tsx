import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import spark from '../../images/spark.png';
import * as Styles from './styles';

const signIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    auth?.signIn(email, password);
  };

  return (
    <Styles.Container>
      <Link to="/">
        <img src={spark} alt="Walmart logo" />
      </Link>
      <h3>Sign in to your Wowmart account</h3>
      <Styles.Form onSubmit={handleSubmit}>
        <Styles.FormControl>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Enter you email"
            required
          />
        </Styles.FormControl>
        <Styles.FormControl>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            placeholder="Enter your password"
            required
          />
        </Styles.FormControl>
        <button>Sign in</button>
      </Styles.Form>
      <p>Don't have an account?</p>
      <Link to="/signup">Create an account</Link>
    </Styles.Container>
  );
};

export default signIn;
