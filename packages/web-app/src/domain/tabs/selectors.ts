import { IRootState } from 'src/config/store';
import { TabState } from './tabs';

const tabSelectors = {
  selectTabState: (state: IRootState): TabState => state.tabs,
};

export default tabSelectors;
