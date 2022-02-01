import { Navigate } from 'react-router-dom';
import { useUserState } from 'contexts/UserContext';

type Props = {
  children?: any; // JSX.Element 가 맞는데 타입에러 해결하지 못함
  path?: string;
};

const PrivateRoute = ({ children }: Props) => {
  const isLogin = useUserState().isLogin;
  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
