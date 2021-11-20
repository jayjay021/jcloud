import {
  AddCircleOutlineOutlined,
  HomeOutlined,
  NavigateNextOutlined,
} from '@mui/icons-material';

import { Box, IconButton, Link, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddMenu from 'components/Files/AddMenu';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbProps {
  path: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <IconButton
        id='add-button'
        aria-controls='add-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AddCircleOutlineOutlined />
      </IconButton>
      {open && (
        <AddMenu
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          path={path}
        />
      )}
    </Box>
  );
};

export default Breadcrumb;
