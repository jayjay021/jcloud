import { GridHeader } from 'Layout';
import SidebarButton from 'components/Header/SidebarButton';
import Profile from 'components/Header/Profile';
import { Typography, Box } from '@mui/material';
import TopNavigation from 'components/Header/TopNavigation';

const Header: React.FC = () => {
  return (
    <GridHeader>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <SidebarButton />
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Typography variant='h5' sx={{ color: 'primary.contrastText' }}>
            JCloud
          </Typography>
        </Box>
        <TopNavigation />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row-reverse',
            pr: 2,
            alignItems: 'center',
          }}
        >
          <Profile />
        </Box>
      </Box>
    </GridHeader>
  );
};

export default Header;
