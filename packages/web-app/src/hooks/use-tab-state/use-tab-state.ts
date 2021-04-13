/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { setTabActionCreator } from 'src/domain/tabs';
import tabSelectors from 'src/domain/tabs/selectors';

interface IUseTabStateOptions {
  tabKey?: string;
  initialValue?: string;
}

const useTabState = ({ tabKey, initialValue }: IUseTabStateOptions): [string, (tabValue: string) => void] => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  tabKey = tabKey || pathname;

  const tabState = useSelector(tabSelectors.selectTabState);
  const selectedTab = tabState[tabKey];

  const setSelectedTab = (tabValue: string) => dispatch(setTabActionCreator({ tabKey, tabValue }));

  if (!selectedTab && initialValue) {
    setSelectedTab(initialValue);
    return [initialValue, setSelectedTab];
  }

  return [selectedTab, setSelectedTab];
};

export default useTabState;
