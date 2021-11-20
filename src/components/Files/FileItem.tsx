import { Folder, InsertDriveFile, MoreVert } from '@mui/icons-material';
import { TableCell, TableRow, Checkbox, Box, IconButton } from '@mui/material';
import * as dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router';
dayjs.extend(relativeTime);

export type FileType = 'file' | 'dir';

export interface IFile {
  path: string;
  name: string;
  size: number;
  type: FileType;
  createdAt: number;
  modifiedAt: number;
  owner: string;
}

interface FileItemProps {
  file: IFile;
}

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const history = useHistory();

  const onRowClick = () => {
    if (file.type === 'dir') {
      history.push(
        `/files/dir${file.path === '/' ? '' : file.path}/${file.name}`
      );
    }
  };
  return (
    <TableRow hover sx={{ cursor: 'pointer' }} onClick={onRowClick}>
      <TableCell padding='checkbox'>
        <Checkbox />
      </TableCell>
      <TableCell width='90%'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {file.type === 'dir' ? (
              <Folder sx={{ color: 'primary.main' }} />
            ) : (
              <InsertDriveFile sx={{ color: 'primary.main' }} />
            )}

            {file.name}
          </Box>
          <Box>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell padding='none' align='right' size='small'>
        {prettyBytes(file.size)}
      </TableCell>
      <TableCell padding='none' align='right' size='small'>
        {dayjs.unix(file.modifiedAt).fromNow()}
      </TableCell>
    </TableRow>
  );
};

export default FileItem;
