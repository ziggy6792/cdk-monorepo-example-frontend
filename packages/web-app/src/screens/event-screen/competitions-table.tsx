/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Competition, User } from 'src/generated-types';
import DataTable, { IDataTableRow } from 'src/components/data-table';
import { ROUTE_COMPETITION } from 'src/config/routes';

type CompetitionItem = Pick<Competition, 'id' | 'name'> & { judgeUser?: Pick<User, 'fullName'> };

interface IEventsTableProps {
  competitions: CompetitionItem[];
}

interface ICompetitionRow extends IDataTableRow {
  competitionId: string;
}

const CompetitionsTable: React.FC<IEventsTableProps> = ({ competitions }) => {
  const history = useHistory();

  const tableData: ICompetitionRow[] = competitions.map((competition) => ({
    competitionId: competition.id,
    rowData: {
      name: competition.name,
      judge: competition.judgeUser?.fullName,
    },
  }));

  const columns = [
    {
      name: 'name',
      label: 'Competition',
    },
    {
      name: 'judge',
      label: 'Judge',
    },
  ];

  console.log(tableData)

  return (
    <Card>
      <CardContent>
        {competitions.map(competition => (
          <div>
            <Typography variant='subtitle1' display="inline" style={{ paddingRight: 16 }}>
              16:00
            </Typography>
            <Typography variant='subtitle1' display="inline" color='textPrimary'>
              <b>{competition.name}</b>
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  )

  // return (
  //   <DataTable
  //     title='Competitions'
  //     tableData={tableData}
  //     columns={columns}
  //     options={{
  //       onRowClick: (row: ICompetitionRow) => {
  //         history.push(`${ROUTE_COMPETITION}/${row.competitionId}`);
  //       },
  //     }}
  //   />
  // );
};

export default CompetitionsTable;
