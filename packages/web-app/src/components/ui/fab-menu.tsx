import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface IProps {
  children: ReactNode;
}

const FabDropdownMenu = ({ children }: IProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab className={classes.fab} color='primary' aria-label='edit' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
        <EditIcon />
      </Fab>
      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, {
            handleClose,
          })
        )}
      </Menu>
    </>
  );
};

interface IPropsItem {
  handleClose?: () => void;
  onClick?: () => void;
}

// const DropdownItem: React.FC<IPropsItem> = ({ handleClose, onClick, children }) => {
//     const handleOnClick = () => {
//         handleClose();
//         if (typeof onClick === 'function') {
//             onClick();
//         }
//     };
//     return (
//         // eslint-disable-next-line react/jsx-props-no-spreading
//         <MenuItem onClick={handleOnClick}>{children}</MenuItem>
//     );
// };

const DropdownItem: React.FC<IPropsItem> = React.forwardRef(({ handleClose, onClick, children }, ref) => {
  const handleOnClick = () => {
    handleClose();
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MenuItem innerRef={ref} onClick={handleOnClick}>
      {children}
    </MenuItem>
  );
});

FabDropdownMenu.Item = DropdownItem;

export default FabDropdownMenu;
