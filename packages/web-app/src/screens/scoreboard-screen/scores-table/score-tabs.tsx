/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React from 'react';
import _ from 'lodash';
import Tabs from 'src/components/tabs';
import useTabState from 'src/hooks/use-tab-state/use-tab-state';

export enum TAB {
    START_LIST = 'START_LIST',
    RESULTS = 'RESULTS',
}

const tableTabs = [
    { label: 'Start List', value: TAB.START_LIST },
    { label: 'Results', value: TAB.RESULTS },
];

const ScoreTabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useTabState({ initialValue: tableTabs[0].value });

    return <Tabs tabs={tableTabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
};

export default ScoreTabs;
