import React, { useState } from 'react';
import _ from 'lodash';
import Dialog from 'src/components/ui/dialog';
import ScoreRunForm, { IScoreRunFormValues, IScoreFormPosition } from 'src/modules/forms/score-run-form';
import { IRiderAllocationItem } from 'src/gql/common/types';
import { useScoreRunMutation, ScorRunInput, Run } from 'src/generated-types';
import { GET_SELECTED_HEAT } from 'src/gql/queries/event.gql';
import ScoreboardDataTable, { IRiderAllocationRow } from './scoreboard-data-table';

export interface IEnterScoresTableProps {
    tableData: IRiderAllocationRow[];
    eventId: string;
    noOfRuns?: number;
    noProgressing: number;
}

const EnterScoresTable: React.FC<IEnterScoresTableProps> = ({ tableData, noOfRuns, eventId, noProgressing }) => {
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
            runs: selectedRiderAllocation.runs.map((run, i) => ({ score: formValues.runScores[i] || null })),
        };
        const variables = { input: scoreRunInput };
        await scoreRun({ variables });
        setOpen(false);
    };

    const [selectedRiderAllocation, setSelectedRiderAllocation] = useState<IRiderAllocationItem>(null);

    const getUpdatedPosition = (formValues: IScoreRunFormValues): IScoreFormPosition => {
        const getBestScore = (runs: (number | '')[]) => {
            const bestRun = _.max(runs);
            return bestRun || -1;
        };
        if (getBestScore(formValues.runScores) < 0) {
            return { position: null, isJoint: false };
        }
        const copyRiderAllocations = _.cloneDeep(tableData.map(({ riderAllocation }) => riderAllocation));
        const scoredRun = copyRiderAllocations.find(({ userId }) => selectedRiderAllocation.userId === userId);
        scoredRun.runs = scoredRun.runs.map((run, i) => ({ score: +formValues.runScores[i] }));
        const riderBestScores = copyRiderAllocations.map(ra => ({ ...ra, bestScore: getBestScore(ra.runs.map(({ score }) => score)) }));
        const sortedRiderAllocations = _.orderBy(riderBestScores, ({ bestScore }) => bestScore, 'desc');
        const findFirstIndex = sortedRiderAllocations.findIndex(({ userId }) => selectedRiderAllocation.userId === userId);
        const matchingRuns = _.filter(sortedRiderAllocations, ({ bestScore }) => bestScore === sortedRiderAllocations[findFirstIndex].bestScore);
        return { position: findFirstIndex + 1, isJoint: matchingRuns.length > 1 };
    };

    return (
        <>
            {selectedRiderAllocation && (
                <Dialog open={open} setOpen={setOpen}>
                    <ScoreRunForm
                        title={selectedRiderAllocation.user.fullName}
                        onSubmit={onScoreRun}
                        onCancel={() => setOpen(false)}
                        initialValues={{ runScores: selectedRiderAllocation?.runs?.map(({ score }) => score || '') }}
                        currentPosition={{ position: selectedRiderAllocation.position }}
                        getUpdatedPosition={getUpdatedPosition}
                    />
                </Dialog>
            )}
            <ScoreboardDataTable
                tableData={_.orderBy(tableData, row => row.riderAllocation.startOrder)}
                columns={scoresTableColumns}
                highlightedPositions={noProgressing}
                options={{
                    onRowClick: (rowData: IRiderAllocationRow) => {
                        setSelectedRiderAllocation(rowData.riderAllocation);
                        setOpen(true);
                    },
                }}
            />
        </>
    );
};

export default EnterScoresTable;
