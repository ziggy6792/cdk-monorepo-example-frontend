import React from 'react';
import MUITabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid } from '@material-ui/core';

export interface ITab {
  label: string;
  value: string;
}

interface ITabsProps {
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
  tabs: ITab[];
}

const Tabs: React.FC<ITabsProps> = props => {
  const { selectedTab, setSelectedTab, tabs } = props;

  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid container justify='center'>
      <Grid item>
        <MUITabs value={selectedTab || tabs[0].value} onChange={handleChange} indicatorColor='primary' textColor='primary' centered>
          {tabs.map(({ label, value }) => (
            <Tab label={label} value={value} key={value} />
          ))}
        </MUITabs>
        <Grid />
      </Grid>
    </Grid>
  );
};

export default Tabs;
