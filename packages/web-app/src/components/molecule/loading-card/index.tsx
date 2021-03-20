import React from 'react';

import Card from 'src/components/atoms/card';
import Grid from '@material-ui/core/Grid';
import Text from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Spinner from '@material-ui/core/CircularProgress';

interface IProps {
    title?: string;
    subTitle?: string;
}

const LoadingCard: React.FC<IProps> = (props) => {
    const { title, subTitle } = props;
    return (
        <Container maxWidth='sm'>
            <Card>
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item>
                        <Text variant='h3' align='center'>
                            {title}
                        </Text>
                    </Grid>
                    <Grid item>{subTitle && <Text>{subTitle}</Text>}</Grid>
                    <Grid item style={{ marginTop: 20 }}>
                        <Spinner />
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default LoadingCard;
