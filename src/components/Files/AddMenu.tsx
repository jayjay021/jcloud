import {
  FileUploadOutlined,
  FolderOutlined,
  DescriptionOutlined,
  ArrowForward,
} from '@mui/icons-material';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { FileType, IFile } from 'components/Files/FileItem';
import { useState } from 'react';
import dayjs from 'dayjs';
import { addDoc, collection } from '@firebase/firestore';
import { auth, firestore } from 'config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

const Input = styled('input')({
  display: 'none',
});
interface AddMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  path: string;
}

const AddMenu: React.FC<AddMenuProps> = ({
  anchorEl,
  open,
  handleClose,
  path,
}) => {
  const [user] = useAuthState(auth);
  const [inputType, setInputType] = useState<FileType | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const handleOnClick = (type: FileType) => () => {
    if (type === 'dir') {
      setInputValue('neuer Ordner');
    } else {
      setInputValue('neue Datei');
    }

    setInputType(type);
  };

  const onCreate = async () => {
    if (user) {
      const newFile: IFile = {
        name: inputValue,
        type: inputType || 'dir',
        createdAt: dayjs().unix(),
        modifiedAt: dayjs().unix(),
        favorite: false,
        size: 0,
        path: `/${path}`,
        owner: user?.uid,
      };

      try {
        addDoc(collection(firestore, '/files'), newFile).then((doc) => {
          uploadString(ref(getStorage(), doc.id), '').then((snapshot) => {
            console.log('uplaod successfully');
          });
        });
      } catch (e) {
        console.log(e);
      }

      onClose();
    }
  };

  const onClose = () => {
    handleClose();
    setTimeout(() => {
      setInputValue('');
      setInputType(null);
    }, 500);
  };

  const uploadFile = async (file: File) => {
    if (user) {
      const newFile: IFile = {
        createdAt: dayjs().unix(),
        modifiedAt: dayjs().unix(),
        owner: user.uid,
        name: file.name,
        favorite: false,
        path: `/${path}`,
        size: file.size,
        type: 'file',
      };

      addDoc(collection(firestore, '/files'), newFile).then((doc) => {
        uploadBytes(ref(getStorage(), doc.id), file).then((snapshot) => {
          console.log('uplaod successfully');
        });
      });
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files || [];
    Array.from(files).map(async (file) => uploadFile(file));
    onClose();
  };

  return (
    <>
      <Input id='upload-files' multiple type='file' onChange={onFileChange} />
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
          <label htmlFor='upload-files'>
            <MenuItem onClick={onClose}>
              <ListItemIcon>
                <FileUploadOutlined />
              </ListItemIcon>
              <ListItemText>Upload File</ListItemText>
            </MenuItem>
          </label>
          <MenuItem onClick={handleOnClick('dir')}>
            <ListItemIcon>
              <FolderOutlined />
            </ListItemIcon>
            <ListItemText>
              {inputType === 'dir' ? (
                <NewTextField
                  value={inputValue}
                  setValue={setInputValue}
                  onSave={onCreate}
                />
              ) : (
                'New Folder'
              )}
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOnClick('file')}>
            <ListItemIcon>
              <DescriptionOutlined />
            </ListItemIcon>
            <ListItemText>
              {inputType === 'file' ? (
                <NewTextField
                  value={inputValue}
                  setValue={setInputValue}
                  onSave={onCreate}
                />
              ) : (
                'New File'
              )}
            </ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

interface NewTextFieldProps {
  value: string;
  setValue: (newValue: string) => void;
  onSave: () => void;
}

const NewTextField: React.FC<NewTextFieldProps> = ({
  value,
  setValue,
  onSave,
}) => {
  return (
    <TextField
      autoFocus
      onFocus={(event) => event.target.select()}
      size='small'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={onSave}>
              <ArrowForward />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AddMenu;
