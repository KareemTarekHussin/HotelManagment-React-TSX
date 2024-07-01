import * as React from 'react';
import clsx from 'clsx';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { useMenuItem } from '@mui/base/useMenuItem';
import { Popper } from '@mui/base/Popper';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import { useMenuButton } from '@mui/base/useMenuButton';
import { useTheme } from '@mui/system';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Modal, Typography } from '@mui/material';

interface UseMenuProps {
  profileImage: string;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Menu = React.forwardRef(function Menu(
  props: React.ComponentPropsWithoutRef<'ul'>,
  ref: React.Ref<HTMLUListElement>,
) {
  const { children, ...other } = props;

  const { open, triggerElement, contextValue, getListboxProps } = useMenu({
    listboxRef: ref,
  });

  return (
    <Popper open={open} anchorEl={triggerElement}>
      <ul className="menu-root" {...other} {...getListboxProps()}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </ul>
    </Popper>
  );
});

const MenuItem = React.forwardRef(function MenuItem(
  props: React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const { children, onClick, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({ rootRef: ref });

  const classes = {
    'focus-visible': focusVisible,
    'menu-item': true,
    disabled,
  };

  return (
    <li
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => {}) })}
      className={clsx(classes)}
    >
      {children}
    </li>
  );
});

const MenuButton = React.forwardRef(function MenuButton(
  props: React.PropsWithChildren<{}>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

  return (
    <button type="button" {...props} {...getButtonProps()} className="button" />
  );
});

export default function UseMenu({
  profileImage,
  userName,
  email,
  phoneNumber,
  country,
}: UseMenuProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { contextValue: dropdownContextValue } = useDropdown();

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img
              src={profileImage}
              alt={userName}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>User Name:</strong> {userName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {email}
          </Typography>
          <Typography>
            <strong>Phone Number:</strong> {phoneNumber}
          </Typography>
          <Typography>
            <strong>Country:</strong> {country}
          </Typography>
        </Box>
      </Modal>

      <DropdownContext.Provider value={dropdownContextValue}>
        <Button onClick={handleOpen}>
          <VisibilityIcon/>
        </Button>
        <Menu id="hooks-menu">


          


          {/* <MenuItem onClick={createHandleMenuClick('OS Default')} 
            style={{ marginRight:0,textAlign:'center',display:'flex',alignItems:'center',gap:5}}>
            <VisibilityIcon sx={{fontSize:16,marginLeft:2,color:'#1565C0'}}/>
            <Typography sx={{fontSize:14}}>View</Typography>
          </MenuItem> */}
        </Menu>
      </DropdownContext.Provider>
      <Styles />
    </>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const styles = `
    .menu-root {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      padding: 4px;
      margin: 10px 0;
      min-width: 120px;
      background: #fff;
      border: 1px solid ${grey[200]};
      border-radius: 0.75em;
      color: ${grey[900]};
      overflow: auto;
      outline: 0px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05);
    }

    .mode-dark .menu-root {
      background: ${grey[900]};
      border-color: ${grey[700]};
      color: ${grey[300]};
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
    }

    .menu-item {
      list-style: none;
      padding: 5px;
      border-radius: 0.45em;
      cursor: default;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
    }

    .menu-item:last-of-type {
      border-bottom: none;
    }

    .menu-item:focus {
      background-color: ${grey[100]};
      color: ${grey[900]};
      outline: 0;
    }

    .mode-dark .menu-item:focus {
      background-color: ${grey[800]};
      color: ${grey[300]};
    }

    .menu-item.disabled {
      color: ${grey[400]};
    }

  .mode-dark .menu-item.disabled {
    color: ${grey[700]};
  }

    .button {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 6px 6px 0px;
      border-radius: 8px;
      color: white;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${isDarkMode ? grey[900] : '#fff'};
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      color: ${isDarkMode ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

      &:hover {
        background: ${isDarkMode ? grey[800] : grey[50]};
        border-color: ${isDarkMode ? grey[600] : grey[300]};
      }

      &:active {
        background: ${isDarkMode ? grey[700] : grey[100]};
      }

      &:focus-visible {
        box-shadow: 0 0 0 4px ${isDarkMode ? blue[300] : blue[200]};
        outline: none;
      }
    }
  `;

  // eslint-disable-next-line react/no-danger
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
