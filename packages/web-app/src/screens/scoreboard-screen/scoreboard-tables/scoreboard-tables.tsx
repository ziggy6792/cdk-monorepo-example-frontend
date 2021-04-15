import React from 'react';
import _ from 'lodash';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';
import { IRiderAllocationItem } from 'src/gql/common/types';
import { scoreboardTabs, ScoreboardTab } from './scoreboard-tabs';
import ScoreboardDataTable, { IRiderAllocationRow } from './scoreboard-data-table';
import EnterScoresTable from './enter-scores-table';

export interface IScoresTableProps {
  riderAllocations: IRiderAllocationItem[];
  noProgressing: number;
  eventId: string;
}

const ScoreboardTables: React.FC<IScoresTableProps> = ({ riderAllocations, eventId, noProgressing }) => {
  const { pathname } = useLocation();

  const [selectedTab] = useTabState({ tabKey: pathname, initialValue: scoreboardTabs[0].value });

  const scoresTableData: IRiderAllocationRow[] = riderAllocations.map((riderAllocation) => ({
    riderAllocation,
    rowData: {
      order: riderAllocation.startOrder,
      rider: riderAllocation.user.fullName,
      rankedRider: riderAllocation.position ? riderAllocation.user.fullName : null,
      position: riderAllocation.position,
      ..._.reduce(riderAllocation.runs, (obj, v, i) => ({ ...obj, [`run${i + 1}`]: v.score }), {}),
    },
  }));

  const noOfRuns = riderAllocations[0]?.runs?.length || 0;

  return (
    <>
      {selectedTab === ScoreboardTab.ENTER_SCORES && (
        <EnterScoresTable eventId={eventId} tableData={scoresTableData} noOfRuns={noOfRuns} noProgressing={noProgressing} />
      )}
      {selectedTab === ScoreboardTab.START_LIST && <StartListTable tableData={scoresTableData} noProgressing={noProgressing} />}
      {selectedTab === ScoreboardTab.RESULTS && <ResultsTable tableData={scoresTableData} noOfRuns={noOfRuns} noProgressing={noProgressing} />}
    </>
  );
};

export interface IStartListTableProps {
  noProgressing: number;
  tableData: IRiderAllocationRow[];
}

const StartListTable: React.FC<IStartListTableProps> = ({ tableData, noProgressing }) => {
  const startlistTableColumns = [
    { name: 'order', label: 'Order' },
    { name: 'rider', label: 'Rider' },
  ];

  return (
    <ScoreboardDataTable
      tableData={_.orderBy(tableData, (row) => row.riderAllocation.startOrder)}
      columns={startlistTableColumns}
      highlightedPositions={noProgressing}
    />
  );
};

export interface IResultsTableProps {
  tableData: IRiderAllocationRow[];
  noProgressing: number;
  noOfRuns?: number;
}

const ResultsTable: React.FC<IResultsTableProps> = ({ tableData, noOfRuns, noProgressing }) => {
  const scoresTableColumns = [
    { name: 'rankedRider', label: 'Rider' },
    ..._.range(noOfRuns).map((v) => ({
      name: `run${v + 1}`,
      label: `Run\u00A0${v + 1}`,
    })),
    { name: 'position', label: 'Rank' },
  ];

  return (
    <ScoreboardDataTable
      tableData={tableData}
      columns={scoresTableColumns}
      highlightedPositions={noProgressing}
      options={
        {
          // sortOrder: {
          //     name: 'position',
          //     direction: 'asc',
          // },
        }
      }
    />
  );
};

export default ScoreboardTables;
