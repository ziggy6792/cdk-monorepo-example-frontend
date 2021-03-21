import React from 'react';

import Container from '@material-ui/core/Container';
import LoadingCard from 'src/components/molecule/loading-card';

interface IProps {
    loading: boolean;
    data: any;
}

const HomeView: React.FC<IProps> = ({ loading, data }) => {
    if (loading) {
        return <LoadingCard title='Fetching data...' />;
    }
    const renderCompetitions = () => data.listCompetitions.map((comp) => <li>{comp.id}</li>);
    return (
        <Container>
            <ul>{renderCompetitions()}</ul>
        </Container>
    );
};

export default HomeView;
