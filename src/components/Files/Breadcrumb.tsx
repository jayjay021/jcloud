import {
  AddCircleOutlineOutlined,
  HomeOutlined,
  NavigateNextOutlined,
} from '@mui/icons-material';

import { Box, IconButton, Link, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbProps {
  path: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs
        maxItems={10}
        separator={<NavigateNextOutlined fontSize='small' />}
      >
        <Link
          sx={{ display: 'flex', alignItems: 'center' }}
          underline='hover'
          color='inherit'
          component={RouterLink}
          to='/files/dir'
        >
          <HomeOutlined />
        </Link>
        {path.split('/').map((subPath, i, arr) => {
          if (i === arr.length - 1) {
            return (
              <Typography key={i} color='text.primary'>
                {subPath}
              </Typography>
            );
          }
          return (
            <Link
              underline='hover'
              key={i}
              color='inherit'
              component={RouterLink}
              to={`/files/dir/${arr.slice(0, i + 1).join('/')}`}
            >
              {subPath}
            </Link>
          );
        })}
      </Breadcrumbs>
      <IconButton>
        <AddCircleOutlineOutlined />
      </IconButton>
    </Box>
  );
};

export default Breadcrumb;
