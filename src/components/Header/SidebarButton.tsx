import { styled } from '@mui/material/styles';
import { Box, SxProps } from '@mui/system';
import { useContext } from 'react';
import {
  ContextType,
  SidebarStatusContext,
} from 'components/Sidebar/SidebarStatusContext';

const divStyle: SxProps = {
  width: '1.5rem',
  height: '0.125rem',
  borderRadius: '10px',
  transition: 'all 0.3s linear',
  position: 'relative',
  transformOrigin: '1px',
};

const MuiStyledSidebarButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '1.5rem',
  height: '1.5rem',
  background: 'transparent',
  border: 'none',
  padding: 0,
  zIndex: 10,

  '&:focus': {
    outline: 'none',
  },
});

const SidebarButton: React.FC = () => {
  const { collapsed, toggle } = useContext(SidebarStatusContext) as ContextType;
  return (
    <Box
      onClick={() => toggle()}
      sx={{
        backgroundColor: collapsed ? 'primary.dark' : 'background.default',
        width: '60px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          filter: 'brightness(80%)',
        },
      }}
    >
      <MuiStyledSidebarButton>
        <Box
          sx={{
            ...divStyle,
            transform: collapsed ? 'rotate(0)' : 'rotate(45deg)',
            backgroundColor: collapsed ? 'background.default' : 'primary.dark',
          }}
        />
        <Box
          sx={{
            ...divStyle,
            opacity: collapsed ? '1' : '0',
            transform: collapsed ? 'translateX(0)' : 'translateX(5px)',
            backgroundColor: collapsed ? 'background.default' : 'primary.dark',
          }}
        />
        <Box
          sx={{
            ...divStyle,
            transform: collapsed ? 'rotate(0)' : 'rotate(-45deg)',
            backgroundColor: collapsed ? 'background.default' : 'primary.dark',
          }}
        />
      </MuiStyledSidebarButton>
    </Box>
  );
};

export default SidebarButton;
