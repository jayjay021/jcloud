import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SidebarItemI } from 'components/Sidebar';

import { useHistory, useRouteMatch } from 'react-router';

export interface SidebarItemsProps extends SidebarItemI {
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemsProps> = ({
  collapsed,
  icon,
  label,
  to,
}) => {
  const match = useRouteMatch(to);
  const history = useHistory();
  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        sx={{ width: '100%', overflowX: 'hidden' }}
        onClick={() => history.push(to)}
      >
        <ListItemIcon sx={{ color: match && 'primary.light' }}>
          {icon}
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
