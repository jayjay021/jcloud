import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/system';
import { sec } from 'security';
import LoadingScreen from 'views/LoadingScreen';

const AuthWrapper: React.FC = ({ children }) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  sec.setAccessTokenSilently(getAccessTokenSilently);

  //auth states
  if (isLoading) {
    return (
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <LoadingScreen />
      </Box>
    );
  }
  if (error) {
    return <div>upps something wrong</div>;
  }
  if (!isAuthenticated) {
    loginWithRedirect();
  }

  return <>{children}</>;
};

export default AuthWrapper;
