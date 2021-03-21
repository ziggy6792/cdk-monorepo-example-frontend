import React from 'react';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AvatarDropdown from 'src/components/molecule/avatar-dropdown';

import { logoutActionCreator } from 'src/domain/auth';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
);

interface IProps {
    isAuthenticated: boolean;
}

const NavigationBarDesktop: React.FC<IProps> = ({ isAuthenticated }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const onClickLogout = () => dispatch(logoutActionCreator());
    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Alpaca Tournament
                    </Typography>
                    {isAuthenticated && <AuthenticatedRoutes onClickLogout={onClickLogout} />}
                </Toolbar>
            </AppBar>
        </div>
    );
};

interface IAuthenticatedRoutes {
    onClickLogout: () => void;
}

// TODO - Refactor the way routes are defined in the Nav bar
const AuthenticatedRoutes: React.FC<IAuthenticatedRoutes> = ({ onClickLogout }) => (
    <>
        {/* <Button color='inherit'>Profile</Button>{' '} */}
        <AvatarDropdown onClickLogout={onClickLogout} />
    </>
);

export default NavigationBarDesktop;
