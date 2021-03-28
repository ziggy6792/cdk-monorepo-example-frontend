/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import Tabs from 'src/components/tabs';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';
import { useLocation } from 'react-router';

export enum ScoreTableTab {
    ENTER_SCORES = 'ENTER_SCORES',
    START_LIST = 'START_LIST',
    RESULTS = 'RESULTS',
}

export const scoresTableTabs = [
    { label: 'Enter Scores', value: ScoreTableTab.ENTER_SCORES },
    { label: 'Start List', value: ScoreTableTab.START_LIST },
    { label: 'Results', value: ScoreTableTab.RESULTS },
];

const ScoreTabs: React.FC = () => {
    const { pathname } = useLocation();

    const [selectedTab, setSelectedTab] = useTabState({ tabKey: pathname, initialValue: scoresTableTabs[0].value });

    return <Tabs tabs={scoresTableTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
};

export default ScoreTabs;
