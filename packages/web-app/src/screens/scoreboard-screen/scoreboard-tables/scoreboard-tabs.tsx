/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import Tabs from 'src/components/tabs';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';

export enum ScoreboardTab {
  ENTER_SCORES = 'ENTER_SCORES',
  START_LIST = 'START_LIST',
  RESULTS = 'RESULTS',
}

export const scoreboardTabs = [
  { label: 'Enter Scores', value: ScoreboardTab.ENTER_SCORES },
  { label: 'Start List', value: ScoreboardTab.START_LIST },
  { label: 'Results', value: ScoreboardTab.RESULTS },
];

const ScoreboardTabs: React.FC = () => {
  const { pathname } = useLocation();

  const [selectedTab, setSelectedTab] = useTabState({ tabKey: pathname, initialValue: scoreboardTabs[0].value });

  return <Tabs tabs={scoreboardTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
};

export default ScoreboardTabs;
