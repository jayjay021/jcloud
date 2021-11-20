import { Box } from '@mui/material';
import Breadcrumb from 'components/Files/Breadcrumb';
import { useLocation } from 'react-router';
import React from 'react';
import FileList from 'components/Files/FileList';

type LocationState = {
  pathname: string;
};

const FilesDir: React.FC = () => {
  const location = useLocation<LocationState>();
  const path = location.pathname.replace(/^\/files\/dir[/]?/, '');

  return (
    <Box sx={{ width: '100%', height: '100%', pl: 1, pr: 1 }}>
      <Breadcrumb path={path} />
      <FileList path={`/${path}`} />
    </Box>
  );
};

export default FilesDir;
