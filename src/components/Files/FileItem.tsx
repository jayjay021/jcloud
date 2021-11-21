import { Folder, InsertDriveFile, MoreVert, Star } from '@mui/icons-material';
import {
  TableCell,
  TableRow,
  Checkbox,
  Box,
  IconButton,
  Badge,
  Typography,
} from '@mui/material';
import * as dayjs from 'dayjs';
import prettyBytes from 'pretty-bytes';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router';
import { useState } from 'react';
import ActionMenu from 'components/Files/ActionMenu';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
dayjs.extend(relativeTime);

export type FileType = 'file' | 'dir';

export interface IFile {
  path: string;
  name: string;
  size: number;
  type: FileType;
  favorite: boolean;
  createdAt: number;
  modifiedAt: number;
  owner: string;
}

interface FileItemProps {
  fileDoc: QueryDocumentSnapshot<DocumentData>;
}

const FileItem: React.FC<FileItemProps> = ({ fileDoc }) => {
  const history = useHistory();
  const file = fileDoc.data() as IFile;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Badge
              badgeContent={<Star fontSize='small' sx={{ color: '#ffe000' }} />}
              overlap='circular'
              invisible={!file.favorite}
            >
              {file.type === 'dir' ? (
                <Folder sx={{ color: 'primary.main' }} />
              ) : (
                <InsertDriveFile sx={{ color: 'primary.main' }} />
              )}
            </Badge>

            <Typography sx={{ ml: 1 }}>{file.name}</Typography>
          </Box>
          <Box>
            <IconButton
              id='action-button'
              aria-controls='action-menu'
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <ActionMenu
              anchorEl={anchorEl}
              handleClose={handleClose}
              open={open}
              fileDoc={fileDoc}
            />
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
