import React from 'react';

import Container from '@material-ui/core/Container';
import LoadingCard from 'src/components/molecule/loading-card';

interface IProps {
    loading: boolean;
    data: any;
}

const HomeView: React.FC<IProps> = ({ loading, data }) => {
    console.log('DATA: ', data);
    if (loading) {
        return <LoadingCard title='Fetching data...' />;
    }
    return <Container>Data</Container>;
};

export default HomeView;
