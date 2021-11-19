import { styled } from '@mui/material/styles';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  grid: `
    "header header header" 60px 
    "sidebar main main" 1fr 
    "sidebar main main" 1fr
    "footer footer footer" 40px / min-content 1fr 1fr`,
}));

export const GridHeader = styled('header')({
  gridArea: 'header',
});

export const GridSideBar = styled('div')({
  gridArea: 'sidebar',
});

export const GridMain = styled('main')({
  gridArea: 'main',
});

export const GridFooter = styled('footer')({
  gridArea: 'footer',
});

export const Layout: React.FC = ({ children }) => {
  return <Grid id='grid-layout'>{children}</Grid>;
};
