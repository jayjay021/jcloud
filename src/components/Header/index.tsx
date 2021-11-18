import { GridHeader } from 'Layout';
import SidebarButton from 'components/Header/SidebarButton';
import { Box } from '@mui/system';
import Profile from 'components/Header/Profile';

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
