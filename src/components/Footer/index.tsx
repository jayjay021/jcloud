import { Link } from '@mui/material';
import { Box } from '@mui/system';
import { GridFooter } from 'Layout';

const Footer: React.FC = () => {
  return (
    <GridFooter>
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            pr: 2,
          }}
        >
          <Link>I bims ein footer</Link>
        </Box>
      </Box>
    </GridFooter>
  );
};

export default Footer;
