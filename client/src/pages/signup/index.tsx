import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import spark from '../../images/spark.png';
import * as Styles from './styles';

const signUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.trim() === confirmPassword.trim()) {
      if (password.trim().length >= 8) auth?.signUp(firstName, lastName, email, password);
      else alert('Password must be 8 or more characters long');
    } else alert('Passwords do not match!');
  };

  return (
    <Styles.Container>
      <Link to="/">
        <img src={spark} alt="Walmart logo" />
      </Link>
      <h3>Create your Wowmart account</h3>
      <Styles.Form onSubmit={handleSubmit}>
        <Styles.FormControl>
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
            placeholder="Enter you first name"
            required
          />
        </Styles.FormControl>
        <Styles.FormControl>
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
            placeholder="Enter your last name"
            required
          />
        </Styles.FormControl>
        <Styles.FormControl>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Enter a email"
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
            placeholder="Enter a password (min: 8 characters)"
            required
          />
        </Styles.FormControl>
        <Styles.FormControl>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            placeholder="Confirm the password"
            required
          />
        </Styles.FormControl>
        <button>Sign up</button>
      </Styles.Form>
      <p>Already have an account?</p>
      <Link to="/signin">Sign in</Link>
    </Styles.Container>
  );
};

export default signUp;
