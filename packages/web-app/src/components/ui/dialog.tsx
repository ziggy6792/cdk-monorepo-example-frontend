import React from 'react';

import { useMediaQuery, useTheme, Dialog as MUIDialog, DialogContent } from '@material-ui/core';

const Dialog = props => {
    const { open, setOpen } = props;

    const onClose = setOpen ? () => setOpen(false) : () => props.onClose();

    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <MUIDialog
            open={open}
            onClose={onClose}
            // style={{ zIndex: 1302 }}
            fullScreen={matchesXS}
            PaperProps={{
                style: {
                    paddingTop: matchesXS ? '1em' : '5em',
                    paddingBottom: matchesXS ? '1em' : '5em',
                    paddingLeft: matchesXS ? '0em' : matchesSM ? '5em' : matchesMD ? '10em' : '20em',
                    paddingRight: matchesXS ? '0em' : matchesSM ? '5em' : matchesMD ? '10em' : '20em',
                },
            }}
        >
            <DialogContent>{props.children}</DialogContent>
        </MUIDialog>
    );
};

export default Dialog;
