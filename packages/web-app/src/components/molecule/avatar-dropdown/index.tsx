import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

interface IProps {
    onClickLogout: () => void;
}

const AvatarDropdown: React.FC<IProps> = ({ onClickLogout }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar onClick={handleClick} style={{ cursor: 'pointer' }} />
            <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem component={RouterLink} to='/'>
                    Profile
                </MenuItem>
                <MenuItem onClick={onClickLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default AvatarDropdown;
