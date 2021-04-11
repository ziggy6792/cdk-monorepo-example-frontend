import React from 'react';

import { useMediaQuery, useTheme, Dialog as MUIDialog, DialogContent, Grid, Typography } from '@material-ui/core';

interface IDialog {
    // title?: string;
    // buttons?: React.ReactNode;
    open: boolean;
    setOpen?: (boolean) => void;
    onClose?: () => void;
}

const Dialog: React.FC<IDialog> = ({ open, setOpen, children, onClose }) => {
    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <MUIDialog
            open={open}
            onClose={setOpen ? () => setOpen(false) : () => onClose()}
            // style={{ zIndex: 1302 }}
            fullScreen={matchesXS}
            disableBackdropClick
            disableEscapeKeyDown
            PaperProps={{
                style: {
                    paddingTop: matchesXS ? '1em' : '5em',
                    paddingBottom: matchesXS ? '1em' : '5em',
                    paddingLeft: matchesXS ? '0em' : matchesSM ? '5em' : matchesMD ? '10em' : '20em',
                    paddingRight: matchesXS ? '0em' : matchesSM ? '5em' : matchesMD ? '10em' : '20em',
                },
            }}
        >
            <DialogContent>
                {/* {title && (
                    <Grid container direction='row' justify='center'>
                        <Grid item>
                            <Typography variant='h3' gutterBottom>
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>
                )} */}
                {children}
                {/* {buttons && (
                    <Grid container direction='row' justify='center'>
                        {buttons}
                    </Grid>
                )} */}
            </DialogContent>
        </MUIDialog>
    );
};

export default Dialog;
