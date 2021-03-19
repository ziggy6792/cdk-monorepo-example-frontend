import React from 'react';

import Card from 'src/components/atoms/card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

interface IProps {
    onSubmit: (values: any) => void;
}

const LoginView: React.FC<IProps> = ({ onSubmit }) => (
    <Grid container direction='column' justify='center' alignItems='center' spacing={3} style={{ height: '100%' }}>
        <Grid item>
            <Typography variant='h2'>Login</Typography>
        </Grid>
        <Grid item>
            <Card>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label='Email' name='email' size='small' variant='outlined' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label='Password' name='password' size='small' type='password' variant='outlined' />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='primary' fullWidth type='submit' variant='contained'>
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Grid>
    </Grid>
);

export default LoginView;
