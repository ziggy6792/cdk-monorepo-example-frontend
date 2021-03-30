import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';

interface GlobalFormErrorProps {
    errorMessage: string;
    fontSize?: string;
}

const GlobalFormError: React.FC<GlobalFormErrorProps> = props => {
    const { errorMessage: error, fontSize } = props;
    return (
        <>
            {error && (
                <Grid item>
                    <Typography variant='subtitle2' color='error' align='center' style={fontSize ? { fontSize } : undefined}>
                        {error}
                    </Typography>
                </Grid>
            )}
        </>
    );
};

export default GlobalFormError;
