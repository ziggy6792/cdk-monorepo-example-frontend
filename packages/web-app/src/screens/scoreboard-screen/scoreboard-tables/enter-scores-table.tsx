import React, { useState } from 'react';
import _ from 'lodash';
import Dialog from 'src/components/ui/dialog';
import ScoreRunForm from 'src/modules/score-run-form';
import { IRiderAllocationItem } from 'src/gql/common/types';
import { useScoreRunMutation, ScorRunInput } from 'src/generated-types';
import { GET_SELECTED_HEAT } from 'src/gql/queries/heat.gql';
import { IScoreRunFormValues } from 'src/modules/score-run-form/score-run-form';
import ScoreboardDataTable, { IRiderAllocationRow } from './scoreboard-data-table';

export interface IEnterScoresTableProps {
    tableData: IRiderAllocationRow[];
    eventId: string;
    noOfRuns?: number;
}

const EnterScoresTable: React.FC<IEnterScoresTableProps> = ({ tableData, noOfRuns, eventId }) => {
    const scoresTableColumns = [
        { name: 'order', label: 'Order' },
        { name: 'rider', label: 'Rider' },
        ..._.range(noOfRuns).map(v => ({
            name: `run${v + 1}`,
            label: `Run\u00A0${v + 1}`,
        })),
        { name: 'position', label: 'Rank' },
    ];

    const [open, setOpen] = useState(false);

    const [scoreRun] = useScoreRunMutation({
        refetchQueries: [
            {
                query: GET_SELECTED_HEAT,
                variables: { id: eventId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const onScoreRun = async (formValues: IScoreRunFormValues): Promise<void> => {
        const scoreRunInput: ScorRunInput = {
            heatId: selectedRiderAllocation.allocatableId,
            userId: selectedRiderAllocation.userId,
            runs: selectedRiderAllocation.runs.map((run, i) => ({ score: formValues.runScores[i] })),
        };
        const variables = { input: scoreRunInput };
        await scoreRun({ variables });
        setOpen(false);
    };

    const [selectedRiderAllocation, setSelectedRiderAllocation] = useState<IRiderAllocationItem>(null);

    return (
        <>
            <Dialog open={open} setOpen={setOpen}>
                <ScoreRunForm
                    onSubmit={onScoreRun}
                    title='Score Run'
                    onCancel={() => setOpen(false)}
                    initialValues={{ runScores: selectedRiderAllocation?.runs?.map(({ score }) => score) }}
                />
            </Dialog>
            <ScoreboardDataTable
                tableData={tableData}
                columns={scoresTableColumns}
                options={{
                    onRowClick: (rowData: IRiderAllocationRow) => {
                        console.log(`Clicked ${JSON.stringify(rowData.riderAllocation)}`);
                        setSelectedRiderAllocation(rowData.riderAllocation);
                        setOpen(true);
                    },
                }}
            />
        </>
    );
};

export default EnterScoresTable;
