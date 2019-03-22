import { createSelector } from 'reselect';
import * as defaultSettings from '@/utils/defaultSettingsUtil';

export const getBizToolbar = (state) => state.bizToolbar;

const getBizTableState = (state) => state.bizTable;

export const getBizTable = createSelector(getBizTableState, (bizTable) => {
  return bizTable.merge({
    pagination: defaultSettings.pagination
  }, { deep: true });
});
