import { query, collection, where } from '@firebase/firestore';
import {
  Backdrop,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import FileItem, { IFile } from 'components/Files/FileItem';
import { auth, firestore } from 'config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import LoadingScreen from 'views/LoadingScreen';

interface FileListProps {
  path: string;
}

const FileList: React.FC<FileListProps> = ({ path }) => {
  const [user] = useAuthState(auth);
  const [value, isLoading] = useCollection(
    query(
      collection(firestore, `/files`),
      where('path', '==', path),
      where('owner', '==', user?.uid)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <TableContainer sx={{ position: 'relative', pr: 2, height: '100%' }}>
      <Backdrop
        open={isLoading}
        sx={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <LoadingScreen />
      </Backdrop>
      {value?.docs.length === 0 && (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
          <Typography>No Files</Typography>
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox />
            </TableCell>
            <TableCell width='90%'>Name</TableCell>
            <TableCell padding='none' align='right' size='small'>
              Size
            </TableCell>
            <TableCell padding='none' align='right' size='small'>
              Modifytime
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.docs.map((doc) => {
            const file = doc.data() as IFile;
            return <FileItem key={`${file.path}/${file.name}`} file={file} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileList;
