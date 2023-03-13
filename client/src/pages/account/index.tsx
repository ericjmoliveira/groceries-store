import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Styles from './styles';
import useAuth from '../../hooks/useAuth';

const Account = () => {
  const auth = useAuth();

  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleEmailUpdate = async (e: FormEvent) => {
    e.preventDefault();

    auth?.updateEmail(newEmail, currentPassword);
  };

  const handlePasswordUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (newPassword.trim() === confirmNewPassword.trim()) {
      if (newPassword.trim().length >= 8) auth?.updatePassword(currentPassword, newPassword);
      else alert('New password must be 8 or more characters long');
    } else alert('New passwords do not match!');
  };

  const handleDelete = () => {
    const response = confirm('Are you sure you want to delete your account?');

    if (response) auth?.deleteAccount();
  };

  return (
    <Styles.Container>
      <h2>Account</h2>
      {auth?.user ? (
        <Styles.Info>
          <div>
            <h3>
              {auth.user.firstName} {auth.user.lastName}
            </h3>
            <p>
              <strong>
                <em>{auth.user.email}</em>
              </strong>
            </p>
          </div>
          <p>
            <strong>User ID: {auth.user.id}</strong>
          </p>
          <p>
            <strong>Member since: {formatDate(auth.user.createdAt)}</strong>
          </p>
          <Styles.Options>
            <div>
              <p>
                <Link to="/orders">See orders list</Link>
              </p>
              <p>
                <Link to="/">Shop now</Link>
              </p>
            </div>
            <div>
              <p>
                <button onClick={() => auth.signOut()}>Sign out</button>
              </p>
            </div>
            <div>
              <p>
                <button
                  onClick={() => {
                    setShowEmailForm((prevState) => !prevState);
                    document.body.style.position = 'fixed';
                  }}
                >
                  Change current email
                </button>
              </p>
              <p>
                <button
                  onClick={() => {
                    setShowPasswordForm((prevState) => !prevState);
                    document.body.style.position = 'fixed';
                  }}
                >
                  Change current password
                </button>
              </p>
            </div>
            <p>
              <button onClick={handleDelete}>Delete account</button>
            </p>
          </Styles.Options>
          {showEmailForm && (
            <Styles.FormContainer>
              <Styles.Form onSubmit={handleEmailUpdate}>
                <button
                  className="cancel-edit"
                  onClick={() => {
                    setShowEmailForm(false);
                    document.body.style.position = 'initial';
                  }}
                >
                  Cancel
                </button>
                <Styles.FormControl>
                  <label htmlFor="editEmail">New email</label>
                  <input
                    type="email"
                    id="editEmail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    autoComplete="off"
                    placeholder="Enter a new email"
                    required
                  />
                </Styles.FormControl>
                <Styles.FormControl>
                  <label htmlFor="editPassword">Password</label>
                  <input
                    type="password"
                    id="editPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Confirm with current password"
                    required
                  />
                </Styles.FormControl>
                <button className="save-changes">Update email</button>
              </Styles.Form>
            </Styles.FormContainer>
          )}
          {showPasswordForm && (
            <Styles.FormContainer>
              <Styles.Form onSubmit={handlePasswordUpdate}>
                <button
                  className="cancel-edit"
                  onClick={() => {
                    setShowPasswordForm(false);
                    document.body.style.position = 'initial';
                  }}
                >
                  Cancel
                </button>
                <Styles.FormControl>
                  <label htmlFor="editPassword">Password</label>
                  <input
                    type="password"
                    id="editPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Current password"
                    required
                  />
                </Styles.FormControl>
                <Styles.FormControl>
                  <label htmlFor="editNewPassword">New password</label>
                  <input
                    type="password"
                    id="editNewPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="New password (min: 8 characters)"
                    required
                  />
                </Styles.FormControl>
                <Styles.FormControl>
                  <label htmlFor="confirmNewPassword">Confirm new password</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Confirm the new password"
                    required
                  />
                </Styles.FormControl>
                <button className="save-changes">Update password</button>
              </Styles.Form>
            </Styles.FormContainer>
          )}
        </Styles.Info>
      ) : (
        !auth?.isLoadingUserData && (
          <>
            <p>
              You haven't signed in yet. <Link to="/signin">Sign in now</Link>
            </p>
            <p>
              Don't have an account? <Link to="/signup">Create an account now</Link>
            </p>
          </>
        )
      )}
    </Styles.Container>
  );
};

export default Account;
