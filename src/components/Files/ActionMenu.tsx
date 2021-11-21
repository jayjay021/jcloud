import { DeleteOutlined, Star } from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { updateDoc, deleteDoc } from '@firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { IFile } from 'components/Files/FileItem';
import { useSnackbar } from 'notistack';

interface ActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  fileDoc: QueryDocumentSnapshot<DocumentData>;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  anchorEl,
  open,
  handleClose,
  fileDoc,
}) => {
  const fileData = fileDoc.data() as IFile;
  const { enqueueSnackbar } = useSnackbar();

  const onClose = () => {
    handleClose();
    setTimeout(() => {}, 500);
  };

  const onDelete = async (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    try {
      await deleteObject(ref(getStorage(), fileDoc.id));
      await deleteDoc(fileDoc.ref);
      enqueueSnackbar(`${fileData.name} deleted successfully`, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Unable to delete ${fileData.name}`, {
        variant: 'error',
      });
    }

    handleClose();
  };

  const onFavorite = async (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    await updateDoc(fileDoc.ref, { favorite: !fileData.favorite });
    handleClose();
  };

  return (
    <Menu
      id='add-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'add-button',
      }}
    >
      <Box sx={{ width: '250px', maxWidth: '100%', height: '100%' }}>
        <MenuItem onClick={onFavorite}>
          <ListItemIcon
            sx={{ color: !fileData.favorite ? '#ffe000' : undefined }}
          >
            <Star />
          </ListItemIcon>
          <ListItemText>
            {fileData.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Box>
    </Menu>
  );
};

export default ActionMenu;
