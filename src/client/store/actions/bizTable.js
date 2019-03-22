import { createAction } from 'redux-actions';
import * as type from '../types/bizTable';

export const getBizTableData = createAction(type.BIZ_TABLE_GET_REQ);

export const putBizTableDataSuccessResult = createAction(type.BIZ_TABLE_GET_RES_SUCCESS);

export const putBizTableDataFailResult = createAction(type.BIZ_TABLE_GET_RES_FAIL);

export const updateBizTableParams = createAction(type.BIZ_TABLE_PARAMS_UPDATE);

export const reloadBizTableData = createAction(type.BIZ_TABLE_RELOAD);
