import { AppsOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress size={68} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppsOutlined />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
