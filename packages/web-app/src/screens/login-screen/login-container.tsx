import React from 'react';
import MainLayout from 'src/components/template/main-layout';
import Card from 'src/components/atoms/card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const LoginContainer = () => {
    console.log('HMM');
    // TODO - Move is Authenticated up to a higher level
    return (
        <MainLayout isAuthenticated={false}>
            <Grid container direction='column' justify='center' alignItems='center' spacing={3} style={{ height: '100%' }}>
                <Grid item>
                    <Typography variant='h2'>Login</Typography>
                </Grid>
                <Grid item>
                    <Card>Hello</Card>
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default LoginContainer;
