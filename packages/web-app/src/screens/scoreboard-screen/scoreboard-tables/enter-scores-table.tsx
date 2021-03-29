import React, { useState } from 'react';
import _ from 'lodash';
import Dialog from 'src/components/ui/dialog';
import ScoreRunForm from 'src/modules/score-run-form';
import ScoreboardDataTable, { IRiderAllocationRow } from './scoreboard-data-table';

export interface IEnterScoresTableProps {
    tableData: IRiderAllocationRow[];
    noOfRuns?: number;
}

const EnterScoresTable: React.FC<IEnterScoresTableProps> = ({ tableData, noOfRuns }) => {
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

    return (
        <>
            <Dialog open={open} setOpen={setOpen}>
                <ScoreRunForm
                    onSubmit={async formValues => {
                        console.log(formValues);
                    }}
                    title='Score Run'
                    onCancel={() => setOpen(false)}
                    // initialValues={{  }}
                />
            </Dialog>
            <ScoreboardDataTable
                tableData={tableData}
                columns={scoresTableColumns}
                options={{
                    onRowClick: (rowData: IRiderAllocationRow) => {
                        console.log(`Clicked ${rowData.userId}`);
                        setOpen(true);
                    },
                }}
            />
        </>
    );
};

export default EnterScoresTable;
