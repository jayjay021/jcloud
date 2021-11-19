import {
  AccessTimeOutlined,
  FolderOutlined,
  InsertPhotoOutlined,
  StarBorderOutlined,
  VideocamOutlined,
} from '@mui/icons-material';
import {
  ContextType,
  SidebarStatusContext,
} from 'components/Sidebar/SidebarStatusContext';
import { Portal } from '@mui/material';
import { Box } from '@mui/system';
import SidebarContent from 'components/Sidebar/SidebarContent';
import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';

interface TopNavigationItemsI {
  to: string;
  match: string;
  label: string;
  icon: ReactElement;
  sidebarItems?: SidebarItemI[];
}

export interface SidebarItemI {
  to: string;
  label: string;
  icon: ReactElement;
  exact?: boolean;
}

const topNavigationItems: TopNavigationItemsI[] = [
  {
    label: 'Files',
    to: '/files/dir',
    match: '/files',
    icon: <FolderOutlined />,
    sidebarItems: [
      {
        to: '/files/dir',
        label: 'Files',
        icon: <FolderOutlined />,
      },
      {
        to: '/files/newest',
        label: 'Newest',
        icon: <AccessTimeOutlined />,
      },
      {
        to: '/files/favorites',
        label: 'Favorites',
        icon: <StarBorderOutlined />,
      },
    ],
  },
  {
    label: 'Photos',
    to: '/photos',
    match: '/photos',
    icon: <InsertPhotoOutlined />,
    sidebarItems: [
      {
        to: '/photos',
        label: 'Photos',
        exact: true,
        icon: <InsertPhotoOutlined />,
      },
      {
        to: '/photos/videos',
        label: 'Videos',
        icon: <VideocamOutlined />,
      },
      {
        to: '/photos/favorites',
        label: 'Favorites',
        icon: <StarBorderOutlined />,
      },
    ],
  },
];

const TopNavigation: React.FC = () => {
  return (
    <Box
      sx={{
        ml: 2,
        display: 'flex',
        justifyItems: 'center',
      }}
    >
      {topNavigationItems.map((item) => (
        <TopNavigationItem
          key={`top-navigation-item-${item.label}`}
          item={item}
        />
      ))}
    </Box>
  );
};

interface TopNavigationItemProps {
  item: TopNavigationItemsI;
}
const TopNavigationItem: React.FC<TopNavigationItemProps> = ({ item }) => {
  const match = useRouteMatch(item.match);
  const history = useHistory();
  const { ref } = React.useContext(SidebarStatusContext) as ContextType;
  const [sidebarRef, setSidebarRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      setSidebarRef(ref.current);
    }
  }, [ref]);

  return (
    <React.Fragment>
      {match && item.sidebarItems && (
        <Portal container={sidebarRef}>
          <SidebarContent sidebarItems={item.sidebarItems} />
        </Portal>
      )}
      <Box
        onClick={() => {
          history.push(item.to);
        }}
        sx={{
          mr: 1,
          display: 'flex',
          alignItems: 'center',
          color: 'primary.contrastText',
          filter: !match ? 'brightness(70%)' : 'brightness(100%)',
          '&:hover': {
            cursor: 'pointer',
            filter: 'brightness(100%)',
          },
          '&:before': match
            ? {
                content: '""',
                display: 'block',
                position: 'absolute',
                bottom: 0,
                right: 7,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(50%) rotate(45deg)',
                zIndex: 0,
              }
            : undefined,
        }}
      >
        {item.icon}
      </Box>
    </React.Fragment>
  );
};

export default TopNavigation;
