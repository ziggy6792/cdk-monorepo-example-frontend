import React from 'react';

import Card from 'src/components/atoms/card';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';

import Spinner from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

interface IProps {
    onSubmit: (values: any) => void;
    error: string;
    loading: boolean;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

const validations = {
    email: { required: 'Email is required' },
    password: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must have at least 6 characters',
        },
    },
};

const LoginView: React.FC<IProps> = ({ onSubmit, error, loading }) => {
    const { handleSubmit, register, errors } = useForm<ILoginFormData>();
    return (
        <Grid container direction='column' justify='center' alignItems='center' spacing={3} style={{ height: '100%' }}>
            <Grid item>
                <img alt='Logo' src='https://via.placeholder.com/150' />
            </Grid>
            <Grid item>
                <Typography align='center' variant='h3'>
                    Welcome Back
                </Typography>
                <Typography align='center' color='textSecondary' variant='h5' style={{ marginTop: 10 }}>
                    Don&apos;t miss out the latest events, Sign in to stay updated!
                </Typography>
            </Grid>
            <Grid item>
                <Container maxWidth='xs'>
                    <Card>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label='Email'
                                                name='email'
                                                size='small'
                                                variant='outlined'
                                                inputRef={register(validations.email)}
                                            />
                                            {errors.email && (
                                                <Typography color='error' variant='body2' style={{ fontSize: 12 }}>
                                                    {errors.email.message}
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label='Password'
                                                name='password'
                                                size='small'
                                                type='password'
                                                variant='outlined'
                                                inputRef={register(validations.password)}
                                            />
                                            {errors.password && (
                                                <Typography color='error' variant='body2' style={{ fontSize: 12 }}>
                                                    {errors.password.message}
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ height: 55 }}>
                                    <Button color='primary' fullWidth type='submit' variant='contained'>
                                        {loading ? <Spinner color='inherit' size={24} /> : 'Login'}
                                    </Button>
                                    <Typography align='center' color='error' variant='body2' style={{ fontSize: 12, marginTop: 10 }}>
                                        {error}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>

                    <Typography align='center' color='primary' variant='h5' style={{ marginTop: 10 }}>
                        <Link component={RouterLink} to='/' style={{ textDecoration: 'underline' }}>
                            Forgot Password?
                        </Link>
                    </Typography>
                    <Typography align='center' color='primary' variant='h5' style={{ marginTop: 10 }}>
                        Don&apos;t have an account? Sign up{' '}
                        <Link component={RouterLink} to='/' style={{ textDecoration: 'underline' }}>
                            HERE
                        </Link>
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    );
};
export default LoginView;
