import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Alpaca Tournament
                    </Typography>
                    {isAuthenticated && <AuthenticatedRoutes />}
                </Toolbar>
            </AppBar>
        </div>
    );
};

// TODO - Refactor the way routes are defined in the Nav bar
const AuthenticatedRoutes = () => (
    <>
        <Button color='inherit'>Profile</Button>{' '}
    </>
);

export default NavigationBarDesktop;
