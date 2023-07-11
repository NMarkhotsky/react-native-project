import { useSelector } from 'react-redux';
import { selectAuthState } from '../redux/auth/authSelectors';

export const useAuth = () => {
  const authState = useSelector(selectAuthState);

  return { authState };
};
