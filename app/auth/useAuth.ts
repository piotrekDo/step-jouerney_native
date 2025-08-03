import { jwtDecode } from 'jwt-decode';
import useAuthState from './useAuthState';
import authStore from './authStore';
import { AppUser } from '../model/AppUser';

const useAuth = () => {
  const { user, setUser } = useAuthState();

  const logIn = (authToken: string) => {
    const user: AppUser = jwtDecode(authToken);
    setUser(user);
    authStore.storeToken(authToken);
  };

  const logOut = () => {
    setUser(undefined);
    authStore.removeToken();
  };

  return { user, logIn, logOut };
};

export default useAuth;

