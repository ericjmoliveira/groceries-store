import { useContext } from 'react';

import AuthContext from '../contexts/authentication/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
