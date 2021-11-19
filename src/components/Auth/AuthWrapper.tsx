import { Box } from '@mui/system';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingScreen from 'views/LoadingScreen';

import { auth } from 'config/firebase';

const AuthWrapper: React.FC = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  //auth states
  if (loading) {
    return (
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <LoadingScreen />
      </Box>
    );
  }
  if (!user) {
    if (!location.pathname.match(/^\/auth/i)) {
      return (
        <Redirect
          to={{ pathname: '/auth/signin', state: { from: location } }}
        />
      );
    } else {
      return <>{children}</>;
    }
  }

  if (location.pathname.match(/^\/auth/i)) {
    return <Redirect to={{ pathname: '/', state: { from: location } }} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
