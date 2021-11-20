import { Box } from '@mui/material';
import Breadcrumb from 'components/Files/Breadcrumb';
import { useLocation } from 'react-router';

type LocationState = {
  pathname: string;
};

const FilesDir: React.FC = () => {
  const location = useLocation<LocationState>();
  console.log(location);
  return (
    <Box sx={{ width: '100%', height: '100%', pl: 1 }}>
      <Breadcrumb path={location.pathname.replace(/^\/files\/dir[/]?/, '')} />{' '}
      dir content
    </Box>
  );
};

export default FilesDir;
