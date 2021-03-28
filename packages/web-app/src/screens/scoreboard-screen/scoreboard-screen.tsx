import { Grid } from '@material-ui/core';
import React from 'react';
import Spinner from 'src/components/spinner';
import { useHistory } from 'react-router';
import { useCustomGetSelectedHeatQuery } from 'src/gql/custom-hooks/use-custom-get-selected-heat';
import ScoresTable from './scores-table';

interface IScoreboardScreenProps {
    eventId: string;
}

const ScoreboardScreen: React.FC<IScoreboardScreenProps> = ({ eventId }) => {
    const { loading, data } = useCustomGetSelectedHeatQuery({ variables: { id: eventId } });

    const history = useHistory();

    if (loading) {
        return <Spinner />;
    }

    console.log('data', data);

    return (
        <>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item style={{ width: '100%' }}>
                    <ScoresTable riderAllocations={data.selectedHeat.riderAllocations.items} />
                </Grid>
            </Grid>
        </>
    );
};

export default ScoreboardScreen;
